# 供应商联盟认证总结 - Design Spec

## I. Project Information

| Item | Value |
| ---- | ----- |
| **Project Name** | 供应商联盟认证总结 |
| **Canvas Format** | PPT 16:9 (1280×720) |
| **Page Count** | 14 页 |
| **Design Style** | General Consulting（通用咨询风格） |
| **Target Audience** | 供应商管理层、项目经理 |
| **Use Case** | 内部总结汇报、经验分享会 |
| **Created Date** | 2026-04-09 |

---

## II. Canvas Specification

| Property | Value |
| -------- | ----- |
| **Format** | PPT 16:9 |
| **Dimensions** | 1280×720 |
| **viewBox** | `0 0 1280 720` |
| **Margins** | 左右 60px，上下 50px |
| **Content Area** | 1160×620（除去边距后的可用区域） |

---

## III. Visual Theme

### Theme Style

- **Style**: General Consulting（通用咨询风格）
- **Theme**: Light theme（浅色主题）
- **Tone**: Professional, Trustworthy, Data-driven

### Color Scheme

| Role | HEX | Purpose |
| ---- | --- | ------- |
| **Background** | `#FFFFFF` | 页面背景 |
| **Secondary bg** | `#F5F8FA` | 卡片背景、区块背景 |
| **Primary** | `#005587` | 麦肯锡蓝 - 标题装饰、重点区域、图标 |
| **Accent** | `#D04A02` | PwC 橙 - 数据高亮、关键信息 |
| **Secondary accent** | `#0076A8` | 德勤蓝 - 次级强调、渐变过渡 |
| **Body text** | `#333333` | 正文文字 |
| **Secondary text** | `#666666` | 说明文字、注释 |
| **Tertiary text** | `#999999` | 补充信息、页脚 |
| **Border/divider** | `#E0E0E0` | 卡片边框、分隔线 |
| **Success** | `#2E7D32` | 正向指标（绿色系） |
| **Warning** | `#C62828` | 问题标记（红色系） |

### Gradient Scheme (SVG syntax)

```xml
<!-- 标题渐变 -->
<linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#005587"/>
  <stop offset="100%" stop-color="#0076A8"/>
</linearGradient>

<!-- 背景装饰渐变 -->
<radialGradient id="bgDecor" cx="80%" cy="20%" r="50%">
  <stop offset="0%" stop-color="#005587" stop-opacity="0.08"/>
  <stop offset="100%" stop-color="#005587" stop-opacity="0"/>
</radialGradient>

<!-- 卡片渐变 -->
<linearGradient id="cardGradient" x1="0%" y1="0%" x2="0%" y2="100%">
  <stop offset="0%" stop-color="#FFFFFF"/>
  <stop offset="100%" stop-color="#F5F8FA"/>
</linearGradient>
```

---

## IV. Typography System

### Font Plan

**推荐预设**: P1（现代商务/科技）

| Role | Chinese | English | Fallback |
| ---- | ------- | ------- | -------- |
| **Title** | Microsoft YaHei Bold | Arial Bold | SimHei |
| **Body** | Microsoft YaHei | Calibri | Arial |
| **Code** | - | Consolas | Monaco |
| **Emphasis** | Microsoft YaHei Bold | Arial Bold | SimHei |

**Font stack**: `"Microsoft YaHei", "Calibri", "Arial", sans-serif`

### Font Size Hierarchy

**Baseline**: Body font size = 22px（中等密度内容）

| Purpose | Ratio | 22px baseline | Weight |
| ------- | ----- | ------------- | ------ |
| Cover title | 2.7x | 60px | Bold |
| Chapter title | 2.3x | 50px | Bold |
| Content title | 1.6x | 36px | Bold |
| Subtitle | 1.3x | 28px | SemiBold |
| **Body content** | **1x** | **22px** | Regular |
| Annotation | 0.8x | 18px | Regular |
| Page number/date | 0.6x | 13px | Regular |

---

## V. Layout Principles

### Page Structure

- **Header area**: 80px 高度，包含页面标题
- **Content area**: 540px 高度，主要内容区域
- **Footer area**: 60px 高度，包含页码、日期、版权信息

### Common Layout Modes

| Mode | Suitable Scenarios |
| ---- | ----------------- |
| **Single column centered** | 封面、结论页、关键点强调 |
| **Left-right split (5:5)** | 对比分析、双概念并列 |
| **Left-right split (4:6)** | 左图右文、左文右图 |
| **Top-bottom split** | 流程图、时间线、分层展示 |
| **Three/four column cards** | 特性列表、团队介绍、模块展示 |
| **Matrix grid** | 对比分析、分类矩阵 |

### Spacing Specification

| Element | Recommended Range | Current Project |
| ------- | ---------------- | --------------- |
| Card gap | 24px | 24px |
| Content block gap | 32px | 32px |
| Card padding | 24px | 24px |
| Card border radius | 12px | 12px |
| Icon-text gap | 12px | 12px |
| Single-row card height | 280px | 280px |
| Double-row card height | 260px each | 260px |
| Three-column card width | 350px each | 350px |

---

## VI. Icon Usage Specification

### Source

- **Built-in icon library**: `templates/icons/chunk/`（640+ 图标）
- **Usage method**: Placeholder format `{{icon:chunk/icon-name}}`

### Recommended Icon List

| Purpose | Icon Path | Page |
| ------- | --------- | ---- |
| 人员管理 | `{{icon:chunk/users}}` | 04, 05, 08 |
| 数据分析 | `{{icon:chunk/bar-chart}}` | 06, 13 |
| 流程优化 | `{{icon:chunk/git-branch}}` | 07, 10 |
| 目标达成 | `{{icon:chunk/target}}` | 04 |
| 激励奖励 | `{{icon:chunk/gift}}` | 05 |
| 认证通过 | `{{icon:chunk/check-circle}}` | 11 |
| 时间规划 | `{{icon:chunk/clock}}` | 12, 13 |
| 清单检查 | `{{icon:chunk/list-details}}` | 07 |

---

## VII. Chart Reference List

| Chart Type | Reference Template | Used In |
| ---------- | ------------------ | ------- |
| `horizontal_bar_chart` | `templates/charts/horizontal_bar_chart.svg` | 11（供应商评分排名） |
| `donut_chart` | `templates/charts/donut_chart.svg` | 03（模块分布） |
| `kpi_cards` | `templates/charts/kpi_cards.svg` | 13（关键指标） |

---

## VIII. Image Resource List

本演示文稿不使用图片，采用纯 SVG 矢量图形和图标系统。

---

## IX. Content Outline

### Part 1: 开场

#### Slide 01 - 封面

- **Layout**: 单列居中，深色渐变背景
- **Title**: BPO 供应商联盟认证总结会
- **Subtitle**: 标准化运营方法论与落地实践
- **Info**: 2026年4月

#### Slide 02 - 目录

- **Layout**: 三列卡片布局
- **Title**: 今日议程
- **Content**:
  - 核心方法论分享
  - 供应商认证与收获
  - 落地方案与展望

---

### Part 2: 核心方法论

#### Slide 03 - 方法论总览

- **Layout**: 仪表盘布局 + 图标
- **Title**: 电销管理六大核心模块
- **Chart**: `donut_chart`
- **Content**:
  - 坐席分级管理
  - 话术沉淀体系
  - 团队激励方案
  - 三会管理流程
  - 名单管控规则
  - 分时段拨打策略

#### Slide 04 - 坐席分级管理

- **Layout**: 左右分栏（4:6）
- **Title**: ABC分级竞争机制
- **Content**:
  - **左侧**：核心原则
    - 同等级竞争（C级不越级A级）
    - 晋升路径清晰（C→B→A）
    - 名单量差异化（A级比C级多15条）
  - **右侧**：失败教训
    - 王者荣耀段位分级尝试
    - 固定名单额度导致不公平感
    - 低段位坐席产生倦怠

#### Slide 05 - 激励体系设计

- **Layout**: 上下分层
- **Title**: 日周维度即时激励
- **Content**:
  - **日维度**：
    - 上午开2单 → 抽16-88元红包
    - 下午开3单/6单 → 再抽一次
  - **周维度**：
    - 大盘人均<2单时，周开12单抽50-300元奖品
  - **关键原则**：
    - 不要天天做激励（月头第一周、月尾）
    - 高频会降低激励价值
    - 团队PK比现金更有效

#### Slide 06 - 名单管控策略

- **Layout**: 矩阵网格（2×3）
- **Title**: 名单全生命周期管理
- **Content**:
  - **新名单静置**：2-3天不动用
  - **拨打频次**：单名单≤40次
  - **黄金时段**：18:30-19:30全打新名单
  - **周末回收**：周一全量清零
  - **客户分级**：ABCD标签，优先A级
  - **高价值匹配**：5万+额度给最优坐席

#### Slide 07 - 三会管理流程

- **Layout**: 时间线布局
- **Title**: 三会标准流程
- **Content**:
  - **早会（15分钟）**：
    - 复盘昨日数据
    - 拆解今日目标
    - 明确关键动作
    - 不安排培训、不说负面问题
  - **午会（10分钟）**：
    - 告知下午业绩缺口
    - 全员站着开
    - 周五增加小游戏
  - **晚会（不限时）**：
    - 分析最高/最低业绩
    - 听录音做辅导
    - 筛选次日名单
    - 逐个解决问题

---

### Part 3: 供应商认证与收获

#### Slide 08 - 认证规则与结果

- **Layout**: 左右分栏（5:5）
- **Title**: 认证规则与结果
- **Content**:
  - **左侧**：评分规则
    - 4位评委打分，满分100
    - 清晰表达有观点（25分）
    - 内容完整贴合主题（25分）
    - 结构清晰可落地（50分）
  - **右侧**：认证结果
    - 岐力：91分（第一名）
    - 汇讯：88分（第二名）
    - 赛维斯：86分（第三名）
    - 所有供应商均通过认证

#### Slide 09 - 岐力落地实施方案

- **Layout**: 三列卡片
- **Title**: 岐力：标准化落地三阶段
- **Content**:
  - **第一阶段**：
    - 管控准入端
    - 新员工手动流数据降低50%
    - 管理层养成每日数据查看习惯
  - **第二阶段**（2-3个月）：
    - 覆盖25%-40%员工
    - 标准化制度管理
    - 专项预算支持
  - **第三阶段**：
    - 成熟制度推广全项目
    - 实现全团队标准化

#### Slide 10 - 汇讯学习总结

- **Layout**: 左右分栏（4:6）
- **Title**: 汇讯：管理工具优化方向
- **Content**:
  - **左侧**：现有工具
    - BI看板（多维度追踪）
    - WPS智能看板（钉钉推送）
    - 现场大屏实时展示
  - **右侧**：待补充工具
    - 夕会问题记录表
    - 新人30天成长记录表
    - 60秒非有效名单回收流程
    - 标准化质检流程

#### Slide 11 - 各供应商核心收获

- **Layout**: 水平条形图 + 文字说明
- **Title**: 供应商认证收获对比
- **Chart**: `horizontal_bar_chart`
- **Content**:
  - **岐力**（91分）：分模块改进方案，三阶段落地计划
  - **汇讯**（88分）：管理工具复盘，标准化流程补充
  - **赛维斯**（86分）：人员管理优化，激励体系完善
  - **华啸**：新人培育方案，名产分层精细化
  - **广达**：招聘环节调整，师徒带教优化
  - **瀚锐**：零后团队激活，话术迭代机制

---

### Part 4: 落地方案与展望

#### Slide 12 - 落地推进计划

- **Layout**: 时间线布局
- **Title**: 三个月推进计划
- **Content**:
  - **第一个月**：
    - 名产梳理打标
    - 搭建标准化SOP
    - 建立数据体系
  - **第二个月**：
    - 落地执行新流程
    - 新人团队全面执行
    - 老团队逐步推进
  - **第三个月**：
    - 建立复盘机制
    - 完成试点验证
    - 新成果倒逼老团队

#### Slide 13 - 关键成功要素

- **Layout**: KPI 卡片布局
- **Title**: 标准化落地关键指标
- **Chart**: `kpi_cards`
- **Content**:
  - **人员管理**：ABC梯队建设覆盖率 100%
  - **激励体系**：日周月分层激励参与率 >80%
  - **数据驱动**：每日数据查看执行率 100%
  - **话术迭代**：月度话术更新及时率 100%
  - **三会执行**：早会午会晚会达标率 >95%
  - **名单效率**：名单利用率提升 >30%

#### Slide 14 - 总结

- **Layout**: 单列居中
- **Title**: 携手推进，共创价值
- **Content**:
  - 所有供应商均通过认证
  - 差异化落地方案已制定
  - 期待后续落地提升整体产能
  - BPO联盟持续开放共享

---

## X. Speaker Notes Requirements

生成对应的演讲备注文件，保存到 `notes/` 目录：

- **文件命名**: 与 SVG 名称匹配，如 `01_cover.md`
- **内容包含**: 讲稿要点、时间提示、过渡语句
- **风格**: 专业、正式、数据驱动

---

## XI. Technical Constraints Reminder

### SVG Generation Must Follow:

1. viewBox: `0 0 1280 720`
2. Background uses `<rect>` elements
3. Text wrapping uses `<tspan>` (`<foreignObject>` FORBIDDEN)
4. Transparency uses `fill-opacity` / `stroke-opacity`; `rgba()` FORBIDDEN
5. FORBIDDEN: `clipPath`, `mask`, `<style>`, `class`, `foreignObject`
6. FORBIDDEN: `textPath`, `animate*`, `script`, `marker`/`marker-end`
7. Arrows use `<polygon>` triangles instead of `<marker>`

### PPT Compatibility Rules:

- `<g opacity="...">` FORBIDDEN (group opacity); set on each child element individually
- Image transparency uses overlay mask layer (`<rect fill="bg-color" opacity="0.x"/>`)
- Inline styles only; external CSS and `@font-face` FORBIDDEN

---

## XII. Design Checklist

### Pre-generation

- [x] Content fits page capacity
- [x] Layout mode selected correctly
- [x] Colors used semantically

### Post-generation

- [ ] viewBox = `0 0 1280 720`
- [ ] No `<foreignObject>` elements
- [ ] All text readable (>=14px)
- [ ] Content within safe area
- [ ] All elements aligned to grid
- [ ] Same elements maintain consistent style
- [ ] Colors conform to spec
- [ ] CRAP four-principle check passed

---

## XIII. Next Steps

1. ✅ Design spec complete
2. **Next step**: Invoke **Executor** role to generate SVGs（无 AI 图片，直接进入执行阶段）
