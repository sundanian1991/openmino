const pptxgen = require('pptxgenjs');
const html2pptx = require('/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/pptx/scripts/html2pptx');
const path = require('path');

async function build() {
  const pptx = new pptxgen();
  pptx.layout = 'LAYOUT_16x9';
  pptx.author = 'Mino';
  pptx.title = '如何快速了解一个陌生业务';

  const dir = '/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/业务快速上手分享/slides';

  // Slide 1: Cover
  await html2pptx(path.join(dir, 'slide01.html'), pptx);

  // Slide 2: Overview
  await html2pptx(path.join(dir, 'slide02.html'), pptx);

  // Slide 3: Canvas Grid
  await html2pptx(path.join(dir, 'slide03.html'), pptx);

  // Slide 4: How To
  await html2pptx(path.join(dir, 'slide04.html'), pptx);

  // Slide 5: Questions A
  await html2pptx(path.join(dir, 'slide05.html'), pptx);

  // Slide 6: Questions B
  await html2pptx(path.join(dir, 'slide06.html'), pptx);

  // Slide 7: Interview table
  const { slide: s7, placeholders: p7 } = await html2pptx(path.join(dir, 'slide07.html'), pptx);
  if (p7.length > 0) {
    const hdrOpts = { fill: { color: 'E5D8BF' }, color: '8B4513', bold: true, fontSize: 11, align: 'left', valign: 'middle' };
    const cellOpts = { fill: { color: 'F0E6D3' }, color: '2C2217', fontSize: 10, align: 'left', valign: 'top' };
    const mutedOpts = { ...cellOpts, color: '7A6B58' };
    const labelOpts = { ...cellOpts, color: '8B4513', bold: true };
    s7.addTable([
      [{ text: '角色', options: hdrOpts }, { text: '问什么', options: hdrOpts }, { text: '注意陷阱', options: hdrOpts }],
      [{ text: '业务负责人', options: labelOpts }, { text: '战略目标、最大的假设、最担心的事', options: cellOpts }, { text: '容易讲愿景，忽略细节', options: mutedOpts }],
      [{ text: '一线销售/客服', options: labelOpts }, { text: '客户最常抱怨什么？丢单真实原因？', options: cellOpts }, { text: '能听到真问题，但可能情绪化', options: mutedOpts }],
      [{ text: '财务/运营', options: labelOpts }, { text: '实际数据表现、异常指标、预算分配', options: cellOpts }, { text: '数据可能滞后，要问为什么', options: mutedOpts }],
      [{ text: '外部客户', options: labelOpts }, { text: '如果没有你们，会怎么办？最看重什么？', options: cellOpts }, { text: '需要匿名，或假装普通用户', options: mutedOpts }],
    ], { ...p7[0], border: { pt: 0.5, color: 'C8A06A' }, colW: [1.6, 4.0, 3.0], rowH: [0.4, 0.5, 0.5, 0.5, 0.5] });
  }

  // Slide 8: Data + Roleplay
  await html2pptx(path.join(dir, 'slide08.html'), pptx);

  // Slide 9: Diagnosis table
  const { slide: s9, placeholders: p9 } = await html2pptx(path.join(dir, 'slide09.html'), pptx);
  if (p9.length > 0) {
    const hdrOpts = { fill: { color: 'E5D8BF' }, color: '8B4513', bold: true, fontSize: 11, align: 'left', valign: 'middle' };
    const cellOpts = { fill: { color: 'F0E6D3' }, color: '7A6B58', fontSize: 10, align: 'left', valign: 'middle' };
    const labelOpts = { ...cellOpts, color: '8B4513', bold: true };
    s9.addTable([
      [{ text: '维度', options: hdrOpts }, { text: '当前状态（客观描述）', options: hdrOpts }, { text: '健康？', options: hdrOpts }, { text: '关键证据或疑问点', options: hdrOpts }],
      [{ text: '客户需求', options: labelOpts }, { text: '[填入]', options: cellOpts }, { text: '绿', options: { ...cellOpts, color: '3D7A4A', bold: true } }, { text: '[填入]', options: cellOpts }],
      [{ text: '业务逻辑', options: labelOpts }, { text: '[填入]', options: cellOpts }, { text: '黄', options: { ...cellOpts, color: 'B8922A', bold: true } }, { text: '[填入]', options: cellOpts }],
      [{ text: '财务状况', options: labelOpts }, { text: '[填入]', options: cellOpts }, { text: '绿', options: { ...cellOpts, color: '3D7A4A', bold: true } }, { text: '[填入]', options: cellOpts }],
      [{ text: '运营效率', options: labelOpts }, { text: '[填入]', options: cellOpts }, { text: '红', options: { ...cellOpts, color: 'B04030', bold: true } }, { text: '[填入]', options: cellOpts }],
      [{ text: '风险敞口', options: labelOpts }, { text: '[填入]', options: cellOpts }, { text: '黄', options: { ...cellOpts, color: 'B8922A', bold: true } }, { text: '[填入]', options: cellOpts }],
    ], { ...p9[0], border: { pt: 0.5, color: 'C8A06A' }, colW: [1.3, 3.0, 1.0, 3.3], rowH: [0.4, 0.45, 0.45, 0.45, 0.45, 0.45] });
  }

  // Slide 10: Three Conclusions
  await html2pptx(path.join(dir, 'slide10.html'), pptx);

  // Slide 11: Business Types table
  const { slide: s11, placeholders: p11 } = await html2pptx(path.join(dir, 'slide11.html'), pptx);
  if (p11.length > 0) {
    const hdrOpts = { fill: { color: 'E5D8BF' }, color: '8B4513', bold: true, fontSize: 11, align: 'left', valign: 'middle' };
    const cellOpts = { fill: { color: 'F0E6D3' }, color: '2C2217', fontSize: 10, align: 'left', valign: 'middle' };
    const labelOpts = { ...cellOpts, color: '8B4513', bold: true };
    s11.addTable([
      [{ text: '业务类型', options: hdrOpts }, { text: '快速抓住本质的问题', options: hdrOpts }],
      [{ text: 'SaaS', options: labelOpts }, { text: '客户流失率（NDR）？实施成本多高？切换成本高还是低？', options: cellOpts }],
      [{ text: '电商', options: labelOpts }, { text: '流量从哪里来？复购率？退货率？库存占用多少现金？', options: cellOpts }],
      [{ text: '内容/社区', options: labelOpts }, { text: '用户为什么留下来？创作者为什么持续生产？社区靠什么正规收入？', options: cellOpts }],
      [{ text: '制造业', options: labelOpts }, { text: '产能利用率？订单账期？原材料价格波动影响多大？', options: cellOpts }],
      [{ text: '线下连锁', options: labelOpts }, { text: '单店模型（盈亏平衡点、回本周期）？标准化程度？', options: cellOpts }],
    ], { ...p11[0], border: { pt: 0.5, color: 'C8A06A' }, colW: [1.6, 7.0], rowH: [0.4, 0.45, 0.45, 0.45, 0.45, 0.45] });
  }

  // Slide 12: End
  await html2pptx(path.join(dir, 'slide12.html'), pptx);

  const outPath = '/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/业务快速上手分享/如何快速了解一个陌生业务.pptx';
  await pptx.writeFile({ fileName: outPath });
  console.log('Done: ' + outPath);
}

build().catch(e => { console.error(e); process.exit(1); });
