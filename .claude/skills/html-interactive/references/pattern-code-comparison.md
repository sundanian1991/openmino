# pattern-code-comparison — 代码/方案对比

> 适用于：多种实现方案对比、代码方法优劣、Before/After 对比、技术选型。

---

## 页面结构

```
<header>          标题 + 对比摘要
<section.tabs>    Tab 切换（方案 A / 方案 B / ...）
<section.split>   左右并排对比
<section.table>   优劣对比表
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
  <header class="compare-header">
    <h1>${标题}</h1>
    <p class="compare-summary">${2-3 句摘要}</p>
  </header>

  <div class="compare-tabs">
    <button class="tab active" data-tab="split">并排对比</button>
    <button class="tab" data-tab="table">优劣表</button>
  </div>

  <section class="compare-split" id="split">
    <div class="before-after">
      <div class="before-side"><!-- 方案 A --></div>
      <div class="after-side"><!-- 方案 B --></div>
    </div>
  </section>

  <section class="compare-table" id="table" style="display:none;">
    <table><!-- 优劣对比 --></table>
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
.compare-header { max-width: 960px; margin: 0 auto; padding: 24px; }

.compare-tabs {
  display: flex; gap: 0; max-width: 960px; margin: 0 auto;
  border-bottom: 2px solid var(--g200);
}
.tab {
  padding: 10px 20px; border: none; background: none;
  cursor: pointer; font-size: 0.85em; color: var(--g500);
  border-bottom: 2px solid transparent; margin-bottom: -2px;
}
.tab.active { color: var(--clay); border-bottom-color: var(--clay); font-weight: 600; }

.compare-split, .compare-table {
  max-width: 960px; margin: 0 auto; padding: 24px;
}
```

---

## 组件配方

### Before/After Split

左右两栏对比，左侧标记方案 A，右侧标记方案 B。

```css
.before-after { display: flex; gap: 2px; }
.before-side {
  flex: 1; padding: 24px; border: 1px solid var(--g200);
  border-radius: 12px 0 0 12px; background: var(--g100);
}
.after-side {
  flex: 1; padding: 24px; border: 1px solid var(--olive);
  border-radius: 0 12px 12px 0; background: var(--paper);
}
```

---

## 设计约束

1. **对比 ≤ 3 个方案** — 超过则用 Tab 切换，不并排
2. **优劣表必须覆盖所有方案** — 不只列一个方案的优劣
3. **代码块有语法高亮** — 用 `<span>` + CSS 颜色模拟，不引入库
4. **版心 ≤ 960px** — 并排对比不能太窄
5. **Tab 切换有动画** — 不跳变

---

## 反模式

- 不引入 Prism.js / Highlight.js — 用 CSS 模拟语法高亮
- 不在并排模式中只放代码不放结论 — 对比的目的是帮用户决策
- 不超过 3 栏并排 — 移动端无法阅读
