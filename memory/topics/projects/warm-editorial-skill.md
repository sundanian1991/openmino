# Warm Editorial 技能

> 基于 Rachel Akinwale 作品集衍生的暖调编辑式设计系统

## 创建信息

- **创建日期**：2026-07-17
- **真源**：Rachel Akinwale Creative Portfolio（12张手机截图逐像素扫描）
- **技能路径**：`workspace/2026-07-17-warm-editorial-skill/`
- **设计哲学文件**：`Design.md`（07-18大幅重写，用户主导重构为"设计思维透镜系统"）

## 色彩系统（精确提取）

| 角色 | 色值 | RGB | 材质联想 |
|------|------|-----|----------|
| 主底色 | `#EDE4D8` | (237,228,216) | 未漂白棉、羊皮纸 |
| 深灰 | `#1E1E1E` | (30,30,30) | 炭、磨砂金属 |
| 灰绿 | `#B7BDB3` | (183,189,179) | 风化的铜、苔藓 |
| 焦橙 | `#E26B38` | (226,107,56) | 皮革、壁炉火 |
| 橄榄卡其 | `#A59360` | (165,147,96) | 旧书脊、军用帆布 |
| 暖白文字 | `#E7E0D2` | (231,224,210) | 生丝、象牙 |

**关键发现**：深底文字不是纯白 `#FFF`，而是 `#E7E0D2`（暖米白）——"隐秘奢华"的核心细节。

## 设计原则（07-18用户重构）

Design.md 在 07-18 被用户大幅重构，从"规则集"变为"设计思维透镜系统"：

1. **Functional Beauty（功能之美）** — 每个元素必须有功能
2. **Editorial Authority（编辑权威）** — 3秒内找到重点
3. **Material Authenticity（材质真实性）** — 颜色有材质联想
4. **Restrained Luxury（克制奢华）** — 少即是多，留白即奢华
5. **Temporal Depth（时间深度）** — 经历过时间，不是刚做好的

## 色带系统（Color Strip）

Rachel设计的核心识别元素，5个固定位置：

| 位置 | 方向 | 功能 |
|------|------|------|
| 底部 | 横向 | 品牌标识/导航（每页必有） |
| 顶部 | 横向 | 章节导航/状态 |
| 中间 | 横向细线 | 章节分隔 |
| 左侧 | 竖向 | 页面标识/编号 |
| 右侧 | 竖向 | 页码/辅助信息 |

**色带颜色序列（固定）**：深灰 → 卡其 → 焦橙 → 灰绿

## 文件结构

```
workspace/2026-07-17-warm-editorial-skill/
├── Design.md              ← 设计规则文档（07-18重构为透镜系统）
├── README.md              ← 技能说明
├── token.css              ← CSS变量定义（精确色值+色带系统）
├── extract-colors.py      ← 色值提取脚本
├── soul-sample.html       ← 验证页面
├── ai-agent-workflows-guide.html  ← AI Agent工作流指南（Warm Editorial风格）
├── codex-guide-final.html         ← Codex指南
├── codex-long-task-guide.html     ← Codex长任务指南
├── codex-oryzo-style.html         ← Oryzo风格Codex指南
└── stage-outputs/
    └── 02-rules-color.md  ← 色彩规则卡
```

## 与 Haglofs Paradigm 的关系

- fork 自 Haglofs Paradigm 技能框架
- 替换了色彩系统（20色→6色）
- 替换了排版规则（4字体→3字体）
- 新增色带系统（5位置）
- 情绪从"北欧克制"变为"暖调编辑"

## 适用场景

- 个人品牌展示、作品集、创意简历
- 长文/指南/报告的编辑式排版
- 任何需要"高端编辑感"的内容

## 使用方式

```html
<link rel="stylesheet" href="token.css">
<!-- 使用语义类：bg-cream / bg-charcoal / bg-sage / font-display / font-mono -->
<!-- 色带组件：strip-h / strip-v--left / strip-v--right -->
```

---

*最后更新：2026-07-21 · 07-18 Design.md 由用户大幅重构*
