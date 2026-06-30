# Digital Nomad Work Infrastructure — Skill 文档流程

> 本文档定义如何将所有交付物组织为一个可复用的 Skill，确保后续生成的任何页面/任何内容都能保持同样的设计基因。

---

## 一、交付物清单（5份文档 + 1份参考实现）

| # | 文件 | 角色 | 用途 |
|---|------|------|------|
| 1 | `tokens.md` | **原子层** | 所有可量化设计参数：19色 + 10级字号 + 12档间距 + 6档圆角 + 4档边框 |
| 2 | `system.md` | **规则层** | 布局系统、信息层级区、排版规则、颜色语义、图标规范、10条不可违背规则 |
| 3 | `components.md` | **组件层** | 29个组件按9大类聚合：DOM + CSS + 变体表格 + Do/Don't + 关键细节 |
| 4 | `templates.md` | **模板层** | 12页逐页定义：组件组合公式 + 主题映射 + 布局模式 |
| 5 | `reference.html` | **参考实现** | 极致复刻的可运行HTML，浏览器打开即可验证 |
| 6 | `skill-flow.md` | **流程层** | 本文档：Skill的使用流程和检查机制 |

---

## 二、文档之间的依赖关系

```
生成新页面/PPT
    │
    ├──► 读 system.md ──► 理解布局规则（三区系统、5种分栏模式）
    │
    ├──► 读 components.md ──► 选择需要的组件（29个中选）
    │
    ├──► 读 tokens.md ──► 获取具体数值（颜色/字号/间距）
    │
    ├──► 读 templates.md ──► 按模板公式组合页面
    │
    └──► 输出 HTML ──► 对照 reference.html 验证一致性
```

**核心原则：自上而下设计，自下而上实现。**

- **设计阶段**：先看 system.md 决定"这页用什么布局模式"，再看 templates.md 决定"这页由哪些组件组成"
- **实现阶段**：从 tokens.md 取具体数值，从 components.md 取 DOM/CSS 结构，组装成 HTML

---

## 三、生成新页面的标准流程（6步）

### Step 1：确定主题（Theme）

根据页面在整份PPT中的位置，选择主题：

```
if 页面序号 % 2 == 1 and 前一页是 Light:
    用 Dark（形成呼吸感）
elif 页面序号 % 2 == 0 and 前一页是 Dark:
    用 Light（形成呼吸感）
elif 整份PPT第一页:
    用 Dark（封面）
else:
    用 Cream（仅过渡页）
```

> 参考 templates.md 附录中的"主题交替节奏"。

### Step 2：确定布局模式（Layout Pattern）

根据页面内容类型，从 system.md 的5种布局模式中选择：

| 内容类型 | 推荐布局 | 说明 |
|---------|----------|------|
| 文字+单一大图/图表 | `layout-4-6` | 左40%文字，右60%图形 |
| 左右对称内容 | `layout-5-5` | 左右各50% |
| 三列并列 | `layout-3-3-3` | 等宽三列 |
| 四宫格分类 | `layout-2-2-2-2` | 2×2网格 |
| 复杂图表/流程图 | `layout-full` | 标题区上30% + 内容区下70% |

### Step 3：选择组件（Components）

从 components.md 的29个组件中选择需要的，参考 templates.md 的"组件组合公式"。

**决策树**：

```
需要展示数据？
├── 是 → DataChart? → BarChart / GanttChart / RadialDataDisplay
├── 是 → 表格？ → DataTable
└── 否

需要展示流程？
├── 是 → 线性？ → FlowDiagram (linear)
├── 是 → 分支？ → FlowDiagram (tree)
├── 是 → 层级？ → TriangleHierarchy / TreeArchitecture
└── 否

需要展示分类？
├── 是 → 4类？ → GridCard (2×2)
├── 是 → 3类？ → ColumnCard
└── 否

需要列表？
├── 是 → 递进？ → StepList
├── 是 → 要点？ → HighlightItem
└── 否
```

### Step 4：填充内容（Content）

将用户的文字内容填入组件的对应位置：

| 组件 | 需要填充的内容 |
|------|---------------|
| TitleBlock | H1 标题（1-3行）+ 描述段落（2-4行） |
| BodyText | 正文段落 |
| DataCard | 标题 + 数值 + PillTag 标签 |
| StepList | 每行的标题 + 描述 + 编号 |
| GridCard | 编号(01) + 图标 + 标题 + 描述 |
| FlowDiagram | 节点标签文字 |
| BarChart | 数值 + X轴标签 |
| GanttChart | 行标题 + 条内描述文字 |

### Step 5：生成 HTML

按以下结构组装：

```html
<!DOCTYPE html>
<html>
<head>
  <!-- 引入 tokens.css（可选：将 tokens.md 转为 CSS 变量） -->
  <style>
    /* CSS 变量来自 tokens.md */
    /* 组件样式来自 components.md */
  </style>
</head>
<body>
  <section class="slide" data-theme="light|dark|cream">
    <!-- 按 template 公式组合组件 -->
  </section>
</body>
</html>
```

### Step 6：一致性检查（Quality Check）

生成后，逐条对照以下检查清单：

- [ ] 页面边距≥80px（左右）/≥60px（上下）
- [ ] 标题区与内容区之间留白≥80px
- [ ] 只使用了黑/白/灰/橙四种颜色（封面渐变除外）
- [ ] 去掉了所有阴影、3D效果
- [ ] 卡片使用细边框或底色差异界定边界
- [ ] Dark主题正文使用 `rgba(255,255,255,0.6)` 而非纯白
- [ ] 数据编号（水印）使用 `#E0E0E0` 或 `rgba(255,255,255,0.2)`
- [ ] 流程图起点使用了不同形状（圆形 vs 矩形）
- [ ] 2×2网格卡片使用了至少两种不同底色
- [ ] 橙色仅在强调/高亮位置使用，不超过页面元素的10%
- [ ] 图标全部为线框风格，无填充，无彩色（箭头除外）

---

## 四、Skill 入口文件设计（SKILL.md）

如果要将这些文档封装为 Claude Code / CapyGet 的 Skill，SKILL.md 的结构如下：

```markdown
---
name: swiss-minimal-ppt
description: >
  生成瑞士极简风格的商务PPT/演示文稿。
  使用单情绪色（橙）、双主题交替（Light/Dark）、大量留白、零阴影的设计基因。
  支持12种页面模板和29个可复用组件。
version: 1.0.0
---

# Swiss Minimal PPT Skill

## 触发条件
用户明确要求以下任一内容时触发：
- "生成PPT"
- "做演示文稿"
- "Swiss风格"
- "极简风格PPT"

## 工作流程
1. 读取 `references/tokens.md` 获取设计令牌
2. 读取 `references/system.md` 理解布局规则
3. 读取 `references/components.md` 选择组件
4. 按本文档"生成新页面的标准流程（6步）"执行
5. 输出单文件 HTML，每页一个 `<section class="slide">`

## 设计原则（不可违背）
- 单页单主题（light/dark/cream）
- 单情绪色：仅使用橙色 `#E85D2B` 作为强调色
- 零阴影：所有层级通过颜色和间距建立
- 标题区与内容区之间必须有≥80px留白
- Dark主题正文使用 `rgba(255,255,255,0.6)`

## 输出格式
- 单文件 HTML
- 内联 CSS（使用 CSS 变量引用 tokens）
- 每页 `min-height: 100vh`
- 浏览器打开即可查看/截图
```

---

## 五、如何确保后续内容的一致性

### 机制1：Token 锁定
所有颜色、间距、字号都引用 `tokens.md` 中的变量。如果需要调整风格（如把橙色改为蓝色），**只需改 tokens.md 中的一个值**，所有组件和页面自动同步。

### 机制2：组件复用
任何新页面都不应该"手写 HTML"，而应该**从 components.md 中选择已有组件组合**。如果需要新组件，先将其加入 components.md，再使用。

### 机制3：模板约束
system.md 中的5种布局模式是强制性的。生成新页面时必须先选布局模式，再填充内容。这防止了"自由发挥"导致的风格漂移。

### 机制4：检查清单
每次生成后必须运行 system.md 末尾的10条检查清单。任何一条未通过，必须修正后才能交付。

### 机制5：Reference 对照
将生成的 HTML 与 `reference.html` 并排打开，肉眼对比以下关键视觉特征：
- 边距是否一致
- 标题与内容之间的留白是否足够
- 卡片圆角是否一致
- 字号层级是否清晰

---

## 六、扩展路径

### 如果要增加新组件
1. 在 `components.md` 中找到合适的大类
2. 按统一模板添加：变体表格 → DOM → CSS → Do/Don't → Critical Details
3. 更新"组件总览"和"页面映射矩阵"

### 如果要增加新页面模板
1. 在 `templates.md` 中按统一格式添加
2. 标注使用的组件、布局模式、主题
3. 更新"主题映射表"

### 如果要修改设计风格
1. **只改 tokens.md**：调整颜色值、字号、间距
2. **不改 components.md 的 DOM 结构**：保持组件逻辑不变
3. **不改 system.md 的规则**：保持布局系统不变
4. **重新生成 reference.html**：验证新风格效果

---

## 七、快速使用示例

**用户说**："帮我生成一页关于'远程团队沟通工具'的PPT"

**AI 执行**：

1. 读 system.md → 这是"分类介绍"型内容 → 选 `layout-2-2-2-2`（四宫格）
2. 读 components.md → 需要 TitleBlock + GridCard×4
3. 读 tokens.md → GridCard 变体：white/warm/dark-brown
4. 组合页面：
   ```
   PageShell(theme-light)
     ├── TitleBlock (H1: "Remote Team Communication Tools" + 描述)
     └── GridCard×4
           ├── (01) Slack / 实时消息与频道管理
           ├── (02) Zoom / 视频会议与屏幕共享
           ├── (03) Microsoft Teams / 集成办公套件
           └── (04) Discord / 社区化协作空间
   ```
5. 输出 HTML，运行检查清单

**结果**：一页与 reference.html 风格完全一致的PPT页面。
