---
name: read-joymeeting
description: 从 JoyMinutes (joyminutes.jd.com) 提取会议记录。通过复制本机浏览器 profile 并启动 headless 浏览器，自动继承 ERP SSO 登录态（无需手动登录），使用原生 CDP 协议直接调用 JoyMinutes API 提取数据，无需 Playwright MCP。当用户提到"查会议""会议记录""会议纪要""今天开了什么会""JoyMinutes""joyminutes""总结一下会议""会议转写""逐字稿""帮我看看昨天的会""把会议内容整理一下""最近几天的会议""本周会议"时，必须使用此技能。即使用户只是笼统地说"总结今天的工作"并提到了会议，也应考虑使用。
version: 1.0.0
---

# JoyMinutes 会议记录获取

## 用途

从京东 JoyMinutes 平台提取用户参与的会议记录。采用 headless 浏览器 + 原生 CDP 协议的方式，**一个脚本完成全部操作**：启动浏览器 → 继承登录态 → 调用 API → 返回数据 → 清理浏览器。无需 Playwright MCP 或任何额外依赖。

## 前置条件

- 用户本机已安装以下浏览器之一，并已登录过 JoyMinutes / ERP（cookie 存在于浏览器 profile 中）：
  - Google Chrome（优先）
  - Tabbit（京东内部浏览器）
  - Microsoft Edge
  - Chromium

## 浏览器优先级

脚本按以下顺序检测和使用浏览器：

1. **当前活跃窗口的浏览器**：如果用户正在使用某个浏览器，优先尝试该浏览器
2. **Chrome**：优先级最高的标准浏览器
3. **Tabbit**：京东内部浏览器，作为 Chrome 登录态失效时的 fallback
4. **Edge**：作为额外的备选方案

## 使用方法

### 按日期范围查询

```bash
# 今天的会议
node "$SKILL_DIR/scripts/fetch-meetings.js"

# 昨天的会议
node "$SKILL_DIR/scripts/fetch-meetings.js" --date yesterday

# 本周的会议（周一到今天）
node "$SKILL_DIR/scripts/fetch-meetings.js" --date thisweek

# 上周的会议（上周一到上周日）
node "$SKILL_DIR/scripts/fetch-meetings.js" --date lastweek

# 指定单日
node "$SKILL_DIR/scripts/fetch-meetings.js" --date 2026-06-08

# 近7天
node "$SKILL_DIR/scripts/fetch-meetings.js" --date last7days

# 日期区间
node "$SKILL_DIR/scripts/fetch-meetings.js" --start 2026-06-03 --end 2026-06-09

# 加 --detail 获取文字记录和发言人详情
node "$SKILL_DIR/scripts/fetch-meetings.js" --date thisweek --detail
```

### 查询指定会议

```bash
# 按会议 ID 查询（ID 在 JoyMinutes URL 中：joyminutes.jd.com/video/{id}）
node "$SKILL_DIR/scripts/fetch-meetings.js" --id 21ac80c26e507f76 --detail
```

脚本会自动完成：

1. 检测并启动 headless Chrome（完全不可见，用户无感知）
2. 继承 Chrome 登录态（自动复制浏览器 profile）
3. 通过 CDP 协议在浏览器上下文中调用 JoyMinutes API
4. 关闭 Chrome 进程释放资源
5. 在 stdout 输出 JSON 结果

### 日期解析规则

| 用户说法                | --date 参数                         | 说明            |
| ----------------------- | ----------------------------------- | --------------- |
| "今天" / 未指定         | today（默认）                       | 仅今天          |
| "昨天"                  | yesterday                           | 仅昨天          |
| "本周"                  | thisweek 或 week                    | 本周一到今天    |
| "上周"                  | lastweek                            | 上周一到上周日  |
| "近 N 天" / "最近 N 天" | lastNdays（如 last7days）           | 从 N 天前到今天 |
| "YYYY-MM-DD"            | --date YYYY-MM-DD                   | 指定单日        |
| "X月X日到X月X日"        | --start YYYY-MM-DD --end YYYY-MM-DD | 指定区间        |

### 输出格式

成功时：

```json
{
  "success": true,
  "dateRange": { "start": "2026-06-03", "end": "2026-06-09" },
  "totalInList": 50,
  "filteredCount": 3,
  "meetings": [
    {
      "id": "21ac80c26e507f76",
      "title": "会议标题",
      "startTime": 1780914603000,
      "duration": "5421586",
      "creator": "创建者姓名",
      "members": [{ "name": "姓名", "account": "ERP" }],
      "url": "https://joyminutes.jd.com/video/21ac80c26e507f76",
      "speakers": [{ "name": "发言人", "proportion": 0.61, "totalTime": 3328414 }],
      "transcript": null,
      "attachments": [{ "name": "文件名", "url": "https://...", "type": "joyspace" }]
    }
  ]
}
```

**重要：transcript 字段结构**

当使用 `--detail` 参数时，`transcript` 是一个**数组**，每条记录包含：

```json
"transcript": [
  {
    "speaker": "发言人姓名",
    "text": "发言内容（该发言人该时段的所有句子已合并）",
    "beginMs": 1234567,
    "endMs": 2345678
  },
  {
    "speaker": "另一位发言人",
    "text": "发言内容...",
    "beginMs": 2345678,
    "endMs": 3456789
  }
]
```

若会议无转写记录，`transcript` 为 `null`。

**解析示例**：

```javascript
if (m.transcript && Array.isArray(m.transcript) && m.transcript.length > 0) {
  const fullText = m.transcript.map((item) => `[${item.speaker}]: ${item.text}`).join('\n')
  // 或按发言人分组统计
  const bySpeaker = {}
  m.transcript.forEach((item) => {
    if (!bySpeaker[item.speaker]) bySpeaker[item.speaker] = []
    bySpeaker[item.speaker].push(item.text)
  })
}
```

失败时：

```json
{ "success": false, "error": "错误描述" }
```

## 返回字段说明

| 字段        | 来源                        | 说明                                                                                         |
| ----------- | --------------------------- | -------------------------------------------------------------------------------------------- |
| title       | minutes.detail              | 会议标题                                                                                     |
| startTime   | minutes.detail / list       | 会议开始时间（毫秒时间戳）                                                                   |
| duration    | list                        | 会议录制时长（毫秒）                                                                         |
| creator     | list.userInfo               | 创建者姓名                                                                                   |
| members     | minutes.detail              | 参会人列表（姓名+ERP账号）                                                                   |
| speakers    | minutes.speakers.timelines  | 发言人列表（姓名、发言占比、发言时长）                                                       |
| transcript  | minutes.meetingrecord.query | 文字记录（需 --detail；**数组格式**，每项含 speaker/text/beginMs/endMs；为 null 表示无转写） |
| attachments | minutes.detail              | 会议附件（关联的 JoySpace 文档等）                                                           |
| url         | 构建                        | 会议详情页链接                                                                               |

## 总结输出规范

获取到会议数据后，按以下格式向用户总结：

**单日查询**：

- 总览（会议数、主要议题）
- 每场会议：标题、时间、链接、参会人、内容概述、关键讨论、决策结论、待办
- 综合要点

**多日/区间查询**：

- 总览（区间、会议总数、主要主题）
- 按日分组，每日下列出各场会议详情
- 综合要点（跨天主题归纳、持续跟进事项）

**质量要求**：

1. 每条会议都包含标题与链接，可追溯
2. 总结基于详细文字记录，不编造
3. 缺失信息明确标注，不捏造
4. 不输出 Cookie、Token 或登录信息

## 常见问题

### 报 SSO_REDIRECT 错误

ERP SSO cookie 已过期。脚本会自动尝试以下逻辑：

1. **优先使用当前活跃浏览器的登录态**：如果用户正在使用某个浏览器，优先尝试该浏览器的登录态
2. **Fallback 到其他浏览器**：如果当前浏览器登录态失效，自动尝试其他已安装的浏览器（Chrome → Tabbit → Edge）
3. **自动打开登录页**：如果所有浏览器的登录态都失效，脚本会自动打开浏览器登录页面，完成登录后重试即可

### 浏览器检测逻辑

脚本支持以下平台：

- **macOS**：检测活跃窗口、运行进程、浏览器路径
- **Windows**：检测运行进程、浏览器路径

浏览器检测顺序：

1. 当前活跃窗口的浏览器（最前端应用）
2. Chrome（运行中或已安装）
3. Tabbit（运行中或已安装）
4. Edge（运行中或已安装）

### 会议数据为空但 totalInList > 0

日期过滤没有匹配到会议。检查 --start/--end 日期是否正确，或扩大查询范围。

### 浏览器相关错误

- "未找到 Chrome、Tabbit 或 Edge 浏览器"：需要安装上述浏览器之一
- "CDP not ready"：端口被占用，脚本会自动在 9333-9350 范围内查找可用端口
