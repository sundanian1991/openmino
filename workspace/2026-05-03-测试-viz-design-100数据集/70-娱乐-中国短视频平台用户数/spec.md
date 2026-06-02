# Compiled SPEC — 中国短视频平台用户数（2024）

## Page: 中国短视频平台用户对比

- **场景论文**：抖音快手双极统治，MAU 合计超 13 亿
- **签名视觉元素**：抖快双柱 Warm 高亮 + DAU/MAU 比值揭示粘性差异
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要同时展示 MAU/DAU 双维度 + 双极高亮

### 叙事意图

**【可视化目的】**
- 认知缺口：读者不知道中国短视频平台间用户规模的断层式差距

**【想传达什么】**
- 核心信息（一句话）：抖音和快手双极统治中国短视频市场，合计月活超 13 亿

**【结论】**
- 读者应得出的判断：短视频行业呈"双极+中坚+长尾"三层格局

**【思路】**
- 视觉叙事路径：抖音 6.75 亿 / 快手 6.85 亿双极并列 → 视频号 5.5 亿居中 → 小红书/B站第二梯队 → 其余平台长尾

### 视觉编码

- **X 轴编码**：平台名称
- **Y 轴编码**：月活用户数（亿），柱高映射数值
- **颜色编码**：抖快双极 Warm 主色 `#c26d3a`，其余 Stone `#857d74`
- **大小编码**：无

### 数据组织

- **字段清单**：平台名称、MAU（亿）
- **排序规则**：按 MAU 降序
- **数据示例**：快手 6.85 / 抖音 6.75 / 视频号 5.5

### 标注策略

- **高亮点**（≤10%）：抖音、快手（2/10 = 20%，按结论性高亮规则取核心双极）
- **标注内容**：标注抖快合计月活超 13 亿
- **基准线/参考线**：无

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 结论性标题，置顶 | 一眼传递双极判断 |
| 核心数据区 | 抖快双柱 Warm 色最高 | 引导第一眼注意力 |
| 高亮元素 | 抖快柱体 + 合计标注 | 强化双极概念 |
| 次要元素 | 其余平台 Stone 灰化 | 不抢夺注意力 |

### 布局

- **画布**：800 x 550
- **标题区**：顶部，字号 16/600
- **图表区**：居中，横向柱状图
- **标注区**：抖快柱体上方
- **留白**：四周 20px
- **配色**：Warm + Stone

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | SKILL.md 五 | SKILL.md | 多平台排名对比 → bar_chart |
| 风格选择 | restrained-warm | style-schools.md | 专业、温暖、克制 |
| 配色选择 | Warm + Stone | color-themes.md | 主色高亮 + Stone 基准 |
| 构图选择 | composition-templates.md | composition-templates.md | 横向排名柱状图 |

## 渲染契约 JSON

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "抖音快手双极统治中国短视频：月活合计超 13 亿，其余平台断层落后",
  "subtitle": "2024 年 · 中国短视频平台月活跃用户 Top 10",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["平台", "月活跃用户（亿）"],
    "series": [
      { "name": "快手", "values": [6.85], "highlight": true },
      { "name": "抖音（主站）", "values": [6.75], "highlight": true },
      { "name": "微信视频号", "values": [5.5], "highlight": false },
      { "name": "小红书", "values": [2.6], "highlight": false },
      { "name": "B站", "values": [2.4], "highlight": false },
      { "name": "抖音极速版", "values": [2.18], "highlight": false },
      { "name": "西瓜视频", "values": [1.2], "highlight": false },
      { "name": "微博", "values": [1.0], "highlight": false },
      { "name": "百度好看视频", "values": [0.8], "highlight": false },
      { "name": "好看短视频", "values": [0.6], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [
      { "series": "快手", "color": "#c26d3a" },
      { "series": "抖音（主站）", "color": "#c26d3a" }
    ],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "抖快合计月活超 13 亿", "target": "快手" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```
