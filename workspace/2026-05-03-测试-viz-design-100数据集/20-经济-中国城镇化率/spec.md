# Compiled SPEC — 中国城镇化率

---

## Page: 中国城镇化速度换挡 — 增速降至十年前四分之一

- **场景论文**：用堆叠面积图展示城乡人口此消彼长，标注增速放缓揭示城镇化进入"深水区"
- **签名视觉元素**：城镇人口 Warm 面积 + 2020 增速骤降标注
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：堆叠面积 + 增速拐点叙事需要非默认标注策略

### 叙事意图

**【可视化目的】**
- 认知缺口：读者知道城镇化在推进，但不知道增速已从 1.51pp 降至 0.36pp，进入"速度换挡期"

**【想传达什么】**
- 核心信息：中国城镇化率十年提升 8.5 个百分点，但增速降至十年前的四分之一

**【结论】**
- 读者应得出判断：城镇化已从"高速推进"转为"质量换挡"，后续靠的不是速度而是深度

**【思路】**
- 视觉叙事路径：第一眼看到城镇面积扩大 → 第二眼看到 2020 增速骤降 → 最终理解"四分之一"的减速幅度

### 视觉编码

- **X 轴编码**：年份（2015-2024，时间序列）
- **Y 轴编码**：人口数量（百万人）
- **颜色编码**：
  - 城镇人口：Warm Coral(#c26d3a) — 扩张中，主色
  - 农村人口：Stone(#ada599) — 收缩中，灰色
- **面积编码**：两类人口堆叠为总面积，视觉对比此消彼长

### 数据组织

- **字段清单**：year, urban_pop_million, rural_pop_million, urbanization_change_pct
- **排序规则**：按 year 升序
- **聚合规则**：无聚合，直接使用年度数据
- **数据示例**：
  - 2015 | 771.2 | 574.9 | 1.23
  - 2020 | 894.8 | 513.4 | 0.81
  - 2024 | 950.4 | 490.8 | 0.36

### 标注策略

- **高亮点**（<=10%）：2020 年增速骤降点（10 年中 1 个 = 10%）
- **标注内容**：
  - 2020："疫情影响，增速从 1.21 骤降至 0.81"
  - 标题传达核心："增速降至十年前四分之一"
- **基准线/参考线**：无

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | "城镇化速度换挡：增速降至十年前四分之一" | 结论性标题直接传达减速判断 |
| 城镇面积 | Warm Coral | 主角，视觉权重最高 |
| 农村面积 | Stone 灰色 | 收缩方，不抢视线 |
| 2020 标注 | 垂直虚线 + 文字 | 叙事锚点 |

### 布局

- **画布**：800 x 550
- **标题区**：顶部居中，16px/600
- **图表区**：居中，占画布 75%
- **标注区**：2020 年处垂直标注
- **留白**：四周 >= 20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：需要，展示城镇/农村两类
- **脚注**：数据来源 World Bank
- **特殊说明**：Y 轴单位百万人

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | C08 | SKILL.md | 堆叠构成 |
| 风格选择 | restrained-warm | style-schools.md | 克制暖色 |
| 配色选择 | Warm+Stone | color-themes.md | 城镇主色+农村灰色 |
| 构图选择 | full-width | composition-templates.md | 单图全宽 |
| chartType | stacked_area | viz-echarts | 堆叠面积 |

## 渲染委托

**渲染技能**：viz-echarts

```
委托指令：
"用 viz-echarts 渲染以下 SPEC：
- 模式：C08-堆叠构成
- 标题：城镇化速度换挡：增速降至十年前四分之一
- 数据字段：year, urban_pop_million, rural_pop_million
- 高亮：2020 年增速骤降
- 标注：2020 疫情影响
- 画布：800x550
请遵循 13-VISUALIZATION.md 配色规范。"
```

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "stacked_area",
  "title": "城镇化速度换挡：增速降至十年前四分之一",
  "subtitle": "2015-2024 · 城乡人口结构变化 · 百万人",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["year", "urban_pop_million", "rural_pop_million"],
    "series": [
      { "name": "城镇人口", "values": [771.2, 798.7, 825.1, 849.3, 873.0, 894.8, 920.7, 932.7, 941.2, 950.4], "highlight": false, "stack": "total" },
      { "name": "农村人口", "values": [574.9, 557.8, 544.3, 531.2, 518.3, 513.4, 501.3, 497.0, 494.1, 490.8], "highlight": false, "stack": "total" },
      { "name": "2020增速骤降", "values": [null, null, null, null, null, 894.8, null, null, null, null], "highlight": true }
    ]
  },
  "visualEncoding": {
    "highlight": [{ "series": "2020增速骤降", "color": "#c26d3a" }],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "疫情影响，增速从1.21骤降至0.81", "target": "2020", "position": "top" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": {
    "titlePosition": "top",
    "chartArea": "center",
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 }
  }
}
```
