# pattern-incident-timeline — 事故复盘/时间线

> 适用于：事故复盘、故障时间线、项目里程碑、事件序列回顾。

---

## 页面结构

```
<header>          标题 + 事故摘要 + 影响范围
<section.timeline> 垂直时间轴
<section.log>     日志摘录
<section.action>  改进清单
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
  </style>
</head>
<body>
  <header class="incident-header">
    <div class="severity-badge severity-${级别}">${级别}</div>
    <h1>${事故标题}</h1>
    <p class="incident-summary">${影响范围 + 持续时间}</p>
  </header>

  <section class="timeline">
    <div class="timeline-item">
      <div class="timeline-dot active"></div>
      <div class="timeline-date">${时间}</div>
      <div class="timeline-content"><!-- 事件描述 --></div>
    </div>
    <!-- 更多事件 -->
  </section>

  <section class="log-excerpt">
    <details>
      <summary>日志摘录</summary>
      <pre class="log-content"><!-- 日志 --></pre>
    </details>
  </section>

  <section class="action-items">
    <h2>改进清单</h2>
    <ul class="checklist"><!-- --></ul>
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
.incident-header {
  max-width: 960px; margin: 0 auto; padding: 24px;
}
.severity-badge {
  display: inline-block; font-size: 0.7em; font-weight: 700;
  padding: 3px 10px; border-radius: 4px; text-transform: uppercase;
  letter-spacing: 0.05em; margin-bottom: 8px;
}
.severity-badge.severity-p1 { background: rgba(226, 75, 74, 0.12); color: #D94848; }
.severity-badge.severity-p2 { background: rgba(186, 117, 23, 0.12); color: #BA7517; }
.severity-badge.severity-p3 { background: rgba(120, 140, 93, 0.12); color: var(--olive); }

.log-excerpt {
  max-width: 960px; margin: 2em auto; padding: 0 24px;
}
.log-content {
  background: var(--g100); border: 1px solid var(--g200);
  border-radius: 8px; padding: 16px; font-family: var(--mono);
  font-size: 0.75em; line-height: 1.8; overflow-x: auto;
}

.checklist {
  list-style: none; padding: 0;
  max-width: 960px; margin: 0 auto;
}
.checklist li {
  padding: 8px 0; border-bottom: 1px solid var(--g100);
  display: flex; align-items: flex-start; gap: 8px;
}
.checklist li::before {
  content: ''; display: inline-block;
  width: 16px; height: 16px; border: 2px solid var(--g300);
  border-radius: 4px; flex-shrink: 0; margin-top: 2px;
}
.checklist li.done::before {
  background: var(--olive); border-color: var(--olive);
}
```

---

## 组件配方

### Vertical Timeline

垂直时间线：左侧 border + 圆点标记 + 日期高亮。

```css
.timeline {
  position: relative; padding-left: 28px;
  border-left: 2px solid var(--g200);
  max-width: 900px; margin: 2em auto; padding-right: 24px;
}
.timeline-item { margin-bottom: 24px; position: relative; }
.timeline-dot {
  position: absolute; left: -35px; top: 2px;
  width: 12px; height: 12px; background: var(--clay);
  border-radius: 50%; border: 2px solid var(--paper);
}
.timeline-dot.active {
  background: var(--clay-d); border-color: var(--clay);
  box-shadow: 0 0 8px rgba(217, 119, 87, 0.3);
}
.timeline-dot.resolved { background: var(--olive); border-color: var(--olive); }
.timeline-date {
  font-size: 0.8em; font-weight: 600; color: var(--clay);
  letter-spacing: 0.08em; font-family: var(--mono);
}
.timeline-content {
  margin-top: 4px; font-size: 0.9em; line-height: 1.6;
}
```

---

## JS 交互

```js
// 时间线节点点击展开详情
document.querySelectorAll('.timeline-item').forEach(item => {
  item.style.cursor = 'pointer';
  item.addEventListener('click', () => {
    const detail = item.querySelector('.timeline-detail');
    if (detail) detail.hidden = !detail.hidden;
  });
});
```

---

## 设计约束

1. **时间线 ≤ 15 个节点** — 超出则合并或折叠次要事件
2. **时间格式统一** — 全部用 HH:MM 或 HH:MM:SS
3. **严重度标签必须** — P1/P2/P3 用颜色区分
4. **日志摘录可折叠** — 不默认展开大段日志
5. **改进清单有复选框** — 标记已完成/未完成
6. **版心 ≤ 960px**

---

## 反模式

- 不引入 Gantt 图库 — 用纯 CSS 时间线
- 不用纯文字描述事件序列 — 必须可视化
- 不省略时间精度 — "大约"不够，要精确到分钟
