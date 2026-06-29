#!/usr/bin/env python3
"""Zero-side tools for read-only inspection of local JD ME chat data.

Discovery, log recovery, database history, search, summary, and watch commands
operate on files the user can already access. The preview command can ask JD ME's
own SDK to create a normal chat-export HTML file when direct SDK history search
returns no messages.
"""

from __future__ import annotations

import argparse
import ctypes
from html.parser import HTMLParser
import json
import os
import re
import sqlite3
import subprocess
import sys
import time
from urllib import error as urlerror
from urllib import request as urlrequest
from pathlib import Path
from typing import Any, Iterable


import hashlib

from jd_me_tool_platform import (
    IS_MACOS,
    IS_WINDOWS,
    app_candidates,
    default_me_binary,
    electron_root_candidates,
    first_existing_or_first,
    log_root_candidates,
    sqlcipher_candidates,
    sqlcipher_dll_candidates,
    support_root_candidates,
)


DEFAULT_APP = first_existing_or_first(app_candidates())
BUNDLED_SQLCIPHER = first_existing_or_first(sqlcipher_candidates())
DEFAULT_SUPPORT_ROOT = first_existing_or_first(support_root_candidates())
DEFAULT_ELECTRON_ROOT = first_existing_or_first(electron_root_candidates())
DEFAULT_LOG_ROOT = first_existing_or_first(log_root_candidates())
DEFAULT_ME_BINARY = default_me_binary(DEFAULT_APP)
DEFAULT_ACCOUNT_FILE = Path.home() / ".jd_me_account"
NATIVE_BRIDGE = Path(__file__).with_name("jd_me_native_bridge.js")
RUNNING_BRIDGE_URL = "http://127.0.0.1:18991"
SQLITE_MAGIC = b"SQLite format 3\x00"
MAX_SCAN_BYTES = 16 * 1024 * 1024
REDACTION_PATTERNS = [
    (re.compile(r"(-u\s+[^:\s]+:)[^\s'\"`]+"), r"\1[REDACTED]"),
    (re.compile(r"(?i)(authorization\s*[:=]\s*bearer\s+)[^\s'\"`]+"), r"\1[REDACTED]"),
    (re.compile(r"(?i)((?:token|password|passwd|secret|key)\s*[:=]\s*)[^\s,'\"`&]+"), r"\1[REDACTED]"),
]


def _clean_for_json(value: Any) -> Any:
    if isinstance(value, str):
        # Some JD ME logs contain lone UTF-16 surrogate code points after the
        # extra unicode_escape decode. They cannot be written to UTF-8 stdout;
        # replace them instead of aborting the whole read.
        return value.encode("utf-8", "replace").decode("utf-8")
    if isinstance(value, dict):
        return {k: _clean_for_json(v) for k, v in value.items()}
    if isinstance(value, list):
        return [_clean_for_json(v) for v in value]
    return value


def to_json_line(payload: dict[str, Any]) -> str:
    return json.dumps(_clean_for_json(payload), ensure_ascii=False, sort_keys=True) + "\n"



def bundle_identifier(app_path: Path = DEFAULT_APP) -> str | None:
    if not IS_MACOS:
        return None
    info = app_path / "Contents" / "Info.plist"
    if not info.exists():
        return None
    try:
        result = subprocess.run(
            ["defaults", "read", str(info.with_suffix("")), "CFBundleIdentifier"],
            check=False,
            capture_output=True,
            text=True,
        )
    except OSError:
        return None
    value = result.stdout.strip()
    return value or None


def discover_account_pins(support_root: Path = DEFAULT_SUPPORT_ROOT) -> list[str]:
    data_root = support_root / "data" / "ee"
    if not data_root.exists():
        return []
    accounts = []
    for path in data_root.iterdir():
        if not path.is_dir() or path.name == "export":
            continue
        if (path / "chat.data").exists() or (path / "session.data").exists() or (path / "file").exists():
            accounts.append(path.name)
    return sorted(accounts)


def discover_log_account_pins(log_root: Path = DEFAULT_LOG_ROOT) -> list[str]:
    if not log_root.exists():
        return []
    accounts: list[str] = []
    for path in log_root.iterdir():
        if not path.is_dir():
            continue
        if (path / "renderer.log").exists() or (path / "sdk-event.log").exists():
            accounts.append(path.name)
    return sorted(accounts)


def _safe_mtime(path: Path) -> int:
    try:
        return int(path.stat().st_mtime) if path.exists() else 0
    except OSError:
        return 0


def _latest_mtime(paths: Iterable[Path]) -> int:
    return max((_safe_mtime(path) for path in paths), default=0)


def _account_activity(account: str, support_roots: Iterable[Path], log_roots: Iterable[Path]) -> dict[str, Any]:
    data_paths: list[Path] = []
    log_paths: list[Path] = []
    support_hits: list[str] = []
    log_hits: list[str] = []
    has_chat = False
    has_session = False
    has_file_dir = False

    for root in support_roots:
        account_root = root.expanduser() / "data" / "ee" / account
        chat = account_root / "chat.data"
        session = account_root / "session.data"
        file_dir = account_root / "file"
        if chat.exists() or session.exists() or file_dir.exists():
            support_hits.append(str(root.expanduser()))
        if chat.exists():
            has_chat = True
        if session.exists():
            has_session = True
        if file_dir.exists():
            has_file_dir = True
        data_paths.extend([
            chat,
            session,
            account_root / "chat.data-wal",
            account_root / "session.data-wal",
        ])
        if file_dir.exists():
            data_paths.append(file_dir)

    for root in log_roots:
        account_log_root = root.expanduser() / account
        candidates = [
            account_log_root / "sdk-event.log",
            account_log_root / "renderer.log",
            account_log_root / "main.log",
        ]
        if account_log_root.exists():
            candidates.extend(account_log_root.glob("sdk-event.*.log"))
            candidates.extend(account_log_root.glob("renderer.*.log"))
            candidates.extend(account_log_root.glob("main.*.log"))
        if any(path.exists() for path in candidates):
            log_hits.append(str(root.expanduser()))
            log_paths.extend(candidates)

    latest_data_mtime = _latest_mtime(data_paths)
    latest_log_mtime = _latest_mtime(log_paths)
    latest_mtime = max(latest_data_mtime, latest_log_mtime)
    has_logs = bool(log_hits)
    username = os.environ.get("USERNAME") or Path.home().name
    username_match = account.casefold() == username.casefold()

    # Weighted only for tie-breaking diagnostics. Selection primarily uses the
    # tuple below so real JD ME data and recent activity beat Windows username.
    score = 0
    if has_chat:
        score += 100
    if has_session:
        score += 80
    if has_logs:
        score += 40
    if has_file_dir:
        score += 10
    if username_match:
        score += 1

    return {
        "account": account,
        "score": score,
        "has_chat_data": has_chat,
        "has_session_data": has_session,
        "has_file_dir": has_file_dir,
        "has_logs": has_logs,
        "username_match": username_match,
        "latest_data_mtime": latest_data_mtime,
        "latest_log_mtime": latest_log_mtime,
        "latest_mtime": latest_mtime,
        "support_roots": support_hits,
        "log_roots": log_hits,
    }


def recommend_account(
    support_roots: Iterable[Path] | None = None,
    log_roots: Iterable[Path] | None = None,
) -> dict[str, Any]:
    support_roots = list(support_roots or support_root_candidates())
    log_roots = list(log_roots or log_root_candidates())

    accounts: set[str] = set()
    for root in support_roots:
        accounts.update(discover_account_pins(root))
    for root in log_roots:
        accounts.update(discover_log_account_pins(root))

    activities = [_account_activity(account, support_roots, log_roots) for account in sorted(accounts)]
    activities.sort(
        key=lambda item: (
            bool(item["has_chat_data"]),
            bool(item["has_session_data"]),
            bool(item["has_logs"]),
            int(item["latest_mtime"] or 0),
            bool(item["username_match"]),
            item["account"],
        ),
        reverse=True,
    )

    if not activities:
        return {"account": None, "confidence": "none", "reason": "no local JD ME account data or logs found", "candidates": []}

    if len(activities) == 1:
        only = activities[0]
        return {"account": only["account"], "confidence": "single", "reason": "only local JD ME account found", "candidates": activities}

    top = activities[0]
    second = activities[1]
    top_key = (top["has_chat_data"], top["has_session_data"], top["has_logs"], top["latest_mtime"])
    second_key = (second["has_chat_data"], second["has_session_data"], second["has_logs"], second["latest_mtime"])
    if top_key != second_key:
        return {
            "account": top["account"],
            "confidence": "activity",
            "reason": "selected by JD ME data/log activity and latest modification time",
            "candidates": activities,
        }

    username_matches = [item for item in activities if item["username_match"]]
    if len(username_matches) == 1:
        return {
            "account": username_matches[0]["account"],
            "confidence": "username_tiebreaker",
            "reason": "activity was tied; selected the account matching the Windows/macOS username",
            "candidates": activities,
        }

    return {
        "account": None,
        "confidence": "ambiguous",
        "reason": "multiple local JD ME accounts have similar activity; pass --account <pin> if this guess is wrong",
        "candidates": activities,
    }


def preferred_support_root_for_account(account: str, support_roots: Iterable[Path] | None = None) -> Path | None:
    candidates: list[tuple[bool, bool, int, str, Path]] = []
    for root in support_roots or support_root_candidates():
        expanded = root.expanduser()
        account_root = expanded / "data" / "ee" / account
        chat = account_root / "chat.data"
        session = account_root / "session.data"
        file_dir = account_root / "file"
        if not (chat.exists() or session.exists() or file_dir.exists()):
            continue
        latest = _latest_mtime([chat, session, account_root / "chat.data-wal", account_root / "session.data-wal", file_dir])
        candidates.append((chat.exists(), session.exists(), latest, str(expanded), expanded))
    if not candidates:
        return None
    candidates.sort(reverse=True)
    return candidates[0][4]


def read_default_account(account_file: Path = DEFAULT_ACCOUNT_FILE) -> str | None:
    try:
        text = account_file.read_text(encoding="utf-8").strip()
    except OSError:
        return None
    if not text:
        return None
    if text.startswith("{"):
        try:
            data = json.loads(text)
        except json.JSONDecodeError:
            data = {}
        for key in ("account", "pin", "self_pin"):
            value = data.get(key) if isinstance(data, dict) else None
            if isinstance(value, str) and value.strip():
                return value.strip()
    for line in text.splitlines():
        line = line.strip()
        if line and not line.startswith("#"):
            return line.split()[0]
    return None


def resolve_account(
    account: str | None,
    auto: bool = False,
    support_root: Path = DEFAULT_SUPPORT_ROOT,
    account_file: Path = DEFAULT_ACCOUNT_FILE,
    support_roots: Iterable[Path] | None = None,
    log_roots: Iterable[Path] | None = None,
) -> str:
    if account:
        return account
    if not auto:
        raise ValueError("missing --account. Pass --account <pin>, or use --auto to select the active local JD ME account.")
    configured = read_default_account(account_file)
    if configured:
        return configured

    support_roots = list(support_roots or [support_root])
    log_roots = list(log_roots or log_root_candidates())
    recommendation = recommend_account(support_roots=support_roots, log_roots=log_roots)
    recommended = recommendation.get("account")
    if isinstance(recommended, str) and recommended:
        return recommended

    candidates = [item.get("account") for item in recommendation.get("candidates", []) if item.get("account")]
    if candidates:
        raise ValueError(
            "cannot auto-select account because multiple local JD ME accounts are ambiguous: "
            + ", ".join(str(item) for item in candidates)
            + ". Pass --account <pin> if needed. Reason: "
            + str(recommendation.get("reason") or "ambiguous candidates")
        )
    raise ValueError("cannot auto-select account: no local JD ME account data or logs found. Pass --account <pin> or --support-root/--log-root if JD ME stores data elsewhere.")


def ensure_account(args: argparse.Namespace) -> str:
    explicit_support_root = getattr(args, "support_root", None)
    support_root = Path(explicit_support_root) if explicit_support_root else DEFAULT_SUPPORT_ROOT
    try:
        account = resolve_account(
            getattr(args, "account", None),
            getattr(args, "auto", False),
            support_root=support_root,
            support_roots=[support_root] if explicit_support_root else support_root_candidates(),
            log_roots=log_root_candidates(),
        )
    except ValueError as exc:
        raise SystemExit(str(exc)) from exc
    args.account = account
    if not explicit_support_root and hasattr(args, "support_root"):
        recommended_support_root = preferred_support_root_for_account(account, support_root_candidates())
        if recommended_support_root is not None:
            args.support_root = str(recommended_support_root)
    return account


def discover_paths() -> dict[str, Any]:
    support_candidates = support_root_candidates()
    log_candidates = log_root_candidates()
    app_roots = app_candidates()
    sqlcipher_roots = sqlcipher_candidates()
    sqlcipher_dll_roots = sqlcipher_dll_candidates()

    accounts_by_support_root = []
    for root in support_candidates:
        accounts = discover_account_pins(root)
        if root.exists() or accounts:
            accounts_by_support_root.append({"path": str(root), "exists": root.exists(), "accounts": accounts})

    log_roots = []
    for root in log_candidates:
        log_accounts = []
        if root.exists():
            log_accounts = discover_log_account_pins(root)
        if root.exists() or log_accounts:
            log_roots.append({"path": str(root), "exists": root.exists(), "accounts": log_accounts})

    account_recommendation = recommend_account(support_roots=support_candidates, log_roots=log_candidates)

    return {
        "platform": "windows" if IS_WINDOWS else ("macos" if IS_MACOS else sys.platform),
        "app": {
            "path": str(DEFAULT_APP),
            "exists": DEFAULT_APP.exists(),
            "bundle_id": bundle_identifier(DEFAULT_APP),
            "candidates": [{"path": str(path), "exists": path.exists()} for path in app_roots],
        },
        "me_binary": {"path": str(DEFAULT_ME_BINARY), "exists": DEFAULT_ME_BINARY.exists()},
        "support_root": str(DEFAULT_SUPPORT_ROOT),
        "support_root_exists": DEFAULT_SUPPORT_ROOT.exists(),
        "support_root_candidates": [{"path": str(path), "exists": path.exists()} for path in support_candidates],
        "electron_root": str(DEFAULT_ELECTRON_ROOT),
        "electron_root_exists": DEFAULT_ELECTRON_ROOT.exists(),
        "electron_root_candidates": [{"path": str(path), "exists": path.exists()} for path in electron_root_candidates()],
        "log_root": str(DEFAULT_LOG_ROOT),
        "log_root_exists": DEFAULT_LOG_ROOT.exists(),
        "log_root_candidates": [{"path": str(path), "exists": path.exists()} for path in log_candidates],
        "sqlcipher": {"path": str(BUNDLED_SQLCIPHER), "exists": BUNDLED_SQLCIPHER.exists()},
        "sqlcipher_candidates": [{"path": str(path), "exists": path.exists()} for path in sqlcipher_roots],
        "sqlcipher_dll_candidates": [{"path": str(path), "exists": path.exists(), "note": "Windows DLL fallback candidate for read-only database queries"} for path in sqlcipher_dll_roots],
        "accounts": discover_account_pins(DEFAULT_SUPPORT_ROOT),
        "accounts_by_support_root": accounts_by_support_root,
        "log_accounts": [item for root in log_roots for item in root["accounts"]],
        "log_roots": log_roots,
        "recommended_account": account_recommendation.get("account"),
        "account_recommendation": account_recommendation,
    }


def _is_sqlite_openable(path: Path) -> bool:
    try:
        with path.open("rb") as handle:
            if handle.read(len(SQLITE_MAGIC)) != SQLITE_MAGIC:
                return False
        uri = f"file:{path}?mode=ro&immutable=1"
        with sqlite3.connect(uri, uri=True) as conn:
            conn.execute("select name from sqlite_master limit 1").fetchall()
        return True
    except (OSError, sqlite3.DatabaseError):
        return False


def _preview_text(path: Path, max_chars: int = 240) -> str:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return ""
    return redact_text(" ".join(text[:max_chars].split()))


class ExportHtmlParser(HTMLParser):
    def __init__(self) -> None:
        super().__init__()
        self._in_cell = False
        self._cell_parts: list[str] = []
        self._row: list[str] = []
        self.rows: list[list[str]] = []

    def handle_starttag(self, tag: str, attrs: list[tuple[str, str | None]]) -> None:
        if tag.lower() in {"td", "th"}:
            self._in_cell = True
            self._cell_parts = []

    def handle_data(self, data: str) -> None:
        if self._in_cell:
            self._cell_parts.append(data)

    def handle_endtag(self, tag: str) -> None:
        lowered = tag.lower()
        if lowered in {"td", "th"} and self._in_cell:
            self._row.append(" ".join("".join(self._cell_parts).split()))
            self._in_cell = False
            self._cell_parts = []
        elif lowered == "tr":
            if any(cell for cell in self._row):
                self.rows.append(self._row)
            self._row = []


def parse_exported_html(path: Path, limit: int | None = 100) -> list[dict[str, Any]]:
    try:
        text = path.read_text(encoding="utf-8", errors="replace")
    except OSError:
        return []
    parser = ExportHtmlParser()
    parser.feed(text)
    rows = parser.rows if limit is None else parser.rows[:limit]
    records = []
    for index, row in enumerate(rows, start=1):
        records.append({"index": index, "cells": [redact_text(cell) for cell in row]})
    return records


def redact_text(text: str) -> str:
    redacted = text
    for pattern, replacement in REDACTION_PATTERNS:
        redacted = pattern.sub(replacement, redacted)
    return redacted


def inspect_history_sources(root: Path = DEFAULT_SUPPORT_ROOT, limit: int = 20) -> dict[str, Any]:
    root = root.expanduser()
    chat_databases = []
    for path in sorted(root.rglob("chat.data*")) if root.exists() else []:
        if not path.is_file():
            continue
        status = "sqlite_openable" if _is_sqlite_openable(path) else "encrypted_or_unknown"
        chat_databases.append(
            {
                "path": str(path),
                "size": path.stat().st_size,
                "mtime": int(path.stat().st_mtime),
                "status": status,
            }
        )

    exported_text_files = []
    text_candidates = []
    for file_root in sorted(root.glob("data/ee/*/file")) if root.exists() else []:
        text_candidates.extend(path for path in file_root.glob("*.txt") if path.is_file())
    for path in sorted(text_candidates, key=lambda item: item.stat().st_mtime, reverse=True)[:limit]:
        exported_text_files.append(
            {
                "path": str(path),
                "size": path.stat().st_size,
                "mtime": int(path.stat().st_mtime),
                "preview": _preview_text(path),
            }
        )

    return {
        "root": str(root),
        "root_exists": root.exists(),
        "chat_databases": chat_databases[:limit],
        "exported_text_files": exported_text_files,
        "note": (
            "chat.data files that are not sqlite_openable are treated as encrypted or unknown; "
            "this tool does not extract runtime keys or modify JD ME."
        ),
    }


def _terms(query: str, aliases: Iterable[str] | None = None) -> list[str]:
    values = [query]
    if aliases:
        values.extend(alias for alias in aliases if alias)
    seen = set()
    result = []
    for value in values:
        lowered = value.lower()
        if lowered not in seen:
            seen.add(lowered)
            result.append(value)
    return result


def _contains_term(text: str, terms: list[str]) -> bool:
    lowered = text.lower()
    return any(term.lower() in lowered for term in terms)


def _snippet(line: str, terms: list[str], width: int = 320) -> str:
    compact = " ".join(line.strip().split())
    lowered = compact.lower()
    indexes = [lowered.find(term.lower()) for term in terms if term and lowered.find(term.lower()) >= 0]
    if not indexes:
        return redact_text(compact[:width])
    start = max(0, min(indexes) - width // 3)
    return redact_text(compact[start : start + width])


def _scan_text_file(path: Path, terms: list[str], kind: str, limit: int) -> list[dict[str, Any]]:
    if not path.is_file():
        return []
    try:
        stat = path.stat()
    except OSError:
        return []
    if stat.st_size > MAX_SCAN_BYTES and kind != "log":
        return []

    matches = []
    try:
        with path.open("r", encoding="utf-8", errors="replace") as handle:
            for line_number, line in enumerate(handle, start=1):
                if not _contains_term(line, terms):
                    continue
                matches.append(
                    {
                        "kind": kind,
                        "path": str(path),
                        "line": line_number,
                        "mtime": int(stat.st_mtime),
                        "snippet": _snippet(line, terms),
                    }
                )
                if len(matches) >= limit:
                    break
    except OSError:
        return []
    return matches


SESSION_ID_RE = re.compile(r"[\w.:-]+:ee:[\w.:-]+:ee")


def _extract_session_ids(text: str, terms: list[str]) -> list[str]:
    session_ids = []
    for match in SESSION_ID_RE.findall(text):
        if _contains_term(match, terms):
            session_ids.append(match)
    return session_ids


def _scan_session_ids(paths: Iterable[Path], terms: list[str], max_ids: int = 50) -> list[str]:
    session_ids: list[str] = []
    for path in paths:
        if not path.is_file():
            continue
        try:
            with path.open("r", encoding="utf-8", errors="replace") as handle:
                for line in handle:
                    if _contains_term(line, terms):
                        session_ids.extend(_extract_session_ids(line, terms))
                        if len(set(session_ids)) >= max_ids:
                            return sorted(set(session_ids))
        except OSError:
            continue
    return sorted(set(session_ids))


def query_contact(
    query: str,
    aliases: Iterable[str] | None = None,
    support_root: Path = DEFAULT_SUPPORT_ROOT,
    log_root: Path = DEFAULT_LOG_ROOT,
    account: str | None = None,
    limit: int = 50,
) -> dict[str, Any]:
    terms = _terms(query, aliases)
    support_root = support_root.expanduser()
    log_root = log_root.expanduser()
    matches: list[dict[str, Any]] = []
    session_ids: list[str] = []

    history = inspect_history_sources(support_root, limit=limit)

    file_roots = sorted(support_root.glob("data/ee/*/file")) if support_root.exists() else []
    for file_root in file_roots:
        for path in sorted(file_root.glob("*.txt"), key=lambda item: item.stat().st_mtime, reverse=True):
            if len(matches) >= limit:
                break
            if _contains_term(path.name, terms):
                matches.append(
                    {
                        "kind": "exported_text",
                        "path": str(path),
                        "line": 0,
                        "mtime": int(path.stat().st_mtime),
                        "snippet": f"{path.name}: {_preview_text(path)}",
                    }
                )
            remaining = max(0, limit - len(matches))
            if remaining:
                matches.extend(_scan_text_file(path, terms, "exported_text", remaining))

    log_dirs = [log_root / account] if account else [path for path in sorted(log_root.iterdir()) if path.is_dir()] if log_root.exists() else []
    log_paths = []
    for log_dir in log_dirs:
        log_paths.extend(sorted(log_dir.glob("*.log")))

    session_ids.extend(_scan_session_ids(log_paths, terms))

    for path in log_paths:
        if len(matches) >= limit:
            break
        remaining = max(0, limit - len(matches))
        for match in _scan_text_file(path, terms, "log", remaining):
            matches.append(match)
            session_ids.extend(_extract_session_ids(match["snippet"], terms))

    return {
        "query": query,
        "aliases": [term for term in terms if term != query],
        "support_root": str(support_root),
        "log_root": str(log_root),
        "account": account,
        "session_ids": sorted(set(session_ids)),
        "matches": matches[:limit],
        "chat_databases": history["chat_databases"],
        "note": (
            "Matches come from readable exports and logs. Current chat.data entries may contain "
            "the authoritative chat history, but encrypted_or_unknown files are not decoded by this tool."
        ),
    }


def run_native_bridge(command: str, payload: dict[str, Any] | None = None, timeout: float = 75) -> dict[str, Any]:
    if not DEFAULT_ME_BINARY.exists():
        return {"ok": False, "error": f"ME binary not found: {DEFAULT_ME_BINARY}"}
    if not NATIVE_BRIDGE.exists():
        return {"ok": False, "error": f"native bridge not found: {NATIVE_BRIDGE}"}
    env = os.environ.copy()
    env["ELECTRON_RUN_AS_NODE"] = "1"
    try:
        result = subprocess.run(
            [str(DEFAULT_ME_BINARY), str(NATIVE_BRIDGE), command, json.dumps(payload or {}, ensure_ascii=False)],
            check=False,
            capture_output=True,
            text=True,
            timeout=timeout,
            env=env,
        )
    except (OSError, subprocess.TimeoutExpired) as error:
        return {"ok": False, "error": str(error)}

    lines = [line for line in result.stdout.splitlines() if line.strip()]
    parsed: dict[str, Any]
    if not lines:
        parsed = {"ok": False, "error": "native bridge produced no JSON output"}
    else:
        try:
            parsed = json.loads(lines[-1])
        except json.JSONDecodeError as error:
            parsed = {"ok": False, "error": f"invalid native bridge JSON: {error}", "stdout": result.stdout}
    parsed.setdefault("returncode", result.returncode)
    if result.stderr.strip():
        parsed["stderr"] = result.stderr.strip()
    return parsed


def run_running_bridge(
    command: str,
    payload: dict[str, Any] | None = None,
    timeout: float = 75,
    base_url: str = RUNNING_BRIDGE_URL,
) -> dict[str, Any]:
    path_by_command = {
        "info": "/info",
        "search-session": "/search-session",
        "export-session": "/export-session",
    }
    path = path_by_command.get(command)
    if not path:
        return {"ok": False, "error": f"unsupported running bridge command: {command}"}
    body = json.dumps(payload or {}, ensure_ascii=False).encode("utf-8")
    req = urlrequest.Request(
        base_url.rstrip("/") + path,
        data=body,
        headers={"content-type": "application/json; charset=utf-8"},
        method="POST",
    )
    try:
        with urlrequest.urlopen(req, timeout=timeout) as response:
            text = response.read().decode("utf-8", errors="replace")
    except (OSError, urlerror.URLError) as error:
        return {"ok": False, "error": str(error), "bridge": "running", "base_url": base_url}
    try:
        data = json.loads(text)
    except json.JSONDecodeError as error:
        return {
            "ok": False,
            "error": f"invalid running bridge JSON: {error}",
            "stdout": text,
            "bridge": "running",
            "base_url": base_url,
        }
    return {"ok": bool(data.get("ok")), "data": data, "bridge": "running", "base_url": base_url}


def bridge_runner(mode: str = "auto", running_url: str = RUNNING_BRIDGE_URL):
    def runner(command: str, payload: dict[str, Any] | None = None, timeout: float = 75) -> dict[str, Any]:
        if mode == "running":
            return run_running_bridge(command, payload, timeout, running_url)
        if mode == "native":
            return run_native_bridge(command, payload, timeout)
        running = run_running_bridge(command, payload, min(timeout, 5), running_url)
        if running.get("ok"):
            return running
        native = run_native_bridge(command, payload, timeout)
        native.setdefault("running_bridge_error", running.get("error"))
        return native

    return runner


def _message_records_from_search(search_result: dict[str, Any], limit: int | None) -> list[dict[str, Any]]:
    event_data = (
        search_result.get("data", {})
        .get("result", {})
        .get("event", {})
        .get("event_data", {})
    )
    messages = event_data.get("messages") if isinstance(event_data, dict) else None
    if not isinstance(messages, list):
        return []
    selected = messages if limit is None else messages[:limit]
    return [message for message in selected if isinstance(message, dict)]


def _export_paths_from_result(export_result: dict[str, Any]) -> list[Path]:
    event_data = (
        export_result.get("data", {})
        .get("result", {})
        .get("event", {})
        .get("event_data", {})
    )
    export_path = event_data.get("exportPath") if isinstance(event_data, dict) else None
    if not export_path:
        return []
    root = Path(export_path)
    if root.is_file():
        return [root]
    if root.is_dir():
        return sorted(root.glob("*.html"))
    return []


def _decode_js_single_quoted(value: str) -> str:
    value = value.replace(r"\'", "'")
    value = value.replace(r"\\", "\\")
    value = value.replace(r"\n", "\n").replace(r"\r", "\r").replace(r"\t", "\t")
    return value


def _extract_js_string_concat(lines: list[str], start: int) -> tuple[str | None, int]:
    first = lines[start]
    index = first.find("'")
    if index < 0:
        return None, start
    text = first[index:]
    end = start
    for line_index in range(start + 1, min(len(lines), start + 80)):
        if re.search(r"['\"]\s*,\s*$", lines[line_index - 1]) or re.search(r"['\"]\s*}\s*,?\s*$", lines[line_index - 1]):
            break
        if re.search(r"['\"]\s*\+\s*$", lines[line_index - 1]):
            text += "\n" + lines[line_index].strip()
            end = line_index
            continue
        break

    parts = re.findall(r"'((?:\\'|[^'])*)'", text)
    if not parts:
        return None, end
    return "".join(_decode_js_single_quoted(part) for part in parts), end


def _log_files(log_root: Path, account: str | None) -> list[Path]:
    roots = [log_root / account] if account else [path for path in log_root.iterdir() if path.is_dir()] if log_root.exists() else []
    files: list[Path] = []
    for root in roots:
        files.extend(path for path in root.glob("main*.log") if path.is_file())
        files.extend(path for path in root.glob("renderer*.log") if path.is_file())
    return sorted(files, key=lambda path: path.stat().st_mtime if path.exists() else 0, reverse=True)


def collect_log_preview_records(
    session_ids: Iterable[str],
    log_root: Path = DEFAULT_LOG_ROOT,
    account: str | None = None,
    limit: int | None = 100,
) -> list[dict[str, Any]]:
    wanted = {session_id for session_id in session_ids if session_id}
    if not wanted:
        return []
    records: list[dict[str, Any]] = []
    seen: set[tuple[str, str, int | None]] = set()
    for path in _log_files(log_root, account):
        try:
            lines = path.read_text(encoding="utf-8", errors="replace").splitlines()
        except OSError:
            continue
        hit_indexes = [index for index, line in enumerate(lines) if any(session_id in line for session_id in wanted)]
        for hit_index in hit_indexes:
            block_start = None
            for index in range(hit_index, max(-1, hit_index - 30), -1):
                if "MessageViewer" in lines[index] and "start open" in lines[index]:
                    block_start = index
                    break
            if block_start is None:
                continue
            end_index = min(len(lines), block_start + 700)
            cursor = block_start
            while cursor < end_index:
                line = lines[cursor]
                if "content:" not in line and "summary:" not in line:
                    cursor += 1
                    continue
                field = "content" if "content:" in line else "summary"
                text, end = _extract_js_string_concat(lines, cursor)
                cursor = max(end + 1, cursor + 1)
                if not text or text == "null":
                    continue
                before_context = "\n".join(lines[max(block_start, cursor - 45) : cursor])
                context = before_context + "\n" + "\n".join(lines[cursor : min(end_index, cursor + 10)])
                sender = None
                sender_matches = list(re.finditer(r"sender:\s*\{\s*app:\s*'([^']+)',\s*pin:\s*'([^']+)'\s*\}", before_context))
                sender_match = sender_matches[-1] if sender_matches else None
                if sender_match:
                    sender = {"app": sender_match.group(1), "pin": sender_match.group(2)}
                timestamp = None
                timestamp_matches = list(re.finditer(r"timestamp:\s*(\d+)", before_context))
                timestamp_match = timestamp_matches[-1] if timestamp_matches else None
                if timestamp_match:
                    timestamp = int(timestamp_match.group(1))
                key = (field, text, timestamp)
                if key in seen:
                    continue
                seen.add(key)
                records.append(
                    {
                        "source": "im_log",
                        "field": field,
                        "path": str(path),
                        "line": cursor,
                        "timestamp": timestamp,
                        "sender": sender,
                        "content": redact_text(text),
                    }
                )
                if limit is not None and len(records) >= limit:
                    return records
    return records


def preview_contact(
    query: str,
    aliases: Iterable[str] | None = None,
    support_root: Path = DEFAULT_SUPPORT_ROOT,
    log_root: Path = DEFAULT_LOG_ROOT,
    account: str | None = None,
    limit: int | None = 100,
    native_runner=run_native_bridge,
) -> dict[str, Any]:
    evidence = query_contact(
        query,
        aliases=aliases,
        support_root=support_root,
        log_root=log_root,
        account=account,
        limit=100,
    )
    session_ids = list(evidence["session_ids"])
    if account and not session_ids and re.fullmatch(r"[\w.:-]+", query):
        session_ids.append(f"{account}:ee:{query}:ee")

    info = native_runner("info", {})
    current_account = (info.get("data") or {}).get("currentAccount") if info.get("ok") else None
    has_logged_in_context = bool(isinstance(current_account, dict) and current_account.get("pin"))

    records: list[dict[str, Any]] = []
    export_files: list[dict[str, Any]] = []
    search_result: dict[str, Any] | None = None
    export_result: dict[str, Any] | None = None

    if session_ids:
        count = 10000 if limit is None else max(limit, 1)
        search_result = native_runner(
            "search-session",
            {"sessions": session_ids, "key": "", "count": count, "timeoutMs": 15000},
            timeout=20,
        )
        records.extend(_message_records_from_search(search_result, limit))

        if not records:
            export_result = native_runner(
                "export-session",
                {"sessions": session_ids, "eventName": "codex-im-preview", "timeoutMs": 60000},
                timeout=70,
            )
            for path in _export_paths_from_result(export_result):
                parsed_records = parse_exported_html(path, limit)
                export_files.append(
                    {
                        "path": str(path),
                        "size": path.stat().st_size if path.exists() else 0,
                        "records": len(parsed_records),
                    }
                )
                records.extend(parsed_records)

    if records:
        status = "ok"
    elif not session_ids:
        status = "session_not_found"
    elif not has_logged_in_context:
        status = "sdk_context_unavailable"
    else:
        status = "no_records_from_sdk"

    log_preview_records: list[dict[str, Any]] = []
    if not records and session_ids:
        log_preview_records = collect_log_preview_records(session_ids, log_root=log_root, account=account, limit=limit)
        if log_preview_records:
            records.extend(log_preview_records)
            status = "ok_log_preview"

    return {
        "query": query,
        "aliases": evidence["aliases"],
        "account": account,
        "status": status,
        "mode": "im_chat_history_preview",
        "scope": "all_records_requested" if limit is None else f"latest_{limit}",
        "session_ids": sorted(set(session_ids)),
        "current_account": current_account,
        "records": records if limit is None else records[:limit],
        "record_count": len(records if limit is None else records[:limit]),
        "log_preview_count": len(log_preview_records),
        "export_files": export_files,
        "evidence": {
            "matches": evidence["matches"],
            "chat_databases": evidence["chat_databases"],
        },
        "diagnostics": {
            "native_info": info,
            "search_result": search_result,
            "export_result": export_result,
            "note": (
                "preview uses JD ME native IM SDK commands. If current_account.pin is empty, "
                "the standalone SDK bridge loaded successfully but did not inherit the running app's login context."
            ),
        },
    }


LOG_PREFIX_RE = re.compile(r"^\[(?P<timestamp>[^\]]+)\]\s+\[[^\]]+\]\s+\([^)]*\)\s+(?P<body>.*)$")


def _extract_json_after(marker: str, body: str) -> Any | None:
    index = body.find(marker)
    if index < 0:
        return None
    payload = body[index + len(marker) :].strip()
    decoder = json.JSONDecoder()
    try:
        obj, _ = decoder.raw_decode(payload)
        return obj
    except json.JSONDecodeError:
        return None


def parse_renderer_log_line(line: str) -> dict[str, Any] | None:
    match = LOG_PREFIX_RE.match(line.strip())
    if not match:
        return None
    timestamp = match.group("timestamp")
    body = match.group("body")

    message_payload = _extract_json_after("message/subscriptions/onGetDocInfo", body)
    if isinstance(message_payload, dict):
        param = message_payload.get("param") if isinstance(message_payload.get("param"), dict) else {}
        push_content = param.get("pushContent") if isinstance(param, dict) else None
        return {
            "kind": "message",
            "timestamp": timestamp,
            "sessionId": message_payload.get("sessionId"),
            "sessionType": message_payload.get("sessionType"),
            "uuid": message_payload.get("uuid"),
            "content": message_payload.get("content"),
            "pushContent": push_content,
            "from": message_payload.get("from"),
            "to": message_payload.get("to"),
            "raw": message_payload,
        }

    sessions = _extract_json_after("session/subscriptions/updateSessions", body)
    if isinstance(sessions, list):
        return {
            "kind": "session_update",
            "timestamp": timestamp,
            "sessions": sessions,
        }

    selected = _extract_json_after("selectedSession:", body)
    if isinstance(selected, dict):
        last_msg = selected.get("lastMsg") if isinstance(selected.get("lastMsg"), dict) else {}
        sender = last_msg.get("sender") if isinstance(last_msg.get("sender"), dict) else {}
        return {
            "kind": "session_detail",
            "timestamp": timestamp,
            "sessionId": selected.get("id"),
            "sessionType": selected.get("sessionType"),
            "name": selected.get("name"),
            "hasAtMe": selected.get("hasAtMe"),
            "hasAtAll": selected.get("hasAtAll"),
            "atMe": selected.get("atMe"),
            "unreadCount": selected.get("unreadCount"),
            "unreadAtCount": selected.get("unreadAtCount"),
            "lastMsgContent": last_msg.get("content"),
            "lastMsgSenderPin": sender.get("pin"),
            "raw": selected,
        }

    return None


def iter_existing_events(paths: Iterable[Path]) -> Iterable[dict[str, Any]]:
    for path in paths:
        if not path.exists():
            continue
        with path.open("r", encoding="utf-8", errors="replace") as handle:
            for line in handle:
                event = parse_renderer_log_line(line)
                if event:
                    event["source"] = str(path)
                    yield event


def follow_events(paths: list[Path], from_start: bool, timeout: float | None) -> Iterable[dict[str, Any]]:
    handles = []
    deadline = time.time() + timeout if timeout is not None else None
    try:
        for path in paths:
            if not path.exists():
                continue
            handle = path.open("r", encoding="utf-8", errors="replace")
            if not from_start:
                handle.seek(0, os.SEEK_END)
            handles.append((path, handle))

        while handles:
            had_any_line = False
            for path, handle in handles:
                while True:
                    line = handle.readline()
                    if not line:
                        break
                    had_any_line = True
                    event = parse_renderer_log_line(line)
                    if event:
                        event["source"] = str(path)
                        yield event
                    if deadline is not None and time.time() >= deadline:
                        return
            if deadline is not None and time.time() >= deadline:
                return
            if not had_any_line:
                time.sleep(0.25)
    finally:
        for _, handle in handles:
            handle.close()


# ---------------------------------------------------------------------------
# sdk-event.log plaintext recovery
#
# JD ME's sdk-event log dumps live IM events such as `insertMessages`,
# `openChatResult`, and `loadMoreResult`. For text messages, the dumper writes
# the actual plaintext but does NOT JSON-escape embedded `"` characters and
# leaves a leading `*` sentinel, e.g.:
#
#   "body":{"actionInfo":null,"content":"*"hello \"world\"\n line2","identifyJoyspaceDocResultCode":3,...
#
# Strict JSON parsing fails. We recover the value by locating the unique
# `"body":{"actionInfo":null,"content":"*` prefix and reading until the
# adjacent sibling key `","identifyJoyspaceDocResultCode":`. Embedded
# `\"` / `\n` / `\\` escape pairs are decoded for display.
# ---------------------------------------------------------------------------

SDK_LOG_PREFIX_RE = re.compile(
    r"^\[(?P<timestamp>[^\]]+)\]\s+\[[^\]]+\]\s+im-sdk emit a event:\s+'(?P<event>[^']+)'\s+data:\s+(?P<payload>.*)$"
)
# Windows JD ME often writes plain sdk-event lines like:
#   [ts] [debug] openChatResult   [{...}]
#   [ts] [debug] identifyJoyspaceDoc   {...}
# The separator before JSON can be a Unicode space, so match any whitespace.
SDK_GENERIC_LOG_PREFIX_RE = re.compile(
    r"^\[(?P<timestamp>[^\]]+)\]\s+\[[^\]]+\]\s+(?P<event>[A-Za-z0-9_./:-]+)\s+(?P<payload>[\[{].*)$"
)
SDK_BODY_CONTENT_PREFIX = '"body":{"actionInfo":null,"content":"*'
# Possible sibling keys that may appear immediately after `content` inside a
# JD ME text body. Order doesn't matter; the earliest occurrence wins.
SDK_BODY_CONTENT_ANCHORS = (
    '","generateAiReply":',
    '","identifyJoyspaceDocResultCode":',
    '","mentions":',
    '","mt":',
    '","param":',
    '","translation":',
)
SDK_TEXT_EVENTS = (
    "insertMessages",
    "openChatResult",
    "openChatBySearchResult",
    "loadMoreResult",
    "updateMsgParam",
)
# Direction in which to scan for per-message fields (sessionId / sender /
# uuid / timestamp) relative to `body`. The JD ME serializer is
# event-dependent: in `insertMessages` and `updateMsgParam` the fields come
# BEFORE body; in `openChatResult` / `loadMoreResult` they come AFTER.
SDK_FIELDS_AFTER_BODY = {"openChatResult", "openChatBySearchResult", "loadMoreResult"}
SDK_MESSAGE_BOUNDARY_RE = re.compile(r'"body":\{"actionInfo":null,"content":"\*')
SDK_FIELD_PATTERNS = {
    "sessionId": re.compile(r'"sessionId":"([^"\\]+)"'),
    "senderPin": re.compile(r'"sender":\{[^}]*?"pin":"([^"\\]+)"'),
    "messageTimestampMs": re.compile(r'"timestamp":(\d{10,})'),
    "uuid": re.compile(r'"uuid":"([^"\\]+)"'),
}
SDK_MENTIONS_RE = re.compile(r'"mentions":(\[[^\]]*\])')


def _decode_jd_escape_pairs(value: str) -> str:
    return value.replace("\\n", "\n").replace("\\t", "\t").replace('\\"', '"').replace("\\\\", "\\")


def _decode_jd_text(value: Any) -> str | None:
    if not isinstance(value, str):
        return None
    if not value:
        return ""
    # Windows logs often contain a JSON string whose value is itself escaped,
    # e.g. "\\u0072\\u0065...". Decode that one extra layer while leaving
    # already-normal Chinese text alone.
    if any(token in value for token in ("\\u", "\\n", "\\t", '\\"')):
        try:
            return value.encode("utf-8").decode("unicode_escape")
        except UnicodeDecodeError:
            return _decode_jd_escape_pairs(value)
    return value


def _content_from_sdk_message(message: Any) -> str | None:
    if not isinstance(message, dict):
        return None
    body = message.get("body")
    if isinstance(body, dict):
        content = _decode_jd_text(body.get("content"))
        if content:
            return content
        param = body.get("param") if isinstance(body.get("param"), dict) else {}
        push = _decode_jd_text(param.get("pushContent")) if isinstance(param, dict) else None
        if push:
            return push
    content = _decode_jd_text(message.get("content"))
    if content:
        return content
    param = message.get("param") if isinstance(message.get("param"), dict) else {}
    push = _decode_jd_text(param.get("pushContent")) if isinstance(param, dict) else None
    if push:
        return push
    return None


def _sdk_message_to_event(message: Any, event_name: str, log_timestamp: str) -> dict[str, Any] | None:
    if not isinstance(message, dict):
        return None
    content = _content_from_sdk_message(message)
    if not content:
        return None
    sender = message.get("sender") if isinstance(message.get("sender"), dict) else None
    if sender is None:
        sender = message.get("from") if isinstance(message.get("from"), dict) else {}
    receiver = message.get("receiver") if isinstance(message.get("receiver"), dict) else None
    if receiver is None:
        receiver = message.get("to") if isinstance(message.get("to"), dict) else {}
    body = message.get("body") if isinstance(message.get("body"), dict) else {}
    mentions = body.get("mentions") if isinstance(body.get("mentions"), list) else []
    return {
        "kind": "sdk_text_message",
        "event": event_name,
        "timestamp": log_timestamp,
        "messageTimestampMs": message.get("timestamp"),
        "sessionId": message.get("sessionId"),
        "sessionType": message.get("sessionType"),
        "senderPin": sender.get("pin") if isinstance(sender, dict) else None,
        "receiverPin": receiver.get("pin") if isinstance(receiver, dict) else None,
        "uuid": message.get("uuid"),
        "mid": message.get("mid"),
        "content": content,
        "mentions": mentions,
    }


def _parse_json_sdk_payload(event_name: str, payload: str, log_timestamp: str) -> list[dict[str, Any]]:
    try:
        obj = json.loads(payload)
    except json.JSONDecodeError:
        return []
    messages = obj if isinstance(obj, list) else [obj]
    events: list[dict[str, Any]] = []
    for message in messages:
        event = _sdk_message_to_event(message, event_name, log_timestamp)
        if event:
            events.append(event)
    return events


def _iter_sdk_text_bodies_with_positions(line: str) -> list[tuple[int, str]]:
    """Return [(boundary_position, decoded_plaintext), ...] for each broken
    plaintext body in one line, in textual order. Masked-only bodies are skipped.
    """
    out: list[tuple[int, str]] = []
    start = 0
    while True:
        i = line.find(SDK_BODY_CONTENT_PREFIX, start)
        if i < 0:
            break
        body_start = i + len(SDK_BODY_CONTENT_PREFIX)
        best_j = -1
        best_anchor = ""
        for anchor in SDK_BODY_CONTENT_ANCHORS:
            j = line.find(anchor, body_start)
            if j >= 0 and (best_j < 0 or j < best_j):
                best_j = j
                best_anchor = anchor
        if best_j < 0:
            start = body_start
            continue
        raw = line[body_start:best_j]
        start = best_j + len(best_anchor)
        if raw == "" or raw == '"':
            continue
        if raw.startswith('"'):
            raw = raw[1:]
        if raw.endswith('"'):
            raw = raw[:-1]
        out.append((i, _decode_jd_escape_pairs(raw)))
    return out


def recover_sdk_text_bodies(line: str) -> list[str]:
    """Decoded plaintext contents (in order) from a single sdk-event.log line."""
    return [body for _, body in _iter_sdk_text_bodies_with_positions(line)]


def _field_for_each_body(
    pattern: re.Pattern,
    payload: str,
    body_positions: list[int],
    fields_after_body: bool,
) -> list[str | None]:
    """For each body position, return the per-message field value.

    Each message occupies a contiguous span in the payload. Bodies appear
    inside those spans, and the per-message fields (sessionId / sender /
    uuid / timestamp) sit either before or after the body depending on
    event kind.

    When `fields_after_body` is True the field must lie between this body
    and the NEXT body (or end of payload). When False it lies between the
    PREVIOUS body (or start of payload) and this body.
    """
    out: list[str | None] = []
    for idx, body_pos in enumerate(body_positions):
        if fields_after_body:
            window_start = body_pos
            window_end = body_positions[idx + 1] if idx + 1 < len(body_positions) else len(payload)
            m = pattern.search(payload, window_start, window_end)
            out.append(m.group(1) if m else None)
        else:
            window_start = body_positions[idx - 1] if idx > 0 else 0
            window_end = body_pos
            best: str | None = None
            for m in pattern.finditer(payload, window_start, window_end):
                best = m.group(1)
            out.append(best)
    return out


def parse_sdk_event_line(line: str) -> list[dict[str, Any]]:
    """Parse one sdk-event.log line into recovered text-message events.

    Supports both macOS-style `im-sdk emit a event: ... data: ...` lines and
    Windows-style `[debug] openChatResult {...}` / `identifyJoyspaceDoc {...}`
    lines. JSON-parseable payloads are preferred; malformed payloads fall back
    to the older tolerant plaintext recovery path.
    """
    raw_line = line.rstrip("\n")
    match = SDK_LOG_PREFIX_RE.match(raw_line)
    if not match:
        match = SDK_GENERIC_LOG_PREFIX_RE.match(raw_line)
    if not match:
        return []
    event_name = match.group("event")
    if event_name not in SDK_TEXT_EVENTS and event_name not in {"identifyJoyspaceDoc", "chatNotify"}:
        return []
    payload = match.group("payload").strip()

    parsed = _parse_json_sdk_payload(event_name, payload, match.group("timestamp"))
    if parsed:
        return parsed
    if event_name not in SDK_TEXT_EVENTS:
        return []

    bodies_with_pos = _iter_sdk_text_bodies_with_positions(payload)
    if not bodies_with_pos:
        return []

    body_positions = [p for p, _ in bodies_with_pos]
    after = event_name in SDK_FIELDS_AFTER_BODY
    session_ids = _field_for_each_body(SDK_FIELD_PATTERNS["sessionId"], payload, body_positions, after)
    sender_pins = _field_for_each_body(SDK_FIELD_PATTERNS["senderPin"], payload, body_positions, after)
    uuids = _field_for_each_body(SDK_FIELD_PATTERNS["uuid"], payload, body_positions, after)
    msg_tss = _field_for_each_body(SDK_FIELD_PATTERNS["messageTimestampMs"], payload, body_positions, after)

    events: list[dict[str, Any]] = []
    for idx, (boundary_pos, body) in enumerate(bodies_with_pos):
        next_boundary_pos = (
            bodies_with_pos[idx + 1][0] if idx + 1 < len(bodies_with_pos) else len(payload)
        )
        mentions: list[Any] = []
        m = SDK_MENTIONS_RE.search(payload, boundary_pos, next_boundary_pos)
        if m:
            try:
                mentions = json.loads(m.group(1))
            except json.JSONDecodeError:
                mentions = []
        events.append({
            "kind": "sdk_text_message",
            "event": event_name,
            "timestamp": match.group("timestamp"),
            "messageTimestampMs": int(msg_tss[idx]) if msg_tss[idx] else None,
            "sessionId": session_ids[idx],
            "senderPin": sender_pins[idx],
            "uuid": uuids[idx],
            "content": body,
            "mentions": mentions,
        })
    return events


def _json_payload_from_log_line(line: str) -> tuple[str | None, Any | None]:
    stripped = line.rstrip("\n")
    event_name: str | None = None
    m = LOG_PREFIX_RE.match(stripped)
    body = m.group("body") if m else stripped
    first_positions = [pos for pos in (body.find("{"), body.find("[")) if pos >= 0]
    if not first_positions:
        return None, None
    start = min(first_positions)
    before = body[:start].strip()
    if before:
        event_name = before.split()[-1]
        if event_name == "selectedSession:":
            event_name = "selectedSession"
    payload = body[start:].strip()
    decoder = json.JSONDecoder()
    try:
        obj, _ = decoder.raw_decode(payload)
        return event_name, obj
    except json.JSONDecodeError:
        return event_name, None


def _iter_renderer_message_candidates(obj: Any, inherited_session: dict[str, Any] | None = None) -> Iterable[dict[str, Any]]:
    if isinstance(obj, list):
        for item in obj:
            yield from _iter_renderer_message_candidates(item, inherited_session)
        return
    if not isinstance(obj, dict):
        return

    session_context = dict(inherited_session or {})
    if obj.get("sessionId"):
        session_context["sessionId"] = obj.get("sessionId")
        session_context["sessionType"] = obj.get("sessionType")
    if obj.get("id") and ("lastMsg" in obj or "extraSingle" in obj):
        session_context["sessionId"] = obj.get("id")
        session_context["sessionType"] = obj.get("sessionType")

    message = obj.get("message") if isinstance(obj.get("message"), dict) else None
    if message:
        merged = dict(message)
        for key, value in session_context.items():
            merged.setdefault(key, value)
        yield from _iter_renderer_message_candidates(merged, session_context)

    last_msg = obj.get("lastMsg") if isinstance(obj.get("lastMsg"), dict) else None
    if last_msg and session_context.get("sessionId"):
        synthetic = {
            "sessionId": session_context.get("sessionId"),
            "sessionType": session_context.get("sessionType"),
            "sender": last_msg.get("sender"),
            "timestamp": last_msg.get("timestamp"),
            "mid": last_msg.get("id"),
            "uuid": last_msg.get("uuid"),
            "content": last_msg.get("content"),
        }
        yield synthetic

    if obj.get("sessionId") and _content_from_sdk_message(obj):
        yield obj

    for value in obj.values():
        if isinstance(value, (dict, list)):
            yield from _iter_renderer_message_candidates(value, session_context)


def parse_renderer_text_message_line(line: str) -> list[dict[str, Any]]:
    event_name, obj = _json_payload_from_log_line(line)
    if obj is None:
        return []
    log_match = LOG_PREFIX_RE.match(line.strip())
    log_timestamp = log_match.group("timestamp") if log_match else None
    events: list[dict[str, Any]] = []
    for message in _iter_renderer_message_candidates(obj):
        event = _sdk_message_to_event(message, event_name or "renderer", log_timestamp or "")
        if event:
            event["kind"] = "renderer_text_message"
            events.append(event)
    return events


def discover_renderer_logs(account: str, log_root: Path = DEFAULT_LOG_ROOT, rotations: int = 0) -> list[Path]:
    base = log_root / account
    out: list[Path] = []
    primary = base / "renderer.log"
    if primary.exists():
        out.append(primary)
    if rotations > 0:
        for i in range(1, rotations + 1):
            for name in (f"renderer.{i}.log", f"renderer.{i}.old.log"):
                p = base / name
                if p.exists():
                    out.append(p)
    old = base / "renderer.old.log"
    if rotations > 0 and old.exists():
        out.append(old)
    return out


def discover_sdk_event_logs(account: str, log_root: Path = DEFAULT_LOG_ROOT, rotations: int = 0) -> list[Path]:
    """Return sdk-event.log + up to `rotations` rotated files for an account, newest-first."""
    base = log_root / account
    primary = base / "sdk-event.log"
    rotated: list[Path] = []
    if rotations > 0:
        for i in range(1, rotations + 1):
            p = base / f"sdk-event.{i}.log"
            if p.exists():
                rotated.append(p)
    out: list[Path] = []
    if primary.exists():
        out.append(primary)
    out.extend(rotated)
    return out


def collect_sdk_text_messages(
    paths: Iterable[Path],
    session_ids: list[str] | None = None,
    contacts: list[str] | None = None,
    keywords: list[str] | None = None,
    self_pins: list[str] | None = None,
    at_me: bool = False,
    limit: int | None = None,
    parser=parse_sdk_event_line,
) -> list[dict[str, Any]]:
    """Scan sdk-event.log files and return recovered plaintext messages.

    Newer messages come first if files are passed newest-first; within a file
    iteration is forward (chronological).
    """
    kws_lower = [k.lower() for k in (keywords or []) if k]
    contact_terms = [c.lower() for c in (contacts or []) if c]
    self_pins_lower = [p.lower() for p in (self_pins or []) if p]
    results: list[dict[str, Any]] = []
    seen_uuids: set[str] = set()
    for path in paths:
        try:
            handle = path.open("r", encoding="utf-8", errors="replace")
        except OSError:
            continue
        with handle:
            for line in handle:
                for event in parser(line):
                    uuid = event.get("uuid")
                    if isinstance(uuid, str):
                        if uuid in seen_uuids:
                            continue
                        seen_uuids.add(uuid)
                    if session_ids and event.get("sessionId") not in session_ids:
                        continue
                    if contact_terms:
                        haystack = " ".join(
                            str(event.get(key) or "")
                            for key in ("sessionId", "senderPin", "receiverPin", "content")
                        ).lower()
                        if not any(term in haystack for term in contact_terms):
                            continue
                    if at_me:
                        mentions = event.get("mentions") or []
                        pins = [
                            (m.get("pin") or "").lower()
                            for m in mentions
                            if isinstance(m, dict)
                        ]
                        if not any(p in self_pins_lower for p in pins):
                            continue
                    if kws_lower:
                        text = (event.get("content") or "").lower()
                        if not any(kw in text for kw in kws_lower):
                            continue
                    event["source"] = str(path)
                    results.append(event)
    if limit is not None and limit > 0 and len(results) > limit:
        results = results[-limit:]
    return results


def default_log_paths(account: str | None = None, log_root: Path = DEFAULT_LOG_ROOT) -> list[Path]:
    if account:
        return [log_root / account / "renderer.log", log_root / account / "sdk-event.log"]
    paths = []
    if log_root.exists():
        for child in sorted(log_root.iterdir()):
            if child.is_dir():
                paths.extend([child / "renderer.log", child / "sdk-event.log"])
    return paths


def cmd_discover(_: argparse.Namespace) -> int:
    sys.stdout.write(to_json_line(discover_paths()))
    return 0


def cmd_history(args: argparse.Namespace) -> int:
    root = Path(args.root) if args.root else DEFAULT_SUPPORT_ROOT
    sys.stdout.write(to_json_line(inspect_history_sources(root, limit=args.limit)))
    return 0


def cmd_query(args: argparse.Namespace) -> int:
    support_root = Path(args.root) if args.root else DEFAULT_SUPPORT_ROOT
    log_root = Path(args.log_root) if args.log_root else DEFAULT_LOG_ROOT
    sys.stdout.write(
        to_json_line(
            query_contact(
                args.contact,
                aliases=args.alias,
                support_root=support_root,
                log_root=log_root,
                account=args.account,
                limit=args.limit,
            )
        )
    )
    return 0


def cmd_preview(args: argparse.Namespace) -> int:
    support_root = Path(args.root) if args.root else DEFAULT_SUPPORT_ROOT
    log_root = Path(args.log_root) if args.log_root else DEFAULT_LOG_ROOT
    limit = None if args.all else args.limit
    sys.stdout.write(
        to_json_line(
            preview_contact(
                args.contact,
                aliases=args.alias,
                support_root=support_root,
                log_root=log_root,
                account=args.account,
                limit=limit,
                native_runner=bridge_runner(args.bridge, args.bridge_url),
            )
        )
    )
    return 0


_AT_ME_HINT_KEYS = {"hasAtMe", "atMe"}


def _event_event_text(event: dict[str, Any]) -> str:
    """Flatten event payload into a searchable lowercase string."""
    try:
        return json.dumps(event, ensure_ascii=False).lower()
    except (TypeError, ValueError):
        return str(event).lower()


def _event_has_at_me(event: dict[str, Any], self_pins: list[str]) -> bool:
    """Detect whether an event marks an @-mention of the logged-in user."""
    self_pins_lower = [pin.lower() for pin in self_pins if pin]

    def scan(node: Any) -> bool:
        if isinstance(node, dict):
            for key, value in node.items():
                if key in _AT_ME_HINT_KEYS and value:
                    return True
                if key == "unreadAtCount" and isinstance(value, (int, float)) and value > 0:
                    return True
                if key in ("atUsers", "users", "atUserPins", "aiteUsers") and isinstance(value, list):
                    for item in value:
                        if isinstance(item, str) and item.lower() in self_pins_lower:
                            return True
                        if isinstance(item, dict):
                            pin = item.get("pin") or item.get("userPin") or item.get("erp")
                            if isinstance(pin, str) and pin.lower() in self_pins_lower:
                                return True
                if key == "atAll" and value:
                    return True
                if scan(value):
                    return True
        elif isinstance(node, list):
            for item in node:
                if scan(item):
                    return True
        return False

    return scan(event)


def event_matches_filters(
    event: dict[str, Any],
    keywords: list[str] | None,
    at_me: bool,
    self_pins: list[str],
    session_ids: list[str] | None,
) -> bool:
    if session_ids:
        event_sids: list[str] = []
        sid = event.get("sessionId")
        if isinstance(sid, str):
            event_sids.append(sid)
        if event.get("kind") == "session_update":
            for sess in event.get("sessions") or []:
                if isinstance(sess, dict) and isinstance(sess.get("id"), str):
                    event_sids.append(sess["id"])
        if not any(sid in session_ids for sid in event_sids):
            return False

    if at_me and not _event_has_at_me(event, self_pins):
        return False

    if keywords:
        text = _event_event_text(event)
        if not any(kw.lower() in text for kw in keywords if kw):
            return False

    return True


# ---------------------------------------------------------------------------
# chat: direct decrypted access to JD ME's chat.data/session.data via SQLCipher.
#
# JD ME encrypts `chat.data` and `session.data` with SQLCipher; the database key
# is `md5(account_pin).hexdigest()`. Prefer JD ME's bundled `sqlcipher` CLI when
# available. On Windows, some installs only ship `sqlcipher64.dll`; in that case
# we call the SQLite/SQLCipher ABI through ctypes in read-only mode. No process
# injection, no key dump from running ME memory, and no writes to JD ME data.
# ---------------------------------------------------------------------------


def derive_chat_db_key(pin: str) -> str:
    """JD ME's chat.data key is md5(pin).hexdigest()."""
    return hashlib.md5(pin.encode("utf-8")).hexdigest()


def chat_db_path(account: str, support_root: Path = DEFAULT_SUPPORT_ROOT) -> Path:
    return support_root / "data" / "ee" / account / "chat.data"


def session_db_path(account: str, support_root: Path = DEFAULT_SUPPORT_ROOT) -> Path:
    return support_root / "data" / "ee" / account / "session.data"


def _find_sqlcipher_binary() -> Path:
    for candidate in sqlcipher_candidates():
        if candidate.exists():
            return candidate
    searched = ", ".join(str(path) for path in sqlcipher_candidates())
    raise FileNotFoundError(
        "JD ME bundled sqlcipher not found. "
        f"Searched: {searched}. Reinstall JD ME, copy the bundled sqlcipher, "
        "install sqlcipher on PATH, or pass --sqlcipher."
    )


def _find_sqlcipher_dll() -> Path:
    for candidate in sqlcipher_dll_candidates():
        if candidate.exists():
            return candidate
    searched = ", ".join(str(path) for path in sqlcipher_dll_candidates())
    raise FileNotFoundError(f"SQLCipher DLL not found. Searched: {searched}")


def _sqlcipher_cli_rows(binary: Path, db_path: Path, key: str, sql: str, timeout: float) -> list[dict[str, Any]]:
    script = (
        f"PRAGMA key = '{key}';\n"
        ".mode list\n"
        ".headers off\n"
        ".separator '\\x1e'\n"
        f"{sql.rstrip().rstrip(';')};\n"
        ".quit\n"
    )
    proc = subprocess.run(
        [str(binary), str(db_path)],
        input=script,
        capture_output=True,
        text=True,
        timeout=timeout,
    )
    if proc.returncode != 0 or "file is not a database" in proc.stdout + proc.stderr:
        raise RuntimeError(
            f"sqlcipher failed: rc={proc.returncode} stdout={proc.stdout[:400]} stderr={proc.stderr[:400]}"
        )
    rows: list[dict[str, Any]] = []
    for line in proc.stdout.splitlines():
        line = line.strip()
        if not line or line == "ok":
            continue
        try:
            rows.append(json.loads(line))
        except json.JSONDecodeError:
            rows.append({"raw": line})
    return rows


def _sqlcipher_dll_rows(dll_path: Path, db_path: Path, key: str, sql: str) -> list[dict[str, Any]]:
    SQLITE_OPEN_READONLY = 1
    SQLITE_OK = 0
    SQLITE_ROW = 100
    SQLITE_DONE = 101

    lib = ctypes.CDLL(str(dll_path))
    c_char_pp = ctypes.POINTER(ctypes.c_char_p)
    lib.sqlite3_open_v2.argtypes = [ctypes.c_char_p, ctypes.POINTER(ctypes.c_void_p), ctypes.c_int, ctypes.c_char_p]
    lib.sqlite3_open_v2.restype = ctypes.c_int
    lib.sqlite3_close.argtypes = [ctypes.c_void_p]
    lib.sqlite3_close.restype = ctypes.c_int
    lib.sqlite3_errmsg.argtypes = [ctypes.c_void_p]
    lib.sqlite3_errmsg.restype = ctypes.c_char_p
    lib.sqlite3_exec.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_void_p, ctypes.c_void_p, c_char_pp]
    lib.sqlite3_exec.restype = ctypes.c_int
    lib.sqlite3_prepare_v2.argtypes = [ctypes.c_void_p, ctypes.c_char_p, ctypes.c_int, ctypes.POINTER(ctypes.c_void_p), c_char_pp]
    lib.sqlite3_prepare_v2.restype = ctypes.c_int
    lib.sqlite3_step.argtypes = [ctypes.c_void_p]
    lib.sqlite3_step.restype = ctypes.c_int
    lib.sqlite3_column_text.argtypes = [ctypes.c_void_p, ctypes.c_int]
    lib.sqlite3_column_text.restype = ctypes.c_char_p
    lib.sqlite3_finalize.argtypes = [ctypes.c_void_p]
    lib.sqlite3_finalize.restype = ctypes.c_int

    def errmsg(db: ctypes.c_void_p) -> str:
        return (lib.sqlite3_errmsg(db) or b"").decode("utf-8", "replace")

    db = ctypes.c_void_p()
    rc = lib.sqlite3_open_v2(str(db_path).encode("utf-8"), ctypes.byref(db), SQLITE_OPEN_READONLY, None)
    if rc != SQLITE_OK:
        raise RuntimeError(f"open SQLCipher db failed rc={rc}: {errmsg(db)}")
    try:
        err = ctypes.c_char_p()
        rc = lib.sqlite3_exec(db, f"PRAGMA key = '{key}'".encode("utf-8"), None, None, ctypes.byref(err))
        if rc != SQLITE_OK:
            msg = (err.value or b"").decode("utf-8", "replace") or errmsg(db)
            raise RuntimeError(f"PRAGMA key failed rc={rc}: {msg}")

        stmt = ctypes.c_void_p()
        tail = ctypes.c_char_p()
        rc = lib.sqlite3_prepare_v2(db, sql.rstrip().rstrip(";").encode("utf-8"), -1, ctypes.byref(stmt), ctypes.byref(tail))
        if rc != SQLITE_OK:
            raise RuntimeError(f"prepare failed rc={rc}: {errmsg(db)}")
        try:
            rows: list[dict[str, Any]] = []
            while True:
                rc = lib.sqlite3_step(stmt)
                if rc == SQLITE_ROW:
                    value = lib.sqlite3_column_text(stmt, 0)
                    line = value.decode("utf-8", "replace") if value else ""
                    if not line:
                        continue
                    try:
                        rows.append(json.loads(line))
                    except json.JSONDecodeError:
                        rows.append({"raw": line})
                elif rc == SQLITE_DONE:
                    break
                else:
                    raise RuntimeError(f"step failed rc={rc}: {errmsg(db)}")
            return rows
        finally:
            if stmt:
                lib.sqlite3_finalize(stmt)
    finally:
        if db:
            lib.sqlite3_close(db)


def _run_sqlcipher_json_query(
    account: str,
    db_path: Path,
    sql: str,
    *,
    sqlcipher: Path | None = None,
    timeout: float = 30.0,
) -> list[dict[str, Any]]:
    key = derive_chat_db_key(account)
    if sqlcipher is not None:
        if sqlcipher.suffix.lower() == ".dll":
            return _sqlcipher_dll_rows(sqlcipher, db_path, key, sql)
        return _sqlcipher_cli_rows(sqlcipher, db_path, key, sql, timeout)
    try:
        return _sqlcipher_cli_rows(_find_sqlcipher_binary(), db_path, key, sql, timeout)
    except FileNotFoundError:
        if IS_WINDOWS:
            return _sqlcipher_dll_rows(_find_sqlcipher_dll(), db_path, key, sql)
        raise


def run_chat_sql(
    account: str,
    sql: str,
    *,
    support_root: Path = DEFAULT_SUPPORT_ROOT,
    sqlcipher: Path | None = None,
    timeout: float = 30.0,
) -> list[dict[str, Any]]:
    """Run a SQL statement against the encrypted chat.data and return JSON rows.

    The SQL must produce a single `payload` column whose value is a JSON
    object string (use `json_object(...)` in the query).
    """
    db_path = chat_db_path(account, support_root)
    if not db_path.exists():
        raise FileNotFoundError(f"chat.data not found at {db_path}")
    return _run_sqlcipher_json_query(account, db_path, sql, sqlcipher=sqlcipher, timeout=timeout)


def _msg_payload_select(extra_where: str = "", order: str = "timestamp DESC", limit: int = 50) -> str:
    """Build a SELECT that returns one json_object payload per row."""
    where = f"WHERE {extra_where}" if extra_where else ""
    return (
        "SELECT json_object("
        "'uuid', uuid, "
        "'mid', mid, "
        "'sessionId', session_id, "
        "'chatType', chat_type, "
        "'msgType', msg_type, "
        "'timestamp', timestamp, "
        "'sender', sender, "
        "'senderApp', sender_app, "
        "'replyMid', reply_mid, "
        "'msgJson', msg_json"
        ") "
        f"FROM chat_message {where} ORDER BY {order} LIMIT {int(limit)}"
    )


def _extract_text_from_msg_json(msg_json_str: str | None) -> str | None:
    if not msg_json_str:
        return None
    try:
        doc = json.loads(msg_json_str)
    except json.JSONDecodeError:
        return msg_json_str[:400]
    if isinstance(doc, dict):
        # text / merge_text / sys / notice
        content = doc.get("content")
        if isinstance(content, str) and content:
            return content
        # robot_msg / card_msg often nest the user-visible summary
        for k in ("summary", "title", "text"):
            v = doc.get(k)
            if isinstance(v, str) and v:
                return v
    return None


def chat_history(
    account: str,
    *,
    session_id: str | None = None,
    sender: str | None = None,
    since_ms: int | None = None,
    until_ms: int | None = None,
    limit: int = 50,
    msg_type: str | None = None,
    support_root: Path = DEFAULT_SUPPORT_ROOT,
    sqlcipher: Path | None = None,
) -> list[dict[str, Any]]:
    conds: list[str] = []
    if session_id:
        conds.append(f"session_id = '{session_id.replace(chr(39), chr(39)*2)}'")
    if sender:
        conds.append(f"sender = '{sender.replace(chr(39), chr(39)*2)}'")
    if since_ms is not None:
        conds.append(f"timestamp >= {int(since_ms)}")
    if until_ms is not None:
        conds.append(f"timestamp < {int(until_ms)}")
    if msg_type:
        conds.append(f"msg_type = '{msg_type.replace(chr(39), chr(39)*2)}'")
    sql = _msg_payload_select(
        extra_where=" AND ".join(conds),
        order="timestamp DESC",
        limit=limit,
    )
    rows = run_chat_sql(account, sql, support_root=support_root, sqlcipher=sqlcipher)
    for row in rows:
        text = _extract_text_from_msg_json(row.get("msgJson"))
        if text is not None:
            row["text"] = text
    return rows


def chat_search(
    account: str,
    keywords: list[str],
    *,
    session_id: str | None = None,
    since_ms: int | None = None,
    limit: int = 50,
    support_root: Path = DEFAULT_SUPPORT_ROOT,
    sqlcipher: Path | None = None,
) -> list[dict[str, Any]]:
    """Substring search across msg_json. JD ME also writes a tokenized
    `search` column, but msg_json substring works for our needs."""
    conds: list[str] = []
    if session_id:
        conds.append(f"session_id = '{session_id.replace(chr(39), chr(39)*2)}'")
    if since_ms is not None:
        conds.append(f"timestamp >= {int(since_ms)}")
    kw_conds = []
    for kw in keywords:
        if not kw:
            continue
        # Escape single quotes; LIKE on msg_json or search column.
        esc = kw.replace("'", "''")
        kw_conds.append(f"(msg_json LIKE '%{esc}%' OR search LIKE '%{esc}%')")
    if kw_conds:
        conds.append("(" + " OR ".join(kw_conds) + ")")
    sql = _msg_payload_select(
        extra_where=" AND ".join(conds) if conds else "",
        order="timestamp DESC",
        limit=limit,
    )
    rows = run_chat_sql(account, sql, support_root=support_root, sqlcipher=sqlcipher)
    for row in rows:
        text = _extract_text_from_msg_json(row.get("msgJson"))
        if text is not None:
            row["text"] = text
    return rows


def chat_watch(
    account: str,
    *,
    keywords: list[str] | None = None,
    sender: str | None = None,
    session_id: str | None = None,
    self_pins: list[str] | None = None,
    at_me: bool = False,
    interval: float = 5.0,
    since_ms: int | None = None,
    timeout: float | None = None,
    support_root: Path = DEFAULT_SUPPORT_ROOT,
    sqlcipher: Path | None = None,
) -> Iterable[dict[str, Any]]:
    """Poll chat.data periodically and yield new messages matching filters."""
    kws_lower = [k.lower() for k in (keywords or []) if k]
    self_pin_set = {p.lower() for p in (self_pins or []) if p}
    # Bootstrap: if no since_ms provided, start from the latest timestamp now.
    if since_ms is None:
        last_rows = run_chat_sql(
            account,
            "SELECT json_object('ts', COALESCE(MAX(timestamp), 0)) FROM chat_message",
            support_root=support_root,
            sqlcipher=sqlcipher,
        )
        since_ms = int(last_rows[0]["ts"]) if last_rows else 0
    deadline = time.time() + timeout if timeout is not None else None
    while True:
        if deadline is not None and time.time() >= deadline:
            return
        rows = chat_history(
            account,
            session_id=session_id,
            sender=sender,
            since_ms=since_ms + 1,
            limit=200,
            support_root=support_root,
            sqlcipher=sqlcipher,
        )
        # rows are newest-first; replay oldest-first
        for row in reversed(rows):
            ts = row.get("timestamp")
            if isinstance(ts, int) and ts > since_ms:
                since_ms = ts
            text = (row.get("text") or "").lower()
            if kws_lower and not any(k in text for k in kws_lower):
                continue
            if at_me:
                # Match @<self_pin> in text content; JD ME uses @<nickname> in text and
                # encodes pins inside msg_json's mentions/at structure -- check both.
                mj = row.get("msgJson") or ""
                hit_pin = False
                for pin in self_pin_set:
                    if pin and (f'"pin":"{pin}"' in mj or f"@{pin}" in text):
                        hit_pin = True
                        break
                if not hit_pin:
                    continue
            yield row
        if deadline is not None and time.time() >= deadline:
            return
        time.sleep(interval)


def run_session_sql(
    account: str,
    sql: str,
    *,
    support_root: Path = DEFAULT_SUPPORT_ROOT,
    sqlcipher: Path | None = None,
    timeout: float = 20.0,
) -> list[dict[str, Any]]:
    """Run SQL against the SQLCipher-encrypted session.data (same key derivation as chat.data)."""
    db_path = session_db_path(account, support_root)
    if not db_path.exists():
        raise FileNotFoundError(f"session.data not found at {db_path}")
    return _run_sqlcipher_json_query(account, db_path, sql, sqlcipher=sqlcipher, timeout=timeout)


def load_session_index(
    account: str,
    *,
    support_root: Path = DEFAULT_SUPPORT_ROOT,
    sqlcipher: Path | None = None,
) -> dict[str, dict[str, Any]]:
    """Return a mapping session_id -> {name, kind, type, option} from session.data:session_info.

    kind=0 is p2p (private chat); kind=512 is group; type=1 p2p, type=2 group.
    option is a bitmask where option & 2 indicates muted (免打扰).
    """
    rows = run_session_sql(
        account,
        "SELECT json_object('id', id, 'name', name, 'kind', kind, 'type', type, 'option', option) FROM session_info",
        support_root=support_root,
        sqlcipher=sqlcipher,
    )
    return {r["id"]: r for r in rows if isinstance(r, dict) and r.get("id")}


def _chat_common_paths(args: argparse.Namespace) -> tuple[Path, Path | None]:
    support_root = Path(args.support_root) if getattr(args, "support_root", None) else DEFAULT_SUPPORT_ROOT
    sqlcipher = Path(args.sqlcipher) if getattr(args, "sqlcipher", None) else None
    return support_root, sqlcipher


def cmd_chat_history(args: argparse.Namespace) -> int:
    ensure_account(args)
    support_root, sqlcipher = _chat_common_paths(args)
    rows = chat_history(
        args.account,
        session_id=args.session,
        sender=args.sender,
        since_ms=args.since,
        until_ms=args.until,
        limit=args.limit,
        msg_type=args.msg_type,
        support_root=support_root,
        sqlcipher=sqlcipher,
    )
    for row in rows:
        sys.stdout.write(to_json_line(row))
    return 0


def cmd_chat_latest(args: argparse.Namespace) -> int:
    ensure_account(args)
    support_root, sqlcipher = _chat_common_paths(args)
    rows = chat_history(
        args.account,
        session_id=args.session,
        limit=args.limit,
        support_root=support_root,
        sqlcipher=sqlcipher,
    )
    for row in rows:
        sys.stdout.write(to_json_line(row))
    return 0


def cmd_chat_search(args: argparse.Namespace) -> int:
    ensure_account(args)
    support_root, sqlcipher = _chat_common_paths(args)
    rows = chat_search(
        args.account,
        args.keyword,
        session_id=args.session,
        since_ms=args.since,
        limit=args.limit,
        support_root=support_root,
        sqlcipher=sqlcipher,
    )
    for row in rows:
        sys.stdout.write(to_json_line(row))
    return 0


def cmd_chat_watch(args: argparse.Namespace) -> int:
    ensure_account(args)
    support_root, sqlcipher = _chat_common_paths(args)
    self_pins = list(args.self_pin or [])
    if args.account and args.account not in self_pins:
        self_pins.append(args.account)
    try:
        for row in chat_watch(
            args.account,
            keywords=args.keyword,
            sender=args.sender,
            session_id=args.session,
            self_pins=self_pins,
            at_me=args.at_me,
            interval=args.interval,
            since_ms=args.since,
            timeout=args.timeout,
            support_root=support_root,
            sqlcipher=sqlcipher,
        ):
            sys.stdout.write(to_json_line(row))
            sys.stdout.flush()
    except KeyboardInterrupt:
        return 0
    return 0


def cmd_messages(args: argparse.Namespace) -> int:
    ensure_account(args)
    log_root = Path(args.log_root) if args.log_root else DEFAULT_LOG_ROOT
    paths = discover_sdk_event_logs(args.account, log_root=log_root, rotations=args.rotations)
    include_renderer = args.include_renderer or (IS_WINDOWS and not args.no_renderer)
    renderer_paths = discover_renderer_logs(args.account, log_root=log_root, rotations=args.rotations) if include_renderer else []
    if not paths and not renderer_paths:
        sys.stdout.write(to_json_line({"status": "no_message_logs", "account": args.account}))
        return 0
    self_pins = list(args.self_pin or [])
    if args.account and args.account not in self_pins:
        self_pins.append(args.account)
    records = collect_sdk_text_messages(
        paths,
        session_ids=args.session or None,
        contacts=args.contact or None,
        keywords=args.keyword or None,
        self_pins=self_pins,
        at_me=args.at_me,
        limit=None,
        parser=parse_sdk_event_line,
    )
    if renderer_paths:
        records.extend(collect_sdk_text_messages(
            renderer_paths,
            session_ids=args.session or None,
            contacts=args.contact or None,
            keywords=args.keyword or None,
            self_pins=self_pins,
            at_me=args.at_me,
            limit=None,
            parser=parse_renderer_text_message_line,
        ))
    deduped: list[dict[str, Any]] = []
    seen_keys: set[str] = set()
    for rec in records:
        key = str(rec.get("uuid") or rec.get("mid") or "")
        if not key:
            key = "|".join(str(rec.get(k) or "") for k in ("sessionId", "senderPin", "messageTimestampMs", "content"))
        if key in seen_keys:
            continue
        seen_keys.add(key)
        deduped.append(rec)
    records = deduped
    if args.limit is not None and args.limit > 0 and len(records) > args.limit:
        records = records[-args.limit:]
    for rec in records:
        sys.stdout.write(to_json_line(rec))
    return 0


DEFAULT_GROUP_INCLUDE_PATTERN = r"Relay|Zero|基础服务"
DEFAULT_GROUP_EXCLUDE_PATTERN = r"告警|预警|监控|超时|失败|事件|通知|审核中心|robot|爱回收|客服"


def _parse_time_arg(s: str) -> int:
    """Parse `--since/--until` as either ms-since-epoch (int) or ISO/short date.

    Accepts: '1778688000000', '2026-05-14', '2026-05-14 00:00', '2026-05-14T00:00:00'.
    """
    s = s.strip()
    if s.isdigit() and len(s) >= 10:
        return int(s)
    from datetime import datetime
    for fmt in ("%Y-%m-%dT%H:%M:%S", "%Y-%m-%d %H:%M:%S", "%Y-%m-%d %H:%M", "%Y-%m-%dT%H:%M", "%Y-%m-%d"):
        try:
            return int(datetime.strptime(s, fmt).timestamp() * 1000)
        except ValueError:
            continue
    raise ValueError(f"Cannot parse time: {s!r}. Use ms-epoch or 'YYYY-MM-DD[ HH:MM[:SS]]'.")


def cmd_summary(args: argparse.Namespace) -> int:
    """Fetch messages in a time window and tag them as private / named_group / at_me_other.

    Output: JSON Lines, one per kept message, with enriched fields
        sessionId, sessionName, sessionKind, categories, sender, timestamp, text, msgType, mid.
    The agent reading this stream is expected to group + synthesize a human summary.
    """
    import re
    ensure_account(args)
    support_root, sqlcipher = _chat_common_paths(args)
    since_ms = _parse_time_arg(args.since) if args.since else None
    until_ms = _parse_time_arg(args.until) if args.until else None

    try:
        session_index = load_session_index(args.account, support_root=support_root, sqlcipher=sqlcipher)
    except Exception as exc:  # noqa: BLE001
        sys.stderr.write(f"[summary] session.data unavailable, names will be empty: {exc}\n")
        session_index = {}

    include_re = re.compile(args.include_pattern, re.IGNORECASE) if args.include_pattern else None
    exclude_re = re.compile(args.exclude_pattern, re.IGNORECASE) if args.exclude_pattern else None
    include_sessions = set(args.include_session or [])
    exclude_sessions = set(args.exclude_session or [])
    exclude_muted = getattr(args, "exclude_muted", False)

    self_pins = [args.account] + list(args.self_pin or [])
    self_pin_set = {p.lower() for p in self_pins if p}

    rows = chat_history(
        args.account,
        since_ms=since_ms,
        until_ms=until_ms,
        limit=args.limit,
        support_root=support_root,
        sqlcipher=sqlcipher,
    )

    for row in rows:
        sid = row.get("sessionId") or row.get("session_id")
        if not sid:
            continue
        if sid in exclude_sessions:
            continue
        # Skip robot/system pseudo-sessions outright.
        if ":robot.dd:" in sid or ":dd.notice" in sid:
            continue

        meta = session_index.get(sid, {})
        name = meta.get("name") or ""
        kind = meta.get("kind")
        option = meta.get("option") or 0

        # Skip muted groups if --exclude-muted is set (option & 2 indicates muted).
        if exclude_muted and kind == 512 and (option & 2):
            continue

        # Private chat: session_info.kind == 0, or 'a:ee:b:ee' p2p pattern (excl. self<->self).
        is_private = False
        if kind == 0:
            is_private = True
        elif sid.count(":") == 3 and sid.endswith(":ee"):
            parts = sid.split(":")
            if len(parts) == 4 and parts[2] and parts[2].lower() not in self_pin_set:
                is_private = True

        # Named group: explicit include OR group(kind=512) name matches include & not excluded.
        is_named_group = False
        if sid in include_sessions:
            is_named_group = True
        elif kind == 512 and name:
            if include_re and include_re.search(name):
                if not (exclude_re and exclude_re.search(name)):
                    is_named_group = True

        # @-me: text or msgJson mentions a self pin, and sender is not self.
        sender = (row.get("sender") or "").lower()
        text = row.get("text") or ""
        mj = row.get("msgJson") or ""
        is_at_me = False
        if sender and sender not in self_pin_set:
            for pin in self_pin_set:
                if not pin:
                    continue
                if f'"pin":"{pin}"' in mj or f"@{pin}" in text:
                    is_at_me = True
                    break

        cats: list[str] = []
        if is_private:
            cats.append("private")
        if is_named_group:
            cats.append("named_group")
        if is_at_me and not is_private and not is_named_group:
            cats.append("at_me_other")
        if not cats:
            continue

        enriched = {
            "sessionId": sid,
            "sessionName": name,
            "sessionKind": kind,
            "categories": cats,
            "sender": row.get("sender"),
            "timestamp": row.get("timestamp"),
            "text": row.get("text"),
            "msgType": row.get("msgType"),
            "mid": row.get("mid"),
        }
        sys.stdout.write(json.dumps(enriched, ensure_ascii=False) + "\n")
    return 0


def cmd_sessions(args: argparse.Namespace) -> int:
    """List sessions with names from session.data, useful for picking --include-session ids."""
    ensure_account(args)
    support_root, sqlcipher = _chat_common_paths(args)
    idx = load_session_index(args.account, support_root=support_root, sqlcipher=sqlcipher)
    items = list(idx.values())
    if args.name_contains:
        s = args.name_contains.lower()
        items = [r for r in items if s in (r.get("name") or "").lower()]
    if args.kind is not None:
        items = [r for r in items if r.get("kind") == args.kind]
    for r in items[: args.limit]:
        sys.stdout.write(json.dumps(r, ensure_ascii=False) + "\n")
    return 0


def cmd_watch(args: argparse.Namespace) -> int:
    log_root = Path(args.log_root) if getattr(args, "log_root", None) else DEFAULT_LOG_ROOT
    paths = [Path(path) for path in args.log] if args.log else default_log_paths(args.account, log_root=log_root)
    events = follow_events(paths, from_start=args.from_start, timeout=args.timeout)
    self_pins = list(args.self_pin or [])
    if args.account and args.account not in self_pins:
        self_pins.append(args.account)
    keywords = list(args.keyword or [])
    session_ids = list(args.session or [])
    count = 0
    for event in events:
        if not event_matches_filters(event, keywords, args.at_me, self_pins, session_ids):
            continue
        sys.stdout.write(to_json_line(event))
        sys.stdout.flush()
        count += 1
        if args.max_events and count >= args.max_events:
            break
    return 0


def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(description="Inspect local JD ME chat history and incoming-message logs.")
    subparsers = parser.add_subparsers(dest="command", required=True)

    discover = subparsers.add_parser("discover", help="Print discovered JD ME app, data, log, and account paths.")
    discover.set_defaults(func=cmd_discover)

    history = subparsers.add_parser("history", help="Summarize readable history exports and chat database files.")
    history.add_argument("--root", help="Override com.jd.me support root.")
    history.add_argument("--limit", type=int, default=20, help="Maximum sources to return.")
    history.set_defaults(func=cmd_history)

    query = subparsers.add_parser("query", help="Query readable local evidence for a JD ME contact or ERP.")
    query.add_argument("contact", help="Contact ERP, pin, name, or keyword to search for.")
    query.add_argument("--alias", action="append", help="Additional name or keyword to include. Can be repeated.")
    query.add_argument("--account", help="Limit log search to one JD ME log account directory.")
    query.add_argument("--root", help="Override com.jd.me support root.")
    query.add_argument("--log-root", help="Override JD ME log root (macOS: ~/Library/Logs/ME; Windows: discovered AppData ME logs).")
    query.add_argument("--limit", type=int, default=50, help="Maximum matches to return.")
    query.set_defaults(func=cmd_query)

    preview = subparsers.add_parser("preview", help="Preview IM chat history through JD ME native SDK commands.")
    preview.add_argument("contact", help="Contact ERP, pin, name, or keyword to preview.")
    preview.add_argument("--alias", action="append", help="Additional name or keyword to include. Can be repeated.")
    preview.add_argument("--account", help="JD ME account, used to infer one-to-one session ids.")
    preview.add_argument("--root", help="Override com.jd.me support root.")
    preview.add_argument("--log-root", help="Override JD ME log root (macOS: ~/Library/Logs/ME; Windows: discovered AppData ME logs).")
    preview.add_argument("--limit", type=int, default=100, help="Maximum IM records to return.")
    preview.add_argument("--all", action="store_true", help="Return all records the SDK/export result exposes.")
    preview.add_argument(
        "--bridge",
        choices=["auto", "running", "native"],
        default="auto",
        help="Bridge mode: running HTTP bridge first, force running bridge, or standalone native SDK bridge.",
    )
    preview.add_argument("--bridge-url", default=RUNNING_BRIDGE_URL, help="Running JD ME bridge base URL.")
    preview.set_defaults(func=cmd_preview)

    watch = subparsers.add_parser("watch", help="Watch renderer logs for message and session-update events.")
    watch.add_argument("--account", help="JD ME account directory under the JD ME log root.")
    watch.add_argument("--log-root", help="Override JD ME log root (macOS: ~/Library/Logs/ME; Windows: discovered AppData ME logs).")
    watch.add_argument("--log", action="append", help="Explicit log file to watch. Can be repeated.")
    watch.add_argument("--from-start", action="store_true", help="Read existing log content before following.")
    watch.add_argument("--timeout", type=float, help="Stop after this many seconds.")
    watch.add_argument("--max-events", type=int, help="Stop after this many parsed events.")
    watch.add_argument(
        "--keyword",
        action="append",
        help="Only emit events whose JSON payload contains this keyword (case-insensitive). Repeatable; matches any.",
    )
    watch.add_argument(
        "--at-me",
        action="store_true",
        help="Only emit events that look like an @-mention of the logged-in user (hasAtMe/atMe/unreadAtCount/atAll/atUsers).",
    )
    watch.add_argument(
        "--self-pin",
        action="append",
        help="Additional pin/ERP to treat as 'me' when scanning atUsers lists. Defaults to --account.",
    )
    watch.add_argument(
        "--session",
        action="append",
        help="Only emit events for this session id. Repeatable.",
    )
    watch.set_defaults(func=cmd_watch)

    messages = subparsers.add_parser(
        "messages",
        help="Recover plaintext text messages from sdk-event.log (tolerant of JD ME's broken JSON escaping).",
    )
    messages.add_argument("--account", help="JD ME account directory under the JD ME log root.")
    messages.add_argument("--auto", action="store_true", help="Read --account from ~/.jd_me_account, or auto-select the only local account.")
    messages.add_argument("--log-root", help="Override JD ME log root (macOS: ~/Library/Logs/ME; Windows: discovered AppData ME logs).")
    messages.add_argument(
        "--rotations",
        type=int,
        default=0,
        help="Also scan sdk-event.1.log..sdk-event.N.log rotated files. Default 0 = primary log only.",
    )
    messages.add_argument("--session", action="append", help="Filter by session id. Repeatable.")
    messages.add_argument("--contact", action="append", help="Filter by contact ERP/pin/name against sessionId, senderPin, receiverPin, or content. Repeatable.")
    messages.add_argument("--include-renderer", action="store_true", help="Also scan renderer.log / renderer.N.log for recoverable message snapshots. Enabled by default on Windows; opt-in on macOS.")
    messages.add_argument("--no-renderer", action="store_true", help="Disable renderer.log scanning when running on Windows.")
    messages.add_argument("--keyword", action="append", help="Filter by case-insensitive keyword in plaintext content. Repeatable.")
    messages.add_argument(
        "--at-me",
        action="store_true",
        help="Only emit messages where mentions contains a self-pin.",
    )
    messages.add_argument(
        "--self-pin",
        action="append",
        help="Additional pin/ERP to treat as 'me' for --at-me. Defaults to --account.",
    )
    messages.add_argument("--limit", type=int, default=20, help="Return at most this many most-recent records.")
    messages.set_defaults(func=cmd_messages)

    def add_chat_common(p: argparse.ArgumentParser) -> None:
        p.add_argument("--account", help="JD ME account pin (used as both data path and key derivation input).")
        p.add_argument("--auto", action="store_true", help="Read --account from ~/.jd_me_account, or auto-select the only local account.")
        p.add_argument("--sqlcipher", help="Override path to JD's bundled sqlcipher binary.")
        p.add_argument("--support-root", help="Override JD ME support root (macOS: ~/Library/Application Support/com.jd.me; Windows: discovered AppData com.jd.me/ME root).")

    chat_history_p = subparsers.add_parser(
        "chat-history",
        help="Read decrypted message history from chat.data (SQLCipher, key=md5(pin)).",
    )
    add_chat_common(chat_history_p)
    chat_history_p.add_argument("--session", help="Filter by session_id.")
    chat_history_p.add_argument("--sender", help="Filter by sender pin.")
    chat_history_p.add_argument("--msg-type", help="Filter by msg_type (text/card_msg/image/...).")
    chat_history_p.add_argument("--since", help="Lower bound timestamp (ms since epoch).", type=int)
    chat_history_p.add_argument("--until", help="Upper bound timestamp (ms since epoch).", type=int)
    chat_history_p.add_argument("--limit", type=int, default=50)
    chat_history_p.set_defaults(func=cmd_chat_history)

    chat_latest_p = subparsers.add_parser(
        "chat-latest",
        help="Show the most recent decrypted messages across all sessions.",
    )
    add_chat_common(chat_latest_p)
    chat_latest_p.add_argument("--session", help="Optional session filter.")
    chat_latest_p.add_argument("--limit", type=int, default=20)
    chat_latest_p.set_defaults(func=cmd_chat_latest)

    chat_search_p = subparsers.add_parser(
        "chat-search",
        help="Substring search across decrypted msg_json/search columns.",
    )
    add_chat_common(chat_search_p)
    chat_search_p.add_argument("--keyword", action="append", required=True, help="Keyword (substring, OR-matched). Repeatable.")
    chat_search_p.add_argument("--session", help="Optional session filter.")
    chat_search_p.add_argument("--since", type=int, help="Lower bound timestamp (ms).")
    chat_search_p.add_argument("--limit", type=int, default=50)
    chat_search_p.set_defaults(func=cmd_chat_search)

    chat_watch_p = subparsers.add_parser(
        "chat-watch",
        help="Poll chat.data and emit new messages matching keyword/at-me/sender/session filters.",
    )
    add_chat_common(chat_watch_p)
    chat_watch_p.add_argument("--keyword", action="append", help="Filter: case-insensitive substring on plaintext content. Repeatable.")
    chat_watch_p.add_argument("--at-me", action="store_true", help="Only emit messages that mention/@-tag a self pin.")
    chat_watch_p.add_argument("--self-pin", action="append", help="Pin(s) to treat as 'me' for --at-me. Defaults to --account.")
    chat_watch_p.add_argument("--sender", help="Only this sender pin.")
    chat_watch_p.add_argument("--session", help="Only this session_id.")
    chat_watch_p.add_argument("--interval", type=float, default=5.0, help="Polling interval in seconds.")
    chat_watch_p.add_argument("--since", type=int, help="Start from this ms timestamp (default: now).")
    chat_watch_p.add_argument("--timeout", type=float, help="Stop after N seconds.")
    chat_watch_p.set_defaults(func=cmd_chat_watch)

    sessions_p = subparsers.add_parser(
        "sessions",
        help="List session_info (id, name, kind, type) from session.data. Useful to discover ids by name.",
    )
    add_chat_common(sessions_p)
    sessions_p.add_argument("--name-contains", help="Filter: session name case-insensitive substring.")
    sessions_p.add_argument("--kind", type=int, help="Filter by kind (0=p2p, 512=group).")
    sessions_p.add_argument("--limit", type=int, default=200)
    sessions_p.set_defaults(func=cmd_sessions)

    summary_p = subparsers.add_parser(
        "summary",
        help=(
            "Fetch messages in a time window, tag as private/named_group/at_me_other. "
            "Designed to be fed to an LLM for daily/weekly digest synthesis."
        ),
    )
    add_chat_common(summary_p)
    summary_p.add_argument("--since", help="Window start: ms-epoch or 'YYYY-MM-DD[ HH:MM[:SS]]'.")
    summary_p.add_argument("--until", help="Window end: ms-epoch or ISO date. Default: now.")
    summary_p.add_argument(
        "--self-pin",
        action="append",
        help="Additional pin/alias treated as 'me' for @-detection and self-chat exclusion. Repeatable.",
    )
    summary_p.add_argument(
        "--include-pattern",
        default=DEFAULT_GROUP_INCLUDE_PATTERN,
        help=f"Group-name regex to include (case-insensitive). Default: {DEFAULT_GROUP_INCLUDE_PATTERN!r}",
    )
    summary_p.add_argument(
        "--exclude-pattern",
        default=DEFAULT_GROUP_EXCLUDE_PATTERN,
        help=(
            "Group-name regex to exclude (filters alert/notice groups even if include matches). "
            f"Default: {DEFAULT_GROUP_EXCLUDE_PATTERN!r}"
        ),
    )
    summary_p.add_argument(
        "--include-session",
        action="append",
        help="Force-include this session_id regardless of name match. Repeatable.",
    )
    summary_p.add_argument(
        "--exclude-session",
        action="append",
        help="Force-exclude this session_id. Repeatable.",
    )
    summary_p.add_argument(
        "--exclude-muted",
        action="store_true",
        help="Exclude groups with muted (免打扰) flag set.",
    )
    summary_p.add_argument("--limit", type=int, default=20000, help="Hard cap on raw rows read from chat.data.")
    summary_p.set_defaults(func=cmd_summary)

    return parser


def main(argv: list[str] | None = None) -> int:
    parser = build_parser()
    args = parser.parse_args(argv)
    return args.func(args)


if __name__ == "__main__":
    raise SystemExit(main())
