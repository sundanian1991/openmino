# 目录迁移计划 — Lifecycle 架构版

**目标**：建立清晰的 lifecycle 流转体系（Workspace → Docs → Memory）

**创建时间**：2026-03-16

---

## 一、核心原则

### Lifecycle 流转架构

```
Workspace（入口区）
    ↓
  周度回顾
    ↓
    ├─→ Docs（归档区）— 正式文档、已完成项目
    └─→ Memory（核心区）— 高价值洞察、核心记忆
```

### 各区域定位

| 区域 | 定位 | 内容类型 | 留存周期 |
|------|------|---------|---------|
| **Workspace** | 入口区 | 临时文件、草稿、周任务 | 周度清理 |
| **Docs** | 归档区 | 正式文档、项目交付物 | 长期保留 |
| **Memory** | 核心区 | 洞察、偏好、决策、核心记忆 | 永久保留 |
| **mino/** | 私有空间 | mino 私有内容 | 不动 |

### 三大分类体系

所有内容按主题分为三大类，在每个区域中保持一致：

1. **供应商管理** — 核心日常工作
2. **个人成长** — 个人发展
3. **家庭关系** — 家庭相关

---

## 二、当前问题诊断

### 问题 1：空目录浪费

| 目录 | 状态 | 处理 |
|------|------|------|
| `root/供应商管理/` | 5 个空子目录，0 字节 | 删除 |
| `business/` | 仅 .DS_Store，几乎空 | 删除 |

### 问题 2：重复的中文分类目录

| 分类 | 位置 A | 位置 B | 状态 |
|------|--------|--------|------|
| **供应商管理** | `workspace/供应商管理/` | `memory/active/供应商管理/` | ✅ 保留（不同用途） |
| **家庭关系** | `workspace/家庭关系/` | `memory/active/家庭关系/` | ✅ 保留（不同用途） |
| **个人成长** | `workspace/个人成长/` | `memory/active/个人成长/` | ✅ 保留（不同用途） |

**说明**：这不是重复，是 lifecycle 的不同阶段。
- `workspace/` = 入口区（临时/草稿）
- `memory/active/` = 核心区（高价值记忆）

### 问题 3：供应商管理子目录缺失

`workspace/供应商管理/` 缺少 5 个子分类：
- 人力规划
- 供应商引入
- 供应商评估
- 成本分析
- 日常沟通

---

## 三、目标结构

### 原则

1. **mino/ 完整保留** - 不做任何改动
2. **Workspace 作为入口** - 所有新内容从这里开始
3. **Lifecycle 流转** - 周度回顾后决定去向（Docs 或 Memory）
4. **单源目录** - 每个分类在每个区域只有一个位置

### 目标目录树

```
my-agent/
├── mino/                          # ✅ 保留不动（私有空间）
│   ├── memory/
│   └── workspace/
│
├── workspace/                     # ✅ 入口区（临时/草稿/周任务）
│   ├── 供应商管理/                # ← 工作入口
│   │   ├── 人力规划/
│   │   ├── 供应商引入/
│   │   ├── 供应商评估/
│   │   ├── 成本分析/
│   │   ├── 日常沟通/
│   │   └── temp/
│   ├── 个人成长/
│   ├── 家庭关系/
│   ├── archive/                   # 周归档（待移动到 docs/）
│   └── temp/                      # 临时文件（定期清理）
│
├── docs/                          # ✅ 归档区（正式文档）
│   ├── supplier-kb/
│   ├── 项目/
│   └── ...
│
├── memory/active/                 # ✅ 核心区（高价值记忆）
│   ├── daily/
│   ├── observations/
│   ├── my-thoughts/
│   ├── goals/
│   ├── tasks/
│   ├── weekly/
│   ├── 供应商管理/                # ← 核心洞察（非全部工作文档）
│   ├── 家庭关系/                  # ← 核心洞察
│   └── 个人成长/                  # ← 核心洞察
│
└── projects/                      # ✅ 项目归档
    └── proj-*/

❌ 删除：
- 供应商管理/ (root 下的空目录)
- business/ (空目录)
```

---

## 四、迁移步骤

### Phase 1: 清理空目录（5 分钟）

#### Step 1.1: 删除 root 供应商管理

```bash
# 确认是空的
ls -la 供应商管理/

# 删除
rm -rf 供应商管理/

# 验证
test -d 供应商管理 && echo "❌ 仍存在" || echo "✅ 已删除"
```

#### Step 1.2: 删除 business 目录

```bash
# 确认内容
ls -la business/

# 删除
rm -rf business/

# 验证
test -d business && echo "❌ 仍存在" || echo "✅ 已删除"
```

### Phase 2: 建立 Workspace 子结构（3 分钟）

#### Step 2.1: 创建供应商管理 5 个子目录

```bash
# 创建子目录
mkdir -p workspace/供应商管理/人力规划
mkdir -p workspace/供应商管理/供应商引入
mkdir -p workspace/供应商管理/供应商评估
mkdir -p workspace/供应商管理/成本分析
mkdir -p workspace/供应商管理/日常沟通
mkdir -p workspace/供应商管理/temp

# 验证
ls -la workspace/供应商管理/
```

#### Step 2.2: 整理现有内容

```bash
# 如果 workspace/供应商管理/ 下已有文件，按主题移动
# 示例：
# mv workspace/供应商管理/*.md workspace/供应商管理/日常沟通/
```

### Phase 3: 验证与提交（2 分钟）

#### Step 3.1: 验证结构

```bash
# 确认 mino/ 完整
test -d mino/memory && echo "✅ mino/完整" || echo "❌ mino/受损"

# 确认 workspace 结构
ls -la workspace/供应商管理/
# 应该看到：人力规划/ 供应商引入/ 供应商评估/ 成本分析/ 日常沟通/ temp/

# 确认 memory 结构
ls memory/active/ | grep -E "供应商 | 家庭 | 个人"
# 应该看到：供应商管理/ 家庭关系/ 个人成长/
```

#### Step 3.2: 提交变更

```bash
git status
git add -A
git commit -m "refactor: 建立 lifecycle 目录架构（Workspace→Docs→Memory）"
git push
```

---

## 五、执行清单

### 执行前检查

- [ ] 确认 `mino/` 目录内容已检查（不需要备份，因为不改动）
- [ ] 确认 `workspace/` 下有需要保留的内容
- [ ] 理解 lifecycle 流转原则（不是 consolidation）

### 执行清单

| 步骤 | 操作 | 风险 | 预计时间 |
|------|------|------|---------|
| 1.1 | 删除 root 供应商管理 | 低（已确认空）| 30 秒 |
| 1.2 | 删除 business | 低（已确认空）| 30 秒 |
| 2.1 | 创建 workspace 子目录 | 无 | 1 分钟 |
| 2.2 | 整理现有内容 | 低（按需移动）| 2 分钟 |
| 3.1-3.2 | 验证 + 提交 | 无 | 2 分钟 |
| **总计** | | | **~5 分钟** |

---

## 六、Lifecycle 流转规则

### Workspace → Docs

**触发条件**（满足任意一条）：
- 文档已定稿
- 项目已完成
- 需要长期参考但非核心记忆

**执行方式**：
```bash
# 周度回顾时移动
mv workspace/供应商管理/xxx.md docs/supplier-kb/
```

### Workspace → Memory

**触发条件**（满足任意一条）：
- 提炼出核心洞察
- 形成可复用的模式/方法论
- 偏好、决策、身份相关内容

**执行方式**：
```bash
# 提炼后移动到 memory/active/
mv workspace/供应商管理/xxx.md memory/active/供应商管理/
```

### Memory 内部流转

```
memory/active/ → memory/archive/ （90 天未更新）
memory/core/ （永久保留，不移动）
```

---

## 七、周度工作流

### 每周一
1. 从 `workspace/供应商管理/5 个子目录` 开始本周工作
2. 创建周文档：`workspace/week/YYYY-Www.md`

### 每周五/周六
1. 回顾本周工作
2. 清理 `workspace/temp/`
3. 移动已完成文档：
   - 正式文档 → `docs/`
   - 核心洞察 → `memory/active/`
   - 无用草稿 → 删除

### 每周日
1. 更新 `memory/active/weekly/` 周文档
2. 归档旧周文档到 `workspace/archive/`

---

## 八、供应商管理子目录用途

| 子目录 | 内容示例 | 流转目标 |
|--------|---------|---------|
| **人力规划** | 坐席规划、人力预测 | docs/supplier-kb/ |
| **供应商引入** | 准入评估、测试报告 | docs/supplier-kb/ |
| **供应商评估** | 月度评分卡、季度评估 | docs/supplier-kb/ + memory/ |
| **成本分析** | 单价分析、成本优化方案 | docs/supplier-kb/ |
| **日常沟通** | 周会纪要、临时需求 | workspace only（周清） |
| **temp/** | 草稿、临时文件 | 周清 |

---

## 九、验证脚本

**一键验证脚本**：

```bash
#!/bin/bash
set -e

echo "🔍 验证目录迁移..."

# 1. 验证空目录已删除
echo "1. 验证空目录删除..."
test -d 供应商管理 && echo "  ❌ 供应商管理/ 仍存在" || echo "  ✅ 供应商管理/ 已删除"
test -d business && echo "  ❌ business/ 仍存在" || echo "  ✅ business/ 已删除"

# 2. 验证 workspace 结构
echo "2. 验证 workspace 结构..."
for dir in 人力规划 供应商引入 供应商评估 成本分析 日常沟通 temp; do
    test -d "workspace/供应商管理/$dir" && echo "  ✅ $dir/" || echo "  ❌ $dir/ 缺失"
done

# 3. 验证 memory 结构
echo "3. 验证 memory 结构..."
test -d memory/active/供应商管理 && echo "  ✅ memory/active/供应商管理/" || echo "  ❌ 缺失"
test -d memory/active/家庭关系 && echo "  ✅ memory/active/家庭关系/" || echo "  ❌ 缺失"
test -d memory/active/个人成长 && echo "  ✅ memory/active/个人成长/" || echo "  ❌ 缺失"

# 4. 验证 mino 完整
echo "4. 验证 mino 完整..."
test -d mino/memory && echo "  ✅ mino/memory/ 完整" || echo "  ❌ mino/memory/ 受损"

echo "🎉 验证完成！"
```

---

## 十、一键执行脚本

```bash
#!/bin/bash
set -e

echo "🚀 开始目录迁移（Lifecycle 架构）..."

# Step 1: 删除空目录
echo "🗑️  删除空目录..."
rm -rf 供应商管理/
rm -rf business/

# Step 2: 创建 workspace 子目录
echo "📂 创建 workspace 子结构..."
for dir in 人力规划 供应商引入 供应商评估 成本分析 日常沟通 temp; do
    mkdir -p "workspace/供应商管理/$dir"
done

# Step 3: 验证
echo "✅ 验证结果..."
test -d mino/memory && echo "  ✅ mino/完整" || echo "  ❌ mino/受损"
test -d 供应商管理 && echo "  ❌ 供应商管理/仍存在" || echo "  ✅ 供应商管理/已删除"
test -d business && echo "  ❌ business/仍存在" || echo "  ✅ business/已删除"

echo "📊 workspace/供应商管理/ 结构:"
ls -la workspace/供应商管理/

echo "🎉 迁移完成！"
echo ""
echo "下一步："
echo "  1. git add -A"
echo "  2. git commit -m 'refactor: 建立 lifecycle 目录架构'"
echo "  3. git push"
```

---

## 十一、风险与回滚

### 风险评估

| 风险 | 可能性 | 影响 | 缓解措施 |
|------|--------|------|---------|
| 误删内容 | 低 | 中 | 删除前已确认目录为空 |
| mino/被误删 | 极低 | 高 | 明确不执行任何对 mino/ 的操作 |
| 路径引用断裂 | 中 | 低 | 脚本/文档中的硬编码路径需要更新 |

### 回滚方案

```bash
# 如需要恢复删除的空目录（一般不需要）
mkdir -p 供应商管理/{人力规划，供应商引入，供应商评估，成本分析，日常沟通}
mkdir -p business/
```

---

## 十二、后续优化建议

### 建议 1：创建 DIRECTORY.md

在根目录创建 `DIRECTORY.md` 说明每个目录的用途：

```markdown
# 目录用途说明

- `workspace/` — 入口区（临时/草稿/周任务，周度清理）
- `docs/` — 归档区（正式文档，长期保留）
- `memory/active/` — 核心区（高价值记忆，永久保留）
- `mino/` — 私有空间（不改动）
- `projects/` — 项目归档
```

### 建议 2：自动化周度清理

创建脚本定期清理 `workspace/temp/`：

```bash
# scripts/weekly-cleanup.sh
find workspace/temp/ -type f -mtime +7 -delete
```

### 建议 3：建立命名规范

- 中文目录：仅用于主题分类（供应商管理、个人成长、家庭关系）
- 英文目录：其他所有位置（系统目录、功能目录）

---

*创建时间：2026-03-16*
*执行优先级：高*
*预计风险：低*
*预计时间：~5 分钟*
