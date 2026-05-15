# showcase-index — 多页展示站主页

> 适用于：作品集首页、项目展示站、多案例导航页。
> 核心理念：Hero 吸引注意力，分类 pill 过滤，卡片网格展示内容，简洁 footer 收尾。

---

## 页面结构

```
<header.hero>              Hero banner + 标题 + 副标题
<nav.filters>              分类 pill 过滤
<section.card-grid>        缩略图卡片网格
<footer>                   站点信息 + 链接
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${站名}</title>
  <style>
    :root { /* 暖色系统 */ }
  </style>
</head>
<body>
  <header class="hero">
    <h1 class="hero-title">${站名}</h1>
    <p class="hero-sub">${一句话描述}</p>
  </header>

  <nav class="filters" id="filters">
    <button class="pill active" data-cat="all">全部</button>
    <button class="pill" data-cat="${分类A}">${分类A}</button>
    <button class="pill" data-cat="${分类B}">${分类B}</button>
    <button class="pill" data-cat="${分类C}">${分类C}</button>
  </nav>

  <section class="card-grid" id="grid">
    <a class="card" href="${链接}" data-cat="${分类A}">
      <div class="card-thumb">
        <img src="${缩略图}" alt="${标题}" loading="lazy">
      </div>
      <div class="card-body">
        <h3 class="card-title">${标题}</h3>
        <p class="card-desc">${简介}</p>
        <span class="card-tag">${分类}</span>
      </div>
    </a>

    <a class="card" href="${链接}" data-cat="${分类B}">
      <div class="card-thumb">
        <img src="${缩略图}" alt="${标题}" loading="lazy">
      </div>
      <div class="card-body">
        <h3 class="card-title">${标题}</h3>
        <p class="card-desc">${简介}</p>
        <span class="card-tag">${分类}</span>
      </div>
    </a>
    <!-- 更多卡片 -->
  </section>

  <footer class="site-footer">
    <p>${站点信息}</p>
  </footer>
</body>
</html>
```

---

## CSS 关键样式

```css
/* Hero */
.hero {
  text-align: center;
  padding: 64px 24px 40px;
  max-width: 960px; margin: 0 auto;
}
.hero-title {
  font-family: var(--serif);
  font-size: 2.4em; font-weight: 700;
  color: var(--g700); margin: 0;
}
.hero-sub {
  font-size: 1.1em; color: var(--g500);
  margin: 12px 0 0;
}

/* 分类过滤 */
.filters {
  display: flex; justify-content: center;
  gap: 6px; flex-wrap: wrap;
  max-width: 960px; margin: 0 auto 2em;
  padding: 0 24px;
}
.pill {
  padding: 6px 18px; border: 1px solid var(--g200);
  border-radius: 20px; background: white;
  font-size: 0.85em; cursor: pointer;
  color: var(--g500); transition: all 0.15s;
}
.pill:hover { border-color: var(--clay); color: var(--clay); }
.pill.active {
  background: var(--clay); color: white;
  border-color: var(--clay);
}

/* 卡片网格 */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px; max-width: 960px;
  margin: 0 auto 3em; padding: 0 24px;
}
.card {
  border: 1px solid var(--g200); border-radius: 10px;
  overflow: hidden; background: white;
  text-decoration: none; color: inherit;
  transition: box-shadow 0.2s, transform 0.2s;
}
.card:hover {
  box-shadow: 0 4px 16px rgba(0,0,0,0.08);
  transform: translateY(-2px);
}
.card-thumb {
  width: 100%; aspect-ratio: 16/10;
  overflow: hidden; background: var(--g100);
}
.card-thumb img {
  width: 100%; height: 100%; object-fit: cover;
  transition: transform 0.3s;
}
.card:hover .card-thumb img { transform: scale(1.03); }
.card-body { padding: 16px; }
.card-title {
  font-size: 1em; font-weight: 700;
  color: var(--g700); margin: 0 0 6px;
}
.card-desc {
  font-size: 0.85em; color: var(--g500);
  margin: 0 0 10px; line-height: 1.5;
}
.card-tag {
  display: inline-block; padding: 2px 10px;
  border-radius: 4px; font-size: 0.75em;
  background: var(--g100); color: var(--g500);
}

/* 卡片隐藏动画 */
.card.hidden {
  display: none;
}

/* Footer */
.site-footer {
  text-align: center; padding: 32px 24px;
  border-top: 1px solid var(--g200);
  color: var(--g500); font-size: 0.85em;
}
```

---

## JS 交互

```js
const filters = document.querySelectorAll('.pill');
const cards = document.querySelectorAll('.card');

filters.forEach(btn => {
  btn.addEventListener('click', () => {
    filters.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const cat = btn.dataset.cat;
    cards.forEach(card => {
      if (cat === 'all' || card.dataset.cat === cat) {
        card.classList.remove('hidden');
      } else {
        card.classList.add('hidden');
      }
    });
  });
});
```

---

## 设计约束

1. **卡片网格 auto-fill + minmax(280px)** — 自适应列数，不固定 3 列
2. **分类 pill <= 6 个** — 过多用下拉选择
3. **缩略图 16:10 比例** — 统一视觉节奏
4. **图片 lazy loading** — 性能优化必须
5. **版心 <= 960px** — 展示站需要呼吸感
6. **hover 只做微位移 + 阴影** — 不做翻转/弹跳等花哨动效

---

## 反模式

- 不用瀑布流布局 — 统一卡片高度，视觉更整齐
- 不把分类做成下拉 — pill 按钮一目了然（6 个以内）
- 不省略图片 aspect-ratio — 防止加载时布局跳动
- 不用 infinite scroll — 展示站内容有限，直接渲染全部
