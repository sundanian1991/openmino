const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'slides');

// Ensure slides dir exists
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

// Common styles
const commonHead = `<style>
html { background: #0D1B2E; }
body { width: 720pt; height: 405pt; margin: 0; padding: 0; font-family: Arial, "Microsoft YaHei", sans-serif; background: #0D1B2E; overflow: hidden; }
</style>`;

function wrap(content) {
  return `<!DOCTYPE html><html><head>${commonHead}</head>
<body>
${content}
</body></html>`;
}

// JD Red theme colors
const R = '#E2231A';        // 京东红
const RLight = '#FF6B5A';   // 浅红
const RDark = '#B51C12';    // 深红
const RSubtle = 'rgba(226,35,26,0.15)';
const RSubtle2 = 'rgba(226,35,26,0.06)';
const W = '#FFFFFF';
const G = '#A0B4CC';        // 灰蓝文字
const M = '#D0DCE8';        // 浅色正文

// Decorative circles using CSS
const circleTopRight = `<div style="position:absolute;top:-60pt;right:-60pt;width:200pt;height:200pt;border-radius:50%;border:2pt solid ${RSubtle};opacity:0.3;"></div>`;
const circleBottomLeft = `<div style="position:absolute;bottom:-80pt;left:-80pt;width:250pt;height:250pt;border-radius:50%;border:2pt solid ${RSubtle};opacity:0.2;"></div>`;
const redLine = `<div style="width:50pt;height:3pt;background:${R};margin-bottom:10pt;"></div>`;
const redLineShort = `<div style="width:30pt;height:3pt;background:${R};margin-bottom:8pt;"></div>`;

function numBadge(n) {
  return `<div style="width:22pt;height:22pt;border-radius:50%;background:${RSubtle};display:inline-flex;align-items:center;justify-content:center;margin-right:8pt;flex-shrink:0;">
    <span style="color:${R};font-size:10pt;font-weight:bold;">${n}</span>
  </div>`;
}

function sectionHeader(num, title) {
  return `<div style="position:absolute;top:20pt;left:40pt;width:640pt;">
    <div style="display:flex;align-items:center;margin-bottom:12pt;">
      ${numBadge(num)}
      <h1 style="color:${W};font-size:18pt;margin:0;">${title}</h1>
    </div>
    <div style="width:40pt;height:2pt;background:${R};"></div>
  </div>`;
}

function card(title, color, items, opts = {}) {
  const bg = opts.bg || `${color}08`;
  const border = opts.border || `${color}20`;
  const leftBorder = opts.leftBorder !== false;
  let html = `<div style="background:${bg};border:0.5pt solid ${border};border-radius:4pt;padding:10pt 12pt;${leftBorder ? `border-left:3pt solid ${color};` : ''}margin-bottom:8pt;">`;
  if (title) html += `<p style="color:${color};font-size:11pt;font-weight:bold;margin:0 0 6pt 0;">${title}</p>`;
  for (const item of items) {
    html += `<p style="color:${M};font-size:8.5pt;margin:0 0 3pt 0;">${item}</p>`;
  }
  html += `</div>`;
  return html;
}

function statCard(val, label, color) {
  return `<div style="text-align:center;padding:8pt 4pt;">
    <p style="color:${color};font-size:18pt;font-weight:bold;margin:0;">${val}</p>
    <p style="color:${G};font-size:7.5pt;margin:3pt 0 0 0;">${label}</p>
  </div>`;
}

// ==================== SLIDE 1: COVER ====================
const s1 = wrap(`
${circleTopRight}
${circleBottomLeft}
<div style="position:absolute;top:80pt;left:60pt;width:600pt;">
  <div style="width:50pt;height:3pt;background:${R};margin-bottom:16pt;"></div>
  <p style="color:${R};font-size:14pt;margin:0 0 6pt 0;letter-spacing:3pt;">2026</p>
  <h1 style="color:${W};font-size:22pt;margin:0 0 6pt 0;font-weight:normal;">中国新客服节 · 服务营销最佳实践奖</h1>
  <h1 style="color:${W};font-size:28pt;margin:0 0 20pt 0;font-weight:bold;">申报PPT</h1>
  <div style="width:80pt;height:2pt;background:${R};margin-bottom:16pt;"></div>
  <p style="color:${G};font-size:13pt;margin:0 0 4pt 0;">京东科技股份有限公司</p>
  <p style="color:${G};font-size:11pt;margin:0;">金融科技事业群 · 数据科技业务部</p>
</div>
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
let tocLeft = '', tocRight = '';
for (let i = 0; i < 4; i++) {
  tocLeft += `<div style="display:flex;align-items:center;margin-bottom:18pt;">
    ${numBadge(String(i+1).padStart(2,'0'))}
    <div>
      <p style="color:${R};font-size:10pt;margin:0;">${String(i+1).padStart(2,'0')}</p>
      <p style="color:${W};font-size:13pt;margin:2pt 0 0 0;">${tocItems[i]}</p>
    </div>
  </div>`;
}
for (let i = 4; i < 8; i++) {
  tocRight += `<div style="display:flex;align-items:center;margin-bottom:18pt;">
    ${numBadge(String(i+1).padStart(2,'0'))}
    <div>
      <p style="color:${R};font-size:10pt;margin:0;">${String(i+1).padStart(2,'0')}</p>
      <p style="color:${W};font-size:13pt;margin:2pt 0 0 0;">${tocItems[i]}</p>
    </div>
  </div>`;
}

const s2 = wrap(`
${circleTopRight}
${circleBottomLeft}
<div style="position:absolute;top:30pt;left:50pt;width:620pt;">
  <p style="color:${R};font-size:10pt;margin:0 0 4pt 0;">CONTENTS</p>
  <h1 style="color:${W};font-size:24pt;margin:0 0 4pt 0;">目录</h1>
  <div style="width:50pt;height:3pt;background:${R};margin-bottom:24pt;"></div>
  <div style="display:flex;">
    <div style="flex:1;margin-right:30pt;">${tocLeft}</div>
    <div style="flex:1;">${tocRight}</div>
  </div>
</div>
`);

// ==================== SLIDE 3: 呼叫中心现况简介 ====================
const s3 = wrap(`
${sectionHeader('01', '呼叫中心现况简介')}
<div style="position:absolute;top:72pt;left:40pt;width:300pt;">
  ${card('使命与愿景', R, [
    '<b>使命：</b>技术为本，让生活更美好',
    '<b>愿景：</b>成为全球最值得信赖的企业',
    '<b>价值观：</b>客户为先、创新、拼搏、担当、感恩、诚信'
  ])}
  ${card('企业基本信息', RLight, [
    '京东科技股份有限公司 | 金融科技 / 科技服务',
    '信息技术咨询、云计算、AI应用、数据处理',
    '客服中心：数据科技业务部 | 2018年运营',
    '客服电话：4000988505'
  ])}
</div>
<div style="position:absolute;top:72pt;right:40pt;width:300pt;">
  <div style="background:${RSubtle};padding:14pt;border-radius:4pt;text-align:center;margin-bottom:12pt;">
    <p style="color:${R};font-size:11pt;font-weight:bold;margin:0 0 8pt 0;">部门定位</p>
    <p style="color:${W};font-size:12pt;font-weight:bold;margin:0 0 6pt 0;">"数据驱动的服务营销中枢"</p>
    <p style="color:${G};font-size:9pt;margin:0;">精细化运营 + 智能化管理</p>
    <p style="color:${G};font-size:9pt;margin:2pt 0 0 0;">为用户提供专业金融服务体验</p>
  </div>
  <div style="display:flex;">
    ${statCard('2,900+', '前台人员', R)}
    ${statCard('100+', '中台人员', RLight)}
    ${statCard('50+', '后台人员', R)}
  </div>
</div>
`);

// ==================== SLIDE 4: 团队规模与服务渠道 ====================
const s4 = wrap(`
${sectionHeader('01', '团队规模与服务渠道')}
<div style="position:absolute;top:70pt;left:40pt;width:420pt;">
  ${card('服务渠道', RLight, [
    '<b>电销渠道（100%）</b> — 金融营销电销外呼业务，涵盖拉新、复购等全流程服务',
    '覆盖信贷、理财、保险等金融产品线',
    '年度亿级客户触达'
  ])}
  <div style="display:flex;gap:8pt;">
    ${card(null, R, ['<span style="color:'+W+';font-size:14pt;font-weight:bold;">2,900+</span><br><span style="color:'+G+';font-size:8pt;">前台人员</span><br><span style="color:'+G+';font-size:7.5pt;">本科60% | 大专40%</span>'], {leftBorder:false, bg:RSubtle2})}
    ${card(null, RLight, ['<span style="color:'+W+';font-size:14pt;font-weight:bold;">100+</span><br><span style="color:'+G+';font-size:8pt;">中台人员</span><br><span style="color:'+G+';font-size:7.5pt;">管理与运营支撑</span>'], {leftBorder:false, bg:RSubtle2})}
    ${card(null, R, ['<span style="color:'+W+';font-size:14pt;font-weight:bold;">50+</span><br><span style="color:'+G+';font-size:8pt;">后台人员</span><br><span style="color:'+G+';font-size:7.5pt;">技术与数据分析</span>'], {leftBorder:false, bg:RSubtle2})}
  </div>
</div>
<div style="position:absolute;top:70pt;right:40pt;width:210pt;">
  <div style="background:${RSubtle2};border:0.5pt solid ${RSubtle};border-radius:4pt;padding:12pt;">
    <p style="color:${R};font-size:11pt;font-weight:bold;margin:0 0 10pt 0;text-align:center;">核心指标</p>
    <div style="display:flex;flex-wrap:wrap;gap:4pt;">
      ${statCard('2000亿+', '年度GMV', R)}
      ${statCard('3000+', '团队规模', RLight)}
      ${statCard('35家', '供应商', R)}
      ${statCard('100%', '合规率', RLight)}
    </div>
  </div>
</div>
`);

// ==================== SLIDE 5: 呼叫中心组织架构 ====================
const s5 = wrap(`
${sectionHeader('02', '呼叫中心组织架构')}
<div style="position:absolute;top:70pt;left:40pt;width:640pt;">
  <div style="text-align:center;margin-bottom:16pt;">
    <div style="display:inline-block;background:${RSubtle};border:1pt solid ${R};border-radius:4pt;padding:8pt 24pt;">
      <p style="color:${R};font-size:13pt;font-weight:bold;margin:0;">数据科技业务部</p>
    </div>
  </div>
  <div style="display:flex;justify-content:center;margin-bottom:16pt;">
    <div style="flex:1;max-width:260pt;margin-right:16pt;">
      <div style="background:${RSubtle};border:1pt solid ${R}40;border-radius:4pt;padding:8pt;text-align:center;margin-bottom:10pt;">
        <p style="color:${R};font-size:11pt;font-weight:bold;margin:0;">策略运营组</p>
        <p style="color:${G};font-size:8pt;margin:2pt 0 0 0;">刘伟佳</p>
      </div>
    </div>
    <div style="flex:1;max-width:260pt;">
      <div style="background:${RSubtle};border:1pt solid ${R}40;border-radius:4pt;padding:8pt;text-align:center;margin-bottom:10pt;">
        <p style="color:${R};font-size:11pt;font-weight:bold;margin:0;">电销服务组</p>
        <p style="color:${G};font-size:8pt;margin:2pt 0 0 0;">王易人</p>
      </div>
      <div style="display:flex;gap:6px;margin-top:6pt;">
        ${['消金线','企金线','信用卡线','财富线'].map(l =>
          `<div style="flex:1;background:${RSubtle2};border-radius:3pt;padding:6pt;text-align:center;">
            <p style="color:${M};font-size:8pt;margin:0;">${l}</p>
          </div>`
        ).join('')}
      </div>
    </div>
  </div>
  <div style="display:flex;gap:12pt;">
    ${card('业务管理', RLight, ['日常BPO沟通协调'], {leftBorder:true})}
    ${card('质检培训运营', R, ['合规保障 + 供应商赋能'], {leftBorder:true})}
  </div>
  <div style="text-align:center;margin-top:12pt;">
    <p style="color:${G};font-size:9pt;margin:0;">30+家供应商 | 3000+人团队 | 覆盖全流程营销服务</p>
  </div>
</div>
`);

// ==================== SLIDE 6: 客服转型背景与战略目标 ====================
const s6 = wrap(`
${sectionHeader('03', '客服转型背景与战略目标')}
<div style="position:absolute;top:64pt;left:40pt;width:310pt;">
  ${card('转型背景', R, [
    '金融科技行业竞争加剧，获客成本持续上升',
    '传统电销模式效率见顶，依赖人工经验',
    '合规要求日趋严格，事后检查已不足够',
    'AI/大数据技术成熟带来转型窗口'
  ])}
  ${card('战略目标', RLight, [
    '构建数据驱动的智能电销营销体系',
    '实现人机协同的规模化高效运营',
    '建立行业领先的合规管控标准',
    '打造可复制的供应商管理模式'
  ])}
</div>
<div style="position:absolute;top:64pt;right:40pt;width:310pt;">
  <p style="color:${R};font-size:11pt;font-weight:bold;margin:0 0 10pt 0;">三大战略维度</p>
  ${card('客服价值化', R, ['从成本中心转为价值创造中心', '以GMV和客户价值衡量产出'], {leftBorder:true})}
  ${card('数字智能化', RLight, ['数据驱动精准服务与运营', 'AI辅助营销全流程 + 100%智能质检'], {leftBorder:true})}
  ${card('服务营销一体化', R, ['营销与服务深度耦合', '拉新-转化-复购闭环'], {leftBorder:true})}
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
for (const p of phases) {
  const items = p.items.map(i => `<p style="color:${M};font-size:7.5pt;margin:0 0 3pt 0;">${i}</p>`).join('');
  phaseHtml += `<div style="flex:1;background:${RSubtle2};border-top:3pt solid ${R};border-radius:0 0 4pt 4pt;padding:8pt;margin-right:6pt;">
    <p style="color:${R};font-size:8pt;margin:0;">${p.n}</p>
    <p style="color:${W};font-size:10pt;font-weight:bold;margin:2pt 0 6pt 0;">${p.t}</p>
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
  const color = i % 2 === 0 ? R : RLight;
  measuresHtml += `<div style="flex:1;background:${RSubtle2};border-left:2pt solid ${color};padding:6pt 8pt;margin-right:6px;">
    <p style="color:${color};font-size:8pt;font-weight:bold;margin:0 0 2pt 0;">${m.t}</p>
    <p style="color:${M};font-size:7.5pt;margin:0;">${m.d}</p>
  </div>`;
}

const s7 = wrap(`
${sectionHeader('04', '客服转型实施过程')}
<div style="position:absolute;top:66pt;left:40pt;width:640pt;">
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
for (const r of results) {
  resultsHtml += `<div style="flex:1;text-align:center;background:${RSubtle};border-radius:4pt;padding:10pt 4pt;margin-right:6pt;">
    <p style="color:${R};font-size:18pt;font-weight:bold;margin:0;">${r.val}</p>
    <p style="color:${G};font-size:7.5pt;margin:3pt 0 0 0;">${r.label}</p>
  </div>`;
}

const detailResults = [
  { t: '客服价值化', items: ['接通率提升 35%', '首拨转化率提升 28%', '人均效率提升 40%', '新人上手时间缩短 67%'] },
  { t: '数字智能化', items: ['100% 智能质检覆盖', '质检效率提升 300%', '合规风险降低 60%', '事后检查 → 事中预警'] },
  { t: '服务营销一体化', items: ['营销转化率提升 25%', '客户复购率提升 30%', '全生命周期运营闭环', '拉新-转化-复购持续增长'] },
];
let detailHtml = '';
for (const d of detailResults) {
  const items = d.items.map(i => `<p style="color:${M};font-size:7.5pt;margin:0 0 2pt 0;">${i}</p>`).join('');
  detailHtml += `<div style="flex:1;background:${RSubtle2};border-top:2pt solid ${R};border-radius:0 0 4pt 4pt;padding:8pt;margin-right:6px;">
    <p style="color:${R};font-size:9pt;font-weight:bold;margin:0 0 4pt 0;">${d.t}</p>
    ${items}
  </div>`;
}

const s8 = wrap(`
${sectionHeader('05', '客服转型具体成果')}
<div style="position:absolute;top:64pt;left:40pt;width:640pt;">
  <div style="display:flex;">${resultsHtml}</div>
  <div style="display:flex;margin-top:8px;">${detailHtml}</div>
  <div style="background:${RSubtle};border-left:3pt solid ${R};padding:8pt 12pt;border-radius:0 4pt 4pt 0;margin-top:8pt;">
    <p style="color:${M};font-size:8.5pt;margin:0;"><b style="color:${R};">核心成果：</b>构建"数据驱动+人机协同+AI合规"三位一体的智能电销营销体系，在效率、合规、增长三个维度实现行业领先水平。</p>
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
    <div style="width:24pt;height:24pt;border-radius:50%;background:${RSubtle};display:flex;align-items:center;justify-content:center;margin-right:10pt;flex-shrink:0;">
      <span style="color:${R};font-size:11pt;font-weight:bold;">${k.n}</span>
    </div>
    <div>
      <p style="color:${W};font-size:10pt;font-weight:bold;margin:0 0 2pt 0;">${k.t}</p>
      <p style="color:${G};font-size:8pt;margin:0;">${k.d}</p>
    </div>
  </div>`;
}

const s9 = wrap(`
${sectionHeader('06', '客服转型的成功关键')}
<div style="position:absolute;top:66pt;left:40pt;width:380pt;">
  ${keysHtml}
</div>
<div style="position:absolute;top:66pt;right:40pt;width:230pt;">
  <div style="background:${RSubtle2};border:0.5pt solid ${RSubtle};border-radius:4pt;padding:12pt;">
    <p style="color:${R};font-size:10pt;font-weight:bold;margin:0 0 8pt 0;">启发</p>
    <p style="color:${M};font-size:8pt;margin:0 0 4pt 0;">转型不必一步到位，分阶段推进</p>
    <p style="color:${M};font-size:8pt;margin:0 0 4pt 0;">合规是底线也是竞争力</p>
    <p style="color:${M};font-size:8pt;margin:0;">人机协同的关键是"辅助"而非"替代"</p>
  </div>
</div>
`);

// ==================== SLIDE 10: 组织变革与人才培养 ====================
const s10 = wrap(`
${sectionHeader('07', '组织变革与人才培养')}
<div style="position:absolute;top:66pt;left:40pt;width:310pt;">
  ${card('组织架构变革', R, [
    '从单一电销团队 → 分层运营体系',
    '新增数据分析、AI训练师、合规管理岗位',
    '供应商管理独立职能：准入-分工-考核-清退',
    '建立"业务管理+质检培训"双线支撑架构'
  ])}
  ${card('人才培养体系', RLight, [
    '新人培训：AI辅助缩短上手67%',
    '进阶培养：数据思维+AI工具',
    '供应商赋能：定期培训+考核+标杆分享',
    '考核：业绩+过程+客户评价+合规四维'
  ])}
</div>
<div style="position:absolute;top:66pt;right:40pt;width:310pt;">
  <p style="color:${R};font-size:10pt;font-weight:bold;margin:0 0 8pt 0;">关键人才角色</p>
  ${[
    ['数据分析师', '客户画像构建 | 需求模型优化', R],
    ['AI训练师', '话术模型训练 | 质检规则调优', RLight],
    ['合规管理师', '合规体系搭建 | 风险预警设计', R],
    ['供应商经理', '全量供应商管理 | 赋能与考核', RLight],
  ].map(([title, desc, color]) =>
    `<div style="background:${RSubtle2};border-radius:4pt;padding:8pt;margin-bottom:6pt;display:flex;align-items:center;">
      <div style="width:6pt;height:6pt;border-radius:50%;background:${color};margin-right:8pt;flex-shrink:0;"></div>
      <div>
        <p style="color:${W};font-size:9pt;font-weight:bold;margin:0;">${title}</p>
        <p style="color:${G};font-size:7.5pt;margin:1pt 0 0 0;">${desc}</p>
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
    <div style="width:18pt;height:18pt;border-radius:50%;background:${RSubtle};display:flex;align-items:center;justify-content:center;margin-right:8pt;flex-shrink:0;">
      <span style="color:${R};font-size:9pt;font-weight:bold;">${i+1}</span>
    </div>
    <p style="color:${M};font-size:8pt;margin:0;">${challenges[i]}</p>
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
  plansHtml += `<div style="flex:1;background:${RSubtle2};border-top:2pt solid ${R};border-radius:0 0 4pt 4pt;padding:8pt;margin-right:6px;">
    <p style="color:${R};font-size:9pt;font-weight:bold;margin:0 0 4pt 0;">${p.t}</p>
    <p style="color:${M};font-size:7.5pt;margin:0 0 2pt 0;">${p.items[0]}</p>
    <p style="color:${M};font-size:7.5pt;margin:0 0 2pt 0;">${p.items[1]}</p>
    <p style="color:${M};font-size:7.5pt;margin:0;">${p.items[2]}</p>
  </div>`;
}

const s11 = wrap(`
${sectionHeader('08', '下一步计划')}
<div style="position:absolute;top:66pt;left:40pt;width:200pt;">
  <p style="color:${R};font-size:10pt;font-weight:bold;margin:0 0 8pt 0;">当前面临的三大挑战</p>
  ${challengesHtml}
</div>
<div style="position:absolute;top:66pt;left:260pt;width:420pt;">
  <p style="color:${R};font-size:10pt;font-weight:bold;margin:0 0 8pt 0;">下一步规划</p>
  <div style="display:flex;">${plansHtml}</div>
</div>
`);

// ==================== SLIDE 12: THANKS ====================
const s12 = wrap(`
${circleTopRight}
${circleBottomLeft}
<div style="position:absolute;top:110pt;left:0;width:720pt;text-align:center;">
  <div style="width:80pt;height:2pt;background:${R};margin:0 auto 16pt;"></div>
  <h1 style="color:${R};font-size:36pt;margin:0 0 8pt 0;letter-spacing:4pt;">THANKS</h1>
  <div style="width:80pt;height:2pt;background:${R};margin:0 auto 24pt;"></div>
  <p style="color:${G};font-size:12pt;margin:0 0 4pt 0;">京东科技股份有限公司</p>
  <p style="color:${G};font-size:10pt;margin:0;">金融科技事业群 · 数据科技业务部</p>
</div>
`);

// Write all slides
const slides = [s1, s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12];
slides.forEach((html, i) => {
  fs.writeFileSync(path.join(dir, `slide${i+1}.html`), html);
});

console.log(`Created ${slides.length} HTML slides with JD Red theme.`);
