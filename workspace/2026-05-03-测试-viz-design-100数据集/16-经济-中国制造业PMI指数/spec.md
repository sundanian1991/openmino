# Compiled SPEC — 中国制造业PMI指数

---

## Page: 制造业收缩与服务业韧性的冰火两重天

- **场景论文**：用多线折线图 + 50 荣枯线揭示制造业持续低迷与非制造业扩张的结构性分化
- **签名视觉元素**：50 参考线（虚线）将画布分为扩张/收缩两区，制造业 PMI 反复穿越
- **签名视觉元素 source id**：Custom
- **为什么不能简化为默认模板**：荣枯线（50）是 PMI 分析的核心锚点，需要作为视觉分割线处理，不是普通参考线

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者不知道制造业 PMI 有多频繁跌破 50（28 个月中 17 个月 <50），以及与服务业的分化程度

**【想传达什么】**
- 核心信息（一句话）：中国制造业 28 个月中 17 个月处于收缩区间，与非制造业形成结构性分化

**【结论】**
- 读者应得出的判断：制造业持续承压，经济韧性主要来自服务业；新订单指数反复穿越 50 预示制造业尚未企稳

**【思路】**
- 视觉叙事路径：第一眼看到 50 线 → 第二眼看到制造业反复穿越 → 最终理解结构分化

### 视觉编码

- **X 轴编码**：日期（2023-01 至 2025-04，月度）
- **Y 轴编码**：PMI 指数值（48-59 范围）
- **颜色编码**：
  - manufacturing_pmi：Coral `#d96b5a`（高亮，表示焦点 -- 收缩压力）
  - non_manufacturing_pmi：Stone `#857d74`（灰化，非焦点但提供对比）
  - new_order_index：Stone `#ada599`（浅灰虚线，跟随指标）
- **线型编码**：new_order_index 用虚线（先行指标特征）
- **大小编码**：无

### 数据组织

- **字段清单**：date, manufacturing_pmi, non_manufacturing_pmi, new_order_index
- **排序规则**：按 date 升序
- **聚合规则**：无（原始月度数据）
- **数据示例**：

| date | manufacturing_pmi | non_manufacturing_pmi | new_order_index |
|------|-------------------|-----------------------|-----------------|
| 2023-01 | 50.1 | 54.4 | 50.9 |
| 2024-08 | 49.1 | 50.3 | 48.6 |
| 2025-03 | 50.5 | 51.4 | 51.8 |

### 标注策略

- **高亮点**（<=10%）：制造业 PMI 线整体高亮，配合 2024-08 最低点标注
- **标注内容**：
  - 标注 1（2024-08 最低点）："制造业 PMI 跌至 49.1，28 个月最低"
  - 标注 2（50 参考线）："荣枯线（50）"
- **基准线/参考线**：50 水平参考线（荣枯线），虚线标注

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 结论性 + 副标题含时间范围 | 先给判断 |
| 制造业 PMI | Coral 高亮 + 粗线 | 主角（收缩压力） |
| 非制造业 PMI | Stone 灰 + 细线 | 韧性参照 |
| 新订单指数 | Stone 浅灰虚线 | 先行信号 |
| 50 参考线 | Stone 虚线 + 标注 | 荣枯线锚定 |

### 布局

- **画布**：800 x 550
- **标题区**：顶部居左，标题 16px/600 Warm800，副标题 11px/400 Stone
- **图表区**：居中，占画布 85%
- **标注区**：2024-08 数据点下方
- **留白**：四周 >=20px
- **配色**：restrained-warm（Warm + Stone + Coral 语义色）

### 图例与辅助

- **图例**：需要，底部水平排列（制造业 PMI / 非制造业 PMI / 新订单指数）
- **脚注**："数据来源：中国国家统计局 | PMI > 50 = 扩张，< 50 = 收缩 | 2023.01-2025.04"
- **特殊说明**：制造业 PMI 中 28 个月有 17 个月低于 50

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | C07+07 | SKILL.md | 趋势+拐点叙事 + 折线图 |
| 风格选择 | restrained-warm | style-schools.md | 克制温暖风格 |
| 配色选择 | Warm+Stone+Coral | color-themes.md | Coral 表达收缩语义 |
| 构图选择 | full-width | composition-templates.md | 单图全宽 |
| 字体选择 | neutral-professional | typography-moods.md | 经济数据中性专业 |
| DNA 参考 | line-pmi-01 | chart-dna-db.md | PMI 荣枯线+多线对比 |

## 渲染委托

**渲染技能**：viz-echarts

```
委托指令：
"用 viz-echarts 渲染以下 SPEC：
- 模式：C07+07（趋势+拐点叙事 + 折线图）
- 标题：制造业 28 个月中 17 个月收缩，服务业持续扩张
- 数据字段：date, manufacturing_pmi, non_manufacturing_pmi, new_order_index
- 高亮：制造业 PMI（Coral #d96b5a），其余灰化
- 标注：2024-08 最低点 '跌至 49.1' / 50 参考线 '荣枯线'
- 画布：800x550
- 参考线：y=50 虚线
请遵循 13-VISUALIZATION.md 配色规范。"
```

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "multi_line",
  "title": "制造业 28 个月中 17 个月收缩，服务业持续扩张",
  "subtitle": "中国制造业/非制造业 PMI 及新订单指数 | 2023.01-2025.04",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["date", "manufacturing_pmi", "non_manufacturing_pmi", "new_order_index"],
    "series": [
      {
        "name": "非制造业 PMI",
        "values": [54.4, 56.3, 58.2, 56.4, 54.5, 53.2, 51.5, 51.0, 51.7, 50.6, 50.2, 50.4, 50.7, 51.4, 53.0, 51.2, 51.1, 50.5, 50.0, 50.3, 50.0, 50.2, 50.0, 52.2, 50.2, 51.4, 51.4, 51.1],
        "highlight": false
      },
      {
        "name": "新订单指数",
        "values": [50.9, 54.1, 53.6, 48.8, 48.3, 48.6, 49.5, 50.2, 50.5, 49.8, 49.4, 48.7, 49.0, 49.0, 51.6, 50.7, 49.6, 49.5, 49.3, 48.6, 49.9, 50.0, 50.8, 51.0, 49.2, 51.1, 51.8, 50.2],
        "highlight": false
      },
      {
        "name": "制造业 PMI",
        "values": [50.1, 52.6, 51.9, 49.2, 48.8, 49.0, 49.3, 49.7, 50.2, 49.5, 49.4, 49.0, 49.2, 49.1, 50.8, 50.4, 49.5, 49.5, 49.4, 49.1, 49.8, 50.1, 50.3, 50.1, 49.5, 50.2, 50.5, 50.4],
        "highlight": true
      }
    ]
  },
  "visualEncoding": {
    "highlight": [{ "series": "制造业 PMI", "color": "#d96b5a" }],
    "grayscale": true,
    "maxHighlightRatio": 0.1,
    "lineStyles": {
      "新订单指数": { "type": "dashed" }
    }
  },
  "annotations": [
    { "text": "跌至 49.1，28 个月最低", "target": "制造业 PMI-2024-08" }
  ],
  "referenceLines": [
    { "type": "horizontal", "value": 50, "label": "荣枯线", "style": { "color": "#ada599", "dash": [6, 4] } }
  ],
  "theme": "default",
  "layout": {
    "titlePosition": "top-left",
    "chartArea": "center",
    "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 },
    "legendPosition": "bottom"
  }
}
```
