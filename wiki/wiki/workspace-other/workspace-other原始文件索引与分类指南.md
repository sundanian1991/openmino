# workspace-other原始文件索引与分类指南

> Sources: mino, 2026-04-28
> Raw: 全量索引

## Overview

workspace-other原始文件目录包含了274个文件，涵盖了从AI工具配置、知识库平台、数据可视化理论到供应商管理实践的广泛内容。本文章提供完整的文件索引和分类指南，帮助快速定位需要的信息。

## 文件分类体系

### 一、AI工具与平台（约30个文件）

| 子目录 | 文件数 | 内容 |
|--------|--------|------|
| Agent-Reach/ | ~20 | AI互联网接入平台，包含多语言文档、技能配置、平台指南 |
| OpenWiki/ | ~10 | 开源知识库平台，包含README、设计规范、发布说明 |
| 数据炼金师/ | ~5 | AI数据转换工具的SPEC和README |

### 二、数据可视化与讲故事（约15个文件）

| 子目录 | 文件数 | 内容 |
|--------|--------|------|
| ebooks/ | 2 | Storytelling with Data、Tufte的The Visual Display |
| test-data-storytelling/ | ~3 | 2026Q1供应商绩效汇报测试数据 |
| AI定价相关/ | ~5 | AI定价模式PPT演讲脚本、design-spec |

### 三、结算与项目交接（约5个文件）

| 子目录 | 文件数 | 内容 |
|--------|--------|------|
| 47-结算/ | ~5 | 新项目交接月会材料、结算交接文档 |

### 四、node_modules依赖（约225个文件）

大量来自数据炼金师项目的node_modules依赖README和CHANGELOG文件，包括：
- @anthropic-ai-sdk：Anthropic AI SDK
- @babel/*：Babel编译器套件
- express/*：Express Web框架
- 以及其他数百个npm包的文档文件

## 快速定位指南

### 查找AI工具配置

> Agent-Reach目录：互联网接入平台，支持Twitter、Reddit、微信、小红书等平台

### 查找知识库平台

> OpenWiki目录：开源知识库，v0.1.3到v0.2.0的版本演进

### 查找数据可视化理论

> ebooks目录：Storytelling with Data（Knaflic）和The Visual Display（Tufte）

### 查找供应商管理实践

> 47-结算目录：项目交接月会材料
> test-data-storytelling目录：绩效汇报测试案例

### 查找AI定价研究

> AI定价模式PPT目录：演讲脚本和设计规格

## 文件健康度分析

### 有价值的内容文件

约50个文件包含实质性的内容（非node_modules），涵盖：
- AI工具配置和使用指南
- 数据可视化理论
- 供应商管理实践
- 项目交接文档

### node_modules依赖文件

约225个文件是node_modules的README和CHANGELOG，这些是项目初始化时自动抓取的依赖文档。虽然包含有价值的技术信息，但大多数情况下不需要在wiki中单独归档。

## 索引维护建议

1. **定期清理**：移除无价值的node_modules文件
2. **新增索引**：当新文件加入时，更新本索引
3. **分类更新**：当文件数量或类型发生变化时，更新分类体系
