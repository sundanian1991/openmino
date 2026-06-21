# Intake · 文字分支（curatorial-workflow 阶段1-3）

> 如何把策展三段产物翻译成决策卡字段。

---

## 上游产物（来自 curatorial-workflow）

文字分支跑阶段1（定题）+ 阶段2（叙事）+ 阶段3（视觉语言），产出三份文档：

| 产物 | 来源技能 | 提供什么 |
|---|---|---|
| 定题说明 | curatorial-topic-framing | 策展对象、进入尺度、真实主体、目标观众、材料边界 |
| 页面类型表+模块schema+导航图 | curatorial-narrative-modules | **骨架序列**、页面角色、材料身份、模块栏位 |
| 视觉语言说明 | curatorial-visual-language | **气质方向**、字体层级、色彩角色、版式节奏、交互语法 |

---

## 字段映射

### 从视觉语言 → 气质（决策A）

阶段3的 `设计参照系` 是功能性命名（如"当代学术编辑式""档案阅览室""田野笔记"），不是组件库命名。需要翻译：

| 阶段3设计参照系 | 映射到 visualStream |
|---|---|
| 当代学术编辑式 / 机构藏品界面 | `Statement`（宣言对齐，留白主导） |
| 档案阅览室 / 展墙展签 | `Statement` 或 `Entrance`（沉浸） |
| 田野笔记 / 口述史聆听室 | `Statement` + `S2-长文导航`（叙事长文） |
| 分析型地图册 | `Dashboard`（数据密集） |

翻译原则：参照系描述的是"阅读姿态"，映射到气质的"视觉姿态"。把握不准时默认 `Statement`（占真实场景37%，最安全）。

结构型判断（叠加用）：
- 阶段3 `版式节奏` 提到"阅读列/侧栏/索引模块" + 内容≥1500字 → `S2-长文导航`
- 阶段3 提到"持久导航/章节链接" + ≥3章节 → `S1-黑条书签`

### 从页面类型表+导航图 → 骨架（决策B）

阶段2的页面类型表已经是天然的骨架序列。直接映射：

```
阶段2页面角色          →  layout      →  role
─────────────────────────────────────────────
入口页/封面            →  S01          →  hero
核心专题页（主张）      →  S04          →  statement
案例页/物件页（展开）   →  S11/S19      →  evidence
跨单元分析页（对比）    →  S09          →  evidence
时间单元页（流程）      →  S08/S10      →  flow
索引页/来源页（收束）   →  S21/S27      →  closure
```

骨架族编号见 `../nian-design/references/layouts.md`。

### 从模块schema → 组件（决策C之一）

阶段2的模块schema里有栏位提示，映射到组件：

| 阶段2栏位 | 组件 |
|---|---|
| 稳定标题 + 装饰编号 | 23 数字标题 |
| 媒体栏位（图像组） | 26 堆叠图卡 |
| 主体解释文本（多段） | 19 Accordion / 18 Tab |
| 证据和来源模块 | 22 Checklist |
| 跨单元分析（对比） | 20 对比表 / 17 Do-Don't |
| 流程/路径 | 16 Flow Pipeline |
| 元数据/导航 | 06 Navigation / 07 Tags |

**原则**：组件从 nian-design 38族选，不发明。每个组件标注 purpose（用在哪）。

### Hero + 打破（决策C之二、三）

- **Hero**：由气质决定，查 `decision-card-schema.md` 的气质→Hero映射表，不独立选
- **打破**：看阶段3 `版式节奏` 最强调的那个 section，在那里放 1 处打破。文字分支首选 `ghost水印`（章节编号/品牌年份，opacity 0.04）

---

## 文字分支决策卡模板

```yaml
branch: text
visualStream: Statement
structuralStream: S2-长文导航        # 或 null
layoutSequence:
  - { section: 封面, layout: S01, role: hero }
  - { section: <阶段2页面1名>, layout: <映射>, role: <映射> }
  # ... 按 页面类型表 逐页填
heroType: V4-Statement              # 由 visualStream 决定
components:
  - { id: "<族编号 名>", purpose: <阶段2栏位映射> }
breakPoint:
  section: <最强调的section>
  method: ghost水印
  spec: { text: <章节编号>, opacity: 0.04, font: Playfair }
palette:
  primary: <阶段3色彩系统的主色角色 → darkgray/olive/earth>
  accent: yellow
  baseMode: light
dataCharts: null                    # 文字分支无
source:
  narrative: <阶段1定题说明路径>
  audience: <阶段1目标观众>
```

---

*最后更新：2026-06-13 — 文字分支 intake v1*
