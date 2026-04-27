# 刘乾坤人物深度分析 — Design Spec

## I. Project Information

| Item | Value |
| ---- | ----- |
| **Project Name** | 刘乾坤人物深度分析 |
| **Canvas Format** | PPT 16:9 (1280×720) |
| **Page Count** | 12 |
| **Design Style** | C) Top Consulting (麦肯锡风) |
| **Target Audience** | 年老师自用（内部分析参考） |
| **Use Case** | 理解、应对、学习刘乾坤的行为模式与管理手法 |
| **Created Date** | 2026-04-09 |

---

## II. Canvas Specification

| Property | Value |
| -------- | ----- |
| **Format** | PPT 16:9 |
| **Dimensions** | 1280×720 |
| **viewBox** | `0 0 1280 720` |
| **Margins** | 左右 60px，上下 50px |
| **Content Area** | 1160×620 |

---

## III. Visual Theme

### Theme Style

- **Style**: 麦肯锡咨询风（结论先行 + 数据驱动 + 结构化呈现）
- **Theme**: 浅色主题（白底 + 红色系强调）
- **Tone**: 分析感、克制、权威、洞察力

### Color Scheme

| Role | HEX | Purpose |
| ---- | --- | ------- |
| **Background** | `#F8F5F2` | 页面背景（暖白，柔和不刺眼） |
| **Secondary bg** | `#FFFFFF` | 卡片背景 |
| **Primary** | `#C41E3A` | 标题装饰、关键分区、图标填充 |
| **Accent** | `#E2725B` | 数据高亮、关键信息、链接 |
| **Secondary accent** | `#6B7280` | 次要强调、灰色标注 |
| **Body text** | `#2D2D2D` | 正文文字 |
| **Secondary text** | `#6B7280` | 注释、副标题 |
| **Tertiary text** | `#9CA3AF` | 页码、脚注 |
| **Border/divider** | `#E5E5E5` | 卡片边框、分割线 |
| **Success** | `#16A34A` | 正面指标（可学习、应对成功） |
| **Warning** | `#B91C1C` | 风险信号、高压模式 |

### Gradient Scheme

```xml
<!-- 封面标题渐变 -->
<linearGradient id="titleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" stop-color="#C41E3A"/>
  <stop offset="100%" stop-color="#E2725B"/>
</linearGradient>

<!-- 顶部装饰条渐变 -->
<linearGradient id="topBarGrad" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" stop-color="#C41E3A"/>
  <stop offset="50%" stop-color="#E2725B"/>
  <stop offset="100%" stop-color="#F8F5F2" stop-opacity="0"/>
</linearGradient>
```

---

## IV. Typography System

### Font Plan

**Recommended preset**: P1（现代商务）

| Role | Chinese | English | Fallback |
| ---- | ------- | ------- | -------- |
| **Title** | 微软雅黑 | Arial | sans-serif |
| **Body** | 微软雅黑 | Arial | sans-serif |
| **Emphasis** | 黑体 | Arial Bold | sans-serif |

**Font stack**: `"Microsoft YaHei", Arial, sans-serif`

### Font Size Hierarchy

**Baseline**: Body = 18px（内容密度大）

| Purpose | Ratio | Size | Weight |
| ------- | ----- | ---- | ------ |
| Cover title | 3x | 54px | Bold |
| Chapter title | 2.2x | 40px | Bold |
| Content title | 1.7x | 30px | Bold |
| Subtitle | 1.3x | 24px | SemiBold |
| **Body** | **1x** | **18px** | Regular |
| Annotation | 0.8x | 14px | Regular |
| Page number | 0.6x | 11px | Regular |

---

## V. Layout Principles

### Page Structure

- **Header area**: 40px 高，红色 3px 顶线 + 章节面包屑
- **Content area**: 540px 高，核心内容区
- **Footer area**: 40px 高，页码 + 来源标注

### Common Layout Modes (本 PPT 使用)

| Mode | Used In |
| ---- | ------- |
| **单列居中** | 封面、结尾 |
| **左-右 split (4:6)** | 权力内核、模式详解 |
| **三列卡片** | 权力来源、可学习内容 |
| **四象限矩阵** | 权力内核（3×3 矩阵）、应对策略 |
| **流程图/金字塔** | 权力来源层级、接手步骤 |

### Spacing Specification

| Element | Value |
| ------- | ----- |
| Card gap | 16px |
| Content block gap | 24px |
| Card padding | 20px |
| Card border radius | 0px（Sharp 咨询风） |
| Icon-text gap | 10px |
| Left accent bar width | 3px（红色） |

---

## VI. Icon Usage Specification

### Source

- **Built-in icon library**: `chunk`（直线几何风格）
- **Search**: `ls skills/ppt-master/templates/icons/chunk/ | grep <keyword>`

### Recommended Icon List

| Purpose | Icon Path | Page |
| ------- | --------- | ---- |
| 权力/皇冠 | `chunk/crown` | Slide 03 |
| 盾牌/防御 | `chunk/shield` | Slide 04 |
| 眼睛/洞察 | `chunk/eye` | Slide 05 |
| 对话/沟通 | `chunk/message` | Slide 06 |
| 网络/关系 | `chunk/share` | Slide 07 |
| 目标/靶心 | `chunk/target` | Slide 08 |
| 工具/手法 | `chunk/tool` | Slide 09 |
| 盾牌/应对 | `chunk/shield-check` | Slide 10 |
| 学习/成长 | `chunk/book` | Slide 11 |
| 对勾/确认 | `chunk/check` | 多处 |
| 警告/警示 | `chunk/alert` | 多处 |
| 箭头/趋势 | `chunk/arrow-right` | 多处 |

---

## VII. Chart & Visualization Reference List

| Chart Type | Purpose | Used In |
| ---------- | ------- | ------- |
| 金字塔图 | 权力来源层级（5 级） | Slide 04 |
| 矩阵 2×2 | 权力内核 3×3 | Slide 03 |
| 流程步骤 | 接手新业务四步 | Slide 09 |
| 对比卡片 | 刘乾坤 vs 年老师 | Slide 11 |
| 关系网络 | 人物关系图 | Slide 07 |
| 手绘 SVG | 权力框架可视化 | Slide 04 |
| 手绘 SVG | 行为模式流程图 | Slide 06 |
| 进度条 | 六步法评价 | Slide 12 |

---

## VIII. Image Resource List

| Filename | Dimensions | Ratio | Purpose | Type | Status | Generation Description |
| -------- | --------- | ----- | ------- | ---- | ------ | --------------------- |
| power_pyramid.svg | 500×400 | 1.25 | 权力来源金字塔 | Illustration | SVG 手写生成 | 手绘风格金字塔，5 层标注权力来源 |
| behavior_flow.svg | 600×300 | 2.0 | 行为模式流程图 | Diagram | SVG 手写生成 | 手绘风格流程图，展示触发→模式→结果 |
| relationship_map.svg | 500×350 | 1.43 | 人物关系网络 | Diagram | SVG 手写生成 | 手绘风格关系图，节点+连线标注关系性质 |

---

## IX. Content Outline

### Slide 01 — 封面

- **Layout**: 全屏红色顶线装饰 + 居中标题
- **Title**: 刘乾坤人物深度分析
- **Subtitle**: 权力框架 · 行为模式 · 应对策略 · 可学习内容
- **Info**: 年老师 建档 | 2026-03-19 创建 | v10.2

### Slide 02 — 一句话定位

- **Layout**: 左图标 + 右大文字（单核心信息页）
- **Title**: 一句话定位
- **Content**: 高压管理型业管，擅长**立规矩 + 三要素法**，对上表演、对下施压、信息管控。
- **Visual**: 左侧手持手绘风格"放大镜"图标，右侧大字

### Slide 03 — 权力内核（3 个诉求）

- **Layout**: 三列卡片
- **Title**: 权力内核 — 他想要什么？
- **Content**:
  - **控制权** — 立规矩、阻断信息、责任下放。动机：刚接手需要"我在管"的信号
  - **展示权** — 群内表演、打鸡血、CC上级。动机：最在意"老板知不知道我在解决"
  - **安全感** — 信息管控、建立依赖。动机：怕被替代，让别人依赖自己
- **Visual**: 每列顶部 chunk 图标（crown / eye / shield），左侧红色 3px 竖条

### Slide 04 — 权力来源（5 种权力）

- **Layout**: 左侧手绘金字塔图 + 右侧表格
- **Title**: 权力来源 — 权力从哪来？
- **Content**:
  - **规则权** — 立规矩、机制先行。应对：确认合理性，不盲目接受
  - **信息权** — 两头堵、阻断信息。应对：建立独立渠道
  - **关系权** — 拉拢圈人、人情债。应对：接受但不欠人情
  - **注意权** — 群内表演、打鸡血。应对：不抢戏，专注边界
  - **施压权** — 公开锁定、高压管理。应对：反问回去，不接任务
- **Visual**: 左侧手绘风格金字塔，5 层从下到上标注 5 种权力

### Slide 05 — 核心行为模式（18 种）概览

- **Layout**: 四列卡片网格（每列 4-5 个模式编号）
- **Title**: 核心行为模式 — 18 种战术动作
- **Content**: 按权力来源分组展示 18 种模式编号 + 名称
  - 规则权：7 立规矩
  - 信息权：13 两头堵
  - 关系权：8 拉拢圈人、12 人情债管理
  - 注意权：2 群内表演、6 任务下放+CC 展示
  - 施压权：3 公开锁定、4 高压管理、9 追责转嫁、10 加压链
  - 组合拳：1 抛问题、5 正面对冲、11 借力打力、14 群聊闹事、15 选择性攻击、16 质疑数据降温、17 挖人试探、18 镜像过敏
- **Visual**: 每种模式前加警告/对勾图标（风险 vs 中性）

### Slide 06 — 关键模式详解（组合拳）

- **Layout**: 左右分栏
- **Title**: 模式组合拳 — 什么时候用什么招？
- **Content**:
  - **刚接手** → 立规矩 + 数据切入
  - **日常运营** → 群内表演 + 三要素法
  - **遇到阻力** → 高压管理 + 公开锁定
  - **需要上级支持** → 打鸡血 + 道德绑架
- **Visual**: 手绘风格流程图：触发场景 → 模式组合 → 预期效果

### Slide 07 — 关系网络

- **Layout**: 中心人物（刘乾坤）+ 辐射关系节点
- **Title**: 关系网络 — 他在和谁互动？
- **Content**:
  - **郭鑫** — 前同事，"鑫鑫"，"用你的嘴出我的力"
  - **马贵贤** — 前同事，"你的工作我的成果"
  - **年老师** — 配合关系，"兄弟"称呼 + 主动帮忙拉拢
  - **张世跃** — 实习生，任务下放 + 功劳上报
  - **供应商** — 外部，利益驱动 + 责任下放
  - **刘伟佳** — 师承关系（高级版 vs 初级版）
- **Visual**: 手绘风格关系网络图，中心刘乾坤，连线标注互动特征

### Slide 08 — 供应商管理手法（4 种）

- **Layout**: 四列卡片
- **Title**: 供应商管理手法 — 刘乾坤的四招
- **Content**:
  - **质问式** — "汰换机制是什么？" → 让供应商解释问题
  - **驱动式** — "3.4亿才有奖金" → 用利益驱动供应商自己急
  - **要求式** — "本月人力计划、周度计划" → 要求具体计划
  - **改进式** — "原因、提升目标、举措" → **三要素法**：让供应商自己承诺
- **Visual**: 每列加箭头图标表示施压强度递增

### Slide 09 — 工作手法全景 — 接手新业务

- **Layout**: 横向四步流程图
- **Title**: 接手新业务的四步棋
- **Content**:
  - **1. 立规矩** → 宣布 7 条规则 → 目的：后续是"按规则办事"
  - **2. 数据切入** → 摆数据不出结论 → 目的：责任分散，自己居功
  - **3. 公开锁定** → 群里@具体人 → 目的：制造回复压力
  - **4. 建立预期** → "按规则办事"形象 → 目的：后续引用初始规则
- **Visual**: 手绘风格流程图，箭头连接四步，每步标注"高明之处"

### Slide 10 — 年老师应对策略

- **Layout**: 四象限矩阵
- **Title**: 年老师应对策略 — 核心原则
- **Content**:
  - **不主动背锅** — 刘乾坤的问题直接传递，不接"帮我看下"
  - **边界清晰** — 周末不接@，工作日按流程
  - **信息独立** — 建立独立渠道，不依赖他拿数据
  - **学习技巧** — 立规矩、三要素法、数据说话
- **话术表**:
  | 他的手法 | 年老师回应 |
  | "帮我看下" | "你的想法是什么？" |
  | 周末@ | "收到，周一处理" |
  | "别找供应商" | "我需要一线真实反馈" |
  | "辛苦兄弟" | "我今天8个供应商，担心盯不细" |

### Slide 11 — 可学习内容 & 差异对比

- **Layout**: 左对比（刘 vs 年）+ 右可学清单
- **Title**: 能学什么？年老师改进了什么？
- **Content**:
  - **刘乾坤六步**：定边界✅ 查病灶✅ 谈到位✅ 强执行⚠️ 树标杆⚠️ 建机制✅
  - **年老师改进**：加"给支持"、温和但坚决、长期伙伴而非高压
  - **核心差异**：刘=摆问题→施压→让供应商自己想；年=摆问题→提要求→**给支持**→让供应商自己想→**长期合作**
- **可学清单**：立规矩、三要素法、数据说话、机制先行

### Slide 12 — 结尾 & 行动要点

- **Layout**: 居中 + 底部三条行动要点
- **Title**: 核心结论
- **Content**:
  - **看懂他**：控制权 + 展示权 + 安全感 — 一切行为从这三个诉求出发
  - **应对他**：不背锅、守边界、信息独立、学习技巧
  - **学习他**：规则先行、三要素法、数据驱动、机制先行
- **Footer**: "破绽：表演型管理 → 真实能力可能不足 | 信息管控 → 长期合作困难 | 施压过度 → 容易引发抵触"

---

## X. Speaker Notes Requirements

- **File naming**: `01_cover.md`, `02_positioning.md`, ...
- **Style**: 对话式、分析性语气（年老师自用的内部笔记风格）
- **Structure**: 每页标注"这一页说明什么" + "关键识别信号"

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
8. **手绘 SVG**: 使用不规则 `path` 命令模拟手绘笔触（抖动线条、手绘圆等），不使用 `<style>` 或 `class`

### PPT Compatibility Rules:

- `<g opacity="...">` FORBIDDEN; set on each child element individually
- Image transparency uses overlay mask layer
- Inline styles only; external CSS and `@font-face` FORBIDDEN

---

## XII. Design Checklist

### Pre-generation

- [ ] 内容密度合理（每页 3-6 个要点）
- [ ] 版式多样性（不连续出现相同布局）
- [ ] 手绘 SVG 信息功能明确（非纯装饰）

### Post-generation

- [ ] viewBox = `0 0 1280 720`
- [ ] 无 `<foreignObject>` 元素
- [ ] 所有文字可读（>=11px）
- [ ] 内容在安全区域内
- [ ] 颜色符合红色系规范
- [ ] 页码徽章位置 (x: 9.3", y: 5.1")

---

## XIII. Next Steps

1. ✅ Design spec complete
2. **Next step**: Invoke **Executor** role to generate SVGs (no AI image generation needed, hand-drawn SVGs will be generated by Executor)
