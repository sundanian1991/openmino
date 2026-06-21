# nian-design 模板总索引

> **3 套库体系，定位不同，各司其职。** 原 templates-30/ 已合并到 templates/nian-templates/，不再作为独立库。
> 本文件是统一入口，按需选库。
> 最后更新：2026-06-21

---

## 三库对照

| 库 | 路径 | 数量 | 命名规则 | 用途 | 何时用 |
|---|---|---|---|---|---|
| **速配库** | `templates-matrix/` | 18 核心 + 7 延伸 | `T01-T18 · 气质-场景.html` | 9 气质 × 2 场景的完整模板，10-15 页真实业务，组件完整 | **选型首选**——按气质+场景二维查表，快速命中 |
| **场景分类库** | `templates/nian-templates/` | 30 | `B/D/E/M/N/P/S/U/X · 场景-品质.html` | 9 场景前缀，分标准/标杆/示范三级品质 | **按场景浏览**——知场景不知气质时 |
| **工程定义库** | `templates-v2/` | 16（已实现） | `T01-T08 · 技法-主题.html` | 按施工技法分类，附 base.css 统一样式 | **施工详图**——需要参考具体技法实现时 |

> templates-v2/ 另有 template-matrix.md 设计规划文档（描述 40 个模板定义，含组件配额），但已实现的 HTML 文件为 16 个。

---

## 已合并说明

**`references/templates-30/`（30 个场景分类初版模板）已合并到 `references/templates/nian-templates/`。**

两个目录使用完全相同的前缀体系（B/D/E/M/N/P/S/U/X 场景前缀）和场景分类。nian-templates/ 在此基础上补充了品质等级（标准/标杆/示范）和更完整的模板实现。templates-30/ 不再维护，参见该目录下的 `_MERGED.md`。

---

## 选用决策树

```
Step 1 · 知道气质 + 场景？
  ├─ 是 → templates-matrix/（速配库，18 核心 + 7 延伸）
  │        例：Statement 气质 + 数据报告 → T01-Statement-DATA.html
  └─ 否 → Step 2

Step 2 · 只知道场景？
  └─ 是 → templates/nian-templates/（场景分类库，30 个按前缀浏览）
           例：供应商场景 → S01-S05（决策建议→SOP→赛马→AI方案→品牌宣言）

Step 3 · 需要看具体施工技法（如 Watermark/Diagonal 等）？
  └─ templates-v2/（工程定义库，16 个按技法浏览）
           例：Watermark 技法 → T02-*-Watermark.html

Step 4 · 找历史参考/品牌专题？
  └─ templates/（根，零散成品 + _deprecated + brand-design-system）
```

---

## 速配库 18+7 模板矩阵

9 气质 × 2 场景 = 18 核心，加 7 延伸模板（5 Statement 延伸 + 1 Watermark 新技法 + 1 引用外模板）。

### 核心 18 模板（templates-matrix/INDEX.md 摘要）

| 气质 | 数据报告 | 知识管理 | 决策分析 | 品牌展示 | 工作汇报 | 流程规范 |
|---|---|---|---|---|---|---|
| Statement | T01 | T02 | — | — | — | — |
| Diagonal | — | — | T03 | T04 | — | — |
| Split | — | T06 | — | — | T05 | — |
| Numeral | T07 | — | — | — | — | T08 |
| Entrance | — | — | — | T09 | — | T10 |
| Pulse | — | — | — | — | T11 | T12 |
| Dashboard | T13 | — | T14 | — | — | — |
| 黑条书签(结构) | — | T16 | — | — | T15 | — |
| 长文导航(结构) | — | T18 | — | T17 | — | — |

> 完整索引（含页数、核心组件清单）见 `templates-matrix/INDEX.md`

### 延伸 7 模板

| 文件 | 气质 | 场景 | 说明 |
|------|------|------|------|
| `T19-Watermark-DATA.html` | Watermark（水性叠印技法） | 数据报告 | 新技法实验模板 |
| `C3-ST-precipitate-statement.html` | Statement | 知识沉淀 | Statement 气质的全场景实验 |
| `D3-ST-decision-statement.html` | Statement | 决策分析 | 同上 |
| `E3-ST-external-statement.html` | Statement | 对外传播 | 同上 |
| `N3-ST-planning-statement.html` | Statement | 计划规划 | 同上 |
| `P3-ST-perception-statement.html` | Statement | 感知认知 | 同上 |
| `X3-ST-execution-statement.html` | Statement | 执行跟进 | 同上 |

> 延伸模板命名格式 `C/D/E/N/P/X` 对应 `templates-v2` 的 Construction 技法分类前缀，`3-ST` 表示第三版 Statement。

---

## 场景分类库前缀速查（templates/nian-templates/）

30 个模板，9 前缀，3 级品质（标准/标杆/示范）。

| 前缀 | 气质 | 模板 | 场景 |
|:----:|------|------|------|
| **S** | Statement | S01 决策建议(标准) / S02 SOP(标准) / S03 赛马规则(基础) / S04 AI转型方案(标杆) / S05 品牌宣言(标杆) | 决策建议、SOP、规则方案、战略方案、个人宣言 |
| **D** | Diagonal | D01 工作汇报(标准) / D02 里程碑(标准) / D03 月度数据简报(标杆) / D04 最佳实践库(标杆) | 工作汇报、里程碑、数据简报、案例库 |
| **P** | Split | P01 数据分析报告(标准) / P02 周报(标准) / P03 复盘报告(标杆) / P04 会议纪要(标杆) | 分析报告、周报、复盘、会议 |
| **N** | Numeral | N01 行业全景(标准) / N02 方案选型(标准) / N03 课程学习总结(标杆) / N04 年度数据盘点(标杆) | 行业全景、选型对比、课程总结、年度回顾 |
| **E** | Entrance | E01 深度阅读笔记(标准) / E02 主题展馆(标杆) / E03 知识库地图(标杆) | 长文阅读、主题展馆、知识地图 |
| **U** | Pulse | U01 数据叙事(标准) / U02 数据分析中心(标杆) / U03 风险预警(标杆) | 数据叙事、监控中心、风险预警 |
| **B** | Dashboard | B01 数据仪表盘(标准) / B02 监控看板(标准) / B03 FT数据专题(标杆) | 月度总览、实时监控、数据专题 |
| **M** | Democratic | M01 民主设计报告(标准) / M02 产品力评估(标杆) | IKEA 民主设计、五维评估 |
| **X** | 结构型 | X01 长文导航(示范) / X02 长文阅读(示范) | 长文结构、阅读进度（可叠加到任何视觉型） |

> 完整索引（含组件检索、场景域推荐）见 `templates/nian-templates/INDEX.md`

---

## 工程定义库技法摘要（templates-v2/）

16 个已实现 HTML 文件，T01-T08 × 各 2 变体。按施工技法分类。

设计规划文档 `template-matrix.md` 完整描述了 40 个模板定义（含 VisualStream/Hero/Layouts/Components/Palette/组件配额），已实现的 16 文件是其中子集。

### 技法分布

| 技法 | 文件名（各 2 变体） | 场景覆盖 |
|:----:|---------------------|----------|
| **Watermark** 水性叠印 | T02-SLA与服务承诺-Watermark / T02-金融全景-Watermark | SOP服务协议、行业全景 |
| **TypeMonument** 字体纪念碑 | T03-方法论体系-TypeMonument / T03-设计规范-TypeMonument | 方法论沉淀、设计规范 |
| **QuestionHook** 问题钩子 | T04-数据驱动管理-QuestionHook / T04-深度阅读-QuestionHook | 管理诊断、深度阅读 |
| **Numeral** 数字开屏 | T05-决策判断-Numeral / T05-季度业绩-Numeral | 决策判断、业绩复盘 |
| **Data** 数据驱动 | T06-供应商数据-Data / T06-项目落地-Data | 供应商数据、项目报告 |
| **DataPunch** 数据穿孔 | T07-供应商沟通-DataPunch / T07-决策分析-DataPunch | 供应商沟通、决策分析 |
| **Diagonal** 斜切 | T08-准入评审-Diagonal / T08-品牌发布-Diagonal | 准入评审、品牌发布 |
| **通用型** | T01-供应商管理办法 / T01-供应商联盟-数据报告 | 供应商管理、联盟报告 |

### 配套文件

- `base.css` — 统一样式
- `template-matrix.md` — 40 模板完整定义（含组件配额，设计参考）
- `template-plan-confirmed.md` — 定版计划
- `generate-all.sh` — 批量生成脚本

---

## 与 8 件 nothing 超越件的关系

2026-06-20 产出的 8 件 nothing 对标超越件（`workspace/2026-06-20-nian超越件v2/`）是**单页超越件**，非模板库成员。其中 6 件的手法已提炼为 components.md 第 33-38 族高级形态组件（关联矩阵/区位矩阵/分面条形/Sparkline表/对称对照/Gauge）。模板库调用这些组件时参考超越件实现。

---

*3 库并存 · 各司其职 · 选型首选 templates-matrix 速配库*
