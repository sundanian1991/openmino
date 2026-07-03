// 1990年代国企下岗 PPT — PptxGenJS 生成脚本
// 风格：CyberPPT Palette 01 经典深红咨询风
// 第三阶段：逐页原生重建，主要文字全部可编辑

const PptxGenJS = require('pptxgenjs');
const fs = require('fs');
const path = require('path');

const C = {
  bg: 'F3F4EF', title: '111111', body: '222222', secondary: '555555',
  line: 'D6D6D2', accent: '8B1E1E', accentSoft: 'F1E4E4', panel: 'EFEEE8', white: 'FFFFFF'
};
const FZ = 'Microsoft YaHei';
const FONT = { z: FZ }; // all zh
const W = 13.333, H = 7.5;
const ML = 0.7, MR = 0.7, MT = 0.55, MB = 0.5;

// ---- shared helpers ----
function baseSlide(pptx) {
  const s = pptx.addSlide();
  s.background = { color: C.bg };
  return s;
}
function badge(s, num, label) {
  // 左上角页码徽章 T1
  s.addText(String(num).padStart(2, '0'), { x: 0.7, y: 0.42, w: 0.4, h: 0.3, fontFace: FZ, fontSize: 11, bold: true, color: C.accent, align: 'left', valign: 'middle' });
  if (label) s.addText(label, { x: 1.05, y: 0.42, w: 2.5, h: 0.3, fontFace: FZ, fontSize: 11, color: C.secondary, align: 'left', valign: 'middle' });
  // 顶部分隔线
  s.addShape('line', { x: 0.7, y: 0.78, w: W - ML - MR, h: 0, line: { color: C.line, width: 0.75 } });
}
function pageFooter(s, source) {
  // 底部分隔线
  s.addShape('line', { x: 0.7, y: 6.92, w: W - ML - MR, h: 0, line: { color: C.line, width: 0.5 } });
  s.addText(source || '来源：八五期间宏观数据；国发[1994]59号；1997试点城市数据；绵阳/西安/张家口样本', { x: 0.7, y: 6.97, w: 9.5, h: 0.28, fontFace: FZ, fontSize: 7.5, color: C.secondary, align: 'left', valign: 'middle' });
  s.addText('1990年代国企下岗 · 经济史数据复盘', { x: W - MR - 3.5, y: 6.97, w: 3.5, h: 0.28, fontFace: FZ, fontSize: 7.5, color: C.secondary, align: 'right', valign: 'middle' });
}
function soWhat(s, text, yTop) {
  const y = yTop || 6.32;
  // SO WHAT 横条：深红左边线 + 浅底
  s.addShape('rect', { x: 0.7, y: y, w: W - ML - MR, h: 0.5, fill: { color: C.accentSoft }, line: { type: 'none' } });
  s.addShape('rect', { x: 0.7, y: y, w: 0.06, h: 0.5, fill: { color: C.accent }, line: { type: 'none' } });
  s.addText('SO WHAT', { x: 0.92, y: y + 0.02, w: 1.0, h: 0.46, fontFace: FZ, fontSize: 9.5, bold: true, color: C.accent, align: 'left', valign: 'middle' });
  s.addText(text, { x: 1.95, y: y + 0.02, w: W - ML - MR - 1.35, h: 0.46, fontFace: FZ, fontSize: 10.5, color: C.title, align: 'left', valign: 'middle' });
}
function titleBlock(s, title, subtitle) {
  s.addText(title, { x: 0.7, y: 0.92, w: W - ML - MR, h: 0.7, fontFace: FZ, fontSize: 23, bold: true, color: C.title, align: 'left', valign: 'middle' });
  if (subtitle) s.addText(subtitle, { x: 0.7, y: 1.6, w: W - ML - MR, h: 0.32, fontFace: FZ, fontSize: 12.5, color: C.secondary, align: 'left', valign: 'middle' });
}

// ============ 各页构建 ============

function buildSlide1(pptx) { // 封面
  const s = baseSlide(pptx);
  s.addText('01', { x: 0.7, y: 0.5, w: 0.5, h: 0.35, fontFace: FZ, fontSize: 11, bold: true, color: C.accent, align: 'left', valign: 'middle' });
  // 纵向三分布局，标题块在 38%-62%
  s.addText('1990 年代国企下岗', { x: 1.0, y: 2.75, w: 11.3, h: 1.1, fontFace: FZ, fontSize: 40, bold: true, color: C.title, align: 'left', valign: 'middle' });
  s.addShape('line', { x: 1.0, y: 3.95, w: 4.2, h: 0, line: { color: C.accent, width: 2.5 } });
  s.addText('高增长下的就业转型——八五繁荣、1993-94 危机与『优化资本结构』的系统性分流', { x: 1.0, y: 4.1, w: 11.3, h: 0.55, fontFace: FZ, fontSize: 15, color: C.secondary, align: 'left', valign: 'middle' });
  s.addText('1991 — 1997  ·  经济史数据复盘', { x: 1.0, y: 6.4, w: 11.3, h: 0.35, fontFace: FZ, fontSize: 11, color: C.secondary, align: 'left', valign: 'middle' });
  s.addText('数据复盘 · 内部研究', { x: W - MR - 4, y: 6.97, w: 4, h: 0.28, fontFace: FZ, fontSize: 7.5, color: C.secondary, align: 'right', valign: 'middle' });
}

function buildSlide2(pptx) { // Situation KPI
  const s = baseSlide(pptx);
  badge(s, 2, '情境 · Situation');
  titleBlock(s, '八五期间 GDP 年均增长 11.9%，固投增长 36.1%，创前八个五年计划最高', '1991—1995  ·  投资驱动的高速增长期');
  // 三个KPI块 1.98起 占9.95 切三份每份3.32
  const kpiY = 2.35, kpiH = 2.5, colW = 3.18;
  const cols = [
    { x: 0.7, val: '11.9%', lab: 'GDP 年均增长率', note: '前八个五年计划最高' },
    { x: 0.7 + colW, val: '36.1%', lab: '固定资产投资增长率', note: '名义值' },
    { x: 0.7 + colW * 2, val: '20.6%', lab: '固投增长（扣物价后）', note: '实际仍极度扩张' }
  ];
  cols.forEach((c, i) => {
    if (i > 0) s.addShape('line', { x: c.x - 0.07, y: kpiY + 0.2, w: 0, h: kpiH - 0.4, line: { color: C.line, width: 0.75 } });
    s.addText(c.val, { x: c.x, y: kpiY + 0.15, w: colW - 0.2, h: 1.35, fontFace: FZ, fontSize: 46, bold: true, color: C.accent, align: 'left', valign: 'middle' });
    s.addText(c.lab, { x: c.x, y: kpiY + 1.5, w: colW - 0.2, h: 0.4, fontFace: FZ, fontSize: 13, bold: true, color: C.title, align: 'left', valign: 'top' });
    s.addText(c.note, { x: c.x, y: kpiY + 1.9, w: colW - 0.2, h: 0.35, fontFace: FZ, fontSize: 10.5, color: C.secondary, align: 'left', valign: 'top' });
  });
  // 侧栏语境条放在KPI下方右侧或整行下 —— 此处放整宽语境条
  const ctxY = 5.15;
  s.addShape('rect', { x: 0.7, y: ctxY, w: W - ML - MR, h: 0.85, fill: { color: C.panel }, line: { color: C.line, width: 0.5 } });
  s.addShape('rect', { x: 0.7, y: ctxY, w: 0.06, h: 0.85, fill: { color: C.accent }, line: { type: 'none' } });
  s.addText('历史峰值', { x: 0.92, y: ctxY + 0.08, w: 1.6, h: 0.3, fontFace: FZ, fontSize: 9.5, bold: true, color: C.accent, align: 'left', valign: 'middle' });
  s.addText('八五是前八个五年计划中增长最高的时期；固投名义增长 36.1%、扣物价后仍达 20.6%，显示投资驱动型扩张的实际强度达到历史峰值。', { x: 0.92, y: ctxY + 0.36, w: 11.5, h: 0.42, fontFace: FZ, fontSize: 10.5, color: C.body, align: 'left', valign: 'middle' });
  soWhat(s, '这是繁荣的顶点，也是问题的起点——增长由资本而非就业驱动。');
  pageFooter(s);
}

function buildSlide3(pptx) { // Complication 剪刀差
  const s = baseSlide(pptx);
  badge(s, 3, '复杂性 · Complication');
  titleBlock(s, '繁荣未转化为就业——就业增长仅 1.3%，国企就业几乎零增长', '高增长-低就业悖论');
  // 主区 60%: 双水平对比条
  const barX = 0.7, barAreaW = 7.0, barY0 = 2.5;
  const maxVal = 12;
  function bar(y, val, label, color, valColor) {
    const w = (val / maxVal) * barAreaW;
    s.addShape('rect', { x: barX, y, w, h: 0.62, fill: { color }, line: { type: 'none' } });
    s.addText(label, { x: barX, y: y - 0.35, w: 5, h: 0.3, fontFace: FZ, fontSize: 12, bold: true, color: C.title, align: 'left', valign: 'middle' });
    s.addText(val + '%', { x: barX + w + 0.15, y, w: 1.4, h: 0.62, fontFace: FZ, fontSize: 18, bold: true, color: valColor, align: 'left', valign: 'middle' });
  }
  bar(barY0, 11.9, 'GDP 年均增长', C.accent, C.accent);
  bar(barY0 + 1.25, 1.3, '就业增长', C.secondary, C.secondary);
  // 剪刀差引导线
  s.addShape('line', { x: barX + 0.02, y: barY0 + 0.62, w: 0, h: 1.25 - 0.62, line: { color: C.line, width: 0.5, dashType: 'dash' } });
  s.addText('GDP 增速约为就业增速的 9 倍', { x: barX + (11.9 / maxVal) * barAreaW * 0.4, y: barY0 + 0.7, w: 4, h: 0.4, fontFace: FZ, fontSize: 10, color: C.accent, align: 'left', valign: 'middle' });
  // 右侧 40% 侧栏
  const sideX = 8.15, sideW = 4.48;
  s.addShape('rect', { x: sideX, y: 2.35, w: sideW, h: 1.55, fill: { color: C.panel }, line: { color: C.line, width: 0.5 } });
  s.addText('国企就业率 1994-95', { x: sideX + 0.2, y: 2.5, w: sideW - 0.4, h: 0.35, fontFace: FZ, fontSize: 12, bold: true, color: C.title, align: 'left', valign: 'middle' });
  s.addText('几乎零增长', { x: sideX + 0.2, y: 2.85, w: sideW - 0.4, h: 0.45, fontFace: FZ, fontSize: 17, bold: true, color: C.accent, align: 'left', valign: 'middle' });
  s.addText('（仅方向性判断，无精确数值）', { x: sideX + 0.2, y: 3.32, w: sideW - 0.4, h: 0.3, fontFace: FZ, fontSize: 8.5, color: C.secondary, align: 'left', valign: 'middle' });
  s.addText('GDP 高速增长未吸收劳动力，固投驱动型增长与就业创造脱钩——国企作为就业蓄水池的功能失效。', { x: sideX, y: 4.1, w: sideW, h: 1.5, fontFace: FZ, fontSize: 10.5, color: C.body, align: 'left', valign: 'top', lineSpacingMultiple: 1.25 });
  // 分隔竖线
  s.addShape('line', { x: sideX - 0.18, y: 2.35, w: 0, h: 3.8, line: { color: C.line, width: 0.75 } });
  soWhat(s, '繁荣的成果未流向就业，埋下社会压力——增长不等于就业。');
  pageFooter(s);
}

function buildSlide4(pptx) { // Complication 危机与约束
  const s = baseSlide(pptx);
  badge(s, 4, '复杂性 · Complication');
  titleBlock(s, '1993-94 危机爆发，且此次农村转移通道关闭——过剩劳动力无处可去', '结构性约束的本质差异');
  const midX = 6.5;
  s.addShape('line', { x: midX, y: 2.2, w: 0, h: 4.0, line: { color: C.line, width: 0.75 } });
  // 左区 危机诱因
  s.addText('1993-94 宏观危机', { x: 0.7, y: 2.25, w: 5.5, h: 0.4, fontFace: FZ, fontSize: 13, bold: true, color: C.title, align: 'left', valign: 'middle' });
  const causes = [
    { t: '三大赤字引发高通胀', d: '财政、外汇、消费三大赤字叠加' },
    { t: '地方经济进入过热阶段', d: '投资与信贷双膨胀' },
    { t: '中央开放三大资本市场大规模增发货币', d: '作为应对手段' }
  ];
  causes.forEach((c, i) => {
    const y = 2.78 + i * 1.05;
    s.addShape('rect', { x: 0.7, y, w: 5.6, h: 0.92, fill: { color: C.panel }, line: { color: C.line, width: 0.5 } });
    s.addShape('ellipse', { x: 0.85, y: y + 0.32, w: 0.18, h: 0.18, fill: { color: C.accent }, line: { type: 'none' } });
    s.addText(c.t, { x: 1.15, y: y + 0.08, w: 5.0, h: 0.4, fontFace: FZ, fontSize: 11, bold: true, color: C.title, align: 'left', valign: 'middle' });
    s.addText(c.d, { x: 1.15, y: y + 0.46, w: 5.0, h: 0.38, fontFace: FZ, fontSize: 9.5, color: C.secondary, align: 'left', valign: 'middle' });
  });
  s.addText('均为定性描述，无量化通胀/赤字值', { x: 0.7, y: 5.95, w: 5.6, h: 0.28, fontFace: FZ, fontSize: 8, color: C.secondary, align: 'left', valign: 'middle' });
  // 右区 对比表
  const tX = 6.85, tW = 5.78;
  s.addText('与以往危机的关键差异', { x: tX, y: 2.25, w: tW, h: 0.4, fontFace: FZ, fontSize: 13, bold: true, color: C.title, align: 'left', valign: 'middle' });
  // 表 2行2列 + 表头
  const tY = 2.8, rowH = 0.78, col1W = 2.1, col2W = (tW - col1W) / 2;
  // 表头
  s.addShape('rect', { x: tX, y: tY, w: col1W, h: 0.45, fill: { color: C.panel }, line: { color: C.line, width: 0.5 } });
  s.addShape('rect', { x: tX + col1W, y: tY, w: col2W, h: 0.45, fill: { color: C.panel }, line: { color: C.line, width: 0.5 } });
  s.addShape('rect', { x: tX + col1W + col2W, y: tY, w: col2W, h: 0.45, fill: { color: C.panel }, line: { color: C.line, width: 0.5 } });
  s.addText('维度', { x: tX, y: tY, w: col1W, h: 0.45, fontFace: FZ, fontSize: 9.5, bold: true, color: C.secondary, align: 'center', valign: 'middle' });
  s.addText('以往危机', { x: tX + col1W, y: tY, w: col2W, h: 0.45, fontFace: FZ, fontSize: 9.5, bold: true, color: C.secondary, align: 'center', valign: 'middle' });
  s.addText('本次危机（1990s）', { x: tX + col1W + col2W, y: tY, w: col2W, h: 0.45, fontFace: FZ, fontSize: 9.5, bold: true, color: C.accent, align: 'center', valign: 'middle' });
  // 行1
  const r1y = tY + 0.45;
  s.addShape('rect', { x: tX, y: r1y, w: col1W, h: rowH, fill: { color: C.white }, line: { color: C.line, width: 0.5 } });
  s.addShape('rect', { x: tX + col1W, y: r1y, w: col2W, h: rowH, fill: { color: C.white }, line: { color: C.line, width: 0.5 } });
  s.addShape('rect', { x: tX + col1W + col2W, y: r1y, w: col2W, h: rowH, fill: { color: C.accentSoft }, line: { color: C.line, width: 0.5 } });
  s.addText('农村劳动力转移通道', { x: tX, y: r1y, w: col1W, h: rowH, fontFace: FZ, fontSize: 10, bold: true, color: C.title, align: 'center', valign: 'middle' });
  s.addText('可向农村转移\n（开放）', { x: tX + col1W, y: r1y, w: col2W, h: rowH, fontFace: FZ, fontSize: 10, color: C.body, align: 'center', valign: 'middle' });
  s.addText('通道关闭', { x: tX + col1W + col2W, y: r1y, w: col2W, h: rowH, fontFace: FZ, fontSize: 11, bold: true, color: C.accent, align: 'center', valign: 'middle' });
  // 行2
  const r2y = r1y + rowH;
  s.addShape('rect', { x: tX, y: r2y, w: col1W, h: rowH, fill: { color: C.white }, line: { color: C.line, width: 0.5 } });
  s.addShape('rect', { x: tX + col1W, y: r2y, w: col2W, h: rowH, fill: { color: C.white }, line: { color: C.line, width: 0.5 } });
  s.addShape('rect', { x: tX + col1W + col2W, y: r2y, w: col2W, h: rowH, fill: { color: C.accentSoft }, line: { color: C.line, width: 0.5 } });
  s.addText('财政空间', { x: tX, y: r2y, w: col1W, h: rowH, fontFace: FZ, fontSize: 10, bold: true, color: C.title, align: 'center', valign: 'middle' });
  s.addText('相对宽裕', { x: tX + col1W, y: r2y, w: col2W, h: rowH, fontFace: FZ, fontSize: 10, color: C.body, align: 'center', valign: 'middle' });
  s.addText('严重赤字压力', { x: tX + col1W + col2W, y: r2y, w: col2W, h: rowH, fontFace: FZ, fontSize: 11, bold: true, color: C.accent, align: 'center', valign: 'middle' });
  soWhat(s, '农村通道关闭使国企下岗从『可选』变为唯一出清通道。');
  pageFooter(s);
}

function buildSlide5(pptx) { // 时间线 + 路径 + KPI
  const s = baseSlide(pptx);
  badge(s, 5, '应对 · Resolution');
  titleBlock(s, '从 1994 试点到 1997 扩至 111 城，累计分流富余人员 1687 万人', '『优化资本结构』的政策制度化路径');
  // 时间线
  const tlY = 2.55, tlX0 = 0.9, tlX1 = 9.0;
  s.addShape('line', { x: tlX0, y: tlY, w: tlX1 - tlX0, h: 0, line: { color: C.line, width: 1.5 } });
  const nodes = [
    { x: 0.9, yr: '1988-93', t: '破产企业 940 家', d: '前奏，多为中小/集体企业' },
    { x: 4.95, yr: '1994', t: '国发[1994]59 号', d: '确立『资本』地位，启动试点' },
    { x: 9.0, yr: '1997', t: '试点扩至 111 个城市', d: '兼并、破产、减员增效' }
  ];
  nodes.forEach(n => {
    s.addShape('ellipse', { x: n.x - 0.1, y: tlY - 0.1, w: 0.2, h: 0.2, fill: { color: C.accent }, line: { color: C.bg, width: 1 } });
    s.addText(n.yr, { x: n.x - 0.8, y: tlY - 0.5, w: 1.6, h: 0.32, fontFace: FZ, fontSize: 11, bold: true, color: C.accent, align: 'center', valign: 'middle' });
    s.addText(n.t, { x: n.x - 1.3, y: tlY + 0.2, w: 2.6, h: 0.32, fontFace: FZ, fontSize: 10.5, bold: true, color: C.title, align: 'center', valign: 'middle' });
    s.addText(n.d, { x: n.x - 1.3, y: tlY + 0.52, w: 2.6, h: 0.5, fontFace: FZ, fontSize: 8.5, color: C.secondary, align: 'center', valign: 'top' });
  });
  // 分流方式三栏
  const pY = 3.95;
  s.addText('三种分流路径', { x: 0.7, y: pY, w: 5, h: 0.35, fontFace: FZ, fontSize: 12, bold: true, color: C.title, align: 'left', valign: 'middle' });
  const paths = ['兼并', '破产', '减员增效'];
  const pColW = 3.0;
  paths.forEach((p, i) => {
    const x = 0.7 + i * pColW;
    if (i > 0) s.addShape('line', { x: x - 0.05, y: pY + 0.45, w: 0, h: 0.7, line: { color: C.line, width: 0.5 } });
    s.addShape('rect', { x: x, y: pY + 0.45, w: pColW - 0.1, h: 0.7, fill: { color: C.panel }, line: { color: C.line, width: 0.5 } });
    s.addText('0' + (i + 1), { x: x + 0.15, y: pY + 0.5, w: 0.5, h: 0.6, fontFace: FZ, fontSize: 16, bold: true, color: C.accent, align: 'left', valign: 'middle' });
    s.addText(p, { x: x + 0.7, y: pY + 0.5, w: pColW - 0.9, h: 0.6, fontFace: FZ, fontSize: 13, bold: true, color: C.title, align: 'left', valign: 'middle' });
  });
  // 右下 KPI 收口
  const kX = 9.7, kY = 3.95, kW = 2.93;
  s.addShape('rect', { x: kX, y: kY, w: kW, h: 1.25, fill: { color: C.accent }, line: { type: 'none' } });
  s.addText('1687 万人', { x: kX, y: kY + 0.1, w: kW, h: 0.7, fontFace: FZ, fontSize: 26, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
  s.addText('累计分流（至 1997）', { x: kX, y: kY + 0.82, w: kW, h: 0.3, fontFace: FZ, fontSize: 9.5, color: 'FFFFFF', align: 'center', valign: 'middle' });
  s.addText('累计值，非单年；无逐年序列', { x: kX, y: kY + 1.3, w: kW, h: 0.25, fontFace: FZ, fontSize: 7.5, color: C.secondary, align: 'center', valign: 'middle' });
  // 111城 KPI 在左下
  s.addText('111 城', { x: 0.7, y: 5.35, w: 2.5, h: 0.5, fontFace: FZ, fontSize: 22, bold: true, color: C.accent, align: 'left', valign: 'middle' });
  s.addText('1997 年试点城市数', { x: 0.7, y: 5.82, w: 2.5, h: 0.3, fontFace: FZ, fontSize: 9.5, color: C.secondary, align: 'left', valign: 'middle' });
  soWhat(s, '政策从零散试点升级为系统性、制度化的劳动力出清。');
  pageFooter(s);
}

function buildSlide6(pptx) { // 三城样本
  const s = baseSlide(pptx);
  badge(s, 6, '应对 · Resolution');
  titleBlock(s, '绵阳、西安、张家口样本显示，纺织等行业下岗比例高达 55%-62%', '地级市与行业级的地面冲击验证');
  const cards = [
    { x: 0.7, city: '绵阳', yr: '1996', big: '62 家', bigLab: '破产国企', items: [{ t: '涉及职工 2.1 万余人', c: C.body }, { t: '占全市国企职工 7%', c: C.accent }], note: '' },
    { x: 4.42, city: '西安 · 纺织系统', yr: '', big: '55%', bigLab: '下岗占比', items: [{ t: '下岗工人 8,940 人', c: C.body }, { t: '无收入比例 70%', c: C.accent }], note: '期间未注明' },
    { x: 8.14, city: '张家口 · 纺织系统', yr: '', big: '61.7%', bigLab: '下岗占比', items: [{ t: '下岗工人 10,500 人', c: C.body }, { t: "『代金券』充当工资", c: C.accent }], note: '期间未注明' }
  ];
  const cY = 2.3, cH = 3.55, cW = 3.5;
  cards.forEach((cd, i) => {
    if (i > 0) s.addShape('line', { x: cd.x - 0.11, y: cY + 0.2, w: 0, h: cH - 0.4, line: { color: C.line, width: 0.75 } });
    // 城市名
    s.addText(cd.city, { x: cd.x, y: cY, w: cW - 0.2, h: 0.38, fontFace: FZ, fontSize: 13, bold: true, color: C.title, align: 'left', valign: 'middle' });
    if (cd.yr) s.addText(cd.yr, { x: cd.x + cW - 0.7, y: cY, w: 0.6, h: 0.38, fontFace: FZ, fontSize: 9.5, color: C.secondary, align: 'right', valign: 'middle' });
    // 大数字
    s.addText(cd.big, { x: cd.x, y: cY + 0.5, w: cW - 0.2, h: 1.0, fontFace: FZ, fontSize: 38, bold: true, color: C.accent, align: 'left', valign: 'middle' });
    s.addText(cd.bigLab, { x: cd.x, y: cY + 1.5, w: cW - 0.2, h: 0.35, fontFace: FZ, fontSize: 11, color: C.secondary, align: 'left', valign: 'middle' });
    // 分隔
    s.addShape('line', { x: cd.x, y: cY + 1.95, w: cW - 0.3, h: 0, line: { color: C.line, width: 0.5 } });
    // items
    cd.items.forEach((it, j) => {
      const iy = cY + 2.08 + j * 0.4;
      s.addShape('ellipse', { x: cd.x, y: iy + 0.1, w: 0.08, h: 0.08, fill: { color: C.accent }, line: { type: 'none' } });
      s.addText(it.t, { x: cd.x + 0.18, y: iy, w: cW - 0.4, h: 0.32, fontFace: FZ, fontSize: 10.5, bold: it.c === C.accent, color: it.c, align: 'left', valign: 'middle' });
    });
    if (cd.note) s.addText(cd.note, { x: cd.x, y: cY + 2.95, w: cW - 0.2, h: 0.28, fontFace: FZ, fontSize: 8.5, color: C.secondary, align: 'left', valign: 'middle' });
  });
  soWhat(s, '宏观政策在地面转化为过半职工失去生计的行业冲击。');
  // caveat + footer
  s.addText('注：西安、张家口样本缺明确年份；为行业/地级市样本，非全国代表。', { x: 0.7, y: 6.04, w: 11.9, h: 0.25, fontFace: FZ, fontSize: 8, color: C.secondary, align: 'left', valign: 'middle' });
  pageFooter(s);
}

function buildSlide7(pptx) { // 收束
  const s = baseSlide(pptx);
  badge(s, 7, '收束 · Conclusion');
  titleBlock(s, "1687 万人分流——1990 年代从『铁饭碗』到市场化出清的系统性转折", '历史坐标与含义');
  // 左侧大KPI
  s.addText('1687', { x: 0.7, y: 2.6, w: 5.2, h: 1.6, fontFace: FZ, fontSize: 78, bold: true, color: C.accent, align: 'left', valign: 'middle' });
  s.addText('万人', { x: 4.0, y: 3.35, w: 1.5, h: 0.6, fontFace: FZ, fontSize: 22, bold: true, color: C.accent, align: 'left', valign: 'bottom' });
  s.addText('累计分流富余人员（1994-1997）', { x: 0.7, y: 4.2, w: 5.2, h: 0.35, fontFace: FZ, fontSize: 12, color: C.secondary, align: 'left', valign: 'middle' });
  // 分隔竖线
  s.addShape('line', { x: 6.1, y: 2.4, w: 0, h: 3.4, line: { color: C.line, width: 0.75 } });
  // 右侧三段结论
  const concl = [
    { n: '01', t: '繁荣悖论', d: '八五 GDP 年均 11.9% 的空前增长，是资本密集型而非就业密集型，就业增长仅 1.3%。' },
    { n: '02', t: '通道关闭', d: '与以往危机不同，1990s 农村转移通道关闭，过剩劳动力无处可去，国企下岗成为唯一出清通道。' },
    { n: '03', t: '制度性转折', d: '『优化资本结构』从 1994 试点到 1997 扩 111 城，标志着从『铁饭碗』到市场化劳动力出清的转折。' }
  ];
  const rX = 6.5, rW = 6.13;
  concl.forEach((c, i) => {
    const y = 2.5 + i * 1.15;
    s.addShape('rect', { x: rX, y: y, w: 0.5, h: 0.5, fill: { color: C.accent }, line: { type: 'none' } });
    s.addText(c.n, { x: rX, y, w: 0.5, h: 0.5, fontFace: FZ, fontSize: 14, bold: true, color: 'FFFFFF', align: 'center', valign: 'middle' });
    s.addText(c.t, { x: rX + 0.65, y, w: rW - 0.7, h: 0.4, fontFace: FZ, fontSize: 14, bold: true, color: C.title, align: 'left', valign: 'middle' });
    s.addText(c.d, { x: rX + 0.65, y: y + 0.42, w: rW - 0.7, h: 0.7, fontFace: FZ, fontSize: 10.5, color: C.body, align: 'left', valign: 'top', lineSpacingMultiple: 1.2 });
    if (i < 2) s.addShape('line', { x: rX, y: y + 1.08, w: rW - 0.4, h: 0, line: { color: C.line, width: 0.4 } });
  });
  s.addText('注：1687 万为累计值；再就业与收入恢复数据未提供。', { x: 0.7, y: 6.62, w: 11.9, h: 0.25, fontFace: FZ, fontSize: 8, color: C.secondary, align: 'left', valign: 'middle' });
  // 不画 SO WHAT 横条（收束页改为来源行）
  s.addShape('line', { x: 0.7, y: 6.92, w: W - ML - MR, h: 0, line: { color: C.line, width: 0.5 } });
  s.addText('来源：八五宏观数据；国发[1994]59号；1997试点城市数据；绵阳/西安/张家口样本', { x: 0.7, y: 6.97, w: 9.5, h: 0.28, fontFace: FZ, fontSize: 7.5, color: C.secondary, align: 'left', valign: 'middle' });
  s.addText('1990年代国企下岗 · 经济史数据复盘', { x: W - MR - 3.5, y: 6.97, w: 3.5, h: 0.28, fontFace: FZ, fontSize: 7.5, color: C.secondary, align: 'right', valign: 'middle' });
}

// ---- 构建单页 PPTX + 合并 ----
const builders = [buildSlide1, buildSlide2, buildSlide3, buildSlide4, buildSlide5, buildSlide6, buildSlide7];

(async () => {
  // 单页 PPTX
  for (let i = 0; i < builders.length; i++) {
    const p = new PptxGenJS();
    p.defineLayout({ name: 'C16x9', width: W, height: H });
    p.layout = 'C16x9';
    builders[i](p);
    await p.writeFile({ fileName: path.resolve(__dirname, 'pages', `slide-${String(i + 1).padStart(2, '0')}.pptx`) });
  }
  // 合并 deck
  const deck = new PptxGenJS();
  deck.defineLayout({ name: 'C16x9', width: W, height: H });
  deck.layout = 'C16x9';
  builders.forEach(b => b(deck));
  await deck.writeFile({ fileName: path.resolve(__dirname, '1990年代国企下岗-咨询风.pptx') });
  console.log('DONE: 7 single pages + merged deck');
})();
