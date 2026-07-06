// Slide 12 — 附：出处 & 延伸阅读
module.exports.build = async function(slide, pptx, C, ASSETS) {
  slide.addText('附：出处 & 延伸阅读', {
    x: 0.6, y: 0.4, w: 12, h: 0.7,
    fontSize: 30, fontFace: 'PingFang SC', bold: true, color: C.title, align: 'left',
  });

  // 引用条
  slide.addShape(pptx.ShapeType.rect, {
    x: 0.6, y: 1.3, w: 12.0, h: 0.7,
    fill: { color: C.accent },
    line: { color: C.accent },
  });
  slide.addText('Dwarkesh Podcast × Grant Sanderson (3Blue1Brown) | "AI and the Future of Math" · 2026.06.30', {
    x: 0.85, y: 1.35, w: 11.5, h: 0.6,
    fontSize: 13, fontFace: 'PingFang SC', color: C.white, valign: 'middle',
  });

  // 三栏
  const cols = [
    {
      title: '📺 访谈', color: C.accent,
      items: [
        '主节目: dwarkesh.com/p/grant-sanderson-2',
        'YouTube: youtu.be/TfyPshgMbug',
        '完整时间戳: 8 节 (1h33m)',
      ],
    },
    {
      title: '📄 配套论文', color: '1976D2',
      items: [
        'Erds unit distance 反例论文',
        'arXiv:2605.20695',
        'Timothy Chow: unsolved expository problem',
      ],
    },
    {
      title: '🌱 交叉阅读', color: '2E7D32',
      items: [
        'Grant × Jane Street 数学家访谈',
        '3b1b.co/janestreet',
        'Dwarkesh × Terence Tao (2026.03.20)',
      ],
    },
  ];

  const colW = 3.9, startX = 0.6, gap = 0.3;
  const colY = 2.4;

  cols.forEach((col, i) => {
    const x = startX + i * (colW + gap);
    slide.addShape(pptx.ShapeType.rect, {
      x, y: colY, w: colW, h: 3.8,
      fill: { color: C.white },
      line: { color: col.color, width: 1 },
      rectRadius: 0.08,
      shadow: { type: 'outer', blur: 4, opacity: 0.06, offset: 1, color: '000000' },
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y: colY, w: colW, h: 0.6,
      fill: { color: col.color }, rectRadius: 0.08,
    });
    slide.addShape(pptx.ShapeType.rect, {
      x, y: colY + 0.3, w: colW, h: 0.3, fill: { color: col.color },
    });
    slide.addText(col.title, {
      x, y: colY + 0.05, w: colW, h: 0.55,
      fontSize: 15, fontFace: 'PingFang SC', bold: true, color: C.white,
      align: 'center', valign: 'middle',
    });
    let iy = colY + 0.85;
    col.items.forEach(item => {
      slide.addText(item, {
        x: x + 0.2, y: iy, w: colW - 0.4, h: 0.45,
        fontSize: 10, fontFace: 'PingFang SC', color: C.body, valign: 'middle',
      });
      iy += 0.55;
    });
  });

  // 底部致谢
  slide.addText('PPT generated via CyberPPT skill (MBB methodology + hybrid PPTX workflow) · 2026.07.03', {
    x: 0.6, y: 6.6, w: 12, h: 0.35,
    fontSize: 9, fontFace: 'PingFang SC', color: C.sub, align: 'center',
  });
};
