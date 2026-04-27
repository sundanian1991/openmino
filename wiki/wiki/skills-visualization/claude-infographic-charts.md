# Claude Infographic Charts — 静态与交互式可视化生成器

> Sources: mino, 2026-04-28
> Raw: ../../raw/skills/claude-infographic-charts-SKILL.md; ../../raw/skills/claude-infographic-charts-README.md; ../../raw/skills/claude-infographic-charts-art.md; ../../raw/skills/claude-infographic-charts-chart-types.md; ../../raw/skills/claude-infographic-charts-diagram.md; ../../raw/skills/claude-infographic-charts-interactive.md; ../../raw/skills/claude-infographic-charts-mockup.md

## Overview

Claude Infographic Charts 模拟 Claude Artifact 系统的视觉美学，生成干净、扁平、专业的独立 .svg 文件或自包含 .html 文件。支持 9 色调 ramp 配色系统、暗/亮模式自动切换，以及从静态图表到交互式 widget 的完整输出范围。包含五个模块：diagram（流程图/架构图）、chart（数据图表）、mockup（UI 卡片/仪表盘）、interactive（交互控件/计算器）、art（SVG 插画）。

## 模块路由系统

根据用户意图（而非主题）路由到对应模块：

| 用户说 | 模块 | 输出形式 |
|--------|------|----------|
| "带我走一遍流程/步骤是什么" | diagram → flowchart | 顺序盒子 + 箭头 |
| "架构是什么/怎么组织的" | diagram → structural | 嵌套容器 |
| "X 实际上怎么工作/解释 X" | diagram → illustrative | 空间隐喻，非流程图 |
| "展示数据/比较数字" | chart | 选对图表类型 |
| "设计仪表盘/模拟 UI" | mockup | 像真实产品 |
| "让我探索/如果我改变..." | interactive | 控件 + 实时结果 |
| "画/插图/创建图案" | art | 表现力强、充满画布 |

当没有明确匹配时：解释性内容 → 编辑布局；有界对象 → 卡片布局。

## 输出格式决策

这是最重要的决定，基于输出实际需要：

### 使用纯 SVG 的场景

- 视觉是**静态的**——无用户交互、无实时计算
- 用户想**嵌入文档、幻灯片或网页**作为图片
- 类型：流程图、架构图、柱/线/环形图、结构图、插画、艺术图案
- 不需要 JavaScript
- 输出为 `.svg` 文件

SVG 文件壳：固定 viewBox 宽度为 **680**（不可变），高度 H = 最底部元素的 (y + height) + 40px 缓冲区。安全区域：x=40 到 x=640，y=40 到 y=(H-40)。

### 使用 HTML 的场景

- 视觉需要 **JavaScript**——滑块、按钮、切换、实时计算
- 使用 **Chart.js**（JS 库——不能在 SVG 内运行）
- 有 **CSS 动画**（对流、流动箭头、脉冲元素）
- **交互式模拟**带悬停态、点击处理器或状态
- **步进/逐步**解释器（prev/next 按钮）
- 输出为 `.html` 文件（完全自包含，仅允许 CDN 脚本）

## 设计哲学

三个词：**flat, clean, compact**。

- 永远不使用渐变、投影、模糊、发光或霓虹效果
- 不使用 emoji，用 SVG 形状或 CSS 形状替代
- 所有标签用 sentence case，不用 Title Case 或 ALL CAPS
- 慷慨的留白——拥挤的图表是最常见的失败模式
- 仅两种字重：400（常规）和 500（中等），从不用 600 或 700
- 颜色编码意义，不编码序列。不对类别使用彩虹色循环
- 每个元素在白色和近黑背景上都必须可读
- SVG 背景始终透明；HTML body 背景白/暗自动

## 9 Ramp 颜色系统

| Ramp | 50 | 100 | 200 | 400 | 600 | 800 | 900 |
|------|-----|-----|-----|-----|-----|-----|-----|
| purple | #EEEDFE | #CECBF6 | #AFA9EC | #7F77DD | #534AB7 | #3C3489 | #26215C |
| teal | #E1F5EE | #9FE1CB | #5DCAA5 | #1D9E75 | #0F6E56 | #085041 | #04342C |
| coral | #FAECE7 | #F5C4B3 | #F0997B | #D85A30 | #993C1D | #712B13 | #4A1B0C |
| pink | #FBEAF0 | #F4C0D1 | #ED93B1 | #D4537E | #993556 | #72243E | #4B1528 |
| gray | #F1EFE8 | #D3D1C7 | #B4B2A9 | #888780 | #5F5E5A | #444441 | #2C2C2A |
| blue | #E6F1FB | #B5D4F4 | #85B7EB | #378ADD | #185FA5 | #0C447C | #042C53 |
| green | #EAF3DE | #C0DD97 | #97C459 | #639922 | #3B6D11 | #27500A | #173404 |
| amber | #FAEEDA | #FAC775 | #EF9F27 | #BA7517 | #854F0B | #633806 | #412402 |
| red | #FCEBEB | #F7C1C1 | #F09595 | #E24B4A | #A32D2D | #791F1F | #501313 |

**分配规则**：每个视觉使用 2-3 个 ramp。更多 = 噪音。优先 purple、teal、coral、pink 用于通用类别。保留 blue 用于信息、green 用于成功/正向、amber 用于警告、red 用于错误/负向。gray 用于中性结构元素（坐标轴、网格线、边框）。

**快速配色**：亮色模式 50 填充 + 600 描边 + 800 标题 / 600 副标题；暗色模式 800 填充 + 200 描边 + 100 标题 / 200 副标题。彩色填充上的文本：使用同一 ramp 的 800 或 900 色——从不用黑色。

## SVG 技术规范

- **ViewBox 宽度固定 680**——不可变
- 箭头标记使用圆角路径，支持 `orient="auto-start-reverse"`
- 字体估算（system-ui）：14px 500 约 8px/字符，14px 400 约 7.5px/字符，12px 400 约 6.5px/字符
- 盒子宽度检查：`字符数 × 每字符像素 + 2 × 内边距` 必须适配
- 笔划宽度 0.5px 用于边框和图边缘——细笔划感觉精致
- 连接器路径始终需要 `fill="none"`——SVG 默认黑色填充
- 矩形圆角默认 rx=4，强调 rx=8，rx ≥ 半高度 = 胶囊
- 禁止旋转文字、禁止盒子内图标（仅文本，除插画外）、禁止注释

## HTML 技术规范

**结构顺序**：`<style>` → 内容 HTML → `<script>` 最后。

**Chart.js 规则**：Canvas 无法解析 CSS 变量——仅使用硬编码十六进制。仅在包装 div 上设置高度，不在 canvas 元素上设置。始终禁用默认图例；用方形样本构建自定义 HTML 图例。CDN 仅使用 `cdnjs.cloudflare.com`。多个图表使用唯一 ID。

**滑块控件**：始终设置 `step` 发射清洁值。始终显示实时读数。导出前四舍五入每个数字。

**指标卡片**：使用 #F1EFE8 背景、8px 圆角、1rem 内边距。标题 13px muted、数值 24px 500 字重。

## 预输出检查清单

**SVG**：ViewBox H = 最大(y + height) + 40；所有内容在 x=40..640 内；盒子宽度检查通过；无箭头穿过不相关的盒子；彩色填充上的文本用同 ramp 800/900；标题和副标题用不同色阶；全部 sentence case；无渐变/阴影/模糊/装饰效果；所有连接器 fill="none"；暗色模式 @media 块。

**HTML**：`<style>` 在前、`<script>` 在后；Chart.js 数据所有颜色硬编码十六进制；数字导出前四舍五入；滑块有 step 和实时读数；Chart.js 使用 onload + fallback；暗色模式覆盖所有表面和文本；无处使用 `position: fixed`；无 tabs 或 `display:none` 内容；body 明确设置 font-family。
