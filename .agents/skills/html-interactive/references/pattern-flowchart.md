# pattern-flowchart — 部署管道/决策流程

> 适用于：部署流程、决策树、审批链路、数据管道、工作流展示。

---

## 页面结构

```
<header>          标题 + 流程概要
<section.flow>    水平/垂直流程图
<section.detail>  点击节点展开详情
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
  <header class="flow-header">
    <h1>${标题}</h1>
    <p>${流程概要}</p>
  </header>

  <section class="flow-container">
    <div class="flow-steps">
      <div class="flow-node done"><!-- 步骤 1 --></div>
      <svg class="flow-arrow"><!-- 箭头 --></svg>
      <div class="flow-node active"><!-- 步骤 2 --></div>
      <svg class="flow-arrow"><!-- 箭头 --></svg>
      <div class="flow-node"><!-- 步骤 3 --></div>
    </div>
  </section>

  <section class="flow-detail" id="detail">
    <details><!-- 展开详情 --></details>
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
.flow-header { max-width: 960px; margin: 0 auto; padding: 24px; }

.flow-container {
  max-width: 960px; margin: 0 auto; padding: 24px;
  overflow-x: auto;
}

.flow-steps {
  display: flex; align-items: center; gap: 8px;
  min-width: max-content;
}

.flow-detail {
  max-width: 960px; margin: 0 auto; padding: 0 24px;
}
```

---

## 组件配方

### Flowchart (SVG 节点 + 箭头)

水平流程节点，SVG 箭头连接。

```css
.flow-node {
  background: var(--paper); border: 2px solid var(--g300);
  border-radius: 12px; padding: 14px 20px; text-align: center; min-width: 100px;
  cursor: pointer; transition: border-color 0.15s ease;
}
.flow-node:hover { border-color: var(--clay); }
.flow-node.active { border-color: var(--clay); box-shadow: 0 0 0 3px rgba(217, 119, 87, 0.15); }
.flow-node.done { border-color: var(--olive); }
.flow-node-title { font-weight: 700; font-size: 0.85em; }
.flow-node-desc { font-size: 0.7em; color: var(--g500); margin-top: 4px; }
```

SVG 箭头：

```html
<svg width="32" height="20" viewBox="0 0 32 20">
  <line x1="0" y1="10" x2="24" y2="10" stroke="var(--g300)" stroke-width="2"/>
  <polygon points="24,5 32,10 24,15" fill="var(--g300)"/>
</svg>
```

---

## JS 交互

```js
document.querySelectorAll('.flow-node').forEach(node => {
  node.addEventListener('click', () => {
    // 高亮当前节点，展开详情
    document.querySelectorAll('.flow-node').forEach(n => n.classList.remove('active'));
    node.classList.add('active');
    // 更新详情区
  });
});
```

---

## 设计约束

1. **节点 ≤ 8 个** — 超过则分组或分层
2. **水平优先** — 步骤少用水平，多用垂直
3. **每个节点可点击展开详情** — 不只有名字
4. **SVG 箭头不用图片** — 纯 SVG 绘制
5. **版心 ≤ 960px** — 超宽流程可横向滚动

---

## 反模式

- 不引入 Mermaid / Graphviz — 用内联 SVG
- 不用纯文字描述流程 — 必须可视化
- 不超过 8 个节点 — 复杂流程拆分子流程
