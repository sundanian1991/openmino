// swim-04-equipment.js - 装备清单
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'table',
  index: 4,
  title: '装备清单'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部装饰线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.05,
    fill: { color: theme.accent }
  });

  // 页面标题
  slide.addText(slideConfig.title, {
    x: 0.5, y: 0.5, w: 9, h: 0.5,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // 左侧：必备装备表
  slide.addText('必备装备', {
    x: 0.5, y: 1.2, w: 4.3, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  // 表格背景
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 1.5, w: 4.3, h: 2.0,
    fill: { color: "FFFFFF" },
    rectRadius: 0.08,
    line: { color: theme.light, width: 1 }
  });

  // 表头
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 1.5, w: 4.3, h: 0.35,
    fill: { color: "FAFAFA" }
  });

  const tableHeader = ['装备', '用途'];
  tableHeader.forEach((item, i) => {
    slide.addText(item, {
      x: 0.5 + i * 2.15, y: 1.55, w: 2.15, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "center", valign: "middle"
    });
  });

  // 表格内容
  const equipment = [
    ['泳衣/泳裤', '下水必须'],
    ['泳帽', '大部分泳池强制'],
    ['泳镜', '水下视线'],
    ['浴巾', '擦干保暖'],
    ['防滑拖鞋', '防止滑倒']
  ];

  equipment.forEach((row, i) => {
    const y = 1.9 + i * 0.32;
    slide.addText(row[0], {
      x: 0.5, y: y, w: 2.15, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary,
      align: "center", valign: "middle"
    });
    slide.addText(row[1], {
      x: 2.65, y: y, w: 2.15, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "center", valign: "middle"
    });
    // 分割线
    if (i < equipment.length - 1) {
      slide.addShape(pres.shapes.LINE, {
        x: 0.5, y: y + 0.3, w: 4.3, h: 0,
        line: { color: theme.light, width: 0.5 }
      });
    }
  });

  // 右侧：建议装备表
  slide.addText('建议装备', {
    x: 5.2, y: 1.2, w: 4.3, h: 0.3,
    fontSize: 14, fontFace: "Microsoft YaHei",
    color: theme.accent, bold: true
  });

  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 5.2, y: 1.5, w: 4.3, h: 2.0,
    fill: { color: "FFF5F2" },
    rectRadius: 0.08,
    line: { color: theme.accent, width: 1 }
  });

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 5.2, y: 1.5, w: 4.3, h: 0.35,
    fill: { color: "FFE8E0" }
  });

  const suggested = [
    ['耳塞', '防止进水'],
    ['鼻夹', '防止呛水'],
    ['浮板', '辅助练习'],
    ['背漂', '增加浮力']
  ];

  suggested.forEach((row, i) => {
    const y = 1.9 + i * 0.4;
    slide.addText(row[0], {
      x: 5.2, y: y, w: 2.15, h: 0.35,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary,
      align: "center", valign: "middle"
    });
    slide.addText(row[1], {
      x: 7.35, y: y, w: 2.15, h: 0.35,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "center", valign: "middle"
    });
  });

  // 底部：其他准备
  slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
    x: 0.5, y: 3.7, w: 9, h: 1.2,
    fill: { color: "FAFAFA" },
    rectRadius: 0.08,
    line: { color: theme.light, width: 1 }
  });

  slide.addText('其他准备', {
    x: 0.7, y: 3.8, w: 8.6, h: 0.25,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.secondary, bold: true
  });

  const otherItems = [
    { label: '洗发水/沐浴露', value: '泳池有消毒水，上岸后要冲洗' },
    { label: '饮用水', value: '游泳消耗体力，及时补水' },
    { label: '换洗衣物', value: '上岸后替换' },
    { label: '塑料袋', value: '装湿衣物' }
  ];

  otherItems.forEach((item, i) => {
    slide.addText(item.label, {
      x: 0.7 + i * 2.25, y: 4.1, w: 2, h: 0.25,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.accent, bold: true
    });
    slide.addText(item.value, {
      x: 0.7 + i * 2.25, y: 4.35, w: 2, h: 0.45,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });
  });

  // 页码徽章
  slide.addShape(pres.shapes.OVAL, {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fill: { color: theme.accent }
  });
  slide.addText("4", {
    x: 9.3, y: 5.1, w: 0.4, h: 0.4,
    fontSize: 12, fontFace: "Arial",
    color: "FFFFFF", bold: true,
    align: "center", valign: "middle"
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
