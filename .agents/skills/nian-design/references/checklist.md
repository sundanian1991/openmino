# 质量检查清单

> P0/P1/P2/P3 分级体系。P0 是红线，不通过不交付。每交付件生成后逐项自检。

---

## P0 · 红线（不通过不交付）

| # | 规则 | 检查方式 |
|---|------|---------|
| 0-1 | 禁止渐变、阴影、模糊、毛玻璃 | grep `linear-gradient\|box-shadow\|blur\|backdrop-filter` |
| 0-9 | 所有色彩饱和度 ≤30%（用 HSL 校验，S ≤ 30%） | 目测 + HSL 计算 |
| 0-10 | 画布叠加轻度布纹肌理（SVG noise，opacity 0.04-0.08） | 检查 CSS background-image 含 noise SVG |
| 0-2 | 深色模式需对照 components.md 双模式色板（亮色 `--bg` / 深色 `-d` 后缀），不可自由调暗 | 用深色时必须用 components.md 定义的 `-d` 系列 token，不自造深色值 |
| 0-3 | 禁止 emoji | grep 或目测 |
| 0-4 | 颜色必须从 nian 令牌引用，不硬编码 hex | grep `#[0-9a-fA-F]\{6\}` 排除 `var(--` 和展示页 |
| 0-5 | 禁止圆角 > 8px（pill 按钮用 999px 除外） | grep `border-radius` 排除 `radius-lg` 和 `999px` |
| 0-6 | 禁止用颜色区分数据时跳过 opacity/梯度直接上信号色 | 目测检查数据可视化颜色序列 |
| 0-7 | 禁止斑马纹、填充图标、骨架屏 | 目测 |
| 0-8 | 禁止视差、滚动劫持、弹跳缓动 | 目测 |
| **0-11** | **版式锁定：每个 `<section>` 必须有 `data-layout="S01"`~`"S28"`** | grep `data-layout` |
| **0-12** | **禁止发明 S01-S28 之外的骨架结构** | 对照 `references/layouts.md` |
| **0-13** | **图片网格用 `height:Nvh`，禁止用 `aspect-ratio` 撑容器** | grep `aspect-ratio` 在 grid 容器内 |
| **0-14** | **大字号双约束 `min(Xvw, Yvh)`，且 Y ≥ X × 1.6** | grep `font-size:min\(` 检查 Y/X 比值 |
| **0-15** | **底部内容不碰 nav 安全区（≥ 8vh）** | 目测 + grep `margin-top:auto` 在底部附近 |
| **0-16** | **Playfair Display 仅用于 Hero/标题，禁止出现在正文 p/body 中** | grep `font-family.*Playfair` 在 body 上下文 |
| **0-17** | **JetBrains Mono 标签必须 ALL CAPS + 0.06em letter-spacing** | grep `JetBrains Mono` 检查 text-transform |

---

## P1 · 必查（每页必过）

| # | 规则 | 说明 |
|---|------|------|
| 1-1 | **三层金字塔** | 眯眼看，Answer 层是否主导？等大元素+等距=视觉扁平 |
| 1-2 | **工业冲击力** | Hero（96–120px）与 Body（14–16px）比值必须 > **8:1** |
| 1-3 | **字体四工** | Playfair Display=展示 / Doto=装饰点阵 / Inter=正文 / JetBrains Mono=数据。永不混用角色。Doto 仅限 Hero/ghost/点阵 |
| 1-4 | **每页最多 4 字体 + 3 字号 + 2 字重** | Doto 装饰体计入 4 字体上限 |
| 1-5 | **单一场景色** | 同一页面只用一个场景色（Forest / Slate / Moss） |
| 1-6 | **signal-warning 仅用于功能信号** | 不做装饰，只用于"需要关注"的元素 |
| 1-7 | **灰度先于颜色建立层级** | 4 级灰度可见：display 100% → primary 90% → secondary 60% → disabled 40% |
| 1-8 | **间距优先于分割线** | 先用间距分组；需要分割线时只允许 hairline（1px） |
| 1-9 | **容器策略** | 间距 → hairline → `--brand-quaternary` 边框 → `--surface` 背景卡。用最轻的 |
| 1-10 | **Answer 层浮动** | 永远不要框住最重要的元素。不加边框/背景卡包裹品牌宣言 |
| 1-11 | **Hero 字号限高** | `font-size: min(Xvw, Yvh)` 双约束，Y >= X × 1.6 |
| 1-12 | **底部内容不触及 nav 安全区** | 内容最低处与页面底部保留 ≥ 8vh |
| 1-13 | **JetBrains Mono ALL CAPS 标签** | mono 标签必须大写 + 0.06em letter-spacing |
| **1-14** | **中文标题字号分档** | Playfair Display 中文标题按字符数降级：1行≤8字 `min(6.4vw,11.2vh)` / 2行≤8字 `min(5.8vw,10.2vh)` / 2行9-12字 `min(5.2vw,9.2vh)` / 3行+ 优先改写 |
| **1-15** | **同族视觉形式不连续** | 不连续两个 section 用同一种结构特征（视觉形式库 8 类上层抽象） |
| **1-16** | **卡片填充互斥** | 同一组卡片必须统一样式（都用 `--surface` 白底或都用 `--cream` 灰底），不要混用 |
| **1-17** | **图片容器直角无阴影** | 图片容器不加 `border-radius` / `box-shadow`，边界只用 1px hairline |

---

## P2 · 推荐（尽量做到）

| # | 规则 | 说明 |
|---|------|------|
| 2-1 | **不对称 > 对称** | 居中布局感觉平庸。偏好左大右小/上重下轻/边缘锚定 |
| 2-2 | **每页恰好一处"打破"** | 一个超大数字 / 一个 accent 色 / 一个巨大间距 / 一个异形元素 |
| 2-3 | **LED Card 模式** | 数据密集页用 JetBrains Mono 48–64px 替代 Playfair Display 做 hero 数字 |
| 2-4 | **数据可视化颜色顺序** | 先 opacity → 再 Nature 色梯度 → 最后才信号色 |
| 2-5 | **数据密集页的视觉多样性** | 3+ 数据 section 时变化视觉形式（hero 数字 / 进度条 / 内联条 / 迷你图） |
| 2-6 | **图片统一比例** | 同组图片必须统一比例、统一高度、统一背景 |
| 2-7 | **Lucide 图标统一** | 使用 CDN 加载 + 统一棱角风格。不混用圆胖图标 |
| 2-8 | **图片命名 `{页号}-{语义}.{ext}`** | 如 `01-cover.jpg`、`03-product.png` |

---

## P3 · 锦上添花（可选）

| # | 规则 |
|---|------|
| 3-1 | Ghost 装饰字（品牌年份/章节编号/关键词，opacity 6%，Playfair Display/Georgia） |
| 3-2 | 页眉条包含章节名 + 页码 |
| 3-3 | footnote 包含品牌名 + 版本号 |
| 3-4 | inline highlight 标记品牌关键词 |
| 3-5 | 装饰数字（B6 组件：超大透明 Playfair Display 数字 + 前景章节标题） |
| 3-6 | hairline 分隔线替代实体边框 |

---

## P4 · 审美自测（交付前逐条）

| # | 维度 | 检查 | 通过标准 | 失败处理 |
|---|------|------|---------|---------|
| 4-1 | 视觉节奏 | Answer 层是否主导？眯眼看，核心结论不被次要元素抢眼 | Hero 或核心结论一眼捕捉 | 放大 Hero 字号或缩小次要元素 |
| 4-2 | 视觉节奏 | 相邻 section 是否过于相似？ | 连续 3 section 底色/布局/组件至少两项不同 | 交替底色或切换布局族 |
| 4-3 | 视觉节奏 | 是否有呼吸点？（长 section 后跟稀疏 section） | 页面有节奏感，不全是同等密度 | 穿插留白 section |
| 4-4 | 对比暴力 | Hero 字号 ÷ 正文 ≥ 8:1？ | 用值计算，不凭感觉 | Hero 加大或正文减小 |
| 4-5 | 灰度层级 | Answer/Argument/Evidence 是否至少分 3 级灰度？ | display / primary / secondary 三级到位 | 把 Evidence 推到 secondary 或 disabled |
| 4-6 | 打破力度 | 恰好一处打破？ | 有且只有一个「意外」元素 | 加法：加一处；减法：去掉多余打破 |

---

## 自检流水线

```bash
# 自动化校验（推荐，覆盖 P0 大部分规则）
node <SKILL_ROOT>/scripts/validate-nian-deck.mjs path/to/output.html

# 手动补充检查：

# P0 快速检查
grep -rn 'linear-gradient\|box-shadow.*0\|blur\|backdrop-filter\|emoji\|border-radius' templates/ --include='*.html'

# P0 版式锁定检查
grep -c 'data-layout=' path/to/output.html  # 应等于 section 数量
grep -oP 'data-layout="[^"]+' path/to/output.html | sort -u  # 应只有 S01-S28

# P1 字体角色检查（Display 字体不应出现在 body 中）
grep -rn 'font-family.*Playfair Display\|font-family.*Georgia' templates/ --include='*.html' | grep -i 'body\|p \|\.body'

# P1 硬编码颜色检查
grep -rn '\#[0-9a-fA-F]\{6\}' references/ --include='*.css' | grep -v 'var(--'

# P1 中文标题字号检查
grep -E 'font-size:min\([0-9.]+vw' path/to/output.html  # 检查 Y/X ≥ 1.6

# 组件分类映射检查（见 all-components.md 附录）
```

---

*基于 nian-design SKILL.md + tokens.md 提炼，2026-06-01*
