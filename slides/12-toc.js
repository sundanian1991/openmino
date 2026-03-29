// 12-toc.js - 目录页
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'toc',
  index: 12,
  title: '内容导航',
  chapters: [
    { num: '01', title: '问题背景与行为模式' },
    { num: '02', title: '五大核心应对原则' },
    { num: '03', title: '四种场景的应对话术' },
    { num: '04', title: '观察与判断标准' }
  ]
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题
  slide.addText('内容导航', {
    x: 0.5, y: 0.4, w: 9, h: 0.8,
    fontSize: 36, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 左侧装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 0.4, w: 0.12, h: 0.7,
    fill: { color: theme.accent }
  });

  // 目录项背景装饰
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.5, w: 0.2, h: 3.6,
    fill: { color: theme.accent, transparency: 20 }
  });

  // 目录项
  const chapters = [
    { num: '01', title: '问题背景与行为模式' },
    { num: '02', title: '五大核心应对原则' },
    { num: '03', title: '四种场景的应对话术' },
    { num: '04', title: '观察与判断标准' }
  ];

  chapters.forEach((chapter, index) => {
    const y = 1.7 + (index * 0.9);

    // 章节序号 - 驼色圆形背景
    slide.addShape(pres.shapes.OVAL, {
      x: 0.6, y: y, w: 0.5, h: 0.5,
      fill: { color: theme.accent }
    });
    slide.addText(chapter.num, {
      x: 0.6, y: y, w: 0.5, h: 0.5,
      fontSize: 18, fontFace: "Arial",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    // 章节标题
    slide.addText(chapter.title, {
      x: 1.3, y: y + 0.05, w: 7.5, h: 0.5,
      fontSize: 24, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left", valign: "middle"
    });

    // 分隔线（最后一项不加）
    if (index < chapters.length - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: 1.3, y: y + 0.55, w: 8, h: 0.05,
        line: { color: theme.light, width: 1 }
      });
    }
  });

  // 右下角装饰圆
  slide.addShape(pres.shapes.OVAL, {
    x: 7.5, y: 4.5, w: 2, h: 2,
    fill: { color: theme.accent, transparency: 90 }
  });

  // 页码徽章（第 12 页）
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("12", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

// Standalone preview
if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "22223b",
    secondary: "4a4e69",
    accent: "c9ada7",
    light: "9a8c98",
    bg: "f2e9e4"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "12-toc-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
