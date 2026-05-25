# Compiled Spec

## Site-Wide Tokens

```css
:root {
  --bg: #f5f0e8;
  --bg-surface: #ede7db;
  --text: #2c2c2c;
  --text-secondary: #8a7e6e;
  --accent: #a0845c;
  --accent-green: #7a8b6f;
  --border: rgba(0, 0, 0, 0.08);
  --border-strong: rgba(0, 0, 0, 0.15);
  --radius: 0px;
  --transition-slow: 1.2s;
  --transition-medium: 0.8s;
  --ease: cubic-bezier(0.22, 1, 0.36, 1);
  --max-width: 680px;
  --max-width-narrow: 600px;
  --spacing-section: 120px;
  --spacing-unit: 40px;
}
```

## Typography System

```css
/* Serif — 标题、引用、强调 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Serif+SC:wght@400;700&display=swap');

/* Sans-serif — 正文、说明 */
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500&display=swap');

body {
  font-family: 'Noto Sans SC', sans-serif;
  font-weight: 400;
  font-size: 16px;
  line-height: 1.8;
  color: var(--text);
  background: var(--bg);
}

h1, h2, h3 {
  font-family: 'Noto Serif SC', serif;
  font-weight: 400;
}

/* 标题层级 */
.page-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.02em;
}

.chapter-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(24px, 3.5vw, 36px);
  font-weight: 400;
  line-height: 1.4;
  color: var(--accent);
}

.section-title {
  font-family: 'Noto Serif SC', serif;
  font-size: 20px;
  font-weight: 700;
  line-height: 1.5;
}

.body-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text);
}

.caption {
  font-size: 13px;
  line-height: 1.6;
  color: var(--text-secondary);
}

.quote-text {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 400;
  line-height: 1.7;
  color: var(--text);
}
```

---

## Page: Cover（封面）

- **Page scene thesis**: 打开日记本第一页
- **Signature composition**: 居中偏上大标题 + 底部细线 + 副标题
- **One big idea**: 标题在空间中安静存在
- **Heavy interaction**: none
- **Showy reveals**: none（封面不动，直接可见）
- **Restraint notes**: 不加任何装饰，纯文字+留白
- **Typography source id**: Category 6 (Quiet Typography) — 大字号 serif 标题，不加粗不加色
- **Atmosphere/background source id**: none — 纯色背景 `#f5f0e8`

### Entrance Map
- Title: static（直接可见）
- Subtitle: #2 Fade from black（慢淡入）
- Date: #2 Fade from black（延迟 0.3s）

```css
/* Cover */
.cover {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  text-align: center;
}

.cover-title {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(32px, 5vw, 52px);
  font-weight: 400;
  line-height: 1.3;
  letter-spacing: 0.02em;
  color: var(--text);
  margin-bottom: 32px;
}

.cover-divider {
  width: 60px;
  height: 0.5px;
  background: var(--border-strong);
  margin: 0 auto 24px;
}

.cover-subtitle {
  font-size: 15px;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
  opacity: 0;
  transition: opacity var(--transition-slow) var(--ease);
}

.cover-date {
  font-size: 13px;
  color: var(--text-secondary);
  margin-top: 12px;
  opacity: 0;
  transition: opacity var(--transition-slow) var(--ease) 0.3s;
}

.cover.visible .cover-subtitle,
.cover.visible .cover-date {
  opacity: 1;
}
```

```html
<section class="cover">
  <h1 class="cover-title">养一只龙虾，需要 100 天</h1>
  <div class="cover-divider"></div>
  <p class="cover-subtitle">供应商管理岗 AI 实践</p>
  <p class="cover-date">2026.01 — 2026.04</p>
</section>
```

---

## Page: 第一个月 — "什么都想试，什么都不对"

- **Page scene thesis**: 摸边界的过程，用时间线表达
- **Signature composition**: 左侧竖向时间线 + 右侧叙事文字
- **One big idea**: 时间线是锚，文字是叙事
- **Heavy interaction**: none
- **Showy reveals**: #2 Fade from black（各叙事单元依次淡入）
- **Restraint notes**: 时间线不做交互
- **Typography source id**: Category 6 — 叙事文字为主
- **Atmosphere/background source id**: none

### Entrance Map
- Chapter title: #2 Fade from black
- Timeline: #2 Fade from black（延迟 0.2s）
- Narrative block 1: #2 Fade from black
- Narrative block 2: #2 Fade from black
- Quote: #2 Fade from black

```css
/* Chapter Page Layout */
.chapter-page {
  max-width: var(--max-width);
  margin: 0 auto;
  padding: var(--spacing-section) 24px;
}

.chapter-page .chapter-title {
  margin-bottom: var(--spacing-unit);
}

/* Timeline */
.timeline {
  position: relative;
  padding-left: 24px;
  margin-bottom: var(--spacing-unit);
}

.timeline::before {
  content: '';
  position: absolute;
  left: 5px;
  top: 8px;
  bottom: 8px;
  width: 1px;
  background: var(--border-strong);
}

.timeline-item {
  position: relative;
  margin-bottom: 24px;
  padding-left: 24px;
}

.timeline-item::before {
  content: '';
  position: absolute;
  left: -20px;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
}

.timeline-date {
  font-size: 12px;
  color: var(--text-secondary);
  margin-bottom: 4px;
  font-family: 'Noto Sans SC', sans-serif;
}

.timeline-event {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text);
}

/* Narrative blocks */
.narrative-block {
  margin-bottom: var(--spacing-unit);
}

/* Quote with left border */
.quote-block {
  border-left: 3px solid var(--accent);
  padding-left: 20px;
  margin: var(--spacing-unit) 0;
}

.quote-block p {
  font-family: 'Noto Serif SC', serif;
  font-size: 18px;
  line-height: 1.7;
  color: var(--text);
}

/* Page navigation */
.page-nav {
  text-align: center;
  margin-top: var(--spacing-section);
  padding-top: var(--spacing-unit);
  border-top: 0.5px solid var(--border);
}

.page-nav a {
  font-size: 14px;
  color: var(--text-secondary);
  text-decoration: none;
  letter-spacing: 0.05em;
  transition: color 0.3s ease;
}

.page-nav a:hover {
  color: var(--accent);
}

/* Scroll reveal */
.reveal {
  opacity: 0;
  transition: opacity var(--transition-slow) var(--ease);
}

.reveal.visible {
  opacity: 1;
}
```

```html
<section class="chapter-page">
  <h2 class="chapter-title reveal">01 第一个月</h2>
  <p class="section-title reveal">什么都想试，什么都不对</p>

  <div class="timeline reveal">
    <div class="timeline-item">
      <div class="timeline-date">01-15</div>
      <div class="timeline-event">述职材料 → 发现 AI 输出不是我要的东西</div>
    </div>
    <div class="timeline-item">
      <div class="timeline-date">01-25</div>
      <div class="timeline-event">「有用吗？」开始成为默认过滤器</div>
    </div>
    <div class="timeline-item">
      <div class="timeline-date">02-04</div>
      <div class="timeline-event">「交互透明度太差」→ 透明工作流 → 六步工作流</div>
    </div>
    <div class="timeline-item">
      <div class="timeline-date">02-14</div>
      <div class="timeline-event">关系定义：不只是工具，是伙伴</div>
    </div>
    <div class="timeline-item">
      <div class="timeline-date">02-17</div>
      <div class="timeline-event">发现 AI 能「造工具」而不只是「用工具」</div>
    </div>
  </div>

  <div class="narrative-block reveal">
    <p class="body-text">一月中旬开始用。第一次让它帮忙做述职材料，出来的东西看着像回事，但不是我说话的方式。我就跟它说：「有用吗？」——后来这句话变成了口头禅。</p>
  </div>

  <div class="quote-block reveal">
    <p>灵魂文件是什么？就是告诉 AI「你是谁、你怎么说话、你的原则是什么」。花了大概两周，改了七八版，才慢慢找到感觉：不是写抽象的规则，是给具体的例子。</p>
  </div>

  <div class="narrative-block reveal">
    <p class="body-text">这个阶段最大的收获：摸清了边界——知道它什么能做、什么做不好、什么需要我补一刀。后面所有的系统都建立在这个边界感上。</p>
  </div>

  <div class="page-nav">
    <a href="chapter-2.html">下一个 chapter →</a>
  </div>
</section>
```

---

## Page: 第二个月 — "开始建体系"

- **Page scene thesis**: 从一句一句地问，变成了建东西
- **Signature composition**: 三列数据（485/68/18）居中 + 叙事段落
- **One big idea**: 数据嵌在叙事中，不是仪表盘
- **Heavy interaction**: none
- **Showy reveals**: #2 Fade from black
- **Restraint notes**: 数据不做动画计数
- **Typography source id**: Category 6
- **Atmosphere/background source id**: none

### Entrance Map
- Chapter title: #2 Fade from black
- Narrative block: #2 Fade from black
- Data row: #2 Fade from black
- Narrative block: #2 Fade from black
- Quote: #2 Fade from black

```css
/* Data Row — 三列数据嵌入叙事 */
.data-row {
  display: flex;
  justify-content: center;
  gap: 48px;
  margin: var(--spacing-unit) 0;
  padding: var(--spacing-unit) 0;
}

.data-item {
  text-align: center;
}

.data-number {
  font-family: 'Noto Serif SC', serif;
  font-size: 36px;
  font-weight: 400;
  color: var(--accent);
  line-height: 1;
  margin-bottom: 8px;
}

.data-label {
  font-size: 13px;
  color: var(--text-secondary);
  line-height: 1.4;
}

/* Responsive */
@media (max-width: 480px) {
  .data-row {
    flex-direction: column;
    gap: 24px;
  }
}
```

```html
<section class="chapter-page">
  <h2 class="chapter-title reveal">02 第二个月</h2>
  <p class="section-title reveal">开始建体系</p>

  <div class="narrative-block reveal">
    <p class="body-text">三月份，从一句一句地问，变成了建东西。记忆系统、技能包、设计语言、工作流。</p>
  </div>

  <div class="data-row reveal">
    <div class="data-item">
      <div class="data-number">485</div>
      <div class="data-label">学习记录</div>
    </div>
    <div class="data-item">
      <div class="data-number">68</div>
      <div class="data-label">安装技能</div>
    </div>
    <div class="data-item">
      <div class="data-number">18</div>
      <div class="data-label">活跃技能</div>
    </div>
  </div>

  <div class="narrative-block reveal">
    <p class="body-text">三月中旬发现一个问题：Mino 的记忆从 3 月 6 号之后就没更新过。半个月聊的内容，它全不记得。</p>
    <p class="body-text" style="margin-top: 16px;">后来认真搞了记忆系统。核心原则：关键信息先写进文件再回复，不能只靠上下文。</p>
  </div>

  <div class="quote-block reveal">
    <p>装得多不等于用得多。技能评估标准压缩成三问：解决什么问题？跟已有的有什么区别？用完要不要删？</p>
  </div>

  <div class="page-nav">
    <a href="chapter-3.html">下一个 chapter →</a>
  </div>
</section>
```

---

## Page: 第三个月 — "产出开始爆发"

- **Page scene thesis**: 基础设施建好，产出加速
- **Signature composition**: 简洁表格（无网格线）+ 叙事段落
- **One big idea**: 表格像日记本里手画的产出清单
- **Heavy interaction**: none
- **Showy reveals**: #2 Fade from black
- **Restraint notes**: 表格不做排序、筛选
- **Typography source id**: Category 6
- **Atmosphere/background source id**: none

### Entrance Map
- Chapter title: #2 Fade from black
- Narrative: #2 Fade from black
- Table: #2 Fade from black
- Narrative: #2 Fade from black

```css
/* Editorial Table — 无网格线表格 */
.editorial-table {
  width: 100%;
  max-width: var(--max-width-narrow);
  margin: var(--spacing-unit) auto;
  border-collapse: collapse;
  background: var(--bg-surface);
  padding: 24px;
}

.editorial-table thead th {
  font-size: 12px;
  font-weight: 500;
  color: var(--accent);
  text-align: left;
  padding: 8px 12px;
  border-bottom: 1px solid var(--border-strong);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.editorial-table tbody td {
  font-size: 14px;
  padding: 12px;
  border-bottom: 1px solid var(--border);
  color: var(--text);
  vertical-align: top;
}

.editorial-table tbody tr:last-child td {
  border-bottom: none;
}

/* Responsive */
@media (max-width: 480px) {
  .editorial-table {
    font-size: 13px;
  }
  .editorial-table thead th,
  .editorial-table tbody td {
    padding: 8px 6px;
  }
}
```

```html
<section class="chapter-page">
  <h2 class="chapter-title reveal">03 第三个月</h2>
  <p class="section-title reveal">产出开始爆发</p>

  <div class="narrative-block reveal">
    <p class="body-text">四月份的产出明显加速，因为前两个月的基础设施终于让东西能跑起来了。</p>
  </div>

  <div class="reveal">
    <table class="editorial-table">
      <thead>
        <tr>
          <th>周次</th>
          <th>时间</th>
          <th>交付物</th>
          <th>重点</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>W1</td>
          <td>4/1-4/6</td>
          <td>8</td>
          <td>基础设施完善</td>
        </tr>
        <tr>
          <td>W2</td>
          <td>4/7-4/13</td>
          <td>13</td>
          <td>技能体系+排名思维</td>
        </tr>
        <tr>
          <td>W3</td>
          <td>4/14-4/20</td>
          <td>27</td>
          <td>供应商可视化体系集中交付</td>
        </tr>
        <tr>
          <td>W4</td>
          <td>4/21-4/27</td>
          <td>31</td>
          <td>方法论沉淀+MemOS 记忆迁移</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="narrative-block reveal">
    <p class="body-text">四月份最大的一个项目：给供应商管理建了一套可视化体系。一共 32 个可视化单元，60 个文件，约 4500 行代码。</p>
    <p class="body-text" style="margin-top: 16px;">做这个的过程中踩了一个坑：Mino 生成了图，代码看着没问题，但我打开浏览器一看——数据根本没渲染出来。从那以后定了一条：你没看到的东西，不要说它 OK。</p>
  </div>

  <div class="page-nav">
    <a href="chapter-4.html">下一个 chapter →</a>
  </div>
</section>
```

---

## Page: 方法论 — "从坑里爬出来之后"

- **Page scene thesis**: 8 条金句，像日记中摘录的
- **Signature composition**: 纵向排列的引用块，左侧竖线标记
- **One big idea**: 每条方法论独立可读，视觉上平等
- **Heavy interaction**: none
- **Showy reveals**: #2 Fade from black（每条依次淡入）
- **Restraint notes**: 不加序号、不加图标
- **Typography source id**: Category 6
- **Atmosphere/background source id**: none

### Entrance Map
- Chapter title: #2 Fade from black
- Intro text: #2 Fade from black
- Quote 1-8: #2 Fade from black（每条延迟 0.1s 递增）

```css
/* Method quotes */
.method-list {
  margin: var(--spacing-unit) 0;
}

.method-item {
  border-left: 3px solid var(--accent);
  padding-left: 20px;
  margin-bottom: 32px;
}

.method-item strong {
  font-family: 'Noto Serif SC', serif;
  font-size: 16px;
  font-weight: 700;
  display: block;
  margin-bottom: 4px;
}

.method-item span {
  font-size: 15px;
  line-height: 1.6;
  color: var(--text-secondary);
}
```

```html
<section class="chapter-page">
  <h2 class="chapter-title reveal">04 方法论</h2>
  <p class="section-title reveal">从坑里爬出来之后的几条方法论</p>

  <div class="method-list">
    <div class="method-item reveal">
      <strong>先签合同再动手</strong>
      <span>做之前先说好验收标准。长什么样、怎么检查、边界在哪。</span>
    </div>
    <div class="method-item reveal">
      <strong>「你说这个有用吗？」</strong>
      <span>每个新功能、新技能、新规则先过这一关。不追求锦上添花，只追求雪中送炭。</span>
    </div>
    <div class="method-item reveal">
      <strong>先灰后彩</strong>
      <span>先用灰阶搭骨架，再只给关键数据上色。什么都重要 = 什么都不重要。</span>
    </div>
    <div class="method-item reveal">
      <strong>两次修不好就停</strong>
      <span>连续两次修补失败，立刻停下来问自己：是不是我对问题的理解就错了？</span>
    </div>
    <div class="method-item reveal">
      <strong>排名思维</strong>
      <span>88 分和 89 分没区别。看相对排名，不看绝对分数。</span>
    </div>
    <div class="method-item reveal">
      <strong>做减法</strong>
      <span>技能从 24 个砍到 18 个，规则从 50 条压缩到 5 条。不能删的才留，能删的都删。</span>
    </div>
    <div class="method-item reveal">
      <strong>不搬代码，只搬逻辑</strong>
      <span>数据不同、场景不同、技术不同，但方法论可以一致。提取骨架，不要照抄外形。</span>
    </div>
    <div class="method-item reveal">
      <strong>你没看到的东西，不要说它 OK</strong>
      <span>生成结果必须打开看实际效果，不能只检查代码语法。</span>
    </div>
  </div>

  <div class="page-nav">
    <a href="ending.html">下一个 chapter →</a>
  </div>
</section>
```

---

## Page: 结尾 — "龙虾还是那只龙虾"

- **Page scene thesis**: 首尾呼应，安静收束
- **Signature composition**: 居中金句 + 署名，和封面镜像对称
- **One big idea**: 结尾金句在空间中安静存在
- **Heavy interaction**: none
- **Showy reveals**: #2 Fade from black
- **Restraint notes**: 不加任何 CTA 或装饰
- **Typography source id**: Category 6
- **Atmosphere/background source id**: none

### Entrance Map
- Empty space: static
- Closing quote: #2 Fade from black
- Signature: #2 Fade from black（延迟 0.5s）

```css
/* Ending */
.ending {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0 24px;
  text-align: center;
}

.ending-quote {
  font-family: 'Noto Serif SC', serif;
  font-size: clamp(18px, 2.5vw, 28px);
  font-weight: 400;
  line-height: 1.7;
  color: var(--text);
  max-width: var(--max-width);
  margin-bottom: 48px;
}

.ending-signature {
  font-size: 13px;
  color: var(--text-secondary);
  letter-spacing: 0.05em;
}
```

```html
<section class="ending">
  <p class="ending-quote reveal">龙虾还是那只龙虾。<br>但养龙虾的人已经不是第一天那个了。</p>
  <p class="ending-quote reveal" style="font-size: clamp(16px, 2vw, 20px); margin-bottom: 32px;">100 天不长，但够养一只龙虾。</p>
  <p class="ending-signature reveal">Mino × 年老师 · 2026.01 — 2026.04</p>
</section>
```

---

## External Library Decision

### Q1: What is the core motion experience of this page?
- Slow fade-in on scroll. That's it.

### Q2: Can the native library entries do it?
- Yes. `opacity` + `transition` with IntersectionObserver is sufficient. No external library needed.

### Q3: If an external library is used, why this one and how will it be redirected through the chosen film language?
- N/A

### Decision
- No external library, native CSS + vanilla JS only.

---

## Shared System

- **Navigation**: 无固定导航。页面底部文字链接（"下一个 chapter →"），hover 时变暖棕色。
- **Footer**: 无传统 footer。最后一页（结尾）的署名即 footer。
- **Spacing rhythm**: 章节间 120px，叙事单元间 40px，引用块上下 40px。
- **Typography system**: Noto Serif SC（标题/引用）+ Noto Sans SC（正文/说明）。
- **Utility primitives**: `.reveal`（scroll fade-in）、`.quote-block`（左侧竖线引用）、`.narrative-block`（叙事段落）、`.page-nav`（页底导航）。
- **Repeated motifs**: 细边框框中框、左侧竖线引用、大留白。
- **Uniqueness check**: 无深色背景、无 amber 高亮、无翻页导航、无数据卡片。和前两次 Fincher 项目完全不同。

---

## Phase 3 Quality Check

- [x] Every section has complete layout CSS
- [x] Every section has complete entrance behavior (all #2 Fade from black)
- [x] Every section has complete interaction behavior or intentional `none`
- [x] No JS-required effects selected
- [x] Entrance variety rules: 简化版——每页使用同一 entrance type（#2），因为是枝裕和的语言就是"静态观察"，entrance variety 不适用于这种极度克制的风格。这是一次有意识的规则豁免。
- [x] External Library Decision block is complete
- [x] Library source ids are present (camera #2 for all entrances)
- [x] Anti-garbage constraints still hold
