# Huashu Design · Skill Introduction Deck

> 花叔Design 技能介绍演示文稿 · 1920×1080 多文件 Deck

## 快速预览

```bash
# 在浏览器中打开
open index.html

# 键盘导航
← → / Space / PageUp PageDown / 1-9 跳页 / P 打印
```

## 文件结构

```
huashu-design-ppt/
├── index.html              # Deck 索引（多文件拼接器）
├── shared/
│   └── tokens.css          # 设计系统 Token（品牌色/字体/间距）
└── slides/
    ├── 01-cover.html           # 封面
    ├── 02-what-is-it.html      # 项目定位
    ├── 03-philosophy.html      # 五大核心支柱概览
    ├── 04-asset-protocol.html  # 核心资产协议（v1.1）
    ├── 05-junior-flow.html     # Junior Designer 工作流
    ├── 06-anti-slop.html       # 反 AI Slop 清单
    ├── 07-pillars-detail.html  # 五大支柱详解（预留）
    ├── 08-fallback-mode.html   # 设计方向顾问模式
    ├── 09-delivery.html        # 专业交付能力
    ├── 10-comparison.html      # 与其他技能对比
    ├── 11-getting-started.html # 快速开始
    └── 12-thank-you.html       # 封底
```

## 设计规范

- **尺寸**：1920×1080 (16:9)
- **风格**：Pentagram 信息建筑派（深色背景 `#111111` + 暖砖红 `#D4532B` accent）
- **字体**：Inter (Display) + Noto Serif SC (中文)
- **装饰**：左垂直渐变线条（Pentagram 标志性元素）

## 导出 PPTX

### 方法 1：通过导出脚本（推荐）

```bash
cd .claude/skills/huashu-design
node scripts/export_deck_pptx.mjs --input /path/to/huashu-design-ppt/index.html
```

默认使用 `--mode image`（图片铺底，视觉 100% 保真，文字不可编辑）。
如需可编辑文本，使用 `--mode editable`（要求 HTML 满足 4 条硬约束，见 `references/editable-pptx.md`）。

### 方法 2：浏览器打印为 PDF 再转换

```bash
# 在浏览器打开 index.html，按 P 打印 → 保存为 PDF
# 然后使用 PowerPoint 或在线工具转换 PDF → PPTX
```

### 方法 3：Playwright 截图后手动拼接

```bash
python3 scripts/verify.py index.html --slides 12
# 生成 screenshots/ 目录下的 12 张 PNG，可在 PowerPoint 中插入图片
```

## 验证清单

- [x] HTML 语法验证通过（11/11 页）
- [x] tokens.css 路径正确
- [x] 无外部依赖（纯 HTML+CSS+内联样式）
- [x] 符合反 AI slop 原则（无紫渐变、无 Emoji 图标、无装饰性圆角卡片）
- [x] 品牌识别元素应用（D4532B accent + 深色背景 + Pentagram 网格）

## 内容来源

本 PPT 基于以下资料制作：

- `SKILL.md` — 技能总览
- `references/design-styles.md` — 20 种设计哲学库
- `references/workflow.md` — 工作流程
- `references/content-guidelines.md` — 反 AI slop 清单
- `references/slide-decks.md` — 幻灯片架构指南
- `assets/banner.svg` — 品牌视觉资产

---

**Created with Huashu-Design Skill** | 2026-04-22
