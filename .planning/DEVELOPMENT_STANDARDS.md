# 开发规范

> 人机协同实战课 · 代码编写原则 / UI 标准 / 组件规范
> 这些是"不变的内容"——所有页面和组件都遵循同一套规范，开发前先定好，后续逐个里程碑按此执行。

---

## 一、技术原则

### 1.1 核心约束
- **所有页面 = 单个 HTML 文件**，双击即可在浏览器打开
- 可用 CDN 加载的外部库（如 Chart.js、marked.js），不可用构建工具
- 不要 npm install、不要 webpack/vite、不要 node.js
- 所有交互用原生 JavaScript 实现

### 1.2 文件结构
```
my-agent/                  ← 项目根
├── .planning/             ← 项目编排文件（PROJECT/REQUIREMENTS/ROADMAP 等，在根目录，非 course 内）
└── course/                ← 课程代码（开发产物）
    ├── index.html         ← 路径页（入口）
    ├── step-01.html       ← 课程页模板
    ├── step-02.html       ← 实战页模板
    ├── ...                ← 各节点页面
    ├── case-vibe-os.html  ← 案例实验室（最重交互）
    ├── quiz.html          ← 测验
    ├── final-sop.html     ← 结业 SOP 生成器
    ├── templates.html     ← 模板包页
    └── assets/
        └── theme.css      ← Nothing Light 主题统一文件
```

### 1.3 外部库策略
| 用途 | 推荐 | 策略 |
|------|------|------|
| 图表可视化 | Chart.js CDN | 仅在需要图表的页面加载 |
| Markdown 渲染 | marked.js CDN | 仅在需要预览的页面加载 |
| DOM 操作 | 原生 JS | 不引入框架 |
| 状态管理 | localStorage | 封装统一读写方法 |

### 1.4 命名规范
- **CSS class**：kebab-case（`.nav-brand`、`.progress-bar`、`.demo-slider`）
- **JS 变量/函数**：camelCase（`updateTriage()`、`saveProgress()`）
- **HTML id**：camelCase（`id="pathTabs"`、`id="triageSlider"`）
- **文件**：kebab-case（`step-01.html`、`case-vibe-os.html`）
- **数据属性**：data-kebab-case（`data-tier="1"`、`data-role="product"`）

---

## 二、Nothing Light 主题规范（不变）

所有页面共用同一套 CSS 变量。定义在 `assets/theme.css` 中，每个 HTML 页面前置引入：

```css
:root {
  /* === 颜色 === */
  --bg: #F5F5F5;              /* 暖白背景 */
  --surface: #FFFFFF;          /* 卡片白色 */
  --surface-raised: #F0F0F0;  /* 浅灰背景 */
  --border: #E8E8E8;          /* 边框 */
  --border-visible: #CCCCCC;  /* 深色边框 */
  --text-disabled: #999999;   /* 禁用文字 */
  --text-secondary: #666666;  /* 次要文字 */
  --text-primary: #1A1A1A;    /* 正文 */
  --text-display: #000000;    /* 标题 */
  --accent: #D71921;          /* 红色强调 */
  --accent-subtle: rgba(215,25,33,0.07);
  --success: #4A9E5C;         /* 成功绿 */
  --blue: #007AFF;            /* 蓝色（info框/自动化） */
  --blue-subtle: rgba(0,122,255,0.07);
  --purple: #8B7CF6;         /* 紫色（Agent模式） */
  --gold: #D4A843;           /* 金色（提示框） */

  /* === 排版 === */
  --font-display: 'Doto', 'Space Mono', monospace;
  --font-body: 'Space Grotesk', system-ui, sans-serif;
  --font-mono: 'Space Mono', monospace;

  /* === 间距 === */
  --space-xs: 4px;
  --space-sm: 8px;
  --space-md: 16px;
  --space-lg: 24px;
  --space-xl: 32px;
  --space-2xl: 48px;
  --space-3xl: 64px;
  --space-4xl: 96px;
}

/* === 背景点阵（全局） === */
body {
  font-family: var(--font-body);
  background: var(--bg);
  color: var(--text-primary);
  background-image: radial-gradient(circle, var(--border) 0.6px, transparent 0.6px);
  background-size: 20px 20px;
}
```

### 2.1 Nav 规范
- 固定顶部，高度 56px
- 背景 rgba(245,245,245,0.92)，backdrop-filter: blur
- 左侧品牌 + 右侧链接
- 链接 active 态：红色下边框

### 2.2 进度条规范
- 紧贴 nav 下方，高度 3px
- 背景 transparent，填充红色 accent
- 随滚动更新宽度百分比

### 2.3 信息框规范（5 种）
```css
.callout { border-left: 3px solid var(--accent); background: var(--accent-subtle); }
.callout.info { border-left-color: var(--blue); background: var(--blue-subtle); }
.callout.success { border-left-color: var(--success); background: rgba(74,158,92,0.07); }
.callout.gold { border-left-color: var(--gold); background: rgba(212,168,67,0.1); }
```

### 2.4 按钮规范
- `.btn`：普通按钮，白底灰边框
- `.btn-primary`：主要按钮，黑底白字
- `.btn-primary:hover`：红色背景
- padding: 12px 28px，14px font-size

### 2.5 侧边栏规范
- 固定右侧，top 80px
- 目录链接自动高亮（滚动监听）
- 底部可加"解锁提示"

---

## 三、通用 JS 工具函数（不变）

每个页面引入同一套工具方法：

```javascript
// === 进度存储 ===
const Progress = {
  KEY: 'hx-collab-progress',
  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch(e) { return {}; }
  },
  set(data) {
    const p = this.get(); Object.assign(p, data); localStorage.setItem(this.KEY, JSON.stringify(p));
  },
  complete(id) {
    this.set({ [`step-${id}`]: 'done' });
  },
  isComplete(id) {
    return this.get()[`step-${id}`] === 'done';
  }
};

// === 产出存储 ===
const Output = {
  KEY: 'hx-collab-outputs',
  save(name, content) {
    const o = {}; try { Object.assign(o, JSON.parse(localStorage.getItem(this.KEY))); } catch(e) {}
    o[name] = content; localStorage.setItem(this.KEY, JSON.stringify(o));
  },
  get(name) {
    try { return JSON.parse(localStorage.getItem(this.KEY))?.[name]; } catch(e) { return null; }
  },
  getAll() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch(e) { return {}; }
  }
};

// === 复制工具 ===
function copyToClipboard(text) {
  navigator.clipboard.writeText(text).catch(() => {
    const ta = document.createElement('textarea');
    ta.value = text; document.body.appendChild(ta); ta.select();
    document.execCommand('copy'); ta.remove();
  });
}

// === 滚动进度条 ===
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  window.addEventListener('scroll', () => {
    const d = document.documentElement;
    const pct = d.scrollHeight > d.clientHeight
      ? Math.min(100, Math.round((window.scrollY / (d.scrollHeight - d.clientHeight)) * 100)) : 0;
    bar.style.width = pct + '%';
  }, { passive: true });
}

// === 侧边栏高亮 ===
function initSidebar() {
  const links = document.querySelectorAll('.sidebar-link');
  const sections = [];
  links.forEach(a => {
    const id = a.getAttribute('href')?.slice(1);
    const el = document.getElementById(id);
    if (el) sections.push({ el, link: a });
  });
  if (!sections.length) return;
  window.addEventListener('scroll', () => {
    const y = window.scrollY + 120;
    let active = sections[0].link;
    sections.forEach(({ el, link }) => { if (y >= el.offsetTop) active = link; });
    links.forEach(l => l.classList.toggle('active', l === active));
  }, { passive: true });
}
```

---

## 四、交互组件标准模式

每个交互组件遵循同一结构：

### 4.1 组件外壳
```html
<div class="interactive-demo">
  <div class="demo-header">
    <span class="demo-icon">[图标]</span>
    <span class="demo-title">组件名称</span>
    <span class="demo-sub">操作提示</span>
  </div>
  <div class="demo-body">
    <!-- 输入区 + 输出区 -->
  </div>
</div>
```

### 4.2 7 个组件的标准规格

| 组件 | 交互类型 | 输入 | 输出 | 数据流 |
|------|---------|------|------|--------|
| ① 成熟度自测 | 勾选 + 计分 | 12 个 checkbox | 阶段徽章+建议 | localStorage 存结果 |
| ② 3A 分诊器 | 三滑块联动 | 3 个 range(0-100) + textarea | 推荐模式+分工 | 实时计算 + 草稿存 localStorage |
| ③ 操作手册生成器 | 表单拼装 | 8 个字段 | Markdown 预览 | localStorage 存草稿 |
| ④ 场景模板切换 | 标签切换 | 选场景+填内容 | 模板渲染 | localStorage 存模板 |
| ⑤ 三层沙盘 | 下拉 + 展开 | 选场景 | 三层分工卡片 | 实时渲染 |
| ⑥ 判断档案提取器 | 分步表单 | 3 步填写 | 完整档案 Markdown | localStorage 存 |
| ⑦ SOP 生成器 | 聚合输出 | 读取 localStorage | 10 字段 SOP | 汇总各步产出 |

### 4.3 颜色映射（不变）
```
红色 #D71921  → Augmentation 模式 / 强调 / 错误
蓝色 #007AFF  → Automation 模式 / info 信息框
紫色 #8B7CF6  → Agent 模式
绿色 #4A9E5C  → 成功 / 已完成
金色 #D4A843  → 提示 / 优化建议
灰色 #999     → 禁用 / 未解锁
黑色 #000     → 标题 / 主文字
```

---

## 五、页面类型模板

### 5.1 课程页模板
```
Nav + ProgressBar
├── Course Header（路径 > 课程编号 > 标题 > 描述 > 时长 > 学习目标）
├── Chapter 1（概念阐述）
├── Chapter 2（交互组件 / 对比表 / 案例）
├── Chapter 3（关键洞察 + 产出填写/保存）
├── [Sidebar] 本页目录（自动高亮）
└── Footer（完成按钮 + 下一节点预告）
```

### 5.2 实战页模板
```
Nav + ProgressBar
├── 左侧说明区（这个实战解决什么问题 + 输入要求 + 输出结果 + 示例）
├── 右侧操作区（表单 / 滑块 / 选择器 + 实时反馈）
├── 结果区（Markdown 输出 + 复制按钮 + 保存按钮）
└── Footer（完成按钮 + 下一步）
```

### 5.3 案例实验室模板
```
Nav + ProgressBar
├── 左侧 SVG 架构图（可点击节点）
├── 右侧故事面板（节点标题 + 故事 + 产物 + 复制按钮）
├── 底部学员映射区
└── Footer（完成按钮）
```
