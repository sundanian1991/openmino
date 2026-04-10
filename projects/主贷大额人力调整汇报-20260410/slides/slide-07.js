// slide-07.js — Summary & Next Steps
const pptxgen = require("pptxgenjs");

const slideConfig = {
  type: 'summary',
  index: 7,
  title: '下一步行动计划'
};

function createSlide(pres, theme) {
  const slide = pres.addSlide();
  slide.background = { color: theme.bg };

  slide.addShape(pres.shapes.RECTANGLE, {
    x: 0, y: 0, w: 10, h: 0.04,
    fill: { color: theme.accent }
  });

  // Title
  slide.addText(slideConfig.title, {
    x: 0.8, y: 0.3, w: 6, h: 0.5,
    fontSize: 28, fontFace: "Microsoft YaHei",
    color: theme.primary, bold: true
  });

  // Summary row - 4 KPI cards
  const kpis = [
    { val: '355', lbl: '总人力', desc: '调整后全量' },
    { val: '40', lbl: '增信老客', desc: '赛马减量优化' },
    { val: '275', lbl: '拉新', desc: '转入+新增双驱动' },
    { val: '40', lbl: '采购融资', desc: '宽进严出测试' }
  ];

  kpis.forEach((kp, i) => {
    const cx = 0.8 + i * 2.3;
    const cy = 1.0;

    slide.addShape(pres.shapes.RECTANGLE, {
      x: cx, y: cy, w: 2.1, h: 0.8,
      fill: { color: i === 0 ? theme.accent : 'FFFFFF' },
      rectRadius: 0.03,
      line: { color: i === 0 ? theme.accent : theme.light, width: i === 0 ? 0 : 0.5 }
    });

    slide.addText(kp.val, {
      x: cx, y: cy + 0.05, w: 2.1, h: 0.4,
      fontSize: 28, fontFace: "Arial",
      color: i === 0 ? 'FFFFFF' : theme.primary,
      bold: true, align: "center"
    });

    slide.addText(kp.lbl, {
      x: cx, y: cy + 0.45, w: 2.1, h: 0.3,
      fontSize: 11, fontFace: "Microsoft YaHei",
      color: i === 0 ? 'FFFFFF' : theme.secondary, align: "center"
    });
  });

  // Action items
  const actions = [
    {
      num: '01',
      title: '确认人力调整方案',
      desc: '与军哥确认三板块人力调整方案，批复后启动执行',
      urgency: '紧急',
      urgent: true
    },
    {
      num: '02',
      title: '新动力/汇讯增信→拉新转岗',
      desc: '协调 20 名人员从增信老客转入拉新板块，完成业务切换和培训',
      urgency: '高',
      urgent: true
    },
    {
      num: '03',
      title: '拉新 20 人新增落地',
      desc: '按赛马排名向汇讯(+8)、锦瑞(+6)、德辰(+4)、新动力(+2)分配新增编制',
      urgency: '高',
      urgent: false
    },
    {
      num: '04',
      title: '采购融资新准入启动',
      desc: '从金企融合渠道筛选 3 家新供应商，每配置 8 人进入测试，7 月启动淘汰机制',
      urgency: '中',
      urgent: false
    },
    {
      num: '05',
      title: '赛马机制跟踪',
      desc: '建立拉新板块赛马排名监控，确保新增人员按排名动态分配',
      urgency: '中',
      urgent: false
    }
  ];

  const startY = 2.0;
  actions.forEach((a, i) => {
    const rowY = startY + i * 0.72;

    // Row background
    if (i % 2 === 1) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 0.8, y: rowY, w: 8.4, h: 0.72,
        fill: { color: theme.light }
      });
    }

    // Number badge
    slide.addShape(pres.shapes.OVAL, {
      x: 0.9, y: rowY + 0.13, w: 0.4, h: 0.4,
      fill: { color: a.urgent ? theme.accent : theme.primary }
    });

    slide.addText(a.num, {
      x: 0.9, y: rowY + 0.13, w: 0.4, h: 0.4,
      fontSize: 12, fontFace: "Arial",
      color: 'FFFFFF', bold: true, align: "center", valign: "middle"
    });

    // Title
    slide.addText(a.title, {
      x: 1.5, y: rowY + 0.05, w: 5.5, h: 0.3,
      fontSize: 14, fontFace: "Microsoft YaHei",
      color: theme.primary, bold: true
    });

    // Urgency badge
    const urgencyColor = a.urgent ? 'B85450' : '8d99ae';
    slide.addShape(pres.shapes.RECTANGLE, {
      x: 7.2, y: rowY + 0.08, w: 0.6, h: 0.22,
      fill: { color: urgencyColor }, rectRadius: 0.03
    });
    slide.addText(a.urgency, {
      x: 7.2, y: rowY + 0.05, w: 0.6, h: 0.25,
      fontSize: 9, fontFace: "Microsoft YaHei",
      color: 'FFFFFF', bold: true, align: "center", valign: "middle"
    });

    // Description
    slide.addText(a.desc, {
      x: 1.5, y: rowY + 0.35, w: 7.2, h: 0.35,
      fontSize: 10, fontFace: "Microsoft YaHei",
      color: theme.secondary
    });

    // Divider
    if (i < actions.length - 1) {
      slide.addShape(pres.shapes.RECTANGLE, {
        x: 1.5, y: rowY + 0.72, w: 7.2, h: 0.01,
        fill: { color: 'e5e5e5' }
      });
    }
  });

  // Footer note
  slide.addText('注：本方案基于赛马排名数据制定，后续将根据实际业绩动态调整', {
    x: 0.8, y: 5.0, w: 7, h: 0.3,
    fontSize: 9, fontFace: "Microsoft YaHei",
    color: '8d99ae'
  });

  // Page badge
  slide.addText('7', {
    x: 9.3, y: 5.1, w: 0.5, h: 0.3,
    fontSize: 10, fontFace: "Arial",
    color: theme.secondary, align: "center",
    fill: { color: theme.light }
  });

  return slide;
}

module.exports = { createSlide, slideConfig };
