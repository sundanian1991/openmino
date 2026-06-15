# SPEC — 全球500强企业营收TOP30

- **场景论文**: 30 家全球最大企业按营收排列，国家色系揭示美中主导格局
- **签名视觉元素**: 水平棒棒糖图，国家色系编码，Top3 放大标注
- **签名视觉元素 source id**: DNA 037（The Pudding 棒棒糖图）
- **为什么不能简化为默认模板**: 30 条数据需要颜色分组而非逐条标注，国家色系编码是核心叙事手段

## 版式布局

- **版式编号**: #08 L 型
- **画布尺寸**: 1200 x 900px
- **区域划分**:
  - 标题区: 顶部左侧，y=0-60px，字号 24px
  - 主内容区: 左侧 70%，y=60-850px
  - 解读区: 右侧 30%，y=60-850px，3 条解读卡片
  - 脚注区: 底部，y=850-900px，字号 11px

## 解读区内容

| 序号 | 形式 | 内容 | 视觉标记 |
|------|------|------|---------|
| 1 | 色点+加粗+说明 | 美国企业占据 TOP30 近半壁江山（14家），科技+零售双轮驱动 | 蓝色圆点 #003D6B |
| 2 | 色点+加粗+说明 | 中国企业以国企为主（10家），集中在炼油和银行业 | 红色圆点 #C0272D |
| 3 | 色点+加粗+说明 | 炼油行业数量最多（6家），但营收跨度最大，从 200B 到 461B | 灰色圆点 #5B7B8A |

## 叙事意图

**【可视化目的】**
- 认知缺口：全球最大企业的营收规模差距有多大？国家分布格局如何？

**【想传达什么】**
- 核心信息：美国和中国企业主导全球营收 TOP30，但产业结构截然不同

**【结论】**
- 读者应得出的判断：美国以科技+零售驱动，中国以能源国企为主，行业结构差异显著

**【思路】**
- 视觉叙事路径：第一眼看 Walmart 最长杆 → 第二眼看国家色系分组 → 最终理解美中产业格局差异

## WIIFT 提要

- **WIIFT 提要**: 美国企业占据全球营收 TOP30 近半壁江山，Walmart 6480 亿美元领跑，中国企业以国企为主集中在能源和金融
- **眨眼检验**: 第一眼最长杆（Walmart），第二眼蓝红双色分组，一秒感知美中主导

## 上下文四问

| 维度 | 回答 |
|------|------|
| **情境** | 商业分析 / 行业研究 |
| **受众** | 商业分析师、管理层 |
| **沟通者** | 数据分析师 |
| **目标** | 理解全球最大企业的营收分布和国家格局 |

## 视觉编码

- **Y 轴编码**: 公司名称（分类轴），按营收降序排列
- **X 轴编码**: 营收（百万美元），从 0 到 700,000
- **颜色编码**: 国家 — 美国（#003D6B 深蓝）、中国（#C0272D 朱红）、其他（#5B7B8A 暖灰蓝）
- **大小编码**: 圆点大小统一为 8px，Top3 放大到 12px

## 数据组织

- **字段清单**: rank, company, revenue_usd_million, country, industry
- **排序规则**: 按 revenue_usd_million 降序
- **聚合规则**: 无聚合，逐条展示
- **数据示例**:
  - Walmart | 648125 | 美国 | 零售
  - Amazon | 574785 | 美国 | 互联网零售
  - State Grid | 530097 | 中国 | 公用事业

## 标注策略

- **高亮点**（≤10%）: Top3 公司（Walmart、Amazon、State Grid）
- **标注内容**: Top3 标注公司名 + 营收数字，中位数参考线标注"中位数 280,145M"
- **基准线/参考线**: 营收中位数参考线（约 280,000 百万美元，Shell 附近）

## 渲染约束（强制 — 机器可读）

### 标注清单

```yaml
annotations:
  - type: label
    target: { series: "revenue", dataIndex: 0 }
    text: "Walmart $648B"
    position: right
    offset: { x: 8, y: 0 }
    style:
      fontSize: 13
      fontWeight: bold
      fill: "#003D6B"
      opacity: 1
  - type: label
    target: { series: "revenue", dataIndex: 1 }
    text: "Amazon $575B"
    position: right
    offset: { x: 8, y: 0 }
    style:
      fontSize: 13
      fontWeight: bold
      fill: "#003D6B"
      opacity: 1
  - type: label
    target: { series: "revenue", dataIndex: 2 }
    text: "State Grid $530B"
    position: right
    offset: { x: 8, y: 0 }
    style:
      fontSize: 13
      fontWeight: bold
      fill: "#C0272D"
      opacity: 1
  - type: hline
    target: { y: 280145 }
    text: "中位数"
    position: end
    offset: { x: 0, y: -8 }
    style:
      lineStyle: { color: "#9E9E9E", type: dashed, width: 1.5 }
      fontSize: 11
      fill: "#9E9E9E"
```

### 视觉权重映射

```yaml
visualWeight:
  hero:
    target: "Top3 圆点"
    style: { color: "按国家色", symbolSize: 12, lineWidth: 3 }
  medium:
    target: "Top4-10 圆点"
    style: { color: "按国家色", symbolSize: 8, lineWidth: 2 }
  light:
    target: "Top11-30 圆点"
    style: { color: "按国家色", symbolSize: 6, lineWidth: 1.5 }
```

### 颜色映射表

```yaml
colorMap:
  "美国": "#003D6B"
  "中国": "#C0272D"
  "英国": "#5B7B8A"
  "德国": "#5B7B8A"
  "日本": "#5B7B8A"
  "韩国": "#5B7B8A"
  "沙特阿拉伯": "#5B7B8A"
  "法国": "#5B7B8A"
  "medianLine": "#9E9E9E"
  "gridLine": "#E8E4DF"
  "labelDefault": "#3D3832"
  "background": "#FAFAF8"
```

### 布局约束

```yaml
layout:
  canvas: { width: 1200, height: 900 }
  grid: { top: 70, right: 280, bottom: 40, left: 160 }
  legend: { show: true, position: top-right, data: ["美国", "中国", "其他"] }
  tooltip: { enabled: true, formatter: "{b}: ${c}M" }
```

## 视觉权重

- **主角元素**（hero）: Top3 圆点 + 杆 → symbolSize 12 + 粗杆 + 标注公司名+营收
- **上下文元素**（medium）: Top4-10 圆点 → symbolSize 8 + 国家色杆
- **背景元素**（light）: Top11-30 圆点 → symbolSize 6 + 国家色杆（稍淡）

## 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | DM Serif Display 24px，结论性 | 第一眼传达核心判断 |
| Top3 圆点 | 放大 + 标注营收 | 营收量级的震撼感 |
| 国家色系 | 蓝/红/灰三色编码 | 揭示美中主导格局 |
| 中位数线 | 灰色虚线 | 参照锚点 |
| 解读区 | 右侧 3 条卡片 | 补充洞察，不重复数字 |

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | DNA 037 | chart-dna-db.md | The Pudding 棒棒糖图 |
| 风格选择 | 02 贝恩 | style-schools.md | 商业报告场景 |
| 配色选择 | 贝恩海军蓝+朱红 | color-themes.md | 双色对抗编码 |
| 构图选择 | #08 L 型 | composition-templates.md | 图表+解读 |
| 版式选择 | layout-selector | layout-selector.md | 排名场景 |
| DNA 参考 | 037, 236 | chart-dna-index.tsv | 棒棒糖排名案例 |

## 渲染委托

**渲染技能**: viz-echarts（管理层汇报/商业报告，HTML 输出）

**委托指令**:
```
"读以下 viz-design 文档，按要求渲染图表：
- intent.md: /Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/00-测试-viz-design-100数据集-20260503/09-商业-全球500强企业营收TOP30/viz-output/intent.md
- storyboard.md: /Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/00-测试-viz-design-100数据集-20260503/09-商业-全球500强企业营收TOP30/viz-output/storyboard.md
- spec.md: /Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/00-测试-viz-design-100数据集-20260503/09-商业-全球500强企业营收TOP30/viz-output/spec.md（重点读取"渲染约束"章节）
- checklist.md: /Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/00-测试-viz-design-100数据集-20260503/09-商业-全球500强企业营收TOP30/viz-output/checklist.md

渲染约束摘要：
- 标注清单：Top3 圆点标注公司名+营收（right, fontSize 13, bold）；中位数虚线 hline at y=280145（#9E9E9E dashed）
- 视觉权重：hero Top3 symbolSize=12 lineWidth=3；medium Top4-10 symbolSize=8 lineWidth=2；light Top11-30 symbolSize=6 lineWidth=1.5
- 颜色映射：美国 #003D6B 中国 #C0272D 其他国家 #5B7B8A medianLine #9E9E9E
- 布局约束：canvas 1200x900 grid top=70 right=280 bottom=40 left=160 legend top-right tooltip enabled"
```
