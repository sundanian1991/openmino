# Compiled SPEC — 可视化编译规格

> 96-军事-全球国防预算排名 | Phase 3 | 模式B：AI推荐

---

## Page: 全球军费TOP15排名

- **场景论文**：用柱状图揭示美国一家独大的"一超多强"格局
- **签名视觉元素**：美国柱子Warm加粗 + 右侧标注"=第2-6名之和"
- **签名视觉元素 source id**：D-023
- **为什么不能简化为默认模板**：需要美国特殊标注和视觉突出

### 叙事意图（从 intent 继承，完整保留）

**【可视化目的】**
- 认知缺口：读者可能只知道美国军费高，但不清楚差距有多大（=第2-6名之和）

**【想传达什么】**
- 核心信息（一句话）：全球军费格局是"一超多强"——美国一家占全球39%，等于第2到第6名之和

**【结论】**
- 读者应得出的判断：美国军事投入的绝对优势没有任何国家或联盟可以匹敌

**【思路】**
- 视觉叙事路径：一柱擎天 → 2-6名之和标注 → 差距可视化

### 视觉编码

- **X 轴编码**：国家（按军费排名），水平柱状图
- **Y 轴编码**：国防支出（亿美元），0-10000范围
- **颜色编码**：美国Warm主色（#c26d3a），其余Stone色（#857d74）
- **大小编码**：不使用

### 数据组织

- **字段清单**：国家、国防支出（亿美元）
- **排序规则**：按国防支出降序
- **聚合规则**：无
- **数据示例**：美国: 9480 | 中国: 2960 | 俄罗斯: 1090

### 标注策略

- **高亮点**（≤10%）：美国（第1名）
- **标注内容**：标注"等于第2-6名之和"，不写具体金额
- **基准线/参考线**：无

### 入口映射（单图内部阅读路径）

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中，Warm800 | 结论先行 |
| 美国柱子 | Warm加粗，最长 | 一柱擎天 |
| 其余柱子 | Stone常规宽度 | 陪衬对比 |
| 标注 | 美国柱右侧 | 量化差距 |

### 布局

- **画布**：800 x 550
- **标题区**：顶部居中，16px/600
- **图表区**：水平柱状图，占比70%
- **标注区**：美国柱右侧，11px/600
- **留白**：四周 ≥20px
- **配色**：Warm + Stone

### 图例与辅助

- **图例**：需要，底部，美国 vs 其他国家
- **脚注**：来源：2024年全球国防预算数据
- **特殊说明**：全球合计约2.44万亿美元

---

## Page: 军费规模 vs GDP占比 vs 增速

- **场景论文**：用分组柱状图揭示"花得多"不等于"负担重"
- **签名视觉元素**：波兰增速Coral高亮 + GDP占比TOP3标注
- **签名视觉元素 source id**：D-156
- **为什么不能简化为默认模板**：三维度对比需要特殊的分组和标注策略

### 叙事意图

**【可视化目的】**
- 认知缺口：读者可能不知道军费排名和GDP占比排名完全不同

**【想传达什么】**
- 核心信息（一句话）：军费的"绝对量"和"相对负担"是两回事——沙特6.3%的GDP占比远超美国的3.4%，而欧洲正在集体加速

**【结论】**
- 读者应得出的判断：全球军费格局正在重塑，欧洲扩军是2024年最大变量

**【思路】**
- 视觉叙事路径：GDP占比排名不同 → 波兰增速异常 → 欧洲集体扩军信号

### 视觉编码

- **X 轴编码**：国家（选关键10国），分组柱状图
- **Y 轴编码**：三维度独立刻度（支出亿美元、GDP占比%、同比增速%）
- **颜色编码**：支出Warm色、GDP占比Stone色、增速Teal色，波兰增速Coral高亮
- **大小编码**：不使用

### 数据组织

- **字段清单**：国家、国防支出（亿美元）、占GDP比重（%）、同比变化（%）
- **排序规则**：按国防支出降序
- **聚合规则**：无
- **数据示例**：美国: [9480, 3.4, 2.3] | 波兰: [346, 4.1, 31.0]

### 标注策略

- **高亮点**（≤10%）：波兰增速（+31.0%，异常值）
- **标注内容**：标注"北约东翼，安全压力最大"
- **基准线/参考线**：GDP占比2%水平线（北约目标）

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 顶部居中，Warm800 | 结论先行 |
| 支出柱 | Warm色 | 绝对规模 |
| GDP占比柱 | Stone色 | 相对负担 |
| 增速柱 | Teal色，波兰Coral | 增长趋势+异常 |
| 2%参考线 | Stone虚线 | 北约目标基准 |

### 布局

- **画布**：800 x 550
- **标题区**：顶部居中，16px/600
- **图表区**：分组柱状图，占比70%
- **标注区**：波兰柱上方 + GDP占比TOP3侧边
- **留白**：四周 ≥20px
- **配色**：Warm + Stone + Teal + Coral

### 图例与辅助

- **图例**：需要，底部，三维度标识
- **脚注**：来源：2024年全球国防预算数据；北约2%目标推动欧洲大幅增长
- **特殊说明**：仅选关键10国展示，非全部15国

---

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 + 26-并列比较 | SKILL.md §五 | 排名+多维对比 |
| 风格选择 | restrained-warm | style-schools.md | 数据叙事，克制风格 |
| 配色选择 | Warm + Stone + Coral | color-themes.md | 主色+辅助+异常高亮 |
| 构图选择 | 垂直堆叠 | composition-templates.md | 排名→分解叙事 |
| 字体选择 | analytical-calm | typography-moods.md | 分析型数据叙事 |
| DNA 参考 | D-023, D-156 | chart-dna-db.md | 排名差距+多维对比 |

## 渲染委托

**渲染技能**：viz-echarts

```
委托指令：
"用 viz-echarts 渲染以下 SPEC：
- 模式：13-柱状图 + 26-并列比较
- 标题：结论性标题
- 数据字段：国家、军费、GDP占比、增速
- 高亮：美国(规模) + 波兰(增速)
- 标注：规模差距 + 增速原因
- 画布：800x550
请遵循 13-VISUALIZATION.md 配色规范。"
```

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "globalStyle": {
    "colorRamps": ["Warm", "Stone"],
    "palette": {
      "primary": "#c26d3a",
      "secondary": "#857d74",
      "accent": "#2e8b6e",
      "title": "#6b3410",
      "subtitle": "#857d74",
      "axis": "#ada599",
      "grid": "#f2f0eb",
      "bg": "#faf9f7"
    },
    "typography": {
      "title": { "size": 16, "weight": 600 },
      "subtitle": { "size": 11, "weight": 400 },
      "axisLabel": { "size": 11, "weight": 400 },
      "annotation": { "size": 11, "weight": 600 },
      "footnote": { "size": 10, "weight": 400 }
    },
    "spacing": { "cardPadding": 16, "titleToContent": 12, "cardGap": 12 },
    "cornerRadius": 10,
    "styleSchool": "restrained-warm"
  },
  "charts": [
    {
      "chartId": "chart-1",
      "renderTarget": "viz-echarts",
      "chartType": "bar_chart",
      "title": "美国军费等于第2到第6名之和，一超多强格局无悬念",
      "subtitle": "2024年 · 全球国防预算 TOP15（亿美元）",
      "canvas": { "width": 800, "height": 550 },
      "data": {
        "fields": ["国家", "国防支出(亿美元)"],
        "series": [
          { "name": "美国", "values": [9480], "highlight": true },
          { "name": "中国", "values": [2960], "highlight": false },
          { "name": "俄罗斯", "values": [1090], "highlight": false },
          { "name": "印度", "values": [836], "highlight": false },
          { "name": "沙特", "values": [758], "highlight": false },
          { "name": "英国", "values": [712], "highlight": false },
          { "name": "德国", "values": [668], "highlight": false },
          { "name": "法国", "values": [613], "highlight": false },
          { "name": "韩国", "values": [556], "highlight": false },
          { "name": "日本", "values": [502], "highlight": false },
          { "name": "波兰", "values": [346], "highlight": false },
          { "name": "意大利", "values": [326], "highlight": false },
          { "name": "澳大利亚", "values": [312], "highlight": false },
          { "name": "以色列", "values": [276], "highlight": false },
          { "name": "加拿大", "values": [268], "highlight": false }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "美国", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "等于第2-6名之和，占全球39%", "target": "美国" }
      ],
      "referenceLines": [],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 } }
    },
    {
      "chartId": "chart-2",
      "renderTarget": "viz-echarts",
      "chartType": "grouped_bar",
      "title": "军费负担沙特最重、增速波兰领跑，欧洲集体扩军是最大信号",
      "subtitle": "2024年 · 国防支出 vs GDP占比 vs 同比增速（关键10国）",
      "canvas": { "width": 800, "height": 550 },
      "data": {
        "fields": ["国家", "国防支出(亿美元)", "占GDP比重(%)", "同比变化(%)"],
        "series": [
          { "name": "国防支出", "values": [9480, 2960, 1090, 836, 758, 668, 502, 346, 276, 268], "highlight": false },
          { "name": "占GDP比重", "values": [3.4, 1.7, 5.9, 2.4, 6.3, 1.6, 1.2, 4.1, 5.3, 1.3], "highlight": false },
          { "name": "同比变化", "values": [2.3, 6.2, 24.0, 4.3, 7.8, 12.0, 16.0, 31.0, 18.0, 3.5], "highlight": true }
        ]
      },
      "visualEncoding": {
        "highlight": [{ "series": "同比变化", "color": "#c26d3a" }],
        "grayscale": true,
        "maxHighlightRatio": 0.1
      },
      "annotations": [
        { "text": "北约东翼，安全压力最大", "target": "波兰-同比变化" },
        { "text": "GDP占比最高", "target": "沙特-占GDP比重" }
      ],
      "referenceLines": [
        { "type": "horizontal", "value": 2, "label": "北约2%目标线", "style": { "color": "#ada599", "dash": [6, 4] } }
      ],
      "theme": "default",
      "layout": { "padding": { "top": 20, "right": 20, "bottom": 20, "left": 20 } }
    }
  ]
}
```
