# pattern-design-system — 设计系统/色彩/字体/间距

> 适用于：设计系统文档、色板展示、字号阶梯、间距规范、Token 清单。
> 核心理念：色卡用色块 + hex + 名称三合一展示，字号阶梯用实际渲染，间距用标尺可视化。

---

## 页面结构

```
<header>              设计系统名称 + 版本
<section.palette>     色板网格（色块 + hex + 名称 + 用途）
<section.type-scale>  字号阶梯（实际渲染 + px/rem 对照）
<section.spacing>     间距标尺（可视化条 + 数值）
<section.tokens>      Token 变量清单（可折叠）
<footer>              使用说明
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${设计系统名}</title>
  <style>
    :root { /* 暖色系统 */ }
    /* 以下为模式专用样式 */
  </style>
</head>
<body>
  <header class="ds-header">
    <h1>${设计系统名}</h1>
    <span class="ds-version">v${版本}</span>
  </header>

  <section class="palette-section">
    <h2>色彩</h2>
    <div class="palette-group">
      <h3>${分组名}</h3>
      <div class="color-grid">
        <div class="color-card">
          <div class="color-swatch" style="background: var(--ivory);"></div>
          <div class="color-info">
            <span class="color-name">ivory</span>
            <span class="color-hex">#FAF8F5</span>
            <span class="color-usage">页面底色</span>
          </div>
        </div>
        <!-- 更多色卡 -->
      </div>
    </div>
  </section>

  <section class="type-section">
    <h2>字号阶梯</h2>
    <div class="type-scale">
      <div class="type-item">
        <span class="type-meta">14px / 0.875rem — body</span>
        <p style="font-size: 14px;">正文文本示例 The quick brown fox</p>
      </div>
      <div class="type-item">
        <span class="type-meta">20px / 1.25rem — h3</span>
        <p style="font-size: 20px; font-weight: 600;">三级标题示例</p>
      </div>
      <!-- 更多字号 -->
    </div>
  </section>

  <section class="spacing-section">
    <h2>间距</h2>
    <div class="spacing-scale">
      <div class="spacing-item">
        <div class="spacing-bar" style="width: 4px;"></div>
        <span class="spacing-value">4px — xs</span>
      </div>
      <div class="spacing-item">
        <div class="spacing-bar" style="width: 8px;"></div>
        <span class="spacing-value">8px — sm</span>
      </div>
      <!-- 更多间距 -->
    </div>
  </section>

  <footer class="ds-footer">
    <p>使用 CSS 变量引用：var(--token-name)</p>
  </footer>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 色板网格 */
.color-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 16px;
}
.color-card {
  border: 1px solid var(--g200); border-radius: 10px;
  overflow: hidden; background: white;
}
.color-swatch {
  height: 80px; width: 100%;
}
/* 浅色色块加内边框，避免融入白底 */
.color-swatch[style*="var(--ivory)"],
.color-swatch[style*="var(--paper)"],
.color-swatch[style*="var(--g100)"] {
  box-shadow: inset 0 0 0 1px var(--g200);
}
.color-info {
  padding: 10px 12px;
  display: flex; flex-direction: column; gap: 2px;
}
.color-name { font-weight: 600; font-size: 0.85em; color: var(--g700); }
.color-hex { font-family: var(--mono); font-size: 0.75em; color: var(--g500); }
.color-usage { font-size: 0.7em; color: var(--g300); margin-top: 2px; }

/* 字号阶梯 */
.type-scale { display: flex; flex-direction: column; gap: 24px; }
.type-item { border-bottom: 1px solid var(--g200); padding-bottom: 16px; }
.type-meta {
  font-family: var(--mono); font-size: 0.7em;
  color: var(--g500); display: block; margin-bottom: 4px;
}

/* 间距标尺 */
.spacing-scale { display: flex; flex-direction: column; gap: 12px; }
.spacing-item { display: flex; align-items: center; gap: 12px; }
.spacing-bar {
  height: 24px; border-radius: 4px;
  background: var(--clay); opacity: 0.6;
  min-width: 2px;
}
.spacing-value { font-family: var(--mono); font-size: 0.8em; color: var(--g500); }
```

---

## JS 交互

```js
// 色卡点击复制 hex 值
document.querySelectorAll('.color-card').forEach(card => {
  card.style.cursor = 'pointer';
  card.addEventListener('click', () => {
    const hex = card.querySelector('.color-hex').textContent;
    navigator.clipboard.writeText(hex).then(() => {
      const name = card.querySelector('.color-name');
      const original = name.textContent;
      name.textContent = '已复制';
      setTimeout(() => name.textContent = original, 800);
    });
  });
});
```

---

## 设计约束

1. **色卡必须显示实际颜色** — 用 CSS 变量渲染，不贴图片
2. **字号阶梯必须实际渲染** — 让读者看到真实效果，不靠想象
3. **间距用可视化标尺** — 数值 + 条形，不靠纯文字
4. **每个 Token 附用途说明** — 不只列名称，要说清楚用在什么地方
5. **色卡网格响应式** — auto-fill + minmax 适配不同宽度
6. **版心 <= 960px** — 文档型页面居中阅读

---

## 反模式

- 不用图片占位色块 — 必须用 CSS 变量实时渲染
- 不按色值排序 — 按用途分组（主色/中性色/语义色）
- 不省略浅色色卡的内边框 — 浅色会融入白底看不清
- 不把所有 Token 平铺 — 分组 + 折叠，信息层级清晰
