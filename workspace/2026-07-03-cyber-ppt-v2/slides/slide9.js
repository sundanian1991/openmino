// ═══════════════════════════════════════════════════════════
//  Slide 09 — 协作公式
//  大字公式 + 下方两格解释 + 认知阶梯
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T }) {
  slide.addText('你的策展密度', {
    x: 0.5, y: 0.55, w: 8, h: 0.55,
    fontSize: 40, fontFace: 'Helvetica Neue', bold: true, color: C.ink, align: 'left',
  });
  slide.addText('= AI 可能性空间的乘数', {
    x: 0.5, y: 1.05, w: 12, h: 0.5,
    fontSize: T.subheading.size, fontFace: 'Helvetica Neue', color: C.accent, align: 'left',
  });

  // 公式大字
  slide.addText('最终价值  =  AI 可能性空间  x  人类策展+判断', {
    x: 0.7, y: 1.85, w: 12, h: 0.7,
    fontSize: 32, fontFace: 'Helvetica Neue', bold: true, color: C.ink, align: 'left',
  });
  // 底部横条强调
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.7, y: 2.5, w: 4.2, h: 0.04,
    fill: { color: C.accent }, line: { type: 'none' },
  });

  // 两格解释
  slide.addText('AI 端', {
    x: 0.7, y: 2.9, w: 5, h: 0.35,
    fontSize: T.subheadingB.size, fontFace: 'Helvetica Neue', bold: true, color: C.green,
  });
  slide.addText('并行生成大量不同路径\n不同结构 / 不同切口 / 不同表达\n\n这些可能性本身不直接产生价值', {
    x: 0.7, y: 3.3, w: 5.3, h: 1.4,
    fontSize: T.body.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
    align: 'left', lineSpacingMultiple: 1.4,
  });

  slide.addText('人类端', {
    x: 6.7, y: 2.9, w: 5, h: 0.35,
    fontSize: T.subheadingB.size, fontFace: 'Helvetica Neue', bold: true, color: C.accent,
  });
  slide.addText('从平行方案中筛选\n砍掉不合适的方向\n保留真正重要的表达\n\n价值跃迁完全依赖这一步', {
    x: 6.7, y: 3.3, w: 6.0, h: 1.4,
    fontSize: T.body.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
    align: 'left', lineSpacingMultiple: 1.4,
  });

  // ── 认知阶梯 ──
  slide.addShape(pptx.ShapeType.line, {
    x: 0.7, y: 5.05, w: 12.0, h: 0,
    line: { color: C.rule, width: 0.5 },
  });
  slide.addText('认知鸿沟三阶梯', {
    x: 0.7, y: 5.2, w: 12, h: 0.35,
    fontSize: T.subheading.size, fontFace: 'Helvetica Neue', bold: true, color: C.ink,
  });

  const steps = [
    { n: 'I',   label: '听懂',         sub: '基础理解',            color: C.mute },
    { n: 'II',  label: '说明白',       sub: '清晰表达',             color: C.amber },
    { n: 'III', label: '让别人听懂',   sub: '找到受众的认知入口',   color: C.accent },
  ];

  const stepW = 3.6, stepH = 1.2;
  steps.forEach((s, i) => {
    const sx = 0.7 + i * (stepW + 0.6);
    // 罗马数字（巨大装饰）
    slide.addText(s.n, {
      x: sx, y: 5.7, w: stepW, h: 0.9,
      fontSize: 40, fontFace: 'Helvetica Neue', bold: true,
      color: s.color, transparency: 20,
    });
    // 标题
    slide.addText(s.label, {
      x: sx, y: 5.75, w: stepW, h: 0.6,
      fontSize: T.subheadingB.size, fontFace: 'Helvetica Neue', bold: true, color: s.color,
      align: 'center',
    });
    // 说明
    slide.addText(s.sub, {
      x: sx, y: 6.25, w: stepW, h: 0.4,
      fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', color: C.mute, align: 'center',
    });
    // 箭头
    if (i < steps.length - 1) {
      slide.addShape(pptx.ShapeType.line, {
        x: sx + stepW + 0.05, y: 6.0, w: 0.5, h: 0,
        line: { color: C.rule, width: 1, endArrowType: 'triangle' },
      });
    }
  });
};
