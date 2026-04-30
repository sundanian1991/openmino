---
name: khazix:legacy-vault
description: >-
  存档技能管理器。管理 ~/.claude/skills/_legacy/ 下的存档技能。
  当用户说"看看 legacy 里有什么"、"恢复 XX 技能"、"存档 XX"、"清理 XX"、"整理一下skills"时触发。
---

# Legacy Vault — 技能存档管理器

> 你把暂时不用的技能挪到 _legacy 里，而不是直接删。
> 这个技能负责"进出"管理。

---

## 存档位置

- **存档目录**: `~/.claude/skills/_legacy/`
- **技能目录**: `~/.claude/skills/`
- 移入存档 = 从技能目录移到存档目录，技能不再加载
- 移出存档 = 从存档目录移回技能目录，技能恢复加载

---

## 核心操作

### 1. 列出存档（list）

当用户说"看看 legacy 里有什么"、"查看存档"、"有哪些存档技能"时：

```bash
ls -la ~/.claude/skills/_legacy/
```

对每个子目录，检查是否有 SKILL.md 或 README.md，有的显示文件大小，没有的标注"空壳"。

输出格式：

```
Legacy Vault — 存档技能清单
─────────────────────────────────
总览：25 个存档，其中 0 个有内容，25 个空壳

[有内容的技能]（可恢复）：
  （无）

[空壳技能]（可清理）：
  autoplan, benchmark, browse, canary, careful, ...
```

### 2. 查看详情（inspect）

当用户说"看看 XX 里面有什么"、"XX 是什么"时：

```bash
ls -la ~/.claude/skills/_legacy/<name>/
```

如果有 SKILL.md 或 README.md，显示前 10 行内容。没有则说明是空壳。

### 3. 恢复技能（restore）

当用户说"恢复 XX"、"把 XX 放回去"、"XX 我想再用"时：

```bash
mv ~/.claude/skills/_legacy/<name>/ ~/.claude/skills/<name>
```

- 如果目标位置已有同名文件夹，提示冲突不执行
- 如果指定技能不在存档中，提示不存在
- 执行后告知用户技能已恢复，下次会话生效

### 4. 存档技能（archive）

当用户说"把 XX 存档"、"XX 先不用了放到 legacy 里"时：

```bash
mv ~/.claude/skills/<name>/ ~/.claude/skills/_legacy/<name>
```

- 如果存档中已有同名，提示冲突
- 如果技能目录中不存在，提示不存在
- 执行后告知用户技能已移入存档

### 5. 清理技能（clean）

当用户说"清理 XX"、"删除 XX"、"XX 不要了"时：

```bash
rm -rf ~/.claude/skills/_legacy/<name>
```

- **必须是空壳或用户明确说不要了**才执行删除
- 有内容的技能要二次确认："XX 的 SKILL.md 里写着...，确定要删吗？"
- 也可以批量清理所有空壳："清理所有空壳"

### 6. 整理建议（suggest）

当用户说"帮我看看哪些该存档"、"整理一下技能"时：

1. 扫描技能目录 `~/.claude/skills/` 中所有技能
2. 扫描存档目录 `~/.claude/skills/_legacy/` 中所有存档
3. 对照技能清单文档 `docs/skills-inventory-2026-04.md`（如果存在）
4. 给出建议：哪些低频技能可以存档，哪些存档可以清理

---

## 边界情况

| 情况 | 处理 |
|------|------|
| 恢复时目标已存在 | 报错：同名冲突，不执行 |
| 存档时存档中已存在 | 报错：先清理再存档 |
| 操作不存在的技能 | 报错：技能名不在列表中 |
| 批量操作 | "清理所有空壳"→ 逐个确认后执行 |
| 用户说"所有"、"全部" | 列出受影响列表，确认后再执行 |
