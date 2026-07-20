# Warm Editorial Skill

> 基于 Rachel Akinwale 作品集的暖调编辑式设计系统

---

## 概述

Warm Editorial 是一套专为**个人品牌展示、作品集、创意简历**设计的视觉系统。它从 Rachel Akinwale 的 Creative Portfolio 中提取设计基因，融合了编辑式排版的结构感和暖色调的亲和力。

### 核心特征

- **色彩**：6色系统，暖米色为主底，焦橙色点缀
- **排版**：DM Serif Display（标题）+ Inter（正文）+ JetBrains Mono（标签）
- **布局**：色块分割网格，条带导航系统
- **情绪**：专业温暖、克制有力、可信可靠、结构清晰

---

## 文件结构

```
warm-editorial-skill/
├── README.md              # 本文件
├── Design.md              # 设计规则文档（排版/色彩/布局/组件）
├── token.css              # CSS变量定义（可直接引用）
├── stage-outputs/         # 阶段产出
│   ├── 02-rules-color.md  # 色彩规则卡
│   └── ...
└── soul-samples/          # 灵魂样本
    └── ...
```

---

## 快速开始

### 1. 引用 Token

```html
<link rel="stylesheet" href="token.css">
```

### 2. 使用语义类

```html
<!-- 背景色 -->
<div class="bg-cream">暖米色底</div>
<div class="bg-charcoal">深灰底（白字）</div>
<div class="bg-sage">灰绿底</div>

<!-- 文字色 -->
<p class="text-primary">主文字</p>
<p class="text-secondary">次要文字</p>
<p class="text-orange">强调文字</p>

<!-- 字体 -->
<h1 class="font-display">标题字体</h1>
<p class="font-body">正文字体</p>
<span class="font-mono">等宽字体</span>
```

### 3. 使用 CSS 变量

```css
.my-component {
  background: var(--color-warm-cream);
  color: var(--text-primary);
  padding: var(--s6) var(--s8);
  font-family: var(--font-body);
  font-size: var(--fs-body);
  line-height: var(--lh-body);
}
```

---

## 与 Haglofs Paradigm 的关系

Warm Editorial fork 自 Haglofs Paradigm 技能框架，替换了以下内容：

| 保留 | 替换 |
|------|------|
| 技能结构（stage-outputs/、soul-samples/） | 色彩系统（20色→6色） |
| 验证流程 | 排版规则（4字体→3字体） |
| 组件骨架模式 | 布局逻辑（北欧克制→暖调编辑） |
| 间距梯队（4px基数） | 情绪关键词 |

---

## 适用场景

| 适合 | 不适合 |
|------|--------|
| 个人作品集 | 企业官网 |
| 创意简历 | 电商页面 |
| 设计师Portfolio | 数据仪表盘 |
| 品牌介绍页 | 社交媒体Feed |
| 个人品牌展示 | 后台管理系统 |

---

## 验证清单

生成页面后，逐项检查：

- [ ] 页面底色是 `#E5DDD0`（暖米色），不是冷白
- [ ] 点缀色（橙+卡其）总面积 ≤ 15%
- [ ] 深底区块文字用白色，不是深灰
- [ ] 大标题收紧字距（-0.02em）
- [ ] 全大写文字加字距（≥0.06em）
- [ ] 间距取自4px梯队
- [ ] 无渐变、无装饰阴影
- [ ] 条带颜色顺序正确
- [ ] 字体角色不混用
- [ ] 页面节奏亮深交替

---

## 版本历史

- **v1.0** (2026-07-17)：初始版本，基于 Rachel Akinwale 12张截图分析

---

*创建于 2026-07-17*
