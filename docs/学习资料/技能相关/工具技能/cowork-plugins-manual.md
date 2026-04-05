# Claude Cowork 插件使用手册

> 适用于 Claude Code 环境（我们目前使用的）

---

## 📦 已安装插件

| 插件 | Commands | Skills |
|------|----------|--------|
| **data** | 6个 | 7个 |
| **productivity** | 2个 | 3个 |
| **sales** | 3个 | 6个 |
| **legal** | 6个 | 6个 |
| **finance** | 5个 | 6个 |

---

## 🚀 如何使用

### 方式 1：直接使用 Slash Commands

在对话中直接输入命令：

```
/data:explore-data <文件或表名>
/legal:review-contract <合同文件>
/productivity:start
/sales:call-prep <客户名>
/finance:reconciliation
```

### 方式 2：描述任务让 AI 自动调用

直接描述你的需求，AI 会自动判断使用哪个插件：

```
"帮我分析下这份供应商KPI数据"
"审阅一下这份采购合同"
"帮我准备一下明天和供应商A的沟通"
```

---

## 📋 各插件核心功能

### 1. Data（数据分析）

| Command | 功能 |
|---------|------|
| `/data:explore-data` | 分析数据结构、质量、发现模式 |
| `/data:write-query` | 自然语言转 SQL |
| `/data:analyze` | 执行分析任务 |
| `/data:build-dashboard` | 构建数据看板 |
| `/data:create-viz` | 创建可视化 |
| `/data:validate` | 数据验证 |

**适用场景**：
- 分析供应商 KPI 数据
- 发现数据异常
- 生成数据报告

---

### 2. Legal（法律合规）

| Command | 功能 |
|---------|------|
| `/legal:review-contract` | 合同审查（红黄绿三级风险） |
| `/legal:triage-nda` | NDA 分类 |
| `/legal:vendor-check` | 供应商合规检查 |
| `/legal:compliance-check` | 合规检查 |
| `/legal:brief` | 法律简报 |
| `/legal:signature-request` | 签名请求 |

**适用场景**：
- 供应商合同审查
- NDA 处理
- 合规风险评估

**关键特性**：
- 支持加载企业谈判手册（playbook）
- 红黄绿三级风险标记
- 自动生成修改建议

---

### 3. Productivity（生产力）

| Command | 功能 |
|---------|------|
| `/productivity:start` | 初始化 productivity 系统 |
| `/productivity:update` | 同步任务和记忆 |

**适用场景**：
- 每日任务梳理
- 工作记忆管理
- 任务优先级排序

---

### 4. Sales（销售支持）

| Command | 功能 |
|---------|------|
| `/sales:call-prep` | 销售电话准备（90分钟→10分钟） |
| `/sales:pipeline-review` | 销售管道回顾 |
| `/sales:forecast` | 销售预测 |

**适用场景**：
- 客户沟通准备
- 销售数据分析
- 竞品分析

---

### 5. Finance（财务）

| Command | 功能 |
|---------|------|
| `/finance:reconciliation` | 对账 |
| `/finance:journal-entry` | 日记账分录 |
| `/finance:income-statement` | 利润表分析 |
| `/finance:variance-analysis` | 差异分析 |
| `/finance:sox-testing` | SOX 合规测试 |

**适用场景**：
- 供应商结算对账
- 财务数据分析

---

## 🎯 针对供应商管理的推荐用法

### 场景 1：供应商合同审查

```
输入：/legal:review-contract <合同文件>

AI 会：
1. 加载企业谈判手册（如已配置）
2. 逐条分析合同条款
3. 标记红黄绿风险
4. 生成修改建议
```

**对你有用**：
- 采购合同审查
- NDA 审核
- 合规检查

---

### 场景 2：供应商数据分析

```
输入：/data:explore-data <供应商KPI文件>

AI 会：
1. 分析数据结构
2. 发现数据质量问题
3. 识别模式和建议
```

**对你有用**：
- 35家供应商的 KPI 分析
- 异常数据发现
- 续费漏损检测

---

### 场景 3：任务梳理

```
输入：/productivity:start

AI 会：
1. 检查现有 TASKS.md
2. 创建/更新任务列表
3. 提供可视化看板
```

**对你有用**：
- 多供应商并行跟进
- 任务优先级排序

---

## ⚙️ 自定义配置（进阶）

### 配置企业谈判手册

在项目目录创建 `legal.local.md`，定义企业标准条款：

```markdown
# Contract Playbook

## Limitation of Liability
- Standard: Cap at 12 months fees
- Acceptable range: 6-24 months
- Escalation: >24 months

## Indemnification
- Standard: Mutual indemnification
- Escalation: Unlimited indemnification
```

### 连接外部数据源

编辑 `.mcp.json` 连接数据仓库：

```json
{
  "mcpServers": {
    "snowflake": {
      "command": "npx",
      "args": ["-y", "@anthropic/mcp-server-snowflake"],
      "env": {"SNOWFLAKE_ACCOUNT": "xxx"}
    }
  }
}
```

---

## 📝 注意事项

1. **Skills 自动加载**：这些插件的 skills 会在相关上下文自动触发
2. **连接器需要配置**：部分高级功能需要连接外部系统（CRM、数据仓库等）
3. **_playbook 可定制**：legal 插件支持加载企业自定义手册

---

*更新：2026-02-28 — 首批 5 个核心插件安装完成*
