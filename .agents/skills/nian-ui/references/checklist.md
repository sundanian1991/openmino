# 质量检查清单

> P0/P1/P2/P3 分级体系。P0 是红线，不通过不交付。每交付件生成后逐项自检。

---

## P0 · 红线（不通过不交付）

| # | 规则 | 检查方式 |
|---|------|---------|
| 0-1 | 禁止渐变、阴影、模糊、毛玻璃 | grep `linear-gradient\|box-shadow\|blur\|backdrop-filter` |
| 0-2 | 禁止深色模式、深浅切换 | 全局只用 `--bg` #FAFAF8，无 `@media (prefers-color-scheme: dark)` |
| 0-3 | 禁止 emoji | grep 或目测 |
| 0-4 | 颜色必须从 nian 令牌引用，不硬编码 hex | grep `#[0-9a-fA-F]\{6\}` 排除 `var(--` 和展示页 |
| 0-5 | 禁止圆角 > 8px（pill 按钮用 999px 除外） | grep `border-radius` 排除 `radius-lg` 和 `999px` |
| 0-6 | 禁止用颜色区分数据时跳过 opacity/梯度直接上 accent | 目测检查数据可视化颜色序列 |
| 0-7 | 禁止斑马纹、填充图标、骨架屏 | 目测 |
| 0-8 | 禁止视差、滚动劫持、弹跳缓动 | 目测 |

---

## P1 · 必查（每页必过）

| # | 规则 | 说明 |
|---|------|------|
| 1-1 | **三层金字塔** | 眯眼看，Answer 层是否主导？等大元素+等距=视觉扁平 |
| 1-2 | **工业冲击力** | Hero（96–120px）与 Body（14–16px）比值必须 > **8:1** |
| 1-3 | **字体三工** | Playfair Display=展示 / Inter=正文 / JetBrains Mono=数据。永不混用角色 |
| 1-4 | **每页最多 3 字体 + 3 字号 + 2 字重** | 不超过这个上限 |
| 1-5 | **单一场景色** | 同一页面只用一个场景色（olive / earth / glacier） |
| 1-6 | **accent-orange 仅用于功能信号** | 不做装饰，只用于"需要关注"的元素 |
| 1-7 | **灰度先于颜色建立层级** | 4 级灰度可见：display 100% → primary 90% → secondary 60% → disabled 40% |
| 1-8 | **间距优先于分割线** | 先用间距分组；需要分割线时只允许 hairline（1px） |
| 1-9 | **容器策略** | 间距 → hairline → `--scene-rock` 边框 → `--surface` 背景卡。用最轻的 |
| 1-10 | **Answer 层浮动** | 永远不要框住最重要的元素。不加边框/背景卡包裹品牌宣言 |
| 1-11 | **Hero 字号限高** | `font-size: min(Xvw, Yvh)` 双约束，Y >= X × 1.6 |
| 1-12 | **底部内容不触及 nav 安全区** | 内容最低处与页面底部保留 ≥ 8vh |
| 1-13 | **JetBrains Mono ALL CAPS 标签** | mono 标签必须大写 + 0.06em letter-spacing |

---

## P2 · 推荐（尽量做到）

| # | 规则 | 说明 |
|---|------|------|
| 2-1 | **不对称 > 对称** | 居中布局感觉平庸。偏好左大右小/上重下轻/边缘锚定 |
| 2-2 | **每页恰好一处"打破"** | 一个超大数字 / 一个 accent 色 / 一个巨大间距 / 一个异形元素 |
| 2-3 | **LED Card 模式** | 数据密集页用 JetBrains Mono 48–64px 替代 Playfair Display 做 hero 数字 |
| 2-4 | **数据可视化颜色顺序** | 先 opacity → 再 earth-tone 梯度 → 最后才 accent 色 |
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

## 自检流水线

```bash
# P0 快速检查
grep -rn 'linear-gradient\|box-shadow.*0\|blur\|backdrop-filter\|emoji\|border-radius' templates/ --include='*.html'

# P1 字体角色检查（Display 字体不应出现在 body 中）
grep -rn 'font-family.*Playfair Display\|font-family.*Georgia' templates/ --include='*.html' | grep -i 'body\|p \|\.body'

# P1 硬编码颜色检查
grep -rn '\#[0-9a-fA-F]\{6\}' references/ --include='*.css' | grep -v 'var(--'

# 组件分类映射检查（见 all-components.md 附录）
```

---

*基于 nian-design SKILL.md + tokens.md 提炼，2026-06-01*
