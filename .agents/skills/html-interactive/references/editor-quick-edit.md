# editor-quick-edit — 页面内快速编辑器

> 适用于：生成 HTML 后的微调 — 改文字、调颜色、调间距、拖拽排序。
> 核心理念：浏览器内直接编辑，不用回到 AI 对话。编辑完成一键导出干净 HTML。
> 注入条件：默认注入（右上角"编辑"按钮），用户说"演示用/最终版/直接发"时跳过。

---

## 注入位置

编辑器代码作为 `</body>` 前的最后一块注入，包含一个 `<style>` 和一个 `<script>`。

```
生成的 HTML 结构：
  ...
  <!-- 页面原有内容 -->

  <!-- 快速编辑器注入开始 -->
  <style>/* 编辑器样式 */</style>
  <div id="qe-toolbar">...</div>
  <div id="qe-prop-panel">...</div>
  <div id="qe-text-toolbar">...</div>
  <script>/* 编辑器逻辑 */</script>
  <!-- 快速编辑器注入结束 -->
</body>
```

导出时剔除 `<!-- 快速编辑器注入开始 -->` 到 `<!-- 快速编辑器注入结束 -->` 之间的所有内容。

---

## P0 能力：基础编辑

### 编辑模式开关 + 导出

右上角固定浮动按钮组：`[编辑] [导出]`

- **编辑按钮**：切换 contentEditable，改变页面元素可编辑状态
- **导出按钮**：剥离编辑器代码，生成干净 HTML 并下载

```html
<div id="qe-toolbar">
  <button id="qe-toggle" title="切换编辑模式">编辑</button>
  <button id="qe-export" title="导出干净 HTML">导出</button>
</div>
```

### contentEditable 范围

编辑模式激活后，以下元素变为可编辑：

| 选择器 | 说明 |
|--------|------|
| `h1, h2, h3, h4, h5, h6` | 所有标题 |
| `p, li, td, th, figcaption, blockquote` | 正文段落和表格单元格 |
| `span[data-entity]` | 语义标注数据点 |
| `a.card` 内的文字 | 卡片标题和描述 |

**不编辑**：`<svg>` 内元素、`<img>`、`<style>`、`<script>`。

---

## P1 能力：样式微调 + 排序

### 文字工具栏

选中文字后，在选区上方弹出浮动工具栏（类似 Medium 编辑器）。

```html
<div id="qe-text-toolbar">
  <button data-cmd="bold" title="加粗">B</button>
  <button data-cmd="italic" title="斜体">I</button>
  <button data-cmd="underline" title="下划线">U</button>
  <span class="qe-sep"></span>
  <button data-cmd="color" title="文字颜色">
    <input type="color" id="qe-color-picker" value="#D97757">
  </button>
  <select id="qe-font-size" title="字号">
    <option value="">字号</option>
    <option value="0.85em">小</option>
    <option value="1em">正常</option>
    <option value="1.15em">大</option>
    <option value="1.3em">加大</option>
    <option value="1.5em">超大</option>
  </select>
</div>
```

**行为**：
- 鼠标松开后检测选区，有选区则定位工具栏到选区上方
- 点击工具栏按钮对选区执行 `document.execCommand`
- 点击页面空白处隐藏工具栏

### 元素属性面板

双击任意非文字元素（section/card/div 等），右侧弹出属性面板。

```html
<div id="qe-prop-panel">
  <div class="qe-pp-header">
    <span>属性</span>
    <button id="qe-pp-close">×</button>
  </div>
  <div class="qe-pp-body">
    <label>背景色 <input type="color" data-prop="backgroundColor"></label>
    <label>文字色 <input type="color" data-prop="color"></label>
    <label>字号 <input type="range" min="10" max="48" data-prop="fontSize"></label>
    <label>内间距 <input type="range" min="0" max="60" data-prop="padding"></label>
    <label>外间距 <input type="range" min="0" max="60" data-prop="margin"></label>
    <label>圆角 <input type="range" min="0" max="30" data-prop="borderRadius"></label>
    <label>边框色 <input type="color" data-prop="borderColor"></label>
    <label>边框宽 <input type="range" min="0" max="5" data-prop="borderWidth"></label>
  </div>
</div>
```

**行为**：
- 双击元素时，面板读取该元素的计算样式，填入控件
- 修改控件值实时反映到元素（inline style）
- 点 × 关闭面板

### Section 拖拽排序

编辑模式激活时，`<section>` 元素获得拖拽手柄。

```html
<!-- 每个 section 顶部动态注入 -->
<div class="qe-drag-handle" draggable="true" title="拖拽排序">⠿</div>
```

**行为**：
- 拖拽手柄在 section 顶部，hover 时显示
- dragstart/dragover/drop 实现排序
- 拖拽过程中 section 半透明，目标位置显示插入线

### 撤销/重做

用 MutationObserver 记录 DOM 变更快照。

```html
<!-- 追加到工具栏 -->
<button id="qe-undo" title="撤销" disabled>↩</button>
<button id="qe-redo" title="重做" disabled>↪</button>
```

---

## 完整 CSS

```css
/* === 快速编辑器样式 === */
#qe-toolbar {
  position: fixed; top: 12px; right: 12px; z-index: 99999;
  display: flex; gap: 6px;
}
#qe-toolbar button {
  padding: 6px 14px; border: 1.5px solid var(--g300);
  border-radius: 8px; background: var(--paper);
  color: var(--g700); font-size: 0.85em; font-weight: 600;
  cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.06);
  transition: all 150ms ease;
}
#qe-toolbar button:hover {
  border-color: var(--clay); color: var(--clay);
  box-shadow: 0 4px 12px rgba(0,0,0,0.10);
}
#qe-toolbar button.active {
  background: var(--clay); color: #fff; border-color: var(--clay);
}
#qe-toolbar button:disabled {
  opacity: 0.4; cursor: default;
}

/* 文字工具栏 */
#qe-text-toolbar {
  position: fixed; z-index: 99998;
  display: none; flex-direction: row; align-items: center; gap: 4px;
  padding: 4px 8px; border-radius: 8px;
  background: var(--slate); box-shadow: 0 4px 16px rgba(0,0,0,0.2);
}
#qe-text-toolbar button {
  width: 30px; height: 30px; border: none; border-radius: 4px;
  background: transparent; color: #fff; font-size: 0.85em;
  cursor: pointer; font-weight: 700;
}
#qe-text-toolbar button:hover { background: rgba(255,255,255,0.15); }
#qe-text-toolbar .qe-sep {
  width: 1px; height: 20px; background: rgba(255,255,255,0.2); margin: 0 2px;
}
#qe-text-toolbar input[type="color"] {
  width: 24px; height: 24px; border: none; padding: 0;
  border-radius: 4px; cursor: pointer; background: transparent;
}
#qe-text-toolbar select {
  padding: 2px 4px; border: 1px solid rgba(255,255,255,0.3);
  border-radius: 4px; background: rgba(255,255,255,0.1);
  color: #fff; font-size: 0.75em; outline: none;
}

/* 属性面板 */
#qe-prop-panel {
  position: fixed; top: 60px; right: 12px; z-index: 99997;
  width: 220px; display: none;
  background: var(--paper); border: 1.5px solid var(--g300);
  border-radius: 12px; box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  overflow: hidden;
}
#qe-prop-panel.open { display: block; }
.qe-pp-header {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 14px; font-size: 0.8em; font-weight: 700;
  color: var(--g500); text-transform: uppercase;
  background: var(--g100); border-bottom: 1px solid var(--g200);
}
.qe-pp-header button {
  border: none; background: none; font-size: 1.2em;
  cursor: pointer; color: var(--g500);
}
.qe-pp-body { padding: 12px 14px; display: flex; flex-direction: column; gap: 10px; }
.qe-pp-body label {
  display: flex; justify-content: space-between; align-items: center;
  font-size: 0.8em; color: var(--g700);
}
.qe-pp-body input[type="color"] {
  width: 28px; height: 28px; border: 1px solid var(--g200);
  border-radius: 4px; cursor: pointer; padding: 1px;
}
.qe-pp-body input[type="range"] { width: 100px; }

/* 拖拽手柄 */
.qe-drag-handle {
  display: none; padding: 4px 8px; margin: 0 auto;
  font-size: 1.2em; cursor: grab; color: var(--g300);
  user-select: none; text-align: center;
  transition: color 150ms;
}
body.qe-editing .qe-drag-handle { display: block; }
.qe-drag-handle:hover { color: var(--clay); }
section.qe-dragging { opacity: 0.5; }
section.qe-drop-target::before {
  content: ''; display: block; height: 3px;
  background: var(--clay); border-radius: 2px; margin-bottom: 4px;
}

/* 编辑态视觉提示 */
body.qe-editing [contenteditable="true"] {
  outline: 1px dashed transparent;
  transition: outline-color 200ms;
}
body.qe-editing [contenteditable="true"]:hover {
  outline-color: var(--clay);
}
body.qe-editing [contenteditable="true"]:focus {
  outline-color: var(--clay);
  outline-offset: 2px;
}
```

---

## 完整 JS

```js
(function() {
  'use strict';

  /* --- 状态 --- */
  let editing = false;
  const undoStack = [];
  const redoStack = [];
  let observer = null;

  /* --- 工具栏 --- */
  const toolbar = document.getElementById('qe-toolbar');
  const toggleBtn = document.getElementById('qe-toggle');
  const exportBtn = document.getElementById('qe-export');
  const undoBtn = document.getElementById('qe-undo');
  const redoBtn = document.getElementById('qe-redo');

  /* 可编辑选择器 */
  const editableSelector = 'h1,h2,h3,h4,h5,h6,p,li,td,th,figcaption,blockquote,span[data-entity]';

  toggleBtn.addEventListener('click', () => {
    editing = !editing;
    document.body.classList.toggle('qe-editing', editing);
    toggleBtn.classList.toggle('active', editing);
    toggleBtn.textContent = editing ? '编辑中' : '编辑';
    document.querySelectorAll(editableSelector).forEach(el => {
      el.contentEditable = editing ? 'true' : 'false';
    });
    if (editing) {
      startObserver();
      injectDragHandles();
    } else {
      stopObserver();
      removeDragHandles();
      hideTextToolbar();
      hidePropPanel();
    }
  });

  /* --- 导出 --- */
  exportBtn.addEventListener('click', () => {
    // 先关闭编辑模式
    if (editing) toggleBtn.click();
    // 克隆文档
    const clone = document.documentElement.cloneNode(true);
    // 剔除编辑器代码
    const markers = clone.querySelectorAll(
      '#qe-toolbar, #qe-text-toolbar, #qe-prop-panel, style#qe-styles'
    );
    markers.forEach(el => el.remove());
    // 剔除注释标记之间的内容
    const html = clone.outerHTML
      .replace(/<!-- 快速编辑器注入开始 -->[\s\S]*?<!-- 快速编辑器注入结束 -->/g, '')
      // 清除残留的 drag handle 和 inline 编辑痕迹
      .replace(/<div class="qe-drag-handle"[^>]*>.*?<\/div>/g, '')
      .replace(/\s*contenteditable="true"/g, '')
      .replace(/\s*class="qe-dragging"/g, '')
      .replace(/\s*class="qe-drop-target"/g, '')
      .replace(/body class="[^"]*qe-editing[^"]*"/g, 'body');
    // 下载
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = (document.title || 'page') + '.html';
    a.click();
    URL.revokeObjectURL(a.href);
  });

  /* --- 撤销/重做 --- */
  function saveSnapshot() {
    const snapshot = document.body.innerHTML;
    undoStack.push(snapshot);
    redoStack.length = 0;
    if (undoStack.length > 50) undoStack.shift();
    undoBtn.disabled = false;
  }

  undoBtn.addEventListener('click', () => {
    if (undoStack.length === 0) return;
    redoStack.push(document.body.innerHTML);
    document.body.innerHTML = undoStack.pop();
    undoBtn.disabled = undoStack.length === 0;
    redoBtn.disabled = false;
  });

  redoBtn.addEventListener('click', () => {
    if (redoStack.length === 0) return;
    undoStack.push(document.body.innerHTML);
    document.body.innerHTML = redoStack.pop();
    redoBtn.disabled = redoStack.length === 0;
    undoBtn.disabled = false;
  });

  /* --- MutationObserver --- */
  function startObserver() {
    if (observer) return;
    let debounce = null;
    observer = new MutationObserver(() => {
      clearTimeout(debounce);
      debounce = setTimeout(saveSnapshot, 500);
    });
    observer.observe(document.body, {
      childList: true, subtree: true,
      characterData: true, attributes: true
    });
  }
  function stopObserver() {
    if (observer) { observer.disconnect(); observer = null; }
  }

  /* --- 文字工具栏 --- */
  const textToolbar = document.getElementById('qe-text-toolbar');

  function showTextToolbar() {
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    const range = sel.getRangeAt(0);
    const rect = range.getBoundingClientRect();
    textToolbar.style.display = 'flex';
    textToolbar.style.left = (rect.left + rect.width / 2 - 100) + 'px';
    textToolbar.style.top = (rect.top - 44 + window.scrollY) + 'px';
  }
  function hideTextToolbar() {
    textToolbar.style.display = 'none';
  }

  document.addEventListener('mouseup', (e) => {
    if (!editing) return;
    if (textToolbar.contains(e.target)) return;
    setTimeout(() => {
      const sel = window.getSelection();
      if (sel && !sel.isCollapsed) showTextToolbar();
      else hideTextToolbar();
    }, 10);
  });

  // 工具栏按钮
  textToolbar.querySelectorAll('button[data-cmd]').forEach(btn => {
    btn.addEventListener('mousedown', (e) => e.preventDefault());
    btn.addEventListener('click', () => {
      const cmd = btn.dataset.cmd;
      document.execCommand(cmd, false, null);
    });
  });

  // 颜色选择器
  const colorPicker = document.getElementById('qe-color-picker');
  colorPicker.addEventListener('input', () => {
    document.execCommand('foreColor', false, colorPicker.value);
  });

  // 字号选择
  const fontSizeSelect = document.getElementById('qe-font-size');
  fontSizeSelect.addEventListener('change', () => {
    if (!fontSizeSelect.value) return;
    const sel = window.getSelection();
    if (!sel || sel.isCollapsed) return;
    // 用 span 包裹选区并设置字号
    document.execCommand('fontSize', false, '7');
    const fontEls = document.querySelectorAll('font[size="7"]');
    fontEls.forEach(el => {
      const span = document.createElement('span');
      span.style.fontSize = fontSizeSelect.value;
      el.parentNode.insertBefore(span, el);
      span.appendChild(el);
      el.outerHTML = el.innerHTML;
    });
    fontSizeSelect.value = '';
  });

  /* --- 属性面板 --- */
  const propPanel = document.getElementById('qe-prop-panel');
  let activeElement = null;

  function showPropPanel(el) {
    activeElement = el;
    propPanel.classList.add('open');
    const cs = window.getComputedStyle(el);
    propPanel.querySelectorAll('input[data-prop]').forEach(input => {
      const prop = input.dataset.prop;
      if (input.type === 'color') {
        const val = cs[prop];
        input.value = rgbToHex(val);
      } else if (input.type === 'range') {
        let val = parseInt(cs[prop]);
        if (prop === 'fontSize') val = parseFloat(cs[prop]);
        input.value = val;
      }
    });
  }
  function hidePropPanel() {
    propPanel.classList.remove('open');
    activeElement = null;
  }

  document.getElementById('qe-pp-close').addEventListener('click', hidePropPanel);

  // 双击打开属性面板
  document.addEventListener('dblclick', (e) => {
    if (!editing) return;
    if (propPanel.contains(e.target)) return;
    if (toolbar.contains(e.target)) return;
    // 找最近的 section/card/div（非文字元素）
    const target = e.target.closest('section, .card, article, .metric-card, [class*="card"]');
    if (target) {
      e.preventDefault();
      showPropPanel(target);
    }
  });

  // 属性修改
  propPanel.querySelectorAll('input[data-prop]').forEach(input => {
    const handler = () => {
      if (!activeElement) return;
      const prop = input.dataset.prop;
      let val = input.value;
      if (input.type === 'range') {
        val = prop === 'fontSize' ? val + 'px' : val + 'px';
      }
      activeElement.style[prop] = val;
    };
    input.addEventListener('input', handler);
  });

  /* --- 拖拽排序 --- */
  function injectDragHandles() {
    document.querySelectorAll('section').forEach(section => {
      if (section.querySelector('.qe-drag-handle')) return;
      const handle = document.createElement('div');
      handle.className = 'qe-drag-handle';
      handle.textContent = '⠇';
      handle.draggable = true;
      section.insertBefore(handle, section.firstChild);

      handle.addEventListener('dragstart', (e) => {
        section.classList.add('qe-dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', '');
      });
      handle.addEventListener('dragend', () => {
        section.classList.remove('qe-dragging');
        document.querySelectorAll('.qe-drop-target').forEach(el =>
          el.classList.remove('qe-drop-target')
        );
      });
    });

    document.querySelectorAll('section').forEach(section => {
      section.addEventListener('dragover', (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        document.querySelectorAll('.qe-drop-target').forEach(el =>
          el.classList.remove('qe-drop-target')
        );
        section.classList.add('qe-drop-target');
      });
      section.addEventListener('drop', (e) => {
        e.preventDefault();
        const dragging = document.querySelector('.qe-dragging');
        if (!dragging || dragging === section) return;
        const sections = [...document.querySelectorAll('body > section, main > section')];
        const dragIdx = sections.indexOf(dragging);
        const dropIdx = sections.indexOf(section);
        if (dragIdx < dropIdx) {
          section.after(dragging);
        } else {
          section.before(dragging);
        }
        section.classList.remove('qe-drop-target');
        saveSnapshot();
      });
    });
  }

  function removeDragHandles() {
    document.querySelectorAll('.qe-drag-handle').forEach(el => el.remove());
    document.querySelectorAll('.qe-dragging, .qe-drop-target').forEach(el => {
      el.classList.remove('qe-dragging', 'qe-drop-target');
    });
  }

  /* --- 工具函数 --- */
  function rgbToHex(rgb) {
    if (!rgb || rgb.startsWith('#')) return rgb || '#000000';
    const match = rgb.match(/(\d+)/g);
    if (!match || match.length < 3) return '#000000';
    return '#' + match.slice(0, 3).map(x => {
      const hex = parseInt(x).toString(16);
      return hex.length === 1 ? '0' + hex : hex;
    }).join('');
  }
})();
```

---

## 注入模板（Step 4.5 使用）

生成 HTML 时，在 `</body>` 前插入以下标记和代码。注意 `<style>` 标签加 `id="qe-styles"` 方便导出时定位。

```html
<!-- 快速编辑器注入开始 -->
<style id="qe-styles">
  /* 上方"完整 CSS"章节的全部内容 */
</style>

<div id="qe-toolbar">
  <button id="qe-toggle" title="切换编辑模式">编辑</button>
  <button id="qe-undo" title="撤销" disabled>↩</button>
  <button id="qe-redo" title="重做" disabled>↪</button>
  <button id="qe-export" title="导出干净 HTML">导出</button>
</div>

<div id="qe-text-toolbar">
  <button data-cmd="bold" title="加粗" style="font-weight:800">B</button>
  <button data-cmd="italic" title="斜体" style="font-style:italic">I</button>
  <button data-cmd="underline" title="下划线" style="text-decoration:underline">U</button>
  <span class="qe-sep"></span>
  <button data-cmd="color" title="文字颜色">
    <input type="color" id="qe-color-picker" value="#D97757">
  </button>
  <select id="qe-font-size" title="字号">
    <option value="">字号</option>
    <option value="0.85em">小</option>
    <option value="1em">正常</option>
    <option value="1.15em">大</option>
    <option value="1.3em">加大</option>
    <option value="1.5em">超大</option>
  </select>
</div>

<div id="qe-prop-panel">
  <div class="qe-pp-header">
    <span>属性</span>
    <button id="qe-pp-close">×</button>
  </div>
  <div class="qe-pp-body">
    <label>背景色 <input type="color" data-prop="backgroundColor" value="#ffffff"></label>
    <label>文字色 <input type="color" data-prop="color" value="#141413"></label>
    <label>字号 <input type="range" min="10" max="48" value="16" data-prop="fontSize"></label>
    <label>内间距 <input type="range" min="0" max="60" value="16" data-prop="padding"></label>
    <label>外间距 <input type="range" min="0" max="60" value="0" data-prop="margin"></label>
    <label>圆角 <input type="range" min="0" max="30" value="0" data-prop="borderRadius"></label>
    <label>边框色 <input type="color" data-prop="borderColor" value="#d1cfc5"></label>
    <label>边框宽 <input type="range" min="0" max="5" value="0" data-prop="borderWidth"></label>
  </div>
</div>

<script>
  // 上方"完整 JS"章节的全部内容
</script>
<!-- 快速编辑器注入结束 -->
```

---

## 设计约束

1. **零外部依赖** — 编辑器本身也是纯 vanilla，与页面设计系统一致
2. **不干扰浏览** — 默认不激活，只有右上角按钮可见，不影响正常阅读
3. **导出干净** — 剔除编辑器后 HTML 与未注入时等价
4. **编辑器代码 < 500 行** — JS 约 200 行，CSS 约 150 行，HTML 约 80 行
5. **快照上限 50 条** — 撤销栈最多 50 条，防止内存膨胀
6. **颜色映射到设计系统** — 属性面板默认值取自 CSS 变量，不引入设计系统外的色

---

## 反模式

- 不引入 contenteditable polyfill — 现代浏览器都支持
- 不做富文本编辑器（列表/表格插入）— 只做现有内容的修改
- 不做图片上传/替换 — 超出 P1 范围
- 不持久化编辑状态 — 不用 localStorage，每次打开都是初始态
- 不做响应式编辑面板 — 编辑器面向桌面端，移动端不做适配
