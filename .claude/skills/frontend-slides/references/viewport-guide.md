---
input: frontend-slides SKILL.md 第 20-246 行
output: 视口适配详细指南
pos: frontend-slides/references/viewport-guide.md
---

# 视口适配详细指南

> **何时读取**: 当用户需要确保幻灯片在任何设备上都能完美适配时

---

## CRITICAL: 视口适配强制要求

**这部分是强制性的，所有演示文稿都必须包含**。

### 黄金规则

```
每个幻灯片 =  exactly one viewport height (100vh/100dvh)
内容溢出？→ 拆分成多张幻灯片或减少内容
绝不在幻灯片内滚动。
```

---

## 内容密度限制

为确保视口适配，强制执行每张幻灯片的限制：

| 幻灯片类型 | 最大内容 |
|------------|---------|
| 标题页 | 1 个标题 + 1 个副标题 + 可选标语 |
| 内容页 | 1 个标题 + 4-6 个要点 或 1 个标题 + 2 段文字 |
| 特性网格 | 1 个标题 + 最多 6 张卡片（2x3 或 3x2 网格） |
| 代码页 | 1 个标题 + 最多 8-10 行代码 |
| 引用页 | 1 个引用（最多 3 行）+ 归属 |
| 图片页 | 1 个标题 + 1 张图片（最多 60vh 高度） |

**如果内容超出这些限制 → 拆分成多张幻灯片**

---

## 必需 CSS 架构

每个演示文稿必须包含以下基础 CSS 以确保视口适配：

```css
/* ===========================================
   VIEWPORT FITTING: MANDATORY BASE STYLES
   这些样式必须包含在每个演示文稿中。
   它们确保幻灯片精确适配视口。
   =========================================== */

/* 1. 锁定 html/body 到视口 */
html, body {
    height: 100%;
    overflow-x: hidden;
}

html {
    scroll-snap-type: y mandatory;
    scroll-behavior: smooth;
}

/* 2. 每个幻灯片 = 精确的视口高度 */
.slide {
    width: 100vw;
    height: 100vh;
    height: 100dvh; /* 为移动浏览器的动态视口高度 */
    overflow: hidden; /* 关键：防止任何滚动 */
    scroll-snap-align: start;
    display: flex;
    flex-direction: column;
    position: relative;
}

/* 3. 内容容器使用 flex 居中 */
.slide-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-height: 100%;
    overflow: hidden; /* 防止溢出的双重保护 */
    padding: var(--slide-padding);
}

/* 4. 所有排版使用 clamp() 进行响应式缩放 */
:root {
    /* 标题从移动端到桌面端缩放 */
    --title-size: clamp(1.5rem, 5vw, 4rem);
    --h2-size: clamp(1.25rem, 3.5vw, 2.5rem);
    --h3-size: clamp(1rem, 2.5vw, 1.75rem);

    /* 正文 */
    --body-size: clamp(0.75rem, 1.5vw, 1.125rem);

    /* 间距随视口缩放 */
    --slide-padding: clamp(1rem, 4vw, 4rem);
    --content-gap: clamp(0.5rem, 2vw, 2rem);
    --element-gap: clamp(0.25rem, 1vw, 1rem);
}

/* 5. 卡片/容器使用视口相关的最大尺寸 */
.card, .container, .content-box {
    max-width: min(90vw, 1000px);
    max-height: min(80vh, 700px);
}

/* 6. 列表自动随视口缩放 */
.feature-list, .bullet-list {
    gap: clamp(0.4rem, 1vh, 1rem);
}

.feature-list li, .bullet-list li {
    font-size: var(--body-size);
    line-height: 1.4;
}

/* 7. 网格自适应可用空间 */
.grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(min(100%, 250px), 1fr));
    gap: clamp(0.5rem, 1.5vw, 1rem);
}

/* 8. 图片约束到视口 */
img, .image-container {
    max-width: 100%;
    max-height: min(50vh, 400px);
    object-fit: contain;
}

/* ===========================================
   RESPONSIVE BREAKPOINTS
   为更小视口的激进缩放
   =========================================== */

/* 短视口（< 700px 高度） */
@media (max-height: 700px) {
    :root {
        --slide-padding: clamp(0.75rem, 3vw, 2rem);
        --content-gap: clamp(0.4rem, 1.5vw, 1rem);
        --title-size: clamp(1.25rem, 4.5vw, 2.5rem);
        --h2-size: clamp(1rem, 3vw, 1.75rem);
    }
}

/* 非常短的视口（< 600px 高度） */
@media (max-height: 600px) {
    :root {
        --slide-padding: clamp(0.5rem, 2.5vw, 1.5rem);
        --content-gap: clamp(0.3rem, 1vw, 0.75rem);
        --title-size: clamp(1.1rem, 4vw, 2rem);
        --body-size: clamp(0.7rem, 1.2vw, 0.95rem);
    }

    /* 隐藏非必需元素 */
    .nav-dots, .keyboard-hint, .decorative {
        display: none;
    }
}

/* 极短（横屏手机，< 500px 高度） */
@media (max-height: 500px) {
    :root {
        --slide-padding: clamp(0.4rem, 2vw, 1rem);
        --title-size: clamp(1rem, 3.5vw, 1.5rem);
        --h2-size: clamp(0.9rem, 2.5vw, 1.25rem);
        --body-size: clamp(0.65rem, 1vw, 0.85rem);
    }
}

/* 窄视口（< 600px 宽度） */
@media (max-width: 600px) {
    :root {
        --title-size: clamp(1.25rem, 7vw, 2.5rem);
    }

    /* 网格垂直堆叠 */
    .grid {
        grid-template-columns: 1fr;
    }
}

/* ===========================================
   REDUCED MOTION
   尊重用户偏好
   =========================================== */
@media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
        animation-duration: 0.01ms !important;
        transition-duration: 0.2s !important;
    }

    html {
        scroll-behavior: auto;
    }
}
```

---

## 溢出预防检查清单

生成任何演示文稿前， mentally 验证：

1. ✅ 每个 `.slide` 有 `height: 100vh; height: 100dvh; overflow: hidden;`
2. ✅ 所有字体大小使用 `clamp(min, preferred, max)`
3. ✅ 所有间距使用 `clamp()` 或视口单位
4. ✅ 内容容器有 `max-height` 约束
5. ✅ 图片有 `max-height: min(50vh, 400px)` 或类似约束
6. ✅ 网格使用 `auto-fit` + `minmax()` 实现响应式列
7. ✅ 包含高度的断点：700px、600px、500px
8. ✅ 内容元素上没有固定像素高度
9. ✅ 每张幻灯片的内容符合密度限制

---

## 当内容不适合时

如果发现自己内容太多：

**应该做：**
- 拆分成多张幻灯片
- 减少要点数量（每张最多 5-6 个）
- 缩短文字（目标是每个要点 1-2 行）
- 使用更小的代码片段
- 创建"续"幻灯片

**不应该做：**
- 将字体大小减小到可读极限以下
- 完全移除填充/间距
- 允许任何滚动
- 硬塞内容以适应

---

## 测试视口适配

生成后，建议用户在以下尺寸测试：

| 设备类型 | 分辨率 |
|---------|--------|
| **桌面** | 1920×1080, 1440×900, 1280×720 |
| **平板** | 1024×768, 768×1024 (竖屏) |
| **手机** | 375×667, 414×896 |
| **横屏手机** | 667×375, 896×414 |

---

## 快速参考：clamp() 公式

```css
/* 格式：clamp(最小值，偏好值，最大值) */

/* 标题缩放示例 */
--title-size: clamp(1.5rem, 5vw, 4rem);
/* 移动端最小 1.5rem，桌面端最大 4rem，中间用 5vw */

/* 间距缩放示例 */
--slide-padding: clamp(1rem, 4vw, 4rem);
/* 移动端最小 1rem，桌面端最大 4rem */
```

---

*本指南是 frontend-slides 技能的一部分。完整技能文档见 SKILL.md*
