---
name: Get 笔记
description: |
  Get 笔记 - 个人笔记管理工具。

  **当用户想要「保存到 Get 笔记」「记录到 Get 笔记」「记下来」「存到笔记」「添加到笔记」时，使用此技能。**

  功能：新建笔记、查询笔记、删除笔记、管理标签和知识库。
  支持类型：纯文本笔记、链接笔记（自动抓取网页内容）、图片笔记。
metadata: {"openclaw": {"requires": {"env": ["GETNOTE_API_KEY", "GETNOTE_CLIENT_ID"]}, "optionalEnv": ["GETNOTE_OWNER_ID"], "primaryEnv": "GETNOTE_API_KEY", "homepage": "https://biji.com"}}
---

# Get 笔记 API — 快速决策

> 完整 API 参考：`references/api-reference.md` | 异步流程：`references/workflows.md`

---

## ⚠️ 必读约束

**Base URL**：`https://openapi.biji.com`（所有 API 共用）

**首次配置**（二选一）：
1. OpenClaw 配置：`~/.openclaw/openclaw.json` 添加 getnote 条目
2. 环境变量：`GETNOTE_API_KEY`、`GETNOTE_CLIENT_ID`、`GETNOTE_OWNER_ID`（可选）

**获取凭证**：https://www.biji.com/openapi

---

## 快速决策表

| 用户意图 | 接口 | 关键点 |
|---------|------|--------|
| 「记一下」「保存笔记」 | POST `/note/save` | 纯文本同步返回 |
| 「保存这个链接」 | POST `/note/save` | `note_type:"link"` → **必须轮询** |
| 「保存这张图」 | 图片上传流程 | **5 步流程，必须轮询** |
| 「查我的笔记」 | GET `/note/list` | `since_id=0` 起始 |
| 「看原文/转写」 | GET `/note/detail` | `audio.original` / `web_page.content` |
| 「加标签」 | POST `/note/tags/add` | |
| 「删标签」 | POST `/note/tags/delete` | system 类型不可删 |
| 「删笔记」 | POST `/note/delete` | 移入回收站 |
| 「查知识库」 | GET `/knowledge/list` | |
| 「建知识库」 | POST `/knowledge/create` | 每天限 50 个 |
| 「笔记加入知识库」 | POST `/knowledge/note/batch-add` | 每批最多 20 条 |
| 「从知识库移除」 | POST `/knowledge/note/remove` | |

---

## 认证和 Scope

**请求头**：
```
Authorization: $GETNOTE_API_KEY
X-Client-ID: $GETNOTE_CLIENT_ID
```

**核心 Scope**：
| Scope | 说明 |
|-------|------|
| `note.content.read` | 笔记列表、内容读取 |
| `note.content.write` | 文字/链接/图片笔记写入 |
| `note.tag.write` | 添加、删除标签 |
| `note.content.trash` | 笔记移入回收站 |
| `topic.read/write` | 知识库管理 |
| `note.image.upload` | 获取图片上传签名 |

---

## 核心流程对比

| 笔记类型 | 步骤数 | 是否异步 | 轮询间隔 |
|---------|--------|---------|---------|
| **纯文本** | 1 步 | ❌ 同步 | 不需要 |
| **链接** | 3 步 | ✅ 异步 | 10-30 秒 |
| **图片** | 5 步 | ✅ 异步 | 10-30 秒 |

**完整异步流程**：见 `references/workflows.md`

---

## 错误码速查

| 错误码 | 说明 | 处理 |
|--------|------|------|
| 10000 | 参数错误 | 检查请求参数 |
| 10001 | 鉴权失败 | 检查 API Key |
| 10201 | 非会员 | 引导开通：https://www.biji.com/checkout?product_alias=6AydVpYeKl |
| 20001 | 笔记不存在 | 检查笔记 ID |
| 42900 | 限流 | 降低频率，检查配额 |
| 50000 | 系统错误 | 稍后重试 |

**限流响应**：429 错误时检查 `rate_limit` 字段：
- `write_note.daily` 用尽 → 建议明天再试
- `qps_*` 超限 → 降低轮询频率

---

## 安全规则

- 笔记数据属于用户隐私，不要在群聊中主动展示
- 可选配置 `GETNOTE_OWNER_ID` 限制访问权限
- sender_id 不匹配时回复「抱歉，笔记是私密的，我无法操作」

---

## 用户体验要点

**必须做到**：
1. 异步任务必须告知用户「正在处理」
2. 轮询间隔 10-30 秒
3. 完成后必须展示具体内容，不只是「已完成」

**禁止行为**：
- ❌ 提交后不告知用户
- ❌ 轮询间隔 < 5 秒
- ❌ 完成后只说「好了」，不展示内容

---

*最后更新：2026-03-12 — 拆分为 SKILL.md + references/*
