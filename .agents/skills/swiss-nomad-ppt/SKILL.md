---
name: swiss-nomad-ppt
description: "生成瑞士极简风格的商务PPT/演示文稿。单情绪色（橙）、双主题交替（Light/Dark）、大量留白、零阴影。支持12种页面模板和29个可复用组件。触发于'瑞士风PPT'、'极简风格PPT'、'Swiss Style PPT'、'Nomad风格'。"
---

# Swiss Nomad PPT

> 来源：基于 Digital Nomad Work Infrastructure 设计系统改造

## 这个 Skill 做什么

生成一份**单文件 HTML**的瑞士极简风格 PPT，核心设计基因：

- **单情绪色**：仅 `#E85D2B`（橙色）作为全局强调色
- **双主题交替**：Light（白底）/ Dark（深黑底）形成呼吸感
- **零阴影**：所有层级通过颜色和间距建立
- **大量留白**：标题区与内容区间距 ≥80px
- **16:9 画布**：每页 `min-height: 100vh`

**适合场景**：
- 商务汇报、年度总结、项目复盘
- 远程团队、数字游民、科技公司内部分享
- 需要"干净、专业、不花哨"的演示

**不适合场景**：
- 需要复杂动画/过渡效果
- 需要多人协作编辑（这是静态 HTML）
- 需要大量数据图表（用常规 PPT 工具）

---

## 何时使用

用户明确要求以下任一内容时触发：
- "瑞士风PPT" / "Swiss Style"
- "极简风格PPT" / "Nomad风格"
- "生成PPT" + 要求干净/专业/留白多
- "商务汇报PPT" + 不要花哨

---

## 工作流

### Step 1 · 需求澄清（动手前必做）

**如果用户已经给了完整的大纲 + 内容**，可以直接进 Step 2。

**如果用户只给了主题或模糊想法**，问这5个问题：

| # | 问题 | 为什么要问 |
|---|------|-----------|
| 1 | **PPT主题是什么？** | 决定标题和内容方向 |
| 2 | **大概多少页？** | 15分钟≈10页，30分钟≈15-20页 |
| 3 | **有没有原始素材？**（文档/数据/旧PPT） | 有素材就基于素材，没有就帮搭 |
| 4 | **有没有图片？** | 决定图文版式 |
| 5 | **有没有硬约束？**（必须包含XX / 不能出现YY） | 避免返工 |

### Step 2 · 读取设计系统

按顺序读取 `references/` 下的文件：

```
1. tokens.md    → 获取设计令牌（颜色/字号/间距/圆角）
2. system.md    → 理解布局规则（三区系统、5种布局模式）
3. components.md → 选择需要的组件（29个中选）
4. templates.md → 按模板公式组合页面
```

### Step 3 · 确定主题（Theme）与呼吸节奏

**用户优先**：如果用户明确指定封面主题（Light/Dark），遵循用户要求。否则按以下规则。

#### 呼吸节奏规则

呼吸节奏不是机械的奇偶交替，而是**视觉情绪的起伏**：

```
起（Light）→ 承（Dark）→ 转（Light）→ 合（Light）
```

**具体规则**：

| 规则 | 说明 |
|------|------|
| **首尾 Light** | 封面和结尾页用 Light，传达"清晰、开放、完整" |
| **核心内容可 Dark** | 数据展示、深度分析、架构图等需要"专注感"的内容用 Dark |
| **不连续3页同主题** | 最多连续2页 Light 或 2页 Dark，然后必须切换 |
| **过渡自然** | 从 Light 到 Dark 再回到 Light，形成"呼吸" |

**示例（8页）**：
```
P01 封面    → Light（清晰开场）
P02 核心数据 → Light（延续明亮，数据清晰可见）
P03 深度分析 → Dark（进入专注模式）
P04 路线图  → Light（回到明亮，展示路径）
P05 工具栈  → Dark（再次专注，技术细节）
P06 里程碑  → Light（明亮，时间线清晰）
P07 预期收益 → Dark（专注，数据冲击力）
P08 总结    → Light（明亮收尾，完整闭环）
```

**判断优先级**：
1. 用户明确指定 → 直接使用
2. 内容属性决定 → 数据/分析类倾向 Dark，概览/总结类倾向 Light
3. 呼吸节奏兜底 → 确保不连续3页同主题，首尾 Light

### Step 4 · 确定布局模式（Layout Pattern）

根据页面内容类型，从5种布局模式中选择：

| 内容类型 | 推荐布局 | 说明 |
|---------|----------|------|
| 文字+单一大图/图表 | `layout-4-6` | 左40%文字，右60%图形 |
| 左右对称内容 | `layout-5-5` | 左右各50% |
| 三列并列 | `layout-3-3-3` | 等宽三列 |
| 四宫格分类 | `layout-2-2-2-2` | 2×2网格 |
| 复杂图表/流程图 | `layout-full` | 标题区上30% + 内容区下70% |

### Step 5 · 选择组件（Components）

从 `references/components.md` 的29个组件中选择，参考决策树：

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

### Step 6 · 填充内容（Content）

将用户的文字内容填入组件的对应位置：

| 组件 | 需要填充的内容 | 约束 |
|------|---------------|------|
| TitleBlock | H1 标题 + 描述段落 | 标题≤3行，每行≤6个单词 |
| BodyText | 正文段落 | max-width: 480px |
| DataCard | 标题 + 数值 + PillTag | 数值≥36px |
| StepList | 每行标题 + 描述 + 编号 | 4个条目 |
| GridCard | 编号(01) + 图标 + 标题 + 描述 | 2×2布局 |
| FlowDiagram | 节点标签文字 | 节点≤6个 |
| BarChart | 数值 + X轴标签 | 4根柱子 |
| GanttChart | 行标题 + 条内描述 | 4阶段 |

### Step 7 · 生成 HTML

按以下结构组装单文件 HTML：

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=1920">
  <title>PPT标题</title>
  <style>
    /* === Design Tokens === */
    :root {
      /* 从 tokens.md 复制所有 CSS 变量 */
    }
    
    /* === Base Styles === */
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { font-family: var(--font-sans); }
    
    /* === Layout Patterns === */
    .layout-4-6 { ... }
    .layout-5-5 { ... }
    /* 从 components.md 复制布局样式 */
    
    /* === Components === */
    .slide { ... }
    .title-block { ... }
    /* 从 components.md 复制组件样式 */
  </style>
</head>
<body>
  <!-- Page 1: Cover -->
  <section class="slide" data-theme="dark">
    <!-- 按 template 公式组合组件 -->
  </section>
  
  <!-- Page 2: Content -->
  <section class="slide" data-theme="light">
    <!-- 按 template 公式组合组件 -->
  </section>
  
  <!-- 更多页面... -->
</body>
</html>
```

### Step 8 · 一致性检查（Quality Check）

生成后，逐条对照以下检查清单：

**布局检查**：
- [ ] 页面边距≥80px（左右）/≥60px（上下）
- [ ] 标题区与内容区之间留白≥80px
- [ ] 16:9 画布，每页 min-height: 100vh

**颜色检查**：
- [ ] Light主题：白底 `#FFFFFF`，深色文字 `#1A1A1A`
- [ ] Dark主题：深黑底 `#1A1A1A`，浅色文字 `#FFFFFF`
- [ ] 正文在 Dark 主题使用 `rgba(255,255,255,0.6)` 而非纯白
- [ ] 橙色仅在强调位置使用，不超过页面元素的10%

**组件检查**：
- [ ] 去掉了所有阴影、3D效果
- [ ] 卡片使用细边框或底色差异界定边界
- [ ] 图标全部为线框风格，无填充，无彩色（箭头除外）
- [ ] 2×2网格卡片使用了至少两种不同底色

**一致性检查**：
- [ ] 主题交替正确（Light/Dark 呼吸感）
- [ ] 字号层级清晰（H1 > H2 > Body > Caption）
- [ ] 间距系统一致（使用 `--space-*` 变量）

---

## 设计原则（不可违背）

1. **单页单主题**：一页内只用一种主题（light/dark/cream）
2. **单情绪色**：仅 `#E85D2B` 作为全局强调色
3. **零阴影**：所有层级通过颜色和间距建立
4. **标题区留白**：标题区与内容区之间必须有≥80px留白
5. **Dark主题正文**：使用 `rgba(255,255,255,0.6)` 而非纯白
6. **线框图标**：所有图标为线框风格，无填充，无彩色
7. **16:9画布**：每页 min-height: 100vh，推荐宽度 1920px

---

## 输出格式

- **单文件 HTML**：零外部依赖，浏览器打开即可查看
- **内联 CSS**：使用 CSS 变量引用 tokens
- **16:9 画布**：每页 `min-height: 100vh`
- **可截图**：适合导出为图片或 PDF

---

## 参考文件

- `references/tokens.md` — 设计令牌（19色 + 字号 + 间距 + 圆角 + 边框）
- `references/system.md` — 布局系统（三区系统、5种布局模式、10条规则）
- `references/components.md` — 组件库（29个组件按9大类聚合）
- `references/templates.md` — 页面模板（12页逐页定义）

---

## 扩展路径

### 增加新组件
1. 在 `references/components.md` 中找到合适的大类
2. 按统一模板添加：变体表格 → DOM → CSS → Do/Don't → Critical Details
3. 更新"组件总览"和"页面映射矩阵"

### 增加新页面模板
1. 在 `references/templates.md` 中按统一格式添加
2. 标注使用的组件、布局模式、主题
3. 更新"主题映射表"

### 修改设计风格
1. **只改 tokens.md**：调整颜色值、字号、间距
2. **不改 components.md 的 DOM 结构**：保持组件逻辑不变
3. **不改 system.md 的规则**：保持布局系统不变
4. **重新生成 reference.html**：验证新风格效果
