# Compiled Spec — Dark Monumental v3

> Blade Runner 2049 翻译 — 深空底色 + 纪念碑数据 + 光效引导

## Site Tokens

```css
:root {
  --bg-deep: #0B0B12;
  --bg-layer: #141420;
  --border: #2A2A3A;
  --text-white: #F0F0F5;
  --text-gray: #8888A0;
  --brand-red: #E2231A;
  --warm-orange: #FF7A45;
  --cool-cyan: #00D4AA;
}
```

## Page Compositions

| Page | Composition | Signature Move |
|------|------------|----------------|
| P1 封面 | 居中纪念碑 | 垂直居中标题 + 底部水平红光 |
| P2 指引 | 单列引用 | 垂直引用块队列 |
| P3 企业 | 左右分割(3:7) | 左品牌区 + 右信息网格 |
| P4 现况 | 三柱纪念碑 | 3 个大数字柱 + 底部补充 |
| P5 架构 | 垂直光路 | 层级发光线连接 |
| P6 背景 | 左右光场 | 左灰(挑战) / 右红(目标) |
| P7 实施 | 水平光带 | 4 列阶段卡片 |
| P8 成果 | 6 格光碑 | 2×3 数据纪念碑 |
| P9 关键 | 纵向光柱 | 5 条纵向关键因素 |
| P10 变革 | 双面对称 | 左青(变革) / 右红(人才) |
| P11 计划 | 4 列聚焦 | 3 目标 + 1 高亮保障 |
| P12 结束 | 居中极简 | THANKS 大字 + 微光 |

## Entrance Map

静态 PPT 展示，无动画入口。通过光的方向性暗示阅读路径：
- 从上到下：标题 → 内容 → 补充
- 从左到右：挑战 → 目标、阶段 1 → 阶段 4
- 从中心到边缘：封面/结束页的居中焦点

## External Library Decision

### Q1: What is the core motion experience?
静态演示，无动画。核心体验是光影对比和空间纵深感。

### Q2: Can the native library entries do it?
是。全部使用纯 CSS（radial-gradient、box-shadow、text-shadow）实现光效，无需外部库。

### Q3: If external library is used, why?
不需要外部库。纯 CSS 实现所有光效和视觉层次。

### Decision
纯 HTML + CSS 单文件，无 JS，无外部依赖。适合浏览器查看和打印导出。

## Phase 3 Quality Check

- [x] 每页完整布局 CSS
- [x] 统一深空底色和卡片系统
- [x] 红色光晕数据数字
- [x] 青色科技标签
- [x] 12 页完整内容填充
- [x] 底部品牌光条统一
- [x] 页码统一
- [x] 无外部依赖，纯 CSS 光效

## Anti-Garbage Check

- 无 emoji
- 无多余装饰元素
- 红色使用克制（每页 <15% 占比）
- 字体统一（PingFang SC / Microsoft YaHei）
- 卡片样式统一（bg-layer + border）
- 无渐变背景（仅底部光条和封面光效）
