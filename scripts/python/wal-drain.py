#!/usr/bin/env python3
"""
WAL 队列 drain 脚本 — 消费 memory/.wal-queue.ndjson 的积压。

设计原则（匹配 producer wal-enqueue.py 的"不跑AI"约束）：
- 本脚本纯机械处理，不调用 LLM、不做语义提取
- producer 只写元信息（session_id/transcript_path/ts/msg_count），无法生成语义事件
- 语义提取（→ memory/events/）仍由 agent 在会话中手动完成（见 00-IDENTITY-PUSH.md）
- 本脚本职责：把队列按日期聚合成"待提取清单"，校验 transcript 可达性，
  截断已处理队列，并更新 state.json 心跳——让积压可见、可追踪、不再无限增长

用法：
  python3 scripts/python/wal-drain.py            # 正常drain（处理+截断）
  python3 scripts/python/wal-drain.py --dry-run  # 只预览不写
  python3 scripts/python/wal-drain.py --status   # 只看积压状态

可挂 launchd 定时运行（建议每日一次）。
"""

import json
import os
import sys
from datetime import datetime
from pathlib import Path

# 解析项目根（脚本在 scripts/python/ 下，根在上两级）
SCRIPT_DIR = Path(__file__).resolve().parent
PROJECT_ROOT = SCRIPT_DIR.parent.parent
QUEUE_FILE = PROJECT_ROOT / "memory" / ".wal-queue.ndjson"
EVENTS_DIR = PROJECT_ROOT / "memory" / "events"
STATE_FILE = PROJECT_ROOT / "memory" / "state.json"
PENDING_FILE = PROJECT_ROOT / "memory" / "events" / "_pending-extraction.json"


def load_queue():
    """加载队列，跳过空行/损坏行。返回 list[dict]。"""
    if not QUEUE_FILE.exists():
        return []
    entries = []
    with open(QUEUE_FILE, "r", encoding="utf-8") as f:
        for lineno, line in enumerate(f, 1):
            line = line.strip()
            if not line:
                continue
            try:
                entries.append(json.loads(line))
            except json.JSONDecodeError:
                print(f"  ⚠ 第{lineno}行JSON损坏，跳过", file=sys.stderr)
    return entries


def check_transcript(path):
    """校验 transcript 文件是否还存在。返回 (exists, size_kb)。"""
    if not path:
        return False, 0
    p = Path(path)
    if p.exists():
        return True, round(p.stat().st_size / 1024, 1)
    return False, 0


def group_by_date(entries):
    """按日期分组。返回 dict[date_str, list[entry]]。"""
    groups = {}
    for e in entries:
        ts = e.get("ts", "")
        # ts 形如 2026-06-16T08:56:43...
        date = ts[:10] if len(ts) >= 10 else "unknown"
        groups.setdefault(date, []).append(e)
    return groups


def dedup_sessions(entries):
    """同一 session 多条记录去重，保留 msg_count 最大的（最终状态）。返回 list[dict]。"""
    by_session = {}
    for e in entries:
        sid = e.get("session_id", "")
        if sid not in by_session or e.get("msg_count", 0) > by_session[sid].get("msg_count", 0):
            by_session[sid] = e
    return list(by_session.values())


def write_pending(groups):
    """写待提取清单到 events/_pending-extraction.json，供 agent 会话中处理。"""
    pending = {
        "generated_at": datetime.now().astimezone().isoformat(),
        "description": "WAL队列积压的session元信息，待agent在会话中提取语义事件写入对应日期的events文件",
        "instruction": "对每个日期下的session，读取transcript_path，提取决策/偏好/原话等，追加到 memory/events/YYYY-MM/YYYY-MM-DD.json 的 events[]",
        "pending_dates": {}
    }
    total_reachable = 0
    total_orphan = 0
    for date in sorted(groups.keys()):
        sessions = dedup_sessions(groups[date])
        session_infos = []
        for s in sessions:
            exists, size_kb = check_transcript(s.get("transcript_path", ""))
            if exists:
                total_reachable += 1
            else:
                total_orphan += 1
            session_infos.append({
                "session_id": s.get("session_id", "")[:8] + "...",
                "transcript_path": s.get("transcript_path", ""),
                "transcript_exists": exists,
                "transcript_kb": size_kb,
                "last_ts": s.get("ts", ""),
                "msg_count": s.get("msg_count", 0),
            })
        pending["pending_dates"][date] = {
            "session_count": len(session_infos),
            "sessions": session_infos
        }
    pending["summary"] = {
        "total_dates": len(groups),
        "total_sessions": total_reachable + total_orphan,
        "reachable_transcripts": total_reachable,
        "orphaned_transcripts": total_orphan,
    }
    EVENTS_DIR.mkdir(parents=True, exist_ok=True)
    with open(PENDING_FILE, "w", encoding="utf-8") as f:
        json.dump(pending, f, ensure_ascii=False, indent=2)
    return pending["summary"]


def truncate_queue():
    """清空队列（已聚合到 pending，原始元信息不再需要）。"""
    with open(QUEUE_FILE, "w", encoding="utf-8") as f:
        f.write("")


def update_state_heartbeat():
    """更新 state.json 的 memory 心跳时间戳。"""
    if not STATE_FILE.exists():
        return
    try:
        with open(STATE_FILE, "r", encoding="utf-8") as f:
            state = json.load(f)
        now = datetime.now().astimezone().isoformat()
        if "heartbeat_checks" not in state:
            state["heartbeat_checks"] = {}
        state["heartbeat_checks"]["memory"] = now
        state["heartbeat_checks"]["wal_drain"] = now
        with open(STATE_FILE, "w", encoding="utf-8") as f:
            json.dump(state, f, ensure_ascii=False, indent=2)
    except (json.JSONDecodeError, OSError) as e:
        print(f"  ⚠ state.json 更新失败: {e}", file=sys.stderr)


def cmd_status():
    entries = load_queue()
    if not entries:
        print("✓ WAL队列为空")
        return
    groups = group_by_date(entries)
    sessions = dedup_sessions(entries)
    reachable = sum(1 for s in sessions if check_transcript(s.get("transcript_path", ""))[0])
    size_kb = round(QUEUE_FILE.stat().st_size / 1024, 1)
    print(f"WAL队列状态：{size_kb}KB / {len(entries)}条记录 / {len(sessions)}个独立session")
    print(f"日期跨度：{min(groups)} ~ {max(groups)}（{len(groups)}天）")
    print(f"transcript可达：{reachable}/{len(sessions)}")
    print(f"\n各日期session数：")
    for date in sorted(groups.keys()):
        cnt = len(dedup_sessions(groups[date]))
        print(f"  {date}: {cnt} session")


def cmd_drain(dry_run=False):
    entries = load_queue()
    if not entries:
        print("✓ WAL队列为空，无需drain")
        return
    print(f"读取队列：{len(entries)}条记录")
    groups = group_by_date(entries)
    print(f"聚合为：{len(groups)}个日期")
    summary = write_pending(groups) if not dry_run else None
    if dry_run:
        sessions = dedup_sessions(entries)
        reachable = sum(1 for s in sessions if check_transcript(s.get("transcript_path", ""))[0])
        print(f"\n[DRY-RUN] 将聚合 {len(sessions)} session → _pending-extraction.json")
        print(f"[DRY-RUN] transcript可达：{reachable}/{len(sessions)}")
        print(f"[DRY-RUN] 日期：{min(groups)} ~ {max(groups)}")
        print("[DRY-RUN] 未写入、未截断队列")
        return
    print(f"\n待提取清单已写入：{PENDING_FILE.relative_to(PROJECT_ROOT)}")
    print(f"  总session：{summary['total_sessions']}（可达{summary['reachable_transcripts']}，孤儿{summary['orphaned_transcripts']}）")
    print(f"  覆盖日期：{summary['total_dates']}天")
    truncate_queue()
    print(f"队列已截断（{QUEUE_FILE.relative_to(PROJECT_ROOT)} 清空）")
    update_state_heartbeat()
    print("state.json 心跳已更新")
    print(f"\n→ 下次会话时，agent 可读 {PENDING_FILE.relative_to(PROJECT_ROOT)} 提取语义事件")


def main():
    if len(sys.argv) > 1:
        if sys.argv[1] == "--dry-run":
            cmd_drain(dry_run=True)
        elif sys.argv[1] == "--status":
            cmd_status()
        elif sys.argv[1] in ("--help", "-h"):
            print(__doc__)
        else:
            print(f"未知参数: {sys.argv[1]}。用法: --dry-run / --status / --help")
            sys.exit(1)
    else:
        cmd_drain(dry_run=False)


if __name__ == "__main__":
    main()
