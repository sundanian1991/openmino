---
input: system 需求
output: MEMORY-OPTIMIZATION.md 文档
pos: memory/active/tasks/system/MEMORY-OPTIMIZATION.md
---

# 记忆体系优化方案

> 借鉴OpenViking核心思路，优化现有记忆架构

---

## 核心思想

**文件系统范式 + 按需加载 + 自动流转**

---

## 优化点1：明确加载策略

### 当前问题
- 04-MEMORY分层清晰（L1-L5），但没说什么时候加载哪层
- 会话启动时读什么文件，不够明确

### 优化方案

| 层级 | 加载时机 | 说明 |
|------|---------|------|
| L1（置顶） | 每次会话启动 | WAL协议、命名称谓、核心理念 |
| L2（高频） | 按需加载 | 搜索优先级、工具使用、EvoMap工作流 |
| L3（时新） | 按需加载 | 最近7天事件，需要详情才读 |
| L4（知识） | 按需加载 | 供应商管理、Technical Knowledge等大块内容 |
| L5（日记） | 不加载 | 原始记录，查询时才读 |

**会话启动流程**：
1. 读06-NOW.md（知道在哪、最近讨论）
2. 读04-MEMORY的L1区（核心规则）
3. 其他内容按需读

---

## 优化点2：添加索引机制

### 当前问题
- memory/daily/有几十个文件，找某个日期的内容要遍历
- memory/observations/按月分，但没快速索引

### 优化方案

给关键目录添加.index文件：

```yaml
# memory/daily/.index
version: "1.0"
last_updated: "2026-02-23"

files:
  - file: "2026-02-23.md"
    date: "2026-02-23"
    tags: ["obsidian-claude", "ultrawork", "memory-system"]
    summary: "完成Obsidian+Claude深度阅读工作流，创建记忆管理系统方案"
    lifecycle: "P1"
  - file: "2026-02-22.md"
    date: "2026-02-22"
    tags: ["observer", "自我进化", "habits"]
    summary: "深夜对话：从被动到主动，自我进化的起点"
    lifecycle: "P1"
```

**查询逻辑**：
1. 先读.index
2. 按标签/日期筛选
3. 读具体文件

---

## 优化点3：生命周期管理

### 当前问题
- daily文件没有自动清理机制
- 文件越来越多，检索变慢

### 优化方案

参考WAL协议的P0/P1/P2，给记忆加生命周期：

| 生命周期 | 定义 | 保留周期 | 自动清理 |
|---------|------|---------|---------|
| P0 | 核心决策、重大洞察、错误教训 | 永久 | 不清理 |
| P1 | 重要进展、工作里程碑 | 90天 | 超期清理 |
| P2 | 常规记录、临时数据 | 30天 | 超期清理 |

**清理触发**：
- 每周UPDATE_MEMORY时检查
- 超期P2文件：内容提取到周文档后删除
- 超期P1文件：保留90天，之后进入审查

---

## 优化点4：记忆流转机制

### 当前问题
- daily→observations→长期记忆的流转不够明确
- 什么时候从daily提炼到observations？什么时候提炼到04-MEMORY？

### 优化方案

**流转规则**：

```
daily（原始事实）
  ↓ [有价值且复用]
observations（提炼洞察）
  ↓ [反复验证、稳定]
04-MEMORY（长期知识）
```

**触发条件**：

| 转换 | 触发条件 | 执行者 |
|------|---------|--------|
| daily → observations | 同一洞察出现≥3次，或有人格/工作模式层面价值 | observer |
| observations → 04-MEMORY | 洞察稳定≥30天，或经年老师确认重要 | UPDATE_MEMORY |

**判断标准**：
- 这个洞察是否解释了年老师的某个行为？
- 这个洞察是否改变了我对他的理解？
- 这个洞察是否能指导未来的工作？

---

## 优化点5：索引文件格式

### .index 文件结构

```yaml
# memory/{目录}/.index
version: "1.0"
last_updated: "2026-02-23T12:00:00"

files:
  - filename: "2026-02-23.md"
    created: "2026-02-23T12:00:00"
    lifecycle: "P1"
    tags: ["obsidian-claude", "ultrawork"]
    summary: "完成Obsidian+Claude深度阅读工作流"
    references: []  # 引用此内容的其他文件
  ...
```

### 索引更新时机
- 创建新文件时
- 修改文件tags/summary时
- UPDATE_MEMORY时

---

## 优化点6：快速检索逻辑

### 查询优先级

```
1. 先查 06-NOW.md（近期、热门）
2. 再查 04-MEMORY L1（核心规则）
3. 再查 memory/daily/.index
4. 最后查 memory/observations/
```

### 搜索关键词映射

| 关键词类型 | 首查位置 |
|-----------|---------|
| "最近讨论" | 06-NOW.md |
| "WAL协议" | 04-MEMORY L1 |
| "供应商" | 04-MEMORY L4 或 observations |
| 具体日期 | memory/daily/.index |
| "观察报告" | memory/observations/ |

---

## 实施计划

### 第1步：创建.index模板
- memory/daily/.index
- memory/observations/.index

### 第2步：优化06-NOW.md
- 明确加载顺序
- 添加快速检索说明

### 第3步：清理旧daily文件
- 按生命周期标记
- 90天+的P2文件清理

### 第4步：更新UPDATE_MEMORY流程
- 加入生命周期检查
- 加入索引更新

---

## 不需要做的

- ❌ 不创建新的.py脚本（我们没有OpenClaw多Agent系统）
- ❌ 不改变文件结构（现有的daily/observations/很好）
- ❌ 不创建共享记忆层（我们是单Agent，不需要）

---

## 核心原则

**借鉴思路，不照搬架构**

OpenViking的精华是：
1. 文件系统范式（我们已有）
2. 按需加载（可以更明确）
3. 索引机制（可以加上）
4. 生命周期管理（可以明确规则）

不是它的三层架构、共享层那些东西。

---

*最后更新：2026-02-23*