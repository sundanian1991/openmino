## 目标

对项目的文件体系进行四项整理，使 docs/、workspace/、plans/、memory/ 四个区域各归其位、命名统一、方便调用。

## 四个需求

### R1: plan5 文件归位到 plans/
- 当前 plan5 的 docs/prompt.md、docs/plans.md、docs/documentation.md 放在了 docs/
- 应改为放在 plans/ 目录下
- 需要确认：后续所有 plan5 工作流的产出都进 plans/

### R2: workspace/archive/ 命名对齐
- archive 下有 ongoing/、projects/、scattered/ 三个子目录
- 当前命名与 workspace/ 的 `NN-类别-描述-YYYYMMDD` 不一致（本身也不需要一致，archive 有自己的规范）
- **需要确认**：年老师说的"把它们的命名与 Workspace 里边的保持一致"，是指 archive 内部文件的命名，还是指 archive 的整体结构？

### R3: workspace/ 00-48 内容提炼与分流
- 48 个 workspace 文件夹中，部分内容有长期价值
- 文档类 → 提炼到 docs/ 对应子目录
- 评价/议论/洞察类 → 提炼到 memory/ 对应目录
- 技能类产出 → 保留在 workspace 或归档
- 临时文件 → 评估是否清理

### R4: docs/ 目录归类重组
- 当前问题：供应商相关内容分散在 `供应商/`、`供应商管理/`、`供应商管理制度/` 三个目录
- knowledge/ 与 workspace-knowledge/ 有交集
- plan-templates/ 在 docs/ 和 workspace-knowledge/ 都有
- 图表复刻/ 定位不清
- **目标**：重新归类，同类型放一起，命名统一，方便调用
- **约束**：knowledge/ 区域尽量不动

## 排除项

- 不删除任何文件，只移动/重命名
- 不修改文件内容
- 不处理 .DS_Store 等系统文件
- 不处理 memory/ 内部结构（已较完善）
- 不处理 .claude/ 下的配置

## 交付物

1. plans/ 中 plan5 规则更新（如果需要改 CLAUDE.md）
2. workspace/archive/ 命名统一方案（待确认范围）
3. workspace/ 00-48 内容提炼清单（哪些分流到 docs/、memory/）
4. docs/ 重组方案（新的一级目录结构 + 迁移映射表）
5. 执行后的目录结构验证

## 完成标准

- plan5 产出文件在 plans/ 中
- docs/ 一级目录 ≤6 个，无重复主题
- 供应商相关内容统一在一个目录下
- workspace/ 中有长期价值的内容已提炼到对应区域
