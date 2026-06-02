# Compiled SPEC — 可视化编译规格

> 数据集 85：2024-2025 全球固定宽带下载速度排名 | 渲染契约

---

## Page: 全球宽带网速 TOP 15

- **场景论文**：用横向柱状图揭示全球宽带基建的权力转移——亚洲城市经济体和东欧国家正在领跑
- **签名视觉元素**：新加坡柱子 Warm 主色高亮 + 中国标注
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要高亮非 TOP1 的中国，突出与中国读者的关联

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者以为欧美网速最快，实际上亚洲新兴经济体和中东领跑

**【想传达什么】**
- 核心信息（一句话）：新加坡以 372 Mbps 领跑全球宽带，是美国的 1.8 倍

**【结论】**
- 读者应得出的判断：宽带竞赛的赢家不是传统认知中的"发达国家"，而是数字基建投入更积极的亚洲城市经济体和东欧国家

**【思路】**
- 视觉叙事路径：第一眼看到新加坡（最长柱子，彩色）→ 第二眼看到中国标注（关联性）→ 最终理解全球宽带基建新格局

### 视觉编码

- **X 轴编码**：平均下载速度（Mbps），线性刻度 0-400
- **Y 轴编码**：国家/地区名称，按排名从高到低排列
- **颜色编码**：新加坡用 Warm 主色（#c26d3a），中国用 Warm 浅色（#e8a87c），其余 Stone 灰化（#857d74）
- **大小编码**：柱子宽度统一，长度映射网速

### 数据组织

- **字段清单**：排名、国家/地区、平均下载速度（Mbps）、区域
- **排序规则**：按网速降序排列
- **聚合规则**：无聚合，原始数据直出
- **数据示例**：新加坡 372 / 中国香港 350 / 冰岛 310

### 标注策略

- **高亮点**（≤10%）：新加坡（TOP 1）、中国（关联性）
- **标注内容**：新加坡右侧标注"全球最快，372 Mbps"；中国柱子右侧标注"中国：230 Mbps"
- **基准线/参考线**：在 200 Mbps 处加一条虚线参考线（全球主要经济体分界）

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中，16px/600，标题色 #6b3410 | 第一眼锚定主题 |
| 核心数据区 | 新加坡柱子最长最醒目 | 视觉权重最高 |
| 高亮元素 | 新加坡 Warm 主色，中国 Warm 浅色 | 区分主次高亮 |
| 次要元素 | 其余柱子 Stone 灰化 | 不抢注意力 |

### 布局

- **画布**：800 × 550
- **标题区**：顶部居中 + 16px/600
- **图表区**：中上部，占比 75%
- **标注区**：高亮柱子右侧
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：不需要（排序柱状图不需要图例）
- **脚注**：数据来源：Speedtest Global Index，2024-2025
- **特殊说明**：仅展示 TOP 15

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | SKILL.md §五 | 单维度排名对比 |
| 风格选择 | restrained-warm | style-schools.md | 专业克制 |
| 配色选择 | Warm + Stone | color-themes.md | 高亮+灰化 |
| 构图选择 | left-heavy | composition-templates.md | 长名称左对齐 |
| 字体选择 | system-ui | typography-moods.md | 中性专业 |
| DNA 参考 | Custom | chart-dna-db | 高亮 TOP1 + 中国 |

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "新加坡领跑全球宽带网速，是美国的 1.8 倍",
  "subtitle": "2024-2025 · 全球固定宽带下载速度 TOP 15",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["国家/地区", "平均下载速度(Mbps)"],
    "series": [
      { "name": "新加坡", "values": [372], "highlight": true },
      { "name": "中国香港", "values": [350], "highlight": false },
      { "name": "冰岛", "values": [310], "highlight": false },
      { "name": "罗马尼亚", "values": [290], "highlight": false },
      { "name": "匈牙利", "values": [276], "highlight": false },
      { "name": "瑞士", "values": [268], "highlight": false },
      { "name": "法国", "values": [262], "highlight": false },
      { "name": "智利", "values": [255], "highlight": false },
      { "name": "阿联酋", "values": [250], "highlight": false },
      { "name": "丹麦", "values": [240], "highlight": false },
      { "name": "中国", "values": [230], "highlight": true },
      { "name": "泰国", "values": [228], "highlight": false },
      { "name": "西班牙", "values": [220], "highlight": false },
      { "name": "挪威", "values": [215], "highlight": false },
      { "name": "美国", "values": [204], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [
      { "series": "新加坡", "color": "#c26d3a" },
      { "series": "中国", "color": "#e8a87c" }
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.13
  },
  "annotations": [
    { "text": "全球最快，372 Mbps", "target": "新加坡" },
    { "text": "中国：230 Mbps", "target": "中国" }
  ],
  "referenceLines": [
    { "type": "vertical", "value": 200, "label": "200 Mbps", "style": { "color": "#ada599", "dash": [6, 4] } }
  ],
  "theme": "default",
  "layout": {
    "titlePosition": "top",
    "chartArea": "center",
    "padding": { "top": 20, "right": 30, "bottom": 20, "left": 20 }
  }
}
```
