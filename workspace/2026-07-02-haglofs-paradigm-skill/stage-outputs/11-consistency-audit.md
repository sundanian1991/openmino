# haglofs-paradigm 技能一致性审计报告

> 审计日期：2026-07-03 ｜ 审计范围：haglofs-paradigm 技能全部 18 个文件 ｜ 审计性质：只读审查（未修改任何文件）

---

## 一、审查方法

对 18 个文件逐段通读，按 7 个维度交叉比对：

| 维度 | 代号 | 检查内容 |
|------|------|---------|
| A | 版本标记残留 | v1.x/v2.x "新增"标记、"重构"标记、"补丁"标记等应清理但残留的版本注释 |
| B | 组件数量不一致 | 同一"组件总数"在不同文件给出不同数值 |
| C | 规则矛盾 | 同一规则在不同文件给出冲突指令（如 Hero 路由、间距梯队值、色板计数） |
| D | 未完成标记 | TODO / 待修 / 计划补全 / 骨架待补 / 留待后续迭代 |
| E | 过时引用 | 引用了已废弃的命名、计数、规则版本 |
| F | 重复内容 | 同一规则/内容在多个文件重复出现 |
| G | 文件内部新旧拼接痕迹 | 同一文件内新旧规则并存（旧规则未删，新规则追加） |

**基准真源确认**（用于判定"哪个是对的"）：
- 组件总数 = **40**（16 数据导向 + 9 品牌叙事 + 4 文档展示 + 11 editorial），以 SKILL.md frontmatter + 各 rules-components*.md 标题行为准。
- 亮色总数 = **17 亮色** + 5 深色覆写 = 22 处，以 rules-color.md §1.1 + token-root.css 为准。
- Hero 声明/宣言路由 = **V3 Split**（v1.7 重构后），以 SKILL.md L122 + rules-hero.md L357 + intake-rules.md L66 为准。
- 间距梯队 = **1/2/4/8/16/24/32/48/64/96/120px**（11 级 `--s-3xs..--s-5xl`），以 token-root.css + paradigm-boundary.md Step 0 裁决为准。

---

## 二、致命问题（会直接导致施工出错）

| # | 问题 | 涉及文件 | 矛盾详情 | 严重度 |
|---|------|---------|---------|--------|
| F1 | **Hero 声明/宣言路由矛盾** | craft-checklist.md L36 (H4) + paradigm-boundary.md L114 (Step 2) **vs** SKILL.md L122 + rules-hero.md L357 + intake-rules.md L66 | H4 写「宣言→Statement」；Step 2 写「品牌宣言/设计系统文档→V4 Statement」；但 SKILL/rules-hero/intake 均写「声明/宣言类默认 **V3 Split**（v1.7 重构，非 V4），V4 仅用于设计系统文档首页」。**craft-checklist 和 paradigm-boundary 未跟进 v1.7 变更，仍路由到 V4。** | 🔴 致命 |
| F2 | **色板亮色计数矛盾** | paradigm-boundary.md L11 **vs** rules-color.md L7/L13 | paradigm-boundary 写「15 亮色 + 5 深色覆写」；rules-color 写「17 亮色 + 5 深色覆写（v1.9 新增 2 档 forest-soft/moss-soft）」。**paradigm-boundary 未跟进 v1.9 新增 2 色。** | 🔴 致命 |
| F3 | **组件数量在 4 处过时** | brand-brief-template.md L74 + intake-rules.md L79 + rules-components-docs.md L4 + rules-components.md L103 | 见下方"组件数量不一致"表。**4 个文件给出 5 种不同的组件计数口径。** | 🔴 致命 |
| F4 | **幽灵组件引用（v2.1 计划未交付）** | rules-components.md L111/L114/L116/L130/L132 | 选型决策树引用「Compass Trend / Heatmap Matrix / Action Grid」标注「v2.1 计划」，L132 写「骨架待 v2.1 补全」——但 v2.1 已发布（现 v2.2），这 3 个组件从未交付。**选型树引导 agent 去找一个不存在的组件骨架。** | 🟠 高危 |
| F5 | **间距梯队样本内含被禁值** | rules-narrative.md L126-129 (§3.2) | §3.2 把样本遗留的 `--s3:12px; --s5:20px; --s10:40px; --s20:80px` 作为「Token 化体系完整定义」展示——但 paradigm-boundary.md Step 0 和 CP1 红线明确禁止 12/20/40/80px（仅 11 级梯队值合法）。**叙事规则卡自身展示了被禁间距值，且未标注其为遗产。** | 🟠 高危 |
| F6 | **padding 系统内部矛盾** | paradigm-boundary.md A8 红线 L41 **vs** Step 0 L98 + B4 L63 | A8 红线说「走 8px 基准梯队（80/96/120）」，B4 说「数据页 80px」，Step 0 裁决说「禁止 80px（非梯队值）」。**80px 这个值在红线里是合法底线，在 Step 0 裁决里是禁值——同一文件自相矛盾。**（根因：token-root 梯队不含 80px，但 A8 红线把 80px 当历史底线保留。） | 🟠 高危 |

---

## 三、版本标记残留（维度 A）

以下版本标记散布在正文规则中，属于"迭代过程注释"而非面向施工者的规则信息。**标记本身不算错，但让文件读起来像开发日志而非交付文档。**

| # | 文件 | 行号 | 残留标记内容 | 性质 |
|---|------|------|------------|------|
| 1 | SKILL.md | L108-109 | 「v1.9」叙事描述中的版本标注 | 信息噪音 |
| 2 | SKILL.md | L122 | 「v1.7 重构，非 V4」 | 可清理（规则已生效） |
| 3 | SKILL.md | L131 | 「v2.1 新增 3 个」 | 可清理 |
| 4 | SKILL.md | L134-135 | 组件列表后的「v2.0 新增」「v2.1」标注 | 可清理 |
| 5 | craft-checklist.md | L15 (C3) | 「（v1.9 新增）」嵌入检查项正文 | 可清理 |
| 6 | rules-color.md | L7 | 「v1.9 新增 2 处浅底品牌档」 | 可清理 |
| 7 | rules-color.md | L13 | 「§1.1 标题·v1.9 新增 2 档」 | 可清理 |
| 8 | rules-color.md | L32-33 | 表格行内「（v1.9 新增）」×2 | 可清理 |
| 9 | rules-color.md | L37 | 「Brand-Soft 浅底软档说明（v1.9 新增）」 | 可清理 |
| 10 | rules-color.md | L181 | 「D9·浅底绿色强调用什么？（v1.9 新增）」 | 可清理 |
| 11 | rules-color.md | L215 | 页脚「v1.9（2026-07-03）新增 forest-soft/moss-soft」 | 可清理 |
| 12 | rules-hero.md | L349 | 「选型决策树 v2（偏好优先·v1.7 重构）」 | 可清理 |
| 13 | rules-hero.md | L371 | 「关键变更（vs v1.6）」整段变更日志 | 可清理（变更日志属 SKILL.md） |
| 14 | rules-hero.md | L420-445 | 「Hero 装饰层子构件（v2.1 组件化）」 | 可清理 |
| 15 | rules-narrative.md | L177 | 「整页深色模式例外（v2.0 新增）」 | 可清理 |
| 16 | rules-narrative.md | L305 | 「CP6 可判定版（v2.0 新增·NC-11）」 | 可清理 |
| 17 | rules-components.md | L4 | 标题行内「· v2.2」「v2.0 新增」「v2.1 新增」×3 | 可清理 |
| 18 | rules-components.md | L22 | 「组件设计宪法（v2.1 新增·第一性原理）」 | 可清理 |
| 19 | rules-components.md | L55 | 「radius 三级公约（v2.1 新增）」 | 可清理 |
| 20 | rules-components.md | L65 | 「深底反相通用原则（v2.1 新增）」 | 可清理 |
| 21 | rules-components.md | L452/L609 | 「editorial 改造（v2.2·质感提升）」×2 | 可清理 |
| 22 | rules-components.md | L692 | 「Elevation Profile·v2.0 新增」 | 可清理 |
| 23 | rules-components.md | L755 | 「Seam Benchmark·v2.0 新增」 | 可清理 |
| 24 | rules-components.md | L854 | 「Stat Grid·v2.1 新增」 | 可清理 |
| 25 | rules-components-brand.md | L4 | 「v2.1 新增 3 个」 | 可清理 |
| 26 | rules-components-brand.md | L184/L224/L268 | 「·v2.1 新增」×3（组件标题行） | 可清理 |
| 27 | rules-components-editorial.md | L6 | 「Full-bleed Image（v2.1 新增）」 | 可清理 |
| 28 | rules-components-editorial.md | L516 | 「Full-bleed Image·v2.1 新增」 | 可清理 |
| 29 | rules-brand-color-mapping.md | L5 | 「出处：v1.9 新增」 | 可清理 |
| 30 | rules-brand-color-mapping.md | L62 | 「### 色彩映射（v1.9）」 | 可清理 |
| 31 | rules-brand-color-mapping.md | L76 | 页脚「v1.9」 | 可清理 |
| 32 | intake-rules.md | L3 | 「haglofs-paradigm v1.5 新增」 | 可清理 |
| 33 | intake-rules.md | L64/L66 | 「决策树 v2（…v1.7 重构）」「（v1.7 重构，非 V4）」×2 | 可清理 |
| 34 | paradigm-boundary.md | L82 | 「间距 token 双系统冲突裁决（FZ-1/QY-1 补丁·v1.1）」 | 可清理 |

**版本标记残留总计：34 处**（分布在 10 个文件中）。

> 注：evolution-log.md 的版本标记（E1-E21 "发现来源"列）属于历史日志的本质属性，不计入残留。SKILL.md 底部的 v1.0-v2.2 完整变更日志同理，属正常结构。

---

## 四、组件数量不一致（维度 B/E）

**真源口径：40 = 16 数据 + 9 品牌 + 4 文档 + 11 editorial**

| # | 文件 | 行号 | 写的口径 | 正确口径 | 偏差 |
|---|------|------|---------|---------|------|
| 1 | SKILL.md | L6 | 40（16+9+4+11） | 40 | ✅ 正确 |
| 2 | rules-components.md | L4 | 16 个数据导向 | 16 | ✅ 正确 |
| 3 | rules-components.md | L103 | 「25+ 组件不用全翻」 | 40 | ⚠️ 过时（v2.0 时代数，未更新） |
| 4 | rules-components-brand.md | L4 | 9 个品牌叙事 | 9 | ✅ 正确 |
| 5 | rules-components-docs.md | L4 | 数据导向「12 个」+ 品牌叙事「6 个」 | 16 + 9 | ❌ **过时（v1.2 时代口径）** |
| 6 | rules-components-editorial.md | L8 | 16 + 9 + 4 | 16 + 9 + 4 | ✅ 正确 |
| 7 | rules-components-editorial.md | L596 (页脚) | 10（5 长文 + 5 报告） | 11 | ❌ **页脚未更新**（CT-3 Full-bleed Image 已在 L6 加入） |
| 8 | intake-rules.md | L79 | 35（15 数据 + 6 品牌 + 4 文档 + 10 editorial） | 40（16+9+4+11） | ❌ **全面过时** |
| 9 | brand-brief-template.md | L74 | 35（15 数据 + 6 品牌 + 4 文档 + 10 editorial） | 40（16+9+4+11） | ❌ **全面过时** |

**不一致文件：5 处（L103 过时 + L4 docs 过时 + L596 editorial 页脚过时 + intake L79 过时 + brand-brief L74 过时）**

口径漂移模式：intake-rules 和 brand-brief-template 停在 v2.0 前的「15+6+4+10=35」；docs 停在 v1.2 的「12+6」；editorial 页脚停在 v2.0 的「10」；selection tree 标题停在 v2.0 的「25+」。**每加一批组件，旧文件的计数都没有回溯更新。**

---

## 五、未完成标记（维度 D）

| # | 文件 | 行号 | 标记内容 | 性质 |
|---|------|------|---------|------|
| 1 | rules-components.md | L111 | 「Compass Trend（v2.1 计划）」 | ⛔ 幽灵组件——v2.1 已过，未交付 |
| 2 | rules-components.md | L114 | 「Heatmap Matrix（v2.1 计划）」 | ⛔ 幽灵组件——同上 |
| 3 | rules-components.md | L116 | 「Action Grid（v2.1 计划）」 | ⛔ 幽灵组件——同上 |
| 4 | rules-components.md | L130 | 「Compass Trend(入口·v2.1 计划) / Heatmap Matrix(分布·v2.1 计划) / Action Grid(行动·v2.1 计划)」 | ⛔ 幽灵组件——叙事链引用 |
| 5 | rules-components.md | L132 | 「骨架待 v2.1 补全」 | ⛔ 过期承诺——v2.1 已发布 |
| 6 | craft-checklist.md | L25 (T2) | 「Georgia（降级预览且有 TODO 标注）」 | ⚠️ TODO 标注引用——指施工者自己标 TODO，非技能内部 TODO |
| 7 | paradigm-boundary.md | L153 | 「没有 Georgia…（除非明确是降级预览并有 TODO 标注）」 | ⚠️ 同上 |
| 8 | SKILL.md | L369 | 「留待后续迭代」 | ⚠️ v1.3 变更日志中的遗留——P2×3 未处理项 |
| 9 | paradigm-boundary.md | L82-98 | 「v1.1 补丁」整段间距双系统裁决 | ⚠️ 补丁应已被吸收为正式规则，仍以"补丁"形式存在 |

**真正有害的未完成标记：#1-5（幽灵组件，会误导施工）。** #6-7 是面向施工者的指令（让用户标 TODO），不算技能内部债。#8 在历史日志里可接受。#9 是补丁未转正。

---

## 六、过时引用（维度 E）

| # | 文件 | 行号 | 过时内容 | 应更新为 |
|---|------|------|---------|---------|
| 1 | paradigm-boundary.md | L11 | 「15 亮色 + 5 深色覆写」 | 17 亮色 + 5 深色覆写（见 F2） |
| 2 | paradigm-boundary.md | L11 | 「12 级 8px 基准间距梯队」 | 11 级（token-root 真源梯队） |
| 3 | rules-components-docs.md | L4 | 「数据导向（12 个）+ 品牌叙事（6 个）」 | 16 个 + 9 个（见 F3） |
| 4 | rules-components-editorial.md | L596 | 「10 组件（5 长文 + 5 报告）」 | 11 组件（5 长文 + 5 报告 + 1 通用视觉） |
| 5 | intake-rules.md | L79 | 「35 组件（15+6+4+10）」 | 40 组件（16+9+4+11） |
| 6 | brand-brief-template.md | L74 | 「35 组件（15+6+4+10）」 | 40 组件（16+9+4+11） |
| 7 | rules-components.md | L103 | 「25+ 组件」 | 40 组件 |
| 8 | paradigm-boundary.md | L41 (A8) | 「走 8px 基准梯队（80/96/120）」 | 与 Step 0 的 11 级梯队对齐（见 F6） |
| 9 | paradigm-boundary.md | L63 (B4) | 「数据页 80px（--s20）」 | --s20 已废弃，80px 不在 token-root 梯队 |
| 10 | rules-narrative.md | L126-129 | --s3:12px / --s5:20px / --s10:40px / --s20:80px | 标注为"样本遗产"或替换为梯队值 |

---

## 七、重复内容（维度 F）

| # | 内容 | 出现位置 | 重复程度 | 问题 |
|---|------|---------|---------|------|
| D1 | **浅底绿色强调规则（forest-soft/moss-soft D9）** | rules-color.md L181-189 (D9 专节) + rules-brand-color-mapping.md L19/27-31 + craft-checklist.md L15 (C3 内嵌) + SKILL.md L108 | **4 处** | C3 把 D9 全文压缩进 checklist 检查项，rules-brand-color-mapping 又引用对比度值。任一处更新，其他易漏。 |
| D2 | **--brand-accent 受限例外规则** | rules-brand-color-mapping.md L38-53 (专节) + rules-color.md D9 尾部 + SKILL.md L109 | **3 处** | 同一规则散在 3 个文件，措辞略有差异（rules-brand-color-mapping 最完整）。 |
| D3 | **间距梯队 11 级值表** | paradigm-boundary.md L88-97 (Step 0) + rules-components-docs.md L5/L140 + rules-components.md + rules-components-editorial.md L596 | **4+ 处** | 虽然值都一致（1/2/4/8/16/24/32/48/64/96/120px），但完整梯队表在多处复制粘贴。 |
| D4 | **Hero 6 变体清单 + 选型口诀** | SKILL.md L122 + paradigm-boundary.md L60 (B1) + paradigm-boundary.md L114-120 (Step 2) + rules-hero.md L349-370 | **4 处** | B1 表格、Step 2 口诀、rules-hero 决策树三处描述同一选型逻辑，但路由结论不一致（见 F1）。 |
| D5 | **组件设计宪法 + radius 三级公约** | rules-components.md L22-64 + rules-components-docs.md L21 (引用) + rules-components-brand.md (引用) + SKILL.md L143-145 | **4 处** | 定义在 rules-components.md，其他文件用"见 rules-components.md"引用——引用方式正确，但 SKILL.md 又把摘要复述了一遍。 |
| D6 | **间距 token 双系统裁决** | paradigm-boundary.md L82-98 (Step 0 补丁) + rules-narrative.md §3.2 (展示旧系统) | **2 处** | paradigm-boundary 说"禁止用 --s1..--s24"，但 rules-narrative §3.2 仍把 --s1..--s24 作为"Token 化体系完整定义"展示——两处对同一套旧 token 的态度相反。 |

---

## 八、文件内部新旧拼接痕迹（维度 G）

| # | 文件 | 位置 | 新旧拼接详情 |
|---|------|------|------------|
| S1 | **paradigm-boundary.md** | Step 0 (L82-98) vs A8 (L41) + B4 (L63) | Step 0 用 v1.1 补丁裁决了"禁止 80px、以 11 级梯队为准"，但 A8 红线和 B4 表格仍保留「80px」「80/96/120」「--s20」等旧梯队口径。**同一文件：Step 0 已升级到新标准，A8/B4 停在旧标准。** |
| S2 | **rules-narrative.md** | §3.2 (L126-129) vs 全文其他间距引用 | §3.2 展示 `--s1..--s24`（含 12/20/40/80px）作为"完整定义"，但 CP1 红线（同文件内）写"间距梯队 1/2/4/8/16/24/32/48/64/96/120px，禁 5/7/10/12/13/20/40/80px"。**§3.2 展示的值被 CP1 禁止——同文件内自相矛盾。** |
| S3 | **rules-components-editorial.md** | L8 (标题行) vs L596 (页脚) | 标题行已更新为「11 个」（v2.1 加了 CT-3 Full-bleed Image），但页脚仍写「10 组件（5 长文 + 5 报告）」。**头部已升级，尾部未跟进。** |
| S4 | **rules-components.md** | L4 (标题) vs L103 (选型树标题) | 标题已更新为「16 个数据导向组件」，但选型树标题仍写「25+ 组件」。**正文已升级，选型树标题停在 v2.0。** |
| S5 | **rules-components.md** | L130-132 (选型树) vs 实际组件 | 选型树引用「Compass Trend / Heatmap Matrix / Action Grid」标注「v2.1 计划」，但 v2.1/v2.2 实际交付的是 Stat Grid / editorial 变体 / Dot Table 等。**选型树的"计划"指向从未兑现的组件，实际交付的组件未进入选型树。** |
| S6 | **craft-checklist.md** | C3 (L15) | C3 原本是 forest 配额检查项，后被 v1.9 的 forest-soft/moss-soft 规则（D9）整段追加进 C3 正文。**C3 变成了一个混合体：原始 forest 配额 + 追加的 D9 浅底绿色规则——信息密度过高，单条 checklist 承载了两条规则。** |

---

## 九、总结

### 数据汇总

| 指标 | 数值 |
|------|------|
| **致命问题数** | **6**（F1-F6） |
| **版本标记残留** | **34 处**（10 个文件） |
| **组件数量不一致** | **5 处**（intake-rules / brand-brief-template / rules-components-docs / rules-components-editorial 页脚 / rules-components 选型树标题） |
| **未完成标记** | 5 处幽灵组件 + 4 处其他 |
| **过时引用** | 10 处 |
| **重复内容** | 6 组（D1-D6） |
| **文件内新旧拼接** | 6 处（S1-S6） |

### 整体"大杂烩"严重度：**7 / 10**

技能的设计 DNA 本身是扎实的——组件分类、色板体系、叙事弧线、token 真源这些底层架构清晰且自洽。问题出在 **迭代过程中的"补丁式更新"模式**：每次加新组件/新规则时，只改了当前操作的文件，没有回溯更新所有引用旧口径的文件。这导致：

1. **计数系统全面漂移**——组件数（35→40）、色板数（15→17）、间距级数（12→11）在 4-5 个文件里各停在迭代的不同阶段。
2. **关键路由规则分裂**——Hero 声明/宣言路由在 3 个文件说 V3、2 个文件说 V4，施工者读哪份就照哪份做。
3. **版本注释侵入正文**——34 处版本标记让规则文档读起来像 git commit message。
4. **幽灵承诺悬空**——v2.1 计划的 3 个组件从未交付，但选型树仍把它们当可选组件引导。

### 最该优先修的 5 个问题

| 优先级 | 修复项 | 理由 |
|--------|--------|------|
| **P0** | **统一 Hero 声明/宣言路由为 V3 Split**（改 craft-checklist H4 + paradigm-boundary Step 2） | 直接决定用哪个 Hero 母版，当前两套文件给相反指令，施工必出错 |
| **P1** | **统一组件计数为 40**（改 intake-rules L79 + brand-brief-template L74 + rules-components-docs L4 + rules-components-editorial L596 + rules-components L103） | 5 处过时计数会误导组件选型范围 |
| **P2** | **清理幽灵组件**（rules-components L111/L114/L116/L130/L132：删除 Compass Trend / Heatmap Matrix / Action Grid 或改为「v2.3 backlog」） | 选型树引导 agent 找不存在的骨架 |
| **P3** | **统一色板计数为 17 亮色**（改 paradigm-boundary L11） | 与 rules-color 的 17 色对齐 |
| **P4** | **修复间距梯队矛盾**（rules-narrative §3.2 标注为"样本遗产"或替换为梯队值 + paradigm-boundary A8/B4 的 80px 问题做裁决） | 同一文件内 CP1 禁止的值在 §3.2 被当作标准展示 |

---

*审计完成。本报告为只读审查产出，未修改任何技能文件。*
