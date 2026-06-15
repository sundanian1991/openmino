# Compiled SPEC — 全球半导体公司市值排名

## Page: 全球半导体公司市值 Top 20

- **场景论文**：从 storyboard 继承 — "NVIDIA 市值碾压全行业"
- **签名视觉元素**：NVIDIA 用 Warm 主色高亮，其余公司 Stone 灰化
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：极值差距达 37 倍，需要视觉截断或对数刻度

### 叙事意图（从 intent 继承）

**【可视化目的】**
- 认知缺口：读者低估 NVIDIA 在半导体行业的市值统治力

**【想传达什么】**
- 核心信息（一句话）：NVIDIA 一家市值 4.82 万亿，超过第 10-20 名总和

**【结论】**
- 读者应得出的判断：AI 算力需求已重塑半导体行业格局，NVIDIA 形成结构性垄断

**【思路】**
- 视觉叙事路径：第一眼 NVIDIA 超长柱条（视觉冲击） → 第二眼第 2-3 名与第 1 名差距巨大 → 最终理解"一超多强+长尾"行业结构

### 视觉编码
- **X 轴编码**：市值（万亿美元）
- **Y 轴编码**：公司名称（按市值降序排列）
- **颜色编码**：NVIDIA = Warm `#c26d3a`，其余 = Stone `#857d74`
- **大小编码**：柱条长度 = 市值绝对值

### 数据组织
- **字段清单**：公司名(类别)、市值(数值万亿美元)、国家(分组)
- **排序规则**：按市值降序（原数据排名顺序）
- **聚合规则**：无聚合，原始排名数据

### 标注策略
- **高亮点**（≤10%）：NVIDIA（#1）单独高亮
- **标注内容**：NVIDIA 旁标注 "4.82T — 超 Top 10-20 总和"
- **基准线/参考线**：在 0.98 处标注 Samsung（第 4 名）作为"万亿美元俱乐部"分界线

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中 16px/600 | 结论性标题 |
| 核心数据区 | 横向柱状图占 70% 画布 | 主视觉区域 |
| 高亮元素 | NVIDIA Warm 色 + 标注 | 最大视觉权重 |
| 次要元素 | 其余柱条 Stone 灰 | 反衬高亮 |

### 布局
- **画布**：800 × 550
- **标题区**：顶部 20px padding，16px/600
- **图表区**：居中，占画布 70% 高度
- **标注区**：右侧标注 NVIDIA 量级
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助
- **图例**：不需要
- **脚注**：数据来源 CompaniesMarketCap.com，截至 2025 年 5 月
- **特殊说明**：横向柱状图，20 条数据需要足够垂直间距

### Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 排名对比 = 柱状图 |
| 风格选择 | restrained-warm | storyboard.md | 单图跟随默认 |
| 配色选择 | Warm + Stone | storyboard.md | NVIDIA 高亮 |
| 构图选择 | full-width-bar | auto-selector | 横向全宽柱状 |
| 字体选择 | system-ui | storyboard.md | neutral-professional |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "NVIDIA 市值 4.82 万亿碾压全行业 — 超越第二名 2.3 倍",
  "subtitle": "2025 年全球半导体公司市值 Top 20（万亿美元）",
  "canvas": {"width": 800, "height": 550},
  "data": {
    "fields": ["公司", "市值"],
    "categories": ["NVIDIA", "TSMC", "Broadcom", "Samsung", "SK Hynix", "Micron", "AMD", "ASML", "Intel", "Lam Research", "Applied Materials", "Texas Instruments", "KLA", "Arm Holdings", "Analog Devices", "Qualcomm", "Marvell Tech", "Tokyo Electron", "MediaTek", "Advantest"],
    "series": [
      {"name": "市值", "values": [4.82, 2.06, 1.99, 0.98, 0.62, 0.61, 0.59, 0.55, 0.50, 0.32, 0.31, 0.26, 0.23, 0.22, 0.19, 0.19, 0.14, 0.14, 0.13, 0.13], "highlight": true}
    ]
  },
  "visualEncoding": {
    "highlight": [{"category": "NVIDIA", "color": "#c26d3a"}],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    {"text": "超 Top 10-20 总和", "target": "NVIDIA"},
    {"text": "万亿美元俱乐部门槛", "target": "Samsung"}
  ],
  "referenceLines": [
    {"type": "horizontal", "value": 1.0, "label": "万亿美元线", "style": {"color": "#ada599", "dash": [6, 4]}}
  ],
  "theme": "default",
  "layout": {"padding": {"top": 20, "right": 30, "bottom": 20, "left": 130}}
}
```
