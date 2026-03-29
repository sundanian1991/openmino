// clean-04-behavior-patterns.js - 行为模式拆解
// 设计：极致简洁白

const pptxgen = require('pptxgenjs');

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  // 顶部红色强调线
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: 0.5, w: 1.5, h: 0.08,
    fill: { color: theme.accent }
  });

  // 标题
  slide.addText('02 行为模式拆解：五拳组合', {
    x: 0.5, y: 0.8, w: 9, h: 0.5,
    fontSize: 20, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true,
    align: "left"
  });

  // 五拳组合 - 横向 5 列
  const patterns = [
    { num: '01', name: '选择性攻击', desc: '只攻击服务组，不攻击策略组', detail: '激励是策略组定的，但他只说"激励有问题"' },
    { num: '02', name: '群内表演', desc: '在群里@所有人，密集同步', detail: '"疯狂地说自己在预警"= 强调"我在努力"' },
    { num: '03', name: '道德绑架', desc: '用情绪化数字制造恐慌', detail: '"影响 1400 个工人、5000 个家庭"' },
    { num: '04', name: '转移视线', desc: '把交接期问题转移到激励方案', detail: '不说"交接期信息真空"，只说"方案定得高"' },
    { num: '05', name: '保护关系网', desc: '不攻击刘伟佳，维护前下属关系', detail: '他和刘伟佳关系好，不提策略组配合问题' }
  ];

  patterns.forEach((item, index) => {
    const x = 0.5 + (index * 1.8);
    const y = 1.4;
    const w = 1.75;
    const h = 3.6;

    // 序号背景
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x, y: y, w: w, h: 0.4,
      fill: { color: theme.primary }
    });

    // 序号
    slide.addText(item.num, {
      x: x, y: y, w: w, h: 0.4,
      fontSize: 14, fontFace: "Arial",
      color: theme.bg, bold: true,
      align: "center", valign: "middle"
    });

    // 名称
    slide.addText(item.name, {
      x: x + 0.1, y: y + 0.5, w: w - 0.2, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true,
      align: "center"
    });

    // 描述
    slide.addText(item.desc, {
      x: x + 0.1, y: y + 0.85, w: w - 0.2, h: 0.45,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "center"
    });

    // 详情框
    slide.addShape(pres.shapes.RECTANGLE, {
      x: x + 0.1, y: y + 1.4, w: w - 0.2, h: 1.95,
      line: { color: theme.light, width: 1 }
    });

    slide.addText(item.detail, {
      x: x + 0.15, y: y + 1.5, w: w - 0.3, h: 1.8,
      fontSize: 8, fontFace: "Microsoft YaHei",
      color: theme.secondary,
      align: "left", valign: "top"
    });
  });

  // 底部总结 + 识别指南
  const summaryY = 5.05;

  // 背景色块
  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0.5, y: summaryY, w: 9, h: 0.35,
    fill: { color: theme.primary }
  });

  slide.addText('核心判断：这不是正常的工作方式，让人觉得动机或工作方式有问题', {
    x: 0.65, y: summaryY, w: 8.7, h: 0.2,
    fontSize: 10, fontFace: "Microsoft YaHei",
    color: theme.bg, bold: true,
    align: "left", valign: "top"
  });

  slide.addText('识别指南：选择性攻击 + 群内表演 + 道德绑架 + 转移视线 + 保护关系网 = 表演型预警', {
    x: 0.65, y: summaryY + 0.18, w: 8.7, h: 0.15,
    fontSize: 9, fontFace: "Microsoft YaHei",
    color: theme.bg,
    align: "left"
  });

  // 页码
  slide.addText('04', {
    x: 9.2, y: 5.25, w: 0.3, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary,
    align: "right"
  });

  return slide;
}

module.exports = { createSlide };
