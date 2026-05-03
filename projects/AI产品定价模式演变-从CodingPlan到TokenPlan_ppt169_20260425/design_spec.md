# AI产品定价模式演变：从Coding Plan到Token Plan - Design Specification

> Tech-forward commercial analysis — anthropic template, consulting style, data-driven

---

## I. Project Information

| Item | Value |
| ---- | ----- |
| **Project Name** | AI产品定价模式演变：从Coding Plan到Token Plan |
| **Canvas Format** | PPT 16:9 (1280×720) |
| **Page Count** | 14 |
| **Design Style** | anthropic + General Consulting |
| **Target Audience** | 科技行业从业者 / 产品经理 / 商业分析人员 |
| **Use Case** | 内部分享 / 行业交流 / 知识沉淀 |
| **Created Date** | 2026-04-25 |

---

## II. Canvas Specification

| Property | Value |
| -------- | ----- |
| **Format** | PPT 16:9 |
| **Dimensions** | 1280 × 720 px |
| **viewBox** | `0 0 1280 720` |
| **Margins** | left/right 60px, top/bottom 50px |
| **Content Area** | x: 60-1220, y: 100-670 (1160×570) |

---

## III. Visual Theme

### Theme Style

- **Style**: anthropic — tech-forward, professional, modern
- **Theme**: Mixed (dark cover/chapter + light content pages)
- **Tone**: 商业分析 + 科技前沿 + 数据驱动

### Color Scheme

| Role | HEX | Purpose |
| ---- | --- | ------- |
| **Dark background** | `#1A1A2E` | 封面/章节页深色背景 |
| **Page background** | `#FFFFFF` | 内容页白色背景 |
| **Card background** | `#F8FAFC` | 卡片背景色 |
| **Primary (orange)** | `#D97757` | 标题强调、关键数据、装饰元素 |
| **Secondary (blue)** | `#4A90D9` | 流程图、趋势线、链接 |
| **Accent (green)** | `#10B981` | 正面指标、推荐、成功状态 |
| **Warning (red)** | `#EF4444` | 风险、警告、收紧信号 |
| **Body text** | `#1A1A2E` | 正文深色文字 |
| **Secondary text** | `#64748B` | 次要文字、图例、标注 |
| **Border/divider** | `#E2E8F0` | 卡片边框、分割线 |

### Gradient Scheme

```xml
<linearGradient id="darkBgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
  <stop offset="0%" stop-color="#1A1A2E"/>
  <stop offset="50%" stop-color="#16213E"/>
  <stop offset="100%" stop-color="#0F0F1A"/>
</linearGradient>

<linearGradient id="titleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
  <stop offset="0%" stop-color="#D97757"/>
  <stop offset="100%" stop-color="#4A90D9"/>
</linearGradient>
```

---

## IV. Typography System

### Font Plan

**Recommended preset**: P1 (Modern business/tech)

| Role | Chinese | English | Fallback |
| ---- | ------- | ------- | -------- |
| **Title** | Microsoft YaHei | Arial | sans-serif |
| **Body** | Microsoft YaHei | Calibri | sans-serif |
| **Code** | - | Consolas | Monaco |
| **Emphasis** | SimHei | Arial Black | sans-serif |

**Font stack**: `"Microsoft YaHei", "PingFang SC", Arial, sans-serif`

### Font Size Hierarchy

**Baseline**: Body font size = **18px** (dense content)

| Level | Ratio | Size | Weight |
| ----- | ----- | ---- | ------ |
| Cover title | 3x | 54px | Bold |
| Chapter title | 2.5x | 45px | Bold |
| Content title | 1.8x | 32px | Bold |
| Subtitle | 1.4x | 25px | SemiBold |
| **Body** | **1x** | **18px** | Regular |
| Annotation | 0.8x | 14px | Regular |
| Page number | 0.6x | 11px | Regular |
| Data highlight | 2.5x | 45px | Bold |

---

## V. Layout Principles

### Page Structure

- **Header area**: y=50-140, 顶部橙色装饰条 + 页签标签 + 标题
- **Content area**: y=160-620, 主内容区
- **Footer area**: y=680, 居中页码

### Common Layout Modes

| Mode | Suitable For |
| ---- | ------------ |
| **Single column centered** | 封面、结论、关键数据 |
| **Left-right split (5:5)** | 国内vs海外对比、订阅vs按量 |
| **Three-column cards** | 三段式节奏、参与者分类 |
| **Top-bottom split** | 时间线、演进路径 |
| **Matrix grid (2x2/2x3)** | 计量体系对比、张力表 |

### Spacing Specification

| Element | Value |
| ------- | ----- |
| Card gap | 30px |
| Content block gap | 32px |
| Card padding | 28px |
| Card border radius | 10px |
| Icon-text gap | 12px |
| Three-column card width | 360px each |
| Two-column card width | 540px each |

---

## VI. Icon Usage Specification

### Source

- **Icon library**: `chunk` (fill, straight-line geometry, professional)
- **Usage**: `{{icon:chunk/icon-name}}`

### Recommended Icon List

| Purpose | Icon Path | Pages |
| ------- | --------- | ----- |
| Timeline/Evolution | `{{icon:chunk/timeline}}` | Slide 03 |
| Money/Pricing | `{{icon:chunk/currency-dollar}}` | Slide 04 |
| Chart/Analysis | `{{icon:chunk/chart-bar}}` | Slide 05 |
| Compare | `{{icon:chunk/compare}}` | Slide 06 |
| Settings/Gear | `{{icon:chunk/settings}}` | Slide 07 |
| Warning | `{{icon:chunk/alert-triangle}}` | Slide 08 |
| Lightbulb/Insight | `{{icon:chunk/lightbulb}}` | Slide 12 |
| Rocket/Launch | `{{icon:chunk/rocket}}` | Slide 02 |
| Target | `{{icon:chunk/target}}` | Slide 09 |
| Globe | `{{icon:chunk/globe}}` | Slide 10 |
| Trend/Arrow | `{{icon:chunk/trending-up}}` | Slide 11 |
| Shield/Trust | `{{icon:chunk/shield-check}}` | Slide 13 |

---

## VII. Chart Reference List

| Chart Type | Reference Template | Used In | Purpose |
| ---------- | ------------------ | ------- | ------- |
| **timeline** | `templates/charts/timeline.svg` | Slide 03 | 定价模式演变时间线 |
| **horizontal_bar_chart** | `templates/charts/horizontal_bar_chart.svg` | Slide 04 | 各平台入门档价格对比 |
| **grouped_bar_chart** | `templates/charts/grouped_bar_chart.svg` | Slide 05 | 五种计量体系对比 |
| **matrix_2x2** | `templates/charts/matrix_2x2.svg` | Slide 06 | 电信vsAI演进类比 |
| **process_flow** | `templates/charts/process_flow.svg` | Slide 07 | 补贴-收紧-分层三段式 |
| **porter_five_forces** | `templates/charts/porter_five_forces.svg` | Slide 08 | 五力竞争分析 |
| **waterfall_chart** | `templates/charts/waterfall_chart.svg` | Slide 09 | Agent场景Token消耗构成 |
| **dumbbell_chart** | `templates/charts/dumbbell_chart.svg` | Slide 10 | 国内vs海外定价逻辑对比 |

---

## VIII. Image Resource List

No images needed. Pure data-driven presentation using SVG charts, cards, and color blocks.

---

## IX. Content Outline

### Part 1: Opening

#### Slide 01 - Cover

- **Type**: cover
- **Layout**: 深色渐变背景 + 居中标题 + 底部来源信息
- **Title**: AI产品定价模式演变
- **Subtitle**: 从 Coding Plan 到 Token Plan — 电信20年历史的重演
- **Info**: 2026-04-25 | 基于国内AI大模型厂商定价策略分析

#### Slide 02 - Table of Contents

- **Type**: toc
- **Layout**: 左侧橙色圆形编号 + 章节标题，右侧复杂度递进图示
- **Title**: 目录
- **Content**:
  1. 发生了什么 — 事实层
  2. 为什么 — 框架层
  3. 能提炼什么 — 洞察层
  4. 未来预判 — 趋势与行动

### Part 2: 发生了什么 — 事实层

#### Slide 03 - 时间线：从价格战到Token Plan

- **Type**: chapter
- **Layout**: 深色章节页 + 居中大标题
- **Title**: Part 1 — 发生了什么

#### Slide 04 - 关键事件时间线

- **Type**: content
- **Layout**: timeline chart 横向展开
- **Title**: 两年七阶段，定价模式快速演进
- **Content** (timeline nodes):
  - 2024Q4: DeepSeek带头降价，百万Token几毛钱
  - 2025Q4: 智谱率先推出Coding Plan
  - 2025H2: 首购优惠取消、低档停售 → 收紧
  - 2026-01: Kimi切换Token计量
  - 2026-02: OpenClaw爆火，Token消耗6-10倍增长
  - 2026-03: MiniMax更名Token Plan，腾讯最后入局
  - 2026-04: 阿里企业版Token Plan上线，小米极低定价入局
- **Chart**: timeline

#### Slide 05 - 六大平台定价全景图

- **Type**: content
- **Layout**: 横向柱状图 + 关键发现卡片
- **Title**: 同样¥40-50/月，各平台实际可用量差异巨大
- **Content**:
  - MiniMax Starter ¥29 — 40 prompts/5h
  - 腾讯云 Lite ¥39 — 3500万Token ≈ 70轮对话
  - 小米 MiMo Lite ¥39 — 6000万Credits
  - 阿里百炼 Lite ¥40 — 18000 API请求/月 ≈ 20-120次提问/天
  - Kimi Andante ¥49 — Token计量（3倍活动期）
  - 智谱 GLM Lite ¥49 — 80 prompts/5h，~2400/月
- **Key insight**: 直接比数字毫无意义，90%开发者踩坑
- **Chart**: horizontal_bar_chart

#### Slide 06 - 五种计量体系并存

- **Type**: content
- **Layout**: 三列卡片 + 对比表格
- **Title**: 计量单位混乱是最大信息壁垒
- **Content** (5 columns/cards):
  1. **API请求** — 阿里/火山/腾讯 — 1提问=5-30次API — 透明度：低
  2. **Prompt次数** — 智谱/MiniMax早期 — 1 Prompt≈1200-1600 API — 透明度：中
  3. **Token计量** — Kimi/MiniMax — 按输入输出Token — 透明度：高
  4. **Credit计量** — Cursor/小米/阿里新版 — 统一Credit池 — 透明度：中
  5. **时间窗口** — 智谱5h窗口 — 限制节奏非总量 — 透明度：中
- **Trend**: API次数 → Prompt → Token → 统一Credits，方向越来越透明
- **Chart**: grouped_bar_chart (conceptual comparison)

### Part 3: 为什么 — 框架层

#### Slide 07 - 框架分析

- **Type**: chapter
- **Layout**: 深色章节页
- **Title**: Part 2 — 为什么这么演变

#### Slide 08 - 五力竞争分析

- **Type**: content
- **Layout**: Porter's Five Forces 布局
- **Title**: 行业内竞争极高，买方议价力强
- **Content**:
  - **供应商议价力**: GPU是刚性成本，但国产芯片替代降低依赖
  - **买方议价力**: 7+平台可选，切换成本极低 → 买方强势
  - **替代品威胁**: 开源模型+本地部署压制定价上限
  - **新进入者威胁**: 门槛高但小米等新玩家仍在进入
  - **行业内竞争**: 7家同池价格战，首月7.9元起
- **Chart**: porter_five_forces

#### Slide 09 - 三层演进逻辑

- **Type**: content
- **Layout**: 三段式流程/漏斗
- **Title**: 定价模式演进的三层驱动
- **Content**:
  1. **成本驱动** → 算力成本 → Token成本 → 套餐定价
  2. **竞争驱动** → 价格战 → 补贴圈用户 → 收紧利润
  3. **价值驱动** → 从卖Token → 卖工作流 → 卖生态
- **Chart**: process_flow

#### Slide 10 - 补贴-收紧-分层三段式

- **Type**: content
- **Layout**: 三列卡片，每列一个阶段
- **Title**: 所有互联网赛道都走这三步
- **Content**:
  1. **补贴期 (2024-2025)** — 抢用户规模 → 百万Token几毛钱、首月7.9元
  2. **收紧期 (2025H2)** — 测试价格弹性 → 限购、停售低档、限时抢购
  3. **分层期 (2026)** — 利润最大化 → MiniMax极速版¥98-899、Kimi Allegro ¥559
- **Takeaway**: 进入新市场不要一开始就想好定价。先跑量，再测弹性，最后精细分层

### Part 4: 能提炼什么 — 洞察层

#### Slide 11 - 核心洞察

- **Type**: chapter
- **Layout**: 深色章节页
- **Title**: Part 3 — 能提炼什么

#### Slide 12 - 五大可复用模式

- **Type**: content
- **Layout**: 三列卡片（上三）+ 两列卡片（下二），每卡片一个洞察
- **Title**: 从定价权争夺到生态升级的五条规律
- **Content**:
  1. **计量单位即定价权** — 谁定义计量单位谁掌握定价权，模糊计量利早期获客，透明计量利长期信任
  2. **补贴-收紧-分层** — 先补贴跑量，再收紧测试弹性，最后精细分层
  3. **入口到生态** — 用高频刚需场景（编程）获客，用低频高价值场景提高ARPU
  4. **国内外差异** — 国内7家抢用户比便宜，海外面对三巨头比实力
  5. **Agent成本不可逆** — 70% token是浪费，实际账单是标价的2-5倍
- **Chart**: kpi_cards (for key numbers like "70%浪费", "2-5倍")

#### Slide 13 - Agent时代的成本结构剧变

- **Type**: content
- **Layout**: 左侧瀑布图 + 右侧关键数据
- **Title**: Agent场景下，订阅费是地板不是天花板
- **Content**:
  - 一个开发者8个月Claude Code消耗100亿Token，API价$15,000+
  - Max plan只花$800，节省93%
  - Token构成：文件读取35-45%，工具输出15-25%，上下文重发15-20%，推理10-15%，代码生成仅5-15%
  - Cursor转credit-based后重度用户一周超支$350
  - 70% coding agent token是浪费
- **Chart**: waterfall_chart (Token消耗构成分解)

### Part 5: 未来预判

#### Slide 14 - 趋势与总结

- **Type**: content
- **Layout**: 四卡片 + 底部总结结论
- **Title**: 四大趋势预判与核心结论
- **Content**:
  1. **Token成本持续下降** — 国产芯片放量 + MoE效率革命 + 推理芯片竞争
  2. **国产芯片替代加速** — 英伟达市占率66%→54%→50%以下，华为+寒武纪+平头哥三角
  3. **开源重塑定价权** — 定价权来自服务便利性而非模型独占性
  4. **Agent成本指数增长** — 推理需求已达训练4-5倍，2028年推理占73%
- **Core conclusion**: Coding Plan是过渡产品，Token Plan是终态。核心学到三件事：计量单位即定价权、补贴-收紧-分层节奏、入口到生态升级路径

### Part 6: Closing

#### Slide 15 - 结尾页

- **Type**: ending
- **Layout**: 深色背景 + 居中感谢语 + 装饰
- **Title**: 谢谢
- **Subtitle**: 计量单位即定价权

---

## X. Speaker Notes Requirements

- **File naming**: Match SVG names (e.g., `01_cover.md`)
- **Style**: 专业但易懂，数据驱动
- **Duration target**: ~20分钟
- **Purpose**: inform + persuade — 让听众理解AI定价演变的商业逻辑并提炼出可复用模式

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

- `<g opacity="...">` FORBIDDEN; set on each child element individually
- Image transparency uses overlay mask layer
- Inline styles only; external CSS and `@font-face` FORBIDDEN

---

## XII. Design Checklist

### Pre-generation

- [ ] Content fits page capacity
- [ ] Layout mode selected correctly
- [ ] Colors used semantically

### Post-generation

- [ ] viewBox = `0 0 1280 720`
- [ ] No `<foreignObject>` elements
- [ ] All text readable (>=14px)
- [ ] Content within safe area
- [ ] All elements aligned to grid
- [ ] Same elements maintain consistent style
- [ ] Colors conform to spec

---

## XIII. Next Steps

1. Design spec complete
2. **Next step**: Invoke **Executor** role to generate SVGs (no AI images needed)
3. Post-processing: split notes → finalize SVGs → export PPTX
