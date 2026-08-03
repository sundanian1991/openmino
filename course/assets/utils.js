/* ============================================
   utils.js — 通用工具函数
   ============================================ */

// === 统一 ID 规范（全站唯一真相源）===
// 核心 5 步（顺序解锁）
const CORE_STEPS = ['step-01','step-02','step-03','step-04','step-04.5','final-sop'];
// 进阶 9 节点（核心全完成后解锁，内部按序）
const ADVANCED_STEPS = ['step-05','step-06','step-07','step-08','step-09','step-10','step-11','step-12','quiz','templates'];
// 全部节点（有序）
const ALL_STEPS = [...CORE_STEPS, ...ADVANCED_STEPS];

// 统一路由表
const PAGE_MAP = {
  'step-01':'step-01.html','step-02':'step-02.html','step-03':'step-03.html',
  'step-04':'step-04.html','step-04.5':'step-04.5.html','final-sop':'final-sop.html',
  'step-05':'step-05.html','step-06':'step-06.html','step-07':'step-07.html',
  'step-08':'step-08.html','step-09':'step-09.html','step-10':'step-10.html',
  'step-11':'step-11.html','step-12':'step-12.html','quiz':'quiz.html','templates':'templates.html'
};

// === 下一步路由表 ===
const NEXT_MAP = {
  'step-01':'step-02','step-02':'step-03','step-03':'step-04',
  'step-04':'step-04.5','step-04.5':'final-sop',
  'step-05':'step-06','step-06':'step-07','step-07':'step-08',
  'step-08':'step-09','step-09':'step-10','step-10':'step-11',
  'step-11':'step-12','step-12':'quiz','final-sop':'quiz','quiz':'templates'
};

// === 完成动画 + 下一步按钮 ===
function showNextStep(currentId) {
  Progress.complete(currentId);
  const nextId = NEXT_MAP[currentId];
  const nextTitle = stepTitles ? stepTitles[nextId] : '';
  const area = document.querySelector('.finish-area');
  if (!area) return;

  // 过渡动画
  area.style.transition = 'opacity 0.3s ease';
  area.style.opacity = '0';

  setTimeout(() => {
    area.style.background = 'var(--success-subtle)';
    area.style.border = '1px solid var(--success)';
    let html = '<div style="margin-bottom:var(--space-md)"><svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="var(--success)" stroke-width="2.5" style="display:inline-block;vertical-align:middle"><circle cx="12" cy="12" r="10"/><polyline points="8 12 11 15 16 9"/></svg></div>';
    html += '<div style="font-size:15px;font-weight:600;color:var(--success);margin-bottom:var(--space-xs)">已完成！</div>';
    if (nextId && PAGE_MAP[nextId]) {
      html += '<a href="' + PAGE_MAP[nextId] + '" class="btn btn-primary" style="margin-top:var(--space-sm);text-decoration:none;display:inline-block">';
      html += '下一步：' + (nextTitle || nextId) + ' →</a>';
    } else {
      html += '<a href="index.html" class="btn" style="margin-top:var(--space-sm);text-decoration:none;display:inline-block">返回路径页</a>';
    }
    area.innerHTML = html;
    area.style.opacity = '1';
  }, 300);
}

// === 获取步骤标题（供 showNextStep 使用）===
let stepTitles = null;
try {
  // 在 index.html 中 stepTitles 已定义；其他页面需要自己的标题映射
  if (typeof window.stepTitles === 'undefined') {
    stepTitles = {
      'step-02':'3A 分诊法','step-03':'给 AI 写规则','step-04':'沉淀判断标准',
      'step-04.5':'AI 输出检查法','final-sop':'交付协同 SOP',
      'step-05':'让 AI 做多步任务','step-06':'三层协同框架','step-07':'Vibe OS 案例实验室',
      'step-08':'AI 六步工作法','step-09':'判断档案（进阶）','step-10':'构建数字分身',
      'step-11':'设计 AI 工作流','step-12':'一人成军做产品','quiz':'能力测验','templates':'模板包'
    };
  }
} catch(e) { stepTitles = {}; }

// === 进度存储 ===
const Progress = {
  KEY: 'hx-collab-progress',
  get() {
    try { return JSON.parse(localStorage.getItem(this.KEY)) || {}; } catch(e) { return {}; }
  },
  set(data) {
    const p = this.get(); Object.assign(p, data);
    try { localStorage.setItem(this.KEY, JSON.stringify(p)); } catch(e) {}
  },
  complete(id) {
    this.set({ [id]: 'done' });
  },
  isComplete(id) {
    return this.get()[id] === 'done';
  },
  // 核心路径是否全部完成
  isCoreDone() {
    return CORE_STEPS.every(s => this.get()[s] === 'done');
  },
  // 返回当前应该进行的第一个未完成节点 ID
  // @deprecated 不校验解锁条件,可能返回未解锁节点。index 进度场景改用 getNextUnlocked()。
  // 仅保留供既有页面回归,不在新代码中使用。
  getCurrent() {
    const p = this.get();
    for (let s of ALL_STEPS) {
      if (p[s] !== 'done') return s;
    }
    return 'complete';
  },
  // 整体完成百分比（基于全部 14 节点）
  getPercent() {
    const p = this.get();
    const done = ALL_STEPS.filter(s => p[s] === 'done').length;
    return Math.round((done / ALL_STEPS.length) * 100);
  },
  // 核心路径完成百分比
  getCorePercent() {
    const p = this.get();
    const done = CORE_STEPS.filter(s => p[s] === 'done').length;
    return Math.round((done / CORE_STEPS.length) * 100);
  },
  // 已完成总数
  getDoneCount() {
    const p = this.get();
    return ALL_STEPS.filter(s => p[s] === 'done').length;
  },
  // 核心路径已完成数(用于"核心 X/5")
  getCoreDoneCount() {
    const p = this.get();
    return CORE_STEPS.filter(s => p[s] === 'done').length;
  },
  // 返回第一个"已解锁且未完成"的节点 ID,无则 'complete'
  // 与 getCurrent() 的区别:本校验解锁条件(核心顺序解锁;进阶需核心全完成)
  getNextUnlocked() {
    const p = this.get();
    const coreDone = this.isCoreDone();
    for (let s of ALL_STEPS) {
      if (p[s] === 'done') continue;
      // 解锁条件:核心节点需前序全完成;进阶节点需核心全完成
      const isCore = CORE_STEPS.includes(s);
      const unlocked = isCore
        ? CORE_STEPS.slice(0, CORE_STEPS.indexOf(s)).every(prev => p[prev] === 'done')
        : coreDone;
      if (unlocked) return s;
    }
    return 'complete';
  }
};

// === 产出存储 ===
const Output = {
  KEY: 'hx-collab-outputs',
  save(name, content) {
    const o = {};
    try { Object.assign(o, JSON.parse(localStorage.getItem(this.KEY))); } catch(e) {}
    o[name] = content;
    try { localStorage.setItem(this.KEY, JSON.stringify(o)); } catch(e) {}
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
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).catch(() => fallbackCopy(text));
  } else {
    fallbackCopy(text);
  }
}
function fallbackCopy(text) {
  const ta = document.createElement('textarea');
  ta.value = text; ta.style.position = 'fixed'; ta.style.opacity = '0';
  document.body.appendChild(ta); ta.select();
  try { document.execCommand('copy'); } catch(e) {}
  document.body.removeChild(ta);
}

// === 进度条（滚动） ===
function initProgressBar() {
  const bar = document.getElementById('progressBar');
  if (!bar) return;
  const update = () => {
    const d = document.documentElement;
    const pct = d.scrollHeight > d.clientHeight
      ? Math.min(100, Math.round((window.scrollY / (d.scrollHeight - d.clientHeight)) * 100)) : 0;
    bar.style.width = pct + '%';
  };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

// === 侧边栏高亮 ===
function initSidebar() {
  const links = document.querySelectorAll('.sidebar-link');
  const sections = [];
  links.forEach(a => {
    const id = a.getAttribute('href')?.slice(1);
    if (!id) return;
    const el = document.getElementById(id);
    if (el) sections.push({ el, link: a });
  });
  if (!sections.length) return;
  const update = () => {
    const y = window.scrollY + 120;
    let active = sections[0]?.link;
    sections.forEach(({ el, link }) => { if (y >= el.offsetTop) active = link; });
    links.forEach(l => l.classList.toggle('active', l === active));
  };
  window.addEventListener('scroll', update, { passive: true });
  update();
}
