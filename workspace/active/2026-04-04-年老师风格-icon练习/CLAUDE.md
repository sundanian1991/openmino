# 年老师风格 icon 练习

> 日期：2026-04-04
> 目标：建立统一的手绘风格 SVG icon 体系

---

## 风格规范

### 四色系统
| 颜色 | 色值 | 用途 |
|------|------|------|
| 陶土色 | #D6654B | 焦点强调 |
| 米白 | #FEFFFE | 主体填充 |
| 深陶土 | #B03A21 | 阴影/深度 |
| 墨黑 | #1A1612 | 所有描边 |

### 线条规则
- stroke-linecap="round"（强制）
- stroke-linejoin="round"（强制）
- 主轮廓：4-6px

---

## 工作流程

### 简单 icon
```
1. 需求 → 目标语言（搜索词）
2. better-icons 搜索
3. 导出参考 SVG
4. 手绘对照
```

### 复杂 icon
```
1. 设计指令（哲学 + 风格）
2. Quiver API 调用
3. 验证输出
```

---

## 产出记录

### 01 - 警告三角
- **状态**：✅ 完成
- **参考**：reference-warning-mingcute.svg
- **手绘版**：warning-hand-drawn.svg
- **设计**：三角形 + 感叹号，陶土色焦点

### 02 - 泳帽
- **状态**：✅ 完成
- **参考**：reference-swimming-cap.svg
- **手绘版**：swimming-cap-hand-drawn.svg
- **设计**：椭圆形 + 波浪纹理

### 03 - 泳镜
- **状态**：✅ 完成
- **参考**：reference-goggles-phosphor.svg
- **手绘版**：goggles-hand-drawn.svg
- **设计**：双椭圆形 + 连接带 + 陶土色高光

### 04 - 救生圈
- **状态**：✅ 完成
- **参考**：reference-lifebuoy-phosphor.svg
- **手绘版**：lifebuoy-hand-drawn.svg
- **设计**：同心圆 + 陶土色分隔线

### 05 - 浴巾
- **状态**：✅ 完成
- **参考**：reference-towel-phosphor.svg
- **手绘版**：towel-hand-drawn.svg
- **设计**：矩形折叠感 + 陶土色边缘

### 06 - 泳衣
- **状态**：✅ 完成
- **参考**：reference-swimsuit-iconpark.svg
- **手绘版**：swimsuit-hand-drawn.svg
- **设计**：双圆形肩带 + 梯形主体 + 陶土色中线

---

*API 额度：每周 20 次（仅复杂场景）*
