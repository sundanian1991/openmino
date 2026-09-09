---
summary: "Curated long-term memory"
read_when:
  - Main session only
---
# MEMORY.md - Long-Term Memory

> 完整教训库见 `.codex/rules/07-MEMORY.md`（Durable Lessons 15+条）。
> 本文件是快速参考层，保持简短。详细项目状态见 `memory/topics/`。

## Memory Architecture

| Layer | Path | Purpose |
|---|---|---|
| Core memory | `.claude/rules/04-MEMORY.md` + `.codex/rules/07-MEMORY.md` | Compact principles, current project index, durable decisions |
| User context | `.claude/rules/03-USER.md` + `.codex/rules/MEMORY-L1.md` | Stable user preferences and context |
| Topic memory | `memory/topics/<name>.md` | Detailed project or theme history |
| Daily notes | `memory/YYYY-MM-DD.md` | Raw chronological notes from recent work |

## Rules

- Store each fact in one place. Link or point to detail instead of duplicating it.
- Prefer dated, concrete memories over vague impressions.
- Remove or demote stale context during maintenance.
- Keep this file short enough to remain useful when automatically loaded.
- When the memory structure changes, update the relevant instructions and templates together.

## Current Context

以 `memory/topics/supplier-management.md` 为主线（最后更新 2026-09-07）。

**活跃项目**:
- **供应商管理** — 巡检自动化、速迅达分转包、242人切量、联盟工作坊。详见 topic
- **voice-workstation** — P5 商业化 UI 进行中，森林绿科技风 DESIGN.md 已出。详见 topic

**等待解阻**:
- **人机协同课程** — 阻塞在 JD 课程 03-10 结构输入（42天）

**参考文档（不需要周期更新）**:
- design-philosophy.md — 设计哲学，被多个技能引用
- cognitive-contract.md — 认知协议，决策框架

## Durable Lessons

> 以下为跨项目高频教训摘要。完整版见 `.codex/rules/07-MEMORY.md`。

- **正式书面材料去技术过程描述** — 汇报/对外材料不提AI操作过程（搜索工具、无头浏览器等），只呈现业务结论。12天内被纠正3次，是铁律
- **查企业工商信息首选百度搜索** — 企查查/天眼查对无头浏览器反爬，百度AI摘要直接给
- **Homebrew Python 用 pipx** — PEP 668 生效，pip3 install 报错
- **Python 中文引号冲突** — ASCII双引号在中文语境中被误判为字符串终止符，用单引号包裹
- **MiMo UltraSpeed 只支持 API 模式** — Token Plan 的 tp- key 无法调用，需 sk- key
