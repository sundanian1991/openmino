# 第一轮 API 反向学习 — 虾

## 测试目标

验证 DNA + 设计决策规则能否引导生成"像样的虾"，即使没有参考案例对照。

---

## 设计哲学（给 Quiver 的指令）

### 视觉气质

**温暖、有机、有生命感** — 不是死板的标本，不是可爱的卡通，是"活着"的生物。

### 视角决策

**侧视图** — 展示虾的曲线美、身体节律、动态姿态。
- 理由：生物类用侧视图最能展现结构特征和比例关系

### 色彩哲学

**整体色调，不是分段涂色** — 虾全身用一种主色（陶土色 #D6654B）贯穿。
- 高光（米白 #FEFFFE）：点缀在虾背中央（最突出的部分）
- 阴影（深陶土 #B03A21）：虾节之间、虾身底部（制造立体感）
- 描边（墨黑 #1A1612）：统一所有轮廓

### 结构分解

**第一层：主体轮廓** — 一条长 path 勾勒虾的整体外形
**第二层：内部结构** — 虾头、虾身、虾尾的分界（功能性划分）
**第三层：装饰纹理** — 触须、虾腿、虾节线（增加手绘感）

### 线条层次

- 主轮廓：4.5px（虾身边界、头部轮廓）
- 结构线：3.8px（虾节分割、头身分界）
- 细节线：2.0px（触须、纹理）

### 曲线节奏

**70/30 分布** — 70% 偏差在 ±5px 内（手稳时），30% 偏差在 ±15-30px（手抖时）
- 避免：机械对称、规律抖动、数学化坐标
- 追求：长曲线有呼吸（20-50px 控制点间距）、不对称的有机感

---

## 给 Quiver 的 Prompt（英文）

```
A hand-drawn shrimp icon in organic, warm style.

Perspective: Side view to show body curves and natural proportions.

Color philosophy:
- Main body: Terracotta #D6654B throughout (overall tone, not segmented)
- Highlights: Rice white #FEFFFE on the back center (most prominent part)
- Shadows: Deep terracotta #B03A21 in body segments and bottom
- Strokes: Ink black #1A1612 for all outlines

Structure:
- Layer 1: One long continuous path for the main body silhouette
- Layer 2: Internal structure (head-body-tail divisions)
- Layer 3: Decorative details (antennae, legs, segment lines)

Line hierarchy:
- Main outline: 4.5px
- Structure lines: 3.8px
- Detail lines: 2.0px

Curve rhythm: Natural, organic Bezier curves with variation (70% small ±5px, 30% large ±15-30px). Avoid mechanical symmetry or regular patterns.

Style: Warm, alive, not rigid specimen or cute cartoon.
```

---

## 预期学习点

调用 API 后，重点观察：

1. **视角选择** — Quiver 是否也选择侧视图？角度有什么差异？
2. **结构分解** — 主体轮廓如何一笔到底？内部结构如何分层？
3. **色彩分配** — 陶土色如何贯穿？高光/阴影位置是否符合规则？
4. **曲线节奏** — 有机感和"手抖感"的边界在哪里？

---

*测试时间：2026-04-04*
*API 额度：第 1 次 / 20 次*
