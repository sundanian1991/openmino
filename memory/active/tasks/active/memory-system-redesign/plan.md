---
input: 现有记忆体系问题、年老师需求
output: 记忆体系重构方案
pos: memory-system-redesign 任务的规划文档
---

# Plan — 记忆体系重构

> **目标**：简化记忆体系，让它更实用、更可落地、更自动化

---

## 问题分析

### 现有设计问题

| 问题 | 说明 | 根因 |
|------|------|------|
| **staging/ 空置** | 理论上的"新文件中转区"从未被使用 | 流转链太复杂，实际操作时直接分类 |
| **transient/ 空置** | P2临时记录机制未启用 | 没有明确的使用场景 |
| **context/ 定位不清** | 只有模板文件，不知道放什么 | 与 memory 核心功能无关 |
| **UPDATE_MEMORY 手动** | 需要手动执行，经常忘记 | 没有自动化触发机制 |
| **Archive 机制未执行** | 超期文件未归档 | 生命周期管理未自动化 |

### 设计理念问题

**过度设计**：记忆体系被设计成类似计算机内存的层级结构（P0/P1/P2/staging），但实际上：

1. **人脑记忆 ≠ 机器内存** — 不需要"中转区"
2. **记录时就应该知道类型** — 不需要先放 staging 再分类
3. **流转成本太高** — 多一步操作就多一次遗忘的机会

---

## 新架构设计

### 核心原则

> **简单 > 完美，实用 > 理论**

1. **按用途分类，不按生命周期** — 记录时就知道这是长期还是短期
2. **自动化优先** — 能自动的不要手动
3. **职责单一** — 每个目录有明确用途，不模糊

### 新目录结构

```
memory/
├── core/                  # P0 永久核心（不变）
│   ├── decisions/         # 决策记录（WAL 触发）
│   ├── preferences/       # 用户偏好
│   └── identity/          # 身份认知
│
├── active/                # P1 活跃记忆（不变）
│   ├── daily/            # 日记记录（30天内）
│   ├── my-thoughts/      # 思考记录
│   ├── observations/     # 月度观察
│   ├── weekly/           # 周文档
│   └── tasks/            # 任务系统
│
├── workspace/            # 🆕 工作空间（重定义 staging）
│   ├── drafts/           # 草稿文件
│   ├── research/         # 研究资料
│   └── temp/             # 临时文件（随时清理）
│
├── context/              # 🆕 项目上下文（重定义）
│   ├── projects/         # 项目相关上下文
│   └── shared/           # 跨会话共享知识
│
├── archive/              # 归档（不变）
│   ├── daily/           # 历史 daily
│   ├── observations/    # 历史观察
│   └── weekly/          # 历史周文档
│
└── README.md             # 体系说明
```

### 目录用途重定义

| 目录 | 旧用途 | 🆕 新用途 | 使用场景 |
|------|--------|----------|----------|
| **staging/** | 新文件中转区（废弃） | **workspace/** - 工作空间 | 正在编辑的草稿、研究资料 |
| **transient/** | P2临时30天（废弃） | **workspace/temp/** - 临时文件 | 抓取的数据、中间结果 |
| **context/** | 模板文件（废弃） | **项目上下文** | 项目相关背景信息、共享知识 |

---

## 自动化方案

### 1. UPDATE_MEMORY 自动化

**创建定时任务脚本**：`scripts/auto-update-memory.sh`

```bash
#!/bin/bash
# 每周日自动执行 UPDATE_MEMORY
# 通过 launchd 定时触发

WORK_DIR="$HOME/Documents/projects/ai-agents/my-agent"
cd "$WORK_DIR" || exit 1

# 调用 UPDATE_MEMORY command
echo "[$(date)] 开始执行 UPDATE_MEMORY..."

# 这里调用 Claude Code 的 command 执行
# 需要通过 CLI 触发
```

**Launchd 配置**：`~/Library/LaunchAgents/com.mino.update-memory.plist`

```xml
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0">
<dict>
    <key>Label</key>
    <string>com.mino.update-memory</string>
    <key>ProgramArguments</key>
    <array>
        <string>/bin/bash</string>
        <string>/Users/sundanian/Documents/projects/ai-agents/my-agent/scripts/auto-update-memory.sh</string>
    </array>
    <key>StartCalendarInterval</key>
    <dict>
        <key>Weekday</key>
        <integer>1</integer>  <!-- 周一 -->
        <key>Hour</key>
        <integer>9</integer>  <!-- 早上9点 -->
    </dict>
</dict>
</plist>
```

### 2. 生命周期自动清理

**增强 lifecycle_manager.py**：
- 集成到 UPDATE_MEMORY 流程
- 自动归档超期文件到 archive/
- 自动删除 P2 过期文件

### 3. 索引自动更新

**增强 index_manager.py**：
- 创建 daily 文件时自动更新索引
- UPDATE_MEMORY 时自动更新索引

---

## 简化的流转规则

### 旧规则（复杂）

```
新文件 → staging/ → active/ → transient/ → 删除
              ↓           ↓
           core/      archive/
```

### 🆕 新规则（简单）

```
记录时直接分类：
├── 长期价值 → core/
├── 短期活跃 → active/
├── 工作草稿 → workspace/
├── 项目上下文 → context/
└── 无价值 → 不记录

定期处理（每周）：
├── active/ 超期 → archive/ 或 删除
├── workspace/ 清理 → 删除或归档
└── 提炼洞察 → core/
```

---

## 落地计划

### Phase 1: 目录重构（立即）
- [ ] 重命名 staging/ → workspace/
- [ ] 重定义 context/ 用途
- [ ] 删除 transient/（合并到 workspace/temp/）
- [ ] 更新 memory/CLAUDE.md

### Phase 2: 自动化脚本（本周）
- [ ] 创建 auto-update-memory.sh
- [ ] 创建 launchd plist
- [ ] 测试定时执行

### Phase 3: 生命周期增强（下周）
- [ ] 增强 lifecycle_manager.py
- [ ] 集成到 UPDATE_MEMORY
- [ ] 测试归档流程

### Phase 4: 文档更新（同步）
- [ ] 更新 04-MEMORY.md
- [ ] 更新 UPDATE_MEMORY.md
- [ ] 更新 06-NOW.md

---

## 风险评估

| 风险 | 影响 | 缓解措施 |
|------|------|---------|
| **目录重命名破坏现有引用** | 高 | 先备份，逐步迁移 |
| **自动化脚本执行失败** | 中 | 添加日志，手动兜底 |
| **launchd 配置错误** | 中 | 测试后再启用 |
| **数据丢失（误删）** | 高 | 删除前先 git commit |

---

## 成功标准

- [ ] 目录结构清晰，每个目录有明确用途
- [ ] UPDATE_MEMORY 每周自动执行
- [ ] 生命周期自动管理，无需手动干预
- [ ] 索引自动更新，保持最新
- [ ] 文档完整，新人也能理解

---

*最后更新：2026-03-14*
