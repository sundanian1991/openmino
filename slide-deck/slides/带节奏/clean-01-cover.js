// clean-01-cover.js - 封面页
// 设计：极致简洁白 - 纯白背景 + 黑色文字 + 红色强调

const pptxgen = require('pptxgenjs');

const theme = {
  bg: "FFFFFF",
  primary: "000000",
  secondary: "666666",
  accent: "D70015",
  light: "F5F5F5"
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部红色强调线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.6, w: 1.5, h: 0.08,
    fill: { color: theme.accent }
  });

  // 主标题 - 分两行
  slide.addText('如何应对职场"带节奏"', {
    x: 0.5, y: 1.0, w: 7, h: 0.8,
    fontSize: 32, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 副标题
  slide.addText('刘乾坤开门红激励预警事件深度分析', {
    x: 0.5, y: 2.0, w: 8, h: 0.4,
    fontSize: 13, fontFace: "Microsoft YaHei",
    color: theme.secondary,
    align: "left"
  });

  // 信息块（填充空白）
  const infoY = 2.8;
  slide.addText('汇报信息', {
    x: 0.5, y: infoY, w: 9, h: 0.25,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  const infos = [
    { label: '汇报人', value: '年老师' },
    { label: '汇报对象', value: '卞海军 / 刘伟佳 / 王易人' },
    { label: '汇报场景', value: '团队内部沟通 / 向上汇报' },
    { label: '事件时间', value: '2026 年 3 月' }
  ];

  infos.forEach((item, i) => {
    const x = 0.5 + ((i % 2) * 4.5);
    const y = infoY + 0.3 + Math.floor(i / 2) * 0.55;
    slide.addText(item.label + ':', {
      x: x, y: y, w: 4.2, h: 0.2,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left"
    });
    slide.addText(item.value, {
      x: x, y: y + 0.18, w: 4.2, h: 0.22,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary,
      align: "left"
    });
  });

  // 底部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.2, w: 9, h: 0.02,
    fill: { color: theme.light }
  });

  // 页码
  slide.addText('01', {
    x: 9.2, y: 5.1, w: 0.3, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide, theme };
