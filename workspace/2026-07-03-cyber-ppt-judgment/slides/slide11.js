// Slide 11 — 下一步行动
module.exports.build = async function(slide, pptx, C, ASSETS) {
  slide.addText('下一步', {
    x: 0.6, y: 0.3, w: 8, h: 0.7,
    fontSize: 32, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left',
  });
  slide.addText('从下一次对话开始，留下判断的"化石"', {
    x: 0.6, y: 0.95, w: 12, h: 0.55,
    fontSize: 28, fontFace: 'PingFang SC', bold: true, color: C.accent, align: 'left',
  });

  const actions = [
    {
      title: '每次协作结束时',
      desc: '花 2 分钟回答 5 个问题',
      detail: '变成肌肉记忆，\n不是附加任务',
      num: '①', color: C.accent,
    },
    {
      title: '不要只保存最终版',
      desc: '保存"我否定了什么 + 为什么"',
      detail: '这才是真正的\n学习证据',
      num: '②', color: '388E3C',
    },
    {
      title: '逐步把 AI 从工具变成学徒',
      desc: '它能调用的判断样本越多\n未来的产出越接近你的直觉',
      detail: '量变 → 质变\n审美同步真正发生',
      num: '③', color: '1976D2',
    },
  ];

  const cardW = 3.9, startX = 0.6, gap = 0.3;
  const cardY = 2.0, cardH = 3.8;

  actions.forEach((item, i) => {
    const x = startX + i * (cardW + gap);
    slide.addShape(pptx.ShapeType.rect, {
      x, y: cardY, w: cardW, h: cardH,
      fill: { color: C.white },
      line: { color: item.color, width: 1.5 },
      rectRadius: 0.1,
      shadow: { type: 'outer', blur: 6, opacity: 0.1, offset: 1.5, color: '000000' },
    });
    // header 色带
    slide.addShape(pptx.ShapeType.rect, {
      x, y: cardY, w: cardW, h: 0.9,
      fill: { color: item.color },
      rectRadius: 0.1,
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y: cardY + 0.5, w: cardW, h: 0.4,
      fill: { color: item.color },
    });
    slide.addText(item.num, {
      x, y: cardY + 0.08, w: cardW, h: 0.75,
      fontSize: 28, fontFace: 'PingFang SC', bold: true, color: C.white,
      align: 'center', valign: 'middle',
    });
    // title
    slide.addText(item.title, {
      x: x + 0.25, y: cardY + 1.1, w: cardW - 0.5, h: 0.55,
      fontSize: 14, fontFace: 'PingFang SC', bold: true, color: C.title,
    });
    // desc
    slide.addText(item.desc, {
      x: x + 0.25, y: cardY + 1.7, w: cardW - 0.5, h: 0.7,
      fontSize: 11, fontFace: 'PingFang SC', color: C.body,
      align: 'left', lineSpacingMultiple: 1.3,
    });
    // 细线
    slide.addShape(pptx.ShapeType.line, {
      x: x + 0.25, y: cardY + 2.4, w: cardW - 0.5, h: 0,
      line: { color: item.color, width: 1.5 },
    });
    // detail
    slide.addText(item.detail, {
      x: x + 0.25, y: cardY + 2.5, w: cardW - 0.5, h: 1.2,
      fontSize: 12, fontFace: 'PingFang SC', bold: true, color: item.color,
      align: 'left', lineSpacingMultiple: 1.4,
    });
  });
};
