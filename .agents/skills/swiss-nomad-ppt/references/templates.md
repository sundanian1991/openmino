# Digital Nomad Work Infrastructure — Page Templates

> 12页PPT的逐页模板定义。
> 每页 = PageShell(theme) + LayoutPattern + 组件组合。
> 与 `system.md`（布局系统）和 `components.md`（组件库）配合使用。

---

## Template 01 — Cover / 封面

```
PageShell(theme-dark)
  └── CoverLayout
        ├── OrbGradient (球体偏右下55%)
        ├── OrbitLines×3 (不同旋转角度)
        ├── DecorCircle (右上)
        ├── BodyText (top-label: "Digital Nomad Deck", serif 14px)
        ├── TitleBlock (Display 64px serif: "Digital Nomad\nWork Infrastructure")
        ├── BodyText (subtitle, 14px, max-width 500px)
        └── Icon+Label (bottom-right: 地球图标 + "Productivity Systems for Remote Teams")
```

**布局模式**：自定义（全屏出血，无标准边距限制）
**主题**：`theme-dark`（深黑底）
**特殊规则**：
- 整份PPT唯一使用衬线字体的位置
- 球体直径约占画面55%，偏右下
- 3条轨道线有不同旋转角度
- 所有文字z-index高于球体

---

## Template 02 — Flexible Work Needs More Than Freedom

```
PageShell(theme-cream)
  └── layout-custom (上下分区)
        ├── 上区：左右分栏
        │     ├── 左：TitleBlock (H1 + BodyText)
        │     └── 右：DataCard×2 (并排) + PillTag×2
        └── 下区：StepList (4 items)
              ├── item-01: "Tool selection matters" / "Choose tools that support async work" / "01"
              ├── item-02: "System design is critical" / "Map out how tools connect" / "02"
              ├── item-03: "Team coordination" / "Enable seamless collaboration" / "03"
              └── item-04: "Long-term sustainability" / "Build scalable infrastructure" / "04"
```

**布局模式**：自定义（上下分区，上区左右分栏）
**主题**：`theme-cream`（米色底，仅P02使用）
**组件清单**：TitleBlock, BodyText, DataCard, PillTag, StepList, DecorCircle
**特殊规则**：
- StepList编号在右侧，左侧有垂直分割线
- DataCard半透明底，在米色上呈现层次
- DecorCircle置于左下角

---

## Template 03 — Connected Tool System for Mobile Work

```
PageShell(theme-light)
  └── layout-4-6
        ├── 左40%：TitleBlock + InfoBox
        │     ├── H1: "Connected Tool System\nfor Mobile Work"
        │     ├── BodyText: 描述段落
        │     └── InfoBox: 工具列表说明
        └── 右60%：PyramidStack
              ├── layer-1 (top, 40%宽): "Coordination" + 图标 [橙色底]
              ├── layer-2 (55%宽): "Task Management" + 图标 [灰底]
              ├── layer-3 (70%宽): "File Storage" + 图标 [灰底]
              ├── layer-4 (85%宽): "Scheduling" + 图标 [灰底]
              └── layer-5 (bottom, 100%宽): "Focus Tools" + 图标 [灰底]
              └── Caption: "Tool stack diagram" + 描述
```

**布局模式**：`layout-4-6`
**主题**：`theme-light`
**组件清单**：TitleBlock, BodyText, InfoBox, PyramidStack
**特殊规则**：
- 金字塔顶层橙色，其余灰色
- 每层有小图标（14px线框）
- 金字塔下方有说明标签

---

## Template 04 — Core Tool Categories

```
PageShell(theme-light)
  └── zone-header + zone-content
        ├── zone-header:
        │     ├── TitleBlock (H1 + BodyText)
        │     └── DecorCircle (右上)
        └── zone-content: layout-2-2-2-2
              ├── card-01 (gc-white): "(01)" / 图标 / "Communication Tools" / 描述
              ├── card-02 (gc-warm): "(02)" / 图标 / "Documentation and Knowledge Tools" / 描述
              ├── card-03 (gc-dark-brown): "(03)" / 图标 / "Task and Project Tools" / 描述 [白字]
              └── card-04 (gc-white): "(04)" / 图标 / "Productivity and Focus Tools" / 描述
```

**布局模式**：`layout-full`（header + 2×2 grid）
**主题**：`theme-light`
**组件清单**：TitleBlock, BodyText, GridCard, DecorCircle
**特殊规则**：
- 四宫格使用三种不同底色（白/暖米/深棕），打破单调
- 编号格式为"(01)"小字，在标题右侧
- 深棕卡片文字全白

---

## Template 05 — Create a Remote Work System

```
PageShell(theme-light)
  └── layout-full
        ├── zone-header (左右分栏):
        │     ├── H1: "Create a remote work system linking people, tools, and tasks"
        │     └── BodyText: "A connected workflow ensures..."
        ├── zone-breathing
        └── zone-content: FlowDiagram (linear variant)
              ├── left: FlowNode.accent ("Worker/Team", 橙色矩形)
              ├── connector: L-shaped line → horizontal
              ├── center: 2×2 grid FlowNode×4
              │     ├── "Chat" | "Docs"
              │     └── "Tasks" | "Meetings"
              ├── connector: horizontal line with arrow
              └── right: OrangeCircle×2
                    ├── "File Storage" + 文件夹图标
                    └── "Clients/Collaborators" + 用户图标
```

**布局模式**：`layout-full`
**主题**：`theme-light`
**组件清单**：TitleBlock, BodyText, FlowDiagram
**特殊规则**：
- 流程图使用L形转角连线
- 右侧为橙色实心圆节点（80px直径）
- 中心节点为2×2网格排列

---

## Template 06 — Design a Tool Stack

```
PageShell(theme-dark)
  └── layout-5-5
        ├── 左50%:
        │     ├── TitleBlock (H1 + BodyText, 白字)
        │     └── H1: "Design a tool stack that\nsupports daily work\nsimply."
        └── 右50%: TriangleHierarchy
              ├── SVG三角形轮廓 (0.5px描边)
              ├── 左侧描述段落×5 (12px半透明)
              └── 右侧标签×5 (带6px白点)
                    ├── Communication
                    ├── Planning
                    ├── Execution
                    ├── File Management
                    └── Personal Productivity
```

**布局模式**：`layout-5-5`
**主题**：`theme-dark`
**组件清单**：TitleBlock, BodyText, TriangleHierarchy
**特殊规则**：
- 整页无橙色（视觉休止符）
- 三角形仅描边无填充
- 左侧有描述段落（我之前遗漏，已修正）

---

## Template 07 — How a Digital Nomad Tool System Works

```
PageShell(theme-dark)
  └── layout-full
        ├── zone-header (左右分栏):
        │     ├── 左：TitleBlock (H1 + BodyText)
        │     └── 右：HighlightItem×6 (2×3网格)
        │           ├── Planning → | Task Mgmt → | Communication →
        │           └── Execution → | Documentation → | Review →
        ├── zone-breathing
        └── zone-content: FlowDiagram (tree variant)
              ├── start: FlowNode.circle ("Planning", 空心圆)
              ├── connector: vertical line → horizontal branch
              ├── level-1: "Task Mgmt" | "Comm" (矩形节点)
              ├── branch: L-shaped lines
              └── level-2: "Exec" | "Docs" (矩形节点)
              └── final: "Review" (矩形节点)
```

**布局模式**：`layout-full`
**主题**：`theme-dark`
**组件清单**：TitleBlock, BodyText, HighlightItem, FlowDiagram
**特殊规则**：
- 起点使用空心圆形（与矩形节点形成形状对比）
- 右上6个要点使用橙色箭头（→）
- 流程图为树状分支，带L形折线

---

## Template 08 — A Strong Tool Ecosystem

```
PageShell(theme-dark)
  └── layout-full
        ├── zone-header (左右分栏):
        │     ├── H1: "A strong tool ecosystem stabilizes\nand scales remote work."
        │     └── BodyText: "A structured approach to tool selection..."
        ├── zone-breathing
        └── zone-content: TreeArchitecture
              ├── top-row: Card×3 (浅灰底, 有副标题)
              │     ├── "Strategy Development" / "Define vision & roadmap"
              │     ├── "Tool Integration" / "Connect core platforms"
              │     └── "Employee Training" / "Onboard team on systems"
              ├── connector: 汇聚线 (3条, 从顶层到中层)
              ├── mid: PillBar (橙色, "Client / team touchpoints")
              ├── connector: 分散线 (5条, 从中层到底层)
              └── bottom-row: Card×5 (深灰底)
                    ├── Messaging | Tasks | Docs | Storage | Scheduling
```

**布局模式**：`layout-full`
**主题**：`theme-dark`
**组件清单**：TitleBlock, BodyText, TreeArchitecture
**特殊规则**：
- 顶层卡片有副标题（11px灰色）
- 中层为pill形状橙色条（`border-radius: 9999px`）
- 树状连线从顶层汇聚到中层，再分散到底层

---

## Template 09 — Roadmap

```
PageShell(theme-light)
  └── layout-full
        ├── zone-header (左右分栏):
        │     ├── H1: "Roadmap"
        │     └── 右：BodyText + Caption ("Digital Nomad Deck")
        ├── zone-breathing
        └── zone-content: GanttChart
              ├── header: Phase 1 | Phase 2 | Phase 3 | Phase 4
              ├── row-1: "Core Setup" → [gray: "Start with communication tools..."] | | |
              ├── row-2: "Coordination Layer" → | [orange: "Build workflows across platforms..."] | |
              ├── row-3: "Workflow Optimization" → | | [orange: "Refine handoffs and reduce friction..."] |
              └── row-4: "Long-Term Work System" → | | | [gray: "Scale as team grows..."]
```

**布局模式**：`layout-full`
**主题**：`theme-light`
**组件清单**：TitleBlock, BodyText, GanttChart
**特殊规则**：
- 甘特条内是真实描述文字，非简单标签
- 橙色条标记Phase 2和3（当前重点）
- 左侧行头固定宽度200px

---

## Template 10 — Tool Value Grows

```
PageShell(theme-dark)
  └── layout-4-6
        ├── 左40%:
        │     ├── TitleBlock (H1 + BodyText, 白字)
        │     └── H1: "Tool value grows as\nwork system connects."
        └── 右60%: BarChart
              ├── growth-label: "+7.4% per year" ("+7.4%"加粗)
              ├── bar-1: $5.4B [height:140px, bg:#777777]
              ├── bar-2: $6.1B [height:165px, bg:#666666]
              ├── bar-3: $7.5B [height:200px, bg:#555555]
              ├── bar-4: $9.4B [height:260px, bg:#E85D2B]
              ├── Y-axis: dashed reference lines (3条, 半透明白)
              └── X-labels: 4个标签 (11px, 半透明, 折行)
```

**布局模式**：`layout-4-6`
**主题**：`theme-dark`
**组件清单**：TitleBlock, BodyText, BarChart
**特殊规则**：
- 灰色柱子明度递减（浅→深），形成积累感
- 最后一根柱子橙色，作为视觉高潮
- Y轴有虚线刻度参考线，无刻度数字
- 数值标注在柱子正上方

---

## Template 11 — Why This Tool System Works

```
PageShell(theme-light)
  └── zone-header + zone-content
        ├── zone-header:
        │     └── TitleBlock (H1 + BodyText)
        └── zone-content: layout-3-3-3 (ColumnCard×3)
              ├── col-1 (image variant):
              │     ├── top: 建筑摄影图 (grayscale 60%)
              │     └── body: 图标容器 / "Better Workflow Clarity" / 描述
              ├── col-2 (number variant):
              │     ├── top: "02." (56px, #E0E0E0水印)
              │     └── body: 图标容器 / "Better Coordination" / 描述
              └── col-3 (number variant):
                    ├── top: "03." (56px, #E0E0E0水印)
                    └── body: 图标容器 / "Better Sustainability" / 描述
```

**布局模式**：`layout-3-3-3`
**主题**：`theme-light`
**组件清单**：TitleBlock, BodyText, ColumnCard
**特殊规则**：
- 左列使用真实建筑摄影图（需用户提供），灰度处理
- 中右列使用超大水印编号（"02.""03."）
- 图标置于36×36px细边框方形容器内
- 三列不要求等高

---

## Template 12 — Better Remote Work Needs...

```
PageShell(theme-light)
  └── layout-5-5
        ├── 左50%:
        │     ├── TitleBlock (H1 + BodyText)
        │     └── H1: "Better remote work needs\nimproved tools and workflows."
        │     └── HighlightGrid (2×2)
        │           ├── ↘ Core Tool Selection / "Choose tools..."
        │           ├── ↘ Workflow Design / "Map out how tools..."
        │           ├── ↘ Coordination Layer / "Ensure seamless..."
        │           └── ↘ Long-Term Sustainability / "Build for scale..."
        └── 右50%:
              └── Image (建筑摄影图, 占满半区高度)
```

**布局模式**：`layout-5-5`
**主题**：`theme-light`
**组件清单**：TitleBlock, BodyText, HighlightItem, Image
**特殊规则**：
- 右侧建筑摄影图占满半区高度（约500px），无圆角
- 2×2要点使用橙色箭头（↘）
- 图片无阴影，直接贴边

---

## 附录：页面→主题映射

| 页面 | 主题 | 背景色 | 文字色 |
|------|------|--------|--------|
| P01 | dark | `#111111` | `#FFFFFF` (衬线Display) |
| P02 | cream | `#F2EDE4` | `#1A1A1A` |
| P03 | light | `#FFFFFF` | `#1A1A1A` |
| P04 | light | `#FFFFFF` | `#1A1A1A` |
| P05 | light | `#FFFFFF` | `#1A1A1A` |
| P06 | dark | `#111111` | `#FFFFFF` |
| P07 | dark | `#111111` | `#FFFFFF` |
| P08 | dark | `#111111` | `#FFFFFF` |
| P09 | light | `#FFFFFF` | `#1A1A1A` |
| P10 | dark | `#111111` | `#FFFFFF` |
| P11 | light | `#FFFFFF` | `#1A1A1A` |
| P12 | light | `#FFFFFF` | `#1A1A1A` |

## 附录：主题交替节奏

```
P01: Dark  →  P02: Cream  →  P03: Light  →  P04: Light
→  P05: Light  →  P06: Dark  →  P07: Dark  →  P08: Dark
→  P09: Light  →  P10: Dark  →  P11: Light  →  P12: Light
```

**规则**：Dark页连续出现时（P06-P08），形成一段"深色呼吸区"；Light页连续出现时（P03-P05, P11-P12），形成"明亮呼吸区"。Cream作为过渡色只出现一次（P02）。
