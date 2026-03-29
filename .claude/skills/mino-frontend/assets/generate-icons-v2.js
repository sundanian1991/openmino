#!/usr/bin/env node

/**
 * 第二批 SVG 图标生成器
 * 金融电销营销 + 供应商生命周期 + 质检合规
 */

const fs = require('fs');
const path = require('path');

const OUTPUT_DIR = path.join(__dirname, 'icons-v2');

const createSVG = (paths, size = 48) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <style>
    .stroke { fill: none; stroke: #3D2C29; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
    .fill { fill: #E2725B; stroke: none; }
    .stroke-fill { fill: #E2725B; stroke: #3D2C29; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
  </style>
  ${paths}
</svg>`;

const ICONS = {
  // === 金融电销营销类 ===
  'agent': createSVG(`<circle class="fill" cx="24" cy="14" r="10"/><circle class="stroke" cx="24" cy="14" r="10"/><path class="stroke" d="M10 42 Q24 30 38 42"/><rect class="stroke" x="18" y="22" width="12" height="4" rx="1"/>`),
  'script': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><line class="stroke" x1="14" y1="12" x2="34" y2="12"/><line class="stroke" x1="14" y1="20" x2="34" y2="20"/><line class="stroke" x1="14" y1="28" x2="28" y2="28"/><path class="fill" d="M30 32 L36 38 L38 36 L32 30 Z"/>`),
  'dial': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M24 12 L24 24 L32 28"/><circle class="fill" cx="24" cy="24" r="3"/>`),
  'answer': createSVG(`<path class="fill" d="M8 12 Q8 4 24 4 Q40 4 40 12 L40 28 Q40 36 24 36 L16 36 L8 44 L8 36 Q4 36 4 28 L4 12 Z"/><path class="stroke" d="M8 12 Q8 4 24 4 Q40 4 40 12 L40 28 Q40 36 24 36 L16 36 L8 44 L8 36 Q4 36 4 28 L4 12 Z"/>`),
  'hangup': createSVG(`<path class="stroke" d="M8 24 Q8 12 24 12 Q40 12 40 24"/><path class="stroke" d="M16 32 L24 24 L32 32"/><circle class="fill" cx="24" cy="36" r="4"/>`),
  'first-call': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="fill" d="M24 6 L24 18 L18 18 L18 6 Z"/><text x="28" y="28" font-size="10" font-weight="bold" fill="#3D2C29">1st</text>`),
  'redial': createSVG(`<path class="stroke" d="M32 16 A12 12 0 1 0 36 28"/><path class="fill" d="M32 10 L40 18 L32 26 L28 22 L36 18 L28 14 Z"/><circle class="stroke" cx="24" cy="28" r="8"/>`),
  'effective-call': createSVG(`<circle class="fill" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M16 24 L22 30 L34 18" stroke="white" stroke-width="3"/>`),
  'invalid-call': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M16 16 L32 32 M32 16 L16 32" stroke-width="3"/>`),
  'acquisition': createSVG(`<circle class="fill" cx="24" cy="16" r="10"/><circle class="stroke" cx="24" cy="16" r="10"/><path class="stroke" d="M8 40 L24 28 L40 40"/><path class="fill" d="M36 8 L44 16 L36 24 L32 20 L40 16 L32 12 Z"/>`),
  'application': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><line class="stroke" x1="14" y1="14" x2="34" y2="14"/><line class="stroke" x1="14" y1="22" x2="34" y2="22"/><line class="stroke" x1="14" y1="30" x2="26" y2="30"/><circle class="fill" cx="32" cy="30" r="4"/>`),
  'underwriting': createSVG(`<rect class="stroke" x="4" y="8" width="40" height="32" rx="2"/><path class="stroke" d="M4 18 L44 18"/><circle class="fill" cx="12" cy="28" r="4"/><path class="stroke" d="M20 28 L36 28"/><path class="stroke" d="M20 34 L32 34"/>`),
  'rejection': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M16 16 L32 32 M32 16 L16 32" stroke-width="3"/>`),
  'approval-loan': createSVG(`<circle class="fill" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M16 24 L22 30 L32 18" stroke="white" stroke-width="3"/><text x="24" y="40" text-anchor="middle" font-size="8" fill="#3D2C29">¥</text>`),
  'disbursement': createSVG(`<rect class="stroke" x="8" y="12" width="32" height="24" rx="2"/><path class="fill" d="M24 4 L32 12 L16 12 Z"/><circle class="fill" cx="24" cy="24" r="6"/><text x="24" y="28" text-anchor="middle" font-size="10" font-weight="bold" fill="white">¥</text>`),
  'drawdown': createSVG(`<rect class="stroke" x="8" y="16" width="32" height="24" rx="2"/><path class="stroke" d="M24 4 L24 16"/><path class="fill" d="M20 8 L24 4 L28 8 Z"/><text x="24" y="32" text-anchor="middle" font-size="12" fill="#3D2C29">提</text>`),
  'repayment': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M24 12 L24 24 L32 28"/><path class="fill" d="M32 32 L40 40 L32 40 L32 32 Z"/>`),
  'overdue': createSVG(`<circle class="fill" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="18"/><text x="24" y="30" text-anchor="middle" font-size="14" font-weight="bold" fill="white">!</text><circle class="stroke" cx="38" cy="38" r="8" stroke="#cc0000"/><text x="38" y="42" text-anchor="middle" font-size="10" fill="#cc0000">!</text>`),
  'collection': createSVG(`<path class="stroke" d="M8 24 Q8 8 24 8 Q40 8 40 24 Q40 40 24 40 Q8 40 8 24 Z"/><path class="stroke" d="M16 24 L32 24"/><path class="stroke" d="M16 32 L32 32"/><circle class="fill" cx="24" cy="16" r="4"/>`),
  'card-activation': createSVG(`<rect class="stroke" x="4" y="12" width="40" height="24" rx="2"/><path class="fill" d="M20 20 L24 24 L32 16 L34 18 L24 28 L18 22 Z"/>`),
  'installment': createSVG(`<rect class="stroke" x="4" y="8" width="40" height="32" rx="2"/><line class="stroke" x1="4" y1="20" x2="44" y2="20"/><text x="14" y="32" font-size="10" fill="#3D2C29">期</text><text x="28" y="32" font-size="10" fill="#3D2C29">数</text>`),
  'limit-increase': createSVG(`<rect class="stroke" x="8" y="12" width="32" height="24" rx="2"/><path class="stroke" d="M24 4 L24 12"/><path class="fill" d="M20 8 L24 4 L28 8 Z"/><text x="24" y="28" text-anchor="middle" font-size="10" fill="#3D2C29">↑额度</text>`),
  'account-closure': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M16 20 L32 32 M32 20 L16 32" stroke-width="2"/>`),
  'tag': createSVG(`<path class="fill" d="M8 8 L28 8 L40 20 L28 32 L8 32 Z"/><path class="stroke" d="M8 8 L28 8 L40 20 L28 32 L8 32 Z"/><circle class="stroke" cx="16" cy="20" r="4"/>`),
  'lead': createSVG(`<path class="fill" d="M8 12 Q8 4 24 4 Q40 4 40 12 L40 28 Q40 36 24 36 Q8 36 8 28 Z"/><path class="stroke" d="M8 12 Q8 4 24 4 Q40 4 40 12 L40 28 Q40 36 24 36 Q8 36 8 28 Z"/><circle cx="24" cy="18" r="4" fill="white"/><path class="stroke" d="M16 30 Q24 24 32 30" stroke="white"/>`),
  'opportunity': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="fill" d="M24 6 L28 20 L42 20 L30 30 L34 44 L24 34 L14 44 L18 30 L6 20 L20 20 Z"/>`),
  'prospect': createSVG(`<circle class="fill" cx="24" cy="16" r="10"/><circle class="stroke" cx="24" cy="16" r="10"/><path class="stroke" d="M10 42 Q24 30 38 42"/><path class="fill" d="M36 12 L44 20 L36 28 L32 24 L40 20 L32 16 Z"/>`),
  'deal-closed': createSVG(`<circle class="fill" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M14 24 L20 30 L34 16" stroke="white" stroke-width="3"/><text x="24" y="42" text-anchor="middle" font-size="8" fill="#3D2C29">成交</text>`),
  'lost-deal': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M16 16 L32 32 M32 16 L16 32" stroke-width="3"/><path class="stroke" d="M24 42 L24 36" stroke-width="2"/>`),
  'callback': createSVG(`<path class="stroke" d="M32 16 A12 12 0 1 0 36 28"/><path class="fill" d="M32 10 L40 18 L32 26 L28 22 L36 18 L28 14 Z"/><circle class="stroke" cx="24" cy="28" r="6"/>`),

  // === 供应商生命周期类 ===
  'demand-init': createSVG(`<path class="stroke" d="M24 4 L24 44"/><path class="fill" d="M16 8 L24 4 L32 8 L24 12 Z"/><rect class="stroke" x="8" y="20" width="32" height="20" rx="2"/>`),
  'market-research': createSVG(`<circle class="stroke" cx="20" cy="20" r="12"/><line class="stroke" x1="28" y1="28" x2="40" y2="40" stroke-width="3"/><path class="fill" d="M16 16 L24 16 L24 24 L16 24 Z" opacity="0.5"/>`),
  'invite-bid': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="fill" d="M24 4 L28 12 L36 12 L30 18 L32 28 L24 22 L16 28 L18 18 L12 12 L20 12 Z"/>`),
  'bid-response': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="fill" d="M16 16 L24 16 L24 28 L16 28 Z" opacity="0.5"/><path class="stroke" d="M20 32 L24 36 L28 32"/>`),
  'bid-opening': createSVG(`<rect class="stroke" x="4" y="16" width="40" height="24" rx="2"/><path class="stroke" d="M4 16 L24 4 L44 16"/><rect class="fill" x="18" y="22" width="12" height="8" rx="1"/>`),
  'bid-evaluation': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><line class="stroke" x1="14" y1="14" x2="34" y2="14"/><line class="stroke" x1="14" y1="22" x2="34" y2="22"/><line class="stroke" x1="14" y1="30" x2="26" y2="30"/><circle class="fill" cx="32" cy="30" r="4"/><path class="stroke" d="M30 30 L34 34"/>`),
  'win-bid': createSVG(`<path class="fill" d="M24 4 L30 18 L44 18 L32 28 L36 44 L24 34 L12 44 L16 28 L4 18 L18 18 Z"/><path class="stroke" d="M24 4 L30 18 L44 18 L32 28 L36 44 L24 34 L12 44 L16 28 L4 18 L18 18 Z"/>`),
  'lose-bid': createSVG(`<path class="stroke" d="M24 4 L30 18 L44 18 L32 28 L36 44 L24 34 L12 44 L16 28 L4 18 L18 18 Z"/><circle class="stroke" cx="24" cy="24" r="8"/><path class="stroke" d="M20 20 L28 28 M28 20 L20 28"/>`),
  'negotiation-sign': createSVG(`<circle class="fill" cx="16" cy="18" r="8"/><circle class="stroke" cx="16" cy="18" r="8"/><circle class="fill" cx="32" cy="18" r="8"/><circle class="stroke" cx="32" cy="18" r="8"/><path class="stroke" d="M14 36 Q24 28 34 36"/><rect class="stroke" x="8" y="32" width="32" height="12" rx="1"/>`),
  'onboarding-train': createSVG(`<rect class="stroke" x="4" y="12" width="40" height="28" rx="2"/><circle class="fill" cx="24" cy="8" r="4"/><path class="stroke" d="M16 28 L24 20 L32 28"/>`),
  'trial-run': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M24 12 L24 24 L32 28"/><path class="fill" d="M36 8 L44 16 L36 24 L32 20 L40 16 L32 12 Z"/>`),
  'official-operation': createSVG(`<rect class="stroke" x="8" y="12" width="32" height="24" rx="2"/><path class="fill" d="M24 4 L32 12 L16 12 Z"/><path class="stroke" d="M14 24 L34 24"/>`),
  'ramp-up': createSVG(`<rect class="stroke" x="8" y="20" width="32" height="20" rx="2"/><path class="stroke" d="M24 4 L24 16 M18 10 L24 4 L30 10"/><path class="fill" d="M12 28 L36 28 L36 36 L12 36 Z"/>`),
  'steady-state': createSVG(`<path class="stroke" d="M4 24 L16 24 L20 20 L28 28 L32 24 L44 24"/><circle class="fill" cx="24" cy="24" r="4"/>`),
  'monthly-assessment': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><text x="24" y="20" text-anchor="middle" font-size="10" fill="#3D2C29">月度</text><line class="stroke" x1="12" y1="28" x2="36" y2="28"/><line class="stroke" x1="12" y1="36" x2="28" y2="36"/>`),
  'quarterly-review': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><text x="24" y="20" text-anchor="middle" font-size="10" fill="#3D2C29">季度</text><rect class="fill" x="12" y="28" width="24" height="8" rx="1"/>`),
  'annual-rating': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><text x="24" y="18" text-anchor="middle" font-size="10" fill="#3D2C29">年度</text><polygon class="fill" points="24,24 28,32 36,32 30,38 32,46 24,42 16,46 18,38 12,32 20,32"/>`),
  'settlement': createSVG(`<circle class="fill" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="18"/><text x="24" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="#3D2C29">¥</text>`),
  'reconciliation': createSVG(`<rect class="stroke" x="4" y="12" width="18" height="24" rx="2"/><rect class="stroke" x="26" y="12" width="18" height="24" rx="2"/><path class="stroke" d="M22 20 L26 20 M22 28 L26 28"/>`),
  'invoicing': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><text x="24" y="24" text-anchor="middle" font-size="12" fill="#3D2C29">发</text><text x="24" y="36" text-anchor="middle" font-size="12" fill="#3D2C29">票</text>`),
  'renewal-assessment': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><path class="stroke" d="M36 20 A12 12 0 1 1 24 8"/><path class="fill" d="M36 4 L44 12 L36 20 L32 16 L40 12 L32 8 Z"/>`),
  'renewal-sign': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M36 24 A12 12 0 1 1 24 12"/><path class="fill" d="M36 8 L44 16 L36 24 L32 20 L40 16 L32 12 Z"/>`),
  'handover': createSVG(`<circle class="fill" cx="16" cy="24" r="8"/><circle class="stroke" cx="16" cy="24" r="8"/><circle class="fill" cx="32" cy="24" r="8"/><circle class="stroke" cx="32" cy="24" r="8"/><path class="stroke" d="M24 20 L24 28 M20 24 L28 24"/>`),
  'exit-settlement': createSVG(`<rect class="stroke" x="8" y="12" width="32" height="24" rx="2"/><path class="stroke" d="M24 4 L24 12"/><path class="stroke" d="M24 36 L24 44"/><circle class="fill" cx="24" cy="24" r="6"/>`),
  'scope-expansion': createSVG(`<rect class="stroke" x="8" y="20" width="32" height="20" rx="2"/><path class="stroke" d="M24 4 L24 16 M18 10 L24 4 L30 10"/><path class="fill" d="M12 28 L36 28 L36 36 L12 36 Z"/>`),

  // === 日常配合管理类 ===
  'timely-response': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M24 12 L24 24 L32 28"/><circle class="fill" cx="24" cy="24" r="3"/>`),
  'weekend-duty': createSVG(`<rect class="stroke" x="6" y="8" width="36" height="36" rx="2"/><line class="stroke" x1="6" y1="18" x2="42" y2="18"/><circle class="fill" cx="24" cy="30" r="8"/><path class="stroke" d="M24 26 L24 34 M20 30 L28 30" stroke="white"/>`),
  'data-reporting': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><line class="stroke" x1="14" y1="14" x2="34" y2="14"/><line class="stroke" x1="14" y1="22" x2="34" y2="22"/><line class="stroke" x1="14" y1="30" x2="26" y2="30"/><path class="fill" d="M32 36 L36 40 L40 36 L36 32 Z"/>`),
  'exception-report': createSVG(`<path class="fill" d="M24 4 L44 42 L4 42 Z"/><path class="stroke" d="M24 4 L44 42 L4 42 Z"/><line class="stroke" x1="24" y1="18" x2="24" y2="30" stroke-width="3"/><circle class="fill" cx="24" cy="35" r="2"/>`),
  'attendance': createSVG(`<rect class="stroke" x="6" y="8" width="36" height="36" rx="2"/><line class="stroke" x1="6" y1="18" x2="42" y2="18"/><circle class="fill" cx="16" cy="28" r="4"/><circle class="fill" cx="24" cy="28" r="4"/><circle class="fill" cx="32" cy="28" r="4"/>`),
  'staff-change': createSVG(`<circle class="fill" cx="16" cy="18" r="8"/><circle class="stroke" cx="16" cy="18" r="8"/><circle class="fill" cx="32" cy="18" r="8"/><circle class="stroke" cx="32" cy="18" r="8"/><path class="stroke" d="M20 32 L28 32"/><path class="fill" d="M26 28 L28 32 L26 36 Z"/>`),
  'resignation-handover': createSVG(`<circle class="stroke" cx="16" cy="20" r="8"/><circle class="stroke" cx="32" cy="20" r="8"/><path class="stroke" d="M20 32 L28 32"/><rect class="fill" x="20" y="36" width="8" height="8" rx="1"/>`),
  'sop-execution': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><line class="stroke" x1="14" y1="14" x2="34" y2="14"/><line class="stroke" x1="14" y1="22" x2="34" y2="22"/><line class="stroke" x1="14" y1="30" x2="26" y2="30"/><path class="fill" d="M30 28 L36 34 L38 32 L32 26 Z"/>`),
  'emergency-response': createSVG(`<path class="fill" d="M24 4 Q40 16 32 28 L24 44 L16 28 Q8 16 24 4"/><path class="stroke" d="M24 4 Q40 16 32 28 L24 44 L16 28 Q8 16 24 4"/><text x="24" y="26" text-anchor="middle" font-size="16" font-weight="bold" fill="white">!</text>`),
  'cooperation-score': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><text x="24" y="22" text-anchor="middle" font-size="10" fill="#3D2C29">配合</text><text x="24" y="34" text-anchor="middle" font-size="14" font-weight="bold" fill="#E2725B">10</text>`),
  'deduction-mechanism': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><text x="24" y="24" text-anchor="middle" font-size="16" font-weight="bold" fill="#3D2C29">-1</text><path class="stroke" d="M8 36 L40 36"/>`),
  'exemption-clause': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M16 24 L22 30 L32 18" stroke-width="3"/><path class="fill" d="M36 36 L44 44 L36 44 L36 36 Z"/>`),
  'ranking-publish': createSVG(`<rect class="stroke" x="4" y="4" width="40" height="40" rx="2"/><path class="fill" d="M12 20 L20 20 L20 36 L12 36 Z"/><path class="fill" d="M22 14 L30 14 L30 36 L22 36 Z" opacity="0.7"/><path class="fill" d="M32 8 L40 8 L40 36 L32 36 Z" opacity="0.4"/>`),
  'quota-adjustment': createSVG(`<rect class="stroke" x="8" y="16" width="32" height="20" rx="2"/><path class="stroke" d="M24 4 L24 16 M18 10 L24 4 L30 10"/><path class="stroke" d="M24 36 L24 44 M18 40 L24 44 L30 40"/>`),
  'horse-racing': createSVG(`<path class="stroke" d="M4 36 L12 24 L20 32 L28 16 L36 28 L44 12"/><circle class="fill" cx="12" cy="24" r="3"/><circle class="fill" cx="28" cy="16" r="3"/><circle class="fill" cx="44" cy="12" r="4"/>`),

  // === 质检合规类 ===
  'call-qa': createSVG(`<circle class="stroke" cx="20" cy="20" r="12"/><line class="stroke" x1="28" y1="28" x2="40" y2="40" stroke-width="3"/><path class="stroke" d="M16 20 L20 24 L26 16"/>`),
  'realtime-qa': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><circle class="fill" cx="24" cy="24" r="12" opacity="0.3"/><circle class="stroke" cx="24" cy="24" r="12"/><circle class="fill" cx="24" cy="24" r="4"/>`),
  'sampling': createSVG(`<rect class="stroke" x="4" y="4" width="40" height="40" rx="2"/><rect class="fill" x="8" y="8" width="8" height="8"/><rect class="fill" x="24" y="20" width="8" height="8"/><rect class="fill" x="12" y="32" width="8" height="8"/>`),
  'full-check': createSVG(`<rect class="fill" x="8" y="8" width="32" height="32" rx="2" opacity="0.3"/><rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M16 24 L22 30 L34 16" stroke-width="3"/>`),
  'compliant-script': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><line class="stroke" x1="14" y1="14" x2="34" y2="14"/><line class="stroke" x1="14" y1="22" x2="34" y2="22"/><path class="stroke" d="M14 30 L34 30 L34 36 L14 36 Z"/><circle class="fill" cx="32" cy="33" r="2"/>`),
  'violation-script': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><line class="stroke" x1="14" y1="14" x2="34" y2="14"/><line class="stroke" x1="14" y1="22" x2="34" y2="22"/><line class="stroke" x1="14" y1="30" x2="28" y2="30"/><circle class="fill" cx="38" cy="38" r="8"/><text x="38" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="white">!</text>`),
  'sensitive-word': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><text x="24" y="28" text-anchor="middle" font-size="12" fill="#cc0000">敏感</text><path class="stroke" d="M4 4 L44 44" stroke="#cc0000" stroke-width="2"/>`),
  'misleading-sales': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M16 16 L32 32 M32 16 L16 32" stroke-width="3"/><text x="24" y="44" text-anchor="middle" font-size="8" fill="#cc0000">误导</text>`),
  'over-promise': createSVG(`<path class="stroke" d="M4 40 L16 28 L24 32 L44 8"/><path class="stroke" d="M36 4 L44 8 L40 16 Z"/><circle class="fill" cx="44" cy="8" r="4"/><text x="24" y="44" text-anchor="middle" font-size="8" fill="#cc0000">过度承诺</text>`),
  'complaint-handling': createSVG(`<path class="fill" d="M8 8 Q32 8 32 24 Q32 32 24 32 L16 32 L8 44 L8 32 Q4 32 4 24 Q4 8 8 8"/><path class="stroke" d="M8 8 Q32 8 32 24 Q32 32 24 32 L16 32 L8 44 L8 32 Q4 32 4 24 Q4 8 8 8"/><circle cx="14" cy="20" r="2" fill="#3D2C29"/><circle cx="22" cy="20" r="2" fill="#3D2C29"/><path class="stroke" d="M12 28 Q18 32 24 28" stroke="#3D2C29"/>`),
  'dispute-resolution': createSVG(`<circle class="stroke" cx="16" cy="24" r="10"/><circle class="stroke" cx="32" cy="24" r="10"/><path class="stroke" d="M20 24 L28 24"/><path class="fill" d="M24 18 L28 24 L24 30 Z"/>`),
  'recording-archive': createSVG(`<rect class="stroke" x="8" y="12" width="32" height="24" rx="2"/><circle class="fill" cx="24" cy="24" r="8"/><circle class="stroke" cx="24" cy="24" r="8"/><circle class="fill" cx="24" cy="24" r="3"/><path class="stroke" d="M4 12 L24 4 L44 12"/>`),
  'data-masking': createSVG(`<rect class="stroke" x="4" y="8" width="40" height="32" rx="2"/><line class="stroke" x1="10" y1="18" x2="38" y2="18" stroke-dasharray="4 2"/><line class="stroke" x1="10" y1="26" x2="38" y2="26" stroke-dasharray="4 2"/><line class="stroke" x1="10" y1="34" x2="26" y2="34" stroke-dasharray="4 2"/>`),
  'info-security': createSVG(`<path class="stroke" d="M24 4 L40 12 L40 28 Q40 40 24 44 Q8 40 8 28 L8 12 Z"/><path class="fill" d="M18 26 L22 30 L30 22 L28 20 L22 26 L20 24 Z"/>`),
  'audit-trail': createSVG(`<path class="stroke" d="M4 12 L24 4 L44 12"/><path class="stroke" d="M4 24 L24 16 L44 24"/><path class="stroke" d="M4 36 L24 28 L44 36"/><circle class="fill" cx="24" cy="4" r="3"/><circle class="fill" cx="24" cy="16" r="3"/><circle class="fill" cx="24" cy="28" r="3"/>`),

  // === 数据指标类 ===
  'daily-capacity': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><text x="24" y="20" text-anchor="middle" font-size="8" fill="#3D2C29">日均</text><text x="24" y="34" text-anchor="middle" font-size="12" font-weight="bold" fill="#E2725B">100</text>`),
  'timeliness': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M24 12 L24 24 L32 28"/><path class="fill" d="M36 8 L44 16 L36 24 L32 20 L40 16 L32 12 Z"/>`),
  'churn-rate': createSVG(`<path class="stroke" d="M4 12 L44 12 L44 36 L4 36 Z"/><path class="stroke" d="M4 24 L44 24"/><path class="fill" d="M8 16 L40 16 L40 22 L8 22 Z" opacity="0.3"/><path class="stroke" d="M24 36 L24 44"/><path class="fill" d="M20 40 L24 44 L28 40 Z"/>`),
  'retention-rate': createSVG(`<path class="stroke" d="M4 12 L44 12 L44 36 L4 36 Z"/><path class="fill" d="M8 16 L40 16 L40 32 L8 32 Z" opacity="0.3"/><path class="stroke" d="M24 36 L24 44"/><path class="fill" d="M20 40 L24 44 L28 40 Z"/>`),
  'utilization-rate': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="fill" d="M14 14 L34 14 L34 34 L14 34 Z" opacity="0.5"/><text x="24" y="28" text-anchor="middle" font-size="10" font-weight="bold" fill="#3D2C29">85%</text>`),
  'connect-rate': createSVG(`<path class="stroke" d="M8 34 Q24 14 40 34"/><circle class="fill" cx="8" cy="34" r="4"/><circle class="fill" cx="24" cy="20" r="4"/><circle class="fill" cx="40" cy="34" r="4"/>`),
  'avg-talk-time': createSVG(`<circle class="stroke" cx="24" cy="28" r="16"/><path class="stroke" d="M24 16 L24 28 L32 32"/><text x="24" y="10" text-anchor="middle" font-size="8" fill="#3D2C29">平均</text>`),
  'service-level': createSVG(`<rect class="stroke" x="4" y="8" width="40" height="32" rx="2"/><path class="fill" d="M8 28 L16 28 L16 36 L8 36 Z"/><path class="fill" d="M20 20 L28 20 L28 36 L20 36 Z" opacity="0.7"/><path class="fill" d="M32 12 L40 12 L40 36 L32 36 Z" opacity="0.4"/>`),
  'mom': createSVG(`<path class="stroke" d="M8 36 L20 24 L28 28 L40 12"/><path class="fill" d="M36 8 L40 12 L36 16 Z"/><text x="24" y="44" text-anchor="middle" font-size="8" fill="#3D2C29">环比</text>`),
  'yoy': createSVG(`<path class="stroke" d="M8 36 L20 28 L28 32 L40 16"/><path class="fill" d="M36 12 L40 16 L36 20 Z"/><text x="24" y="44" text-anchor="middle" font-size="8" fill="#3D2C29">同比</text>`),
  'cumulative': createSVG(`<rect class="stroke" x="4" y="8" width="40" height="32" rx="2"/><path class="fill" d="M8 32 L16 24 L24 28 L32 16 L40 20 L40 36 L8 36 Z" opacity="0.3"/><text x="24" y="20" text-anchor="middle" font-size="8" fill="#3D2C29">累计</text>`),
  'base-score': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><text x="24" y="22" text-anchor="middle" font-size="8" fill="#3D2C29">基础</text><text x="24" y="34" text-anchor="middle" font-size="14" font-weight="bold" fill="#E2725B">10</text>`),
  'monthly-score': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><text x="24" y="18" text-anchor="middle" font-size="8" fill="#3D2C29">月度得分</text><text x="24" y="36" text-anchor="middle" font-size="16" font-weight="bold" fill="#E2725B">8.5</text>`),
  'overall-ranking': createSVG(`<path class="fill" d="M8 32 L16 32 L16 44 L8 44 Z"/><path class="fill" d="M20 20 L28 20 L28 44 L20 44 Z" opacity="0.7"/><path class="fill" d="M32 8 L40 8 L40 44 L32 44 Z" opacity="0.4"/>`),
  'compliance-rate': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="fill" d="M24 6 A18 18 0 0 1 42 24 L24 24 Z"/><text x="24" y="28" text-anchor="middle" font-size="10" font-weight="bold" fill="#3D2C29">达标</text>`),
};

function main() {
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = [];
  for (const [name, svg] of Object.entries(ICONS)) {
    const filepath = path.join(OUTPUT_DIR, `${name}.svg`);
    fs.writeFileSync(filepath, svg);
    results.push({ name, file: `${name}.svg`, status: 'success' });
    console.log(`✅ ${name}.svg`);
  }

  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(results, null, 2));
  console.log(`\n✨ 完成! 共生成 ${results.length} 个图标`);
}

main();