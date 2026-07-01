#!/usr/bin/env python3
"""
[已废弃 · 2026-07-01] 一次性脚本，曾用于生成 2026-01/02 对话记录。
产物已归档至 memory/archive/conversations-2026-01至06/，memory/conversations/ 已删除。
保留此文件仅作历史参考，请勿运行（OUTPUT_DIR 指向已不存在的目录）。
会话记录现统一遵循 AGENTS.md 的 workspace/YYYY-MM-DD-对话摘要/ 规范。

原功能：扫描 ~/.myagents/sessions/*.jsonl，按日期生成结构化对话文件到 memory/conversations/。
只处理 2026-01 和 2026-02 的日期。
"""

import os
import json
import re
from datetime import datetime, timezone, timedelta
from collections import defaultdict
from pathlib import Path

SESSIONS_DIR = Path.home() / ".myagents" / "sessions"
OUTPUT_DIR = Path.home() / "Documents" / "projects" / "ai-agents" / "my-agent" / "memory" / "conversations"
TZ_SHANGHAI = timezone(timedelta(hours=8))
TARGET_MONTHS = {(2026, 1), (2026, 2)}

# 跳过的消息模式
SKIP_PATTERNS = [
    r"CRON_TASK",
    r"<system-reminder>",
    r"^/wake$",
    r"^心跳$",
    r"^/heartbeat$",
]


def is_skip_message(content: str) -> bool:
    """判断是否应跳过的消息"""
    for pat in SKIP_PATTERNS:
        if re.search(pat, content):
            return True
    return False


def clean_content(content: str) -> str:
    """清理消息内容，移除 system-reminder 标签"""
    # 移除 system-reminder 块
    content = re.sub(r"<system-reminder>.*?</system-reminder>", "", content, flags=re.DOTALL)
    # 移除 command-name 标签
    content = re.sub(r"<command-name>.*?</command-name>", "", content, flags=re.DOTALL)
    # 移除 skill-invocation 标签
    content = re.sub(r"<skill-invocation>.*?</skill-invocation>", "", content, flags=re.DOTALL)
    # 移除 thinking 标签
    content = re.sub(r"<thinking>.*?</thinking>", "", content, flags=re.DOTALL)
    content = content.strip()
    return content


def extract_text_from_assistant(content: str) -> str:
    """从助手消息中提取纯文本内容（跳过 thinking 和 tool_use）"""
    try:
        parsed = json.loads(content)
        if isinstance(parsed, list):
            texts = []
            for item in parsed:
                if isinstance(item, dict) and item.get("type") == "text":
                    texts.append(item.get("text", ""))
            return "\n".join(texts).strip()
    except (json.JSONDecodeError, TypeError):
        pass
    # 如果不是 JSON，直接返回清理后的内容
    return clean_content(content)


def extract_topic(messages: list) -> str:
    """从消息列表中提取主题摘要"""
    if not messages:
        return "未知主题"
    # 取第一条用户消息的前80字作为主题
    first_msg = messages[0]["content"]
    # 截取到句号或逗号，或前80字
    for sep in ["。", "！", "？", "\n", ".", "!", "?"]:
        idx = first_msg.find(sep)
        if 0 < idx < 80:
            return first_msg[:idx + 1]
    return first_msg[:80] + ("..." if len(first_msg) > 80 else "")


def parse_session(filepath: Path) -> dict:
    """解析单个 session 文件，返回 {date_str: {topic, messages}}"""
    result = {}
    session_id = filepath.stem

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            lines = f.readlines()
    except Exception as e:
        print(f"  [ERROR] {filepath.name}: {e}")
        return result

    # 按日期分组
    daily_messages = defaultdict(list)
    daily_assistant = defaultdict(list)

    for line in lines:
        try:
            obj = json.loads(line.strip())
        except json.JSONDecodeError:
            continue

        role = obj.get("role", "")
        content = obj.get("content", "")
        timestamp = obj.get("timestamp", "")

        if not timestamp or not content:
            continue

        # 时区转换
        try:
            dt = datetime.fromisoformat(timestamp.replace("Z", "+00:00")).astimezone(TZ_SHANGHAI)
        except ValueError:
            continue

        date_key = dt.strftime("%Y-%m-%d")

        if (dt.year, dt.month) not in TARGET_MONTHS:
            continue

        if role == "user":
            if is_skip_message(content):
                continue
            cleaned = clean_content(content)
            if not cleaned or len(cleaned) < 2:
                continue
            daily_messages[date_key].append({
                "time": dt.strftime("%H:%M"),
                "content": cleaned,
            })
        elif role == "assistant":
            cleaned = extract_text_from_assistant(content)
            if cleaned and len(cleaned) > 10:
                daily_assistant[date_key].append({
                    "time": dt.strftime("%H:%M"),
                    "content": cleaned[:500],  # 限制长度
                })

    # 生成每个日期的结构
    for date_key in sorted(set(list(daily_messages.keys()) + list(daily_assistant.keys()))):
        user_msgs = daily_messages.get(date_key, [])
        assistant_msgs = daily_assistant.get(date_key, [])
        if not user_msgs:
            continue

        topic = extract_topic(user_msgs)
        result[date_key] = {
            "topic": topic,
            "user_messages": user_msgs,
            "assistant_messages": assistant_msgs,
            "session_id": session_id,
        }

    return result


def generate_markdown(date_str: str, sessions: list) -> str:
    """生成单日的 markdown 文件"""
    lines = []
    lines.append(f"# {date_str} 对话记录\n")
    lines.append("## 概览\n")

    total_user_msgs = sum(len(s["user_messages"]) for s in sessions)
    lines.append(f"- **会话数**：{len(sessions)}个用户会话")
    lines.append(f"- **用户消息数**：{total_user_msgs}条")

    # 提取主要主题
    topics = [s["topic"] for s in sessions]
    if topics:
        lines.append(f"- **主要主题**：{'、'.join(topics[:5])}" + ("..." if len(topics) > 5 else ""))

    lines.append("\n---\n")
    lines.append("## 主题详情\n")

    for i, session in enumerate(sessions, 1):
        lines.append(f"### {i}. {session['topic']}\n")

        # 用户消息
        if session["user_messages"]:
            lines.append("**用户**：\n")
            for msg in session["user_messages"]:
                content = msg["content"].replace("\n", "\n> ")
                # 截取关键部分
                if len(content) > 300:
                    content = content[:300] + "..."
                lines.append(f"> [{msg['time']}] {content}\n")

        # 助手回复摘要
        if session["assistant_messages"]:
            lines.append("**助手回复摘要**：\n")
            # 只取第一条有意义的回复
            first_reply = session["assistant_messages"][0]["content"]
            if len(first_reply) > 200:
                first_reply = first_reply[:200] + "..."
            first_reply = first_reply.replace("\n", "\n> ")
            lines.append(f"> {first_reply}\n")

        lines.append("---\n")

    return "\n".join(lines)


def main():
    print(f"扫描 {SESSIONS_DIR} ...")
    print(f"目标月份: {TARGET_MONTHS}")
    print(f"输出目录: {OUTPUT_DIR}")

    # 确保输出目录存在
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    # 扫描所有 session 文件
    jsonl_files = sorted(SESSIONS_DIR.glob("*.jsonl"))
    print(f"共发现 {len(jsonl_files)} 个 session 文件")

    # 按日期聚合所有 session 的数据
    all_daily_data = defaultdict(list)
    processed = 0

    for filepath in jsonl_files:
        result = parse_session(filepath)
        for date_key, data in result.items():
            all_daily_data[date_key].append(data)
        processed += 1
        if processed % 200 == 0:
            print(f"  已处理 {processed}/{len(jsonl_files)} ...")

    print(f"处理完成，共 {len(all_daily_data)} 个日期有数据")

    # 生成 markdown 文件
    created = 0
    skipped = 0
    for date_str in sorted(all_daily_data.keys()):
        sessions = all_daily_data[date_str]
        output_path = OUTPUT_DIR / f"{date_str}.md"

        if output_path.exists():
            skipped += 1
            continue

        md_content = generate_markdown(date_str, sessions)
        with open(output_path, "w", encoding="utf-8") as f:
            f.write(md_content)
        created += 1

    print(f"\n完成！创建 {created} 个文件，跳过 {skipped} 个已存在的文件")

    # 按月统计
    month_counts = defaultdict(int)
    for date_str in all_daily_data:
        month = date_str[:7]
        month_counts[month] += 1
    for month in sorted(month_counts):
        print(f"  {month}: {month_counts[month]} 天")


if __name__ == "__main__":
    main()
