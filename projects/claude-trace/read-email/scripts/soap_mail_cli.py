#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""CLI for the mail skill."""

from __future__ import annotations

import argparse
import json
import os
import sys
from typing import Any

from soap_mail import (
    DEFAULT_ENDPOINT,
    MailSearchFilters,
    SoapMailError,
    batch_set_flag,
    batch_add_category,
    batch_delete_items,
    batch_mark_read_state,
    batch_move_items,
    create_folder,
    daily_mail_stats,
    find_person_unhandled,
    find_recent_unreplied_important,
    forward_mail,
    get_valid_auth_token,
    get_item_detail,
    list_folders,
    resolve_recipient_candidates,
    send_reply_mail,
    send_new_mail,
    resolve_folder_by_name,
    search_mail,
)


def output_json(payload: dict[str, Any]) -> None:
    print(json.dumps(payload, ensure_ascii=False, indent=2))


def parse_email_list(raw: str) -> list[str]:
    return [item.strip() for item in (raw or "").split(",") if item.strip()]


def _short_text(value: str, limit: int = 36) -> str:
    text = " ".join((value or "").split())
    if len(text) <= limit:
        return text
    return text[: limit - 1] + "…"


def _readable_sender(item: dict[str, Any]) -> str:
    sender = item.get("from") or item.get("sender") or {}
    name = (sender.get("name") or "").strip()
    email = (sender.get("email") or "").strip()
    if name and email:
        return f"{name} <{email}>"
    return name or email or "-"


def _readable_recipients(item: dict[str, Any]) -> str:
    display_to = (item.get("display_to") or "").strip()
    display_cc = (item.get("display_cc") or "").strip()
    if display_to and display_cc:
        return f"To: {display_to}; Cc: {display_cc}"
    return display_to or display_cc or "-"


def _status_text(item: dict[str, Any]) -> str:
    flags: list[str] = []
    flags.append("未读" if not item.get("is_read", False) else "已读")
    if item.get("has_attachments"):
        flags.append("有附件")
    importance = (item.get("importance") or "").strip()
    if importance:
        flags.append(f"重要级别:{importance}")
    categories = item.get("categories") or []
    if categories:
        flags.append("标签:" + ",".join(categories[:3]))
    return " / ".join(flags)


def _status_icon(item: dict[str, Any]) -> str:
    if not item.get("is_read", False):
        if (item.get("importance") or "").lower() == "high":
            return "🚨"
        if item.get("has_attachments"):
            return "📎"
        return "📩"
    if item.get("has_attachments"):
        return "📬"
    return "✅"


def _importance_icon(item: dict[str, Any]) -> str:
    importance = (item.get("importance") or "").lower()
    if importance == "high":
        return "🔥"
    if importance == "low":
        return "🫧"
    return "•"


def _folder_icon(folder_name: str) -> str:
    name = (folder_name or "").lower()
    if "inbox" in name or "收件" in name:
        return "📥"
    if "sent" in name or "发件" in name:
        return "📤"
    if "draft" in name or "草稿" in name:
        return "📝"
    return "📁"


def _collect_items(payload: dict[str, Any]) -> list[dict[str, Any]]:
    if isinstance(payload.get("items"), list):
        return payload["items"]
    if isinstance(payload.get("item"), dict):
        return [payload["item"]]
    return []


def _summary_stats(items: list[dict[str, Any]]) -> dict[str, int]:
    return {
        "total": len(items),
        "unread": sum(1 for item in items if not item.get("is_read", False)),
        "attachments": sum(1 for item in items if item.get("has_attachments")),
        "high_importance": sum(1 for item in items if (item.get("importance") or "").lower() == "high"),
    }


def _markdown_table(items: list[dict[str, Any]], max_rows: int = 12) -> str:
    header = "| 状态 | 时间 | 发件人 | 主题 | 文件夹 |"
    sep = "| --- | --- | --- | --- | --- |"
    rows = [header, sep]
    for item in items[:max_rows]:
        rows.append(
            "| "
            + " | ".join(
                [
                    _short_text(f"{_status_icon(item)} {_importance_icon(item)} {_status_text(item)}", 36),
                    _short_text(item.get("date_time_received") or item.get("date_time_sent") or "-", 19),
                    _short_text(_readable_sender(item), 24),
                    _short_text(item.get("subject") or "-", 28),
                    _short_text(f"{_folder_icon(item.get('folder') or '')} {item.get('folder') or '-'}", 18),
                ]
            )
            + " |"
        )
    return "\n".join(rows)


def build_markdown_result_view(title: str, payload: dict[str, Any], max_rows: int = 12) -> str:
    items = _collect_items(payload)
    stats = _summary_stats(items)
    lines = [
        f"# 📬 {title}",
        "",
        f"- 📊 总数：{stats['total']}",
        f"- 📩 未读：{stats['unread']}",
        f"- 📎 含附件：{stats['attachments']}",
        f"- 🔥 高优先级：{stats['high_importance']}",
        "",
        "## 📋 邮件列表",
        "",
        _markdown_table(items, max_rows=max_rows) if items else "_暂无邮件_",
    ]
    return "\n".join(lines) + "\n"


def _render_attachment_list_lines(attachments: list[dict[str, Any]], *, title: str = "## 📎 附件") -> list[str]:
    if not attachments:
        return []
    lines = [
        title,
        "",
        f"- 附件总数：{len(attachments)}",
        "",
        "| 文件名 | 大小(Byte) | 类型 |",
        "| --- | --- | --- |",
    ]
    for att in attachments[:20]:
        lines.append(
            "| "
            + " | ".join(
                [
                    _short_text(att.get("name") or "-", 40),
                    str(att.get("size") or 0),
                    _short_text(att.get("content_type") or "-", 30),
                ]
            )
            + " |"
        )
    if len(attachments) > 20:
        lines.append(f"| ... | ... | 仅展示前 20 项（共 {len(attachments)} 项） |")
    return lines


def build_reply_summary(payload: dict[str, Any]) -> str:
    body_preview = _short_text(payload.get("reply_body_preview") or "", 80)
    recipients = ", ".join(payload.get("resolved_to") or []) or "-"
    cc_list = ", ".join(payload.get("resolved_cc") or [])
    attachments = payload.get("attachments") or []
    lines = [
        "## 📨 回复摘要",
        "",
        f"- 收件人：{recipients}",
        f"- 主题：{payload.get('resolved_subject') or '-'}",
        f"- 模式：{'回复全部' if payload.get('reply_all') else '回复发件人'}",
        f"- 原文引用：{'是' if payload.get('include_original') else '否'}",
    ]
    if cc_list:
        lines.append(f"- 抄送：{cc_list}")
    if attachments:
        lines.append(f"- 附件数：{len(attachments)}")
    if body_preview:
        lines.extend(["", "### ✍️ 回复内容摘要", "", body_preview])
    return "\n".join(lines)


def build_send_summary(payload: dict[str, Any]) -> str:
    body_preview = _short_text(payload.get("body_preview") or "", 80)
    to_list = ", ".join(payload.get("to_recipients") or []) or "-"
    cc_list = ", ".join(payload.get("cc_recipients") or [])
    bcc_list = ", ".join(payload.get("bcc_recipients") or [])
    attachments = payload.get("attachments") or []
    lines = [
        "## 📨 发送摘要",
        "",
        f"- 收件人：{to_list}",
        f"- 主题：{payload.get('subject') or '-'}",
        f"- 重要级别：{payload.get('importance') or 'Normal'}",
    ]
    if cc_list:
        lines.append(f"- 抄送：{cc_list}")
    if bcc_list:
        lines.append(f"- 密送：{bcc_list}")
    if attachments:
        lines.append(f"- 附件数：{len(attachments)}")
    if body_preview:
        lines.extend(["", "### ✍️ 正文内容摘要", "", body_preview])
    return "\n".join(lines)


def build_reply_markdown_result(payload: dict[str, Any]) -> str:
    status_icon = "✅" if payload.get("success") else "❌"
    attachments = payload.get("attachments") or []
    lines = [
        f"# {status_icon} 回复邮件结果",
        "",
        build_reply_summary(payload),
    ]
    if attachments:
        lines.extend([""] + _render_attachment_list_lines(attachments, title="## 📎 回复附件"))
    response_code = ((payload.get("data") or {}).get("response_code") or "").strip()
    if response_code:
        lines.extend(["", f"- 服务端响应：{response_code}"])
    return "\n".join(lines) + "\n"


def build_send_markdown_result(payload: dict[str, Any]) -> str:
    status_icon = "✅" if payload.get("success") else "❌"
    attachments = payload.get("attachments") or []
    lines = [
        f"# {status_icon} 发送邮件结果",
        "",
        build_send_summary(payload),
    ]
    if attachments:
        lines.extend([""] + _render_attachment_list_lines(attachments, title="## 📎 新建邮件附件"))
    response_code = ((payload.get("data") or {}).get("response_code") or "").strip()
    if response_code:
        lines.extend(["", f"- 服务端响应：{response_code}"])
    return "\n".join(lines) + "\n"


def build_forward_summary(payload: dict[str, Any]) -> str:
    body_preview = _short_text(payload.get("body_preview") or "", 80)
    to_list = ", ".join(payload.get("to_recipients") or []) or "-"
    cc_list = ", ".join(payload.get("cc_recipients") or [])
    bcc_list = ", ".join(payload.get("bcc_recipients") or [])
    attachments = payload.get("attachments") or []
    lines = [
        "## 📤 转发摘要",
        "",
        f"- 收件人：{to_list}",
        f"- 主题：{payload.get('subject') or '-'}",
    ]
    if cc_list:
        lines.append(f"- 抄送：{cc_list}")
    if bcc_list:
        lines.append(f"- 密送：{bcc_list}")
    if attachments:
        lines.append(f"- 附件数：{len(attachments)}")
    if body_preview:
        lines.extend(["", "### ✍️ 转发附言摘要", "", body_preview])
    return "\n".join(lines)


def build_forward_markdown_result(payload: dict[str, Any]) -> str:
    status_icon = "✅" if payload.get("success") else "❌"
    attachments = payload.get("attachments") or []
    lines = [
        f"# {status_icon} 转发邮件结果",
        "",
        build_forward_summary(payload),
    ]
    if attachments:
        lines.extend([""] + _render_attachment_list_lines(attachments, title="## 📎 转发附件"))
    response_code = ((payload.get("data") or {}).get("response_code") or "").strip()
    if response_code:
        lines.extend(["", f"- 服务端响应：{response_code}"])
    return "\n".join(lines) + "\n"


def build_detail_markdown_result(payload: dict[str, Any], max_rows: int = 12) -> str:
    item = payload.get("item") or {}
    result_view = build_markdown_result_view("邮件详情", {"items": [item]}, max_rows=max_rows).rstrip()
    attachments = item.get("attachments") or []
    lines = [result_view]
    if attachments:
        lines.extend([""] + _render_attachment_list_lines(attachments, title="## 📎 附件列表"))
    else:
        lines.extend(["", "## 📎 附件列表", "", "_无附件_"])
    return "\n".join(lines) + "\n"


def build_create_folder_markdown_result(payload: dict[str, Any]) -> str:
    status_icon = "✅" if payload.get("success") else "❌"
    folder = payload.get("folder") or {}
    lines = [
        f"# {status_icon} 创建文件夹结果",
        "",
        f"- 文件夹名称：{payload.get('display_name') or '-'}",
        f"- FolderClass：{payload.get('folder_class') or '-'}",
        f"- 父目录：{payload.get('parent_folder_id') or payload.get('distinguished_parent') or '-'}",
    ]
    if folder:
        lines.extend(
            [
                f"- 新文件夹 ID：{folder.get('id') or '-'}",
                f"- 未读数：{folder.get('unread_count', 0)}",
                f"- 总数：{folder.get('total_count', 0)}",
            ]
        )
    response_code = ((payload.get("data") or {}).get("response_code") or "").strip()
    if response_code:
        lines.append(f"- 服务端响应：{response_code}")
    return "\n".join(lines) + "\n"


def build_recipient_lookup_markdown(payload: dict[str, Any], max_rows: int = 10) -> str:
    users = payload.get("users") or []
    lines = [
        f"# 👥 收件人查询结果：{payload.get('condition') or ''}",
        "",
        f"- 总匹配数：{payload.get('total_count', 0)}",
        f"- 当前页：{payload.get('page_no', 1)}",
        f"- 每页：{payload.get('page_size', 10)}",
        "",
    ]
    if not users:
        lines.append("_未查询到匹配人员_")
        return "\n".join(lines) + "\n"

    lines.extend(
        [
            "| 序号 | ERP | 姓名 | 部门 | 邮箱 |",
            "| --- | --- | --- | --- | --- |",
        ]
    )
    for idx, user in enumerate(users[:max_rows], start=1):
        lines.append(
            "| "
            + " | ".join(
                [
                    str(idx),
                    _short_text(user.get("erp") or "-", 18),
                    _short_text(user.get("real_name") or "-", 12),
                    _short_text(user.get("department") or "-", 28),
                    _short_text(user.get("email") or "-", 24),
                ]
            )
            + " |"
        )

    if payload.get("confirm_ready") and payload.get("selected_user"):
        selected = payload["selected_user"]
        lines.extend(
            [
                "",
                "## ✅ 可进入发送确认",
                "",
                f"- ERP：{selected.get('erp') or '-'}",
                f"- 姓名：{selected.get('real_name') or '-'}",
                f"- 部门：{selected.get('department') or '-'}",
                f"- 邮箱：{selected.get('email') or '-'}",
                "",
                "请向用户确认是否发送到这个邮箱。",
            ]
        )
    else:
        lines.extend(
            [
                "",
                "## ⚠️ 需要用户选择",
                "",
                "匹配到多位人员，请让用户从表格中明确选择目标 ERP / 姓名 / 邮箱后再发送。",
            ]
        )
    return "\n".join(lines) + "\n"


def build_batch_action_markdown(payload: dict[str, Any], title: str) -> str:
    status_icon = "✅" if payload.get("success") else "❌"
    lines = [
        f"# {status_icon} {title}",
        "",
        f"- 操作类型：{payload.get('action') or '-'}",
        f"- 处理数量：{payload.get('count', 0)}",
    ]
    if payload.get("category"):
        lines.append(f"- 标签：{payload.get('category')}")
    if payload.get("target_folder_id"):
        lines.append(f"- 目标文件夹：{payload.get('target_folder_id')}")
    if payload.get("delete_type"):
        lines.append(f"- 删除类型：{payload.get('delete_type')}")
    if payload.get("start_date"):
        lines.append(f"- 旗标开始时间：{payload.get('start_date')}")
    if payload.get("due_date"):
        lines.append(f"- 旗标截止时间：{payload.get('due_date')}")
    response_code = ((payload.get("data") or {}).get("response_code") or "").strip()
    if response_code:
        lines.append(f"- 服务端响应：{response_code}")
    return "\n".join(lines) + "\n"


def build_daily_stats_markdown(payload: dict[str, Any]) -> str:
    rows = payload.get("daily_stats") or []
    lines = [
        f"# 📅 邮件按天统计",
        "",
        f"- 时间范围：{payload.get('after')} 至 {payload.get('before')}",
        f"- 总邮件数：{payload.get('total_count', 0)}",
        "",
    ]
    if not rows:
        lines.append("_该时间范围内没有邮件_")
        return "\n".join(lines) + "\n"

    lines.extend(
        [
            "| 日期 | 星期 | 邮件总数 | 未读数 | 已读数 |",
            "| --- | --- | --- | --- | --- |",
        ]
    )
    for row in rows:
        lines.append(
            "| "
            + " | ".join(
                [
                    row.get("date_label") or row.get("date") or "-",
                    row.get("weekday") or "-",
                    str(row.get("total", 0)),
                    str(row.get("unread", 0)),
                    str(row.get("read", 0)),
                ]
            )
            + " |"
        )
    return "\n".join(lines) + "\n"


def _action_items(items: list[dict[str, Any]]) -> list[dict[str, Any]]:
    return [
        item
        for item in items
        if (not item.get("is_read", False))
        and (
            item.get("has_attachments")
            or (item.get("importance") or "").lower() == "high"
            or any(tag in "".join(item.get("categories") or []).lower() for tag in ("重要", "urgent", "待办", "vip", "important"))
        )
    ]


def build_markdown_summary(payload: dict[str, Any], max_rows: int = 12) -> str:
    items = _collect_items(payload)
    stats = _summary_stats(items)
    title = payload.get("summary_title") or payload.get("folder") or payload.get("sender") or payload.get("parent") or "邮件总结"
    lines = [
        f"# 📬 {title} 总结",
        "",
        f"- 📊 总数：{stats['total']}",
        f"- 📩 未读：{stats['unread']}",
        f"- 📎 含附件：{stats['attachments']}",
        f"- 🔥 高优先级：{stats['high_importance']}",
        "",
        "## 📋 总览表",
        "",
        _markdown_table(items, max_rows=max_rows) if items else "_暂无邮件_",
    ]
    action_needed = _action_items(items)
    if action_needed:
        lines.extend(
            [
                "",
                "## ⚠️ 建议优先处理",
                "",
                _markdown_table(action_needed, max_rows=min(max_rows, 8)),
            ]
        )
    if items:
        lines.extend(["", "## 👀 简要观察", ""])
        if stats["unread"]:
            lines.append(f"- 未读邮件有 {stats['unread']} 封，建议优先处理表格中的未读项。")
        if stats["attachments"]:
            lines.append(f"- 含附件邮件有 {stats['attachments']} 封，适合优先关注需要下载或审阅材料的邮件。")
        if stats["high_importance"]:
            lines.append(f"- 高优先级邮件有 {stats['high_importance']} 封，建议尽快确认是否需要回复。")
        top_subjects = [item.get("subject") for item in items[:3] if item.get("subject")]
        if top_subjects:
            lines.append("- 近期主题重点：" + "；".join(top_subjects))
    return "\n".join(lines) + "\n"


def cmd_summarize(args: argparse.Namespace) -> None:
    raw = sys.stdin.read().strip()
    if not raw:
        raise SoapMailError("summarize expects JSON from stdin")
    try:
        payload = json.loads(raw)
    except json.JSONDecodeError as exc:
        raise SoapMailError(f"stdin is not valid JSON: {exc}") from exc

    items = _collect_items(payload)
    stats = _summary_stats(items)
    summary = {
        "success": True,
        "summary_title": payload.get("summary_title") or payload.get("folder") or payload.get("sender") or payload.get("parent") or "邮件总结",
        "source_success": payload.get("success", True),
        "stats": stats,
        "items": items,
        "action_needed": _action_items(items),
    }

    if args.format == "json":
        output_json(summary)
        return

    print(build_markdown_summary(summary, max_rows=args.max_rows), end="")


def get_token_if_needed(debug: bool = False) -> str:
    token = get_valid_auth_token()
    if debug:
        print(
            "[mail] auth token resolved via MAIL_AUTH_TOKEN or clawJwtLogin cache/login flow",
            file=sys.stderr,
        )
    return token


def resolve_folder_args(args: argparse.Namespace, endpoint: str, token: str) -> tuple[str, str]:
    if getattr(args, "folder_id", ""):
        return args.folder_id, getattr(args, "folder", "") or "custom"
    if getattr(args, "folder_name", ""):
        resolved = resolve_folder_by_name(
            display_name=args.folder_name,
            endpoint=endpoint,
            token=token,
            distinguished_parent=getattr(args, "folder_parent", "msgfolderroot"),
            traversal="Deep",
            max_entries=max(getattr(args, "folder_scan_limit", 200), 50),
        )
        return resolved["id"], resolved["display_name"]
    return "", getattr(args, "folder", "inbox")


def cmd_folders(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = list_folders(
        endpoint=endpoint,
        token=token,
        parent_id=args.parent_id,
        distinguished_parent=args.parent or "msgfolderroot",
        traversal=args.traversal,
        max_entries=args.limit,
    )
    output_json(result)


def cmd_search(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    folder_id, folder_label = resolve_folder_args(args, endpoint, token)
    filters = MailSearchFilters(
        sender=args.sender,
        recipient=args.recipient,
        subject=args.subject,
        body_keyword=args.body_keyword,
        after=args.after,
        before=args.before,
        unread_only=args.unread,
        read_only=args.read,
        has_attachments=args.has_attachments,
        category=args.category,
        importance=args.importance,
    )
    result = search_mail(
        endpoint=endpoint,
        token=token,
        folder_id=folder_id,
        distinguished_folder=args.folder,
        max_entries=args.limit,
        max_pages=args.max_pages,
        filters=filters,
        folder_label=folder_label,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_markdown_result_view(f"{result['folder']} 查询结果", result, max_rows=args.max_rows), end="")


def cmd_detail(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = get_item_detail(item_id=args.item_id, endpoint=endpoint, token=token)
    if args.format == "json":
        output_json(result)
        return
    print(build_detail_markdown_result(result, max_rows=args.max_rows), end="")


def cmd_pending_important(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = find_recent_unreplied_important(
        endpoint=endpoint,
        token=token,
        days=args.days,
        max_entries=args.limit,
        max_pages=args.max_pages,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_markdown_result_view("最近重要未回复邮件", result, max_rows=args.max_rows), end="")


def cmd_person_unhandled(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = find_person_unhandled(
        endpoint=endpoint,
        token=token,
        sender=args.sender,
        days=args.days,
        max_entries=args.limit,
        max_pages=args.max_pages,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_markdown_result_view(f"{args.sender} 未处理邮件", result, max_rows=args.max_rows), end="")


def cmd_reply(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = send_reply_mail(
        item_id=args.item_id,
        body=args.body,
        endpoint=endpoint,
        token=token,
        body_type=args.body_type,
        reply_all=args.reply_all,
        include_original=args.include_original,
        user_id=args.current_user or os.environ.get("MAIL_USER_ID") or os.environ.get("JOYMAIL_USER_ID", ""),
        attachment_paths=args.attachments or "",
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_reply_markdown_result(result), end="")


def cmd_send(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = send_new_mail(
        to_recipients=args.to_recipients,
        cc_recipients=args.cc_recipients or "",
        bcc_recipients=args.bcc_recipients or "",
        subject=args.subject,
        body=args.body,
        endpoint=endpoint,
        token=token,
        body_type=args.body_type,
        importance=args.importance,
        attachment_paths=args.attachments or "",
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_send_markdown_result(result), end="")


def cmd_forward(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = forward_mail(
        item_id=args.item_id,
        to_recipients=args.to_recipients,
        cc_recipients=args.cc_recipients or "",
        bcc_recipients=args.bcc_recipients or "",
        body=args.body or "",
        endpoint=endpoint,
        token=token,
        body_type=args.body_type,
        attachment_paths=args.attachments or "",
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_forward_markdown_result(result), end="")


def cmd_lookup_recipient(args: argparse.Namespace) -> None:
    condition = args.condition or args.name or args.erp or ""
    if not condition:
        raise SoapMailError("lookup-recipient requires one of --condition / --name / --erp")
    prefer_recent_contacts = bool(args.name) or (bool(args.condition) and not args.erp and "@" not in args.condition)
    result = resolve_recipient_candidates(
        condition=condition,
        page_no=args.page_no,
        page_size=args.page_size,
        prefer_recent_contacts=prefer_recent_contacts,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_recipient_lookup_markdown(result, max_rows=args.max_rows), end="")


def cmd_create_folder(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    parent_folder_id = args.parent_folder_id
    distinguished_parent = args.parent or "msgfolderroot"
    if args.parent_folder_name:
        resolved = resolve_folder_by_name(
            display_name=args.parent_folder_name,
            endpoint=endpoint,
            token=token,
            distinguished_parent=distinguished_parent,
            traversal="Deep",
            max_entries=max(args.parent_scan_limit, 50),
        )
        parent_folder_id = resolved["id"]
    result = create_folder(
        display_name=args.display_name,
        endpoint=endpoint,
        token=token,
        parent_folder_id=parent_folder_id,
        distinguished_parent=distinguished_parent,
        folder_class=args.folder_class,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_create_folder_markdown_result(result), end="")


def cmd_daily_stats(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    folder_id, folder_label = resolve_folder_args(args, endpoint, token)
    result = daily_mail_stats(
        endpoint=endpoint,
        token=token,
        folder_id=folder_id,
        distinguished_folder=args.folder,
        after=args.after,
        before=args.before,
        days=args.days,
        max_entries=args.limit,
        max_pages=args.max_pages,
        folder_label=folder_label,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_daily_stats_markdown(result), end="")


def cmd_batch_mark_read(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = batch_mark_read_state(
        item_ids=args.item_ids,
        is_read=True,
        endpoint=endpoint,
        token=token,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_batch_action_markdown(result, "批量标记已读结果"), end="")


def cmd_batch_mark_unread(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = batch_mark_read_state(
        item_ids=args.item_ids,
        is_read=False,
        endpoint=endpoint,
        token=token,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_batch_action_markdown(result, "批量标记未读结果"), end="")


def cmd_batch_add_category(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = batch_add_category(
        item_ids=args.item_ids,
        category=args.category,
        endpoint=endpoint,
        token=token,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_batch_action_markdown(result, "批量打标签结果"), end="")


def cmd_batch_move(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = batch_move_items(
        item_ids=args.item_ids,
        target_folder_id=args.target_folder_id,
        endpoint=endpoint,
        token=token,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_batch_action_markdown(result, "批量移动邮件结果"), end="")


def cmd_batch_delete(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = batch_delete_items(
        item_ids=args.item_ids,
        endpoint=endpoint,
        token=token,
        delete_type=args.delete_type,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_batch_action_markdown(result, "批量删除邮件结果"), end="")


def cmd_flag(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = batch_set_flag(
        item_ids=args.item_id,
        flagged=True,
        endpoint=endpoint,
        token=token,
        start_date=args.start_date,
        due_date=args.due_date,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_batch_action_markdown(result, "旗标邮件结果"), end="")


def cmd_unflag(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = batch_set_flag(
        item_ids=args.item_id,
        flagged=False,
        endpoint=endpoint,
        token=token,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_batch_action_markdown(result, "取消旗标结果"), end="")


def cmd_batch_flag(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = batch_set_flag(
        item_ids=args.item_ids,
        flagged=True,
        endpoint=endpoint,
        token=token,
        start_date=args.start_date,
        due_date=args.due_date,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_batch_action_markdown(result, "批量旗标邮件结果"), end="")


def cmd_batch_unflag(args: argparse.Namespace) -> None:
    endpoint = args.endpoint or DEFAULT_ENDPOINT
    token = get_token_if_needed(debug=args.debug)
    result = batch_set_flag(
        item_ids=args.item_ids,
        flagged=False,
        endpoint=endpoint,
        token=token,
    )
    if args.format == "json":
        output_json(result)
        return
    print(build_batch_action_markdown(result, "批量取消旗标结果"), end="")


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="SOAP-based Mail query helper")
    parser.add_argument("--endpoint", default=os.environ.get("MAIL_ENDPOINT") or os.environ.get("JOYMAIL_SOAP_ENDPOINT", DEFAULT_ENDPOINT), help="SOAP endpoint URL")
    parser.add_argument("--debug", action="store_true", help="print lightweight debug info to stderr")

    subparsers = parser.add_subparsers(dest="command", required=True)

    folders = subparsers.add_parser("folders", help="list folders under a parent folder")
    folders.add_argument("--parent", default="msgfolderroot", help="distinguished parent folder, default msgfolderroot")
    folders.add_argument("--parent-id", default="", help="explicit parent folder id")
    folders.add_argument("--traversal", choices=["Shallow", "Deep"], default="Deep", help="folder traversal depth")
    folders.add_argument("--limit", type=int, default=200, help="maximum folders to return")
    folders.set_defaults(func=cmd_folders)

    create = subparsers.add_parser("create-folder", help="create a mail folder")
    create.add_argument("--display-name", required=True, help="new folder display name")
    create.add_argument("--parent", default="msgfolderroot", help="distinguished parent folder, default msgfolderroot")
    create.add_argument("--parent-folder-id", default="", help="explicit parent folder id")
    create.add_argument("--parent-folder-name", default="", help="resolve parent folder by display name")
    create.add_argument("--parent-scan-limit", type=int, default=200, help="max folders scanned when resolving parent-folder-name")
    create.add_argument("--folder-class", default="IPF.Note", help="folder class, default IPF.Note")
    create.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    create.set_defaults(func=cmd_create_folder)

    search = subparsers.add_parser("search", help="search one folder with client-side filters")
    search.add_argument("--folder", default="inbox", help="distinguished folder name such as inbox/sentitems/drafts")
    search.add_argument("--folder-id", default="", help="explicit folder id, useful for custom folders")
    search.add_argument("--folder-name", default="", help="resolve a custom folder by display name under folder_parent")
    search.add_argument("--folder-parent", default="msgfolderroot", help="distinguished parent used when resolving folder-name")
    search.add_argument("--folder-scan-limit", type=int, default=200, help="max folders scanned when resolving folder-name")
    search.add_argument("--sender", default="", help="filter by sender name or email")
    search.add_argument("--recipient", default="", help="filter by recipient name or email")
    search.add_argument("--subject", default="", help="filter by subject keyword")
    search.add_argument("--body-keyword", default="", help="filter by preview/body keyword")
    search.add_argument("--after", default="", help="start time: YYYY-MM-DD or YYYY-MM-DD HH:MM:SS; defaults to last 1 day when both after/before are omitted")
    search.add_argument("--before", default="", help="end time: YYYY-MM-DD or YYYY-MM-DD HH:MM:SS")
    search.add_argument("--unread", action="store_true", help="only unread mails")
    search.add_argument("--read", action="store_true", help="only read mails")
    search.add_argument("--has-attachments", action="store_true", help="only mails with attachments")
    search.add_argument("--category", default="", help="filter by category/tag keyword")
    search.add_argument("--importance", choices=["High", "Normal", "Low", "high", "normal", "low"], default="", help="filter by importance")
    search.add_argument("--limit", type=int, default=50, help="maximum items fetched from folder")
    search.add_argument("--max-pages", type=int, default=10, help="maximum pages to fetch; default 10 pages")
    search.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format for user-facing display")
    search.add_argument("--max-rows", type=int, default=12, help="maximum rows shown in markdown table mode")
    search.set_defaults(func=cmd_search)

    detail = subparsers.add_parser("detail", help="get full mail detail by item id")
    detail.add_argument("--item-id", required=True, help="EWS item id")
    detail.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format for user-facing display")
    detail.add_argument("--max-rows", type=int, default=12, help="maximum rows shown in markdown table mode")
    detail.set_defaults(func=cmd_detail)

    daily = subparsers.add_parser("daily-stats", help="daily mail stats by date range")
    daily.add_argument("--folder", default="inbox", help="distinguished folder name such as inbox/sentitems/drafts")
    daily.add_argument("--folder-id", default="", help="explicit folder id, useful for custom folders")
    daily.add_argument("--folder-name", default="", help="resolve a custom folder by display name under folder_parent")
    daily.add_argument("--folder-parent", default="msgfolderroot", help="distinguished parent used when resolving folder-name")
    daily.add_argument("--folder-scan-limit", type=int, default=200, help="max folders scanned when resolving folder-name")
    daily.add_argument("--after", default="", help="start date YYYY-MM-DD")
    daily.add_argument("--before", default="", help="end date YYYY-MM-DD")
    daily.add_argument("--days", type=int, default=7, help="lookback window in days when after/before are omitted")
    daily.add_argument("--limit", type=int, default=100, help="maximum items fetched per page")
    daily.add_argument("--max-pages", type=int, default=20, help="maximum pages to fetch")
    daily.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    daily.set_defaults(func=cmd_daily_stats)

    batch_read = subparsers.add_parser("batch-mark-read", help="mark multiple mails as read")
    batch_read.add_argument("--item-ids", required=True, help="comma-separated item ids")
    batch_read.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    batch_read.set_defaults(func=cmd_batch_mark_read)

    batch_unread = subparsers.add_parser("batch-mark-unread", help="mark multiple mails as unread")
    batch_unread.add_argument("--item-ids", required=True, help="comma-separated item ids")
    batch_unread.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    batch_unread.set_defaults(func=cmd_batch_mark_unread)

    batch_category = subparsers.add_parser("batch-add-category", help="add category to multiple mails")
    batch_category.add_argument("--item-ids", required=True, help="comma-separated item ids")
    batch_category.add_argument("--category", required=True, help="category name to add")
    batch_category.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    batch_category.set_defaults(func=cmd_batch_add_category)


    flag = subparsers.add_parser("flag", help="flag one mail")
    flag.add_argument("--item-id", required=True, help="single item id")
    flag.add_argument("--start-date", default="", help="flag start date in ISO format, optional")
    flag.add_argument("--due-date", default="", help="flag due date in ISO format, optional")
    flag.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    flag.set_defaults(func=cmd_flag)

    unflag = subparsers.add_parser("unflag", help="remove flag from one mail")
    unflag.add_argument("--item-id", required=True, help="single item id")
    unflag.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    unflag.set_defaults(func=cmd_unflag)

    batch_flag = subparsers.add_parser("batch-flag", help="flag multiple mails")
    batch_flag.add_argument("--item-ids", required=True, help="comma-separated item ids")
    batch_flag.add_argument("--start-date", default="", help="flag start date in ISO format, optional")
    batch_flag.add_argument("--due-date", default="", help="flag due date in ISO format, optional")
    batch_flag.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    batch_flag.set_defaults(func=cmd_batch_flag)

    batch_unflag = subparsers.add_parser("batch-unflag", help="remove flag from multiple mails")
    batch_unflag.add_argument("--item-ids", required=True, help="comma-separated item ids")
    batch_unflag.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    batch_unflag.set_defaults(func=cmd_batch_unflag)

    batch_move = subparsers.add_parser("batch-move", help="move multiple mails to a target folder")
    batch_move.add_argument("--item-ids", required=True, help="comma-separated item ids")
    batch_move.add_argument("--target-folder-id", required=True, help="target folder id")
    batch_move.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    batch_move.set_defaults(func=cmd_batch_move)

    batch_delete = subparsers.add_parser("batch-delete", help="delete multiple mails")
    batch_delete.add_argument("--item-ids", required=True, help="comma-separated item ids")
    batch_delete.add_argument("--delete-type", default="MoveToDeletedItems", help="delete type, default MoveToDeletedItems")
    batch_delete.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    batch_delete.set_defaults(func=cmd_batch_delete)

    pending = subparsers.add_parser("pending-important", help="find recent important mails without later reply")
    pending.add_argument("--days", type=int, default=1, help="lookback window in days; default 1 day when user did not specify a date")
    pending.add_argument("--limit", type=int, default=100, help="max items fetched from inbox/sent")
    pending.add_argument("--max-pages", type=int, default=10, help="maximum pages to fetch; default 10 pages")
    pending.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format for user-facing display")
    pending.add_argument("--max-rows", type=int, default=12, help="maximum rows shown in markdown table mode")
    pending.set_defaults(func=cmd_pending_important)

    unhandled = subparsers.add_parser("person-unhandled", help="find unread mails from one sender without later reply")
    unhandled.add_argument("--sender", required=True, help="sender name or email")
    unhandled.add_argument("--days", type=int, default=1, help="lookback window in days; default 1 day when user did not specify a date")
    unhandled.add_argument("--limit", type=int, default=100, help="max items fetched from inbox/sent")
    unhandled.add_argument("--max-pages", type=int, default=10, help="maximum pages to fetch; default 10 pages")
    unhandled.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format for user-facing display")
    unhandled.add_argument("--max-rows", type=int, default=12, help="maximum rows shown in markdown table mode")
    unhandled.set_defaults(func=cmd_person_unhandled)

    reply = subparsers.add_parser("reply", help="reply to one mail by item id")
    reply.add_argument("--item-id", required=True, help="original mail item id")
    reply.add_argument("--body", required=True, help="reply body")
    reply.add_argument("--body-type", choices=["H", "T"], default="T", help="reply body type")
    reply.add_argument("--reply-all", action="store_true", help="include original To/Cc recipients when possible")
    reply.add_argument("--include-original", action="store_true", help="append quoted original text to reply body")
    reply.add_argument("--current-user", default="", help="current mailbox address, used to exclude yourself in reply-all")
    reply.add_argument("--attachments", default="", help="attachment file paths, comma-separated")
    reply.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format for reply result")
    reply.set_defaults(func=cmd_reply)

    send = subparsers.add_parser("send", help="send a new email")
    send.add_argument("--to", required=True, dest="to_recipients", help="recipient email addresses, comma-separated")
    send.add_argument("--cc", dest="cc_recipients", default="", help="cc email addresses, comma-separated")
    send.add_argument("--bcc", dest="bcc_recipients", default="", help="bcc email addresses, comma-separated")
    send.add_argument("--subject", required=True, help="email subject")
    send.add_argument("--body", required=True, help="email body content")
    send.add_argument("--body-type", choices=["H", "T"], default="T", help="body type: HTML or Text")
    send.add_argument("--importance", choices=["High", "Normal", "Low"], default="Normal", help="importance level")
    send.add_argument("--attachments", default="", help="attachment file paths, comma-separated")
    send.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format for send result")
    send.set_defaults(func=cmd_send)

    forward = subparsers.add_parser("forward", help="forward an email by item id")
    forward.add_argument("--item-id", required=True, help="original mail item id")
    forward.add_argument("--to", required=True, dest="to_recipients", help="forward recipient email addresses, comma-separated")
    forward.add_argument("--cc", dest="cc_recipients", default="", help="cc email addresses, comma-separated")
    forward.add_argument("--bcc", dest="bcc_recipients", default="", help="bcc email addresses, comma-separated")
    forward.add_argument("--body", default="", help="forward comment/body content")
    forward.add_argument("--body-type", choices=["H", "T"], default="T", help="body type: HTML or Text")
    forward.add_argument("--attachments", default="", help="attachment file paths, comma-separated")
    forward.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format for forward result")
    forward.set_defaults(func=cmd_forward)

    lookup = subparsers.add_parser("lookup-recipient", help="lookup recipient by ERP/name before sending")
    lookup.add_argument("--condition", default="", help="ERP, name, or keyword to search")
    lookup.add_argument("--name", default="", help="search by real name")
    lookup.add_argument("--erp", default="", help="search by ERP")
    lookup.add_argument("--page-no", type=int, default=1, help="page number")
    lookup.add_argument("--page-size", type=int, default=10, help="page size")
    lookup.add_argument("--format", choices=["json", "markdown"], default="markdown", help="output format")
    lookup.add_argument("--max-rows", type=int, default=10, help="maximum rows shown in markdown table")
    lookup.set_defaults(func=cmd_lookup_recipient)

    summarize = subparsers.add_parser("summarize", help="read JSON from stdin and render a readable summary")
    summarize.add_argument("--format", choices=["markdown", "json"], default="markdown", help="output format")
    summarize.add_argument("--max-rows", type=int, default=12, help="maximum rows shown in markdown tables")
    summarize.set_defaults(func=cmd_summarize)

    return parser


def main() -> None:
    parser = build_parser()
    args = parser.parse_args()
    try:
        args.func(args)
    except SoapMailError as exc:
        output_json({"success": False, "error": str(exc)})
        sys.exit(1)
    except Exception as exc:
        output_json({"success": False, "error": str(exc)})
        sys.exit(1)


if __name__ == "__main__":
    main()
