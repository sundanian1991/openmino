# T3 混合页回归验证报告 · Linear

> 测试用例 T3（混合页回归）· haglofs-paradigm v1.8 · 2026-07-03
> 交付页：`test-T3-linear.html`（659 行）· 本报告：`test-T3-report.md`

---

## 一、Step 0 蓝图（intake-rules · 证据驱动 · 素材完整走逃生口）

### 采集区（全部可从素材推断，无需追问 → 符合 intake §采集策略「证据驱动」）

| 字段 | 采集值 | 推断依据 |
|------|--------|---------|
| 品牌名 | Linear | 素材明示 |
| 一句话定位 | 为软件开发团队设计的项目管理工具 | 素材明示 |
| 调性 | 科技克制（T2） | 素材明示 |
| 核心叙事 | ① Build products not paperwork ② 键盘优先 ③ 实时同步 ④ GitHub/GitLab 集成 | 素材明示 4 点 |
| 数据指标 | 6 个（渲染50ms/同步<100ms/月活5000+/NPS78/部署日均12/API<50ms） | 素材明示 |
| 产品 | Cycles/Projects/Roadmaps（3 个） | 素材明示 |
| 时间维度 | **无**（Linear 未给传承年份） | 素材未提供 → 影响 Timeline 决策 |
| 受众 | 开发者/产品团队 | 素材明示 |

**采集命中 intake 规则**：用户已给部分素材（含叙事点+数据+产品+调性），走「从素材推断能推断的，只问推断不出的」——此处推断完整，零追问，直接填决策区。

### 决策区 2.1 · 页面类型判定

- **判定**：≥5 数据指标（6 个）+ ≥2 品牌组件（Product Card + Principle Cards + Statement Quote）→ **品牌数据简报（混合页）** ✓（intake §页面类型判定第一条命中）
- **联动组**（B 表第五行）：96px 数据段基底 + 120px 引言/收束段 / 分层分隔 / 单一 1120px / 数据段 hover + 品牌段 fade-in / 混用网格 / 数据段必有 .cmp

### 决策区 2.2 · Hero 选型

- **选定**：**V5 Pulse**（深底 + LINEAR 巨字水印 + 脉动线 + 3 KPI 条）
- **理由**：内容主轴关键词「性能/指标/渲染速度/同步延迟」首命中决策树 Step 1「数据/指标/仪表板/性能 → V5 Pulse」✓（首命中标原则 E4）
- **深底触发**：数据密集场景走深底，符合 v1.7「深底只在客观需要时触发」

### 决策区 2.3 · Section 列表（8 section · 锁定）

| # | section 角色 | 组件 | 深浅 | padding | 密度 | 规则校验 |
|---|---|---|---|---|---|---|
| S1 | Hero（数据封面） | V5 Pulse + 3 KPI | **深** charcoal | — | 中 | H1/H2/H4 ✓ |
| S2 | 概念建立 | Principle Cards ×4 | 浅 offwhite | 120px | 中 | N3 ✓（第二段概念建立） |
| S3 | 数据段 | Swatch ×4 + Data Table | **深** charcoal | 96px | 密 | .cmp ✓ / B11 ✓ |
| S4 | **过渡桥** | Statement Quote | 浅 offwhite | **120px** | 极疏 | **§6.1 过渡桥 ✓** |
| S5 | 产品资产 | Product Card ×3 | cream | 120px | 中 | 4:5 ✓ |
| S6 | 张力原则 | Tension Grid **--light** | offwhite | 120px | 中 | **v1.6 浅底变体 ✓** |
| S7 | 升华收束 | Statement Quote | cream | 120px | 极疏 | **§6.2 Manifesto 降级 ✓** |
| S8 | 终局收尾 | Footer | **深** black | — | 疏 | A9 ✓ |

**深段序列**：深(Hero) → 浅 → 深(数据) → 浅 → cream → 浅 → cream → 深(Footer)
**深段配额**：3 个深段（Hero + 数据段 + Footer）—— Hero+Footer 占 2，剩 1 给「信息密度高的数据段」（混合页深段优先级：Timeline 优先，但本页无 Timeline 素材 → 数据段承载合理）

### 决策区 2.4 · 深段配额分配（混合页 §6.2 优先级验证）

```
深段优先级（rules-narrative §6.2）：Timeline > Tension > Manifesto
本页实际情况：
  - Timeline：无传承素材（Linear 未给年份）→ 不适用
  - Tension Grid：有张力素材（键盘 vs 鼠标）→ 本应占深段，但 Hero+数据段+Footer 已占满 3 深段
  - Manifesto：有升华素材 → 配额满，降级浅底 Statement Quote ✓
解法：Tension Grid 用 tension-grid--light 浅底变体（v1.6 E11），Manifesto 降级浅底 Statement Quote（§6.2）
```

### 决策区 2.5 · 组件清单（v1.6 冲突预检已过）

| 组件 | 取骨架 | 底色铁律 | 冲突预检 |
|------|--------|---------|---------|
| V5 Pulse Hero | rules-hero / hero-pulse.html | 深底 | ✓（数据场景合法深底）|
| Principle Cards ×2 | rules-components-brand | 无底色铁律 | ✓ |
| Swatch ×4 | rules-components | 无底色铁律 | ✓ |
| Data Table | rules-components | 无底色铁律 | ✓ |
| Statement Quote ×2 | rules-components-brand | **浅底铁律** | ✓（本页 2 个均为浅底，未误用深底）|
| Product Card ×3 | rules-components-brand | 无底色铁律 | ✓ |
| Tension Grid --light | rules-components §浅底变体 | **深底铁律 → 浅底降级** | ⚠ **已用 tension-grid--light 解决**（v1.6 E11）|
| Footer | rules-components-brand | 深底 black | ✓ |

**冲突预检结论**：唯一冲突（Tension Grid 深底铁律 vs 浅底意图）已通过 `tension-grid--light` 合法变体解决，CP2 判 ✓（不违规）。

---

## 二、混合页衔接方案（v1.3 重点验证项）

### 2.1 分层分隔策略（B 表第五行 · B5/B9 混合页例外）

本页采用「分层分隔」——这是混合页的合法模式，**不算 W5/W9 混用违规**：

- **section 级**：背景色切换（深 charcoal → 浅 offwhite → 深 → 浅 → cream → 浅 → cream → 深 black）—— 品牌语言，制造滚动节奏的"听觉"
- **数据组件内**：发丝线分隔（Data Table 行 `border-bottom:1px solid var(--border-rest)` / Swatch 卡间 `gap:24px` + 边框）—— 数据语言，限定在组件边界内
- **品牌组件内**：大间距留白（Product Card `gap:24px` / Principle `gap:48px/24px`）—— 品牌语言

**验证**：两种分隔语言分属不同层级（section 级 vs 组件内），未在同一层级混用 → 符合 B5「混合页例外」条款 ✓

### 2.2 数据→叙事过渡桥（§6.1）

**S3 数据段（密）→ S4 Statement Quote（极疏）→ S5 Product Card（中）**

- **过渡组件**：Statement Quote（浅底居中引言 "Build products, not paperwork."）
- **padding**：120px（大呼吸），制造紧→松切换信号 ✓
- **密度曲线**：密(数据 Swatch+Table) → **极疏(引言 1 元素)** → 中(产品卡) → 中(张力) → 极疏(升华) → 疏(Footer)
- **禁忌校验**：未从数据段直跳深色 Manifesto ✓（中间用浅底 Statement Quote 隔开，符合 anti-patterns 结构禁区最后一条）

```
密度波形（ASCII）：
S1   S2   S3   S4   S5   S6   S7   S8
▃    ▂    ▅    ▁    ▃    ▃    ▁    ▂
Hero 概念 数据 [过渡] 产品 张力 升华 Footer
              ↑
         §6.1 密度谷
```

### 2.3 深段配额优先级（§6.2）· 已在上文 2.4 验证

Timeline 不适用 → Tension 用浅底变体 → Manifesto 降级浅底。配额优先级链路完整执行 ✓

---

## 三、Checklist 33 项核验

### 一、色彩（8 项）

- ✅ **C1** 页面主底 `var(--color-offwhite)` #F5F3EF 温润米白（body + 默认 section）
- ✅ **C2** 全色值走 `var(--color-*)`，hex 仅出现在 `:root` token 声明（10 处均为 token 定义）
- ✅ **C3** forest 计数 **6 处**（≤8）：section__tag(浅底)2 / swatch__face--d 1 / statement-quote source 1 / closing-quote 1 / primary 别名 1。浅底正文 strong 已改用 `--text-primary` 纯字重（C3 配额优化策略），深底用 moss 提亮
- ✅ **C4** charcoal 用于数据深段（工作中的深色），black 用于 Hero/... 注意：Hero 用 charcoal（Pulse 深底惯例用 charcoal 非 black），Footer 用 black（终局）—— 符合 charcoal=工作深色/black=终局分工
- ✅ **C5** 深底文字全走 `--text-inverse` 系，无 charcoal 字落 charcoal/black 底
- ✅ **C6** forest 与 moss 无大面积相邻平铺（moss 仅小面积：KPI/深底 tag/深底 strong）
- ✅ **C7** Signal 色全页仅 `--link`(blue) 用于 footer 链接 hover（≤2 处），无 red/orange/yellow 装饰
- ✅ **C8** **零渐变**（grep 验证无 linear/radial-gradient），shadow 仅 1 处 token 声明未实际使用做装饰

### 二、排版（6 项）

- ✅ **T1** 正文全 Inter（`var(--font-body)`），Playfair 仅标题/装饰（13 处 font-display 均为标题/数字/引言）
- ✅ **T2** 大标题 Playfair + 负字距 `-0.02em~-0.03em` + line-height ≤1.1
- ✅ **T3** 全大写标签 JetBrains Mono + 字距 ≥0.06em（13 处 uppercase 均配 letter-spacing）
- ✅ **T4** tag 前缀线齐全：section__tag(32px) / hero__tag(32px) / footer__col-title(24px)
- ✅ **T5** 标题级(≥18px) 全 clamp；eyebrow/data(≤12px) + body(13-15px) 固定 px 合规
- ✅ **T6** 强调统一 `<strong>` 加字重（浅底 charcoal 纯字重 / 深底 moss），无斜体/下划线/色块高亮

### 三、Hero（5 项）

- ✅ **H1** `min-height:100vh`（移动端 auto+padding 合法压缩）
- ✅ **H2** ≥2 装饰深度层：LINEAR 巨字水印 + 脉动线（双装饰层）
- ✅ **H3** 水印 opacity 0.04（深底区间 0.02-0.08 内 ✓）
- ✅ **H4** V5 Pulse 符合「数据/指标」内容主轴
- ✅ **H5** 深底匹配数据仪表盘场景

### 四、组件（5 项）

- ✅ **CP1** 间距全 token 梯队（1/2/4/8/16/24/32/48/64/96/120px），grep 验证无 5/7/10/12/13/20/40/80px 非梯队值
- ✅ **CP2** Tension Grid 用 `--light` 浅底变体（2 列 × 2 item），合法降级判 ✓
- ✅ **CP3** 无孤立 Callout（本页未用 Callout）
- ✅ **CP4** BEM 命名齐全：hero/principle(s)/swatch/data-table/statement-quote/product-card/tension-grid/tension-item/closing-quote/footer/cmp —— block 名全对应已登记组件卡（无缩写名 hm/lyr/sw）
- ✅ **CP5** Data Table 4 列（≤5），状态列用 `.tag`（Top Tier/Growing/Baseline）非裸文字色

### 五、叙事节奏（5 项）

- ✅ **N1** 8 个 content section（Hero + 6 内容 + Footer，品牌页 7-8 区间内）
- ✅ **N2** section padding ≥96px（数据段 96px / 品牌段 120px，走梯队）
- ✅ **N3** 第二段是概念建立（Principle Cards），未直接跳数据
- ✅ **N4** **无连续深段**：深(1)→浅→深(3)→浅→cream→浅→cream→深(8)，3 个深段全孤立
- ✅ **N5** Footer 深色 black 收尾，有升华段（S7 Statement Quote）

### 六、工程基线（4 项）

- ✅ **E1** 单文件自包含，`:root` 内联 token（无 `<link>` 引 token-root）✓（v1.2 E1 裁决）
- ✅ **E2** :root token 层（色+字+间距三类），body 引用 token
- ✅ **E3** 双断点响应式（1024px 平板 / 768px 手机）
- ✅ **E4** radius 全 ≤8px（4/6/8px + pill 999px 仅圆点）

### 计分

**33/33 全过 ✓ · 范式内交付**

---

## 四、质感分

**8.0 / 10**

| 维度 | 分 | 说明 |
|------|-----|------|
| 范式纯度 | 8.5 | 33/33 全过，零硬编码/零渐变/深段全孤立/Hero 双装饰层 |
| 混合页衔接 | 8.5 | v1.3 三项（分层分隔/过渡桥/深段配额）完整执行，过渡桥密度谷清晰 |
| 技术调性适配 | 8.0 | v1.6 rules-content-types 落地：Swatch face 用 slate/steel 冷调辅色（替代 forest 暖绿），符合「技术段允许冷调主导」 |
| 内容密度 | 7.5 | 6 指标 + 3 产品 + 4 原则 + 2 张力，叙事饱满但 Linear 实际品牌色（紫）未映射（见缺陷 D2） |
| 视觉张力 | 7.5 | 8 section 节奏良好，但缺 Linear 标志性的"深色 SaaS 控制台"质感（受 Haglöfs 哑光范式约束，非缺陷） |

**扣分主因**：Haglöfs 大地色范式与 Linear 实际品牌色（紫/电光色）存在调性张力——这是范式边界本身限制，非施工错误（见缺陷 D2 + v1.9 建议）。

---

## 五、缺陷记录

### D1（P2 · 内容）· 两个 Statement Quote 节奏略重复

- **现象**：S4 过渡桥与 S7 升华收束均用 Statement Quote，引言风格相近（均为 "Build products..." / "为开发者而生"）。
- **影响**：极疏段出现 2 次（rules-components-brand Statement Quote 禁忌：单页 ≤2 个，本页正好 2 个，踩线合规但节奏稍重复）。
- **根因**：Manifesto 降级浅底（§6.2）+ 数据→叙事过渡桥（§6.1）都需要浅底引言类组件，两者组件选择重叠。
- **修复建议**：S7 可改用 Principle Cards 收束（设计原则 2 卡），避免两个 Statement Quote。但当前实现合规（≤2 个），未触发红线。

### D2（P2 · 调性边界）· Linear 实际品牌色未映射

- **现象**：Linear 真实品牌色为紫色系（#5E6AD2），但 Haglöfs 范式 token-root 无紫色 token，本页用 slate/steel 冷调辅色做技术调性适配。
- **影响**：页面质感是"Haglöfs 范式下的 Linear"，而非"Linear 原生品牌"。技术调性适配（rules-content-types §1）允许 slate 替代 forest，但无法承载 Linear 的紫色品牌识别。
- **根因**：范式边界限制——Haglöfs 北欧户外范式的大地色系与 SaaS 科技品牌的电光色系存在结构性张力。
- **定位**：这不是施工缺陷，是范式适用边界。如需 Linear 原生品牌色，应走 nian-design 或非 Haglöfs 范式技能。

### D3（P3 · 微调）· S6 Tension 张力感减弱

- **现象**：Tension Grid 用浅底变体（tension-grid--light）后，深底反衬带来的"对立张力"视觉强度减弱（v1.6 组件卡已注明此为已知取舍）。
- **影响**：键盘 vs 鼠标的对立感不如深底版本强烈。
- **根因**：深段配额满（Hero+数据段+Footer=3）→ 被迫浅底降级（v1.6 E11 合法解）。
- **定位**：合规降级，非违规。CP2 判 ✓。

---

## 六、混合页规则违反检查（重点验证项结论）

| 验证项 | 规则 | 本页执行 | 结论 |
|--------|------|---------|------|
| 分层分隔策略 | B 表第五行 / B5/B9 例外 | section 级背景色切换 + 数据组件内发丝线 | ✅ **未违反**（合法分层分隔）|
| 数据→叙事过渡桥 | §6.1 | S4 Statement Quote 120px 大呼吸做密度谷 | ✅ **未违反**（过渡桥到位）|
| 深段配额优先级 | §6.2 | Timeline 不适用 → Tension 浅底 → Manifesto 降级 | ✅ **未违反**（优先级链路完整）|
| v1.6 冲突预检 | intake §组件-深浅冲突预检 | Tension Grid 深底铁律 → tension-grid--light | ✅ **未违反**（预检+合法降级）|
| v1.6 技术调性适配 | rules-content-types | Swatch face 用 slate/steel 冷调 | ✅ **未违反**（技术调性适配）|
| N4 深段孤立 | A10/N4 | 3 深段全孤立（浅/cream 隔开）| ✅ **未违反** |
| W5/W9 分隔混用 | 软禁忌 | 分层分隔属混合页合法例外 | ✅ **未违反**（B5/B9 例外条款）|

**结论：混合页规则全部遵守，零违反。**

---

## 七、v1.9 建议

### 建议 1（P1）· 混合页「双 Statement Quote」组件去重指引

**问题**：§6.1 过渡桥推荐 Statement Quote，§6.2 Manifesto 降级也推荐 Statement Quote —— 当两者同时出现，单页易出现 2 个 Statement Quote（踩禁忌 ≤2 上限边缘）。本页即命中此情况（D1）。

**建议**：rules-narrative §6 增加去重指引——「当混合页同时需要过渡桥（§6.1）和 Manifesto 降级（§6.2）时，二者不可都用 Statement Quote。过渡桥用 Statement Quote（密度谷），收束段改用 Principle Cards（2-3 卡设计原则）或 Pipeline（工作流收束），避免组件重复。」

### 建议 2（P1）· 品牌色映射缺口（外部品牌色 vs 范式 token）

**问题**：Haglöfs 范式 token-root 是大地色系（forest/moss/slate/steel），无法承载外部品牌的原生色（如 Linear 紫 #5E6AD2、Stripe 蓝、Notion 黑白）。施工科技品牌时只能用 slate 冷调做"近似适配"，丢失品牌识别（D2）。

**建议**：新增 `rules-brand-color-mapping.md`——定义「品牌色映射协议」：① 当外部品牌色与范式色系冲突时，允许在 `:root` 内追加 1 个 `--brand-accent` token（限定用途：Swatch face / 强调线 / tag，≤3 处），但不替换 forest 主强调；② 给出"品牌色→范式色就近映射表"（紫→slate、电光蓝→steel、品牌红→signal-red）；③ 明确这是"调性妥协"非"范式扩展"，超出则建议换技能。

### 建议 3（P2）· Tension Grid --light 张力补偿手法

**问题**：v1.6 的 `tension-grid--light` 浅底变体张力感减弱是已知取舍（D3），但组件卡只给了"结构合规"的底线，未给"如何补偿张力"的提升指引。

**建议**：rules-components Tension Grid --light 变体增加张力补偿手法——① 两侧加更粗的顶部强调线（`border-top:2px solid var(--color-forest)` 替代 1px，用 forest 小面积提张力，仍在配额内）；② 编号(01/02)字号放大到 clamp(32px,4vw,48px) 强化对立感；③ 中间加 1 条垂直发丝线 `border-right` 明确"对立分界"。给出补偿后的骨架示例，让浅底变体不只是"合规降级"，而是"有设计的弱化张力"。

---

## 八、返回摘要

- **文件**：`test-T3-linear.html`（659 行）+ `test-T3-report.md`
- **Checklist**：**33/33 全过** · 范式内交付
- **质感分**：**8.0 / 10**
- **混合页规则违反**：**无**（v1.3 分层分隔/过渡桥/深段配额 + v1.6 冲突预检/技术调性 全部遵守）
- **缺陷数**：**3 条**（D1 双 Statement Quote 重复 P2 / D2 品牌色未映射 P2 调性边界 / D3 Tension 浅底张力减弱 P3）—— 均为 P2/P3，无 P0/P1
- **关键 3 条 v1.9 建议**：
  1. 混合页双 Statement Quote 去重指引（过渡桥 vs Manifesto 降级组件分工）
  2. 品牌色映射协议（外部品牌色 → 范式 token 就近映射 + --brand-accent 受限 token）
  3. Tension Grid --light 张力补偿手法（粗强调线/放大编号/垂直分界线）
