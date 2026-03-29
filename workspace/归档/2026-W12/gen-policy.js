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
  numbering: {
    config: [
      { reference: 'policy-num',
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun('企业微信运营风险管控制度')] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '版本：1.0', size: 20 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '适用范围：BPO供应商企业微信运营服务', size: 20 })] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 240 }, children: [new TextRun({ text: '生效日期：2026年__月__日', size: 20 })] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('一、总则')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('1.1 制度目的')] }),
      new Paragraph({ children: [new TextRun('为规范BPO供应商在使用企业微信为客户提供服务过程中的行为，防范安全风险，保障服务品质，保护客户资产安全，特制定本制度。')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('1.2 核心原则')] }),
      new Table({ columnWidths: [2340, 2340, 4680], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '原则', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '内涵', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, verticalAlign: VerticalAlign.CENTER,
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '说明', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('安全第一')] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('账号安全、数据安全优先于一切')] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('全程可控')] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('操作留痕、异常可溯、风险可防')] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('权责对等')] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('权限与职责匹配，违规必究')] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('分级管理')] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('风险分级、处罚分级、响应分级')] })] }),
            new TableCell({ borders: cellBorders, verticalAlign: VerticalAlign.CENTER, children: [new Paragraph({ children: [new TextRun('')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 240 }, children: [new TextRun('1.3 两层保障机制')] }),
      new Paragraph({ children: [new TextRun({ text: '第一层 - 内部管控制度', bold: true }), new TextRun('：本制度规定的账号管理、数据安全、服务品质、应急响应等全套机制')] }),
      new Paragraph({ children: [new TextRun({ text: '第二层 - 供应商管理手段', bold: true }), new TextRun('：合同约束、审计监督、违规处罚、优胜劣汰等管理措施')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240 }, children: [new TextRun('二、账号安全管理')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('2.1 账号注册与实名')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('供应商工作人员使用个人身份信息注册企业微信账号，必须：')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('完成手机号实名验证')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('提供身份证复印件备案')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('签署《账号使用承诺书》')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180 }, children: [new TextRun('2.2 账号使用规范')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('账号使用必须遵守：')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('一人一号：禁止多人共用一个账号')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('本人使用：禁止转借、出租、出售账号')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('专号专用：禁止用工作账号处理私人事务')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180 }, children: [new TextRun('2.3 设备管控')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('工作账号必须在指定设备上登录：')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('登录前进行设备备案（设备号、IMEI）')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('更换设备需提前申请审批')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('异地登录触发预警机制')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240 }, children: [new TextRun('三、数据安全管理')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('3.1 数据使用红线')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('禁止以下数据操作：')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('导出、复制、截屏客户信息')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('通过非授权渠道传输数据')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('在非工作设备上存储客户数据')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('向第三方泄露任何客户信息')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180 }, children: [new TextRun('3.2 操作留痕')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('所有操作必须全程留痕：')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('聊天记录实时上传云端')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('文件传输记录留存')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('操作日志不可篡改')] }),
      new Paragraph({ numbering: { reference: 'policy-num', level: 0 }, children: [new TextRun('留存期不少于180天')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240 }, children: [new TextRun('四、服务品质管理')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('4.1 响应时效标准')] }),
      new Table({ columnWidths: [1400, 2800, 2340, 2820], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1400, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '客户等级', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '响应要求', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 2340, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '说明', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 2820, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('VIP客户')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('5分钟内')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('工作时间9:00-18:00')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2820, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('普通客户')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('30分钟内')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('工作时间')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2820, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('一般咨询')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('2小时内')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2340, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('工作时间')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2820, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240 }, children: [new TextRun('五、应急响应机制')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('5.1 应急分级')] }),
      new Table({ columnWidths: [1400, 2800, 2000, 3160], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1400, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '级别', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 2800, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '定义', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 2000, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '响应时间', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 3160, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '处理时限', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('0级（严重）')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('数据泄露、账号被盗、恶意删客户、负面舆情')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('立即')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3160, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('2小时')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('1级（一般）')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('未授权换设备、连续3次不响应、客诉升级')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('30分钟')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3160, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('24小时')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('2级（轻微）')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2800, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('首次轻微违规、操作失误、响应略慢')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 2000, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('2小时')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3160, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('72小时')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240 }, children: [new TextRun('六、供应商管理手段（第二层保障）')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('6.1 违规处罚矩阵')] }),
      new Paragraph({ children: [new TextRun('违规行为与处罚对应：')] }),
      new Table({ columnWidths: [1400, 4680, 3720], margins: { top: 100, bottom: 100, left: 180, right: 180 },
        rows: [
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 1400, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '违规等级', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 4680, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '违规行为', bold: true })] })] }),
            new TableCell({ borders: cellBorders, shading: { fill: 'D5E8F0', type: ShadingType.CLEAR }, width: { size: 3720, type: WidthType.DXA },
              children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: '处罚措施', bold: true })] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('严重')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('泄露客户数据、私下收款、恶意删除客户')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3720, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('立即解约 + 全额赔偿 + 法律追责')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('重度')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('私自导出数据、未授权换设备、连续3次不响应')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3720, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('罚款5000-20000元 + 警告')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('中度')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('话术违规、响应超时、服务态度问题')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3720, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('罚款1000-5000元 + 通报')] })] })
          ]}),
          new TableRow({ children: [
            new TableCell({ borders: cellBorders, width: { size: 1400, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('轻度')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 4680, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('首次轻微违规、操作失误')] })] }),
            new TableCell({ borders: cellBorders, width: { size: 3720, type: WidthType.DXA }, children: [new Paragraph({ children: [new TextRun('警告 + 培训 + 观察1个月')] })] })
          ]})
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240 }, children: [new TextRun('七、附则')] }),
      new Paragraph({ children: [new TextRun('本制度自双方签字盖章之日起生效，有效期与主协议保持一致。')] }),
      new Paragraph({ children: [new TextRun('本制度未尽事宜，以主协议约定为准。')] }),
      new Paragraph({ children: [new TextRun('本制度解释权归我方所有。')] })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('企业微信运营风险管控制度.docx', buffer);
  console.log('Document created: 企业微信运营风险管控制度.docx');
});
