# First Spread Review

审阅对象：`article/Cover.tsx` · `article/Article.tsx`（Hero+Lead+Quote）· `article/sections/01-idea.tsx`
主题 press · 版式 wide · 配图 none · 封面开 · 类型 explainer

## 总体结论
**pass-with-fixes**

首屏定调质量高：标题有判断力、Lead 清晰框定全文、第一节正文是真正主体、Raw 视觉块目的明确且全程用 token、封面构图呼应"25 透镜"主旨。token 纪律整体扎实（所有颜色/字号/间距均走 `--ra-*`，hex 只作为 fallback）。但有 **2 处必须修复** 才适合进 Checkpoint 2：封面网格实际只画了 24 个节点（与"25 透镜"主旨冲突），以及第一节 Raw 用了 ❌/✅ emoji（违反 press 禁止项）。两处都是小切片改动，不影响结构。

---

## 逐项检查

### 封面
- **[1] 3:4 比例 + 外壳没动：pass** — `aspectRatio: "3 / 4"`（Cover.tsx:17）保留；`maxWidth: min(100%, 48rem, calc((100vh - 8rem) * 3 / 4))`（Cover.tsx:14）与 `references/cover.md` 硬约束逐字一致；margin/border/overflow 外壳未改（Cover.tsx:15,21,18）。内部元素全部用百分比 / inset / grid / flex，无写死绝对像素位置。
- **[2] 图文并茂：pass** — 视觉主体是 SVG 25 节点网格（5×5 + 5 家族色带 + 引导线 + 收束线，Cover.tsx:51-138）；文字层有 kicker（:166）、h1（:179）、副题（:191）、4 个数字徽章（:203-206）。截掉任一层另一层仍独立成立，非纯文字。
- **[3] 主题忠实（只用 `--ra-*` token）：pass** — 颜色只用 `--ra-color-accent / --ra-color-fg / --ra-color-muted / --ra-color-border`；字号 `--ra-text-*`；字重 `--ra-font-weight-*`；字体 `--ra-font-serif / --ra-font-mono`。所有 hex（`#8B2C2C`、`#2a2a2a`）仅作为 `var(..., fallback)` 的兜底值，符合"除 token fallback 值外"的豁免。无写死字体名、无写死像素字号。
- **[4] 内容忠实（呼应"25 个思维透镜"）：fail** — 视觉构思高度忠实（5×5 网格 + 5 家族色带 + "25 把钥匙"标题 + 25/5/7/5 徽章），看一眼能猜出主题。**但 `lenses` 数组（Cover.tsx:32-38）只有 24 个标签**：最后一行 `Mt, Sc, Cr, Sl` 只有 4 个（idx 20-23），第 5 列空缺，网格实际渲染成"4 整行 + 1 半行"。这与徽章/标题反复声称的"25 透镜"自相矛盾，是内容保真 bug。详见必须修复。
- **[5] 不承担正文：pass（轻微 nit）** — 没塞 TOC / 阅读时间 / Lead 段落。副题（:191）"一套带强制门的跨职业认知协议系统——每个透镜是一台 3–6 步的微型思维算法，有语言约束、有异质性检查、有冲突焊接"信息量略密、且与 Hero 副题（Article.tsx:18）共享"强制门的跨职业认知协议系统"措辞，属轻微重复。属 hook 级 tagline、可接受，但建议把副题再压短一点、与 Hero 副题错开角度，让封面更像钩子而非准 Lead。

### 首屏（Hero + Lead + Quote）
- **[6] 标题气质：pass** — "思维透镜：25 把看问题的钥匙"点了主题（thinking lenses）且带判断/比喻（"钥匙"），不是泛泛名词。
- **[7] Lead 框定全文：pass** — Lead（Article.tsx:26-30）一句话点痛点（"误以为看到的就是全部"）、给出反差（"不是换标签，是加载 25 套认知协议"）、明示全文交付物（"拆解运作机制…把'换个角度'变成带强制门、有质量检查、能反复稳定的工程"）。读者知道要讲什么、带走什么。
- **[8] meta 信息：pass** — 主题=thinking-lenses 技能详解、基础=Scott H. Young · 25 Thinking Tools、日期=2026-07-07。三项均合理，标明对象、来源依据、日期。
- **[9] Quote 位置：pass（轻微 nit）** — Munger 引言（Article.tsx:32-34）紧跟 Lead，因 Lead 已在文中引述"查理·芒格说…"，引言紧随其后属自然收束。轻微点：Lead 已转述 Munger、紧跟完整英文原句略有重复感，但作为锚定可接受。

### 第一节
- **[10] 正文是主体：pass** — 5 个 prose 段（01-idea.tsx:7-11, 12-18, 19-22, 143-148, 150-155）系统讲清：浅层 vs 深层、认知协议（医生六步例）、技能真正单位（25 套微型算法而非 25 视角）、异质性检查硬性规则、蜡烛实验 / 功能性固化。正文明显是主体，Aside 与 Raw 起增强。
- **[11] Raw 视觉块目的明确：pass** — 双栏对比（01-idea.tsx:29-141）左"浅层做法"（Doctor/Engineer/Hacker 三个换皮问句）右"深层做法"（Doctor 六步协议），直接服务于本节核心论点；收尾 caption（:139）"thinking-lenses 只承认右边"把图焊回正文。是内容、非装饰。
- **[12] Raw 用 token：pass** — 视觉块内颜色全走 `--ra-color-border / --ra-color-accent / --ra-color-muted / --ra-color-fg`；间距 `--ra-space-*`；字号 `--ra-text-*`；字重 `--ra-font-weight-*`。无写死颜色。
- **[13] Aside 用法：pass** — 仅 1 处 Aside（:24-27，tone=principle / label=设计哲学），内容是核心判断点睛（"职业只是认知原理的载体…25 个透镜是 25 把钥匙，开的是 25 类不同的锁"）。用在该用处，未堆叠。
- **[14] 与 Lead 衔接：pass** — 第一节开头"多数人对'换个角度想问题'的理解停留在表面…"直接承接 Lead 结尾的"'换个角度'这件模糊的事"，无突兀。
- **[15] press 主题气质：fail** — 结构层面非常 press：以线代框（双栏用 `borderTop: 2px solid` 作分栏线，:43,84）、无卡片投影、无填色面板、无圆角，编辑感强。**但双栏标签用了 emoji ❌（:55）和 ✅（:96）作好坏标记**，press.md 明确禁止"emoji / 图标当装饰"。属可快速修的禁止项违规。详见必须修复。

---

## 必须修复的点（fail 项）

- **`article/Cover.tsx:32-38` — 封面网格只有 24 个透镜标签，第 25 个缺失**
  问题：`lenses` 数组末行仅 4 个（`Mt, Sc, Cr, Sl`），5×5 网格最后一行第 5 列空缺，实际渲染 24 节点，与标题/徽章/主旨反复声称的"25 透镜"自相矛盾，破坏内容忠实（[4]）。
  建议修法：补上第 25 个透镜缩写到数组（按 thinking-lenses 实际第 25 个透镜的缩写；如 Skill 中确为 25 个，取其正确 2 字母缩写，使 5 行各 5 列完整）。

- **`article/sections/01-idea.tsx:55,96` — Raw 块用 ❌/✅ emoji 作标签，违反 press 禁止项**
  问题：press.md 禁止项明确列"emoji / 图标当装饰"；这两个 emoji 是定调样张，若不在此修，会被后续 9 节复制扩散。
  建议修法：去掉 emoji，改用纯 token 化标记。例：左栏标签保留文字"浅层做法"配 `--ra-color-muted` 细线（已是 :43 的 border 线，无需额外标记）；右栏"深层做法"配 `--ra-color-accent`（已是 :84 accent border + :93 accent 文字，识别度足够）。或用一个 accent 色小圆点 / 「✕」「✓」字符（非 emoji）替代，保持 press 出版物质感。

## 建议优化（可选）
- `Cover.tsx:191` 副题信息略密且与 Hero 副题（`Article.tsx:18`）措辞重叠，可压短一句、改换角度，让封面更像钩子而非准 Lead（呼应 [5]）。
- `Article.tsx:26-34` Lead 已转述 Munger、紧跟完整 Munger 英文引言略带重复感，可考虑把 Lead 中对 Munger 的转述精简为引子、把"更多思维模型…"的完整判断留给 Quote，避免同义信息连说两遍（呼应 [9]）。
- `01-idea.tsx:139` 收尾 caption 用了"只承认右边"，与 [15] 同源——确保去掉 emoji 后左右两栏仍能被读者无歧义区分（建议保留 accent 色 border 作为唯一区分线索，足以胜任）。
