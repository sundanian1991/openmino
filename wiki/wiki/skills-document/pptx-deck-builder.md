# PPTX Deck Builder

> Sources: pptx-deck-builder, 2026-04-28
> Raw:[SKILL](../../raw/skills/pptx-deck-builder-SKILL.md); [README](../../raw/skills/pptx-deck-builder-README.md); [color palettes](../../raw/skills/pptx-deck-builder-color-palettes.md); [content strategy](../../raw/skills/pptx-deck-builder-content-strategy.md); [core patterns](../../raw/skills/pptx-deck-builder-core-patterns.md); [html2pptx](../../raw/skills/pptx-html2pptx.md); [OOXML](../../raw/skills/pptx-ooxml.md)

## 概述

使用 PptxGenJS 生成 .pptx 演示文稿。支持 5 套暗夜色系主题、6 种叙事弧线内容策略和 6 种幻灯片布局模式。输出原生 PowerPoint 格式，适合需要 .pptx 交付的场景。

## 内容策略

**页数公式**：15min→10-14 页 | 30min→18-24 页 | 40min→24-32 页。每页一个 idea，标题是结论而非话题。

### 6 种叙事弧线

| 弧线 | 适合 | 结构 |
|------|------|------|
| 英雄之旅 | 创业/个人成长 | 起点→触发→挣扎→顿悟→蜕变→收获 |
| 问题-解方 | 路演/产品发布 | 痛点→现有不足→解方→证据→行动 |
| 钻石结构 | 高管汇报/咨询 | 结论先行→支柱论点 1/2/3→重申 |
| 世界改变了 | AI/技术趋势 | 断层→驱动力量→输赢→入场券→行动 |
| Sparkline | TED 激励演讲 | 现实←→理想反复拉锯→理想胜出 |
| 三幕剧 | 用研/培训/案例 | 铺垫→冲突→解决（最通用） |

### 内容转幻灯片

| 原始内容 | 幻灯片设计 |
|---------|-----------|
| 故事/案例 | 标题=payoff，正文=结构，视觉=截图证据 |
| 数据/发现 | 数字做 hero，注明来源+一行解释 |
| 对比 | 两列：左浅色卡（旧），右深色卡（新+强调边框） |
| 流程 | 横向时间线或编号卡行，3-5 步 |

## 视觉执行

**字体**：`Microsoft YaHei` 全局，每个 `addText()` 必须带 `fontFace: F`。

**图片永不拉伸**：用 `imgFit()` 辅助函数（需登记原始像素），不用 `sizing:{type:"contain"}`。

### 布局模式

| 模式 | 关键特征 |
|------|---------|
| Cover | 深色背景 + 副标题(muted) + 主标题(62pt) + 演讲者 |
| Section Divider | 巨型序号水印(280pt) + 橙色下划线 + 标题(48pt) |
| Standard Content | 奶油背景 + 标题(30pt) + 分隔线 |
| Image Showcase | 浅色卡片 + imgFit 截图 |
| Two-Column | 左右双卡（左浅色/右深色）+ VS 分隔 |
| Card Grid | 2×2 或 1×3 卡片网格 |

### 5 套主题色

所有主题共用语义变量，替换 `C` 对象即可换肤，幻灯片代码零修改。

| 主题 | 背景 | 强调色 | 氛围 |
|------|------|--------|------|
| 暗夜橙光（默认） | `#1C1C2E` 海军蓝 | `#D97449` 焦糖橙 | 专业、戏剧性 |
| 深蓝碧海 | `#0D1B2A` 深海蓝 | `#2EBFA5` 青色 | 冷静、科研 |
| 墨绿暖沙 | `#1A2E20` 森林绿 | `#E8734A` 珊瑚橙 | 有机、品牌 |
| 暗紫金调 | `#1E1A2E` 紫罗兰 | `#D4A853` 暖金 | 高级、编辑感 |
| 铁青暖橙 | `#1A1F2E` 钢炭蓝 | `#E8952A` 琥珀橙 | 技术、工业 |

## 工作流

```
1. Intake：受众/时长/标题/大纲/演讲笔记/图片/配色
2. 内容架构：逐页大纲（类型+用途），确认后执行
3. 视觉执行：应用 C 对象 → 写 slides.js → node slides.js → QA
```

## 常见陷阱

| 问题 | 原因 | 修复 |
|------|------|------|
| 中文变 Latin 字体 | 缺少 `fontFace: F` | 每个 addText 都加 |
| 图片变形 | 用 `sizing:contain` | 改用 `imgFit()` |
| 中文行 SyntaxError | ASCII 引号嵌套 | 内层转义 `\"` |
| 颜色错误 | 用了 `#RRGGBB` | 去掉 `#`，裸 `RRGGBB` |

## 与 html-ppt-skill 区别

| 维度 | pptx | html-ppt |
|------|------|---------|
| 输出 | .pptx 文件 | HTML 文件 |
| 交互 | 无 | 键盘/演讲者模式 |
| 内容策略 | 6 种叙事弧线 | 无内置 |
| 适用 | 需 PPTX 交付 | 在线展示/技术分享 |
