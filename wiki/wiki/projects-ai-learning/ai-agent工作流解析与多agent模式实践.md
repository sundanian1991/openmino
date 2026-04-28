# AI Agent工作流解析与多Agent模式实践

> Sources: mino, 2026-04-28

## 概述

本文档深入分析了Agency-Agents框架中的178个Agent角色，按15个业务领域进行分类评估，结合个人工作场景（供应商管理、AI工具使用）标注相关性，提出了激进的清理方案（从178个精简到71个）。同时，文档整理了34个原有角色和新增角色的功能定位，为Agent角色体系的管理提供了完整的决策框架。核心洞察：角色数量不等于能力，精简的角色体系比臃肿的角色库更高效、更易维护。

## 一、Agency-Agents角色全景

### 1.1 角色总览

Agency-Agents框架共包含178个角色，按业务领域分为15大类：

| 类别 | 数量 | 建议保留 | 建议删除 |
|------|------|---------|---------|
| 原有角色 | 34 | 34 | 0 |
| 工程 | 25 | 13 | 12 |
| 设计 | 8 | 6 | 2 |
| 营销 | 26 | 4 | 22 |
| 项目管理 | 5 | 1 | 4 |
| 产品 | 4 | 3 | 1 |
| 测试 | 9 | 3 | 6 |
| 销售 | 8 | 0 | 8 |
| 付费媒体 | 7 | 0 | 7 |
| 支持 | 6 | 2 | 4 |
| 特殊 | 5 | 2 | 3 |
| 游戏开发 | 19 | 0 | 19 |
| 空间计算/XR | 7 | 0 | 7 |
| 区块链 | 2 | 0 | 2 |
| 其他杂项 | 15 | 3 | 12 |
| **总计** | **178** | **~71** | **~107** |

### 1.2 清理的核心逻辑

角色数量的精简不是简单的删除，而是基于实际工作场景的相关性评估。清理遵循以下原则：
- **相关性优先**：与供应商管理、AI工具使用直接相关的角色保留
- **功能去重**：功能相似的角色合并或删除
- **场景匹配**：只保留当前和未来3个月内有使用场景的角色
- **维护成本**：角色越多，维护成本越高，质量越难保证

## 二、原有角色体系（34个）

### 2.1 核心角色（高相关性）

| 角色 | 描述 | 相关性 |
|------|------|--------|
| planner | 实施计划制定 | 高 |
| tdd-guide | 测试先行指导 | 高 |
| code-reviewer | 代码审查 | 高 |
| security-reviewer | 安全审查 | 高 |
| architect | 系统架构设计 | 高 |
| database-reviewer | 数据库审查 | 高 |
| e2e-runner | E2E测试 | 高 |
| refactor-cleaner | 死代码清理 | 高 |
| build-error-resolver | 构建错误修复 | 高 |
| reading-internalizer | 知识内化 | 高 |

### 2.2 中等相关角色

| 角色 | 描述 |
|------|------|
| python-reviewer | Python代码审查 |
| go-reviewer | Go代码审查 |
| go-build-resolver | Go构建错误修复 |
| doc-updater | 文档更新 |

### 2.3 CLI/Plan相关角色（10个）

cli-discuss-agent、cli-execution-agent、cli-explore-agent、cli-lite-planning-agent、cli-planning-agent、action-planning-agent、conceptual-planning-agent、context-search-agent、issue-plan-agent、issue-queue-agent。这些角色支持CLI交互和规划流程，与日常开发工作流紧密相关。

### 2.4 测试相关角色（3个）

test-context-search-agent、test-fix-agent、debug-explore-agent。

### 2.5 其他原有角色

code-developer、universal-executor、project-manager-senior。

## 三、工程类角色评估（25个）

### 3.1 建议保留的核心角色（10个）

| 角色 | 描述 |
|------|------|
| engineering-frontend-developer | 前端开发 React/Vue/Angular |
| engineering-backend-architect | 后端架构 API/数据库/微服务 |
| engineering-security-engineer | 应用安全 威胁建模 漏洞评估 |
| engineering-code-reviewer | 代码审查 质量反馈 |
| engineering-database-optimizer | 数据库优化 查询 索引 |
| engineering-devops-automator | CI/CD 基础设施自动化 |
| engineering-software-architect | 软件架构 DDD 系统设计 |
| engineering-sre | 站点可靠性 SLO 可观测性 |
| engineering-technical-writer | 技术文档 API 文档 |
| engineering-git-workflow-master | Git 工作流 分支策略 |

### 3.2 可选保留（5个）

| 角色 | 描述 |
|------|------|
| engineering-ai-engineer | AI/ML 模型开发部署 |
| engineering-data-engineer | 数据管道 数据仓库 |
| engineering-incident-response-commander | 故障响应 事后复盘 |
| engineering-rapid-prototyper | 快速原型 MVP |
| engineering-autonomous-optimization-architect | API 成本优化 影子测试 |

### 3.3 建议删除的角色

**低相关（3个）**：engineering-senior-developer（Laravel/Livewire）、engineering-mobile-app-builder（iOS/Android）、engineering-ai-data-remediation-engineer（自愈数据管道）。

**无关（5个）**：engineering-embedded-firmware-engineer（嵌入式固件ESP32/STM32）、engineering-feishu-integration-developer（飞书集成）、engineering-wechat-mini-program-developer（微信小程序）、engineering-solidity-smart-contract-engineer（以太坊智能合约）、engineering-threat-detection-engineer（SIEM威胁检测）。

## 四、设计类角色（8个）

| 角色 | 描述 | 相关性 |
|------|------|--------|
| design-ui-designer | UI设计 组件库 设计系统 | 高 |
| design-ux-researcher | 用户研究 可用性测试 | 高 |
| design-ux-architect | UX架构 CSS系统 | 高 |
| design-brand-guardian | 品牌策略 视觉一致性 | 中 |
| design-visual-storyteller | 视觉叙事 多媒体内容 | 中 |
| design-image-prompt-engineer | AI图像提示词 | 中 |
| design-whimsy-injector | 创意注入 微交互 彩蛋 | 低 |
| design-inclusive-visuals-specialist | 无障碍视觉 文化准确 | 低 |

**建议**：保留前6个核心设计角色，whimsy-injector和inclusive-visuals-specialist可删除。

## 五、明确无关的类别

### 5.1 销售类（8个）— 全部删除

sales-engineer、sales-deal-strategist、sales-account-strategist、sales-pipeline-analyst、sales-outbound-strategist、sales-discovery-coach、sales-coach、sales-proposal-strategist。全部与供应商管理场景无关。

### 5.2 付费媒体类（7个）— 全部删除

ppc-strategist、paid-social-strategist、programmatic-buyer、creative-strategist、auditor、search-query-analyst、tracking-specialist。全部属于广告投放领域，与当前工作无关。

### 5.3 游戏开发类（19个）— 全部删除

涵盖game-designer、audio-engineer、narrative-designer、level-designer、technical-artist、Godot/Unity/Unreal/Roblox等各类游戏开发角色。全部无关。

### 5.4 空间计算/XR类（7个）— 全部删除

visionOS、XR、WebXR等前沿技术领域角色，与当前工作场景无关。

### 5.5 区块链类（2个）— 全部删除

blockchain-security-auditor、zk-steward。与当前工作无关。

## 六、营销类角色精简（26个）

### 6.1 国际平台角色（10个）

**保留**（4个）：marketing-content-creator、marketing-growth-hacker、marketing-seo-specialist、marketing-social-media-strategist。

**删除**（6个）：linkedin、twitter、instagram、tiktok、reddit、app-store等特定平台角色。

### 6.2 中国平台角色（12个）

全部相关性较低。如果有国内营销需求，可以选择性保留douyin-strategist、xiaohongshu-specialist、bilibili-content-strategist、wechat-official-account。其余删除。

### 6.3 其他营销角色（4个）

全部删除：podcast-strategist、book-co-author、carousel-growth-engine、cross-border-ecommerce。

## 七、其他类别评估

### 7.1 项目管理类（5个）

**保留**：project-management-project-shepherd（跨职能项目协调）。

**删除**：experiment-tracker、jira-workflow-steward、studio-operations、studio-producer。

### 7.2 产品类（4个）

**保留**：product-feedback-synthesizer、product-sprint-prioritizer、product-trend-researcher。

**删除**：product-behavioral-nudge-engine。

### 7.3 测试类（9个）

**保留**：testing-accessibility-auditor、testing-api-tester、testing-performance-benchmarker。

**删除**：evidence-collector、reality-checker、test-results-analyzer、tool-evaluator、workflow-optimizer、project-manager-senior。

### 7.4 支持类（6个）

**保留**：support-analytics-reporter、support-executive-summary-generator。

**删除**：finance-tracker、support-responder、legal-compliance-checker、infrastructure-maintainer。

### 7.5 特殊类（5个）

**保留**：specialized-mcp-builder、specialized-document-generator。

**删除**：developer-advocate、cultural-intelligence-strategist、model-qa。

### 7.6 其他杂项（15个）

**保留**（3个）：agents-orchestrator（编排整个开发流程）、supply-chain-strategist（供应链管理，与供应商管理相关）、compliance-auditor（合规审计）。

**删除**（12个）：identity-graph-operator、recruitment-specialist、study-abroad-advisor、government-digital-presales-consultant、healthcare-marketing-compliance、corporate-training-designer、automation-governance-architect、accounts-payable-agent、data-consolidation-agent、report-distribution-agent、sales-data-extraction-agent、agentic-identity-trust。

## 八、清理方案对比

### 8.1 方案A：激进清理（推荐）

**保留**：71个角色
**删除**：107个角色

**优点**：精简高效，不干扰日常使用。每个保留的角色都有明确的使用场景。

**缺点**：可能删掉将来有用的角色。但角色可以随时重新添加。

### 8.2 方案B：保守清理

**保留**：90个角色
**删除**：88个角色

**优点**：保留更多可能性，减少误删风险。

**缺点**：仍有较多冗余角色，维护成本较高。

### 8.3 方案C：仅删除明确无关

**删除**：游戏、空间计算、区块链、付费媒体 = 35个
**保留**：143个

**优点**：最安全，不删除任何可能有用的角色。

**缺点**：仍有大量用不上的角色，干扰使用体验。

### 8.4 推荐方案A的理由

在Agent角色管理中，"少即是多"是一个经过验证的原则。保留71个精心挑选的角色，比保留178个未经筛选的角色更有效：
- **选择成本降低**：需要委派任务时，从71个角色中筛选比从178个中筛选快得多
- **维护成本降低**：每个角色需要维护和更新prompt，71个角色的维护工作量是178个的40%
- **使用效率提升**：精简的角色体系减少了冗余和重复，每个角色的定位更清晰

## 九、与供应商管理的关联

### 9.1 直接相关的角色

| 角色 | 关联场景 |
|------|----------|
| supply-chain-strategist | 供应商战略规划、生态布局 |
| compliance-auditor | 供应商合规审查、审计 |
| support-analytics-reporter | 供应商数据分析、业绩报告 |
| support-executive-summary-generator | 供应商管理高层汇报 |
| agents-orchestrator | 供应商管理流程编排 |
| project-management-project-shepherd | 供应商项目管理、跨部门协调 |
| product-feedback-synthesizer | 供应商反馈收集分析 |
| product-sprint-prioritizer | 供应商管理冲刺规划 |

### 9.2 间接相关的角色

| 角色 | 关联场景 |
|------|----------|
| engineering-technical-writer | 供应商管理手册编写 |
| engineering-database-optimizer | 供应商数据库优化 |
| design-ui-designer | 供应商数据可视化 |
| testing-api-tester | 供应商系统API测试 |
| specialized-document-generator | 供应商报告自动生成 |
| specialized-mcp-builder | 供应商系统MCP对接 |

## 十、核心洞察总结

### 10.1 角色管理的三个层次

**第一层：有无**——是否有角色来承担这个任务？

**第二层：匹配**——角色的能力是否与任务需求匹配？

**第三层：精简**——是否有冗余角色可以删除或合并？

大多数人在第一层就停下了，优秀的管理者会走到第二层，而卓越的管理者会走到第三层。

### 10.2 精简的核心原则

- **功能导向**：按功能需求选择角色，不是按角色名称
- **场景驱动**：基于实际工作场景，不是基于"可能有用"
- **持续迭代**：定期审查角色列表，删除不再使用的角色
- **最小集合**：追求能覆盖工作场景的最小角色集合

### 10.3 下一步行动

1. 执行激进清理方案，从178个精简到71个
2. 为保留的角色建立使用指南
3. 每月审查一次角色列表，确保精简有效
4. 建立角色添加的审批流程，避免再次膨胀
