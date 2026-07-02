# 组件库规则卡

> 提取自 Haglöfs 范式 4 份源文件（R3 品牌展示 / H031 组件库 / R3 数据中心 / H063 分析模板）。
> 共享 DNA：间距梯队 2/4/8/16/24/32/48/64/96px（R3 记为 --s1:4px … --s24:96px）；所有颜色经 var(--color-*) 引用，不硬编码；R3 数据组件以 `.cmp` 头注释自标注。

---

## Tension Grid（张力网格）

- **用途：** 在深色背景上以等分网格并置成对概念，制造「张力」（如传承 vs 未来、自然 vs 科技）。
- **场景：** 适合：品牌理念、核心价值观、二元对立叙事、2/4 个核心概念并展。不适合：超过 4 项的列表（会稀释张力感）、产品参数对比（用 Data Table）。
- **骨架：**
  ```html
  <section class="tension-bg">  <!-- 或 .section-dark -->
    <div class="tension-grid">  <!-- display:grid; grid-template-columns:1fr 1fr; gap:0 -->
      <div class="tension-item">  <!-- padding:60px(≈s16); border:1px solid rgba(255,255,255,.08) -->
        <div class="tension-item__number">01</div>      <!-- mono 11px, rgba白.3 -->
        <div class="tension-item__side">传承</div>       <!-- Georgia 24px -->
        <div class="tension-item__side-en">Heritage</div> <!-- mono 14px uppercase -->
        <p class="tension-item__desc">…</p>             <!-- 14px, rgba白.5, max-width:360px -->
      </div>
      <!-- 重复 2~4 个 -->
    </div>
  </section>
  ```
  关键：背景 `var(--color-charcoal)` / `var(--primary-darkgray)`；item 间用 `rgba(255,255,255,.08)` 细线分隔而非实色边框；gap 必须 0（靠 border 切割）。
- **禁忌：** ① 列数严禁超过 2（移动端塌缩为 1fr）；② item 总数不得超过 4（2×2 是张力原型）；③ 不得在浅色背景上用（张力依赖深色反衬）；④ 不得用实色 gap 分隔（会破坏无缝张力）。

---

## Tension List（张力列表 / 文章索引列表）

- **用途：** 以全宽行卡展示可点击的文章/条目索引，hover 时整行右滑制造「牵引」动效。
- **场景：** 适合：目录、文章索引、产品系列入口、可跳转的资源清单。不适合：不可点击的纯展示信息（动效会误导）、超过 8 行的长列表（改用分页 + Data Table）。
- **骨架：**
  ```html
  <ul class="list">  <!-- list-style:none -->
    <li class="list__item">  <!-- margin-bottom:2px，行间用 2px 缝隙 -->
      <a class="list__link" href="#">  <!-- padding:28px 40px; background:var(--color-cream) -->
        <div class="list__left">
          <div class="list__title">标题</div>   <!-- Georgia 20px -->
          <div class="list__meta">日期·摘要</div> <!-- mono 12px uppercase -->
        </div>
        <div class="list__badge badge--html">HTML</div>  <!-- mono 10px -->
      </a>
    </li>
  </ul>
  <!-- H031 简化版：.list__item 用 border-bottom:1px solid var(--border)，gap:12px，含 .list__icon + .list__content + .list__action -->
  ```
  hover：`transform:translateX(8px)` + `background:var(--color-sand)`。badge 用信号色 `var(--color-signal-orange)`。
- **禁忌：** ① `.list__link` 必须是 `<a>`（动效暗示可点）；② 不要在非交互行上用 `.list__link` hover 动效；③ 行内不得放超过 1 个 badge（视觉过载）；④ H031 风格与 R3 风格不可混用（一个是 border 分隔行卡，一个是全宽 cream 行）。

---

## Tension Prose（品牌正文排版）

- **用途：** 提供长文阅读的完整排版系统（H2/H3/p/a/code/pre/blockquote/ul/hr），保证不同页面文字层级一致。
- **场景：** 适合：博客、报告、文档、品牌叙事长文。不适合：仪表盘、产品规格（用 Data Table / Data Grid）、数据可视化页。
- **骨架：**
  ```html
  <div class="prose">  <!-- max-width:680px（控制阅读行宽）-->
    <h2>…</h2>  <!-- Georgia 32px, margin-top:80px(s20) -->
    <p>… <strong>加粗</strong> … <a href="#">链接</a> … <code>code</code></p>
    <h3>…</h3>  <!-- 24px -->
    <pre><code>代码块</code></pre>  <!-- bg:var(--color-charcoal); padding:32px(s8) -->
    <blockquote>引用</blockquote> <!-- border-left:3px solid var(--color-signal-orange) -->
    <ul><li>…</li></ul>  <!-- padding-left:28px -->
    <hr>  <!-- bg:var(--color-cream); margin:80px(s20) -->
  </div>
  ```
  关键：正文 17px / line-height 1.8；链接 `var(--color-signal-blue)` + underline offset 3px；blockquote 用信号橙左边框。
- **禁忌：** ① 不要在 .prose 内嵌套 Data Table 或复杂组件（它只管文字）；② max-width 不得超过 680px（超过破坏阅读节奏）；③ 不得改用 sans-serif 做标题（Georgia 衬线是品牌 DNA）；④ 不要省略 hr 的 80px 上下间距。

---

## Data Table（数据表）

- **用途：** 以结构化行列呈现可比较的规格/属性数据，表头大写 mono、行 hover 高亮。
- **场景：** 适合：产品参数对比、规格清单、多维度评分、属性矩阵。不适合：纯叙述性信息（用 Prose）、单值 KPI（用 Swatch/KPI 卡）。
- **骨架：**
  ```html
  <!-- R3 版 -->
  <div class="table-wrap">  <!-- border:1px solid var(--color-cream); overflow-x:auto -->
    <table>
      <thead><tr><th>组件</th><th>用途</th></tr></thead> <!-- mono 11px uppercase; bg:var(--color-cream) -->
      <tbody>
        <tr><td>…</td><td>…</td></tr> <!-- td padding:16px(s4) 20px(s5) -->
      </tbody>
    </table>
  </div>
  <!-- H031 版（带 header 卡 + 选中行）-->
  <div class="table-wrap">  <!-- border-radius:8px -->
    <div class="table-header"><div class="table-title">Product Catalog</div></div>
    <table class="table">
      <tr class="table-row--selected">…</tr>  <!-- bg:rgba(74,93,58,.05) -->
      <td><span class="tag tag--olive">IN STOCK</span></td>  <!-- 状态用 tag -->
    </table>
  </div>
  ```
  hover：`tr:hover td { background:var(--color-cream) }`；th 字距 2px。
- **禁忌：** ① 列数建议 ≤5（移动端横向滚动兜底，但超过 5 列可读性骤降）；② 不要在 td 内放长段落（表格是数据容器，不是文字容器）；③ 状态列必须用 `.tag`/`.badge` 而非裸文字色；④ 不要同时用边框 + 行间距 + 斑马纹（选一种分隔方式）。

---

## Callout（提示/强调框）

- **用途：** 从正文流中抽离出单条关键提示/警告/方法论说明，用左边框 + 浅背景做视觉锚点。
- **场景：** 适合：警告、提示、方法论注解、关键发现总结（常跟在 Data Table/Grid 后）。不适合：多段论述（用 Prose）、可展开详情（用 Accordion）、主标题（用 section-title）。
- **骨架：**
  ```html
  <!-- H031 简洁版 -->
  <div class="callout">  <!-- border-left:2px solid var(--primary-olive); bg:var(--surface-raised); padding:16px(s4) 20px(s5) -->
    <div class="callout__title">METHODOLOGY</div> <!-- mono 9px uppercase, color:var(--primary-olive) -->
    <div class="callout__body">…</div>            <!-- 14px, color:var(--text-secondary) -->
  </div>
  <!-- R3 三色版 -->
  <div class="callout callout--warning">  <!-- border-left:3px solid var(--color-signal-red) -->
    <div class="callout__title">注意</div>
  </div>
  <div class="callout callout-tip">       <!-- border-left:3px solid var(--color-forest) -->
  <!-- R3 数据中心版（强调发现，含高亮）-->
  <div class="callout">  <!-- border-left:2px solid var(--olive); padding:var(--s8) -->
    <div class="callout__tag">◆ 关键发现</div>
    <div class="callout__h">…<span class="hl">高亮数字</span>…</div> <!-- .hl color:var(--olive) -->
    <div class="callout__p">…</div>
  </div>
  ```
- **禁忌：** ① 单页连续堆叠不超过 3 个（超过转 Accordion 或 Prose）；② warning/tip/default 三类不可在同一页混用超过 2 种语义；③ 不要嵌套 Callout；④ Callout 内不得放表格/图表（它是文字容器）。

---

## Checklist（检查清单）

- **用途：** 以勾选框 + 文字行的方式呈现待办/已完成的清单项，整体置于 cream 背景块内。
- **场景：** 适合：发布前自检、功能清单、交付物核对、步骤验收。不适合：可点击导航（用 List）、纯阅读内容（用 Prose）。
- **骨架：**
  ```html
  <div class="checklist">  <!-- bg:var(--color-cream); padding:48px(s12) -->
    <div class="checklist-title">检查清单</div> <!-- Georgia 24px, margin-bottom:32px(s8) -->
    <div class="checklist-item">  <!-- flex; gap:16px(s4); border-bottom:1px solid var(--color-sand) -->
      <div class="checklist-box"></div>  <!-- 16px 方框; border:1.5px solid var(--color-stone); radius:3px -->
      <span>清单项文字</span>            <!-- 15px -->
    </div>
  </div>
  ```
  最后一项 `.checklist-item:last-child { border-bottom:none }`。
- **禁忌：** ① 单个 checklist 项数建议 4~8（少于 4 用 List，多于 8 拆分）；② box 尺寸锁死 16px，不要放大缩小（破坏对齐网格）；③ 不要把 checklist 放进深色 section（box 描边在深底上不可见）；④ 不要用 checklist 表达流程顺序（无序语义，流程用 Pipeline/Step）。

---

## Ring（环形指标 / 环形图）

- **用途：** 以圆环进度可视化单个百分比/比率指标，直观传达「完成度/占比」。
- **场景：** 适合：单个 KPI 完成度、可持续性评分、覆盖率（多个并排做对比时效果最佳）。不适合：精确数值读取（用数字 + Data Table）、趋势变化（用 Elevation Profile 曲线）、负值/多维度。
- **骨架：**（H063 hero 用圆环 SVG 装饰；范式内环形指标以 SVG stroke-dasharray 实现）
  ```html
  <svg viewBox="0 0 120 120" fill="none">
    <circle cx="60" cy="60" r="52" stroke="var(--border)" stroke-width="2"/>      <!-- 轨道 -->
    <circle cx="60" cy="60" r="52" stroke="var(--primary-olive)" stroke-width="6"
            stroke-dasharray="326.7" stroke-dashoffset="42"   <!-- 326.7=2πr; offset=周长×(1-百分比) -->
            transform="rotate(-90 60 60)"/>
  </svg>
  <!-- 配数字标签 -->
  <div class="hm__num">87<span>%</span></div>
  <div class="hm__lbl">可持续评分</div>  <!-- mono uppercase -->
  ```
  关键：环色用 `var(--primary-olive)` / `var(--color-forest)`；轨道用 `var(--border)`；起点 rotate(-90)。
- **禁忌：** ① 单页独立使用无对比意义时，至少 2 个并排（环形是为「相对比较」而生）；② 环宽 stroke-width 保持 2~6px，不要过粗（>8 变实心饼）；③ 不得用环表示超过 100% 或负数；④ 不要在环中心堆长文本（中心只放数字+短标签）。

---

## Pipeline（流程 / 步骤栈）

- **用途：** 以编号 + 标题 + 描述的纵向序列呈现有序流程/阶段，强调先后与递进。
- **场景：** 适合：方法论步骤、生产流程、决策链、发布路线图。不适合：无序清单（用 List/Checklist）、并列对比（用 Tension Grid）、时间跨度叙事（用 Timeline）。
- **骨架：**（范式内以 Step Num + Prose，或 Layer Stack 的有序变体呈现）
  ```html
  <!-- 大号步骤编号 -->
  <div class="step-item__num">01</div>  <!-- Georgia 72px, color:var(--color-sand), line-height:1 -->
  <div class="prose">
    <h2>步骤标题</h2>
    <p>步骤描述…</p>
  </div>
  <!-- 进度点轨（R3 数据中心 .ptrl）-->
  <div class="ptrl">
    <span class="ptrl__d done"></span>  <!-- 6px 圆点; bg:var(--tda) 已完成 -->
    <span class="ptrl__d cur"></span>   <!-- 20px 椭圆; bg:var(--olive) 当前 -->
    <span class="ptrl__d"></span>       <!-- 未完成 -->
    <span class="ptrl__lbl">阶段 · 6/8 已完成</span>
  </div>
  ```
- **禁忌：** ① 步骤编号字体必须是 Georgia 衬线（与品牌一致），不要换 sans/mono；② 步骤数建议 3~7（少于 3 用并列卡，多于 7 拆分章节）；③ 流程顺序不得乱序/跳号；④ step-item__num 的 72px 不要缩小（它是视觉锚，缩小失去张力）。

---

## Layer（分层栈 / 地质层结构）

- **用途：** 以纵向堆叠的「地层」行展示分层体系（如品牌信息层级、技术分层、优先级栈），每层带占比条。
- **场景：** 适合：信息架构分层、品牌/产品层级、技术栈分层、优先级排序。不适合：并列平级概念（用 Tension Grid）、流程（用 Pipeline）、纯数值对比（用 Seam Benchmark）。
- **骨架：**（R3 数据中心 .layer / .lyr）
  ```html
  <div class="layer__stack">  <!-- flex column; gap:2px -->
    <div class="lyr">  <!-- grid:180px 1fr auto; padding:var(--s5) var(--s6); bg:var(--surface) -->
      <span class="lyr__num">L05</span>                     <!-- mono uppercase -->
      <div>
        <div class="lyr__name">层名称</div>                  <!-- mono sm bold -->
        <div class="lyr__ctx">层描述…</div>                  <!-- sm, secondary -->
        <div class="lyr__bar"><div class="lyr__bar-f" style="width:40%"></div></div> <!-- 3px 进度条 -->
      </div>
      <span class="lyr__val">40%</span>                     <!-- mono base, color:var(--olive) -->
    </div>
  </div>
  ```
  hover：`.lyr:hover { background:var(--primary-darkgray); color:#fff }`（反色强化）。
- **禁忌：** ① 层数建议 3~6（过少无「栈」感，过多失去层级对比）；② 层顺序必须从上到下有逻辑（如 L05→L01 重要性递减）；③ 不要把占比条换成饼图/环图（破坏栈的纵向一致性）；④ hover 反色是设计语言，不要移除。

---

## Swatch（色板卡 / 材质指标卡）

- **用途：** 以「色块面 + 数值体」的卡片展示单个品牌指标，顶部色块既是分类标识也是视觉锚。
- **场景：** 适合：品牌关键指标（增长/质量/覆盖率/采用率）、色彩系统展示、材质/属性卡。不适合：精确趋势（用 Elevation Profile）、多维度对比（用 Data Table）、单一警告（用 Callout）。
- **骨架：**（R3 数据中心 .swatch / .sw）
  ```html
  <div class="swatch__grid">  <!-- grid repeat(4,1fr); gap:var(--s6) -->
    <div class="sw">  <!-- border:1px solid var(--border); radius:4px; overflow:hidden -->
      <div class="sw__face" style="background:var(--olive)"> <!-- height:100px -->
        <div class="sw__face-in"><span class="sw__face-lbl">Growth</span></div> <!-- mono xs, 白字 opacity.5 -->
      </div>
      <div class="sw__body">  <!-- padding:var(--s4) var(--s5) -->
        <div class="sw__val">+23%</div>                <!-- mono 3xl bold -->
        <div class="sw__ctx">描述…</div>               <!-- sm secondary -->
        <div class="sw__dotline">                       <!-- 点阵进度 4px 圆点 -->
          <span class="on"></span><span class="on"></span><span></span>
        </div>
      </div>
    </div>
  </div>
  ```
  关键：face 色用 `var(--olive)`/`var(--earth)`/`var(--glacier)`/`var(--pk)` 四色对应四类；dotline `.on` 用 olive，hover 变 org（橙）。
- **禁忌：** ① 一组 Swatch 必须 4 的倍数（grid 4 列原型）；② face 色不得用信号色（red/orange/yellow/blue 是留给 Callout/Alert 的，face 用品牌主色）；③ 单卡内不得放超过 1 个数值；④ dotline 点数固定语义（如满分 10 点），不要随意增减。

---

## Grid Matrix（格点矩阵）

- **用途：** 以等宽格点的密集矩阵展示分布/频度数据，深色背景上每格一个标签+数值，hover 高亮。
- **场景：** 适合：组件频度分布、分类计数、热力分布概览。不适合：精确趋势（用曲线）、层级（用 Layer）、单值强调（用 Swatch）。
- **骨架：**（R3 数据中心 .matrix / .mx）
  ```html
  <div class="matrix__grid">  <!-- grid repeat(6,1fr); gap:1px; background:rgba(255,255,255,.06) -->
    <div class="mx">  <!-- padding:var(--s5) var(--s4); bg:var(--primary-darkgray); text-align:center -->
      <div class="mx__lbl">Hero</div>   <!-- mono xs uppercase, rgba白.2 -->
      <div class="mx__val">9</div>      <!-- mono xl bold, 白 -->
    </div>
    <!-- 6×N 格 -->
  </div>
  ```
  hover：`.mx:hover { background:rgba(74,93,58,.15) }`；总计格用 `font-weight:700`，分类色用半透明 olive/earth/glacier。
- **禁忌：** ① 列数固定 6（移动端塌缩为 3），不要改 6 以上的列数；② 格内只放「标签+1 个数值」，不放描述/图表；③ 总计/合计格必须存在且放末位，用 700 字重区分；④ 不要给单格加边框（靠 1px gap 背景色切分）。

---

## Accordion（手风琴 / 折叠面板）

- **用途：** 以可折叠的标题行收纳详细内容，默认收起、点击展开，节省纵向空间。
- **场景：** 适合：FAQ、规格详情、材料成分、护理说明、长清单的分级收纳。不适合：核心首屏内容（不应默认折叠）、步骤流程（用 Pipeline）、对比表（用 Data Table）。
- **骨架：**（H031 / H063）
  ```html
  <div class="accordion">  <!-- border-top:1px solid var(--border-visible) -->
    <div class="accordion-item">  <!-- border-bottom:1px solid var(--border-visible) -->
      <button class="accordion-toggle">  <!-- w:100%; flex space-between; padding:16px(s4) 0 -->
        <span class="accordion-label">材料成分</span>  <!-- mono 12px -->
        <span class="accordion-icon">+</span>          <!-- mono 16px, 旋转/变色指示状态 -->
      </button>
      <div class="accordion-body">…</div>  <!-- padding:0 0 20px; 14px secondary -->
    </div>
  </div>
  <!-- .accordion-item.open .accordion-icon { color:var(--text-display) } -->
  ```
- **禁忌：** ① 同一 accordion 默认只展开 1 项（多开会失去「节省空间」意义）；② icon 用 +/- 或箭头，不要用图标库彩色图标；③ 标题行必须是 `<button>`（可访问性）；④ 单组 item 建议 3~6（过少无折叠价值，过多用 Tabs/分页）；⑤ 不要在 accordion-body 内再嵌 accordion。

---

## 组件组合规则

1. **数据叙事链：** Pulse Hero（KPI 概览）→ Compass Trend / Elevation Profile（趋势细节）→ Seam Benchmark（目标对比）→ **Callout（关键发现总结）+ Action Grid（建议行动）**。Callout 几乎总是跟在数据组件后做「翻译」，把数字变成结论。

2. **Callout 的固定搭档：** Callout 单独使用缺乏对比，范式内固定以 `2fr : 1fr` 的 `.insight__grid` 与 Action（行动清单）并排——左边讲发现，右边讲下一步。

3. **Ring/Swatch 的并排对比原则：** Ring 和 Swatch 都是为「相对比较」而生，单放意义弱；范式默认 4 个 Swatch 一组（4 列 grid），Ring 至少 2~3 个并排。单独 1 个时改用大号数字（.hm__num）。

4. **深浅节奏（section 背景交替）：** 组件按 section 排列时背景必须浅-深-浅交替（R3 数据中心：hero 深→compass 浅→elevation 深→seam 浅→layer 浅→swatch 浅→matrix 深→insight 浅）。深色 section 放「冲击/概览」类（Hero/Elevation/Matrix），浅色 section 放「细节/对比」类（Table/Layer/Swatch）。

5. **Tension Grid + Prose 的张力叙事：** 用 Tension Grid 抛出二元对立（如自然 vs 科技），紧接 Prose 展开论述——Grid 是「论点阵列」，Prose 是「论证」。不要用 Data Table 替代 Tension Grid 讲理念（表格是数据，不是张力）。

6. **Data Table → Checklist 的交付闭环：** 规格用 Data Table 列出后，常用 Checklist 做「验收核对」——表格定义「是什么」，清单确认「做到了」。

7. **Layer Stack 与 Accordion 互斥：** 两者都做分层收纳，但 Layer 强调「同时可见的层级占比」（适合架构展示），Accordion 强调「按需展开的细节」（适合 FAQ）。同一信息不要同时用两种。

8. **Grid Matrix 作为「索引首页」：** Matrix 适合做组件库/资源库的总览入口（频度分布），点进单格再进 Data Table 或 Swatch 详情。不要把 Matrix 当详情页主体。

9. **.cmp 头注释自标注（R3 范式）：** R3 每个组件块顶部必带 `<div class="cmp">S2 · <em>Compass Trend</em> — 说明</div>`，这是组件自描述模式——生成时必须保留，用于读者快速识别组件类型与用途。

10. **间距梯队贯穿所有组件：** 任何 padding/margin/gap 必须取自梯队 4/8/12/16/20/24/32/40/48/64/80/96px（R3 的 --s1~--s24）。禁止出现 5px/7px/13px 这类非梯队值——这是品牌一致性的硬约束。
