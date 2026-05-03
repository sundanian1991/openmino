---
name: baidu-search
description: 基于百度千帆平台的 AI 搜索服务，支持网页搜索、百度百科、秒懂百科视频和 AI 智能生成四种检索模式
version: 1.0.0
author: countbot-ai
---

# 百度 AI 搜索

基于百度千帆平台的 AI 搜索服务，支持多种搜索模式。

## 配置

配置文件位于 `~/.claude/skills/baidu-search/scripts/config.json`，已填入 API Key。

## 命令行调用

```bash
# 网页搜索（默认）
python3 ~/.claude/skills/baidu-search/scripts/search.py "搜索关键词"

# JSON 输出（推荐 AI 使用）
python3 ~/.claude/skills/baidu-search/scripts/search.py "人工智能最新进展" --json

# 限制结果数
python3 ~/.claude/skills/baidu-search/scripts/search.py "Python教程" --limit 5

# 站点过滤
python3 ~/.claude/skills/baidu-search/scripts/search.py "天气预报" --sites weather.com.cn

# 时间过滤（week/month/semiyear/year）
python3 ~/.claude/skills/baidu-search/scripts/search.py "AI新闻" --recency week

# 百度百科
python3 ~/.claude/skills/baidu-search/scripts/search.py "人工智能" --api-type baike

# 秒懂百科（视频）
python3 ~/.claude/skills/baidu-search/scripts/search.py "深度学习" --api-type miaodong_baike

# AI 智能生成
python3 ~/.claude/skills/baidu-search/scripts/search.py "什么是人工智能" --api-type ai_chat
```

## API 类型

| 类型 | 说明 |
| --- | --- |
| web_search | 网页搜索（默认） |
| baike | 百度百科 |
| miaodong_baike | 秒懂百科（视频） |
| ai_chat | AI 智能搜索生成 |

## 注意事项

- 免费额度：100 次/天
- 网页搜索查询最长 72 字符
- 自动包含当前日期上下文，方便处理时效性查询
