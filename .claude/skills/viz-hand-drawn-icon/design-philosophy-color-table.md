# 设计哲学与颜色配置表 — 年老师风格

> v7.0 — 2026-04-04
> 目标：不是手绘风格，是年老师风格。每一次生成 SVG，别人一眼就能辨认出"这是同一种风格"。

---

## 设计哲学宣言

### 核心运动：Organic Warmth（有机温暖）

**三条核心主张**：

#### 1. 空间与形式 — 非几何有机感

- 拒绝完美对称和数学化坐标（如 `100.00`）
- 拥抱呼吸式曲线节奏（紧-松-紧，如 `11.14→28.25→43.46`）
- 让线条有"手的温度"而非机器精度
- 70% 小偏差（±5px）+ 30% 大偏差（±15-30px）

**反模式检测**：
- ❌ 机械对称：`m85 45h80v120h-80z`
- ❌ 规律抖动：`m85.27 45.27c12.37-1.83 25.18-0.91 37.62-0.87`（偏差都在 ±10px）
- ✅ 真实手绘：`m18.72 41.09c11.14 7.83 28.25 9.87 43.46 9.83`

#### 2. 色彩与情绪 — 温暖克制的对比

- 整体色调优先于分段涂色（不是"头一个色，身体一个色"）
- 陶土色 = 生命与温度的象征
- 少即是多：≤2 处陶土色焦点
- 深陶土 = 阴影与重量感（不是强调色）

**四色系统**：
- 陶土色 `#D6654B` — 主体色调，生命感
- 米白 `#FEFFFE` — 高光、背景、纸张感
- 深陶土 `#B03A21` — 阴影、深度、重量感
- 墨黑 `#1A1612` — 唯一描边色

#### 3. 工艺标准 — 线条中的层次

- 粗中细三分层，每层都有意义
- 主轮廓（1.5-3px）— 定义形状"这是什么"
- 结构线（0.7-1.5px）— 定义关系"怎么构成"
- 细节线（0.25-0.7px）— 增加温度"手绘感"
- 强制 round 属性：stroke-linecap="round" stroke-linejoin="round"

---

## 颜色配置表（5 大类别）

### 1. 生物类（活的/有生命的）— 陶土色主体

| 物体 | 主色（70%） | 点缀色（≤20%） | 阴影色（≤10%） | 焦点位置 | 陶土色数量 |
|------|-----------|--------------|--------------|---------|-----------|
| **虾/鱼类** | 陶土 #D6654B | 米白 #FEFFFE（腹部高光） | 深陶土 #B03A21（尾部阴影） | 全身贯穿 | 全身 |
| **猫/狗** | 米白 #FEFFFE | 陶土 #D6654B（耳朵/尾巴） | 深陶土 #B03A21（底部阴影） | 耳朵/眼睛 | 1-2 处 |
| **鸟类** | 米白 #FEFFFE | 陶土 #D6654B（翅膀/冠） | 深陶土 #B03A21（翅膀边缘） | 翅膀中央 | 1 处 |
| **兔子** | 米白 #FEFFFE | 陶土 #D6654B（长耳/短尾） | 深陶土 #B03A21（脚底） | 耳朵 | 1-2 处 |

**设计原则**：
- 活物 = 有温度 = 陶土色贯穿全身（如虾）或米白主体+陶土点缀（如猫）
- 不分段涂色（不是"头一个色，身体一个色，尾巴一个色"）
- 高光用米白（不是"主体米白+局部陶土"）

---

### 2. 器物类（无生命/功能性）— 米白主体

| 物体 | 主色（70%） | 点缀色（≤10%） | 阴影色（≤10%） | 焦点位置 | 陶土色数量 |
|------|-----------|--------------|--------------|---------|-----------|
| **杯子** | 米白 #FEFFFE | 陶土 #D6654B（把手） | 深陶土 #B03A21（杯底） | 把手 | 1 处 |
| **碗** | 米白 #FEFFFE | 陶土 #D6654B（碗沿） | 深陶土 #B03A21（碗底） | 碗沿 | 1 处 |
| **花瓶** | 米白 #FEFFFE | 陶土 #D6654B（瓶颈/瓶口） | 深陶土 #B03A21（瓶底） | 瓶颈 | 1-2 处 |
| **盘子** | 米白 #FEFFFE | 陶土 #D6654B（边缘花纹） | 深陶土 #B03A21（底部） | 盘心 | 0-1 处 |
| **书本** | 米白 #FEFFFE | 陶土 #D6654B（封面/书脊） | 深陶土 #B03A21（书底） | 封面 | 1 处 |
| **椅子** | 米白 #FEFFFE | 陶土 #D6654B（座位/靠背） | 深陶土 #B03A21（椅脚） | 座位 | 1 处 |

**设计原则**：
- 无生命 = 干净简洁 = 米白为主（70%）
- 陶土色点缀 ≤2 处（把手、高光、边缘）
- 重/稳定的物体用深陶土为主色

---

### 3. 建筑类（结构/层次）— 正视图为主

| 物体 | 主色（70%） | 点缀色（≤20%） | 阴影色（≤10%） | 焦点位置 | 陶土色数量 |
|------|-----------|--------------|--------------|---------|-----------|
| **房子** | 米白 #FEFFFE | 陶土 #D6654B（屋顶/门） | 深陶土 #B03A21（地基/窗户阴影） | 屋顶线条 | 1-2 处 |
| **树** | 米白 #FEFFFE（树干） | 陶土 #D6654B（树冠） | 深陶土 #B03A21（树下阴影） | 树冠顶部 | 1 处 |
| **桌子** | 米白 #FEFFFE（桌面） | 陶土 #D6654B（桌腿） | 深陶土 #B03A21（桌底） | 桌面纹理 | 1-2 处 |

**设计原则**：
- 结构清晰 = 正视图为主
- 陶土色强调功能性部分（屋顶、门、支撑）
- 深陶土用于底部支撑和深度

---

### 4. 工具类（使用状态）— 使用角度优先

| 物体 | 主色（70%） | 点缀色（≤20%） | 阴影色（≤10%） | 焦点位置 | 陶土色数量 |
|------|-----------|--------------|--------------|---------|-----------|
| **剪刀** | 米白 #FEFFFE | 陶土 #D6654B（手柄） | 深陶土 #B03A21（刀刃阴影） | 手柄握点 | 1 处 |
| **锤子** | 米白 #FEFFFE（柄） | 陶土 #D6654B（锤头） | 深陶土 #B03A21（锤底） | 锤头顶面 | 1 处 |
| **钥匙** | 米白 #FEFFFE | 陶土 #D6654B（齿部） | 深陶土 #B03A21（匙孔） | 齿部纹理 | 1 处 |

**设计原则**：
- 使用角度优先（剪刀=张开，锤子=平放）
- 陶土色标示"关键操作部位"
- 米白用于"手握部位"

---

### 5. 抽象类（装饰元素）— 简化配色

| 物体 | 主色（70%） | 点缀色（≤20%） | 阴影色（≤10%） | 焦点位置 | 陶土色数量 |
|------|-----------|--------------|--------------|---------|-----------|
| **星星** | 米白 #FEFFFE | 陶土 #D6654B（中心） | 深陶土 #B03A21（边缘） | 星星中心 | 1 处 |
| **圆点** | 陶土 #D6654B | 米白 #FEFFFE（高光） | 深陶土 #B03A21（底部） | 圆心 | - |
| **箭头** | 米白 #FEFFFE | 陶土 #D6654B（箭尖） | 深陶土 #B03A21（箭尾） | 箭尖端点 | 1 处 |
| **太阳** | 陶土 #D6654B | 米白 #FEFFFE（边缘） | 深陶土 #B03A21（光芒间隙） | 中心 | - |

**设计原则**：
- 装饰元素 = 不要太规律
- 陶土色用于"视觉焦点"
- 点缀性质，不影响主体识别
- 简化配色（≤2 色）

---

## 颜色分配决策树

```
判断物体类型
    │
    ├─ 活的/有生命？
    │   └─ 陶土色贯穿全身（70%）
    │       米白作为高光点缀（≤20%）
    │       深陶土作为阴影（≤10%）
    │
    ├─ 无生命/功能性？
    │   └─ 米白为主（70%）
    │       陶土色点缀 ≤2 处（≤10%）
    │       深陶土底部阴影（≤10%）
    │
    ├─ 重/稳定的？
    │   └─ 深陶土为主（50-70%）
    │       陶土色强调结构（20-30%）
    │       米白高光（≤10%）
    │
    └─ 抽象/装饰？
        └─ 简化配色（≤2 色）
            陶土色作为焦点
            米白作为对比
```

---

## 快速决策流程（执行时用）

| 步骤 | 问题 | 答案 | 动作 |
|------|------|------|------|
| 1 | 这个物体是活的吗？ | 是 → 陶土色主体<br>否 → 米白主体 | 确定主色 |
| 2 | 需要强调哪个部分？ | [焦点位置 1]<br>[焦点位置 2] | 陶土色点缀 ≤2 处 |
| 3 | 底部需要重量感吗？ | 是 → 添加深陶土<br>否 → 可选 | 深陶土阴影 |
| 4 | 所有线条用什么色？ | - | 墨黑 #1A1612 描边 |

---

## API Prompt 模板（通用结构）

```text
A hand-drawn [物体名称] in organic, warm style.

【风格标识】
Style: 年老师's Organic Warmth — recognizable hand-drawn aesthetic
Key characteristics: non-geometric, breathing curve rhythm, warm terracotta accents

【视角指定】
Perspective: [根据类别选择]
- 生物类: Side view (可倾斜 10-20°)
- 器物类: Slightly elevated top-down view (15-30°)
- 建筑类: Front view
- 工具类: [使用角度，如: scissors in open position]
- 抽象类: [最清晰的角度]

【色彩配置】
Color philosophy:
- Main body: [主色 #HEX] throughout (overall tone, not segmented)
- Accents: [点缀色 #HEX] for [焦点位置 1] and [焦点位置 2] (minimal use, ≤2 focal points)
- Shadows: [阴影色 #HEX] for [阴影位置]
- Strokes: Ink black #1A1612 for all outlines

【线条分层】
Line hierarchy (Quiver natural standard):
- Main outline: 1.5-3px (defines shape)
- Structure lines: 0.7-1.5px (defines relationships)
- Detail lines: 0.25-0.7px (adds warmth)

【曲线要求】
Curve rhythm:
- 70% small deviations (±5px)
- 30% large deviations (±15-30px)
- Wave-style breathing: tight-loose-tight rhythm
- Avoid: mechanical symmetry, regular jitter, .00 coordinates

【结构分解】
Structure composition (3 layers):
1. Main outline: Single continuous path defining the silhouette
2. Internal structure: Functional divisions from large to small
3. Decorative texture: Minimal, organic touches for warmth

【复杂度控制】
Complexity: [简单/中等/复杂]
- Simple: 10-30 paths, ≤20% detail
- Medium: 30-60 paths, 30-40% detail
- Complex: 60-90 paths, 40-50% detail

【输出格式】
SVG format with:
- <g id="fill-layer"> for fills
- <g id="stroke-layer"> for strokes
- All strokes: stroke-linecap="round" stroke-linejoin="round"
```

---

## 示例 Prompt：杯子（器物类）

```text
A hand-drawn drinking cup (ceramic mug) in organic, warm style.

【风格标识】
Style: 年老师's Organic Warmth — recognizable hand-drawn aesthetic
Key characteristics: non-geometric, breathing curve rhythm, warm terracotta accents

【视角指定】
Perspective: Slightly elevated top-down view (15-30°) to show both the circular cup opening and the base.

【色彩配置】
Color philosophy:
- Main body: Rice white #FEFFFE throughout (overall tone, not segmented)
- Accents: Terracotta #D6654B for the handle and subtle rim highlight (minimal use, ≤2 focal points)
- Shadows: Deep terra #B03A21 under the rim and cup bottom
- Strokes: Ink black #1A1612 for all outlines

【线条分层】
Line hierarchy (Quiver natural standard):
- Main outline: 1.5-3px (defines shape)
- Structure lines: 0.7-1.5px (defines relationships)
- Detail lines: 0.25-0.7px (adds warmth)

【曲线要求】
Curve rhythm:
- 70% small deviations (±5px)
- 30% large deviations (±15-30px)
- Wave-style breathing: tight-loose-tight rhythm
- Avoid: mechanical symmetry, regular jitter, .00 coordinates

【结构分解】
Structure composition (3 layers):
1. Main outline: Single continuous path defining the cup silhouette (body + handle)
2. Internal structure: Cup rim ellipse and base ellipse
3. Decorative texture: Minimal highlight curve on the left side (assuming light from left)

【复杂度控制】
Complexity: Simple (10-30 paths, ≤20% detail)

【输出格式】
SVG format with:
- <g id="fill-layer"> for fills
- <g id="stroke-layer"> for strokes
- All strokes: stroke-linecap="round" stroke-linejoin="round"
```

---

## 18 次学习计划：建立年老师风格

### 学习阶段划分

| 阶段 | 次数 | 目标 | 物体类型 |
|------|------|------|----------|
| **阶段 1：基础形态** | R1-R6 | 建立核心曲线 DNA | 简单几何 → 有机形态 |
| **阶段 2：生物特征** | R7-R12 | 掌握生命感表达 | 动物、植物 |
| **阶段 3：器物功能** | R13-R18 | 掌握功能物体表达 | 工具、建筑 |

### 推荐学习序列

| # | 物体 | 类型 | 核心挑战 | 主色 | 焦点位置 |
|---|------|------|----------|------|----------|
| R1 | 虾 | 生物 | 基准验证 | 陶土色 | 全身 |
| R2 | 猫 | 生物 | 毛发质感 | 米白+陶土耳 | 耳朵 |
| R3 | 杯子 | 器物 | 体积感/开口 | 米白+陶土把 | 把手 |
| R4 | 树 | 植物 | 分枝结构 | 米白+陶土干 | 树干 |
| R5 | 鱼 | 生物 | 流线型动态 | 陶土色 | 全身 |
| R6 | 房子 | 建筑 | 透视/层次 | 米白+陶土顶 | 屋顶 |
| R7 | 鸟 | 生物 | 翅膀/羽毛 | 米白+陶土翅 | 翅膀 |
| R8 | 碗 | 器物 | 深度/容积 | 米白+深陶土底 | 底部阴影 |
| R9 | 花 | 植物 | 花瓣层次 | 陶土色花瓣 | 花朵 |
| R10 | 狗 | 生物 | 肢体动态 | 米白+陶土耳 | 耳朵/尾巴 |
| R11 | 椅子 | 器物 | 结构/支撑 | 米白+陶土座 | 座位 |
| R12 | 叶子 | 植物 | 叶脉纹理 | 陶土色+米白脉 | 叶片 |
| R13 | 兔子 | 生物 | 长耳特征 | 米白+陶土耳 | 耳朵 |
| R14 | 书本 | 器物 | 厚度/页码 | 米白+陶土封 | 封面 |
| R15 | 太阳 | 抽象 | 光芒放射 | 陶土色+米白边 | 中心 |
| R16 | 汽车 | 器物 | 机械曲线 | 米白+陶土窗 | 车窗 |
| R17 | 山 | 自然 | 层次/远近 | 深陶土+米白顶 | 山峰 |
| R18 | 人物头像 | 复杂 | 面部特征 | 米白+陶土发 | 头发 |

### 每次学习的输出

**必须产出**：
1. `{round}-spec-{object}.md` — Prompt 完整文档
2. `{round}-analysis.md` — 风格一致性分析
3. `quiver-{round}-{object}.svg` — 最终 SVG

**分析维度**：
- 曲线节奏是否符合 70/30 分布？
- 色彩分配是否符合四色系统？
- 线条粗细是否正确分层？
- 与 R1（虾）的风格一致性如何？
- 是否一眼能看出"这是同一种风格"？

### 风格一致性追踪表

| 维度 | R1 基准 | R2 | R3 | ... | R18 | 一致性评分 |
|------|---------|----|----|-----|-----|------------|
| 曲线节奏 | ★★★ | | | | | |
| 色彩系统 | ★★★ | | | | | |
| 线条分层 | ★★★ | | | | | |
| 陶土焦点 | ★★★ | | | | | |
| 整体气质 | ★★★ | | | | | |

---

*版本：v7.0*
*创建日期：2026-04-04*
*作者：Mino*