---
input: Skills 懒加载优化
output: Skills 集成详细规划
pos: workspace/skills-integration-plan.md
---

# Skills 集成详细规划

> 问题：Skills 列表在系统提示中硬编码，AI 无法直接修改
> 方案：通过配置文件和引用机制实现懒加载

---

## 🔍 问题分析

### 当前状态

**Skills 列表位置**：系统提示中（每次会话自动加载）

**内容量**：
- 60+ 个技能
- 每个技能包含完整描述
- 估算占用：~3000-5000 tokens

**已有优化文件**：
- `.claude/skills/SKILLS-QUICK-INDEX.md`（快速索引，~300 tokens）

### 为什么 AI 无法直接修改

系统提示是平台级别的配置，不在项目文件中。我能修改的是项目内的文件（如 `.claude/` 目录），但无法触及系统提示。

---

## 🎯 解决方案

### 方案 A：修改 MyAgents 配置（推荐）

**适用场景**：MyAgents 支持自定义 Skills 列表

**操作步骤**：

```
步骤 1：找到 MyAgents 配置文件
位置：~/.myagents/config.json 或类似路径

步骤 2：修改 Skills 加载方式
从：加载每个技能的完整 SKILL.md
改为：加载 SKILLS-QUICK-INDEX.md

步骤 3：配置 Skills 目录
skillsDir: ./.claude/skills
skillsIndex: SKILLS-QUICK-INDEX.md

步骤 4：配置懒加载机制
onDemand: true  # 调用时再读完整 SKILL.md
```

**预期收益**：减少 ~2700 tokens/会话（**90%**）

---

### 方案 B：修改项目级 CLAUDE.md

**适用场景**：MyAgents 读取项目 CLAUDE.md

**操作步骤**：

```
步骤 1：在 CLAUDE.md 中添加 Skills 引用

## 🛠️ Skills 快速索引

详见：[SKILLS-QUICK-INDEX.md](.claude/skills/SKILLS-QUICK-INDEX.md)

### 高频技能（每周用）
- weekly-report: 周报生成
- document-writer: 公文起草
- plan: 规划模式
...

步骤 2：删除系统提示中的 Skills 列表
（需要手动操作）

步骤 3：重启会话验证
```

**风险**：如果系统提示仍加载完整列表，则无效

---

### 方案 C：使用 Hook 自动替换（高级）

**适用场景**：MyAgents 支持 Hooks

**操作步骤**：

```
步骤 1：创建 Hook 脚本
文件：.claude/hooks/skills-loader.js

步骤 2：Hook 逻辑
- 会话启动时，读取 SKILLS-QUICK-INDEX.md
- 将内容注入到系统提示中
- 替换原有的 Skills 列表

步骤 3：配置 Hook
在 ~/.myagents/config.json 中添加：
"hooks": {
  "beforeSession": ".claude/hooks/skills-loader.js"
}
```

**技术难度**：需要 JavaScript 开发能力

---

## 📋 推荐执行步骤（按优先级）

### 第一优先级：方案 A（修改 MyAgents 配置）

**前置检查**：
1. 查找 MyAgents 配置文件位置
2. 确认是否支持自定义 Skills 加载
3. 备份原配置文件

**执行命令**：
```bash
# 查找配置文件
ls -la ~/.myagents/

# 查看配置内容
cat ~/.myagents/config.json

# 备份配置
cp ~/.myagents/config.json ~/.myagents/config.json.backup
```

**修改内容**（如果支持）：
```json
{
  "skills": {
    "indexFile": ".claude/skills/SKILLS-QUICK-INDEX.md",
    "lazyLoad": true,
    "onDemandRead": true
  }
}
```

---

### 第二优先级：方案 B（修改 CLAUDE.md）

**执行步骤**：
1. 在 CLAUDE.md 中添加 Skills 快速索引引用
2. 尝试删除系统提示中的 Skills 列表
3. 重启会话验证

**验证方式**：
- 检查会话提示中的 Skills 列表长度
- 确认是否从 ~3000 tokens 降到 ~300 tokens

---

### 第三优先级：方案 C（Hook 自动替换）

**前提条件**：
- 方案 A 和 B 都无效
- MyAgents 支持 Hooks
- 有 JavaScript 开发能力

---

## ⚠️ 风险评估

| 方案 | 风险 | 收益 | 推荐度 |
|------|------|------|--------|
| **方案 A** | 低（需要确认配置支持） | 高（90% tokens 减少） | ⭐⭐⭐⭐⭐ |
| **方案 B** | 中（系统提示可能仍加载） | 中（可能无效） | ⭐⭐⭐ |
| **方案 C** | 高（需要开发） | 高（自动化） | ⭐⭐ |

---

## 🎯 预期总收益

如果方案 A 成功执行：

| 优化项 | 减少 |
|--------|------|
| **MEMORY-L1** | ~500 tokens（已完成） |
| **Skills 懒加载** | ~2700 tokens |
| **总计** | ~3200 tokens/会话（**约 40%**） |

---

## 📝 执行检查清单

### 执行前
- [ ] 备份 MyAgents 配置文件
- [ ] 确认配置文件位置
- [ ] 阅读 SKILLS-QUICK-INDEX.md 内容

### 执行中
- [ ] 按方案 A 修改配置
- [ ] 重启 MyAgents（如需要）
- [ ] 启动新会话验证

### 执行后
- [ ] 检查会话提示长度
- [ ] 确认 Skills 列表是否缩短
- [ ] 测试技能调用是否正常

---

## 💡 备选方案

如果以上方案都无效，可以：

**选项 1**：保持现状，接受 3000 tokens 开销
- 理由：Skills 是核心功能，稳定性优先

**选项 2**：定期清理 Skills 列表
- 每月审查一次，删除不常用的技能
- 手动维护 SKILLS-QUICK-INDEX.md

**选项 3**：联系 MyAgents 开发者
- 请求支持 Skills 懒加载功能
- 提交功能建议

---

*Skills 集成规划完成时间：2026-03-07*
