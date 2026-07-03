# 组件风格匹配审查报告

> 审查对象：haglofs-paradigm 技能的 23 个组件骨架（3 文件）
> 审查标准：Haglöfs 北欧户外范式风格基线（色彩 / 字体 / 间距 / 装饰 / 形状 5 维度）
> 审查性质：**只读审查**，未修改任何源文件
> 审查日期：2026-07-03

---

## 审查方法（5 维度）

对每个组件骨架逐项核对范式基线的 5 条硬约束：

| 维度 | 范式基线 | 判断信号 |
|------|----------|----------|
| **A 色彩一致性** | 哑光大地色（offwhite/charcoal/forest/moss），无高饱和，无渐变，全走 `var(--color-*)` | 是否出现硬编码 hex/rgba、信号色滥用、渐变 |
| **B 字体一致性** | Playfair（标题）+ Inter（正文）+ JetBrains Mono（标签/数据），角色不混 | 标题是否用 Playfair 而非 Georgia/其他；是否混入第 4 字体 |
| **C 间距一致性** | 梯队值 1/2/4/8/16/24/32/48/64/96/120px | 是否出现 12/20/28/40/60/80/100px 等非梯队值 |
| **D 装饰一致性** | tag 前缀线、巨字水印、点阵、测绘基准线美学 | 装饰元素是否在同一范式内（前缀线统一 / 圆点统一 / 不冲突） |
| **E 形状一致性** | radius ≤8px，哑光克制，无大圆角 | radius 是否超标；是否有渐变/阴影/模糊替代边框分层 |

判定标记：✓ 一致 / ⚠ 轻微偏离（单点问题，不破坏整体范式） / ✗ 明显跑偏（系统性或硬性违反基线）

**审查口径说明**：组件骨架是「规则说明」而非「成品 CSS」。一些文档明确标注为"债"（legacy debt）或"展示内容例外"（docs 例外）的项，按其自述语境酌情判定——但范式基线的硬约束（如字体角色、半径上限）即使标注为债仍按偏离计。

---

## 逐组件审查结果（23 个）

### A. 数据导向组件（rules-components.md，13 个）

#### 1. Tension Grid（张力网格）— ⚠ 轻微偏离
- **A 色彩**：✓ 背景 `var(--color-charcoal)`；分隔线用 `rgba(255,255,255,.08)`（文档已自标为"样本遗留债"，深底语义合理）
- **B 字体**：✗ `.tension-item__side` 指定 **Georgia 24px**——基线要求 Playfair
- **C 间距**：⚠ item padding `60px` 非梯队值（梯队无 60px）
- **D 装饰**：✓ rgba 细线无缝分隔是合理张力语言
- **E 形状**：✓ gap:0 无圆角

#### 2. Tension List（张力列表）— ⚠ 轻微偏离
- **A 色彩**：✓ `var(--color-cream)`；badge 用 `var(--color-signal-orange)`（信号色，符合徽章语义）
- **B 字体**：✗ `.list__title` 指定 **Georgia 20px**——基线要求 Playfair
- **C 间距**：⚠ `padding:28px 40px` 均非梯队值；H031 版 gap `12px` 非梯队值
- **D 装饰**：✓ hover translateX(8px) 牵引动效合理
- **E 形状**：✓ 全宽行卡无圆角

#### 3. Tension Prose（品牌正文排版）— ✗ 明显跑偏
- **A 色彩**：✓ blockquote 用 `var(--color-signal-orange)`；pre 用 `var(--color-charcoal)`
- **B 字体**：✗ h2 "Georgia 32px"、h3 "24px"，**且禁忌③明文锁定"不得改用 sans-serif 做标题（Georgia 衬线是品牌 DNA）"**——这与基线"Playfair 扛标题"直接冲突，把 Georgia 误抬为品牌 DNA
- **C 间距**：⚠ `margin-top:80px`、hr `margin:80px` 均为非梯队值（文档自标 `s20` 为债）
- **D 装饰**：✓ max-width:680px 阅读节奏控制合理
- **E 形状**：✓ 无圆角

#### 4. Data Table（数据表）— ✓ 一致
- **A 色彩**：⚠ H031 选中行 `bg:rgba(74,93,58,.05)` 硬编码 olive 的 RGB（轻微，应走 token）
- **B 字体**：✓ th 用 mono uppercase（标签角色正确）
- **C 间距**：⚠ td `padding:16px 20px`，20px 非梯队值
- **D 装饰**：✓ 表头 mono + 行 hover 分层合理
- **E 形状**：✓ H031 版 `border-radius:8px`（恰在上限）

#### 5. Callout（提示框）— ✓ 一致
- **A 色彩**：✓ `var(--primary-olive)`/`var(--surface-raised)`；三色版用 `var(--color-signal-red)`/`var(--color-forest)`（信号色语义正确）
- **B 字体**：✓ title mono、body 次要色（无 Georgia）
- **C 间距**：⚠ `padding:16px 20px`，20px 非梯队值
- **D 装饰**：✓ 左边框 + 浅底锚点是范式标志
- **E 形状**：✓ 无圆角

#### 6. Checklist（检查清单）— ⚠ 轻微偏离
- **A 色彩**：✓ `var(--color-cream)`/`var(--color-sand)`/`var(--color-stone)` 全 token
- **B 字体**：✗ `.checklist-title` 指定 **Georgia 24px**——基线要求 Playfair
- **C 间距**：✓ `padding:48px`、`margin-bottom:32px`、`gap:16px` 均梯队
- **D 装饰**：✓ box 16px 方框 + 1.5px 描边合理
- **E 形状**：✓ box `radius:3px`（≤8px）

#### 7. Ring（环形指标）— ⚠ 轻微偏离
- **A 色彩**：✓ `var(--primary-olive)`/`var(--color-forest)`/`var(--border)`
- **B 字体**：✓ 数字标签 mono uppercase
- **C 间距**：✓ SVG 无布局间距问题
- **D 装饰**：✓ stroke-dasharray 环形是范式标志
- **命名**：⚠ `.hm__num`/`.hm__lbl`——`hm` 缩写晦涩，违反 block 名 kebab-case 自描述约定
- **E 形状**：✓ 圆环本质（非"大圆角"装饰）

#### 8. Pipeline（流程栈）— ✗ 明显跑偏
- **A 色彩**：✓ `.ptrl__d` 用 `var(--tda)`/`var(--olive)`（token，但 `--tda` 缩写晦涩）
- **B 字体**：✗ `.step-item__num` 指定 **Georgia 72px**，**且禁忌①明文锁定"步骤编号字体必须是 Georgia 衬线"**——再次把 Georgia 误定为范式字体
- **C 间距**：✓ 无布局间距硬伤
- **D 装饰**：✓ 进度点轨合理
- **命名**：✗ `.ptrl`/`.ptrl__d` 缩写晦涩（疑似 progress-track 缩写），非自描述，与 BEM 清晰约定冲突

#### 9. Layer（分层栈）— ⚠ 轻微偏离
- **A 色彩**：⚠ hover `color:#fff` 硬编码（应走 `var(--text-inverse)`）；`var(--primary-darkgray)` 用 token
- **B 字体**：✓ lyr__num/lyr__name 用 mono（数据角色正确）
- **C 间距**：⚠ `padding:var(--s5) var(--s6)` 即 20px 24px，20px 非梯队值
- **D 装饰**：✓ 纵向堆叠 + 占比条 + hover 反色合理
- **命名**：⚠ `.lyr` 缩写（应为 `.layer__row` 类自描述）
- **E 形状**：✓ 无圆角

#### 10. Swatch（色板指标卡）— ⚠ 轻微偏离
- **A 色彩**：⚠ face 色 `var(--olive)`/`var(--earth)`/`var(--glacier)`/`var(--pk)`——`earth/glacier/pk` 不在基线四色（offwhite/charcoal/forest/moss）内，是扩展品牌 token；dotline hover "org（橙）"用信号色做装饰（轻微）
- **B 字体**：✓ val 用 mono 3xl bold（数据精度感）
- **C 间距**：⚠ face `height:100px` 非梯队值
- **D 装饰**：✓ 色块面 + 点阵进度条是范式标志
- **命名**：⚠ `.sw` 缩写（应为 `.swatch__card`）
- **E 形状**：✓ `radius:4px`（≤8px）

#### 11. Grid Matrix（格点矩阵）— ⚠ 轻微偏离
- **A 色彩**：⚠ gap 背景 `rgba(255,255,255,.06)`、hover `rgba(74,93,58,.15)` 均硬编码 RGB（应走 token）
- **B 字体**：✓ lbl/val 用 mono（数据角色正确）
- **C 间距**：⚠ `padding:var(--s5) var(--s4)` 即 20px 16px，20px 非梯队值
- **D 装饰**：✓ 1px gap 切分网格是范式标志
- **命名**：⚠ `.mx` 缩写（应为 `.matrix__cell`）
- **E 形状**：✓ 无圆角

#### 12. Accordion（手风琴）— ✓ 一致
- **A 色彩**：✓ `var(--border-visible)`；深底变体全走 `var(--text-inverse-*)`/`var(--color-moss)`
- **B 字体**：✓ label mono、body 次要色（无 Georgia）
- **C 间距**：⚠ `padding:16px 0`、body `padding:0 0 20px`，20px 非梯队值
- **D 装饰**：✓ +/- 图标 + border 切分；深底 inverse 适配原则写得最完整
- **E 形状**：✓ 无圆角

#### 13. Code Block（代码块）— ✓ 一致
- **A 色彩**：✓ 浅底 `var(--color-charcoal)` head + `var(--color-cream)` body；深底 `var(--color-black)` head + `var(--color-charcoal)` body；token 分色全走 `var(--color-*)`
- **B 字体**：✓ JetBrains Mono 全程（精度角色正确）
- **C 间距**：✓ `padding:8px 16px`/`24px` 均梯队
- **D 装饰**：✓ filename head 反相锚点 + 状态点 6px
- **E 形状**：✓ `radius:4px`（≤8px）

---

### B. 品牌叙事组件（rules-components-brand.md，6 个）

#### 14. Manifesto Section（金句呼吸谷）— ✓ 一致
- **A 色彩**：✓ `var(--color-charcoal)` 底；`var(--text-inverse-*)`；tag 染 `var(--color-moss)`（明示 forest 在 charcoal 偏暗故用 moss）
- **B 字体**：✓ watermark/line 用 font-display（Playfair）；tag 用 font-data（Mono）
- **C 间距**：✓ max-width:720px；前缀线 32px 均梯队
- **D 装饰**：✓ 巨字水印 opacity 0.10（深底区间 0.08-0.12）+ 前缀线 tag，范式标志
- **E 形状**：✓ 无圆角

#### 15. Statement Quote（居中金句）— ✓ 一致
- **A 色彩**：✓ `var(--color-offwhite)`/cream alt；引号染 `var(--color-sand)`；source `var(--text-secondary)`
- **B 字体**：✓ text 用 font-display weight 300（Playfair 轻衬线）；source 用 font-body（Inter）
- **C 间距**：✓ `padding:var(--s-5xl)`=120px 大呼吸
- **D 装饰**：✓ 72px 引号装饰 + 居中呼吸
- **E 形状**：✓ 无圆角

#### 16. Product Card（产品展示卡）— ✓ 一致
- **A 色彩**：✓ `var(--color-cream)` 图区；`var(--border-rest)`；tag 染 `var(--color-moss)`
- **B 字体**：✓ name font-data mono（与 Swatch val 一致）；desc font-body Inter
- **C 间距**：✓ `padding:16px 24px`、gap `24px`/`8px` 均梯队
- **D 装饰**：✓ 明示"不要阴影/渐变 hover，用 border 变色"（A15 哑光克制）
- **E 形状**：✓ `radius:4px`（≤8px）；aspect-ratio 4/5 锁定

#### 17. Heritage Timeline（传承时间线）— ⚠ 轻微偏离
- **A 色彩**：✓ `var(--border-rest)`/`var(--color-offwhite)`/`var(--color-forest)`（frieze 圆点）
- **B 字体**：✓ year font-data mono（测绘基准线精度感）；title/desc font-body Inter（无 Georgia）
- **C 间距**：⚠ year `margin-bottom:12px`、frieze item `width:200px` 非梯队值
- **D 装饰**：✓ 圆点 + border-left frieze + 横向滚动隐藏滚动条，范式标志
- **E 形状**：✓ 圆点 50%（时间锚，非大圆角装饰）

#### 18. Footer（页脚）— ✓ 一致
- **A 色彩**：✓ `var(--color-black)` 终局；`var(--text-inverse-*)`；col-title 染 `var(--color-moss)`；hover `var(--link)`
- **B 字体**：✓ wordmark font-display（Playfair）；tagline font-body（Inter）；legal font-data（Mono）
- **C 间距**：✓ `padding:var(--s-5xl)` 等 token 化
- **D 装饰**：✓ 24px 前缀线 col-title + 发丝线 border-bottom
- **E 形状**：✓ 无圆角

#### 19. Principle Cards（编号原则卡）— ✓ 一致
- **A 色彩**：✓ num 染 `var(--color-sand)`（装饰色，非信息色）；desc `var(--text-secondary)`
- **B 字体**：✓ num/title font-display（Playfair）；desc font-body（Inter）
- **C 间距**：✓ `padding-top:var(--s-xl)` token 化
- **D 装饰**：✓ 顶部 1px 发丝线 + 无背景填充/阴影（A15 哑光克制）
- **E 形状**：✓ 无圆角

---

### C. 文档展示组件（rules-components-docs.md，4 个）

#### 20. Color Palette（色板批量展示）— ✓ 一致
- **A 色彩**：✓ face 走 `var(--color-*)`；hex 作展示内容（文档明示例外，不计硬编码/Signal 配额）
- **B 字体**：✓ name/hex font-data mono；role font-body Inter
- **C 间距**：✓ `gap:16px`/`48px` token 化
- **D 装饰**：✓ **前缀线 ::before 24px** group-label（与 Footer/Font Recipe 统一范式）
- **E 形状**：✓ face `radius:0`（明示方色块是色卡范式）

#### 21. Type Scale（字号阶梯）— ✓ 一致
- **A 色彩**：✓ `var(--text-primary)`/`var(--text-secondary)`/`var(--border-rest)`
- **B 字体**：✓ meta font-data mono；sample 用真实 clamp 值展示
- **C 间距**：✓ `gap:16px`/`24px`、`padding:16px 0` token 化
- **D 装饰**：✓ border-bottom 发丝线分层 + 固定 180px 名称列
- **E 形状**：✓ 无圆角

#### 22. Spacing Ladder（间距梯队条形）— ✓ 一致
- **A 色彩**：✓ bar `var(--color-sand)`（中性装饰，省 forest 配额）；track `var(--color-cream)`
- **B 字体**：✓ name/value font-data mono
- **C 间距**：✓ `gap:8px`/`24px` token 化；bar width 真实 px（展示内容例外）
- **D 装饰**：✓ 条形可视化梯队，固定 140px 名称列
- **E 形状**：✓ 方条 0 radius（明示梯队范式）

#### 23. Font Recipe（字体配方卡）— ⚠ 轻微偏离
- **A 色彩**：✓ role 染 `var(--color-moss)`；sample 染 `var(--color-sand)`
- **B 字体**：⚠ 引入**第 4 字体角色 Doto（Decorative）**——基线是 Playfair/Inter/JetBrains Mono 三字体，此处多出 Doto；其余 Display/Body/Data 角色正确
- **C 间距**：✓ `padding:32px`、`gap:24px` token 化
- **D 装饰**：✓ **前缀线 ::before 24px** role（与 Color Palette/Footer 统一）
- **E 形状**：✓ `radius:0`（明示文档克制美学）

---

## 风格跑偏的组件清单

按严重度排序。共 **2 个明显跑偏 + 9 个轻微偏离**。

### ✗ 明显跑偏（2 个）

#### 1. Tension Prose（品牌正文排版）
- **跑偏点**：标题字体系统性用 **Georgia** 而非 Playfair，且禁忌③**明文把 Georgia 抬为"品牌 DNA"**——这与基线"Playfair 扛标题温度"直接冲突，是最硬的范式违反。
- **影响**：作为"品牌正文排版系统"，它会感染所有用 Prose 的页面，使标题字体在数据组件页和品牌组件页之间产生分裂。
- **修法建议**：
  - 将所有 `Georgia` 替换为 `var(--font-display)`（Playfair）
  - 删除/改写禁忌③"不得改用 sans-serif 做标题（Georgia 衬线是品牌 DNA）" → "标题必须用 Playfair 衬线（`var(--font-display)`），不得用 sans-serif"
  - `margin:80px` 改为 `var(--s-4xl)`=64px 或 `var(--s-5xl)`=96px

#### 2. Pipeline（流程栈）
- **跑偏点**：①步骤编号锁定 **Georgia 72px**（同上，误定 Georgia 为范式字体）；②class 命名 `.ptrl`/`.ptrl__d` 缩写晦涩，违反 BEM block 名 kebab-case 自描述约定。
- **影响**：编号字体分裂 + 命名不透明（读者无法从 `.ptrl` 推断是进度轨）。
- **修法建议**：
  - `.step-item__num` 的 Georgia → `var(--font-display)`（Playfair）
  - 删除禁忌①"步骤编号字体必须是 Georgia 衬线"
  - `.ptrl`/`.ptrl__d` 重命名为 `.pipeline__track`/`.pipeline__dot`

### ⚠ 轻微偏离（9 个，按问题类型归并）

**类型一：Georgia 残留（与上面 2 个同源，但未在禁忌中硬锁）**
- **Tension Grid**（`.tension-item__side` Georgia 24px）、**Tension List**（`.list__title` Georgia 20px）、**Checklist**（`.checklist-title` Georgia 24px）——修法统一：Georgia → `var(--font-display)`

**类型二：硬编码颜色（未走 token）**
- **Data Table**（H031 选中行 `rgba(74,93,58,.05)`）、**Layer**（hover `color:#fff`）、**Grid Matrix**（gap `rgba(255,255,255,.06)` + hover `rgba(74,93,58,.15)`）——修法统一：rgba/hex → 对应 `var(--color-*)`/`var(--text-inverse)`

**类型三：非梯队间距值（多为 20px / 28px / 40px / 60px / 80px / 100px）**
- 数据组件普遍存在（Tension Grid 60px、Tension List 28/40/12px、Tension Prose 80px、Data Table/Callout/Layer/Grid Matrix/Accordion 的 20px、Swatch 100px）；**Heritage Timeline**（year margin 12px、frieze width 200px）——文档已自标部分为"样本遗留债"。修法：就近归并到梯队值（20px→16 或 24；28→24 或 32；40→32 或 48；60→48 或 64；80→64 或 96；100→96）

**类型四：BEM 命名缩写（block 名/element 名晦涩）**
- **Ring**（`.hm__num`/`.hm__lbl`）、**Layer**（`.lyr`）、**Swatch**（`.sw`）、**Grid Matrix**（`.mx`）、**Pipeline**（`.ptrl`）——均为缩写，违反"block 名 kebab-case 自描述"约定。修法：展开为自描述名（`.hero-metric__num`/`.layer__row`/`.swatch__card`/`.matrix__cell`/`.pipeline__track`）

**类型五：第 4 字体引入**
- **Font Recipe**（Decorative 角色用 **Doto**）——基线是三字体。需确认 Doto 是否为范式正式登记的装饰字体；若否，应从基线移除或并入范式字体定义。

---

## 三类组件（数据/品牌/文档）风格一致性评估

### 横向对比矩阵

| 维度 | 数据组件（13） | 品牌组件（6） | 文档组件（4） |
|------|---------------|--------------|--------------|
| **色彩** | ⚠ 多处硬编码 rgba/`#fff`；扩展 token（earth/glacier/pk） | ✓ 全 `var(--color-*)` 干净 | ✓ 全 `var(--color-*)`，hex 作展示例外 |
| **字体** | ✗ **5 个组件用 Georgia** | ✓ 全 font-display/body/data token | ✓ token 化，⚠ Font Recipe 引入 Doto |
| **间距** | ⚠ 普遍 20/28/40/60/80/100px 非梯队 | ✓ 全 `--s-*` token 化 | ✓ 全 `--s-*` token 化 |
| **装饰** | ⚠ 各用各的（rgba 线/dotline/进度点），**无统一前缀线范式** | ✓ 巨字水印 + 圆点 + 前缀线统一 | ✓ **前缀线 ::before 24px 统一范式** |
| **形状** | ✓ radius ≤8px | ✓ radius ≤4px/0 | ✓ radius 0 |
| **BEM 命名** | ⚠ 5 个缩写 block/element（hm/lyr/sw/mx/ptrl） | ✓ 全自描述 kebab-case | ✓ 全自描述 kebab-case |

### 关键发现：数据组件 vs 品牌/文档组件存在「风格断裂」

**品牌组件文件和文档组件文件本质上是同一次"现代 token 系统重写"的产物**——它们共享：
- 全 `--s-*` token 化间距
- `var(--color-*)` 干净引用
- Playfair/Inter/JetBrains Mono 三字体角色
- 统一的"前缀线 ::before 24px"装饰范式（Footer/Color Palette/Font Recipe 一致）
- 自描述 BEM kebab-case

**数据组件文件则保留了较多旧样本遗留债**：
- Georgia 字体（5 处，且 2 处禁忌硬锁）
- 硬编码 rgba/hex 颜色
- 非梯队间距值
- 缩写式 BEM 命名（hm/lyr/sw/mx/ptrl）
- 各自独立的装饰语言（无统一前缀线）

**结论：三类组件在"形状/色彩 token 化意图"层面属于同一范式，但在"字体角色 + 装饰语言 + 命名规范"层面，数据组件与品牌/文档组件存在明显的代际差异（数据组件偏旧，品牌/文档偏新）。最显著的断裂点是 Georgia vs Playfair——这是系统性的、贯穿 5 个数据组件的字体分裂，而非个别组件的偶发问题。**

---

## 总结：23 组件风格是否统一？

**判定：风格"基本统一但有清晰接缝"——统一度 7 / 10。**

- **统一的主体（约 70%）**：13 个 ✓ 组件 + 多数 ⚠ 组件的核心结构都遵循哑光大地色、≤8px radius、token 引用、测绘基准线美学的意图。品牌组件和文档组件几乎是完美的范式范本。
- **清晰的接缝（约 30%）**：数据组件文件存在系统性遗留债，集中在三个根因：
  1. **Georgia 字体**（贯穿 5 组件，2 处禁忌硬锁）——最严重的范式分裂
  2. **非梯队间距**（20/28/40/60/80/100px 普遍存在）
  3. **缩写式 BEM + 硬编码颜色**（5 个缩写 block、多处 rgba/`#fff`）

**最高优先级修复**：统一字体角色（Georgia → Playfair）一项即可消除最显眼的风格断裂，将统一度从 7 提升至约 8.5。其次是非梯队间距归并和颜色 token 化，可进一步提升至 9+。

**一句话**：组件库骨架在"理念层"是同一个北欧户外范式，但在"实现层"的字体/间距/命名上，数据组件还停留在上一代样本，需要一次对齐到品牌/文档组件已建立的新 token 标准的"代际升级"。
