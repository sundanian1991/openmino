const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'slides');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Colors
const R = '#E2231A';        // 京东红
const RLight = '#FF6B5A';   // 浅红
const RSubtle = '#FEECEB';  // 极浅红底
const RSubtle2 = '#FDF2F1'; // 更浅
const BG = '#F5F5F5';       // 页面浅灰底
const Dk = '#1A1A1A';       // 近黑
const Md = '#555555';       // 中灰正文
const Lt = '#888888';       // 浅灰辅助
const Bd = '#E2E2E2';       // 边框

const commonHead = `<style>
html { background: ${BG}; }
body { width: 720pt; height: 405pt; margin: 0; padding: 0; font-family: "Microsoft YaHei", Arial, sans-serif; background: ${BG}; overflow: hidden; }
</style>`;

function wrap(content) {
  return `<!DOCTYPE html><html><head>${commonHead}</head>
<body>
${content}
</body></html>`;
}

function redBar() {
  return `<div style="width:3pt;height:20pt;background:${R};position:absolute;left:40pt;top:${arguments[0]||24}pt;"></div>`;
}

function sectionHeader(num, title, y) {
  y = y || 24;
  return `<div style="position:absolute;top:${y}pt;left:50pt;">
    <span style="color:${R};font-size:11pt;font-weight:bold;">${num}</span>
    <span style="color:${Dk};font-size:15pt;font-weight:bold;margin-left:10pt;">${title}</span>
  </div>
  <div style="position:absolute;top:${y+22}pt;left:50pt;width:40pt;height:2pt;background:${R};"></div>`;
}

function card(x, y, w, title, color, items, opts = {}) {
  const bg = opts.bg || '#FFFFFF';
  const border = opts.border || Bd;
  const leftBorder = opts.leftBorder;
  let h = 20;
  if (title) h += 18;
  h += (items.length * 15) + 12;
  let html = `<div style="position:absolute;left:${x}pt;top:${y}pt;width:${w}pt;background:${bg};border:0.5pt solid ${border};border-radius:3pt;padding:10pt 12pt;${leftBorder ? `border-left:3pt solid ${color};` : ''}">`;
  if (title) html += `<p style="color:${color};font-size:10.5pt;font-weight:bold;margin:0 0 6pt 0;">${title}</p>`;
  for (const item of items) {
    html += `<p style="color:${Md};font-size:8.5pt;margin:0 0 3pt 0;">${item}</p>`;
  }
  html += `</div>`;
  return html;
}

function statBox(x, y, w, val, label, color) {
  return `<div style="position:absolute;left:${x}pt;top:${y}pt;width:${w}pt;text-align:center;">
    <p style="color:${color};font-size:20pt;font-weight:bold;margin:0;">${val}</p>
    <p style="color:${Lt};font-size:8pt;margin:3pt 0 0 0;">${label}</p>
  </div>`;
}

function numCircle(n) {
  return `<span style="display:inline-block;width:16pt;height:16pt;border-radius:50%;background:${R};color:#FFF;font-size:9pt;font-weight:bold;text-align:center;line-height:16pt;">${n}</span>`;
}

// ==================== SLIDE 1: COVER ====================
const s1 = wrap(`
<!-- JD Red top bar -->
<div style="position:absolute;top:0;left:0;width:720pt;height:4pt;background:${R};"></div>
<!-- Bottom decorative line -->
<div style="position:absolute;bottom:0;left:0;width:720pt;height:3pt;background:${R};"></div>
<!-- Red accent square -->
<div style="position:absolute;top:60pt;left:60pt;width:60pt;height:60pt;background:${R};"></div>
<div style="position:absolute;top:68pt;left:68pt;width:60pt;height:60pt;border:2pt solid ${R};"></div>

<div style="position:absolute;top:100pt;left:140pt;width:520pt;">
  <p style="color:${R};font-size:13pt;margin:0 0 8pt 0;letter-spacing:4pt;">2026</p>
  <h1 style="color:${Dk};font-size:26pt;margin:0 0 6pt 0;font-weight:bold;">中国新客服节</h1>
  <h1 style="color:${Dk};font-size:18pt;margin:0 0 24pt 0;font-weight:normal;">服务营销最佳实践奖 · 申报</h1>
  <div style="width:60pt;height:2pt;background:${R};margin-bottom:16pt;"></div>
  <p style="color:${Md};font-size:13pt;margin:0 0 3pt 0;">京东科技股份有限公司</p>
  <p style="color:${Lt};font-size:11pt;margin:0;">金融科技事业群 · 数据科技业务部</p>
</div>

<!-- Bottom right small decoration -->
<div style="position:absolute;bottom:40pt;right:60pt;width:100pt;height:2pt;background:${R};opacity:0.3;"></div>
<div style="position:absolute;bottom:44pt;right:60pt;width:60pt;height:2pt;background:${R};opacity:0.15;"></div>
`);

// ==================== SLIDE 2: TOC ====================
const tocItems = [
  '呼叫中心现况简介',
  '呼叫中心组织架构',
  '客服转型背景与战略目标',
  '客服转型实施过程',
  '客服转型具体成果',
  '客服转型的成功关键',
  '组织变革与人才培养',
  '下一步计划'
];
let tocHtml = '';
for (let i = 0; i < 8; i++) {
  const col = i < 4 ? 'left' : 'right';
  const idx = i % 4;
  const x = i < 4 ? 50 : 380;
  const y = 70 + idx * 78;
  tocHtml += `<div style="position:absolute;left:${x}pt;top:${y}pt;width:300pt;display:flex;align-items:center;">
    <div style="width:32pt;height:32pt;border-radius:50%;background:${RSubtle};display:flex;align-items:center;justify-content:center;margin-right:14pt;flex-shrink:0;">
      <span style="color:${R};font-size:12pt;font-weight:bold;">${String(i+1).padStart(2,'0')}</span>
    </div>
    <div>
      <p style="color:${Dk};font-size:13pt;margin:0;">${tocItems[i]}</p>
    </div>
  </div>`;
}

const s2 = wrap(`
<div style="position:absolute;top:0;left:0;width:720pt;height:3pt;background:${R};"></div>
<div style="position:absolute;top:28pt;left:50pt;">
  <p style="color:${R};font-size:10pt;margin:0 0 4pt 0;letter-spacing:2pt;">CONTENTS</p>
  <h1 style="color:${Dk};font-size:20pt;margin:0;">目录</h1>
</div>
<div style="position:absolute;top:62pt;left:50pt;width:40pt;height:2pt;background:${R};"></div>
${tocHtml}
`);

// ==================== SLIDE 3: 呼叫中心现况简介 ====================
const s3 = wrap(`
${sectionHeader('01', '呼叫中心现况简介')}
<div style="position:absolute;top:56pt;left:50pt;width:300pt;">
  ${card(0, 0, 300, '使命与愿景', R, [
    '<b>使命：</b>技术为本，让生活更美好',
    '<b>愿景：</b>成为全球最值得信赖的企业',
    '<b>价值观：</b>客户为先、创新、拼搏、担当、感恩、诚信'
  ])}
  ${card(0, 98, 300, '企业基本信息', RLight, [
    '京东科技股份有限公司 | 金融科技 / 科技服务',
    '信息技术咨询、云计算、AI应用、数据处理',
    '客服中心：数据科技业务部 | 2018年运营',
    '客服电话：4000988505'
  ], {leftBorder: true})}
</div>

<!-- Department positioning card -->
<div style="position:absolute;top:56pt;right:50pt;width:300pt;background:#FFFFFF;border:0.5pt solid ${Bd};border-radius:3pt;padding:14pt;">
  <p style="color:${R};font-size:10.5pt;font-weight:bold;margin:0 0 8pt 0;">部门定位</p>
  <p style="color:${Dk};font-size:12pt;font-weight:bold;margin:0 0 6pt 0;">"数据驱动的服务营销中枢"</p>
  <p style="color:${Md};font-size:9pt;margin:0;">精细化运营 + 智能化管理</p>
  <p style="color:${Md};font-size:9pt;margin:2pt 0 0 0;">为用户提供专业金融服务体验</p>
</div>

<!-- Stats row -->
<div style="position:absolute;bottom:50pt;left:50pt;width:620pt;display:flex;gap:20pt;">
  ${statBox(0, 0, 200, '2,900+', '前台人员', R)}
  ${statBox(0, 0, 200, '100+', '中台人员', R)}
  ${statBox(0, 0, 200, '50+', '后台人员', R)}
</div>
<div style="position:absolute;bottom:46pt;left:50pt;width:620pt;height:1pt;background:${Bd};"></div>
`);

// ==================== SLIDE 4: 团队规模与服务渠道 ====================
const s4 = wrap(`
${sectionHeader('01', '团队规模与服务渠道')}
<div style="position:absolute;top:56pt;left:50pt;width:420pt;">
  ${card(0, 0, 420, '服务渠道', R, [
    '<b>电销渠道（100%）</b> — 金融营销电销外呼业务，涵盖拉新、复购等全流程服务',
    '覆盖信贷、理财、保险等金融产品线',
    '年度亿级客户触达'
  ], {leftBorder: true})}

  <!-- Team cards -->
  <div style="display:flex;margin-top:10pt;">
    <div style="flex:1;background:#FFFFFF;border:0.5pt solid ${Bd};border-radius:3pt;padding:10pt;margin-right:8px;text-align:center;">
      <p style="color:${R};font-size:16pt;font-weight:bold;margin:0;">2,900+</p>
      <p style="color:${Dk};font-size:8pt;margin:2pt 0 0 0;">前台人员</p>
      <p style="color:${Lt};font-size:7.5pt;margin:1pt 0 0 0;">本科60% | 大专40%</p>
    </div>
    <div style="flex:1;background:#FFFFFF;border:0.5pt solid ${Bd};border-radius:3pt;padding:10pt;margin-right:8px;text-align:center;">
      <p style="color:${R};font-size:16pt;font-weight:bold;margin:0;">100+</p>
      <p style="color:${Dk};font-size:8pt;margin:2pt 0 0 0;">中台人员</p>
      <p style="color:${Lt};font-size:7.5pt;margin:1pt 0 0 0;">管理与运营支撑</p>
    </div>
    <div style="flex:1;background:#FFFFFF;border:0.5pt solid ${Bd};border-radius:3pt;padding:10pt;text-align:center;">
      <p style="color:${R};font-size:16pt;font-weight:bold;margin:0;">50+</p>
      <p style="color:${Dk};font-size:8pt;margin:2pt 0 0 0;">后台人员</p>
      <p style="color:${Lt};font-size:7.5pt;margin:1pt 0 0 0;">技术与数据分析</p>
    </div>
  </div>
</div>

<!-- Core metrics panel -->
<div style="position:absolute;top:56pt;right:50pt;width:210pt;background:#FFFFFF;border:0.5pt solid ${Bd};border-top:2pt solid ${R};border-radius:3pt;padding:12pt;">
  <p style="color:${R};font-size:10.5pt;font-weight:bold;margin:0 0 10pt 0;text-align:center;">核心指标</p>
  <div style="display:flex;flex-wrap:wrap;gap:2pt;">
    ${statBox(0, 0, 100, '2000亿+', '年度GMV', R)}
    ${statBox(0, 0, 100, '3000+', '团队规模', R)}
    ${statBox(0, 0, 100, '35家', '供应商', R)}
    ${statBox(0, 0, 100, '100%', '合规率', R)}
  </div>
</div>
`);

// ==================== SLIDE 5: 呼叫中心组织架构 ====================
const s5 = wrap(`
${sectionHeader('02', '呼叫中心组织架构')}
<!-- Top level -->
<div style="position:absolute;top:56pt;left:210pt;width:300pt;background:${R};border-radius:3pt;padding:8pt;text-align:center;">
  <p style="color:#FFFFFF;font-size:13pt;font-weight:bold;margin:0;">数据科技业务部</p>
</div>

<!-- Second level -->
<div style="position:absolute;top:96pt;left:50pt;width:620pt;display:flex;gap:16pt;">
  <div style="flex:1;background:#FFFFFF;border:0.5pt solid ${Bd};border-radius:3pt;padding:10pt;text-align:center;">
    <p style="color:${R};font-size:11pt;font-weight:bold;margin:0;">策略运营组</p>
    <p style="color:${Lt};font-size:8.5pt;margin:2pt 0 0 0;">刘伟佳</p>
  </div>
  <div style="flex:1;background:#FFFFFF;border:0.5pt solid ${Bd};border-radius:3pt;padding:10pt;text-align:center;">
    <p style="color:${R};font-size:11pt;font-weight:bold;margin:0;">电销服务组</p>
    <p style="color:${Lt};font-size:8.5pt;margin:2pt 0 0 0;">王易人</p>
  </div>
</div>

<!-- Product lines -->
<div style="position:absolute;top:148pt;left:50pt;width:620pt;display:flex;gap:8px;">
  ${['消金线','企金线','信用卡线','财富线'].map(l =>
    `<div style="flex:1;background:${RSubtle2};border-radius:3pt;padding:10px;text-align:center;">
      <p style="color:${Dk};font-size:9pt;margin:0;">${l}</p>
    </div>`
  ).join('')}
</div>

<!-- Support functions -->
<div style="position:absolute;top:190pt;left:50pt;width:620pt;display:flex;gap:12pt;">
  ${card(0, 0, 300, '业务管理', R, ['日常BPO沟通协调'], {leftBorder: true})}
  ${card(0, 0, 300, '质检培训运营', R, ['合规保障 + 供应商赋能'], {leftBorder: true})}
</div>

<div style="position:absolute;bottom:46pt;left:50pt;width:620pt;text-align:center;">
  <p style="color:${Lt};font-size:9pt;margin:0;">30+家供应商 | 3000+人团队 | 覆盖全流程营销服务</p>
</div>
<div style="position:absolute;bottom:42pt;left:50pt;width:620pt;height:1pt;background:${Bd};"></div>
`);

// ==================== SLIDE 6: 客服转型背景与战略目标 ====================
const s6 = wrap(`
${sectionHeader('03', '客服转型背景与战略目标')}
<div style="position:absolute;top:56pt;left:50pt;width:300pt;">
  ${card(0, 0, 300, '转型背景', R, [
    '金融科技行业竞争加剧，获客成本持续上升',
    '传统电销模式效率见顶，依赖人工经验',
    '合规要求日趋严格，事后检查已不足够',
    'AI/大数据技术成熟带来转型窗口'
  ], {leftBorder: true})}
  ${card(0, 120, 300, '战略目标', RLight, [
    '构建数据驱动的智能电销营销体系',
    '实现人机协同的规模化高效运营',
    '建立行业领先的合规管控标准',
    '打造可复制的供应商管理模式'
  ], {leftBorder: true})}
</div>

<!-- Three strategic dimensions -->
<div style="position:absolute;top:56pt;right:50pt;width:300pt;">
  <p style="color:${R};font-size:11pt;font-weight:bold;margin:0 0 10pt 0;">三大战略维度</p>
  ${card(0, 0, 300, '客服价值化', R, ['从成本中心转为价值创造中心', '以GMV和客户价值衡量产出'], {leftBorder: true})}
  ${card(0, 90, 300, '数字智能化', RLight, ['数据驱动精准服务与运营', 'AI辅助营销全流程 + 100%智能质检'], {leftBorder: true})}
  ${card(0, 180, 300, '服务营销一体化', R, ['营销与服务深度耦合', '拉新-转化-复购闭环'], {leftBorder: true})}
</div>
`);

// ==================== SLIDE 7: 客服转型实施过程 ====================
const phases = [
  { n: '阶段一', t: '数据基础', items: ['整合客户数据源', '构建统一客户画像', '建立分层运营体系'] },
  { n: '阶段二', t: 'AI能力建设', items: ['开发需求识别模型', '部署智能路由系统', '上线实时话术辅助'] },
  { n: '阶段三', t: '合规升级', items: ['100%通话智能质检', '实时合规监控系统', '风险预警机制建设'] },
  { n: '阶段四', t: '规模化运营', items: ['供应商管理模式复制', '全生命周期运营闭环', '数据驱动持续优化'] },
];
let phaseHtml = '';
for (let i = 0; i < phases.length; i++) {
  const p = phases[i];
  const items = p.items.map(item => `<p style="color:${Md};font-size:7.5pt;margin:0 0 3pt 0;">${item}</p>`).join('');
  phaseHtml += `<div style="flex:1;background:#FFFFFF;border:0.5pt solid ${Bd};border-top:3pt solid ${R};border-radius:0 0 3pt 3pt;padding:8pt;margin-right:6px;">
    <p style="color:${R};font-size:8pt;margin:0;">${p.n}</p>
    <p style="color:${Dk};font-size:10pt;font-weight:bold;margin:2pt 0 6pt 0;">${p.t}</p>
    ${items}
  </div>`;
}

const measures = [
  { t: '数据赋能客户识别', d: 'AI需求识别模型 + 精准分层运营' },
  { t: '人机协同智能外呼', d: '智能路由匹配 + AI实时话术辅助' },
  { t: 'AI赋能合规提效', d: '实时敏感词识别 + 100%智能质检' },
  { t: 'AI赋能精准营销', d: '语义分析需求挖掘 + 数据闭环优化' },
];
let measuresHtml = '';
for (let i = 0; i < measures.length; i++) {
  const m = measures[i];
  measuresHtml += `<div style="flex:1;background:#FFFFFF;border:0.5pt solid ${Bd};border-left:2pt solid ${R};padding:6pt 8pt;margin-right:6px;">
    <p style="color:${R};font-size:8pt;font-weight:bold;margin:0 0 2pt 0;">${m.t}</p>
    <p style="color:${Md};font-size:7.5pt;margin:0;">${m.d}</p>
  </div>`;
}

const s7 = wrap(`
${sectionHeader('04', '客服转型实施过程')}
<div style="position:absolute;top:56pt;left:50pt;width:620pt;">
  <div style="display:flex;">${phaseHtml}</div>
  <p style="color:${R};font-size:10pt;font-weight:bold;margin:12pt 0 6pt 0;">四大关键举措</p>
  <div style="display:flex;">${measuresHtml}</div>
</div>
`);

// ==================== SLIDE 8: 客服转型具体成果 ====================
const results = [
  { val: '2000亿+', label: '年度GMV | 放款额' },
  { val: '3,000+', label: '团队规模' },
  { val: '35家', label: '供应商 | 全量管理' },
  { val: '100%', label: '合规率 | 红线指标' },
];
let resultsHtml = '';
for (let i = 0; i < results.length; i++) {
  const r = results[i];
  resultsHtml += `<div style="flex:1;text-align:center;background:#FFFFFF;border:0.5pt solid ${Bd};border-radius:3pt;padding:10pt 4pt;margin-right:6px;">
    <p style="color:${R};font-size:18pt;font-weight:bold;margin:0;">${r.val}</p>
    <p style="color:${Lt};font-size:7.5pt;margin:3pt 0 0 0;">${r.label}</p>
  </div>`;
}

const detailResults = [
  { t: '客服价值化', items: ['接通率提升 35%', '首拨转化率提升 28%', '人均效率提升 40%', '新人上手时间缩短 67%'] },
  { t: '数字智能化', items: ['100% 智能质检覆盖', '质检效率提升 300%', '合规风险降低 60%', '事后检查 → 事中预警'] },
  { t: '服务营销一体化', items: ['营销转化率提升 25%', '客户复购率提升 30%', '全生命周期运营闭环', '拉新-转化-复购持续增长'] },
];
let detailHtml = '';
for (const d of detailResults) {
  const items = d.items.map(i => `<p style="color:${Md};font-size:7.5pt;margin:0 0 2pt 0;">${i}</p>`).join('');
  detailHtml += `<div style="flex:1;background:#FFFFFF;border:0.5pt solid ${Bd};border-top:2pt solid ${R};border-radius:0 0 3pt 3pt;padding:8pt;margin-right:6px;">
    <p style="color:${R};font-size:9pt;font-weight:bold;margin:0 0 4pt 0;">${d.t}</p>
    ${items}
  </div>`;
}

const s8 = wrap(`
${sectionHeader('05', '客服转型具体成果')}
<div style="position:absolute;top:56pt;left:50pt;width:620pt;">
  <div style="display:flex;">${resultsHtml}</div>
  <div style="display:flex;margin-top:8px;">${detailHtml}</div>
  <div style="background:${RSubtle};border-left:3pt solid ${R};padding:8pt 12pt;border-radius:0 3pt 3pt 0;margin-top:8px;">
    <p style="color:${Md};font-size:8.5pt;margin:0;"><b style="color:${R};">核心成果：</b>构建"数据驱动+人机协同+AI合规"三位一体的智能电销营销体系，在效率、合规、增长三个维度实现行业领先水平。</p>
  </div>
</div>
`);

// ==================== SLIDE 9: 客服转型的成功关键 ====================
const keys = [
  { n: '1', t: '数据驱动决策', d: '从经验判断到数据说话。AI需求识别模型替代人工筛选，精准分层运营替代粗放触达。' },
  { n: '2', t: '人机协同而非替代', d: 'AI是坐席的"超级助手"，不是替代品。智能路由匹配最优坐席，保持营销温度和信任感。' },
  { n: '3', t: '合规先行', d: '合规率100%作为红线指标，一票否决。从事后检查升级为事中预警。' },
  { n: '4', t: '供应商生态管理', d: '35家供应商、3000+人的统一管理体系。标准化流程+差异化赋能。' },
  { n: '5', t: '全生命周期运营', d: '从获客到复购的完整闭环。每个环节都有AI辅助和数据优化。' },
];
let keysHtml = '';
for (const k of keys) {
  keysHtml += `<div style="display:flex;margin-bottom:8pt;align-items:flex-start;">
    <div style="width:22pt;height:22pt;border-radius:50%;background:${R};display:flex;align-items:center;justify-content:center;margin-right:10pt;flex-shrink:0;">
      <span style="color:#FFF;font-size:10pt;font-weight:bold;">${k.n}</span>
    </div>
    <div>
      <p style="color:${Dk};font-size:10pt;font-weight:bold;margin:0 0 2pt 0;">${k.t}</p>
      <p style="color:${Md};font-size:8pt;margin:0;">${k.d}</p>
    </div>
  </div>`;
}

const s9 = wrap(`
${sectionHeader('06', '客服转型的成功关键')}
<div style="position:absolute;top:56pt;left:50pt;width:380pt;">
  ${keysHtml}
</div>
<div style="position:absolute;top:56pt;right:50pt;width:230pt;background:#FFFFFF;border:0.5pt solid ${Bd};border-top:2pt solid ${R};border-radius:0 0 3pt 3pt;padding:12pt;">
  <p style="color:${R};font-size:10pt;font-weight:bold;margin:0 0 8pt 0;">启发</p>
  <p style="color:${Md};font-size:8pt;margin:0 0 4pt 0;">转型不必一步到位，分阶段推进</p>
  <p style="color:${Md};font-size:8pt;margin:0 0 4pt 0;">合规是底线也是竞争力</p>
  <p style="color:${Md};font-size:8pt;margin:0;">人机协同的关键是"辅助"而非"替代"</p>
</div>
`);

// ==================== SLIDE 10: 组织变革与人才培养 ====================
const s10 = wrap(`
${sectionHeader('07', '组织变革与人才培养')}
<div style="position:absolute;top:56pt;left:50pt;width:300pt;">
  ${card(0, 0, 300, '组织架构变革', R, [
    '从单一电销团队 → 分层运营体系',
    '新增数据分析、AI训练师、合规管理岗位',
    '供应商管理独立职能：准入-分工-考核-清退',
    '建立"业务管理+质检培训"双线支撑架构'
  ], {leftBorder: true})}
  ${card(0, 120, 300, '人才培养体系', RLight, [
    '新人培训：AI辅助缩短上手67%',
    '进阶培养：数据思维+AI工具',
    '供应商赋能：定期培训+考核+标杆分享',
    '考核：业绩+过程+客户评价+合规四维'
  ], {leftBorder: true})}
</div>

<!-- Key roles -->
<div style="position:absolute;top:56pt;right:50pt;width:300pt;">
  <p style="color:${R};font-size:10pt;font-weight:bold;margin:0 0 8pt 0;">关键人才角色</p>
  ${[
    ['数据分析师', '客户画像构建 | 需求模型优化'],
    ['AI训练师', '话术模型训练 | 质检规则调优'],
    ['合规管理师', '合规体系搭建 | 风险预警设计'],
    ['供应商经理', '全量供应商管理 | 赋能与考核'],
  ].map(([title, desc], i) =>
    `<div style="background:#FFFFFF;border:0.5pt solid ${Bd};border-radius:3pt;padding:8pt;margin-bottom:6px;display:flex;align-items:center;">
      <div style="width:5pt;height:5pt;border-radius:50%;background:${R};margin-right:8pt;flex-shrink:0;"></div>
      <div>
        <p style="color:${Dk};font-size:9pt;font-weight:bold;margin:0;">${title}</p>
        <p style="color:${Lt};font-size:7.5pt;margin:1pt 0 0 0;">${desc}</p>
      </div>
    </div>`
  ).join('')}
</div>
`);

// ==================== SLIDE 11: 下一步计划 ====================
const challenges = [
  '获客成本上升：需通过更精准的客户识别提升ROI',
  '合规要求趋严：需持续强化合规能力',
  '技术迭代压力：需建立持续学习和应用机制',
];
let challengesHtml = '';
for (let i = 0; i < challenges.length; i++) {
  challengesHtml += `<div style="display:flex;align-items:flex-start;margin-bottom:6pt;">
    <div style="width:16pt;height:16pt;border-radius:50%;background:${R};display:flex;align-items:center;justify-content:center;margin-right:8pt;flex-shrink:0;">
      <span style="color:#FFF;font-size:8pt;font-weight:bold;">${i+1}</span>
    </div>
    <p style="color:${Md};font-size:8pt;margin:0;">${challenges[i]}</p>
  </div>`;
}

const plans = [
  { t: '深化AI应用', items: ['升级需求识别模型精准度', '拓展AI辅助场景覆盖', '探索大模型在营销中应用'] },
  { t: '强化合规能力', items: ['建设前瞻性合规体系', '完善风险预警机制', '合规能力对外输出'] },
  { t: '优化生态管理', items: ['供应商分级精细化管理', '建立供应商赋能标准', '打造可复制管理模式'] },
  { t: '持续人才建设', items: ['培养AI+营销复合人才', '建立内部讲师体系', '搭建人才梯队'] },
];
let plansHtml = '';
for (const p of plans) {
  plansHtml += `<div style="flex:1;background:#FFFFFF;border:0.5pt solid ${Bd};border-top:2pt solid ${R};border-radius:0 0 3pt 3pt;padding:8pt;margin-right:6px;">
    <p style="color:${R};font-size:9pt;font-weight:bold;margin:0 0 4pt 0;">${p.t}</p>
    <p style="color:${Md};font-size:7.5pt;margin:0 0 2pt 0;">${p.items[0]}</p>
    <p style="color:${Md};font-size:7.5pt;margin:0 0 2pt 0;">${p.items[1]}</p>
    <p style="color:${Md};font-size:7.5pt;margin:0;">${p.items[2]}</p>
  </div>`;
}

const s11 = wrap(`
${sectionHeader('08', '下一步计划')}
<div style="position:absolute;top:56pt;left:50pt;width:200pt;">
  <p style="color:${R};font-size:10pt;font-weight:bold;margin:0 0 8pt 0;">当前面临的三大挑战</p>
  ${challengesHtml}
</div>
<div style="position:absolute;top:56pt;left:270pt;width:400pt;">
  <p style="color:${R};font-size:10pt;font-weight:bold;margin:0 0 8pt 0;">下一步规划</p>
  <div style="display:flex;">${plansHtml}</div>
</div>
`);

// ==================== SLIDE 12: THANKS ====================
const s12 = wrap(`
<div style="position:absolute;top:0;left:0;width:720pt;height:3pt;background:${R};"></div>
<div style="position:absolute;top:100pt;left:0;width:720pt;text-align:center;">
  <div style="width:60pt;height:2pt;background:${R};margin:0 auto 16pt;"></div>
  <h1 style="color:${Dk};font-size:32pt;margin:0 0 8pt 0;font-weight:bold;">THANKS</h1>
  <div style="width:60pt;height:2pt;background:${R};margin:0 auto 24pt;"></div>
  <p style="color:${Md};font-size:12pt;margin:0 0 4pt 0;">京东科技股份有限公司</p>
  <p style="color:${Lt};font-size:10pt;margin:0;">金融科技事业群 · 数据科技业务部</p>
</div>
<div style="position:absolute;bottom:0;left:0;width:720pt;height:3pt;background:${R};"></div>
`);

// Write all slides
const slides = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12];
slides.forEach((html, i) => {
  fs.writeFileSync(path.join(dir, `slide${i+1}.html`), html);
});

console.log(`Created ${slides.length} HTML slides with white background + JD Red theme.`);
