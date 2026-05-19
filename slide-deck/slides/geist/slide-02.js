// slide-02.js - 目录页 (Card-Based TOC)
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'toc',
  index: 2,
  title: '目录'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部陶土色装饰线
  slide.addShape('rect', {
    x: 0, y: 0, w: 10, h: 0.033,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });

  // 页面标题 "目录"
  slide.addText('目录', {
    x: 0.5, y: 0.5, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "left"
  });

  // 4 张卡片数据
  const sections = [
    {
      num: '01',
      title: '风格 DNA',
      desc: '人文温度 \u00D7 技术精度 \u00D7 极简克制'
    },
    {
      num: '02',
      title: '色彩系统',
      desc: '陶土色家族与无障碍规范'
    },
    {
      num: '03',
      title: '线条与构图',
      desc: '手绘规则与网格系统'
    },
    {
      num: '04',
      title: '实战应用',
      desc: 'Prompt 模板与检查清单'
    }
  ];

  // 卡片尺寸与间距
  const cardW = 2.05;
  const cardH = 2.8;
  const cardGap = 0.2;
  const totalW = sections.length * cardW + (sections.length - 1) * cardGap;
  const startX = (10 - totalW) / 2;
  const startY = 1.6;

  sections.forEach(function (section, i) {
    var cx = startX + i * (cardW + cardGap);

    // 卡片背景（白色 + 微阴影）
    slide.addShape('rect', {
      x: cx,
      y: startY,
      w: cardW,
      h: cardH,
      fill: { color: "FFFFFF" },
      line: { color: "FFFFFF", width: 0 },
      rectRadius: 0.05,
      shadow: {
        type: "outer",
        blur: 6,
        offset: 2,
        color: "000000",
        opacity: 0.08
      }
    });

    // 卡片顶部主题色细线
    slide.addShape('rect', {
      x: cx,
      y: startY,
      w: cardW,
      h: 0.04,
      fill: { color: theme.accent },
      line: { color: theme.accent, width: 0 },
      rectRadius: 0
    });

    // 章节编号
    slide.addText(section.num, {
      x: cx + 0.2,
      y: startY + 0.3,
      w: cardW - 0.4,
      h: 0.6,
      fontSize: 28,
      fontFace: "Microsoft YaHei",
      color: theme.accent,
      bold: true,
      align: "left"
    });

    // 章节标题
    slide.addText(section.title, {
      x: cx + 0.2,
      y: startY + 1.0,
      w: cardW - 0.4,
      h: 0.5,
      fontSize: 16,
      fontFace: "Microsoft YaHei",
      color: theme.primary,
      bold: true,
      align: "left"
    });

    // 描述文字
    slide.addText(section.desc, {
      x: cx + 0.2,
      y: startY + 1.6,
      w: cardW - 0.4,
      h: 0.9,
      fontSize: 11,
      fontFace: "Microsoft YaHei",
      color: theme.light,
      align: "left",
      valign: "top"
    });
  });

  // 页码圆形徽章
  slide.addShape('ellipse', {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent },
    line: { color: theme.accent, width: 0 }
  });
  slide.addText('02', {
    x: 9.3, y: 5.15, w: 0.4, h: 0.35,
    fontSize: 11, fontFace: "Arial",
    color: "FFFFFF", align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
