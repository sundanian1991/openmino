# pattern-slide-deck — 演示/汇报/周会

> 适用于：周会汇报、项目演示、培训材料、季度总结等幻灯片场景。
> 核心理念：全屏 slide + 键盘翻页 + 进度条 + 演讲者备注，轻量替代 PPT。

---

## 页面结构

```
<main.slide-container>  全屏幻灯片区
<div.progress-bar>      顶部进度条
<aside.speaker-notes>   演讲者备注（按 S 切换显示）
<nav.slide-nav>         底部页码 + 翻页按钮（可选）
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${演示标题}</title>
  <style>
    :root { /* 暖色系统 */ }
    /* 以下为模式专用样式 */
  </style>
</head>
<body>
  <div class="progress-bar" id="progress-bar"></div>

  <main class="slide-container">
    <section class="slide active" data-notes="${演讲者备注}">
      <div class="slide-inner">
        <h1 class="slide-title">${标题}</h1>
        <div class="slide-body">
          <!-- 内容：文字/列表/图表/图片 -->
        </div>
        <span class="slide-page">${页码}</span>
      </div>
    </section>

    <section class="slide" data-notes="${备注内容}">
      <div class="slide-inner">
        <h2>${标题}</h2>
        <div class="slide-body">
          <!-- 内容 -->
        </div>
        <span class="slide-page">${页码}</span>
      </div>
    </section>

    <!-- 更多 slide -->
  </main>

  <aside class="speaker-notes" id="speaker-notes">
    <p id="notes-text"></p>
  </aside>

  <nav class="slide-nav">
    <span class="page-indicator" id="page-indicator">1 / ${总数}</span>
  </nav>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 全屏幻灯片 */
body {
  margin: 0; overflow: hidden;
  background: var(--ivory);
}
.slide-container {
  width: 100vw; height: 100vh;
  position: relative;
}
.slide {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  display: none;
  justify-content: center; align-items: center;
}
.slide.active { display: flex; }
.slide-inner {
  max-width: 960px; width: 100%;
  padding: 60px 80px;
}

/* 进度条 */
.progress-bar {
  position: fixed; top: 0; left: 0;
  height: 3px; background: var(--clay);
  z-index: 100; transition: width 0.3s ease;
}

/* Slide 排版 */
.slide-title {
  font-size: 2.5em; font-weight: 800;
  color: var(--slate); margin-bottom: 0.6em;
  line-height: 1.2;
}
.slide h2 {
  font-size: 1.8em; font-weight: 700;
  color: var(--slate); margin-bottom: 0.8em;
}
.slide-body {
  font-size: 1.1em; line-height: 1.8;
  color: var(--g700);
}
.slide-page {
  position: absolute; bottom: 20px; right: 40px;
  font-family: var(--mono); font-size: 0.75em;
  color: var(--g300);
}

/* 演讲者备注 */
.speaker-notes {
  position: fixed; bottom: 0; left: 0; right: 0;
  background: var(--g700); color: var(--g100);
  padding: 16px 24px;
  font-size: 0.9em; line-height: 1.6;
  display: none; z-index: 200;
}
.speaker-notes.visible { display: block; }

/* 页码指示器 */
.slide-nav {
  position: fixed; bottom: 12px; left: 50%;
  transform: translateX(-50%);
  z-index: 50;
}
.page-indicator {
  font-family: var(--mono); font-size: 0.75em;
  color: var(--g300); background: rgba(255,255,255,0.8);
  padding: 4px 12px; border-radius: 12px;
}

/* 列表样式（slide 内） */
.slide-body ul {
  list-style: none; padding: 0;
}
.slide-body li {
  padding: 6px 0 6px 24px;
  position: relative;
}
.slide-body li::before {
  content: '';
  position: absolute; left: 0; top: 14px;
  width: 8px; height: 8px; border-radius: 50%;
  background: var(--clay);
}
```

---

## JS 交互

```js
let current = 0;
const slides = document.querySelectorAll('.slide');
const total = slides.length;
const progressBar = document.getElementById('progress-bar');
const pageIndicator = document.getElementById('page-indicator');
const notesPanel = document.getElementById('speaker-notes');
const notesText = document.getElementById('notes-text');
let notesVisible = false;

function showSlide(index) {
  if (index < 0 || index >= total) return;
  slides.forEach(s => s.classList.remove('active'));
  slides[index].classList.add('active');
  current = index;

  // 进度条
  const pct = ((index + 1) / total) * 100;
  progressBar.style.width = pct + '%';

  // 页码
  pageIndicator.textContent = `${index + 1} / ${total}`;

  // 演讲者备注
  notesText.textContent = slides[index].dataset.notes || '（无备注）';
}

// 键盘导航
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight' || e.key === ' ') {
    e.preventDefault();
    showSlide(current + 1);
  }
  if (e.key === 'ArrowLeft') showSlide(current - 1);
  if (e.key === 's' || e.key === 'S') {
    notesVisible = !notesVisible;
    notesPanel.classList.toggle('visible', notesVisible);
  }
  if (e.key === 'Home') showSlide(0);
  if (e.key === 'End') showSlide(total - 1);
});

// 初始化
showSlide(0);
```

---

## 设计约束

1. **每张 slide 一个核心信息** — 不堆砌，一张 slide 讲一件事
2. **全屏布局** — 100vw x 100vh，模拟真实演示
3. **键盘优先** — 左右箭头 + 空格翻页，S 切换备注，Home/End 跳首尾
4. **进度条始终可见** — 3px 顶部细条，不打扰视觉
5. **slide 内文字 <= 100 字** — 幻灯片不是文档，精简表达
6. **版心 <= 960px** — slide-inner 居中，两侧留白

---

## 反模式

- 不引入 reveal.js/impress.js — 纯 vanilla 足够
- 不用复杂 3D 过渡 — 简单切换即可，内容才是重点
- 不在 slide 内放滚动内容 — 一屏展示完整，不留截断
- 不省略演讲者备注 — 按 S 随时可查，不依赖记忆
