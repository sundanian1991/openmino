const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, LevelFormat } = require('docx');

const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: 'CCCCCC' };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

const doc = new Document({
  styles: {
    default: { document: { run: { font: 'Arial', size: 24 } } },
    paragraphStyles: [
      { id: 'Title', name: 'Title', basedOn: 'Normal',
        run: { size: 56, bold: true, color: '000000', font: 'Arial' },
        paragraph: { spacing: { before: 240, after: 120 }, alignment: AlignmentType.CENTER } },
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 32, bold: true, color: '000000', font: 'Arial' },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 28, bold: true, color: '000000', font: 'Arial' },
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun('两层保障机制说明')] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '核心诉求：证明作为以电话为主的BPO服务商，做企微运营的风险可控', size: 20 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: '版本：1.0', size: 20 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('一、两层保障机制概览')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('第一层：内部管控制度（自证可控）')] }),
      new Paragraph({ children: [new TextRun({ text: '核心理念', bold: true }), new TextRun(': 主动防控 + 技术保障 + 过程管理')] }),
      new Paragraph({ children: [new TextRun({ text: '三维度保障', bold: true })] }),
      new Table({ columnWidths: [2340, 7020], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '维度', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 7020, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '保障措施', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('制度层面')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('SOP、红线、处罚标准')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('流程层面')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('审批、质检、审计、应急')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('技术层面')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('设备管控、登录监控、数据隔离')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180 }, children: [new TextRun('第二层：供应商管理手段（约束BPO）')] }),
      new Paragraph({ children: [new TextRun({ text: '核心理念', bold: true }), new TextRun(': 合同约束 + 过程监督 + 违规必究 + 优胜劣汰')] }),
      new Paragraph({ children: [new TextRun({ text: '四维度约束', bold: true })] }),
      new Table({ columnWidths: [2340, 7020], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '维度', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 7020, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '约束措施', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('合同约束')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('违约金、连带责任、赔偿条款')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('过程监督')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('月度审计、数据分析、突击检查')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('违规处罚')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('警告→罚款→解约（梯度设计）')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('评级淘汰')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 7020, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('月度评分、分级管理、末位淘汰')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240 }, children: [new TextRun('二、针对三个核心问题的回应')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('2.1 安全&风险问题 → 有机制保障')] }),
      new Table({ columnWidths: [2340, 3510, 3510], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '问题点', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 3510, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '第一层保障', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 3510, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '第二层保障', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('账号安全')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('实名+设备+监控')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('审计+处罚')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('数据安全')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('禁导出+脱敏+留痕')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('重罚+追责')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('合规风险')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('话术规范+行为红线')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('违规必究')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180 }, children: [new TextRun('2.2 服务问题 → 有标准管理')] }),
      new Table({ columnWidths: [2340, 3510, 3510], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '服务维度', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 3510, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '管理标准', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 3510, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '监督机制', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('响应时效')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('5分钟-2小时分级标准')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('实时监控+月度考核')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('服务质量')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('话术规范+态度要求')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('三级质检+满意度调查')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('问题解决')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('限时解决+升级机制')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3510, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('客诉跟踪+闭环管理')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240 }, children: [new TextRun('三、风险控制总结')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('3.1 控制机制完整度')] }),
      new Table({ columnWidths: [2340, 1875, 1875, 1875, 1400], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '风险类别', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1875, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '预防', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1875, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '监控', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1875, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '响应', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1400, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '闭环', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('账号安全')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('数据安全')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('服务品质')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('合规风险')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun('✅')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180 }, children: [new TextRun('3.2 管控强度')] }),
      new Paragraph({ children: [new TextRun({ text: '事前预防', bold: true }), new TextRun(': 制度、培训、备案、审批')] }),
      new Paragraph({ children: [new TextRun({ text: '事中监控', bold: true }), new TextRun(': 登录监控、操作留痕、实时预警')] }),
      new Paragraph({ children: [new TextRun({ text: '事后追责', bold: true }), new TextRun(': 快速响应、调查处理、违规必究')] }),
      new Paragraph({ children: [new TextRun({ text: '持续优化', bold: true }), new TextRun(': 月度审计、数据分析、制度迭代')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180 }, children: [new TextRun('3.3 最终结论')] }),
      new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: '通过两层保障机制，BPO服务商运营企业微信的风险完全可控：', bold: true })] }),
      new Paragraph({ children: [new TextRun('1. 风险有预防 — 制度+技术双重预防')] }),
      new Paragraph({ children: [new TextRun('2. 过程可监控 — 全程留痕+实时预警')] }),
      new Paragraph({ children: [new TextRun('3. 违规必追究 — 梯度处罚+法律追责')] }),
      new Paragraph({ children: [new TextRun('4. 持续在优化 — 月度审计+制度迭代')] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('两层保障机制说明.docx', buffer);
  console.log('Document created: 两层保障机制说明.docx');
});
