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

---

## 历史数据导入（2026-02-01 至 2026-04-05）

> 来源：~/.myagents/sessions/ 686 个对话文件回溯提炼
> 详细报告：workspace/inbox/learning-records-v2-20260405.md

---

## [LRN-20260405-001] correction

**Logged**: 2026-04-05T21:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: agent

### Summary
self-improving-agent 使用方式：全装原版，不是分析

### Details
**错误理解**：分析技能内容，给方案
**正确理解**：全装 self-improving-agent，开箱即用、有完整模板
**年老师纠正**："不是我想要的，我还是觉得，你就从这个技能里边去看一下，能够做什么，怎么做好。全装 self-improving-agent 开箱即用、有完整模板"

### Suggested Action
技能使用：先按原样安装，不要过度分析

### Metadata
- Source: user_feedback
- Tags: 技能, self-improving-agent
- Date: 2026-04-05

---

## [LRN-20260404-001] correction

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: design

### Summary
手绘SVG目标：建立"年老师风格"，不是"学会画虾"

### Details
**错误理解**：目标是复刻李诞虾
**正确理解**：目标是建立可识别的风格系统，别人一看就知道是"这个人的风格"
**年老师纠正**："核心目标：建立可识别的风格系统，不是'学会画虾'，而是'建立年老师风格'"
**工作流程**：设计哲学 + 颜色配置 → API Prompt → 18次学习

### Suggested Action
设计系统：建立风格DNA（哲学+颜色），不是复刻特定作品

### Metadata
- Source: user_feedback
- Tags: 设计, SVG, 风格系统
- Recurrence-Count: 3
- Date: 2026-04-04

---

## [LRN-20260404-002] correction

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: design

### Summary
图标系统：每种风格应该有自己的一套图标

### Details
**错误理解**：把100个图标用12种颜色画12遍
**正确理解**：每种风格应该有自己的一套图标（100个）
**年老师纠正**："我的想法是每一个风格对应的图标是不一样的，不是让你把一百个图标用不同的颜色画十二遍"

### Suggested Action
图标设计：按风格设计独立图标集，不是一套图标多种颜色

### Metadata
- Source: user_feedback
- Tags: 设计, 图标, 风格系统
- Date: 2026-04-04

---

## [LRN-20260404-003] correction

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: design

### Summary
设计流程：先生成设计哲学和颜色，再调用API

### Details
**错误理解**：直接用API生成
**正确理解**：先生成设计哲学或设计样本，明确每种杯子是什么颜色，然后再让API生成
**年老师纠正**："正常情况下，我们先生成。我需要这个 API 生成什么样的设计哲学或设计样本，先把这个弄完"

### Suggested Action
设计流程：设计哲学 → 颜色配置 → API生成

### Metadata
- Source: user_feedback
- Tags: 设计, SVG, API, 流程
- Date: 2026-04-04

---

## [LRN-20260402-001] correction

**Logged**: 2026-04-02T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: knowledge

### Summary
组织理解：结算部门 vs 坤哥部门

### Details
**错误理解**：坤哥部门
**正确理解**：结算的部门（不是坤哥部门）
**年老师纠正**："不是坤哥部门。是指结算的部门"

### Suggested Action
组织关系要准确，不要用昵称代替部门名

### Metadata
- Source: user_feedback
- Tags: 组织结构, 部门
- Date: 2026-04-02

---

## [LRN-20260329-001] correction

**Logged**: 2026-03-29T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: skills

### Summary
技能使用：脚本内容比SKILL更重要

### Details
**洞察**：技能能否落地，要看具体内容和材料是否充分
**年老师指出**："你需要仔细检查，这个技能的脚本可能比 Skill 更重要，因为最终能否使用得好，还是要看这些具体内容和材料是否充分"

### Suggested Action
评估技能时：先看脚本和材料，再看SKILL.md

### Metadata
- Source: user_feedback
- Tags: 技能, 评估
- Date: 2026-03-29

---

## [LRN-20260329-002] correction

**Logged**: 2026-03-29T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: visualization

### Summary
可视化：要彩色图表，不是文本符号

### Details
**错误理解**：文本符号模拟可视化
**正确理解**：直接有彩色图表
**年老师纠正**："不是文本的可视化，不是的。是直接有一个彩色图表，反正就是画得很好的一个可视化的图。我不要这个文本符号的可视化"

### Suggested Action
可视化：用 generative-ui-widget，禁止文本符号（→ ↓ │）

### Metadata
- Source: user_feedback
- Tags: 可视化, 图表
- Date: 2026-03-29

---

## [LRN-20260326-001] correction

**Logged**: 2026-03-26T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: supplier

### Summary
工作分类：Q2需要做 vs 制度运营缺失

### Details
**洞察**：年老师检查Q2储备，发现制度运营确实缺一些
**年老师纠正**："不是补充。是我q2需要做。你看看我之前的文件夹内容，看我还有哪些没有做好的。我的储备是做的。制度运营这个缺一些是真的。"

### Suggested Action
工作规划：定期检查储备状态，确认哪些是真正缺失的

### Metadata
- Source: user_feedback
- Tags: 工作规划, 储备
- Date: 2026-03-26

---

## [LRN-20260325-001] correction

**Logged**: 2026-03-25T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: communication

### Summary
刘乾坤沟通风格："有话没好好说，爱用反着说的话"

### Details
**洞察**：年老师最讨厌刘乾坤的是：有话没好好说，爱用反着说的话
**原因**："在我做管理，又不参与具体业务的落地执行，在我的带领下做大做强。这句话从他嘴里说出来，总感觉有点怪。"

### Suggested Action
人物观察：识别"阴阳怪气"的沟通模式

### Metadata
- Source: user_feedback
- Tags: 人物观察, 刘乾坤, 沟通风格
- Date: 2026-03-25

---

## [LRN-20260324-001] correction

**Logged**: 2026-03-24T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: design

### Summary
设计判断：不是"三选一"，是多维空间定位

### Details
**错误理解**：三选一（从三个方案中选一个）
**正确理解**：在多维空间里定位（温度、密度、权威感、时间感等）
**年老师纠正**："不是'三选一'，是在多维空间里定位：温度：偏冷（6/10）、密度：中等（5/10）..."

### Suggested Action
审美判断：多维度综合评估，不是简单二选一/三选一

### Metadata
- Source: user_feedback
- Tags: 设计, 审美判断, 多维空间
- Date: 2026-03-24

---

## [LRN-20260323-001] correction

**Logged**: 2026-03-23T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: design

### Summary
技术方案：可以嵌入SVG的技术方案

### Details
**问题**：还是没有看到陶土色的SVG
**年老师纠正**："不是有对应的流程可以嵌入svg里吗。换一个技术方案。我还是没有看到陶土色的svg。"

### Suggested Action
技术选型：探索可以嵌入SVG的技术方案

### Metadata
- Source: user_feedback
- Tags: SVG, 技术方案
- Date: 2026-03-23

---

## [LRN-20260317-001] correction

**Logged**: 2026-03-17T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: documentation

### Summary
scales 用法：只读title部分，不是精简索引

### Details
**错误理解**：用精简索引的方式
**正确理解**：scales应该只读title部分，既能加描述也很简单
**年老师纠正**："正常情况下，这个 scales 应该只读它的那个 title 那一部分，就是既能加描述，也很简单。"

### Suggested Action
scales：只读title部分，不是精简索引

### Metadata
- Source: user_feedback
- Tags: scales, 文档
- Date: 2026-03-17

---

## [LRN-20260314-001] correction

**Logged**: 2026-03-14T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: file-organization

### Summary
文件整理：没有的就要新建，但要足够简洁

### Details
**错误理解**：没有的就要删除
**正确理解**：如果内容没有包含在文件夹里，可以新建文件夹，但一定要足够简洁
**年老师纠正**："不是没有的就要删除，而是要把这些放到合适的位置。懂我的意思？"

### Suggested Action
文件整理：新建文件夹要简洁，不过度分类

### Metadata
- Source: user_feedback
- Tags: 文件整理, 简洁
- Date: 2026-03-14

---

## [LRN-20260311-001] correction

**Logged**: 2026-03-11T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: data

### Summary
数据分析：清洗后的数据要整理成表格

### Details
**问题**：清洗后的数据感觉还不是特别清晰
**年老师纠正**："你看是不是可以把清洗后的数据整理成表格？即使是 Word 文档或 MD 文档也可以。"
**建议**：按程式划分、按层级分层、对类似信息聚合

### Suggested Action
数据清洗：最终输出表格形式（Word或MD）

### Metadata
- Source: user_feedback
- Tags: 数据分析, 表格
- Date: 2026-03-11

---

## [LRN-20260310-001] correction

**Logged**: 2026-03-10T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: skills

### Summary
技能规范：skills可以做好规范，其他智能体也可以

### Details
**洞察**：可以用skills做好规范，openclaw可以用的其他的智能体也可以
**年老师纠正**："不对，你理解的。我们可以用skills做好规范，openclaw可以用的其他的智能体也可以，你有"

### Suggested Action
技能设计：规范要考虑跨平台兼容

### Metadata
- Source: user_feedback
- Tags: 技能, 规范, openclaw
- Date: 2026-03-10

---

## [LRN-20260307-001] correction

**Logged**: 2026-03-07T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: tools

### Summary
命令识别：cc-switch 是应用，不是脚本

### Details
**错误理解**：创建脚本来切换
**正确理解**：cc-switch是一个应用
**年老师纠正**："不是，是cc-switch，有这个应用。不是单独一个脚本。你给我去掉你这个脚本吧。"

### Suggested Action
工具使用：识别是应用还是脚本

### Metadata
- Source: user_feedback
- Tags: 工具, cc-switch
- Date: 2026-03-07

---

## [LRN-20260226-001] correction

**Logged**: 2026-02-26T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: workflow

### Summary
代码工作流：先审核书面计划，再写代码

### Details
**核心原则**：永远不要让Claude直接写代码，直到审核通过一份书面计划
**价值**：避免"直接让AI写代码→运行→改bug→越改越乱"

### Suggested Action
代码工作流：计划 → 审核 → 写代码

### Metadata
- Source: user_feedback
- Tags: 工作流, 代码, 计划
- Date: 2026-02-26

---

## [LRN-20260224-001] best_practice

**Logged**: 2026-02-24T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: documentation

### Summary
scales 工作流程：自动判断风格并生成案例

### Details
**发现**：scales会先自行判断当前内容适合哪种风格，生成每种风格的简单案例，再从中选择
**价值**：自动风格匹配，不需要手动试错

### Suggested Action
scales：理解其自动判断逻辑，不是手动选择

### Metadata
- Source: user_feedback
- Tags: scales, 文档, 风格
- Date: 2026-02-24

---

## [LRN-20260222-001] best_practice

**Logged**: 2026-02-22T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: observation

### Summary
观察者机制：日维度记录，周/月度自动触发

### Details
**发现**：观察者并非月底手动触发，而是随着daily记录完成后自动触发
**价值**：自动化观察，不依赖手动

### Suggested Action
person-observer：利用自动触发机制，实时记录

### Metadata
- Source: user_feedback
- Tags: 观察, 自动化, person-observer
- Date: 2026-02-22

---

## [LRN-20260222-002] best_practice

**Logged**: 2026-02-22T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: localization

### Summary
英文内容处理：分两层处理

### Details
**第一层（术语表）**：技术术语保留英文（WAL、GitHub、commit、push、checkpoint）
**第二层（强制检查）**：每次处理英文内容后，强制检查"我还在用中文思考吗？"
**价值**：确保中文对话，仅代码和术语用英文

### Suggested Action
英文处理：术语保留英文，内容强制中文

### Metadata
- Source: user_feedback
- Tags: 英文处理, 本地化
- Date: 2026-02-22

---

*MyAgents 导入完成：2026-04-05*
*来源：~/.myagents/sessions/ 686个文件（2026-02-01至2026-04-05）*
*详细报告：workspace/inbox/learning-records-v2-20260405.md*

---

### LRN-20260415-001：Session 数据源读取方法修正

**日期**：2026-04-15
**场景**：每日书信技能读取当日对话数据源
**问题**：按 `sessions.json` 中的 `createdAt` 筛选当日会话，漏掉了跨天活跃的会话（如 04-14 创建但 04-15 全天在用的会话 d7379144）
**正确做法**：按 `.jsonl` 文件的**修改时间**（`find -newermt`）筛选，再从 `sessions.json` 补充 agentDir 和 title 信息
**教训**：活跃会话的生命周期可能跨越多天，createdAt 不等于活跃日期

---

## 补录（2026-04-12 至 2026-04-21）

> 来源：memory/daily/ 日志回溯提炼，原机制断档期间遗漏

---

### [LRN-20260412-001] correction

**日期**：2026-04-12
**场景**：四层听话模型实用性
**问题**：年老师质疑模型的实用性（"这个有用吗？"）
**纠正**：把第四层"角色定位"加入 person-observer 作为强制检验项
**教训**：面对框架/模型，年老师第一反应是"对我有用吗"，不预设好评

### [LRN-20260412-002] insight

**日期**：2026-04-12
**场景**：工具选择
**洞察**：年老师面对工具本能做减法（"留一个的话怎么留"），而非加法。工具越多维护成本越高
**教训**：推荐方案时优先精简，不要默认"越多越好"

### [LRN-20260412-003] insight

**日期**：2026-04-12
**场景**：中文命名讨论
**洞察**：中文命名 vs 英文命名的选择，本质是系统服务于人还是服务于"标准"。年老师选择了前者
**教训**：命名优先服务于使用者认知，不服务于规范

---

### [LRN-20260413-001] correction

**日期**：2026-04-13
**场景**：供应商分层分级体系
**纠正**：从 S/A/B/C/D 五级改为 ABC 三级 — 年老师说"我自己也记不住"
**教训**：体系设计要简洁，年老师记不住太细的分级

### [LRN-20260413-002] best_practice

**日期**：2026-04-13
**场景**：赛马排名机制
**发现**：推荐相对排名切分（A≥70%/30-70%/后30%），而非绝对分数。与赛马逻辑一致，自动适应供应商数量变化
**教训**：排名思维优于绝对分数

---

### [LRN-20260419-001] correction

**日期**：2026-04-19
**场景**：供应商管理知识可视化
**纠正**：触发规则决策树反复三版都因"内容挤到一起"被打回，最终要求"换一个逻辑呈现"
**教训**：可视化不是一次成型，要先从第一层概念框架开始，逐层确认后再进下一层

### [LRN-20260419-002] correction

**日期**：2026-04-19
**场景**：AI 提效报告
**纠正**：第一版被打回 — AI 使用方法变成了工作描述，没写具体工具名和频次
**教训**：AI 提效报告要写"用什么工具 + 怎么用 + 频次"，不是工作描述

### [LRN-20260419-003] error

**日期**：2026-04-19
**场景**：供应商管理思路梳理可视化
**错误**：用 chart-visualization 生成 28 张 HTML 图表，"太粗错了，还有很多错位，质量很差"
**纠正**：全部改用 SVG 格式重做
**教训**：复杂可视化优先 SVG，HTML 容易错位

### [LRN-20260419-004] insight

**日期**：2026-04-19
**场景**：Plan 模板体系重命名
**洞察**：从"Plan Think"改为"Work Think"——年老师说"我自己也记不住"细分 AI/DI/绩效等子类
**教训**：模板命名要贴近年老师的认知，不要过度细分

---

### [LRN-20260420-001] correction

**日期**：2026-04-20
**场景**：可视化质量审查
**纠正**：AI 只检查代码语法，年老师否决全部 HTML。关键追问："你是不是真的看到了这个图的实际渲染情况？"
**教训**：检查可视化质量必须用浏览器实际打开看渲染效果，不能只检查代码

### [LRN-20260420-002] correction

**日期**：2026-04-20
**场景**：可视化质量反馈
**纠正**：年老师给出像素级反馈（"文字穿过"、"箭头没有指向对象"），不是模糊评价
**教训**：年老师的质量标准是具体的、像素级的，不是"差不多就行"

### [LRN-20260420-003] correction

**日期**：2026-04-20
**场景**：RTK hook 调试
**纠正**：RTK 卸载后上下文很快被填满，年老师说"下一次就知道，如果 hook 有问题，我就直接修改这个问题，而不是全部卸载掉"
**教训**：不要一出问题就全盘卸载/回滚，先定位具体故障点

### [LRN-20260420-004] correction

**日期**：2026-04-20
**场景**：每日书信数据源
**纠正**：第一版误判为空日（数据源问题），从 MyAgents session JSONL + CodePilot DB + git 提交多源还原
**教训**：不要只信一个数据源；要从原始对话中提炼，不是读已写好的日志

### [LRN-20260420-005] insight

**日期**：2026-04-20
**场景**：技能评估与精简
**洞察**：上午做加法（30+5 单元交付），晚上做减法（卸载 6 个冗余技能）。先理解真实需求，再做减法
**教训**：加法和减法要平衡，技能评估先理解需求再砍

---

### [LRN-20260422-001] correction

**日期**：2026-04-22
**场景**：多文件阅读
**纠正**：年老师指出"最好直接使用子代理，这样就不会放到上下文里"
**教训**：读取 ≥2 篇文件时，必须用 Explore 子代理并行读取，不要直接 Read 到主上下文

---
