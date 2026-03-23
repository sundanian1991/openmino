# 东京招财猫 vs Quiver 生成 — 质感差异分析

## 颜色对比

| 颜色 | 东京猫（正确） | Quiver生成 | 差异 |
|------|--------------|-----------|------|
| 墨色 | `#0B0800` | `#140E02` | 太深 |
| 朱红 | `#BA3420` | `#B12D1C` | 略不同 |
| 奶油 | `#FEFFFA` | `#F8FEF0` | 偏绿 |

## 结构对比

### 东京猫 — 11个独立元素，层次分明

1. **Cat body outline** - 填充 + 描边
2. **Collar** - 朱红填充 + 描边
3. **Ears** - 朱红填充 + 描边（左右各一个）
4. **Eyes** - 墨色填充（眼睛形状更精致）
5. **Nose** - 小巧的朱红色三角
6. **Mouth** - 朱红色曲线（左右各一条）
7. **Whiskers** - 12条细胡须（左右各6条）
8. **Belly/apron** - 奶油填充 + 描边
9. **Bell** - 奶油填充 + 描边 + 内部细节
10. **Left arm** - 奶油填充 + 描边
11. **右脚爪子** - 多个脚趾分开

### 关键特征：肚子上的日文汉字

```svg
<!-- 肚子上有手绘的日文汉字 -->
<path d="..." fill="#0B0800"/>
```

## 线条分层（东京猫）

| 用途 | 宽度 | 代码 |
|------|------|------|
| 主轮廓 | 1.5px | `stroke-width="1.5"` |
| 细节（胡须） | 1.04px | `stroke-width="1.04"` |
| 更细 | 1px | `stroke-width="1"` |

## 双层画法示例（东京猫）

### 耳朵
```svg
<!-- 第一层：朱红填充 -->
<path d="..." fill="#BA3420"/>

<!-- 第二层：墨色描边 -->
<path d="..." fill="none" stroke="#0B0800" stroke-width="1.5"/>
```

### 眼睛
```svg
<!-- 填充层 + 描边层合并 -->
<path d="..." fill="#0B0800" stroke="#0B0800" stroke-width="1.5"/>
```

## Quiver 生成的问题

1. **颜色代码不对** - 需要明确指定 `#0B0800` 而不是 "deep black"
2. **结构太简单** - 把所有东西塞在一两个 path 里
3. **缺少细节** - 没有肚子上的汉字、没有精细的胡须
4. **层次感不足** - 没有清晰的填充→描边分层

## Prompt 优化方向

```
Original: "Japanese maneki-neko..."

优化后：
"Japanese maneki-neko (lucky cat), sitting pose, one paw raised.

STRUCTURE:
- Body: cream #FEFFFA fill with ink #0B0800 outline (1.5px)
- Ears: vermillion #BA3420 fill with ink outline
- Collar: vermillion #BA3420 fill with ink outline
- Eyes: ink #0B0800 filled almond shapes
- Nose: small vermillion triangle
- Mouth: two vermillion curves
- Whiskers: 12 thin ink lines (1.04px), 6 each side
- Belly/apron: cream fill with ink outline
- Bell: cream fill with ink outline, center detail
- Paws: separated toes with ink outline
- KEY: Hand-drawn Japanese kanji character on belly (ink filled)

STYLE:
- Round stroke caps and joins
- Layered: fill shapes FIRST, then overlay with strokes
- Organic curves, not geometric
- Minimal, elegant, lots of negative space
- NOT cartoonish, traditional sumi-e aesthetic"
```
