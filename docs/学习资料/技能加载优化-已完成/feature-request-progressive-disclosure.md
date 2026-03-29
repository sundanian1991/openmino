# Feature Request: 支持 Skills 的 Progressive Disclosure 加载机制

## 问题描述

当前 MyAgents 启动时会完整加载所有技能的 `SKILL.md` 文件内容，导致启动 token 消耗过高（约 30K+ tokens）。

**实际测量**：
- 核心规则文件：~6K tokens
- 技能文件（31 个 SKILL.md）：~109K tokens
- 系统消息：~25-50K tokens
- **合计：约 140-165K tokens**

## 预期行为

根据 `skill-creator` 技能的定义，Skills 应该使用三层渐进披露加载系统：

```
1. Metadata (name + description) - 始终加载 (~100 words)
2. SKILL.md body - 触发时加载 (<500 lines ideal)
3. Bundled resources - 按需加载 (unlimited)
```

**当前状态**：
- ✅ Metadata 始终加载
- ❌ SKILL.md body 在启动时就全量加载（应该触发时才加载）
- ✅ Bundled resources 按需加载

## 技术建议

### 方案 1：支持 .skill 打包文件（推荐）

`skill-creator` 已经提供了打包脚本（`scripts/package_skill.py`），可以将技能打包成 `.skill` 文件（zip 格式）。

**建议实现**：
1. 支持从 `.skill` 文件加载技能
2. 加载时只提取 YAML frontmatter（metadata）
3. 技能触发时才解压加载完整的 SKILL.md

**目录结构**：
```
~/.myagents/skills/
├── docx.skill          # 打包文件
├── pdf.skill
└── xlsx.skill
```

### 方案 2：延迟加载 SKILL.md body

保持当前目录结构，但修改加载逻辑：
1. 启动时只读取每个 SKILL.md 的前 20 行（metadata）
2. 技能触发时再加载完整内容

## 影响

### 用户收益
- 启动 token 降低约 **70%**（从 140K → 40K）
- 会话启动更快
- 成本降低

### 兼容性
- 向后兼容：目录结构的技能仍然可用
- 迁移路径：提供工具将目录技能打包成 `.skill`

## 测试数据

当前技能大小统计：
```
frontend-slides:     1097 lines (32KB)
skill-creator:        485 lines (14KB)
self-improving-agent: 408 lines (14KB)
pdf:                  294 lines (7KB)
xlsx:                 288 lines (10KB)
```

## 参考资料

- `skill-creator` 技能定义的 Progressive Disclosure 规范
- `scripts/package_skill.py` 打包脚本
- Claude Agent SDK 技能加载机制

---

**优先级**：中等（不影响功能，但显著影响体验）
**复杂度**：中（需要修改技能加载器）
**标签**：enhancement, performance, skills

---

*Created by: user feedback*
*Date: 2026-03-17*
