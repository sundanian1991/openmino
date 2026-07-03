# haglofs-paradigm 技能路线图

> 从"品牌页施工技能"升级为"editorial 高级感内容施工技能"。
> 整合 v1.0→v1.9 全部验证教训 + 外部组件审计洞察 + 定位扩展方向。
> 更新：2026-07-03 · 当前版本 v1.9 · 目标版本 v2.0

---

## 核心转变（v2.0 主线）

**v1.x 定位**：品牌页施工（6 类页面预设：宣言/展示/数据简报/文档/技术/知识）
**v2.0 定位**：任何需要"品牌感+高级感"的 editorial 内容施工

Haglöfs 范式的核心价值不是"户外品牌叙事"，而是**editorial 高级感的施工工艺**——哑光克制 + 字体角色分工 + 100vh 仪式 + 测绘基准线。这套工艺可以应用到任何需要高级感的内容上，不只是品牌页。

### v2.0 三大主线

```
主线 1：内容类型扩展（品牌页 → 长文/报告/简报/作品集/发布说明...）
主线 2：数据叙事链补全（5 个缺失组件 + 选型树）
主线 3：工艺深化（暗色冷化/深色模式规则/clamp 化/配额可判定化）
```

---

## 一、v1.9 测试遗留缺陷（已验证，待修）

> 9 用例测试（3 个 9.0 / 平均 8.69）发现的真问题，按优先级排。

### P1（v2.0 必修）

| ID | 缺陷 | 来源 | 修法 | 状态 |
|----|------|------|------|------|
| NC-9 | **暗色 .dark 配套冷化覆写缺失**（slate 只覆 charcoal/black，bg-subtle/border 仍暖灰） | T8/T9 两次复现 | slate/ink/forest 三套暗色各配完整中性色冷化覆写（bg-subtle/border-rest/text-secondary 全套） | 待修 |
| NC-10 | **N4/D2 深色模式专项例外**（整页深色时"无连续深段"字面违反精神满足） | T9 Volvo | 新增"整页深色模式"规则：body.dark 时 N4 改为"靠 elevation 阶梯切换 ≥3 次替代深浅交替" | 待修 |
| NC-11 | **深段配额升级可判定硬约束**（软指引→可数规则） | T6 Levi's | 引入"全页深色 section ≤3 + Hero 深面板计 0.5"+ 超限自动降级算法，转为 CP6 | 待修 |

### P2（v2.0 应修）

| ID | 缺陷 | 来源 | 修法 | 状态 |
|----|------|------|------|------|
| NC-1/14 | **组件骨架固定 px 未 clamp 化** | T1 D1 | 遍历 23+ 组件骨架，固定 px 改 clamp(min,vw,max) | 待修 |
| NC-12 | **--brand-accent 深底提亮版缺失** | T6 | 给 --brand-accent 加 .dark 覆写机制 | 待修 |
| NC-15 | **intake-rules 虚构素材标记** | T7 | agent 补全的素材标 [GIVEN/INFERRED/FABRICATED]，让用户区分 | 待修 |
| NC-16 | **文档页 section 计数 N1 例外** | T4 | N1 补"文档页 5-6 合规"例外注 | 待修 |
| NC-4 | **Tension Grid --light 张力补偿** | T3 | 浅底变体加"切割增强"（加重分隔线/巨字编号水印） | 待修 |
| NC-6 | **Pipeline --connected 连接线** | T5 | 加 chevron 箭头 modifier，流程页流向指示 | 待修 |
| NC-7 | **V3 Split 深段归属明文化** | T1 | 深段配额表补 Split Hero 的"半深"归类 | 待修 |

### P3（可修，打磨）

| ID | 缺陷 | 来源 | 修法 |
|----|------|------|------|
| NC-8 | C3 forest 计数与深色变体交互 | T1 | 明确底色 forest 是否计入配额 |
| NC-17 | component-preview 登记为第 5 文档组件 | T4 | rules-components-docs.md 补登记 |
| NC-18 | sidebar active 态 IntersectionObserver | T4 | 加滚动联动 JS（B7 允许"仅做交互态"）|

---

## 二、主线 1：内容类型扩展（v2.0 核心）

> 从 6 类页面预设扩展到更多"需要 editorial 高级感"的内容类型。

### 当前覆盖（v1.9）
- ✅ 品牌宣言页 / 品牌展示页 / 品牌数据简报 / 设计系统文档 / 技术内容 / 知识模板

### 待覆盖内容类型（按高频排序）

| # | 内容类型 | 典型场景 | 缺什么 | 优先级 |
|---|---------|---------|--------|--------|
| CT-1 | **长文/深度文章** | 博客/特稿/专栏/研究笔记 | Drop Cap / Pull Quote / Reading Progress / Footnote / 文章头部+尾部 meta | P1 |
| CT-2 | **报告/白皮书** | 咨询报告/行业分析/研究论文 | 封面页组件 / 目录(TOC) / 章节编号系统 / 引用规范 / 附录 | P1 |
| CT-3 | **简报/周报月报** | 工作简报/项目周报/团队月报 | KPI 卡片组(增强版) / 进度条 / 时间线简报 / 本周重点 | P2 |
| CT-4 | **案例/作品集** | 项目案例/设计作品集/客户成功 | 案例卡 / 作品网格 / 成果指标 / 客户引言 | P2 |
| CT-5 | **产品发布/更新** | Changelog / Feature 发布 / Version 对比 | Changelog 组件 / Feature 卡 / Version 对比表 | P2 |
| CT-6 | **活动页/落地页** | 研讨会/产品发布/报名 | 时间地点卡 / CTA 组件 / 嘉宾列表 / 议程时间线 | P3 |
| CT-7 | **简历/个人品牌** | 个人主页/简历/作品集 | 人物卡 / 经历时间线 / 技能矩阵 | P3 |
| CT-8 | **对比/评测** | 产品对比/方案评测/选型 | 对比矩阵(增强版) / 评分卡 / 推荐/回避 | P3 |

### 扩展策略
- 不一次性全做——按用户实际需求驱动，遇到一类做一类
- 每类内容加一组"结构模板"（Hero→典型 section 序列→Footer）+ 1-2 个特色组件
- 在 Step 0 蓝图的"页面类型判定"扩展识别这些内容类型
- paradigm-boundary 的 5 类预设扩展为 N 类（按内容类型而非页面类型）

---

## 三、主线 2：数据叙事链补全

> 来源：外部组件审计方案的最佳洞察 + v1.9 T5 测试验证。
> R3 数据中心有完整叙事链，规则卡只覆盖链尾，链中 5 组件全缺。

### 数据叙事链完整结构

```
Compass Trend（概览 KPI 卡 · 入口）
    ↓
Elevation Profile（趋势曲线 · 走势）
    ↓
Heatmap Matrix（分布密度 · 热点）
    ↓
Seam Benchmark（目标对比 · 达成度）
    ↓
Action Grid（建议行动 · Next Steps）
    ↓
Callout（关键发现 · 已覆盖）
```

### 待补组件

| ID | 组件 | 叙事链位置 | 优先级 |
|----|------|-----------|--------|
| G1 | **Elevation Profile**（海拔曲线/趋势线/面积图） | 链第 2 | P1 |
| G2 | **Seam Benchmark**（目标对比条/达成度条） | 链第 4 | P1 |
| G3 | **Heatmap Matrix**（热力图/日历矩阵） | 链第 3 | P2 |
| G4 | **Action Grid**（行动建议/Next Steps 网格） | 链第 5 | P2 |
| G5 | **Compass Trend**（罗盘/KPI 入口卡） | 链第 1 | P2 |

### 组件选型决策树（同时做）

在 rules-components.md 顶部加「组件选型树」：
```
你的信息是什么类型？
├── 单一关键数字 → Ring / KPI Card
├── 成组指标展示 → Swatch Cards / Compass Trend
├── 时序/趋势 → Elevation Profile（新）/ Timeline
├── 对比/达成 → Seam Benchmark（新）/ Data Table / Tension Grid
├── 分布/密度 → Heatmap Matrix（新）/ Grid Matrix
├── 层级/构成 → Layer / Pipeline
├── 行动/建议 → Action Grid（新）/ Checklist / Callout
├── 收纳/折叠 → Accordion
├── 长文/声明 → Tension Prose / Statement Quote / Manifesto
└── 品牌/产品 → Product Card / Principle Cards / Heritage Timeline
```

---

## 四、主线 3：工艺深化

### 暗色体系完善

| # | 动作 | 修什么 | 优先级 |
|---|------|--------|--------|
| DC-1 | **slate/ink/forest 暗色配套冷化覆写** | rules-color.md D3-扩展：每套暗色不只覆 charcoal/black，还覆 bg-subtle/border-rest/text-secondary/cream-dark | P1 |
| DC-2 | **N4/D2 深色模式专项例外** | rules-narrative + paradigm-boundary：body.dark 时"靠 elevation 阶梯 ≥3 次切换替代深浅交替" | P1 |
| DC-3 | **--brand-accent 深底提亮** | rules-brand-color-mapping.md：给 --brand-accent 加 .dark 覆写 | P2 |
| DC-4 | **深底反相通用规则** | rules-components.md 顶部：所有组件放深段统一处理（Accordion 已有，推广至全部） | P2 |

### 叙事链模板

| # | 动作 | 修什么 | 优先级 |
|---|------|--------|--------|
| NL-1 | **数据叙事链模板** | 新建 narrative-chains.md 的数据链（Compass→Elevation→Heatmap→Seam→Action→Callout） | P2 |
| NL-2 | **品牌叙事链模板** | 补充品牌链（Hero→概念→资产→时间→价值观→Footer） | P2 |
| NL-3 | **混合叙事链模板** | 补充混合链（Hero→概念→数据段→过渡桥→品牌段→升华→Footer） | P2 |

### 工程打磨

| # | 动作 | 修什么 | 优先级 |
|---|------|--------|--------|
| EG-1 | **组件骨架全 clamp 化** | 遍历 23+ 组件，固定 px 改 clamp | P2 |
| EG-2 | **深段配额 CP6 可判定项** | checklist 加"全页深色 section ≤3 + Hero 深面板计 0.5" | P1 |
| EG-3 | **intake-rules 虚构素材标记** | Step 0 补全的素材标 [GIVEN/INFERRED/FABRICATED] | P2 |

---

## 五、后续迭代优化点（过程发现，持续积累）

> 在整合/思考过程中发现的、值得后续关注的优化方向。不一定是 v2.0，可能是 v2.1+。

### editorial 长文特有需求（CT-1 扩展）
- **Drop Cap**：首字母大写装饰（editorial 长文标志特征）
- **Pull Quote**：杂志式大字引文（区别于 Statement Quote 的居中声明）
- **Reading Progress Bar**：顶部阅读进度条（长文体验）
- **Footnote/侧注**：脚注/边注系统（深度文章必备）
- **文章头部 meta**：作者/日期/阅读时长/标签（editorial 标配）
- **文末 CTA/相关推荐**：文章尾部行动召唤+关联内容

### 报告白皮书特有需求（CT-2 扩展）
- **封面页组件**：报告封面（标题/副标题/日期/机构/编号）
- **目录(TOC)**：自动生成的章节目录+页码/锚点
- **章节编号系统**：1.1/1.2/2.1 层级编号+heading 关联
- **引用规范**：参考文献/引用格式[data-cite]
- **打印样式 @media print**：很多高级感内容需要 PDF 化，当前完全没覆盖
- **页眉页脚**：长报告的固定页眉页脚（机构名/页码/章节名）

### 通用体验增强
- **SEO/结构化数据**：article schema / heading 层级 / og 标签（editorial 内容需要被发现）
- **阅读时长估算**：基于字数自动计算（长文 meta）
- **目录锚点导航**：sticky 侧边目录+滚动联动高亮（长文/报告标配）
- **暗色模式切换**：用户手动切换深浅（当前只支持整页固定一种）

### 组件层
- **Ring 组件增强**：多环对比（3 个 Ring 叠加做目标 vs 实际 vs 行业基准）
- **Data Table 增强**：排序标记/固定表头/行 hover 高亮
- **Timeline 增强**：横向 frieze + 纵向双模式切换

---

## 六、v2.0 执行计划

### 第一批（P1 · 数据链 + 暗色 + 配额）
1. NC-9 暗色 .dark 配套冷化覆写（slate/ink/forest 三套完整中性色）
2. NC-10 N4 深色模式专项例外
3. NC-11 深段配额 CP6 可判定化
4. G1 Elevation Profile + G2 Seam Benchmark（数据叙事链 P1 两组件）
5. 组件选型决策树

### 第二批（P1 · 内容类型扩展启动）
6. CT-1 长文/深度文章（Drop Cap / Pull Quote / Reading Progress / 文章 meta）—— 最高频新内容类型
7. CT-2 报告/白皮书（封面/TOC/章节编号/引用/打印样式）—— 第二高频

### 第三批（P2 · 工艺打磨）
8. NC-1/14 组件骨架 clamp 化
9. NC-15 虚构素材标记
10. G3/G4/G5 数据叙事链剩余 3 组件
11. NL-1/2/3 叙事链模板
12. DC-3/DC-4 深底反相统一 + brand-accent 提亮

---

## 七、版本里程碑对照

| 版本 | 核心能力 | 验证覆盖 | 质感区间 |
|------|---------|---------|---------|
| v1.0 | 基础工艺 | Fjällräven 宣言 | 7.5 |
| v1.3 | 混合页合法身份 | + Arc'teryx 混合 | 8.0 |
| v1.4 | 系统展示组件+sidebar | + Mino 文档 | 8.5 |
| v1.5 | Step 0 采集蓝图 | + 蓝图机制 | — |
| v1.6 | Code Block+技术调性 | + Loop Engineering | 8.0 |
| v1.7 | 暗色选项+Hero 选型重构 | — | — |
| v1.8 | Evolution Log+Anti-Pattern+代际债清零 | — | — |
| v1.9 | forest-soft+品牌色映射+Data Table移动端 | 9 用例全矩阵 | **8.69 均/3 个 9.0** |
| **v2.0（计划）** | **数据叙事链+内容类型扩展+暗色完善** | **+ 长文/报告测试** | **目标：均≥8.5** |
| v2.5（愿景） | 内容类型全覆盖+打印+SEO | 全内容矩阵 | 目标：稳定≥9.0 |

---

## 八、不做什么（边界守护）

> 技能定位是"editorial 高级感内容"，不是"什么都做"。

- ❌ **不做 SaaS 应用 UI 组件**（Tab/Toggle/Alert/Toast/Modal）—— 那是 nian-design 或 nothing-design 的范畴。haglofs 做 editorial 内容，不做应用界面
- ❌ **不做交互式 dashboard**（实时数据/筛选/拖拽）—— 那是数据应用，不是 editorial
- ❌ **不做电商页面**（购物车/商品详情/支付流程）—— 不是 editorial 内容
- ❌ **不做纯代码仓库 README**（代码高亮为主）—— 用专门的技术文档技能
- ❌ **不引入 CSS 框架**（Tailwind/Bootstrap）—— 纯手写 CSS 是范式铁律

---

*路线图维护规则：每轮验证后更新，新发现的缺陷追加到对应节，已修复的标记 ✅。外部方案洞察已整合（数据叙事链+选型树采纳，通用交互组件不采纳）。*
