# 搜索工具状态记录

## 日期
2026-05-01

## 工具状态

### Tavily
- 状态：超出使用限制（status 432）
- 限制类型：月度请求次数限制
- 恢复时间：未知（通常按月重置）
- 备用方案：使用 agent-browser 直接访问网页

### DuckDuckGo
- 状态：超出使用限制
- 错误：No results were found
- 可能原因：Bot 检测或请求限制
- 备用方案：使用 agent-browser 直接访问网页

### Apify
- 状态：认证失败
- 错误：Authentication failed — check APIFY_TOKEN is set and valid
- 待办：配置 APIFY_TOKEN 环境变量
- 优先级：高（可搜索 Actors 市场）

### agent-browser
- 状态：可用
- Chromium：已安装
- 使用方法：直接访问网页获取内容
- 限制：无法批量搜索，需已知 URL

## 推荐搜索策略

1. **优先使用 agent-browser**
   - 直接访问权威网站（clauswilke.com, storytellingwithdata.com 等）
   - 适合深度阅读已知资源

2. **配置 Apify（待完成）**
   - 配置 APIFY_TOKEN
   - 可搜索 Apify Actors 市场
   - 适合大规模网页抓取

3. **恢复后使用 Tavily/DuckDuckGo**
   - 适合快速关键词搜索
   - 适合发现新资源

## 已验证可用资源

- clauswilke.com/dataviz — 数据可视化权威书籍
- observablehq.com/@d3 — D3 可视化画廊
- infovis-wiki.net — 信息可视化学术维基
