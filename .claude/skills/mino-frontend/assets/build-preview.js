#!/usr/bin/env node

/**
 * 生成自包含的图标预览HTML
 */

const fs = require('fs');
const path = require('path');

// 从 generate-icons-manual.js 导入 ICONS
const ICONS = require('./generate-icons-manual.js') || {};

// 直接定义ICONS（复制自generate-icons-manual.js）
const createSVG = (paths, size = 48) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <style>
    .stroke { fill: none; stroke: #3D2C29; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
    .fill { fill: #E2725B; stroke: none; }
    .stroke-fill { fill: #E2725B; stroke: #3D2C29; stroke-width: 2.5; stroke-linecap: round; stroke-linejoin: round; }
  </style>
  ${paths}
</svg>`;

const ICON_DEFS = {
  // === 供应商管理类 ===
  'onboarding': createSVG(`<path class="fill" d="M10 8 Q18 12 18 12 L18 38 Q10 34 10 34 Z"/><path class="stroke" d="M10 8 Q18 12 18 12 L18 38 Q10 34 10 34 Z"/><path class="stroke" d="M38 8 Q30 12 30 12 L30 38 Q38 34 38 34 Z"/><path class="stroke" d="M18 12 L30 12 M18 38 L30 38"/><path class="fill" d="M26 26 L32 32 L36 28 L30 22 Z"/>`),
  'evaluation': createSVG(`<rect class="stroke" x="8" y="6" width="32" height="36" rx="2"/><line class="stroke" x1="14" y1="14" x2="34" y2="14"/><line class="stroke" x1="14" y1="22" x2="34" y2="22"/><line class="stroke" x1="14" y1="30" x2="26" y2="30"/><path class="fill" d="M30 28 L36 34 L38 32 L32 26 Z"/>`),
  'exit': createSVG(`<path class="fill" d="M10 8 Q18 12 18 12 L18 38 Q10 34 10 34 Z"/><path class="stroke" d="M10 8 Q18 12 18 12 L18 38 Q10 34 10 34 Z"/><path class="stroke" d="M38 8 Q30 12 30 12 L30 38 Q38 34 38 34 Z"/><path class="stroke" d="M18 12 L30 12 M18 38 L30 38"/><path class="stroke" d="M34 26 L26 18 M26 26 L34 18"/>`),
  'negotiation': createSVG(`<circle class="fill" cx="16" cy="18" r="8"/><circle class="stroke" cx="16" cy="18" r="8"/><circle class="fill" cx="32" cy="18" r="8"/><circle class="stroke" cx="32" cy="18" r="8"/><path class="stroke" d="M14 36 Q24 28 34 36"/>`),
  'contract': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><line class="stroke" x1="14" y1="12" x2="34" y2="12"/><line class="stroke" x1="14" y1="20" x2="34" y2="20"/><line class="stroke" x1="14" y1="28" x2="26" y2="28"/><path class="fill" d="M28 30 L36 30 L32 40 Z"/><path class="stroke" d="M28 30 L36 30 L32 40 Z"/>`),
  'approval': createSVG(`<rect class="stroke" x="8" y="6" width="32" height="36" rx="2"/><circle class="fill" cx="24" cy="22" r="10"/><path class="stroke" d="M19 22 L22 26 L29 18" stroke="white" stroke-width="3"/>`),
  'elimination': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M16 16 L32 32 M32 16 L16 32" stroke-width="3"/>`),
  'due-diligence': createSVG(`<circle class="stroke" cx="20" cy="20" r="12"/><line class="stroke" x1="28" y1="28" x2="40" y2="40" stroke-width="3"/><path class="fill" d="M16 16 L24 16 L24 26 L16 26 Z" opacity="0.3"/>`),
  'profile': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><circle class="fill" cx="24" cy="16" r="6"/><circle class="stroke" cx="24" cy="16" r="6"/><path class="stroke" d="M12 36 Q24 26 36 36"/>`),
  'tiering': createSVG(`<rect class="fill" x="8" y="8" width="32" height="8" rx="1" opacity="0.3"/><rect class="stroke" x="8" y="8" width="32" height="8" rx="1"/><rect class="fill" x="12" y="20" width="24" height="8" rx="1" opacity="0.5"/><rect class="stroke" x="12" y="20" width="24" height="8" rx="1"/><rect class="fill" x="16" y="32" width="16" height="8" rx="1"/><rect class="stroke" x="16" y="32" width="16" height="8" rx="1"/>`),
  'top-tier': createSVG(`<path class="fill" d="M24 4 L30 18 L44 18 L32 28 L36 44 L24 34 L12 44 L16 28 L4 18 L18 18 Z"/><path class="stroke" d="M24 4 L30 18 L44 18 L32 28 L36 44 L24 34 L12 44 L16 28 L4 18 L18 18 Z"/>`),
  'mid-tier': createSVG(`<rect class="stroke" x="4" y="8" width="40" height="32" rx="2"/><line class="stroke" x1="4" y1="24" x2="44" y2="24"/><rect class="fill" x="8" y="14" width="16" height="8" rx="1"/>`),
  'bottom-tier': createSVG(`<path class="stroke" d="M24 8 L44 40 L4 40 Z"/><circle class="fill" cx="24" cy="34" r="4"/>`),
  'bidding': createSVG(`<rect class="stroke" x="4" y="28" width="40" height="16" rx="2"/><path class="fill" d="M24 4 L28 28 L20 28 Z"/><path class="stroke" d="M24 4 L28 28 L20 28 Z"/>`),
  'qualification': createSVG(`<circle class="fill" cx="24" cy="20" r="14"/><circle class="stroke" cx="24" cy="20" r="14"/><path class="stroke" d="M18 20 L22 24 L30 16" stroke="white" stroke-width="2.5"/><path class="fill" d="M18 36 L24 44 L30 36 L24 38 Z"/>`),
  'risk': createSVG(`<path class="fill" d="M24 4 L44 42 L4 42 Z"/><path class="stroke" d="M24 4 L44 42 L4 42 Z"/><line class="stroke" x1="24" y1="18" x2="24" y2="30" stroke-width="3"/><circle class="fill" cx="24" cy="35" r="2" fill="#3D2C29"/>`),
  'compliance': createSVG(`<path class="stroke" d="M24 4 L40 12 L40 28 Q40 40 24 44 Q8 40 8 28 L8 12 Z"/><path class="fill" d="M18 26 L22 30 L30 22 L28 20 L22 26 L20 24 Z"/>`),
  'partnership': createSVG(`<path class="fill" d="M8 24 Q8 8 24 8 Q40 8 40 24 Q40 40 24 40 Q8 40 8 24 Z" opacity="0.3"/><path class="stroke" d="M8 24 Q8 8 24 8 Q40 8 40 24 Q40 40 24 40 Q8 40 8 24 Z"/><circle class="fill" cx="24" cy="24" r="8"/>`),
  'game': createSVG(`<path class="stroke" d="M8 36 L16 28 L8 20"/><path class="stroke" d="M40 36 L32 28 L40 20"/><circle class="fill" cx="24" cy="24" r="6"/><circle class="stroke" cx="24" cy="24" r="6"/>`),
  'capture': createSVG(`<path class="stroke" d="M12 24 Q12 12 24 12 Q36 12 36 24 Q36 36 24 36 Q12 36 12 24 Z"/><path class="stroke" d="M8 24 L16 24 M32 24 L40 24 M24 8 L24 16 M24 32 L24 40"/>`),
  // === 业务运营类 ===
  'capacity': createSVG(`<circle class="fill" cx="16" cy="28" r="10" opacity="0.3"/><circle class="stroke" cx="16" cy="28" r="10"/><circle class="fill" cx="32" cy="28" r="10" opacity="0.3"/><circle class="stroke" cx="32" cy="28" r="10"/><circle class="fill" cx="24" cy="16" r="10"/><circle class="stroke" cx="24" cy="16" r="10"/>`),
  'quality': createSVG(`<polygon class="fill" points="24,4 30,18 44,20 34,30 36,44 24,38 12,44 14,30 4,20 18,18"/><polygon class="stroke" points="24,4 30,18 44,20 34,30 36,44 24,38 12,44 14,30 4,20 18,18"/>`),
  'efficiency': createSVG(`<circle class="stroke" cx="24" cy="28" r="16"/><path class="fill" d="M24 4 L28 16 L24 24 L20 16 Z"/><line class="stroke" x1="24" y1="28" x2="24" y2="16"/><line class="stroke" x1="24" y1="28" x2="32" y2="32"/>`),
  'cost': createSVG(`<circle class="fill" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="18"/><text x="24" y="30" text-anchor="middle" font-size="18" font-weight="bold" fill="#3D2C29">¥</text>`),
  'headcount': createSVG(`<circle class="fill" cx="16" cy="14" r="6"/><circle class="stroke" cx="16" cy="14" r="6"/><path class="stroke" d="M8 36 Q16 28 24 36"/><circle class="fill" cx="32" cy="14" r="6"/><circle class="stroke" cx="32" cy="14" r="6"/><path class="stroke" d="M24 36 Q32 28 40 36"/>`),
  'connection-rate': createSVG(`<path class="stroke" d="M8 34 Q24 14 40 34"/><circle class="fill" cx="8" cy="34" r="4"/><circle class="fill" cx="24" cy="20" r="4"/><circle class="fill" cx="40" cy="34" r="4"/>`),
  'conversion-rate': createSVG(`<path class="fill" d="M8 8 L40 8 L40 32 L8 32 Z" opacity="0.2"/><path class="stroke" d="M8 8 L40 8 L40 32 L8 32 Z"/><path class="fill" d="M8 32 L24 16 L40 32 Z"/>`),
  'completion-rate': createSVG(`<circle class="fill" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M14 24 L20 30 L34 16" stroke="white" stroke-width="3"/>`),
  'satisfaction': createSVG(`<circle class="fill" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="18"/><circle cx="16" cy="20" r="2" fill="#3D2C29"/><circle cx="32" cy="20" r="2" fill="#3D2C29"/><path class="stroke" d="M16 30 Q24 38 32 30" stroke="#3D2C29" stroke-width="2"/>`),
  'complaint': createSVG(`<path class="fill" d="M8 8 Q32 8 32 24 Q32 32 24 32 L16 32 L8 44 L8 32 Q4 32 4 24 Q4 8 8 8"/><path class="stroke" d="M8 8 Q32 8 32 24 Q32 32 24 32 L16 32 L8 44 L8 32 Q4 32 4 24 Q4 8 8 8"/><circle class="fill" cx="14" cy="20" r="2" fill="#3D2C29"/><circle class="fill" cx="22" cy="20" r="2" fill="#3D2C29"/><path class="stroke" d="M12 28 Q18 32 24 28" stroke="#3D2C29"/>`),
  'qc': createSVG(`<circle class="stroke" cx="20" cy="20" r="12"/><line class="stroke" x1="28" y1="28" x2="40" y2="40" stroke-width="3"/><path class="stroke" d="M14 20 L18 24 L26 16"/>`),
  'training': createSVG(`<rect class="stroke" x="4" y="12" width="40" height="28" rx="2"/><circle class="fill" cx="24" cy="8" r="4"/><path class="stroke" d="M16 28 L24 20 L32 28"/>`),
  'scheduling': createSVG(`<rect class="stroke" x="6" y="8" width="36" height="36" rx="2"/><line class="stroke" x1="6" y1="18" x2="42" y2="18"/><line class="stroke" x1="16" y1="8" x2="16" y2="4"/><line class="stroke" x1="32" y1="8" x2="32" y2="4"/><circle class="fill" cx="16" cy="28" r="3"/><circle class="fill" cx="24" cy="28" r="3"/><circle class="fill" cx="32" cy="28" r="3"/>`),
  'onsite': createSVG(`<path class="stroke" d="M24 4 L40 16 L40 40 L8 40 L8 16 Z"/><rect class="fill" x="18" y="26" width="12" height="14"/><path class="stroke" d="M18 26 L24 20 L30 26"/>`),
  'remote': createSVG(`<rect class="stroke" x="4" y="12" width="40" height="24" rx="2"/><path class="stroke" d="M4 36 L24 24 L44 36"/><circle class="fill" cx="24" cy="8" r="6"/>`),
  'peak': createSVG(`<path class="stroke" d="M4 40 L16 20 L24 8 L32 20 L44 40"/><circle class="fill" cx="24" cy="8" r="4"/>`),
  'valley': createSVG(`<path class="stroke" d="M4 8 L16 28 L24 40 L32 28 L44 8"/><circle class="fill" cx="24" cy="40" r="4"/>`),
  'scale-up': createSVG(`<rect class="stroke" x="8" y="20" width="32" height="20" rx="2"/><path class="stroke" d="M24 4 L24 16 M18 10 L24 4 L30 10"/><path class="fill" d="M12 28 L36 28 L36 36 L12 36 Z"/>`),
  'scale-down': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="20" rx="2"/><path class="stroke" d="M24 28 L24 40 M18 34 L24 40 L30 34"/><path class="fill" d="M12 12 L36 12 L36 20 L12 20 Z"/>`),
  'emergency': createSVG(`<path class="fill" d="M24 4 Q40 16 32 28 L24 44 L16 28 Q8 16 24 4"/><path class="stroke" d="M24 4 Q40 16 32 28 L24 44 L16 28 Q8 16 24 4"/><text x="24" y="26" text-anchor="middle" font-size="16" font-weight="bold" fill="white">!</text>`),
  'optimization': createSVG(`<path class="stroke" d="M8 36 L20 24 L28 30 L40 12"/><path class="fill" d="M36 8 L44 12 L40 20 Z"/>`),
  'iteration': createSVG(`<path class="stroke" d="M12 24 A12 12 0 1 1 24 36"/><path class="fill" d="M24 32 L24 40 L32 36 Z"/>`),
  'pilot': createSVG(`<path class="stroke" d="M24 4 L24 44"/><path class="fill" d="M24 4 L36 16 L24 12 Z"/>`),
  'rollout': createSVG(`<path class="stroke" d="M24 8 L24 40"/><path class="fill" d="M24 8 L16 16 L20 16 L20 24 L28 24 L28 16 L32 16 Z"/><path class="fill" d="M12 32 L16 28 L16 32 L32 32 L32 28 L36 32 L32 36 L16 36 L16 40 Z"/>`),
  'delivery': createSVG(`<rect class="stroke" x="8" y="16" width="32" height="24" rx="2"/><path class="stroke" d="M8 24 L40 24"/><circle class="stroke" cx="16" cy="40" r="4"/><circle class="stroke" cx="32" cy="40" r="4"/><path class="fill" d="M24 8 L32 16 L16 16 Z"/>`),
  // === 数据分析类 ===
  'kpi': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="12"/><circle class="stroke" cx="24" cy="24" r="6"/><circle class="fill" cx="24" cy="24" r="3"/>`),
  'ranking': createSVG(`<path class="fill" d="M8 32 L16 32 L16 44 L8 44 Z"/><path class="fill" d="M20 20 L28 20 L28 44 L20 44 Z" opacity="0.7"/><path class="fill" d="M32 8 L40 8 L40 44 L32 44 Z" opacity="0.4"/>`),
  'trend': createSVG(`<path class="stroke" d="M4 40 L16 28 L28 32 L44 8"/><path class="fill" d="M36 4 L44 8 L40 16 Z"/>`),
  'alert': createSVG(`<path class="fill" d="M24 4 L44 42 L4 42 Z"/><path class="stroke" d="M24 4 L44 42 L4 42 Z"/><circle cx="24" cy="36" r="2" fill="#3D2C29"/><line class="stroke" x1="24" y1="18" x2="24" y2="28" stroke-width="3"/>`),
  'score': createSVG(`<polygon class="fill" points="24,4 28,18 44,18 32,28 36,44 24,34 12,44 16,28 4,18 20,18"/><polygon class="stroke" points="24,4 28,18 44,18 32,28 36,44 24,34 12,44 16,28 4,18 20,18"/>`),
  'daily-report': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><text x="24" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#3D2C29">D</text><line class="stroke" x1="12" y1="12" x2="36" y2="12"/><line class="stroke" x1="12" y1="36" x2="36" y2="36"/>`),
  'weekly-report': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><text x="24" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#3D2C29">W</text><line class="stroke" x1="12" y1="12" x2="36" y2="12"/><line class="stroke" x1="12" y1="36" x2="36" y2="36"/>`),
  'monthly-report': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><text x="24" y="28" text-anchor="middle" font-size="14" font-weight="bold" fill="#3D2C29">M</text><line class="stroke" x1="12" y1="12" x2="36" y2="12"/><line class="stroke" x1="12" y1="36" x2="36" y2="36"/>`),
  'dashboard': createSVG(`<rect class="stroke" x="4" y="4" width="18" height="18" rx="2"/><rect class="stroke" x="26" y="4" width="18" height="18" rx="2"/><rect class="stroke" x="4" y="26" width="18" height="18" rx="2"/><rect class="stroke" x="26" y="26" width="18" height="18" rx="2"/><path class="fill" d="M8 18 L18 18 L18 10 L8 10 Z"/><path class="fill" d="M30 18 L40 18 L40 6 L30 6 Z" opacity="0.7"/>`),
  'comparison': createSVG(`<rect class="fill" x="8" y="20" width="12" height="24"/><rect class="stroke" x="8" y="20" width="12" height="24"/><rect class="fill" x="28" y="12" width="12" height="32" opacity="0.7"/><rect class="stroke" x="28" y="12" width="12" height="32"/>`),
  'drill-down': createSVG(`<circle class="stroke" cx="24" cy="16" r="10"/><path class="stroke" d="M20 16 L28 16 M24 12 L24 20"/><rect class="stroke" x="8" y="32" width="32" height="12" rx="2"/><path class="stroke" d="M24 26 L24 32"/>`),
  'summary': createSVG(`<path class="stroke" d="M8 16 L24 8 L40 16"/><path class="stroke" d="M8 24 L24 16 L40 24"/><path class="stroke" d="M8 32 L24 24 L40 32"/><path class="stroke" d="M24 8 L24 40"/>`),
  'anomaly': createSVG(`<path class="stroke" d="M4 32 L12 32 L16 16 L20 40 L24 8 L28 36 L32 24 L36 32 L44 32"/><circle class="fill" cx="24" cy="8" r="4"/>`),
  'baseline': createSVG(`<line class="stroke" x1="4" y1="24" x2="44" y2="24" stroke-dasharray="4 2"/><line class="stroke" x1="8" y1="16" x2="8" y2="32"/><line class="stroke" x1="40" y1="16" x2="40" y2="32"/>`),
  'target': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="12"/><circle class="stroke" cx="24" cy="24" r="6"/><circle class="fill" cx="24" cy="24" r="3"/>`),
  'achievement': createSVG(`<path class="stroke" d="M8 40 L24 8 L40 40"/><circle class="fill" cx="24" cy="8" r="4"/><path class="fill" d="M24 8 L28 16 L24 14 L20 16 Z"/>`),
  'gap': createSVG(`<path class="stroke" d="M8 16 L20 16 M28 16 L40 16"/><path class="stroke" d="M20 12 L20 20 M28 12 L28 20"/><text x="24" y="32" text-anchor="middle" font-size="10" fill="#3D2C29">GAP</text>`),
  'forecast': createSVG(`<path class="stroke" d="M4 36 L16 28 L24 32 L36 20"/><path class="stroke" d="M36 20 L44 20" stroke-dasharray="4 2"/><circle class="fill" cx="44" cy="20" r="4"/>`),
  'attribution': createSVG(`<circle class="fill" cx="24" cy="8" r="4"/><circle class="stroke" cx="24" cy="8" r="4"/><circle class="fill" cx="12" cy="28" r="4"/><circle class="stroke" cx="12" cy="28" r="4"/><circle class="fill" cx="36" cy="28" r="4"/><circle class="stroke" cx="36" cy="28" r="4"/><line class="stroke" x1="20" y1="12" x2="14" y2="24"/><line class="stroke" x1="28" y1="12" x2="34" y2="24"/>`),
  'insight': createSVG(`<path class="fill" d="M24 4 Q40 16 32 28 L24 44 L16 28 Q8 16 24 4"/><path class="stroke" d="M24 4 Q40 16 32 28 L24 44 L16 28 Q8 16 24 4"/><circle cx="24" cy="20" r="3" fill="white"/><line class="stroke" x1="24" y1="26" x2="24" y2="32" stroke="white" stroke-width="2"/>`),
  // === 沟通协作类 ===
  'meeting': createSVG(`<rect class="stroke" x="4" y="16" width="40" height="24" rx="2"/><circle class="fill" cx="16" cy="8" r="6"/><circle class="stroke" cx="16" cy="8" r="6"/><circle class="fill" cx="32" cy="8" r="6"/><circle class="stroke" cx="32" cy="8" r="6"/>`),
  'report': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="24" rx="2"/><circle class="fill" cx="24" cy="16" r="6"/><circle class="stroke" cx="24" cy="16" r="6"/><circle class="fill" cx="12" cy="38" r="4"/><circle class="fill" cx="24" cy="38" r="4"/><circle class="fill" cx="36" cy="38" r="4"/>`),
  'feedback': createSVG(`<path class="fill" d="M8 8 Q32 8 32 24 Q32 32 24 32 L16 32 L8 44 L8 32 Q4 32 4 24 Q4 8 8 8"/><path class="stroke" d="M8 8 Q32 8 32 24 Q32 32 24 32 L16 32 L8 44 L8 32 Q4 32 4 24 Q4 8 8 8"/><line class="stroke" x1="12" y1="18" x2="24" y2="18"/><line class="stroke" x1="12" y1="26" x2="20" y2="26"/>`),
  'follow-up': createSVG(`<circle class="stroke" cx="24" cy="24" r="16"/><path class="stroke" d="M24 12 L24 24 L32 28"/><path class="fill" d="M36 8 L44 16 L36 24 L32 20 L40 16 L32 12 Z"/>`),
  'coordination': createSVG(`<circle class="stroke" cx="16" cy="16" r="10"/><circle class="stroke" cx="32" cy="32" r="10"/><path class="fill" d="M22 22 L26 26 L22 30 L18 26 Z"/>`),
  'push': createSVG(`<rect class="stroke" x="8" y="20" width="24" height="16" rx="2"/><path class="stroke" d="M32 28 L44 28"/><path class="fill" d="M40 24 L44 28 L40 32 Z"/>`),
  'sync': createSVG(`<path class="stroke" d="M12 32 A12 12 0 0 1 12 16"/><path class="fill" d="M8 16 L12 8 L16 16 Z"/><path class="stroke" d="M36 16 A12 12 0 0 1 36 32"/><path class="fill" d="M40 32 L36 40 L32 32 Z"/>`),
  'confirm': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M14 24 L20 30 L34 16" stroke-width="3"/>`),
  'ask': createSVG(`<path class="fill" d="M8 8 Q32 8 32 24 Q32 32 24 32 L16 32 L8 44 L8 32 Q4 32 4 24 Q4 8 8 8"/><path class="stroke" d="M8 8 Q32 8 32 24 Q32 32 24 32 L16 32 L8 44 L8 32 Q4 32 4 24 Q4 8 8 8"/><text x="18" y="24" font-size="16" font-weight="bold" fill="#3D2C29">?</text>`),
  'warn': createSVG(`<path class="fill" d="M8 12 L24 4 L40 12 L40 36 L24 44 L8 36 Z"/><path class="stroke" d="M8 12 L24 4 L40 12 L40 36 L24 44 L8 36 Z"/><line class="stroke" x1="24" y1="14" x2="24" y2="26"/><circle class="fill" cx="24" cy="32" r="2"/>`),
  'rectify': createSVG(`<path class="stroke" d="M24 8 L24 32"/><path class="stroke" d="M16 24 L24 32 L32 24"/><circle class="stroke" cx="24" cy="38" r="4"/>`),
  'review': createSVG(`<circle class="stroke" cx="20" cy="20" r="12"/><line class="stroke" x1="28" y1="28" x2="40" y2="40" stroke-width="3"/><path class="stroke" d="M16 20 L20 24 L26 18"/>`),
  'consensus': createSVG(`<circle class="fill" cx="12" cy="24" r="6"/><circle class="stroke" cx="12" cy="24" r="6"/><circle class="fill" cx="36" cy="24" r="6"/><circle class="stroke" cx="36" cy="24" r="6"/><path class="stroke" d="M20 24 L28 24"/><path class="fill" d="M22 20 L28 24 L22 28 Z"/>`),
  'decision': createSVG(`<path class="stroke" d="M24 8 L24 24"/><path class="stroke" d="M24 24 L12 40"/><path class="stroke" d="M24 24 L36 40"/><circle class="fill" cx="24" cy="24" r="4"/><circle class="stroke" cx="24" cy="24" r="4"/>`),
  'align': createSVG(`<line class="stroke" x1="8" y1="16" x2="40" y2="16"/><line class="stroke" x1="8" y1="32" x2="40" y2="32"/><path class="fill" d="M20 12 L24 16 L20 20 Z"/><path class="fill" d="M28 28 L24 32 L28 36 Z"/>`),
  // === 文档管理类 ===
  'policy': createSVG(`<path class="fill" d="M8 4 L12 8 L16 4 L20 8 L24 4 L28 8 L32 4 L36 8 L40 4 L40 44 L36 40 L32 44 L28 40 L24 44 L20 40 L16 44 L12 40 L8 44 Z"/><path class="stroke" d="M8 4 L12 8 L16 4 L20 8 L24 4 L28 8 L32 4 L36 8 L40 4 L40 44 L36 40 L32 44 L28 40 L24 44 L20 40 L16 44 L12 40 L8 44 Z"/><line class="stroke" x1="14" y1="16" x2="34" y2="16"/><line class="stroke" x1="14" y1="24" x2="34" y2="24"/><line class="stroke" x1="14" y1="32" x2="28" y2="32"/>`),
  'process': createSVG(`<rect class="stroke" x="4" y="8" width="16" height="12" rx="2"/><rect class="stroke" x="28" y="8" width="16" height="12" rx="2"/><rect class="stroke" x="16" y="28" width="16" height="12" rx="2"/><path class="stroke" d="M20 14 L28 14"/><path class="stroke" d="M24 20 L24 28"/>`),
  'standard': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><line class="stroke" x1="8" y1="18" x2="40" y2="18"/><line class="stroke" x1="8" y1="28" x2="40" y2="28"/><line class="stroke" x1="18" y1="8" x2="18" y2="40"/><line class="stroke" x1="30" y1="8" x2="30" y2="40"/>`),
  'guide': createSVG(`<path class="stroke" d="M24 4 L24 44"/><path class="fill" d="M24 4 L36 16 L28 16 L28 20 L20 20 L20 16 L12 16 Z"/><path class="fill" d="M24 44 L12 32 L20 32 L20 28 L28 28 L28 32 L36 32 Z" opacity="0.7"/>`),
  'checklist': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><rect class="fill" x="12" y="12" width="6" height="6"/><rect class="stroke" x="12" y="12" width="6" height="6"/><line class="stroke" x1="22" y1="15" x2="36" y2="15"/><rect class="fill" x="12" y="24" width="6" height="6"/><rect class="stroke" x="12" y="24" width="6" height="6"/><line class="stroke" x1="22" y1="27" x2="36" y2="27"/><rect class="fill" x="12" y="36" width="6" height="6"/><rect class="stroke" x="12" y="36" width="6" height="6"/><line class="stroke" x1="22" y1="39" x2="32" y2="39"/>`),
  'template': createSVG(`<rect class="stroke" x="8" y="4" width="32" height="40" rx="2"/><line class="stroke" x1="14" y1="12" x2="34" y2="12" stroke-dasharray="4 2"/><line class="stroke" x1="14" y1="20" x2="34" y2="20" stroke-dasharray="4 2"/><line class="stroke" x1="14" y1="28" x2="26" y2="28" stroke-dasharray="4 2"/><rect class="fill" x="28" y="32" width="8" height="8" rx="1"/>`),
  'archive': createSVG(`<rect class="stroke" x="8" y="12" width="32" height="32" rx="2"/><path class="stroke" d="M4 12 L24 4 L44 12"/><line class="stroke" x1="16" y1="28" x2="32" y2="28"/>`),
  'version': createSVG(`<rect class="fill" x="8" y="8" width="32" height="12" rx="2" opacity="0.3"/><rect class="stroke" x="8" y="8" width="32" height="12" rx="2"/><rect class="fill" x="10" y="22" width="28" height="10" rx="2" opacity="0.5"/><rect class="stroke" x="10" y="22" width="28" height="10" rx="2"/><rect class="fill" x="12" y="34" width="24" height="8" rx="2"/><rect class="stroke" x="12" y="34" width="24" height="8" rx="2"/>`),
  'approve': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M16 24 L22 30 L32 18" stroke-width="3"/>`),
  'sign': createSVG(`<rect class="stroke" x="8" y="8" width="32" height="32" rx="2"/><path class="stroke" d="M24 36 L32 20 L36 24 L28 40 Z"/><path class="fill" d="M32 20 L36 24 L40 20 L36 16 Z"/>`),
  // === 状态标识类 ===
  'in-progress': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="fill" d="M24 6 A18 18 0 0 1 42 24 L24 24 Z"/>`),
  'completed': createSVG(`<circle class="fill" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M14 24 L20 30 L34 16" stroke="white" stroke-width="3"/>`),
  'pending': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><line class="stroke" x1="24" y1="14" x2="24" y2="26"/><circle class="fill" cx="24" cy="32" r="2"/>`),
  'delayed': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M24 12 L24 26 L32 30"/><circle class="fill" cx="38" cy="38" r="8"/><text x="38" y="42" text-anchor="middle" font-size="10" font-weight="bold" fill="white">!</text>`),
  'closed': createSVG(`<circle class="fill" cx="24" cy="24" r="18"/><circle class="stroke" cx="24" cy="24" r="18"/><path class="stroke" d="M16 16 L32 32 M32 16 L16 32" stroke="white" stroke-width="2"/>`),
  'priority': createSVG(`<polygon class="fill" points="24,4 28,18 44,18 32,28 36,44 24,34 12,44 16,28 4,18 20,18"/><polygon class="stroke" points="24,4 28,18 44,18 32,28 36,44 24,34 12,44 16,28 4,18 20,18"/>`),
  'new': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><line class="stroke" x1="24" y1="14" x2="24" y2="34"/><line class="stroke" x1="14" y1="24" x2="34" y2="24"/>`),
  'update': createSVG(`<path class="stroke" d="M36 24 A12 12 0 1 1 24 12"/><path class="fill" d="M36 8 L44 16 L36 24 L32 20 L40 16 L32 12 Z"/>`),
  'tbd': createSVG(`<circle class="stroke" cx="24" cy="24" r="18"/><text x="24" y="30" text-anchor="middle" font-size="16" font-weight="bold" fill="#3D2C29">?</text>`),
  'risky': createSVG(`<path class="fill" d="M24 4 L44 42 L4 42 Z"/><path class="stroke" d="M24 4 L44 42 L4 42 Z"/><line class="stroke" x1="24" y1="18" x2="24" y2="30" stroke-width="3"/><circle class="fill" cx="24" cy="35" r="2"/>`),
};

const ICON_NAMES = {
  'onboarding': '准入', 'evaluation': '评估', 'exit': '清退', 'negotiation': '谈判',
  'contract': '合同', 'approval': '审批', 'elimination': '淘汰', 'due-diligence': '调研',
  'profile': '档案', 'tiering': '分层', 'top-tier': '头部', 'mid-tier': '中腰部',
  'bottom-tier': '尾部', 'bidding': '招投标', 'qualification': '资质', 'risk': '风险',
  'compliance': '合规', 'partnership': '合作', 'game': '博弈', 'capture': '绑架',
  'capacity': '产能', 'quality': '质量', 'efficiency': '效率', 'cost': '成本',
  'headcount': '人力', 'connection-rate': '接通率', 'conversion-rate': '转化率',
  'completion-rate': '完结率', 'satisfaction': '满意度', 'complaint': '投诉',
  'qc': '质检', 'training': '培训', 'scheduling': '排班', 'onsite': '现场',
  'remote': '远程', 'peak': '高峰', 'valley': '低谷', 'scale-up': '扩容',
  'scale-down': '缩编', 'emergency': '应急', 'optimization': '优化', 'iteration': '迭代',
  'pilot': '试点', 'rollout': '推广', 'delivery': '交付', 'kpi': 'KPI',
  'ranking': '排名', 'trend': '趋势', 'alert': '预警', 'score': '评分',
  'daily-report': '日报', 'weekly-report': '周报', 'monthly-report': '月报',
  'dashboard': '仪表盘', 'comparison': '对比', 'drill-down': '下钻', 'summary': '汇总',
  'anomaly': '异常', 'baseline': '基线', 'target': '目标', 'achievement': '达成',
  'gap': '缺口', 'forecast': '预测', 'attribution': '归因', 'insight': '洞察',
  'meeting': '会议', 'report': '汇报', 'feedback': '反馈', 'follow-up': '跟进',
  'coordination': '协调', 'push': '推进', 'sync': '同步', 'confirm': '确认',
  'ask': '追问', 'warn': '预警', 'rectify': '整改', 'review': '复盘',
  'consensus': '共识', 'decision': '决策', 'align': '拉齐', 'policy': '制度',
  'process': '流程', 'standard': '规范', 'guide': '指南', 'checklist': '清单',
  'template': '模板', 'archive': '归档', 'version': '版本', 'approve': '审批流程',
  'sign': '签署', 'in-progress': '进行中', 'completed': '已完成', 'pending': '待处理',
  'delayed': '已延期', 'closed': '已关闭', 'priority': '重点', 'new': '新增',
  'update': '更新', 'tbd': '待定', 'risky': '风险状态'
};

const CATEGORIES = [
  { name: '供应商管理', icons: ['onboarding','evaluation','exit','negotiation','contract','approval','elimination','due-diligence','profile','tiering','top-tier','mid-tier','bottom-tier','bidding','qualification','risk','compliance','partnership','game','capture'] },
  { name: '业务运营', icons: ['capacity','quality','efficiency','cost','headcount','connection-rate','conversion-rate','completion-rate','satisfaction','complaint','qc','training','scheduling','onsite','remote','peak','valley','scale-up','scale-down','emergency','optimization','iteration','pilot','rollout','delivery'] },
  { name: '数据分析', icons: ['kpi','ranking','trend','alert','score','daily-report','weekly-report','monthly-report','dashboard','comparison','drill-down','summary','anomaly','baseline','target','achievement','gap','forecast','attribution','insight'] },
  { name: '沟通协作', icons: ['meeting','report','feedback','follow-up','coordination','push','sync','confirm','ask','warn','rectify','review','consensus','decision','align'] },
  { name: '文档管理', icons: ['policy','process','standard','guide','checklist','template','archive','version','approve','sign'] },
  { name: '状态标识', icons: ['in-progress','completed','pending','delayed','closed','priority','new','update','tbd','risky'] }
];

// 生成HTML
function generateHTML() {
  let iconsHTML = '';

  for (const category of CATEGORIES) {
    iconsHTML += `
  <div class="category">
    <h2 class="category-title">
      ${category.name}
      <span class="category-count">${category.icons.length}个</span>
    </h2>
    <div class="icons-grid">
`;

    for (const iconName of category.icons) {
      const svg = ICON_DEFS[iconName];
      if (svg) {
        iconsHTML += `      <div class="icon-card" data-name="${iconName}" onclick="copyIcon('${iconName}')">
        ${svg}
        <div class="icon-name">${ICON_NAMES[iconName]}</div>
        <div class="icon-en">${iconName}</div>
      </div>
`;
      }
    }

    iconsHTML += `    </div>
  </div>
`;
  }

  return `<!DOCTYPE html>
<html lang="zh">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>手绘图标库 — 100个图标预览</title>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;600&family=DM+Sans:wght@400;500&display=swap" rel="stylesheet">
  <style>
    :root {
      --terracotta: #E2725B;
      --terracotta-deep: #CA6641;
      --cream: #F5F1EE;
      --charcoal: #3D2C29;
      --grey-mid: #C5C1BE;
    }
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: 'DM Sans', sans-serif;
      background: var(--cream);
      color: var(--charcoal);
      min-height: 100vh;
      padding: 2rem;
    }
    h1 {
      font-family: 'Cormorant Garamond', serif;
      font-size: 2.5rem;
      margin-bottom: 0.5rem;
    }
    .subtitle {
      color: var(--grey-mid);
      margin-bottom: 2rem;
    }
    .stats {
      display: flex;
      gap: 2rem;
      margin-bottom: 2rem;
      padding: 1rem;
      background: white;
      border-radius: 8px;
    }
    .stat { text-align: center; }
    .stat-value {
      font-size: 2rem;
      font-weight: 700;
      color: var(--terracotta);
    }
    .stat-label {
      font-size: 0.75rem;
      color: var(--grey-mid);
      text-transform: uppercase;
    }
    .category { margin-bottom: 2rem; }
    .category-title {
      font-family: 'Cormorant Garamond', serif;
      font-size: 1.25rem;
      color: var(--terracotta-deep);
      border-bottom: 2px solid var(--terracotta);
      padding-bottom: 0.5rem;
      margin-bottom: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .category-count {
      font-size: 0.875rem;
      color: var(--grey-mid);
      font-family: 'DM Sans', sans-serif;
    }
    .icons-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 0.75rem;
    }
    .icon-card {
      background: white;
      border-radius: 6px;
      padding: 0.75rem;
      text-align: center;
      transition: all 0.2s;
      cursor: pointer;
      border: 2px solid transparent;
    }
    .icon-card:hover {
      transform: translateY(-2px);
      border-color: var(--terracotta);
    }
    .icon-card svg {
      width: 40px;
      height: 40px;
      margin-bottom: 0.25rem;
    }
    .icon-name {
      font-size: 0.625rem;
      color: var(--charcoal);
      font-weight: 500;
    }
    .icon-en {
      font-size: 0.5rem;
      color: var(--grey-mid);
      font-family: monospace;
    }
    .search-box { margin-bottom: 1.5rem; }
    .search-input {
      width: 100%;
      max-width: 400px;
      padding: 0.75rem 1rem;
      border: 2px solid var(--grey-mid);
      border-radius: 6px;
      font-size: 1rem;
      font-family: inherit;
      transition: border-color 0.2s;
    }
    .search-input:focus {
      outline: none;
      border-color: var(--terracotta);
    }
    .toast {
      position: fixed;
      bottom: 2rem;
      left: 50%;
      transform: translateX(-50%);
      background: var(--charcoal);
      color: white;
      padding: 0.75rem 1.5rem;
      border-radius: 6px;
      font-size: 0.875rem;
      opacity: 0;
      transition: opacity 0.3s;
      z-index: 1000;
    }
    .toast.show { opacity: 1; }
  </style>
</head>
<body>
  <h1>手绘图标库</h1>
  <p class="subtitle">100个供应商管理场景图标 · 点击复制SVG代码</p>

  <div class="stats">
    <div class="stat">
      <div class="stat-value">100</div>
      <div class="stat-label">图标总数</div>
    </div>
    <div class="stat">
      <div class="stat-value">6</div>
      <div class="stat-label">分类</div>
    </div>
  </div>

  <div class="search-box">
    <input type="text" class="search-input" placeholder="搜索图标..." oninput="filterIcons(this.value)">
  </div>

${iconsHTML}

  <div class="toast" id="toast">已复制到剪贴板</div>

  <script>
    const ICON_SVGS = ${JSON.stringify(ICON_DEFS, null, 2)};

    function copyIcon(name) {
      const svg = ICON_SVGS[name];
      if (svg) {
        navigator.clipboard.writeText(svg);
        const toast = document.getElementById('toast');
        toast.textContent = '已复制 ' + name + '.svg';
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 2000);
      }
    }

    function filterIcons(query) {
      const q = query.toLowerCase();
      document.querySelectorAll('.icon-card').forEach(card => {
        const name = card.dataset.name;
        const cnName = card.querySelector('.icon-name').textContent;
        const match = name.includes(q) || cnName.includes(q);
        card.style.display = match ? '' : 'none';
      });
    }
  </script>
</body>
</html>`;
}

// 执行
const html = generateHTML();
fs.writeFileSync(path.join(__dirname, 'icon-preview.html'), html);
console.log('✅ icon-preview.html 已生成');