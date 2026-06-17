# pattern-pr-review — 代码变更/PR 审查

> 适用于：Pull Request 审查、代码 diff 展示、变更集可视化、代码评审注释。
> 核心理念：注释式 diff 视图让审查者聚焦变更，严重度标签快速分级，文件侧边栏提供全局导航。

---

## 页面结构

```
<header>             PR 标题 + 作者 + 分支 + 状态标签
<section.sidebar>    文件列表侧边栏（点击跳转）
<main.diff-viewer>   Diff 视图（注释式 + 行着色）
<section.comments>   审查注释（按文件/行号分组）
<footer>             审查摘要 + 合并建议
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${PR标题}</title>
  <style>
    :root { /* 暖色系统 */ }
    /* 以下为模式专用样式 */
  </style>
</head>
<body>
  <header class="pr-header">
    <div class="pr-meta">
      <h1>${PR标题}</h1>
      <div class="pr-info">
        <span class="pr-branch">${source} → ${target}</span>
        <span class="pr-author">${作者}</span>
      </div>
    </div>
    <div class="pr-status">
      <span class="status-tag">${状态}</span>
    </div>
  </header>

  <div class="review-layout">
    <aside class="file-sidebar">
      <h3>变更文件</h3>
      <ul class="file-list">
        <li><a href="#file-${index}" class="file-link" data-added="${N}" data-removed="${N}">
          <span class="file-name">${路径}</span>
          <span class="file-stats">+${N} -${N}</span>
        </a></li>
      </ul>
    </aside>

    <main class="diff-viewer">
      <section class="file-diff" id="file-${index}">
        <div class="file-header">
          <span class="file-path">${路径}</span>
          <span class="severity-tag" data-level="${info|warning|critical}">${严重度}</span>
        </div>
        <table class="diff-table">
          <tr class="diff-line diff-added">
            <td class="line-num">12</td>
            <td class="line-content"><code>+新增行</code></td>
          </tr>
          <tr class="diff-line diff-removed">
            <td class="line-num">11</td>
            <td class="line-content"><code>-删除行</code></td>
          </tr>
          <tr class="diff-line diff-context">
            <td class="line-num">10</td>
            <td class="line-content"><code>未变行</code></td>
          </tr>
        </table>
        <!-- 行内注释 -->
        <div class="inline-comment" data-severity="${level}">
          <span class="comment-severity">${严重度}</span>
          <p>${注释内容}</p>
        </div>
      </section>
    </main>
  </div>

  <footer class="review-summary">
    <div class="summary-stats">
      <span class="stat">+${总增行}</span>
      <span class="stat">-${总删行}</span>
      <span class="stat">${文件数} files</span>
    </div>
  </footer>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 布局 */
.review-layout {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 0;
  max-width: 960px;
  margin: 0 auto;
}

/* 文件侧边栏 */
.file-sidebar {
  position: sticky; top: 20px;
  border-right: 1px solid var(--g200);
  padding: 16px;
  max-height: 80vh; overflow-y: auto;
}
.file-link {
  display: flex; justify-content: space-between;
  padding: 6px 8px; border-radius: 4px;
  text-decoration: none; color: var(--g700);
  font-family: var(--mono); font-size: 0.8em;
}
.file-link:hover { background: var(--g100); }
.file-link.active { background: var(--g200); font-weight: 600; }
.file-stats { font-size: 0.85em; white-space: nowrap; }

/* Diff 表 */
.diff-table {
  width: 100%; border-collapse: collapse;
  font-family: var(--mono); font-size: 0.85em;
}
.diff-line { border: none; }
.line-num {
  width: 50px; padding: 2px 8px;
  text-align: right; color: var(--g500);
  background: var(--g100); user-select: none;
  font-size: 0.9em;
}
.line-content {
  padding: 2px 12px; white-space: pre-wrap;
  word-break: break-all;
}

/* 行着色 */
.diff-added .line-content {
  background: rgba(120, 140, 93, 0.12);
}
.diff-removed .line-content {
  background: rgba(226, 75, 74, 0.1);
  text-decoration: line-through;
  opacity: 0.7;
}

/* 严重度标签 */
.severity-tag {
  font-size: 0.7em; font-weight: 700;
  padding: 2px 8px; border-radius: 4px;
  text-transform: uppercase; letter-spacing: 0.5px;
}
.severity-tag[data-level="info"] {
  background: var(--g100); color: var(--g500);
}
.severity-tag[data-level="warning"] {
  background: rgba(229, 168, 75, 0.15); color: #B8862D;
}
.severity-tag[data-level="critical"] {
  background: rgba(226, 75, 74, 0.12); color: #D94848;
}

/* 行内注释 */
.inline-comment {
  margin: 4px 0 4px 58px;
  padding: 10px 14px; border-radius: 6px;
  font-size: 0.9em; line-height: 1.6;
}
.inline-comment[data-severity="warning"] {
  border-left: 3px solid #E5A84B;
  background: rgba(229, 168, 75, 0.06);
}
.inline-comment[data-severity="critical"] {
  border-left: 3px solid #D94848;
  background: rgba(226, 75, 74, 0.06);
}
.comment-severity {
  font-size: 0.7em; font-weight: 700;
  text-transform: uppercase; margin-right: 8px;
}

/* 审查摘要 */
.summary-stats {
  display: flex; gap: 16px;
  font-family: var(--mono); font-size: 0.9em;
}
.summary-stats .stat:first-child { color: var(--olive); font-weight: 600; }
.summary-stats .stat:nth-child(2) { color: #D94848; font-weight: 600; }
```

---

## JS 交互

```js
// 文件侧边栏跳转
document.querySelectorAll('.file-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      document.querySelectorAll('.file-link').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// 滚动时高亮侧边栏
const fileSections = document.querySelectorAll('.file-diff');
const fileLinks = document.querySelectorAll('.file-link');
window.addEventListener('scroll', () => {
  let current = '';
  fileSections.forEach(section => {
    const top = section.getBoundingClientRect().top;
    if (top < 120) current = section.id;
  });
  fileLinks.forEach(link => {
    link.classList.toggle('active', link.getAttribute('href') === '#' + current);
  });
});
```

---

## 设计约束

1. **行号必须显示** — 审查依赖行号定位，不可省略
2. **严重度不超过 3 级** — info / warning / critical，不细分
3. **每个文件一个严重度标签** — 文件级别总评，不是每行都标
4. **侧边栏 sticky** — 审查长 diff 时保持导航可见
5. **版心 <= 960px** — diff 宽度有限时可横向滚动

---

## 反模式

- 不引入 Monaco/CodeMirror 等 diff 库 — 用原生 table 足够
- 不用图片展示代码 — 必须是可选中可复制的文本
- 不隐藏上下文行 — 至少显示变更前后各 3 行
- 不省略删除行 — 删了什么和加了什么一样重要
