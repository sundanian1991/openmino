# SPEC — 场景 2：纯概念文字（三问原则）

> 输入："帮我画一张图表达供应商管理的三问原则：一问目标是否对齐、二问能力是否匹配、三问风险是否可控"

---

## 第一部分：叙事意图

**【可视化目的】**
读者需要一眼理解"三问原则"的结构和执行逻辑。认知缺口：三问不是孤立的检查清单，而是连贯的管理机制——前一问不通过，后一问就没有意义。

**【想传达什么】**
供应商管理有三个关键检查点，缺一不可，按顺序执行。

**【结论】**
三问原则是一个完整的准入检查机制，跳过任何一问都会带来风险。

**【思路】**
三个齿轮横向排列，依次咬合——齿轮 1（目标对齐）驱动齿轮 2（能力匹配），齿轮 2 驱动齿轮 3（风险可控）。第一眼看到三个齿轮的并列结构，第二眼看到咬合关系（顺序依赖），最终理解"这是一套机制，不是三个独立问题"。每个齿轮内写一问的关键词。

---

## 第二部分：视觉执行

**【模式选择】**
- **模式**：39-齿轮
- **理由**：concept-pattern-map.md 联动关系 → 39-齿轮。三问是顺序逻辑链，齿轮咬合天然表达"缺一不可"的机制感

**【标题】**
- **主标题**：供应商准入三问：一问目标、二问能力、三问风险
- **副标题**：供应商管理方法论

**【视觉编码】**
- **三个齿轮**：从左到右依次排列，大小递减（1 > 2 > 3），表达优先级递减但缺一不可
- **颜色**：齿轮 1 Warm 500（入口），齿轮 2 Warm 400（过渡），齿轮 3 Coral 400（风险信号，最后一问最重要）
- **齿轮内文字**：一问关键词（目标/能力/风险）
- **齿轮间标注**：咬合处箭头标注"→"表达顺序

**【数据组织】**
- **概念驱动，无结构化数据**
- **概念节点**：
  | 节点 | 关键词 | 完整描述 | 顺序 |
  |------|--------|----------|------|
  | 齿轮 1 | 目标 | 目标是否对齐 | 1 |
  | 齿轮 2 | 能力 | 能力是否匹配 | 2 |
  | 齿轮 3 | 风险 | 风险是否可控 | 3 |
- **关系**：线性咬合 1→2→3

**【标注策略】**
- **高亮**：齿轮 3（风险）用 Coral 色——最后一问是安全网，最关键
- **标注内容**：底部写"一问不过，不问下一问"
- **齿轮间**：咬合处标注序号"一问""二问""三问"

**【图例与辅助】**
- **图例**：不需要，齿轮内直接标注
- **脚注**：供应商管理三问原则

**【布局】**
- **画布**：600 × 350
- **标题区**：顶部，距顶 16px
- **齿轮区**：水平居中，三个齿轮横向排列，间距 40px
- **齿轮大小**：1 号半径 60px，2 号 50px，3 号 45px
- **标注区**：齿轮下方，Stone 400 小字

---

## 渲染契约 JSON（v2）

```json
{
  "version": "viz-design-spec-v2",
  "renderTarget": "viz-svg-flow",
  "chartType": "concept-gears",
  "title": "供应商准入三问：一问目标、二问能力、三问风险",
  "subtitle": "供应商管理方法论",
  "canvas": {"width": 600, "height": 350},
  "mapping": {
    "x": "sequence",
    "y": null,
    "color": "priority",
    "size": "order",
    "text": "concept"
  },
  "data": {
    "fields": ["order", "keyword", "full_text", "priority", "concept"],
    "rows": [
      {"order": 1, "keyword": "目标", "full_text": "一问：目标是否对齐", "priority": "entry", "concept": "目标对齐"},
      {"order": 2, "keyword": "能力", "full_text": "二问：能力是否匹配", "priority": "process", "concept": "能力匹配"},
      {"order": 3, "keyword": "风险", "full_text": "三问：风险是否可控", "priority": "critical", "concept": "风险可控"}
    ]
  },
  "layers": [
    {
      "geom": "geom_gear",
      "aes": {"cx": "order", "label": "keyword", "color": "priority"},
      "params": {"radii": [60, 50, 45], "spacing": 40, "teeth": 12}
    },
    {
      "geom": "geom_arrow",
      "aes": {"from": "order", "to": "order+1"},
      "params": {"direction": "right", "color": "#857d74"}
    },
    {
      "geom": "geom_label",
      "aes": {"text": "full_text"},
      "params": {"size": 12, "color": "#857d74", "position": "below_gear"}
    },
    {
      "geom": "geom_text",
      "aes": {"text": "bottom_annotation"},
      "params": {"text": "一问不过，不问下一问", "size": 14, "color": "#c98a6a", "position": "bottom_center"}
    }
  ],
  "scales": [
    {"aesthetic": "color", "type": "manual", "values": {"entry": "#c98a6a", "process": "#d4a588", "critical": "#E8875F"}}
  ],
  "coord": null,
  "facet": null,
  "theme": "concept"
}
```
