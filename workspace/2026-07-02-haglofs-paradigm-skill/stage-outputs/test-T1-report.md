# 测试报告 · T1（基线回归用例）· Patagonia 品牌宣言页

> **技能**：haglofs-paradigm v1.8 · 2026-07-03
> **用例定位**：T1 是基线回归用例——验证 v1.7/v1.8 新增逻辑（声明走 V3 Split、anti-patterns 31 条、evolution-log 21 条）在 Haglöfs 范式主场能否达到最高分。
> **交付物**：`test-T1-patagonia.html`（594 行）+ 本报告
> **施工日期**：2026-07-03

---

## 一、Step 0 蓝图摘要

### 采集区（Patagonia 素材已齐，走"部分素材→推断"路径，无需追问）
- **品牌名**：Patagonia
- **一句话定位**：美国户外品牌，环保先锋，1973 年创立于加州
- **调性**：北欧户外同范式（哑光大地色），环保激进主义 → ✅ 范式内（北欧户外），无需换技能
- **核心叙事点**（4 个）：①"我们用商业拯救我们的星球"② 1% for the Planet ③ Worn Wear 修补计划 ④ B Corp 认证 + 环保激进主义
- **数据/指标**：无（明确声明"无数据指标"）
- **产品**：无（明确声明"无产品展示需求"）
- **时间维度**：有（1973 创立→2022 捐给地球，4 个关键节点）
- **受众**：公众/环保意识消费者
- **硬约束**：无数据、无产品

### 决策区（agent 推导，无需用户确认——素材齐且无歧义）

**2.1 页面类型**：**品牌宣言页**（纯品牌叙事，无数据/产品；叙事点 4 个。按 intake-rules「纯品牌叙事无数据→≤3 个→宣言 / ≥4 个→展示」其实踩在边界，但"无产品展示"排除了品牌展示页，宣言页是正确落点）
- 联动组：padding=120px / 分隔=背景色切换 / 宽度=单一 1120px / 动画=无 / 网格=大间距留白 / .cmp=省

**2.2 Hero 选型（v1.7 新逻辑·重点验证项）**：
- 决策树 v2 · Step 1 内容主轴首命中：
  - 数据/指标？**否**
  - 陈列/矩阵？**否**
  - **张力/主张/宣言/声明/对比？是 → V3 Split** ✅
- **✅ 确认：声明类正确路由到 V3 Split，未误走 V4 Statement**。v1.7 重构（"声明 = Split，不是 Statement"）生效。V4 已正确降级为"文档首页专用"，本页不适用。

**2.3 Section 列表（7 content + Footer）**：

| # | section 角色 | 组件 | 深浅 | padding | 密度 |
|---|---|---|---|---|---|
| Hero | V3 Split | hero-split 母版 | 分屏(浅+深面板) | — | 极疏 |
| 2 | 概念建立 | Prose | 浅 | 120px | 疏 |
| 3 | 引言呼吸 | Statement Quote | cream | 120px | 极疏 |
| 4 | 四大承诺 | Principle Cards (2×2) | 浅 | 120px | 中 |
| 5 | 传承时间线 | Heritage Timeline (4列) | cream | 120px | 中 |
| 6 | 金句升华 | Manifesto | **深 charcoal** | 120px | 极疏 |
| 7 | 收束过渡 | Statement Quote | 浅 | 120px | 极疏 |
| Footer | 终局收尾 | Footer | **深 black** | — | 疏 |

**2.4 深段配额**：Manifesto(charcoal) + Footer(black) 两深段；中间隔 Statement Quote(浅) → **N4 通过（深段孤立）**。

**2.5 组件清单**：hero-split · Prose(rules-components) · Statement Quote · Principle Cards · Heritage Timeline · Manifesto · Footer —— 全部 7 个均从 rules-components(-brand).md 登记骨架取，零自造。

---

## 二、施工记录

### 关键决策
1. **Hero 用 V3 Split 标准斜切变体（A 斜切）**：左浅 offwhite 主张 + 右深 black 斜切面板（clip-path 顺阅读方向）+ 点阵(sand 4px) + "1973" 年份水印(opacity .08)。三层装饰深度层满足 H2 铁律。
2. **深色变体选标准 charcoal/black**（未选 forest 深绿）。D3-扩展的 forest 深绿虽然语义匹配 Patagonia（自然·生态·可持续），但其约束"单页 ≤1 段、最重仪式感"对 7-section 宣言页过重。标准 charcoal 维持哑光克制主调，是基线回归用例的最稳健选择。
3. **声明文案 = 核心叙事①**：Hero 主标用 "We're in business to save our home planet"（save 用 `<strong>` 加重）——这正是 v1.7 把声明路由到 V3 Split 的张力主张气质。
4. **Statement Quote 出现 2 次（上限）**：③ 段（Chouinard "Earth is now our only shareholder"）+ ⑦ 段（收束过渡桥）。③ 是中段引言呼吸，⑦ 是 Manifesto(深) 与 Footer(深) 之间的浅隔开（N4 强制要求）。
5. **Heritage Timeline 用 4 列发丝线纵向**（非横向 frieze）：frieze 仅限传承展馆类，宣言页用纵向 grid 更合适。

### anti-patterns 31 条预检（开工前过）
逐条核对，**0 命中**：
- 色彩 7 条：无渐变、无硬编码 hex（audit 验证 body+style 业务区零裸 hex）、Signal 仅 link 1 处、浅底 strong 用 text-primary 纯字重（E5 规避）、forest 6 处 ≤8、深底分隔线全走 token。
- 字体 5 条：Playfair 不做正文、Georgia 仅在 fallback stack、全大写配 mono+字距+前缀线、标题负字距、无第 4 字体。
- 间距 4 条：全走 token-root --s-* 真源梯队、无混用、容器走 --c-max/--c-read、padding ≥80px（实际 120px）。
- 结构 5 条：深段孤立、Hero 三层装饰、7 content section（≤8）、第二段概念建立非数据、无数据→Manifesto 直跳。
- 装饰 5 条：无 blur/玻璃拟态、radius 全 ≤8px、浅底水印 .08-.12（>0.04）、shadow 仅浮起态、产品卡无 scale/渐变 hover（本页无产品卡）。
- 内容 5 条：真源用 token-root 非样本漂移、:root 内联（E1）、无外部框架、强调统一 strong/em、BEM 自描述无缩写。

### evolution-log 21 条规避
按品牌宣言页类型扫表，**全部规避**：
- E1（样本漂移）：全 var(--color-*)，0 样本裸值
- E5（moss 浅底对比度）：浅底 strong 用 text-primary 纯字重，深底（Manifesto）才用 moss
- E6（forest 配额耗尽）：6 处 ≤8；数据段 strong 用 text-primary（本页无数据段）
- E19（深段配额）：Timeline/Tension 未参与，Manifesto 独占深段配额无冲突
- E20（数据→叙事过渡桥）：本页无数据段，Statement Quote ⑦ 充当 Manifesto→Footer 浅隔开

---

## 三、Craft Checklist 33 项结果

**总计：33/33 ✅（零容忍通过）**

### 一、色彩（8/8）
- ✅ **C1** 主底 offwhite #F5F3EF（无纯白/冷灰整页底）
- ✅ **C2** 全 var(--color-*)，业务区零裸 hex（audit 验证）
- ✅ **C3** forest 6 处 ≤8（tag 前缀线 ×2、hero tag/divider、prose、section tag），无满铺底
- ✅ **C4** charcoal=Manifesto(内容深段)，black=Hero 面板/Footer(终局)，无互换
- ✅ **C5** 深底文字全 --text-inverse 系（offwhite/.5/.3），无 charcoal 落 charcoal/black
- ✅ **C6** forest 与 moss 无大面积相邻平铺（moss 仅深底 tag/列标题小面积）
- ✅ **C7** Signal blue 仅 footer 链接 hover 1 处（≤2），无 red/orange/yellow 装饰
- ✅ **C8** 无渐变/装饰阴影/模糊（audit 验证零 gradient/blur）

### 二、排版（6/6）
- ✅ **T1** 正文全 Inter，无 Playfair 正文
- ✅ **T2** 大标题 Playfair，负字距 -0.025em，line-height 1.0（≤1.05）
- ✅ **T3** 全大写标签 JetBrains Mono + ≥0.06em 字距 + 前缀线
- ✅ **T4** 所有 tag/section__tag/hero__tag 有前缀线（24-40px）
- ✅ **T5** 标题级(≥18px)全 clamp；eyebrow/data(≤12px)+body(14-15px) 固定 px；装饰大字 clamp（statement-quote__mark 已从 72px 修正为 clamp(48px,7vw,72px)）
- ✅ **T6** 强调统一 `<strong>`(字重 600) / `<em>`(斜体)，染 forest/text-primary，无色块高亮

### 三、Hero（5/5）
- ✅ **H1** min-height:100vh
- ✅ **H2** 三层装饰深度层（斜切深块 + 点阵 + 年份水印）
- ✅ **H3** 深底水印 opacity .08（区间 0.02-0.08）
- ✅ **H4** 选型符合内容主轴：宣言/声明/对比→V3 Split ✅
- ✅ **H5** 分屏底匹配张力场景（左浅右深）

### 四、组件（5/5）
- ✅ **CP1** 间距全 token-root 真源梯队（1/2/4/8/16/24/32/48/64/96/120px），容器 --c-max/--c-read（audit 验证无非梯队 spacing 值）
- ✅ **CP2** 无 Tension Grid（宣言页用 Principle Cards 替代），不适用
- ✅ **CP3** 无 Callout，不适用
- ✅ **CP4** BEM 全自描述（hero/section/prose/statement-quote/principle(s)/heritage-timeline/manifesto/footer），block 名全对应登记组件卡，无缩写
- ✅ **CP5** 无 Data Table，不适用

### 五、叙事节奏（5/5）
- ✅ **N1** 7 content section（品牌页 7-8 区间内）
- ✅ **N2** section padding 120px（≥80px，品牌页 96-120px）
- ✅ **N3** 第二段是概念建立（Prose "商业是工具不是目的"），非直接跳数据
- ✅ **N4** 无连续 2 个深色 section（Manifesto 深 ←Statement Quote 浅→ Footer 深，深段孤立）
- ✅ **N5** Footer 深色 black 收尾，⑦ Statement Quote 做升华/收束过渡段

### 六、工程基线（4/4）
- ✅ **E1** 单文件自包含，:root token 内联进 `<style>`（零 `<link>` 引 token-root），仅 Google Fonts 外链
- ✅ **E2** :root token 层完整（色+字+间距），body 引用 token
- ✅ **E3** 双断点响应式（1024 平板 / 768 手机）+ prefers-reduced-motion
- ✅ **E4** radius 全 ≤8px（卡片 4px，圆点 50% 仅限点阵/装饰）

---

## 四、质感分：**9/10**

### 加分项（-1 分的扣分点已单列在缺陷）
- **声明走 V3 Split 选型精准**：左浅右深的张力完美承载"save our home planet"的对抗性主张——这是 V4 Statement 的克制单字母无法表达的。
- **深浅节奏教科书级**：浅→cream→浅→cream→深(孤立)→浅→深(终局)，每个深段都被浅色包围，呼吸感强。
- **Statement Quote 双用**：③ 段做 Chouinard 引言行呼吸，⑦ 段强制隔开两个深段——一个组件承担两种叙事职责，经济。
- **文案与范式气质高度统一**：Patagonia 的"减少伤害/修补/把公司捐给地球"克制叙事，与 Haglöfs 哑光大地色形成强共鸣——本就是同范式主场。

### 扣分项
- **-1 分**：`statement-quote__mark`（装饰引号）初稿用固定 72px 违反 T5，已修正为 clamp。属施工瞬时缺陷（非范式缺陷，已修复），但反映组件母版骨架继承时的字号审查盲区——见缺陷 D1。

---

## 五、缺陷清单

### D1 · [P2·已修复] Statement Quote 装饰引号固定 px
- **现象**：`statement-quote__mark` 初稿 `font-size:72px` 固定值，72px ≥18px 按 T5 应 clamp。
- **根因**：直接从 rules-components-brand.md 骨架复制（骨架原文 `font-display 72px`），未在施工时复核"装饰大字 ≥18px 也须 clamp"。
- **修复**：改为 `clamp(48px,7vw,72px)`。
- **建议规则侧补强**：rules-components-brand.md 的 Statement Quote 骨架注释里 `font-display 72px` 应改为 `clamp(48px,7vw,72px)`，避免下个施工者继承同样缺陷。（→ 见 v1.9 建议 #1）

### D2 · [P3·技能侧] V3 Split Hero 深段配额归属未明文化
- **现象**：V3 Split 的右侧 deep panel（black）在 intake-rules 深段配额表里归属模糊——"Hero 占 1 深段（深底 Hero）或不算深段（浅底 Hero）"，但 Split 是分屏（浅+深），既非纯深也非纯浅。
- **影响**：本页实际把 Split Hero 的深面板视为 Hero 自身单元（不计入 content 深段配额），与"浅底 Hero 不算深段"的惯例一致，逻辑自洽。但规则未显式声明 Split 的归属，依赖施工者推断。
- **修复**：无需改本页（逻辑正确）。建议 intake-rules 补一句"Split Hero 的深面板属 Hero 自身，不计 content 深段配额"。（→ 见 v1.9 建议 #2）

### D3 · [P3·内容侧] 页面无 `<nav>` / 顶部锚点导航
- **现象**：7-section 宣言页无 sticky nav。paradigm-boundary B10 标注"多 section 系统文档→顶部 nav；简单叙事→无 nav"，宣言页归"简单叙事"可省，合规。但 7 section 偏长，读者滚动后无位置锚点。
- **影响**：不违范式（B10 弹性区，宣言页属"可省"）。属体验优化非缺陷。
- **修复**：保留现状（基线回归用例优先遵循母版 page-assembly.html，其无 nav）。后续 Patagonia 真实交付可加顶部 sticky nav。

---

## 六、v1.9 建议（按优先级）

### #1 · [P2] 组件骨架内的固定 px 应全部 clamp 化
**问题**：v1.8 做了"数据组件代际债清零"（Georgia→Playfair、缩写→BEM、硬编码→token），但**组件骨架内的固定字号 px（如 Statement Quote 的 72px 引号、Manifesto 的 56px 宣言）未同步 clamp 化**。施工者复制骨架时会继承这些固定值，触发 T5 风险（本页 D1 即此）。
**建议**：rules-components-brand.md / rules-components.md 所有 `font-size:NNpx`（NN≥18）改为对应 clamp。这是一次性的骨架审查，工作量小，收益大（消除施工瞬时缺陷源）。

### #2 · [P2] intake-rules 显式声明 V3 Split 的深段配额归属
**问题**：Split Hero 是分屏（浅+深），深段配额表只列了"纯深 Hero 算 1 深段 / 纯浅 Hero 不算"，Split 落在中间。
**建议**：intake-rules §深段配额 补一行："V3 Split Hero 的右侧深面板属 Hero 自身单元，不计入 content section 深段配额——Split 的深是装饰张力面，非内容深段。"

### #3 · [P3] craft-checklist C3 forest 计数与页面深色变体的交互未说明
**问题**：C3 forest ≤8 处，但若用 D3-扩展的 forest 深绿变体（深段满铺 forest），单段就可能破 8。规则未说明"forest 深色变体段的 forest 不计 C3 配额（它是底色不是强调）"还是"计入"。
**建议**：C3 加注"使用 D3-扩展 forest 深绿变体时，该深段作为底色的 forest 不计 C3 强调配额，但整页 forest 深绿变体仍限 ≤1 段"。

---

## 返回摘要

| 项 | 结果 |
|---|---|
| **HTML 路径/行数** | `test-T1-patagonia.html` / 594 行 |
| **报告路径** | `test-T1-report.md` |
| **Checklist** | **33/33** ✅（零容忍通过） |
| **质感分** | **9/10** |
| **声明是否走 V3** | **是** ✅（v1.7 选型逻辑正确路由到 V3 Split，未误走 V4） |
| **缺陷数** | **3 条**（D1 P2 已修复 / D2 P3 规则侧 / D3 P3 体验） |
| **anti-patterns 31 条命中** | **0** |
| **evolution-log 21 条命中** | **0**（全部规避） |
| **最关键 3 条 v1.9 建议** | ① 组件骨架固定 px 全 clamp 化（消除 D1 类施工瞬时缺陷源）② intake-rules 显式声明 V3 Split 深段归属 ③ C3 forest 计数与 D3-扩展深色变体的交互说明 |

**结论**：T1 基线回归通过。v1.7/v1.8 新增逻辑（声明走 V3、anti-patterns、evolution-log）在 Haglöfs 范式主场表现稳健，达到 9/10 高分。唯一施工瞬时缺陷（D1）已修复，根因是组件骨架未同步 clamp 化，建议 v1.9 一次性清零。
