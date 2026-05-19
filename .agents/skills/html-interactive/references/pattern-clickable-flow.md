# pattern-clickable-flow — 用户流程/页面导航

> 适用于：用户旅程地图、多屏串联流程、页面导航原型、步骤向导。
> 核心理念：可点击的多屏串联，步骤指示器提供全局位置感，前进/后退按钮控制节奏。

---

## 页面结构

```
<header>              流程标题 + 步骤指示器
<main.screen-area>    当前屏幕内容（带过渡动画）
<nav.flow-nav>        前进/后退按钮 + 进度
<footer>              流程说明
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${流程标题}</title>
  <style>
    :root { /* 暖色系统 */ }
    /* 以下为模式专用样式 */
  </style>
</head>
<body>
  <header class="flow-header">
    <h1>${流程标题}</h1>
    <nav class="step-indicator">
      <div class="step-dot active" data-step="0">
        <span class="step-num">1</span>
        <span class="step-label">${步骤名}</span>
      </div>
      <div class="step-connector"></div>
      <div class="step-dot" data-step="1">
        <span class="step-num">2</span>
        <span class="step-label">${步骤名}</span>
      </div>
      <div class="step-connector"></div>
      <div class="step-dot" data-step="2">
        <span class="step-num">3</span>
        <span class="step-label">${步骤名}</span>
      </div>
    </nav>
  </header>

  <main class="screen-container">
    <div class="screen active" data-screen="0">
      <h2>${屏幕标题}</h2>
      <div class="screen-content">
        <!-- 屏幕内容 -->
      </div>
    </div>
    <div class="screen" data-screen="1">
      <h2>${屏幕标题}</h2>
      <div class="screen-content">
        <!-- 屏幕内容 -->
      </div>
    </div>
    <div class="screen" data-screen="2">
      <h2>${屏幕标题}</h2>
      <div class="screen-content">
        <!-- 屏幕内容 -->
      </div>
    </div>
  </main>

  <nav class="flow-nav">
    <button class="nav-btn prev" id="prev-btn" disabled>
      <span class="nav-arrow">&larr;</span> 上一步
    </button>
    <span class="nav-progress" id="progress">1 / 3</span>
    <button class="nav-btn next" id="next-btn">
      下一步 <span class="nav-arrow">&rarr;</span>
    </button>
  </nav>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 步骤指示器 */
.step-indicator {
  display: flex; align-items: center; gap: 0;
  margin: 1.5em 0;
}
.step-dot {
  display: flex; flex-direction: column;
  align-items: center; gap: 4px;
  cursor: pointer;
}
.step-num {
  width: 28px; height: 28px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8em; font-weight: 700;
  background: var(--g200); color: var(--g500);
  transition: all 0.2s ease;
}
.step-dot.active .step-num {
  background: var(--clay); color: white;
}
.step-dot.visited .step-num {
  background: var(--olive); color: white;
}
.step-label {
  font-size: 0.7em; color: var(--g500);
  max-width: 80px; text-align: center;
}
.step-dot.active .step-label { color: var(--clay); font-weight: 600; }

.step-connector {
  flex: 1; height: 2px;
  background: var(--g200);
  margin: 0 4px;
  align-self: flex-start;
  margin-top: 14px;
}

/* 屏幕容器 */
.screen-container {
  position: relative;
  max-width: 960px; margin: 0 auto;
  min-height: 400px;
  overflow: hidden;
}
.screen {
  display: none;
  padding: 2em;
  animation: fadeIn 0.3s ease;
}
.screen.active { display: block; }

@keyframes fadeIn {
  from { opacity: 0; transform: translateX(20px); }
  to { opacity: 1; transform: translateX(0); }
}

/* 导航按钮 */
.flow-nav {
  display: flex; justify-content: space-between;
  align-items: center;
  max-width: 960px; margin: 2em auto 0;
  padding: 16px 0;
  border-top: 1px solid var(--g200);
}
.nav-btn {
  padding: 10px 24px; border: 1px solid var(--g200);
  border-radius: 8px; background: white;
  cursor: pointer; font-size: 0.9em;
  color: var(--g700);
  transition: all 0.15s ease;
}
.nav-btn:hover:not(:disabled) {
  border-color: var(--clay); color: var(--clay);
}
.nav-btn:disabled {
  opacity: 0.3; cursor: not-allowed;
}
.nav-btn.next {
  background: var(--clay); color: white;
  border-color: var(--clay);
}
.nav-btn.next:hover:not(:disabled) {
  background: var(--clay-d);
}
.nav-progress {
  font-family: var(--mono); font-size: 0.8em;
  color: var(--g500);
}
```

---

## JS 交互

```js
let currentStep = 0;
const totalSteps = document.querySelectorAll('.screen').length;
const screens = document.querySelectorAll('.screen');
const dots = document.querySelectorAll('.step-dot');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
const progress = document.getElementById('progress');

function goToStep(index) {
  if (index < 0 || index >= totalSteps) return;
  // 更新屏幕
  screens.forEach(s => s.classList.remove('active'));
  screens[index].classList.add('active');
  // 更新步骤指示器
  dots.forEach((d, i) => {
    d.classList.remove('active', 'visited');
    if (i === index) d.classList.add('active');
    else if (i < index) d.classList.add('visited');
  });
  // 更新按钮状态
  prevBtn.disabled = index === 0;
  nextBtn.textContent = index === totalSteps - 1 ? '完成' : '下一步 →';
  progress.textContent = `${index + 1} / ${totalSteps}`;
  currentStep = index;
}

prevBtn.addEventListener('click', () => goToStep(currentStep - 1));
nextBtn.addEventListener('click', () => {
  if (currentStep < totalSteps - 1) goToStep(currentStep + 1);
});

// 点击步骤指示器跳转
dots.forEach(dot => {
  dot.addEventListener('click', () => {
    goToStep(parseInt(dot.dataset.step));
  });
});

// 键盘导航
document.addEventListener('keydown', (e) => {
  if (e.key === 'ArrowRight') goToStep(currentStep + 1);
  if (e.key === 'ArrowLeft') goToStep(currentStep - 1);
});
```

---

## 设计约束

1. **步骤指示器始终可见** — header sticky 或 fixed，让用户知道在哪
2. **步骤 <= 8 个** — 超过 8 步拆成子流程
3. **屏幕切换有过渡动画** — fadeIn + 轻微位移，不用复杂 3D
4. **键盘支持左右箭头** — 无障碍 + 快捷操作
5. **最后一步按钮变"完成"** — 语义明确，不继续显示"下一步"

---

## 反模式

- 不用 SPA 路由 — 单页面内切换 screen 即可
- 不自动跳转 — 用户控制节奏，不强推
- 不省略步骤指示器 — 位置感是流程导航的核心
- 不用复杂 3D 翻转动画 — 简单 fadeIn 足够
