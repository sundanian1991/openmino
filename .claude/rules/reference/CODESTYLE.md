---
input: CLAUDE.md 拆分需求
output: 代码规范与 Git 工作流详细规则
pos: .claude/rules/reference/CODESTYLE.md
---

# CODESTYLE.md — 代码规范与 Git 工作流

> 从 CLAUDE.md 拆分而来，按需读取

---

## 代码风格规范

### 命名规范

| 类型 | 规范 | 示例 |
|------|------|------|
| **变量/函数** | camelCase | `calculateTotal`, `userName` |
| **文件/组件** | PascalCase | `UserProfile.tsx`, `CLAUDE.md` |
| **常量** | UPPER_SNAKE | `MAX_RETRIES`, `API_KEY` |
| **CSS 类** | kebab-case | `user-profile`, `btn-primary` |

### 注释规范

- **代码本身**：英文
- **注释**：简体中文
- **Git 提交**：英文开头，中文说明（可选）

### 文件格式

- **Markdown**：LF 换行，UTF-8 编码
- **头注释**：所有 `.md` 文件必须有 `---` 头（input/output/pos）

---

## Git 工作流

### 分支命名

| 类型 | 格式 | 示例 |
|------|------|------|
| 新功能 | `feat/xxx` | `feat/supplier-evaluation` |
| Bug 修复 | `fix/xxx` | `fix/plan-first-hook` |
| 文档 | `docs/xxx` | `docs/claude-md-update` |
| 重构 | `refactor/xxx` | `refactor/memory-system` |

### Commit 格式

```
type: description

可选：详细说明（多行）
```

**type 取值**：`feat`, `fix`, `docs`, `refactor`, `chore`, `test`

### 禁止操作

| 操作 | 风险 | 替代方案 |
|------|------|---------|
| `--no-verify` | 跳过安全检查 | 修复问题后新建提交 |
| `git reset --hard` | 丢失未提交更改 | `git restore` 或 `git stash` |
| `git push --force` (main) | 覆盖远程历史 | `git revert` + 新提交 |
| `git commit --amend` | 修改已发布提交 | 新建提交 |

### 提交流程

```
1. git status → 查看状态
2. git diff → 查看变更
3. git add <具体文件> → 添加文件（不用 -A 或 .）
4. git commit -m "消息"
5. git status → 验证成功
```

---

## 文档同步机制

**核心规则**：
1. 每个文件夹必须有 README.md 或 CLAUDE.md
2. 每个 `.md` 文件必须有 `---` 头注释
3. 文件夹变化需同步更新所属 README

**新增文件操作清单**：
1. 在文件顶部添加 `---` 头注释
2. 更新所属文件夹的 README.md
3. 结构变更则更新 CLAUDE.md

---

*代码规范与 Git 工作流，按需读取*
