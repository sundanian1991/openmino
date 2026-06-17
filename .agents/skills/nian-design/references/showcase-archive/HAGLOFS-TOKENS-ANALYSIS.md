# Haglöfs H 系列 Token 分析报告

## 文件范围
26 个 Haglöfs 相关的 H 系列文件

## Token 使用汇总

### 一、命名分类

| 命名风格 | Token 示例 | 数量 |
|---------|-----------|-----|
| `--color-*` | --color-offwhite, --color-charcoal | ~15 |
| `--brand-*` | --brand-primary, --brand-secondary | 6 |
| `--text-*` | --text-primary, --text-secondary | 12 |
| `--bg-*` | --bg, --bg-alt, --bg-dark | 8 |
| `--signal-*` | --signal-red, --signal-warning | 10 |
| `--accent-*` | --accent-orange, --accent-clay | ~15 |
| `--border-*` | --border, --border-strong | 6 |
| `--font-*` | --font-display, --font-mono | 6 |
| `--space-*` | --space-xs, --space-lg | 8 |
| 简写 | --td, --tp, --ts, --fd, --fb | ~20 |

### 二、颜色值分散情况

同一个语义颜色使用了多种命名：
- **主色/黑色**：--td, --text-display, --color-charcoal, --primary-darkgray, --pk, --accent (#2C2C2C / #2D2A26 / #1A1816)
- **绿色系**：--brand-primary, --color-forest, --primary-forest, --accent-forest (#4A6741 / #3A5A4A)
- **橙色**：--org, --accent-orange, --signal-orange (#E55B2B)
- **背景色**：--bg, --color-offwhite (#FAFAF8 / #F5F3EF / #FAF9F6)

### 三、标准化建议

统一替换为 Nian 14 色：

| 当前（多种） | 统一后 |
|------------|-------|
| --td, --text-display, --color-charcoal, --pk | --td |
| --tp, --text-primary | --tp |
| --ts, --text-secondary, --color-stone | --ts |
| --tda, --text-disabled, --text-tertiary | --tda |
| --bg, --color-offwhite | --bg |
| --surface, --bg-card | --surface |
| --brand-primary, --color-forest | --forest |
| --brand-secondary, --color-moss | --moss |
| --org, --accent-orange | --org |
| --glacier, --scene-glacier | --glacier |
| --olive, --primary-olive | --olive |
| --earth, --primary-earth | --earth |
| --fd, --font-display | --fd |
| --fb, --font-body | --fb |
| --fm, --font-mono | --fm |

### 四、需要清理的文件
26 个文件都需要统一 token 系统

---

*生成时间：2026-06-09*
