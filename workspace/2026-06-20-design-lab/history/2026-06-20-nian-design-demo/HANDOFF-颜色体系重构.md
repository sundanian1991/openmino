# Handoff · nian-design 颜色体系重构

> **新对话开头：让 AI 先读本文件，可恢复全部上下文。**
> 创建：2026-06-21 · 上一轮对话从"颜色雾蒙蒙"一路推进到"颜色使用规则定稿"

---

## 一、这件事的起源和目标

用户（sundanian）花了一天半整理 nian-design 技能的组件库。过程中发现一个根本问题：**色板越调越丰富，但没有"什么时候该用什么色"的规则，导致所有元素往同一种颜色靠，最终灰蒙蒙、没质感。**

经过 mentor-mode 对话深挖，定位到真正的设计个性锚点：**用户喜欢的是 Haglofs（北欧户外品牌）那套哑光大地色——"不张扬但有分量、克制"。** 这个调性最初体现在 H001，后续做的 H061/H062/haglofs-component-showcase 是同源。

**最终目标**：用 Haglofs 15 色替换现在 nian 的工业 7 色，并建立完整的颜色使用规则，让组件调用时"有逻辑地用色"，不再灰蒙蒙。

---

## 二、关键决策（全部已和用户确认）

### 决策1：色板完全换成 Haglofs 15 色命名
- **不用**原来的 nian 7 色（olive/earth/yellow/orange/glacier/rock/darkgray）
- **改用** Haglofs 15 色，原命名保留
- 用户原话："色彩应该用 haglofs-component-showcase 里面的"

### 决策2：信号色定位
- signal-red/orange/yellow/blue 是"信号"用的，只在警示/链接场景
- 日常不用，饱和度高没关系（因为难得露面）
- 用户原话："信号色就是用来信号的，只在关键警示/链接场景用"

### 决策3：两个深色都要
- charcoal `#2D2A26` = 日常深色（文字/icon/border-strong）
- black `#1A1816` = 强深色块（hero/darkquote/收束页）
- 用户确认"两个都要，分场景"

### 决策4：颜色使用规则的 6 条原则（已验证）
1. 颜色有角色，分三层（中性阶梯/品牌色/信号色）
2. **中性阶梯是骨架，层次只走相邻级不跳级**（这是灰蒙蒙的根源）
3. 品牌色一页最多 2 个，明度拉开
4. 信号色每页 1-2 处，不装饰
5. 装饰元素用阶梯低位 + opacity
6. 深色块内部用 white + opacity，不用中性色

### 决策5：三个漏洞的补法（用户已确认）
- **涨跌色**：涨=moss `#7A9B6D`，跌=signal-red `#E8453C`
- **多段占比**：按阶梯链选——forest→moss→slate→steel→最后才碰信号色
- **卡中卡**：外层 white，内层 cream（阶梯相邻一级，不引入新色）

### 决策6：执行顺序
用户明确：**先 A（颜色规则定稿），再 B（排版 token + 文字角色规则），然后逐个替换组件 HTML。**

---

## 三、已完成产出（文件清单）

### 颜色规则
| 文件 | 位置 | 状态 |
|---|---|---|
| **COLOR-USAGE-RULES.md** | `~/.agents/skills/nian-design/references/` | ✅ 6原则+速查表+自检清单。**待补3个漏洞** |
| **color-rules-visual.html** | `workspace/2026-06-20-nian-design-demo/` | ✅ 可视化验证页，用户确认"是这个效果" |

### 色板
| 文件 | 位置 | 状态 |
|---|---|---|
| **token-root.css** | `~/.agents/skills/nian-design/references/templates/base/` | ⚠️ 已重写为 Haglofs 15色，**但有 bug：间距/圆角 token 丢失**（`--s-sm/lg/xl` `--r-sm/md` 等不在了），下一步A要修 |

### 组件库（更早完成的，颜色尚未替换）
| 文件 | 位置 | 状态 |
|---|---|---|
| **COMPONENTS-MASTER.md** | `~/.agents/skills/nian-design/references/` | ✅ 56个组件权威清单（A8+B10+C7+D10+E3+F14+G5），但用的还是旧 7 色命名 |
| **components-master-preview.html** | `workspace/2026-06-20-nian-design-demo/` | ✅ 56组件可视预览，旧色板 |
| **palette-comparison.html** | `workspace/2026-06-20-nian-design-demo/` | ✅ Haglofs vs nian 色板对比 |

### 早期产出（本次对话前完成，参考用）
- `COMPONENT-FORMS.md` — 已加用户审美锚点（建筑感/块面感/结构化优先）
- `CRAFT-RULES.md` — 5 硬规则
- `2026-reading-review.html` — demo 产出
- group1-4 HTML — 早期组件形态对比页（已被 MASTER 取代）

---

## 四、Haglofs 15 色（新地基，精确值）

```css
/* Surface 底色 */
--color-offwhite: #F5F3EF;   /* 主底 · 温润米白 */
--color-cream:    #E8E4DD;   /* 次级面/浅hover */
--color-sand:     #C4B8A8;   /* 边框/深hover */
--color-stone:    #8A7D6E;   /* 次要文字/disabled */

/* Text 深色 */
--color-charcoal: #2D2A26;   /* 日常深色 · 正文/icon */
--color-black:    #1A1816;   /* 强深色块 · hero/收束 */

/* Brand 品牌色 */
--color-forest:   #4A6741;   /* 主强调（替代旧 olive）*/
--color-moss:     #7A9B6D;   /* 辅强调/成功/涨 */
--color-slate:    #5B6B7A;   /* 冷调辅色 */
--color-steel:    #7A8B9B;   /* 浅冷辅 */

/* Signal 信号色（仅警示/链接）*/
--color-signal-red:    #E8453C;  /* 错误/跌/断崖 */
--color-signal-orange: #E87A3C;  /* 警告/section编号/打破点 */
--color-signal-yellow: #E8B83C;  /* 金句高亮 */
--color-signal-blue:   #3C7AE8;  /* 链接 */
```

### 中性阶梯（7级，骨架）
```
white #FFFFFF → offwhite #F5F3EF → cream #E8E4DD → sand #C4B8A8 → stone #8A7D6E → charcoal #2D2A26 → black #1A1816
LV0 卡片底      LV1 主底       LV2 次级面/浅hover LV3 边框/深hover LV4 次要文字  LV5 正文/icon   LV6 强深色块
```
**铁律：层次过渡只走相邻级，不跳级。**

---

## 五、下一步 A：颜色规则定稿 ✅ 已完成（2026-06-21）

### A1. 补三个漏洞到 COLOR-USAGE-RULES.md ✅
新增「补充：三个高频场景的配色处方」节（第六原则后、速查表前）：
- **涨跌色**：涨=moss `#7A9B6D`，跌=signal-red `#E8453C`。说明涨为何用 moss 不用 forest（forest 留主强调）。
- **多段占比色链**：`forest→moss→slate→steel`，第 5 段起用 signal-orange op.0.15。附 2/3/4/5 段配方表。
- **卡中卡**：外 white（surface）内 cream（surface-raised），只走相邻一级。附正误对照。
- 速查表补 7 行；自检清单从 7 条扩到 10 条。

### A2. token-root.css 的 bug — ⚠️ 不存在，已澄清
**原描述有误**：核实发现 token-root.css 的间距（`--s-sm`~`--s-5xl`）、圆角（`--r-xs`~`--r-lg`）、layout（`--gap/--gap-lg/--c-read`）token **全部完整**，无需修。该任务取消。

### A2b. 修校验脚本 validate-nian-deck.mjs ✅（原 handoff 漏列，已补做）
`scripts/validate-nian-deck.mjs` 第 53 行 REQUIRED_TOKENS 原硬编码旧 7 色（olive/earth/yellow/orange/glacier/rock/darkgray），色板换后会让所有新 HTML 误报。已：
- REQUIRED 改为 Haglofs 15 色（中性6+品牌4+信号4）+ 语义别名 + 字体，共 27 项。
- 顶部注释加 v2.1 changelog。
- 验证：`color-rules-visual.html` PASS（27/27 token，0 error）；`components-master-preview.html`（旧色板）正确报缺 16 token + 141 处硬编码——预期行为，该文件本应在 B 之后替换。

### A3. 可视化验证 ✅
`color-rules-visual.html` 加了 GAP1（涨跌）/GAP2（占比链）/GAP3（卡中卡）三个 section，插在信号色与深色块之间，复用现有 class 未加新 CSS。脚本校验 PASS。

**→ 颜色规则 A 全部定稿。B + C 也已完成（见下）。**

---

## 六、下一步 B：排版 token + 文字角色规则 ✅ 已完成（2026-06-21）

### B1. 补排版 token 到 token-root.css ✅
新增 4 段 token（解码自 H001/H061/H062/showcase/reading 五源数据）：
- **字号阶梯 9 档**：`--fs-deco/display/h1/h2/h3/body-lg/body/caption/data`
- **字重 5 档**：`--fw-light(300)/regular(400)/medium(500)/semibold(600)/bold(700)`
- **行高 5 档**：`--lh-tight(1.1)/snug(1.3)/body(1.65)/read(1.75)/data(1.4)`
- **字间距 4 档**：`--ls-tight(-.02em)/normal(0)/wide(.06em)/wider(.2em)`

### B2. 写 TYPOGRAPHY-RULES.md ✅
新建 `references/TYPOGRAPHY-RULES.md`（6 原则：四字体分工/字号阶梯/字重克制/行高/字间距/文字角色 strong-a-em + 速查表 + 9 项自检）。

### B3. 可视化 HTML 验证 ✅
新建 `workspace/2026-06-20-nian-design-demo/typography-rules-visual.html`（T1-T6 + 自检清单）。校验 PASS。
- **用户反馈修正**：① `.sec-lbl .id` 从 signal-orange 改中性灰（参考源一致，编号是框架字不该涂信号色）；② 黑气泡贴大字撞色 → 加 `.anno-soft`（cream 底）替代。

### B4. 字体体系修正（C5 带出）⚠️ 重要决策
**用户确认四字体体系是对的**（不是三字体）。token-root.css 补回：
- `--font-display`: **Playfair Display**（展示衬线，带 italic，比 Georgia 专业）+ Georgia fallback
- `--font-decorative`: **Doto**（装饰点阵体，仅 Hero/ghost/点阵）
TYPOGRAPHY-RULES 新增「第零原则：四字体分工」。

---

## 六之二、C · 体系一致性修复 ✅ 已完成（2026-06-21）

> B 做完后用户要求全面盘点 token/组件/规则体系。盘点发现 4 处内部矛盾 + 3 个缺口。用户定优先级：**先修一致性（技术债）**。

### 修复的 4 处打架
| 矛盾 | 修前 | 修后 |
|---|---|---|
| 色板新旧 | checklist/MAP/FORMS/CRAFT 有旧7色引用 | 4 文件清零，旧色只在已标弃用文件 |
| 暗色触发 | checklist 0-2 要 `-d` 后缀 | 统一 `.dark` 类（token-root 别名覆写） |
| 组件数 | MAP 写 26 族 / 29 layout | 56 组件 / 28 layout（对齐权威源） |
| 字体数 | token 3 字体 vs checklist 4 字体 | 4 字体统一（见 B4） |

### 旧文件加弃用声明（保留不删）
`tokens.md`（已声明）/ `COLOR-GUIDE.md`（新加）/ `components.md`（新加）/ `components-core.md`（新加）/ `components-extended.md`（新加）——全部头部加 ⚠️ 弃用声明，指向 token-root.css / COLOR-USAGE-RULES / COMPONENTS-MASTER。

### 自检结果
- 4 文件旧色引用 = 0 处
- checklist `-d` 后缀描述 = 0 处
- 两可视化页校验 PASS，0 error

---

## 六之三、剩余缺口（未做，等用户定优先级）

盘点发现的 3 个缺口，C（一致性）已修，剩 2 个：

### 缺口1 · 装饰色块/标签/徽章系统 ✅ 已完成（2026-06-21）
新建 `references/DECORATIVE-RULES.md` + `workspace/2026-06-20-nian-design-demo/decorative-rules-visual.html`。
解码自 H001/H062/showcase/reading 四源，定义 5 类装饰元素：
- ① **描边标签**（高频·中性灰描边·不限量）vs ② **填充标签**（低频·6 种语义色·每页≤4）——这就是用户说的"棕/橙红/奶棕/淡蓝/绿都可当标签"的系统化：填充标签按语义选色（forest推荐/moss成功/orange注意/red风险/stone中性/slate信息）。
- ③ **角落色块**（60×60·op.0.15·每页1-2）+ tension 网格四色编码（stone现状/moss机会/red风险/forest行动）。
- ④ **状态圆点**（6×6·do=moss/don't=red）。
- ⑤ **左侧强调线**（forest引用2px/orange推导2px+cream底/red警示3px）。
校验 PASS，0 error。

### 缺口2 · 暗色模式规则文档
token 层暗色齐全（.dark 别名覆写 22 项），但**没有 DARK-MODE-RULES.md**。何时用暗色、暗色内品牌色怎么提亮、深色块组件规则——都缺。C3 只统一了触发方式，没写用法规则。

**→ 缺口1 已完成（DECORATIVE-RULES.md + 可视化页，2026-06-21）。**

---

## 六之四、E · 组件库清质 ✅ 已完成（2026-06-21）

> 用户要求全面盘点组件 → 四家对比（nian/mino/nothing/aham）→ 发现 56 个组件 36% 有问题 → 用户定"先清质"。

### 修 F05 Tension Grid bug
"2×2"是假的（实为 1×2）→ 改真 2×2（4 item + 2行模板）。优先级 P1→P0 统一。旧色名 → 新色名。加角落色块编码说明。

### 删 2 个（被替代，归档后删）
- B04 Gauge（无抽象，B08 Radial 替代）
- B05 Dot Grid（被 B09 Waffle 取代）

### 合并 3 个（归档后删，内容并入目标）
- F09 Numbered Grid → A05 Three-Column
- F12 Compare Table → D01 Do/Don't（F12 标题自己就写"Do/Don't 表格变体"）
- F13 Pull Quote → F03 Quote（作第5变体）

### 保留的判断（用户定夺后）
- A07 Flip → **保留待补全**（功能独特，补 JS+暗色，下轮做）
- A08 Stacked + B03 Sparkline → **保留**（填补图片集/趋势线缺口，不能删）
- F06 Cluster Grid → **保留**（nian 独特，不并入 Bento）

### 56→52 组件（A8+B8+C7+D10+E3+F11+G5）
归档文件：`_archive/components-pruned-2026-06-21.md`
同步更新：DESIGN-SYSTEM-MAP / CHANGELOG / CRAFT-RULES 旧色名

---

## 七、之后：逐个替换组件 HTML

A+B+C+D+E 都定稿后，拿新颜色 + 新排版规则，**逐个替换** components-master-preview.html 里的 52 个组件。

**替换时重点检查**（用户要求："替换过程中告诉我哪些可能有问题"）：
- hover 是否走了相邻级（不是跳级）
- 品牌色是否 ≤2 个/section
- 信号色是否 ≤2 处
- 深色块是否用了 white+opacity
- 装饰元素是否用了阶梯低位+opacity
- 步骤号是否用 sand opacity 0.4

### 旧→新色名映射（替换时用）
```
olive(#4A5D3A)     → forest(#4A6741) 或 primary
earth(#8B7355)     → stone(#8A7D6E) 或 primary-2(moss)
yellow(#FFD100)    → signal-yellow(#E8B83C) 或 accent-2
orange(#E55B2B)    → signal-orange(#E87A3C) 或 accent
glacier(#2A4A5A)   → slate(#5B6B7A)
rock(#808080)      → sand(#C4B8A8)
darkgray(#2C2C2C)  → charcoal(#2D2A26)
bg(#FAFAF8)        → offwhite(#F5F3EF)
surface-raised(#F5F5F0) → cream(#E8E4DD)
border(#E5E5E0)    → sand(#C4B8A8)
```

---

## 八、重要提醒（给新对话的 AI）

1. **这个技能有两套副本**：全局 `~/.agents/skills/nian-design/`（实际被加载）和项目本地 `.agents/skills/nian-design/`（旧的分叉）。**所有改动都在全局版做。**

2. **用户审美锚点**：建筑感、块面感、结构化优先。不喜欢仪表盘的指针/弧线感。不喜欢高饱和色大面积铺。喜欢 Haglofs 哑光大地色。

3. **用户工作方式**：要看实际效果才决定。不要只给文字规则，要做成 HTML 让他验证。每一步都让他确认再推进。

4. **用户容易遇到的坑**：色板丰富但没规则 → 灰蒙蒙。这个坑的解法就是"中性阶梯 + 使用规则"，不是更多颜色。

5. **组件库现状**：56 个组件已在 COMPONENTS-MASTER.md，但用的还是旧 7 色命名。替换色板时变量名要批量改（olive→forest 等）。

6. **校验脚本**：`scripts/validate-nian-deck.mjs`（v2.1）REQUIRED token 已对齐 Haglofs 15 色，hex 白名单动态读 token-root.css。脚本现已与色板自洽。**注意**：仍用旧 7 色的 HTML（如 components-master-preview.html）跑脚本会报缺 token，属预期，待 B 之后替换。

7. **mentor-mode**：用户安装了 mentor-mode 技能。需要"保护主体性、提问优先于给答案"时可以激活。但本任务（颜色替换）是执行型任务，用 normal 模式即可。

---

## 九、对话脉络（供理解用户思路）

1. 用户问"颜色雾蒙蒙怎么办" → 发现双轨色板 → 修（但改错副本）→ 迁移到全局版
2. 做组件优先级 → 发现组件只有 6 种表达需求对比 → 用户要"全部组件" → 做 4 组 HTML
3. 用户反馈组件优先级 → 发现组件体系三套分裂 → 合并成 COMPONENTS-MASTER 56 个
4. 用户问"52够不够丰富" → 发现 F 类内容排版只有 6 个 → 吸收 mino 8 个 → 56 个
5. **用户说"想让技能年底好用"** → mentor 模式深挖 → 发现真正喜欢的是 Haglofs 哑光色
6. 确认 H001/H061/H062/showcase 是同一调性 → 解码出 6 条颜色使用规则 → 用户验证通过
7. 发现规则有 3 个漏洞 → 用户确认补法 → 发现排版 token 缺失 → 决定 A→B→替换的顺序
8. **当前节点：A 已全部完成（颜色规则定稿 + 脚本修复 + 可视化验证），进入 B（排版 token + 文字角色规则）**

---

*A 完成（颜色规则）· B 完成（排版+文字角色+四字体）· C 完成（体系一致性）· D 完成（装饰色块系统）· E 完成（组件清质 56→52）· 剩余：暗色规则文档 + A07 Flip 补全 + 图片卡族 · 2026-06-21*
