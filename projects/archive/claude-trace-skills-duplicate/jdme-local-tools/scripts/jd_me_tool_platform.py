#!/usr/bin/env python3
"""Platform-specific path discovery for JD ME local tools.

Keep operating-system layout knowledge here so jd_me_tool_core.py can focus on
JD ME data access, parsing, and CLI behavior. The public command entry remains
scripts/jd_me_tool.py.
"""
from __future__ import annotations

import os
import shutil
import sys
from pathlib import Path
from typing import Iterable

IS_WINDOWS = os.name == "nt"
IS_MACOS = sys.platform == "darwin"


def env_path(name: str) -> Path | None:
    value = os.environ.get(name)
    return Path(value) if value else None


def dedupe_paths(paths: Iterable[Path | None]) -> list[Path]:
    seen: set[str] = set()
    result: list[Path] = []
    for path in paths:
        if path is None:
            continue
        expanded = path.expanduser()
        key = str(expanded).casefold() if IS_WINDOWS else str(expanded)
        if key in seen:
            continue
        seen.add(key)
        result.append(expanded)
    return result


def first_existing_or_first(paths: Iterable[Path | None]) -> Path:
    candidates = dedupe_paths(paths)
    for path in candidates:
        if path.exists():
            return path
    return candidates[0]


def app_candidates() -> list[Path]:
    if IS_WINDOWS:
        local = env_path("LOCALAPPDATA") or (Path.home() / "AppData" / "Local")
        program_files = env_path("ProgramFiles")
        program_files_x86 = env_path("ProgramFiles(x86)")
        return dedupe_paths([
            local / "Programs" / "ME",
            local / "Programs" / "JD ME",
            program_files / "ME" if program_files else None,
            program_files / "JD ME" if program_files else None,
            program_files_x86 / "ME" if program_files_x86 else None,
            program_files_x86 / "JD ME" if program_files_x86 else None,
        ])
    return [Path("/Applications/ME.app")]


def support_root_candidates() -> list[Path]:
    if IS_WINDOWS:
        roaming = env_path("APPDATA") or (Path.home() / "AppData" / "Roaming")
        local = env_path("LOCALAPPDATA") or (Path.home() / "AppData" / "Local")
        docs = Path.home() / "Documents"
        return dedupe_paths([
            docs / "JD" / "ME",
            roaming / "com.jd.me",
            roaming / "ME",
            roaming / "JD ME",
            local / "com.jd.me",
            local / "ME",
            local / "JD ME",
        ])
    return [Path.home() / "Library" / "Application Support" / "com.jd.me"]


def electron_root_candidates() -> list[Path]:
    if IS_WINDOWS:
        roaming = env_path("APPDATA") or (Path.home() / "AppData" / "Roaming")
        local = env_path("LOCALAPPDATA") or (Path.home() / "AppData" / "Local")
        return dedupe_paths([
            roaming / "ME",
            roaming / "JD ME",
            local / "ME",
            local / "JD ME",
        ])
    return [Path.home() / "Library" / "Application Support" / "ME"]


def log_root_candidates() -> list[Path]:
    if IS_WINDOWS:
        roaming = env_path("APPDATA") or (Path.home() / "AppData" / "Roaming")
        local = env_path("LOCALAPPDATA") or (Path.home() / "AppData" / "Local")
        return dedupe_paths([
            roaming / "ME" / "logs",
            roaming / "ME" / "Logs",
            roaming / "JD ME" / "logs",
            local / "ME" / "logs",
            local / "JD ME" / "logs",
            roaming / "ME",
            local / "ME",
        ])
    return [Path.home() / "Library" / "Logs" / "ME"]


def sqlcipher_candidates() -> list[Path]:
    suffixes = [
        Path("resources/app/node_modules/@jd/dd_sqlite3/bin/sqlcipher.exe"),
        Path("resources/app.asar.unpacked/node_modules/@jd/dd_sqlite3/bin/sqlcipher.exe"),
        Path("Contents/Resources/app/node_modules/@jd/dd_sqlite3/bin/sqlcipher"),
    ]
    paths: list[Path | None] = []
    for app_root in app_candidates():
        for suffix in suffixes:
            paths.append(app_root / suffix)
    which = shutil.which("sqlcipher.exe" if IS_WINDOWS else "sqlcipher") or shutil.which("sqlcipher")
    if which:
        paths.append(Path(which))
    return dedupe_paths(paths)


def sqlcipher_dll_candidates() -> list[Path]:
    if not IS_WINDOWS:
        return []
    program_files = env_path("ProgramFiles")
    program_files_x86 = env_path("ProgramFiles(x86)")
    return dedupe_paths([
        program_files / "solp" / "jde" / "sqlcipher64.dll" if program_files else None,
        program_files / "solp" / "jde" / "sqlcipher.dll" if program_files else None,
        program_files_x86 / "solp" / "jde" / "sqlcipher64.dll" if program_files_x86 else None,
        program_files_x86 / "solp" / "jde" / "sqlcipher.dll" if program_files_x86 else None,
    ])


def default_me_binary(app_root: Path) -> Path:
    return app_root / ("ME.exe" if IS_WINDOWS else "Contents/MacOS/ME")
