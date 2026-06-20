# 契约对账 — decision-card ↔ nian-design

> P4 产出。验证决策卡字段是否真的被 nian-design 施工侧消费，以及施工侧描述是否与源文件一致。
> 这是端到端样例链的轻量版：不空跑完整 HTML，而是用对账表暴露契约 gap。

---

## 对账方法

读 nian-design 的 SKILL.md / CRAFT-RULES.md / checklist.md / DESIGN-SYSTEM-MAP.md，逐项检查：
1. 决策卡每个字段是否被施工侧明确消费
2. 施工侧描述的枚举数是否与源文件（components.md/layouts.md）一致
3. 硬规则与决策卡字段是否对齐

---

## 一、字段消费对账

| 决策卡字段 | nian-design 消费位置 | 消费方式 | 状态 |
|---|---|---|---|
| `branch` | SKILL.md Step 1 | 读取但不影响施工分支 | ✅ |
| `visualStream` | SKILL.md Step 1/2C | 决定 Hero 与骨架基调，查 VISUAL-STREAMS.md 克制规则 | ✅ |
| `structuralStream` | SKILL.md Step 1 | 读取但 Step 2 未明确如何叠加施工 | ⚠️ gap-1 |
| `layoutSequence` | SKILL.md Step 2C | 每个 section 的 `data-layout` 值，查 layouts.md | ✅ |
| `heroType` | SKILL.md Step 1/2C | 决定 Hero 组件，但 Step 2C 字段映射表未列 heroType | ⚠️ gap-2 |
| `components` | SKILL.md Step 2C | 从 components.md 取组件 HTML+CSS | ✅ |
| `breakPoint` | SKILL.md Step 3 | 落实打破，按 method+spec 实现 | ⚠️ gap-3 |
| `palette` | SKILL.md Step 2C/3 | baseMode 决定亮/深 token，primary/accent 未明确消费 | ⚠️ gap-4 |
| `dataCharts` | SKILL.md Step 3 | 嵌入 embedSection，按 size 定占位 | ✅ |
| `source` | SKILL.md Step 3 | narrative 溯源上游内容 | ✅ |

**结论**：10 字段中 6 个明确消费，4 个有 gap。

---

## 二、枚举漂移对账

### nian-design 侧过时枚举（12 处）

| 文件 | 行 | 写的 | 实际 | 类型 |
|---|---|---|---|---|
| SKILL.md | 4 | 26 组件族 | 32 族 | description |
| SKILL.md | 13 | 26 族 | 32 族 | 正文 |
| SKILL.md | 58 | 26 族 | 32 族 | yaml 注释 |
| SKILL.md | 109 | S01-S29 | S01-S28 | 字段映射表 |
| SKILL.md | 214 | 26 组件族 | 32 族 | 参考文件表 |
| SKILL.md | 216 | S01-S29 | S01-S28 | 参考文件表 |
| DESIGN-SYSTEM-MAP.md | 22 | S01-S29 | S01-S28 | 框图 |
| DESIGN-SYSTEM-MAP.md | 26 | 26 组件族 | 32 族 | 框图 |
| DESIGN-SYSTEM-MAP.md | 55 | 26 组件族 | 32 族 | 正文 |
| DESIGN-SYSTEM-MAP.md | 70 | S01-S29 | S01-S28 | 正文 |
| DESIGN-SYSTEM-MAP.md | 166 | 26 组件族 | 32 族 | 文件树 |
| checklist.md | 22 | S01-S21 | S01-S28 | P0 红线 |
| checklist.md | 109 | S01-S12 | S01-S28 | 自检命令注释 |
| showcase-index.md | 4 | S01-S21 | S01-S28 | 正文 |

**结论**：nian-design 侧元数据漂移比 decision-card 侧更严重（14 处 vs 6 处）。`--lint-self` 只扫 decision-card 自身，不扫下游——这是防御盲区。

### 饱和度规则与 token 冲突

checklist P0-9 规定"所有色彩饱和度 ≤30%"，但 tokens.md 的 `--yellow #FFD100` 饱和度 100%、`--orange #E55B2B` 饱和度 ~75%。Accent 色本身就是高饱和——这是 nian 体系的设计张力，不是 bug，但红线规则表述与 token 体系冲突，会让施工方困惑。

---

## 三、硬规则对账

### Rule 4 · One-Break 与 breakPoint.method 对齐

| breakPoint.method（决策卡） | CRAFT-RULES 打破形态 | 对齐 |
|---|---|---|
| `ghost水印` | Ghost 大字（Playfair italic/Doto，opacity 0.04-0.10） | ✅ |
| `超大数字` | （未列） | ⚠️ gap-5 |
| `accent色` | 异色强调（--yellow/--orange 一处） | ✅ |
| `异形元素` | 异形元素（圆/斜/异尺寸） | ✅ |
| （未列） | 出血图片（1 张，跨 section 边界） | ⚠️ gap-6 |

**gap-5**：决策卡有"超大数字"但 CRAFT-RULES 没列。岐力样例正是用"超大数字 39%"——说明这是常用形态，CRAFT-RULES 应补。
**gap-6**：CRAFT-RULES 有"出血图片"但决策卡 method 枚举没有。施工侧若想用出血图片，决策卡无法表达。

### Rule 5 · Visual Variety 与 dataCharts 对齐

CRAFT-RULES Rule 5 要求"≥3 数据段时用 ≥2 视觉形态"。决策卡 `dataCharts` 只规定 `size`（full/half/third），不规定视觉形态。视觉形态由 viz-design 产物决定——决策卡不介入，这是对的。但施工侧若发现 viz-design 产物全是条形图（1 种形态），该如何处理？未规定。

---

## 四、修复清单

### 立即修（元数据漂移，无歧义）

- [ ] nian-design SKILL.md 6 处：26→32，S01-S29→S01-S28
- [ ] nian-design DESIGN-SYSTEM-MAP.md 5 处：同上
- [ ] nian-design checklist.md 2 处：S01-S21→S01-S28，S01-S12→S01-S28
- [ ] nian-design showcase-index.md 1 处：S01-S21→S01-S28

### 需设计决策（gap）

- [ ] **gap-1** structuralStream 叠加施工：SKILL.md Step 2 应明确"结构型如何叠加到视觉型骨架上"
- [ ] **gap-2** heroType 字段映射表：SKILL.md Step 2C 字段映射表应补 heroType 行
- [ ] **gap-3** breakPoint.method 与 CRAFT-RULES 打破形态对齐：补"超大数字"到 CRAFT-RULES，或补"出血图片"到决策卡 method 枚举
- [ ] **gap-4** palette.primary/accent 消费：SKILL.md 应明确 primary 决定哪些元素、accent 决定哪些
- [ ] **gap-5** 同 gap-3
- [ ] **gap-6** 同 gap-3
- [ ] **饱和度规则**：checklist P0-9 应改为"Accent 色除外"或明确 yellow/orange 是例外

### 防御盲区

- [ ] `--lint-self` 当前只扫 decision-card 自身，应扩展到扫描 nian-design 侧文档（或 nian-design 建自己的 lint-self）

---

## 五、验证方式

修复后重跑：
```bash
# decision-card 自检
python3 .agents/skills/nian-decision-card/scripts/validate-decision-card.py --lint-self

# 手动 grep 确认 nian-design 侧无残留
grep -rnE "26 ?组件|26 ?族|S01-S29|S01-S21|S01-S12" .agents/skills/nian-design/
```

---

*最后更新：2026-06-19 — P4 契约对账 v1，发现 14 处元数据漂移 + 6 个契约 gap*
