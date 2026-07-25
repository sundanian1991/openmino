# ROADMAP.md

> 人机协同实战课 · 开发路线图

---

## 开发原则

1. **先基建后页面** — M0 先完成开发规范、主题、工具函数，后续所有页面共用
2. **先范式一后范式二三** — Copilot 四步（M2）是基础，先做好验证，再推进后续
3. **每个里程碑有明确 DOD** — 验收不靠"感觉做完了"，靠 checklist 逐条过
4. **案例实验室独立里程碑** — 交互最重，单独排期
5. **不变内容先写好** — 一次定义，多处复用
6. **里程碑编号不严格对应范式** — M3/M5 都含范式二内容，M4 为案例实验室（最重交互）单独切出，不按范式划分

---

## Active Milestone
M1: 基础架构 + 路径页 — 已激活，进入构建

---

## Milestones

### M0: 需求对齐
- Status: complete
- Covers: 全部 REQ

#### Definition of Done
- [ ] 用户确认课程名、14 节点顺序、7 交互组件
- [ ] 用户确认角色差异化路径方案
- [ ] 用户确认开发规范和外部库策略
- [ ] 用户确认可以进入 M1 基建阶段

---

### M1: 基础架构开发
- Status: pending
- Covers: REQ-01, REQ-02, REQ-03, REQ-04, REQ-05

#### Definition of Done
- [ ] `assets/theme.css` 完成：所有 CSS 变量、Nav、进度条、信息框、按钮、侧边栏样式
- [ ] 工具 JS 完成：Progress 存储、Output 存储、copyToClipboard、滚动进度条、侧边栏高亮
- [ ] 在 `test-page.html` 中验证所有样式和工具函数正常工作
- [ ] `index.html` 路径页：14 节点全貌 + 三范式分区 + 节点状态管理 + 进度摘要
- [ ] localStorage 进度读写验证通过（刷新不丢失）
- [ ] 7 岗位入口区块完成（数据来源：ROLE_PATHS.md）

#### DOD Checklist
```
□ theme.css 所有变量定义完整
□ 3 种页面类型模板可运行
□ 工具函数单元测试通过
□ 路径页 14 节点渲染正确
□ 节点状态切换（未解锁→进行中→已完成）
□ 岗位入口点击后高亮推荐节点
□ 刷新页面进度不丢失
```

---

### M2a: Step 01 · 你现在的 AI 协同阶段
- Status: pending
- Covers: REQ-20, REQ-21, REQ-22, REQ-23, REQ-24, REQ-30, REQ-31, REQ-32, REQ-33

#### Definition of Done
- [ ] 课程页结构完整（头部+章节+侧边栏+底部完成按钮）
- [ ] 四阶模型概念清晰展示（S1-S4，每阶一句话）
- [ ] 真实数据案例：大多数卡在 S1 + 管理岗反超技术岗
- [ ] 交互① 成熟度自测：12 个 checkbox 分组，实时计分，判定阶段
- [ ] 结果区展示：阶段徽章 + 解释 + 下一步建议 + 推荐节点
- [ ] 产出可保存到 localStorage
- [ ] 侧边栏目录自动高亮
- [ ] "完成课程"按钮更新路径页状态

#### DOD Checklist
```
□ 课程页 4 章内容完整
□ 12 个 checkbox 可勾选、计分逻辑正确
□ S1-S4 判定结果随勾选变化
□ 结果区 4 项内容齐全
□ 侧边栏高亮跟随滚动
□ 完成按钮 → 路径页更新
□ 刷新后进度保留
```

---

### M2b: Step 02 · 3A 分诊法
- Status: pending
- Covers: REQ-40, REQ-41, REQ-42, REQ-43, REQ-44

#### Definition of Done
- [ ] 三抽屉概念展示（3×4 对比表）
- [ ] 三维度判定逻辑展示
- [ ] 交互② 3A 分诊器：任务输入框 + 3 个 range slider + 实时推荐
- [ ] 输出区：推荐模式 + 理由 + 人/AI 分工 + 验收标准 + 风险提醒
- [ ] 判定规则：可逆性≤30 高风险提醒 / 确定性≤35 提示补充标准
- [ ] 产出 Markdown 可复制

#### DOD Checklist
```
□ 三抽屉 3×4 对比表内容完整
□ 3 个 slider(0-100) 联动计算正常
□ 实时推荐随 slider 变化更新
□ 输出区 5 项内容齐全（模式/理由/分工/验收/风险）
□ 草稿刷新后保留
□ 产出 Markdown 一键复制可用
```

---

### M2c: Step 03 · 给 AI 写规则
- Status: pending
- Covers: REQ-50, REQ-51, REQ-52, REQ-53

#### Definition of Done
- [ ] AGENTS.md 概念 + 5 条黄金法则
- [ ] 交互③ 操作手册生成器：8 个字段表单
- [ ] 实时 Markdown 预览
- [ ] 约束：至少 3 条 Never
- [ ] 产出可复制、可保存

#### DOD Checklist
```
□ AGENTS.md 概念 + 5 条黄金法则展示完整
□ 8 个字段表单可填写
□ Markdown 实时预览正确
□ "至少 3 条 Never"约束校验生效
□ 草稿刷新后保留
□ 产出可复制、可保存
```

---

### M2d: Step 04 · 高频任务小工具化
- Status: pending
- Covers: REQ-60, REQ-61, REQ-62, REQ-63

#### Definition of Done
- [ ] 6 个预设场景标签
- [ ] 交互④ 场景模板切换：点标签 → 模板预览
- [ ] 填写区：填内容 → 出结果
- [ ] 产出可保存

#### DOD Checklist
```
□ 6 个预设场景标签可切换
□ 点标签后模板正确预览
□ 填写区填写 → 结果生成正常
□ 学员自己的 3 个模板可保存
□ 草稿刷新后保留
```

---

### M3a: Step 05 · 让 AI 做多步任务
- Status: pending
- Covers: REQ-70, REQ-71, REQ-72, REQ-73

#### Definition of Done
- [ ] Agent 闭环图解（Plan→Tool→Observe→Revise）
- [ ] 验收底线 checklist（4 条）
- [ ] Copilot vs Agent vs 传统自动化 对比表

#### DOD Checklist
```
□ Plan→Tool→Observe→Revise 闭环图解清晰
□ 4 条验收底线完整展示
□ 三方对比表内容准确
```

---

### M3b: Step 06 · 三层协同框架
- Status: pending
- Covers: REQ-80, REQ-81, REQ-82

#### Definition of Done
- [ ] L1/L2/L3 三层概念清晰展示
- [ ] 交互⑤ 三层协同沙盘：下拉选场景 → 三层卡片展开
- [ ] 每层显示：人做什么 + AI做什么 + 验收方式
- [ ] 底部显示"最佳协同模式"建议

#### DOD Checklist
```
□ L1/L2/L3 概念阐述清晰
□ 下拉选场景正常切换
□ 三层卡片展开/折叠正常
□ 每层 3 项（人/AI/验收）齐全
□ 最佳协同模式建议展示
```

---

### M4: 案例实验室 · Vibe OS 三层协同拆解
- Status: pending
- Covers: REQ-90, REQ-91, REQ-92, REQ-170, REQ-171, REQ-172, REQ-173

#### Definition of Done
- [ ] SVG 三层架构图（起点→L1×6→L2×3→L3×2→终点）
- [ ] 所有节点可点击，点击后高亮
- [ ] 右侧故事面板：节点标题 → 真实故事 → 产物 → 可复制做法
- [ ] 至少 13 个节点 stories 数据
- [ ] 每个节点配"复制模板"按钮
- [ ] 底部"我的三层映射"填写区，可保存
- [ ] 案例数据迁移自 vibe-demo/learn.html

#### DOD Checklist
```
□ SVG 架构图渲染正确（13 节点）
□ 所有节点可点击 + 点击高亮
□ 右侧故事面板 4 段内容齐全（标题/故事/产物/做法）
□ ≥13 个节点 stories 数据
□ 每节点复制按钮可用
□ "我的三层映射"填写区可保存
□ learn.html 数据完整迁移
```

---

### M5a: Step 08 · AI 项目管理法
- Status: pending
- Covers: REQ-100, REQ-101, REQ-102, REQ-103

#### Definition of Done
- [ ] PMP 五阶段完整展示
- [ ] 三大锚点展示
- [ ] PROJ.md + PLAN.md 模板引导填写

#### DOD Checklist
```
□ PMP 五阶段完整展示
□ 三大锚点（目标/证据/状态）展示
□ PROJ.md 模板可引导填写
□ PLAN.md 模板可引导填写
□ 草稿可保存
```

---

### M5b: Step 09 · 沉淀你的判断标准
- Status: pending
- Covers: REQ-110, REQ-111, REQ-112

#### Definition of Done
- [ ] 交互⑥ 判断档案 3 步提取器
- [ ] Step 1/2/3 分步推进，进度指示
- [ ] 每步填写后自动保存
- [ ] 产出完整判断档案 Markdown

#### DOD Checklist
```
□ Step 1/2/3 分步推进正常
□ 进度指示（Step N/M）显示正确
□ 每步填写后自动保存
□ 3 条判断档案均可生成
□ 完整档案 Markdown 可复制
```

---

### M6a: Step 10-11 · 数字分身 + 工作流设计
- Status: pending
- Covers: REQ-120, REQ-121, REQ-122, REQ-130, REQ-131

#### Definition of Done
- [ ] 数字分身概念 + 三层递进案例
- [ ] 工作流设计表单：岗位/高频任务/耗时/频率/可逆性/标准
- [ ] 系统自动产出：分诊+分工表+操作手册+checklist+判断档案+prompt

#### DOD Checklist
```
□ 数字分身概念清晰
□ 三层递进案例展示完整
□ 工作流表单 6 字段可填写
□ 系统自动产出 6 项（分诊/分工/手册/checklist/档案/prompt）
□ 草稿可保存
```

---

### M6b: Step 12 · 测验
- Status: pending
- Covers: REQ-140, REQ-141

#### Definition of Done
- [ ] 5 道单选 + 5 道判断 + 2 道场景题
- [ ] 自动判分
- [ ] 客观题 ≥ 80% 通过

#### DOD Checklist
```
□ 12 道题（5 单选 + 5 判断 + 2 场景）渲染正确
□ 单选/判断自动判分
□ 客观题 ≥80% 判定通过
□ 场景题判分逻辑（人/AI/验收三项）
□ 通过/未通过反馈展示
```

---

### M6c: Step 13 · 交付我的协同 SOP v1
- Status: pending
- Covers: REQ-150

#### Definition of Done
- [ ] 交互⑦ SOP 生成器：读取 localStorage 中各步产出
- [ ] 10 字段 SOP 预览
- [ ] 可编辑、可复制、可下载 Markdown

#### DOD Checklist
```
□ 正确读取 localStorage 各步产出
□ 10 字段 SOP 自动聚合
□ 预览正确渲染
□ 可编辑覆盖自动聚合内容
□ 可复制 + 可下载 Markdown
```

---

### M6d: Step 14 · 模板包
- Status: pending
- Covers: REQ-160, REQ-161, REQ-162

#### Definition of Done
- [ ] 8 个模板完整列出
- [ ] 每个模板标注场景/输入/输出
- [ ] 单模板复制 + 全部打包复制

#### DOD Checklist
```
□ 8 个模板全部列出
□ 每模板场景/输入/输出标注齐全
□ 单模板复制按钮可用
□ 全部打包复制按钮可用
□ Markdown 格式正确
```

---

## Coverage Table

| REQ ID | Milestone | Type | DOD Status |
|--------|-----------|------|-----------|
| REQ-01~05 | M1 | 基建 | pending |
| REQ-10~15 | M1 | 路径页 | pending |
| REQ-20~24 | M2a | 课程通用 | pending |
| REQ-30~33 | M2a | Step 01 | pending |
| REQ-40~44 | M2b | Step 02 | pending |
| REQ-50~53 | M2c | Step 03 | pending |
| REQ-60~63 | M2d | Step 04 | pending |
| REQ-70~73 | M3a | Step 05 | pending |
| REQ-80~82 | M3b | Step 06 | pending |
| REQ-90~92, 170~173 | M4 | Step 07 案例 | pending |
| REQ-100~103 | M5a | Step 08 | pending |
| REQ-110~112 | M5b | Step 09 | pending |
| REQ-120~122 | M6a | Step 10 | pending |
| REQ-130~131 | M6a | Step 11 | pending |
| REQ-140~141 | M6b | Step 12 | pending |
| REQ-150 | M6c | Step 13 | pending |
| REQ-160~162 | M6d | Step 14 | pending |
