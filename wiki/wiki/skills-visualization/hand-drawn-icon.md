# Hand-Drawn Icon — 手绘 SVG 生成器

> Sources: mino, 2026-04-28
> Raw: ../../raw/skills/hand-drawn-icon-SKILL.md; ../../raw/skills/hand-drawn-icon-workflow-standard.md; ../../raw/skills/hand-drawn-icon-design-philosophy-color-table.md; ../../raw/skills/hand-drawn-icon-learning-summary-R1-R3.md; ../../raw/skills/hand-drawn-icon-curve-rhythm-analysis.md; ../../raw/skills/hand-drawn-icon-r3-analysis.md; ../../raw/skills/hand-drawn-icon-round1-analysis.md; ../../raw/skills/hand-drawn-icon-round2-analysis.md; ../../raw/skills/hand-drawn-icon-round3-analysis.md; ../../raw/skills/hand-drawn-icon-round3-final-analysis.md; ../../raw/skills/hand-drawn-icon-r3-spec-cup.md; ../../raw/skills/hand-drawn-icon-round3-spec-cup.md; ../../raw/skills/hand-drawn-icon-round3-spec-fan.md; ../../raw/skills/hand-drawn-icon-round1-spec-shrimp.md; ../../raw/skills/hand-drawn-icon-18次学习计划.md
> [v6-backup](../../raw/skills/hand-drawn-icon-SKILL-v6-backup.md)

## Overview

手绘风格 SVG 图标生成技能。风格来源为"李诞虾"（有机温暖风格），通过四色系统、呼吸式曲线节奏和线条分层，生成具有"手的温度"的手绘图标。采用简单/复杂双流程策略：简单图标通过 better-icons（Iconify）搜索直接使用，复杂图标通过 API 生成。

## 双流程架构

### 简单流程 — better-icons 搜索

适用于有标准 icon 库可搜索的图标（箭头、警告、生物轮廓、简单器物）。

1. 需求翻译成目标语言（如"警告图标" → "warning icon"）
2. 通过 Iconify API 搜索：`curl -s "https://api.iconify.design/search?query=warning"`
3. 导出候选 SVG：`curl -s "https://api.iconify.design/{collection}:{icon}.svg"`
4. 风格检查：确认 Iconify 图标与李诞虾风格一致后直接使用

**已验证可用的场景**：游泳场景中的警告三角（mingcute:warning-fill）、泳帽（hugeicons:swimming-cap）、泳镜（ph:goggles）、救生圈（ph:lifebuoy-fill）、浴巾（ph:towel-fill）、泳衣（icon-park:swimsuit）。验证结论：Iconify 的图标风格与李诞虾风格一致，简单图标可直接使用。

### 复杂流程 — API 生成

适用于无标准 icon、需有机曲线的图标（杯子、虾、树、生物）。

1. 编写设计指令：包含设计哲学（运动名称 + 3 句话）、风格体系（四色 + 线条 + 曲线节奏）、物体分析（结构分解 + 视角 + 复杂度）
2. 调用 API（每周 20 次额度）：POST 请求指定 style 为 "hand-drawn"
3. 验证输出：检查形状、颜色、线条是否符合规范

## 有机温暖设计哲学

核心运动是 **Organic Warmth（有机温暖）**，包含三条核心主张：

### 空间与形式 — 非几何有机感

- 拒绝完美对称和数学化坐标（如 `100.00`）
- 拥抱呼吸式曲线节奏（紧-松-紧，如 `11.14→28.25→43.46`）
- 让线条有"手的温度"而非机器精度
- 70% 小偏差（±5px）+ 30% 大偏差（±15-30px）

**反模式检测**：机械对称（`m85 45h80v120h-80z`）和规律抖动（偏差都在 ±10px）为反模式；真实手绘应体现不规则的曲线节奏。

### 色彩与情绪 — 温暖克制的对比

四色系统是核心配色方案：

| 颜色 | 色值 | 用途 |
|------|------|------|
| 陶土色 | #D6654B | 主体色调，生命感，焦点强调（≤2 处） |
| 米白 | #FEFFFE | 高光、背景、纸张感 |
| 深陶土 | #B03A21 | 阴影、深度、重量感（非强调色） |
| 墨黑 | #1A1612 | 唯一描边色 |

色彩分配原则：整体色调优先于分段涂色（不是"头一个色，身体一个色"）。陶土色象征生命与温度，少即是多。

### 工艺标准 — 线条中的层次

线条粗细分为三层，每层都有意义：

| 层级 | 粗细 | 功能 |
|------|------|------|
| 主轮廓 | 1.5-3px | 定义形状"这是什么" |
| 结构线 | 0.7-1.5px | 定义关系"怎么构成" |
| 细节线 | 0.25-0.7px | 增加温度"手绘感" |

强制属性：`stroke-linecap="round"` 和 `stroke-linejoin="round"`。

## 颜色分配决策树

颜色分配基于物体类型的判断：

- **活的/有生命的**（虾、猫、鸟、兔子）→ 陶土色贯穿全身（70%），米白作为高光点缀（≤20%），深陶土作为阴影（≤10%）
- **无生命/功能性**（杯子、碗、花瓶、书本）→ 米白为主（70%），陶土色点缀 ≤2 处（≤10%），深陶土底部阴影
- **重/稳定的物体** → 深陶土为主（50-70%），陶土色强调结构（20-30%）
- **抽象/装饰**（星星、圆点、箭头）→ 简化配色（≤2 色）

快速决策流程：判断物体是否活的 → 确定主色 → 确定强调位置 → 添加底部重量感 → 所有线条用墨黑描边。

## 标准化工作流程

采用"算法 70% + 人工 30%"（实际时间分配：算法 35%，人工 65%）的协作模式：

1. **分析需求（人工，10%）**：确定画什么、复杂度级别、焦点位置
2. **算法生成基础结构（算法，30%）**：使用 organic-curve-generator 生成基础 path、线条粗细配置、色彩填充代码
3. **人工微调关键细节（人工，40%）**：调整控制点间距（形成波浪式节奏）、随机化小数点位置、添加 ±1-5px 不对称偏差
4. **验证与迭代（人工，15%）**：检查曲线呼吸感、小数点不规则性、不对称性、色彩分配、线条分层
5. **输出 SVG（算法，5%）**：按照分层格式（fill-layer + stroke-layer）输出

算法优势在于快速生成基础结构、自动处理色彩填充和线条分层；局限在于控制点间距太均匀、小数点分布太规律、左右可能完美对称。人工的核心价值是注入"呼吸感"、打破"规律性"、制造"人性化"。

## 18 次学习计划

建立了系统化的学习序列来巩固年老师风格：

- **阶段 1（R1-R6）**：基础形态，建立核心曲线 DNA。从简单几何过渡到有机形态。R1 虾（基准验证）→ R2 猫（毛发质感）→ R3 杯子（体积感/开口）→ R4 树（分枝结构）→ R5 鱼（流线型动态）→ R6 房子（透视/层次）
- **阶段 2（R7-R12）**：生物特征，掌握生命感表达。R7 鸟（翅膀/羽毛）→ R8 碗（深度/容积）→ R9 花（花瓣层次）→ R10 狗（肢体动态）→ R11 椅子（结构/支撑）→ R12 叶子（叶脉纹理）
- **阶段 3（R13-R18）**：器物功能，掌握功能物体表达。R13 兔子 → R14 书本 → R15 太阳 → R16 汽车 → R17 山 → R18 人物头像

每次学习必须产出三个文件：spec 文档（Prompt 完整文档）、风格一致性分析、最终 SVG。分析维度包括曲线节奏、色彩系统、线条分层、陶土焦点、整体气质。

## API Prompt 模板结构

通用 Prompt 模板包含：风格标识（标注"年老师's Organic Warmth"）、视角指定（生物侧视、器物俯视、建筑正视、工具使用角度）、色彩配置（按类别分配）、线条分层（Quiver natural standard）、曲线要求（70/30 偏差分布）、结构分解（三层：主轮廓 → 内部结构 → 装饰纹理）、复杂度控制（简单 10-30 paths、中等 30-60、复杂 60-90）、输出格式（分层 SVG）。
