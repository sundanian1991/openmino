const fs = require('fs');
const path = require('path');
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
  VerticalAlign, LevelFormat, PageBreak,
} = require('docx');

// ---------- 共享样式 ----------
const CN = { ascii: 'Microsoft YaHei', eastAsia: 'Microsoft YaHei', hAnsi: 'Microsoft YaHei' };
const BORDER = { style: BorderStyle.SINGLE, size: 4, color: 'BFBFBF' };
const CELL_BORDERS = { top: BORDER, bottom: BORDER, left: BORDER, right: BORDER };
const HEADER_FILL = 'D9E2F3'; // 浅蓝表头
const FILL_HEAD = 'EDEDED';   // 维度列底色
const TOTAL_W = 9360;         // Letter 1" 边距可用宽度

// 段落 helper
const p = (text, opts = {}) => new Paragraph({
  spacing: { before: 80, after: 80 },
  ...opts,
  children: [new TextRun({ text, font: CN, ...(opts.run || {}) })],
});
// 多 run 段落
const pr = (runs, opts = {}) => new Paragraph({ spacing: { before: 80, after: 80 }, ...opts, children: runs });
const tr = (text, run = {}) => new TextRun({ text, font: CN, ...run });

// 单元格（文本居中/左）
const cell = (text, { w, fill, bold, align = AlignmentType.LEFT, size = 20, runs, valign = VerticalAlign.CENTER, height } = {}) =>
  new TableCell({
    borders: CELL_BORDERS,
    width: { size: w, type: WidthType.DXA },
    shading: fill ? { fill, type: ShadingType.CLEAR, color: 'auto' } : undefined,
    verticalAlign: valign,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    ...(height ? { rowSpan: undefined } : {}),
    children: runs
      ? [new Paragraph({ alignment: align, spacing: { before: 0, after: 0 }, children: runs })]
      : [new Paragraph({ alignment: align, spacing: { before: 0, after: 0 }, children: [new TextRun({ text: text || '', font: CN, bold, size })] })],
  });

// 填空单元格（带最小高度，便于书写）
const blankCell = (w, height = 700) =>
  new TableCell({
    borders: CELL_BORDERS,
    width: { size: w, type: WidthType.DXA },
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: [new TextRun({ text: '', font: CN })] })],
  });

// 填空行（全宽单格）
const blankRow = (height = 700) =>
  new Table({
    columnWidths: [TOTAL_W],
    width: { size: TOTAL_W, type: WidthType.DXA },
    rows: [new TableRow({ height: { value: height, rule: 'atLeast' }, children: [blankCell(TOTAL_W, height)] })],
  });

// 复选框选项段落
const checkLine = (text, opts = {}) => new Paragraph({
  spacing: { before: 40, after: 40 },
  ...opts,
  children: [new TextRun({ text: '☐ ', font: CN, size: 20 }), new TextRun({ text, font: CN, size: 20 })],
});

// 空段（间距）
const gap = (after = 120) => new Paragraph({ spacing: { before: 0, after }, children: [new TextRun({ text: '', font: CN })] });

// 文档装配
const mkDoc = (children) =>
  new Document({
    styles: {
      default: { document: { run: { font: CN, size: 21 } } },
      paragraphStyles: [
        { id: 'Title', name: 'Title', basedOn: 'Normal',
          run: { size: 36, bold: true, color: '1F3864', font: CN },
          paragraph: { spacing: { before: 120, after: 160 }, alignment: AlignmentType.CENTER } },
        { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 26, bold: true, color: '1F3864', font: CN },
          paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
        { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
          run: { size: 23, bold: true, color: '2E5496', font: CN },
          paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } },
      ],
    },
    numbering: { config: [
      { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 480, hanging: 260 } } } }] },
    ] },
    sections: [{
      properties: { page: { margin: { top: 1134, right: 1134, bottom: 1134, left: 1134 } } }, // ~0.79"
      children,
    }],
  });

// ============================================================
// 文档一：课前预习
// ============================================================
function buildDoc1() {
  const c = [];
  c.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [tr('大额税票贷供应商联盟培训 · 课前预习')] }));
  c.push(pr([tr('请带着你自己的问题来听，比带着标准答案回去更重要。', { italics: true, color: '595959', size: 20 })],
    { alignment: AlignmentType.CENTER, spacing: { after: 60 } }));
  c.push(pr([tr('以下 4 个模块覆盖本次培训核心内容。请花 10 分钟，对照团队现状，写下最想解决的一个具体问题。现场听讲时，这些问题就是你的"导航仪"。', { italics: true, color: '595959', size: 20 })],
    { alignment: AlignmentType.CENTER, spacing: { after: 200 } }));

  const modules = [
    { name: '模块一：数据策略与名单管理', qs: [
      '你团队坐席每天拿到的名单，有没有"打完新名单就不知道打什么"的情况？',
      '坐席库里名单堆积（比如每人库里有几百上千条），坐席会不会说"不知道筛选哪些打"？',
      '预测/预测试名单的拨打效果，你们现在满意吗？' ] },
    { name: '模块二：话术结构与产能突破', qs: [
      '你们现在坐席用的话术/脚本，你觉得是"有但用不出来"，还是"连结构都不清楚"？',
      '完件率、授信率、提额申请率，你们现在卡在哪个环节？头部供应商的数据你有概念吗？',
      '你有没有观察过团队里"产能最高的人"和"普通坐席"，在同一通电话里说的关键差异是什么？' ] },
    { name: '模块三：企微客户运营', qs: [
      '你们现在加白率和企微添加率大概是多少？加上之后客户回复率怎么样？',
      '企微跟进有没有变成"营销轰炸"——发得多、回得少、还影响名单拨打时间？',
      '如果让你选，"名单拨打效率"和"企微客户长期经营"，现在哪个更让团队头疼？' ] },
    { name: '模块四：人员激励与团队管理', qs: [
      '一个新坐席从入职到稳定出单，你们现在的爬坡周期大概是多久？',
      '团队氛围和积极性，你觉得是"钱的问题"还是"被看见的问题"？或者都不是？',
      '如果只能改一个激励节点（完件 / 采集 / 促提 / 其他），你会先动哪个？为什么？' ] },
  ];
  for (const m of modules) {
    c.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [tr(m.name)] }));
    c.push(p('请先想想：', { run: { bold: true } }));
    for (const q of m.qs) {
      c.push(new Paragraph({ numbering: { reference: 'bullets', level: 0 },
        spacing: { before: 40, after: 40 }, children: [new TextRun({ text: q, font: CN, size: 20 })] }));
    }
    c.push(gap(60));
    c.push(p('我最想了解的具体问题：', { run: { bold: true } }));
    c.push(blankRow(900));
    c.push(gap(120));
  }

  c.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [tr('提交方式')] }));
  c.push(p('请于培训前 3 天将此页拍照/扫描发回，或在线填写。'));
  c.push(pr([tr('你的问题会帮助主讲方（汇讯、新动力）在现场做针对性展开。', { bold: true })], { spacing: { after: 160 } }));
  c.push(pr([tr('提示：', { bold: true }), tr('不需要写得很完整、很正式。一句大白话、一个具体的数字、一个让你失眠的管理焦虑，都足够有价值。', { italics: true, color: '595959', size: 20 })]));
  return c;
}

// ============================================================
// 文档二：事中对照记录表
// ============================================================
function buildDoc2() {
  const c = [];
  c.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [tr('大额税票贷供应商联盟培训 · 现场对照记录表')] }));
  c.push(pr([tr('使用方法：', { bold: true }), tr('每听完一个模块，立刻对照你团队的现状填上"差距"和"可直接抄的动作"。有疑问当场记，会后答疑或私下交流。', { italics: true, color: '595959', size: 20 })],
    { spacing: { after: 160 } }));

  // 信息行：供应商名称 / 记录人 / 日期（表头 + 填写行）
  c.push(new Table({
    columnWidths: [3120, 3120, 3120],
    width: { size: TOTAL_W, type: WidthType.DXA },
    rows: [
      new TableRow({ children: ['供应商名称', '记录人', '日期'].map((t) =>
        new TableCell({ borders: CELL_BORDERS, width: { size: 3120, type: WidthType.DXA }, shading: { fill: FILL_HEAD, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: t, font: CN, bold: true, size: 20 })] })] })
      ) }),
      new TableRow({ height: { value: 500, rule: 'atLeast' }, children: [blankCell(3120, 500), blankCell(3120, 500), blankCell(3120, 500)] }),
    ],
  }));
  c.push(gap(160));

  // 通用：4 列对照表
  const cols = [2600, 2200, 2560, 2000];
  const compareTable = (leadName) => {
    const headers = [`主讲方要点（${leadName}怎么做的）`, '我团队现状', '可直接抄的动作', '我的疑问'];
    const rows = [new TableRow({ tableHeader: true, children: headers.map((h, i) => cell(h, { w: cols[i], fill: HEADER_FILL, bold: true, align: AlignmentType.CENTER, size: 20 })) })];
    for (let r = 0; r < 3; r++) {
      rows.push(new TableRow({ children: cols.map((w) => blankCell(w, 480)) }));
    }
    return new Table({ columnWidths: cols, width: { size: TOTAL_W, type: WidthType.DXA }, rows });
  };

  const sections = [
    { name: '模块一：数据策略与名单管理（主讲：汇讯）', subs: ['1. 名单分配与轮转规则', '2. 时段/预测拨打策略', '3. 坐席库名单留存与筛选'], lead: '汇讯' },
    { name: '模块二：话术结构与产能突破（主讲：汇讯）', subs: ['4. 标准话术与头部差异化', '5. 完件/授信/提额申请率突破'], lead: '汇讯' },
    { name: '模块三：企微客户运营（主讲：新动力）', subs: ['6. 企微添加与跟进节奏', '7. 企微运营 vs 名单拨打效率平衡'], lead: '新动力' },
    { name: '模块四：人员激励与团队管理（主讲：汇讯）', subs: ['8. 选用育留与激励方案'], lead: '汇讯' },
  ];
  for (const s of sections) {
    c.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [tr(s.name)] }));
    for (const sub of s.subs) {
      c.push(new Paragraph({ heading: HeadingLevel.HEADING_2, children: [tr(sub)] }));
      c.push(compareTable(s.lead));
      c.push(gap(120));
    }
  }

  c.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [tr('现场 Q&A 速记')] }));
  const qaCols = [900, 3200, 3860, 1400];
  c.push(new Table({
    columnWidths: qaCols,
    width: { size: TOTAL_W, type: WidthType.DXA },
    rows: [
      new TableRow({ tableHeader: true, children: ['问题编号', '我的问题', '主讲方回答要点', '是否解决'].map((h, i) => cell(h, { w: qaCols[i], fill: HEADER_FILL, bold: true, align: AlignmentType.CENTER, size: 20 })) }),
      ...[1, 2, 3].map((n) => new TableRow({ children: [
        cell(String(n), { w: qaCols[0], align: AlignmentType.CENTER, size: 20 }),
        blankCell(qaCols[1], 480),
        blankCell(qaCols[2], 480),
        cell('', { w: qaCols[3], align: AlignmentType.CENTER, size: 20, runs: [tr('□ 是   □ 否', { size: 20 })] }),
      ] })),
    ],
  }));
  c.push(gap(160));
  c.push(pr([tr('提醒：', { bold: true }), tr('这张表的价值不在"填满"，而在"诚实"。写"做不到"比写"学到了"更有信息量。', { italics: true, color: '595959', size: 20 })]));
  return c;
}

// ============================================================
// 文档三：事后行动回收表
// ============================================================
function buildDoc3() {
  const c = [];
  c.push(new Paragraph({ heading: HeadingLevel.TITLE, children: [tr('大额税票贷供应商联盟培训 · 30 天行动回收')] }));
  c.push(pr([tr('请于培训结束后 7 天内提交。', { bold: true }), tr('这不是"作业"，是你给自己团队的一份"落地契约"。', { italics: true, color: '595959', size: 20 })], { spacing: { after: 160 } }));

  // 信息行
  c.push(new Table({
    columnWidths: [3120, 3120, 3120],
    width: { size: TOTAL_W, type: WidthType.DXA },
    rows: [new TableRow({ children: [
      new TableCell({ borders: CELL_BORDERS, width: { size: 3120, type: WidthType.DXA }, shading: { fill: FILL_HEAD, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: '供应商名称', font: CN, bold: true, size: 20 })] })] }),
      new TableCell({ borders: CELL_BORDERS, width: { size: 3120, type: WidthType.DXA }, shading: { fill: FILL_HEAD, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: '提交人', font: CN, bold: true, size: 20 })] })] }),
      new TableCell({ borders: CELL_BORDERS, width: { size: 3120, type: WidthType.DXA }, shading: { fill: FILL_HEAD, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: '提交日期', font: CN, bold: true, size: 20 })] })] }),
    ] }),
      new TableRow({ height: { value: 500, rule: 'atLeast' }, children: [blankCell(3120, 500), blankCell(3120, 500), blankCell(3120, 500)] }),
    ],
  }));
  c.push(gap(160));

  // 一、回顾
  c.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [tr('一、回顾：这次培训你记录了什么？')] }));
  c.push(pr([tr('请从【事中对照记录表】中，选出 ', { size: 20 }), tr('1-2 个"可直接抄的动作"', { bold: true, size: 20 }), tr('誊写在下边：', { size: 20 })], { spacing: { after: 120 } }));

  const reviewAction = (label) => {
    const w = 1700;
    return [
      p(label, { run: { bold: true } }),
      new Table({
        columnWidths: [w, TOTAL_W - w],
        width: { size: TOTAL_W, type: WidthType.DXA },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: CELL_BORDERS, width: { size: w, type: WidthType.DXA }, shading: { fill: FILL_HEAD, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: '来源模块', font: CN, bold: true, size: 20 })] })] }),
            new TableCell({ borders: CELL_BORDERS, width: { size: TOTAL_W - w, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ spacing: { before: 0, after: 0 }, children: [new TextRun({ text: '☐ 数据策略   ☐ 话术产能   ☐ 企微运营   ☐ 人员激励', font: CN, size: 20 })] })] }),
          ] }),
          new TableRow({ children: [
            new TableCell({ borders: CELL_BORDERS, width: { size: w, type: WidthType.DXA }, shading: { fill: FILL_HEAD, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: '具体动作', font: CN, bold: true, size: 20 })] })] }),
            blankCell(TOTAL_W - w, 500),
          ] }),
          new TableRow({ children: [
            new TableCell({ borders: CELL_BORDERS, width: { size: w, type: WidthType.DXA }, shading: { fill: FILL_HEAD, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: '为什么选这个', font: CN, bold: true, size: 20 })] })] }),
            blankCell(TOTAL_W - w, 500),
          ] }),
        ],
      }),
      gap(120),
    ];
  };
  c.push(...reviewAction('动作一'));
  c.push(...reviewAction('动作二（可选）'));

  // 二、30天行动计划
  c.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [tr('二、30 天行动计划')] }));
  c.push(p('请从上述动作中，选定 1 个在接下来 30 天内优先落地。填写以下细节：', { spacing: { after: 120 } }));
  const w2 = 2400;
  const planRows = [
    ['动作名称', null],
    ['谁来做', '☐ 主管   ☐ 组长   ☐ 全体坐席   ☐ 特定人员：__________'],
    ['在什么场景做', null],
    ['用什么方式做', null],
    ['试多久', '☐ 7 天   ☐ 14 天   ☐ 30 天   ☐ 其他：__________'],
    ['成功标准是什么（可量化）', null],
    ['现在最大的阻碍是什么', null],
  ];
  c.push(new Table({
    columnWidths: [w2, TOTAL_W - w2],
    width: { size: TOTAL_W, type: WidthType.DXA },
    rows: planRows.map(([k, v]) => new TableRow({ children: [
      new TableCell({ borders: CELL_BORDERS, width: { size: w2, type: WidthType.DXA }, shading: { fill: FILL_HEAD, type: ShadingType.CLEAR, color: 'auto' }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun({ text: k, font: CN, bold: true, size: 20 })] })] }),
      v != null
        ? new TableCell({ borders: CELL_BORDERS, width: { size: TOTAL_W - w2, type: WidthType.DXA }, margins: { top: 80, bottom: 80, left: 120, right: 120 }, children: [new Paragraph({ children: [new TextRun({ text: v, font: CN, size: 20 })] })] })
        : blankCell(TOTAL_W - w2, 480),
    ] })),
  }));
  c.push(gap(160));

  // 三、落地所需支持
  c.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [tr('三、落地所需支持')] }));
  c.push(p('要推动上述动作，你需要什么？（可多选）', { spacing: { after: 100 } }));
  ['主管/组长层面的方法培训', '工具/系统支持（如名单筛选条件调整、CRM 字段优化等）', '客户资源/名单策略调整',
   '激励/薪酬节点配合', '与头部供应商（汇讯/新动力）的二次交流机会'].forEach((t) => c.push(checkLine(t)));
  c.push(pr([tr('☐ 其他：', { size: 20 }), new TextRun({ text: '________________________________', font: CN, size: 20 })], { spacing: { before: 40, after: 40 } }));
  c.push(gap(160));

  // 四、意外发现
  c.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [tr('四、意外发现')] }));
  c.push(p('培训中，最让你意外或颠覆认知的一个点是什么？', { spacing: { after: 100 } }));
  c.push(blankRow(1200));
  c.push(gap(160));

  // 五、反馈给主办方
  c.push(new Paragraph({ heading: HeadingLevel.HEADING_1, children: [tr('五、反馈给主办方')] }));
  c.push(p('1. 内容覆盖度', { run: { bold: true } }));
  c.push(pr([tr('你事前写的那个"最想了解的问题"，培训中是否得到了回应？', { size: 20 })], { spacing: { before: 40, after: 40 } }));
  c.push(pr([tr('   ☐ 完全解决   ☐ 部分解决   ☐ 没有解决', { size: 20 })], { spacing: { before: 20, after: 40 } }));
  c.push(p('如果没解决，原因是什么？', { spacing: { before: 40, after: 40 } }));
  c.push(pr([tr('   ☐ 时间不够没讲到   ☐ 讲到了但我没听懂   ☐ 不是我需要的内容', { size: 20 })], { spacing: { before: 20, after: 80 } }));
  c.push(p('2. 对下一场培训的建议', { run: { bold: true } }));
  c.push(p('如果还有一场进阶培训，你最希望增加什么模块或深化什么内容？', { spacing: { after: 100 } }));
  c.push(blankRow(900));
  c.push(gap(160));

  c.push(pr([tr('提交方式：', { bold: true }), tr('请于培训结束后 7 天内，将此表拍照/扫描发回，或在线填写。', { size: 20 })], { spacing: { after: 40 } }));
  c.push(pr([tr('我们会基于回收结果，在 30 天后做一次跟进回访，看看你落地得怎么样，以及需要补什么支持。', { italics: true, color: '595959', size: 20 })]));
  return c;
}

// ---------- 输出 ----------
const outDir = __dirname;
const save = (doc, file) => Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(path.join(outDir, file), buf);
  console.log('✓', file, (buf.length / 1024).toFixed(1) + ' KB');
});
(async () => {
  await save(mkDoc(buildDoc1()), '大额培训_课前预习.docx');
  await save(mkDoc(buildDoc2()), '大额培训_事中对照记录表.docx');
  await save(mkDoc(buildDoc3()), '大额培训_事后行动回收表.docx');
  console.log('全部完成');
})();
