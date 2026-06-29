---
name: jingME
description: Use this skill whenever the user asks to inspect 京ME/JD ME conversations, 慧记/JoyMinutes meeting minutes, track subordinate commitments, extract follow-up items, summarize who promised what, or combine IM messages with meeting transcripts. This skill is read-only: it can read local JD ME data and JoyMinutes records the user has access to, search and listen for commitment keywords, and produce follow-up tables. It must not send JD ME messages, write chat databases, inject into JD ME, extract credentials, or modify source data.
version: 0.1.0
status: local-draft
---

# jingME

## Purpose

Help the user manage work follow-ups by combining two read-only sources:

- 京ME / JD ME local messages from the user's own machine.
- 慧记 / JoyMinutes meeting records that the user is authorized to access.

The main output is a traceable follow-up list: who promised what, by when, source evidence, current status, and suggested reminder copy.

## Safety boundary

This skill is read-only.

Do not:

- Send JD ME messages directly.
- Modify JD ME chat databases or logs.
- Inject into the JD ME client or dump process memory.
- Extract credentials, cookies, or private keys.
- Present unverified inferences as facts.

If the user asks to send a message, generate draft copy and say it must be sent manually unless an official authorized send tool exists.

## Available local tools

Use the existing bundled tools rather than duplicating logic.

### JD ME local tool

Path:

```bash
/Users/dengda.1/Library/Application Support/Relay/Electron/resources/SKILLs/jdme-local-tools/scripts/jd_me_tool.py
```

Typical commands:

```bash
# Discover local JD ME account and data paths
python3 ".../jd_me_tool.py" discover

# List sessions
python3 ".../jd_me_tool.py" sessions --auto --limit 20

# Search messages by keyword
python3 ".../jd_me_tool.py" chat-search --auto --keyword 跟进 --limit 50

# Read one session history
python3 ".../jd_me_tool.py" chat-history --auto --session <session-id> --limit 200

# Poll new database messages for a period
python3 ".../jd_me_tool.py" chat-watch --auto --keyword 跟进 --timeout 60
```

Known local setup verified on 2026-06-25:

- Account auto-select works for `dengda.1`.
- `sqlcipher` is installed via Homebrew and database access works.
- Keyword search and chat history return JSON Lines.
- Watch commands start successfully.

### JoyMinutes / 慧记 tool

Path:

```bash
/Users/dengda.1/Library/Application Support/Relay/Electron/resources/SKILLs/read-joymeeting/scripts/fetch-meetings.js
```

Typical commands:

```bash
# This week's accessible meeting list
node ".../fetch-meetings.js" --date thisweek

# Meeting details and transcript
node ".../fetch-meetings.js" --id <meeting-id> --detail
```

Known local setup verified on 2026-06-25:

- This week's meeting list can be fetched through inherited browser login state.
- A meeting detail such as `H1&H2讨论` returned transcript records.

## Workflow

### 1. Clarify scope

Ask for the minimum scope if missing:

- Person ERP or name.
- Group name or session id.
- Date range.
- Keywords.
- Whether to include meeting records, JD ME, or both.

Default date ranges:

- “昨天”: previous calendar day.
- “本周”: Monday to today.
- “最近”: last 7 days.

### 2. Collect JD ME evidence

For one-to-one chats, try session id patterns first when ERP is known:

```text
<other>:ee:<self>:ee
<self>:ee:<other>:ee
```

If the session is unknown, search with:

```bash
chat-search --auto --keyword <erp-or-name> --limit 50
```

Filter by timestamp in Python. Keep raw JSON in temporary files only when needed. Do not save private message exports into the project unless the user explicitly asks.

### 3. Collect JoyMinutes evidence

Fetch meeting list for the range, then only fetch details for meetings relevant to the user's topic.

Use title, members, transcript, and attachments. Do not invent conclusions if transcript is missing.

### 4. Extract commitments

Commitment cues include:

- 我来 / 我跟 / 我负责 / 我推进 / 我今天弄 / 明天发你 / 下周给 / 会同步 / 已收到
- Deadline cues: 今天、明天、周五、下周、7月、上线前
- Delivery cues: 发你看、给谁过目、宣讲、提报、排期、上线、确认、补充数据

Classify each item:

- Owner
- Task
- Deadline
- Source: JD ME / JoyMinutes
- Evidence quote
- Status: promised / done / blocked / unclear
- Suggested reminder copy

### 5. Output format

Use concise Chinese.

```markdown
**结论**
本次共识别 <N> 个跟进事项，其中 <A> 个有明确负责人，<B> 个有明确时间点，<C> 个需要补确认。

| 负责人 | 事项 | 时间点 | 来源 | 状态 | 证据 |
|---|---|---|---|---|---|
| <name/erp> | <task> | <deadline/xx> | 京ME/慧记 | <status> | <short quote> |

**建议提醒文案**
- 给 <person>：<copy>
```

For sensitive content, summarize rather than dumping raw transcripts.

## Examples

User: “帮我检查昨天跟 chengrunfeng3 的消息，看看他答应了什么。”

Output should identify direct-chat commitments such as material refinement, PMO/沨姐/C3 follow-up, apology relay, and 0714 function submission when present, with timestamps and source quotes.

User: “查本周慧记里谁答应跟进圈子话题H2规划。”

Output should fetch this week's meeting list, select relevant H1/H2 planning meetings, read transcripts, and extract owner/task/deadline rows.

## Publishing note

This local draft can be packaged as a Zero skill. Current Zero CLI does not expose a public `skill publish` command. Publishing to the Zero application/skill marketplace requires the official marketplace upload path or internal permission. Until that path is available, use this directory as a local skill draft and keep the workflow in project memory.
