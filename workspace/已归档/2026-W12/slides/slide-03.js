// slide-03.js - 养虾三要素
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'content',
  index: 3,
  title: '养虾三要素（核心框架）'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 标题
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.4, w: 9, h: 0.8,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 标题下划线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.1, w: 2.5, h: 0.04,
    fill: { color: theme.accent }
  });

  // 三要素卡片
  const elements = [
    {
      title: "Soul（人设）",
      desc: "定义AI的价值观、语气、身份",
      example: "\"你是一个懒惰的哲学系人物，\n说话常以'哎呀'开头\""
    },
    {
      title: "Skills（技能）",
      desc: "模块化技能包",
      example: "即梦脚本生成器\n商务判断助手\n哲学讨论伙伴"
    },
    {
      title: "记忆（上下文）",
      desc: "将文档、聊天记录喂给AI",
      example: "直播内容向量化\n个人笔记喂入"
    }
  ];

  elements.forEach((el, i) => {
    const x = 0.5 + i * 3.1;

    // 卡片背景
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: 1.4, w: 2.9, h: 3.6,
      fill: { color: "FFFFFF" },
      line: { color: theme.light, width: 1 },
      rectRadius: 0.1
    });

    // 序号
    slide.addText("0" + (i + 1), {
      x: x + 0.15, y: 1.55, w: 0.6, h: 0.4,
      fontSize: 24, fontFace: "Arial",
      color: theme.accent, bold: true
    });

    // 标题
    slide.addText(el.title, {
      x: x + 0.15, y: 2.0, w: 2.6, h: 0.5,
      fontSize: 16, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // 描述
    slide.addText(el.desc, {
      x: x + 0.15, y: 2.5, w: 2.6, h: 0.4,
      fontSize: 12, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });

    // 示例背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.15, y: 3.0, w: 2.6, h: 1.8,
      fill: { color: "F5F2EB" }
    });

    // 示例文字
    slide.addText(el.example, {
      x: x + 0.25, y: 3.1, w: 2.4, h: 1.6,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary, valign: "top"
    });
  });

  // 页码
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("3", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

if (require.main === module) {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';
  const theme = {
    primary: "2D2D2D",
    secondary: "666666",
    accent: "C4B5A3",
    light: "E5E5E5",
    bg: "FAF9F6"
  };
  createSlide(pres, theme);
  pres.writeFile({ fileName: "slide-03-preview.pptx" });
}

module.exports = { createSlide, slideConfig };
