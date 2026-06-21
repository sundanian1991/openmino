# nian-design 模板体系总览

> 416 个 HTML 文件，5 代模板迭代，2 个 showcase 系列。
> 本文件是模板检索的入口。

---

## 优先级（新内容从上往下选）

| 优先级 | 目录 | 数量 | 设计系统 | 用途 |
|:------:|------|:----:|----------|------|
| **1** | `nian-templates/` | 30 | Inter+Doto / 7色 Brand DNA | 主力成品，直接复用 |
| **2** | `templates-30/` | 30 | Playfair+Inter / Forest色 | 并行版本，不同内容域 |
| **3** | `style-reference/` | 19 | 各自独立 | Hero/Layout/色彩灵感 |
| **4** | `scene/` | 6 | Playfair+Inter / 7色 | Batch 1 存档 |
| — | `showcase-archive/R/` | 41 | 混合 | 精选 showcase，视觉参考 |
| — | `showcase-archive/H/` | 66 | 混合 | 素材池 showcase |
| — | `templates-matrix/` | 25 | Playfair+Doto | 旧版迭代，存档 |
| — | `templates-v2/` | 16 | Playfair+Inter | 旧版迭代，存档 |
| — | `templates/` | 23 | 各自独立 | 最早期，存档 |

---

## 索引文件

| 文件 | 内容 |
|------|------|
| `template-index.json` | **85 个模板**统一元数据（nian-templates + templates-30 + scene + style-reference） |
| `showcase-index.json` | **107 个 showcase**索引（R 精选 + H 素材池） |
| `template-catalog.md` | 4 套模板库总索引（速配/工程/场景/历史） |
| `style-reference/_index.md` | 19 个风格参考按色调分组 |
| `nian-templates/INDEX.md` | 30 个主力模板三维检索（气质×场景×组件） |

---

## 两套主力模板的内容差异

同编号体系（S/D/P/N/E/U/B/M/X），不同内容域：

| 编号前缀 | nian-templates | templates-30 |
|----------|---------------|--------------|
| S (Statement) | 决策建议 / SOP / 赛马 / AI转型 / 品牌宣言 | 决策建议 / SOP / 赛马 / AI转型 / 品牌宣言 |
| D (Diagonal) | 工作汇报 / 里程碑 / 月度简报 / 实践库 | 工作汇报 / 里程碑 / 数据简报 / 实践库 |
| P (Split) | 数据分析 / 周报 / 复盘 / 会议纪要 | 数据分析 / 周报 / 项目复盘 / 数据看板 |
| N (Numeral) | 行业全景 / 选型 / 课程 / 年度盘点 | 行业全景 / 行业对标 / 趋势预判 / 竞品拆解 |
| E (Entrance) | 深度阅读 / 主题展馆 / 知识库 | 执行跟进 / 执行日报 / 风险预警 |
| U (Pulse) | 数据叙事 / 分析中心 / 风险预警 | 供应商引入 / 供应商复盘 / 供应商健康度 |
| B (Dashboard) | 仪表盘 / 监控看板 / FT专题 | 读书报告 / 知识卡片 / 学习笔记 |
| M (Democratic) | 民主设计 / 产品力评估 | 月度回顾 / 方法论沉淀 |
| X (Structural) | 长文导航 / 长文阅读 | 个人OKR / 生活复盘 |

**选择规则**：
- S/D/P 系列两套重叠度高，优先用 nian-templates
- N/E/U/B/M/X 系列内容不同，按实际内容域选择
- 设计系统不同（Georgia vs Playfair），不要混搭

---

## 设计系统对比

| 特征 | nian-templates | templates-30 |
|------|---------------|--------------|
| 主字体 | Inter | Playfair Display |
| 数字字体 | Doto | JetBrains Mono |
| 色彩系统 | 7色 Brand DNA | Forest 色系 |
| --primary | --darkgray (#2C2C2C) | --brand-primary (#4A6741) |
| --accent | --orange (#E55B2B) | --brand-secondary (#7A9B6D) |
| 底色 | --bg:#FAF9F6 | --bg:#F5F3EF |
| 卡片 | 三层漂浮(bg<raised<card) | surface + surface-alt |

---

## 旧版目录（存档，不主动使用）

| 目录 | 说明 |
|------|------|
| `templates-matrix/` | T01-T19 视觉流模板 + 6 个 scene 模板，中间迭代 |
| `templates-v2/` | 8 对配对式模板（同视觉流×不同内容），探索阶段 |
| `templates/` | 最早期场景模板（decision/perception/execution 等） |
| `showcase-archive/.backup/` | 102 个旧版 showcase |

---

*最后更新：2026-06-16 · 全量索引*
