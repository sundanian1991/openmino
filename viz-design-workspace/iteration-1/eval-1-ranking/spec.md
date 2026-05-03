# Compiled SPEC — 供应商业绩排名

---

## Page: 供应商业绩达标率排名

- **场景论文**：快速识别头部供应商达标率差异，聚焦毅航领先优势
- **签名视觉元素**：毅航用 Warm 色高亮，其余 Stone 灰化，一眼锁定领先者
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：需要颜色编码区分领先者与跟随者，默认模板无此叙事能力

### 叙事意图

**【可视化目的】**
- 认知缺口：5 家供应商业绩达标率差异幅度不直观

**【想传达什么】**
- 核心信息（一句话）：毅航达标率领先岐力 18.7 个百分点，差距显著

**【结论】**
- 读者应得出的判断：毅航是明确的业绩标杆，岐力需要重点关注

**【思路】**
- 视觉叙事路径：标题结论 → 毅航 Warm 色条形跳出来 → 其余 Stone 色条形提供对比尺度 → 差距一目了然

### 视觉编码

- **X 轴编码**：达标率（%），水平延伸
- **Y 轴编码**：供应商名称（分类轴）
- **颜色编码**：毅航用 Warm (#c26d3a) 高亮，其余用 Stone (#857d74)。颜色编码"是否领先者"
- **大小编码**：无

### 数据组织

- **字段清单**：supplier（供应商名称）、rate（达标率 %）
- **排序规则**：按 rate 降序
- **聚合规则**：无
- **数据示例**：
  - 毅航, 95.2
  - 毛毛虫, 91.8
  - 伽玛, 87.3

### 标注策略

- **高亮点**（≤10%）：仅毅航 1 条（20% 以下）
- **标注内容**：毅航条形末尾标注数值，其余不标注
- **基准线/参考线**：无

### 视觉权重（读者视角）

- **主角元素**（hero）：毅航条形 → Warm 色 + 数值标注
- **上下文元素**（medium）：其余 4 家条形 → Stone 色，提供对比锚点
- **背景元素**（light）：坐标轴、网格（隐藏）

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 结论性标题，16px 600 | 第一眼传达核心判断 |
| 毅航条形 | Warm #c26d3a，最上方 | 领先者，视觉权重最高 |
| 其余条形 | Stone #857d74 | 提供对比尺度，不抢焦点 |
| 数值标注 | 仅毅航标注 | 减少视觉噪音 |

### 布局

- **画布**：700 x 400
- **标题区**：左上，16px
- **图表区**：居中，占比 80%
- **标注区**：条形末尾
- **留白**：四周 ≥20px
- **配色**：Warm (#c26d3a) + Stone (#857d74)

### 图例与辅助

- **图例**：不需要（颜色含义由标题和标注传达）
- **脚注**：无
- **特殊说明**：Y 轴隐藏，X 轴无网格线

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 01-条形图 | SKILL.md §五 | 排名对比场景 |
| 配色选择 | Custom | color-themes.md | Warm 高亮 + Stone 灰化 |

## 渲染委托

**渲染技能**：viz-echarts

```
委托指令：
"用 viz-echarts 渲染以下 SPEC：
- 模式：01-条形图（水平）
- 标题：毅航达标率领先 18.7 个百分点
- 数据字段：supplier, rate
- 高亮：毅航 Warm #c26d3a，其余 Stone #857d74
- 标注：仅毅航标注数值
- 画布：700 x 400
- Y 轴隐藏，X 轴无网格，animation off
请遵循 13-VISUALIZATION.md 配色规范。"
```

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["supplier", "rate"],
    "rows": [
      { "supplier": "毅航", "rate": 95.2 },
      { "supplier": "毛毛虫", "rate": 91.8 },
      { "supplier": "伽玛", "rate": 87.3 },
      { "supplier": "赛维斯", "rate": 82.1 },
      { "supplier": "岐力", "rate": 76.5 }
    ]
  },
  "mapping": {
    "x": "rate",
    "y": "supplier",
    "fill": "supplier",
    "color": null,
    "size": null
  },
  "layers": [
    {
      "geom": "geom_bar",
      "aes": { "x": "rate", "y": "supplier" },
      "params": { "position": "dodge" },
      "readerWeight": "medium"
    },
    {
      "geom": "geom_label",
      "aes": { "x": 95.2, "y": "毅航", "label": "95.2%" },
      "params": { "color": "#c26d3a", "fontSize": 12 },
      "readerWeight": "hero"
    }
  ],
  "scales": [
    { "aesthetic": "x", "type": "linear", "name": "达标率（%）", "min": 0, "max": 100 },
    { "aesthetic": "fill", "type": "manual", "values": ["#c26d3a", "#857d74", "#857d74", "#857d74", "#857d74"] }
  ],
  "coord": { "type": "cartesian", "flip": true },
  "facet": null,
  "theme": {
    "palette": "restrained-warm",
    "background": "#ffffff",
    "grid": { "major": false, "minor": false },
    "fontFamily": "system-ui",
    "titleSize": 16,
    "axisLabelSize": 11,
    "canvas": { "width": 700, "height": 400 },
    "animation": false,
    "yAxis": { "show": false }
  },
  "title": "毅航达标率领先 18.7 个百分点",
  "subtitle": "5 家供应商达标率排名"
}
```
