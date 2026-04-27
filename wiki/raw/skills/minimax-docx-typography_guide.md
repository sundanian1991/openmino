# Typography Guide

> 字体排版指南

## 字体配对

### 西文字体

| 标题字体 | 正文字体 | 风格 |
|---------|---------|------|
| Georgia | Calibri | 经典、学术 |
| Arial Black | Arial | 商务、现代 |
| Calibri | Calibri Light | 简洁、统一 |
| Cambria | Calibri | 正式、报告 |
| Trebuchet MS | Calibri | 现代、友好 |

### 中文字体

| 场景 | 字体 | 说明 |
|------|------|------|
| 正文 | SimSun (宋体) | 标准宋体，最正式 |
| 标题 | SimHei (黑体) | 清晰、现代 |
| 屏幕显示 | Microsoft YaHei | 微软雅黑，适合屏幕 |
| 公文 | 方正小标宋 | 红头文件标准 |

### 完整字体设置（必须设置三个属性）

```csharp
new RunFonts {
    Ascii = "Arial",           // 西文字体
    HighAnsi = "Arial",        // 高位 ASCII
    EastAsia = "SimSun"        // 东亚字体（中文）
}
```

## 字号体系

### 中文传统字号 vs 磅值

| 中文字号 | 磅值 (pt) | 用途 |
|---------|-----------|------|
| 初号 | 42 | 文件头 |
| 小初 | 36 | 大标题 |
| 一号 | 26 | 章节标题 |
| 小一 | 24 | 一级标题 |
| 二号 | 22 | 二级标题 |
| 小二 | 18 | 三级标题 |
| 三号 | 16 | 四级标题 |
| 小三 | 15 | 小标题 |
| 四号 | 14 | 正文（公文）|
| 小四 | 12 | 正文（标准）|
| 五号 | 10.5 | 注释、表注 |
| 小五 | 9 | 脚注 |

### OpenXML 字号表示

```csharp
// OpenXML 使用半点 (half-points)
// 12pt = 24
// 14pt = 28
// 16pt = 32

new FontSize { Val = "24" }  // 12pt
```

## 行距与间距

### 标准行距

| 类型 | 设置值 |
|------|--------|
| 单倍行距 | 240 (twips) |
| 1.5 倍行距 | 360 |
| 2 倍行距 | 480 |
| 固定值 20pt | 400 |

```csharp
// 自动行距 (1.5倍)
new SpacingBetweenLines {
    Line = "360",
    LineRule = LineSpacingRule.Auto
}

// 固定行距 20pt
new SpacingBetweenLines {
    Line = "400",
    LineRule = LineSpacingRule.Exact
}
```

### 段前段后间距

```csharp
new SpacingBetweenLines {
    Before = "120",   // 段前 6pt (120 twips)
    After = "120"     // 段后 6pt
}
```

## 页面设置

### 页面尺寸

| 类型 | 宽度 | 高度 |
|------|------|------|
| A4 | 11906 (twips) ≈ 210mm | 16838 (twips) ≈ 297mm |
| Letter | 12240 (twips) | 15840 (twips) |
| A3 | 16838 (twips) | 23811 (twips) |

```csharp
new PageSize {
    Width = 11906,   // A4
    Height = 16838
}
```

### 页边距

| 类型 | 上 | 下 | 左 | 右 |
|------|----|----|----|----|
| 标准 | 1440 (1") | 1440 | 1440 | 1440 |
| 窄边距 | 720 (0.5") | 720 | 720 | 720 |
| 宽边距 | 2160 (1.5") | 2160 | 2160 | 2160 |
| 公文 | 2268 (3.7cm) | 2268 | 2551 (3.5cm) | 2551 |

```csharp
new PageMargin {
    Top = 1440,      // 1 inch = 1440 twips
    Bottom = 1440,
    Left = 1440,
    Right = 1440
}
```

## 颜色方案

### 商务配色

| 用途 | 颜色 |
|------|------|
| 主标题 | 000000 (纯黑) |
| 正文 | 333333 (深灰) |
| 次要文字 | 666666 (中灰) |
| 注释 | 999999 (浅灰) |
| 强调色 | 0066CC (商务蓝) |
| 警示色 | CC0000 (红色) |

### GB/T 9704 公文配色

| 用途 | 颜色 |
|------|------|
| 红头 | CC0000 (大红) |
| 正文 | 000000 (黑色) |
| 分隔线 | 000000 |

---

*单位换算：1 inch = 1440 twips = 914400 EMUs*
