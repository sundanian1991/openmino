# Feature Requests

> 记录：用户要求的能力

---

## 历史数据导入（2026-02-01 至 2026-04-05）

> 来源：~/.myagents/sessions/ 686 个对话文件回溯提炼
> 详细报告：workspace/inbox/learning-records-v2-20260405.md

---

## [FEAT-20260405-001] self-improving-agent 使用方案

**Logged**: 2026-04-05T21:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: agent

### Requested Capability
想要系统化的自我改进机制，但目前技能和思路比较散乱

### User Context
之前安排过主动提醒让大家自我提升，但不够系统化。希望详细查看现有技能，分析如何更好地使用

### Complexity Estimate
complex

### Suggested Implementation
1. 全装 self-improving-agent（原版，不修改）
2. 按原版配置使用
3. 整合现有技能到统一框架

### Metadata
- Frequency: recurring
- Related Features: self-improvement, skills-integration
- Date: 2026-04-05

---

## [FEAT-20260404-001] 手绘SVG达到东京猫水平

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: design

### Requested Capability
手绘 SVG 质量要达到东京猫的水平，非常精细

### User Context
东京猫和李诞眼瞎（手绘 SVG）的首页虾非常满意，希望采用那种艺术风格：手绘并且可以上色

### Complexity Estimate
complex

### Suggested Implementation
1. 研究东京猫 SVG 的技术特点
2. 提取风格参数（线条、颜色、阴影）
3. 建立风格模板

### Metadata
- Frequency: first_time
- Related Features: hand-drawn-svg
- Date: 2026-04-04

---

## [FEAT-20260404-002] 可视化示意图生成

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: design

### Requested Capability
生成可视化示意图，先看效果再决定如何使用

### User Context
需要先看示意图质量，达到标准后再讨论如何将内容可视化和结构可视化

### Complexity Estimate
medium

### Suggested Implementation
1. 先画几个示意图示例
2. 验证质量是否达标
3. 再确定应用方式

### Metadata
- Frequency: first_time
- Date: 2026-04-04

---

## [FEAT-20260404-003] 供应商集中度预警系统

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: supplier

### Requested Capability
供应商集中度预警：总人力占比 >30% 或 ≤2 家供应商时预警

### User Context
当前 V5 版本缺少这个核心指标，需要补充：供应商在该项目中的总人力占比、地理集中度（站点数占比）

### Complexity Estimate
medium

### Suggested Implementation
1. 计算供应商人力占比
2. 设置阈值（>30%, ≤2家）
3. 视觉预警（红色标记）

### Metadata
- Frequency: recurring
- Related Features: 供应商看板
- Date: 2026-04-04

---

## [FEAT-20260404-004] SVG复杂度判断机制

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: design

### Requested Capability
自动判断哪些是简单图形（自己画），哪些是复杂图形（用 API）

### User Context
API 额度有限（每周 20 次），需要合理分配

### Complexity Estimate
medium

### Suggested Implementation
建立复杂度判断规则：
- 简单：基础几何、单色、无细节
- 复杂：有机形状、多色、有细节

### Metadata
- Frequency: recurring
- Related Features: hand-drawn-svg, API-usage
- Date: 2026-04-04

---

## [FEAT-20260404-005] API反向学习优化方案

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: design

### Requested Capability
用有限的 API 额度（每周 20 次）优化手绘 SVG 技能

### User Context
方案 B：使用客服 API（需确认配置），每周用 2 次，共 20 次机会通过 API 反向学习

### Complexity Estimate
complex

### Suggested Implementation
1. 确认客服 API 配置
2. 设计学习计划：每周 2 次 × 10 周
3. 每次学习后固化到技能

### Metadata
- Frequency: recurring
- Related Features: hand-drawn-svg, API-usage
- Date: 2026-04-04

---

## [FEAT-20260404-006] 多技能协同思考

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: agent

### Requested Capability
多个技能协同工作，共同解决复杂问题

### User Context
arming-thought、lenny-advisor、canvas-design 几个技能一起思考问题

### Complexity Estimate
complex

### Suggested Implementation
设计多技能协同机制：
1. 主技能分解问题
2. 子技能各司其职
3. 结果聚合

### Metadata
- Frequency: first_time
- Related Features: skills-orchestration
- Date: 2026-04-04

---

## [FEAT-20260403-001] 供应商看板数据完整性检查

**Logged**: 2026-04-03T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: supplier

### Requested Capability
彻底检查看板数据，确保筛选后完整性

### User Context
选全部时有数据，筛选站点/供应商/业务后数据不完整

### Complexity Estimate
medium

### Suggested Implementation
1. 检查数据绑定逻辑
2. 验证筛选条件
3. 修复数据丢失问题

### Metadata
- Frequency: recurring
- Related Features: 供应商看板
- Date: 2026-04-03

---

## [FEAT-20260402-001] 文件重命名和归档

**Logged**: 2026-04-02T00:00:00+08:00
**Priority**: low
**Status**: pending
**Area**: file-organization

### Requested Capability
自动重命名文件并放到合适位置

### User Context
某些文件需要重新命名并归档

### Complexity Estimate
simple

### Suggested Implementation
根据文件内容和命名规范自动重命名、移动

### Metadata
- Frequency: recurring
- Date: 2026-04-02

---

## [FEAT-20260331-001] mino-frontend吞噬ui-design-brain

**Logged**: 2026-03-31T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: skills

### Requested Capability
mino-frontend 吸收 ui-design-brain 的能力

### User Context
后续会更多使用 mino-frontend，希望它能达到"一切可视化"的高度

### Complexity Estimate
complex

### Suggested Implementation
1. 分析 ui-design-brain 的核心能力
2. 融合到 mino-frontend
3. 保持自由度最高

### Metadata
- Frequency: first_time
- Related Features: mino-frontend, skill-integration
- Date: 2026-03-31

---

## [FEAT-20260331-002] kw-workflow流程执行

**Logged**: 2026-03-31T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: workflow

### Requested Capability
按 kw-workflow 流程执行任务

### User Context
产出物接近预期，希望按这个流程跑

### Complexity Estimate
simple

### Suggested Implementation
执行 kw-workflow 定义的标准流程

### Metadata
- Frequency: recurring
- Related Features: kw-workflow
- Date: 2026-03-31

---

*MyAgents 导入完成：2026-04-05*
*来源：~/.myagents/sessions/ 686个文件（2026-02-01至2026-04-05）*
