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
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun('违规处罚矩阵')] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '配套文件：企业微信运营风险管控制度', size: 20 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: '版本：1.0', size: 20 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('一、处罚总览')] }),
      new Table({ columnWidths: [1875, 3120, 1875, 2490], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1875, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '违规等级', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 3120, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '处罚措施', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1875, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '罚款金额', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 2490, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '触发条件', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('严重')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('解约 + 赔偿 + 追责')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('全额损失')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2490, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('一次触发')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('重度')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('罚款 + 警告 + 暂停')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('5000-20000元')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2490, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('一次触发')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('中度')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('罚款 + 通报 + 加检')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('1000-5000元')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2490, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('月度累计2次')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('轻度')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3120, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('警告 + 培训 + 观察')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('无')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2490, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('月度累计3次')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240 }, children: [new TextRun('二、详细处罚条款')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('2.1 严重违规（解除合作级别）')] }),
      new Table({ columnWidths: [1170, 6550, 1640], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1170, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '序号', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 6550, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '违规行为', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1640, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '处罚措施', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('S-1')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('泄露、售卖客户数据')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('立即解约+全额赔偿+追责')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('S-2')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('私下向客户收款、诈骗')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('立即解约+全额赔偿+报警')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('S-3')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('恶意删除、转移客户资源')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('立即解约+按价赔偿+追责')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('S-4')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('重大负面舆情（影响品牌）')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('立即解约+赔偿品牌损失+追责')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('S-5')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('与竞争对手串通')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('立即解约+全额赔偿+追责')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180 }, children: [new TextRun('2.2 重度违规（高额罚款级别）')] }),
      new Table({ columnWidths: [1170, 6550, 1640], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1170, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '序号', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 6550, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '违规行为', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1640, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '处罚措施', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('H-1')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('私自导出客户数据（未泄露）')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('罚款2万+警告+观察期')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('H-2')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('未授权更换登录设备')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('罚款1万+警告+整改')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('H-3')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('连续3个工作日无响应')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('罚款1万+暂停+换人')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('H-4')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('虚假汇报、隐瞒问题')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('罚款1万+警告+重审')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180 }, children: [new TextRun('2.3 中度违规（中等罚款级别）')] }),
      new Table({ columnWidths: [1170, 6550, 1640], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1170, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '序号', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 6550, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '违规行为', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1640, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '处罚措施', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('M-1')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('话术违规（夸大/诱导/威胁）')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('罚款3千+通报+培训')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('M-2')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('响应超时（单次超时>2小时）')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('罚款1千+通报')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1170, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('M-3')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 6550, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('服务态度问题（被客户投诉）')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1640, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('罚款2千+通报+道歉')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240 }, children: [new TextRun('三、罚款执行细则')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('3.1 罚款上限与下限')] }),
      new Table({ columnWidths: [1875, 1875, 1875, 3735], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1875, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '违规等级', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1875, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '单次下限', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1875, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '单次上限', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 3735, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '月度累计上限', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('严重')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('无下限')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('无上限')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3735, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('-')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('重度')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('5000元')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('20000元')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3735, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('50000元')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('中度')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('1000元')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('5000元')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3735, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('20000元')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('轻度')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('警告')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 1875, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('-')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3735, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('-')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180 }, children: [new TextRun('3.2 申诉机制')] }),
      new Paragraph({ children: [new TextRun('1. 处罚通知后5个工作日内可申诉')] }),
      new Paragraph({ children: [new TextRun('2. 申诉期间处罚先执行')] }),
      new Paragraph({ children: [new TextRun('3. 申诉成功的，3个工作日内退回罚款')] }),
      new Paragraph({ children: [new TextRun('4. 恶意申诉的，双倍处罚')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240 }, children: [new TextRun('四、加重情节')] }),
      new Paragraph({ children: [new TextRun('以下情况从重处罚（罚款×1.5或升级一级）：')] }),
      new Paragraph({ children: [new TextRun('1. 1年内同类违规第2次发生')] }),
      new Paragraph({ children: [new TextRun('2. 发现违规后隐瞒不报')] }),
      new Paragraph({ children: [new TextRun('3. 调查中不配合、提供虚假信息')] }),
      new Paragraph({ children: [new TextRun('4. 违规后推卸责任、拒不整改')] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('违规处罚矩阵.docx', buffer);
  console.log('Document created: 违规处罚矩阵.docx');
});
