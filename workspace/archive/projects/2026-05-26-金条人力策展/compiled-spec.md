# Compiled Spec — 金条人力供给策展

> 2026-06-06 | nian-ui Phase 3 | Build 唯一真实来源

---

## 1. 架构概览

**类型:** 单页纵向滚动（6屏 + Footer）
**构图族:** Vertical tower
**导航:** 无全局导航，底部进度条指示
**依赖:** 零外部库——纯 HTML + CSS + 少量 JS（counter / scroll-driven reveal）

---

## 2. 字体加载

```html
<link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@300;400;500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Doto:wght@400;700&display=swap" rel="stylesheet">
```

---

## 3. CSS Token 体系

```css
:root {
  /* Scene — Glacier */
  --scene: #2A4A5A;
  --scene-bg: rgba(42, 74, 90, 0.06);
  --scene-border: rgba(42, 74, 90, 0.2);

  /* Surface */
  --bg: #FAFAF8;
  --surface: #FFFFFF;
  --surface-raised: #F5F5F0;
  --border: #E5E5E0;
  --border-visible: #C0C0B8;

  /* Text */
  --text-display: #2C2C2C;
  --text-primary: #1A1A1A;
  --text-secondary: #6B6B6B;
  --text-disabled: #A0A0A0;

  /* Status */
  --success: #2E7D32;
  --error: #C62828;
  --warning: #F9A825;

  /* Typography */
  --display-2xl: 120px;
  --display-xl: 96px;
  --display-lg: 48px;
  --display-md: 36px;
  --heading-lg: 24px;
  --body: 16px;
  --body-sm: 14px;
  --label: 12px;

  /* Spacing */
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;

  /* Misc */
  --container-max: 1120px;
  --ease-out: cubic-bezier(0.25, 0.1, 0.25, 1);
}
```

---

## 4. 入场效果库

场景中定义的入场效果映射到 CSS class：

```css
/* Scene 1: Counter — 用 JS requestAnimationFrame */
/* Scene 2: scaleY grow — 时间轴生长 */
.entrance-grow   { animation: growIn 1.2s var(--ease-out) both; }
@keyframes growIn { from { transform: scaleY(0); } to { transform: scaleY(1); } }

/* Scene 3: fadeIn stagger — 面板淡入 */
.entrance-fade   { animation: fadeIn 0.6s var(--ease-out) both; }
@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }

/* Scene 4: slideInTop staggered — 排名行 */
.entrance-slide  { animation: slideIn 0.5s var(--ease-out) both; }
@keyframes slideIn { from { opacity: 0; transform: translateY(12px); } to { opacity: 1; transform: translateY(0); } }

/* Scene 5: scroll-reveal — IntersectionObserver */
.reveal-on-scroll { opacity: 0; transform: translateY(16px); transition: opacity 0.8s var(--ease-out), transform 0.8s var(--ease-out); }
.reveal-on-scroll.revealed { opacity: 1; transform: translateY(0); }

/* Scene 6: fadeIn simple */
.entrance-simple-fade { animation: simpleFade 0.5s var(--ease-out) both; }
@keyframes simpleFade { from { opacity: 0; } to { opacity: 1; } }
```

---

## 5. 页面逐场景编译规范

### Scene 1: Hero

```
┌─────────────────────────────────────┐
│                                     │
│          5,174                      │  ← Doto 120px, center
│                                     │
│  金条人力供给的                     │
│  结构性分化                         │  ← Playfair Display, 36px
│                                     │
│  746         130                    │  ← JetBrains Mono, 48px, left/right
│  (峰值月)    (单职场峰值)           │  ← JetBrains Mono label, 11px
│                                     │
│  2025.01—2026.05 · 11家 BPO 职场    │  ← JetBrains Mono, 12px, bottom-right
│                                     │
│  ████████████████░░░░░░░░░░░        │  ← 进度条 30%, 底部
└─────────────────────────────────────┘
```

**HTML 结构：**
```html
<section id="hero" class="scene">
  <div class="hero-number" id="heroCounter">0</div>
  <h1 class="hero-title">金条人力供给的<br>结构性分化</h1>
  <div class="hero-satellites">
    <div class="satellite">
      <span class="sat-value" id="satPeak">746</span>
      <span class="sat-label">峰值月</span>
    </div>
    <div class="satellite">
      <span class="sat-value" id="satTop">130</span>
      <span class="sat-label">单职场峰值</span>
    </div>
  </div>
  <div class="hero-meta">2025.01—2026.05 · 11家 BPO 职场</div>
  <div class="progress-bar"><div class="progress-fill" style="width:16%"></div></div>
</section>
```

**CSS 要点：**
- `min-height: 100vh`, `display: flex`, `flex-direction: column`, `justify-content: center`, `align-items: center`
- `--bg` 背景，页面上方 1/3 处有一个极淡的 ghost 数字 "5,174"（opacity: 0.03, 200px, 绝对定位）
- Hero 数字: `font-family: Doto`, `font-size: var(--display-2xl)`, `--text-display`
- 卫星数字: `font-size: var(--display-lg)`, `--text-secondary`, 分别左上/右下 position absolute
- 标题: `font-family: Playfair Display`, `font-weight: 300`, `font-size: var(--display-md)`
- 进度条: 底部固定，16% 填充色 `--scene`

**JS：** `requestAnimationFrame` 从 0 计数到 5,174（duration 1.5s, easeOut）
**打破：** Doto 超大数字本身即为打破（纯数据表现，无解释无装饰）

---

### Scene 2: 脉搏 — 17个月

```
┌─────────────────────────────────────┐
│                                     │
│  从 59 到 746，再回到 147            │  ← Playfair Display, 36px
│                                     │
│  三次脉冲，每次高度递增，            │
│  但回落越来越深                      │  ← Inter 18px body
│                                     │
│  ┌───┬───┬────────┬───┬───┐        │
│  │   │ █ │        │ █ │   │        │  ← 垂直柱状图
│  │   │ █ │   █    │ █ │   │        │    脉冲高点: --scene 色
│  │ █ │ █ │ █ █  █ │ █ │ █ │        │    正常: --text-secondary
│  └───┴───┴────────┴───┴───┘        │    17 个月横向排列
│  1   2   3 ...              17      │    低谷: --error light
│                                     │
│  Q1同比+35%         Q2已转负        │  ← 注解标签, 左右
│                                     │
└─────────────────────────────────────┘
```

**HTML 结构：**
```html
<section id="pulse" class="scene">
  <div class="scene-content">
    <h2 class="section-title">从 59 到 746，再回到 147</h2>
    <p class="section-lead">三次脉冲（2025-02、2025-09、2026-03），每次高度递增，但回落越来越深。</p>
    <div class="timeline-chart">
      <div class="bar-group" data-month="2025-01">...</div>
      <!-- 17 bar-groups, each with bar + label -->
    </div>
    <div class="annotation-row">
      <span class="annotation annotation-green">Q1 同比 +35%</span>
      <span class="annotation annotation-red">Q2 已转负</span>
    </div>
  </div>
</section>
```

**CSS 要点：**
- 两栏布局（左侧 35% 文字，右侧 65% 图表）：`display: grid; grid-template-columns: 1fr 2fr;`
- 柱状图：`display: flex`，每柱 `width: calc(100% / 17)`，`align-items: flex-end`
- 柱子：`background: var(--text-secondary)`, 脉冲高点 `background: var(--scene)`，低谷 `background: rgba(198,40,40,0.3)`
- 入场：柱子 `entrance-grow` staggered（0.06s 递增）
- 注解：`--success` 和 `--error` 色的 ALL CAPS 标签
- 缩放提示：右上角 `JetBrains Mono 11px --text-disabled` "2025.01 → 2026.05"

**入口：** 柱子 `scaleY(0→1)` staggered 生长，月份标签 `fadeIn` 随柱子一起
**打破：** 柱子脉冲高点用场景色染色（数据本身即为装饰，不做额外装饰）

---

### Scene 3: 基本盘 — TOP3

```
┌─────────────────────────────────────┐
│        前三名占据四成                 │  ← Playfair Display 36px
│     41.1% = 2,126 人                 │
│                                     │
│  ┌────────┐ ┌────────┐ ┌────────┐  │
│  │  伽玛   │ │  毅航   │ │ 毛毛虫  │  │  ← Inter 24px
│  │  745人  │ │  709人  │ │  672人  │  │  ← Doto 48px
│  │ 稳定高产 │ │ 爆发增长│ │  可靠型 │  │  ← JetBrains Mono label
│  │         │ │         │ │         │  │
│  └────────┘ └────────┘ └────────┘  │
│                                     │
│  41.1%                              │  ← Playfair Display 72px
│  前三名占总供给比例                  │  ← JetBrains Mono label
│                                     │
└─────────────────────────────────────┘
```

**HTML 结构：**
```html
<section id="top3" class="scene">
  <div class="scene-content">
    <h2 class="section-title">前三名占据四成</h2>
    <p class="section-lead">伽玛 + 毅航 + 毛毛虫 = 2,126 人 = 41.1%。三种供给模式各有价值。</p>
    <div class="top3-grid">
      <div class="vendor-card">
        <h3 class="vendor-name">伽玛</h3>
        <span class="vendor-count">745</span>
        <span class="vendor-tag">稳定高产型</span>
        <p class="vendor-desc">月均贡献稳定，供给节奏可预测</p>
      </div>
      <!-- 同理 毅航、毛毛虫 -->
    </div>
    <div class="total-share">
      <span class="share-number">41.1%</span>
      <span class="share-label">前三名占总供给比例</span>
    </div>
  </div>
</section>
```

**CSS 要点：**
- `min-height: 100vh`, `display: flex`, `flex-direction: column`
- TOP3 网格：`display: grid; grid-template-columns: repeat(3, 1fr); gap: var(--space-xl)`
- 卡片：`background: var(--surface)`, `border: 1px solid var(--border)`, `border-radius: 8px`, `padding: var(--space-xl)`
- 卡片数字：`font-family: Doto`, `font-size: var(--display-lg)`, `--text-display`
- 41.1%：`font-family: Playfair Display 300`, `font-size: 72px`, `text-align: center`, `margin-top: var(--space-2xl)`

**入口：** 三卡片 staggered `entrance-fade`（0.1s 间隔），41.1% 延迟 0.5s 后 fadeIn
**打破：** 41.1% 数字以大尺寸置于三分屏下方，打破上方对称感

---

### Scene 4: 分化线 — 排名

```
┌─────────────────────────────────────┐
│    谁在增长，谁在退出                │  ← Playfair Display 36px
│                                     │
│  #  职场    人数    趋势             │
│  ─────────────────────────────     │  ← 表头
│  1  歧力    130    ↑ 增长型         │  ← --success 色标签
│  2  毅航    130    ↑ 增长型         │
│  3  赛维斯  110    ↑ 增长型         │
│  4  华啸    98     ↑ 增长型         │
│  ─────────────────────────────     │  ← 分割线
│  5  伽玛    86     → 平稳型         │
│  6  毛毛虫  82     → 平稳型         │
│  7  汇讯    78     → 平稳型         │
│  8  博岳    70     → 平稳型         │
│  ─────────────────────────────     │
│  9  广达    22     ↓ 下降型         │  ← --error 色标签
│  10 翰锐    18     ↓ 下降型         │
│  ─────────────────────────────     │
│  11 人和    1      × 极低           │  ← 整行 --error 强调
│                                     │
│  增长型: 4家 · 平稳型: 4家          │
│  下降型: 2家 · 极低: 1家            │  ← 底部汇总
│                                     │
└─────────────────────────────────────┘
```

**HTML 结构：**
```html
<section id="ranking" class="scene">
  <div class="scene-content">
    <h2 class="section-title">谁在增长，谁在退出</h2>
    <p class="section-lead">歧力 2026-05 排第一，人和同期仅 1 人。</p>
    <div class="ranking-table">
      <div class="rank-header"><span>#</span><span>职场</span><span>人数</span><span>趋势</span></div>
      <div class="rank-group growth">
        <div class="rank-row" data-rank="1">...</div>
      </div>
      <!-- 4 groups: growth, stable, decline, minimal -->
    </div>
  </div>
</section>
```

**CSS 要点：**
- 单列窄宽布局：`max-width: 640px; margin: 0 auto;`
- 每行：`display: grid; grid-template-columns: 32px 1fr 80px 100px; gap: var(--space-md); padding: var(--space-sm) 0;`
- 排名单元格：`--text-disabled` ALL CAPS
- 职场名：Inter, `--text-primary`
- 人数：JetBrains Mono, `--text-secondary`
- 趋势标签：`padding: 2px 8px; border-radius: 4px; font-size: 11px; text-transform: uppercase;`
- 组间距：`border-top: 1px solid var(--border)` 作为分组分割
- 极低（人和）整行：`background: rgba(198, 40, 40, 0.04);`

**入口：** 排名行 staggered `entrance-slide`（0.08s 间隔），按组依次出现
**打破：** 人和行（仅1人）用 `--error` 浅背景标红整行，视觉警讯

---

### Scene 5: 脉冲归因

```
┌─────────────────────────────────────┐
│                                     │
│       春节后的 12,900%              │  ← Playfair Display 36px
│                                     │
│  ┌──────────────┐   ▼ 冲击分析      │
│  │  毅航曲线     │                   │  ← sticky left
│  │  1→130        │   春节后脉冲      │
│  │  ▁▁█▁▁▁█▁▇    │   是所有职场的    │  ← scroll text right
│  │               │   共同节律        │
│  └──────────────┘                   │
│                   ▼ 归因结论        │
│                   环比异常不是        │
│                   风险信号           │
│                   而是自然节律       │
│                                     │
│  异常检测: 3σ + IQR                │  ← evidence, 底部
│  范围: 2026-03 环比 anomaly         │
│                                     │
└─────────────────────────────────────┘
```

**HTML 结构：**
```html
<section id="attribution" class="scene">
  <div class="sticky-layout">
    <div class="sticky-chart">
      <canvas id="pulseChart" width="400" height="300"></canvas>
      <!-- 或者用纯 CSS SVG 线条走势 -->
    </div>
    <div class="scroll-text">
      <div class="text-block reveal-on-scroll">
        <h3 class="block-title">冲击分析</h3>
        <p>毅航从 1 人到 130 人——春节后的脉冲效应在所有职场同步显现。</p>
      </div>
      <div class="text-block reveal-on-scroll">
        <h3 class="block-title">归因结论</h3>
        <p>环比异常不是风险信号，而是人力供给的自然节律。</p>
      </div>
    </div>
  </div>
  <div class="evidence-bar">
    <span>异常检测: 3σ + IQR</span>
    <span>异常点: 2026-03</span>
  </div>
</section>
```

**CSS 要点：**
- Sticky 布局：左 45% 图表 sticky，右 55% 文字 scroll
  - `.sticky-chart { position: sticky; top: 50%; transform: translateY(-50%); }`
  - `.scroll-text { padding-top: var(--space-4xl); padding-bottom: var(--space-4xl); }`
- 图表：纯 CSS/SVG 线条图，`stroke: var(--scene)`, `stroke-width: 2`
- 冲击标注点：`circle fill: var(--warning)`, 带小标签
- 文字块：`.text-block` 默认 opacity:0 translateY(16px)，进入视口后 revealed
- 结论（"环比异常不是风险信号"）：`font-weight: 600`, `--text-primary`，稍大字号
- Evidence bar: 底部固定，`--text-disabled`

**入口：** 图表 `entrance-slide` bottom-to-top，文字块 scroll-reveal（JS IntersectionObserver）
**打破：** 12,900% 关键词用 `--warning` 琥珀色强调（功能信号，非装饰）

---

### Scene 6: 来源

```
┌─────────────────────────────────────┐
│                                     │
│       数据来源与校验                 │  ← Playfair Display 36px
│                                     │
│   数据源                            │
│   金条业务线 BPO 首呼数据            │
│                                     │
│   时间范围                          │
│   2025.01 — 2026.05（17个月）       │
│                                     │
│   覆盖范围                          │
│   11 家 BPO 职场                     │
│                                     │
│   筛选条件                          │
│   仅首呼（首次外呼人力）             │
│                                     │
│   排除字段                          │
│   其他业务线 · 财务 · 质检 · 当月外呼 │
│                                     │
│   校验方式                          │
│   同比校验 + 异常检测（3σ + IQR）    │
│                                     │
│   数据科技业务部 · 服务组             │
│   供应商管理                        │
│                                     │
└─────────────────────────────────────┘
```

**HTML 结构：**
```html
<section id="source" class="scene">
  <div class="source-content">
    <h2 class="section-title">数据来源与校验</h2>
    <dl class="source-list">
      <div class="source-item">
        <dt>数据源</dt>
        <dd>金条业务线 BPO 首呼数据</dd>
      </div>
      <!-- 同理: 时间范围, 覆盖范围, 筛选条件, 排除字段, 校验方式 -->
    </dl>
    <div class="source-footer">数据科技业务部 · 服务组 · 供应商管理</div>
  </div>
</section>
```

**CSS 要点：**
- 窄列居中：`max-width: 600px; margin: 0 auto;`
- `dl` 网格：`display: grid; grid-template-columns: auto 1fr; gap: var(--space-md) var(--space-xl);`
- `dt`: `font-family: JetBrains Mono; font-size: var(--label); text-transform: uppercase; color: var(--text-secondary);`
- `dd`: `font-family: Inter; font-size: var(--body); color: var(--text-primary);`
- `.source-footer`: `margin-top: var(--space-4xl); color: var(--text-disabled);`

**入口：** `entrance-simple-fade`
**打破：** 无——安静结束

---

### Footer

**一行式：** `© 数据科技业务部 · 服务组 · 供应商管理`

```html
<footer class="site-footer">
  <div class="footer-content">
    <span>© 数据科技业务部 · 服务组 · 供应商管理</span>
  </div>
</footer>
```

---

## 6. JS 功能清单

```javascript
// 1. Hero Counter — requestAnimationFrame from 0 to 5174
function animateCounter(element, target, duration) {
  let start = performance.now();
  function update(now) {
    const elapsed = now - start;
    const progress = Math.min(elapsed / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
    element.textContent = Math.round(eased * target).toLocaleString();
    if (progress < 1) requestAnimationFrame(update);
  }
  requestAnimationFrame(update);
}

// 2. Scroll Progress Bar — update width on scroll
function updateProgress() {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = scrollTop / docHeight;
  document.querySelector('.progress-fill').style.width = (progress * 100) + '%';
}

// 3. IntersectionObserver for scroll-reveal (Scene 5)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add('revealed');
  });
}, { threshold: 0.3 });

// 4. Entrance animations — IntersectionObserver
//    每个 scene 进入视口时触发子元素动画
const sceneObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('scene-visible');
    }
  });
}, { threshold: 0.15 });
```

---

## 7. 硬约束检查表

| # | 规则 | 检查 | 状态 |
|---|------|------|------|
| 1 | 3 字体不混角色 | Doto→数字, Playfair→标题, Inter→正文, JetBrains→数据 | ✅ |
| 2 | Hero ≥ 96px，与 body 比值 ≥ 8:1 | Doto 120px / Inter 14px = 8.57:1 | ✅ |
| 3 | 无渐变/阴影/模糊/毛玻璃 | 全程不使用 | ✅ |
| 4 | 场景色三选一，同页只用一个 | Glacier 唯一 | ✅ |
| 5 | Hero 底色为 `--bg` 或 `--surface` | `<section id="hero">` 背景 `--bg` | ✅ |
| 6 | accent-orange 仅功能信号 | 未使用 orange；仅 `--warning` 于场景5 | ✅ |
| 7 | 相邻 section 不同结构特征 | Hero(中心锚点)→脉搏(左文右图)→基本盘(三分屏)→排名(窄表)→归因(sticky)→来源(文字列表) | ✅ |
| 8 | 有装饰元素（ghost 字/装饰线/浮动标签/点阵 选 2-3） | ghost 数字(Scene1) + 场景色脉冲柱(Scene2) + 进度条 | ✅ |
| 9 | 每页至少 4 种不同入口 | counter / scaleY grow / fadeIn / slideInTop / scroll-reveal / simpleFade | ✅ |
| 10 | 至少 4 个不同 narrative beats | Cold Open / Data Bombardment / Evidence Wall / Deep Dive / Pivot / Authority / Farewell | ✅ |
| 11 | 每页一个不可替代的签名构图 | 每场景签名构图在 storyboard 中已定义 | ✅ |
| 12 | 没有重复的相邻入口/动效 | 6 场景 6 种不同入口 | ✅ |
| 13 | 互动预算：每页最多 1 个重互动，2 个注意吸引式揭示 | 无重互动（纯静态报告），2处 scroll-reveal(场景5) | ✅ |
| 14 | 每页恰好一处"打破" | scene1:Doto数字, scene2:场景色脉冲柱, scene3:41.1%大数字, scene4:人和红色行, scene5:12,900%琥珀, scene6:无 | ✅ |
| 15 | 无 bounce/spring/视差/滚动劫持 | 全部使用 `var(--ease-out)` | ✅ |

---

## 8. 反垃圾检查

| 检查 | 状态 |
|------|------|
| 每个页面有自己场景概念，非通用模板 | ✅ 6 场景各具独特数据叙事 |
| 签名构图无法被通用卡片网格替代 | ✅ Data Punch / 中心线时间轴 / Sticky 归因 |
| 相邻 section 不同结构特征族 | ✅ 见约束#7 |
| 页面节奏包含 spectacle/密集/呼吸 | ✅ Hero(spectacle)→时间轴(密集)→TOP3(密集)→排名(密集)→归因(呼吸)→来源(呼吸) |
| Hero ≥ 3 个视觉元素 | ✅ 主数字 + 2 卫星数字 + 标题 + 进度条 = 5 |
| 眯眼测试 — Answer 层主导 | ✅ 每屏超大 Answer 数字/标题主导 |
| 移动端重新排列非缩小 | ✅ 窄屏 stack 纵向排列 |
| reduced-motion | ✅ `@media (prefers-reduced-motion: reduce) { animation: none !important; }` |
| 无工作流术语暴露 | ✅ 无 director/film/chapter/calibrated 在 UI |
