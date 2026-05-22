import sharp from 'sharp';
import { writeFileSync, mkdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import pptxgen from 'pptxgenjs';
import html2pptx from '../../.claude/skills/pptx/scripts/html2pptx.js';

const __dirname = dirname(fileURLToPath(import.meta.url));
const slidesDir = join(__dirname, 'slides');
const iconsDir = join(slidesDir, 'icons');
const tmpIconsDir = '/tmp/pptx-icons';
mkdirSync(slidesDir, { recursive: true });
mkdirSync(iconsDir, { recursive: true });
mkdirSync(tmpIconsDir, { recursive: true });

// ============================================================
// Step 1: Rasterize SVG icons as PNGs
// ============================================================
const svgIcons = {
  'icon-ai': `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
    <circle cx="40" cy="32" r="20" fill="none" stroke="#E2231A" stroke-width="3"/>
    <circle cx="40" cy="32" r="10" fill="#E2231A" opacity="0.15"/>
    <line x1="40" y1="52" x2="40" y2="68" stroke="#E2231A" stroke-width="3"/>
    <line x1="28" y1="40" x2="16" y2="52" stroke="#E2231A" stroke-width="2"/>
    <line x1="52" y1="40" x2="64" y2="52" stroke="#E2231A" stroke-width="2"/>
    <circle cx="16" cy="56" r="4" fill="#E2231A" opacity="0.4"/>
    <circle cx="64" cy="56" r="4" fill="#E2231A" opacity="0.4"/>
    <circle cx="40" cy="72" r="4" fill="#E2231A" opacity="0.4"/>
    <text x="40" y="38" text-anchor="middle" font-size="16" fill="#E2231A" font-weight="700" font-family="Arial">AI</text>
  </svg>`,
  'icon-shield': `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
    <path d="M40 8 L68 20 L68 44 C68 60 54 72 40 76 C26 72 12 60 12 44 L12 20 Z" fill="none" stroke="#E2231A" stroke-width="3"/>
    <path d="M40 16 L60 24 L60 44 C60 56 50 66 40 68 C30 66 20 56 20 44 L20 24 Z" fill="#E2231A" opacity="0.08"/>
    <polyline points="28,40 36,48 52,32" fill="none" stroke="#E2231A" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>
  </svg>`,
  'icon-network': `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
    <circle cx="40" cy="24" r="10" fill="#E2231A" opacity="0.2" stroke="#E2231A" stroke-width="2.4"/>
    <circle cx="20" cy="56" r="10" fill="#E2231A" opacity="0.2" stroke="#E2231A" stroke-width="2.4"/>
    <circle cx="60" cy="56" r="10" fill="#E2231A" opacity="0.2" stroke="#E2231A" stroke-width="2.4"/>
    <line x1="40" y1="34" x2="20" y2="46" stroke="#E2231A" stroke-width="2"/>
    <line x1="40" y1="34" x2="60" y2="46" stroke="#E2231A" stroke-width="2"/>
    <line x1="30" y1="56" x2="50" y2="56" stroke="#E2231A" stroke-width="2"/>
    <text x="40" y="29" text-anchor="middle" font-size="12" fill="#E2231A" font-weight="600" font-family="Arial">全</text>
    <text x="20" y="61" text-anchor="middle" font-size="12" fill="#E2231A" font-weight="600" font-family="Arial">渠</text>
    <text x="60" y="61" text-anchor="middle" font-size="12" fill="#E2231A" font-weight="600" font-family="Arial">道</text>
  </svg>`,
  'icon-anchor': `<svg xmlns="http://www.w3.org/2000/svg" width="80" height="80" viewBox="0 0 80 80">
    <circle cx="40" cy="20" r="8" fill="none" stroke="#E2231A" stroke-width="3"/>
    <line x1="40" y1="28" x2="40" y2="68" stroke="#E2231A" stroke-width="3"/>
    <path d="M20 52 Q20 72 40 72 Q60 72 60 52" fill="none" stroke="#E2231A" stroke-width="3"/>
    <line x1="28" y1="44" x2="52" y2="44" stroke="#E2231A" stroke-width="2"/>
    <line x1="24" y1="56" x2="56" y2="56" stroke="#E2231A" stroke-width="1.6"/>
  </svg>`
};

for (const [name, svg] of Object.entries(svgIcons)) {
  await sharp(Buffer.from(svg)).png().toFile(join(tmpIconsDir, `${name}.png`));
  console.log(`Rasterized ${name}.png`);
}

// Get absolute icon paths for HTML (use /tmp to avoid Chinese path encoding issues)
const iconPaths = {
  ai: join(tmpIconsDir, 'icon-ai.png'),
  shield: join(tmpIconsDir, 'icon-shield.png'),
  network: join(tmpIconsDir, 'icon-network.png'),
  anchor: join(tmpIconsDir, 'icon-anchor.png')
};

// ============================================================
// Step 2: CSS Tokens (shared across all slides)
// ============================================================
const cssTokens = `
:root {
  --bg: #F8F7F4;
  --bg-card: #EEEEEC;
  --bg-card-alt: #E8E7E3;
  --border: #D0CFC8;
  --border-light: #E0DFD8;
  --ink: #1A1A2E;
  --ink-secondary: #5A5A6E;
  --text-gray: #8A8A96;
  --brand-red: #E2231A;
  --brand-red-light: rgba(226,35,26,0.08);
  --gold: #B8960C;
  --gold-light: rgba(184,150,12,0.12);
  --radius: 4px;
  --font: Arial, Helvetica, sans-serif;
}
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { font-size: 16px; }
body {
  width: 720pt; height: 405pt; margin: 0; padding: 0;
  font-family: var(--font);
  background: var(--bg);
  display: flex;
  overflow: hidden;
}
.slide-inner {
  width: 100%; height: 100%;
  padding: 42pt 60pt 40pt;
  display: flex; flex-direction: column;
  position: relative;
}
.page-num {
  position: absolute; bottom: 16pt; right: 24pt;
  font-size: 9pt; color: var(--text-gray); opacity: 0.5;
  letter-spacing: 1px;
}

/* Typography */
.slide-title { font-size: 20pt; font-weight: 700; color: var(--ink); margin-bottom: 4pt; }
.slide-subtitle { font-size: 10.5pt; color: var(--text-gray); margin-bottom: 18pt; }

/* Cards */
.card { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius); padding: 12pt 14pt; }
.card-red-left { border-left: 3px solid var(--brand-red); }
.card-gold-left { border-left: 3px solid var(--gold); }

/* Data */
.data-number { font-size: 38pt; font-weight: 900; color: var(--brand-red); line-height: 1.1; }
.data-number-sm { font-size: 28pt; font-weight: 900; color: var(--brand-red); line-height: 1.1; }
.data-label { font-size: 10pt; color: var(--ink-secondary); margin-top: 4pt; font-weight: 500; }
.data-cyan-label { font-size: 8.5pt; color: var(--text-gray); font-weight: 600; letter-spacing: 1px; margin-bottom: 4pt; text-transform: uppercase; }

/* Grid */
.grid-2 { display: grid; grid-template-columns: 1fr 1fr; gap: 14pt; }
.grid-3 { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 14pt; }
.grid-4 { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10pt; }
.grid-2-3 { display: grid; grid-template-columns: 2fr 3fr; gap: 24pt; }
.grid-3-7 { display: grid; grid-template-columns: 3fr 7fr; gap: 24pt; }

/* Misc */
.text-center { text-align: center; }
.mt-auto { margin-top: auto; }
.item-title { font-size: 11pt; font-weight: 600; color: var(--ink); }
.item-desc { font-size: 9.5pt; color: var(--ink-secondary); margin-top: 2pt; line-height: 1.5; }

/* Brand bar */
.brand-bar {
  position: absolute; bottom: 0; left: 0; right: 0; height: 3px;
  background: #E2231A; opacity: 0.4;
}

/* Quote */
.quote-block {
  background: var(--brand-red-light); border-left: 2px solid var(--brand-red);
  padding: 8pt 12pt; font-size: 10pt; color: var(--ink-secondary);
  line-height: 1.6; border-radius: 0 var(--radius) var(--radius) 0;
}

/* Section label */
.section-label { font-size: 9.5pt; font-weight: 600; letter-spacing: 0.5pt; margin-bottom: 6pt; }
`;

// ============================================================
// Helper: write HTML file
// ============================================================
function writeSlide(name, title, bodyContent) {
  const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>${title}</title>
<style>${cssTokens}${bodyContent}</style>
</head>
<body>
<div class="slide-inner">
{{CONTENT}}
<span class="page-num">{{PAGE}}</span>
<div class="brand-bar"></div>
</div>
</body>
</html>`;
  return html;
}

// ============================================================
// SLIDE 1: Cover
// ============================================================
const s1Extra = `
.cover-title { font-size: 34pt; font-weight: 900; color: var(--ink); text-align: center; letter-spacing: 2pt; }
.cover-subtitle { font-size: 24pt; font-weight: 700; color: var(--brand-red); text-align: center; margin-top: 10pt; }
.cover-red-line { width: 50pt; height: 3px; background: var(--brand-red); margin: 16pt auto 0; }
.cover-company { font-size: 12pt; color: var(--ink-secondary); text-align: center; letter-spacing: 3pt; }
.cover-content { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 0; }
`;

const s1Content = `
<div class="cover-content">
  <p class="cover-title">2026年度</p>
  <p class="cover-subtitle">新客服节 · 新客服最佳实践奖</p>
  <div class="cover-red-line"></div>
</div>
<p class="cover-company" style="position:absolute;bottom:56pt;left:0;right:0;">京东科技 · 金融科技事业群 · 数据科技业务部</p>
`;

writeFileSync(join(slidesDir, '01-cover.html'),
  writeSlide('01-cover', '封面', s1Extra).replace('{{CONTENT}}', s1Content).replace('{{PAGE}}', ''));
console.log('Wrote 01-cover.html');

// ============================================================
// SLIDE 2: Company Intro
// ============================================================
const s2Extra = `
.brand-area { display: flex; flex-direction: column; justify-content: center; padding: 12pt 0; border-right: 1px solid var(--border); padding-right: 24pt; }
.brand-name { font-size: 26pt; font-weight: 900; color: var(--ink); }
.brand-slogan { font-size: 11pt; color: var(--brand-red); margin-top: 6pt; font-weight: 500; }
.brand-vision-label { font-size: 8.5pt; color: var(--text-gray); margin-bottom: 3pt; font-weight: 600; }
.brand-vision-text { font-size: 10pt; color: var(--ink); }
.info-label { font-size: 8.5pt; color: var(--text-gray); margin-bottom: 3pt; font-weight: 500; }
.info-value { font-size: 10pt; color: var(--ink); font-weight: 500; line-height: 1.4; }
.split-layout { display: grid; grid-template-columns: 3fr 7fr; gap: 24pt; flex: 1; }
.info-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10pt; align-content: start; }
`;

const s2Content = `
<p class="slide-title">企业介绍</p>
<p class="slide-subtitle">京东科技股份有限公司</p>
<div class="split-layout">
  <div class="brand-area">
    <p class="brand-name">京东科技</p>
    <p class="brand-slogan">技术为本，让生活更美好</p>
    <div style="margin-top: 16pt; padding-top: 12pt; border-top: 1px solid var(--border);">
      <p class="brand-vision-label">服务愿景</p>
      <p class="brand-vision-text">成为全球最值得信赖的企业</p>
      <p class="brand-vision-label" style="margin-top: 8pt;">服务价值观</p>
      <p class="brand-vision-text" style="font-size: 9.5pt; line-height: 1.6;">客户为先 · 创新 · 拼搏 · 担当 · 感恩 · 诚信</p>
    </div>
  </div>
  <div class="info-grid">
    <div class="card"><p class="info-label">企业名称</p><p class="info-value">京东科技股份有限公司</p></div>
    <div class="card"><p class="info-label">主营业务</p><p class="info-value">信息技术咨询服务、云计算、人工智能应用</p></div>
    <div class="card"><p class="info-label">从事行业</p><p class="info-value">金融科技 / 科技服务</p></div>
    <div class="card"><p class="info-label">企业总机</p><p class="info-value">4000988505</p></div>
    <div class="card" style="grid-column: 1 / -1;"><p class="info-label">企业地址</p><p class="info-value">北京市北京经济技术开发区科创十一街18号院2号楼6层601</p></div>
  </div>
</div>
`;

writeFileSync(join(slidesDir, '02-company.html'),
  writeSlide('02-company', '企业介绍', s2Extra).replace('{{CONTENT}}', s2Content).replace('{{PAGE}}', '02 / 11'));
console.log('Wrote 02-company.html');

// ============================================================
// SLIDE 3: Call Center Overview
// ============================================================
const s3Extra = `
.unified-panel { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius); flex: 1; display: flex; flex-direction: column; overflow: hidden; }
.panel-top { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 0; padding: 18pt 16pt; }
.panel-top > div { border-right: 1px solid var(--border-light); }
.panel-top > div:last-child { border-right: none; }
.panel-divider { height: 1px; background: var(--border-light); margin: 0 16pt; }
.panel-bottom { display: grid; grid-template-columns: 1fr 1fr; gap: 0; padding: 12pt 16pt; }
.panel-bottom > div { border-right: 1px solid var(--border-light); padding-right: 16pt; }
.panel-bottom > div:last-child { border-right: none; padding-left: 16pt; }
.section-heading { font-size: 9.5pt; font-weight: 600; color: var(--ink); margin-bottom: 5pt; }
.section-text { font-size: 9.5pt; color: var(--ink-secondary); line-height: 1.6; }
`;

const s3Content = `
<p class="slide-title">1、呼叫中心现况简介</p>
<p class="slide-subtitle">京东科技-金融科技事业群-数据科技业务部</p>
<div class="unified-panel">
  <div class="panel-top">
    <div class="text-center"><p class="data-cyan-label">团队规模</p><p class="data-number">3000+</p><p class="data-label">专业营销团队成员</p></div>
    <div class="text-center"><p class="data-cyan-label">合作供应商</p><p class="data-number">35</p><p class="data-label">家合作供应商</p></div>
    <div class="text-center"><p class="data-cyan-label">年度GMV</p><p class="data-number">2000亿+</p><p class="data-label">年度放款额</p></div>
  </div>
  <div class="panel-divider"></div>
  <div class="panel-bottom">
    <div><p class="section-heading">服务渠道</p><p class="section-text">电销渠道（100%）— 主要负责金融营销电销外呼业务，涵盖拉新、复购等全流程服务</p></div>
    <div>
      <p class="section-heading">团队结构</p>
      <div style="display: flex; gap: 14pt;">
        <div><p style="font-size: 16pt; font-weight: 700; color: var(--brand-red);">2900+</p><p style="font-size: 8.5pt; color: var(--text-gray);">前台 · 本科60%</p></div>
        <div><p style="font-size: 16pt; font-weight: 700; color: var(--brand-red);">100+</p><p style="font-size: 8.5pt; color: var(--text-gray);">中台</p></div>
        <div><p style="font-size: 16pt; font-weight: 700; color: var(--brand-red);">50+</p><p style="font-size: 8.5pt; color: var(--text-gray);">后台</p></div>
      </div>
    </div>
  </div>
</div>
`;

writeFileSync(join(slidesDir, '03-overview.html'),
  writeSlide('03-overview', '呼叫中心现况', s3Extra).replace('{{CONTENT}}', s3Content).replace('{{PAGE}}', '03 / 11'));
console.log('Wrote 03-overview.html');

// ============================================================
// SLIDE 4: Org Chart
// ============================================================
const s4Extra = `
.org-container { flex: 1; display: flex; flex-direction: column; align-items: center; justify-content: center; }
.org-l1 { text-align: center; }
.org-l1-card { min-width: 280pt; text-align: center; padding: 10pt 16pt; }
.org-connector { width: 2px; height: 12pt; background: #E2231A; margin: 0 auto; }
.org-l2 { display: flex; align-items: center; justify-content: center; }
.org-l2-card { min-width: 150pt; text-align: center; padding: 8pt 12pt; }
.org-l2-connector { width: 50pt; height: 2px; background: #E2231A; margin: 0 4pt; }
.org-l3-bar { width: 520pt; height: 2px; background: #E2231A; margin: 10pt 0 0; }
.org-l3-nodes { display: flex; justify-content: space-around; width: 520pt; }
.org-l3-node { display: flex; flex-direction: column; align-items: center; }
.org-l3-connector { width: 2px; height: 8pt; background: #E2231A; }
.org-l3-card { min-width: 90pt; text-align: center; padding: 6pt 8pt; }
.org-title { font-size: 11pt; font-weight: 700; color: var(--ink); }
.org-subtitle { font-size: 8.5pt; color: var(--text-gray); margin-top: 2pt; }
`;

const s4Content = `
<p class="slide-title">2、呼叫中心组织架构</p>
<p class="slide-subtitle">数据科技业务部组织层级</p>
<div class="org-container">
  <div class="org-l1"><div class="card card-red-left org-l1-card"><p class="org-title">数据科技业务部</p><p class="org-subtitle">金融科技事业群 · 二级部门 · 3000+人团队</p></div></div>
  <div class="org-connector"></div>
  <div class="org-l2">
    <div><div class="card org-l2-card"><p class="org-title">策略运营组</p><p class="org-subtitle">策略规划 · 数据分析 · 模型构建</p></div></div>
    <div class="org-l2-connector"></div>
    <div><div class="card card-red-left org-l2-card"><p class="org-title">电销服务组</p><p class="org-subtitle">供应商管理 · 业务运营 · 质检培训</p></div></div>
  </div>
  <div class="org-connector"></div>
  <div class="org-l3-bar"></div>
  <div class="org-l3-nodes">
    <div class="org-l3-node"><div class="org-l3-connector"></div><div class="card org-l3-card"><p class="org-title">业务管理</p><p class="org-subtitle">供应商日常沟通</p></div></div>
    <div class="org-l3-node"><div class="org-l3-connector"></div><div class="card org-l3-card"><p class="org-title">质检培训</p><p class="org-subtitle">合规监控·赋能</p></div></div>
    <div class="org-l3-node"><div class="org-l3-connector"></div><div class="card org-l3-card"><p class="org-title">运营支撑</p><p class="org-subtitle">系统运营·数据</p></div></div>
    <div class="org-l3-node"><div class="org-l3-connector"></div><div class="card org-l3-card"><p class="org-title">前台电销</p><p class="org-subtitle">2900+坐席团队</p></div></div>
    <div class="org-l3-node"><div class="org-l3-connector"></div><div class="card org-l3-card"><p class="org-title">供应商管理</p><p class="org-subtitle">35家BPO供应商</p></div></div>
  </div>
</div>
`;

writeFileSync(join(slidesDir, '04-org.html'),
  writeSlide('04-org', '组织架构', s4Extra).replace('{{CONTENT}}', s4Content).replace('{{PAGE}}', '04 / 11'));
console.log('Wrote 04-org.html');

// ============================================================
// SLIDE 5: Transformation Background
// ============================================================
const s5Extra = `
.challenge-card { background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius); padding: 10pt 12pt; }
.goal-card { background: var(--bg); border: 1px solid var(--border-light); border-left: 3px solid var(--brand-red); border-radius: var(--radius); padding: 10pt 12pt; }
.split-layout { display: grid; grid-template-columns: 2fr 3fr; gap: 24pt; flex: 1; }
.col { display: flex; flex-direction: column; gap: 7pt; }
.challenge-title { font-size: 11pt; font-weight: 500; color: var(--ink-secondary); }
.goal-title { font-size: 11pt; font-weight: 600; color: var(--ink); }
`;

const s5Content = `
<p class="slide-title">3、客服转型背景与战略目标</p>
<p class="slide-subtitle">行业挑战 → 战略方向 → 核心目标</p>
<div class="split-layout">
  <div class="col">
    <p class="section-label" style="color: var(--text-gray);">行 业 挑 战</p>
    <div class="challenge-card"><p class="challenge-title">获客成本持续上升</p><p class="item-desc">市场竞争加剧，需要通过精准识别提升ROI</p></div>
    <div class="challenge-card"><p class="challenge-title">合规要求趋严</p><p class="item-desc">金融营销合规要求持续收紧，需要强化合规能力</p></div>
    <div class="challenge-card"><p class="challenge-title">技术迭代压力</p><p class="item-desc">AI、大数据等新技术快速迭代，需持续学习应用</p></div>
  </div>
  <div class="col">
    <p class="section-label" style="color: var(--brand-red);">战 略 目 标</p>
    <div class="goal-card"><p class="goal-title">客服价值化</p><p class="item-desc">从成本中心转变为价值创造中心，通过数据驱动实现精准营销与高效服务</p></div>
    <div class="goal-card"><p class="goal-title">数字智能化</p><p class="item-desc">AI赋能全流程：需求识别、智能路由、话术辅助、合规监控、智能质检</p></div>
    <div class="goal-card"><p class="goal-title">服务营销一体化</p><p class="item-desc">全生命周期运营：新客获取→首次转化→复购激活→流失预警</p></div>
  </div>
</div>
`;

writeFileSync(join(slidesDir, '05-background.html'),
  writeSlide('05-background', '转型背景', s5Extra).replace('{{CONTENT}}', s5Content).replace('{{PAGE}}', '05 / 11'));
console.log('Wrote 05-background.html');

// ============================================================
// SLIDE 6: Implementation Process
// ============================================================
const s6Extra = `
.phase-card { padding: 10pt 10pt; }
.phase-num { display: inline-flex; align-items: center; justify-content: center; width: 20pt; height: 20pt; border-radius: 50%; background: var(--brand-red); color: white; font-size: 10pt; font-weight: 700; margin-bottom: 6pt; }
.phase-num p { color: white; font-size: 10pt; font-weight: 700; }
.phase-title { font-size: 11pt; font-weight: 600; margin-bottom: 6pt; }
.phase-label { font-size: 8pt; color: var(--text-gray); font-weight: 600; letter-spacing: 0.5pt; margin: 5pt 0 2pt; text-transform: uppercase; }
.phase-text { font-size: 9pt; color: var(--ink-secondary); line-height: 1.5; }
.phase-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10pt; flex: 1; align-items: stretch; }
`;

const s6Content = `
<p class="slide-title">4、客服转型实施过程</p>
<p class="slide-subtitle">从战略目标到落地实施的四个阶段</p>
<div class="phase-grid">
  <div class="card phase-card">
    <div class="phase-num"><p style="color:white;font-size:10pt;font-weight:700;text-align:center;">1</p></div>
    <p class="phase-title">战略规划期</p>
    <p class="phase-label">目标</p><p class="phase-text">明确转型方向，确定数据驱动+AI赋能的核心策略</p>
    <p class="phase-label">措施</p><p class="phase-text">组建数据团队，搭建AI需求识别模型，规划智能外呼体系</p>
    <p class="phase-label">挑战</p><p class="phase-text">传统思维惯性，技术选型难度，跨部门协调</p>
  </div>
  <div class="card phase-card">
    <div class="phase-num"><p style="color:white;font-size:10pt;font-weight:700;text-align:center;">2</p></div>
    <p class="phase-title">系统建设期</p>
    <p class="phase-label">目标</p><p class="phase-text">建设智能外呼平台，打通数据链路，实现精准客户画像</p>
    <p class="phase-label">措施</p><p class="phase-text">开发客户画像系统，上线智能路由，部署实时话术辅助</p>
    <p class="phase-label">挑战</p><p class="phase-text">数据整合难度大，系统稳定性要求高，供应商协同</p>
  </div>
  <div class="card phase-card">
    <div class="phase-num"><p style="color:white;font-size:10pt;font-weight:700;text-align:center;">3</p></div>
    <p class="phase-title">试点运营期</p>
    <p class="phase-label">目标</p><p class="phase-text">小范围试点验证，优化AI模型和运营流程</p>
    <p class="phase-label">措施</p><p class="phase-text">选择核心业务线试点，A/B测试验证效果，持续迭代优化</p>
    <p class="phase-label">挑战</p><p class="phase-text">模型准确率提升，坐席适应新工具，合规监控完善</p>
  </div>
  <div class="card phase-card" style="border-color: rgba(226,35,26,0.2); background: var(--brand-red-light);">
    <div class="phase-num"><p style="color:white;font-size:10pt;font-weight:700;text-align:center;">4</p></div>
    <p class="phase-title">全面推广期</p>
    <p class="phase-label">目标</p><p class="phase-text">全业务线推广，规模化运营，建立持续优化机制</p>
    <p class="phase-label">措施</p><p class="phase-text">覆盖全部产线，3000+人全面使用，建立数据闭环</p>
    <p class="phase-label">挑战</p><p class="phase-text">大规模团队培训，供应商管理标准化，合规体系完善</p>
  </div>
</div>
`;

writeFileSync(join(slidesDir, '06-implementation.html'),
  writeSlide('06-implementation', '实施过程', s6Extra).replace('{{CONTENT}}', s6Content).replace('{{PAGE}}', '06 / 11'));
console.log('Wrote 06-implementation.html');

// ============================================================
// SLIDE 7: Results
// ============================================================
const s7Extra = `
.result-card { text-align: center; padding: 14pt 10pt; }
.result-grid { display: grid; grid-template-columns: 1fr 1fr 1fr; gap: 10pt; flex: 1; align-items: start; }
.result-dim-bar { display: flex; gap: 0; margin-top: 10pt; background: var(--bg-card); border: 1px solid var(--border-light); border-radius: var(--radius); overflow: hidden; }
.result-dim-item { flex: 1; padding: 8pt 10pt; border-right: 1px solid var(--border-light); }
.result-dim-item:last-child { border-right: none; }
.dim-label { font-size: 9pt; color: var(--brand-red); font-weight: 600; margin-bottom: 3pt; }
.dim-desc { font-size: 8.5pt; color: var(--ink-secondary); line-height: 1.5; }
`;

const s7Content = `
<p class="slide-title">5、客服转型具体成果</p>
<p class="slide-subtitle">创新成果 · 绩效达成 · 战略贡献</p>
<div class="result-grid">
  <div class="card result-card"><p class="data-cyan-label">效率提升</p><p class="data-number-sm">+35%</p><p class="data-label">接通率提升</p></div>
  <div class="card result-card"><p class="data-cyan-label">转化成果</p><p class="data-number-sm">+25%</p><p class="data-label">营销转化率提升</p></div>
  <div class="card result-card"><p class="data-cyan-label">合规保障</p><p class="data-number-sm">100%</p><p class="data-label">合规率保持</p></div>
  <div class="card result-card"><p class="data-cyan-label">效率跃升</p><p class="data-number-sm">+40%</p><p class="data-label">人均效率提升</p></div>
  <div class="card result-card"><p class="data-cyan-label">新人培养</p><p class="data-number-sm">-67%</p><p class="data-label">新人上手时间缩短</p></div>
  <div class="card result-card"><p class="data-cyan-label">质检升级</p><p class="data-number-sm">300%</p><p class="data-label">质检效率提升</p></div>
</div>
<div class="result-dim-bar">
  <div class="result-dim-item"><p class="dim-label">客服价值化</p><p class="dim-desc">从成本中心转型为价值创造中心，年GMV突破2000亿</p></div>
  <div class="result-dim-item"><p class="dim-label">数字智能化</p><p class="dim-desc">AI全流程赋能，需求识别、智能路由、实时辅助、合规监控</p></div>
  <div class="result-dim-item"><p class="dim-label">服务营销一体化</p><p class="dim-desc">全生命周期运营，客户复购率提升30%</p></div>
</div>
`;

writeFileSync(join(slidesDir, '07-results.html'),
  writeSlide('07-results', '具体成果', s7Extra).replace('{{CONTENT}}', s7Content).replace('{{PAGE}}', '07 / 11'));
console.log('Wrote 07-results.html');

// ============================================================
// SLIDE 8: Success Keys
// ============================================================
const s8Extra = `
.key-factor { display: flex; align-items: flex-start; gap: 10pt; padding: 7pt 0; }
.key-num { display: flex; align-items: center; justify-content: center; width: 22pt; height: 22pt; border-radius: 50%; background: var(--brand-red); color: white; font-size: 11pt; font-weight: 700; flex-shrink: 0; }
.key-num p { color: white; font-size: 11pt; font-weight: 700; text-align: center; }
.key-title { font-size: 10.5pt; font-weight: 600; color: var(--ink); }
.key-desc { font-size: 9.5pt; color: var(--ink-secondary); margin-top: 2pt; line-height: 1.5; }
.inspiration-card { padding: 18pt 16pt; min-height: 200pt; display: flex; flex-direction: column; justify-content: center; }
.inspiration-heading { font-size: 12pt; font-weight: 700; color: var(--brand-red); margin-bottom: 10pt; letter-spacing: 1pt; }
.inspiration-item { font-size: 10pt; color: var(--ink-secondary); line-height: 1.7; margin-bottom: 6pt; }
.split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24pt; flex: 1; align-items: center; }
`;

const s8Content = `
<p class="slide-title">6、客服转型的成功关键</p>
<p class="slide-subtitle">从战略到战术、从计划到落地的关键要因</p>
<div class="split-layout">
  <div>
    <div class="grid-2" style="gap: 4pt 12pt;">
      <div>
        <div class="key-factor"><div class="key-num"><p style="color:white;font-size:11pt;font-weight:700;text-align:center;">1</p></div><div><p class="key-title">数据驱动的客户识别</p><p class="key-desc">AI需求识别模型精准定位有真实需求的客户</p></div></div>
        <div class="key-factor"><div class="key-num"><p style="color:white;font-size:11pt;font-weight:700;text-align:center;">2</p></div><div><p class="key-title">人机协同的智能外呼</p><p class="key-desc">AI成为坐席"超级助手"，实时话术推荐+情绪监控</p></div></div>
        <div class="key-factor"><div class="key-num"><p style="color:white;font-size:11pt;font-weight:700;text-align:center;">3</p></div><div><p class="key-title">AI赋能的合规体系</p><p class="key-desc">实时合规监控+智能质检，100%通话覆盖</p></div></div>
      </div>
      <div>
        <div class="key-factor"><div class="key-num"><p style="color:white;font-size:11pt;font-weight:700;text-align:center;">4</p></div><div><p class="key-title">全生命周期精准营销</p><p class="key-desc">新客获取→首次转化→复购激活→流失预警完整链路</p></div></div>
        <div class="key-factor"><div class="key-num"><p style="color:white;font-size:11pt;font-weight:700;text-align:center;">5</p></div><div><p class="key-title">规模化团队管理</p><p class="key-desc">35家供应商、3000+人标准化运营，稳定性100%</p></div></div>
      </div>
    </div>
  </div>
  <div class="card card-red-left inspiration-card">
    <p class="inspiration-heading">对其他中心的启发</p>
    <p class="inspiration-item"><b style="color:var(--ink);">技术不是壁垒，数据才是。</b>真正的转型不在于引入多少AI工具，而在于能否构建从数据采集到应用决策的完整闭环。</p>
    <p class="inspiration-item"><b style="color:var(--ink);">人机协同的核心是"人"。</b>AI的价值在于降低门槛、提升效率，但信任建立和情感连接仍然需要人来完成。</p>
    <p class="inspiration-item"><b style="color:var(--ink);">合规不是成本，是竞争力。</b>在合规要求趋严的时代，先建立合规体系的团队将获得更大的发展空间。</p>
    <p class="inspiration-item"><b style="color:var(--ink);">规模化管理的关键是标准化。</b>35家供应商、3000+人团队的管理能力，本身就是一种竞争壁垒。</p>
  </div>
</div>
`;

writeFileSync(join(slidesDir, '08-keys.html'),
  writeSlide('08-keys', '成功关键', s8Extra).replace('{{CONTENT}}', s8Content).replace('{{PAGE}}', '08 / 11'));
console.log('Wrote 08-keys.html');

// ============================================================
// SLIDE 9: Org Change & Talent
// ============================================================
const s9Extra = `
.col-heading { font-size: 12pt; font-weight: 600; margin-bottom: 10pt; }
.col-heading-wrap { padding-bottom: 6pt; margin-bottom: 10pt; }
.col-heading-wrap.gold { border-bottom: 2px solid var(--gold); }
.col-heading-wrap.red { border-bottom: 2px solid var(--brand-red); }
.item-row { display: flex; align-items: flex-start; gap: 8pt; padding: 6pt 0; border-bottom: 1px solid var(--border-light); }
.item-row:last-child { border-bottom: none; }
.item-dot { width: 5pt; height: 5pt; border-radius: 50%; margin-top: 5pt; flex-shrink: 0; }
.split-layout { display: grid; grid-template-columns: 1fr 1fr; gap: 24pt; flex: 1; }
`;

const s9Content = `
<p class="slide-title">7、组织变革与人才培养</p>
<p class="slide-subtitle">架构变革 · 人才驱动 · 能力升级</p>
<div class="split-layout">
  <div>
    <div class="col-heading-wrap gold"><p class="col-heading" style="color: var(--gold);">组织变革</p></div>
    <div class="item-row"><div class="item-dot" style="background:var(--gold);"></div><div><p class="item-title">部门定位升级</p><p class="item-desc">从传统客服部门转型为"数据驱动的服务营销中枢"</p></div></div>
    <div class="item-row"><div class="item-dot" style="background:var(--gold);"></div><div><p class="item-title">策略组与服务组双轮驱动</p><p class="item-desc">策略组负责数据分析与策略制定，服务组负责供应商管理与运营落地</p></div></div>
    <div class="item-row"><div class="item-dot" style="background:var(--gold);"></div><div><p class="item-title">供应商协同管理</p><p class="item-desc">建立35家供应商的标准化管理体系，实现规模化运营与质量控制</p></div></div>
  </div>
  <div>
    <div class="col-heading-wrap red"><p class="col-heading" style="color: var(--brand-red);">人才培养</p></div>
    <div class="item-row"><div class="item-dot" style="background:var(--brand-red);"></div><div><p class="item-title">AI辅助降低新人门槛</p><p class="item-desc">AI实时话术推荐和需求挖掘辅助，新人上手时间缩短67%</p></div></div>
    <div class="item-row"><div class="item-dot" style="background:var(--brand-red);"></div><div><p class="item-title">复合型人才培养</p><p class="item-desc">培养懂数据+懂AI+懂营销的复合人才</p></div></div>
    <div class="item-row"><div class="item-dot" style="background:var(--brand-red);"></div><div><p class="item-title">合规意识深度植入</p><p class="item-desc">通过AI实时监控和智能质检，让合规意识从被动遵守变为主动习惯</p></div></div>
  </div>
</div>
`;

writeFileSync(join(slidesDir, '09-talent.html'),
  writeSlide('09-talent', '组织变革与人才培养', s9Extra).replace('{{CONTENT}}', s9Content).replace('{{PAGE}}', '09 / 11'));
console.log('Wrote 09-talent.html');

// ============================================================
// SLIDE 10: Next Steps
// ============================================================
const s10Extra = `
.next-card { min-height: 140pt; display: flex; flex-direction: column; }
.next-card img { margin-bottom: 6pt; flex-shrink: 0; width: 30pt; height: 30pt; }
.next-title { font-size: 11pt; font-weight: 600; margin-bottom: 4pt; }
.next-text { font-size: 9pt; color: var(--ink-secondary); line-height: 1.5; flex: 1; }
.next-grid { display: grid; grid-template-columns: 1fr 1fr 1fr 1fr; gap: 10pt; flex: 1; align-items: stretch; }
.phase-num-sm { display: inline-flex; align-items: center; justify-content: center; width: 18pt; height: 18pt; border-radius: 50%; background: var(--brand-red); color: white; font-size: 9pt; font-weight: 700; margin-bottom: 4pt; }
.phase-num-sm p { color: white; font-size: 9pt; font-weight: 700; text-align: center; }
`;

const s10Content = `
<p class="slide-title">8、客服转型的下一步计划</p>
<p class="slide-subtitle">持续进化 · 未来展望</p>
<div class="next-grid">
  <div class="card next-card">
    <img src="${iconPaths.ai}" alt="AI">
    <div class="phase-num-sm"><p style="color:white;font-size:9pt;font-weight:700;text-align:center;">1</p></div>
    <p class="next-title">AI能力深化</p>
    <p class="next-text">持续优化AI需求识别模型，提升精准度和覆盖率，探索大语言模型在客服场景的应用</p>
  </div>
  <div class="card next-card">
    <img src="${iconPaths.shield}" alt="Shield">
    <div class="phase-num-sm"><p style="color:white;font-size:9pt;font-weight:700;text-align:center;">2</p></div>
    <p class="next-title">合规体系升级</p>
    <p class="next-text">应对持续趋严的合规要求，建设更完善的AI合规监控体系，从预警向预防演进</p>
  </div>
  <div class="card next-card">
    <img src="${iconPaths.network}" alt="Network">
    <div class="phase-num-sm"><p style="color:white;font-size:9pt;font-weight:700;text-align:center;">3</p></div>
    <p class="next-title">渠道多元化</p>
    <p class="next-text">在电销基础上探索多渠道融合，构建全渠道智能营销体系，提升客户触达效率</p>
  </div>
  <div class="card next-card" style="border: 1.5px solid var(--brand-red); background: var(--brand-red-light);">
    <img src="${iconPaths.anchor}" alt="Anchor">
    <div class="phase-num-sm" style="border: 2px solid var(--brand-red); background: transparent; color: var(--brand-red);"><p style="color:var(--brand-red);font-size:9pt;font-weight:700;text-align:center;">4</p></div>
    <p class="next-title" style="color: var(--brand-red);">持续保障</p>
    <p class="next-text">保持团队稳定性100%，合规率100%，在规模增长的同时确保服务质量和风险可控</p>
  </div>
</div>
<div class="quote-block" style="margin-top: 10pt; flex-shrink: 0;">
  <p style="font-size: 9.5pt; color: var(--ink-secondary); line-height: 1.6;">客服转型是一个持续的过程，没有终点。关键在于建立持续学习和进化的机制，让每一次技术迭代都成为能力升级的机会。</p>
</div>
`;

writeFileSync(join(slidesDir, '10-next.html'),
  writeSlide('10-next', '下一步计划', s10Extra).replace('{{CONTENT}}', s10Content).replace('{{PAGE}}', '10 / 11'));
console.log('Wrote 10-next.html');

// ============================================================
// SLIDE 11: Thanks
// ============================================================
const s11Extra = `
.thanks-content { display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; gap: 0; }
.thanks-text { font-size: 56pt; font-weight: 900; color: var(--brand-red); letter-spacing: 6pt; }
.thanks-sub { font-size: 12pt; color: var(--ink-secondary); margin-top: 14pt; letter-spacing: 3pt; }
`;

const s11Content = `
<div class="thanks-content">
  <p class="thanks-text">THANKS</p>
  <p class="thanks-sub">京东科技 · 金融科技事业群 · 数据科技业务部</p>
</div>
`;

// Thanks page doesn't need page number or brand bar
const s11Html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
<meta charset="UTF-8">
<title>结束页</title>
<style>${cssTokens}${s11Extra}</style>
</head>
<body>
<div class="slide-inner">
${s11Content}
<span class="page-num">11 / 11</span>
<div class="brand-bar"></div>
</div>
</body>
</html>`;
writeFileSync(join(slidesDir, '11-thanks.html'), s11Html);
console.log('Wrote 11-thanks.html');

// ============================================================
// Step 3: Convert to PPTX
// ============================================================
const pptx = new pptxgen();
pptx.layout = 'LAYOUT_16x9';
pptx.author = '京东科技';
pptx.title = '2026年度新客服节 · 服务营销最佳实践奖';

const slideFiles = [
  '01-cover.html',
  '02-company.html',
  '03-overview.html',
  '04-org.html',
  '05-background.html',
  '06-implementation.html',
  '07-results.html',
  '08-keys.html',
  '09-talent.html',
  '10-next.html',
  '11-thanks.html'
];

for (const file of slideFiles) {
  console.log(`Converting ${file}...`);
  const filePath = join(slidesDir, file);
  try {
    await html2pptx(filePath, pptx);
    console.log(`  OK: ${file}`);
  } catch (err) {
    console.error(`  ERROR in ${file}: ${err.message}`);
    process.exit(1);
  }
}

const outputPath = join(__dirname, '领军人物PPT-20260501.pptx');
await pptx.writeFile({ fileName: outputPath });
console.log(`\nPPTX saved to: ${outputPath}`);
