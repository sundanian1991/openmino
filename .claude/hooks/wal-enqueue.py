"""Stop Hook: 机械层 — 对话结束时将 transcript 元信息入队。

不跑 AI，不做语义提取。仅验证、过滤、写一行 JSON。
200ms 内退出，永不阻塞 Stop 事件。
"""
import json
import os
import re
import sys
from datetime import datetime, timezone, timedelta

QUEUE_FILE = "memory/.wal-queue.ndjson"
MYAGENTS_SESSIONS_DIR = os.path.expanduser("~/.myagents/sessions")
MIN_MEANINGFUL_LINES = 6  # 低于此的会话跳过（心跳、空对话）
TOPIC_MAX_LEN = 80

CST = timezone(timedelta(hours=8))


def _resolve_transcript(transcript_path: str, session_id: str) -> str:
    """定位 transcript 文件。MyAgents 的 session 在 ~/.myagents/sessions/，
    不是 Claude Code 默认路径，需要 fallback。"""
    # 1. 原路径存在
    if transcript_path and os.path.exists(transcript_path):
        return transcript_path
    # 2. 用 session_id 在 MyAgents 目录找
    if session_id:
        candidate = os.path.join(MYAGENTS_SESSIONS_DIR, f"{session_id}.jsonl")
        if os.path.exists(candidate):
            return candidate
    # 3. 取 MyAgents 目录中最近修改的 .jsonl
    if os.path.isdir(MYAGENTS_SESSIONS_DIR):
        try:
            files = [
                os.path.join(MYAGENTS_SESSIONS_DIR, f)
                for f in os.listdir(MYAGENTS_SESSIONS_DIR)
                if f.endswith(".jsonl")
            ]
            if files:
                files.sort(key=os.path.getmtime, reverse=True)
                return files[0]
        except Exception:
            pass
    return ""


def _find_root():
    """定位项目根目录（hook 工作目录不固定）。"""
    import subprocess
    try:
        root = subprocess.run(
            ["git", "rev-parse", "--show-toplevel"],
            capture_output=True, text=True, timeout=5
        ).stdout.strip()
        if root:
            return root
    except Exception:
        pass
    # 回退：从脚本路径推算
    return os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))


def _is_system_line(line: dict) -> bool:
    """判断是否为系统消息（非真实对话内容）。"""
    content = line.get("content", "")
    role = line.get("role", "")
    # cron 任务注入
    if "<CRON_TASK>" in content:
        return True
    # system-reminder 包裹
    if role == "user" and content.strip().startswith("<system-reminder>"):
        return True
    return False


def _extract_topic(lines: list) -> str:
    """提取第一条真实用户消息作为话题提示。"""
    for line in lines:
        if line.get("role") == "user" and not _is_system_line(line):
            content = line.get("content", "")
            # 清理常见标签
            cleaned = re.sub(r'<[^>]+>', '', content).strip()
            if len(cleaned) > TOPIC_MAX_LEN:
                cleaned = cleaned[:TOPIC_MAX_LEN] + "..."
            return cleaned
    return ""


def main():
    # 读 hook 传入的 stdin JSON
    try:
        payload = json.load(sys.stdin)
    except (json.JSONDecodeError, Exception):
        sys.exit(0)  # 解析失败，静默退出

    transcript_path = payload.get("transcript_path", "")
    session_id = payload.get("session_id", "")
    reason = payload.get("reason", "")

    resolved = _resolve_transcript(transcript_path, session_id)
    if not resolved:
        sys.exit(0)

    # 读 transcript
    lines = []
    try:
        with open(resolved) as f:
            for raw in f:
                raw = raw.strip()
                if not raw:
                    continue
                try:
                    lines.append(json.loads(raw))
                except json.JSONDecodeError:
                    continue
    except Exception:
        sys.exit(0)

    # 过滤：无意义会话
    meaningful = [l for l in lines if not _is_system_line(l)]
    if len(meaningful) < MIN_MEANINGFUL_LINES:
        sys.exit(0)

    # 过滤：纯 cron 会话（所有 user 消息都是 system-reminder）
    user_lines = [l for l in lines if l.get("role") == "user"]
    if user_lines and all(_is_system_line(l) for l in user_lines):
        sys.exit(0)

    msg_count = len(meaningful)
    topic_hint = _extract_topic(lines)

    # 写队列
    root = _find_root()
    queue_path = os.path.join(root, QUEUE_FILE)
    os.makedirs(os.path.dirname(queue_path), exist_ok=True)

    entry = {
        "session_id": session_id,
        "transcript_path": resolved,
        "ts": datetime.now(CST).isoformat(),
        "msg_count": msg_count,
        "topic_hint": topic_hint,
    }

    with open(queue_path, "a") as f:
        f.write(json.dumps(entry, ensure_ascii=False) + "\n")


if __name__ == "__main__":
    main()
