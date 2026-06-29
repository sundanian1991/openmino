# JoyMail SOAP Query Recipes

## Base Capability Mapping

- Query inbox: `search --folder inbox`
- Query sent items: `search --folder sentitems`
- Query drafts: `search --folder drafts`
- Query custom folder:
  1. `folders --parent msgfolderroot`
  2. `search --folder-name "<folder display name>"`
  3. Or use `search --folder-id "<resolved folder id>"`

## Common Filters

- Sender: `--sender "zhangsan@jd.com"`
- Recipient: `--recipient "lisi@jd.com"`
- Subject keyword: `--subject "周报"`
- Body keyword: `--body-keyword "上线时间"`
- Time range: `--after 2026-03-20 --before 2026-03-27`
- Unread: `--unread`
- Read: `--read`
- Attachments: `--has-attachments`
- Tag/category: `--category "重要"`
- Importance: `--importance High`

## Sample Commands

```bash
bash scripts/run.sh folders --parent msgfolderroot

bash scripts/run.sh search --folder inbox --sender "zhangsan@jd.com" --unread --limit 20

bash scripts/run.sh search --folder sentitems --subject "项目评审" --after 2026-03-20 --before 2026-03-27

bash scripts/run.sh search --folder-name "项目归档" --has-attachments --limit 30

bash scripts/run.sh detail --item-id "AAMkADFlNG..."

bash scripts/run.sh pending-important --days 7 --limit 100

bash scripts/run.sh person-unhandled --sender "zhangsan@jd.com" --days 14 --limit 100
```

## Current Heuristics

### pending-important

- Importance is `High`, or categories contain `important` / `重要` / `urgent` / `待办`
- No later sent mail exists in the same `ConversationId`

### person-unhandled

- Sender matches target person
- Mail is unread
- No later sent mail exists in the same `ConversationId`

These heuristics are intentionally simple for the first version and should be refined once the mailbox side provides clearer business semantics for "important", "processed", and reply detection.
