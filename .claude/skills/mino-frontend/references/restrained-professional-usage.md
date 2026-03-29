# 克制专业主义 — 高效复用方案

> **目标**：让"克制专业主义"风格成为年老师的默认风格指纹，实现一键调用、稳定输出

---

## 🎯 核心目标

1. **一键调用** — 无需重复描述风格细节，一个命令即可生成
2. **稳定输出** — 每次输出品质一致，不依赖临场发挥
3. **优先采用** — 成为默认风格，其他风格向此对齐

---

## 📦 集成方案

### 方案一：作为 mino-frontend 的正式风格（推荐）

**步骤**：

1. 在 `mino-frontend/SKILL.md` 中添加新风格条目
2. 在 `mino-frontend/references/styles.md` 中添加完整规范
3. 在 `mino-frontend/references/design-philosophy-12modes.md` 中添加为第 13 种模式

**添加内容**：

```markdown
## 13. 克制专业主义

### 运动名称
**Restrained Professionalism** — 克制专业主义

### 设计哲学宣言

**空间与形式**：极简到极致的黑白灰世界，每个像素都为数据服务。无阴影、无渐变、无装饰 — 只有纯粹的网格和边框。顶部 2.4px 陶土色装饰线作为唯一的"大声"元素，右下角圆形页码徽章作为导航锚点。信息密度可以高，但视觉噪音必须为零。

**色彩与情绪**：陶土色 (#E2725B) 是唯一的例外，唯一的温度，唯一的焦点。一个页面的陶土色使用面积控制在 10% 以内 — 顶部装饰线、页码徽章、关键数据强调。这是冷峻理性世界中的唯一温暖，是经过计算的视觉引导。

**工艺标准**：每个数字都对齐到像素，每个边框的粗细都经过计算。卡片没有阴影，依靠 1px 边框和充足内边距创造层次。表格 hover 效果只用 `#fafafa`，最微妙的反馈。

### 概念线索

| 内容类型 | 概念线索 | 视觉翻译 |
|---------|---------|---------|
| 问题诊断 | 冷静、分析 | 黑白灰基调、表格拆解 |
| 事件分析 | 冲突、张力 | 左右对比、强调色焦点 |
| 战略演示 | 权威、可信 | 编辑式排版、结论性标题 |
| 数据报告 | 精确、客观 | 网格对齐、单一强调 |

### 工艺检查清单

**视觉工艺**：
- [ ] 顶部 2.4px 陶土色装饰线
- [ ] 右下角圆形页码徽章（非封面）
- [ ] 无阴影、无渐变
- [ ] 表头 2px 黑色底边框
- [ ] 陶土色每页≤10% 面积

**色彩工艺**：
- [ ] 主背景：`#FFFFFF`
- [ ] 文字层级：`#111` / `#666` / `#999`
- [ ] 边框：`#E5E5E5`
- [ ] 强调：`#E2725B`（慎用）

**字体工艺**：
- [ ] 中文：Microsoft YaHei
- [ ] 英文/数字：Arial
- [ ] 字号：T1(40px) / T2(28px) / T3(14-16px) / T4(12-13px) / T5(10-11px)

**版式工艺**：
- [ ] 5 种核心版式（封面/标准/对比/表格/卡片）
- [ ] 每页≤7 个视觉块（Miller's Law）
- [ ] 视口适配：`100vh`, `overflow: hidden`
```

**触发词**：
```
- "克制专业主义"
- "数据模式 Pro"
- "年老师风格"
- "参考刘乾坤事件分析的风格"
- "黑白灰 + 陶土色"
```

---

### 方案二：创建快捷命令（快速启动）

在 `.claude/commands/` 下创建新命令文件：

**文件**：`.claude/commands/pro.md`

```markdown
# pro 命令 — 克制专业主义风格快速启动

**用途**：使用"克制专业主义"风格生成演示文稿

**触发**：`/pro [主题] [内容来源]`

**示例**：
- `/pro 供应商月度分析 读取 workspace/供应商月度报告.md`
- `/pro 事件分析 读取 plans/xxx 目录`

**执行逻辑**：
1. 读取内容来源
2. 按 8 页结构组织（封面、背景、分析、策略...）
3. 使用 mino-frontend 技能，指定"克制专业主义"风格
4. 输出 HTML 至 `slides/output/`

**风格参数**：
- 配色：黑白灰 + 陶土色#E2725B
- 字体：Microsoft YaHei + Arial
- 版式：5 种核心模板
- 信息密度：每页≤7 个视觉块
```

---

### 方案三：创建模板文件（最快速）

**HTML 模板**：`templates/restrained-pro-template.html`

创建一个完整的 8 页 HTML 模板，包含：
- 所有 CSS 变量和样式
- 5 种版式的预定义结构
- 占位符内容（待填充）

**使用方式**：
```bash
# 复制模板
cp templates/restrained-pro-template.html slides/output/new-presentation.html

# 编辑内容（替换占位符）
```

---

## 🚀 推荐工作流

### 标准工作流（推荐）

```
1. 准备内容
   ↓
2. /mino-frontend 使用"克制专业主义"风格
   ↓
3. 指定内容来源（Markdown 文件/目录）
   ↓
4. 生成 HTML 至 slides/output/
   ↓
5. Review & 微调
```

### PPTX 工作流

```
1. 准备内容
   ↓
2. /pptx-generator 使用"克制专业主义"风格
   ↓
3. 指定内容来源
   ↓
4. 生成 slide-01.js ~ slide-08.js
   ↓
5. 运行 compile.js 生成 PPTX
   ↓
6. 输出至 slides/output/
```

---

## 📋 风格调用检查清单

使用此清单确保风格一致性：

### 内容准备阶段

- [ ] 确认每页核心观点（≤1 个）
- [ ] 确认视觉块数量（≤7 个）
- [ ] 确认内容结构（8 页大纲）

### 生成阶段

- [ ] 指定风格："克制专业主义"或"数据模式 Pro"
- [ ] 确认配色：黑白灰 + 陶土色#E2725B
- [ ] 确认字体：Microsoft YaHei + Arial

### 验收阶段

- [ ] 顶部装饰线存在（2.4px，陶土色）
- [ ] 页码徽章存在（右下角，圆形）
- [ ] 无阴影、无渐变、无装饰
- [ ] 陶土色面积≤10%
- [ ] 视口适配正确（无滚动）

---

## 🔧 技术实现细节

### CSS 变量（核心）

```css
:root {
  /* 色彩系统 */
  --text-primary: #111111;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --bg: #FFFFFF;
  --border: #E5E5E5;
  --accent: #E2725B;
  --accent-light: #FFF5F2;

  /* 间距 */
  --page-padding: clamp(1rem, 3vw, 2rem);
  --section-gap: clamp(1.5rem, 4vw, 3rem);
  --card-gap: clamp(0.75rem, 2vw, 1.5rem);

  /* 字体 */
  --font-zh: 'Microsoft YaHei', sans-serif;
  --font-en: 'Arial', sans-serif;
}
```

### 核心版式（HTML 结构）

```html
<!-- 封面页 -->
<div class="slide cover">
  <div class="top-bar"></div>
  <div class="cover-content">
    <h1 class="t1">标题</h1>
    <p class="t3">副标题</p>
    <div class="divider"></div>
    <p class="t6">日期</p>
  </div>
</div>

<!-- 标准内容页 -->
<div class="slide content">
  <div class="top-bar"></div>
  <h2 class="t2">页面标题</h2>
  <div class="content">
    <!-- 内容区 -->
  </div>
  <div class="page-number">2</div>
</div>

<!-- 左右对比页 -->
<div class="slide comparison">
  <div class="top-bar"></div>
  <h2 class="t2">页面标题</h2>
  <div class="comparison-grid">
    <div class="card left">...</div>
    <div class="card right">...</div>
  </div>
  <div class="page-number">3</div>
</div>

<!-- 表格页 -->
<div class="slide table">
  <div class="top-bar"></div>
  <h2 class="t2">页面标题</h2>
  <table class="data-table">...</table>
  <div class="summary-card">...</div>
  <div class="page-number">4</div>
</div>

<!-- 卡片网格页 -->
<div class="slide cards">
  <div class="top-bar"></div>
  <h2 class="t2">页面标题</h2>
  <div class="card-grid">
    <div class="card">...</div>
    <div class="card">...</div>
    <div class="card">...</div>
    <div class="card highlight">...</div>
  </div>
  <div class="page-number">5</div>
</div>
```

---

## 📊 风格一致性度量

| 维度 | 目标值 | 测量方法 |
|------|--------|---------|
| **色彩比例** | 黑白灰≥90%，陶土色≤10% | 目测/像素统计 |
| **视觉块数量** | ≤7 个/页 | 计数 |
| **字体层级** | T1-T6 正确使用 | 代码审查 |
| **视口适配** | 100vh, overflow:hidden | 代码审查 |
| **装饰元素** | 仅顶部线 + 页码徽章 | 目测 |
| **阴影/渐变** | 0 处 | 代码审查 |

---

## 🎓 学习路径

### 第一次使用
1. 阅读本文档
2. 复制 HTML 模板
3. 手动填充内容

### 第三次使用
1. 理解 5 种版式结构
2. 开始使用 `/mino-frontend` 命令
3. 指定"克制专业主义"风格

### 第五次使用
1. 熟练掌握内容结构规划
2. 能够微调样式变量
3. 能够创造新的版式变体

---

## 🔗 相关文件

- **风格规范**：`references/restrained-professional.md`
- **设计哲学**：`references/design-philosophy-12modes.md`
- **风格列表**：`references/styles.md`
- **参考实践**：`slides/output/刘乾坤带节奏分析 -frontend.html`
- **PPTX 参考**：`slides/output/刘乾坤带节奏分析.pptx`

---

## 📝 版本历史

| 版本 | 日期 | 变更 |
|------|------|------|
| v1.0 | 2026-03-29 | 初始版本，基于刘乾坤事件分析实践 |

---

*文档版本：v1.0*
*创建日期：2026-03-29*
*作者：Mino Frontend 设计系统*
