# 飞书 Webhook 配置指南

## 获取 Webhook URL

1. 打开飞书 → 创建群聊（或选择现有群）
2. 点击右上角「…」→「添加机器人」
3. 选择「自定义机器人」
4. 填写机器人名称（如：Claude 日报助手）
5. 复制 Webhook 地址（形如：`https://open.feishu.cn/open-apis/bot/v2/hook/xxx`）

## 配置到脚本

编辑 `scripts/daily-claude-news.sh`，找到以下行：

```bash
FEISHU_WEBHOOK=""
```

替换为：

```bash
FEISHU_WEBHOOK="https://open.feishu.cn/open-apis/bot/v2/hook/YOUR_WEBHOOK_HERE"
```

## 测试告警

```bash
# 手动触发测试
./scripts/daily-claude-news.sh
```

## 接收的消息格式

**成功时**：
```
✅ Claude 日报生成成功
输出文件：/path/to/claude-news-2026-03-06.md
```

**失败时**：
```
❌ Claude 日报生成失败（已重试 3 次）
```
