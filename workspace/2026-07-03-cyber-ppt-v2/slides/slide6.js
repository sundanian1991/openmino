// ═══════════════════════════════════════════════════════════
//  Slide 06 — 偏好 vs 直觉
//  左右镜像对比 + 底部循环失败图
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T }) {
  slide.addText('大多数人在纠偏\n不是在判断', {
    x: 0.5, y: 0.55, w: 12.0, h: 1.2,
    fontSize: 36, fontFace: 'Helvetica Neue', bold: true, color: C.ink,
    align: 'left', lineSpacingMultiple: 1.2,
  });

  // ── 左：偏好 ──
  slide.addText('PREFERENCE  偏好', {
    x: 0.5, y: 1.9, w: 5.5, h: 0.35,
    fontSize: T.sectionLabel.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.green, charSpacing: T.sectionLabel.tracking * 10 * 12,
  });
  slide.addText('显性的主观倾向', {
    x: 0.5, y: 2.3, w: 5.5, h: 0.35,
    fontSize: T.subheading.size, fontFace: 'Helvetica Neue', color: C.ink,
  });
  const prefs = [
    '我喜欢什么风格',
    '不喜欢什么语气',
    '倾向什么表达形式',
  ];
  prefs.forEach((p, i) => {
    slide.addShape(pptx.ShapeType.line, {
      x: 0.65, y: 2.85 + i * 0.35, w: 0.3, h: 0,
      line: { color: C.green, width: 1 },
    });
    slide.addText(p, {
      x: 1.05, y: 2.75 + i * 0.35, w: 4.8, h: 0.3,
      fontSize: T.body.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
    });
  });
  slide.addText('→ 极易被 AI 捕捉学习 → 单次调整即可见效', {
    x: 0.5, y: 3.9, w: 5.5, h: 0.3,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: C.green,
    align: 'left',
  });

  // ── 分割线 ──
  slide.addShape(pptx.ShapeType.line, {
    x: 6.25, y: 1.9, w: 0, h: 3.0,
    line: { color: C.rule, width: 0.75 },
  });

  // ── 右：直觉 ──
  slide.addText('INTUITION  直觉', {
    x: 6.45, y: 1.9, w: 6.8, h: 0.35,
    fontSize: T.sectionLabel.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.accent, charSpacing: T.sectionLabel.tracking * 10 * 12,
  });
  slide.addText('高压缩的隐性判断', {
    x: 6.45, y: 2.3, w: 6.8, h: 0.35,
    fontSize: T.subheading.size, fontFace: 'Helvetica Neue', color: C.ink,
  });
  const intuitions = [
    '"感觉不对"',
    '无法直接陈述',
    '大量关键决策的起点',
  ];
  intuitions.forEach((p, i) => {
    slide.addShape(pptx.ShapeType.line, {
      x: 6.6, y: 2.85 + i * 0.35, w: 0.3, h: 0,
      line: { color: C.accent, width: 1 },
    });
    slide.addText(p, {
      x: 7.0, y: 2.75 + i * 0.35, w: 5.8, h: 0.3,
      fontSize: T.body.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
    });
  });
  slide.addText('→ 无法直接被 AI 理解 → 必须就"感觉不对"向下追问', {
    x: 6.45, y: 3.9, w: 6.8, h: 0.3,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: C.accent,
    align: 'left',
  });

  // ── 底部：错误循环图 ──
  slide.addText('错误循环：把直觉当偏好', {
    x: 0.5, y: 4.55, w: 12, h: 0.4,
    fontSize: T.subheading.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.ink, align: 'left',
  });

  const loop = [
    { t: 'AI 输出',    x: 0.5,  color: C.green, isStart: true },
    { t: '"感觉不对"',  x: 2.5,  color: C.accent },
    { t: '纠偏',       x: 4.2,  color: C.green },
    { t: '新输出',     x: 5.7,  color: C.accent },
    { t: '"还是不对"',  x: 7.4,  color: C.green },
    { t: '纠偏',       x: 9.0,  color: C.accent, isEnd: true },
  ];
  const loopY = 5.1;
  loop.forEach((item, i) => {
    const w = 1.7, h = 0.45;
    slide.addShape(pptx.ShapeType.rect, {
      x: item.x, y: loopY, w, h,
      fill: { color: C.paper },
      line: { color: item.color, width: 0.75 },
      rectRadius: 0,
    });
    slide.addText(item.t, {
      x: item.x + 0.05, y: loopY + 0.04, w: w - 0.1, h: h - 0.08,
      fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: item.color,
      align: 'center', valign: 'middle',
    });
    if (i < loop.length - 1) {
      slide.addShape(pptx.ShapeType.line, {
        x: item.x + w + 0.02, y: loopY + 0.215, w: 0.24, h: 0,
        line: { color: C.rule, width: 1, endArrowType: 'triangle' },
      });
    }
  });
  slide.addText('⟲ 循环无沉淀', {
    x: 11.0, y: loopY - 0.05, w: 2.0, h: 0.55,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: C.accent,
    align: 'center',
  });

  // 底部一行：正确出路
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5, y: 6.05, w: 12.0, h: 0,
    line: { color: C.accent, width: 1 },
  });
  slide.addText('唯一出路：把模糊感受"向下深挖" → 为什么不对 → 背后逻辑 → 什么时候重新评估 → 才能把单次纠偏变成可复用的判断样本', {
    x: 0.5, y: 6.2, w: 12, h: 0.55,
    fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', bold: true, color: C.ink,
    align: 'left', lineSpacingMultiple: 1.3,
  });
};
