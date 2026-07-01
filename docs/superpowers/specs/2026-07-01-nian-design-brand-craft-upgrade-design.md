# nian-design 品牌工艺质感升级 · 设计方案

> **方案 B · 质感优先重构**
> 把 nian-design 从"组件拼装工"升级为"品牌质感施工方"。
> 北极星：工艺质感派（Hermès / 观夏 / 高端装备品牌）。

---

## 背景与诊断

### 用户诉求

将 nian-design 优化为"专属品牌类宣传"技能——只负责品牌感、高级感内容。经澄清，确定为**整体升级品牌感**（不收窄接单范围，让所有场景都带更强品牌高级感），北极星范式为**工艺质感派**。

### 四项系统性痛点

| 痛点 | 表现 |
|---|---|
| Hero 开屏不够跳 | 打开页面一眼看不出"这是个有品牌的页面"，Answer 层压剧感不足 |
| 达标但平庸 | token 和规则齐备，但实际产出"挑不出毛病也没记忆点" |
| 场景间割裂 | 数据报告/知识教程与品牌调性脱节，品牌感是表面贴的 |
| 资源太多难选 | 63 组件 + 24 变体 + 98 showcase，选型困难，品牌感被组件堆砌反噬 |

### 根因

现在的 nian-design 把品牌 DNA 当成"背景知识"写在 brand-dna.md 里，但没有把它**翻译成施工流程里强制执行的质感规范**。工艺质感派要的是"可感知的工艺密度"，这必须成为独立于排版/色彩的第 4 类规则。资源过载进一步压垮品牌一致性。

### 为什么选方案 B

| 方案 | 评价 |
|---|---|
| A · 加质感层（轻量） | 治标不治本，资源过载/场景割裂未解 |
| **B · 质感优先重构（选定）** | 直击四痛点共同根因，让品牌质感成为施工第一公民 |
| C · 整体重做 | 投入巨大，破坏与 nian-decision-card / nian-ui 契约，推翻好资产，不建议 |

---

## 设计总览

五层改动，环环相扣：

```
① 质感层（新增）     → texture-palette.css + 质感规则 6/6b
② Workflow 重构      → 质感前置为 Step 0.5
③ 资源收敛           → 63→12 核心组件，17→5 规则文件
④ Hero 强化          → 4 种品牌 Hero 模式 + "一跳一沉"原则
⑤ 场景统一机制       → 品牌贯穿层 + 合法区间（v2）
```

现有资产保留：brand-dna.md 的"Scandinavian workshop"哲学、token-root.css 的 Haglöfs 15 色体系、与 nian-decision-card / nian-ui 的流水线契约（仅扩展字段，不破坏）。

---

## ① 质感层（Texture System）

### 1.1 新增 `references/templates/base/texture-palette.css`

与 token-root.css 并列。定义 5 种验证过的质感方案，每种是独立的"材质身份"：

| 质感方案 | 视觉特征 | 适用气质 | 实现 |
|---|---|---|---|
| **Linen 亚麻** | 暖白底 + 极细经纬纹理，像未漂白画布 | 品牌宣言、知识长文（温润、人文） | SVG noise `opacity 0.04` + cross-hatch |
| **Kraft 牛皮纸** | 米黄底 + 粗纤维颗粒，像未涂装纸 | SOP、操作手册、技术文档（朴素、可信） | SVG turbulence `opacity 0.05` + 暖色偏移 |
| **Bond 装帧纸** | 冷白底 + 细密均匀颗粒，像高端画册内页 | 数据报告、决策建议（精密、克制） | SVG fractal noise `opacity 0.025` |
| **Forge 哑光金属** | 深底 + 细密竖向拉丝，像拉丝铝合金 | 科技/工业气质的 Hero 区 | linear-gradient + SVG line `opacity 0.06` |
| **Ink 油墨叠加** | 浅底 + 不均匀墨色边缘，像凸版印刷 | 品牌主张、金句区（印刷感、重量） | SVG turbulence + feDisplacementMap |

**技术约束**：
- 全部 SVG + CSS 实现，零图片依赖（保证可移植、可 token 化）
- 每种质感的 `opacity` 上限 `≤ 0.06`（超过即脏，违反 brand-dna 的"克制"）
- 默认只铺 `<body>`；Hero 区可选叠加第二层（双层质感制造工艺焦点，仅屏风 Hero 模式允许）

### 1.2 质感规则（写入 CRAFT-RULES.md）

```
── 质感层（规则 6a/6b，插在现有 Rule 6 Readability 之后，不挤压旧编号）──
[ ] Rule 6a · Texture Anchor — 每页恰好 1 个质感锚点区（Hero 或金句 section），
    该区质感 opacity 可达上限，其余 section ≤ 0.03
[ ] Rule 6b · Texture Coherence — 全页只用 1 种质感方案，不混搭
    （混搭 = 每区不同纸 = 失去品牌统一感）
    例外：屏风 Hero 模式（D）允许双层质感，需在决策卡标注
```

**编号说明**：现有 Rule 6 = Readability Floor 保持不变，新增质感规则用 6a/6b，避免与现存引用冲突。

这两条是"拔高型"规则——不是底线，是把工艺质感派的命脉写成铁律。

---

## ② Workflow 重构

### 6 步施工流程（变化用 ★ 标注）

| 步骤 | 现在 | 重构后 |
|---|---|---|
| Step -1 | 视觉 Brief 前置门（查决策卡） | 不变 |
| Step 0 | 取 token-root.css | 取 token-root.css **+ texture-palette.css** |
| **Step 0.5** | ★ 无 | **定质感调性**（新步） |
| Step 1 | 读决策卡 | 读决策卡（新增读 `textureProfile` 字段） |
| Step 2 | 选变体 + 替换 | 选变体 + 替换（变体已收敛为 6 母版，见 ③） |
| Step 3 | 填内容 + 质感检查（可选） | 填内容 + **落实质感方案**（强制） |
| Step 4 | 8 条硬规则自检 | 硬规则自检（含新增 Rule 1b/6/6b/11） |
| Step 5 | 输出 | 输出（QA 注释加 `texture:` 字段） |

### Step 0.5 · 定质感调性

```
输入：决策卡 visualStream（气质）+ scene（场景）+ baseMode（明暗）
输出：1 个质感方案 + 1 个质感锚点 section

决策矩阵：
┌─────────────────┬──────────┐
│ 气质 × 场景      │ 质感方案  │
├─────────────────┼──────────┤
│ Statement+品牌    │ Linen    │
│ Statement+知识    │ Linen    │
│ Diagonal+报告     │ Bond     │
│ Pulse+数据        │ Bond     │
│ Split+SOP        │ Kraft    │
│ Entrance+沉浸    │ Forge    │
│ 金句/宣言区        │ Ink      │
└─────────────────┴──────────┘

锚点 section：
- 默认 = Hero section（开屏即建立材质身份）
- 例外：breakPoint 指定金句/宣言 section → 该 section 为锚点，Hero 用次级质感
```

**核心**：先定材质身份，再在材质底上施工（Hermès/观夏的做法：先选纸材，再排内容）。

### 决策卡契约扩展

`nian-decision-card` schema 新增字段（向后兼容，缺失时施工方按矩阵自决）：

```yaml
textureProfile:    linen       # 质感方案，5 选 1
textureAnchor:     hero        # 锚点 section，默认 hero
```

---

## ③ 资源收敛

### 3.1 品牌核心组件集（63 → 12）

从 63 组件精选最能承载工艺质感的 12 个，标 `CORE`。其余降为 `EXTENDED`，施工时默认只翻 CORE。

| # | 组件 | 为什么是核心 |
|---|---|---|
| 1 | Statement Hero（衬线大字 + 留白） | 品牌开屏第一识别 |
| 2 | Numeral Hero（超大装饰数字 + Doto） | 数据型品牌锚点 |
| 3 | Ghost Watermark（幽灵水印打破） | 品牌签名感，每页必有 |
| 4 | Pull Quote（衬线引用 + Ink 质感） | 工艺质感派核心表达 |
| 5 | Eyebrow + Section Header | 节奏标点，建立品牌语感 |
| 6 | Spec Table（装帧式数据表） | 数据也能有工艺感 |
| 7 | KPI Card（Mono 大数字 + 中性描边） | 指标卡标准件 |
| 8 | Vertical Timeline（编号 + 发丝线） | 叙事骨干 |
| 9 | Do/Don't Grid（对照 + 状态色点） | 对比场景必备 |
| 10 | Asymmetric Split（非对称双栏） | 构图张力载体 |
| 11 | Decorative Number（E03 装饰编号） | 章节序号品牌化 |
| 12 | Colophon Footer（版本/来源/印记） | 收束页品牌签名 |

**COMPONENTS-MASTER.md 改造**：每个组件加 `CORE` / `EXTENDED` 标签，CORE 12 个集中在前 200 行，EXTENDED 在后。

### 3.2 规则文件收敛（17 → 5）

| 收敛后 | 合并/保留 |
|---|---|
| `CRAFT-RULES.md` | 排版 + 构图 + 可读性 + **新增质感规则 6/6b** + Hero Rule 1b + 品牌 Rule 11 |
| `COLOR-USAGE-RULES.md` | 合并 COLOR-GUIDE + DARK-MODE（dark 作子章节） |
| `TYPOGRAPHY-RULES.md` | 不变 |
| `VOICE-AND-CONTENT.md` | 不变 |
| `DECORATIVE-RULES.md` | 不变（装饰已是工艺质感一部分） |

**归档**（移至 `references/_archive/`）：DESIGN-JUDGMENT.md、CONTENT-BRIEF.md、DESIGN-SYSTEM-MAP.md、checklist.md（职责被 CRAFT-RULES 覆盖）。

### 3.3 变体收敛（24 → 6 母版）

24 个气质×场景变体收敛为 **6 个品牌母版**，每个母版自带质感绑定，场景适配通过组件替换实现：

| 母版 | 绑定质感 | 覆盖原变体 |
|---|---|---|
| `brand-statement` | Linen | statement--brand/knowledge |
| `data-precise` | Bond | diagonal/pulse/dashboard--data/report |
| `guide-plain` | Kraft | split--plan/knowledge/decision |
| `immersive-entrance` | Forge | entrance--brand/knowledge |
| `manifesto-ink` | Ink | democratic--brand + 金句页 |
| `monitor-pulse` | Bond | pulse--monitor/monitor-v2 |

### 3.4 showcase 归位

showcase 定位明确为**纯灵感库**。SKILL.md 删除"找灵感"作为流程步骤的模糊表述。施工前可选翻阅 `showcase-index.md`（精选 10 个标杆），**禁止直接复制 showcase 代码**（token 不统一）。

---

## ④ Hero 强化

### 4.1 四种品牌 Hero 模式

| 模式 | 视觉特征 | 何时用 | 质感绑定 |
|---|---|---|---|
| **A · 材质 Hero** | 全屏质感铺底 + 衬线大字咬合 | 品牌宣言、价值观主张 | Forge 或 Linen，opacity 达上限 |
| **B · 装帧 Hero** | 左侧装帧元素（书脊色带/版口印章/编号铭牌）+ 右侧大字 | 知识长文、SOP（"翻开一本书"感） | Bond + Decorative Number |
| **C · 印章 Hero** | 大字 + 圆形/方形印章式打破（品牌徽记，Ink 质感） | 金句页、核心结论页 | Ink，印章 ghost 处理 |
| **D · 屏风 Hero** | 非对称多面板（2-3 块），每块不同材质密度 | 数据报告首页、多指标开屏 | 双层质感例外区（唯一允许） |

### 4.2 "一跳一沉"原则

工艺质感派的 Hero 不是"越花越好"，而是**一个跳出来的元素 + 一个沉下去的基底**：

```
跳 = 1 个压剧性元素（超大字/印章/装饰编号），用 Ink 或 Forge 加重
沉 = 质感基底（Linen/Bond/Kraft），opacity ≤ 0.04，安静承托

错误：全部元素都"跳" → 视觉打架 → 平庸
错误：没有跳的元素 → 达标但无记忆点（现状）
正确：1 跳 + 1 沉 → 工艺质感派的张力
```

### 4.3 新增 Rule 1b

```
[ ] Rule 1b · Hero Tension — Hero 区恰好 1 个"跳"元素 + 质感基底承托，
    跳元素必须绑定高密度质感（Ink/Forge）
```

### 4.4 新增 `references/HERO-MODES.md`

定义 4 种模式各自的：
- HTML/CSS 骨架模板（可直接复制）
- 质感绑定（指定 textureProfile）
- "跳元素"选型（大字/印章/编号/多面板锚点）
- 与 decision-card `heroType` 字段的映射

---

## ⑤ 场景统一机制

### 5.1 品牌贯穿层（Texture Base 强制，其余可豁免）

| 锚点 | 是什么 | 出现位置 | 权限 |
|---|---|---|---|
| **Texture Base** | 全页统一质感底 | `<body>` 全覆盖 | 🔒 不可豁免 |
| **Ghost Watermark** | 幽灵水印（opacity 0.03-0.06） | 每页 1 处 | 🟡 可豁免 |
| **Colophon Footer** | 品牌印记页脚 | 每页页脚 | 🟡 可豁免 |

Texture Base 是品牌身份底线，永不豁免——没质感底就不是 nian。

### 5.2 合法区间（v2）

| 维度 | 场景权限 | 边界 |
|---|---|---|
| 质感方案 | 🔒 锁定 | 按 Step 0.5 矩阵，场景无权改 |
| 色彩比例 | 🟡 可微调 | 80/10/10 ± 10pp（Primary 70-90%），不可推翻色层角色 |
| 字体角色 | 🟡 可扩展 | 三工为主；Doto 可作第四字体选择性引入（仅装饰数字/Ghost），不进正文 |
| 品牌三件套 | 🟡 可部分豁免 | Texture Base 不可豁免；Watermark/Colophon 可豁免，需决策卡 `brandWaiver` 标注理由 |

**设计**：开放的三项需在决策卡显式声明，不是默认可改。施工方不能自作主张豁免，必须上游授权。

### 5.3 决策卡 brandOverride 字段

```yaml
brandOverride:
  colorRatio:   { primary: 0.85 }      # 微调，必须在边界内
  extraFont:    doto                    # 可选第四字体
  brandWaiver:  [watermark]             # 豁免项，需配 reason
```

### 5.4 Rule 11

```
── 品牌贯穿层（规则 11）──
[ ] Rule 11 · Brand Signature — Texture Base 必有（不可豁免）；
    Watermark/Colophon 可由决策卡 brandWaiver 豁免，但 Texture Base 缺失 = 不通过
```

### 5.5 新增 `references/COLOPHON.md`

标准化收束页：

```
[页脚区]
  左：品牌名（Playfair）+ 一句话定位
  中：版本号 / 日期 / 来源（JetBrains Mono, ALL CAPS）
  右：制作印记（如 "Crafted with nian-design · texture: Linen"）
```

---

## 硬规则总表（重构后）

```
── Token 铁律 ──
[ ] Rule 0 · Token 铁律 — CSS 无直接量色值/字号/间距/shadow，全部 var() 引用

── 视觉品质 ──
[ ] Rule 1 · Display 锚点 — 闭眼再睁眼，第一眼是锚点
[ ] Rule 1b · Hero Tension — Hero 恰好 1 跳 + 质感基底（新增）
[ ] Rule 2 · 排版节奏 — 字号有语义角色，ratio ≥ 1.5:1
[ ] Rule 3 · 构图张力 — 非 50/50 居中布局
[ ] Rule 4 · Visual Break — 恰好 1 处打破
[ ] Rule 5 · Visual Variety — ≥3 数据段时用 ≥2 形态

── 可读性/克制 ──
[ ] Rule 6 · Readability Floor — primary ≥4.5:1、secondary ≥3:1+≥14px（现有，不变）
[ ] Rule 6a · Texture Anchor — 每页 1 个质感锚点区，其余 ≤0.03（新增）
[ ] Rule 6b · Texture Coherence — 全页 1 种质感方案，不混搭（新增）
[ ] Rule 7 · Elevation Subtle — shadow 仅用于浮起元素，必须用 --shadow-* token
[ ] Rule 8 · 视觉负载 — 组件≤12/段落≤6/信息单元≤4
[ ] Rule 9 · 阅读节奏 — ≥5 section 至少 1 个呼吸 section
[ ] Rule 10 · 篇幅分界 — section>10 或>3000字 判断是否拆页

── 品牌贯穿 ──
[ ] Rule 11 · Brand Signature — Texture Base 必有；Watermark/Colophon 可豁免（新增）

── 文案层（贯穿，非硬门）──
[ ] 文案自检 — 名词短语/阿拉伯数字/结论先行/不用营销词
```

---

## 流水线影响

```
[nian-orchestrator] → [curatorial / viz] → [nian-decision-card] → [nian-design] → [nian-ui]
                                            ↑                          ↑
                                     新增字段：                    新增质感层/Hero 模式/
                                     textureProfile              品牌贯穿层
                                     textureAnchor
                                     brandOverride
```

**契约扩展，不破坏**：
- nian-decision-card：schema 加 3 个可选字段（向后兼容，缺失则 nian-design 自决）
- nian-ui：继承 nian-design 的 token + texture 体系，叙事骨架不变
- 上游 curatorial / viz：完全不受影响

---

## 适用边界

**适用**：数据分析报告、决策建议文档、品牌展示页、知识沉淀长文、SOP/操作手册（全部场景升级品牌质感）

**不适用**：品牌方指定设计规范的内容、纯文本备忘录、交互式 dashboard、即时通讯场景（不变）

---

## 验收标准

优化完成后，以下条件可验收：

1. **质感层落地**：texture-palette.css 存在且含 5 种方案，每种 SVG/CSS 实现可渲染
2. **Workflow 重构**：SKILL.md 含 Step 0.5，质感成为施工第一步
3. **资源收敛**：COMPONENTS-MASTER.md 标 CORE/EXTENDED，规则文件收敛到 5 个，变体收敛到 6 母版
4. **Hero 强化**：HERO-MODES.md 存在，4 种模式各有可复制骨架
5. **场景统一**：Rule 11 生效，COLOPHON.md 标准化，brandOverride 字段定义
6. **规则自洽**：CRAFT-RULES.md 与 SKILL.md 规则数一致（修复当前 8 vs 5 不同步问题）
7. **回归不破坏**：现有 nian-decision-card 输出（无新字段）仍可被 nian-design 施工

---

## 不做的事（YAGNI）

- 不新建技能（避免体系膨胀）
- 不推翻 brand-dna / token-root（好资产保留）
- 不改 nian-ui 的叙事骨架（只继承质感层）
- 不做质感方案的动态生成（5 种手工验证足够，自动化是过度工程）
- 不把质感规则做成自动 validator（SVG opacity 难自动校验，靠自检 + DevTools）

---

*2026-07-01 · 方案 B · 质感优先重构 · 经 brainstorming 5 节分步确认*
