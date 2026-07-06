// ═══════════════════════════════════════════════════════════
//  Slide 05 — RL 断裂
//  双栏对比 + 反例标签
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T }) {
  slide.addText('"奖赏-惩罚"机制\n在这里会断裂', {
    x: 0.5, y: 0.65, w: 12.0, h: 1.1,
    fontSize: 36, fontFace: 'Helvetica Neue', bold: true, color: C.ink,
    align: 'left', lineSpacingMultiple: 1.2,
  });

  // 左侧：RL 成功模式
  slide.addText('① 编程：即时验证', {
    x: 0.5, y: 2.0, w: 5.5, h: 0.4,
    fontSize: T.subheadingB.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.green,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5, y: 2.4, w: 0.5, h: 0,
    line: { color: C.green, width: 1 },
  });
  slide.addText('写代码 → 跑 → 结果对错即现\n→ reward 信号实时产生\n→ 模型能快速迭代优化', {
    x: 0.5, y: 2.55, w: 5.5, h: 1.2,
    fontSize: T.body.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
    align: 'left', lineSpacingMultiple: 1.5,
  });
  slide.addText('本质：短周期 · 可量化 · source of truth 确定', {
    x: 0.5, y: 3.9, w: 5.5, h: 0.3,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: C.green,
  });

  // 分割竖线
  slide.addShape(pptx.ShapeType.line, {
    x: 6.65, y: 1.9, w: 0, h: 5.0,
    line: { color: C.rule, width: 1, dashType: 'dash' },
  });

  // 右侧：RL 失败模式
  slide.addText('② 造山：百年验证', {
    x: 6.85, y: 2.0, w: 6.5, h: 0.4,
    fontSize: T.subheadingB.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.accent,
  });
  slide.addShape(pptx.ShapeType.line, {
    x: 6.85, y: 2.4, w: 0.5, h: 0,
    line: { color: C.accent, width: 1 },
  });
  slide.addText('直觉 → 论文 → 被拒 → 死后 N 年\n→ 读懂 → 再 N 年 → 物理学跟进\n→ 等到 200 年后才被验证', {
    x: 6.85, y: 2.55, w: 6.5, h: 1.2,
    fontSize: T.body.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
    align: 'left', lineSpacingMultiple: 1.5,
  });
  slide.addText('本质：长周期 · 不可量化 · reward 信号是 "No good"', {
    x: 6.85, y: 3.9, w: 6.5, h: 0.3,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: C.accent,
  });

  // 中央：决裂符号标签
  slide.addText('VERIFI\nCATION\nBREAK', {
    x: 6.05, y: 1.9, w: 1.0, h: 5.0,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', bold: true, color: C.mute,
    align: 'center', valign: 'middle',
  });

  // 底部：反例标签
  slide.addText('CASE  望月新一的 abc 猜想证明 — "Inter-universal geometry" — 一种"外星数学"', {
    x: 0.5, y: 4.7, w: 12, h: 0.35,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', color: C.mute,
    charSpacing: 40,
  });
  slide.addText('数学界爬了多年的山，最后发现不对；平行对照：Copernicus vs Ptolemy — 日心说初期反而不准但认识论更优越 → 这种"好但暂时不准" 无法放进 RL reward 函数', {
    x: 0.5, y: 5.1, w: 12, h: 0.9,
    fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
    align: 'left', lineSpacingMultiple: 1.35,
  });

  // 底部高亮结论
  slide.addText('RLVR 训练：奖励短期可验证的结果  vs  Galois 式洞见 需要等 200 年才在粒子物理中兑现价值', {
    x: 0.5, y: 6.4, w: 12, h: 0.6,
    fontSize: T.body.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.accent, align: 'left',
  });
};
