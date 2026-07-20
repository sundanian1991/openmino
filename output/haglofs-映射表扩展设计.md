# haglofs-paradigm 映射表扩展设计

> Milestone 2 产出 · 2026-07-13
> 目标：扩展 judgment-bridge 映射表③，支持数据可视化场景

---

## 1. 现有映射表③分析

### 当前覆盖

| 信息类型 | PRIMARY 组件 | SECONDARY 组件 | 覆盖度 |
|----------|-------------|---------------|--------|
| 单一关键数字 | Ring / 大字独占段 | Stat Grid | ✅ 完整 |
| 一组并列数据 | Stat Grid / Swatch Cards | Elevation Profile / Data Table | ✅ 完整 |
| 一句主张/论点 | Tension Prose / Statement Quote | Principle Cards / Tension Grid | ✅ 完整 |
| 对比/差距 | Seam Benchmark / Comparison Table | Stat Grid | ✅ 完整 |
| 故事弧线 | Heritage Timeline | Pull Quote / Full-bleed Image | ✅ 完整 |

### 缺失的信息类型

| 信息类型 | 典型场景 | 当前处理方式 |
|----------|----------|--------------|
| **时间序列** | 销售趋势、用户增长、流量变化 | ❌ 无对应组件 |
| **占比分布** | 市场份额、预算分配、用户构成 | ⚠️ 用 Ring 勉强覆盖 |
| **多实体对比** | 产品对比、团队绩效、区域排名 | ⚠️ 用 Facet Bars 勉强覆盖 |
| **分布形态** | 用户年龄分布、价格分布、评分分布 | ❌ 无对应组件 |
| **关系拓扑** | 依赖关系、组织架构、知识图谱 | ⚠️ Network Graph 标注低优先级 |
| **流程损耗** | 漏斗转化、审批流程、物流路径 | ⚠️ Funnel 覆盖部分 |

---

## 2. 扩展设计：新增信息类型

### 2.1 新增信息类型分类

```
数据可视化信息类型
├── 趋势类（Trend）
│   ├── 时间序列：连续时间点的数值变化
│   └── 累积趋势：随时间累积的总量变化
│
├── 占比类（Proportion）
│   ├── 静态占比：某时刻的组成比例
│   └── 动态占比：占比随时间变化
│
├── 对比类（Comparison）
│   ├── 横向对比：多个实体同一指标
│   └── 纵向对比：同一实体不同指标
│
├── 分布类（Distribution）
│   ├── 频率分布：数值出现的频率
│   └── 密度分布：数值的集中程度
│
└── 关系类（Relationship）
    ├── 流量关系：从 A 到 B 的流动
    └── 依赖关系：A 影响 B 的关系
```

### 2.2 扩展映射表

| 信息类型 | PRIMARY 组件 | SECONDARY 组件 | 组合规则 |
|----------|-------------|---------------|----------|
| **时间序列** | Line Chart | Trend Arrow / Stat Grid | Hero 用 Pulse，正文用 Line Chart |
| **累积趋势** | Area Chart | Line Chart / Pipeline | 深底用 Area，浅底用 Line |
| **静态占比** | Donut Chart | Ring / Waffle | 占比 ≤5 项用 Donut，>5 项用 Waffle |
| **动态占比** | Stacked Area | Line Chart（多线） | 时间维度用 Stacked Area |
| **横向对比** | Bar Chart | Facet Bars / Split Compare | ≤5 实体用 Bar，>5 实体用 Facet Bars |
| **纵向对比** | Radar Chart | Capability Radar | ≤6 维度用 Radar |
| **频率分布** | Histogram | Dot Table | 数据量大用 Histogram |
| **密度分布** | Box Plot | — | 专业场景，低优先级 |
| **流量关系** | Sankey Diagram | Pipeline | 有损耗用 Sankey，无损耗用 Pipeline |
| **依赖关系** | Network Graph | Decision Tree | 节点少用 Network，有分叉用 Decision Tree |

---

## 3. 组合规则设计

### 3.1 核心原则

> **组合优先于新增。** 能用 2-3 个现有组件表达的，不新增组件。

### 3.2 组合模式

#### 模式 A：Hero + 正文（最常用）

```
Hero: Pulse（数据脉冲）或 Reveal（揭示式）
    ↓
正文: Line Chart / Bar Chart / Donut Chart
    ↓
支撑: Stat Grid / Data Table
```

**适用场景**：数据报告、趋势分析

#### 模式 B：Editorial + 数据穿插

```
Editorial 段落（叙事）
    ↓
数据组件（证据）
    ↓
Editorial 段落（解读）
    ↓
数据组件（更深证据）
```

**适用场景**：深度分析报告、案例研究

#### 模式 C：纯数据 Dashboard

```
Hero: Pulse（KPI 总览）
    ↓
Grid: 4 个 Stat Grid（核心指标）
    ↓
Row: Line Chart + Donut Chart（趋势 + 占比）
    ↓
Row: Bar Chart + Data Table（对比 + 明细）
```

**适用场景**：Executive Dashboard、监控面板

### 3.3 禁止的组合

- ❌ Line Chart + Area Chart 同时出现（语义重叠）
- ❌ Donut Chart + Pie Chart 同时出现（语义重叠）
- ❌ 图表组件堆砌超过 4 个（信息过载）
- ❌ 深底 Section 用浅底图表（违反范式 DNA）

---

## 4. 数据输入机制设计

### 4.1 数据格式

**JSON 格式（推荐）**：

```json
{
  "type": "line-chart",
  "data": {
    "labels": ["1月", "2月", "3月", "4月", "5月"],
    "datasets": [
      {
        "name": "销售额",
        "values": [120, 150, 180, 160, 200]
      }
    ]
  },
  "options": {
    "title": "月度销售趋势",
    "unit": "万元"
  }
}
```

**CSV 格式（简单场景）**：

```csv
月份,销售额,成本
1月,120,80
2月,150,90
3月,180,100
4月,160,95
5月,200,110
```

**Inline 格式（HTML 内嵌）**：

```html
<div class="line-chart" 
     data-labels='["1月","2月","3月","4月","5月"]'
     data-values='[120,150,180,160,200]'>
</div>
```

### 4.2 数据验证规则

| 规则 | 说明 |
|------|------|
| 标签长度 | ≤8 字符（避免重叠） |
| 数据点数量 | 2-24 个（太多会密） |
| 数值范围 | 0-100% 或实际数值 |
| 缺失值 | 用 null 表示，图表跳过 |

### 4.3 数据到组件的映射

```
用户输入数据
    ↓
判断信息类型（时间序列/占比/对比/...）
    ↓
选择组件（Line/Donut/Bar/...）
    ↓
应用组合规则（Hero + 正文 / Editorial 穿插 / ...）
    ↓
施工
```

---

## 5. 组件规范扩展

### 5.1 新增组件遵循设计宪法

**法则 1：信息本质驱动形态**
- Line Chart：时间序列的本质是"趋势"，所以线条要清晰，网格要克制
- Donut Chart：占比的本质是"部分vs整体"，所以中心留空放总计数字

**法则 2：每个元素必须挣到自己的像素**
- 坐标轴标签：必须有，但用 Mono 小字
- 网格线：1px 发丝线，hover 时才高亮
- 图例：只有多数据集时才显示

**法则 3：字体角色是信息性质的翻译器**
- 标题：Playfair（郑重）
- 轴标签：Mono（精确）
- 数据标签：Mono（精确）
- 注释：Inter（功能）

**法则 4：层次靠留白+色调+1px 线**
- 图表之间：24-32px 间距
- 图表与文字之间：16-24px 间距
- 不用阴影，不用渐变

### 5.2 组件命名规范

```
.haglofs-line-chart
.haglofs-area-chart
.haglofs-bar-chart
.haglofs-donut-chart
.haglofs-histogram
.haglofs-sankey
.haglofs-radar
```

### 5.3 组件 Radius 公约

| 组件 | Radius | 类别 |
|------|--------|------|
| Line Chart | 0px | 结构件 |
| Area Chart | 0px | 结构件 |
| Bar Chart | 0px | 结构件 |
| Donut Chart | 4px | 内容卡 |
| Histogram | 0px | 结构件 |

---

## 6. 下一步行动

**立即**（今天）：
- [ ] 确认扩展设计方案
- [ ] 开始编写扩展后的映射表③

**本周**：
- [ ] 完成映射表③扩展
- [ ] 完成组合规则文档
- [ ] 完成数据输入机制设计

**下周**：
- [ ] 实现 Line Chart 组件
- [ ] 验证调用路径丝滑

