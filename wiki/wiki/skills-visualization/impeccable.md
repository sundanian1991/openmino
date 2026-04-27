# Impeccable

> Sources: Anthropic / Community, 2026-04-25
> Raw: [SKILL.md](../../raw/skills/impeccable-SKILL.md); [reference/brand.md](../../raw/skills/impeccable-brand.md); [reference/product.md](../../raw/skills/impeccable-product.md); [reference/color-and-contrast.md](../../raw/skills/impeccable-color-and-contrast.md); [reference/interaction-design.md](../../raw/skills/impeccable-interaction-design.md); [reference/cognitive-load.md](../../raw/skills/impeccable-cognitive-load.md); [reference/motion-design.md](../../raw/skills/impeccable-motion-design.md); [reference/spatial-design.md](../../raw/skills/impeccable-spatial-design.md); [reference/responsive-design.md](../../raw/skills/impeccable-responsive-design.md); [reference/heuristics-scoring.md](../../raw/skills/impeccable-heuristics-scoring.md); [reference/craft.md](../../raw/skills/impeccable-craft.md); [reference/shape.md](../../raw/skills/impeccable-shape.md); [reference/critique.md](../../raw/skills/impeccable-critique.md); [reference/audit.md](../../raw/skills/impeccable-audit.md); [reference/polish.md](../../raw/skills/impeccable-polish.md); [reference/bolder.md](../../raw/skills/impeccable-bolder.md); [reference/quieter.md](../../raw/skills/impeccable-quieter.md); [reference/distill.md](../../raw/skills/impeccable-distill.md); [reference/harden.md](../../raw/skills/impeccable-harden.md); [reference/onboard.md](../../raw/skills/impeccable-onboard.md); [reference/animate.md](../../raw/skills/impeccable-animate.md); [reference/colorize.md](../../raw/skills/impeccable-colorize.md); [reference/typeset.md](../../raw/skills/impeccable-typeset.md); [reference/layout.md](../../raw/skills/impeccable-layout.md); [reference/delight.md](../../raw/skills/impeccable-delight.md); [reference/overdrive.md](../../raw/skills/impeccable-overdrive.md); [reference/clarify.md](../../raw/skills/impeccable-clarify.md); [reference/adapt.md](../../raw/skills/impeccable-adapt.md); [reference/optimize.md](../../raw/skills/impeccable-optimize.md); [reference/live.md](../../raw/skills/impeccable-live.md); [reference/teach.md](../../raw/skills/impeccable-teach.md); [reference/document.md](../../raw/skills/impeccable-document.md); [reference/extract.md](../../raw/skills/impeccable-extract.md); [reference/typography.md](../../raw/skills/impeccable-typography.md); [reference/ux-writing.md](../../raw/skills/impeccable-ux-writing.md); [reference/personas.md](../../raw/skills/impeccable-personas.md); [impeccable.bak SKILL](../../raw/skills/impeccable.bak-SKILL.md); [bak claude-design-system](../../raw/skills/impeccable.bak-claude-design-system.md); [bak color-and-contrast](../../raw/skills/impeccable.bak-color-and-contrast.md); [bak interaction-design](../../raw/skills/impeccable.bak-interaction-design.md); [bak motion-design](../../raw/skills/impeccable.bak-motion-design.md); [bak responsive-design](../../raw/skills/impeccable.bak-responsive-design.md); [bak spatial-design](../../raw/skills/impeccable.bak-spatial-design.md); [bak typography](../../raw/skills/impeccable.bak-typography.md); [bak ux-writing](../../raw/skills/impeccable.bak-ux-writing.md)

## Overview

Impeccable 是一个生产级前端设计技能（v3.0.1），用于设计、重塑、审查、审计、打磨、优化、适配前端界面。覆盖网站、落地页、仪表盘、产品 UI、应用外壳、组件、表单、设置、引导和空状态。处理 UX 审查、视觉层级、信息架构、认知负荷、无障碍性、性能、响应式行为、主题化、反模式、排版、间距、布局、对齐、颜色、动效、微交互、UX 文案、错误状态、边缘情况、i18n 和可复用设计系统/token。源自 Anthropic 的 frontend-design skill（Apache 2.0 许可）。

## 前置设置（不可跳过）

### 1. 上下文加载

两个项目根文件（大小写不敏感）：

- **PRODUCT.md**——必需。用户、品牌、语气、反参考、战略原则。
- **DESIGN.md**——可选，强烈推荐。颜色、排版、高程、组件。

通过 `scripts/load-context.mjs` 一次性加载。消费完整 JSON 输出。

如果 PRODUCT.md 缺失、空或占位符（`[TODO]` 标记、<200 字符）：运行 `/impeccable teach`，然后用新鲜上下文恢复用户原始任务。

如果 DESIGN.md 缺失：每会话提醒一次（*"运行 `/impeccable document` 获得更贴合品牌的输出"*），然后继续。

### 2. 注册（Register）

每个设计任务分为 **brand**（营销、落地页、活动、长文内容、作品集——设计就是产品）或 **product**（应用 UI、管理后台、仪表盘、工具——设计服务于产品）。

在设计前识别。优先级：（1）任务本身的线索（"landing page" vs "dashboard"）；（2）正在操作的表面（页面、文件或路由）；（3）PRODUCT.md 中的 `register` 字段。第一个匹配获胜。

## 共享设计法则

适用于所有设计，两种 register 通用。美学愿景与实现复杂度匹配——极简主义需要精确代码，最大化需要精致代码。

### 颜色

- **使用 OKLCH**。当亮度接近 0 或 100 时降低色度——极端亮度的高色度看起来刺眼
- **永远不使用 `#000` 或 `#fff`**。每个中性色都向品牌色色相倾斜（色度 0.005-0.01 就够）
- **选择颜色策略**，而非直接选色。四级承诺轴：
  - **Restrained**——调色中性色 + 一个 accent ≤10%。产品默认；品牌极简主义
  - **Committed**——一个饱和色承载 30-60% 的表面。品牌默认身份驱动页面
  - **Full palette**——3-4 个命名角色，每个都有意使用。品牌活动；产品数据可视化
  - **Drenched**——表面就是颜色。品牌 hero、活动页面
- "一个 accent ≤10%" 规则仅适用于 Restrained。Committed / Full palette / Drenched 有意超出它

### 主题

明暗不是默认选择。不是暗色"因为工具看起来酷"，不是亮色"为了安全"。

选择前写一句物理场景：谁用这个、在哪里、什么环境光、什么情绪。如果句子不能强制得出答案，说明还不够具体——添加细节直到能。

"可观测性仪表盘"不能强制答案。"SRE 在凌晨 2 点昏暗房间里扫一眼 27 寸显示器上的事故严重性"能。

### 排版

- 正文行长度限制 65-75ch
- 层级通过比例+字重对比（步骤间 ≥1.25 比率）。避免平坦比例

### 布局

- 变化间距创造节奏。到处相同 padding 是单调
- 卡片是懒惰答案。仅在确实是最佳选择时才用。嵌套卡片永远是错的
- 不要把所有东西都包在容器里

### 动效

- 不要动画化 CSS 布局属性
- 指数曲线缓出（ease-out-quart / quint / expo）。禁止弹跳、禁止弹性

### 绝对禁令（Match-and-refuse）

以下任何情况必须重写元素，使用不同结构：

- **侧边条纹边框**：卡片/列表/标注上的 `border-left` 或 `border-right` 大于 1px 的强调色。永远不是有意的
- **渐变文字**：`background-clip: text` + 渐变背景。装饰性，从无意义。用单色。强调用字重或尺寸
- **玻璃拟态作为默认**：模糊和玻璃卡片装饰性使用。稀有且有目的，或不用
- **hero-metric 模板**：大数字、小标签、辅助 stats、渐变强调。SaaS 陈词滥调
- **相同卡片网格**：图标+标题+文字的同尺寸卡片，无限重复
- **模态框作为首选**：模态框通常是懒惰。先穷尽 inline / progressive 替代方案

### 文案

- 每个词都挣得它的位置。不复述标题，不重复标题的引言
- **禁止破折号（em dash）**。用逗号、冒号、分号、句号或括号。也不用 `--`

### AI slop 测试

如果有人看这个界面能毫不犹豫说"AI 做的"，那就失败了。跨 register 失败是绝对禁令。

**品类反射检查**：如果有人能从品类名猜出主题和调色——"可观测性 → 暗蓝色"、"医疗 → 白色+青色"、"金融 → 海军蓝+金色"、"加密 → 霓虹黑底"——这是训练数据反射。重新处理场景句子和颜色策略，直到答案不再从领域名显而易见。

## 命令体系

| 命令 | 类别 | 描述 |
|------|------|------|
| `craft [feature]` | 构建 | 端到端塑造并构建功能 |
| `shape [feature]` | 构建 | 在写代码前规划 UX/UI |
| `teach` | 构建 | 设置 PRODUCT.md 和 DESIGN.md 上下文 |
| `document` | 构建 | 从现有项目代码生成 DESIGN.md |
| `extract [target]` | 构建 | 抽取可复用 token 和组件到设计系统 |
| `critique [target]` | 评估 | UX 设计审查，启发式评分 |
| `audit [target]` | 评估 | 技术质量检查（a11y、性能、响应式） |
| `polish [target]` | 打磨 | 发布前最终质量检查 |
| `bolder [target]` | 打磨 | 放大安全或平淡的设计 |
| `quieter [target]` | 打磨 | 降低过于激进或过度刺激的设计 |
| `distill [target]` | 打磨 | 剥离到本质，减少复杂度 |
| `harden [target]` | 打磨 | 生产就绪：错误、i18n、边缘情况 |
| `onboard [target]` | 打磨 | 设计首次运行流程、空状态、激活 |
| `animate [target]` | 增强 | 添加有目的的动画和动效 |
| `colorize [target]` | 增强 | 为单色 UI 添加战略颜色 |
| `typeset [target]` | 增强 | 改进排版层级和字体 |
| `layout [target]` | 增强 | 修复间距、节奏和视觉层级 |
| `delight [target]` | 增强 | 添加个性和难忘触点 |
| `overdrive [target]` | 增强 | 突破传统限制 |
| `clarify [target]` | 修复 | 改进 UX 文案、标签和错误信息 |
| `adapt [target]` | 修复 | 适配不同设备和屏幕尺寸 |
| `optimize [target]` | 修复 | 诊断和修复 UI 性能 |
| `live` | 迭代 | 视觉变体模式：在浏览器中选择元素，生成替代方案 |

### 路由规则

1. **无参数**——渲染命令菜单，分组展示，询问用户想做什么
2. **第一个词匹配命令**——加载其参考文件并遵循其指令
3. **不匹配**——通用设计调用。应用设置步骤、共享设计法则和已加载的 register 参考

## Pin / Unpin

`pin <command>` 创建独立快捷方式，使 `/<command>` 直接调用 `/impeccable <command>`。`unpin <command>` 移除它。脚本写入项目中存在的每个 harness 目录。
