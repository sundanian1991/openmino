---
type: playbook
tags: [设计系统, mino-frontend, 重构, 颜色系统]
confidence: high
source: kw-workflow 2026-04-01
---

# mino-frontend v5.0 重构 Phase 1

**一句话**: 从14种风格简化到「风格 × 情绪」二维决策，Header颜色由内容情绪动态决定。

---

## 核心变更

### 1. 统一灰阶系统（6级）

所有风格共用：
```css
--gray-50: #FAFAFA;   /* 斑马纹、卡片 */
--gray-100: #F5F5F5;  /* hover */
--gray-200: #E5E5E5;  /* 边框 */
--gray-400: #999999;  /* 次要文字 */
--gray-600: #666666;  /* 正文 */
--gray-900: #111111;  /* 主标题、表头 */
```

### 2. 情绪颜色系统（5种）

Header颜色由内容情绪决定：

| 情绪 | Header | 关键词 |
|------|--------|--------|
| 紧迫 | `#8B0000` | 处罚、风险、警告 |
| 中性 | `#111` | 数据、排名、常规 |
| 庆祝 | `#E2725B` | 成功、激励、突破 |
| 权威 | `#0d7680` | 战略、金融、年度 |
| 奢华 | `#D4AF37` | 颁奖、盛典、荣誉 |

### 3. 新增 Reference 文件

| 文件 | 用途 |
|------|------|
| `color-system.md` | 统一灰阶 + 情绪颜色映射 |
| `decision-matrix.md` | 风格 × 情绪 二维决策矩阵 |
| `icon-usage.md` | 图标使用规范 + better-icons 整合 |

---

## 决策流程

```
内容 → 提取情绪关键词 → 确定情绪标签 → 选择基础风格 → 确定Header颜色 → 生成
```

**优先级**: 紧迫 > 庆祝 > 权威 > 奢华 > 中性

---

## 使用示例

### 示例 1: 供应商处罚通报

- 关键词: "处罚" → 紧迫
- Header: `#8B0000`（深红）
- 强调色: `#8B0000`

### 示例 2: 业绩冲刺激励

- 关键词: "冲刺""激励" → 庆祝
- Header: `#E2725B`（陶土）
- 强调色: `#D4AF37`或`#E2725B`

### 示例 3: 数据排名通报

- 关键词: "排名" → 中性
- Header: `#111`（炭黑）
- 强调色: `#E2725B`

---

## 相关学习

- [color-system.md](.claude/skills/mino-frontend/references/color-system.md)
- [decision-matrix.md](.claude/skills/mino-frontend/references/decision-matrix.md)
- [icon-usage.md](.claude/skills/mino-frontend/references/icon-usage.md)
- [mino-frontend SKILL.md](.claude/skills/mino-frontend/SKILL.md)
