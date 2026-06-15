# spec.md — 渲染契约

## 数据集：94-科技-全球社交媒体用户数排名

---

## 图表 A：平台排名水平柱状图

### 叙事意图
- **可视化目的**：呈现全球社交媒体平台月活跃用户排名，展示市场集中度
- **核心信息**：Meta三平台包揽前三（Facebook 30.7亿、WhatsApp 30.0亿、Instagram 20.0亿），TikTok以17亿成为最大挑战者
- **结论**：社交平台市场呈"Meta寡头 + 字节挑战"格局，头部效应显著
- **思路**：水平柱状图按MAU降序排列，Top 3蓝色高亮，TikTok暖色强调

### 视觉执行
- **模式选择**：13-柱状图 → viz-echarts bar_chart
- **标题**（结论性）：全球社交媒体排名：Meta三平台包揽前三，TikTok成最大挑战者
- **副标题**：2025年Q1 · 月活跃用户（亿）· 数据来源 Statista + DataReportal
- **视觉编码**：
  - Y轴：平台名称（从上到下MAU降序）
  - X轴：月活跃用户数（亿）
  - 颜色：Top 3 = 蓝色系，TikTok = 暖色强调，其余 = 灰色
- **数据组织**：15个平台，MAU降序
- **标注策略**：
  - TikTok标注"最快增长平台"
  - 头部标注"Meta三平台合计80.7亿"
- **高亮**：Top 3 + TikTok共4个，高亮比例 = 4/15 ≈ 27%
- **配色**：Meta平台#4A90D9，TikTok#E8875F，其余#8E8E93

### 渲染契约 JSON（图表 A）

```json
{"version":"viz-design-spec-v1","renderTarget":"viz-echarts","chartType":"bar_chart","title":"全球社交媒体排名：Meta三平台包揽前三，TikTok成最大挑战者","subtitle":"2025年Q1 · 月活跃用户（亿）· 数据来源 Statista + DataReportal","canvas":{"width":800,"height":550},"data":{"fields":["platform","mau_billion","company"],"series":[{"name":"月活跃用户","values":[{"name":"Facebook","value":30.7,"company":"Meta"},{"name":"WhatsApp","value":30.0,"company":"Meta"},{"name":"YouTube","value":26.5,"company":"Google"},{"name":"Instagram","value":20.0,"company":"Meta"},{"name":"TikTok","value":17.0,"company":"字节跳动"},{"name":"微信","value":13.6,"company":"腾讯"},{"name":"LinkedIn","value":10.0,"company":"微软"},{"name":"Facebook Messenger","value":10.3,"company":"Meta"},{"name":"Telegram","value":9.5,"company":"Telegram"},{"name":"Snapchat","value":8.5,"company":"Snap"},{"name":"抖音","value":7.5,"company":"字节跳动"},{"name":"快手","value":7.0,"company":"快手科技"},{"name":"X (Twitter)","value":6.1,"company":"xAI"},{"name":"微博","value":5.9,"company":"新浪"},{"name":"QQ","value":5.5,"company":"腾讯"}],"highlight":true}]},"visualEncoding":{"highlight":[{"item":"Facebook","color":"#4A90D9","reason":"全球第一"},{"item":"WhatsApp","color":"#4A90D9","reason":"全球第二"},{"item":"Instagram","color":"#4A90D9","reason":"Meta第三平台"},{"item":"TikTok","color":"#E8875F","reason":"最大挑战者"}],"grayscale":true,"maxHighlightRatio":0.1,"barColors":{"Facebook":"#4A90D9","WhatsApp":"#4A90D9","Instagram":"#4A90D9","YouTube":"#8E8E93","TikTok":"#E8875F","微信":"#8E8E93","LinkedIn":"#8E8E93","Facebook Messenger":"#4A90D9","Telegram":"#8E8E93","Snapchat":"#8E8E93","抖音":"#E8875F","快手":"#8E8E93","X (Twitter)":"#8E8E93","微博":"#8E8E93","QQ":"#8E8E93"}},"annotations":[{"text":"最快增长平台","target":"TikTok","position":"right","emphasis":true}],"referenceLines":[],"theme":"default","layout":{"padding":{"top":20,"right":20,"bottom":20,"left":140},"direction":"horizontal"}}
```

---

## 图表 B：公司阵营矩形树图

### 叙事意图
- **可视化目的**：按公司聚合展示社交平台市场份额，呈现行业集中度
- **核心信息**：Meta系71亿MAU一家独大，字节跳动24.5亿、腾讯19.1亿紧随其后，中美三巨头格局清晰
- **结论**：全球社交流量高度集中在少数科技巨头手中，Meta系占据绝对主导
- **思路**：矩形树图按公司MAU聚合，面积编码精确对应比例

### 视觉执行
- **模式选择**：16-矩形树图 → viz-echarts treemap
- **标题**（结论性）：社交媒体公司阵营：Meta系一家独大，中美三巨头垄断
- **副标题**：2025年Q1 · 按公司聚合MAU（亿）
- **视觉编码**：
  - 面积：MAU总量
  - 颜色：公司区分
  - 嵌套：公司 → 旗下平台
- **数据组织**：按公司分组聚合
- **标注策略**：
  - Meta区域标注"71亿，占头部总量48%"
  - 各公司显示平台数量
- **高亮**：Meta区域，高亮比例 = 1/N公司
- **配色**：Meta#4A90D9，字节#E8875F，腾讯#6C5CE7，其他#8E8E93

### 渲染契约 JSON（图表 B）

```json
{"version":"viz-design-spec-v1","renderTarget":"viz-echarts","chartType":"treemap","title":"社交媒体公司阵营：Meta系一家独大，中美三巨头垄断","subtitle":"2025年Q1 · 按公司聚合MAU（亿）","canvas":{"width":800,"height":550},"data":{"fields":["company","platform","mau_billion"],"series":[{"name":"公司MAU","children":[{"name":"Meta","value":71.0,"children":[{"name":"Facebook","value":30.7},{"name":"WhatsApp","value":30.0},{"name":"Instagram","value":20.0},{"name":"Messenger","value":10.3}]},{"name":"字节跳动","value":24.5,"children":[{"name":"TikTok","value":17.0},{"name":"抖音","value":7.5}]},{"name":"腾讯","value":19.1,"children":[{"name":"微信","value":13.6},{"name":"QQ","value":5.5}]},{"name":"Google","value":26.5,"children":[{"name":"YouTube","value":26.5}]},{"name":"微软","value":10.0,"children":[{"name":"LinkedIn","value":10.0}]},{"name":"其他","value":30.9,"children":[{"name":"Telegram","value":9.5},{"name":"Snapchat","value":8.5},{"name":"快手","value":7.0},{"name":"X (Twitter)","value":6.1},{"name":"微博","value":5.9}]}],"highlight":true}]},"visualEncoding":{"highlight":[{"item":"Meta","color":"#4A90D9","reason":"市场份额最大，占48%"}],"grayscale":true,"maxHighlightRatio":0.1,"colorScheme":{"Meta":"#4A90D9","字节跳动":"#E8875F","腾讯":"#6C5CE7","Google":"#8E8E93","微软":"#8E8E93","其他":"#B0B0B0"}},"annotations":[{"text":"71亿MAU，占48%","target":"Meta","emphasis":true},{"text":"24.5亿MAU","target":"字节跳动"}],"referenceLines":[],"theme":"default","layout":{"padding":{"top":20,"right":20,"bottom":20,"left":20}}}
```
