// swim-01-cover.js - 封面页
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'cover',
  index: 1,
  title: '一天学会游泳',
  subtitle: '蛙泳基础速成训练计划',
  date: '2026-03-29'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }
  });

  // 居中标题
  slide.addText(slideConfig.title, {
    x: 1, y: 2.2, w: 8, h: 0.8,
    fontSize: 40, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true, align: "center"
  });

  // 副标题
  slide.addText(slideConfig.subtitle, {
    x: 1, y: 3.0, w: 8, h: 0.4,
    fontSize: 16, fontFace: "Microsoft YaHei",
    color: theme.secondary, align: "center"
  });

  // 装饰短线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 4.25, y: 3.6, w: 1.5, h: 0.05,
    fill: { color: theme.accent }
  });

  // 日期
  slide.addText(slideConfig.date, {
    x: 1, y: 4.2, w: 8, h: 0.3,
    fontSize: 12, fontFace: "Microsoft YaHei",
    color: theme.light, align: "center"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
