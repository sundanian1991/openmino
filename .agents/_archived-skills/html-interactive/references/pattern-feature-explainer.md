# pattern-feature-explainer — 功能实现原理 / 文档/报告/长文 / 制度/规范/SOP

> 适用于：功能实现原理、技术文档、长文报告、制度规范、SOP 操作手册。
> 核心理念：可折叠步骤分层，Tab 切换代码片段，FAQ 手风琴解答疑问，目录锚点快速跳转。

---

## 页面结构

```
<header>              标题 + 摘要 + 目录锚点
<section.steps>       可折叠步骤组
<section.code-tabs>   代码 Tab 切换
<section.faq>         FAQ 手风琴
<footer>              相关链接
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${标题}</title>
  <style>
    :root { /* 暖色系统 */ }
    /* 以下为模式专用样式 */
  </style>
</head>
<body>
  <header class="doc-header">
    <h1>${标题}</h1>
    <p class="doc-summary">${2-3 句摘要}</p>
    <nav class="toc">
      <h3>目录</h3>
      <ul>
        <li><a href="#step-${N}">${步骤标题}</a></li>
        <li><a href="#code-section">代码</a></li>
        <li><a href="#faq">常见问题</a></li>
      </ul>
    </nav>
  </header>

  <section class="steps-section">
    <details class="step-group" id="step-1" open>
      <summary>
        <span class="step-num">1</span>
        <span class="step-title">${步骤标题}</span>
      </summary>
      <div class="step-content">
        <p>${步骤内容}</p>
        <!-- 可嵌入图片/图表 -->
      </div>
    </details>

    <details class="step-group" id="step-2">
      <summary>
        <span class="step-num">2</span>
        <span class="step-title">${步骤标题}</span>
      </summary>
      <div class="step-content">
        <p>${步骤内容}</p>
      </div>
    </details>
    <!-- 更多步骤 -->
  </section>

  <section class="code-section" id="code-section">
    <h2>代码示例</h2>
    <div class="code-tabs">
      <div class="tab-bar">
        <button class="tab-btn active" data-tab="tab-1">${语言/文件名}</button>
        <button class="tab-btn" data-tab="tab-2">${语言/文件名}</button>
      </div>
      <div class="tab-content active" id="tab-1">
        <pre><code>${代码}</code></pre>
      </div>
      <div class="tab-content" id="tab-2">
        <pre><code>${代码}</code></pre>
      </div>
    </div>
  </section>

  <section class="faq-section" id="faq">
    <h2>常见问题</h2>
    <details class="faq-item">
      <summary>${问题}</summary>
      <div class="faq-answer">
        <p>${回答}</p>
      </div>
    </details>
    <!-- 更多 FAQ -->
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 目录 */
.toc {
  margin: 1.5em 0; padding: 16px 20px;
  background: var(--g100); border-radius: 10px;
}
.toc h3 {
  font-size: 0.85em; font-weight: 700;
  color: var(--g500); margin: 0 0 8px;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.toc ul { list-style: none; padding: 0; margin: 0; }
.toc li { margin-bottom: 4px; }
.toc a {
  font-size: 0.9em; color: var(--clay);
  text-decoration: none;
}
.toc a:hover { text-decoration: underline; }

/* 步骤折叠组 */
.step-group {
  border: 1px solid var(--g200); border-radius: 10px;
  margin-bottom: 8px; overflow: hidden;
}
.step-group summary {
  display: flex; align-items: center; gap: 12px;
  padding: 14px 20px; cursor: pointer;
  font-weight: 600; color: var(--g700);
  background: var(--paper);
  list-style: none;
}
.step-group summary::-webkit-details-marker { display: none; }
.step-num {
  width: 28px; height: 28px; border-radius: 50%;
  background: var(--clay); color: white;
  display: flex; align-items: center; justify-content: center;
  font-size: 0.8em; font-weight: 700; flex-shrink: 0;
}
.step-content {
  padding: 16px 20px 16px 60px;
  font-size: 0.95em; line-height: 1.8;
  color: var(--g700); border-top: 1px solid var(--g200);
}

/* 代码 Tab */
.tab-bar {
  display: flex; gap: 0;
  border-bottom: 2px solid var(--g200);
}
.tab-btn {
  padding: 10px 20px; border: none;
  background: transparent; cursor: pointer;
  font-size: 0.85em; font-weight: 500;
  color: var(--g500);
  border-bottom: 2px solid transparent;
  margin-bottom: -2px;
}
.tab-btn.active {
  color: var(--clay); font-weight: 600;
  border-bottom-color: var(--clay);
}
.tab-content {
  display: none; margin-top: 1em;
}
.tab-content.active { display: block; }
.tab-content pre {
  background: var(--g100); border-radius: 8px;
  padding: 16px; overflow-x: auto;
  font-family: var(--mono); font-size: 0.85em;
  line-height: 1.6;
}

/* FAQ 手风琴 */
.faq-item {
  border-bottom: 1px solid var(--g200);
}
.faq-item summary {
  padding: 14px 0; cursor: pointer;
  font-weight: 600; color: var(--g700);
  list-style: none;
}
.faq-item summary::-webkit-details-marker { display: none; }
.faq-answer {
  padding: 0 0 14px;
  font-size: 0.95em; line-height: 1.7;
  color: var(--g500);
}
```

---

## JS 交互

```js
// Tab 切换
document.querySelectorAll('.tab-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    const tabGroup = btn.closest('.code-tabs');
    tabGroup.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    tabGroup.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    btn.classList.add('active');
    document.getElementById(btn.dataset.tab).classList.add('active');
  });
});

// 目录锚点平滑滚动
document.querySelectorAll('.toc a').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
```

---

## 设计约束

1. **步骤 <= 10 个** — 超过则分组或拆成多页
2. **代码 Tab <= 4 个** — 太多代码片段失去焦点
3. **FAQ <= 8 条** — 真正高频问题才收录
4. **目录锚点必须与内容对应** — 每个锚点都跳转到实际存在的 section
5. **默认展开第一个步骤** — 给读者起点，不全折叠
6. **版心 <= 960px** — 长文阅读舒适度优先

---

## 反模式

- 不把所有内容平铺 — 折叠/Tab/手风琴控制信息密度
- 不省略目录 — 长文档必须提供导航
- 不用 alert/prompt 做交互 — 用原生 details/summary
- 不在步骤内嵌完整代码 — 代码放独立 Tab 区，步骤只放关键片段
