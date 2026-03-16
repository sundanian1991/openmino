---
pos: docs/prompt.md
input: 文档同步机制需求
output: 文件夹 README + 文件头注释补齐 + 执行机制
update: 需求变更时更新
---

# 项目定义：my-agent 文档同步机制

## 目标

**建立 my-agent 项目的文档同步机制**：
1. 每个文件夹有对应的 README.md（或 CLAUDE.md）
2. 每个 .md 文件有 `---` 头注释，格式：
   ```
   ---
   input: [依赖外部资源]
   output: [对外提供功能]
   pos: [系统局部地位]
   ---
   ```
3. 文件夹变化时自动同步更新所属 README

## 排除项

- [ ] 不改变现有项目结构
- [ ] 不修改代码逻辑
- [ ] 不引入重型文档工具

## 交付物

1. 缺失文件夹 README 补齐
2. 缺失文件头注释补齐
3. 文档同步检查脚本
4. Git pre-commit hook

## 完成标准

- [ ] 检查脚本运行无 ❌
- [ ] pre-commit hook 正常工作
- [ ] 机制写入项目 CLAUDE.md

## 约束条件

- 保持脚本执行时间 < 5 秒
- 不破坏现有文件内容
