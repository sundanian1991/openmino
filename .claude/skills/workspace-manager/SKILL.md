---
name: workspace-manager
description: 管理 workspace 目录，按项目规范创建新工作目录、验证命名格式、清理过期项目
---

# workspace-manager

按 CLAUDE.md workspace 规范管理 `/workspace/` 目录。

## 规范

**命名格式**：`序号-分类-主题-YYYYMMDD`

| 要素 | 规则 |
|------|------|
| 序号 | 从 `00` 开始递增，取当前最大值 +1。禁止重复 |
| 分类 | 供应商 / 技能 / 成长 / 记录 / 生活 / 工具 / 测试 / 结算 |
| 主题 | 简短中文描述 |
| 日期 | 格式 `YYYYMMDD`，取创建日期 |

## 用法

- **创建新项目**：`/workspace-manager new --category 供应商 --topic 名称`
  - 自动计算序号、日期，创建文件夹
- **检查规范**：`/workspace-manager check`
  - 扫描 workspace/ 下所有文件夹，验证命名合规
- **清理过期**：`/workspace-manager clean`
  - 列出 60 天以上未修改、且已迁移到 archive 或 docs 的目录

## 注意事项

- 只操作 workspace/ 目录，不触及 docs/、archive/ 等
- 清理前需年老师确认
