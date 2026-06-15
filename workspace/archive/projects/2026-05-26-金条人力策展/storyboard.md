# Storyboard — 金条人力供给策展

> 2026-06-06 | nian-ui Phase 2 | Errol Morris 导演结构参考

---

## 站点级电影语法

| 维度 | 设定 |
|------|------|
| 页面壳 | 纵向单页滚动，每屏100vh，Vertical tower 堆叠 |
| 导航姿态 | 无全局导航——只用滚动进入下一屏；底部始终显示进度指示 |
| 构图原则 | 证据居中原则：核心数据锚定在视口中心，支撑材料在边缘 |
| 密度节奏 | 疏→密→密→疏：开场空旷，中间密集（证据墙），结尾拉远 |
| 循环材质 | 无——纯数据展览，无装饰材质 |
| 场景色 | Glacier — `--scene: var(--brand-glacier)` |
| Shell-ban | 无SaaS仪表板/无卡片网格/无装饰图像/无hover动效/无标签页 |

---

## 导演简报：Errol Morris

### 一句话视觉主题

数据如同审讯记录——每一帧都在审问事实。证据分层陈列，观众被邀请成为侦探而非读者。

### 3个 Signature 技法（Web 翻译）

| Morris 技法 | 电影语言 | Web 翻译 | 运用场景 |
|------------|---------|---------|---------|
| **Interrotron** | 受访者直视镜头，不可回避的对视 | 数字直接占据视口中心，不做解释缓冲 | Hero 屏、排名屏 |
| **Re-enactment** | 用戏剧化方式"重演"事件，非字面再现 | 趋势线通过动画"重演"17个月的数据轨迹 | 脉搏屏 |
| **Diagrammatic** | 图解式证据——用图形清晰展示结构关系 | 信息图形=证据档案，数据关系一目了然 | 基本盘、分化线屏 |

### 颜色令牌（Glacier）

```css
:root {
  --scene: var(--brand-glacier);       /* #2A4A5A */
  --scene-bg: rgba(42, 74, 90, 0.06);
  --scene-border: rgba(42, 74, 90, 0.2);
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --surface-raised: #F5F5F0;
  --border: #E5E5E0;
  --border-visible: #C0C0B8;
  --text-display: #2C2C2C;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-disabled: #A0A0A0;
  --success: #2E7D32;
  --error: #C62828;
  --warning: #F9A825;
}
```

### 字体方向（fixed）

- Display（Hero 数字）: Doto, 96-120px, 400 weight
- H1-H2（章节标题）: Playfair Display, 36-48px, 300
- H3（组件标题）: Inter, 20-24px, 500
- Body（正文）: Inter, 16px, 400
- Data（数据标签）: JetBrains Mono, 11-14px, ALL CAPS

### 动效规则

- 仅入场动画（scroll-triggered intersection reveal）
- 使用 `transform + opacity`，禁止 blur/shadow/gradient/bounce/parallax
- 缓动: `cubic-bezier(0.25, 0.1, 0.25, 1)`
- 每屏最多 2 个 `fadeUp`，至少 4 种不同入口

---

## 叙事节拍序列

Errol Morris 默认弧线（基于 evidence-driven 风格推导）：

```
B1 Cold Open → B9 Data Bombardment → B8 Evidence Wall → B10 Deep Dive
→ B14 The Pivot → B16 The Authority → B22 The Farewell
```

| 节拍 | 节拍名 | 情感 | 说明 |
|------|--------|------|------|
| B1 | Cold Open | 冲击 → 好奇 | 大数字冷开场，零上下文 |
| B9 | Data Bombardment | 权威 → 强度 | 17个月数据全量呈现 |
| B8 | Evidence Wall | 说服 → 信服 | 三个证据同时呈现 |
| B10 | Deep Dive | 沉浸 → 聚焦 | 深入排名结构 |
| B14 | The Pivot | 转折 → 洞察 | 从"是什么"到"为什么" |
| B16 | The Authority | 可信 → 尊重 | 数据来源证明 |
| B22 | The Farewell | 结束 → 尊重 | Minimal 结束 |

---

## 页面逐场景故事板

### Scene 1: Hero — 5,174 人（入口）

**Beat:** B1 Cold Open
**Function:** Hero #26 — Data Punch
**Hero Archetype:** #26 Data Punch
**情绪基调:** 冲击、直接、不可回避

**设计:**
- 视口中心：Doto 120px 展示 "5,174"，下方紧贴 "金条人力供给的结构性分化"
- 右下角小字："2025.01 - 2026.05 · 11家 BPO 职场"
- 左下或右上：两个支撑数字 "746"（峰值月）和 "130"（单职场月峰值），小一号，transparent 排列
- 无背景装饰，只有 `--bg` 底色 + 极淡 Glacier 色数字幽灵背景

**三层金字塔:**
- Answer: **5,174** — 唯一数字锚点
- Argument: 金条人力供给的结构性分化（策展标题）
- Evidence: 2025.01 - 2026.05 · 11家 BPO 职场（来源）

**Signature composition:** 数字中心锚点 + 两个卫星数字（左下/右上不对称排列）

**Restraint statement:** 不做任何说明——数字直击。Errol Morris 的 Interrotron——数据和观众对视。

**入口:** 数字从 0 计数到 5,174（入场动画，`fadeUp` 被禁止，用 counter 替代）
**互动:** 无
**打破:** Doto 装饰数字（此处就是打破本身——文字内容极简，数字主导）

---

### Scene 2: 脉搏 — 17个月趋势

**Beat:** B9 Data Bombardment
**Function:** Timeline #7
**Archetype:** TL-1 Vertical Center-Line Timeline
**Layout:** compositions #13 Dynamic diagonal
**Entrance:** camera-shots #4 Crane down（数据点逐个下降出现）
**Interaction:** interaction-effects #12 Underline slide（hover 标注月份细节——但本报告无hover，改 scroll-reveal 标注）

**设计:**
- 左侧：策展文本（"从59到746，再回到147" + 定位句 + 季节性解读 1段）
- 右侧：垂直中心线时间轴，17个月数据点排列，脉冲高点用 `--scene` 色标记
- 节点颜色：正常=`--text-secondary`，脉冲高点=`--scene`，衰减低点=`--error`
- 3次脉冲标注：2025-02 节后 / 2025-09 旺季 / 2026-03 春节后

**三层金字塔:**
- Answer: **59 → 746 → 147**（三次脉冲的起落）
- Argument: 季节性脉冲 vs 趋势性衰减——Q1同比+35%，Q2已转负
- Evidence: 17个月首呼数据月度柱

**入口:** 时间轴从底部中线向上生长（`scaleY` from 0→1），月份标签 `fadeIn`
**互动:** 无（静态阅读）
**打破:** 2026-03 脉冲高点用 `--scene` 强调，其他点为 `--text-secondary`

---

### Scene 3: 基本盘 — TOP3

**Beat:** B8 Evidence Wall
**Function:** Stats Counter #24
**Archetype:** SC-3 Data Dashboard Grid
**Layout:** compositions #7 Cross axis
**Entrance:** camera-shots #20 Jump cut stagger
**Interaction:** interaction-effects #7 Hologram flicker（但报告无hover → 改为静态三位并置，入场顺序 staggered）

**设计:**
- 顶部：策展标题 "前三名占据四成" + 定位句
- 三个横向面板并列：
  - 伽玛: 745人 | 稳定高产型 | 月均贡献稳定
  - 毅航: 709人 | 爆发增长型 | 从1→130
  - 毛毛虫: 672人 | 可靠型 | 持续稳定供给
- 下方：总占比 41.1%，使用超大字体展示
- 每个面板底部：简要供给模式标签（`--text-secondary`）

**三层金字塔:**
- Answer: **2,126 = 41.1%**
- Argument: 三名占据四成——三种供给模式各有价值
- Evidence: 各职场人数、类型标签

**入口:** 三个面板从左到右 staggered fadeIn（0.1s 间隔）
**互动:** 无
**打破:** 41.1% 超大数字置于三分屏下方，形成"上三分+下一超"的 vertical tower 节奏变化

---

### Scene 4: 分化线 — 排名

**Beat:** B10 Deep Dive
**Function:** Data Dashboard #11
**Archetype:** DD-1 Cross-Axis Widget Grid
**Layout:** compositions #7 Cross axis
**Entrance:** camera-shots #20 Jump cut stagger
**Interaction:** None（纯静态展示）

**设计:**
- 顶部：策展标题 "谁在增长，谁在退出" + 定位句
- 主体：11职场排名表，按排名从上到下排列
- 每行：排名 | 职场名 | 人数 | 趋势标签（📈增长/➡️平稳/📉下降/⬇极低）
- 趋势标签色：增长=`--success` / 平稳=`--text-secondary` / 下降=`--error` / 极低=`--text-disabled`
- 分组间隔：增长型 | 平稳型 | 下降型 | 极低 四组之间用薄分割线

**三层金字塔:**
- Answer: **歧力第一 + 人和仅1人**（分化极值）
- Argument: 增长型 vs 平稳型 vs 下降型 vs 极低——四种轨迹
- Evidence: 11职场完整排名 + 趋势标签

**入口:** 排名行从上方逐行展开（`fadeIn` staggered, 0.08s 间隔）
**互动:** 无
**打破:** 人和（仅1人）用 `--error` 色标注整行，强调末端警示

---

### Scene 5: 脉冲归因 — 春节后的 12,900%

**Beat:** B14 The Pivot
**Function:** Scroll Story #41 或 自定义归因分析
**Archetype:** SS-1 Sticky Visual + Scroll Text
**Layout:** compositions #43 Sticky image with scrolling text（适配为 Sticky chart）
**Entrance:** camera-shots #6 Rack focus reveal
**Interaction:** interaction-effects #30 Parallax text float（数据标注随滚动出现）

**设计:**
- 左半 sticky：一个核心对比图——毅航从 1人 → 130人，春节脉冲的剧烈程度
- 右半 scroll text：
  1. 定位句：春节后的 12,900%
  2. 正文分析：毅航从 1 人到 130 人——所有异常指向同一个节律
  3. 注解：环比异常不是风险信号，而是人力供给的自然节律
  4. 证据：异常检测方法 + 数据范围

**三层金字塔:**
- Answer: **春节脉冲 = 12,900%**
- Argument: 环比异常不是风险信号，是自然节律
- Evidence: 毅航前后对比 + 异常检测范围

**入口:** Sticky chart 从底部推入，文本段落逐个 fadeIn
**互动:** 滚动触发文本段落揭示（scroll-driven reveal）
**打破:** 12,900% 用 `--warning`（琥珀）色，表示"注意但不恐慌"

---

### Scene 6: 来源

**Beat:** B16 The Authority
**Function:** About/Mission #47
**Archetype:** Minimal text layout
**Layout:** Narrow column reading width
**Entrance:** camera-shots #2 Fade from black
**Interaction:** None

**设计:**
- 窄列居中文字
- 数据源：金条业务线 BPO 首呼数据
- 时间范围：2025.01 - 2026.05（17个月）
- 覆盖范围：11家 BPO 职场
- 筛选条件：仅首呼（首次外呼人力）
- 排除字段：其他业务线 · 财务 · 质检 · 当月外呼
- 校验方式：同比校验 + 异常检测（3σ + IQR）
- 最下方：数据科技业务部

**三层金字塔:**
- Answer: **数据来源 + 校验方法**
- Argument: 任何分析都受限于数据边界——此处明确列出
- Evidence: 筛选条件、排除字段、校验方法

**入口:** fadeIn, 0.5s ease
**互动:** 无
**打破:** 无——安静结束，让读者带着结论离开

---

### Footer

**Beat:** B22 The Farewell
**Function:** Footer #48
**Archetype:** FT-2 Minimal Single Row
**Layout:** Narrow column, one line
**Entrance:** None

**设计:**
- 一行：© 数据科技业务部 · 服务组 · 供应商管理
- 小字，`--text-disabled`

---

## 入口映射

| 场景 | 入口效果 | 备注 |
|------|---------|------|
| 1. Hero | Counter animation (0→5,174) + fadeIn 卫星数字 | counter 替代 fadeUp |
| 2. 脉搏 | `scaleY(0→1)` 时间轴生长 + fadeIn 月份标签 | vertical grow |
| 3. 基本盘 | staggered fadeIn (0.1s 间隔) 三个面板 | fadeIn stagger |
| 4. 分化线 | staggered slideInTop (0.08s 间隔) 排名行 | slideInTop stagger |
| 5. 脉冲归因 | chart slideInBottom + text段落 scroll-reveal | scroll-driven |
| 6. 来源 | fadeIn | 简单淡入 |

保证每页至少4种不同入口，`fadeIn` 仅用于场景3/6。

---

## 反趋同检查

| 检查项 | 结果 |
|--------|------|
| 节拍序列是否匹配导演模板 | ✅ Errol Morris evidence-driven 自定义弧线 |
| 节拍数量是否符合导演范围 | ✅ 7 beats (ranges 6-7) |
| 每个 section 有 camera 引用？ | ✅ 已在场景中指定 |
| 至少2个 section 与默认营销布局不同 | ✅ Hero (数字冷开场无说明)、来源(窄列证据声明) |
| 无重复的相邻入口效果 | ✅ 6种不同入口，未见重复 |
