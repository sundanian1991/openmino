---
name: mino-frontend
description: "年老师专属前端技能 — 创建 HTML 幻灯片、数据仪表盘、前端页面、通报海报、高端落地页、管理后台。触发词：演示文稿、幻灯片、仪表盘、数据看板、前端页面、HTML 演示、通报、海报、通知、落地页、管理后台。支持 6 种 UI 类型 + 100+ 组件库 + 14 种设计风格。零依赖，单文件输出。"
license: MIT
---

# Mino Frontend

零依赖 HTML 前端生成器。6 种 UI 类型，100+ 组件，14 种预设风格，单文件输出。

**版本**: v6.2, 2026-04-04

**新增**: UX Designer Skill Lab 方法论融合（OOUX/ORCA 对象建模、Design Brief 需求澄清、Usability Test 三维度检查）

## 核心原则

1. **零依赖** — 单 HTML 文件，inline CSS/JS，无 npm
2. **预设风格** — 14 种完整设计规范，不探索只执行
3. **视口适配（CRITICAL）** — 每页必须 fit 视口，禁止页内滚动
4. **反 AI 味** — 无阴影、无渐变、无 emoji、无居中偏执

---

## 设计纪律（Design Discipline）

> 来源：OpenAI Codex frontend-skill。所有类型共享，生成前必须内化。
>
> 目标：每个界面看起来是**故意的、高级的、当下的**。默认追求奖项级构图：一个大想法、强图像、精简文案、严谨间距、少量令人印象深刻的动效。

### Beautiful Defaults（8 条默认原则）

1. **构图优先，组件靠后** — 先想整体画面，不是先堆组件
2. **全出血视觉锚点** — 首屏要有一个占满视野的主视觉（Hero 图/大标题/数据矩阵）
3. **品牌名最响** — 品牌或产品名称是页面上最显眼的文字
4. **文案秒扫** — 文字足够短，几秒内能扫完
5. **留白、对齐、裁剪、对比先于 chrome** — 先用这四把刀，不够再加装饰
6. **克制系统：≤2 种字体，≤1 种强调色** — 按风格速查表取值，不自由发挥
7. **默认无卡片** — 用 section、column、divider、list、media block 代替卡片。卡片只在卡片本身是交互对象时才用
8. **首屏即海报** — 第一个视口是一张海报，不是一份文档

### Hard Rules（10 条设计红线）

- 每个区域**一个主导想法**，不需要一堆小 UI 元素来解释自己
- 品牌页上**标题不能压过品牌名**
- **无填充文案** — 删掉不影响理解的文字，不留
- **无 split-screen hero**，除非文字坐在一个统一、安静的侧面上
- 一个区域如果**能变成纯布局而不丢失含义**，就去掉卡片外框

---

## 前置思考（Pre-build Checklist）

> 来源：OpenAI Codex Working Model。所有类型共享，动手写代码前必须完成。

生成代码前，明确三件事：

| # | 模块 | 输出 | 示例 |
|---|------|------|------|
| 1 | **视觉论点** | 一句话描述情绪+材质+能量 | "冷峻理性、黑白灰底色、数据驱动权威感" |
| 2 | **内容规划** | 每个区域的内容安排（封面→支撑→细节→收尾） | "Hero:品牌+承诺 → Support:核心指标 → Detail:趋势分析 → CTA:行动引导" |
| 3 | **交互论点** | 2-3 个动效想法，改变页面感觉 | "Hero 入场序列 + 滚动联动 KPI 变化 + 表格行 hover 高亮" |

每个 section **一个职责、一个主视觉、一个 takeaway 或行动**。

---

## 执行流程

```
材料来 → 内容复杂度判断 → 选路径 → 生成
```

### 自动路径选择（根据内容特征，不依赖用户指令）

收到材料后，判断复杂度：

| 信号 | 路径 | 额外读取 |
|------|------|---------|
| 内容≤3 页，用户指定风格 | **快速路径** | 无 |
| 内容≥4 页，或混合多种元素（数据+洞察+流程） | **标准路径** | `references/design-judgment.md`（6 层决策） |
| 用户说"深度设计"，或内容涉及强烈情绪/冲突/隐喻 | **深度路径** | 标准路径 + `references/design-philosophy.md`（内容基因） |
| **任何路径，生成完成后** | **质量检查** | `references/quality-checklist.md`（必读） |

**快速路径**：直接用速查表选参数 → 生成
**标准路径**：先跑 6 层决策 → 确定版式/密度/可视化 → 生成
**深度路径**：标准路径 + 提取内容基因 + 写设计哲学宣言 → 生成

> 路径选择是自动的。AI 根据内容特征判断，不问用户。

---

## Step 0: 内容整理（所有路径必须执行）

> **必须先读取 `references/content-processing.md`，按其中 5 个步骤执行。**
>
> 核心原则：**整理不好不设计，设计不好不生成。**

### Step 0.5: 需求澄清（Design Brief）

> 来源：UX Designer Skill Lab — Design Brief 方法论。复杂页面或 Landing Page 必须执行。

在内容整理后、设计选择前，澄清以下五要素：

| 要素 | 关键问题 | 输出 |
|------|---------|------|
| **业务目标** | 这个页面的核心目标是什么？（转化/告知/引导操作） | 一句话目标声明 |
| **用户画像** | 谁是主要用户？他们的场景和痛点是什么？ | 1-2 个用户画像 |
| **产品范围** | 必须展示哪些功能/内容？明确排除什么？ | 功能清单 + 排除清单 |
| **约束条件** | 技术/时间/合规限制有哪些？ | 约束列表 |
| **成功指标** | 如何衡量这个页面的成功？ | 1-3 个可量化指标 |

**触发条件**：
- 用户说"Landing Page"、"落地页"、"产品页"
- 内容涉及强烈情绪或冲突
- 用户目标不清晰

**简化执行**：用 3 句话回答——目标用户是谁？他们来看什么？看完应该做什么？

### 硬性规则（不依赖 references 也必须遵守）

- **一页一个 P0** — 每页最多 1 个核心信息，2-4 个支撑信息
- **信息点≤7/页** — 超了就分页
- **P3 必须删** — 删掉不影响理解的信息，不留
- **不脑补** — 只整理材料里的内容，不自己发明
- **先分组再分页** — 找信息点之间的关系（因果/并列/递进/总分/时间序列），再决定怎么分页

### 分页底线

| 信息量 | 页数 | 结构 |
|--------|------|------|
| 1-2 个 P0 | 1-2 页 | 无需封面 |
| 3-5 个 P0 | 3-6 页 | 封面 + 内容页 |
| 6+ 个 P0 | 7+ 页 | 封面 + 目录 + 内容页 + 总结页 |

### 文本预算规则（强制）

> 参考 pptmaker layout-rules.md，严格控制信息密度

| 元素 | 上限 | 说明 |
|------|------|------|
| **封面标题** | ≤18 汉字 | 精炼核心命题 |
| **单页 bullet** | ≤5 个 | 超限则分页或删减 |
| **单个 bullet** | ≤24 汉字 | 一句话说完 |
| **正文段落** | ≤90 汉字 | 超限拆段或删冗余 |

**压缩原则**：内容超限优先**删冗余句**，不盲目缩字号

### 文案原则（Copy Principles）

> 来源：OpenAI Codex Copy + Utility Copy 规范。所有类型共享。

#### 通用文案（6 条）

1. **产品语言，不是设计评论** — 写给用户看，不是写给设计师看
2. **标题承载核心意义** — 读完标题就知道这页说什么
3. **支撑文案一句话** — 不用段落解释，一句话够了
4. **删重复** — 两个 section 说同一个 mood，删一个
5. **无 prompt 语言** — 不把提示词或设计说明混入 UI
6. **每节一个职责** — explain / prove / deepen / convert，只选一个

> **金句**：如果删掉 30% 的文案页面变好了，继续删。

#### 工具型文案（Utility Copy）— Dashboard / App / 管理后台专用

当工作是仪表盘、管理后台、操作界面时，**默认用工具语言，不用营销语言**：

1. **定位 > 煽情** — 标题说功能（"Selected KPIs"），不说愿景（"Your Path to Excellence"）
2. **先给工作面** — KPI、图表、筛选器、表格、状态直接上，不引入 hero section（除非用户明确要求）
3. **好的标题示例**：`"Selected KPIs"` / `"Plan status"` / `"Search metrics"` / `"Top segments"` / `"Last sync"`
4. **不好的标题**：任何能出现在首页 hero 或广告里的句子，重写直到像产品 UI
5. **支撑文字** — 解释范围、行为、数据时效或决策价值，一句话
6. **无用的 section 就删** — 不帮操作、监控、决策的区域，不留
7. **Litmus 检查**：操作员只扫标题+标签+数字，能立即理解页面吗？不能则返工

---

## 图像规范（Imagery）

> 来源：OpenAI Codex Imagery。所有类型共享。

| # | 规则 | 说明 |
|---|------|------|
| 1 | **图像必须做叙事工作** | 不是装饰，是要传达信息 |
| 2 | **至少一张强真实图** | 品牌、场景、生活方式页面必须有一张真实感的图像 |
| 3 | **实景摄影优先** | 优于抽象渐变或假 3D |
| 4 | **选稳定色调区放文字** | 裁剪时留出视觉平静区域 |
| 5 | **禁内嵌标识** | 不用带嵌入 sign、logo、typographic clutter 的图 |
| 6 | **多场景用多图，不用拼贴** | 需要多个瞬间就用多张独立图片 |

> 首屏需要**真正的视觉锚点**，装饰性纹理不算。如果去掉图片页面还能用，说明图片太弱。

---
|---------|------|---------|---------|
| 幻灯片/演示文稿 | Presentation | 克制专业主义 | 100vh 翻页，禁止滚动 |
| 仪表盘/数据看板 | Dashboard | 金融时报 | 全屏网格，无滚动 |
| **通报/海报/通知** | **Poster** | **克制专业主义** | **固定宽度，长页面滚动** |
| 网页/落地页 | Web Page | 品牌模式 | 响应式全宽，自由滚动 |
| **高端产品落地页** | **Landing Page** | **克制专业主义** | **Linear 式克制，Hero→Support→Detail→CTA** |
| **管理后台/工具/操作界面** | **App UI** | **克制专业主义** | **全屏网格，Linear 式克制** |

---

## Step 2: 选择风格

### Step 1.5: 对象建模（OOUX/ORCA）—— 复杂页面必选

> 来源：UX Designer Skill Lab — OOUX 方法论。适用于 Dashboard、App UI、多对象交互页面。

**任务导向设计**（传统）：用户需要完成任务 → 设计流程步骤
**对象导向设计**（OOUX）：识别业务对象 → 明确对象关系 → 设计行动触发 → 列出属性

**ORCA 四步法**：

| 步骤 | 关键问题 | 输出 |
|------|---------|------|
| **O - Objects** | 页面涉及哪些核心对象？（供应商/订单/用户/任务） | 对象清单（名词） |
| **R - Relationships** | 对象之间有什么关系？（从属/关联/层级） | 关系图/嵌套结构 |
| **C - Calls-to-action** | 用户能对每个对象做什么？（查看/编辑/删除/导出） | 操作列表（动词） |
| **A - Attributes** | 每个对象有哪些关键属性需要展示？（名称/状态/数值/时间） | 属性清单 |

**触发条件**：
- 类型为 Dashboard / App UI / 管理后台
- 内容涉及多个可交互对象（表格+卡片+详情+操作）
- 用户说"数据看板"、"管理界面"、"操作台"

**简化执行**：列出对象 → 画出关系 → 标出操作 → 筛选属性

---

### 快速判断

1. **用户指定风格** → 直接用
2. **用户未指定** → 用默认风格（克制专业主义 ⭐）

### 14 种风格速查

| 风格 | 核心色 | 气质 | 适用场景 |
|------|--------|------|---------|
| **克制专业主义** ⭐ | 黑白灰 + `#E2725B` | 克制、专业、权威 | 问题诊断、事件分析 |
| **品牌模式** | `#E2725B` 陶土 | 人文温度 × 技术精度 | 品牌内容、用户页面 |
| **数据模式** | 黑白灰 + 陶土点缀 | 冷峻理性 | 报告、极简数据 |
| **金融时报** | `#0d7680` 青绿 | K 线语言、信赖感 | 仪表盘、金融数据 |
| **咨询模式** | `#333` + `#B85450` | So What 结论 | 战略演示、PPT |
| **自信宣言** | 黑白 + `#D4AF37` 金 | 高对比、冲击力 | Pitch、主题演讲 |
| **现代工坊** | `#6366f1` 靛蓝 | 干净、专业 | Agency 演示 |
| **分类标签** | `#475569` 板岩灰 | 编辑本、整理感 | 评审文档 |
| **柔和几何** | 粉彩色系 | 几何友好 | 产品介绍 |
| **趣味拼接** | 高饱和对比 | 双色分割 | 创意 Agency |
| **复古报刊** | `#78716c` 暖棕 | 怀旧、个性 | 个人品牌 |
| **极简现代** | `#dc2626` 瑞士红 | 极简、精确 | 企业数据 |
| **纸墨文学** | `#1c1917` 墨黑 | 文学、沉思 | 故事叙述 |
| **Anthropic 品牌** | `#141413` + `#d97757` | 官方品牌、人文 | 对外展示 |

> ⭐ 年老师默认风格

---

## Step 2.5: Landing Page 专用规范

> 当类型为 **Landing Page（高端产品落地页）** 时，使用以下规范。
> 前置思考、设计纪律、文案原则、图像规范、动效原则见上方全局章节。

### 默认内容序列

| 区域 | 内容 |
|------|------|
| Hero | 品牌 + 承诺 + CTA + 主视觉 |
| Support | 展示一个功能/优势/证明 |
| Detail | 展示氛围/工作流/故事 |
| Final CTA | 引导转化行动 |

### Hero 区规则

- **一个构图，全出血图像** — hero 本身必须 edge-to-edge，无 gutters、无 framed container、无 shared max-width；只约束内部文字/行动列
- **内容顺序**：品牌 → 标题 → 正文 → CTA
- **标题≤3 行（桌面端）**，移动端一瞥可读
- **文本列窄且锚定** — 锚定在图像的安静色调区域
- **文字对比度** — 图上文字必须强对比 + 清晰 tap target

### 两道 Hero 检验

1. **去图检验** — 去掉图片后页面还能用，说明图片太弱
2. **藏 nav 检验** — 隐藏导航后品牌消失，说明层级太弱

### Viewport Budget

- Sticky/fixed header **计入 hero** — header + hero 内容必须 fit 初始视口
- 使用 `100vh`/`100svh` 时，减去持久 UI chrome：`calc(100svh - header-height)`
- 或 overlay header，不在 normal flow 中堆叠

### Landing Page 禁止

- ❌ Hero cards、stat strips、logo clouds、pill soup、floating dashboards
- ❌ Boxed 或 center-column hero（brief 要求全出血时）

---

### 风格参数速查表

#### 字体

| 风格 | 标题字体 | 正文字体 | T1 封面 | T1 页面 | 圆角 |
|------|---------|---------|---------|---------|------|
| **克制专业主义** | system-ui | system-ui | 2.2rem | 1.8rem | 2px |
| **品牌模式** | Cormorant Garamond | DM Sans | 2.5rem | 2rem | 4px |
| **数据模式** | system-ui | system-ui | 2rem | 1.6rem | 2px |
| **金融时报** | Georgia | Helvetica | 1.8rem | 1.5rem | 2px |
| **咨询模式** | system-ui | system-ui | 2rem | 1.7rem | 2px |
| **自信宣言** | system-ui bold | system-ui | 3.5rem | 2.5rem | 0 |
| **现代工坊** | Inter | Inter | 2.2rem | 1.8rem | 8px |
| **分类标签** | system-ui | system-ui | 1.6rem | 1.3rem | 4px |
| **柔和几何** | Nunito | Nunito | 2rem | 1.6rem | 16px |
| **趣味拼接** | system-ui bold | system-ui | 2.8rem | 2rem | 0 |
| **复古报刊** | Playfair Display | system-ui | 2rem | 1.5rem | 0 |
| **极简现代** | Helvetica | Helvetica | 2.5rem | 2rem | 0 |
| **纸墨文学** | Noto Serif SC | system-ui | 1.8rem | 1.3rem | 0 |
| **Anthropic 品牌** | Poppins | Lora | 2.4rem | 2rem | 0 |

#### 色彩与背景

| 风格 | 背景色 | 强调色 | 强调色用量 | 图标风格 |
|------|--------|--------|-----------|---------|
| **克制专业主义** | `#FFFFFF` | `#E2725B` | 极少（进度条+焦点） | 无 |
| **品牌模式** | `#F5F1EE` | `#E2725B` | 中（点缀+图标填充） | 手绘 SVG |
| **数据模式** | `#FFFFFF` | `#E2725B` | 极少（1处焦点） | 无 |
| **金融时报** | `#fff1e5` | `#0d7680` | 中（标题+品牌线） | 几何 SVG |
| **咨询模式** | `#F9F9F9` | `#B85450` | 中（结论关键词） | 无 |
| **自信宣言** | `#000000` | `#D4AF37` | 低（金色点缀） | 粗线条 SVG |
| **现代工坊** | `#FFFFFF` | `#6366f1` | 中（标题+按钮） | Lucide SVG |
| **分类标签** | `#FFFFFF` | `#475569` | 低（标签底色） | 无 |
| **柔和几何** | `#FFF8F0` | `#F8B4D9` | 中（几何色块） | 圆角 SVG |
| **趣味拼接** | 双色分割 | 对比色 | 高（主视觉） | 粗线条 SVG |
| **复古报刊** | `#F5F0E8` | `#78716c` | 低（复古棕） | 线条 SVG |
| **极简现代** | `#FFFFFF` | `#dc2626` | 极少（1-2处红线） | 无 |
| **纸墨文学** | `#FAFAF8` | `#1c1917` | 极少（墨色） | 无 |
| **Anthropic 品牌** | `#faf9f5` | `#d97757` | 中（强调+按钮） | Lucide SVG |

#### 克制专业主义 — 完整灰阶系统

```css
:root {
  /* 主色 */
  --rp-black: #111111;        /* 表头、主标题、底部信息条 */
  --rp-white: #FFFFFF;        /* 页面背景 */
  --rp-accent: #E2725B;       /* 强调色（≤10%面积）*/

  /* 灰阶（5级）*/
  --rp-gray-50: #FAFAFA;      /* 斑马纹行、卡片背景 */
  --rp-gray-100: #F5F5F5;     /* hover状态 */
  --rp-gray-200: #E5E5E5;     /* 边框、分割线 */
  --rp-gray-400: #999999;     /* 禁用文字、图例 */
  --rp-gray-600: #666666;     /* 次要文字、正文 */
  --rp-gray-900: #111111;     /* 主文字（同--rp-black）*/
}
```

**灰阶使用规范**：

| 场景 | 颜色 | 说明 |
|------|------|------|
| 表头背景 | `#111` | 炭黑，与页面形成强对比 |
| 底部信息条 | `#111` | 与表头统一 |
| 主标题 | `#111` | 炭黑，最大视觉重量 |
| 正文/次要信息 | `#666` | 中灰，60%黑 |
| 图例/注释 | `#999` | 浅灰，40%黑 |
| 边框 | `#E5E5E5` | 10%黑，存在感低 |
| 分割线 | `#E5E5E5` | 同边框 |
| 斑马纹行 | `#FAFAFA` | 3%黑，微妙区分 |
| hover状态 | `#F5F5F5` | 4%黑，可见但不突兀 |
| 卡片背景 | `#FAFAFA` | 同斑马纹 |

---

### 排版系统（Layout System）

> 参考 pptmaker layout-rules.md，所有元素必须显式定位

#### 画布规范

| 参数 | 值 | 说明 |
|------|-----|------|
| 画布比例 | 16:9 | 标准宽屏 |
| 参考尺寸 | 13.333 x 7.5 | PowerPoint 英寸坐标 |
| 左右边距 | ≥0.75 | 安全区域 |
| 顶部边距 | ≥0.6 | 安全区域 |
| 底部边距 | ≥0.5 | 安全区域 |

#### 字体层级（单位：rem）

| 层级 | 范围 | 用途 |
|------|------|------|
| **一级标题** | 1.6 - 2.0 | 封面、章节标题 |
| **二级标题** | 1.1 - 1.4 | 页面标题 |
| **正文** | 0.9 - 1.25 | 内容主体 |
| **注释** | 0.7 - 0.85 | 说明、图例 |

> 换算：1rem ≈ 16px（浏览器默认）

#### 布局原则

| 规则 | 说明 |
|------|------|
| **显式坐标** | 所有组件必须给出具体尺寸，不依赖浏览器流式排版 |
| **主题复用** | 字体、颜色、间距尽量复用设计 token |
| **两栏优先** | 图文混排优先两栏，不随机堆叠 |
| **留白充足** | 表格和图表必须给足留白 |
| **编辑友好** | 优先改已有组件，不随意重建整页 |

---

**通报/海报模式 Header**：
- **背景**: `#111`（炭黑）— 不是 `#8B0000`（深红）
- **顶部装饰线**: `#E2725B`（陶土色，2.4px）
- **文字**: `#FFFFFF`

#### 间距与密度

| 风格 | 默认密度 | 页面 padding | 卡片间距 | 留白比例 |
|------|---------|-------------|---------|---------|
| **克制专业主义** | 标准 | 24-48px | 16-24px | 30-40% |
| **品牌模式** | 低 | 48px | 24px | >40% |
| **数据模式** | 高 | 24px | 12px | 10-20% |
| **金融时报** | 高 | 24px | 1px（网格线） | 15-25% |
| **咨询模式** | 标准 | 32px | 16px | 25-35% |
| **自信宣言** | 低 | 48px | 32px | >50% |
| **现代工坊** | 标准 | 32px | 16px | 30-40% |
| **分类标签** | 高 | 24px | 8px | 20-30% |
| **柔和几何** | 标准 | 32px | 16px | 35-45% |
| **趣味拼接** | 标准 | 32px | 0（无间隙） | 20-30% |
| **复古报刊** | 标准 | 32px | 16px | 30-40% |
| **极简现代** | 标准 | 32px | 16px | 35-45% |
| **纸墨文学** | 极低 | 48px | 24px | >60% |
| **Anthropic 品牌** | 标准 | 40px | 20px | 35-45% |

#### 标志性元素

| 风格 | 标志性元素 | 动画 | 特殊处理 |
|------|-----------|------|---------|
| **克制专业主义** | 3px 进度条 + 页码徽章 | 页面切换 | 2.4px 陶土色顶部线 |
| **品牌模式** | 手绘 SVG + 纸张纹理 | 入场淡入 | 双层偏移边框 |
| **数据模式** | 2px 黑色表头线 | 无 | 条件格式 |
| **金融时报** | 4px 青绿上边框 | 无 | 1px 间隙 KPI 网格 |
| **咨询模式** | So What 标题 | 页面切换 | 面包屑导航 |
| **自信宣言** | 巨大字号 + 黑底 | 高对比切换 | 金色分割线 |
| **现代工坊** | 精确网格对齐 | 微交互 hover | 标签页导航 |
| **分类标签** | 标签页 + 分隔线 | 滑动过渡 | 笔记本边距线 |
| **柔和几何** | 圆角色块 | 柔和缓入 | 几何装饰图案 |
| **趣味拼接** | 双色对角分割 | 对比切换 | 无圆角、粗边框 |
| **复古报刊** | 衬线标题 + 分栏 | 无 | 报纸分栏布局 |
| **极简现代** | 红色细线 | 无 | 严格网格对齐 |
| **纸墨文学** | 大面积留白 | 缓慢淡入 | 窄行宽、单列 |
| **Anthropic 品牌** | Poppins 大标题 + Lora 正文 | 柔和淡入 | 双字体对比 |

---

## 通报/海报模式（Poster）

> **场景特征**：业务通报、激励海报、政策通知、管理层汇报
>
> **交互模式**：固定宽度居中，长页面滚动浏览（非 100vh 翻页）

### 触发条件

| 关键词 | 典型场景 |
|--------|---------|
| 通报、通知、海报、公告 | 业务变化通报、政策调整通知 |
| 激励、竞赛、搞钱 | 激励海报、竞赛规则 |
| 管理层版、内部资料 | 定向传达的通报材料 |

### 核心参数

| 参数 | 值 | 说明 |
|------|-----|------|
| 宽度 | `min(820px, 100% - 2rem)` | 固定宽度，小屏适配 |
| 背景 | `#F5F0EC` 或 `#f4f5f7` | 浅灰/米色，衬托主体 |
| 圆角 | 2px | 锐利专业 |
| 内边距 | `clamp(1.5rem, 4vw, 3rem)` | 响应式 |
| 滚动 | 允许 | 长页面滚动浏览 |

### 结构模板

```
┌─────────────────────────────────┐
│ 封面 Header（品牌色背景）         │  ← 标题 + 副标题 + 元信息标签
├─────────────────────────────────┤
│ Section 1                       │
│ ├─ 标题（编号 + 文字 + 分割线）   │
│ └─ 卡片网格 / 表格               │
├─────────────────────────────────┤
│ Section 2                       │
│ └─ ...                          │
├─────────────────────────────────┤
│ 底部信息条（深色背景）            │  ← 部门 + 日期 + 密级
└─────────────────────────────────┘
```

### HTML 模板

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[标题]</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: system-ui, -apple-system, sans-serif;
      background: #F5F0EC;
      padding: clamp(1rem, 3vw, 2rem);
      display: flex;
      justify-content: center;
    }
    .poster {
      width: min(820px, 100% - 2rem);
      background: #fff;
      border-radius: 2px;
      border: 1px solid #E5E5E5;
      overflow: hidden;
    }

    /* 封面 */
    .header {
      background: #111;  /* 炭黑 - 克制专业主义 */
      padding: clamp(2rem, 5vw, 3rem);
      position: relative;
    }
    .header::before {  /* 顶部装饰线 */
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 2.4px;
      background: #E2725B;  /* 陶土色 */
    }
    .header-badge { /* 元信息标签 */
      display: inline-block;
      background: rgba(255,255,255,.15);
      color: #fff;
      font-size: 10px;
      padding: 4px 12px;
      border-radius: 2px;
      margin-bottom: 16px;
    }
    .header h1 {
      color: #fff;
      font-size: clamp(1.8rem, 4.5vw, 2.8rem);
      font-weight: 700;
    }
    .header h1 span { /* 副标题 */
      display: block;
      font-size: clamp(0.75rem, 1.5vw, 0.9rem);
      font-weight: 400;
      margin-top: 8px;
      opacity: .8;
    }
    .header-meta { /* 元信息行 */
      margin-top: 20px;
      display: flex;
      gap: 12px;
      flex-wrap: wrap;
    }
    .header-meta .tag {
      color: rgba(255,255,255,.9);
      font-size: 10px;
      background: rgba(255,255,255,.1);
      padding: 4px 10px;
      border-radius: 2px;
    }

    /* 内容区 */
    .body { padding: clamp(1.5rem, 4vw, 3rem); }
    .section { margin-top: 32px; }
    .section:first-child { margin-top: 24px; }
    .section-header {
      display: flex;
      align-items: center;
      gap: 12px;
      margin-bottom: 16px;
    }
    .section-num {
      width: 28px;
      height: 28px;
      background: #8B0000;
      color: #fff;
      font-size: 10px;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 2px;
    }
    .section-title {
      font-size: clamp(1rem, 2vw, 1.3rem);
      font-weight: 700;
      color: #111;
    }
    .section-line {
      flex: 1;
      height: 2px;
      background: #E5E5E5;
    }

    /* 卡片 */
    .cards {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 16px;
    }
    .card {
      background: #FAFAFA;
      border: 1px solid #E5E5E5;
      border-radius: 2px;
      padding: 16px;
    }
    .card.full { grid-column: 1 / -1; }
    .card.highlight {
      border: 1px solid #E2725B;
      background: rgba(226, 114, 91, 0.08);
    }
    @media (max-width: 600px) {
      .cards { grid-template-columns: 1fr; }
    }

    /* 表格 */
    table { width: 100%; border-collapse: collapse; font-size: 12px; }
    th {
      background: #111;
      color: #fff;
      padding: 8px 12px;
      text-align: left;
      font-size: 10px;
    }
    td {
      padding: 10px 12px;
      border-bottom: 1px solid #E5E5E5;
    }
    tr:nth-child(even) td { background: #FAFAFA; }

    /* 徽章 */
    .badge-up { background: #d63333; color: #fff; padding: 1px 5px; border-radius: 2px; font-size: 9px; }
    .badge-down { background: #2d8a2d; color: #fff; padding: 1px 5px; border-radius: 2px; font-size: 9px; }
    .badge-new { background: #2563eb; color: #fff; padding: 1px 5px; border-radius: 2px; font-size: 9px; }

    /* 底部信息条 */
    .bottom-strip {
      background: #111;  /* 炭黑 - 与header统一 */
      padding: 16px clamp(1.5rem, 4vw, 3rem);
      display: flex;
      justify-content: space-between;
    }
    .bottom-strip .left,
    .bottom-strip .right {
      color: rgba(255,255,255,.7);
      font-size: 10px;
    }
  </style>
</head>
<body>
<div class="poster">
  <div class="header">
    <div class="header-badge">内部通报 · 管理层</div>
    <h1>标题<span>副标题</span></h1>
    <div class="header-meta">
      <div class="tag">标签1</div>
      <div class="tag">标签2</div>
    </div>
  </div>

  <div class="body">
    <div class="section">
      <div class="section-header">
        <div class="section-num">1</div>
        <div class="section-title">章节标题</div>
        <div class="section-line"></div>
      </div>
      <div class="cards">
        <div class="card">卡片内容</div>
        <div class="card">卡片内容</div>
      </div>
    </div>

    <!-- 更多 section... -->
  </div>

  <div class="bottom-strip">
    <div class="left">部门 · 业务线</div>
    <div class="right">2026年4月 · 内部资料</div>
  </div>
</div>
</body>
</html>
```

### 与幻灯片模式的区别

| 维度 | 幻灯片模式 | 通报/海报模式 |
|------|-----------|--------------|
| 视口 | 100vh，禁止滚动 | 自由高度，允许滚动 |
| 宽度 | 100vw 全屏 | 固定 820px 居中 |
| 分页 | 键盘/点击翻页 | 滚动浏览 |
| 结构 | 封面 + 多页内容 | 封面 + 长内容 + 底部条 |
| 适用 | 演示、汇报、培训 | 通报、通知、海报 |

### 通报模式检查清单

- [ ] 固定宽度居中（不是全屏）
- [ ] 允许滚动（不是 100vh overflow:hidden）
- [ ] 封面有顶部装饰线（2.4px 陶土色）
- [ ] 底部有信息条（部门 + 日期 + 密级）
- [ ] 卡片网格响应式（小屏单列）
- [ ] 无阴影、无渐变

---

## 组件库（Component Library）

> **组件库已拆分到单独文件：`references/component-library.md`**
>
> 本 SKILL.md 只保留判断流程和框架定义，具体组件参数在 component-library.md 中。

### 使用方式

```
Step 1: 确定 UI 类型（6 选 1）
    ↓
Step 2: 确定页面类型（各 UI 类型下有 3-5 种）
    ↓
Step 3: 【按需读取】component-library.md，获取具体组件参数
    ↓
Step 4: 组装生成
```

### 组件库结构

| 层级 | 内容 | 位置 |
|------|------|------|
| 通用原子组件 | badge, stat-callout, step-flow 等 | component-library.md |
| Presentation 组件 | 11 种页面类型 × 3 变体 | component-library.md |
| Dashboard 组件 | 22 个（图表+控制+数据展示）| component-library.md |
| Poster 组件 | 6 个特有组件 | component-library.md |
| Web Page 组件 | 8 个特有组件 | component-library.md |
| Landing Page 组件 | 10 个特有组件 | component-library.md |
| App UI 组件 | 28 个（输入+控制+状态+反馈+导航）| component-library.md |

---

## Step 3: 设计判断

### 快速路径（≤3 页简单内容）

跳过此步，直接用默认参数生成。

### 标准路径 / 深度路径

**必须读取 `references/design-judgment.md`**，执行 6 层决策：

1. **Layer 1** — 内容元素识别（数据/流程/清单/洞察）
2. **Layer 2** — 情绪气质（紧迫/中性/庆祝/沉思）
3. **Layer 3** — 阅读方式（扫视/阅读/凝视）
4. **Layer 4** — 密度与版式（由 Layer 2+3 决定）
5. **Layer 5** — 可视化叠加（级别 + 形式）
6. **Layer 6** — 焦点选择（陶土色用在哪里）

速查表（不读文件时的简化判断）：

| 情绪 × 阅读 | 扫视 | 阅读 | 凝视 |
|------------|------|------|------|
| **紧迫** | 高密度表格 | 中密度列表 | — |
| **中性** | 中高密度网格 | 标准密度 | — |
| **庆祝** | — | 中低密度 | 低密度+可视化 |
| **沉思** | — | 低密度 | 极低密度+全可视化 |

| 内容结构 | 版式 |
|---------|------|
| 行列结构 | 表格 |
| 对立/对比 | 左右对比 |
| 并列模块 | 卡片网格 |
| 线性展开 | 标准列表 |
| 时间顺序 | 时间线 |

**深度路径额外步骤**：读取 `references/design-philosophy.md`，提取内容基因（4 维 DNA）并写设计哲学宣言。

---

## Step 4: 生成代码

### 核心参数（克制专业主义基准）

```css
:root {
  /* 色彩 */
  --text-primary: #111111;
  --text-secondary: #666666;
  --text-tertiary: #999999;
  --bg: #FFFFFF;
  --surface: #FAFAFA;
  --border: #E5E5E5;
  --accent: #E2725B;
  --accent-light: rgba(226, 114, 91, 0.1);

  /* 字体层级 */
  --t1-cover: clamp(2.2rem, 5.5vw, 3.5rem);
  --t1-page: clamp(1.8rem, 4.5vw, 2.8rem);
  --t2: clamp(1rem, 2vw, 1.3rem);
  --t3: clamp(0.85rem, 1.3vw, 1rem);
  --t4: clamp(0.75rem, 1.2vw, 0.9rem);
  --t6: clamp(0.6rem, 0.8vw, 0.7rem);

  /* 间距（4pt 基准） */
  --space-xs: 4px; --space-sm: 8px; --space-md: 12px;
  --space-lg: 16px; --space-xl: 24px; --space-2xl: 32px;

  /* 页面级间距 */
  --page-padding: clamp(1.5rem, 4vw, 3rem);
  --card-padding: clamp(1rem, 2vw, 1.5rem);
  --card-gap: clamp(1rem, 2vw, 1.5rem);

  /* 边框 */
  --border-thin: 1px solid var(--border);
  --border-thick: 2px solid var(--text-primary);
  --border-radius: 2px;
  --divider-height: 2px;
  --progress-bar-height: 3px;
}
```

### Dashboard 模式图表规范（来自 slides 方法论）

> 当类型为 **Dashboard（仪表盘）** 时，图表必须可交互、可编辑

| 图表类型 | 实现方式 | 交互要求 |
|---------|---------|---------|
| **柱状图** | ECharts / Chart.js | hover 显示数值，可点击筛选 |
| **折线图** | ECharts / Chart.js | 支持缩放、数据点 hover |
| **饼图** | ECharts / Chart.js | 扇区 hover 放大，显示占比 |
| **表格** | HTML table + CSS | 行 hover 高亮，可排序 |
| **KPI 卡片** | CSS flex/grid | 数字动画计数 |

**禁止**：
- 把图表做成静态图片
- 使用不可交互的 SVG 图表（Dashboard 模式下）

**数据格式**：
```javascript
// 图表数据必须结构清晰
const chartData = {
  labels: ['1月', '2月', '3月'],
  datasets: [{
    label: '完成率',
    data: [85, 92, 88],
    color: '#E2725B'
  }]
};
```

### HTML 模板

```html
<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[Title]</title>
  <link href="..." rel="stylesheet">
  <style>
    html, body { height: 100%; overflow-x: hidden; }
    html { scroll-snap-type: y proximity; scroll-behavior: smooth; }
    .slide {
      width: 100vw; height: 100vh; height: 100dvh;
      overflow: hidden; scroll-snap-align: start;
      display: flex; flex-direction: column;
    }
    :root {
      --title-size: clamp(1.5rem, 5vw, 4rem);
      --body-size: clamp(0.75rem, 1.5vw, 1.125rem);
      --slide-padding: clamp(1rem, 4vw, 4rem);
    }
  </style>
</head>
<body>
  <!-- 内容 -->
  <script>
    class SlidePresentation {
      constructor() {
        this.slides = document.querySelectorAll('.slide');
        this.currentIndex = 0;
        this.init();
      }
      init() {
        document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowRight' || e.key === ' ') this.next();
          if (e.key === 'ArrowLeft') this.prev();
        });
        const observer = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
          });
        }, { threshold: 0.5 });
        this.slides.forEach(slide => observer.observe(slide));
      }
      next() { /* ... */ }
      prev() { /* ... */ }
    }
    new SlidePresentation();
  </script>
</body>
</html>
```

### 图标规范

**禁止**：Emoji、Lucide、Heroicons、图标字体
**使用**：手绘 SVG 或素材库图标

```css
.hand-drawn {
  fill: none; stroke: #3D2C29; stroke-width: 2.5;
  stroke-linecap: round; stroke-linejoin: round;
}
.hand-drawn-fill { fill: #E2725B; stroke: none; }
```

**图标来源**：
1. 素材库 — `assets/icons/` 和 `assets/icons-v2/`（200 个）
2. 按需手绘
3. better-icons CLI — 手绘风格不合适时

---

## 完整风格规范

### 品牌模式 — Terracotta Hand-drawn

```css
:root {
  --terracotta: #E2725B; --terracotta-deep: #CA6641;
  --cream: #F5F1EE; --grey-mid: #C5C1BE; --charcoal: #3D2C29;
  --sage: #8BA87A; --deep-blue: #2C5F7D;
}
```

字体：Cormorant Garamond（标题） + DM Sans（正文）
背景：Cream `#F5F1EE` + SVG 纸张纹理
手绘 SVG：2-3px 粗细，round 端点，陶土色填充

```css
/* 双层偏移边框 */
.element-card::before {
  content: ''; position: absolute; inset: 0;
  border: 2px solid var(--grey-mid); border-radius: 4px;
  transform: translate(3px, 3px);
}
.element-card::after {
  content: ''; position: absolute; inset: 0;
  border: 2px solid var(--charcoal); border-radius: 4px;
}
```

> 完整规范：`references/anthropic-design-guide.md`

---

### 数据模式 — Minimal B&W

```css
:root {
  --text-primary: #111; --text-secondary: #666; --text-tertiary: #999;
  --bg-white: #fff; --border: #e5e5e5;
  --accent: #E2725B; --positive: #2a9d5c; --negative: #d73a49;
}
```

特征：纯白背景、2px 黑色表头线、陶土色仅用于一处焦点

```css
.data-table th { border-bottom: 2px solid #111; font-weight: 600; font-size: 12px; }
.data-table td { border-bottom: 1px solid #e5e5e5; }
.kpi-card { background: #fff; border: 1px solid #e5e5e5; }
```

---

### 金融时报 — Financial Times Style

```css
:root {
  --brand: #0d7680; --bg: #fff1e5; --surface: #ffffff;
  --text: #333; --positive: #2e7d32; --negative: #cc0000;
}
```

字体：Georgia（标题） + Helvetica（区块标题/大数字）
布局：4px 青绿上边框、1px 间隙 KPI 网格、左 70% 右 30%

```css
.header-title { font-family: Georgia, serif; font-size: 28px; color: var(--brand); }
.section-title { font-family: Helvetica, sans-serif; font-size: 13px; font-weight: 700; color: var(--brand); }
.badge { display: inline-block; padding: 2px 8px; border-radius: 2px; font-size: 10px; }
```

---

### 咨询模式 — Strategy Presentation

```css
:root { --bg: #F9F9F9; --text: #333; --accent: #B85450; --divider: #D0D0D0; }
```

**So What 原则**：标题必须是结论性句子
- ❌ "2024年市场份额分布"
- ✅ "由于在低端市场渗透率不足，A公司市场份额已被B公司反超"

---

### Anthropic 品牌风格

```css
:root {
  --anth-dark: #141413; --anth-light: #faf9f5;
  --anth-mid-gray: #b0aea5; --anth-light-gray: #e8e6dc;
  --anth-orange: #d97757; --anth-blue: #6a9bcc; --anth-green: #788c5d;
}
```

字体：Poppins（标题） + Lora（正文），零圆角

---

## 基础质量检查（每次生成后必做，不依赖路径）

- [ ] 视口适配：100vh, overflow: hidden
- [ ] 无阴影、无渐变
- [ ] 无 emoji 图标
- [ ] 字号使用 clamp()
- [ ] 色彩从速查表取值，不凭感觉
- [ ] 同风格内圆角一致
- [ ] 强调色一页一处

### 深度检查（标准路径和深度路径必须执行）

生成完成后，**必须读取 `references/quality-checklist.md`**，执行：

1. **AI Slop 自检**（10 条反 AI 味检测）— 任一命中即返工
2. **11 分制评分** — 内容编辑(3) + 设计判断(3) + 视觉执行(5)，≥8 分可交付
3. **反模式排查**（8 条）— 标题跳级、间距不一致、卡片嵌套等

### 快速路径

只做基础检查，跳过深度检查。

---

## 动效原则（Motion）

> 来源：OpenAI Codex Motion。用动效创造存在感和层级，不是噪音。
> 视觉导向型工作必须至少 2-3 个有意为之的动效。

### 3 个必做动效

| # | 动效 | 作用 | mino 实现 |
|---|------|------|----------|
| 1 | **Hero 入场序列** | 第一印象，页面"活过来" | CSS `@keyframes` + `animation-delay` |
| 2 | **滚动联动** | 滚动时内容逐层显现，制造叙事感 | IntersectionObserver + CSS class toggle |
| 3 | **Hover/Reveal 过渡** | 强化可操作性，指引用户点击 | CSS `transition` on hover/focus |

### 5 条动效规则

1. **录屏可见** — 快速录屏能明显看到动效，否则太弱
2. **移动端流畅** — 触发时 60fps，不卡顿
3. **快且克制** — 时长 200-400ms，缓动 ease-out
4. **页面一致** — 所有 section 用同一套动效语言
5. **纯装饰就删** — 不改善层级或氛围的动效，去掉

### mino 推荐动效模式

| 场景 | 技术 | 效果 |
|------|------|------|
| Section 显现 | IntersectionObserver + `.visible` class | 淡入 + 上移 8px |
| 共享布局过渡 | CSS `transition: all 0.3s` | 位置/尺寸平滑变化 |
| 滚动联动 | scroll 事件 + `translateY/opacity` | 视差/深度感 |
| 固定叙事 | `position: sticky` + scroll | 侧边内容随滚动切换 |
| 菜单/抽屉 | CSS `transform: translateX` | 侧滑进出 |
| 表格行 hover | `transition: background 0.15s` | 背景色变化 |

---

## App UI 模式（管理后台 / 工具型界面）

> 来源：OpenAI Codex Apps。当类型为 **App UI** 时使用。
> 默认 Linear 式克制：冷静层级、强排版、少色、密信息可读、最小 chrome。

### 组织结构

App UI 围绕四个区域组织：

| 区域 | 内容 | 位置 |
|------|------|------|
| **主工作区** | 核心操作面板 | 中央，占比最大 |
| **导航** | 侧边栏或顶部 tab | 左侧或顶部 |
| **辅助面板** | 详情/Inspector/筛选 | 右侧或底部 |
| **强调色** | 行动/状态指示 | 仅用于按钮、选中态、警告 |

### 6 条设计原则

1. **冷静层级** — 不靠装饰区分层级，靠字号、间距、留白
2. **强排版间距** — 信息密度高但可读，靠精确的网格和排版
3. **少色** — 背景、表面、文字三级灰 + 1 种强调色
4. **密信息可读** — 数据密集但不拥挤，行高 1.5-1.6
5. **最小 chrome** — 去掉不必要的边框、阴影、圆角
6. **卡片仅交互时用** — 列表行不是卡片，筛选项不是卡片

### 6 条 Avoid

- ❌ Dashboard 卡片马赛克 — 用表格/列表替代
- ❌ 每个区域厚边框 — 用背景色差区分
- ❌ 常规 UI 后的装饰渐变 — 纯色背景
- ❌ 多个竞争强调色 — 只保留 1 种
- ❌ 不改善扫描的装饰图标 — 图标必须有语义
- ❌ 能变成纯布局却还包卡片的外框 — 去掉

---

## 交互组件（按需使用）

| 组件 | 技术要点 | 适用场景 |
|------|---------|---------|
| **Tab 切换** | 数据驱动 + 状态索引 | ≥3 维度对比 |
| **滚动触发动画** | IntersectionObserver | 故事/时间线 |
| **进度条/步骤条** | CSS 进度条 + 状态类名 | 流程展示 |
| **内联折叠** | grid-template-rows: 0fr→1fr | 详细信息展开 |

**50% 视觉率**：每屏至少 50% 是视觉元素（图标/图表/色块/动画）。

---

## SVG 生成方式

### 手写（图标类）

简洁、可控、零成本。规范见品牌模式。

### Quiver AI API（复杂插图）

```javascript
const response = await fetch('https://api.quiver.ai/v1/svgs/generations', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer sk_live_JTeCrNxZLMMeBL9pgbijT2',
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    model: 'arrow-preview',
    prompt: 'A hand-drawn style book icon, warm terracotta color',
    instructions: 'Hand-drawn aesthetic, organic lines, warm and friendly',
  }),
});
```

> 详细对比：`QUIVER-COMPARISON.md`

---

## 素材资源

### Lucene 风格图标库

**位置**：`assets/icons-<mode>/`（每风格 40 个）

| 风格 | 文件夹 | 主色调 |
|------|--------|--------|
| 品牌模式 | `icons-brand/` | `#E2725B` |
| 数据模式 | `icons-data/` | `#E2725B` |
| 金融时报 | `icons-financial-times/` | `#0d7680` |
| 咨询模式 | `icons-consulting/` | `#B85450` |
| 自信宣言 | `icons-confidence/` | `#D4AF37` |
| 现代工坊 | `icons-modern-workshop/` | `#6366f1` |
| 分类标签 | `icons-tags/` | `#475569` |
| 柔和几何 | `icons-pastel/` | `#F8B4D9` |
| 趣味拼接 | `icons-split/` | `#FF6B6B` |
| 复古报刊 | `icons-vintage/` | `#78716c` |
| 极简现代 | `icons-swiss/` | `#dc2626` |
| 纸墨文学 | `icons-ink/` | `#1c1917` |
| Anthropic 品牌 | `icons-anthropic-brand/` | `#d97757` |

### 手绘 SVG 图标库

**位置**：`assets/icons/`（100 个供应商管理）+ `assets/icons-v2/`（100 个金融电销）

- 线条：炭灰色 `#3D2C29`，2.5px
- 点缀：陶土色 `#E2725B`，小面积填充

---

## References（自动触发，不是手动读取）

| 文件 | 何时自动读取 | 内容 |
|------|------------|------|
| `references/content-processing.md` | **每次收到材料时**（所有路径） | 5 步内容整理：读取→拆解→排优先级→分组分页→输出 |
| `references/style-generator.md` | **Step 2 风格选择** | 5维特征 → 自动生成风格 |
| `references/decision-matrix.md` | 需要情绪识别参考时 | 情绪关键词库、颜色映射 |
| `references/design-judgment.md` | 标准路径 + 深度路径（内容≥4页或混合元素） | 6 层决策 + 可视化叠加 + 焦点选择 |
| `references/design-philosophy.md` | 深度路径（情绪强烈/复杂隐喻/用户要求深度） | 内容基因提取 + 设计哲学宣言 + 空间使用法 |
| `references/icon-usage.md` | **需要图标时** | 图标使用原则 + better-icons 整合 |
| `references/quality-checklist.md` | 标准路径 + 深度路径（生成完成后） | AI Slop 自检 + 反模式 + 11 分制评分 |

---

*版本：v6.0*
*更新：2026-04-04 — v6.0 融合 OpenAI Codex frontend-skill：新增设计纪律（8+10条）、前置思考、文案原则（通用+工具型）、图像规范、动效原则、App UI 模式、设计 Litmus；Landing Page 瘦身为专属规范*
