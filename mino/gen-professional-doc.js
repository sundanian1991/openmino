const fs = require('fs');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
        AlignmentType, HeadingLevel, BorderStyle, WidthType, ShadingType,
        VerticalAlign, LevelFormat } = require('docx');

const tableBorder = { style: BorderStyle.SINGLE, size: 4, color: 'auto' };
const cellBorders = { top: tableBorder, bottom: tableBorder, left: tableBorder, right: tableBorder };

function createCell(text, options = {}) {
  const { bold = false, shading = false, center = false, header = false } = options;
  return new TableCell({
    borders: cellBorders,
    shading: shading ? { fill: 'D5E8F0', type: ShadingType.CLEAR } : undefined,
    children: [new Paragraph({
      alignment: center ? AlignmentType.CENTER : undefined,
      children: [new TextRun({ text, bold })]
    })]
  });
}

function createRow(cells, options = {}) {
  const { header = false } = options;
  return new TableRow({
    children: cells.map(text => createCell(text, { bold: header, center: true, shading: header }))
  });
}

function createDataRow(cells) {
  return new TableRow({
    children: cells.map(text => createCell(text))
  });
}

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
        paragraph: { spacing: { before: 180, after: 100 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, color: '000000', font: 'Arial' },
        paragraph: { spacing: { before: 140, after: 80 }, outlineLevel: 2 } },
      { id: 'Normal', name: 'Normal',
        run: { font: 'Arial', size: 24 } }
    ]
  },
  numbering: {
    config: [
      { reference: 'bullet-list',
        levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
      { reference: 'numlist-1',
        levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
          style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] }
    ]
  },
  sections: [{
    properties: { page: { margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } },
    children: [
      // 标题
      new Paragraph({ heading: HeadingLevel.TITLE, children: [new TextRun('企业微信BPO运营风险管控体系')] }),
      new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 80 }, children: [
        new TextRun({ text: '版本：V2.0（完整版）', size: 20 }),
        new TextRun({ text: ' | ', size: 20 }),
        new TextRun({ text: '更新日期：2026-03-17', size: 20 })
      ]}),

      // 一、体系概述
      new Paragraph({ heading: HeadingLevel.HEADING_1, children: [new TextRun('一、体系概述')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { after: 100 }, children: [new TextRun('1.1 目的')] }),
      new Paragraph({ children: [new TextRun('为规范BPO服务商企业微信运营行为，建立"内部管控+供应商管理"双层保障机制，有效控制安全、服务、合规三类风险，证明风险可控，特制定本体系。')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { after: 100 }, children: [new TextRun('1.2 适用范围')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('所有开展企业微信客户运营的BPO供应商')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('所有涉及客户数据接触的外包人员')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('全部企业微信账号生命周期管理')] }),

      // 核心原则表格
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { after: 100 }, children: [new TextRun('1.3 核心原则')] }),
      new Table({
        columnWidths: [2340, 7020],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['原则', '说明'], { header: true }),
          createDataRow(['账号归甲方', '所有企业微信账号由甲方统一注册、分配、回收']),
          createDataRow(['数据不落地', '敏感客户数据禁止下载、截图、导出至本地']),
          createDataRow(['全程可审计', '所有操作留痕，支持行为追溯与合规审查']),
          createDataRow(['违规必追责', '分级处罚，重大违规追究连带赔偿责任']),
          createDataRow(['分级管理', '风险分级、处罚分级、响应分级'])
        ]
      }),

      // 两层保障机制
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { after: 100 }, children: [new TextRun('1.4 两层保障机制')] }),
      new Paragraph({ children: [new TextRun({ text: '第一层 - 内部管控制度', bold: true }), new TextRun('：账号管理、数据安全、服务品质、应急响应等全套机制')] }),
      new Paragraph({ children: [new TextRun({ text: '第二层 - 供应商管理手段', bold: true }), new TextRun('：合同约束、审计监督、违规处罚、优胜劣汰等管理措施')] }),

      // 二、风险分类与管控策略
      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 }, children: [new TextRun('二、风险分类与管控策略')] }),

      // 安全风险表格
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { after: 100 }, children: [new TextRun('2.1 安全风险')] }),
      new Table({
        columnWidths: [1755, 1755, 2340, 2340],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['风险点', '具体表现', '第一层管控', '第二层保障'], { header: true }),
          createDataRow(['账号泄露', '密码共享、账号外借', '统一注册+定期换密+登录告警', '审计+处罚']),
          createDataRow(['数据外泄', '客户信息导出、截图外传', '权限分级+审批流程+水印追溯', '重罚+追责']),
          createDataRow(['设备失控', '个人设备登录、离职未清', '设备绑定+离职强制回收', '设备备案+处罚'])
        ]
      }),

      // 服务风险表格
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { after: 100 }, children: [new TextRun('2.2 服务风险')] }),
      new Table({
        columnWidths: [1755, 1755, 2340, 2340],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['风险点', '具体表现', '第一层管控', '第二层保障'], { header: true }),
          createDataRow(['响应延迟', '客户消息超时未回', '实时监控+SLA考核', '超时罚款']),
          createDataRow(['服务质量', '话术不规范、投诉率高', '质检抽检+培训考核', '通报+培训']),
          createDataRow(['人员波动', '离职交接断层', '标准化SOP+知识沉淀', '交接清单+验收'])
        ]
      }),

      // 合规风险表格
      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { after: 100 }, children: [new TextRun('2.3 合规风险')] }),
      new Table({
        columnWidths: [1755, 1755, 2340, 2340],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['风险点', '具体表现', '第一层管控', '第二层保障'], { header: true }),
          createDataRow(['骚扰营销', '频繁群发、客户反感', '频次限制+投诉监控', '违规必究']),
          createDataRow(['虚假宣传', '夸大承诺、误导客户', '话术库审核+违规处罚', '罚款+解约']),
          createDataRow(['资质缺失', '无授权代表甲方承诺', '准入审核+权限边界', '权限管控+审计'])
        ]
      }),

      // 三、第一层：内部管控制度
      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 }, children: [new TextRun('三、第一层：内部管控制度')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('3.1 账号权限分级管理')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun('3.1.1 账号所有权')] }),
      new Paragraph({ children: [new TextRun({ text: '【核心条款】所有企业微信账号归甲方所有，BPO人员仅有使用权。', bold: true })] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('账号由甲方IT部门统一注册、实名认证')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('乙方人员离职时，账号立即回收，不得带走')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('禁止乙方私自注册、注册小号、借用他人账号')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('3.1.2 权限等级划分')] }),
      new Table({
        columnWidths: [1400, 2800, 2100, 3010],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['等级', '权限范围', '适用岗位', '审批要求'], { header: true }),
          createDataRow(['L1-基础', '查看客户、回复消息、打标签', '一线客服', '项目经理审批']),
          createDataRow(['L2-标准', '+群发消息、客户分组', '资深客服', '部门负责人审批']),
          createDataRow(['L3-高级', '+导出报表、修改话术', '主管/质检', '总监审批']),
          createDataRow(['L4-管理', '+账号配置、权限分配', '甲方对接人', '总经理审批'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('3.2 客户数据访问审批')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun('3.2.1 数据分级')] }),
      new Table({
        columnWidths: [1875, 3740, 3745],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['级别', '数据类型', '管控措施'], { header: true }),
          createDataRow(['核心数据', '客户手机号、身份证号、银行卡', '脱敏展示，禁止导出']),
          createDataRow(['重要数据', '客户画像、交易记录、沟通记录', '审批后查看，操作留痕']),
          createDataRow(['一般数据', '客户标签、服务记录、统计报表', '权限内可访问'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('3.2.2 数据导出审批')] }),
      new Paragraph({ children: [new TextRun({ text: '【严格管控】任何客户数据导出必须经过审批：', bold: true })] }),
      new Paragraph({ numbering: { reference: 'numlist-1', level: 0 }, children: [new TextRun('乙方填写《数据导出申请表》，说明用途、范围、期限')] }),
      new Paragraph({ numbering: { reference: 'numlist-1', level: 0 }, children: [new TextRun('甲方项目经理初审（必要性、最小范围原则）')] }),
      new Paragraph({ numbering: { reference: 'numlist-1', level: 0 }, children: [new TextRun('数据安全官复审（合规性、风险评估）')] }),
      new Paragraph({ numbering: { reference: 'numlist-1', level: 0 }, children: [new TextRun('导出文件加密、加水印、设有效期')] }),
      new Paragraph({ numbering: { reference: 'numlist-1', level: 0 }, children: [new TextRun('使用完毕后确认销毁')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('3.3 操作日志审计')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun('3.3.1 日志范围')] }),
      new Paragraph({ children: [new TextRun('系统自动记录以下操作：')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('登录/登出（时间、IP、设备）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('客户信息查看（客户ID、查看时间）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('消息发送（对象、内容、时间）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('数据导出（申请单号、导出内容）')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('权限变更（变更人、变更内容）')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('3.3.2 审计机制')] }),
      new Table({
        columnWidths: [1755, 1750, 1750, 3365],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['审计类型', '频率', '责任人', '处理要求'], { header: true }),
          createDataRow(['实时监控', '7×24小时', '系统', '异常自动告警']),
          createDataRow(['日常巡检', '每日', '安全运营', '检查告警处理']),
          createDataRow(['周期审计', '每周', '合规部门', '抽查操作日志']),
          createDataRow(['专项审计', '不定期', '内审部门', '风险事件追溯'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('3.4 服务品质管理')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun('3.4.1 话术规范')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('必须使用标准话术库')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('禁止使用未经审核的话术')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('禁止夸大宣传、虚假承诺')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('禁止使用诱导性、威胁性语言')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('禁止发送与业务无关的信息')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('3.4.2 响应时效标准')] }),
      new Table({
        columnWidths: [2340, 2340, 4680],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['客户等级', '响应要求', '说明'], { header: true }),
          createDataRow(['VIP客户', '5分钟内', '工作时间9:00-18:00']),
          createDataRow(['普通客户', '30分钟内', '工作时间']),
          createDataRow(['一般咨询', '2小时内', '工作时间']),
          createDataRow(['非工作时间', '次工作日10:00前', '-'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('3.4.3 质检体系')] }),
      new Table({
        columnWidths: [1755, 1875, 2340, 3530],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['级别', '频次', '覆盖范围', '执行方'], { header: true }),
          createDataRow(['一级质检', '每日抽检5%', '随机抽样', '供应商质检组']),
          createDataRow(['二级质检', '每周抽检20%', '问题账号重点覆盖', '我方质检组']),
          createDataRow(['三级质检', '每月全检', '新人、问题人员全覆盖', '双方联合质检'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('3.5 合规培训考核')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('3.5.1 培训体系')] }),
      new Table({
        columnWidths: [2100, 2800, 3500, 3010],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['培训类型', '对象', '内容', '频率'], { header: true }),
          createDataRow(['入职培训', '新入职BPO人员', '账号规范、数据安全、话术标准', '入职必训']),
          createDataRow(['月度培训', '全体运营人员', '案例复盘、新规宣贯', '每月1次']),
          createDataRow(['专项培训', '涉事人员', '违规整改、强化教育', '按需开展'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('3.6 应急响应机制')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('3.6.1 应急分级')] }),
      new Table({
        columnWidths: [1400, 4680, 1870, 2310],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['级别', '定义', '响应时间', '处理时限'], { header: true }),
          createDataRow(['0级（严重）', '数据泄露、账号被盗、恶意删客户、负面舆情', '立即', '2小时']),
          createDataRow(['1级（一般）', '未授权换设备、连续3次不响应、客诉升级', '30分钟', '24小时']),
          createDataRow(['2级（轻微）', '首次轻微违规、操作失误、响应略慢', '2小时', '72小时'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('3.6.2 0级事件处理流程')] }),
      new Paragraph({ numbering: { reference: 'numlist-1', level: 0 }, children: [new TextRun('立即冻结涉事账号')] }),
      new Paragraph({ numbering: { reference: 'numlist-1', level: 0 }, children: [new TextRun('启动应急预案小组')] }),
      new Paragraph({ numbering: { reference: 'numlist-1', level: 0 }, children: [new TextRun('评估损失与影响范围')] }),
      new Paragraph({ numbering: { reference: 'numlist-1', level: 0 }, children: [new TextRun('采取补救措施')] }),
      new Paragraph({ numbering: { reference: 'numlist-1', level: 0 }, children: [new TextRun('追究责任与赔偿')] }),
      new Paragraph({ numbering: { reference: 'numlist-1', level: 0 }, children: [new TextRun('形成事故报告')] }),

      // 四、第二层：供应商运营管理
      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 }, children: [new TextRun('四、第二层：供应商运营管理')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('4.1 准入资质审核')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('4.1.1 基础资质要求')] }),
      new Table({
        columnWidths: [2340, 2340, 4680],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['资质项', '要求', '验证方式'], { header: true }),
          createDataRow(['营业执照', '存续状态，经营范围含客服/外包', '查验原件+工商查询']),
          createDataRow(['人员规模', '坐席数≥50人', '现场核查']),
          createDataRow(['安全认证', 'ISO27001或等保三级', '查验证书']),
          createDataRow(['保密协议', '签署数据保密承诺书', '法务审核']),
          createDataRow(['保险要求', '数据安全责任险≥100万', '查验保单'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('4.1.2 运营能力评估')] }),
      new Table({
        columnWidths: [2100, 4200, 1260],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['评估项', '标准', '权重'], { header: true }),
          createDataRow(['管理经验', '企微运营项目≥1个，时长≥6个月', '20%']),
          createDataRow(['培训体系', '有完善的员工培训SOP', '20%']),
          createDataRow(['技术能力', '有数据监控、质检工具', '20%']),
          createDataRow(['风控意识', '有内部合规检查机制', '20%']),
          createDataRow(['响应速度', '紧急事件30分钟内响应', '20%'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('4.2 月度KPI+实时监控')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('4.2.1 KPI考核体系')] }),
      new Table({
        columnWidths: [1875, 2800, 1875, 2800],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['维度', '指标', '目标值', '权重'], { header: true }),
          createDataRow(['服务质量', '客户满意度', '≥90%', '25%']),
          createDataRow(['', '首次响应时间', '≤30秒', '15%']),
          createDataRow(['', '投诉率', '≤1%', '10%']),
          createDataRow(['运营效率', '消息处理量', '达标值', '15%']),
          createDataRow(['', '有效客户互动率', '≥30%', '10%']),
          createDataRow(['合规安全', '违规事件数', '0起', '15%']),
          createDataRow(['', '培训考试通过率', '100%', '10%'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('4.2.2 评分规则')] }),
      new Table({
        columnWidths: [1755, 2340, 4145],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['得分', '等级', '处理措施'], { header: true }),
          createDataRow(['≥90分', 'A-优秀', '优先派单，奖励机制']),
          createDataRow(['80-89分', 'B-良好', '正常合作']),
          createDataRow(['70-79分', 'C-待改进', '约谈整改，降低派单量']),
          createDataRow(['<70分', 'D-不合格', '暂停合作，限期整改'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('4.2.3 实时监控机制')] }),
      new Table({
        columnWidths: [2100, 3265, 2695],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['监控项', '监控方式', '响应时限'], { header: true }),
          createDataRow(['系统告警', '企业微信后台+自建监控', '5分钟内确认']),
          createDataRow(['客户投诉', '客服系统实时推送', '15分钟内响应']),
          createDataRow(['敏感词触发', '实时内容审核系统', '即时拦截+人工复核']),
          createDataRow(['异常登录', '安全运营中心', '即时冻结+人工核实'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('4.3 阶梯式违约处罚')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun('4.3.1 违规行为分级')] }),
      new Paragraph({ children: [new TextRun({ text: '【严重违规 - S级】', bold: true })] }),
      new Table({
        columnWidths: [935, 5850, 3565],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['序号', '违规行为', '处罚措施'], { header: true }),
          createDataRow(['S-1', '泄露、售卖客户数据', '立即解约 + 全额赔偿 + 法律追责 + 行业通报']),
          createDataRow(['S-2', '私下向客户收款、诈骗', '立即解约 + 全额赔偿 + 法律追责 + 报警']),
          createDataRow(['S-3', '恶意删除、转移客户资源', '立即解约 + 按客户价值赔偿 + 法律追责']),
          createDataRow(['S-4', '重大负面舆情（影响品牌）', '立即解约 + 赔偿品牌损失 + 法律追责']),
          createDataRow(['S-5', '与竞争对手串通', '立即解约 + 全额赔偿 + 法律追责']),
          createDataRow(['S-6', '系统性违规（≥3人同时违规）', '立即解约 + 合同金额30%违约金'])
        ]
      }),

      new Paragraph({ children: [new TextRun({ text: '【重度违规 - H级】', bold: true })] }),
      new Table({
        columnWidths: [935, 4680, 4735],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['序号', '违规行为', '处罚措施'], { header: true }),
          createDataRow(['H-1', '私自导出客户数据（未泄露）', '罚款20000元 + 警告 + 3个月观察期']),
          createDataRow(['H-2', '未授权更换登录设备', '罚款10000元 + 警告 + 责令整改']),
          createDataRow(['H-3', '连续3个工作日无响应', '罚款10000元 + 项目暂停 + 人员更换']),
          createDataRow(['H-4', '虚假汇报、隐瞒问题', '罚款10000元 + 警告 + 重新审计']),
          createDataRow(['H-5', '越权操作（修改配置/权限）', '罚款15000元 + 警告 + 权限收回']),
          createDataRow(['H-6', '客诉升级至我方高层', '罚款20000元 + 警告 + 专项整改'])
        ]
      }),

      new Paragraph({ children: [new TextRun({ text: '【中度违规 - M级】', bold: true })] }),
      new Table({
        columnWidths: [935, 4680, 4735],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['序号', '违规行为', '处罚措施'], { header: true }),
          createDataRow(['M-1', '话术违规（夸大/诱导/威胁）', '罚款3000元 + 通报批评 + 重新培训']),
          createDataRow(['M-2', '响应超时（单次超时>2小时）', '罚款1000元 + 通报']),
          createDataRow(['M-3', '服务态度问题（被客户投诉）', '罚款2000元 + 通报批评 + 道歉']),
          createDataRow(['M-4', '未经审批修改账号配置', '罚款3000元 + 责令恢复 + 通报']),
          createDataRow(['M-5', '质检配合度差（拖延/拒绝）', '罚款2000元 + 强制配合 + 通报']),
          createDataRow(['M-6', '月度评分<70分', '罚款5000元 + 进入观察期'])
        ]
      }),

      new Paragraph({ children: [new TextRun({ text: '【轻度违规 - L级】', bold: true })] }),
      new Table({
        columnWidths: [935, 4680, 4735],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['序号', '违规行为', '处罚措施'], { header: true }),
          createDataRow(['L-1', '首次轻微违规（操作失误）', '警告 + 培训']),
          createDataRow(['L-2', '响应略慢（超时<2小时）', '警告']),
          createDataRow(['L-3', '话术不够规范（未造成影响）', '警告 + 培训']),
          createDataRow(['L-4', '设备备案延迟（<3天）', '警告 + 补办']),
          createDataRow(['L-5', '账号台账更新不及时', '警告 + 补办'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('4.3.2 处罚标准矩阵')] }),
      new Table({
        columnWidths: [1875, 2340, 2340, 2340, 2565],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['违规等级', '首次', '第二次', '第三次', '连带处罚'], { header: true }),
          createDataRow(['轻度（L）', '警告', '警告+培训', '罚款500元', '-']),
          createDataRow(['中度（M）', '罚款1000-5000元', '加倍罚款+通报', '人员更换', '-']),
          createDataRow(['重度（H）', '罚款5000-20000元', '罚款加倍+暂停合作', '解除合作', '赔偿实际损失']),
          createDataRow(['严重（S）', '解除合作', '-', '-', '赔偿损失+追诉法律责任'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('4.4 供应商评级与淘汰')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('4.4.1 月度评分机制（满分100分）')] }),
      new Table({
        columnWidths: [1875, 1875, 5890],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['评分项', '分值', '评分标准'], { header: true }),
          createDataRow(['账号安全', '20分', '无违规20分，轻度违规扣5分，中度扣10分，重度扣20分']),
          createDataRow(['数据安全', '25分', '无泄露25分，违规一次扣10分']),
          createDataRow(['服务品质', '30分', '响应及时率10分+解决率10分+满意度10分']),
          createDataRow(['质检配合', '15分', '配合度15分，不配合一次扣5分']),
          createDataRow(['应急响应', '10分', '及时响应10分，超时一次扣3分'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('4.4.2 评级应用')] }),
      new Table({
        columnWidths: [1875, 2800, 4965],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['评级', '分数范围', '结果'], { header: true }),
          createDataRow(['优秀', '≥90分', '优先合作、扩量倾斜']),
          createDataRow(['合格', '75-89分', '正常合作']),
          createDataRow(['观察期', '60-74分', '增加质检、限期整改']),
          createDataRow(['淘汰', '<60分', '解除合作'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun('4.4.3 淘汰机制')] }),
      new Paragraph({ children: [new TextRun('连续2个月进入观察期且无改善的，立即解除合作。')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('4.5 退出与交接机制')] }),
      new Paragraph({ heading: HeadingLevel.HEADING_3, spacing: { after: 80 }, children: [new TextRun('4.5.1 退出情形')] }),
      new Table({
        columnWidths: [2100, 3740, 3280],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['情形', '说明', '处理时限'], { header: true }),
          createDataRow(['合同到期', '正常到期不续约', '提前30天通知']),
          createDataRow(['KPI不达标', '连续2月C级或1次D级', '即时启动']),
          createDataRow(['严重违规', '触发解除合作条款', '即时生效']),
          createDataRow(['甲方调整', '业务调整/供应商优化', '提前30天通知'])
        ]
      }),

      // 五、执行保障
      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 }, children: [new TextRun('五、执行保障')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('5.1 组织架构')] }),
      new Table({
        columnWidths: [3500, 4680, 2340],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['角色', '职责', '归属'], { header: true }),
          createDataRow(['供应商管理经理', 'KPI制定、月度评估、关系维护', '甲方采购/运营']),
          createDataRow(['安全运营专员', '日志审计、异常监控、告警处理', '甲方安全部门']),
          createDataRow(['合规审计专员', '定期检查、违规调查、整改跟踪', '甲方合规部门']),
          createDataRow(['IT支持专员', '账号开通、权限配置、技术支持', '甲方IT部门'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('5.2 文档配套')] }),
      new Table({
        columnWidths: [4200, 2800, 3520],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['文档名称', '用途', '更新频率'], { header: true }),
          createDataRow(['《BPO供应商准入评估表》', '新供应商准入评估', '按需']),
          createDataRow(['《数据导出申请表》', '数据导出审批', '按需']),
          createDataRow(['《月度KPI评估表》', '供应商月度考核', '每月']),
          createDataRow(['《违规处理通知书》', '违规处罚书面通知', '按需']),
          createDataRow(['《退出交接清单》', '供应商退出交接', '按需'])
        ]
      }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('5.3 合同约束')] }),
      new Paragraph({ children: [new TextRun('主协议中必须包含：')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('本体系作为附件，同等法律效力')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('违约责任：最高可追究合同金额30%的违约金')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('连带责任：供应商对其员工行为承担全部责任')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('赔偿条款：造成损失的，全额赔偿')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('5.4 生效与修订')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('本体系自发布之日起生效')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('每年至少评审修订一次')] }),
      new Paragraph({ numbering: { reference: 'bullet-list', level: 0 }, children: [new TextRun('重大风险事件触发即时修订')] }),

      // 附录
      new Paragraph({ heading: HeadingLevel.HEADING_1, spacing: { before: 240, after: 120 }, children: [new TextRun('附录：快速参考')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun('账号管理口诀')] }),
      new Paragraph({ children: [new TextRun('账号甲方管，离职即回收')] }),
      new Paragraph({ children: [new TextRun('权限分级给，最小够用行')] }),
      new Paragraph({ children: [new TextRun('数据不脱敏，严禁导出外')] }),
      new Paragraph({ children: [new TextRun('操作全留痕，异常即时报')] }),
      new Paragraph({ children: [new TextRun('培训必考试，合格才上岗')] }),
      new Paragraph({ children: [new TextRun('KPI月月评，不合格整改')] }),
      new Paragraph({ children: [new TextRun('违规阶梯罚，重大即出局')] }),
      new Paragraph({ children: [new TextRun('退出要交接，数据全归档')] }),

      new Paragraph({ heading: HeadingLevel.HEADING_2, spacing: { before: 180, after: 100 }, children: [new TextRun('处罚速查表')] }),
      new Table({
        columnWidths: [2340, 3510, 3510],
        margins: { top: 80, bottom: 80, left: 180, right: 180 },
        rows: [
          createRow(['违规类型', '首次处罚', '触发条件'], { header: true }),
          createDataRow(['泄露数据', '解约+赔偿+追责', '一次']),
          createDataRow(['导出数据', '罚款2万+警告', '一次']),
          createDataRow(['换设备', '罚款1万+警告', '一次']),
          createDataRow(['连续失联', '罚款1万+换人', '连续3天']),
          createDataRow(['话术违规', '罚款3千+培训', '月度累计2次']),
          createDataRow(['响应超时', '罚款1千+通报', '月度累计2次']),
          createDataRow(['轻微违规', '警告+培训', '月度累计3次'])
        ]
      }),

      new Paragraph({ spacing: { before: 240 }, alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: '文档编号：WX-BPO-RISK-002', size: 18, italics: true })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: '版本：V2.0', size: 18, italics: true })
      ]}),
      new Paragraph({ alignment: AlignmentType.CENTER, children: [
        new TextRun({ text: '生效日期：2026年3月', size: 18, italics: true })
      ]})
    ]
  }]
});

Packer.toBuffer(doc).then(buffer => {
  fs.writeFileSync('/Users/sundanian/Documents/projects/ai-agents/my-agent/mino/企业微信BPO风险管控体系/正式文档/企业微信BPO运营风险管控体系-V2.0-完整版.docx', buffer);
  console.log('Document created successfully');
}).catch(err => console.error(err));
