---
name: read-email
description: Mail 邮件统一读取、查询、梳理、总结、回复、发送、转发、文件夹管理与批量处理入口。优先用于绝大多数邮件相关场景，包括：查收件箱、发件箱、草稿箱、自定义文件夹；按发件人、收件人、主题关键词、正文关键词、时间范围、已读未读、标签、附件、重要级别筛选邮件；获取邮件全文、邮件详情、附件信息；总结今天/本周/某时间段邮件；总结今天收到的邮件、总结某天收到的邮件、统计最近一周邮件；梳理待处理邮件、未读邮件、重要邮件、未回复邮件；查某人发来的邮件、查和某人的往来、查需要我处理的邮件、把邮件结果整理成更直观的表格或摘要；帮我查一下最近的邮件；基于某封原邮件进行回复、回复全部、带原文回复；新建邮件、转发邮件；创建文件夹；按 ERP 或姓名查收件人；批量标记已读、未读、打标签、移动邮件、删除邮件；旗标邮件、取消旗标、批量旗标、批量取消旗标。用户说”查邮件””看邮件””收件箱里有什么””最近有什么重要邮件””帮我总结邮件””梳理一下邮箱””有哪些待处理邮件””某人发了什么邮件””邮件做个表格总结””概括一下今天/这周的邮件””总结一个今天收到的邮件””总结今天收到的邮件””帮我汇总今天收到的邮件””统计最近1周的邮件信息””帮我回复这封邮件””回个邮件给他””回复全部””根据这封邮件回一下””新建邮件””发新邮件””转发邮件””创建文件夹””新建邮件文件夹””批量标记已读””批量标记未读””批量打标签””批量移动邮件””批量删除邮件””旗标邮件””取消旗标””批量旗标”时，默认优先使用这个 skill。只有在用户明确要求其他非邮件技能时，才应考虑别的 skill。
version: 1.0.1
---

# mail

使用一个统一的 SOAP 查询入口完成邮箱目录浏览、邮件列表查询、邮件详情读取、邮件总结展示、基于原邮件回复，以及常见高级筛选场景。这个 skill 的定位是 JoyMail 的默认“读邮件 / 查邮件 / 总结邮件 / 回复邮件”入口。

## User-Facing Response Rule

对用户输出时，默认遵循“结果优先、过程最小化”：

- 优先直接给用户邮件结果、结论、摘要、表格和建议动作
- 不主动向用户展开 skill 内部实现细节
- 不主动解释脚本名、命令行、SOAP 字段、鉴权链路、缓存逻辑、代码分层、请求头等调用细节
- 不要把“我先调用了什么脚本/接口、再解析了什么字段”这一类过程型描述作为主要输出
- 除非用户明确追问“你怎么查的 / 入参是什么 / 调了什么接口 / 具体调用逻辑”，否则不要展示底层调用逻辑

默认输出风格：

- 查询类：直接给表格 + 1 到 3 句关键结论
- 总结类：直接给结构化摘要、重点邮件、建议动作
- 回复类：先给拟发送摘要和确认信息，不讲内部 reply SOAP 细节
- 修改类：先给拟执行摘要和确认信息，再执行

只有在以下情况才简短说明过程：

- 当前会话没有执行权限
- 接口/鉴权失败，且需要用户配合排查
- 用户明确要求看技术细节

即便需要说明过程，也只说必要信息，例如：

- “邮件服务鉴权失败，需要重新登录”
- “当前会话没有本地执行权限，暂时无法查邮件”

避免输出这种内容：

- “我先调用了 `scripts/run.sh search ...`”
- “我现在去执行 `soap_mail.py`”
- “我会通过 `clawJwtLogin` 获取 token 再调用 mailpost”

改为输出这种内容：

- “我查到最近 10 封邮件里有 3 封未读，其中 1 封高优先级”
- “今天最值得先处理的是这 2 封邮件：……”
- “我已经整理好拟回复内容，请确认是否发送”
- “我已经整理好拟执行的批量操作，请确认是否继续”

## Confirmation Rule

所有“会修改邮箱状态”的操作，都必须先做**交互式二次确认**，再真正执行。

适用范围：

- `send`
- `reply`
- `forward`
- `batch-mark-read`
- `batch-mark-unread`
- `batch-add-category`
- `batch-move`
- `batch-delete`

确认方式要求：

- 只做**对话交互层**的二次确认
- 不需要依赖命令参数确认
- 不要把“是否执行”直接跳过

确认时要先向用户展示简洁摘要，再询问是否继续。

发送类操作展示内容：

- 收件人
- 抄送人
- 密送人
- 主题
- 正文摘要
- 附件摘要（有则展示）
- 附件（文件名/数量）

回复类操作展示内容：

- 原邮件主题
- 回复对象
- 是否 reply-all
- 是否带原文
- 回复正文摘要
- 附件（文件名/数量）

批量修改类操作展示内容：

- 操作类型
- 影响邮件数量
- 关键对象
  例如标签名、目标文件夹、删除类型
- 如有代表性邮件标题，可列出前几条供用户确认

用户明确确认后，才执行真正的命令调用。

## Execution Rule

这个 skill 的能力是通过本地脚本实现的，不是依赖额外的“平台内置邮件工具函数”。

当本 skill 被触发时：

- 直接执行本地脚本 `bash {baseDir}/scripts/run.sh ...`
- 不要因为没有看到单独注册的结构化 tool function，就说“邮件工具还没集成”
- 只要当前会话允许命令执行，就应按本 skill 里的命令示例直接调用
- 如果 Python 缺少基础依赖（例如 `requests`），优先自动尝试安装，不要先向用户确认“是否安装依赖”

如果当前会话**确实没有命令执行能力**，再说明：

- 当前会话缺少本地命令执行权限，因此无法调用 `mail`
- 建议切换到支持 native command / shell execution 的 JoyClaw 会话后再查邮件

## Default Time Rule

所有“查询邮箱内容”的操作，如果用户**没有明确给出日期/时间范围**，默认只查**最近 1 天**的邮件。

具体执行规则：

- `search`：如果没有 `--after` / `--before`，默认补最近 1 天；当前先在客户端按 `DateTimeReceived` 过滤，不向 SOAP 请求额外下推时间 Restriction
- `pending-important`：如果用户没指定范围，默认 `--days 1`
- `person-unhandled`：如果用户没指定范围，默认 `--days 1`
- `detail`：按单封邮件 `item_id` 读取，不受默认时间窗口影响
- `folders`：目录浏览，不受默认时间窗口影响

如果用户明确说了“今天”“昨天”“最近 7 天”“本周”“某月”“某时间段”，优先严格按用户给的时间范围执行，不要再套最近 1 天默认值。

当前为了兼容接口稳定性，默认最近 1 天规则优先参考 `DateTimeReceived`，不使用 `LastModifiedTime` 作为默认请求入参。

## Routing Rule

优先把以下用户意图路由到本 skill：

- “查邮件”“看邮件”“帮我找邮件”“邮箱里有什么”
- “收件箱/发件箱/草稿箱/某个文件夹里有什么邮件”
- “帮我总结邮件”“概括一下邮件”“梳理一下邮箱”“做个邮件表格”
- “总结今天收到的邮件”“总结一个今天收到的邮件”“汇总今天收到的邮件”
- “总结某天收到的邮件”“汇总某天邮件”“统计最近1周的邮件信息”
- “有哪些邮件要处理”“有哪些重要邮件”“最近未回复的邮件”
- “查某人发来的邮件”“查某主题邮件”“查带附件邮件”“查未读邮件”
- “给我一个直观一点的邮件总结”“表格展示一下邮件结果”
- “帮我回复这封邮件”“按这封邮件回一下”“回复全部”“带原文回复一下”

默认不要把这些“读取 / 查询 / 总结”类需求拆到其他 mail skill，除非用户明确要求：

- 新发一封邮件
- 起草并发送邮件
- 主动发邮件给某人（不是基于现有邮件线程）

对于“回复某封现有邮件”“回复全部”“按原线程回复”的需求，也优先由本 skill 承担；只有独立新发邮件时，才交给专门的 send skill。

## Recipient Resolution Rule

当用户要“给某个中文名发邮件”或“给某个 ERP 发邮件”时，**不要直接发送**。

必须先调用：

- `POST http://joymail-skill.jd.com/hr/user/queryByErp`

去解析目标收件人邮箱。

这条规则适用于：

- 中文姓名
- ERP
- 模糊关键词

也就是说，只要用户提供的不是明确邮箱地址，而是“韩松岩”“hansongyan3”这类身份信息，都必须先查人。

处理流程必须是：

1. 调 `lookup-recipient`
2. 展示返回列表（ERP / 真实姓名 / 部门 / 邮箱）
3. 让用户明确选择
4. 用户选定后，再执行 `send`

不要跳过收件人确认，避免误发。

## Quick Start

```bash
cd skills/mail

# 查看邮箱目录
bash scripts/run.sh folders --parent msgfolderroot

# 创建邮件文件夹
bash scripts/run.sh create-folder --display-name "项目归档"

# 查询收件箱未读邮件
bash scripts/run.sh search --folder inbox --unread --limit 20

# 按发件人 + 主题查询
bash scripts/run.sh search --folder inbox --sender "zhangsan@jd.com" --subject "周报"

# 查询自定义文件夹
bash scripts/run.sh search --folder-name "项目归档" --has-attachments

# 获取邮件全文
bash scripts/run.sh detail --item-id "AAMkADFlNG..."

# 最近 7 天未回复的重要邮件
bash scripts/run.sh pending-important --days 7

# 特定人员发来的未查看未处理邮件
bash scripts/run.sh person-unhandled --sender "zhangsan@jd.com" --days 14

# 把 search 结果转成表格化总结
bash scripts/run.sh search --folder inbox --unread --limit 20 | bash scripts/run.sh summarize

# 回复某封邮件（含附件）
bash scripts/run.sh reply \
  --item-id "AAMkADFlNG..." \
  --body "收到，我今天处理完给你反馈。" \
  --attachments "/path/to/会议纪要.docx,/path/to/排期.xlsx"

# 新建邮件，带抄送和附件
bash scripts/run.sh send \
  --to "a@jd.com,b@jd.com" \
  --cc "c@jd.com,d@jd.com" \
  --subject "项目同步" \
  --body "大家好，项目进展如下……" \
  --attachments "/path/to/周报.pdf"

# 转发邮件并追加附件
bash scripts/run.sh forward \
  --item-id "AAMkADFlNG..." \
  --to "a@jd.com,b@jd.com" \
  --body "请参考这封邮件。" \
  --attachments "/path/to/补充材料.zip"

# 通过 ERP / 姓名查收件人
bash scripts/run.sh lookup-recipient --condition "韩" --page-no 1 --page-size 10

# 按天统计最近 1 周邮件
bash scripts/run.sh daily-stats --days 7

# 按指定日期区间统计
bash scripts/run.sh daily-stats --after 2026-03-24 --before 2026-03-28

# 批量标记已读
bash scripts/run.sh batch-mark-read --item-ids "id1,id2,id3"

# 批量标记未读
bash scripts/run.sh batch-mark-unread --item-ids "id1,id2,id3"

# 批量打标签
bash scripts/run.sh batch-add-category --item-ids "id1,id2,id3" --category "待跟进"

# 批量移动
bash scripts/run.sh batch-move --item-ids "id1,id2,id3" --target-folder-id "folder-id"

# 批量删除
bash scripts/run.sh batch-delete --item-ids "id1,id2,id3"

# 单封旗标
bash scripts/run.sh flag --item-id "id1"

# 单封取消旗标
bash scripts/run.sh unflag --item-id "id1"

# 批量旗标
bash scripts/run.sh batch-flag --item-ids "id1,id2,id3"

# 批量取消旗标
bash scripts/run.sh batch-unflag --item-ids "id1,id2,id3"
```

## Commands

### `folders`

浏览目录树，用于定位自定义文件夹。

```bash
bash scripts/run.sh folders --parent msgfolderroot
bash scripts/run.sh folders --parent inbox --traversal Shallow
```

常用参数：

- `--parent`：distinguished folder，默认 `msgfolderroot`
- `--parent-id`：显式父文件夹 ID
- `--traversal`：`Shallow` 或 `Deep`
- `--limit`：最大返回数量

### `create-folder`

创建邮件文件夹：

```bash
bash scripts/run.sh create-folder --display-name "项目归档"
bash scripts/run.sh create-folder --display-name "客户A" --parent-folder-name "项目归档"
```

支持：

- `--display-name`
- `--parent` 指定 distinguished parent
- `--parent-folder-id`
- `--parent-folder-name`
- `--folder-class`

### `search`

在单个文件夹中抓取邮件列表并做客户端过滤。当前支持：

- 文件夹：`--folder`、`--folder-id`、`--folder-name`
- 发件人：`--sender`
- 收件人：`--recipient`
- 主题关键词：`--subject`
- 正文/预览关键词：`--body-keyword`
- 时间范围：`--after YYYY-MM-DD` / `YYYY-MM-DD HH:MM:SS`、`--before YYYY-MM-DD` / `YYYY-MM-DD HH:MM:SS`
- 已读/未读：`--read`、`--unread`
- 标签/分类：`--category`
- 附件：`--has-attachments`
- 重要级别：`--importance High|Normal|Low`
- 翻页范围：`--max-pages`

推荐做法：

1. 自定义文件夹先用 `folders` 查目录。
2. 如果用户只给了文件夹显示名，直接用 `--folder-name`。
3. 如果用户查的是较早日期（例如几天前、上周、某月某日），提高 `--max-pages`，不要只扫第一页。
4. 当用户要看全文时，先 `search`，再用结果中的 `item_id` 调 `detail`。
5. 面向用户展示查询结果时，优先使用 Markdown 表格形式返回，不要直接把原始 JSON 丢给用户。

### `detail`

按 `ItemId` 获取邮件详情，包括正文、收发件人、附件元数据。
默认 Markdown 展示会增加“附件列表”（文件名 / 大小 / 类型），便于直接查看附件信息。

### `daily-stats`

按天统计邮件，输出：

- 日期
- 星期
- 邮件总数
- 未读数
- 已读数

```bash
bash scripts/run.sh daily-stats --days 7
bash scripts/run.sh daily-stats --after 2026-03-24 --before 2026-03-28
```

规则：

- 默认按 `date_time_received` 统计
- 如果用户没给日期范围，默认统计最近 7 天
- 星期映射固定按 Python `weekday()` 规则：
  - `0 = 周一`
  - `6 = 周日`

所以不会再出现“日期和星期对不上”的问题。

### `batch-mark-read`

批量将邮件标记为已读：

```bash
bash scripts/run.sh batch-mark-read --item-ids "id1,id2,id3"
```

### `batch-mark-unread`

批量将邮件标记为未读：

```bash
bash scripts/run.sh batch-mark-unread --item-ids "id1,id2,id3"
```

### `batch-add-category`

批量给邮件打标签：

```bash
bash scripts/run.sh batch-add-category --item-ids "id1,id2,id3" --category "待跟进"
```

### `batch-move`

批量移动邮件到指定文件夹：

```bash
bash scripts/run.sh batch-move --item-ids "id1,id2,id3" --target-folder-id "folder-id"
```

### `batch-delete`

批量删除邮件：

```bash
bash scripts/run.sh batch-delete --item-ids "id1,id2,id3"
```

以上批量操作规则：

- 支持多个 `item_id`，用逗号分隔
- 本质上属于修改类操作，面向用户时仍应先确认再执行
- 对用户展示时应返回简洁结果摘要，而不要暴露底层 SOAP 细节

### `flag`

给单封邮件加旗标：

```bash
bash scripts/run.sh flag --item-id "id1"
```

可选参数：

- `--start-date`
- `--due-date`

### `unflag`

取消单封邮件旗标：

```bash
bash scripts/run.sh unflag --item-id "id1"
```

### `batch-flag`

批量给邮件加旗标：

```bash
bash scripts/run.sh batch-flag --item-ids "id1,id2,id3"
```

### `batch-unflag`

批量取消邮件旗标：

```bash
bash scripts/run.sh batch-unflag --item-ids "id1,id2,id3"
```

### `summarize`

从 stdin 读取 `search` / `pending-important` / `person-unhandled` / `detail` 的 JSON 输出，默认生成更适合人看的 Markdown 总结。

```bash
bash scripts/run.sh search --folder inbox --unread --limit 20 \
  | bash scripts/run.sh summarize

bash scripts/run.sh pending-important --days 7 \
  | bash scripts/run.sh summarize

bash scripts/run.sh search --folder inbox --unread --limit 20 \
  | bash scripts/run.sh summarize --format json
```

默认输出内容包括：

- 核心统计
- 总览表格
- 建议优先处理表格
- 简要观察
- 状态图标与重点图标（未读、附件、高优先级等）

当用户明确提到“总结”“概括”“梳理”“表格”“直观一点”“给领导看”“做个摘要”时，优先使用 `summarize`，而不是只返回原始 JSON。

### `reply`

基于一封已有邮件进行回复。默认行为：

- 用原邮件发件人作为收件人
- 自动生成 `Re:` 主题
- 通过 EWS SOAP `CreateItem + ReplyToItem/ReplyAllToItem` 发送
- 可选 `--reply-all`
- 可选 `--include-original` 把原文引用到回复正文后面
- 可选 `--attachments` 追加本地附件（逗号分隔多个路径）
- **发送前必须让用户二次确认**
- 发送结果里要附一段“回复摘要”，概括收件人、主题、回复模式和正文要点

```bash
bash scripts/run.sh reply \
  --item-id "AAMkADFlNG..." \
  --body "收到，我今天处理完给你反馈。"

bash scripts/run.sh reply \
  --item-id "AAMkADFlNG..." \
  --body "收到，补充说明见下。" \
  --reply-all \
  --include-original \
  --attachments "/path/to/补充说明.docx,/path/to/截图.png"
```

底层 SOAP 请求形态类似：

```xml
<m:CreateItem MessageDisposition="SendAndSaveCopy">
  <m:Items>
    <t:ReplyToItem>
      <t:ReferenceItemId Id="..." ChangeKey="..." />
      <t:NewBodyContent BodyType="Text">收到，我今天处理。</t:NewBodyContent>
    </t:ReplyToItem>
  </m:Items>
</m:CreateItem>
```

适合这些用户意图：

- “帮我回复这封邮件”
- “按这个邮件回一下”
- “回复全部”
- “带上原文回复”

二次确认规则：

1. 先整理出拟发送的回复内容
2. 明确向用户展示：
   - 收件人
   - 主题
   - 是否 reply-all
   - 回复正文摘要
   - 附件摘要（有则展示）
3. 只有用户明确确认后，才允许真正执行 `reply`
4. 如果用户没有二次确认，不要发送。

### `send`

新建一封全新的邮件。支持：

- 收件人 `--to`
- 抄送人 `--cc`
- 密送人 `--bcc`
- 主题 `--subject`
- 正文 `--body`
- 正文类型 `--body-type`
- 重要级别 `--importance`
- 附件 `--attachments`（多个本地路径用逗号分隔）

```bash
bash scripts/run.sh send \
  --to "a@jd.com,b@jd.com" \
  --cc "c@jd.com,d@jd.com" \
  --subject "项目同步" \
  --body "大家好，项目进展如下……" \
  --attachments "/path/to/周报.pdf,/path/to/排期.xlsx"
```

收件人 XML 使用标准 EWS `Mailbox` 结构，例如：

```xml
<t:ToRecipients>
  <t:Mailbox>
    <t:EmailAddress>a@jd.com</t:EmailAddress>
  </t:Mailbox>
</t:ToRecipients>
<t:CcRecipients>
  <t:Mailbox>
    <t:EmailAddress>c@jd.com</t:EmailAddress>
  </t:Mailbox>
</t:CcRecipients>
```

发送前也必须二次确认，确认时要明确展示：

- 收件人
- 抄送人
- 密送人
- 主题
- 正文摘要
- 附件摘要（有则展示）

如果用户给的是 ERP / 姓名，而不是邮箱地址，不要直接发送，先走 `lookup-recipient`。

如果用户给的是中文名，也必须先走 `lookup-recipient`，不要猜邮箱。

### `forward`

转发一封已有邮件。支持：

- 目标收件人 `--to`
- 抄送人 `--cc`
- 密送人 `--bcc`
- 转发附言 `--body`
- 正文类型 `--body-type`
- 附件 `--attachments`（多个本地路径用逗号分隔）

```bash
bash scripts/run.sh forward \
  --item-id "AAMkADFlNG..." \
  --to "a@jd.com,b@jd.com" \
  --cc "c@jd.com" \
  --body "请参考这封邮件。" \
  --attachments "/path/to/补充材料.zip"
```

转发前也必须做二次确认，确认时要明确展示：

- 原邮件主题
- 收件人
- 抄送人
- 密送人
- 转发附言摘要

### `lookup-recipient`

当用户明确要“通过 ERP 发邮件”或只给了 ERP / 中文姓名时，先调用：

```bash
bash scripts/run.sh lookup-recipient --condition "韩" --page-no 1 --page-size 10
bash scripts/run.sh lookup-recipient --name "韩松岩" --page-no 1 --page-size 10
bash scripts/run.sh lookup-recipient --erp "hansongyan3" --page-no 1 --page-size 10
```

接口：

- `POST http://joymail-skill.jd.com/hr/user/queryByErp`
- `Content-Type: application/json`
- body 示例：

```json
{ "condition": "韩", "pageNo": 1, "pageSize": 10 }
```

返回后要把这些信息展示给用户确认：

- ERP
- 真实姓名
- 部门
- 邮箱

处理规则：

- 如果只返回 1 条：展示该人的 ERP / 姓名 / 部门 / 邮箱，并询问用户是否发送给该邮箱
- 如果返回多条：必须让用户先选择目标人，再进入发送

说明：

- `--condition`、`--name`、`--erp` 最终都会映射到同一个后端字段 `condition`
- 所以按名称搜索和按 ERP 搜索，底层调用的是同一个接口
- 当用户是“按名字查人”时，优先顺序是：
  1. 先从最近邮件中的发件人 / 收件人 / 抄送人里匹配
  2. 如果最近联系人里没有命中，再回退到 `http://joymail-skill.jd.com/hr/user/queryByErp`

这样可以优先命中用户最近真实往来联系人，减少不必要的 HR 查询。

### `pending-important`

第一版启发式规则：

- 收件箱中最近 N 天邮件
- `importance=High`，或分类里含 `important` / `重要` / `urgent` / `待办`
- 同一 `ConversationId` 下没有更晚的已发送邮件

### `person-unhandled`

第一版启发式规则：

- 发件人匹配目标人
- 邮件当前未读
- 同一 `ConversationId` 下没有更晚的已发送邮件

## Auth And Endpoint

默认 endpoint：

- `JOYMAIL_SOAP_ENDPOINT`
- 默认值：`https://mail-skill.jd.com/mail/api/clawmail/mailpost`

默认 EWS 版本头：

- `JOYMAIL_SOAP_SERVER_VERSION`
- 默认值：`Exchange2016`

当前默认按 Exchange 2016 发送 `RequestServerVersion`；如果后续某些环境明确要求更高版本，再通过环境变量覆盖。

默认鉴权策略：

1. 如果设置了 `JOYMAIL_SOAP_AUTH_TOKEN`，直接使用
2. 否则先获取 `sso_token`
   获取方式参考 `get_sso_token.py`：优先 `SSO_TOKEN`，其次 `ME_TOKEN` / `SO_TOKEN`，再尝试从 `~/.joyclaw/openclaw.json` 中提取
3. 通过 `POST` 调用 `http://joymail-skill.jd.com/sso/clawJwtLogin`
4. 调用 `clawJwtLogin` 时，请求头必须带：

```http
Cookie: sso.jd.com=<sso_token>
```

5. 读取本地 token 缓存，先检查 `expire` 是否已过期；如果缓存缺失或已过期，则重新调用 `clawJwtLogin`
6. 取返回结果中的 `data.token`，放到请求头：
   - `auth: <token>`
7. 所有 `mailpost` 请求都必须带这个请求头
8. 如果 `mailpost` 返回 `401`，或者外层返回 `500` 但错误消息中包含下游 `401 / Unauthorized`，自动重新调用 `clawJwtLogin` 刷新 token，并默认最多重试 3 次
9. 如果 `clawJwtLogin` 本身返回未知错误，也默认最多重试 3 次

默认请求头：

- `Content-Type: application/json`
- `Accept: text/xml, application/xml, application/json`
- `auth: <token>`
- `Authorization: Bearer <token>`

如果 SOAP 网关需要额外头，设置环境变量：

```bash
export JOYMAIL_SOAP_HEADERS_JSON='{"X-Env":"dev"}'
```

## Output Notes

- `folders` 返回文件夹 `id`、`display_name`、`unread_count` 等信息
- `search` 返回扫描数量 `scanned`、命中数量 `matched` 和 `items`
- `detail` 返回完整 `item`
- 两个高级命令会同时返回 `heuristic`，明确当前规则

## References

更完整的命令样例和筛选组合，见 [references/query-recipes.md](references/query-recipes.md)。

## Current Limits

- 第一版主要依赖 `FindFolder`、`FindItem`、`GetItem`
- 默认 `RequestServerVersion` 使用 `Exchange2016`
- `body-keyword` 当前优先匹配 preview/text body，不保证等价于服务端全文检索
- 自定义“已处理”目前通过“是否有后续发件回复”近似判断
- 如果邮箱侧后续提供更准确的 SOAP 字段、过滤语法、状态语义，可以直接把客户端过滤逐步下推到服务端
