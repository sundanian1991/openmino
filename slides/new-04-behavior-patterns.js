// new-04-behavior-patterns.js - 行为模式拆解
// 设计：Luxury & Mysterious - 冷紫调高端咨询感

const pptxgen = require('pptxgenjs');

const theme = {
  primary: "22223b",
  secondary: "4a4e69",
  accent: "c9ada7",
  light: "9a8c98",
  bg: "f2e9e4"
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 页面标题
  slide.addText('02 行为模式拆解：五拳组合', {
    x: 0.5, y: 0.4, w: 9, h: 0.5,
    fontSize: 24, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 左侧装饰条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.3, y: 0.4, w: 0.12, h: 0.45,
    fill: { color: theme.accent }
  });

  // 五拳组合 - 横向 5 个卡片
  const patterns = [
    {
      num: '01',
      name: '选择性攻击',
      desc: '只攻击服务组，不攻击策略组',
      detail: '激励是策略组定的，但他只说"激励有问题"'
    },
    {
      num: '02',
      name: '群内表演',
      desc: '在群里@所有人，密集同步',
      detail: '"疯狂地说自己在预警"= 强调"我在努力"'
    },
    {
      num: '03',
      name: '道德绑架',
      desc: '用情绪化数字制造恐慌',
      detail: '"影响 1400 个工人、5000 个家庭"'
    },
    {
      num: '04',
      name: '转移视线',
      desc: '把交接期问题转移到激励方案',
      detail: '不说"交接期信息真空"，只说"方案定得高"'
    },
    {
      num: '05',
      name: '保护关系网',
      desc: '不攻击刘伟佳，维护前下属关系',
      detail: '他和刘伟佳关系好，不提策略组配合问题'
    }
  ];

  // 绘制 5 个卡片
  patterns.forEach((item, index) => {
    const x = 0.5 + (index * 1.92);
    const y = 1.1;
    const w = 1.85;
    const h = 3.8;

    // 阴影层
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.03, y: y + 0.04, w: w, h: h,
      fill: { color: "D0D0D0", transparency: 50 },
      rectRadius: 0.08
    });

    // 主卡片
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x, y: y, w: w, h: h,
      fill: { color: "FFFFFF" },
      rectRadius: 0.08
    });

    // 顶部序号背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: w, h: 0.5,
      fill: { color: theme.accent }
    });

    // 序号
    slide.addText(item.num, {
      x: x, y: y, w: w, h: 0.5,
      fontSize: 20, fontFace: "Arial",
      color: "FFFFFF", bold: true,
      align: "center", valign: "middle"
    });

    // 名称
    slide.addText(item.name, {
      x: x + 0.1, y: y + 0.6, w: w - 0.2, h: 0.4,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "center"
    });

    // 描述
    slide.addText(item.desc, {
      x: x + 0.1, y: y + 1.0, w: w - 0.2, h: 0.5,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "center"
    });

    // 详情（虚线框内）
    slide.addShape(pres.shapes.ROUNDED_RECTANGLE, {
      x: x + 0.1, y: y + 1.65, w: w - 0.2, h: 1.9,
      fill: { color: theme.light, transparency: 70 },
      rectRadius: 0.06,
      line: { color: theme.light, width: 1, dashType: "dash" }
    });

    slide.addText(item.detail, {
      x: x + 0.15, y: y + 1.8, w: w - 0.3, h: 1.6,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left", valign: "top"
    });
  });

  // 底部总结条
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 5.1, w: 9, h: 0.35,
    fill: { color: theme.primary, transparency: 10 }
  });

  slide.addText('核心判断：这不是正常的工作方式，让人觉得动机或工作方式有问题', {
    x: 0.7, y: 5.15, w: 8.6, h: 0.25,
    fontSize: 11, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
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

module.exports = { createSlide };
