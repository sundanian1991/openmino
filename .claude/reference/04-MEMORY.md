---
input: 需求
output: 04-MEMORY.md
pos: .claude/reference/04-MEMORY.md
---

# 04-MEMORY.md — 高频记忆

> 30天内调用≥3次的核心信息

---

## 📋 进入标准

| 判断维度 | 标准 | 示例 |
|---------|------|------|
| **频率** | 30天内调用≥3次 | 搜索优先级、工具使用决策 |
| **价值** | 直接影响工作质量或效率 | WAL协议、EvoMap工作流 |
| **稳定性** | 不会频繁变化 | 核心工作理念、审美偏好 |
| **独特性** | 年老师特有的，不是通用规则 | 供应商管理方法论、沟通风格 |

---

## 🔴 L1 置顶区

> **权威位置**：`MEMORY-L1.md`（会话启动必读）
> 以下为快速索引，详细内容见 MEMORY-L1.md

| 主题 | 权威文件 |
|------|---------|
| WAL协议（先写后答） | MEMORY-L1.md |
| 核心工作理念（三问原则等） | MEMORY-L1.md |
| 四层记忆体系（daily→weekly→长期） | MEMORY-L1.md |
| Observer三维度 | MEMORY-L1.md |
| 沟通风格偏好（SCQA/STAR等） | MEMORY-L1.md |
| 审美偏好（Clean > Minimalist） | MEMORY-L1.md |
| 搜索优先级（tavily > Grep > getnote） | MEMORY-L1.md |
| EvoMap工作流 | MEMORY-L1.md |

---

## 🟠 L2 高频区

### 供应商管理核心方法论

- **生态经营**：从"甲方乙方"到"生态联盟"思维
- **体系复制**：个人经验 → 组织能力
- **敬畏风险**：合规视角（有规可依、合理、充分共识）
- **激活竞争**：用"选汰机制"打破供应商舒适区

---

### 技术配置与工具

| 配置项 | 内容 |
|--------|------|
| **Claude Code API** | 桌面端"选模型"和"底层API"分开；settings.json的env优先级 > 环境变量 |
| **TAVILY_API_KEY** | 已配置，tavily-mcp包可用 |
| **gh CLI** | 2.86.0，搜索功能可用 |

---

### 子代理系统工作流

| 子代理 | 模型 | 用途 |
|--------|------|------|
| **Explore** | haiku | 快速探索代码库 |
| **general-purpose** | sonnet | 复杂搜索、多步骤任务 |
| **Plan** | opus | 软件架构设计 |

---

### 任务管理规则

> **权威位置**：`07-WORK.md`（工作契约）
> 任务分类标准（简单≤3步 / 中等4-6步 / 复杂≥7步）详见 07-WORK.md

### 技能调用规范

> **权威位置**：`07-WORK.md`（工作契约）
> 调用前读 SKILL.md、检查输出目录、主动 AskUserQuestion 详见 07-WORK.md

---

*时新信息（L3-L5）见 MEMORY-L1.md 或归档文件*
