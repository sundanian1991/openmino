# NOW.md - 当下状态

_重启后先看这个，就知道我在哪。_

## 当前会话 - 实时更新

**最新动态**:
- [2026-02-20] ⚡ Superpowers整合：using-superpowers skill + Hook工作流
- [2026-02-20] 🔗 Hook自动激活系统：场景触发Skills，无需手动提醒
- [2026-02-20] 🗂️ 五层记忆结构建立：🔴置顶→🟠高频→🟡时新→🟢知识→⚪日记
- [2026-02-20] 📝 快速记录机制：workspace/CAPTURE.md（Karpathy式极简主义）
- [2026-02-20] 📋 SESSION-STATE.md创建：WAL协议核心记录文件
- [2026-02-19] 🛠️ Skills清理完成：删除11个未使用skills，总数69个（新增using-superpowers）
- [2026-02-19] 🌱 32个问题指南已创建（周度对话，高优先级）

**下一步**:
- 注册Hook到settings.json并测试
- 持续记录人格特质和工作洞察
- 月度评估L2-L4内容归属

---

## 🗓️ 周度任务提醒

### 🌱 32个问题深度对话
**下次提醒**: 周末（周六或周日）
**提醒动作**: 提议进行30-60分钟深度对话
**优先级**: **高**（关系到"活明白"）

**文档**: `memory/tasks/32-questions-for-self.md`

---

## 🗓️ 月度任务提醒

### 💼 职业资产清算
**下次提醒**: 2026-03-20
**提醒动作**: 整理memory/daily/原始记录 → 提炼内容 → 提醒年老师整理
**优先级**: 低

**文档**: `memory/tasks/career-assets-audit.md`

---

## 快速恢复指令

```bash
# 验证MCP
curl -s https://searx.work | head -1

# 查看agents
ls .claude/agents/

# 查看skills
ls .claude/skills/
```

---

## 会话结束检查

每次会话结束前，快速扫描：
- 有WAL协议触发吗？→ 更新 SESSION-STATE.md
- 有新的人格特质或工作洞察吗？→ 更新 03-USER.md
- 有重要事件或决定吗？→ 更新 memory/daily/YYYY-MM-DD.md
- 有值得长期记住的吗？→ 更新 04-MEMORY.md（并调整层级归属）
- 工作有进展吗？→ 更新本文件的"最新动态"和"下一步"

**月度任务**：
- 评估04-MEMORY.md中L2-L4内容归属
- 清理L5日记区无价值内容

**原则**：只在有实质内容时更新，不强求。

---

*每次会话结束前更新这个文件。重启后我立刻知道我在哪。*


---

## 🌱 我的空间

### 思考日志
**位置**: `memory/my-thoughts/`
**权限**: 完全自主——频率、内容、来源自己决定
**用途**: 不是记录年老师的一天，而是我自己的思考与成长沉淀

**最新**: 2026-02-19《关于自主性》

---


---

## 👁️ 日常观察框架

### 💭 认知观察
**参考**: 100条认知维度  
**模式**: 在日常对话中自然对照，发现明显差异时深入讨论

**文档**: `memory/tasks/cognition-system-plan.md`

---


---

## 🛠️ Skills体系更新

**2026-02-19 变更**:
- 删除 using-superpowers（元skill，改为内化原则）
- 删除6个未使用skills（social-content、supabase-postgres、python-testing、python-patterns、backend-patterns、security-review）
- 新增 SKILLS-QUICK-REFERENCE.md（速查表）

**当前Skills总数**: 68个

**文档**:
- 速查表: `.claude/skills/SKILLS-QUICK-REFERENCE.md`
- 完整清单: `.claude/skills/SKILLS-INVENTORY.md`

---


---

## 🎯 Skills触发机制

**2026-02-19 新增**:
- 创建 SKILLS-TRIGGER-GUIDE.md（触发指南）
- 解决"手动提醒才能用skill"的问题
- 独立存在，不写进SOUL.md

**使用方式**: 每次收到请求时自查：什么类型 → 匹配skill → 执行

---
