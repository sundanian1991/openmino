# pattern-prompt-tuner — 提示词调优

> 适用于：Prompt 编辑调试、模板变量替换、提示词 A/B 对比、变量高亮。
> 核心理念：左编辑右预览，变量 {{}} 高亮标注，实时预览替换结果。

---

## 页面结构

```
<header>              工具标题
<section.editor>      左侧编辑器 + 右侧预览（分栏）
<section.variables>   变量面板（自动提取 {{变量名}}）
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
  <title>${标题}</title>
  <style>
    :root { /* 暖色系统 */ }
    /* 以下为模式专用样式 */
  </style>
</head>
<body>
  <header class="tuner-header">
    <h1>${标题}</h1>
    <p class="tuner-desc">${一句话描述}</p>
  </header>

  <section class="tuner-layout">
    <div class="editor-pane">
      <h3>编辑</h3>
      <div class="editor-wrap">
        <pre class="editor-highlight" id="highlight-layer"></pre>
        <textarea class="editor-textarea" id="editor" spellcheck="false"
          placeholder="输入提示词，用 {{变量名}} 标记变量..."></textarea>
      </div>
    </div>

    <div class="preview-pane">
      <h3>预览</h3>
      <div class="preview-content" id="preview">
        <p class="preview-empty">编辑左侧内容后这里会显示预览</p>
      </div>
    </div>
  </section>

  <section class="variables-panel" id="vars-panel">
    <h3>变量</h3>
    <div class="vars-list" id="vars-list">
      <!-- 动态生成变量输入框 -->
    </div>
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 分栏布局 */
.tuner-layout {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
  max-width: 960px;
  margin: 0 auto;
  border: 1px solid var(--g200);
  border-radius: 12px;
  overflow: hidden;
}

/* 编辑器 */
.editor-pane, .preview-pane {
  padding: 0;
}
.editor-pane {
  border-right: 1px solid var(--g200);
}
.editor-pane h3, .preview-pane h3 {
  padding: 10px 16px; margin: 0;
  font-size: 0.8em; font-weight: 700;
  color: var(--g500); text-transform: uppercase;
  letter-spacing: 0.5px;
  background: var(--g100);
  border-bottom: 1px solid var(--g200);
}
.editor-wrap {
  position: relative;
  min-height: 300px;
}
.editor-highlight, .editor-textarea {
  position: absolute; top: 0; left: 0;
  width: 100%; height: 100%;
  padding: 16px;
  font-family: var(--mono); font-size: 0.9em;
  line-height: 1.7; white-space: pre-wrap;
  word-wrap: break-word;
  overflow-y: auto;
  margin: 0;
}
.editor-highlight {
  pointer-events: none;
  color: transparent;
  z-index: 1;
}
.editor-textarea {
  background: transparent;
  border: none; outline: none; resize: none;
  color: var(--g700);
  z-index: 2;
  caret-color: var(--clay);
}

/* 变量高亮 */
.var-highlight {
  background: rgba(168, 130, 93, 0.15);
  border-radius: 3px;
  padding: 1px 2px;
  color: var(--clay);
  font-weight: 600;
}

/* 预览 */
.preview-content {
  padding: 16px;
  min-height: 300px;
  font-size: 0.95em; line-height: 1.8;
  color: var(--g700);
}
.preview-empty {
  color: var(--g300); font-style: italic;
}
.preview-var {
  background: var(--g100);
  padding: 1px 6px; border-radius: 3px;
  font-family: var(--mono); font-size: 0.9em;
  color: var(--clay); font-weight: 600;
  border: 1px dashed var(--clay);
}

/* 变量面板 */
.variables-panel {
  max-width: 960px; margin: 1.5em auto 0;
  padding: 16px;
  border: 1px solid var(--g200); border-radius: 10px;
  background: var(--paper);
}
.variables-panel h3 {
  font-size: 0.8em; font-weight: 700;
  color: var(--g500); text-transform: uppercase;
  margin: 0 0 12px;
}
.vars-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 8px;
}
.var-input-group {
  display: flex; align-items: center; gap: 8px;
}
.var-input-label {
  font-family: var(--mono); font-size: 0.8em;
  color: var(--clay); font-weight: 600;
  min-width: 80px;
}
.var-input {
  flex: 1; padding: 6px 10px;
  border: 1px solid var(--g200); border-radius: 6px;
  font-size: 0.85em; outline: none;
}
.var-input:focus { border-color: var(--clay); }
```

---

## JS 交互

```js
const editor = document.getElementById('editor');
const highlightLayer = document.getElementById('highlight-layer');
const preview = document.getElementById('preview');
const varsList = document.getElementById('vars-list');
const vars = {};

// 提取变量
function extractVars(text) {
  const matches = text.match(/\{\{([^}]+)\}\}/g) || [];
  return [...new Set(matches.map(m => m.slice(2, -2).trim()))];
}

// 更新高亮层
function updateHighlight(text) {
  const html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\{\{([^}]+)\}\}/g, '<span class="var-highlight">{{$1}}</span>');
  highlightLayer.innerHTML = html + '\n';
}

// 更新预览
function updatePreview(text) {
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
  // 替换已填值的变量
  Object.entries(vars).forEach(([name, value]) => {
    if (value) {
      html = html.replace(
        new RegExp(`\\{\\{${name}\\}\\}`, 'g'),
        `<span class="preview-var">${value}</span>`
      );
    }
  });
  // 未填值的保留高亮
  html = html.replace(/\{\{([^}]+)\}\}/g, '<span class="preview-var">{{$1}}</span>');
  preview.innerHTML = `<p>${html.replace(/\n/g, '<br>')}</p>`;
}

// 更新变量面板
function updateVarsPanel(varNames) {
  // 添加新变量
  varNames.forEach(name => {
    if (!vars.hasOwnProperty(name)) vars[name] = '';
    if (!document.getElementById('var-' + name)) {
      const group = document.createElement('div');
      group.className = 'var-input-group';
      group.innerHTML = `
        <label class="var-input-label">{{${name}}}</label>
        <input type="text" class="var-input" id="var-${name}"
          data-var="${name}" placeholder="输入替换值...">
      `;
      varsList.appendChild(group);
      group.querySelector('.var-input').addEventListener('input', (e) => {
        vars[name] = e.target.value;
        updatePreview(editor.value);
      });
    }
  });
  // 移除不再存在的变量
  Object.keys(vars).forEach(name => {
    if (!varNames.includes(name)) {
      delete vars[name];
      const el = document.getElementById('var-' + name);
      if (el) el.closest('.var-input-group').remove();
    }
  });
}

// 编辑器输入
editor.addEventListener('input', () => {
  const text = editor.value;
  updateHighlight(text);
  updatePreview(text);
  updateVarsPanel(extractVars(text));
});

// 同步滚动
editor.addEventListener('scroll', () => {
  highlightLayer.scrollTop = editor.scrollTop;
});
```

---

## 设计约束

1. **编辑器和预览等宽** — 左右 1:1 分栏，视觉平衡
2. **变量用 {{变量名}} 语法** — Mustache 风格，通用易识别
3. **高亮层和输入层同步** — 字体/行高/padding 完全一致
4. **变量面板自动提取** — 不需要手动声明变量
5. **版心 <= 960px** — 编辑器宽度适中

---

## 反模式

- 不引入 CodeMirror/Monaco — textarea + pre 叠加层足够
- 不做语法校验 — 只做变量提取和高亮
- 不自动保存 — 单次使用，不引入存储逻辑
- 不把预览放编辑器下方 — 左右分栏比上下更直观
