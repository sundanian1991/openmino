# 数据炼金师 — 产品规格文档

## 1. 产品概述

**数据炼金师** 是一款 AI 驱动的数据叙事工具。用户上传真实数据（CSV/Excel），工具通过引导式问答明确受众和目标，AI 自动分析数据并应用 Storytelling with Data 的 30 个可视化技能，生成一份包含多图表、三幕叙事的完整 HTML 报告，可直接用于商业汇报。

**定位**：实用工具 + 游戏化外壳。核心是出报告，外壳提供沉浸感。

**用户**：商务分析师、运营经理、需要向管理层做数据汇报的人。

---

## 2. 技术栈

| 层 | 技术 |
|----|------|
| 前端框架 | React 18 + TypeScript + Vite |
| UI 组件 | shadcn/ui (Radix + TailwindCSS) |
| 图表渲染 | ECharts for React (`echarts-for-react`) |
| 动画 | Framer Motion |
| 状态管理 | Zustand |
| 路由 | React Router v6 |
| CSV 解析 | Papa Parse |
| Excel 解析 | SheetJS (xlsx) |
| 数据验证 | Zod |
| AI 后端 | Anthropic JS SDK 浏览器直调 |
| 打包 | Vite |

---

## 3. 产品架构

```
src/
├── components/          # UI 组件
│   ├── ui/             # shadcn/ui 基础组件
│   ├── header/         # 顶部栏 + 品牌 + API 状态
│   ├── progress/       # 5 步进度条（Framer Motion 动画）
│   ├── upload/         # 拖拽上传区
│   ├── preview/        # 数据预览表格 + 列统计
│   ├── chat/           # AI 对话面板
│   ├── charts/         # 图表网格 + ECharts 容器
│   ├── narrative/      # 三幕叙事卡片
│   ├── export/         # 导出按钮 + 评分弹窗
│   └── effects/        # 通关粒子动画、庆祝效果
├── store/              # Zustand 状态
│   ├── data.ts         # dataStore (raw, columns, summary)
│   ├── chat.ts         # 对话状态机、消息历史
│   ├── charts.ts       # 图表规格、ECharts 实例
│   └── narrative.ts    # 三幕叙事数据
├── services/           # 外部服务
│   ├── claude.ts       # Claude API 调用封装
│   ├── csv.ts          # Papa Parse 包装
│   ├── excel.ts        # SheetJS 包装
│   └── export.ts       # HTML 报告生成 + 下载
├── prompts/            # AI Prompt 模板
│   ├── system.ts       # System Prompt（30 skill 压缩版）
│   ├── layers.ts       # 分层 prompt 加载
│   └── examples.ts     # Few-shot examples
├── hooks/              # React hooks
│   ├── useClaude.ts    # Claude 调用 hook
│   ├── useFileUpload.ts # 文件上传 hook
│   ├── useCharts.ts    # 图表生命周期管理
│   └── useProgress.ts  # 进度状态 hook
├── lib/                # 工具函数
│   ├── chart-factory.ts # JSON spec → ECharts option 翻译
│   ├── scoring.ts      # 评分算法
│   └── sanitizer.ts    # 文本安全
├── pages/              # 页面组件
│   └── Workspace.tsx   # 主工作区（含所有状态切换）
├── types/              # TypeScript 类型
│   ├── data.ts         # DataStore, Column, Stats
│   ├── chat.ts         # Message, ChatStep
│   ├── chart.ts        # ChartSpec, Annotation
│   └── narrative.ts    # Narrative, Act1/2/3
└── App.tsx
```

---

## 4. 功能规格

### 4.1 数据上传

**输入**：CSV、Excel (.xlsx/.xls) 文件
**文件大小**：建议 ≤ 5MB，上限 10MB
**解析**：
- CSV → Papa Parse（自动编码检测、分隔符检测）
- Excel → SheetJS（读取第一个工作表）
**输出**：
```typescript
interface DataStore {
  raw: Record<string, any>[];       // 原始行数据
  columns: ColumnDef[];              // 列定义
  summary: DataSummary;              // 全局摘要
  fileName: string;
}

interface ColumnDef {
  name: string;
  type: 'number' | 'string' | 'date';
  stats: ColumnStats;
}

interface ColumnStats {
  min?: number; max?: number; mean?: number;
  unique?: number; nullCount: number;
}
```

### 4.2 AI 对话引擎

**对话状态机**：
```
IDLE → DATA_UPLOADED → Q1_AUDIENCE → Q2_GOAL → Q3_METRICS
     → CHART_RECOMMENDED → CHART_PREVIEW → NARRATIVE_COMPLETE → EXPORT_READY
```

**每步交互**：
1. **DATA_UPLOADED**：AI 分析数据结构，反馈"我分析了 X 行 Y 列数据，包含[字段]。这份报告是给谁看的？"
2. **Q1_AUDIENCE**："决策者是谁？他们对你的数据持什么态度？（信任/中立/怀疑）"
3. **Q2_GOAL**："你希望受众看完报告后做什么决定？用一个强动词描述"
4. **Q3_METRICS**："哪些指标最关键？有基准线或目标值吗？"
5. **CHART_RECOMMENDED**：AI 返回完整图表推荐方案 + 三幕叙事

**AI 调用策略**：
- 阶段 1-3：注入 Layer 1-2（核心规则 ~2500 tokens）
- 阶段 4+：注入 Layer 1-5（完整 ~8000 tokens）
- 使用 prompt caching 降低重复调用成本
- JSON Schema 约束输出格式

### 4.3 图表工厂

**支持的图表类型**：
- horizontal_bar（水平条形图）
- bar（垂直柱状图）
- line（折线图）
- area（面积图）
- stacked_bar（堆叠条形图）
- diverging_bar（发散条形图）
- scatter（散点图）
- heatmap（热力图）
- slope（坡度图/连线图）

**翻译层**：AI 返回 JSON ChartSpec → ECharts Option

```typescript
interface ChartSpec {
  id: string;
  type: string;
  title: string;           // 行动导向标题
  dataSource: Array<Record<string, any>>;
  highlight?: { target: string; color: string; others: string };
  annotations?: Array<{ type: string; value: number; label: string; color?: string }>;
  narrative: string;       // 这段图表的故事
  act: 1 | 2 | 3;          // 所属幕
}
```

**视觉规则**（从 SKILL 知识强制执行）：
- 条形图必须零基线
- 高亮 ≤10% 元素
- 先灰后彩（高亮系列用主色，其余灰化）
- 直接标注，不要图例
- 排序按故事焦点

### 4.4 三幕叙事

**UI 结构**：
```
┌─────────────────────────────────────┐
│  核心洞察 Big Idea                  │
├─────────────────────────────────────┤
│  第一幕 — 设定                      │
│  [场景描述] + [失衡点]              │
│  [图表 1] [图表 2]                  │
├─────────────────────────────────────┤
│  第二幕 — 论证                      │
│  [证据描述] + [不行动的后果]        │
│  [图表 3] [图表 4] [图表 5]         │
├─────────────────────────────────────┤
│  第三幕 — 行动                      │
│  [行动号召] + [紧迫性]              │
│  [图表 6] [图表 7]                  │
│  反对证据与局限性                   │
└─────────────────────────────────────┘
```

### 4.5 图表微调

每张图表有"微调"按钮，用户输入自然语言指令（如"把高亮颜色换成绿色"、"按值降序排列"），触发与 Claude 的二次对话，更新图表配置并重新渲染。

### 4.6 报告导出

**输出**：独立 HTML 文件
**内容**：
- 封面页（报告标题、日期、数据源）
- 三幕叙事 + 图表
- 反对证据段落
- 内联 CSS
- ECharts CDN + 序列化图表数据

**下载**：Blob → createObjectURL → `<a download>`

### 4.7 评分系统

5 维度 × 20 分 = 100 分：
1. **受众定义**：有具体人名/角色（20）vs 模糊标签（5）
2. **行动目标**：有强动词（20）vs "分析一下"（5）
3. **图表合理性**：类型匹配功能目标（20）vs 饼图/3D（0）
4. **叙事完整度**：三幕完整（20）vs 缺某幕（5-10）
5. **数据伦理**：有反对证据（20）vs 没有（5）

### 4.8 游戏化外壳

- 5 步进度条（Framer Motion 过渡）
- "数据炼金师"角色人设
- 步骤切换动画
- 通关粒子动画
- 评分弹窗

---

## 5. 视觉设计规范

**风格**：cinematic-ui（电影感）+ GDD 配色

```
背景: #0a0a12（深空黑）
表面: rgba(255,255,255,0.06)
强调: #4361ee（矢车菊蓝）
紫色: #7209b7
成功: #2ec4b6
危险: #f72585
文字: #e8e8f0 / #8888aa / #555570
数据红: #C13531
数据深蓝: #293C54
数据灰: #CDCECD
```

**动画**：
- 页面切换：Framer Motion layout + opacity
- 卡片进入：whileInView（fade + slide up）
- 按钮悬停：scale(1.02) + translateY(-2px)
- 进度条：framer progress + glow
- 通关：confetti particles (framer motion + spring)

---

## 6. AI Prompt 策略

### Layer 1: 角色定义（~500t）
"你是数据炼金师，擅长将原始数据转化为有说服力的数据叙事..."

### Layer 2: 核心规则（~2000t）
禁止项 + 图表选择映射 + 配色体系 + 标题规则 + 高亮规则 + 排序规则

### Layer 3: 图表指南（~3000t）
功能→图表映射表 + 排序/标注策略 + 复杂图表模板

### Layer 4: 叙事规则（~2000t）
Big Idea 公式 + 三幕模板 + 受众适配 + 数据伦理

### Layer 5: 输出格式（~500t）
JSON Schema + 图表规格结构

---

## 7. 验收标准

| 功能 | 验收条件 |
|------|---------|
| CSV 上传 | 上传文件 → 预览表格 + 列统计 |
| Excel 上传 | 上传 .xlsx → 同上 |
| API 连接 | 输入 key → 测试成功 → 状态点变绿 |
| 引导对话 | 回答 3-4 问题 → AI 返回图表推荐 |
| 图表渲染 | 5-7 张图表正确显示，类型不重复 |
| 图表微调 | 输入指令 → 图表更新 |
| 三幕叙事 | 每幕有图文，结构完整 |
| 报告导出 | 下载 HTML → 浏览器打开图表正常 |
| 评分 | 给出 0-100 分 + 维度拆解 |
| 通关动画 | 导出成功后播放 |
| 大数据集 | 1000+ 行正常处理 |
| 网络错误 | API 超时有重试 + 友好提示 |

---

## 8. 开发执行顺序

1. 搭建 Vite + React + TS + Tailwind 项目
2. 安装 shadcn/ui 基础组件 + 配置主题
3. 数据上传 + 解析（Papa Parse + SheetJS）
4. 数据预览表格 + 列统计 UI
5. Claude API 集成（服务层 + useClaude hook）
6. AI 对话 UI + 状态机
7. System Prompt 构建 + JSON 解析
8. 图表工厂（ECharts spec → option 翻译）
9. 首张图表渲染
10. 多图表网格 + 三幕叙事 UI
11. 图表微调功能
12. 报告导出
13. 评分系统
14. 进度条 + 过渡动画（Framer Motion）
15. 通关粒子动画
16. 错误处理 + 边界情况
17. 端到端测试
