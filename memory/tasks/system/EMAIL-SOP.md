# 邮件发送 SOP

> 年老师的邮件工作流沉淀

---

## 配置

| 项目 | 值 |
|------|-----|
| SMTP | smtp.yeah.net:465 |
| 用户名 | sundanian@yeah.net |
| 密码 | GFTHt35ZqjdxFUfP |

---

## 发送流程

```
1. 确认需求
   - 收件人是谁？
   - 邮件目的？通知/汇报/协作/简洁
   - 需要附件吗？

2. 选择模板
   - 正式汇报 → 格式1
   - 通知类 → 格式2
   - 协作类 → 格式3
   - 内部简洁 → 格式4

3. 编写内容
   - 按模板结构填充
   - 检查错别字
   - 确认附件

4. 发送确认
   - 先发给自己测试（可选）
   - 确认发送成功
```

---

## 格式模板

### 格式1：正式汇报

```
主题：[类型] 具体事项 - 日期

尊敬的XXX：

您好！现向您汇报XXX事项：

【背景/目的】
XXX

【进展/结果】
1. XXX
2. XXX

【下一步计划】
1. XXX
2. XXX

如有疑问，随时沟通。

祝好！
孙大年
```

### 格式2：通知类

```
主题：【通知】XXX事项

各位同事：

现就XXX事项通知如下：

【事项说明】
XXX

【时间安排】
- XXX
- XXX

【联系方式】
如有疑问，请联系：XXX

谢谢！
```

### 格式3：协作类

```
主题：【请审阅】XXX方案

XXX（尊称）：

您好！附件是XXX方案，请您审阅。

【核心内容】
- XXX
- XXX

【需要您确认】
1. XXX
2. XXX

感谢！

孙大年
```

### 格式4：简洁版（内部）

```
主题：XXX

Hi XXX，

XXX（正文）

孙大年
```

---

## 场景对照

| 场景 | 推荐格式 | 语气 |
|------|----------|------|
| 周报/月报 | 格式1 | 正式 |
| 专项汇报 | 格式1 | 正式 |
| 会议通知 | 格式2 | 简洁 |
| 变更通知 | 格式2 | 简洁 |
| 方案确认 | 格式3 | 请示 |
| 决策请求 | 格式3 | 请示 |
| 内部协作 | 格式4 | 简洁 |

---

## 代码模板

```javascript
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.yeah.net',
  port: 465,
  secure: true,
  auth: {
    user: 'sundanian@yeah.net',
    pass: 'GFTHt35ZqjdxFUfP'
  }
});

await transporter.sendMail({
  from: 'sundanian@yeah.net',
  to: '收件人',
  subject: '主题',
  text: '纯文本',
  html: '<b>HTML</b>'
});
```

---

## 注意事项

- 外部邮件用正式格式
- 发送前确认收件人
- 重要邮件先发自己测试
- 附件要检查

---

*更新：2026-02-22*
