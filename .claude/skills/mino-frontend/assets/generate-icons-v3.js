/**
 * 手绘风格 SVG 图标生成器 v3
 * 第二批 100 个图标 - 更精细的手绘风格
 * 设计原则：
 * 1. 线条为主（炭灰色 #3D2C29）
 * 2. 陶土色点缀（#E2725B）- 小面积装饰
 * 3. 不使用 opacity 淡化
 * 4. 更精细的手绘 path
 */

const fs = require('fs');
const path = require('path');

const outDir = path.join(__dirname, 'icons-v2');
if (!fs.existsSync(outDir)) fs.mkdirSync(outDir);

// SVG 模板
const svgStart = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
  <style>
    .stroke { fill: none; stroke: #3D2C29; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
    .fill { fill: #E2725B; stroke: none; }
    .stroke-fill { fill: #E2725B; stroke: #3D2C29; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
  </style>
`;

const createSVG = (content) => `${svgStart}  ${content}\n</svg>`;

// ===== 图标定义 =====
const icons = {
  // ---- 金融电销营销类 (30个) ----
  '坐席': `<circle class="fill" cx="24" cy="12" r="6"/><path class="stroke" d="M12 38 C12 28 36 28 36 38"/><path class="stroke" d="M20 18 Q24 22 28 18"/><rect class="fill" x="21" y="32" width="6" height="4" rx="1"/>`,

  '话术': `<rect class="stroke" x="8" y="6" width="32" height="36" rx="3"/><path class="stroke" d="M14 14 h20 M14 22 h16 M14 30 h12"/><circle class="fill" cx="34" cy="34" r="4"/>`,

  '拨打': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M20 18 L28 24 L20 30"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '接通': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M18 20 L26 24 L18 28"/><path class="fill" d="M30 20 L34 24 L30 28 Z"/>`,

  '挂断': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M18 18 L30 30 M30 18 L18 30"/><circle class="fill" cx="24" cy="24" r="2"/>`,

  '首call': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M24 14 L24 24 L32 28"/><circle class="fill" cx="24" cy="14" r="3"/><text class="fill" x="16" y="38" font-size="8" font-weight="bold">1st</text>`,

  '重拨': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M20 20 L28 24 L20 28"/><path class="stroke" d="M30 16 A8 8 0 1 1 30 32"/><circle class="fill" cx="20" cy="24" r="2"/>`,

  '有效call': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M16 24 L22 30 L32 18"/><circle class="fill" cx="22" cy="30" r="3"/>`,

  '无效call': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M18 18 L30 30 M30 18 L18 30"/><circle class="fill" cx="18" cy="18" r="2"/>`,

  '获客': `<path class="stroke" d="M24 4 L28 16 L40 16 L30 24 L34 36 L24 28 L14 36 L18 24 L8 16 L20 16 Z"/><circle class="fill" cx="24" cy="20" r="4"/>`,

  '进件': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M16 20 L24 28 L32 20"/><circle class="fill" cx="24" cy="28" r="3"/>`,

  '进件审批': `<rect class="stroke" x="8" y="8" width="28" height="32" rx="2"/><path class="stroke" d="M40 20 L40 36 L32 32 L32 24 Z"/><path class="stroke" d="M14 20 L22 28 L30 20"/><circle class="fill" cx="22" cy="28" r="3"/>`,

  '拒件': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M16 16 L32 32 M32 16 L16 32"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '批贷': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M16 24 L22 30 L32 18"/><circle class="fill" cx="22" cy="30" r="3"/>`,

  '放款': `<rect class="stroke" x="8" y="10" width="32" height="28" rx="3"/><path class="stroke" d="M16 10 L16 6 L32 6 L32 10"/><path class="stroke" d="M18 24 L30 24"/><circle class="fill" cx="30" cy="24" r="3"/>`,

  '提款': `<rect class="stroke" x="8" y="10" width="32" height="28" rx="3"/><path class="stroke" d="M24 18 L24 30 M18 24 L24 18 L30 24"/><circle class="fill" cx="24" cy="18" r="3"/>`,

  '还款': `<rect class="stroke" x="8" y="10" width="32" height="28" rx="3"/><path class="stroke" d="M24 30 L24 18 M18 24 L24 30 L30 24"/><circle class="fill" cx="24" cy="30" r="3"/>`,

  '逾期': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M24 14 L24 24 L30 28"/><path class="fill" d="M36 8 L40 12 L38 14 L34 10 Z"/>`,

  '催收': `<circle class="stroke" cx="20" cy="20" r="12"/><path class="stroke" d="M30 30 L40 40"/><path class="stroke" d="M16 16 L24 24"/><circle class="fill" cx="20" cy="20" r="3"/>`,

  '卡激活': `<rect class="stroke" x="8" y="12" width="32" height="24" rx="3"/><path class="stroke" d="M8 20 L40 20"/><path class="stroke" d="M16 30 L28 30"/><circle class="fill" cx="14" cy="30" r="2"/>`,

  '分期': `<rect class="stroke" x="8" y="12" width="32" height="24" rx="3"/><path class="stroke" d="M8 20 L40 20"/><rect class="fill" x="12" y="26" width="8" height="4" rx="1"/>`,

  '提额': `<rect class="stroke" x="8" y="12" width="32" height="24" rx="3"/><path class="stroke" d="M8 20 L40 20"/><path class="stroke" d="M24 24 L24 32 M20 28 L24 24 L28 28"/><circle class="fill" cx="24" cy="24" r="2"/>`,

  '销户': `<rect class="stroke" x="8" y="12" width="32" height="24" rx="3"/><path class="stroke" d="M8 20 L40 20"/><path class="stroke" d="M18 28 L30 28"/><circle class="fill" cx="18" cy="28" r="2"/>`,

  '标签': `<path class="stroke" d="M8 8 L24 8 L40 24 L24 40 L8 40 Z"/><circle class="fill" cx="16" cy="18" r="4"/>`,

  '线索': `<path class="stroke" d="M24 4 L28 12 L38 12 L30 20 L32 30 L24 24 L16 30 L18 20 L10 12 L20 12 Z"/><circle class="fill" cx="24" cy="16" r="3"/>`,

  '商机': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M24 14 L26 22 L32 24 L26 26 L24 34 L22 26 L16 24 L22 22 Z"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '意向客户': `<circle class="stroke" cx="24" cy="16" r="10"/><path class="stroke" d="M10 42 Q24 30 38 42"/><circle class="fill" cx="24" cy="16" r="4"/>`,

  '成交': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M16 24 L22 30 L32 18"/><circle class="fill" cx="24" cy="24" r="4"/>`,

  '未成交': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M18 18 L30 30 M30 18 L18 30"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '回访': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M20 20 L28 24 L20 28"/><path class="stroke" d="M32 16 A8 8 0 0 1 32 32"/><circle class="fill" cx="20" cy="24" r="2"/>`,

  // ---- 供应商生命周期类 (25个) ----
  '需求发起': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M24 14 L24 34 M14 24 L34 24"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '市场调研': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M24 8 L24 40 M8 24 L40 24"/><path class="stroke" d="M14 14 Q24 8 34 14"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '招标邀请': `<rect class="stroke" x="8" y="6" width="32" height="36" rx="2"/><path class="stroke" d="M14 14 L34 14 M14 22 L28 22 M14 30 L24 30"/><circle class="fill" cx="34" cy="30" r="4"/>`,

  '投标响应': `<rect class="stroke" x="8" y="8" width="28" height="32" rx="2"/><path class="stroke" d="M40 12 L40 36 L36 40 L32 36 L32 12 L36 8 Z"/><circle class="fill" cx="36" cy="24" r="3"/>`,

  '开标': `<rect class="stroke" x="8" y="10" width="32" height="28" rx="2"/><path class="stroke" d="M8 10 L24 4 L40 10"/><path class="stroke" d="M16 20 L32 20 M16 28 L28 28"/><circle class="fill" cx="24" cy="18" r="3"/>`,

  '评标': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M14 18 L22 26 L34 14"/><circle class="fill" cx="22" cy="26" r="3"/>`,

  '中标': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M16 24 L22 30 L34 16"/><circle class="fill" cx="22" cy="30" r="3"/>`,

  '未中标': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M18 18 L30 30 M30 18 L18 30"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '签约谈判': `<path class="stroke" d="M8 32 L16 24 L24 28 L32 20 L40 28"/><rect class="stroke" x="16" y="34" width="16" height="8" rx="1"/><circle class="fill" cx="24" cy="26" r="3"/>`,

  '入场培训': `<circle class="fill" cx="24" cy="12" r="6"/><path class="stroke" d="M12 36 C12 26 36 26 36 36"/><rect class="stroke" x="8" y="34" width="32" height="8" rx="1"/><path class="stroke" d="M20 38 L28 38"/>`,

  '试运行': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M24 16 L24 24 L30 28"/><path class="fill" d="M36 8 L40 12 L30 22 L26 18 Z"/>`,

  '正式运营': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M16 24 L22 30 L32 18"/><circle class="fill" cx="24" cy="24" r="4"/>`,

  '爬坡期': `<path class="stroke" d="M8 36 L16 28 L24 32 L32 20 L40 24"/><path class="stroke" d="M32 16 L40 24 L32 24"/><circle class="fill" cx="32" cy="20" r="3"/>`,

  '稳定期': `<path class="stroke" d="M8 28 L16 28 L24 28 L32 28 L40 28"/><circle class="stroke" cx="24" cy="28" r="8"/><circle class="fill" cx="24" cy="28" r="3"/>`,

  '月度考核': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M8 16 L40 16"/><text class="fill" x="14" y="28" font-size="10" font-weight="bold">MON</text>`,

  '季度评估': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M8 16 L40 16"/><text class="fill" x="12" y="28" font-size="10" font-weight="bold">Q1</text>`,

  '年度评级': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M8 16 L40 16"/><path class="stroke" d="M24 20 L26 24 L30 26 L26 28 L24 32 L22 28 L18 26 L22 24 Z"/><circle class="fill" cx="24" cy="26" r="2"/>`,

  '结算': `<rect class="stroke" x="8" y="10" width="32" height="28" rx="3"/><path class="stroke" d="M8 18 L40 18"/><path class="stroke" d="M16 26 L32 26 M16 32 L28 32"/><circle class="fill" cx="16" cy="26" r="2"/>`,

  '对账': `<rect class="stroke" x="6" y="8" width="16" height="32" rx="2"/><rect class="stroke" x="26" y="8" width="16" height="32" rx="2"/><path class="stroke" d="M22 24 L26 24"/><circle class="fill" cx="14" cy="24" r="2"/>`,

  '开票': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M14 14 L34 14 M14 22 L30 22 M14 30 L26 30"/><rect class="fill" x="28" y="26" width="8" height="8" rx="1"/>`,

  '续约评估': `<rect class="stroke" x="8" y="8" width="28" height="32" rx="2"/><path class="stroke" d="M40 20 A8 8 0 1 1 40 36"/><path class="stroke" d="M40 16 L44 20 L40 24"/><circle class="fill" cx="22" cy="24" r="3"/>`,

  '续约签约': `<rect class="stroke" x="8" y="8" width="28" height="32" rx="2"/><path class="stroke" d="M36 16 L40 12 L44 16 L40 20 Z"/><path class="stroke" d="M16 24 L22 30 L28 22"/><circle class="fill" cx="22" cy="28" r="3"/>`,

  '交接': `<rect class="stroke" x="6" y="10" width="14" height="28" rx="2"/><rect class="stroke" x="28" y="10" width="14" height="28" rx="2"/><path class="stroke" d="M20 24 L28 24 M24 20 L28 24 L24 28"/><circle class="fill" cx="24" cy="24" r="2"/>`,

  '退出结算': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M16 16 L32 32 M32 16 L16 32"/><path class="stroke" d="M10 38 L14 34 L18 38"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '业务扩展': `<rect class="stroke" x="8" y="12" width="24" height="24" rx="2"/><path class="stroke" d="M36 8 L36 20 L44 20"/><path class="stroke" d="M36 8 L48 20 L36 32"/><circle class="fill" cx="36" cy="20" r="3"/>`,

  // ---- 日常配合管理类 (15个) ----
  '及时响应': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M24 16 L24 24 L28 28"/><circle class="fill" cx="24" cy="24" r="3"/><path class="stroke" d="M36 12 L40 8"/><path class="stroke" d="M36 36 L40 40"/>`,

  '周末值班': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M8 16 L40 16"/><text class="fill" x="16" y="30" font-size="10" font-weight="bold">SAT</text>`,

  '数据报送': `<rect class="stroke" x="8" y="10" width="28" height="20" rx="2"/><path class="stroke" d="M36 20 L44 20 L44 38 L16 38 L16 30"/><path class="stroke" d="M14 20 L22 26 L30 18"/><circle class="fill" cx="22" cy="24" r="3"/>`,

  '异常上报': `<path class="stroke" d="M24 4 L44 40 L4 40 Z"/><path class="stroke" d="M24 18 L24 28"/><circle class="fill" cx="24" cy="34" r="3"/>`,

  '出勤': `<circle class="fill" cx="24" cy="12" r="6"/><path class="stroke" d="M12 36 C12 26 36 26 36 36"/><path class="stroke" d="M24 20 L24 30"/><circle class="fill" cx="24" cy="32" r="2"/>`,

  '人员变动': `<circle class="stroke" cx="16" cy="20" r="8"/><circle class="stroke" cx="32" cy="20" r="8"/><path class="stroke" d="M24 12 L24 28"/><path class="stroke" d="M20 20 L28 20"/><circle class="fill" cx="24" cy="20" r="3"/>`,

  '离职交接': `<circle class="stroke" cx="16" cy="16" r="8"/><path class="stroke" d="M8 36 Q16 28 24 36"/><path class="stroke" d="M28 20 L40 32 M40 20 L28 32"/><circle class="fill" cx="16" cy="16" r="3"/>`,

  'SOP执行': `<rect class="stroke" x="8" y="6" width="32" height="36" rx="2"/><path class="stroke" d="M14 14 L34 14 M14 22 L28 22 M14 30 L24 30"/><circle class="fill" cx="34" cy="30" r="4"/>`,

  '应急响应': `<path class="stroke" d="M24 4 L28 16 L40 16 L30 24 L34 36 L24 28 L14 36 L18 24 L8 16 L20 16 Z"/><circle class="fill" cx="24" cy="20" r="4"/>`,

  '配合评分': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M24 16 L26 22 L32 22 L27 26 L29 32 L24 28 L19 32 L21 26 L16 22 L22 22 Z"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '扣分机制': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M18 24 L30 24"/><circle class="fill" cx="18" cy="24" r="3"/>`,

  '免责条款': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M14 14 L34 14 M14 22 L30 22 M14 30 L26 30"/><path class="stroke" d="M30 26 L38 34 M38 26 L30 34"/><circle class="fill" cx="14" cy="30" r="2"/>`,

  '排名公示': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M14 16 L14 36 M24 12 L24 36 M34 20 L34 36"/><circle class="fill" cx="24" cy="12" r="4"/>`,

  '配额调整': `<rect class="stroke" x="8" y="14" width="16" height="20" rx="2"/><rect class="stroke" x="24" y="14" width="16" height="20" rx="2"/><path class="stroke" d="M18 24 L24 20 M18 24 L24 28"/><circle class="fill" cx="18" cy="24" r="2"/>`,

  '赛马机制': `<circle class="stroke" cx="16" cy="24" r="8"/><circle class="stroke" cx="32" cy="24" r="8"/><path class="stroke" d="M8 12 L16 20 M40 12 L32 20"/><circle class="fill" cx="16" cy="24" r="3"/>`,

  // ---- 质检合规类 (15个) ----
  '通话质检': `<circle class="stroke" cx="24" cy="14" r="10"/><path class="stroke" d="M10 40 Q24 28 38 40"/><path class="stroke" d="M18 18 L30 18 L30 26 L18 26 Z"/><circle class="fill" cx="24" cy="22" r="3"/>`,

  '实时质检': `<circle class="stroke" cx="24" cy="14" r="10"/><path class="stroke" d="M10 40 Q24 28 38 40"/><circle class="fill" cx="24" cy="14" r="4"/><path class="stroke" d="M36 8 L40 12 L36 16"/>`,

  '抽检': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><circle class="stroke" cx="20" cy="20" r="6"/><circle class="stroke" cx="30" cy="28" r="4"/><circle class="fill" cx="20" cy="20" r="3"/>`,

  '全检': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><circle class="stroke" cx="16" cy="16" r="4"/><circle class="stroke" cx="32" cy="16" r="4"/><circle class="stroke" cx="16" cy="32" r="4"/><circle class="stroke" cx="32" cy="32" r="4"/><circle class="fill" cx="16" cy="16" r="2"/>`,

  '合规话术': `<rect class="stroke" x="8" y="6" width="32" height="36" rx="2"/><path class="stroke" d="M14 14 L34 14 M14 22 L28 22 M14 30 L24 30"/><path class="stroke" d="M28 26 L34 32 L28 38"/><circle class="fill" cx="28" cy="32" r="2"/>`,

  '违规话术': `<rect class="stroke" x="8" y="6" width="32" height="36" rx="2"/><path class="stroke" d="M14 14 L34 14 M14 22 L28 22 M14 30 L24 30"/><path class="stroke" d="M26 26 L34 34 M34 26 L26 34"/><circle class="fill" cx="30" cy="30" r="2"/>`,

  '敏感词': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M18 24 L30 24"/><path class="stroke" d="M24 18 L24 30"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '误导销售': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M24 14 L24 26"/><circle class="fill" cx="24" cy="32" r="3"/>`,

  '过度承诺': `<path class="stroke" d="M24 4 L28 16 L40 16 L30 24 L34 36 L24 28 L14 36 L18 24 L8 16 L20 16 Z"/><path class="stroke" d="M20 22 L28 22"/><circle class="fill" cx="24" cy="18" r="3"/>`,

  '投诉处理': `<circle class="stroke" cx="24" cy="20" r="12"/><path class="stroke" d="M18 16 Q24 12 30 16"/><path class="stroke" d="M18 24 Q24 28 30 24"/><path class="stroke" d="M24 32 L24 40"/><circle class="fill" cx="24" cy="20" r="3"/>`,

  '争议解决': `<circle class="stroke" cx="20" cy="20" r="10"/><circle class="stroke" cx="28" cy="28" r="10"/><path class="stroke" d="M20 24 L28 24"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '录音归档': `<circle class="stroke" cx="24" cy="20" r="12"/><circle class="stroke" cx="24" cy="20" r="4"/><path class="stroke" d="M14 36 L34 36"/><rect class="fill" x="20" y="32" width="8" height="4" rx="1"/>`,

  '数据脱敏': `<rect class="stroke" x="8" y="14" width="32" height="20" rx="2"/><path class="stroke" d="M14 24 L34 24"/><circle class="fill" cx="20" cy="24" r="2"/><circle class="fill" cx="28" cy="24" r="2"/>`,

  '信息安全': `<rect class="stroke" x="12" y="16" width="24" height="26" rx="2"/><path class="stroke" d="M18 16 L18 10 Q24 4 30 10 L30 16"/><circle class="fill" cx="24" cy="28" r="4"/>`,

  '审计追踪': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M16 16 L16 32 M24 12 L24 32 M32 20 L32 32"/><circle class="fill" cx="16" cy="16" r="3"/>`,

  // ---- 数据指标类 (15个) ----
  '日均产能': `<rect class="stroke" x="8" y="14" width="32" height="24" rx="2"/><path class="stroke" d="M14 30 L20 24 L26 28 L34 18"/><circle class="fill" cx="20" cy="24" r="3"/>`,

  '及时率': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M24 14 L24 24 L32 28"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '流失率': `<path class="stroke" d="M16 8 L16 24 Q16 32 24 32 L40 32"/><path class="stroke" d="M32 26 L40 32 L32 38"/><circle class="fill" cx="24" cy="32" r="3"/>`,

  '留存率': `<path class="stroke" d="M32 8 L32 24 Q32 32 24 32 L8 32"/><path class="stroke" d="M16 26 L8 32 L16 38"/><circle class="fill" cx="24" cy="32" r="3"/>`,

  '利用率': `<rect class="stroke" x="8" y="14" width="32" height="24" rx="2"/><path class="stroke" d="M14 30 L14 22 L22 22 L22 30"/><rect class="fill" x="14" y="26" width="8" height="4" rx="1"/>`,

  '接通率': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M18 20 L26 24 L18 28"/><path class="fill" d="M30 20 L34 24 L30 28 Z"/>`,

  '平均通话时长': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M24 14 L24 24 L32 28"/><path class="stroke" d="M14 32 L20 26"/><circle class="fill" cx="24" cy="24" r="3"/>`,

  '服务等级': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M24 12 L26 18 L32 18 L27 22 L29 28 L24 24 L19 28 L21 22 L16 18 L22 18 Z"/><circle class="fill" cx="24" cy="20" r="2"/>`,

  '环比': `<path class="stroke" d="M8 32 L16 24 L24 28 L32 16 L40 20"/><path class="stroke" d="M32 12 L40 20 L32 20"/><circle class="fill" cx="32" cy="16" r="3"/>`,

  '同比': `<path class="stroke" d="M8 32 L16 28 L24 30 L32 24 L40 26" stroke-dasharray="4 2"/><path class="stroke" d="M8 28 L16 20 L24 22 L32 14 L40 16"/><circle class="fill" cx="32" cy="14" r="3"/>`,

  '累计': `<path class="stroke" d="M8 8 L8 40 L40 40"/><path class="stroke" d="M12 32 L20 20 L28 26 L38 12"/><circle class="fill" cx="28" cy="26" r="3"/>`,

  '基础分': `<circle class="stroke" cx="24" cy="24" r="16"/><text class="fill" x="18" y="28" font-size="12" font-weight="bold">B</text>`,

  '月度分': `<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><text class="fill" x="14" y="28" font-size="12" font-weight="bold">MON</text>`,

  '综合排名': `<circle class="stroke" cx="24" cy="16" r="10"/><path class="stroke" d="M14 40 L24 30 L34 40"/><text class="fill" x="20" y="20" font-size="10" font-weight="bold">#1</text>`,

  '合规率': `<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M16 24 L22 30 L32 18"/><circle class="fill" cx="22" cy="30" r="3"/>`,
};

// 生成所有图标
let count = 0;
for (const [name, content] of Object.entries(icons)) {
  const filename = `${name}.svg`;
  fs.writeFileSync(path.join(outDir, filename), createSVG(content));
  console.log(`✅ ${filename}`);
  count++;
}

console.log(`\n✨ 完成! 共生成 ${count} 个图标`);