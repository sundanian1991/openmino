# Decisions — Claude Code 学习体系

> 2026-06-03 | nian-ui Phase 1

---

## 前置问卷结果

| 项 | 选择 |
|---|------|
| 开始方式 | Surprise me — 自动组合 |
| 图片占位 | 不需要 |
| 站点类型 | 多页站点 |
| 场景色 | Olive `#4A5D3A` — 增长、权威、生命力 |
| 导演参考 | Christopher Nolan — 时间操控、理性结构、IMAX 规模（仅结构） |

---

## 场景色正当性声明

Claude Code 学习是一个从工具到工作流、从新手到大师的成长叙事。Olive 的增长、权威与生命力恰好承载这条叙事线——起点是 CLI 工具的原始生产力，终点是体系化工作流的掌控力。Nolan 的理性结构确保每一步递进都清晰可辨。

---

## Previous-work audit

Workspace 中无 Claude Code 学习体系相关的历史可视化输出。无重叠风险。

---

## Shell-ban list

| 禁止项 | 理由 |
|--------|------|
| 卡片网格全覆盖 | 太多 AI 学习页面用卡片网格，需避免模板感 |
| 时间线布局 | 学习路径不是物理时间线，用 corridor 递进更合适 |
| 标签页切换分割组件 | 多页站点不需要页面内标签切换 |
| 填充图标 | nian 禁止填充图标，用文字和间距建立层级 |

---

## Primary composition family

**Corridor（主叙事）+ Archive Wall（七大组件）**

- Corridor：学习之旅的递进节奏，每步一个知识点，符合 Nolan 的理性结构
- Archive Wall：七大组件同屏排列，一目了然，适合概览性内容
- 最近一次输出（supplier-management）使用了 panoramic slab，此次避开

---

## Nolan 结构翻译

| Nolan 技法 | Web 翻译 | 运用位置 |
|-----------|---------|---------|
| Time manipulation | 章节间可跳转/回溯，非线性导航 | 全局导航、学习路径页 |
| IMAX scale | Hero 文字 96-120px，占据全屏视野 | Hero 页、每页首屏 |
| Rational structure | 清晰分层，组件的逻辑分类 | 七大组件页、工作流页 |
| Multi-layered narrative | 表面快览 + 深层细节 | 所有信息页（summary → detail） |

---

## 页面结构

| # | 页面 | 构图 | 内容 |
|---|------|------|------|
| 1 | Hero | Full-bleed | 学习体系总览、一句话定位 |
| 2 | 七大核心组件 | Archive Wall | 7 组件卡片，按使用频率排列 |
| 3 | 透明工作流 | Corridor | 5 步工作流，每步一屏 |
| 4 | 个性化升级 + 架构 | Split | CLAUDE.md 分层 + Hooks 自动化 |
| 5 | 学习路径 + 掌握指标 | Metric Grid | 路径图 + 关键指标 |
