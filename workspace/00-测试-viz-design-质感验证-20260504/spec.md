# spec.md — 渲染契约

> 生成时间：2026-05-04
> 场景：供应商季度评审报告 — 4 张图
> 全局风格：02 贝恩洞察 | 配色 color-themes #7 | 字体 DM Serif + DM Sans

---

## 自动选择记录

- **输入**: 供应商季度评审报告
- **Hash**: 累加和 % 4 = 1
- **L1 内容锁死**:
  - 模式: 07 折线图 / 22 雷达图 / 09 散点图 / 13 柱状图（意图匹配）
  - 弧线: 06 全景式（综合汇报）
  - 构图: 10 仪表盘（4 张图）
- **L2 场景约束**:
  - 风格: 02 贝恩洞察（hash % 4 = 1）
  - 开场: 02 指标阵列（hash % 2 = 0）
- **L3 风格自由**:
  - 配色: color-themes #7
  - 字体: typography #2
  - 节拍: C-04 + C-10 + C-02

---

## Source ID 清单

| Source ID | 字段 | 类型 | 来源 |
|-----------|------|------|------|
| S01 | 供应商名称 | string | 输入数据 |
| S02 | Q1 达成率 | percentage | 输入数据 |
| S03 | Q2 达成率 | percentage | 输入数据 |
| S04 | Q3 达成率 | percentage | 输入数据 |
| S05 | Q4 达成率 | percentage | 输入数据 |
| S06 | 团队规模 | number | 输入数据 |
| S07 | 人均产出(万) | number | 输入数据 |
| S08 | 客户满意度 | number | 输入数据 |
| S09 | FCI | number | 输入数据 |
| S10 | 流失率 | percentage | 输入数据 |

---

## 图 1：趋势全景

### SPEC

**【可视化目的】**
读者需要看到 5 家供应商全年达成率的变化轨迹。认知缺口：整体趋势是怎样的？差距在缩小还是拉大？

**【想传达什么】**
头部供应商（毅航）稳步攀升，尾部（翰锐）持续掉队 — 供应商之间的差距在逐季度拉大。

**【结论】**
毅航 Q1→Q4 从 88% 增长至 97%，而翰锐仅从 38% 微增至 45%，头部与尾部差距从 50pp 扩大至 52pp。

**【思路】**
折线图天然表达趋势。第一眼落在最上方的绿色线（毅航），第二眼看到最下方的灰色线（翰锐），最终理解"差距在拉大"。80% 基准线横穿，谁在线上一目了然。

**【模式选择】**
- **模式**：07 折线图
- **理由**：4 个时间点的趋势对比，折线是内容决定的选择

**【标题】**
- **主标题**：头部稳步攀升至 97%，尾部仅 45% — 差距持续扩大
- **副标题**：2026 年 Q1-Q4 · 5 家供应商达成率趋势

**【视觉编码】**
- **X 轴**：季度（Q1/Q2/Q3/Q4），ordinal
- **Y 轴**：达成率（0-100%），linear
- **颜色**：毅航 = 贝恩绿 #00875A（标杆），其余 = Stone 灰度
- **线宽**：毅航 3px 实线，毛毛虫/伽玛 2px 实线，赛维斯/翰锐 1.5px 虚线

**【数据组织】**
- **字段**：quarter, supplier, achievement_rate
- **排序**：按季度升序，供应商按 Q4 达成率降序排列图例
- **数据**：
  | quarter | supplier | rate |
  |---------|----------|------|
  | Q1 | 毅航 | 0.88 |
  | Q2 | 毅航 | 0.92 |
  | Q3 | 毅航 | 0.95 |
  | Q4 | 毅航 | 0.97 |
  | Q1 | 毛毛虫 | 0.82 |
  | ... | ... | ... |

**【标注策略】**
- **高亮**：毅航线（唯一彩色线）
- **标注**：Q4 端"连续 4 季度增长 → 达成率从 88% 升至 97%"
- **基准线**：80% 水平线，"行业达标基准"

**【布局】**
- **画布**：700 × 350
- **风格**：贝恩洞察 — 去装饰、数据说话
- **留白**：四周 ≥20px

### 渲染契约 JSON（v2）

```json
{
  "version": "viz-design-spec-v2",
  "renderTarget": "viz-echarts",
  "chartType": "line",
  "title": "头部稳步攀升至 97%，尾部仅 45% — 差距持续扩大",
  "subtitle": "2026 年 Q1-Q4 · 5 家供应商达成率趋势",
  "canvas": { "width": 700, "height": 350 },
  "data": {
    "rows": [
      { "quarter": "Q1", "supplier": "毅航", "rate": 88 },
      { "quarter": "Q2", "supplier": "毅航", "rate": 92 },
      { "quarter": "Q3", "supplier": "毅航", "rate": 95 },
      { "quarter": "Q4", "supplier": "毅航", "rate": 97 },
      { "quarter": "Q1", "supplier": "毛毛虫", "rate": 82 },
      { "quarter": "Q2", "supplier": "毛毛虫", "rate": 85 },
      { "quarter": "Q3", "supplier": "毛毛虫", "rate": 88 },
      { "quarter": "Q4", "supplier": "毛毛虫", "rate": 90 },
      { "quarter": "Q1", "supplier": "伽玛", "rate": 65 },
      { "quarter": "Q2", "supplier": "伽玛", "rate": 68 },
      { "quarter": "Q3", "supplier": "伽玛", "rate": 72 },
      { "quarter": "Q4", "supplier": "伽玛", "rate": 70 },
      { "quarter": "Q1", "supplier": "赛维斯", "rate": 55 },
      { "quarter": "Q2", "supplier": "赛维斯", "rate": 58 },
      { "quarter": "Q3", "supplier": "赛维斯", "rate": 62 },
      { "quarter": "Q4", "supplier": "赛维斯", "rate": 65 },
      { "quarter": "Q1", "supplier": "翰锐", "rate": 38 },
      { "quarter": "Q2", "supplier": "翰锐", "rate": 42 },
      { "quarter": "Q3", "supplier": "翰锐", "rate": 45 },
      { "quarter": "Q4", "supplier": "翰锐", "rate": 45 }
    ]
  },
  "mapping": {
    "x": "quarter",
    "y": "rate",
    "series": "supplier",
    "color": "supplier"
  },
  "layers": [
    {
      "geom": "geom_line",
      "aes": { "x": "quarter", "y": "rate", "group": "supplier" },
      "params": {
        "lineWidth": 2,
        "lineType": "solid"
      }
    },
    {
      "geom": "geom_line",
      "aes": { "x": "quarter", "y": "rate", "group": "supplier", "filter": "supplier == '毅航'" },
      "params": {
        "lineWidth": 3,
        "color": "#00875A",
        "lineType": "solid"
      }
    },
    {
      "geom": "geom_hline",
      "aes": { "yintercept": 80 },
      "params": {
        "lineType": "dashed",
        "color": "#f0a090",
        "lineWidth": 1
      }
    },
    {
      "geom": "geom_label",
      "aes": { "x": "Q4", "y": 97, "label": "连续 4 季度增长" },
      "params": {
        "color": "#00875A"
      }
    }
  ],
  "scales": [
    {
      "aesthetic": "x",
      "type": "ordinal",
      "title": "季度"
    },
    {
      "aesthetic": "y",
      "type": "linear",
      "title": "达成率 (%)",
      "domain": [0, 100]
    },
    {
      "aesthetic": "color",
      "type": "ordinal",
      "domain": ["毅航", "毛毛虫", "伽玛", "赛维斯", "翰锐"],
      "range": ["#00875A", "#666666", "#857d74", "#ada599", "#ada599"]
    }
  ],
  "coord": null,
  "facet": null,
  "theme": {
    "fontFamily": "DM Sans",
    "palette": {
      "primary": "#CC0000",
      "positive": "#00875A",
      "negative": "#CC0000",
      "stone": "#333333"
    }
  }
}
```

---

## 图 2：健康度雷达

### SPEC

**【可视化目的】**
读者需要在多个维度上对比供应商的综合能力。认知缺口：谁在哪些方面强/弱？综合能力排名如何？

**【想传达什么】**
毅航在所有维度上全面领先，3 家供应商综合得分低于 80% 基准线。

**【结论】**
毅航是唯一全方位达标的供应商，伽玛在满意度上勉强及格，翰锐在所有维度上均不达标。

**【思路】**
雷达图天然表达多维能力画像。第一眼落在最大的绿色多边形（毅航），第二眼看到 80% 基准圈，最终理解"只有 1 家达标"。

**【模式选择】**
- **模式**：22 雷达图
- **理由**：5 个维度 × 5 家供应商，多维能力画像天然用雷达

**【标题】**
- **主标题**：仅 1 家供应商全方位达标，3 家低于基准线
- **副标题**：2026 年 Q1 · 5 维度健康度评估

**【视觉编码】**
- **5 个维度轴**：Q4达成率、满意度、FCI、稳定性(100-流失率)、人均产出(归一化)
- **颜色**：毅航 = 贝恩绿 #00875A（2px + 10% 填充），其余灰度递减
- **大小**：多边形面积 = 综合得分

**【数据组织】**
- **字段**：supplier, dimension, score
- **5 个维度**（全部归一化到 0-100）：
  | 供应商 | Q4达成 | 满意度 | FCI | 稳定性 | 人均产出 |
  |--------|--------|--------|-----|--------|----------|
  | 毅航 | 97 | 92 | 92 | 97 | 75 |
  | 毛毛虫 | 90 | 88 | 85 | 95 | 87 |
  | 伽玛 | 70 | 75 | 68 | 92 | 63 |
  | 赛维斯 | 65 | 68 | 55 | 88 | 50 |
  | 翰锐 | 45 | 62 | 42 | 78 | 42 |

- **人均产出归一化**：以毛毛虫 52 万 = 100 分基准，其他按比例

**【标注策略】**
- **高亮**：毅航多边形（唯一彩色）
- **标注**：右下角"3 家供应商综合得分低于 80% 基准"
- **基准圈**：80% 虚线圆

**【布局】**
- **画布**：600 × 500
- **风格**：贝恩洞察
- **留白**：四周 ≥20px

### 渲染契约 JSON（v2）

```json
{
  "version": "viz-design-spec-v2",
  "renderTarget": "viz-echarts",
  "chartType": "radar",
  "title": "仅 1 家供应商全方位达标，3 家低于基准线",
  "subtitle": "2026 年 Q1 · 5 维度健康度评估",
  "canvas": { "width": 600, "height": 500 },
  "data": {
    "rows": [
      { "supplier": "毅航", "Q4达成率": 97, "满意度": 92, "FCI": 92, "稳定性": 97, "人均产出": 75 },
      { "supplier": "毛毛虫", "Q4达成率": 90, "满意度": 88, "FCI": 85, "稳定性": 95, "人均产出": 87 },
      { "supplier": "伽玛", "Q4达成率": 70, "满意度": 75, "FCI": 68, "稳定性": 92, "人均产出": 63 },
      { "supplier": "赛维斯", "Q4达成率": 65, "满意度": 68, "FCI": 55, "稳定性": 88, "人均产出": 50 },
      { "supplier": "翰锐", "Q4达成率": 45, "满意度": 62, "FCI": 42, "稳定性": 78, "人均产出": 42 }
    ]
  },
  "mapping": {
    "x": null,
    "y": null,
    "series": "supplier",
    "color": "supplier"
  },
  "layers": [
    {
      "geom": "geom_polygon",
      "aes": { "dimensions": ["Q4达成率", "满意度", "FCI", "稳定性", "人均产出"], "group": "supplier" },
      "params": {
        "lineWidth": 1.5,
        "fillOpacity": 0
      }
    },
    {
      "geom": "geom_polygon",
      "aes": { "dimensions": ["Q4达成率", "满意度", "FCI", "稳定性", "人均产出"], "group": "supplier", "filter": "supplier == '毅航'" },
      "params": {
        "lineWidth": 2,
        "color": "#00875A",
        "fillOpacity": 0.1
      }
    },
    {
      "geom": "geom_hline",
      "aes": { "value": 80 },
      "params": {
        "lineType": "dashed",
        "color": "#f0a090",
        "lineWidth": 1
      }
    },
    {
      "geom": "geom_label",
      "aes": { "x": "bottom-right", "y": "bottom-right", "label": "3 家供应商综合得分低于 80% 基准" },
      "params": {}
    }
  ],
  "scales": [
    {
      "aesthetic": "color",
      "type": "ordinal",
      "domain": ["毅航", "毛毛虫", "伽玛", "赛维斯", "翰锐"],
      "range": ["#00875A", "#666666", "#857d74", "#ada599", "#c4bdb6"]
    }
  ],
  "coord": { "type": "radar" },
  "facet": null,
  "theme": {
    "fontFamily": "DM Sans",
    "palette": {
      "primary": "#CC0000",
      "positive": "#00875A",
      "negative": "#CC0000",
      "stone": "#333333"
    }
  }
}
```

---

## 图 3：规模 vs 效率散点

### SPEC

**【可视化目的】**
探索供应商团队规模与人均产出的关系。认知缺口：大团队一定更高效吗？

**【想传达什么】**
团队规模不等于效率 — 毛毛虫（500 人）人均产出 52 万最高，翰锐（150 人）人均产出 25 万最低。

**【结论】**
人均产出与团队规模无明显正相关，毛毛虫是效率标杆。

**【思路】**
散点图天然表达两变量关系。第一眼落在右上方的绿色气泡（毛毛虫，高效率），第二眼看回归线，最终理解"规模≠效率"。

**【模式选择】**
- **模式**：09 散点图
- **理由**：探索两维数值关系（规模 vs 产出）+ 第三维（满意度作为气泡大小）

**【标题】**
- **主标题**：团队规模不等于效率 — 毛毛虫人均 52 万领跑
- **副标题**：2026 年 Q1 · 5 家供应商规模与产出关系

**【视觉编码】**
- **X 轴**：团队规模（linear）
- **Y 轴**：人均产出(万)（linear）
- **气泡大小**：客户满意度（线性映射）
- **颜色**：毛毛虫 = 贝恩绿 #00875A（效率标杆），其余 Stone 灰度

**【数据组织】**
- **字段**：supplier, team_size, per_capita_output, satisfaction
- **排序**：按人均产出降序排列图例
- **数据**：
  | 供应商 | 团队规模 | 人均产出 | 满意度 |
  |--------|---------|---------|--------|
  | 毛毛虫 | 500 | 52 | 88 |
  | 毅航 | 800 | 45 | 92 |
  | 伽玛 | 350 | 38 | 75 |
  | 赛维斯 | 200 | 30 | 68 |
  | 翰锐 | 150 | 25 | 62 |

**【标注策略】**
- **高亮**：毛毛虫气泡（唯一彩色）
- **标注**：气泡右上方"人均产出 52 万 → 500 人团队效率最优"
- **回归线**：显示趋势参照

**【布局】**
- **画布**：600 × 400
- **风格**：贝恩洞察
- **留白**：四周 ≥20px

### 渲染契约 JSON（v2）

```json
{
  "version": "viz-design-spec-v2",
  "renderTarget": "viz-echarts",
  "chartType": "scatter",
  "title": "团队规模不等于效率 — 毛毛虫人均 52 万领跑",
  "subtitle": "2026 年 Q1 · 5 家供应商规模与产出关系",
  "canvas": { "width": 600, "height": 400 },
  "data": {
    "rows": [
      { "supplier": "毛毛虫", "team_size": 500, "per_capita": 52, "satisfaction": 88 },
      { "supplier": "毅航", "team_size": 800, "per_capita": 45, "satisfaction": 92 },
      { "supplier": "伽玛", "team_size": 350, "per_capita": 38, "satisfaction": 75 },
      { "supplier": "赛维斯", "team_size": 200, "per_capita": 30, "satisfaction": 68 },
      { "supplier": "翰锐", "team_size": 150, "per_capita": 25, "satisfaction": 62 }
    ]
  },
  "mapping": {
    "x": "team_size",
    "y": "per_capita",
    "size": "satisfaction",
    "color": "supplier"
  },
  "layers": [
    {
      "geom": "geom_point",
      "aes": { "x": "team_size", "y": "per_capita", "size": "satisfaction", "group": "supplier" },
      "params": {
        "opacity": 0.7
      }
    },
    {
      "geom": "geom_point",
      "aes": { "x": "team_size", "y": "per_capita", "size": "satisfaction", "group": "supplier", "filter": "supplier == '毛毛虫'" },
      "params": {
        "color": "#00875A",
        "opacity": 1
      }
    },
    {
      "geom": "geom_smooth",
      "aes": { "x": "team_size", "y": "per_capita" },
      "params": {
        "lineType": "dashed",
        "color": "#f0a090",
        "lineWidth": 1
      }
    },
    {
      "geom": "geom_label",
      "aes": { "x": 500, "y": 52, "label": "人均产出 52 万 → 500 人团队效率最优" },
      "params": {
        "color": "#00875A"
      }
    }
  ],
  "scales": [
    {
      "aesthetic": "x",
      "type": "linear",
      "title": "团队规模"
    },
    {
      "aesthetic": "y",
      "type": "linear",
      "title": "人均产出 (万)"
    },
    {
      "aesthetic": "size",
      "type": "linear",
      "title": "客户满意度"
    },
    {
      "aesthetic": "color",
      "type": "ordinal",
      "domain": ["毛毛虫", "毅航", "伽玛", "赛维斯", "翰锐"],
      "range": ["#00875A", "#666666", "#857d74", "#ada599", "#c4bdb6"]
    }
  ],
  "coord": null,
  "facet": null,
  "theme": {
    "fontFamily": "DM Sans",
    "palette": {
      "primary": "#CC0000",
      "positive": "#00875A",
      "negative": "#CC0000",
      "stone": "#333333"
    }
  }
}
```

---

## 图 4：风险排行

### SPEC

**【可视化目的】**
快速识别需要关注的供应商。认知缺口：哪家供应商风险最高？优先级是什么？

**【想传达什么】**
翰锐 FCI 42 + 流失率 22% = 最高风险，需立即关注。

**【结论】**
翰锐综合风险指数最高（流失率 22% 超行业均值 8% 近 3 倍），赛维斯次之。

**【思路】**
水平条形图天然表达排行。第一眼落在最上方的红色条（翰锐），第二眼看到差距阶梯，最终理解"翰锐是头号风险"。

**【模式选择】**
- **模式**：13 柱状图（水平条形排列）
- **理由**：5 家供应商风险排行，条形图最直观

**【标题】**
- **主标题**：翰锐流失率 22% 超行业均值 3 倍 — 需立即关注
- **副标题**：2026 年 Q1 · 5 家供应商风险评估

**【视觉编码】**
- **Y 轴**：供应商名称（按风险指数降序排列）
- **X 轴**：综合风险指数（linear）
- **颜色**：翰锐 = Coral 500 #e8875f（高风险），其余 Stone 灰度递减
- **条形长度**：风险指数 = FCI(倒转) × 0.5 + 流失率 × 5

**【数据组织】**
- **字段**：supplier, risk_score, fci, attrition_rate
- **风险指数计算**：FCI(倒转: 100-FCI) × 0.5 + 流失率 × 5
  - 翰锐: (100-42)×0.5 + 22×5 = 29 + 110 = 139
  - 赛维斯: (100-55)×0.5 + 12×5 = 22.5 + 60 = 82.5
  - 伽玛: (100-68)×0.5 + 8×5 = 16 + 40 = 56
  - 毛毛虫: (100-85)×0.5 + 5×5 = 7.5 + 25 = 32.5
  - 毅航: (100-92)×0.5 + 3×5 = 4 + 15 = 19
- **排序**：按风险指数降序
- **数据**：
  | 供应商 | 风险指数 | FCI | 流失率 |
  |--------|---------|-----|--------|
  | 翰锐 | 139 | 42 | 22% |
  | 赛维斯 | 82.5 | 55 | 12% |
  | 伽玛 | 56 | 68 | 8% |
  | 毛毛虫 | 32.5 | 85 | 5% |
  | 毅航 | 19 | 92 | 3% |

**【标注策略】**
- **高亮**：翰锐条（唯一彩色）
- **标注**：翰锐条右侧"流失率 22% → 超过行业均值 8% 近 3 倍"
- **阈值线**：风险指数 50 = "需关注阈值"

**【布局】**
- **画布**：650 × 350
- **风格**：贝恩洞察
- **留白**：四周 ≥20px

### 渲染契约 JSON（v2）

```json
{
  "version": "viz-design-spec-v2",
  "renderTarget": "viz-echarts",
  "chartType": "bar",
  "title": "翰锐流失率 22% 超行业均值 3 倍 — 需立即关注",
  "subtitle": "2026 年 Q1 · 5 家供应商风险评估",
  "canvas": { "width": 650, "height": 350 },
  "data": {
    "rows": [
      { "supplier": "翰锐", "risk_score": 139, "fci": 42, "attrition_rate": 22 },
      { "supplier": "赛维斯", "risk_score": 82.5, "fci": 55, "attrition_rate": 12 },
      { "supplier": "伽玛", "risk_score": 56, "fci": 68, "attrition_rate": 8 },
      { "supplier": "毛毛虫", "risk_score": 32.5, "fci": 85, "attrition_rate": 5 },
      { "supplier": "毅航", "risk_score": 19, "fci": 92, "attrition_rate": 3 }
    ]
  },
  "mapping": {
    "x": "risk_score",
    "y": "supplier",
    "color": "supplier"
  },
  "layers": [
    {
      "geom": "geom_bar",
      "aes": { "x": "supplier", "y": "risk_score" },
      "params": {
        "orientation": "horizontal"
      }
    },
    {
      "geom": "geom_bar",
      "aes": { "x": "supplier", "y": "risk_score", "filter": "supplier == '翰锐'" },
      "params": {
        "color": "#e8875f",
        "orientation": "horizontal"
      }
    },
    {
      "geom": "geom_vline",
      "aes": { "xintercept": 50 },
      "params": {
        "lineType": "dashed",
        "color": "#f0a090",
        "lineWidth": 1
      }
    },
    {
      "geom": "geom_label",
      "aes": { "x": "翰锐", "y": 139, "label": "流失率 22% → 超过行业均值 8% 近 3 倍" },
      "params": {
        "color": "#e8875f"
      }
    }
  ],
  "scales": [
    {
      "aesthetic": "x",
      "type": "ordinal",
      "title": "供应商"
    },
    {
      "aesthetic": "y",
      "type": "linear",
      "title": "综合风险指数"
    },
    {
      "aesthetic": "color",
      "type": "ordinal",
      "domain": ["翰锐", "赛维斯", "伽玛", "毛毛虫", "毅航"],
      "range": ["#e8875f", "#ada599", "#857d74", "#666666", "#333333"]
    }
  ],
  "coord": null,
  "facet": null,
  "theme": {
    "fontFamily": "DM Sans",
    "palette": {
      "primary": "#CC0000",
      "positive": "#00875A",
      "negative": "#e8875f",
      "stone": "#333333"
    }
  }
}
```
