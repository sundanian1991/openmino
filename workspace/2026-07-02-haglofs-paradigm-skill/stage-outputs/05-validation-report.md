# 迁移验证报告 · Fjällräven

> 目的：用刚建好的 `haglofs-paradigm` 技能为 Fjällräven（北欧户外品牌，与 Haglöfs 同范式不同品牌）施工一个完整品牌页，并**检验技能的规则/母版/检查清单是否够用、哪里卡壳**。
> 验证页面：`validation-page.html`（889 行）
> 验证日期：2026-07-02

---

## 一、工作流执行记录（Step 1-4 每步做了什么 + 卡壳点）

### Step 1 · 选 Hero（查 rules-hero.md 选型决策树）

**做了什么**：按决策树第 1 步判断内容主轴。Fjällräven 素材"品牌宣言偏多"→ 决策树明确指向 **V4 Statement Hero**（有宣言→Statement）。

**选定**：V4 Statement Hero。
- 浅底 offwhite + 单字母水印（"F"）+ Playfair weight 300 细衬线 + 4 格 meta。
- 用 `master-templates/hero-statement.html` 做骨架。

**为什么不选 Reveal**：任务提示"有传承仪式感 → 也可 Reveal"，但 Reveal 是深底仪式。决策树第 1 步已用"宣言"主轴锁定 Statement，且"品牌宣言/设计系统文档 → V4"是树的第一命中分支。**决策树是"首命中标"原则，一旦第 1 步命中就不再走第 2 步**——这是我在执行中内化的判断（规则没明说，是隐性规则，记为**规则盲区 #1**）。

**✅ 流畅**：选型决策树清晰，6 变体口诀好记。

### Step 2 · 取品牌 DNA（查 paradigm-boundary.md Step 3 B 表）

**做了什么**：确认页面类型 = 品牌叙事/展示页，查 B 表联动组锁定一组选择：

| 维度 | 选定值 | 出处 |
|------|--------|------|
| padding | 120px（`--s-5xl`） | R3-3 品牌页大呼吸 |
| 分隔 | 背景色切换 | B5 品牌叙事 |
| 宽度 | 单一 1120px | R3-6 品牌页 |
| 动画 | Hero fade-in（仅 Hero） | B8 |
| 网格 | 大间距留白 40-80px gap | R3-5 |
| .cmp | 可省 | B11 |

**🟡 卡壳点（间距 token 双系统冲突 · 规则模糊点 #1）**：
- `token-root.css` 的间距 token 是 `--s-xs:4px … --s-5xl:120px`（11 级，含 120）。
- 但 `rules-narrative` 和 `rules-components` 引用的是另一套 `--s1:4px … --s24:96px`（12 级，含 80，无 120）。
- paradigm-boundary B 表说"品牌页 120px"，但 120 只存在于 token-root 系，不在 narrative/components 引用的 `--s*` 系。
- 我用 Step 0"token-root 是唯一真源"裁定：**用 token-root 的 `--s-*`**。但这个裁定是凭真源优先级直觉做的，**boundary.md 没有明确写"两套 spacing 冲突时以 token-root 为准"**。这是真模糊。

### Step 3 · 叙事施工

**做了什么**：用 Statement Hero 母版 + rules-components 组件，组装 8 个 content section + 深色 footer。深浅节奏：

```
Hero(L offwhite) → ② Tension(D charcoal) → ③ Prose(L) → ④ Principles(L cream)
→ ⑤ Grille(L) → ⑥ Timeline(L cream) → ⑦ Manifesto(D charcoal) → ⑧ Commit(L) → Footer(D black)
```

深段：②、⑦、Footer，**全部孤立**（②后接③浅、⑦后接⑧浅、Footer 是终局）。✅ N4 满足。

**叙事弧**：Hero 声明 → ②概念建立（张力）→ ③④⑤资产（起源/哲学/产品）→ ⑥时间维度（传承类必有，R1-3）→ ⑦金句呼吸谷 → ⑧价值观升华（R1-2）→ Footer 深色收尾。✅ 符合 rules-narrative 品牌弧线。

**🟡 卡壳点（母版缺陷 #1）**：`master-templates/hero-statement.html` **只提供 Hero 区块**，不提供 section 框架（`.section`/`.section__inner`/padding/单一宽度容器）。8 个 content section 的"外壳"我得自己从 rules-narrative 的 R3-3/R3-6 规则推导出来。**母版 = Hero 专用骨架，不是"页面骨架"**——技能缺少一个"section frame 母版"。

**🟡 卡壳点（组件缺失 #1）**：rules-components 的 12 个组件里**没有"金句/宣言独立 section"骨架**。最接近的是 Callout（内联提示框）和 Tension Prose（长文）。但金句呼吸谷（S7）是"深底 + 巨字水印 + 单句宣言 + 仪式感"，这是一个独立 section 类型，不是内联组件。我**把 Statement Hero 的结构内化成了一个 in-page manifesto section**——这个推导规则没覆盖。

**🟡 卡壳点（组件缺失 #2）**：**没有 Footer 骨架**。rules-components 12 组件全是内容组件，无收尾 footer。我手写了 footer（wordmark + 三列链接 + bottom bar），结构参考样本但无规则卡指导。

**🟡 卡壳点（组件缺失 #3）**：**没有"编号原则卡/Principle 卡"骨架**。rules-components 有 Pipeline（流程步骤栈），但"品牌设计原则 4 条并列展示"不是流程。我用 `step-num + 文字` 自行组装了 Principle 卡。样本 H061/H062 有 principle 段，但规则卡没把它提炼成组件。

### Step 4 · 红线自检（craft-checklist.md 33 项）

逐条跑 33 项（见下节）。**初检 28/33 直接通过，5 项需判断**，最终 33/33 通过。

**🟡 卡壳点（检查项歧义 #1）**：**CP1 梯队值与 token-root 间距值不一致**。
- checklist CP1 写梯队 = `4/8/12/16/20/24/32/40/48/64/80/96px`。
- token-root spacing = `1/2/4/8/16/24/32/48/64/96/120px`。
- **两组数字不同**：checklist 有 20/40/80（token-root 无）；token-root 有 120（checklist 无）。
- 我用了 120px（section padding）和 48/80px（gap），按 token-root 真源判通过，但 checklist 字面会判"120 非梯队"= ✗。**这是 checklist 与 token 真源的硬冲突**。

**🟡 卡壳点（检查项歧义 #2）**：**T5"字号用 clamp，无固定 px 硬编码"**。
- 但 rules-typography 明确写"section-tag / eyebrow 10–12px 固定"、"正文 14-18px"。
- eyebrow 10-11px、body 14px 这些**本就是范式规定的固定值**，不可能 clamp（小字 clamp 没意义）。
- checklist T5 字面会判这些固定 px 为 ✗，但它们符合范式。
- 我把所有"标题级"字号改成 clamp（hero/title/principle/timeline），eyebrow/body 按 rules-typography 保持固定 px。**T5 应限定为"标题级字号用 clamp"，但 checklist 没写这个限定**。

---

## 二、craft-checklist 结果（33 项逐条 ✓/✗）

### 一、色彩（8 项）
- ✓ **C1** 页面主底色 `var(--color-offwhite)`（Hero + 多数 section），无纯白/冷灰做整页底
- ✓ **C2** 零裸 `#hex`（grep 验证：除 token-root link/comment 外无硬编码）
- ✓ **C3** forest 仅在小面积（tag 线/eyebrow/`.grille-item--active`/`strong`/commit 数字），单页 ≤15%
- ✓ **C4** charcoal 用于 Tension/Manifesto 深段，black 用于 Footer（终局），未互换
- ✓ **C5** 深底文字全走 `--text-inverse`/`--text-inverse-2`，无 charcoal 字落 charcoal/black
- ✓ **C6** forest 与 moss 无大面积相邻平铺（moss 只在深底 tag/圆点/`strong`）
- ✓ **C7** Signal 色仅 footer 链接 hover 用 `--color-signal-blue`（1 处，仅链接），全页 ≤2
- ✓ **C8** 无渐变/装饰阴影/模糊（grep 验证零 gradient；阴影未用）

### 二、排版（6 项）
- ✓ **T1** 正文全 Inter（`.prose p`/`__desc`），无 Playfair 做正文
- ✓ **T2** 大标题 Playfair + 负字距（`-0.02em`/`-2px`）+ `line-height ≤1.05`
- ✓ **T3** 全大写 tag/eyebrow 用 JetBrains Mono + `--ls-wider`(0.2em)/`--ls-wide`(0.06em)
- ✓ **T4** 所有 tag 有前缀线（`.tag::before`/`.hero__tag::before`/`.manifesto__tag::before`/`.footer__col-title::before` 全 32/24px）
- ✓ **T5** 标题级字号全 clamp；eyebrow/body 固定 px 符合 rules-typography 规定（**见检查项歧义 #2**，按语义判通过）
- ✓ **T6** 关键词强调全 `<strong>`（染 forest/moss），无斜体/下划线/色块高亮做标题强调

### 三、Hero（5 项）
- ✓ **H1** Hero `min-height:100vh`（移动端合法例外 `min-height:auto`）
- ✓ **H2** Hero 有装饰深度层（单字母水印 "F" + tag 前缀线 + 底部收口线）
- ✓ **H3** 浅底水印 opacity 0.14（区间 0.04-0.15 内）✓
- ✓ **H4** Statement Hero 符合"宣言"内容主轴（决策树命中）
- ✓ **H5** 浅底与"声明/陈列"场景匹配 ✓

### 四、组件（5 项）
- ✓ **CP1** 间距走 token-root 梯队（**见检查项歧义 #1**，按真源判通过；用值 8/16/24/32/48/64/80/96/120px 全在 token-root 内）
- ✓ **CP2** Tension Grid 2 列 ×4 item，深色 charcoal 背景 ✓
- ✓ **CP3** 无 Callout 使用（本页无数据组件，故无孤立问题）
- ✓ **CP4** class 名用范式命名（`.tension-grid`/`.grille-grid`/`.prose`/`.timeline`/`.principle`），结构符合骨架
- ✓ **CP5** 无 Data Table（本页无表格组件）

### 五、叙事节奏（5 项）
- ✓ **N1** 8 个 content section（品牌页 7-8 区间内）✓
- ✓ **N2** section padding 120px（≥80px，走梯队）✓
- ✓ **N3** Hero 后第二段是概念建立（Tension Grid 张力），非直接数据 ✓
- ✓ **N4** 无连续 2 个深色 section（深段 ②⑦Footer 全孤立）✓
- ✓ **N5** Footer 深色（black）收尾，有升华段（⑦ 金句 + ⑧ 可持续）✓

### 六、工程基线（4 项）
- ✓ **E1** 单文件自包含，零框架（仅 Google Fonts + token-root.css link）
- ✓ **E2** 有 :root token 引用（通过 token-root.css），body 引用 token
- ✓ **E3** 双断点响应式（1024px 平板 / 768px 手机）
- ✓ **E4** radius ≤8px（本页仅 commit 圆点 `border-radius:50%` 为 pill 形状，符合 `--r-full` 例外；卡片无大圆角）

### 计分：**33/33 通过 ✓**

（5 项需结合语义判断：T5 固定 px、CP1 间距梯队——均因"checklist 与真源/规则卡字面冲突"需裁定，非真违规。详见检查项歧义。）

---

## 三、质感评估（vs H061 水准）

### 达到的水准
- **色彩克制**：温润米白主底 + forest 小面积点缀 + charcoal/black 节奏断点，与 H061 同源。零硬编码、零渐变——这是范式最硬的指标，已达标。
- **字体角色分工**：Playfair 标题 / Inter 正文 / JetBrains Mono 标签，三体递进在每个 section 一致执行。
- **测绘基准线**：tag 前缀线（32px 短横线）贯穿所有 section，建立了秩序锚点。
- **Hero 仪式感**：100vh + "F" 单字母巨字水印（0.14 opacity）+ weight 300 细衬线 + 4 格 meta，H061 的标志特征齐备。
- **叙事弧线**：声明→概念→资产→时间→价值观→收束，符合品牌页 8 段范式。

### 差距（与 H061 的距离）
1. **装饰丰富度略单薄**：H061 的 Hero 有斜切深块 + 年份巨字 + 点阵 + 几何符号多层装饰；本页 Hero 只有单字母水印 + 收口线两层。Statement 母版本身较克制，但相比 H061 的"丰盛仪式"少了 1-2 层深度。
2. **巨字水印层次**：H061 深底 hero-right 有 `clamp(120px,18vw,320px)` 的多层巨字；本页深段（Tension/Manifesto）的装饰只有 manifesto 的 "F" 巨字，Tension 段无装饰层（靠纯深色 + 内容）。可加一条疏密线或角标提升深度。
3. **缺乏 .cmp 自标注**：品牌页可省（B11），但 H061 的同类页若有组件自标注会更"工程感"。本页为纯品牌叙事故省略，属合理取舍。
4. **数字质感**：H061 有 numerals 段（Playfair 大数字 + Mono 标签）的"权威数字"展示；本页 commit 段有 2 个大数字（95%/100%）但量级和排版密度不及 H061 numerals。

### 主观评分：**7.5 / 10**

- 色彩/字体/结构纪律：9/10（范式核心已扎实落地）
- 装饰深度与仪式感：6.5/10（比 H061 的丰盛层略薄）
- 叙事节奏：8/10（弧线完整，呼吸谷到位）
- 组件运用：7/10（缺 Principle/Footer/Manifesto 官方骨架，靠推导完成，质感略"欠打磨"）

**结论**：作为"用技能施工"的首个验证页，达到"范式内、可交付"水准，但距 H061 的"博物馆级陈列"还差 1-2 层装饰深度和官方组件骨架。这差距**主要来自技能资产不完整**（缺组件骨架），而非范式本身的问题。

---

## 四、技能缺陷清单

### 规则模糊点（3 条）

| # | 缺陷 | 表现 | 影响 |
|---|------|------|------|
| FZ-1 | **间距 token 双系统冲突未裁决** | token-root 用 `--s-xs..--s-5xl`（含 120）；narrative/components 引用 `--s1..--s24`（含 80，无 120）。boundary B 表未明确"冲突时以 token-root 为准" | 施工者不知用哪套，易混用 |
| FZ-2 | **Statement Hero 字号"固定 px"与 T5"clamp"冲突** | rules-typography 规定 eyebrow 10-12px / body 14px 固定；但 checklist T5 要求"无固定 px 硬编码" | 小字是否必须 clamp 不明确，易误判 |
| FZ-3 | **决策树"首命中标"原则未声明** | 决策树第 1 步命中 Statement 后是否还走第 2 步（张力→Split）？规则未说 | 多个分支同时可能命中时无裁决规则 |

### 母版缺陷（2 条）

| # | 缺陷 | 表现 | 影响 |
|---|------|------|------|
| MT-1 | **母版只含 Hero，缺 section frame 母版** | `hero-statement.html` 仅 Hero 区块，无 `.section`/容器/单一宽度的标准外壳 | 8 个 section 外壳全靠施工者从 rules 推导，一致性靠运气 |
| MT-2 | **缺"完整页面组装示例"** | 无一个"Hero + 多 section + Footer"的端到端母版，施工者要自己拼 | 新手易在 section 衔接、深浅节奏、footer 结构上失手 |

### 组件缺失（3 条）

| # | 缺陷 | 表现 | 影响 |
|---|------|------|------|
| CP-1 | **缺 Manifesto/Quote 金句 section 骨架** | rules-components 12 组件无"深底 + 巨字水印 + 单句宣言"的独立 section（最接近是 Callout 内联框） | 品牌页核心的"金句呼吸谷"无官方骨架 |
| CP-2 | **缺 Footer 骨架** | 12 组件全是内容组件，无收尾 footer（wordmark+链接列+bottom bar） | 每页 footer 都要手写，结构不统一 |
| CP-3 | **缺 Principle 卡骨架** | 样本 H061/H062 有 principle 段，但规则卡未提炼"编号原则卡"组件 | 品牌价值观展示无标准件 |

### 检查项歧义（2 条）

| # | 缺陷 | 表现 | 影响 |
|---|------|------|------|
| QY-1 | **CP1 梯队值与 token-root 间距值字面冲突** | checklist 写 `4/8/12/16/20/24/32/40/48/64/80/96`；token-root 是 `1/2/4/8/16/24/32/48/64/96/120`。20/40/80 与 120 互不在对方表里 | 用 120px section padding 会被 checklist 字面判 ✗（实际合规） |
| QY-2 | **T5 未区分"标题级"与"eyebrow/body 级"** | T5 笼统要求"无固定 px"，但 eyebrow/body 固定 px 是范式规定 | 合规的 10-14px 固定字号会被误判违规 |

### 规则盲区（2 条）

| # | 缺陷 | 表现 | 影响 |
|---|------|------|------|
| BL-1 | **非 Haglöfs 品牌如何"换皮"未说明** | 技能名为 haglofs-paradigm，但本任务是 Fjällräven。换品牌时 forest 主色是否保留？品牌色映射规则缺失 | 我直接用了 Haglöfs 的 forest 作 Fjällräven 主色——但 Fjällräven 的品牌色其实是更深沉的 forest/ochre，技能没给"品牌色映射"指引 |
| BL-2 | **section 内部装饰层（非 Hero）的规则缺失** | 铁律 2 只规定 Hero 必有装饰层；但 H061 的内容 section 也有疏密线/角标。内容 section 要不要装饰层？规则空白 | 我的 content section 多数无装饰层，可能比样本单薄 |

**缺陷总计：12 条**（规则模糊 3 / 母版缺陷 2 / 组件缺失 3 / 检查项歧义 2 / 规则盲区 2）

---

## 五、v1.1 迭代建议（基于缺陷，列出该补什么）

### 🔴 P0（阻塞施工，必须补）

1. **补"间距 token 唯一真源声明"**（修 FZ-1 + QY-1）
   - 在 paradigm-boundary.md Step 0 加一句：**"两套 spacing token（token-root `--s-*` 与样本遗留 `--s1..--s24`）冲突时，一律以 token-root.css 的 `--s-*` 为准。"**
   - 同步修正 craft-checklist CP1 的梯队值，与 token-root 对齐：`1/2/4/8/16/24/32/48/64/96/120px`。
   - 这是当前最阻塞的歧义——直接影响施工者能不能判自己的间距合规。

2. **补 section frame 母版 + 完整页面组装示例**（修 MT-1 + MT-2）
   - 新增 `master-templates/section-frame.html`：标准 `.section`（padding 120px / `.section__inner` max-width 1120px / `.section--cream`/`--dark` 变体）。
   - 新增 `master-templates/page-assembly.html`：一个端到端"Statement Hero + 3-4 section + 深色 Footer"的最小可用页面，作为"组装范式"的参考。

### 🟡 P1（显著提升施工一致性，建议补）

3. **补 3 个缺失组件骨架**（修 CP-1/2/3）
   - `Manifesto/Statement Section`（深底金句呼吸谷）：深底 + 巨字水印 + 单句宣言 + signoff。
   - `Footer`：wordmark + N 列链接 + bottom legal bar，深色 black 收尾。
   - `Principle Cards`：编号原则卡（grid 2×N，step-num + title + desc），区别于 Pipeline（流程）。

4. **修 T5 检查项措辞**（修 FZ-2 + QY-2）
   - 改为：**"标题级字号（≥18px）用 clamp(min,vw,max) 响应式；eyebrow/data 标签（≤12px）与 body（14-18px）可用固定 px（符合 rules-typography 规定）。大数字可 clamp 到 200px+。"**

### 🟢 P2（完善体验，可补）

5. **补"品牌色映射"指引**（修 BL-1）
   - 在 SKILL.md 或新建 `references/brand-adaptation.md`：当为非 Haglöfs 品牌施工时，如何把该品牌的 VI 色映射到 forest/moss/slate 语义槽（如 Fjällräven 的深 forest → `--color-forest`，北极狐 ochre → 可否新增 accent）。

6. **明确决策树"首命中标"原则**（修 FZ-3）
   - 在 rules-hero.md 决策树前加一句：**"按第 1→2 步顺序判断，首个命中的分支即为选定变体，不再继续后续分支。"**

7. **补"内容 section 装饰层"软规则**（修 BL-2）
   - 在 rules-narrative 或 rules-components 加：**"内容 section 可选 1 个轻装饰层（角标/疏密线/小水印），但非必需；Hero 装饰层是铁律，内容 section 是弹性。"**

---

## 附：验证元数据

| 项 | 值 |
|----|----|
| 验证页 | `validation-page.html` |
| 行数 | 889 |
| content section 数 | 8 |
| craft-checklist | 33/33 ✓（5 项需语义裁定） |
| 质感自评 | 7.5 / 10 |
| 技能缺陷 | 12 条（P0×2 / P1×2 / P2×3 修复项） |
| Hero 选型 | V4 Statement（决策树首命中标） |
| 深段序列 | ② Tension(charcoal) · ⑦ Manifesto(charcoal) · Footer(black)，全孤立 |

---

*验证人：haglofs-paradigm 技能验证任务 · 2026-07-02*
