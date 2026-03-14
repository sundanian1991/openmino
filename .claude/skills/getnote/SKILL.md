---
name: getnote
description: |
  Get 笔记 - 个人笔记管理工具。

  **当用户想要「保存到 Get 笔记」「记录到 Get 笔记」「记下来」「存到笔记」「添加到笔记」时，使用此技能。**

  触发场景：
  - 「记一下xxx」「保存到笔记」
  - 「保存这个链接」「保存这张图」
  - 「查我的笔记」「找一下笔记」
  - 「加标签」「删标签」「删笔记」
  - 「查知识库」「建知识库」「把笔记加到知识库」
  - 「知识库里订阅了哪些博主」「博主发了什么内容」「直播总结」「直播原文」

  功能：新建笔记、查询笔记、删除笔记、管理标签和知识库。
  支持类型：纯文本笔记、链接笔记（自动抓取网页内容）、图片笔记、知识库管理。
---

# Get 笔记技能

## 核心工作流

### Step 1: 识别用户意图

根据用户说的话，判断操作类型：

| 用户意图 | 操作 | MCP 工具 |
|---------|------|----------|
| 记一下、保存笔记 | 新建纯文本 | save_note |
| 保存这个链接 | 新建链接笔记 | save_note + get_note_task_progress |
| 保存这张图 | 新建图片笔记 | upload_image + save_note |
| 查我的笔记 | 获取列表 | list_notes |
| 看原文/转写 | 获取详情 | get_note |
| 加标签 | 添加标签 | add_note_tags |
| 删标签 | 删除标签 | delete_note_tag |
| 删笔记 | 删除笔记 | delete_note |
| 查知识库 | 知识库列表 | list_topics |
| 建知识库 | 创建知识库 | create_topic |
| 笔记加入知识库 | 批量添加 | batch_add_notes_to_topic |
| 从知识库移除 | 移除笔记 | remove_note_from_topic |
| 博主/直播 | 知识库内容 | list_topic_bloggers / list_topic_lives |

### Step 2: 调用 MCP 工具

**已配置的 MCP 服务器**：
- MCP ID: `getnote-mcp`
- 路径: `/tmp/getnote-mcp/dist/index.js`
- 工具列表：list_notes, get_note, save_note, delete_note, add_note_tags, delete_note_tag, list_topics, create_topic, batch_add_notes_to_topic, remove_note_from_topic, upload_image, get_upload_token, list_topic_bloggers, list_topic_blogger_contents, get_blogger_content_detail, list_topic_lives, get_live_detail, get_quota

### Step 3: 返回结果

- 纯文本笔记：直接返回成功结果
- 链接/图片笔记：**必须轮询**，等待处理完成后再展示内容
- 列表查询：格式化成易读的列表
- 知识库：展示名称和统计信息

---

## 异步任务流程（必须遵循）

### 链接笔记

1. 调用 `save_note(note_type="link", link_url="...")`
2. **立即告知用户**：✅ 链接已保存，正在抓取原文和生成总结，稍后告诉你结果...
3. 轮询 `get_note_task_progress(task_id="...")` 直到 success/failed（10-30秒间隔）
4. 成功后调用 `get_note(id=note_id)` 获取详情
5. 展示：原文字数、AI总结、来源链接

### 图片笔记

1. 调用 `upload_image(image_path="...")` 获取 access_url
2. 调用 `save_note(note_type="img_text", image_urls=[access_url])`
3. **立即告知用户**：✅ 图片已保存，正在识别内容，稍后告诉你结果...
4. 轮询 `get_note_task_progress(task_id="...")`
5. 成功后展示识别内容和标签

---

## 质量检查清单

- [ ] 笔记数据属于用户隐私，不主动在群聊中展示完整内容
- [ ] 链接/图片笔记必须轮询，不能假设立即完成
- [ ] 轮询间隔 10-30 秒，不过于频繁
- [ ] 完成后必须展示具体内容，不只说「已完成」
- [ ] 错误时给出清晰的问题描述和解决建议

---

## 快速参考

### 常用 MCP 工具调用

```python
# 列出笔记
list_notes(since_id=0)

# 保存纯文本
save_note(content="笔记内容", title="标题", note_type="plain_text")

# 保存链接
save_note(note_type="link", link_url="https://...")

# 获取详情
get_note(id=123456789)

# 添加标签
add_note_tags(note_id=123456789, tags=["工作", "重要"])

# 知识库列表
list_topics(page=1, size=20)
```

### Base URL
```
https://openapi.biji.com
```

### 认证
- Authorization: `gk_live_xxx`
- X-Client-ID: `cli_xxx`

---

## 错误处理

| 错误码 | 说明 | 处理 |
|--------|------|------|
| 10001 | 鉴权失败 | 检查 API Key |
| 10201 | 非会员 | 引导开通会员 |
| 20001 | 笔记不存在 | 确认笔记 ID |
| 42900 | 限流 | 降低频率 |

---

*最后更新：2026-03-13 — 从 OpenClaw 技能包转换为 MyAgents Skill*
