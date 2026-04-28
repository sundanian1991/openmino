# 供应商评估与KPI体系

> Sources: mino, 2026-04-27
> Raw:../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商KPI体系设计-findings.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商KPI体系设计-progress.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商KPI体系设计-task_plan.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-01-数据清洗.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-02-描述性统计.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-03-深度分析.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-04-供应商分层.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-05-开放问题提炼.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商评估-06-VP汇报框架.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-供应商补充材料通知.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-审计.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-数据资料-difengxian.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-数据资料-shuju.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-数据资料-供应商评分表.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-视觉原子规范-V3.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-视觉原子规范-v2.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-视觉原子规范.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-视觉原子规范V3.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-supplier-six-box-test-iteration-1-eval-1-with_skill-岐力六盒诊断报告.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-supplier-six-box-test-iteration-1-eval-2-with_skill-翰锐六盒诊断报告.md; ../../raw/workspace-supplier/-Users-sundanian-Documents-projects-ai-agents-my-agent-workspace-34-供应商-评估与KPI体系-20260402-supplier-six-box-test-iteration-1-eval-3-with_skill-毅航-六盒诊断报告.md

## 概述

供应商评估与KPI体系是供应商管理的核心数据基础设施，于2026年3-4月期间完成从数据收集到VP汇报框架的完整建设。该体系覆盖三个核心维度：供应商经营成本调研（确定生存生命线）、供应商绩效评估（多维度评分与分层）、六盒诊断（组织健康度评估）。整个项目按照标准化的数据管线执行：数据清洗→描述性统计→深度分析→供应商分层→开放问题提炼→VP汇报，最终产出了可直接向高层汇报的决策依据。

## 一、供应商经营状况调研——生存生命线

### 调研设计

调研覆盖17家供应商（首贷10家、复贷7家），原始样本21家，剔除无效数据后有效样本17家。样本覆盖合肥、昆明、石家庄、鸡西、南昌、蚌埠、包头等多个城市，规模分布包含小型、中型、大型。数据周期为近3个月运营数据，核心财务数据完整，薪资相关数据100%覆盖。

### 三层生命线框架

**首贷人均生命线**：
- **下限（生存线）**：人均创收≥7,036元。低于此线，账面亏损，资金链断裂风险高。
- **中线（安全线）**：人均创收≥8,371元。供应商评估的安全边际，可下降空间仅2.2%。
- **上限（健康线）**：人均创收≥10,000元。能支付留人薪资（7,000元），保持团队稳定。

**复贷人均生命线**：
- **下限（生存线）**：人均创收≥5,196元
- **中线（安全线）**：人均创收≥5,758元
- **上限（健康线）**：人均创收≥8,214元

### 关键风险发现

**安全边际极小**：平均可下降比例仅1.5%，13家已在盈亏平衡线上。这意味着结算金额下降不到2%，大量供应商就会陷入亏损。

**现金流风险**：30%供应商（5家）出现资金周转困难，包括利润率20%的盈利职场。这说明盈利不等于现金流健康，部分供应商虽然有账面利润，但应收账款周期长、垫资压力大。

**人才流失风险**：当前坐席平均薪资5,051元，留人需求6,412元，缺口1,361元。这个差距直接导致坐席流失率高、招聘困难。

**竞争劣势明显**：友商结算单价是京东的110%-120%，友商员工薪资7,000-9,000元对比京东5,000-7,000元，低约40-50%。这是结构性的竞争劣势。

### 定价建议

基于生命线分析，向VP提出了明确的定价建议：首贷建议结算单价最低价7,000元/人/月（生存线），建议价8,400元/人/月（安全线），目标价10,000元/人/月（健康线）。复贷建议最低价5,200元/人/月，建议价5,800元/人/月，目标价8,200元/人/月。

## 二、供应商经营分析——整体画像

### 整体数据

在更广泛的21家供应商样本中：平均利润率-18.7%（负数表示亏损），健康供应商12家（57%），亏损供应商5家（24%），边缘供应商4家（19%）。人均创收7,197元，人均成本6,592元，坐席平均薪资5,222元，薪资占创收比例72.6%。

### 成本结构

人力成本占72.6%，场地成本10.3%，运营成本7.9%，设备成本4.5%。人力成本是最大的支出项，且与盈利呈负相关（-0.38），说明人力成本占比越高的供应商，盈利能力越差。

### 规模效应

**头部供应商（>80人）**：平均利润率23.8%，人均创收10,962元。规模效应明显，固定成本摊薄，管理效率高。

**中腰部供应商（30-80人）**：平均利润率8.3%，人均创收7,422元。有一定利润空间，但抗风险能力较弱。

**尾部供应商（<30人）**：平均利润率-96.3%，人均创收4,273元。严重亏损，几乎无法持续经营。

### 按盈利分组

**健康供应商（利润率≥10%）**：坐席平均薪资5,260元，人均创收8,407元，mob3留存率53%。

**亏损供应商（利润率<0%）**：坐席平均薪资5,439元，人均创收5,138元，mob3留存率60%。值得注意的是，亏损供应商的坐席薪资反而更高，但人均创收显著更低，说明问题不在于薪资水平，而在于产能效率。

### 核心洞察与建议

1. **停止压降价格**：24%供应商已亏损，继续降价会加速供应商退出
2. **扶持中腰部**：通过培训提升产能，而非压降价格
3. **建立增量收益分享机制**：让供应商相信"投入有回报"
4. **降低对头部依赖**：培养第二梯队，避免单一供应商风险

## 三、KPI体系设计——评分模型

### ABC三级分层体系

原有的排名规则（连续2次后30%进入PIP）存在滞后性、一刀切、单一维度三个问题。新的ABC分层体系实现了差异化管理：

**评分权重分配**：
- 业务结果得分（60%权重）：由业务督导定量评分，包含产能达成率（20%）、转化率/接通率（15%）、人均产出（15%）、在岗稳定性（10%）、流失率（10%）、预警率（10%）、业务排名（20%）
- 供应商管理得分（30%权重）：由供应商管理BP定性评分，包含响应速度（15%）、配合度（15%）、人员配置合理性（15%）、培训执行质量（10%）、数据报送规范性（10%）、问题改善能力（15%）、沟通协作（10%）、合规管理（10%）
- 质检得分（10%权重）：由质检团队评分，包含质检合格率（40%）、致命错误率（20%）、服务规范得分（20%）、客户投诉率（10%）、质检整改完成率（10%）

**分级阈值**：A级（优质）≥85分，维持合作优先分配资源；B级（合格）70-84分，常规管理定期辅导；C级（待改善）<70分，进入PIP限期改善。

### 管理动作差异化

**A级供应商**：维持优势、树立标杆。降低检查频率，优先分配新项目，授予更多自主权，邀请分享最佳实践。

**B级供应商**：常规管理、定期辅导。定期检查频率，提供改进建议，关注关键指标变化，帮助识别瓶颈。

**C级供应商**：重点干预、限期改善。每周检查频率，制定改善计划，增加资源支持，设定改善期限（通常30天），到期不达标进入清退流程。

## 四、六盒诊断——组织健康度评估

六盒诊断模型源自韦斯伯德的组织诊断工具，从六个维度评估供应商的组织健康度。项目在2026年4月完成了三家重点供应商的诊断：

**岐力**：作为金条头部供应商，六盒诊断重点关注其使命目标是否清晰、组织结构是否支撑业务规模、关键岗位是否有胜任人才、核心流程是否标准化。

**翰锐**：同样作为头部供应商，诊断重点在于其快速扩张后的组织稳定性和管理稀释风险。

**毅航**：作为标杆供应商，诊断用于验证其管理实践的可复制性和分享价值。

六盒诊断的六个维度通常包括：使命/目标、结构、关系、奖励、领导力、帮助机制。每个维度从1-5分评分，识别组织短板和改善机会。

## 五、VP汇报框架——SCQA结构

调研结果通过SCQA框架向VP汇报，15分钟汇报时长：

**Situation背景（1分钟）**：调研背景——11家供应商、9份有效问卷；调研目标——了解供应商结算水平与经营状况。

**Complication冲突（2分钟）**：核心发现——91%供应商结算下降不到10%就亏损；严重性——小型供应商已处于生存边缘；紧迫性——67%供应商已在盈亏平衡点附近。

**Question问题（1分钟）**：核心问题——结算水平确实是生命线，我们如何管理？

**Answer方案（8分钟）**：数据概览（2分钟）→核心发现（4分钟）→供应商分层（1分钟）→管理建议（1分钟）。

**总结与下一步（3分钟）**：核心结论回顾、可执行建议、Q&A。

核心结论一页纸总结：风险敏感度91%下降<10%就亏损（结算是生命线）；规模效应大型毛利24%、小型-183%；成本结构人力占74%；供应商质量优质仅22%、问题45%。

## 数据管线的标准化

整个评估体系按照标准化的六步管线执行，这套管线可复用于后续的评估周期：

1. **数据清洗**：统一字段名、处理缺失值、剔除无效样本（如"二、三线"等模糊数据）、验证数据完整性
2. **描述性统计**：计算平均值、中位数、标准差、极值，建立基础数据画像
3. **深度分析**：按规模、盈利、业务线等多维度交叉分析，识别相关性和异常
4. **供应商分层**：基于数据将供应商分为健康/边缘/亏损，或头部/中腰/尾部
5. **开放问题提炼**：从分析中发现需要进一步研究的问题，如现金流风险、人才缺口
6. **汇报框架设计**：用SCQA结构将发现转化为可行动的决策建议

## 相关文件索引

| 文件簇 | 文件数 | 核心内容 |
|--------|--------|----------|
| KPI体系设计（3文件） | 3 | findings、progress、task_plan |
| 供应商评估管线（6文件） | 6 | 数据清洗→描述性统计→深度分析→分层→开放问题→VP汇报 |
| 数据资料（3文件） | 3 | difengxian数据、shuju数据、供应商评分表 |
| 视觉原子规范（4文件） | 4 | V1/V2/V3迭代版本 |
| 六盒诊断报告（3文件） | 3 | 岐力、翰锐、毅航三家供应商诊断 |
| 审计（1文件） | 1 | 审计相关材料 |
