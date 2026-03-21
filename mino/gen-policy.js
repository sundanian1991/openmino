const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, LevelFormat, BorderStyle, WidthType,
        ShadingType, VerticalAlign } = require('docx');
const fs = require('fs');

// 表格边框样式
const tableBorder = { style: BorderStyle.SINGLE, size: 1, color: "000000" };
const cellBorders = {
  top: tableBorder, bottom: tableBorder,
  left: tableBorder, right: tableBorder
};

// 创建表格单元格辅助函数
function createCell(text, options = {}) {
  const {
    bold = false, width = 3000, shading = null,
    align = AlignmentType.LEFT, colSpan = 1
  } = options;

  const cellConfig = {
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    children: [new Paragraph({
      alignment: align,
      children: [new TextRun({ text, bold, size: 21 })]
    })]
  };

  if (shading) {
    cellConfig.shading = { fill: shading, type: ShadingType.CLEAR };
  }
  if (colSpan > 1) {
    cellConfig.columnSpan = colSpan;
  }

  return new TableCell(cellConfig);
}

// 创建多段落单元格
function createMultiLineCell(lines, options = {}) {
  const { width = 3000, shading = null } = options;
  const cellConfig = {
    borders: cellBorders,
    width: { size: width, type: WidthType.DXA },
    verticalAlign: VerticalAlign.CENTER,
    children: lines.map(line => new Paragraph({
      spacing: { before: 60, after: 60 },
      children: [new TextRun({ text: line, size: 21 })]
    }))
  };
  if (shading) {
    cellConfig.shading = { fill: shading, type: ShadingType.CLEAR };
  }
  return new TableCell(cellConfig);
}

const doc = new Document({
  styles: {
    default: {
      document: { run: { font: "SimSun", size: 24 } }
    },
    paragraphStyles: [
      {
        id: "Title",
        name: "Title",
        basedOn: "Normal",
        run: { size: 44, bold: true, font: "SimHei" },
        paragraph: { spacing: { before: 400, after: 400 }, alignment: AlignmentType.CENTER }
      },
      {
        id: "Heading1",
        name: "Heading 1",
        basedOn: "Normal",
        run: { size: 32, bold: true, font: "SimHei" },
        paragraph: { spacing: { before: 400, after: 200 }, outlineLevel: 0 }
      },
      {
        id: "Heading2",
        name: "Heading 2",
        basedOn: "Normal",
        run: { size: 28, bold: true, font: "SimHei" },
        paragraph: { spacing: { before: 300, after: 150 }, outlineLevel: 1 }
      }
    ]
  },
  sections: [{
    properties: {
      page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } }
    },
    children: [
      // 标题
      new Paragraph({
        heading: HeadingLevel.TITLE,
        children: [new TextRun({ text: "企业微信BPO运营风险管控制度", bold: true, size: 44, font: "SimHei" })]
      }),

      // 第一章
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("第一章 总则")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第一条 目的与依据")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "为规范企业微信（以下简称'企微'）在BPO（业务流程外包）场景下的运营行为，有效管控安全风险、服务风险与合规风险，保障客户数据安全与服务质量，特制定本制度。", size: 24 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第二条 适用范围")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "本制度适用于所有承接甲方企微运营业务的BPO供应商及其服务人员。", size: 24 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第三条 基本原则")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: '1. 分层管控原则：建立"内部管控制度+供应商管理"两层保障机制', size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "2. 风险前置原则：准入审核从严，过程监控从紧，退出管理从细", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "3. 责任追溯原则：账号到人、操作留痕、违规必究", size: 24 })]
      }),

      // 第二章
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("第二章 第一层保障：内部管控制度")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第四条 账号权限分级管理")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "1. 甲方统一注册：所有企微账号由甲方统一注册分配，禁止使用个人实名账号", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "2. 权限分级：", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 60 },
        children: [new TextRun({ text: "- L1级（普通坐席）：客户沟通、标准话术回复", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 60 },
        children: [new TextRun({ text: "- L2级（班组长）：客户标签管理、群发消息", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 100 },
        children: [new TextRun({ text: "- L3级（管理员）：账号配置、数据导出审批", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "3. 最小权限原则：按岗位职责分配最低必要权限", size: 24 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第五条 客户数据访问审批")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "1. 数据导出实行审批制：导出客户列表、聊天记录需L3级管理员审批", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "2. 敏感信息脱敏：导出数据涉及手机号、身份证号需脱敏处理", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "3. 审批留痕：所有审批操作记录在案，保存期不少于2年", size: 24 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第六条 敏感操作日志审计")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "1. 审计范围：登录、导出、删除、权限变更等敏感操作", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "2. 审计频率：实时监控+月度抽查", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "3. 异常告警：系统识别异常操作（如批量导出、异地登录）自动告警", size: 24 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第七条 合规培训与考核")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "1. 岗前培训：所有BPO人员上岗前完成企微合规培训并通过考核", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "2. 定期复训：每季度组织一次合规复训", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "3. 考核记录：培训考核记录纳入供应商准入档案", size: 24 })]
      }),

      // 第三章
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("第三章 第二层保障：供应商管理")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第八条 准入资质审核")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "1. 资质要求：", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 60 },
        children: [new TextRun({ text: "- 企业注册资本不低于100万元", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 60 },
        children: [new TextRun({ text: "- 具备信息安全管理体系认证（ISO27001优先）", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 100 },
        children: [new TextRun({ text: "- 近2年无重大信息安全事故", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "2. 实地考察：新供应商准入需通过甲方实地考察", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "3. 试合作期：新供应商设定3个月试合作期，考核通过后转为正式合作", size: 24 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第九条 SLA与KPI考核")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "1. 服务响应时效：", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 60 },
        children: [new TextRun({ text: "- 客户消息首响时间≤5分钟（工作时间）", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 100 },
        children: [new TextRun({ text: "- 客户消息首响时间≤30分钟（非工作时间）", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "2. 服务质量指标：", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 60 },
        children: [new TextRun({ text: "- 客户满意度≥90%", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 60 },
        children: [new TextRun({ text: "- 投诉率≤1%", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 100 },
        children: [new TextRun({ text: "- 合规违规事件0起", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "3. 考核周期：月度考核，季度排名，年度评级", size: 24 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第十条 违约处罚机制")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "处罚分级标准如下表所示：", size: 24 })]
      }),

      // 处罚分级表格
      new Table({
        columnWidths: [2000, 3000, 4000],
        rows: [
          new TableRow({
            tableHeader: true,
            children: [
              createCell("违规级别", { bold: true, width: 2000, shading: "D5E8F0", align: AlignmentType.CENTER }),
              createCell("处罚措施", { bold: true, width: 3000, shading: "D5E8F0", align: AlignmentType.CENTER }),
              createCell("适用情形", { bold: true, width: 4000, shading: "D5E8F0", align: AlignmentType.CENTER })
            ]
          }),
          new TableRow({
            children: [
              createCell("一般违规", { width: 2000, align: AlignmentType.CENTER }),
              createCell("警告+限期整改", { width: 3000 }),
              createMultiLineCell([
                "• 账号共享、密码泄露未造成后果",
                "• 未按时完成合规培训"
              ], { width: 4000 })
            ]
          }),
          new TableRow({
            children: [
              createCell("严重违规", { width: 2000, align: AlignmentType.CENTER }),
              createCell("罚款+暂停业务", { width: 3000 }),
              createMultiLineCell([
                "• 客户数据外泄",
                "• 骚扰营销被客户投诉",
                "• 连续2个月KPI不达标"
              ], { width: 4000 })
            ]
          }),
          new TableRow({
            children: [
              createCell("重大违规", { width: 2000, align: AlignmentType.CENTER }),
              createCell("解约+追偿", { width: 3000 }),
              createMultiLineCell([
                "• 故意泄露客户信息",
                "• 利用企微进行诈骗等违法活动",
                "• 造成重大舆情事件"
              ], { width: 4000 })
            ]
          })
        ]
      }),

      new Paragraph({
        spacing: { before: 200, after: 200 },
        children: [new TextRun({ text: "4. 经济处罚：根据损失程度追偿，最高不超过合同总额的50%", size: 24 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第十一条 退出与交接管理")]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "1. 退出情形：合同到期、提前解约、考核不合格淘汰", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "2. 账号回收：退出时所有企微账号回收，数据归档", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 100 },
        children: [new TextRun({ text: "3. 交接清单：", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 60 },
        children: [new TextRun({ text: "- 客户资料移交（脱敏）", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 60 },
        children: [new TextRun({ text: "- 未完成事项清单", size: 24 })]
      }),
      new Paragraph({
        indent: { left: 480 },
        spacing: { after: 100 },
        children: [new TextRun({ text: "- 账号注销确认", size: 24 })]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "4. 退出审计：对退出供应商进行数据安全审计", size: 24 })]
      }),

      // 第四章
      new Paragraph({
        heading: HeadingLevel.HEADING_1,
        children: [new TextRun("第四章 附则")]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第十二条 制度解释")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "本制度由甲方运营管理部门负责解释。", size: 24 })]
      }),

      new Paragraph({
        heading: HeadingLevel.HEADING_2,
        children: [new TextRun("第十三条 生效日期")]
      }),
      new Paragraph({
        spacing: { after: 200 },
        children: [new TextRun({ text: "本制度自发布之日起施行，原有相关规定与本制度不一致的，以本制度为准。", size: 24 })]
      })
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync("企业微信BPO运营风险管控制度.docx", buffer);
  console.log("Word文档生成成功！");
});
