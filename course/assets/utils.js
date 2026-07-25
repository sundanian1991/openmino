/* ============================================
   utils.js — 通用工具函数
   ============================================ */

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
  getCurrent() {
    const p = this.get();
    const steps = ['step-01','step-02','step-03','step-04','step-05'];
    for (let s of steps) {
      if (p[s] !== 'done') return s;
    }
    return 'complete';
  },
  getPercent() {
    const p = this.get();
    const steps = ['step-01','step-02','step-03','step-04','step-05'];
    const done = steps.filter(s => p[s] === 'done').length;
    return Math.round((done / steps.length) * 100);
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
