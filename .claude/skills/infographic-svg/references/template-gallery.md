# 模板画廊 — 7 种视觉隐喻的详细参数

> **用途**：选择模板后，按此文件的精确参数生成 SVG。
>
> **触发**：确定使用某个视觉模板时读取对应模板。

---

## 模板 1：时间线 / 容量轴

### 适用场景
- "这个东西由哪些部分组成"
- 组成部分有顺序关系
- 有容量/进程的概念

### 精确参数

```
画布：680 × 150
背景：#faf9f7

标题：
  x=40, y=30, Georgia 18px bold #1a1a1a
副标题：
  x=40, y=48, system-ui 11px #6b6b6b

大容器：
  x=40, y=62, width=600, height=48, rx=12
  fill=none, stroke=#1a1a1a, stroke-width=1.5

卡片（从 x=48 开始，间距 4-8px）：
  每张卡片：height=36, rx=8, y=68
  fill=#f5f4f1, stroke=#d4d1c7, stroke-width=1

卡片文字：
  x=卡片中心, y=85（第一行）/ y=98（第二行）
  text-anchor=middle, system-ui 10px #1a1a1a

底部轴线：
  x=40, y=122, tick 高度 6px
  stroke=#c98a6a, stroke-width=1

底部标注：
  左：x=40, y=142, system-ui 10px #6b6b6b
  右：x=640, y=145, system-ui 9px #c98a6a（主标注）
  右：x=640, y=154, system-ui 8.5px #8a8580（辅助标注）
```

### 关键规则
- 卡片宽度按内容比例分配
- 最后一张"free"卡片用虚线：stroke-dasharray="4 3"，fill=#faf9f7
- 文字必须垂直居中（单行文字 y = 卡片中心 + 4px）

---

## 模板 2：渐变衰减

### 适用场景
- "从清晰到模糊"
- 质量随时间递减
- sharp → rotting → gone

### 精确参数

```
画布：680 × 200
背景：#faf9f7

标题：
  x=40, y=22, Georgia 16px bold #1a1a1a
副标题：
  x=40, y=40, system-ui 11px #6b6b6b

渐变条：
  x=40, y=52, width=600, height=24, rx=6
  多段 rect 拼接，颜色从 #1a1a1a 渐变到 #e8e4dc

渐变条标签（在渐变条上方）：
  x=各段中心, y=67, system-ui 10px #ffffff（深色段）/ #1a1a1a（浅色段）

解释卡片（渐变条下方，y=85）：
  width=180-190, height=50-60, rx=8
  fill=#f5f4f1, stroke=#d4d1c7, stroke-width=1
  间距 8px

卡片内标题：
  x=卡片中心, y=100, system-ui 11px bold #1a1a1a

卡片内说明：
  x=卡片中心, y=118, system-ui 9.5px #6b6b6b

Summary 卡片：
  x=40, y=155, width=600, height=30, rx=8
  fill=#f5f4f1, stroke=#d4d1c7, stroke-width=1
  文字居中

底部斜体标注：
  x=340, y=195, Georgia 10px italic #6b6b6b
```

### 关键规则
- 渐变条至少分 5 段，每段宽度递减
- 解释卡片与渐变段的语义对应
- Summary 卡片宽度 = 大容器宽度（600px）

---

## 模板 3：光谱排列

### 适用场景
- "有这几种策略/方法/选项"
- 从简单到复杂的递进
- 强度等级

### 精确参数

```
画布：680 × 180
背景：#faf9f7

标题：
  x=40, y=28, Georgia 16px bold #1a1a1a
副标题：
  x=40, y=46, system-ui 11px #6b6b6b

轴：
  x=40, y=62, width=600, stroke=#1a1a1a, stroke-width=1
  末端箭头：marker-end

卡片（从 x=40 开始，5 张等宽）：
  width=100-116, height=80-100, rx=8, y=72
  间距 8px

卡片内标题：
  x=卡片中心, y=90, system-ui 11px bold #1a1a1a

卡片内说明：
  x=卡片中心, y=105-120, system-ui 9px #6b6b6b
  多行时行距 13px

右侧状态竖线：
  每张卡片右侧或内部
  stroke-width=3, stroke-linecap=round
  高度与卡片匹配

底部标注：
  按需添加
```

### 关键规则
- 卡片宽度必须统一
- 右侧竖线 stroke-linecap="round" 制造药丸效果
- 颜色可递进（从左到右由浅到深）

---

## 模板 4：左右对比（包含 vs 筛选）

### 适用场景
- "全部内容 vs 实际看到"
- 完整 vs 精简
- 过滤/筛选过程

### 精确参数

```
画布：680 × 300
背景：#faf9f7

标题：
  x=40, y=28, Georgia 16px bold #1a1a1a
副标题：
  x=40, y=46, system-ui 11px #6b6b6b

左容器：
  x=40, y=62, width=280, height=200, rx=12
  fill=none, stroke=#1a1a1a, stroke-width=1.5

左容器标题：
  x=56, y=80, system-ui 12px bold #1a1a1a

右容器：
  x=360, y=62, width=280, height=200, rx=12
  fill=none, stroke=#1a1a1a, stroke-width=1.5

右容器标题：
  x=376, y=80, system-ui 12px bold #1a1a1a

中间箭头：
  x=320-360, y=中心
  stroke=#c98a6a, stroke-width=1
  带文字标注

左内容（密集列表卡片）：
  多个小卡片，height=20-24
  fill=#f5f4f1, stroke=#d4d1c7

右内容（精简卡片）：
  少数卡片，height 可大一些
  部分用语义色填充

底部斜体标注：
  x=340, y=280, Georgia 10px italic #6b6b6b
```

### 关键规则
- 两个容器必须**等宽**（280px）
- 间距 20px（320-360 是箭头区）
- 左边密集、右边精简 = 体现"过滤"效果

---

## 模板 5：方案对比（A vs B）

### 适用场景
- "A 方法好，B 方法不行"
- 两种方案的效果差异
- 正确 vs 错误

### 精确参数

```
画布：680 × 280
背景：#faf9f7

标题：
  x=40, y=28, Georgia 16px bold #1a1a1a
副标题：
  x=40, y=46, system-ui 11px #6b6b6b

左卡片：
  x=40, y=62, width=280-300, height=160-180, rx=10
  fill=#f5f4f1, stroke=#d4d1c7, stroke-width=1

左卡片标题栏：
  x=48, y=72, width=卡宽-16, height=24, rx=8
  fill=#8f9b7f（绿色）或语义色
  文字居中，system-ui 11px bold #fff

右卡片：
  x=360, y=62, width=280-300, height=160-180, rx=10
  fill=#f5f4f1, stroke=#d4d1c7, stroke-width=1

右卡片标题栏：
  x=368, y=72, width=卡宽-16, height=24, rx=8
  fill=#6a8fb5（蓝色）或对比语义色
  文字居中，system-ui 11px bold #fff

Mini 条状图（卡片内部，y=105）：
  多条 rect，宽度表示比例
  fill=#8f9b7f 或 #d4d1c7

说明文字：
  y=160+, system-ui 10px #6b6b6b

底部建议：
  x=340, y=240, text-anchor=middle
  Georgia 10px italic #6b6b6b
```

### 关键规则
- 两张卡片必须**等宽等高**
- 标题栏用不同语义色区分
- Mini 条状图是核心——用视觉宽度表示数量/进度

---

## 模板 6：父子容器

### 适用场景
- "父进程 spawn 子进程"
- 什么传过去了，什么留下来了
- spawn/return 信息流动

### 精确参数

```
画布：680 × 350
背景：#faf9f7

标题：
  x=40, y=28, Georgia 16px bold #1a1a1a
副标题：
  x=40, y=46, system-ui 11px #6b6b6b

父容器：
  x=40, y=62, width=600, height=240, rx=12
  fill=none, stroke=#1a1a1a, stroke-width=1.5

子容器（在父容器内部右侧）：
  x=430, y=80, width=190-280, height=120-160, rx=10
  fill=#f5f4f1, stroke=#d4d1c7, stroke-width=1

Spawn 箭头：
  从左到右的曲线
  path d="M 300 110 Q 360 110 420 110"
  stroke=#c98a6a, stroke-width=1
  箭头标注：x=360, y=105, system-ui 9px #c98a6a

子容器内卡片：
  height=10-14, rx=2
  fill=#d4d4d4（占位/工具调用）
  fill=#f5f4f1（实际返回的内容）

Result 箭头：
  从子容器底部回环到左侧
  path d="M 420 200 Q 360 180 300 160"
  标注：system-ui 9px #c98a6a

被丢弃的内容（虚线标注）：
  stroke-dasharray="3 2"
  fill=#faf9f7, stroke=#d4d1c7

底部斜体标注：
  x=340, y=320, Georgia 10px italic #6b6b6b
```

### 关键规则
- 子容器必须在父容器**内部**
- Spawn 和 Result 箭头方向清晰
- 被丢弃的内容用虚线 + 淡色区分

---

## 模板 7：信息过滤

### 适用场景
- "完整记录" vs "模型实际接收"
- 左边密集、右边精简
- 有明确的"过滤"动作

### 精确参数

```
画布：680 × 300
背景：#faf9f7

标题：
  x=40, y=28, Georgia 16px bold #1a1a1a
副标题：
  x=40, y=46, system-ui 11px #6b6b6b

左容器：
  x=40, y=62, width=280, height=200, rx=12
  fill=none, stroke=#1a1a1a, stroke-width=1.5

右容器：
  x=360, y=62, width=280, height=200, rx=12
  fill=none, stroke=#1a1a1a, stroke-width=1.5

左内容（密集列表）：
  多条 rect，height=10-14
  fill=#f5f4f1, stroke=#d4d1c7
  或 fill=#d4d4d4（工具调用占位）

右内容（精简卡片）：
  少数卡片
  fill=#f5f4f1, stroke=#d4d1c7

中间过滤箭头：
  x=320-360, y=中心
  stroke=#c98a6a, stroke-width=1
  文字标注：system-ui 9px

底部斜体标注：
  x=340, y=280, Georgia 10px italic #6b6b6b
```

### 关键规则
- 两个容器**等宽**（280px）
- 左边密集（10+ 个条），右边精简（3-5 张卡片）
- 中间箭头标注"filter"或"compact"

---

*每个模板的参数经过精确校准。生成新图时，先选模板，再填入具体内容到对应位置。*
