# Learnings

> 记录：纠正、洞察、知识缺口、最佳实践

**Categories**: correction | insight | knowledge_gap | best_practice

---

## 历史数据导入（2026-03-06 至 2026-04-05）

> 来源：memory/daily/ 最近30天日志提取

---

## [LRN-20260330-001] correction

**Logged**: 2026-03-30T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: analysis

### Summary
问题范围理解错误：定价问题 vs 激励问题

### Details
**错误理解**：刘乾坤攻击的是供应商定价机制
**正确理解**：刘乾坤攻击的是开门红激励方案和三月激励方案（具体时间节点）
**年老师纠正**："这次不是定价的问题，而是开门红激励和三月激励"

### Suggested Action
分析问题前先确认问题范围，不要基于假设做判断

### Metadata
- Source: user_feedback
- Tags: 问题界定, 分析框架
- Date: 2026-03-30

---

## [LRN-20260330-002] correction

**Logged**: 2026-03-30T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: analysis

### Summary
数据含义理解错误：达成率 vs 影响评估

### Details
**错误理解**：60-70%是当前冲刺可以达成的目标
**正确理解**：60-70%是"如果拿到影响较小"的意思，表示即使拿到这个业绩对业务影响也很小
**年老师纠正**："现在即使冲刺，也只能拿到三十多%"

### Suggested Action
数据要确认是"当前状态"还是"假设场景"，不能混淆

### Metadata
- Source: user_feedback
- Tags: 数据理解, 风险评估
- Date: 2026-03-30

---

## [LRN-20260330-003] correction

**Logged**: 2026-03-30T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: methodology

### Summary
方法论层级错误：两层 vs 统一

### Details
**错误理解**：速查表和底层原理是两个独立的方法论路径
**正确理解**：速查表是底层原理的"预计算结果"，不是独立的经验路径
**年老师纠正**："如果快速参考表也满足四步推导的，就好了"

### Suggested Action
方法论要统一，速查表/模板都是底层原理的预计算，不是独立路径

### Metadata
- Source: user_feedback
- Tags: 方法论, 可视化
- Date: 2026-03-30
- See Also: LRN-20260330-005

---

## [LRN-20260327-001] correction

**Logged**: 2026-03-27T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: analysis

### Summary
人物分析标签固化风险

### Details
**错误理解**：使用"人格问题"等固化标签
**正确理解**：应该基于行为记录，而非人格定性，避免后续分析先入为主
**年老师纠正**：担心"人格问题"标签导致后续分析先入为主，调整为"争议事件记录"

### Suggested Action
人物观察用行为描述，不用人格定性标签

### Metadata
- Source: user_feedback
- Tags: 人物观察, 档案方法
- Date: 2026-03-27

---

## [LRN-20260328-001] correction

**Logged**: 2026-03-28T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: analysis

### Summary
AI提效方案过于泛化

### Details
**错误理解**：方案没有结合供应商管理的特殊性
**正确理解**：需要结合供应商管理的具体工作场景和业务特点
**年老师纠正**：对供应商管理岗AI提效方案进行了11项逐项修正

### Suggested Action
AI提效方案要结合具体岗位的工作场景，不能泛化

### Metadata
- Source: user_feedback
- Tags: AI提效, 供应商管理
- Date: 2026-03-28

---

## [LRN-20260328-002] correction

**Logged**: 2026-03-28T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: knowledge

### Summary
组织关系理解错误

### Details
**错误理解**：王易人是间接上下级
**正确理解**：王易人是年老师的直接老板
**年老师纠正**："王易人是直接老板"

### Suggested Action
组织关系要确认，不能假设

### Metadata
- Source: user_feedback
- Tags: 组织结构, 汇报关系
- Date: 2026-03-28

---

## [LRN-20260330-004] correction

**Logged**: 2026-03-30T00:00:00+08:00
**Priority**: low
**Status**: pending
**Area**: design

### Summary
SVG图标审美偏好

### Details
**错误理解**：使用emoji图标
**正确理解**：SVG必须用"手工感"而非"机械感"，Q贝塞尔曲线优于直线/矩形
**年老师反馈**：emoji"太丑了"

### Suggested Action
图标用SVG，Q贝塞尔曲线有机感，禁几何直线，禁止emoji

### Metadata
- Source: user_feedback
- Tags: 设计, SVG, 审美偏好
- Date: 2026-03-28

---

## [LRN-20260322-001] best_practice

**Logged**: 2026-03-22T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: debugging

### Summary
代码调试三步法：修补2次→立刻停止反思

### Details
**问题**：连续3次修补失败，陷入修补循环
**教训**：架构问题不能靠修补解决，必须重构
**铁律**：
1. 理解执行时序
2. 追到根
3. 修补2次 → 立刻停止

### Suggested Action
修补失败2次后，问自己："是不是我对问题的理解就错了？"

### Metadata
- Source: error
- Tags: 代码调试, 方法论
- Pattern-Key: debugging.stop_after_two_attempts
- Recurrence-Count: 1
- Date: 2026-03-22

---

## [LRN-20260328-003] best_practice

**Logged**: 2026-03-28T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: workflow

### Summary
供应商管理AI提效：量化提效43%

### Details
**发现**：基于三大核心文档分析，覆盖4类工作（日常8项、周期性6项、战略性4项、支撑性3项）
**效果**：月度提效空间~83.5小时，提效比例43%
**验证**：年老师逐项修正11个关键点，确保方案符合实际业务需求

### Suggested Action
AI提效方案要量化、表格化、可汇报

### Metadata
- Source: user_feedback
- Tags: AI提效, 供应商管理, 量化分析
- Date: 2026-03-28

---

## [LRN-20260329-001] best_practice

**Logged**: 2026-03-29T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: workflow

### Summary
意图捕获工作流：Enter键监听+OCR+AI分析

### Details
**发现**：完整流程（Enter键监听→OCR→基础分析→深度分析→AI增强理解）
**验证**：年老师强调"简单词频统计不够，AI必须参与理解工作内容"
**实测**：首日68次Enter，6小时活跃，AI识别准确

### Suggested Action
工作流分析要AI参与理解，不能只靠词频统计

### Metadata
- Source: user_feedback
- Tags: 工作流分析, 时间管理
- Date: 2026-03-29

---

## [LRN-20260330-005] best_practice

**Logged**: 2026-03-30T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: design

### Summary
可视化形式选择方法论统一

### Details
**发现**：两步决策（级别+形式），前注意特征编码+格式塔原理，预计算速查表
**验证**：年老师提出"速查表是底层原理的预计算结果"的核心观点
**价值**：统一了所有技能的判断标准，从经验层面提升到理论高度

### Suggested Action
方法论要统一：速查表/模板都是底层原理的预计算

### Metadata
- Source: user_feedback
- Tags: 可视化, 方法论, 设计
- Date: 2026-03-30
- See Also: LRN-20260330-003

---

## [LRN-20260324-001] best_practice

**Logged**: 2026-03-24T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: design

### Summary
手绘SVG设计风格：线条+陶土色点缀

### Details
**发现**："线条+陶土色点缀"的独特风格，SVG要有"手工感"
**验证**：年老师对第一批质量更满意，经多次迭代固化
**原则**：禁止emoji，Q贝塞尔曲线优于直线/矩形，技术是骨架设计哲学是血肉

### Suggested Action
SVG图标用手绘风格，Q贝塞尔曲线，陶土色点缀

### Metadata
- Source: user_feedback
- Tags: 设计, SVG, 风格
- Date: 2026-03-24
- Recurrence-Count: 3

---

## [LRN-20260322-002] best_practice

**Logged**: 2026-03-22T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: supplier

### Summary
供应商管理核心洞察：培养悖论+组织绑架

### Details
**发现**：
- 京东供应商培养悖论：培养→做大→外部扩张→有退路→议价/流失
- 组织结构绑架：定价权在策略组，流失风险由年老师承担
- 新人流失率结构性原因：结算低→培训投入不足→新人体验差→流失高

### Suggested Action
供应商管理要考虑结构性矛盾，不是单点问题

### Metadata
- Source: user_feedback
- Tags: 供应商管理, 组织结构, 战略
- Date: 2026-03-22

---

## [LRN-20260324-002] best_practice

**Logged**: 2026-03-24T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: communication

### Summary
工作表达润色框架：结果→根因→下一步→时间线

### Details
**发现**：四层表达层级模型，统一采用"结果→根因/问题→下一步→时间线"结构
**验证**：年老师周会发言采用此框架，适配军哥穿透式管理风格
**价值**：解决了工作汇报中的表达痛点

### Suggested Action
向上汇报用"结果→根因→下一步→时间线"结构

### Metadata
- Source: user_feedback
- Tags: 汇报, 表达, 沟通
- Date: 2026-03-24

---

## [LRN-20260330-006] best_practice

**Logged**: 2026-03-30T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: workflow

### Summary
权责不对等保护策略工具包

### Details
**发现**：边界清单（8类工作流）+ 留痕模板（7套话术）+ 决策速查表
**验证**：年老师主动要求基于研究文档创建具体的保护策略
**价值**：解决了年老师面临的权责不对等困境

### Suggested Action
权责不对等场景要建立边界清单和留痕模板

### Metadata
- Source: user_feedback
- Tags: 权责不对等, 保护策略, 风险管理
- Date: 2026-03-30

---

*导入完成：2026-04-05*
*来源：memory/daily/ 2026-03-06 至 2026-04-05*

---

## 历史数据导入（2026-01-15 至 2026-03-20）

> 来源：~/.claude/transcripts/ 74 个对话文件回溯提炼

---

## [LRN-20260204-001] correction

**Logged**: 2026-02-04T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: interaction

### Summary
交互透明度问题：复杂任务必须有过程信息

### Details
**年老师反馈**："交互过程中没有任何过程信息同步，只有一个正在考虑下一步，体感太差"
**错误理解**：复杂任务只给最终结果就行
**正确理解**：复杂任务必须输出过程透明信息，让年老师知道我在做什么

### Suggested Action
复杂任务（≥7步/架构修改）必须使用透明工作流：意图分类→委派声明→任务拆分→过程透明→验证总结

### Metadata
- Source: user_feedback
- Tags: 交互透明度, 复杂任务
- Date: 2026-02-04
- See Also: 00-IDENTITY.md 五步工作流

---

## [LRN-20260125-001] correction

**Logged**: 2026-01-25T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: communication

### Summary
语言偏好：强制中文回复

### Details
**年老师明确要求**："所有的回复我都需要你回复中文，不管我输入是不是中文"
**错误理解**：年老师输入英文时，我可以用英文回复
**正确理解**：无论年老师输入什么语言，我都用中文回复

### Suggested Action
回复语言：中文对话，英文代码（仅代码部分用英文）

### Metadata
- Source: user_feedback
- Tags: 语言偏好, 沟通
- Date: 2026-01-25

---

## [LRN-20260125-002] correction

**Logged**: 2026-01-25T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: communication

### Summary
表达简洁性：说问题就好了

### Details
**年老师反馈**："修改下语气，简洁些。说问题就好了"
**错误理解**：回复需要礼貌用语、客套话
**正确理解**：回复要直奔主题，禁止AI味表达（"让我们"、"值得注意的是"）

### Suggested Action
回复风格：简洁、直接、有信息密度，禁止客套话和过渡句

### Metadata
- Source: user_feedback
- Tags: 表达风格, 简洁
- Date: 2026-01-25

---

## [LRN-20260115-001] best_practice

**Logged**: 2026-01-15T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: debugging

### Summary
技术问题处理：直接定位根因

### Details
**发现**：PDF解析问题反复排查时，年老师多次问"你看下是什么问题"、"哪里有问题"
**验证**：年老师期望直接定位根因，而不是绕圈子或猜测
**价值**：技术问题要先诊断再给出结论，不要基于假设

### Suggested Action
技术问题处理：
1. 先收集信息（错误信息、环境、上下文）
2. 分析根因（不是猜测）
3. 给出明确结论

### Metadata
- Source: user_feedback
- Tags: 技术问题, 调试, 根因分析
- Recurrence-Count: 3
- Date: 2026-01-15

---

## [LRN-20260116-001] best_practice

**Logged**: 2026-01-16T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: frontend

### Summary
前端优先于PPTX：精准分析+可交互

### Details
**发现**：年老师决定去掉PPTX功能改用前端
**验证**：年老师更重视"精准分析"和"可交互"，而非静态演示
**价值**：前端输出比PPTX更灵活、可验证、可迭代

### Suggested Action
优先选择前端方案：
- 可交互验证
- 可迭代修改
- 数据驱动展示

### Metadata
- Source: user_feedback
- Tags: 前端, PPTX, 方案选择
- Date: 2026-01-16

---

*transcripts 导入完成：2026-04-05*
*来源：~/.claude/transcripts/ 74个文件（2026-01-15至2026-03-20）*
