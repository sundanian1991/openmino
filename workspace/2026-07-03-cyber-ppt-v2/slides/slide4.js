// ═══════════════════════════════════════════════════════════
//  Slide 04 — 百年时间轴
//  极简时间轴 + 底部全出血引用色带
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T }) {
  slide.addText('最深的洞见', {
    x: 0.5, y: 0.65, w: 6, h: 0.5,
    fontSize: 40, fontFace: 'Helvetica Neue', bold: true, color: C.ink, align: 'left',
  });
  slide.addText('需要 100 年才能被验证', {
    x: 0.5, y: 1.15, w: 12, h: 0.5,
    fontSize: 28, fontFace: 'Helvetica Neue', bold: true, color: C.accent, align: 'left',
  });

  const items = [
    { year: '1770', who: 'Lagrange',           note: '猜到对称性途径\n没证明任何东西' },
    { year: '1824', who: 'Abel',               note: '证出五次方程不可解\n缺群论抽象语言' },
    { year: '1832', who: 'Galois',             note: '抽象再抽象一层\n论文被拒 5 次', bold: true },
    { year: '1860', who: 'Liouville',          note: '翻 Galois 死后20年笔记\n"这孩子可能发现了什么"' },
    { year: '1870', who: 'Jordan',             note: '写出等价的\n现代群论语言' },
    { year: '1962', who: 'Gell-Mann',          note: '群论预测夸克\nLagrange 之后 200 年' },
  ];

  const tlY = 3.4;
  // 主线
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5, y: tlY, w: 12.2, h: 0,
    line: { color: C.accent, width: 1.5 },
  });

  const totalStep = 12.2 / (items.length - 1);
  items.forEach((item, i) => {
    const x = 0.6 + i * totalStep;
    // 节点
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x - 0.1, y: tlY - 0.1, w: 0.2, h: 0.2,
      fill: { color: item.bold ? C.accent : C.ink },
      line: { color: item.bold ? C.accent : C.ink, width: 0.5 },
    });
    // 年份
    slide.addText(item.year, {
      x: x - 0.8, y: tlY + 0.3, w: 1.8, h: 0.25,
      fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: C.mute,
      align: 'center',
    });
    // 人物
    slide.addText(item.who, {
      x: x - 0.8, y: tlY + 0.55, w: 1.8, h: 0.4,
      fontSize: 12, fontFace: 'Helvetica Neue', bold: true,
      color: item.bold ? C.accent : C.ink, align: 'center',
    });
    // 年份下方带（重点节点才有）
    if (item.bold) {
      slide.addShape(pptx.ShapeType.rect, {
        x: x - 0.9, y: tlY + 0.95, w: 1.8, h: 0.04,
        fill: { color: C.accent }, line: { type: 'none' },
      });
    }
  });

  // 说明文字
  slide.addText('Lagrange → Abel → Galois：一群天才前后耗时 60 年搭建群论；\nLiouville 在 Galois 死后 20 年发现笔记价值 → Jordan 写出完整理论 → Gell-Mann 200年后用群论预测夸克。', {
    x: 0.5, y: 4.0, w: 12, h: 0.8,
    fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
    align: 'left', lineSpacingMultiple: 1.4,
  });

  // 底部：全出血引用色带
  slide.addShape(pptx.ShapeType.rect, {
    x: 0, y: 5.3, w: 13.333, h: 2.2,
    fill: { color: C.accent }, line: { type: 'none' },
  });
  slide.addText('"The verification loop\non conceptual breakthroughs\ncan be a century long."', {
    x: 0.7, y: 5.5, w: 12, h: 1.4,
    fontSize: 24, fontFace: 'Georgia', italic: true, color: C.white,
    align: 'left', lineSpacingMultiple: 1.3,
  });
  slide.addText('这恰好是 RL 的 "reward 信号" 无法工作的场景：\n你既不能等到 100 年后再给奖励，也无法确定这 100 年里同行评议就不会错判。', {
    x: 0.7, y: 6.5, w: 12, h: 0.6,
    fontSize: T.bodySm.size, fontFace: 'Georgia', italic: true,
    color: C.white, transparency: 20, align: 'left', lineSpacingMultiple: 1.3,
  });
  slide.addText('— Dwarkesh × Sanderson, 00:11:32', {
    x: 0.7, y: 7.05, w: 5, h: 0.25,
    fontSize: T.quoteAttribution.size, fontFace: 'Helvetica Neue', charSpacing: 50,
    color: C.white, transparency: 50,
  });
};
