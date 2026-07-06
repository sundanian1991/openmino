// ═══════════════════════════════════════════════════════════
//  Slide 12 — 出处 & 延伸阅读
//  极简左对齐三栏资源列表
// ═══════════════════════════════════════════════════════════
module.exports.build = async function(slide, pptx, { C, T }) {
  slide.addText('附', {
    x: 0.5, y: 0.55, w: 8, h: 0.55,
    fontSize: 40, fontFace: 'Helvetica Neue', bold: true, color: C.ink, align: 'left',
  });
  slide.addText('出处 & 延伸阅读', {
    x: 0.5, y: 1.1, w: 12, h: 0.5,
    fontSize: T.subheading.size, fontFace: 'Helvetica Neue', color: C.accent, align: 'left',
  });

  // 原始出处
  slide.addShape(pptx.ShapeType.line, {
    x: 0.5, y: 1.8, w: 12.3, h: 0,
    line: { color: C.accent, width: 1 },
  });
  slide.addText('PRIMARY SOURCE', {
    x: 0.5, y: 1.9, w: 12, h: 0.3,
    fontSize: T.sectionLabel.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.accent, charSpacing: T.sectionLabel.tracking * 10 * 12,
  });
  slide.addText('Dwarkesh Podcast x Grant Sanderson (3Blue1Brown)', {
    x: 0.5, y: 2.2, w: 12, h: 0.4,
    fontSize: T.subheadingB.size, fontFace: 'Helvetica Neue', bold: true, color: C.ink,
  });
  slide.addText('"AI and the Future of Math"  ·  2026.06.30  ·  1h33m  ·  8 topics', {
    x: 0.5, y: 2.6, w: 12, h: 0.3,
    fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
  });
  slide.addText('URL: dwarkesh.com/p/grant-sanderson-2  ·  youtube.com/watch?v=TfyPshgMbug', {
    x: 0.5, y: 2.9, w: 12, h: 0.25,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', color: C.mute,
  });

  // 时间戳结构
  const topics = [
    '00:00  AI is discovering new proofs',
    '00:11  Verification loop: a century long',
    '00:26  Would we understand an AI proof',
    '00:38  Hidden bridges between fields',
    '00:53  Why real-world tasks don\'t fit RL',
    '01:07  Writing needs theory of mind',
    '01:16  Learning depends on human curation',
  ];

  const colW = 3.9, startX = 0.5, gap = 0.45;
  topics.forEach((t, i) => {
    const col = Math.floor(i / 3);
    const row = i % 3;
    const x = startX + col * (colW + gap);
    const y = 3.4 + row * 0.35;
    slide.addText(t, {
      x, y, w: colW, h: 0.3,
      fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', color: C.inkSoft,
    });
  });

  // 交叉阅读
  slide.addText('CROSS REFERENCES', {
    x: 5.5, y: 3.4, w: 7, h: 0.3,
    fontSize: T.sectionLabel.size, fontFace: 'Helvetica Neue', bold: true,
    color: C.accent, charSpacing: T.sectionLabel.tracking * 10 * 12,
  });

  const refs = [
    { w: 'Dwarkesh x Terence Tao',         d: '2026.03.20, "Kepler, Newton, and mathematical discovery"' },
    { w: 'Grant x Jane Street Mathematicians', d: '3b1b.co/janestreet, Jane Street 访谈' },
    { w: 'Erdos Unit Distance disproof',    d: 'arXiv:2605.20695 (9 co-authors)' },
    { w: 'Grant: "AI that solved IMO"',     d: 'Substack, 2025.08.17' },
  ];
  refs.forEach((r, i) => {
    slide.addText(r.w, {
      x: 5.5, y: 3.75 + i * 0.35, w: 4.0, h: 0.3,
      fontSize: T.bodySm.size, fontFace: 'Helvetica Neue', bold: true, color: C.ink,
    });
    slide.addText(r.d, {
      x: 9.5, y: 3.75 + i * 0.35, w: 3.3, h: 0.3,
      fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', color: C.mute,
    });
  });

  // 底部致谢
  slide.addShape(pptx.ShapeType.line, {
    x: 0, y: 5.35, w: 13.333, h: 0,
    line: { color: C.ink, width: 0.5 },
  });
  slide.addText('本 PPT 内容基于 Dwarkesh Patel 对 Grant Sanderson (3Blue1Brown) 的访谈 (2026.06.30) + 原素材  ·  视觉: 瑞士国际主义 x 编辑杂志', {
    x: 0.5, y: 5.5, w: 12.3, h: 0.4,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', color: C.mute,
    align: 'left',
  });

  // 杂志刊尾
  slide.addText('METHODOLOGY  ·  CyberPPT Skill (MBB + Hybrid PPTX)  ·  Design based on Swiss International Typographic Style', {
    x: 0.5, y: 6.8, w: 12.3, h: 0.35,
    fontSize: T.bodyXs.size, fontFace: 'Helvetica Neue', color: C.mute,
    align: 'center', charSpacing: 40,
  });
};
