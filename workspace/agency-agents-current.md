---
input: 相关文档
output: 文档内容
pos: 项目目录
---

# 当前角色清单（117 个）

> 更新时间：2026-03-13

---

## 一、原有角色（34 个）— 安装 agency-agents 前已存在

| 角色 | 描述 | 相关性 |
|------|------|--------|
| planner | 实施计划制定 | ⭐⭐⭐ 高 |
| tdd-guide | 测试先行指导 | ⭐⭐⭐ 高 |
| tdd-developer | TDD 开发 | ⭐⭐⭐ 高 |
| code-reviewer | 代码审查 | ⭐⭐⭐ 高 |
| security-reviewer | 安全审查 | ⭐⭐⭐ 高 |
| architect | 系统架构设计 | ⭐⭐⭐ 高 |
| database-reviewer | PostgreSQL 数据库审查 | ⭐⭐⭐ 高 |
| python-reviewer | Python 代码审查 | ⭐⭐ 中 |
| go-reviewer | Go 代码审查 | ⭐⭐ 中 |
| go-build-resolver | Go 构建错误修复 | ⭐⭐ 中 |
| e2e-runner | E2E 测试 | ⭐⭐⭐ 高 |
| refactor-cleaner | 死代码清理 | ⭐⭐⭐ 高 |
| doc-updater | 文档更新 | ⭐⭐ 中 |
| doc-generator | 文档生成 | ⭐⭐ 中 |
| build-error-resolver | 构建错误修复 | ⭐⭐⭐ 高 |
| reading-internalizer | 知识内化读书助手 | ⭐⭐⭐ 高 |
| ui-design-agent | UI 设计 | ⭐⭐⭐ 高 |
| memory-bridge | 项目文档更新 | ⭐⭐ 中 |

**CLI/Plan 相关**（10 个）：
| 角色 | 描述 |
|------|------|
| cli-discuss-agent | CLI 讨论 |
| cli-execution-agent | CLI 执行 |
| cli-explore-agent | CLI 探索 |
| cli-lite-planning-agent | CLI 轻量规划 |
| cli-planning-agent | CLI 规划 |
| action-planning-agent | 行动规划 |
| conceptual-planning-agent | 概念规划 |
| context-search-agent | 上下文搜索 |
| issue-plan-agent | Issue 规划 |
| issue-queue-agent | Issue 队列 |

**测试相关**（3 个）：
| 角色 | 描述 |
|------|------|
| test-context-search-agent | 测试上下文搜索 |
| test-fix-agent | 测试修复 |
| debug-explore-agent | 调试探索 |

**其他**（3 个）：
| 角色 | 描述 |
|------|------|
| code-developer | 代码开发 |
| universal-executor | 通用执行器 |
| project-manager-senior | 高级项目经理 |

---

## 二、工程类 Engineering（23 个）

### 核心角色（10 个）— 建议保留 ⭐⭐⭐

| 角色 | 描述 |
|------|------|
| engineering-frontend-developer | 前端开发 React/Vue/Angular |
| engineering-backend-architect | 后端架构 API/微服务 |
| engineering-security-engineer | 应用安全 威胁建模 |
| engineering-code-reviewer | 代码审查 质量反馈 |
| engineering-database-optimizer | 数据库优化 查询 索引 |
| engineering-devops-automator | CI/CD 基础设施自动化 |
| engineering-software-architect | 软件架构 DDD |
| engineering-sre | 站点可靠性 SLO |
| engineering-technical-writer | 技术文档 API 文档 |
| engineering-git-workflow-master | Git 工作流 分支策略 |

### 中等相关（5 个）— 可选保留 ⭐⭐

| 角色 | 描述 |
|------|------|
| engineering-ai-engineer | AI/ML 模型开发部署 |
| engineering-data-engineer | 数据管道 数据仓库 |
| engineering-incident-response-commander | 故障响应 事后复盘 |
| engineering-rapid-prototyper | 快速原型 MVP |
| engineering-autonomous-optimization-architect | API 成本优化 影子测试 |

### 低相关（3 个）— 可删除 ⭐

| 角色 | 描述 |
|------|------|
| engineering-senior-developer | Laravel/Livewire 高级开发 |
| engineering-mobile-app-builder | iOS/Android 移动应用 |
| engineering-ai-data-remediation-engineer | 自愈数据管道 |

### 无关（5 个）— 建议删除 ❌

| 角色 | 描述 |
|------|------|
| engineering-embedded-firmware-engineer | 嵌入式固件 ESP32/STM32 |
| engineering-feishu-integration-developer | 飞书集成开发 |
| engineering-wechat-mini-program-developer | 微信小程序开发 |
| engineering-solidity-smart-contract-engineer | 以太坊智能合约 |
| engineering-threat-detection-engineer | SIEM 威胁检测 |

---

## 三、设计类 Design（8 个）— 建议全部保留

| 角色 | 描述 | 相关性 |
|------|------|--------|
| design-ui-designer | UI 设计 组件库 | ⭐⭐⭐ 高 |
| design-ux-researcher | 用户研究 可用性测试 | ⭐⭐⭐ 高 |
| design-ux-architect | UX 架构 CSS 系统 | ⭐⭐⭐ 高 |
| design-brand-guardian | 品牌策略 视觉一致性 | ⭐⭐ 中 |
| design-visual-storyteller | 视觉叙事 | ⭐⭐ 中 |
| design-image-prompt-engineer | AI 图像提示词 | ⭐⭐ 中 |
| design-whimsy-injector | 创意注入 微交互 | ⭐ 低 |
| design-inclusive-visuals-specialist | 无障碍视觉 | ⭐ 低 |

---

## 四、项目管理类 Project Management（6 个）

### 建议保留 ⭐⭐⭐

| 角色 | 描述 |
|------|------|
| project-management-project-shepherd | 跨职能项目协调 |

### 可选保留 ⭐⭐

| 角色 | 描述 |
|------|------|
| project-management-experiment-tracker | 实验设计追踪 |

### 建议删除 ⭐

| 角色 | 描述 |
|------|------|
| project-management-jira-workflow-steward | Jira 工作流管理 |
| project-management-studio-operations | 工作室日常运营 |
| project-management-studio-producer | 高级项目制片 |

---

## 五、产品类 Product（4 个）

### 建议保留 ⭐⭐⭐

| 角色 | 描述 |
|------|------|
| product-feedback-synthesizer | 用户反馈收集分析 |
| product-sprint-prioritizer | 冲刺规划 优先级 |
| product-trend-researcher | 市场趋势研究 |

### 建议删除 ⭐

| 角色 | 描述 |
|------|------|
| product-behavioral-nudge-engine | 行为助推 用户留存 |

---

## 六、测试类 Testing（8 个）

### 建议保留 ⭐⭐⭐

| 角色 | 描述 |
|------|------|
| testing-accessibility-auditor | 无障碍审计 WCAG |
| testing-api-tester | API 测试 |
| testing-performance-benchmarker | 性能测试 |

### 可选保留 ⭐⭐

| 角色 | 描述 |
|------|------|
| testing-evidence-collector | 证据收集 QA |
| testing-reality-checker | 事实核查 |
| testing-test-results-analyzer | 测试结果分析 |

### 建议删除 ⭐

| 角色 | 描述 |
|------|------|
| testing-tool-evaluator | 工具评估 |
| testing-workflow-optimizer | 工作流优化 |

---

## 七、销售类 Sales（8 个）— 建议全部删除 ❌

| 角色 | 描述 |
|------|------|
| sales-engineer | 售前工程师 |
| sales-deal-strategist | 交易策略 |
| sales-account-strategist | 客户账户策略 |
| sales-pipeline-analyst | 销售漏斗分析 |
| sales-outbound-strategist | 外呼销售策略 |
| sales-discovery-coach | 销售发现教练 |
| sales-coach | 销售教练 |
| sales-proposal-strategist | 提案策略 |
| sales-data-extraction-agent | 销售数据提取 |

---

## 八、支持类 Support（6 个）

### 建议保留 ⭐⭐⭐

| 角色 | 描述 |
|------|------|
| support-analytics-reporter | 数据分析 商业洞察 |
| support-executive-summary-generator | 执行摘要 高管汇报 |

### 可选保留 ⭐⭐

| 角色 | 描述 |
|------|------|
| support-finance-tracker | 财务分析 预算 |

### 建议删除 ⭐

| 角色 | 描述 |
|------|------|
| support-support-responder | 客户支持 |
| support-legal-compliance-checker | 法律合规 |
| support-infrastructure-maintainer | 基础设施维护 |

---

## 九、特殊类 Specialized（5 个）

### 建议保留 ⭐⭐⭐

| 角色 | 描述 |
|------|------|
| specialized-mcp-builder | MCP 服务器构建 |
| specialized-document-generator | 文档生成 PDF/PPTX/DOCX |

### 可选保留 ⭐⭐

| 角色 | 描述 |
|------|------|
| specialized-developer-advocate | 开发者布道 |

### 建议删除 ⭐

| 角色 | 描述 |
|------|------|
| specialized-cultural-intelligence-strategist | 文化智能 CQ |
| specialized-model-qa | 模型 QA 审计 |

---

## 十、其他杂项（15 个）

### 建议保留 ⭐⭐⭐

| 角色 | 描述 |
|------|------|
| agents-orchestrator | 编排整个开发流程 |
| supply-chain-strategist | 供应链管理（与供应商管理相关）|
| compliance-auditor | 合规审计 SOC2/ISO27001 |

### 可选保留 ⭐⭐

| 角色 | 描述 |
|------|------|
| recruitment-specialist | 招聘专家 |
| corporate-training-designer | 企业培训设计 |
| automation-governance-architect | 自动化治理架构 |

### 建议删除 ⭐

| 角色 | 描述 |
|------|------|
| identity-graph-operator | 身份图谱管理 |
| accounts-payable-agent | 应付账款自动化 |
| data-consolidation-agent | 销售数据整合 |
| report-distribution-agent | 报告分发自动化 |
| study-abroad-advisor | 留学顾问 |
| government-digital-presales-consultant | 政府数字化售前 |
| healthcare-marketing-compliance | 医疗营销合规 |
| agentic-identity-trust | Agent 身份认证 |

---

## 汇总统计

| 类别 | 当前数量 | 建议保留 | 建议删除 |
|------|---------|---------|---------|
| 原有角色 | 34 | 34 | 0 |
| 工程 | 23 | 15 | 8 |
| 设计 | 8 | 8 | 0 |
| 项目管理 | 6 | 2 | 4 |
| 产品 | 4 | 3 | 1 |
| 测试 | 8 | 6 | 2 |
| 销售 | 9 | 0 | 9 |
| 支持 | 6 | 3 | 3 |
| 特殊 | 5 | 3 | 2 |
| 其他杂项 | 14 | 6 | 8 |
| **总计** | **117** | **80** | **37** |

---

## 下一步建议删除清单

### 明确删除（37 个）

**销售类（9 个）**：
```
sales-engineer
sales-deal-strategist
sales-account-strategist
sales-pipeline-analyst
sales-outbound-strategist
sales-discovery-coach
sales-coach
sales-proposal-strategist
sales-data-extraction-agent
```

**工程-无关（5 个）**：
```
engineering-embedded-firmware-engineer
engineering-feishu-integration-developer
engineering-wechat-mini-program-developer
engineering-solidity-smart-contract-engineer
engineering-threat-detection-engineer
```

**项目管理（4 个）**：
```
project-management-jira-workflow-steward
project-management-studio-operations
project-management-studio-producer
project-manager-senior
```

**其他（19 个）**：
```
product-behavioral-nudge-engine
testing-tool-evaluator
testing-workflow-optimizer
support-support-responder
support-legal-compliance-checker
support-infrastructure-maintainer
specialized-cultural-intelligence-strategist
specialized-model-qa
identity-graph-operator
accounts-payable-agent
data-consolidation-agent
report-distribution-agent
study-abroad-advisor
government-digital-presales-consultant
healthcare-marketing-compliance
agentic-identity-trust
```

