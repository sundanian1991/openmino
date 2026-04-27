# 实用技能：Icon Retrieval / Markdown Converter / IMA Note / Daily Letter

> Sources: MyAgents, 2026-04-27
> Raw: [icon-retrieval](../../raw/skills/icon-retrieval-SKILL.md); [markdown-converter](../../raw/skills/markdown-converter-SKILL.md); [ima-note](../../raw/skills/ima-note-SKILL.md); [ima-note-api](../../raw/skills/ima-note-api.md); [getnote](../../raw/skills/getnote-SKILL.md); [daily-letter](../../raw/skills/daily-letter-SKILL.md); [darwin-skill](../../raw/skills/darwin-skill-SKILL.md); [darwin-README](../../raw/skills/darwin-skill-README.md)

## 概述

本条目综合五个实用型技能：Icon Retrieval 提供图标搜索与 SVG 字符串直取能力；Markdown Converter 基于 `uvx markitdown` 将多种文档格式转为 Markdown；IMA Note 通过腾讯 IMA OpenAPI 实现笔记的搜索、创建、追加与读取；Daily Letter 每日书信从双数据源对话中提取想法种子，以李娟叙事与芒格洞察视角生成书信体记忆。这些技能覆盖视觉素材获取、文档格式转换、个人笔记管理和记忆沉淀四个核心场景。

---

## Icon Retrieval

### 功能定位

Icon Retrieval 提供图标库的关键词搜索与 SVG 字符串直取能力。适用于信息图、网页开发、设计项目等需要快速匹配概念图标的场景。

### 使用方式

核心命令通过 Node.js 脚本执行：

```
node ./scripts/search.js '<search_query>' [topK]
```

`search_query` 为必填的搜索关键词，`topK` 为可选的结果数量上限（默认 5）。搜索返回 JSON 对象，包含查询词、请求数量上限、实际返回数量以及结果数组。每条结果包含 `url`（图标来源链接）和 `svg`（完整 SVG 字符串内容），可直接嵌入项目使用。

### 实践要点

使用描述性单词作为查询词效果最佳。同义变体需要分别尝试，比如 "security"、"secure"、"shield" 可能返回不同结果。脚本内置错误处理：缺少查询词时返回使用说明，服务不可用时返回错误信息，无匹配结果时返回空数组并附带警告。默认返回 5 个图标，通过 `topK` 参数可以灵活调整结果数量。

---

## Markdown Converter

### 功能定位

Markdown Converter 基于 `uvx markitdown` 命令行工具，无需本地安装即可将多种文档格式转换为 Markdown 文本。核心价值在于零依赖、零安装，首次运行自动缓存依赖，后续调用更快。

### 支持的格式

文档类：PDF、Word (.docx)、PowerPoint (.pptx)、Excel (.xlsx/.xls)。Web 与数据类：HTML、CSV、JSON、XML。媒体类：图片（支持 EXIF 元数据提取和 OCR 文字识别）、音频（支持 EXIF 和语音转录）。其他：ZIP 压缩包（自动遍历内部文件）、YouTube URL、EPub 电子书。

### 基本用法

```
uvx markitdown input.pdf                    # 输出到标准输出
uvx markitdown input.pdf -o output.md       # 保存为文件
cat input.pdf | uvx markitdown              # 从标准输入读取
```

关键选项包括：`-o` 指定输出文件、`-x` 提示文件扩展名（用于标准输入场景）、`-m` 提示 MIME 类型、`-c` 提示字符集（如 UTF-8）、`-d` 启用 Azure Document Intelligence 提升 PDF 提取质量、`-e` 指定 Document Intelligence 端点、`--use-plugins` 启用第三方插件。

### 输出质量保证

转换过程保留原文档的结构层级：标题、表格、列表、链接均按 Markdown 语法还原。对于提取质量较差复杂 PDF，建议启用 `-d` 选项配合 Azure Document Intelligence 获得更精准的文本提取。

---

## IMA Note

### 功能定位

IMA Note 通过腾讯 IMA 的 OpenAPI 管理个人笔记系统，涵盖搜索、浏览、读取、创建、追加等全生命周期操作。`ima-note-SKILL.md` 侧重工作流程和调用模板，`ima-note-api.md` 侧重完整的数据结构定义和接口参数规范，两份文件互为补充。

### 认证与安全

所有请求必须携带三个 HTTP Header：`ima-openapi-clientid`、`ima-openapi-apikey`、`Content-Type: application/json`。凭证通过环境变量 `IMA_OPENAPI_CLIENTID` 和 `IMA_OPENAPI_APIKEY` 注入，建议写入 shell 配置文件避免每次失效。调用前需执行凭证预检，环境变量缺失时立即终止操作。

隐私保护是核心约束：笔记内容属于用户隐私，群聊场景下只展示标题和摘要，禁止展示正文。仅响应授权用户的笔记操作请求。

### 六大接口

| 用户意图 | 接口路径 | 关键参数 |
|---------|---------|---------|
| 搜索笔记 | `search_note_book` | `query_info`（QueryInfo 对象）、`search_type`（0=标题/1=正文）、`start`/`end`（翻页） |
| 查看笔记本列表 | `list_note_folder_by_cursor` | `cursor`（首页传 `"0"`）、`limit`（不超过 20） |
| 浏览某笔记本的笔记 | `list_note_by_folder_id` | `folder_id`（空为全部）、`cursor`（首次传 `""`）、`limit` |
| 读取笔记正文 | `get_doc_content` | `doc_id`、`target_content_format`（推荐 0=纯文本） |
| 新建笔记 | `import_doc` | `content`、`content_format`（固定 1）、可选 `folder_id` |
| 追加到已有笔记 | `append_doc` | `doc_id`、`content`、`content_format`（固定 1） |

### UTF-8 编码强制要求

这是 IMA Note 最关键的质量约束。每次调用 `import_doc` 或 `append_doc` 之前，必须对所有字符串字段执行 UTF-8 编码校验，无论内容来源——用户直接输入、文件读取、WebFetch 抓取、外部 API 返回，都不能假设已经是合法 UTF-8，必须显式确认。跳过此步骤会导致笔记在 IMA 中显示为乱码且无法修复。

各环境转码方法：Python（推荐，几乎所有环境都有）按 `utf-8 → gbk → gb2312 → big5 → latin-1` 顺序尝试解码；Node.js 使用 `TextDecoder`；Unix/macOS/Linux 使用 `iconv` 自动检测源编码。

PowerShell 5.1 环境下存在已知设计缺陷：`Invoke-RestMethod` 会静默将请求 Body 从 UTF-8 转为系统 ANSI 编码（中文 Windows 为 GBK），即使设置了 `Content-Type: charset=utf-8` 也无效。必须在写入前检测 `$PSVersionTable.PSVersion.Major`，5.x 版本必须使用 UTF-8 字节数组模式发送请求，否则中文笔记必然乱码。

### 分页机制

三种分页方式并存：游标分页用于笔记本列表（首次 `cursor: "0"`）和笔记列表（首次 `cursor: ""`），后续用 `next_cursor`，`is_end=true` 时停止；偏移量分页用于搜索（首次 `start: 0, end: 20`，翻页递增）；根目录 ID 格式为 `user_list_{userid}`，从 `folder_type=1` 的笔记本条目获取。

### 错误码体系

核心错误码覆盖：0=成功、100001=参数错误、100002=无效 ID、100003=服务器内部错误、100004=大小不合法或空间不够、100005=无权限、100006=笔记已删除、100008=版本冲突、100009=超过大小限制（需拆分多次 append_doc）、310001=笔记本不存在。鉴权相关：20002=apiKey 超频、20004=鉴权失败、110037=apiKey 过期。

### 数据结构层级

返回数据为嵌套结构，需按层级解析：搜索结果取 `docs[].doc.basic_info.docid`、笔记本取 `note_book_folders[].folder.basic_info.folder_id`、笔记列表取 `note_book_list[].basic_info.basic_info.docid`。核心数据类型包括 DocBasic（笔记基本信息）、NoteBookFolderBasic（笔记本基本信息）、QueryInfo（搜索查询）、SearchedDoc（搜索结果）、NoteBookInfo（笔记列表条目）等。

---

## Daily Letter

### 功能定位

每日书信技能实现"十年记忆切片"——每天自动从对话中提取想法种子，以李娟的人文叙事风格搭配芒格的智慧洞察视角，生成书信体记忆。核心理念是"一部连续剧，而非每日快照"：每封信既属于今天，又属于整条时间线。触发词包括"每日书信"、"daily letter"、"写信"、"今天的信"、"记忆书信"。

### 双数据源架构

书信生成必须读取两份独立数据源，合并后去重，任何单一数据源都不能代表全貌。

第一数据源是 JSONL 会话文件（`~/.myagents/sessions/*.jsonl`），按文件修改时间筛选当日会话，包含 MyAgents 的全部对话。第二数据源是 CodePilot 数据库（`~/.codepilot/codepilot.db`，SQLite），按日期筛选当日会话，包含 my-agent/mino 等项目的对话。两份数据源各有独立会话，必须都读、合并后按会话 ID 去重。

辅助数据源包括：项目日志（`memory/daily/YYYY-MM/YYYY-MM-DD.md` 当日对话摘要）、MemOS 记忆（当日新增记忆）、Git 文件变更（今日改动的文件）。Proma 和牛马 AI 因数据存储在 LevelDB 中，暂不支持自动读取。

### 三遍过筛机制

**第一遍滤噪声**：从全部对话中筛掉纯操作记录（安装技能、改代码、下载文件）、重复性事务（日常提醒、状态确认）、纯技术细节讨论（API 参数、格式修正），留下有判断、有犹豫、有追问、有反思、有情绪流露的对话。

**第二遍打标签**：在内容维度上分为认知（理解升级）、关系（人际互动）、工作（业务判断）、自己（自我觉察）、世界（外部观察）五类。在性质维度上标记判断、困惑、洞察、决定、情绪、追问，其中追问反复出现时权重升为极高。

**第三遍找模式**：横向比对今天带高权重标签的对话，寻找共同倾向（如三件事都体现"做减法"的倾向）；纵向追问同一主题是否反复出现；反常捕捉与平时不一样的表现；AI 自检要求每个模式必须有至少两个独立对话证据支撑，否则如实标注为"微弱信号"而非确定结论。

### 主题对齐与时间叙事

今天的种子需要落在之前已经长出来的土壤上。读取近 7 天信件追踪主题线索、近 30 天信件识别长期断线主题、MEMORY.md 查看长期记忆索引。匹配结果决定写法：新种子如实记录种下，深化明确引用过去的信，转折标注方向变化，回归标记"为什么是现在"，合并展现多事件汇聚效应。

### 书信体写作

风格融合李娟的温暖克制与画面感（从细节切入，不宏大叙事）和芒格的穿透表象追问本质的洞察能力。信的形态由主题对齐结果决定：形态 A 用于全天一个核心主题，从 2-3 个独立事件展开；形态 B 用于 2-3 个独立主题各有分量；形态 C 用于日常切片，没有深层内容但有有趣细节。

写作铁律：禁止流水账（按主题组织而非时间顺序）、禁止硬凑深度（平淡就写平淡）、禁止 AI 编模式（每个模式必须有对话证据）、禁止迎合（包含困惑、犹豫和不确定性）、引用原话不 paraphrase、用"我"和"你"而非"用户"。字数 600-1200 字，宁短勿长，空日 200-300 字。

### 校验规则

六项校验防止 AI 自嗨：双数据源必须都读取且合并去重；每个模式需要至少两个独立对话证据否则降级为微弱信号；信中必须包含困惑、犹豫或不确定性而非全是正面观察；引用的历史主题必须在过去的信中真实存在不编造；事件按主题组织而非时间顺序；每段必须传递新信息。
