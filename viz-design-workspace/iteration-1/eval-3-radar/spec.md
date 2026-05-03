# Compiled SPEC — 供应商多维雷达对比

> 渲染契约。渲染技能（viz-echarts）按此执行。

---

## Page: 供应商六维雷达对比

- **场景论文**：三家供应商六维度能力对比，一眼看谁是全能王、谁有致命短板
- **签名视觉元素**：A 的雷达多边形全面外扩，C 的成本控制尖角独大形成反差
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：三供应商对比需要三色区分，非高亮单一系

### 叙事意图

**【可视化目的】**
- 认知缺口：三家供应商各维度优劣缺乏直观对比，文字表格难以快速定位短板和优势

**【想传达什么】**
- 核心信息（一句话）：供应商A综合领先但成本控制是唯一短板，C成本最优但人员不稳定

**【结论】**
- 读者应得出的判断：A是全能型选手（5/6维度领先），B均衡但无突出优势，C适合成本敏感场景

**【思路】**
- 视觉叙事路径：第一眼看到A多边形最大 → 第二眼发现A左下角凹陷（成本78） → 最终理解三家互补格局

### 视觉编码

- **X 轴编码**：六维度（业绩达成、质量控制、人员稳定、合规指标、响应速度、成本控制）
- **Y 轴编码**：各维度得分（0-100）
- **颜色编码**：A用Warm(#c26d3a)突出领先，B用Stone(#857d74)中性，C用Teal(#2e8b6e)暗示成本优势
- **大小编码**：无
- **无坐标轴时**：雷达图用极坐标，六轴对应六维度

### 数据组织

- **字段清单**：维度, Supplier_A, Supplier_B, Supplier_C
- **排序规则**：按自然业务逻辑排序
- **聚合规则**：无聚合，原始得分
- **数据示例**（3行）：

| 维度 | Supplier_A | Supplier_B | Supplier_C |
|------|-----------|-----------|-----------|
| 业绩达成 | 95 | 82 | 78 |
| 质量控制 | 88 | 90 | 75 |

### 标注策略

- **高亮点**（≤10%）：Supplier A 成本控制凹陷点
- **标注内容**（写原因+幅度，不写数字）：A成本控制仅78，为六维度最低
- **基准线/参考线**：80分基准圆（行业合格线）

### 视觉权重（读者视角）

- **主角元素**（hero）：Supplier A 雷达多边形 → Warm色 + 线宽2 + 填充透明度0.2
- **上下文元素**（medium）：Supplier B/C 雷达多边形 → Stone/Teal色 + 线宽1.5 + 填充透明度0.1
- **背景元素**（light）：雷达网格线 + 指示轴 → 灰色 #f2f0eb

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 结论性标题，16px 600weight | 第一眼传达核心判断 |
| A多边形 | Warm色填充+粗线 | 综合领先，视觉最突出 |
| C成本控制尖角 | Teal色在该轴外突 | 成本优势是C的核心标签 |
| 80分基准 | 虚线圆 | 快速判断谁过线谁没过 |

### 布局

- **画布**：800 x 600
- **标题区**：顶部居中，字号16
- **图表区**：中心，占比80%
- **标注区**：A成本控制点旁，说明原因
- **留白**：四周 ≥20px
- **配色**：restrained-warm（Warm #c26d3a / Stone #857d74 / Teal #2e8b6e）

### 图例与辅助

- **图例**：需要，底部居中，三供应商名称
- **脚注**：评估维度满分100
- **特殊说明**：指标越高越好

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 30-radar | SKILL.md pattern-index | 多维对比首选雷达 |
| 配色选择 | restrained-warm | color-themes.md | Warm突出主角 |
| 构图选择 | 极坐标全展 | composition-templates.md | 六轴均匀分布 |

## 渲染委托

**渲染技能**：viz-echarts

```
委托指令：
"用 viz-echarts 渲染以下 SPEC：
- 模式：30-radar（雷达图）
- 标题：供应商A综合领先，成本控制是唯一短板
- 数据字段：维度, Supplier_A, Supplier_B, Supplier_C
- 高亮：Supplier A 用 Warm 色
- 标注：A成本控制点标注短板原因
- 画布：800 x 600
请遵循 13-VISUALIZATION.md 配色规范。"
```

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v2",
  "data": {
    "type": "rows",
    "fields": ["维度", "Supplier_A", "Supplier_B", "Supplier_C"],
    "rows": [
      { "维度": "业绩达成", "Supplier_A": 95, "Supplier_B": 82, "Supplier_C": 78 },
      { "维度": "质量控制", "Supplier_A": 88, "Supplier_B": 90, "Supplier_C": 75 },
      { "维度": "人员稳定", "Supplier_A": 92, "Supplier_B": 76, "Supplier_C": 80 },
      { "维度": "合规指标", "Supplier_A": 85, "Supplier_B": 88, "Supplier_C": 82 },
      { "维度": "响应速度", "Supplier_A": 90, "Supplier_B": 72, "Supplier_C": 88 },
      { "维度": "成本控制", "Supplier_A": 78, "Supplier_B": 85, "Supplier_C": 90 }
    ]
  },
  "mapping": {
    "x": "维度",
    "y": "Supplier_A",
    "fill": null,
    "color": null,
    "size": null
  },
  "layers": [
    {
      "geom": "geom_line",
      "aes": { "y": "Supplier_A" },
      "params": { "color": "#c26d3a", "size": 2, "smooth": false },
      "readerWeight": "hero"
    },
    {
      "geom": "geom_line",
      "aes": { "y": "Supplier_B" },
      "params": { "color": "#857d74", "size": 1.5, "smooth": false },
      "readerWeight": "medium"
    },
    {
      "geom": "geom_line",
      "aes": { "y": "Supplier_C" },
      "params": { "color": "#2e8b6e", "size": 1.5, "smooth": false },
      "readerWeight": "medium"
    },
    {
      "geom": "geom_label",
      "aes": { "x": "成本控制", "y": 78, "label": "A唯一短板" },
      "params": { "color": "#c26d3a", "fontSize": 11 },
      "readerWeight": "hero"
    }
  ],
  "scales": [
    { "aesthetic": "y", "type": "linear", "name": "得分" },
    { "aesthetic": "color", "type": "manual", "values": ["#c26d3a", "#857d74", "#2e8b6e"] }
  ],
  "coord": { "type": "polar", "flip": false },
  "facet": null,
  "theme": {
    "palette": "restrained-warm",
    "background": "#ffffff",
    "grid": { "major": "#f2f0eb", "minor": false },
    "fontFamily": "system-ui",
    "titleSize": 16,
    "axisLabelSize": 11,
    "canvas": { "width": 800, "height": 600 }
  },
  "title": "供应商A综合领先，成本控制是唯一短板",
  "subtitle": "六维能力评估 | 满分100"
}
```
