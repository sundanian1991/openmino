# OpenWiki 设计规范与产品哲学

> Sources: Mino (AI), 2026-04-26
> Raw: [DESIGN.md](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-DESIGN.md); [CLAUDE.md](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-CLAUDE.md); [README.zh-CN](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-README.zh-CN.md); [CONTRIBUTING](../../raw/workspace-other/OpenWiki--Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-OpenWiki-CONTRIBUTING.md)

## 概述

OpenWiki 是一个 Mac 桌面端内容捕获 + AI 知识管理工具，自动收集剪贴板/截图/链接，用 AI 生成周报回顾。其设计文档（DESIGN.md）展示了一套完整的设计系统方法论：从产品定位到视觉风格，从色彩系统到动画策略。这份设计规格是年老师评估知识管理工具的重要参考。

## 产品定位

### 产品定义

- **做什么**：Mac 桌面端内容捕获 + AI 知识管理工具
- **核心功能**：自动收集剪贴板/截图/链接，AI 生成周报回顾
- **技术栈**：Tauri 2 + React（桌面应用）

### 目标用户

- 中文用户
- 年轻、爱折腾工具的信息工作者
- 具体画像：信息收集党、内容创作者、知识管理者

### 竞品分析

| 竞品 | 特点 | 差异点 |
|------|------|--------|
| Paste | 剪贴板管理，蓝色系 | OpenWiki 用暖橙色 |
| CleanClip | 简洁，紫色系 | OpenWiki 更强调 AI |
| Maccy | 极简，系统字体 | OpenWiki 用自定义字体 |

## 美学方向

### 设计关键词

**Brutally Minimal + 暖色点缀**

- 装饰级别：Minimal。版式做所有的工作，唯一的装饰是微妙的背景色分层（纯色，非渐变）
- 氛围：温暖、克制、有陪伴感。不是冰冷的工具，而是安静的知识助手。像一朵安静的云。

### 反模式（明确禁止的设计）

- 紫色渐变（竞品通用，刻意避开）
- 浮动光球
- emoji 图标
- decorative blob
- uniform bubbly border-radius

## 色彩系统

### 暖灰色调

| 角色 | 色值 | 用途 |
|------|------|------|
| 背景 | `#FAFAF8` | 页面底色 |
| 表面 | `#FFFFFF` | 卡片、面板 |
| 隆起表面 | `#F5F5F0` | 浮动元素 |
| 边框 | `#E7E5E4` | 分隔线 |
| 文字主色 | `#1C1917` | 标题、正文 |
| 文字次色 | `#57534E` | 描述文字 |
| 文字弱化 | `#A8A29E` | 标签 |
| 文字禁用 | `#D6D3D1` | 禁用状态 |

### 暖橙主色

- **主色**：`#F97316`（暖橙）— 温暖、有活力，区别于竞品的蓝/紫色
- **悬停**：`#EA580C`
- **柔和背景**：`#FFF7ED`（浅橙背景，用于激活态 nav、选中状态）

### 语义色

| 类型 | 色值 |
|------|------|
| 成功 | `#16A34A` |
| 警告 | `#CA8A04` |
| 错误 | `#DC2626` |
| 信息 | `#2563EB` |

### 深色模式

| 角色 | 色值 |
|------|------|
| 背景 | `#0C0A09` |
| 表面 | `#1C1917` |
| 隆起表面 | `#292524` |
| 边框 | `#3D3939` |
| 文字主色 | `#FAFAF8` |
| 文字次色 | `#A8A29E` |
| 文字弱化 | `#78716C` |
| 强调色 | `#FB923C`（降饱和 15%） |

### 色彩决策记录

| 决策 | 原因 |
|------|------|
| 暖橙色替代紫色系 | 所有竞品用蓝/紫，橙色创造品牌辨识度 |
| 暖灰色系（非冷灰） | 与暖橙主色协调，营造温暖陪伴感 |
| 1 个强调色 + 暖中性色 | 色彩是 rare and meaningful 的 |

## 字体系统

### 字体选择

| 层级 | 字体 | 字重 | 理由 |
|------|------|------|------|
| 标题 | Cabinet Grotesk | 700, 800 | 几何感强，现代但不冷漠 |
| 正文 | Plus Jakarta Sans | 400-700 | 可读性极佳，微圆暖感 |
| UI/标签 | Plus Jakarta Sans | 500, 600 | 与正文统一 |
| 数据/表格 | JetBrains Mono | 400, 500 | 等宽对齐 |
| 代码 | JetBrains Mono | — | 开发工具标配 |

### 字号层级

| 层级 | 字号 | 用途 |
|------|------|------|
| 3xl | 56px | hero heading |
| 2xl | 36px | section heading |
| xl | 24px | page heading |
| lg | 18px | large body |
| md | 15px | body |
| sm | 13px | small text, descriptions |
| xs | 11px | labels, meta, timestamps |
| 2xs | 9px | 微标注 |

## 间距与布局

### 间距系统

基础单位 8px，舒适密度：

| 层级 | 值 | 用途 |
|------|----|------|
| 2xs | 2px | 极小间隔 |
| xs | 4px | 图标内间距 |
| sm | 8px | 元素间小间距 |
| md | 16px | 卡片内边距 |
| lg | 24px | 卡片间距 |
| xl | 32px | 区块间距 |
| 2xl | 48px | 大区块间距 |
| 3xl | 64px | 页面级间距 |

### 布局规则

- 最大内容宽度：640px
- 网格优先于 flex（严格对齐，可预测的间距）
- 内容卡片统一尺寸

### 圆角层级

| 层级 | 值 | 用途 |
|------|----|------|
| sm | 6px | 按钮、输入框 |
| md | 12px | 卡片、面板 |
| lg | 16px | 弹窗、模态框 |
| full | 9999px | 圆形元素 |

## 图标与动画

### 图标

- 库：Lucide Icons
- 风格：stroke width 2px
- 尺寸：16px（inline）、20px（button）、24px（nav）
- 规则：所有 emoji 图标必须替换为 Lucide 对应图标

### 动画策略

- 方法：Minimal-functional，只有辅助理解的过渡，无装饰性动画
- 缓动：enter（ease-out）、exit（ease-in）、move（ease-in-out）
- 时长：
  - micro：50-100ms（hover, toggle）
  - short：150-200ms（button press, tab switch）
  - medium：200-300ms（panel expand, bubble appear）
  - long：400ms（page transition）

### 禁止项

- 浮动光球
- 呼吸灯效果
- 装饰性渐变动画

## 对年老师的参考价值

OpenWiki 的设计规范展示了一个知识管理工具应该有的气质：温暖、克制、有陪伴感。这种设计哲学对年老师评估知识管理工具有两个启发：

1. **知识工具应该是安静的助手**：不应该喧宾夺主，而应该在需要时出现
2. **设计感来自细节**：暖灰色调、微圆角、等宽字体对齐——这些细节共同构成"好用"的感觉
