// ═══════════════════════════════════════════════════════════
//  Slide 11 — 行动步骤
//  横向3格，每格顶部大字编号，下方纯文字说明
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T }) {
  slide.addText('下一步', {
    x: 0.5, y: 0.55, w: 8, h: 0.55,
    fontSize: 40, fontFace: 'Helvetica Neue', bold: true, color: C.ink, align: 'left',
  });
  slide.addText('从下一次对话开始，留下判断的"化石"', {
    x: 0.5, y: 1.1, w: 12, h: 0.5,
    fontSize: T.subheading.size, fontFace: 'Helvetica Neue', color: C.accent, align: 'left',
  });

  const actions = [
    {
      num: '①', color: C.accent,
      title: '每次协作结束时\n花 2 分钟回答 5 个问题',
      subtitle: '变成肌肉记忆\n不是附加任务',
    },
    {
      num: '②', color: C.green,
      title: '不要只保存最终版\n保存"我否定了什么 + 为什么"',
      subtitle: '这才是真正的\n学习证据',
    },
    {
      num: '③', color: C.purple,
      title: '逐步把 AI 从工具变成学徒\n它能调用的判断样本越丰富',
      subtitle: '量变 → 质变\n审美同步\n真正发生',
    },
  ];

  const cardW = 3.9, startX = 0.7, gap = 0.6;
  const cardY = 2.1, cardH = 3.8;

  actions.forEach((a, i) => {
    const x = startX + i * (cardW + gap);

    // 顶部色块
    slide.addShape(pptx.ShapeType.rect, {
      x, y: cardY, w: cardW, h: 1.5,
      fill: { color: a.color }, line: { type: 'none' },
    });
    // 编号
    slide.addText(a.num, {
      x, y: cardY + 0.12, w: cardW, h: 0.7,
      fontSize: 32, fontFace: 'Helvetica Neue', bold: true,
      color: C.white, align: 'center', valign: 'middle',
    });
    // 标题
    slide.addText(a.title, {
      x: x + 0.2, y: cardY + 0.85, w: cardW - 0.4, h: 0.55,
      fontSize: 13, fontFace: 'Helvetica Neue', bold: true, color: C.white,
      align: 'left',
    });

    // 细线
    slide.addShape(pptx.ShapeType.line, {
      x: x + 0.2, y: cardY + 1.7, w: 0.4, h: 0,
      line: { color: a.color, width: 1 },
    });

    // 副标题
    slide.addText(a.subtitle, {
      x: x + 0.2, y: cardY + 1.8, w: cardW - 0.4, h: 1.2,
      fontSize: T.body.size, fontFace: 'Helvetica Neue', bold: true, color: a.color,
      align: 'left', lineSpacingMultiple: 1.35,
    });
  });

  // ── 底部总括 ──
  slide.addShape(pptx.ShapeType.line, {
    x: 0.7, y: 6.2, w: 12, h: 0,
    line: { color: C.accent, width: 1 },
  });
  slide.addText('从"改内容"升级到"炼判断"：每一次对话结束后，留下判断的化石，而非只存档终稿', {
    x: 0.7, y: 6.35, w: 12, h: 0.5,
    fontSize: T.bodyB?.size || T.subheading.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.ink, align: 'left', lineSpacingMultiple: 1.3,
  });
};
