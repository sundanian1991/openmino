---
input: Anthropic 官方文档（How Anthropic Uses Claude Code、Claude Best Practices、Writing Effective Tools for Agents）
output: 年老师个性化学习教案
pos: CS146S 课程配套学习材料
---

# Claude Code 深度学习教案 - 年老师版

> Anthropic 官方实践 + 供应商管理场景定制

---

## 学习目标

**核心目标**：掌握 Claude Code，提升供应商管理效率

**具体目标**：
1. 理解 Anthropic 内部如何使用 Claude Code
2. 掌握 Claude Code 最佳实践
3. 学会编写高效的工具/技能
4. 应用到供应商管理日常工作

---

## 第一部分：How Anthropic Uses Claude Code

### 核心洞察

**Anthropic 内部使用 Claude Code 的 9 大场景**：

| 部门 | 使用场景 | 相关度 |
|------|---------|--------|
| **Data Infrastructure** | 数据管道、自动化测试 | ⭐⭐⭐ |
| **Product Development** | 功能开发、代码审查 | ⭐⭐⭐ |
| **Security Engineering** | 漏洞检测、安全审计 | ⭐⭐ |
| **Inference** | 模型部署、监控 | ⭐ |
| **Data Science** | 数据分析、可视化 | ⭐⭐⭐ |
| **API** | API 文档、测试 | ⭐⭐ |
| **Growth Marketing** | 自动化营销 | ⭐⭐ |
| **Product Design** | 设计验证 | ⭐ |
| **Legal** | 合同审查 | ⭐⭐⭐ |

---

### 与你工作的关联

**高度相关的场景**：

#### 1. Data Science & Visualization（数据科学）

**Anthropic 做法**：
- 用 Claude Code 分析数据、生成图表
- 自动化数据清洗和转换
- 快速探索数据模式

**你的应用**：
```bash
# 分析供应商绩效数据
claude -p "分析 outputs/supplier_performance.csv，找出：
1. KPI 低于平均的供应商
2. 质量问题趋势
3. 生成可视化图表"
```

#### 2. Legal（合同审查）

**Anthropic 做法**：
- 自动审查合同条款
- 提取关键条款和风险点
- 对比多个合同版本

**你的应用**：
```bash
# 审查供应商合同
claude -p "审查 docs/supplier_contract_2026.pdf：
1. 付款条款是否合规
2. 违约责任是否明确
3. 需要注意的风险点
4. 与模板合同对比差异"
```

#### 3. Product Development（功能开发）

**Anthropic 做法**：
- 从需求描述直接生成代码
- 自动化测试和代码审查
- 快速迭代和修复

**你的应用**：
```bash
# 开发供应商评估工具
claude -p "创建供应商评估打分工具：
1. 输入：供应商 KPI 数据
2. 处理：按权重计算总分
3. 输出：排名和评级
4. 用 Python 实现"
```

---

### 关键要点

1. **Claude Code 不是替代，是增强**
   - 它让你能做以前做不到的事
   - 不是取代你的专业知识

2. **从简单任务开始**
   - 先用它处理重复性工作
   - 逐步扩展到复杂场景

3. **建立工作流程**
   - 数据处理 → 分析 → 报告
   - 合同审查 → 风险评估 → 决策

---

## 第二部分：Claude Best Practices

### 核心原则

#### 1. 从简单开始，逐步扩展

**错误做法**：
```
❌ "帮我构建完整的供应商管理系统"
```

**正确做法**：
```
✅ "帮我写一个函数，计算供应商的加权得分"
✅ "现在添加数据验证"
✅ "现在整合到主系统中"
```

#### 2. 明确描述需求

**模糊**：
```
❌ "优化这段代码"
```

**清晰**：
```
✅ "优化这段 Python 代码，目标是：
1. 减少执行时间（当前 5 秒）
2. 降低内存使用（当前 500MB）
3. 保持可读性"
```

#### 3. 利用 Claude Code 的上下文能力

**最佳实践**：
```bash
# 让 Claude 了解整个项目
cd /path/to/project
claude  # 自动加载项目上下文

# 然后提问
"帮我理解供应商评估模块的架构"
```

---

### 工作流最佳实践

#### 场景 1：代码审查

```bash
# 审查代码变更
claude -p "审查以下代码变更：
1. 是否有 bug
2. 是否符合最佳实践
3. 如何改进" < git diff
```

#### 场景 2：问题排查

```bash
# 调试问题
claude -p "这个错误是什么意思？
如何修复？
ERROR: Supplier ranking calculation failed"
```

#### 场景 3：文档生成

```bash
# 生成文档
claude -p "为 supplier_evaluation.py 生成：
1. README 文档
2. API 文档
3. 使用示例"
```

---

### 配置优化

**推荐设置**（`~/.claude/config.json`）：
```json
{
  "model": "claude-sonnet-4-20250514",
  "timeout": 300000,
  "maxTokens": 200000,
  "temperature": 0.1,
  "editor": "code",
  "aliases": {
    "review": "-p 'Review this code for bugs, best practices, and improvements'",
    "explain": "-p 'Explain how this code works'",
    "test": "-p 'Generate unit tests for this code'"
  }
}
```

---

## 第三部分：Writing Effective Tools for Agents

### 核心概念

**什么是工具（Tool）？**

工具是 Agent（如 Claude）与外部世界交互的桥梁。

```
传统软件：函数调用（确定性）
  getWeather("NYC") → 总是返回相同结果

AI Agent：工具调用（非确定性）
  "今天要带伞吗？" → 可能调用天气工具，也可能问你在哪
```

---

### 编写高效工具的原则

#### 原则 1：少即是多

**错误**：
```python
# 太多工具，功能重叠
list_contacts()
get_contact_by_id()
search_contacts_by_name()
find_contacts_by_email()
```

**正确**：
```python
# 一个工具，多种用途
search_contacts(query, filters=None)
  # 可以按名字、邮箱、ID 搜索
```

---

#### 原则 2：返回有意义的信息

**错误**：
```python
# 返回技术细节，Agent 难以理解
{
  "uuid": "a1b2c3d4",
  "mime_type": "application/pdf",
  "internal_id": 12345
}
```

**正确**：
```python
# 返回人类可读的信息
{
  "name": "供应商合同模板",
  "file_type": "PDF",
  "id": "contract_001"  # 语义化 ID
}
```

---

#### 原则 3：工具描述要清晰

**模糊**：
```python
{
  "name": "get_supplier",
  "description": "获取供应商信息"  # 太笼统
}
```

**清晰**：
```python
{
  "name": "get_supplier_by_id",
  "description": "根据供应商 ID 获取详细信息，包括：名称、KPI、状态、联系方式。输入：供应商 ID（如 'S001'）。返回：供应商完整资料。",
}
```

---

### 实战：为供应商管理编写工具

#### 工具 1：供应商绩效查询

```python
{
  "name": "get_supplier_performance",
  "description": """查询供应商绩效数据。

输入参数：
- supplier_id: 供应商 ID（如 'S001'）
- period: 时间周期（如 '2026-03'，可选）

返回数据：
- 供应商名称
- KPI 得分（接通率、转化率、投诉率）
- 排名变化
- 风险等级""",
}
```

#### 工具 2：供应商风险分析

```python
{
  "name": "analyze_supplier_risk",
  "description": """分析供应商风险状况。

分析维度：
1. 合规风险（资质、证书）
2. 质量风险（KPI 趋势）
3. 运营风险（人员、场地）
4. 财务风险（付款记录）

返回：
- 风险等级（低/中/高）
- 具体风险点
- 建议措施""",
}
```

#### 工具 3：合同审查助手

```python
{
  "name": "review_supplier_contract",
  "description": """审查供应商合同的关键条款。

审查内容：
1. 付款条款（是否符合公司标准）
2. 违约责任（是否明确、合理）
3. 服务等级（SLA 是否可衡量）
4. 退出机制（是否清晰）

返回：
- 合规性评分
- 风险点列表
- 修改建议""",
}
```

---

### 工具评估方法

**Anthropic 的做法**：

1. **创建评估任务**（基于真实场景）
   ```
   任务：分析供应商 A 的 3 月绩效，给出改进建议

   预期工具调用：
   - get_supplier_performance(supplier_id='A', period='2026-03')
   - analyze_supplier_risk(supplier_id='A')

   预期输出：
   - 绩效总结
   - 风险分析
   - 改进建议
   ```

2. **运行评估**
   - 用 Claude Code 测试工具
   - 记录成功率、错误类型

3. **分析结果**
   - 哪些工具被正确使用？
   - 哪些工具被忽略或误用？
   - 如何改进工具描述？

4. **迭代优化**
   - 根据结果调整工具
   - 重新评估
   - 持续改进

---

## 学习行动计划

### 第 1 周：理解基础

**目标**：了解 Claude Code 的能力

**任务**：
- [ ] 阅读 Anthropic 内部使用案例（第一部分）
- [ ] 尝试 3 个简单命令：
  ```bash
  claude -p "解释供应商评估的算法"
  claude -p "为这段代码写注释" < supplier_eval.py
  claude -p "生成测试数据"
  ```

---

### 第 2 周：掌握最佳实践

**目标**：学会有效使用 Claude Code

**任务**：
- [ ] 阅读最佳实践（第二部分）
- [ ] 用 Claude Code 完成一个实际任务：
  ```bash
  # 分析供应商绩效数据
  claude -p "分析本月供应商 KPI 数据，
  找出需要关注的供应商，生成报告"
  ```

---

### 第 3 周：编写工具

**目标**：为供应商管理编写专用工具

**任务**：
- [ ] 阅读工具编写指南（第三部分）
- [ ] 创建 3 个工具：
  1. `get_supplier_performance`
  2. `analyze_supplier_risk`
  3. `review_supplier_contract`
- [ ] 测试工具效果

---

### 第 4 周：实战应用

**目标**：将工具整合到日常工作

**任务**：
- [ ] 用新工具完成周报
- [ ] 用新工具审查一份合同
- [ ] 记录效率提升情况

---

## 快速参考

### 常用命令

```bash
# 启动 Claude Code
claude

# 一次性任务
claude -p "你的问题"

# 从管道输入
cat data.csv | claude -p "分析这个数据"

# 代码审查
claude review < main.py

# 生成测试
claude test < supplier_eval.py
```

### 常见场景

| 场景 | 命令 |
|------|------|
| 分析数据 | `claude -p "分析 data.csv，找出异常值"` |
| 审查合同 | `claude -p "审查 contract.pdf 的风险条款"` |
| 生成报告 | `claude -p "根据分析结果生成周报"` |
| 编写测试 | `claude test < mymodule.py` |
| 调试代码 | `claude -p "调试这个错误：ERROR: ..."` |

---

## 年老师，今天就开始

**30 分钟快速上手**：

1. **打开终端**，运行：
   ```bash
   cd ~/Documents/projects/ai-agents/my-agent/projects/proj-1772240987779-zrc3gz
   claude
   ```

2. **尝试第一个任务**：
   ```
   帮我分析 outputs 目录下的文件，
   告诉我这个项目的结构和内容
   ```

3. **尝试第二个任务**：
   ```
   根据我的工作内容，
   推荐 3 个可以用 Claude Code 自动化的任务
   ```

4. **记录你的发现**

---

**下一步**：根据你的发现，选择一个实际任务开始实践。

有任何问题，随时问我！
