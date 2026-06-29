---
name: jdme-local-tools
description: Use when the user asks Zero to inspect local JD ME / 京 ME chat history, read a private chat or group chat, discover JD ME storage paths, read decrypted chat.data/session.data, recover messages from JD ME logs, search chat content, summarize recent JD ME conversations, or listen for incoming JD ME events on macOS or Windows without modifying the app. Use this for requests like “读我和某人的聊天记录”, “读这个群的消息”, “查某个ERP聊天”, “找京ME本地数据目录”, “监听京ME消息”, or “总结今日/本周京ME消息”. Prefer this skill for local JD ME data tasks even when the user does not mention JD ME internals. For polished daily/weekly digest writing, combine with the sibling skill `jd-me-summary` after extracting rows.
version: 1.0.1
---

# JD ME Local Tools

Use the bundled scripts for read-only local inspection of JD ME / 京 ME data on macOS and Windows. The single entry script delegates to shared core logic; OS-specific path discovery lives in a small platform helper. The tool can discover paths, recover chat text from logs, read SQLCipher-encrypted `chat.data` / `session.data` through a SQLCipher CLI or Windows DLL fallback, and watch incoming message/session events.

## First choice workflow

1. Run `discover` first unless the user already gave exact paths. It is cheap and platform-aware.
2. If the user needs complete or non-masked history, prefer database commands: run `sessions --auto --name-contains <name-or-group>` to resolve the session id, then `chat-history --auto --session <session-id> --limit <N>`.
3. If SQLCipher access is unavailable or the user only needs recent practical recovery, use `messages --auto --contact <erp-or-name> --limit <N>` to recover log snapshots.
4. On Windows, `messages` scans `renderer.log` in addition to `sdk-event.log` by default, because Windows JD ME often keeps recoverable history snapshots there. Use `--no-renderer` only when you specifically want sdk-event rows only.
5. Use `--auto` by default. It first honors `~/.jd_me_account` when present, then scans JD ME data/log roots and selects the most active local account by `chat.data`, `session.data`, matching logs, and latest modification time. For database commands, the matching support root is also selected automatically when the user did not pass `--support-root`. Only pass `--account <pin>` when the recommendation is wrong or ambiguous.
6. If a Chinese self name is needed for @-me matching or digest wording, ask the user or infer it from `session.data`/recent messages; do not invent it.

## Paths and commands

From the skill root, use `scripts/jd_me_tool.py` directly. It is the single command entry point and calls `scripts/jd_me_tool_core.py`; OS-specific path discovery lives in `scripts/jd_me_tool_platform.py` so core data-reading logic stays platform-neutral. On macOS use `python3`; on Windows use `python` if that is the available command.

```bash
python3 scripts/jd_me_tool.py discover
python3 scripts/jd_me_tool.py messages --auto --contact fanbaolin3 --rotations 3 --limit 100
python3 scripts/jd_me_tool.py messages --auto --session erp1:ee:erp2:ee --limit 100
python3 scripts/jd_me_tool.py messages --auto --keyword 上线 --at-me --limit 20
python3 scripts/jd_me_tool.py watch --auto --keyword 上线 --at-me
python3 scripts/jd_me_tool.py sessions --auto --name-contains Relay --kind 512
python3 scripts/jd_me_tool.py chat-history --auto --session erp1:ee:erp2:ee --limit 50
python3 scripts/jd_me_tool.py chat-search --auto --keyword 上线 --limit 20
python3 scripts/jd_me_tool.py summary --auto --since 2026-05-14
```

Use `scripts/jd_me_tool.py` in normal use so the same instructions work across systems.

Each command emits JSON Lines unless otherwise noted. Database message rows commonly include `sessionId`, `timestamp`, `sender`, `msgType`, raw `msgJson`, and extracted `text` when the content can be parsed.

## Platform discovery

`discover` reports app root, ME binary, support roots, Electron roots, log roots, SQLCipher executable candidates, SQLCipher DLL diagnostics, discovered data accounts, log accounts, and `recommended_account` with scoring details for `--auto`.

macOS default locations:

```text
/Applications/ME.app
~/Library/Application Support/com.jd.me
~/Library/Application Support/ME
~/Library/Logs/ME
```

Windows default locations:

```text
~/Documents/JD/ME                         # data/ee/<account>/chat.data and session.data
%APPDATA%/ME/logs                         # renderer.log and sdk-event.log
%APPDATA%/ME                              # Electron user data
%APPDATA%/com.jd.me                       # alternate support root
%LOCALAPPDATA%/Programs/ME                # possible app install root
C:/Program Files/ME or JD ME              # possible app install root
```

If discovery misses a path, ask the user for it and pass:

```bash
--support-root <path-to-JD-ME-support-root>
--log-root <path-to-log-root>
--sqlcipher <path-to-sqlcipher-executable>
```

## Reading chat records

Use `messages` first for practical recovery:

```bash
python3 scripts/jd_me_tool.py messages --auto --contact erp2 --rotations 3 --limit 100
```

`messages` recovers text from:

- `sdk-event.log` and rotated `sdk-event.N.log`
- Windows renderer snapshots: `renderer.log`, `renderer.N.log`, `renderer.old.log`
- events including `insertMessages`, `openChatResult`, `loadMoreResult`, `updateMsgParam`, `identifyJoyspaceDoc`, and `chatNotify`

Useful filters:

```bash
--contact <erp-or-name>      # match sessionId, senderPin, receiverPin, or content
--session <session-id>       # exact session filter; repeatable
--keyword <text>             # content substring; repeatable
--at-me --self-pin <pin>     # @-me filtering
--limit <N>                  # keep most recent N recovered rows
--no-renderer                # Windows only: do not scan renderer logs
```

For complete database history, use SQLCipher-backed commands:

```bash
python3 scripts/jd_me_tool.py sessions --auto --name-contains fanbaolin --kind 0
python3 scripts/jd_me_tool.py chat-history --auto --session erp1:ee:erp2:ee --limit 100
```

The SQLCipher key is `md5(account_pin).hexdigest()`, matching JD ME's own `db-helper`. The tool opens databases read-only. It first tries an executable SQLCipher CLI. On Windows, if no CLI exists but `sqlcipher64.dll` / `sqlcipher.dll` is discovered, it calls the SQLite/SQLCipher ABI through `ctypes` as a fallback. Do not add user-specific account names, group ids, or absolute personal paths to the skill; extend discovery candidate functions with generic install locations only.

If database access fails with `file is not a database`, do not retry by dumping process memory or extracting credentials. Report the failing database path, account pin used for key derivation, discovered SQLCipher CLI/DLL candidates, and fall back to `messages` log recovery.

## Other commands

- `history` reports exported `.txt` files and `chat.data*` database candidates. If a database is not SQLite-openable, report `encrypted_or_unknown`; do not attempt process/key extraction.
- `query` searches readable exported text files and account logs for an ERP/name, returns snippets, direct session ids, and encrypted database boundaries. Snippets redact obvious credential-like values.
- `preview` is a diagnostic fallback that resolves session ids and tries a running/native JD ME bridge before falling back to log previews. Prefer `messages` or `chat-history` for normal use. Treat `sdk_context_unavailable` or `native bridge not found` as bridge diagnostics, not as a reason to dump credentials or inspect process memory.
- `watch` tails `renderer.log` and `sdk-event.log`, parsing message pushes, session updates, and selected-session detail into stable JSON. Supports `--keyword`, `--at-me`, `--self-pin`, and `--session`.
- `summary` joins `chat_message` with `session_info` when SQLCipher is available and emits enriched JSON Lines for daily/weekly digest synthesis. Defaults include `Relay|Zero|基础服务` and exclude alert/robot/notice-like groups; override include/exclude patterns when the user's target scope differs.

## Maintenance notes

Keep `scripts/jd_me_tool.py` as the stable command entry used by SKILL.md examples. Keep OS-specific path candidates and default binary locations in `scripts/jd_me_tool_platform.py`. Shared JD ME data access, parsing, and CLI behavior belongs in `scripts/jd_me_tool_core.py`. Do not bundle one-off local probes, exported chat results, caches, or user-specific scripts into the skill.

## Boundaries

This tool must not modify the JD ME application bundle/install directory, inject into Electron, dump keys from running process memory, write to JD ME chat databases, or attempt credential extraction. It is a local read-only helper operating on files the user already has access to.

`preview` may create JD ME SDK export HTML under the app's normal `data/ee/export/` directory when a bridge is available. All `chat-*` database queries are read-only and require user-authorized access to their own account data.
