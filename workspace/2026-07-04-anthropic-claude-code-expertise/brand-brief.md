# 品牌施工蓝图 · Anthropic Claude Code 报告解读长文

> v2 — 判断修正版。v1 把长文误判为数据报告（Q1 错），导致全链错配。
> 本版 Q1 修正为「讲一个故事（深度文章）」，走 CT-1 长文组件链。

---

## 判断区（design-judgment 8 问 · v2 修正）

- **Q1 内容本质**：✏️ **修正**：讲一个故事（深度文章/评论），不是数据报告。原文有作者声音（"本来没太当回事……还是忍不住想分享"）、口语化过渡（"好，接下来的问题就是"）、叙事钩子标题（01–06）、金句靠上下文蓄力。是 CT-1 长文 DNA。
- **Q2 primary（唯一锚点）**：✏️ **修正**：标题那句"在 AI 面前，你的专家资历归零了"——全文为它蓄力。70%/80% 分工只是第二个章节的论据，不是 primary。
- **Q3 情绪温度**：温暖/共鸣/归属（作者与读者对话感）+ 精确（数据可信）。不是冷的仪表盘，是有体温的解读。
- **Q4 信息层次**：
  - primary：专家资历归零（标题主张）
  - secondary：人管判断AI管执行 / 5倍差距 / 翻车分水岭
  - tertiary：趋势数据、职业排名、检查清单
- **Q5 叙事弧线**：引子（不当回事→被打动）→论点（分工）→重新定义（专家不看资历）→数据（5倍）→转折（翻车才是分水岭）→反转（管理者>工程师）→收束（三件事+余韵）。**归纳式叙事，有起伏转折，不是数据漏斗。**
- **Q6 克制度**：中克制。有留白有呼吸，1-2 强调色。长文默认，不是数据页的轻克制。
- **Q7 视觉气质**：✏️ **修正**：**手写感**（衬线+温润+柔和+低对比）为主，测绘感只在数据 inline 呈现时点缀。长文要"读"的温度，不是"扫"的精度。
- **Q8 换品牌成立吗**：否。核心是"专家资历归零"这个独有论证 + 作者个人解读视角。

## 施工决策（judgment-bridge 翻译 · v2）

- **内容本质**：讲一个故事 → 不走 Hero 母版，走 **Article Header**（阅读导向，不占满屏，标题后直接进正文）
- **情绪温度**：温暖/共鸣 → 配色承诺 **中克制**，主底 offwhite + forest-soft 浅底绿点缀。1 深段（footer）。
- **primary 类型**：一句主张/论点 → PRIMARY **Prose 叙述流**（保留作者声音），数据 inline 嵌入不抬到独立段
- **叙事弧线**：含转折（翻车分水岭）+ 反转（管理者>工程师）→ Prose 段落自然承载，不需独立对比组件
- **克制度**：中克制 → section padding **s-5xl (120px)**，一段 1-2 组件，留白为主
- **视觉气质**：手写感 → Drop Cap 首字装饰 + Pull Quote 杂志金句 + Reading Progress，衬线温度贯穿
- **联动组**：**P6 长文** · padding=120px · 分隔=Drop Cap+Pull Quote+章节分隔 · 宽度=**--c-read 720px** · 无数据组件主导

## 组件清单（CT-1 长文链 · 5 件套）

| 组件 | 来源 | 用途 |
|------|------|------|
| Article Header | rules-components-editorial.md | 标题区（tag+标题+副标题+meta，不占满屏） |
| Drop Cap | rules-components-editorial.md | 首段首字 Playfair 装饰（开篇仪式） |
| Prose | rules-components.md | 720px 收窄正文流（保留作者过渡句+口语化） |
| Pull Quote | rules-components-editorial.md | 段落级浮动金句（左浮+forest竖线，≤2个） |
| Reading Progress | rules-components-editorial.md | 顶部 2px 进度条（forest 填充） |
| Article Footer | rules-components-editorial.md | 浅底收束（作者位+相关阅读+标签） |

**深段配额**：仅 Footer 1 段深色。全文浅底 offwhite 阅读流，靠章节分隔+Drop Cap+Pull Quote 做节奏，不靠深浅交替。

**禁区**：不用 V5 Pulse Hero / Stat Grid / Tension Grid / Seam Benchmark / Report Cover / TOC / Chapter Header 大编号——这些是数据报告体例，长文不用。
