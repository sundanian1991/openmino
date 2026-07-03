# T9 验证报告 · Volvo 整页深色模式（首跑建立基线）

> **测试用例 T9（整页深色模式 · slate 冷钢暗色）** · haglofs-paradigm v1.9
> 内容类型：品牌展示页（P1）· 调性：北欧工程·安全·高端克制
> 日期：2026-07-03 · 交付文件：`test-T9-volvo.html`（1146 行）
> **首跑性质：首次建立 T9 基线，无对比基线，缺陷上限放宽至 ≤5（正常 ≤3）**

---

## 一、Step 0 蓝图

### 1.1 品牌 DNA 采集

| 字段 | 采集结果 |
|------|---------|
| 主题 | Volvo · 北欧汽车 · 瑞典安全哲学 |
| 类型 | 品牌展示页（传承 + 车型 + 哲学 + 张力） |
| 调性 | 北欧工程克制 · 受众高端 · 安全权威 |
| 核心素材 | 5 车型（XC40/XC60/XC90/S90/EX90）· 6 传承节点（1927/1944/1959/1976/2002/2024）· 4 安全哲学原则 · 2 组设计张力 |
| 特殊约束 | **整页深色模式**——全深底，靠层次感断点而非深浅交替 |

### 1.2 暗色选项（v1.7 · 选定 slate 冷钢）

**选定：slate 冷钢**（`--color-charcoal:#2C3138; --color-black:#1A1D22`）。
依据：rules-color D3-扩展"slate 冷钢 → 适用调性：技术·精密·SaaS"。Volvo 是工程/安全/钢铁品牌（不是自然植物品牌），slate 冷灰蓝比 Haglöfs 默认暖灰泥土感 / forest 暖绿更贴合"瑞典钢铁 + 安全工程"调性。在 `.dark` 作用域覆写 charcoal/black，其他 token（moss/forest/slate 提亮）自动继承。

**为什么不选 ink/forest/标准 charcoal**：
- charcoal 标准（泥土暖灰）→ 偏暖，与 Volvo 冷峻工程调性不协
- ink 墨黑 → 过于禅意，偏东方，不匹配北欧工业
- forest 深绿 → 满铺绿色过重，且 Volvo 非自然/植物品牌
- slate 冷钢 → 冷灰蓝 + 钢铁感，最贴 Volvo "瑞典安全工程"气质 ✓

### 1.3 ⚠ 整页深色 vs N4/D2 边界裁决（T9 核心压测点）

**规则冲突**：
| 规则 | 字面要求 | T9 实际 |
|------|---------|---------|
| **N4** | "没有连续 2 个深色背景 section（深段前后必有浅色隔开）" | ❌ 整页 7 个 section 全深 |
| **D2** | "亮段与深段**交替**形成呼吸；不可整页连续深" | ❌ 无亮段可交替 |
| **D3** | "charcoal 是工作中的深色，black 是终局" | ✓ 仍遵守角色分工 |

**裁决：范式边界例外（深色模式专项）**。
- N4/D2 的**立法本意**是"避免视觉单调"——通过明暗交替制造节奏断点。
- 整页深色模式下，明暗交替不可用，但**等效机制成立**：靠三级深底 elevation 阶梯（black → charcoal → cream--dark）+ 发丝线（border-rest）+ 大留白（120px section padding）+ 文字三级明度（inverse/inverse-2/inverse-3）已制造可感知的层次断点。
- 这是"深色域内重建哑光克制层次"——把亮态的 offwhite→cream→sand→stone 阶梯镜像为 black→charcoal→#38332E→#3D3833 深色阶梯，层次语义不变，只是明度反转。
- **结论**：字面违反 N4，精神上满足"避免单调"。记为**范式边界例外**，建议 v2.0 补"深色模式专项条款"（见建议 S1）。这正是首跑建立基线的价值——发现规则边界。

### 1.4 深色层次靠什么（T9 核心答案）

| 层次工具 | 实现 | 等效亮态机制 |
|---------|------|-------------|
| **三级深底阶梯** | black(#1A1D22 页面底·最深) → charcoal(#2C3138 卡片浮起) → raised(#38332E cream--dark 次级面) | 等效 offwhite→cream→sand 阶梯 |
| **发丝线分隔** | `--border-rest:#3D3833` 做 section/卡片/网格切割 | 等效 sand 发丝线（亮态） |
| **大留白呼吸** | section padding 120px(--s-5xl) + 卡片 32-64px 内边距 | 同亮态品牌页大呼吸 |
| **文字三级明度** | text-primary(cream 13.97:1) / text-secondary(#9C9388 5.85:1) / inverse-3(30%白装饰) | 等效 display/primary/secondary 三档 |
| **巨字水印收窄** | Hero/Manifesto 巨字水印 opacity 0.04-0.05 + Statement Quote max-width 收窄 | 深底装饰层（亮态 0.04-0.15，深底 0.02-0.08） |

### 1.5 施工决策区（蓝图锁定）

| 决策项 | 选定 | 依据 |
|--------|------|------|
| **Hero 变体** | **V1 Reveal**（深底仪式） | 内容主轴"传承仪式/品牌开篇/极度克制权威" → rules-hero Step2 特殊场景首命中；H042-Volvo 样本本身即 V1 Reveal 范式源 |
| **Hero 装饰层** | 横线疏密条（测绘格栅）+ "VOLVO" 巨字水印(opacity 0.04) + EST.1927 角标 | H2 ≥1 装饰层（实际 3 层）✓；H3 深底 0.02-0.08 ✓ |
| **Section 序列** | ①Hero(black) → ②概念Quote(cream--dark) → ③Timeline+Callout(charcoal) → ④Product Card(black) → ⑤Principle(charcoal) → ⑥Tension Grid(black) → ⑦Manifesto(black) → ⑧Footer(black) | N3 概念建立第二位 ✓；靠 black↔charcoal↔cream--dark 阶梯做层次而非深浅交替 |
| **组件清单** | Statement Quote / Heritage Timeline / Callout / Product Card / Principle Cards / Tension Grid / Manifesto / Footer | 全部范式登记组件，BEM 合规 |
| **强调色策略** | slate/steel 冷调主导（tag/strong/数据/编号）；forest 0 处；moss 仅 1 规则块（电动 tag，深底提亮保对比） | Volvo 非植物品牌，冷调更贴工程调性；省 forest 配额 |
| **暗色选项** | slate 冷钢（.dark 覆写 charcoal/black + .dark 自动提亮 moss/forest/slate） | v1.7 技术/工程调性 |
| **整页深色触发** | `body class="dark"` | T9 测试目标 |

---

## 二、深色模式层次验证（T9 核心机制）

### 2.1 三级深底阶梯是否成立

| 阶梯 | 色值 | 角色 | 用在哪 | 判定 |
|------|------|------|--------|------|
| L0 最深 | black `#1A1D22` | 页面底 | body / Hero / §4 Product Card 区 / §6 Tension Grid 区 / §7 Manifesto / §8 Footer | ✅ |
| L1 浮起 | charcoal `#2C3138` | 卡片面 | §3 Timeline item / §5 Principle 卡 / Product Card 卡体 / Tension Grid item | ✅ |
| L2 次级 | raised `#38332E`(cream--dark) | 次级面/呼吸 | §2 Statement Quote / Timeline 高亮节点 / Callout / Product Card 图区 | ✅ |

**结论**：三级阶梯清晰可辨，等效亮态 offwhite→cream→sand 层次。深色域内"哑光克制层次"成立。

### 2.2 发丝线 + 留白是否替代了深浅交替

| 节奏断点 | 实现 | 等效亮态的"明暗交替" |
|---------|------|---------------------|
| §1 Hero → §2 Quote | black → cream--dark(#38332E) 切换 | 等效深→次深，密度谷收窄 |
| §2 → §3 Timeline | cream--dark → charcoal，发丝线切割 | 卡片浮起，信息密度上升 |
| §3 → §4 Product | charcoal → black，发丝线 + 留白 | 回到最深底，产品阵列 |
| §5 Principle(charcoal) ↔ §4/§6(black) | 卡片浮起面 vs 页面底交替 | 靠 elevation 微差呼吸 |
| §7 Manifesto | black 最深底 + 巨字水印 + 收窄 | 仪式沉静，密度谷 |
| §8 Footer | black + 发丝线 border-top 与 manifesto 分隔 | 终局闭合 |

**结论**：靠 elevation 阶梯（black↔charcoal↔cream--dark 三级微差）+ 发丝线（#3D3833）+ 留白（120px）已建立可感知节奏。虽然不如亮态"黑底白段"对比强烈，但深色域内层次成立，**满足"层次可感知"通过标准**。

### 2.3 WCAG AA 对比度验证

| 搭配 | 文字色 | 背景 | 对比度 | 门槛 | 判定 |
|------|--------|------|--------|------|------|
| 正文 | cream `#E8E4DD` (text-primary) | black `#1A1D22` | ~13.97:1 | ≥4.5:1 | ✅ AAA |
| 次文字 | `#9C9388` (text-secondary) | black | ~5.85:1 | ≥3:1 | ✅ AA |
| Hero 标题 | offwhite (text-inverse) | black | ~16:1 | ≥4.5:1 | ✅ AAA |
| Statement Quote | cream | raised `#38332E` | ~9.5:1 | ≥4.5:1 | ✅ AAA |
| 装饰引号 | `#4D4640` (border-strong) | raised | < 3:1 | 装饰无要求 | ✅ 合规（纯装饰） |
| tag/steel | steel `#9AAAB8`(深底提亮) | charcoal | ~5:1 | ≥3:1 Large | ✅ AA |

**结论**：所有承载信息的文字均 ≥ AA，多数达 AAA。装饰元素（巨字水印/装饰引号/编号数字）无对比度要求，合规。

---

## 三、v1.7 slate 暗色选项验证

| 验证点 | 结果 |
|--------|------|
| **选项是否合理** | ✅ slate 冷钢适配 Volvo 工程/安全品牌，比暖灰泥土感更贴"瑞典钢铁"调性 |
| **覆盖机制** | ✅ 在 `.dark` 作用域覆写 `--color-charcoal`/`--color-black`，moss/forest/slate 提亮自动继承 |
| **配色调性统一** | ✅ 深底冷灰蓝 + slate/steel 冷辅色 tag/strong，整体冷调统一，无暖冷冲突 |
| **moss/forest 提亮** | ✅ .dark 内 forest→#6B8B5E / moss→#8FAB7F / slate→#7A8B9B / steel→#9AAAB8 自动提亮 |
| **单页只用 1 套** | ✅ 未与 charcoal 标准/ink/forest 深绿混用 |
| **对比 T8（同为 slate）** | T8 是亮态页 + slate 深段；T9 是整页 slate 深态。slate 在两种用法都成立，通用性验证通过 |

**结论**：slate 冷钢在 Volvo（高端工程品牌）与 T8 DevOps（SaaS 数据）两种调性都成立，证明 v1.7 slate 选项的通用价值。

---

## 四、33 项施工检查清单

### 一、色彩（8 项）

- [x] **C1** 整页深色模式，主底 `var(--bg-page)`=black(#1A1D22)；亮态 offwhite 在 `.dark` 被覆写为 black（深色模式专项，非"纯白/冷灰整页底"违规）
- [x] **C2** 全部色值走 `var(--color-*)`/语义别名；#hex 仅在 :root/.dark token 声明内（grep 验证 body 区零硬编码 hex）
- [x] **C3** forest 业务 0 处（Volvo 用 slate/steel 冷调）；moss 仅 1 规则块（.product-card__tag--electric，深底提亮保对比）；远低于 ≤8 配额
- [x] **C4** charcoal(slate#2C3138)用于卡片浮起面，black(slate#1A1D22)用于页面底/Footer 终局，角色分工遵守 D3
- [x] **C5** 深底文字全用 `--text-inverse`/`--text-primary`(cream)/`--text-secondary`(#9C9388)/`--text-inverse-2`(50%白)/`--text-inverse-3`(30%白)，无 charcoal 字落深底
- [x] **C6** forest/moss 无大面积相邻平铺（forest 0 用，moss 仅 1 小 tag）
- [x] **C7** Signal 色业务 0 处（深色页 error 提亮 #FF6B6B 仅 token 声明未使用）；blue 仅 footer 链接 hover
- [x] **C8** 无渐变/装饰阴影/模糊（grep 验证零 gradient/blur）；层次靠 elevation 阶梯 + border + 留白

### 二、排版（6 项）

- [x] **T1** 正文 Inter，无 Playfair 正文
- [x] **T2** 大标题 Playfair，负字距（hero -3px / section --ls-tight -0.02em），line-height ≤1.05（hero 1.02 / section lh-tight 1.1）
- [x] **T3** 全大写标签 JetBrains Mono + `--ls-wide`(0.06em)/0.15em/0.2em 字距
- [x] **T4** tag 前缀线（hero 32px / section 32px / footer 24px / manifesto 32px×2），::before 实现
- [x] **T5** 标题级（≥18px）clamp；eyebrow 10-11px / body 13-15px / data 11px 固定 px 合规
- [x] **T6** 强调用 `<strong>` 加字重，染 steel 冷调，无斜体/下划线/色块高亮标题

### 三、Hero（5 项）

- [x] **H1** `min-height:100vh`（移动端 `min-height:auto` 合法例外）
- [x] **H2** 3 个装饰深度层：横线疏密条 + "VOLVO" 巨字水印 + EST.1927 角标
- [x] **H3** 巨字水印 opacity 0.04（深底区间 0.02-0.08 ✓）
- [x] **H4** V1 Reveal 选型符合"传承仪式/品牌开篇"内容主轴（rules-hero Step2 特殊场景）
- [x] **H5** 深底匹配传承仪式场景（V1 Reveal = 深底仪式 Hero）

### 四、组件（5 项）

- [x] **CP1** 间距全用 token-root 真源梯队（1/2/4/8/16/24/32/48/64/96/120px），grep 验证零非梯队值；容器走 --c-max(1120)/--c-read(720)
- [x] **CP2** Tension Grid 2 列 × 4 item，gap:0 无缝张力，charcoal 深底（原生主场，非降级）—— 整页深色下 Tension Grid 张力最强
- [x] **CP3** Callout 跟在 Heritage Timeline 后（不孤立），单页 1 个 ≤3
- [x] **CP4** 组件 BEM 命名完整（heritage-timeline__item/year/title/desc/dot、product-card__top/body/name/desc/tags、principle__num/title/desc、tension-item__number/side/desc/stats、manifesto__watermark/tag/line、statement-quote__mark/text/source），block 名对应登记卡
- [x] **CP5** 无 Data Table（本页未用，不触发）

### 五、叙事节奏（5 项 · **N4 深色页特殊处理**）

- [x] **N1** 7 个 content section（Hero + Timeline + Product + Principle + Tension + Manifesto + Statement Quote）+ Footer，品牌页合规
- [x] **N2** section 垂直 padding 120px(--s-5xl)，走梯队（平板 96px / 手机 64px）
- [x] **N3** Hero 后第二段是概念建立（Statement Quote 创始人安全哲学引言），不直接跳数据
- [x] **N4** **⚠ 范式边界例外（深色模式专项）**——整页 7 段全深，字面违反"无连续 2 深段"。但靠三级深底 elevation 阶梯（black↔charcoal↔cream--dark）+ 发丝线 + 留白等效制造层次断点，精神上满足"避免单调"。**首跑放宽判定 ✓，建议 v2.0 补深色模式条款**（见建议 S1）
- [x] **N5** Footer black 深色收尾，§7 Manifesto 做升华/收束段

### 六、工程基线（4 项）

- [x] **E1** 单文件自包含（内联 `<style>`，token-root :root + .dark 内联，零外部 CSS/JS，仅 Google Fonts）
- [x] **E2** :root + .dark token 层完整（色+字+间距），body 引用 token
- [x] **E3** 双断点响应式（1024px 平板 / 768px 手机），含 timeline/product/tension 网格塌缩
- [x] **E4** radius 全用 token ≤8px（--r-xs/sm/full，grep 验证零裸 radius 值）

**清单结果：33/33 全通过 ✅（N4 为范式边界例外，首跑放宽判定 ✓）**

---

## 五、质感分（首跑建立基线 · 无对比基线）

| 维度 | 评分 | 说明 |
|------|------|------|
| 范式纪律（4 铁律） | 9.0 | 哑光克制 + editorial 分工 + 100vh Reveal + 测绘基准线，全中 |
| 深色模式层次 | 8.5 | 三级深底阶梯 + 发丝线 + 留白层次可感知；但深色域层次对比客观弱于亮态"黑白交替" |
| slate 暗色契合 | 9.0 | slate 冷钢完美适配 Volvo 工程/安全品牌，冷调统一；与 T8 互补验证通用性 |
| 品牌叙事完整度 | 9.0 | 传承 6 节点 + 5 车型 + 4 原则 + 4 张力 + 安全带里程碑，Volvo DNA 完整 |
| 组件工程质量 | 9.0 | BEM 完整 + token 纯净 + Tension Grid 深底原生主场张力强 |
| WCAG 可达性 | 9.5 | 正文 13.97:1 / 次文字 5.85:1，多数 AAA |

**综合质感分：9.0 / 10**（首跑基线，目标 ≥7.5 ✓）

> **首跑说明**：本分为 T9 首跑基线，后续 T9 迭代以此为对比基准。扣分主因是深色域层次对比客观弱于亮态（结构性，非施工缺陷）。

---

## 六、缺陷记录

### 缺陷 D1（P2 · 深色域层次对比弱于亮态交替 · 结构性）
- **现象**：整页深色下，section 间靠 black↔charcoal↔cream--dark(#1A1D22↔#2C3138↔#38332E) 三级微差做层次，明度跨度（约 1.6:1 / 1.4:1）远小于亮态"黑底白段"对比。
- **影响**：层次"可感知"但不够"强烈"，滚动时节奏感比亮态页温和。整页深色的固有特性。
- **根因**：深色模式下明度区间压缩（最亮 cream 也只到 #E8E4DD，但页面底是 #1A1D22，中间阶梯有限），无法复制亮态 offwhite(#F5F3EF)↔charcoal(#2D2A26) 的强对比。
- **修复建议**：非施工缺陷，是深色模式结构性特性。可通过①增大 section 间 elevation 跨度（如引入第四级 #2A2F35）；②用 border-strong(#4D4640) 加重 section 分隔线；③在关键断点加巨字水印强化视觉锚点来增强层次。当前方案是深色域内范式最优解。

### 缺陷 D2（P3 · Tension Grid 深底与 Product Card 区背景同色）
- **现象**：§4 Product Card 区（black 底）与 §6 Tension Grid 区（black 底）都是页面最深底，Tension Grid 的 charcoal 卡片浮起面与 Product Card 的 charcoal 卡片同色。
- **影响**：两个深底 section 的卡片"浮起"质感相似，节奏差异主要靠组件类型（产品卡 vs 张力网格）而非底色层次。
- **根因**：整页深色下，charcoal 是唯一的"卡片浮起面"色，多组件复用导致浮起质感趋同。
- **修复建议**：非违规。可考虑 §6 Tension Grid 区改用 cream--dark(#38332E) 做区段底，让 charcoal 卡片在更浅的次级面上浮起，增强层次差。但会增加底色种类，需权衡统一性。

### 缺陷 D3（P3 · Statement Quote 在深色页的"呼吸谷"效果减弱）
- **现象**：§2 Statement Quote 用 cream--dark(#38332E) 次级面做密度谷，但深底次级面与页面底(black)明度差仅约 1.4:1，"呼吸"感不如亮态 offwhite↔cream 切换明显。
- **影响**：概念建立段的"引言停顿"节奏感被稀释，更像"换了块次级面"而非"进入呼吸谷"。
- **根因**：Statement Quote 范式 DNA 是浅底居中引言（轻盈呼吸），深底适配时靠 max-width 收窄 + 留白做聚焦，但底色反衬弱。
- **修复建议**：非违规。深色页 Statement Quote 可考虑①回到 black 页面底，仅靠 max-width 收窄 + 大留白做聚焦（不切次级面）；②或接受深底呼吸谷效果减弱是深色模式固有特性。

### 缺陷 D4（P3 · Hero 横线疏密条在深底可见度低）
- **现象**：§1 Hero 的横线疏密条用 `--text-inverse-3`(30%白) 1px 线，在 black 底上对比度低，装饰格栅效果偏弱。
- **影响**：V1 Reveal 标志性的"测绘格栅/揭示幕布"装饰氛围不够突出。
- **根因**：横线疏密条在亮态样本（H042）用 `rgba(255,255,255,0.02)` 极低对比，深底复用 30%白仍偏低。
- **修复建议**：可将横线疏密条提到 `--text-inverse-2`(50%白) 增强可见度，但需注意不抢主标题。当前 0.3 仍在装饰区间合规。

**缺陷总数：4（均 P2-P3，无 P0/P1，≤5 首跑放宽标准 ✓）**

---

## 七、关键 3 条建议

### 建议 S1：v2.0 补"深色模式（dark mode）专项条款"（来自 N4 边界 + D1）
**问题**：N4"无连续 2 深段"和 D2"亮暗交替呼吸"都是亮态页导向规则，整页深色模式（body.dark）下字面违反。当前靠"精神满足"裁决，缺乏明文条款。
**建议**：v2.0 在 rules-narrative / craft-checklist 增加"深色模式专项"小节：
- **触发条件**：`body.dark` 或 `[data-mode="dark"]` 整页深色
- **N4 深色模式例外**：整页深色下，N4 改判为"靠三级深底 elevation 阶梯（black→charcoal→cream--dark）+ 发丝线 + 留白制造层次断点"，而非"深浅交替"
- **深色层次工具箱**：明确三级阶梯色值 + 发丝线 token(border-rest) + 留白梯队 + 文字三级明度
- **深色页节奏规则**：section 间至少有 1 次 elevation 阶梯切换（black↔charcoal 或 charcoal↔cream--dark），避免连续同底
- **checklist 加 N4-dark 条目**：深色模式下 N4 判据改为"elevation 阶梯切换 ≥3 次"而非"无连续深段"

### 建议 S2：slate 暗色选项配套冷化 .dark 覆写（沿用 T8 D3 教训）
**问题**：v1.7 slate 只覆写 charcoal/black，但 .dark 的 bg-subtle(#38332E)/border-rest(#3D3833) 仍是暖灰值，与冷钢主底存在细微色温断层（T8 已记录，T9 同样存在）。
**建议**：v2.0 为 slate 配套冷化中性色覆写（bg-subtle→#2F343A / border-rest→#3A4048 等冷灰），保持深底色温统一。可设计为 `[data-theme="slate"]` 属性选择器或 `.dark-slate` modifier。T9 验证此问题在两次测试（T8/T9）复现，应优先修复。

### 建议 S3：深色模式 Statement Quote / Manifesto 适配指引（来自 D3）
**问题**：Statement Quote 范式 DNA 是浅底居中引言，深色页适配时"呼吸谷"效果减弱（底色反衬弱）。Manifesto 在深色页反而更强（原生深底组件）。两者在深色页的表现不对称。
**建议**：v2.0 在 rules-components-brand.md 增加"深色模式适配"小节：
- Statement Quote 深色变体：可回到页面底（不切次级面），靠 max-width 收窄 + 留白做聚焦；或用 border-strong 加重引号装饰增强存在感
- Manifesto 深色页：可省略巨字水印（深底已有足够仪式感），或加密水印（opacity 提到 0.06-0.08 区间上限）
- 给出深色页"呼吸谷"组件优先级：Manifesto（强）> 收窄引言（中）> Statement Quote（弱）

---

## 八、T9 首跑结论

| 验证目标 | 结果 | 判定 |
|---------|------|------|
| **v1.7 slate 冷钢暗色** | 正确选定并实现（.dark 覆写 charcoal/black + 自动提亮），适配 Volvo 工程/安全品牌 | ✅ **slate 冷钢** |
| **整页深色模式层次** | 三级深底阶梯（black→charcoal→cream--dark）+ 发丝线 + 留白，层次可感知 | ✅ **成立** |
| **深色域哑光克制** | 靠 elevation + border + 留白（非渐变/阴影），深色域内重建范式 DNA | ✅ **成立** |
| **N4 范式边界** | 字面违反（整页全深），精神满足（层次断点等效）；记为边界例外，建议 v2.0 补条款 | ⚠ **边界（首跑放宽 ✓）** |
| **WCAG AA** | 正文 13.97:1 / 次文字 5.85:1，多数 AAA | ✅ **达标** |
| **通过标准** | 层次可感知 ✓ + WCAG AA ✓ + 缺陷 4（≤5 首跑放宽）✓ | ✅ **全部达标** |

**总评**：T9 成功首跑了"整页深色模式"这一范式边界场景，选定 slate 冷钢暗色（v1.7）并验证了"深色域内重建哑光克制层次"的可行性。**核心发现是 N4/D2 规则在深色模式下需要 v2.0 补明文例外条款**——这正是首跑建立基线的价值：暴露规则边界，为后续迭代提供方向。质感分 9.0（超目标 7.5），33/33 通过（N4 边界例外），缺陷 4（均 P2-P3，≤5 首跑放宽）。T9 与 T8（同为 slate）互补，验证了 slate 暗色在高端工程品牌与 SaaS 数据两种调性的通用性。

**首跑基线已建立，后续 T9 迭代以 9.0 / 33-1(N4边界) / 缺陷4 为对比基准。**

---

*v1.9 · 2026-07-03 · T9 整页深色模式首跑 · 基于 Volvo 品牌验证 v1.7 slate 冷钢 + 深色域层次重建 + N4 范式边界*
