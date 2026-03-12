---
input: getnote API 调用需求
output: 完整 API 参数、返回值、错误处理参考
pos: .claude/skills/getnote/references/api-reference.md

# Get 笔记 API Reference — 完整文档

> 所有 API 的完整参考，包括参数、返回、错误处理


## Base URL

```
https://openapi.biji.com
```

**所有 API 请求必须使用此 Base URL**。


## 认证

**请求头**：
- `Authorization: $GETNOTE_API_KEY`（格式：`gk_live_xxx`）
- `X-Client-ID: $GETNOTE_CLIENT_ID`（格式：`cli_xxx`）

### Scope 权限

| Scope | 说明 |
|-------|------|
| note.content.read | 笔记列表、内容读取 |
| note.content.write | 文字/链接/图片笔记写入 |
| note.tag.write | 添加、删除笔记标签 |
| note.content.trash | 笔记移入回收站 |
| topic.read | 知识库列表 |
| topic.write | 创建知识库 |
| note.topic.read | 笔记所属知识库查询 |
| note.topic.write | 笔记加入/移出知识库 |
| note.image.upload | 获取上传图片签名 |


## 笔记 API

### 笔记列表

```
GET /open/api/v1/resource/note/list?since_id=0
```

**参数**：
- `since_id` (int64, 必填) - 游标，首次传 0，后续用 next_cursor

**返回**：
- `notes[]` - 笔记列表（每次固定 20 条）
- `has_more` - 是否有更多
- `next_cursor` - 下次游标
- `total` - 总数

**笔记类型 note_type**：
- `plain_text` - 纯文本
- `img_text` - 图片笔记
- `link` - 链接笔记
- `audio` - 即时录音
- `meeting` - 会议录音
- `local_audio` - 本地音频
- `internal_record` - 内录音频
- `class_audio` - 课堂录音
- `recorder_audio` - 录音卡长录
- `recorder_flash_audio` - 录音卡闪念


### 笔记详情

```
GET /open/api/v1/resource/note/detail?id={note_id}
```

**参数**：
- `id` (int64, 必填) - 笔记 ID

**详情独有字段**（列表不返回）：
- `audio.original` - 语音转写原文
- `audio.play_url` - 音频播放地址
- `audio.duration` - 音频时长（秒）
- `web_page.content` - 链接网页原文
- `web_page.url` - 原始链接
- `web_page.excerpt` - 摘要
- `attachments[]` - 附件列表，type: audio | image | link | pdf


### 新建笔记

```
POST /open/api/v1/resource/note/save
Content-Type: application/json
```

**仅支持新建，不支持编辑**。

**请求体**：
```json
{
  "title": "笔记标题",
  "content": "Markdown 内容",
  "note_type": "plain_text",
  "tags": ["标签 1", "标签 2"],
  "parent_id": 0,
  "link_url": "https://...",
  "image_urls": ["https://..."]
}
```

**字段说明**：
- `title` (string) - 标题
- `content` (string) - Markdown 内容
- `note_type` (string) - plain_text | link | img_text，默认 plain_text
- `tags` (string[]) - 标签列表
- `parent_id` (int64) - 父笔记 ID，创建子笔记时填
- `link_url` (string) - 链接笔记必填
- `image_urls` (string[]) - 图片笔记必填，用 access_url

**返回模式**：
- **纯文本笔记**：同步返回，立即完成
- **链接笔记/图片笔记**：返回 task_id，必须轮询 `/task/progress`


### 查询任务进度

```
POST /open/api/v1/resource/note/task/progress
Content-Type: application/json
```

**请求体**：
```json
{"task_id": "task_abc123xyz"}
```

**返回**：
- `status`: pending | processing | success | failed
- `note_id`: 成功时返回笔记 ID
- `error_msg`: 失败时返回错误信息

**轮询建议**：10-30 秒间隔，直到 success 或 failed。


### 删除笔记

```
POST /open/api/v1/resource/note/delete
Content-Type: application/json
```

**请求体**：
```json
{"note_id": 123456789}
```

笔记移入回收站，需要 `note.content.trash` scope。


## 标签 API

### 添加标签

```
POST /open/api/v1/resource/note/tags/add
Content-Type: application/json
```

**请求体**：
```json
{
  "note_id": 123456789,
  "tags": ["工作", "重要"]
}
```

**标签类型 type**：
- `ai` - AI 自动生成
- `manual` - 用户手动添加
- `system` - 系统标签（**不可删除**）


### 删除标签

```
POST /open/api/v1/resource/note/tags/delete
Content-Type: application/json
```

**请求体**：
```json
{
  "note_id": 123456789,
  "tag_id": "123"
}
```

⚠️ system 类型标签不允许删除。


## 知识库 API

### 知识库列表

```
GET /open/api/v1/resource/knowledge/list?page=1&size=20
```

**参数**：
- `page`: 页码，从 1 开始，默认 1
- `size`: 每页数量，默认 20，最大 100

**返回**：
- `topics[]` - 知识库列表
- `has_more` - 是否有更多
- `total` - 总数


### 创建知识库

```
POST /open/api/v1/resource/knowledge/create
Content-Type: application/json
```

**请求体**：
```json
{
  "name": "知识库名称",
  "description": "描述",
  "cover": ""
}
```

⚠️ 每天最多创建 50 个知识库（北京时间 00:00 重置）。


### 知识库笔记列表

```
GET /open/api/v1/resource/knowledge/notes?topic_id=abc123&page=1
```

**参数**：
- `topic_id` (string, 必填) - 知识库 ID（alias id）
- `page`: 页码，从 1 开始

每页固定 20 条，用 `has_more` 判断是否有下一页。


### 添加笔记到知识库

```
POST /open/api/v1/resource/knowledge/note/batch-add
Content-Type: application/json
```

**请求体**：
```json
{
  "topic_id": "abc123",
  "note_ids": [123456789, 123456790]
}
```

⚠️ 每批最多 20 条。已存在的笔记会跳过。


### 从知识库移除笔记

```
POST /open/api/v1/resource/knowledge/note/remove
Content-Type: application/json
```

**请求体**：
```json
{
  "topic_id": "abc123",
  "note_ids": [123456789]
}
```


## 图片上传

### 获取上传凭证

```
GET /open/api/v1/resource/image/upload_token?mime_type=jpg&count=1
```

**参数**：
- `mime_type`: jpg | png | gif | webp，默认 png
- `count`: 需要的 token 数量，默认 1，最大 9

⚠️ **mime_type 必须与实际文件格式一致**，否则 OSS 签名失败。

**返回字段**：
- `host` - OSS 上传地址
- `object_key` - 文件路径
- `accessid, policy, signature` - 签名参数
- `callback` - 回调地址
- `access_url` - 上传后的访问地址
- `oss_content_type` - Content-Type


### OSS 上传

```bash
curl -X POST "$host" \
  -F "key=$object_key" \
  -F "OSSAccessKeyId=$accessid" \
  -F "policy=$policy" \
  -F "signature=$signature" \
  -F "callback=$callback" \
  -F "Content-Type=$oss_content_type" \
  -F "file=@/path/to/image.jpg"
```


## 错误处理

### 响应结构

```json
{
  "success": false,
  "error": {
    "code": 10001,
    "message": "unauthorized",
    "reason": "not_member"
  },
  "request_id": "xxx"
}
```

### 错误码

| 错误码 | 说明 |
|--------|------|
| 10000 | 参数错误 |
| 10001 | 鉴权失败 |
| 10201 | 非会员 |
| 20001 | 笔记不存在 |
| 30000 | 服务调用失败 |
| 42900 | 限流 |
| 50000 | 系统错误 |

### error.reason 取值

| reason | 说明 |
|--------|------|
| not_member | 非会员，引导开通 |
| qps_global | 全局 QPS 超限 |
| qps_bucket | 桶级 QPS 超限 |
| quota_day | 当日配额用尽 |
| quota_month | 当月配额用尽 |

### 限流响应

429 错误时，error 包含 `rate_limit` 字段：

```json
{
  "rate_limit": {
    "read": {
      "daily": {"limit": 1000, "used": 1000, "remaining": 0, "reset_at": 1741190400},
      "monthly": {"limit": 10000, "used": 3000, "remaining": 7000, "reset_at": 1743811200}
    },
    "write": {
      "daily": {"limit": 200, "used": 200, "remaining": 0, "reset_at": 1741190400},
      "monthly": {"limit": 2000, "used": 600, "remaining": 1400, "reset_at": 1743811200}
    },
    "write_note": {
      "daily": {"limit": 50, "used": 50, "remaining": 0, "reset_at": 1741190400},
      "monthly": {"limit": 500, "used": 150, "remaining": 350, "reset_at": 1743811200}
    }
  }
}
```


## 何时读取

**主 SKILL.md 使用**：
- 需要完整 API 参数时
- 需要错误码详情时
- 需要限流配额详情时

**快速决策**：读主 SKILL.md 的「快速决策」表


*最后更新：2026-03-12 — 从 SKILL.md 拆分*

