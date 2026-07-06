// Slide 4 — 最深的洞见需要100年才能被验证
module.exports.build = async function(slide, pptx, C, ASSETS) {
  slide.addText('最深的洞见', {
    x: 0.5, y: 0.3, w: 6, h: 0.7,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left',
  });
  slide.addText('需要 100 年才能被验证', {
    x: 0.5, y: 0.95, w: 12, h: 0.5,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.accent, align: 'left',
  });

  const timeline = [
    { year: '1770', who: 'Lagrange', note: '猜到对称性途径\n没证明任何东西', },
    { year: '1824', who: 'Abel', note: '证出五次方程不可解\n缺群论抽象语言', },
    { year: '1832', who: 'Galois\n(20岁离世)', note: '抽象再抽象一层\n论文被拒 5 次', bold: true },
    { year: '1860s', who: 'Liouville', note: '翻 Galois 死后 20 年笔记\n"这孩子可能发现了什么"', },
    { year: '1870', who: 'Jordan', note: '写出等价的\n现代群论语言', },
    { year: '1960s', who: 'Gell-Mann', note: '群论预测夸克\nLagrange 之后 200 年', },
  ];

  const tlY = 3.0;
  slide.addShape(pptx.ShapeType.line, {
    x: 0.6, y: tlY, w: 12.0, h: 0,
    line: { color: C.accent, width: 2 },
  });

  const totalW = 11.8, spacing = totalW / (timeline.length - 1);
  timeline.forEach((item, i) => {
    const x = 0.7 + i * spacing;
    // 节点圆
    slide.addShape(pptx.ShapeType.ellipse, {
      x: x + 0.7, y: tlY - 0.1, w: 0.2, h: 0.2,
      fill: { color: item.bold ? C.accent : C.line },
      line: { color: item.bold ? C.accent : C.sub, width: 1 },
    });
    // 年份
    slide.addText(item.year, {
      x: x - 0.1, y: tlY + 0.25, w: 2.2, h: 0.3,
      fontSize: 9, fontFace: 'PingFang SC', bold: true, color: C.sub, align: 'center',
    });
    // 人物
    slide.addText(item.who, {
      x: x - 0.1, y: tlY + 0.55, w: 2.2, h: 0.6,
      fontSize: 13, fontFace: 'PingFang SC', bold: true,
      color: item.bold ? C.accent : C.title, align: 'center',
    });
  });

  // 说明性文字（放在下方大区域，避免和节点重叠）
  slide.addText('Lagrange → Abel → Galois：一群天才前后耗时 60 年搭建群论\nLiouville 在 Galois 死后20年发现笔记价值 → Jordan 写出完整理论 → Gell-Mann 200年后用群论预测夸克', {
    x: 0.7, y: 3.6, w: 12, h: 1.0,
    fontSize: 12, fontFace: 'PingFang SC', color: C.body,
    align: 'left', lineSpacingMultiple: 1.4,
  });

  // 底部判断
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.5, y: 4.9, w: 12.1, h: 2.0,
    fill: { color: C.accent, transparency: 88 },
    line: { color: C.accent, width: 0.75 },
  });
  slide.addText('"The verification loop on conceptual breakthroughs can be a century long."', {
    x: 0.75, y: 5.0, w: 11.6, h: 0.7,
    fontSize: 16, fontFace: 'PingFang SC', italic: true, color: C.white, align: 'left',
  });
  slide.addText('这恰好是 RL 的 "reward 信号" 无法工作的场景——\n你既不能等到100年后再给奖励，也无法确定这100年里同行评议就不会错判。', {
    x: 0.75, y: 5.7, w: 11.6, h: 1.0,
    fontSize: 12, fontFace: 'PingFang SC', color: C.accent, align: 'left', lineSpacingMultiple: 1.3,
  });
  slide.addText('— Dwarkesh Podcast, Grant Sanderson, 00:11:32', {
    x: 0.75, y: 6.6, w: 8, h: 0.3,
    fontSize: 10, fontFace: 'PingFang SC', color: C.white, transparency: 40, align: 'left',
  });
};
