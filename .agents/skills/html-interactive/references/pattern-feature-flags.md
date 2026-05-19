# pattern-feature-flags — 配置项管理

> 适用于：功能开关管理、配置项编辑、环境变量切换、配置 diff 导出。
> 核心理念：开关列表可视化依赖关系，修改时即时警告冲突，diff 输出可复制。

---

## 页面结构

```
<header>                  配置集名称 + 环境选择
<section.flags-list>      开关列表（分组）
<section.diff-output>     配置 diff 输出
```

---

## HTML 骨架

```html
<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${配置集名}</title>
  <style>
    :root { /* 暖色系统 */ }
  </style>
</head>
<body>
  <header class="flag-header">
    <h1>${配置集名}</h1>
    <div class="env-selector">
      <button class="env-btn active" data-env="dev">开发</button>
      <button class="env-btn" data-env="staging">预发</button>
      <button class="env-btn" data-env="prod">生产</button>
    </div>
  </header>

  <section class="flags-section">
    <div class="flag-group">
      <h3 class="group-title">${分组名}</h3>
      <div class="flag-item" data-flag="flag-a" data-deps="flag-b">
        <div class="flag-row">
          <label class="toggle">
            <input type="checkbox" id="flag-a" checked>
            <span class="toggle-slider"></span>
          </label>
          <div class="flag-info">
            <span class="flag-name">flagA</span>
            <span class="flag-desc">${描述}</span>
          </div>
        </div>
        <div class="flag-warning" id="warn-flag-a"></div>
      </div>

      <div class="flag-item" data-flag="flag-b">
        <div class="flag-row">
          <label class="toggle">
            <input type="checkbox" id="flag-b">
            <span class="toggle-slider"></span>
          </label>
          <div class="flag-info">
            <span class="flag-name">flagB</span>
            <span class="flag-desc">${描述}</span>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="diff-section">
    <div class="diff-header">
      <h3>变更 Diff</h3>
      <button class="copy-btn" id="copy-diff">复制</button>
    </div>
    <pre class="diff-output" id="diff-output"></pre>
  </section>
</body>
</html>
```

---

## CSS 关键样式

```css
/* 环境选择 */
.env-selector { display: flex; gap: 4px; margin-top: 12px; }
.env-btn {
  padding: 6px 16px; border: 1px solid var(--g200);
  border-radius: 6px; background: white;
  font-size: 0.85em; cursor: pointer; color: var(--g500);
}
.env-btn.active {
  background: var(--clay); color: white; border-color: var(--clay);
}

/* 开关组 */
.flag-group {
  border: 1px solid var(--g200); border-radius: 10px;
  margin-bottom: 16px; overflow: hidden;
}
.group-title {
  padding: 12px 20px; margin: 0;
  font-size: 0.85em; font-weight: 700;
  color: var(--g500); background: var(--g100);
  text-transform: uppercase; letter-spacing: 0.5px;
}
.flag-item {
  padding: 14px 20px;
  border-top: 1px solid var(--g200);
}
.flag-row {
  display: flex; align-items: center; gap: 12px;
}

/* Toggle 开关 */
.toggle { position: relative; display: inline-block; width: 40px; height: 22px; }
.toggle input { opacity: 0; width: 0; height: 0; }
.toggle-slider {
  position: absolute; top: 0; left: 0; right: 0; bottom: 0;
  background: var(--g200); border-radius: 11px;
  cursor: pointer; transition: 0.2s;
}
.toggle-slider::before {
  content: ''; position: absolute;
  width: 16px; height: 16px; border-radius: 50%;
  left: 3px; bottom: 3px; background: white;
  transition: 0.2s;
}
.toggle input:checked + .toggle-slider { background: var(--clay); }
.toggle input:checked + .toggle-slider::before { transform: translateX(18px); }

.flag-info { display: flex; flex-direction: column; gap: 2px; }
.flag-name { font-weight: 600; font-size: 0.9em; color: var(--g700); }
.flag-desc { font-size: 0.8em; color: var(--g500); }

/* 依赖警告 */
.flag-warning {
  margin-top: 8px; padding: 8px 12px;
  background: var(--oat); border-radius: 6px;
  font-size: 0.8em; color: var(--g700);
  display: none;
}
.flag-warning.show { display: block; }

/* Diff 输出 */
.diff-output {
  background: var(--g100); border-radius: 8px;
  padding: 16px; font-family: var(--mono);
  font-size: 0.8em; line-height: 1.6;
  max-height: 300px; overflow-y: auto;
}
```

---

## JS 交互

```js
const original = {}; // 记录初始状态
document.querySelectorAll('.toggle input').forEach(cb => {
  original[cb.id] = cb.checked;
});

// 依赖检查
function checkDeps(flagId) {
  const item = document.querySelector(`[data-flag="${flagId}"]`);
  const warn = item.querySelector('.flag-warning');
  const deps = (item.dataset.deps || '').split(',').filter(Boolean);
  if (deps.length && document.getElementById(flagId).checked) {
    const off = deps.filter(d => !document.getElementById(d).checked);
    if (off.length) {
      warn.textContent = `需要先开启: ${off.join(', ')}`;
      warn.classList.add('show');
    } else { warn.classList.remove('show'); }
  } else { warn.classList.remove('show'); }
}

document.querySelectorAll('.toggle input').forEach(cb => {
  cb.addEventListener('change', () => {
    checkDeps(cb.id);
    updateDiff();
  });
});

function updateDiff() {
  const lines = [];
  document.querySelectorAll('.toggle input').forEach(cb => {
    if (cb.checked !== original[cb.id]) {
      const prefix = cb.checked ? '+' : '-';
      lines.push(`${prefix} ${cb.id}: ${original[cb.id]} → ${cb.checked}`);
    }
  });
  document.getElementById('diff-output').textContent =
    lines.length ? lines.join('\n') : '(无变更)';
}
updateDiff();
```

---

## 设计约束

1. **开关分组 <= 5 组** — 超过则拆分页面
2. **每组开关 <= 8 个** — 信息密度可控
3. **diff 实时更新** — 任何 toggle 变化立即反映
4. **依赖警告即时显示** — 开关切换时立即检查
5. **版心 <= 960px** — 管理界面专注效率

---

## 反模式

- 不用 alert 提示依赖冲突 — 用内联 warning 条
- 不省略环境切换 — 不同环境配置通常不同
- 不把 diff 做成弹窗 — 固定底部区域，始终可见
- 不隐藏依赖关系 — 开关旁边直接标注依赖项
