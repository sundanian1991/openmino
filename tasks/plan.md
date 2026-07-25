# Implementation Plan: 课程内容 + 交互质量升级

## Overview
三个工作流并行，覆盖人机协同实战课的核心内容缺陷和交互质量短板：

1. **A) Step 04 重写** — 从旧版"高频任务小工具化"替换为"沉淀你的判断标准"
2. **B) 角色 3A 数据展开** — 从薄骨架变为可参考的真实场景库
3. **C) 交互组件升级** — 重点改造 4 个低分页（Step 01/02/05/08），提升可落地性和视觉

---

## Workstream A: Step 04 重写（高频任务小工具化 → 沉淀你的判断标准）

**现状**：step-04.html 内容是旧版"场景模板切换"（6 种模板的 Tab 切换器），完全对不上课程路径里标的"沉淀你的判断标准"。

**目标**：替换为一个完整的"判断标准实战课"，包含：
- 为什么你的判断比模板值钱（概念导入）
- 好的判断标准长什么样（展示示例）
- 交互：用户写自己的第一个判断标准（判断标准构建器）
- 连接 Step 09（判断档案 Wizard）作为后续

### Tasks

**A1. 重写页面标题、路径、描述**
- 标题：`Step 04 · 沉淀你的判断标准`
- 路径：`实战 > Step 04 · 范式一 Copilot`
- 描述：你的判断比模板值钱，让 AI 学你的标准
- 学习目标更新

**A2. 第一章：为什么需要判断标准**
- 概念：判断标准 vs 模板的区别
- 三个场景：评审供应商 / 判断内容是否可用 / 决定什么任务给 AI
- 好 vs 差的判断标准对比（卡片/标签切换，复刻 step-03 的规则对比模式）

**A3. 交互组件：判断标准构建器**
- 场景选择（跟之前类似但换成判断场景）
- 三步引导：① 选场景 → ② 填你的判断点 → ③ 生成结构化判断标准
- 保存到 localStorage
- 复制 + 保存按钮

**A4. 底部留连接**
- 完成按钮链接到 index.html
- 提示后续可到 Step 09 完善判断档案

**Files touched:**
- `course/step-04.html` — 全量重写

---

## Workstream B: 角色 3A 数据展开

**现状**：step-02 的 `roleTaskData` 每个角色只有 4-5 行任务+1行文字，信息密度低，没有"可参考"的价值。

**目标**：每个岗位增加到 8-10 个具体任务场景，每个任务附带：
- 推荐模式（Auto/Aug/Agent）
- 判断依据（为什么这个模式）
- 真实工作案例描述
- 可视化展示（卡片/表格而不是纯文字列表）

### Tasks

**B1. 数据源：`output/human-ai-collaboration-guide.html` 两份核心数据**

```
1. moduleData (11 个工作模块):
   { name, count, potential, topRoles, detail, recommend }
   例: { name: '数据分析', count: 113, potential: '高潜力',
         detail: '数据提取(48)、趋势分析(30)、异常检测(12)…',
         recommend: '数据提取→Automation; 趋势分析→Augmentation; …' }

2. roleData (7 岗位):
   { '产品运营岗': { count: 400, dept: '多个部门',
       modules: [{ l1:'数据分析', l2:'数据提取·趋势分析', potential:'高', action:'Automation' }, …] } }
```

**B2. 数据整合策略**
- 直接用 `roleData` 替换现有 `roleTaskData`（保留 L1/L2/推荐模式/潜力）
- 每条任务显示：L1 类别 + L2 具体任务 + 潜力评级 + 推荐模式（带颜色标签）
- 底部加入 `moduleData` 的推荐理由作为判断依据参考

**B3. UI 展示升级**
- 从纯文字列表 → 卡片布局（复用 guide 的 `.workmap-role-module` 样式）
- 每行显示：序号 | 类别·具体任务 | 潜力标签 | 推荐模式（颜色标签）
- 去掉 dropdown，换成直接展示（或 Tab 切换，跟 guide 一致）

**Files touched:**
- `course/step-02.html` — `roleTaskData` 替换 + UI 重写

---

## Workstream C: 交互组件升级

**现状审计总结：**

| 步骤 | 当前评分 | 问题 | 改造方向 |
|------|---------|------|---------|
| 01 自测 | ⚠️ 6/10 | 勾选完就结束，无岗位联动 | 增加角色推荐 + 可视化结果 |
| 02 3A分诊 | ⚠️ 7/10 | 角色数据太薄，输出区平 | B工作流完成即可 |
| 03 写规则 | ✅ 7/10 | 基本够用 | 小优化 |
| 04 判断标准 | ❌ 2/10 | 整个内容不对 | A工作流完成即可 |
| 05 Agent对比 | ⚠️ 5/10 | 交互太浅，看完没产出 | 增加"写一个Agent指令"产出环节 |
| 06 三层框架 | ⚠️ 6/10 | 只看不练 | 增加场景匹配练习 |
| 07 案例实验室 | ✅ 7/10 | 视觉过密但内容好 | 小优化 |
| 08 项目管理 | ❌ 3/10 | 完全没有交互 | **新建交互组件：项目启动器** |
| 09 判断档案 | ✅ 7/10 | 基本够用 | 小优化 |
| 10 数字分身 | ⚠️ 6/10 | 模拟器反馈弱 | 增强视觉反馈 |
| 11 工作流 | ⚠️ 5/10 | 太简单 | 分步骤引导 |

### Tasks

**C1. Step 08 新建交互：项目启动器（最高优先级）**
- 当前 Step 08 完全没有交互组件，是最大的空白
- 新建一个"项目启动器"：
  - 表单字段：项目名称、目标、范围、风险、里程碑
  - 实时生成 PROJ.MD 格式文档
  - 保存 + 复制按钮
- 样式复用 theme.css 现有 token

**C2. Step 01 升级：自测结果联动岗位推荐**
- 自测完成后：显示你的阶段（S1-S4）
- 联动显示：你的岗位推荐路径（取 index.html 已有 tips 数据）
- 可视化结果（环形进度或阶段指示器）

**C3. Step 05 升级：增加"写一个 Agent 指令"环节**
- 现有：看完流程就结束
- 增加一个简单的文本输入 → 生成 Agent 指令框架
- 让用户不只是看，而是写

**C4. Step 10 升级：增强模拟器反馈**
- 三步递进模拟器增加视觉状态反馈
- 每步完成后显示变化摘要

**Files touched:**
- `course/step-01.html`
- `course/step-05.html`
- `course/step-08.html`
- `course/step-10.html`

---

## Dependency Graph

```
Workstream A (Step 04) ────────── 独立，无外部依赖
Workstream B (Role Data) ──────── 独立，只改 step-02 数据
Workstream C1 (Step 08 Project) ─ 独立，新建交互
Workstream C2 (Step 01 Upgrade) ─ 依赖 index.html 的 role tips 数据
Workstream C3 (Step 05 Upgrade) ─ 独立
Workstream C4 (Step 10 Upgrade) ─ 独立
```

所有工作流可**完全并行**。

---

## Phasing

### Phase 1: 核心修复（1-2 session）
- [ ] **A1-A4**: Step 04 全量重写
- [ ] **B1-B2**: 角色数据扩展

### Checkpoint 1
- [ ] Step 04 页面内容正确，可点击到达
- [ ] 角色数据展示为完整表格

### Phase 2: 交互补齐（2-3 session）
- [ ] **C1**: Step 08 项目启动器
- [ ] **C2**: Step 01 联动推荐
- [ ] **C3**: Step 05 增加产出环节
- [ ] **C4**: Step 10 增强模拟器

### Checkpoint 2
- [ ] 所有 11 步都有至少 1 个交互组件
- [ ] 自测结果联动岗位推荐路径
- [ ] Step 05 不再是"只看不写"

### Phase 3: UI 打磨（1 session）
- [ ] **B3**: 角色数据 UI 展示升级（卡片/表格）
- [ ] 各页面视觉一致性检查

### Checkpoint 3
- [ ] 全路径走通：index → 每步 → 完成回 index
- [ ] 视觉风格一致（Nothing Light Token）
- [ ] 无 HTML/CSS 缺陷

---

## Size Estimates

| Task | Size | Files |
|------|------|-------|
| A1-A4 Step 04 重写 | M | 1 |
| B1-B2 角色数据扩展 | L | 1 |
| B3 UI 展示升级 | S | 1 |
| C1 Step 08 项目启动器 | M | 1 |
| C2 Step 01 升级联动 | S | 1 |
| C3 Step 05 增加产出 | S | 1 |
| C4 Step 10 增强模拟器 | S | 1 |

---

## Risks and Mitigations

| Risk | Impact | Mitigation |
|------|--------|------------|
| 角色数据扩展时编造不真实场景 | Medium | 基于现有 guide HTML 已有字段扩展，保持岗位真实任务描述 |
| Step 04 重写后与 Step 09 功能重叠 | Medium | Step 04 定位为"概念导入+第一个标准"，Step 09 定位为"完整档案管理"，明确区分 |
| 交互组件过多让页面变重 | Low | 每页控制 1-2 个交互，保持轻量 |
| 浏览器兼容 | Low | 只用基础 CSS Grid + Flexbox，无框架依赖 |

---

## Open Questions

1. 角色 3A 数据的"判断依据"需要你提供方向性确认，还是我基于岗位常识扩展？
2. Step 04 与 Step 09 的边界是否需要进一步对齐？
