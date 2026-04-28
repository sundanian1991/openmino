# 供应商评估与KPI体系

> Sources: mino, 2026-04-27（合并：02-供应商评估与KPI体系）
> Raw:../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商KPI体系设计-findings.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商KPI体系设计-progress.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商KPI体系设计-task_plan.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-01-数据清洗.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-02-描述性统计.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-03-深度分析.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-04-供应商分层.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-05-开放问题提炼.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-06-VP汇报框架.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商补充材料通知.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-审计.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-数据资料-difengxian.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-数据资料-shuju.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-数据资料-供应商评分表.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-视觉原子规范-V3.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-视觉原子规范-v2.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-视觉原子规范.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-视觉原子规范V3.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-supplier-six-box-test-iteration-1-eval-1-with_skill-岐力六盒诊断报告.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-supplier-six-box-test-iteration-1-eval-2-with_skill-翰锐六盒诊断报告.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-supplier-six-box-test-iteration-1-eval-3-with_skill-毅航-六盒诊断报告.md

## 概述

供应商评估与KPI体系是供应商管理的核心数据基础设施，于2026年3-4月期间完成从数据收集到VP汇报框架的完整建设。该体系覆盖三个核心维度：供应商经营成本调研（确定生存生命线）、供应商绩效评估（多维度评分与分层）、六盒诊断（组织健康度评估）。整个项目按照标准化的数据管线执行：数据清洗→描述性统计→深度分析→供应商分层→开放问题提炼→VP汇报，最终产出了可直接向高层汇报的决策依据。

## 一、供应商经营状况调研——生存生命线

### 调研设计

调研覆盖17家供应商（首贷10家、复贷7家），原始样本21家，剔除无效数据后有效样本17家。数据周期为近3个月运营数据，核心财务数据完整。

### 三层生命线框架

**首贷人均生命线**：
- **下限（生存线）**：人均创收≥7,036元。低于此线，账面亏损。
- **中线（安全线）**：人均创收≥8,371元。安全边际仅2.2%。
- **上限（健康线）**：人均创收≥10,000元。能支付留人薪资（7,000元）。

**复贷人均生命线**：
- **下限**：≥5,196元 | **中线**：≥5,758元 | **上限**：≥8,214元

### 关键风险发现

- **安全边际极小**：平均可下降比例仅1.5%，13家已在盈亏平衡线上
- **现金流风险**：30%供应商（5家）出现资金周转困难，包括利润率20%的盈利职场
- **人才流失风险**：坐席平均薪资5,051元，留人需求6,412元，缺口1,361元
- **竞争劣势**：友商结算单价是京东的110%-120%，友商薪资高40-50%

### 定价建议

首贷：最低价7,000元/人/月，建议价8,400元，目标价10,000元。
复贷：最低价5,200元，建议价5,800元，目标价8,200元。

## 二、供应商经营分析——整体画像

### 整体数据

21家供应商样本：平均利润率-18.7%，健康12家（57%），亏损5家（24%），边缘4家（19%）。人均创收7,197元，人均成本6,592元。

### 规模效应

| 规模 | 人均结算 | 人均成本 | 人均毛利 | 结论 |
|------|---------|---------|---------|------|
| 大型（>80人） | 0.97万 | 0.72万 | +0.25万 | 毛利24% |
| 中型（31-80人） | 0.88万 | 0.79万 | +0.09万 | 微利 |
| 小型（≤30人） | 0.49万 | 0.66万 | -0.17万 | 亏损-183% |

### 按盈利分组

| 分组 | 坐席薪资 | 人均创收 | mob3留存 | 核心问题 |
|------|---------|---------|---------|---------|
| 健康（≥10%） | 5,260元 | 8,407元 | 53% | 正常 |
| 亏损（<0%） | 5,439元 | 5,138元 | 60% | 产能效率低 |

亏损供应商坐席薪资反而更高，说明问题不在薪资水平，而在产能效率。

### 城市级数据（首贷）

- 合肥/宿州：150人，利润率31.2%，人均创收11,333元（最佳）
- 昆明：65人，利润率25.0%，人均创收9,231元
- 石家庄：125人，利润率4.1%
- 南昌：20人，利润率-25.0%（严重亏损）

复贷分层更极端——中间层缺失，要么健康要么问题。

## 三、KPI体系设计——ABC三层评分模型

### ABC分层

**A级（优质）≥85分**：维持合作，优先分配资源
**B级（合格）70-84分**：常规管理，定期辅导
**C级（待改善）<70分**：进入PIP限期改善

### 评分权重

| 维度 | 权重 | 核心指标 |
|------|------|---------|
| 业务结果 | 60% | 产能达成20%、转化率15%、人均产出15%、排名20%等 |
| 供应商管理 | 30% | 响应速度15%、配合度15%、改善能力15%等 |
| 质检 | 10% | 质检合格40%、致命错误20%、投诉率10%等 |

### 四象限分层矩阵

| 分层 | 占比 | 管理策略 |
|------|------|---------|
| A类（优质） | 22% | 优先分配增量业务 |
| B类（健康） | 11% | 关注成本优化 |
| C类（边缘） | 22% | 建立风险预警 |
| D类（问题） | 45% | 启动淘汰程序 |

## 四、六盒诊断——组织健康度

六盒诊断模型从六个维度（使命/目标、结构、关系、奖励、领导力、帮助机制）评估供应商组织健康度。2026年4月完成三家重点供应商诊断：

- **岐力**：金条头部，重点诊断使命目标是否清晰、组织结构是否支撑业务规模
- **翰锐**：头部供应商，重点诊断快速扩张后的组织稳定性和管理稀释风险
- **毅航**：标杆供应商，验证其管理实践的可复制性和分享价值

## 五、VP汇报框架——SCQA结构

### 汇报设计（15分钟）

| 环节 | 时长 | 内容 |
|------|------|------|
| Situation 背景 | 1分钟 | 调研背景、样本量 |
| Complication 冲突 | 2分钟 | 91%供应商下降<10%就亏损 |
| Question 问题 | 1分钟 | 结算是生命线，如何管理？ |
| Answer 方案 | 8分钟 | 数据→发现→分层→建议 |
| 总结与下一步 | 3分钟 | 核心结论、Q&A |

### 一页纸核心结论

| 维度 | 数据 | 结论 |
|------|------|------|
| 风险敏感度 | 91%下降<10%就亏损 | 结算是生命线 |
| 规模效应 | 大型毛利24%，小型-183% | 小供应商难以存活 |
| 成本结构 | 人力占74% | 人力是最大支出 |
| 供应商质量 | 优质仅22%，问题45% | 结构需优化 |

### 核心管理建议

**短期**：设定首贷盈亏警戒线（人均创收<7,500元重点监控），分类管理（盈利/边缘/亏损职场差异化处理）

**中期**：结算改为季度调整（P0，低成本高满意度），赛马规则优化（增员保护期），扣罚规则优化

**供应商核心诉求排序**：季度调整(P0) > 赛马规则优化(P1) > 扣罚规则优化(P1) > 批次整合(P2) > 通讯费甲方支付(P2)

## 六、数据管线的标准化

整个评估体系按照六步管线执行，可复用于后续周期：

1. **数据清洗**：剔除"二、三线"等非具体城市名、利润率<-100%极端值、结算≤0异常
2. **描述性统计**：均值、中位数、分布、成本结构
3. **深度分析**：按规模、盈利、业务线多维度交叉分析
4. **供应商分层**：基于数据分为健康/边缘/亏损
5. **开放问题提炼**：从分析中发现需进一步研究的问题
6. **汇报框架设计**：用SCQA结构将发现转化为决策建议

## 相关文件索引

| 文件簇 | 文件数 | 核心内容 |
|--------|--------|----------|
| KPI体系设计 | 3 | findings、progress、task_plan |
| 评估管线 | 6 | 数据清洗→描述性统计→深度分析→分层→开放问题→VP汇报 |
| 数据资料 | 3 | 评分表、运营数据 |
| 视觉规范 | 4 | V1/V2/V3迭代 |
| 六盒诊断 | 3 | 岐力、翰锐、毅航 |
