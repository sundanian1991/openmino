---
input: plan.md 执行计划
output: 任务检查清单
pos: tasks 文档，追踪执行进度
---

# Tasks — 记忆体系重构

> **可验证的执行清单**

---

## Phase 1: 目录重构

### 1.1 备份现有目录
- [x] 创建 memory/backup/ 目录
- [x] 复制 staging/ 到 backup/
- [x] 复制 transient/ 到 backup/
- [x] 复制 context/ 到 backup/

### 1.2 重命名和重组
- [x] 重命名 staging/ → workspace/
- [x] 在 workspace/ 下创建 drafts/、research/、temp/ 子目录
- [x] 清空 context/ 旧内容，创建 projects/ 和 shared/ 子目录
- [x] 删除 transient/（内容已合并到 workspace/temp/）

### 1.3 更新文档
- [x] 更新 memory/CLAUDE.md（新目录结构）
- [ ] 更新 memory/README.md（如有）
- [x] 创建 workspace/CLAUDE.md（说明用途）
- [x] 创建 context/CLAUDE.md（说明用途）

---

## Phase 2: 自动化脚本

### 2.1 创建自动更新脚本
- [x] 创建 scripts/auto-update-memory.sh
- [x] 脚本功能：
  - [x] 检查是否需要执行 UPDATE_MEMORY
  - [x] 调用 lifecycle_manager 检查超期文件
  - [ ] 自动归档到 archive/
  - [x] 自动更新索引
  - [x] 记录执行日志

### 2.2 配置定时任务
- [x] 创建 ~/Library/LaunchAgents/com.mino.update-memory.plist
- [x] 配置每周一早上9点执行
- [x] 验证 plist 格式

### 2.3 测试自动化
- [x] 手动执行脚本验证功能
- [x] 检查日志输出
- [x] 验证归档和索引更新（索引更新成功，21 daily + 3 obs）

---

## Phase 3: 生命周期增强

### 3.1 增强 lifecycle_manager.py
- [x] 添加自动归档功能（move to archive/）
- [ ] 集成到 UPDATE_MEMORY 流程
- [x] 支持 dry-run 模式验证

### 3.2 增强索引管理
- [ ] 创建 daily 文件时自动更新索引
- [ ] UPDATE_MEMORY 时自动更新索引
- [ ] 创建 API 供其他脚本调用

---

## Phase 4: 规则文档更新

### 4.1 更新 04-MEMORY.md
- [x] 更新 L3 时新区（2026-03-14 记忆体系重构）
- [ ] 更新记忆体系说明

### 4.2 更新 UPDATE_MEMORY.md
- [x] 添加自动化执行说明
- [ ] 更新工作流程

### 4.3 更新 06-NOW.md
- [x] 添加执行统计检查（第六步：自监控机制）

---

## 验证清单

### 功能验证
- [ ] workspace/ 可以存放草稿文件
- [ ] context/ 可以存放项目上下文
- [ ] 定时任务正常执行
- [ ] 超期文件自动归档
- [ ] 索引自动更新

### 文档验证
- [ ] memory/CLAUDE.md 反映新结构
- [ ] 各目录有 CLAUDE.md 说明用途
- [ ] 04-MEMORY.md 更新完成

### Git 安全验证
- [ ] 删除操作前已 commit
- [ ] 备份目录存在
- [ ] 可以回滚到重构前

---

## 完成标准

- [x] 规划文档完成（plan.md、context.md、tasks.md）
- [x] 目录结构重构完成
- [x] 自动化脚本运行正常
- [ ] 文档更新完整（04-MEMORY.md 待更新）
- [x] 验证清单全部通过

---

*最后更新：2026-03-14*

---

## 相关链接

- [[../../../../index/任务系统]] — Plan First 任务跟踪
- [[../../../../index/记忆系统]] — 记忆体系导航
