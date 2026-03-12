---
input: frontend-slides SKILL.md 第 887-1035 行
output: 动画模式与效果参考
pos: frontend-slides/references/animation-guide.md
---

# 动画模式与效果参考

> **何时读取**: 当用户需要为演示文稿选择特定风格的动画和视觉效果时

---

## 风格参考：效果 → 情感映射

使用此指南将动画与预期情感匹配：

### 戏剧性/电影感

- 缓慢淡入（1-1.5 秒）
- 大尺度过渡（0.9 → 1）
- 深色背景 + 聚光灯效果
- 视差滚动
- 全出血图片

**适用场景**: 产品发布会、融资路演、主题演讲

---

### 科技感/未来感

- 霓虹发光效果（带强调色的 box-shadow）
- 粒子系统（canvas 背景）
- 网格图案
- 等宽字体作为强调
- 故障或扰乱文字效果
- 青色、洋红、电蓝色调

**适用场景**: 技术产品发布、AI 主题、开发者工具

---

### 活泼/友好

- 弹性缓动（弹簧物理）
- 圆角（大半径）
- 柔和或明亮的颜色
- 浮动/摇曳动画
- 手绘或插图元素

**适用场景**: 儿童产品、创意机构、生活方式品牌

---

### 专业/企业

- 微妙、快速的动画（200-300 毫秒）
- 干净的无衬线字体
- 海军蓝、石板灰、木炭色背景
- 精确的间距和对齐
- 最少的装饰元素
- 数据可视化为重点

**适用场景**: 企业汇报、董事会会议、投资者更新

---

### 平静/极简

- 非常慢、微妙的运动
- 高留白
- 柔和的色调
- 衬线字体
- 宽裕的填充
- 内容为重点，无干扰

**适用场景**: 学术演讲、冥想应用、高端品牌

---

### 编辑/杂志

- 强烈的排版层次
- 引用和标注
- 图片 - 文本交互
- 打破网格的布局
- 标题用衬线、正文用无衬线
- 黑白 + 一个强调色

**适用场景**: 个人品牌、创意作品集、故事讲述

---

## 动画模式参考

### 入场动画

```css
/* 淡入 + 向上滑动（最常用） */
.reveal {
    opacity: 0;
    transform: translateY(30px);
    transition: opacity 0.6s var(--ease-out-expo),
                transform 0.6s var(--ease-out-expo);
}

.visible .reveal {
    opacity: 1;
    transform: translateY(0);
}

/* 缩放进入 */
.reveal-scale {
    opacity: 0;
    transform: scale(0.9);
    transition: opacity 0.6s, transform 0.6s var(--ease-out-expo);
}

/* 从左侧滑入 */
.reveal-left {
    opacity: 0;
    transform: translateX(-50px);
    transition: opacity 0.6s, transform 0.6s var(--ease-out-expo);
}

/* 模糊进入 */
.reveal-blur {
    opacity: 0;
    filter: blur(10px);
    transition: opacity 0.8s, filter 0.8s var(--ease-out-expo);
}
```

---

### 背景效果

```css
/* 渐变网格 */
.gradient-bg {
    background:
        radial-gradient(ellipse at 20% 80%, rgba(120, 0, 255, 0.3) 0%, transparent 50%),
        radial-gradient(ellipse at 80% 20%, rgba(0, 255, 200, 0.2) 0%, transparent 50%),
        var(--bg-primary);
}

/* 噪点纹理 */
.noise-bg {
    background-image: url("data:image/svg+xml,..."); /* 内联 SVG 噪点 */
}

/* 网格图案 */
.grid-bg {
    background-image:
        linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px),
        linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px);
    background-size: 50px 50px;
}
```

---

### 交互效果

```javascript
// 3D 倾斜悬停效果
class TiltEffect {
    constructor(element) {
        this.element = element;
        this.element.style.transformStyle = 'preserve-3d';
        this.element.style.perspective = '1000px';
        this.bindEvents();
    }

    bindEvents() {
        this.element.addEventListener('mousemove', (e) => {
            const rect = this.element.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;

            this.element.style.transform = `
                rotateY(${x * 10}deg)
                rotateX(${-y * 10}deg)
            `;
        });

        this.element.addEventListener('mouseleave', () => {
            this.element.style.transform = 'rotateY(0) rotateX(0)';
        });
    }
}
```

---

## 缓动函数参考

```css
/* 标准缓出（最常用） */
--ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);

/* 缓入 */
--ease-in-expo: cubic-bezier(0.7, 0, 0.84, 0);

/* 缓入缓出 */
--ease-in-out-expo: cubic-bezier(0.65, 0, 0.35, 1);

/* 弹簧物理（用于活泼效果） */
--spring: cubic-bezier(0.5, 1.4, 0.4, 1);
```

---

## 持续时间规范

| 动画类型 | 持续时间 | 适用场景 |
|---------|---------|---------|
| 微交互 | 150-250ms | 按钮悬停、复选框切换 |
| 快速过渡 | 300-400ms | 卡片展开、菜单滑动 |
| 标准入场 | 500-700ms | 幻灯片内容揭示 |
| 戏剧性入场 | 800-1200ms | 标题、关键信息 |
| 背景效果 | 2-5s | 渐变流动、粒子运动 |

---

## 交错延迟模式

```css
/* 标准阶梯延迟（4 个项目） */
.reveal:nth-child(1) { transition-delay: 0.1s; }
.reveal:nth-child(2) { transition-delay: 0.2s; }
.reveal:nth-child(3) { transition-delay: 0.3s; }
.reveal:nth-child(4) { transition-delay: 0.4s; }

/* 快速交错（紧凑演示） */
.reveal:nth-child(n) { transition-delay: calc(0.05s * n); }

/* 分组揭示 */
.reveal-group-1 { transition-delay: 0.2s; }
.reveal-group-2 { transition-delay: 0.4s; }
.reveal-group-3 { transition-delay: 0.6s; }
```

---

*本指南是 frontend-slides 技能的一部分。完整技能文档见 SKILL.md*
