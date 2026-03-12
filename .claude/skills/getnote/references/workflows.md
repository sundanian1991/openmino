---
input: getnote 异步任务流程需求
output: 链接/图片笔记异步流程、错误处理
pos: .claude/skills/getnote/references/workflows.md

# Get 笔记 Workflows — 异步任务流程

> 链接笔记和图片笔记的完整异步流程


## ⚠️ 核心原则

**链接笔记和图片笔记是异步生成的，必须按以下流程与用户沟通**：

1. 提交任务后立即告知用户「正在处理」
2. 后台轮询直到完成
3. 完成后展示具体内容


## 链接笔记完整流程

### 步骤 1：提交任务

```
POST /open/api/v1/resource/note/save
{
  "note_type": "link",
  "link_url": "https://..."
}
```

**拿到 task_id 后，立即发消息给用户**：

> ✅ 链接已保存，正在抓取原文和生成总结，稍后告诉你结果...


### 步骤 2：后台轮询（10-30 秒间隔）

```
POST /open/api/v1/resource/note/task/progress
{task_id}
→ 直到 status=success 或 failed
```


### 步骤 3：任务完成后调详情

```
GET /open/api/v1/resource/note/detail?id={note_id}
```

**然后发第二条消息，包含具体内容**：

> ✅ 笔记生成完成！
> - 📄 **原文**：已保存 {web_page.content 字数} 字
> - 📝 **总结**：{content 内容，即 AI 生成的摘要}
> - 🔗 **来源**：{web_page.url}


## 图片笔记完整流程

### 步骤 1-3：获取凭证 → 上传 OSS → 提交任务

```
1. GET /open/api/v1/resource/image/upload_token?mime_type=jpg
   → 获取上传凭证

2. POST {host} 上传文件到 OSS
   → 上传成功

3. POST /open/api/v1/resource/note/save
   {note_type:"img_text", image_urls:[access_url]}
   → 返回 task_id
```

**拿到 task_id 后，立即发消息给用户**：

> ✅ 图片已保存，正在识别内容，稍后告诉你结果...


### 步骤 4：后台轮询

```
POST /open/api/v1/resource/note/task/progress
{task_id}
→ 直到 status=success 或 failed
```


### 步骤 5：任务完成后调详情

```
GET /open/api/v1/resource/note/detail?id={note_id}
```

**然后发第二条消息**：

> ✅ 图片笔记生成完成！
> - 📝 **识别内容**：{content 内容}
> - 🏷️ **标签**：{tags}


## 流程图对比

| 笔记类型 | 步骤数 | 是否异步 | 轮询间隔 |
|---------|--------|---------|---------|
| **纯文本** | 1 步 | ❌ 同步 | 不需要 |
| **链接** | 3 步 | ✅ 异步 | 10-30 秒 |
| **图片** | 5 步 | ✅ 异步 | 10-30 秒 |


## 用户体验要点

**必须做到**：
1. 异步任务必须告知用户「正在处理」
2. 轮询间隔不要太快（10-30 秒）
3. 完成后必须展示具体内容，不只是「已完成」

**禁止行为**：
- ❌ 提交后不告知用户
- ❌ 轮询间隔 < 5 秒
- ❌ 完成后只说「好了」，不展示内容


## 错误处理

### 非会员错误

API 返回 `error.reason: "not_member"` 或错误码 `10201`：

**引导开通会员**：
- 开通链接：https://www.biji.com/checkout?product_alias=6AydVpYeKl

### 限流错误

429 错误时，检查 `rate_limit` 字段：

- `write_note.daily` 用尽 → 建议明天再试
- `read.daily` 用尽 → 建议明天再试
- `qps_*` 超限 → 降低轮询频率

### 任务失败

`status: failed` 时：

**告知用户**：
> ⚠️ 笔记生成失败：{error_msg}
> 请稍后重试，或检查链接/图片是否有效


## 何时读取

**主 SKILL.md 使用**：
- 需要快速决策时（「快速决策」表）
- 需要核心 API 概览时

**本文件使用**：
- 需要异步任务详细流程时
- 需要用户体验要点时
- 需要错误处理指南时


*最后更新：2026-03-12 — 从 SKILL.md 拆分*

