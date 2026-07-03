# nian-design SKILL.md 减法重构 · diff 草案

> 状态:**草案,未落盘**。审批后才写入 `.agents/skills/nian-design/SKILL.md`。
> 原则:叙事先行 > 质感先行;5 铁律 > 15 硬规则;删掉"删了不会掉高级感"的层。
> 本轮只动 SKILL.md;references/ 留下一轮。

---

## 改动总览(6 刀)

| # | 位置 | 现状(加法版) | 改为(减法版) | 理由 |
|---|------|------|------|------|
| 1 | frontmatter description | "品牌质感施工方…质感先行…12核心集" | "品牌叙事施工方…叙事先行…6核心组件" | 人格从"施工手段"回到"讲好一个故事" |
| 2 | 设计直觉 5 行 | 第一条=质感先行 | 第一条=提炼 The One Line | 叙事是骨,质感是皮 |
| 3 | Step 0.5 定质感 | 5 质感 + 决策矩阵 + 锚点 | 删决策矩阵,默认 1 种 Bond,并入 Step 3 | 5→1,消灭"事后装饰"陷阱 |
| 4 | Step 1.5 BRAND-PLAYBOOK | 方言/配方/手法词典整层 | **整步删除** | 最重加法,与"决策卡已定气质"重复 |
| 5 | Step 4 硬规则 | 15 条(0/1/1b/2/3/4/5/6/6a/6b/7/8/9/10/11) | **5 铁律** | 只留"删了高级感会掉"的 |
| 6 | 技能边界 | 已列不适用 | 保留 + 顶部加"元规则" | 明确边界即减法 |

---

## 逐处 diff

### ① frontmatter(第 1-6 行)
```diff
 description: |
-  nian-design — 品牌质感施工方。Haglöfs 15色调色板 + 工艺质感层 + 15 项硬规则。
-  输入:上游 nian-decision-card 产出的决策卡。输出:有品牌高级感的 HTML。
-  工艺质感派(Hermès/观夏范式)——质感先行,组件从 12 核心集选取。
+  nian-design — 品牌叙事施工方。Haglöfs 15色调色板 + 6 核心组件 + 5 条铁律。
+  输入:上游 nian-decision-card 产出的决策卡。输出:讲好一个品牌故事的 HTML。
+  叙事先行——先立一句话主张(The One Line),再选组件承托叙事。
```

### ② 顶部人格宣言(第 8-14 行)
```diff
-> **我是品牌质感施工方,不是设计师。**
+> **我是品牌叙事施工方,不是设计师。**
 > 上游 `nian-decision-card` 出决策卡,我照决策卡施工。
-> **质感先行**:先定材质身份(纸/金属/亚麻),再选组件——材质是品牌的骨,组件是肉。
-> 组件从 `COMPONENTS-MASTER.md`(63 组件 A-H)按 **P0 优先** 选取。
+> **叙事先行**:先立一句话主张(The One Line),再选组件承托叙事——叙事是骨,组件是肉,质感是皮。
+> 组件从 6 个品牌核心集选取(Statement Hero / Pull Quote / Eyebrow+Header / Ghost Watermark / KPI Card / Colophon)。
 > Haglöfs 15色调色板是唯一颜色信源(`token-root.css`),不自创色值。
-> 15 项硬规则全部通过才能输出。
+> 5 条铁律全部通过才能输出。
```

### ③ 设计直觉 5 行摘要(第 18 行起)
```diff
-- **质感先行**:施工第一步是定材质身份(Linen/Kraft/Bond/Forge/Ink 5 选 1)…详见 Step 0.5
+- **叙事先行**:施工第一步是从决策卡 source.narrative 提炼一句话主张(The One Line),它就是 Hero 的锚点。详见 Step 1
+- **Answer 唯一**:全页只讲一个结论,眯眼测试第一眼必须命中它(第一铁律)
 - **Haglöfs 15 色**:(保留不动)
 - **三层金字塔**:Answer→Argument→Evidence(保留)
 - **8:1 底线**:(保留)
 - **一处打破**:(保留)
+(删除"克制立体/意图别名"等展开——降为 CRAFT-RULES 内部细则,主文件不铺开)
```

### ④ Step 0.5(第 ~95-125 行)—— 降级并入 Step 3
```diff
-### Step 0.5 · 定质感调性 🎨
-…5 质感决策矩阵 + 锚点 section + 施工动作…
+(删除整个 Step 0.5。质感降为 Step 3 里一句默认规则:)
+> 默认全页统一 Bond 装帧纸质感(opacity ≤0.04),Hero 为唯一质感锚点。
+> 需换质感时才查 texture-palette.css,否则不选。
```

### ⑤ Step 1.5 BRAND-PLAYBOOK(第 ~200-230 行)—— 整步删除
```diff
-### Step 1.5 · 查 BRAND-PLAYBOOK 定配方 🎯
-…定方言(4选1)+ 选配方 + 取手法代码块 + 8 条施工铁律…
+(整步删除。理由:决策卡已定气质,方言/配方/手法词典是重复的第二套决策系统,
+ 是最典型的"删了也不掉高级感"的加法层。装饰类手法需要时并入 Step 2件库。)
```

### ⑥ Step 4 硬规则(第 ~290-320 行)—— 15 → 5
```diff
-[ ] Rule 0 Token铁律 / Rule 1 Display锚点 / Rule 1b Hero Tension /
-    Rule 2 排版节奏 / Rule 3 构图张力 / Rule 4 Visual Break /
-    Rule 5 Visual Variety / Rule 6a Texture Anchor / Rule 6b Texture Coherence /
-    Rule 6 Readability / Rule 7 Elevation / Rule 8 视觉负载 /
-    Rule 9 阅读节奏 / Rule 10 篇幅分界 / Rule 11 Brand Signature
+── 5 条铁律(全过才输出)──
+[ ] 铁律1 · Answer 唯一 — 眯眼测试第一眼命中唯一结论
+[ ] 铁律2 · 灰度先于颜色 — 中性阶梯撑 80% 画面,信号色每页 ≤2 处
+[ ] 铁律3 · 一处打破 — 恰好 1 处越界(ghost 水印首选)
+[ ] 铁律4 · 不对称构图 — 非 50/50 居中
+[ ] 铁律5 · 品牌一致 — Colophon 签名 + 全页 1 种质感
+(删除的规则不是消失,而是降为 CRAFT-RULES.md 内部质量建议,不再是输出门槛)
```

### ⑦ 元规则(技能边界顶部,新增)
```diff
+> **元规则(每次施工前默念):删掉它,高级感会下降吗?不会就删。**
+> 留白 > 装饰。叙事专注 > 手段堆砌。
 ## 技能边界
```

---

## 副作用清单(审批时请留意)

- Step 编号会顺移:删 0.5 与 1.5 后,WORKFLOW 从"5步走+2门"精简为"叙事→取骨架→填内容→5铁律→输出"。
- references/BRAND-PLAYBOOK.md、texture-palette.css 本轮**不删文件**,仅在 SKILL.md 断开引用,避免误伤下游。
- validator 脚本仍查 30 token,与铁律不冲突,不改。
- 参考文件索引表需同步去掉 BRAND-PLAYBOOK / Step 0.5 行(落盘时一并处理)。

---

## 一句话
把 nian-design 从"先铺 5 种质感、再套方言配方、最后过 15 关"的施工线,收回成"先立一句话主张,选 6 个核心组件承托它,过 5 关就交货"的叙事者。