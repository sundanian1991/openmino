# Hero 变体规则卡

> Haglöfs 范式 · 6 种 Hero 变体的提取规则。源样本：H042（多变体母本）/ H061·H062（Statement）/ R3-品牌展示（diagonal）/ R3-数据分析中心（Pulse）/ H029（diagonal）/ H044（Split）/ H047（Slide/Statement）。
> 所有变体共享 4 条铁律（见文末）。变体之间的差异只在"装饰元素 + 背景明暗 + 布局拓扑"三个轴上。

---

## V1 Reveal Hero（揭示式 · 深底全幅）

### 视觉特征
- **标题**：衬线（Georgia / Playfair），`clamp(3rem, 7vw, 6rem)` ≈ 48–96px，`line-height: 0.93–1.05`，`letter-spacing: -3px`，weight 300（轻量大字）。关键词用 `<strong>` 加重到 600–700，且可染品牌色（如 olive `rgba(74,93,58,0.6)`）。
- **装饰元素**：**细横线疏密条**（`height:1px` 的 `<span>`×N，`background: rgba(255,255,255,0.02)`，`margin-bottom:40px` 间距），铺满背景营造"测绘格栅/揭示幕布"感。另含 `EST. 1927` 式角标徽记（`font-mono, 10px, letter-spacing:4px`，`opacity 0.08`）。
- **背景**：**深底全幅**（`background: var(--td)` / `--text-primary` 深炭色），文字 `#fff`，所有辅助文字走 `rgba(255,255,255,0.15~0.3)` 的"白色透明阶梯"。
- **布局**：单列，`flex-direction:column; justify-content:flex-end`，内容沉到底部，顶部留给装饰条呼吸。

### 适用场景
- 品牌叙事开篇 / 传承故事首页。
- 调性：沉静、严肃、仪式感、暗室投影。
- 内容类型：一句宣言 + 一个成立年份，强调"重量"而非"信息量"。

### 代码骨架
```html
<section class="hero-reveal">
  <!-- 装饰：疏密横线 -->
  <div class="hero-reveal__bars">
    <span></span><span></span><span></span><span></span><span></span>
    <span></span><span></span><span></span><span></span><span></span>
  </div>
  <div class="hero-reveal__tag">Stockholm Design Lab · Volvo Cars</div>
  <h1 class="hero-reveal__title">
    Designed around<br><strong>you.</strong> Since 1927.
  </h1>
  <p class="hero-reveal__sub">Scandinavian engineering. Uncompromising safety.</p>
  <div class="hero-reveal__badge"><strong>EST. 1927</strong>Gothenburg · Sweden</div>
</section>
```
```css
.hero-reveal{min-height:100vh;background:var(--td);color:#fff;
  display:flex;flex-direction:column;justify-content:flex-end;
  padding:120px;position:relative;overflow:hidden}
.hero-reveal__bars{position:absolute;inset:0;pointer-events:none}
.hero-reveal__bars span{display:block;height:1px;
  background:rgba(255,255,255,.02);margin-bottom:40px}
.hero-reveal__tag{font-family:var(--fm);font-size:11px;letter-spacing:4px;
  text-transform:uppercase;color:rgba(255,255,255,.15);margin-bottom:16px;z-index:2}
.hero-reveal__title{font-family:var(--fd);font-size:clamp(3rem,7vw,6rem);
  line-height:.93;letter-spacing:-3px;font-weight:300;max-width:700px;z-index:2}
.hero-reveal__title strong{font-weight:700;color:rgba(74,93,58,.6)}
.hero-reveal__sub{font-size:15px;color:rgba(255,255,255,.3);max-width:480px;margin-top:24px}
.hero-reveal__badge{position:absolute;right:120px;bottom:120px;
  font-family:var(--fm);font-size:10px;letter-spacing:4px;text-transform:uppercase;
  color:rgba(255,255,255,.08)}
.hero-reveal__badge strong{display:block;font-size:14px;color:rgba(255,255,255,.15)}
```

### 禁忌
- ❌ 不得换成浅底——浅底会失去"暗室揭示"的仪式感，那种情况改用 V4 Statement。
- ❌ 装饰横线不能用纯黑或高对比色（必须 `rgba(255,255,255,0.02~0.05)`），否则变成斑马线。
- ❌ 不要加 KPI 数字条——Reveal 是"留白型"开篇，数据条属于 V5 Pulse。

---

## V2 Grille Grid Hero（格栅阵列 · 浅底多格）

### 视觉特征
- **标题**：衬线大字（同 Reveal 量级），但**主视觉不是单句标题，而是 4 列格栅矩阵**。每个格栅项 `min-height:200px`，`border-left:1px solid var(--bd)`，项内：tag（mono 10px）+ name（衬线 28px）+ desc（13px）。
- **装饰元素**：**竖向 1px 分隔线**组成格栅（`border-top:2px solid var(--td)` 起头 + 每项左 border）。激活项反白（`background:var(--td); color:#fff`）。无水印、无斜切。
- **背景**：**浅底**（`var(--surface)` / `--bg` offwhite）。文字走深炭色阶梯。
- **布局**：`grid-template-columns:repeat(4,1fr); gap:0`，顶部一条 2px 实线收口。

### 适用场景
- 产品矩阵展示 / 品牌传承多图陈列 / "Everything in one glance" 总览页。
- 调性：理性、目录式、博物馆陈列柜。
- 内容类型：4 个并列同构条目（车型系列 / 历史阶段 / 产品线），每项短描述。

### 代码骨架
```html
<section class="section-grille">
  <div class="section-label">V2 · <span class="cid">Model Lineup</span></div>
  <div class="section-title">Every body style, <strong>distinctly</strong> Volvo.</div>
  <div class="grille-grid">
    <div class="grille-item active">
      <span class="grille-item__tag">SUV</span>
      <div class="grille-item__name">XC Series</div>
      <p class="grille-item__desc">Versatility meets capability.</p>
    </div>
    <!-- 重复 3 个 grille-item ... -->
  </div>
</section>
```
```css
.section-grille{background:var(--surface);padding:120px}
.grille-grid{display:grid;grid-template-columns:repeat(4,1fr);gap:0;
  margin-top:60px;border-top:2px solid var(--td)}
.grille-item{padding:40px 32px;border-left:1px solid var(--bd);
  min-height:200px;display:flex;flex-direction:column;justify-content:flex-end}
.grille-item:first-child{border-left:none}
.grille-item:hover{background:var(--bg-alt)}
.grille-item__tag{font-family:var(--fm);font-size:10px;letter-spacing:3px;
  text-transform:uppercase;color:var(--text-disabled);margin-bottom:8px}
.grille-item__name{font-family:var(--fd);font-size:28px;font-weight:300;
  letter-spacing:-0.5px;margin-bottom:4px}
.grille-item__desc{font-size:13px;color:var(--text-secondary);line-height:1.5}
.grille-item.active{background:var(--td);color:#fff}      /* 激活项反白 */
```

### 禁忌
- ❌ 格栅项不要超过 4 列（移动端塌缩到 2 列再 1 列）——超过 4 列失去"陈列柜"的呼吸感。
- ❌ 不要给格栅项加圆角 / 阴影——必须是**硬边 1px 线**分隔，圆角会变卡片网格，破坏格栅范式。
- ❌ 不要用深底——Grille Grid 的力量来自浅底上的黑色格栅线对比。

---

## V3 Split Hero（分屏 · 左文右图/深块）

### 视觉特征
- **标题**：衬线巨字（最大量级 `clamp(64px, 8.6vw, 120px)`），weight 400，`line-height:1.0`，`letter-spacing:-.025em`。仅左侧出现。
- **装饰元素**：**点阵网格**（右侧深块内 `grid 5×N` 的 `4px` 白点，`opacity:.05`）+ **年份水印**（左下角衬线 `clamp(80px,12vw,200px)`，`opacity:.15`）+ 右侧深块叠加巨字水印 `clamp(120px,18vw,320px)` `opacity:.08`。
- **背景**：**双区分屏**——左浅（`var(--bg)`）右深（`var(--text-primary)`）。比例 `grid-template-columns:1.5fr 1fr`（文重于图）。也可左侧斜切色块（H029 / R3 展示用 `clip-path: polygon(30% 0,100% 0,100% 100%,0 100%)` 切出右侧深色斜面）。
- **布局**：左文（tag+title+desc+ghost year），右图/深块（ghost text + 符号/引言）。

### 适用场景
- 品牌系统首页 / 设计原则陈述 / 案例开篇（左主张 + 右引言或视觉）。
- 调性：张力、对话感、两极并置（自然 vs 科技 / 温暖 vs 克制）。
- 内容类型：一句主张 + 一段引文/一个符号，强调"对立统一"。

### 代码骨架
```html
<section class="hero-split">
  <div class="hero-left">
    <div class="hero-tag">Brand Design System</div>
    <h1 class="hero-title">Haglöfs</h1>
    <p class="hero-desc">A design system built on the tension between heritage and innovation.</p>
    <div class="section-divider"></div>
    <div class="hero-ghost">1914</div>      <!-- 年份水印 -->
  </div>
  <div class="hero-right">
    <div class="ghost-text">1914</div>       <!-- 深块巨字水印 -->
    <div class="hero__dots">…</div>          <!-- 点阵（可选） -->
    <svg class="hero-symbol">…</svg>          <!-- 符号或引言 -->
  </div>
</section>
```
```css
.hero-split{display:grid;grid-template-columns:1.5fr 1fr;min-height:100vh;gap:0}
.hero-left{display:flex;flex-direction:column;justify-content:center;
  padding:96px 64px 96px 96px;position:relative}
.hero-tag{font-family:var(--fm);font-size:12px;letter-spacing:.06em;
  text-transform:uppercase;color:var(--brand-primary);margin-bottom:24px;
  display:flex;align-items:center;gap:8px}
.hero-tag::before{content:'';width:24px;height:1px;background:var(--brand-primary)}
.hero-title{font-family:var(--font-display);font-size:clamp(64px,8.6vw,120px);
  font-weight:400;line-height:1.0;letter-spacing:-.025em}
.hero-ghost{position:absolute;bottom:24px;right:24px;
  font-family:var(--font-display);font-size:clamp(80px,12vw,200px);
  font-weight:300;color:var(--text-disabled);opacity:.15;pointer-events:none}
.hero-right{background:var(--text-primary);display:flex;align-items:center;
  justify-content:center;position:relative;overflow:hidden}
.hero-right .ghost-text{font-family:var(--font-display);
  font-size:clamp(120px,18vw,320px);font-weight:700;color:var(--bg);opacity:.08;
  position:absolute;pointer-events:none}
/* 斜切变体（H029/R3展示）：右侧用伪元素 clip-path 切色块 */
.hero::before{content:'';position:absolute;top:0;right:0;width:40%;height:100%;
  background:linear-gradient(135deg,var(--brand-primary) 0%,#2D4229 100%);
  clip-path:polygon(30% 0,100% 0,100% 100%,0 100%)}
```

### 禁忌
- ❌ 左右不要等宽——必须 `1.5fr 1fr` 或更悬殊，等宽会变成"对开杂志"失去主张侧重。
- ❌ 右侧深块不能空——必须有点阵 / 水印巨字 / 符号 / 引言之一来填充，否则是死黑。
- ❌ 斜切版（H029）的 `clip-path` 切角方向要与阅读方向一致（左上→右下），反向切角会产生"倒退"的不安感。

---

## V4 Statement Hero（声明式 · 浅底居中）

### 视觉特征
- **标题**：衬线（Playfair Display），weight 300（最轻），`clamp(42px, 6vw, 80px)`，`line-height:1.02`，`letter-spacing:-2px`。可双行 `<br>`，关键词 italic 强调（`.section-h2 em{font-style:italic}`）。
- **装饰元素**：**单字母巨字水印**（`hero-letter`：`clamp(200px,25vw,400px)`，weight 300，`color:rgba(227,223,216,0.5)`，绝对定位 `right`+垂直居中）。底部一条 `1px` 收口线（`.hero-line`）。
- **背景**：**浅底**（`--bg` offwhite `#F2F0EC` / `#F5F3EF`）。H061/H062 的标志特征。
- **布局**：单列居中（`justify-content:center`），标题左对齐但视觉居中。底部可有 meta 数据条（Section/Tokens/Fonts/Weight 四格）。

### 适用场景
- 品牌设计系统文档首页 / 设计语言总览 / "这是一份声明"的权威页。
- 调性：克制、温暖、文档感、编辑级权威。
- 内容类型：品牌名 + 一段定位描述 + 4 个 meta 数据点。

### 代码骨架
```html
<section class="hero">
  <div class="hero-letter">H</div>            <!-- 单字母水印 -->
  <h1 class="fade-in">Haglöfs<br>Design Language</h1>
  <p class="fade-in fade-in-d1">户外品牌的视觉语言，不是风格选择，是立场声明。</p>
  <div class="hero-meta fade-in fade-in-d2">
    <div class="hero-meta-item">
      <div class="hero-meta-label">Section</div>
      <div class="hero-meta-value">8</div>
    </div>
    <!-- 重复 Tokens / Fonts / Weight ... -->
  </div>
  <div class="hero-line"></div>                <!-- 底部收口线 -->
</section>
```
```css
.hero{min-height:100vh;padding:128px 96px 64px;position:relative;
  display:flex;flex-direction:column;justify-content:center}
.hero-letter{position:absolute;right:96px;top:50%;transform:translateY(-50%);
  font-family:'Playfair Display',serif;font-size:clamp(200px,25vw,400px);
  font-weight:300;color:rgba(227,223,216,.5);line-height:1;letter-spacing:-0.06em;
  pointer-events:none;user-select:none}
.hero h1{font-family:'Playfair Display',serif;font-size:clamp(42px,6vw,80px);
  font-weight:300;line-height:1.02;letter-spacing:-2px;margin-bottom:24px;z-index:1}
.hero p{font-size:18px;color:var(--text-secondary);max-width:480px;line-height:1.7;z-index:1}
.hero-meta{display:flex;gap:48px;margin-top:64px;z-index:1}
.hero-meta-label{font-family:'JetBrains Mono',monospace;font-size:10px;
  letter-spacing:2px;text-transform:uppercase;color:var(--text-muted);margin-bottom:4px}
.hero-meta-value{font-family:'Playfair Display',serif;font-size:24px}
.hero-line{position:absolute;bottom:0;left:96px;right:96px;height:1px;background:var(--border)}
```

### 禁忌
- ❌ 浅底 Statement 不要配 KPI 数字大条——Statement 是"定性声明"，数字条属于 Pulse。meta 条只能是小号 4 格摘要。
- ❌ 单字母水印不要超过 1 个字母——多字母会变成 V1 的横线疏密或 V3 的巨字，失去 Statement 的"印章感"。
- ❌ 不要用 weight 600+ 的粗体标题——Statement 的权威感来自 weight 300 的纤细衬线 + 巨幅尺寸，粗体会变"海报口号"。

---

## V5 Pulse Hero（脉动 · 深底数据条）

### 视觉特征
- **标题**：衬线（Georgia），`clamp(3rem, 6vw, 5rem)` ≈ 48–80px，weight 400，关键词 `<strong>` 加重到 700 并染 olive `rgba(74,93,58,0.8)`。
- **装饰元素**：**脉动线**（顶部 `height:1px`，`background:rgba(74,93,58,.4)`，`animation:pulse 3s ease-in-out infinite` 在 opacity 0.3↔1 间呼吸）+ **巨字水印**（`::before` 伪元素 `content:'ANALYTICS'`，`clamp(8rem,20vw,22rem)`，weight 700，`color:rgba(255,255,255,.02)`）+ **3 格 KPI 数字条**（`hm__num` mono `clamp(2rem,4vw,3.5rem)` weight 600 + 标签 + 上下文）。
- **背景**：**深底**（`var(--pk)` `#2C2C2C` 炭色），文字 `#fff`，辅助文字白色透明阶梯。R3-数据分析中心的标志。
- **布局**：单列居中，顶部脉动线 + tag + 标题 + 底部 3 格 KPI 条（`border-top:1px solid rgba(255,255,255,.06)` 分隔）。

### 适用场景
- 数据分析中心 / 品牌表现仪表板封面 / "用数据说话"的报告首页。
- 调性：理性、监控感、活体仪表盘、沉稳但有生命迹象。
- 内容类型：一句数据化主张 + 3 个核心 KPI（覆盖率/组件数/场景适配）。

### 代码骨架
```html
<section class="hero">
  <div class="hero__pulse"></div>             <!-- 脉动线 -->
  <div class="hero__inner">
    <div class="hero__tag">Haglöfs · 品牌分析中心</div>
    <h1 class="hero__h">Data tells the<br>story of <strong>the wild.</strong></h1>
    <div class="hero__strip">
      <div>
        <div class="hm__lbl">品牌覆盖率</div>
        <div class="hm__num">94<span>%</span></div>
        <div class="hm__ctx">全球 28 个市场 · 同比 +12%</div>
      </div>
      <!-- 重复 2 个 KPI ... -->
    </div>
  </div>
</section>
```
```css
.hero{min-height:100vh;background:var(--pk);color:#fff;
  display:flex;flex-direction:column;justify-content:center;
  position:relative;overflow:hidden;padding:32px}
.hero::before{content:'ANALYTICS';position:absolute;top:-.08em;left:-.04em;
  font-family:var(--fd);font-size:clamp(8rem,20vw,22rem);font-weight:700;
  line-height:.8;letter-spacing:-.06em;color:rgba(255,255,255,.02);
  pointer-events:none;user-select:none}
.hero__pulse{position:absolute;top:0;left:0;right:0;height:1px;
  background:rgba(74,93,58,.4);animation:pulse 3s ease-in-out infinite}
@keyframes pulse{0%,100%{opacity:.3}50%{opacity:1}}
.hero__tag{font-family:var(--fm);font-size:12px;letter-spacing:.15em;
  text-transform:uppercase;color:rgba(255,255,255,.2);margin-bottom:48px;
  display:flex;align-items:center;gap:16px}
.hero__tag::before{content:'';width:32px;height:1px;background:rgba(255,255,255,.15)}
.hero__h{font-family:var(--fd);font-size:clamp(3rem,6vw,5rem);font-weight:400;
  line-height:1.05;letter-spacing:-.03em;max-width:700px;margin-bottom:64px}
.hero__h strong{font-weight:700;color:rgba(74,93,58,.8)}
.hero__strip{display:grid;grid-template-columns:repeat(3,1fr);gap:32px;
  border-top:1px solid rgba(255,255,255,.06);padding-top:32px}
.hm__num{font-family:var(--fm);font-size:clamp(2rem,4vw,3.5rem);font-weight:600;
  line-height:1;letter-spacing:-.03em}
.hm__lbl{font-family:var(--fm);font-size:10px;letter-spacing:.08em;
  text-transform:uppercase;color:rgba(255,255,255,.3)}
```

### 禁忌
- ❌ 脉动线不能用强对比色（必须 olive `rgba(.4)` + 低 opacity 呼吸）——高对比会变"故障报警"，破坏沉稳。
- ❌ KPI 条不要超过 3 格——超过 3 格变数据墙，失去"封面摘要"功能（详情留给后续 Compass/Elevation 区块）。
- ❌ 源样本明确 `rejected:"不用V6因为品牌数据需要突出发现不是水印"`——即 Pulse 的巨字水印是背景氛围（opacity .02），**绝不能让它抢过 KPI 数字**。

---

## V6 Slide Hero（幻灯式 · 深浅可切 · ghost 大字）

### 视觉特征
- **标题**：无衬线（system / PingFang / Helvetica），`56px`，weight 300，`line-height:1.05`，`letter-spacing:-2px`，`<strong>` 加重到 600。（注：V6 是 6 种里唯一以无衬线为主标题字体的变体。）
- **装饰元素**：**ghost 巨字水印**（`font-size:28vw`，weight 200，`opacity:0.04`，绝对定位 `right-top` / `left-bottom` / `center` 三种位置变体）——这是 V6 的灵魂装饰，可放品牌首字母或关键词。深底时 `opacity:0.08`。
- **背景**：**深浅可切**（`.slide` 默认浅 `--bg`，`.slide.dark` 切 `--bg-dark`）。这是 V6 区别于其他变体的核心：它服务于"连续翻页"场景，所以背景明暗随内容节奏切换。
- **布局**：`min-height:100vh` 单列，`padding:128px 96px`，内容 `max-width:1200px` 居中。可叠加 section-header（编号+标题网格）。

### 适用场景
- 知识模板 / 可复用演示稿 / 多页连续叙事（每页一个观点）。
- 调性：教学、传播、结构化梳理、北欧极简文档。
- 内容类型：每页一个主题（概念/对比/清单/术语表），ghost 大字做章节锚点。

### 代码骨架
```html
<section class="slide hero">
  <div class="ghost right-top">NORDIC</div>   <!-- ghost 水印 -->
  <div class="slide-content">
    <div class="section-header">
      <div class="section-num">01</div>
      <div class="section-title">北欧设计<strong>原则</strong></div>
    </div>
    <div class="header">
      <h1>Less, but <strong>better.</strong></h1>
      <p class="header-sub">极简不是减少，是精确。</p>
    </div>
    <!-- 后续 key-points / stat-grid 等 ... -->
  </div>
</section>
```
```css
.slide{min-height:100vh;padding:128px 96px;display:flex;flex-direction:column;
  justify-content:center;position:relative;overflow:hidden}
.slide.dark{background:var(--bg-dark);color:var(--text-inverse)}
.slide.hero{padding:96px}
.slide-content{max-width:1200px;margin:0 auto;width:100%;position:relative;z-index:2}
.ghost{position:absolute;font-size:28vw;font-weight:200;line-height:.85;
  letter-spacing:-0.05em;opacity:.04;pointer-events:none;z-index:1;user-select:none;
  color:var(--primary-stone)}
.ghost.right-top{right:-4vw;top:-8vh}
.ghost.left-bottom{left:-6vw;bottom:-12vh}
.slide.dark .ghost{opacity:.08;color:var(--text-inverse)}
.section-header{display:grid;grid-template-columns:140px 1fr;gap:64px;margin-bottom:64px}
.section-num{font-size:11px;letter-spacing:2px;text-transform:uppercase;
  color:var(--primary-stone)}
.section-title{font-size:32px;font-weight:300;line-height:1.3;letter-spacing:-0.5px}
.header h1{font-size:56px;font-weight:300;line-height:1.05;letter-spacing:-2px}
.header h1 strong{font-weight:600}
```

### 禁忌
- ❌ ghost 大字 opacity 不要超过 0.08——超过会与正文抢焦，V6 的 ghost 是"氛围锚点"不是"主视觉"。
- ❌ 不要在同一页放多个 ghost——一页一个水印锚点，多则乱。
- ❌ V6 不适合做"品牌数据封面"（源样本 R3 明确 rejected V6），因为 ghost 水印会淹没数据发现；数据场景必用 V5 Pulse。

---

## 选型决策树

拿到一个品牌页需求，按以下顺序判断：

```
【第 1 步：内容主轴是什么？】
│
├─ 数据 / 指标 / 仪表板封面 ────────────────► V5 Pulse Hero
│   （深底 + 脉动线 + 3 格 KPI；唯一带"活体呼吸感"的变体）
│
├─ 品牌宣言 / 设计系统文档 ────────────────► V4 Statement Hero
│   （浅底 + 单字母水印 + weight 300 细衬线 + 4 格 meta）
│
├─ 多项并列陈列（产品线/历史阶段/系列）────► V2 Grille Grid Hero
│   （浅底 + 4 列竖线格栅 + 激活项反白）
│
└─ 叙事 / 主张 / 案例 ──► 进入第 2 步
│
【第 2 步：叙事是否含"对立/张力"？】
│
├─ 是（自然vs科技 / 传承vs创新 / 主张vs引言）
│   └─ 是否有强视觉符号/引言放右侧？
│       ├─ 有 ─────────────────────────► V3 Split Hero（左文右深块）
│       └─ 无，纯仪式感开篇 ───────────► V1 Reveal Hero（深底全幅）
│
└─ 否（线性教学/连续翻页/知识模板）────────► V6 Slide Hero
    （深浅可切 + ghost 大字锚点 + 无衬线主标题）
```

**速记口诀**：
- **有数据 → Pulse（V5）**
- **有宣言 → Statement（V4）**
- **有矩阵 → Grille（V2）**
- **有张力 → Split（V3）**
- **有仪式 → Reveal（V1）**
- **要翻页 → Slide（V6）**

**明暗速查**：深底 = V1 Reveal / V5 Pulse；浅底 = V2 Grille / V4 Statement；分屏 = V3 Split（左浅右深）；可切 = V6 Slide。

---

## Hero 铁律（4 个不变量，所有变体都必须遵守）

> 这 4 条是从 6 种变体中提炼的**跨变体共性**。无论选哪种 Hero，违反任意一条即"出范式"。

### 铁律 1：100vh 高度锁死
- 所有 Hero `min-height:100vh`，撑满第一屏。移动端可放宽（`min-height:auto` + `padding-top:128px`），但桌面端不可塌缩。
- **目的**：Hero 是"品牌第一印象的仪式空间"，必须占满视口，不允许内容上推或下方区块上浮。

### 铁律 2：巨字水印（ghost letter / word）
- 每个 Hero 都有一个**超大尺寸、极低透明度**的装饰文字元素作为背景氛围层：
  - V1：横线疏密条（等效"线性水印"）
  - V2：格栅竖线（结构型水印）
  - V3：年份巨字 `clamp(80px,12vw,200px)` + 深块巨字 `clamp(120px,18vw,320px)`
  - V4：单字母 `clamp(200px,25vw,400px)`
  - V5：单词 `clamp(8rem,20vw,22rem)`
  - V6：ghost 词 `28vw`
- **透明度铁律**：浅底 `opacity 0.04~0.15`，深底 `opacity 0.02~0.08`。绝不超过 0.15。
- **目的**：巨字水印是 Haglöfs 范式的"签名笔触"——用衬线巨字做氛围，而非用图片/渐变。

### 铁律 3：tag 前缀线（24–32px 短横线）
- 每个 Hero 的标签（tag / section-label）前都有一条**短横线**：
  - `::before{content:'';width:24~32px;height:1px;background:品牌色/边框色}`
  - 配 `display:flex;align-items:center;gap:8~16px`
- tag 本身：mono 字体（JetBrains Mono），`10~12px`，`letter-spacing:.06~.15em`，`text-transform:uppercase`。
- **目的**：短横线是"测绘基准线"的视觉隐喻，统一所有变体的标签入口，建立秩序感。

### 铁律 4：衬线标题（V6 除外）
- Hero 主标题用衬线字体（Playfair Display / Georgia），weight 300–400（轻量），`letter-spacing:-2~-3px`（负字距收紧），`line-height:0.93~1.05`（极紧凑）。
- **唯一例外**：V6 Slide Hero 用无衬线（因为它服务于连续翻页教学场景，需要更强的"屏显可读性"而非"品牌仪式感"）。
- 关键词强调统一用 `<strong>` 加重到 600–700，可染品牌色（olive / forest）。
- **目的**：衬线 = 人的痕迹 = 品牌温度。这是 Haglöfs 区别于纯科技风（无衬线 + 几何）的核心识别。

---

*源样本索引：H042（V1 Reveal + 多变体母本）/ H061·H062（V4 Statement）/ R3-品牌展示 + H029（V3 Split / diagonal）/ R3-数据分析中心（V5 Pulse）/ H044（V3 Split）/ H047（V4 Statement + V6 Slide ghost 系统）。*
