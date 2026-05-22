const fs = require('fs');
const path = require('path');
const dir = path.join(__dirname, 'slides');
if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

const R = '#6B8F8C', RSub = '#EDF3ED', RSub2 = '#E8F0E8';
const BG = '#F8F8F6', Dk = '#2C3E3C', Md = '#5A6B68', Lt = '#8A9B98', Bd = '#D4D8D4', W = '#FFFFFF';
const Logo = '/tmp/pptx-build/assets/jd-logo.png';

const head = `<style>html{background:${BG}}body{width:720pt;height:405pt;margin:0;padding:0;font-family:"Microsoft YaHei",Arial,sans-serif;background:${BG};overflow:hidden}</style>`;
const wrap = c => `<!DOCTYPE html><html><head>${head}</head><body>${c}</body></html>`;

// Section header
const sh = (n, t) =>
  `<div style="position:absolute;top:24pt;left:50pt;width:620pt">` +
  `<p style="color:${Lt};font-size:10pt;margin:0 0 2pt 0">${n}</p>` +
  `<p style="color:${Dk};font-size:16pt;font-weight:bold;margin:0 0 4pt 0">${t}</p>` +
  `<div style="width:36pt;height:2pt;background:${R}"></div></div>`;

// Card with left red border - absolute positioned
const card = (x, y, w, title, items) => {
  let h = 14; if (title) h += 16; h += items.length * 14 + 8;
  let s = `<div style="position:absolute;left:${x}pt;top:${y}pt;width:${w}pt;height:${h}pt;background:${W};border:1px solid ${Bd};border-radius:2pt;border-left:3pt solid ${R};padding:10pt 12pt">`;
  if (title) s += `<p style="color:${R};font-size:10pt;font-weight:bold;margin:0 0 6pt 0">${title}</p>`;
  items.forEach(i => { s += `<p style="color:${Md};font-size:8.5pt;margin:0 0 3pt 0">${i}</p>`; });
  return s + `</div>`;
};

// Stat box - absolute
const stat = (x, y, w, val, label) =>
  `<div style="position:absolute;left:${x}pt;top:${y}pt;width:${w}pt;text-align:center">` +
  `<p style="color:${R};font-size:20pt;font-weight:bold;margin:0">${val}</p>` +
  `<p style="color:${Lt};font-size:8pt;margin:3pt 0 0 0">${label}</p></div>`;

// Footer
const foot = t =>
  `<div style="position:absolute;bottom:20pt;left:50pt;width:620pt">` +
  `<div style="width:620pt;height:1px;background:${Bd};margin-bottom:6pt"></div>` +
  `<p style="color:${Lt};font-size:7pt;margin:0">${t}</p></div>`;

// ===== SLIDE 1: COVER =====
const s1 = wrap(
  `<div style="position:absolute;top:0;left:0;width:720pt;height:3pt;background:${R}"></div>` +
  `<div style="position:absolute;top:30pt;left:50pt"><img src="${Logo}" style="width:120pt;height:40pt"></div>` +
  `<div style="position:absolute;top:110pt;left:50pt;width:620pt">` +
  `<p style="color:${R};font-size:11pt;margin:0 0 10pt 0;letter-spacing:3pt">2026 中国新客服节</p>` +
  `<p style="color:${Dk};font-size:28pt;font-weight:bold;margin:0 0 8pt 0">服务营销最佳实践奖</p>` +
  `<p style="color:${Md};font-size:14pt;margin:0 0 30pt 0">申报材料</p>` +
  `<div style="width:36pt;height:2pt;background:${R};margin-bottom:20pt"></div>` +
  `<p style="color:${Md};font-size:11pt;margin:0 0 3pt 0">京东科技股份有限公司</p>` +
  `<p style="color:${Lt};font-size:10pt;margin:0">金融科技事业群 · 数据科技业务部</p></div>` +
  `<div style="position:absolute;bottom:0;left:0;width:720pt;height:3pt;background:${R}"></div>`
);

// ===== SLIDE 2: TOC =====
let toc = '';
const tocN = ['呼叫中心现况简介','呼叫中心组织架构','客服转型背景与战略目标','客服转型实施过程','客服转型具体成果','客服转型的成功关键','组织变革与人才培养','下一步计划'];
for (let i = 0; i < 8; i++) {
  const x = i < 4 ? 50 : 380;
  const y = 80 + (i % 4) * 78;
  toc += `<div style="position:absolute;left:${x}pt;top:${y}pt;width:300pt">` +
    `<p style="color:${R};font-size:11pt;font-weight:bold;margin:0 0 2pt 0">${String(i+1).padStart(2,'0')}</p>` +
    `<p style="color:${Dk};font-size:13pt;margin:0">${tocN[i]}</p></div>`;
}
const s2 = wrap(
  `<div style="position:absolute;top:0;left:0;width:720pt;height:3pt;background:${R}"></div>` +
  `<div style="position:absolute;top:24pt;left:50pt"><img src="${Logo}" style="width:72pt;height:24pt"></div>` +
  `<div style="position:absolute;top:52pt;left:50pt"><p style="color:${Dk};font-size:18pt;font-weight:bold;margin:0">目录</p></div>` +
  `<div style="position:absolute;top:72pt;left:50pt;width:36pt;height:2pt;background:${R}"></div>` + toc
);

// ===== SLIDE 3: 呼叫中心现况简介 =====
const s3 = wrap(
  sh('01','呼叫中心现况简介') +
  card(50, 60, 300, '使命与愿景', ['<b>使命：</b>技术为本，让生活更美好','<b>愿景：</b>成为全球最值得信赖的企业','<b>价值观：</b>客户为先、创新、拼搏、担当、感恩、诚信']) +
  card(50, 168, 300, '企业基本信息', ['京东科技股份有限公司 | 金融科技 / 科技服务','信息技术咨询、云计算、AI应用、数据处理','客服中心：数据科技业务部 | 2018年运营','客服电话：4000988505']) +
  // Right side - dept positioning
  `<div style="position:absolute;left:370pt;top:60pt;width:300pt;background:${W};border:1px solid ${Bd};border-radius:2pt;border-left:3pt solid ${R};padding:14pt 12pt">` +
  `<p style="color:${R};font-size:10pt;font-weight:bold;margin:0 0 8pt 0">部门定位</p>` +
  `<p style="color:${Dk};font-size:13pt;font-weight:bold;margin:0 0 6pt 0">"数据驱动的服务营销中枢"</p>` +
  `<p style="color:${Md};font-size:9pt;margin:0">精细化运营 + 智能化管理</p>` +
  `<p style="color:${Md};font-size:9pt;margin:2pt 0 0 0">为用户提供专业金融服务体验</p></div>` +
  // Stats row - each absolute
  stat(370, 200, 100, '2,900+', '前台人员') +
  stat(470, 200, 100, '100+', '中台人员') +
  stat(570, 200, 100, '50+', '后台人员') +
  foot('本科及以上 60% | 大专 40% | 团队稳定性 100%')
);

// ===== SLIDE 4: 团队规模与服务渠道 =====
const s4 = wrap(
  sh('01','团队规模与服务渠道') +
  card(50, 60, 420, '服务渠道', ['<b>电销渠道（100%）</b> — 金融营销电销外呼业务，涵盖拉新、复购等全流程','覆盖信贷、理财、保险等金融产品线','年度亿级客户触达']) +
  // Three team cards - absolute positioned
  `<div style="position:absolute;left:50pt;top:170pt;width:130pt;background:${W};border:1px solid ${Bd};border-radius:2pt;padding:10pt;text-align:center">` +
  `<p style="color:${R};font-size:16pt;font-weight:bold;margin:0">2,900+</p><p style="color:${Dk};font-size:8pt;margin:2pt 0 0 0">前台人员</p></div>` +
  `<div style="position:absolute;left:196pt;top:170pt;width:130pt;background:${W};border:1px solid ${Bd};border-radius:2pt;padding:10pt;text-align:center">` +
  `<p style="color:${R};font-size:16pt;font-weight:bold;margin:0">100+</p><p style="color:${Dk};font-size:8pt;margin:2pt 0 0 0">中台人员</p></div>` +
  `<div style="position:absolute;left:342pt;top:170pt;width:130pt;background:${W};border:1px solid ${Bd};border-radius:2pt;padding:10pt;text-align:center">` +
  `<p style="color:${R};font-size:16pt;font-weight:bold;margin:0">50+</p><p style="color:${Dk};font-size:8pt;margin:2pt 0 0 0">后台人员</p></div>` +
  // Right panel - core metrics
  `<div style="position:absolute;left:500pt;top:60pt;width:200pt;background:${W};border:1px solid ${Bd};border-radius:2pt;border-top:3pt solid ${R};padding:12pt">` +
  `<p style="color:${Dk};font-size:10pt;font-weight:bold;margin:0 0 8pt 0;text-align:center">核心指标</p>` +
  stat(0, 0, 200, '2000亿+', '年度GMV（放款额）') +
  stat(0, 44, 100, '3000+', '团队规模') +
  stat(100, 44, 100, '35家', '供应商') +
  stat(0, 88, 100, '100%', '合规率') +
  stat(100, 88, 100, '99%', '营销占比') +
  `</div>` +
  foot('本科60% | 大专40% | 1年+占比80%')
);

// ===== SLIDE 5: 呼叫中心组织架构 =====
const s5 = wrap(
  sh('02','呼叫中心组织架构') +
  // Top level
  `<div style="position:absolute;left:210pt;top:66pt;width:300pt;background:${R};border-radius:2pt;padding:8pt;text-align:center">` +
  `<p style="color:${W};font-size:12pt;font-weight:bold;margin:0">数据科技业务部</p></div>` +
  // Two groups
  `<div style="position:absolute;left:50pt;top:106pt;width:300pt;background:${W};border:1px solid ${Bd};border-radius:2pt;padding:10pt;text-align:center">` +
  `<p style="color:${R};font-size:11pt;font-weight:bold;margin:0">策略运营组</p><p style="color:${Lt};font-size:8.5pt;margin:2pt 0 0 0">刘伟佳</p></div>` +
  `<div style="position:absolute;left:370pt;top:106pt;width:300pt;background:${W};border:1px solid ${Bd};border-radius:2pt;padding:10pt;text-align:center">` +
  `<p style="color:${R};font-size:11pt;font-weight:bold;margin:0">电销服务组</p><p style="color:${Lt};font-size:8.5pt;margin:2pt 0 0 0">王易人</p></div>` +
  // 4 product lines
  `<div style="position:absolute;left:50pt;top:160pt;width:148pt;background:${RSub2};border-radius:2pt;padding:8pt;text-align:center"><p style="color:${Dk};font-size:9pt;margin:0">消金线</p></div>` +
  `<div style="position:absolute;left:214pt;top:160pt;width:148pt;background:${RSub2};border-radius:2pt;padding:8pt;text-align:center"><p style="color:${Dk};font-size:9pt;margin:0">企金线</p></div>` +
  `<div style="position:absolute;left:378pt;top:160pt;width:148pt;background:${RSub2};border-radius:2pt;padding:8pt;text-align:center"><p style="color:${Dk};font-size:9pt;margin:0">信用卡线</p></div>` +
  `<div style="position:absolute;left:542pt;top:160pt;width:148pt;background:${RSub2};border-radius:2pt;padding:8pt;text-align:center"><p style="color:${Dk};font-size:9pt;margin:0">财富线</p></div>` +
  card(50, 206, 300, '业务管理', ['日常BPO沟通协调']) +
  card(370, 206, 300, '质检培训运营', ['合规保障 + 供应商赋能']) +
  foot('30+家供应商 | 3000+人团队 | 覆盖全流程营销服务')
);

// ===== SLIDE 6: 客服转型背景与战略目标 =====
const s6 = wrap(
  sh('03','客服转型背景与战略目标') +
  card(50, 60, 300, '转型背景', ['金融科技行业竞争加剧，获客成本持续上升','传统电销模式效率见顶，依赖人工经验','合规要求日趋严格，事后检查已不足够','AI/大数据技术成熟带来转型窗口']) +
  card(50, 184, 300, '战略目标', ['构建数据驱动的智能电销营销体系','实现人机协同的规模化高效运营','建立行业领先的合规管控标准','打造可复制的供应商管理模式']) +
  card(370, 60, 300, '客服价值化', ['从成本中心转为价值创造中心','以GMV和客户价值衡量产出']) +
  card(370, 146, 300, '数字智能化', ['数据驱动精准服务与运营','AI辅助营销全流程 + 100%智能质检']) +
  card(370, 232, 300, '服务营销一体化', ['营销与服务深度耦合','拉新-转化-复购闭环'])
);

// ===== SLIDE 7: 客服转型实施过程 =====
// 4 phase cards: each absolute positioned
let ph = '';
const phases = [
  {n:'阶段一',t:'数据基础',i:['整合客户数据源','构建统一客户画像','建立分层运营体系']},
  {n:'阶段二',t:'AI能力建设',i:['开发需求识别模型','部署智能路由系统','上线实时话术辅助']},
  {n:'阶段三',t:'合规升级',i:['100%通话智能质检','实时合规监控系统','风险预警机制建设']},
  {n:'阶段四',t:'规模化运营',i:['供应商管理模式复制','全生命周期运营闭环','数据驱动持续优化']}
];
for (let i = 0; i < 4; i++) {
  const x = 50 + i * 160;
  const p = phases[i];
  let items = p.i.map(x=>`<p style="color:${Md};font-size:7.5pt;margin:0 0 3pt 0">${x}</p>`).join('');
  ph += `<div style="position:absolute;left:${x}pt;top:60pt;width:148pt;background:${W};border:1px solid ${Bd};border-radius:2pt;border-top:3pt solid ${R};padding:8pt">` +
    `<p style="color:${R};font-size:8pt;margin:0">${p.n}</p>` +
    `<p style="color:${Dk};font-size:10pt;font-weight:bold;margin:2pt 0 6pt 0">${p.t}</p>${items}</div>`;
}
// 4 measures
let ms = '';
const measures = [
  {t:'数据赋能客户识别',d:'AI需求识别模型 + 精准分层运营'},
  {t:'人机协同智能外呼',d:'智能路由匹配 + AI实时话术辅助'},
  {t:'AI赋能合规提效',d:'实时敏感词识别 + 100%智能质检'},
  {t:'AI赋能精准营销',d:'语义分析需求挖掘 + 数据闭环优化'}
];
for (let i = 0; i < 4; i++) {
  const x = 50 + i * 160;
  ms += `<div style="position:absolute;left:${x}pt;top:214pt;width:148pt;background:${W};border:1px solid ${Bd};border-radius:2pt;border-left:2pt solid ${R};padding:6pt 8pt">` +
    `<p style="color:${R};font-size:8pt;font-weight:bold;margin:0 0 2pt 0">${measures[i].t}</p>` +
    `<p style="color:${Md};font-size:7.5pt;margin:0">${measures[i].d}</p></div>`;
}
const s7 = wrap(
  sh('04','客服转型实施过程') + ph +
  `<div style="position:absolute;left:50pt;top:196pt"><p style="color:${Dk};font-size:10pt;font-weight:bold;margin:0">四大关键举措</p></div>` + ms
);

// ===== SLIDE 8: 客服转型具体成果 =====
let rh = '';
const rData = [{v:'2000亿+',l:'年度GMV | 放款额'},{v:'3,000+',l:'团队规模'},{v:'35家',l:'供应商 | 全量管理'},{v:'100%',l:'合规率 | 红线指标'}];
for (let i = 0; i < 4; i++) {
  const x = 50 + i * 160;
  rh += `<div style="position:absolute;left:${x}pt;top:60pt;width:148pt;text-align:center;background:${W};border:1px solid ${Bd};border-radius:2pt;padding:10pt 4pt">` +
    `<p style="color:${R};font-size:18pt;font-weight:bold;margin:0">${rData[i].v}</p>` +
    `<p style="color:${Lt};font-size:7.5pt;margin:3pt 0 0 0">${rData[i].l}</p></div>`;
}
let dh = '';
const dData = [
  {t:'客服价值化',i:['接通率提升 35%','首拨转化率提升 28%','人均效率提升 40%','新人上手时间缩短 67%']},
  {t:'数字智能化',i:['100% 智能质检覆盖','质检效率提升 300%','合规风险降低 60%','事后检查 → 事中预警']},
  {t:'服务营销一体化',i:['营销转化率提升 25%','客户复购率提升 30%','全生命周期运营闭环','拉新-转化-复购持续增长']}
];
for (let i = 0; i < 3; i++) {
  const x = 50 + i * 213;
  const d = dData[i];
  let items = d.i.map(x=>`<p style="color:${Md};font-size:7.5pt;margin:0 0 2pt 0">${x}</p>`).join('');
  dh += `<div style="position:absolute;left:${x}pt;top:130pt;width:200pt;background:${W};border:1px solid ${Bd};border-radius:2pt;border-top:2pt solid ${R};padding:8pt">` +
    `<p style="color:${R};font-size:9pt;font-weight:bold;margin:0 0 4pt 0">${d.t}</p>${items}</div>`;
}
const s8 = wrap(
  sh('05','客服转型具体成果') + rh + dh +
  `<div style="position:absolute;left:50pt;top:316pt;width:620pt;background:${RSub};border-left:3pt solid ${R};padding:8pt 12pt;border-radius:0 2pt 2pt 0">` +
  `<p style="color:${Md};font-size:8.5pt;margin:0"><b style="color:${R}">核心成果：</b>构建"数据驱动+人机协同+AI合规"三位一体的智能电销营销体系，在效率、合规、增长三个维度实现行业领先水平。</p></div>` +
  foot('数据来源：京东科技数据科技业务部内部运营数据，统计周期：2025年5月-2026年4月')
);

// ===== SLIDE 9: 客服转型的成功关键 =====
let kh = '';
const keys = [
  {n:'1',t:'数据驱动决策',d:'AI需求识别模型替代人工筛选，精准分层运营替代粗放触达'},
  {n:'2',t:'人机协同而非替代',d:'AI是坐席的"超级助手"，智能路由匹配最优坐席'},
  {n:'3',t:'合规先行',d:'合规率100%作为红线指标，一票否决'},
  {n:'4',t:'供应商生态管理',d:'35家供应商、3000+人的统一管理体系'},
  {n:'5',t:'全生命周期运营',d:'从获客到复购的完整闭环'}
];
for (let i = 0; i < 5; i++) {
  const y = 60 + i * 52;
  const k = keys[i];
  kh += `<div style="position:absolute;left:50pt;top:${y}pt;width:380pt">` +
    `<div style="position:absolute;left:0pt;top:0pt;width:20pt;height:20pt;border-radius:50%;background:${R};text-align:center">` +
    `<span style="color:${W};font-size:9pt;font-weight:bold;line-height:20pt">${k.n}</span></div>` +
    `<div style="position:absolute;left:30pt;top:0pt;width:350pt">` +
    `<p style="color:${Dk};font-size:10pt;font-weight:bold;margin:0 0 2pt 0">${k.t}</p>` +
    `<p style="color:${Md};font-size:8pt;margin:0">${k.d}</p></div></div>`;
}
const s9 = wrap(
  sh('06','客服转型的成功关键') + kh +
  `<div style="position:absolute;left:470pt;top:60pt;width:230pt;background:${W};border:1px solid ${Bd};border-radius:2pt;border-top:3pt solid ${R};padding:12pt">` +
  `<p style="color:${Dk};font-size:10pt;font-weight:bold;margin:0 0 8pt 0">启发</p>` +
  `<p style="color:${Md};font-size:8.5pt;margin:0 0 6pt 0">转型不必一步到位，分阶段推进</p>` +
  `<p style="color:${Md};font-size:8.5pt;margin:0 0 6pt 0">合规是底线也是竞争力</p>` +
  `<p style="color:${Md};font-size:8.5pt;margin:0">人机协同的关键是"辅助"而非"替代"</p></div>`
);

// ===== SLIDE 10: 组织变革与人才培养 =====
const s10 = wrap(
  sh('07','组织变革与人才培养') +
  card(50, 60, 300, '组织架构变革', ['从单一电销团队 → 分层运营体系','新增数据分析、AI训练师、合规管理岗位','供应商管理独立职能：准入-分工-考核-清退','建立"业务管理+质检培训"双线支撑架构']) +
  card(50, 186, 300, '人才培养体系', ['新人培训：AI辅助缩短上手67%','进阶培养：数据思维+AI工具','供应商赋能：定期培训+考核+标杆分享','考核：业绩+过程+客户评价+合规四维']) +
  card(370, 60, 300, '数据分析师', ['客户画像构建 | 需求模型优化']) +
  card(370, 134, 300, 'AI训练师', ['话术模型训练 | 质检规则调优']) +
  card(370, 208, 300, '合规管理师', ['合规体系搭建 | 风险预警设计']) +
  card(370, 282, 300, '供应商经理', ['全量供应商管理 | 赋能与考核'])
);

// ===== SLIDE 11: 下一步计划 =====
let ch = '';
const chT = ['获客成本上升：需通过更精准的客户识别提升ROI','合规要求趋严：需持续强化合规能力','技术迭代压力：需建立持续学习和应用机制'];
for (let i = 0; i < 3; i++) {
  const y = 92 + i * 36;
  ch += `<div style="position:absolute;left:50pt;top:${y}pt;width:200pt">` +
    `<div style="position:absolute;left:0pt;top:0pt;width:16pt;height:16pt;border-radius:50%;background:${R};text-align:center">` +
    `<span style="color:${W};font-size:8pt;font-weight:bold;line-height:16pt">${i+1}</span></div>` +
    `<p style="position:absolute;left:22pt;top:0pt;width:178pt;color:${Md};font-size:8pt;margin:0">${chT[i]}</p></div>`;
}
const s11 = wrap(
  sh('08','下一步计划') +
  `<div style="position:absolute;left:50pt;top:60pt;width:200pt"><p style="color:${Dk};font-size:10pt;font-weight:bold;margin:0">当前面临的三大挑战</p></div>` + ch +
  `<div style="position:absolute;left:280pt;top:60pt"><p style="color:${Dk};font-size:10pt;font-weight:bold;margin:0">下一步规划</p></div>` +
  // 4 plan cards absolute
  `<div style="position:absolute;left:280pt;top:86pt;width:118pt;background:${W};border:1px solid ${Bd};border-radius:2pt;border-top:2pt solid ${R};padding:8pt">` +
  `<p style="color:${R};font-size:9pt;font-weight:bold;margin:0 0 4pt 0">深化AI应用</p>` +
  `<p style="color:${Md};font-size:7.5pt;margin:0 0 2pt 0">升级需求识别模型精准度</p>` +
  `<p style="color:${Md};font-size:7.5pt;margin:0 0 2pt 0">拓展AI辅助场景覆盖</p>` +
  `<p style="color:${Md};font-size:7.5pt;margin:0">探索大模型在营销中应用</p></div>` +
  `<div style="position:absolute;left:410pt;top:86pt;width:118pt;background:${W};border:1px solid ${Bd};border-radius:2pt;border-top:2pt solid ${R};padding:8pt">` +
  `<p style="color:${R};font-size:9pt;font-weight:bold;margin:0 0 4pt 0">强化合规能力</p>` +
  `<p style="color:${Md};font-size:7.5pt;margin:0 0 2pt 0">建设前瞻性合规体系</p>` +
  `<p style="color:${Md};font-size:7.5pt;margin:0 0 2pt 0">完善风险预警机制</p>` +
  `<p style="color:${Md};font-size:7.5pt;margin:0">合规能力对外输出</p></div>` +
  `<div style="position:absolute;left:540pt;top:86pt;width:118pt;background:${W};border:1px solid ${Bd};border-radius:2pt;border-top:2pt solid ${R};padding:8pt">` +
  `<p style="color:${R};font-size:9pt;font-weight:bold;margin:0 0 4pt 0">优化生态管理</p>` +
  `<p style="color:${Md};font-size:7.5pt;margin:0 0 2pt 0">供应商分级精细化管理</p>` +
  `<p style="color:${Md};font-size:7.5pt;margin:0 0 2pt 0">建立供应商赋能标准</p>` +
  `<p style="color:${Md};font-size:7.5pt;margin:0">打造可复制管理模式</p></div>`
);

// ===== SLIDE 12: THANKS =====
const s12 = wrap(
  `<div style="position:absolute;top:0;left:0;width:720pt;height:3pt;background:${R}"></div>` +
  `<div style="position:absolute;top:40pt;left:50pt"><img src="${Logo}" style="width:120pt;height:40pt"></div>` +
  `<div style="position:absolute;top:130pt;left:0;width:720pt;text-align:center">` +
  `<p style="color:${Dk};font-size:28pt;font-weight:bold;margin:0 0 6pt 0">THANKS</p>` +
  `<div style="width:36pt;height:2pt;background:${R};margin:0 auto 16pt"></div>` +
  `<p style="color:${Md};font-size:11pt;margin:0 0 3pt 0">京东科技股份有限公司</p>` +
  `<p style="color:${Lt};font-size:10pt;margin:0">金融科技事业群 · 数据科技业务部</p></div>` +
  `<div style="position:absolute;bottom:0;left:0;width:720pt;height:3pt;background:${R}"></div>`
);

const slides = [s1,s2,s3,s4,s5,s6,s7,s8,s9,s10,s11,s12];
slides.forEach((h,i) => fs.writeFileSync(path.join(dir, `slide${i+1}.html`), h));
console.log(`Created ${slides.length} slides. Zero flex, all absolute.`);
