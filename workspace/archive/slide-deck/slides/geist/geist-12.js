// geist-12.js — Content: 标志性元素库（三行布局）
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 12,
  title: '标志性元素库'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape('rect', {
    x: 0, y: 0, w: 0.08, h: 5.625,
    fill: { color: theme.accent }
  });

  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.35, w: 9, h: 0.6,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // === 三行卡片 ===
  const rows = [
    {
      title: '手形符号系统',
      desc: '手形是 Anthropic 设计的核心，象征连接、传递、协作、引导',
      items: ['张开 = 欢迎', '指向 = 引导', '握拳 = 力量', '托举 = 支持']
    },
    {
      title: '手 × 物品组合',
      desc: '手与物品的组合产生语义乘法',
      items: ['手+书籍 = 知识传递', '手+地球 = 全球协作', '手+代码 = 技术创作', '手+植物 = 成长培育']
    },
    {
      title: '自然意象',
      desc: '从自然中提取视觉隐喻',
      items: ['蝴蝶 = 蜕变', '山脉 = 稳定', '蜂巢 = 协作', '水流 = 流动', '树木 = 生长']
    }
  ];

  rows.forEach((row, ri) => {
    const rowY = 1.1 + ri * 1.4;
    const rowH = 1.2;
    const bgColor = ri % 2 === 0 ? theme.bg : "FFFFFF";

    slide.addShape('roundRect', {
      x: 0.4, y: rowY, w: 9, h: rowH,
      fill: { color: bgColor },
      rectRadius: 0.04
    });

    // 左侧强调条
    slide.addShape('rect', {
      x: 0.4, y: rowY, w: 0.05, h: rowH,
      fill: { color: theme.accent }
    });

    // 标题
    slide.addText(row.title, {
      x: 0.65, y: rowY + 0.08, w: 3, h: 0.3,
      fontSize: 15, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // 描述
    slide.addText(row.desc, {
      x: 0.65, y: rowY + 0.38, w: 3, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });

    // 元素列表
    const itemsText = row.items.join('   ·   ');
    slide.addText(itemsText, {
      x: 3.8, y: rowY + 0.15, w: 5.4, h: 0.85,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary, valign: "middle",
      lineSpacingMultiple: 1.4
    });
  });

  // 页码
  slide.addShape('roundRect', {
    x: 9.3, y: 5.15, w: 0.5, h: 0.3,
    fill: { color: theme.light }, rectRadius: 0.05
  });
  slide.addText('12', {
    x: 9.3, y: 5.18, w: 0.5, h: 0.25,
    fontSize: 11, fontFace: "Arial",
    color: theme.secondary, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
