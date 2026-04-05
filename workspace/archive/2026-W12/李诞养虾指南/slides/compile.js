const pptxgen = require('pptxgenjs');
const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

// ============================================
// SVG 图标定义（手绘风格）
// ============================================
const SVG_ICONS = {
  'icon-soul': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="m36 62c-20-14-26-24-24-34s10-16 18-16c6 0 10 4 12 8 2-4 6-8 12-8 8 0 16 6 18 16s-4 20-24 34" fill="#FEFFFA" stroke="none"/>
    <path d="m36 62c-20-14-26-24-24-34s10-16 18-16c6 0 10 4 12 8 2-4 6-8 12-8 8 0 16 6 18 16s-4 20-24 34" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <circle cx="36" cy="42" r="3.5" fill="#E2725B"/>
  </svg>`,

  'icon-skills': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <rect x="10" y="10" width="20" height="20" rx="2" fill="#FEFFFA"/>
    <rect x="42" y="10" width="20" height="20" rx="2" fill="#FEFFFA"/>
    <rect x="10" y="42" width="20" height="20" rx="2" fill="#FEFFFA"/>
    <rect x="42" y="42" width="20" height="20" rx="2" fill="#E2725B"/>
    <rect x="10" y="10" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <rect x="42" y="10" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <rect x="10" y="42" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <rect x="42" y="42" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <circle cx="52" cy="52" r="3" fill="#FEFFFA"/>
  </svg>`,

  'icon-memory': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="m12 14c16 2 24 4 24 4v44c0 0-8-2-24-6z" fill="#FEFFFA"/>
    <path d="m60 14c-16 2-24 4-24 4v44c0 0 8-2 24-6z" fill="#FEFFFA"/>
    <path d="m12 14c16 2 24 4 24 4v44c0 0-8-2-24-6z" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <path d="m60 14c-16 2-24 4-24 4v44c0 0 8-2 24-6z" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <line x1="36" y1="18" x2="36" y2="62" stroke="#0B0800" stroke-width="1.3"/>
    <path d="m46 16l3-4l3 4v8h-6z" fill="#E2725B"/>
    <g stroke="#0B0800" stroke-width="1.04" fill="none">
      <line x1="18" y1="28" x2="30" y2="30"/>
      <line x1="18" y1="36" x2="28" y2="38"/>
      <line x1="42" y1="30" x2="54" y2="28"/>
      <line x1="42" y1="38" x2="52" y2="36"/>
    </g>
  </svg>`,

  'icon-balance': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <rect x="26" y="56" width="20" height="6" rx="1.5" fill="#FEFFFA"/>
    <rect x="26" y="56" width="20" height="6" rx="1.5" stroke="#0B0800" stroke-width="1.5" fill="none"/>
    <line x1="36" y1="14" x2="36" y2="56" stroke="#0B0800" stroke-width="1.8"/>
    <line x1="8" y1="22" x2="64" y2="22" stroke="#0B0800" stroke-width="1.8"/>
    <ellipse cx="14" cy="32" rx="10" ry="5" fill="#FEFFFA" stroke="#0B0800" stroke-width="1.5"/>
    <ellipse cx="58" cy="32" rx="10" ry="5" fill="#FEFFFA" stroke="#0B0800" stroke-width="1.5"/>
    <line x1="14" y1="22" x2="14" y2="27" stroke="#0B0800" stroke-width="1.2"/>
    <line x1="58" y1="22" x2="58" y2="27" stroke="#0B0800" stroke-width="1.2"/>
  </svg>`,

  'icon-brain': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M36 8 C22 8 12 20 12 34 C12 48 22 58 36 58 C50 58 60 48 60 34 C60 20 50 8 36 8 Z" fill="#FEFFFA"/>
    <path d="M36 8 C22 8 12 20 12 34 C12 48 22 58 36 58 C50 58 60 48 60 34 C60 20 50 8 36 8 Z" stroke="#E2725B" stroke-width="1.8" fill="none"/>
    <path d="M36 14 Q40 34 36 52" fill="none" stroke="#E2725B" stroke-width="1.5"/>
    <path d="M20 24 Q26 30 22 40" fill="none" stroke="#E2725B" stroke-width="1.2"/>
    <path d="M26 20 Q30 26 26 36" fill="none" stroke="#E2725B" stroke-width="1.2"/>
    <path d="M52 24 Q46 30 50 40" fill="none" stroke="#E2725B" stroke-width="1.2"/>
    <path d="M46 20 Q42 26 46 36" fill="none" stroke="#E2725B" stroke-width="1.2"/>
  </svg>`,

  // 封面大图标 - 虾形装饰
  'icon-shrimp': `<svg viewBox="0 0 120 120" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M60 20 Q80 30 75 50 Q70 70 55 80 Q40 90 30 85 Q20 80 25 65 Q30 50 45 40 Q55 32 60 20" fill="#FEFFFA"/>
    <path d="M60 20 Q80 30 75 50 Q70 70 55 80 Q40 90 30 85 Q20 80 25 65 Q30 50 45 40 Q55 32 60 20" stroke="#E2725B" stroke-width="2" fill="none"/>
    <circle cx="58" cy="35" r="4" fill="#0B0800"/>
    <path d="M45 50 Q55 55 50 65" stroke="#E2725B" stroke-width="1.5" fill="none"/>
    <path d="M35 60 Q45 65 42 75" stroke="#E2725B" stroke-width="1.5" fill="none"/>
    <path d="M70 45 Q85 40 90 50" stroke="#0B0800" stroke-width="1.5" fill="none"/>
    <path d="M75 55 Q90 52 95 60" stroke="#0B0800" stroke-width="1.5" fill="none"/>
  </svg>`,

  // 流程图标 - 步骤
  'icon-steps': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="16" cy="36" r="10" fill="#E2725B"/>
    <circle cx="16" cy="36" r="10" stroke="#0B0800" stroke-width="1.5" fill="none"/>
    <text x="13" y="40" font-size="12" fill="#FEFFFA" font-weight="bold">1</text>
    <line x1="26" y1="36" x2="32" y2="36" stroke="#0B0800" stroke-width="2"/>
    <circle cx="42" cy="36" r="10" fill="#FEFFFA"/>
    <circle cx="42" cy="36" r="10" stroke="#0B0800" stroke-width="1.5" fill="none"/>
    <text x="39" y="40" font-size="12" fill="#0B0800" font-weight="bold">2</text>
    <line x1="52" y1="36" x2="58" y2="36" stroke="#0B0800" stroke-width="2"/>
    <circle cx="66" cy="36" r="6" fill="#E2725B"/>
  </svg>`,

  // 行动图标 - 火箭
  'icon-rocket': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <path d="M36 8 Q50 20 48 40 Q46 55 36 62 Q26 55 24 40 Q22 20 36 8" fill="#FEFFFA"/>
    <path d="M36 8 Q50 20 48 40 Q46 55 36 62 Q26 55 24 40 Q22 20 36 8" stroke="#0B0800" stroke-width="1.8" fill="none"/>
    <circle cx="36" cy="32" r="6" fill="#E2725B"/>
    <path d="M28 50 L20 58 L24 60 L28 52" fill="#E2725B"/>
    <path d="M44 50 L52 58 L48 60 L44 52" fill="#E2725B"/>
    <path d="M30 62 Q36 70 42 62" stroke="#0B0800" stroke-width="1.5" fill="none"/>
  </svg>`,

  // 目标图标 - 靶心
  'icon-target': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="36" cy="36" r="26" fill="none" stroke="#0B0800" stroke-width="1.5"/>
    <circle cx="36" cy="36" r="18" fill="none" stroke="#0B0800" stroke-width="1.5"/>
    <circle cx="36" cy="36" r="10" fill="none" stroke="#E2725B" stroke-width="2"/>
    <circle cx="36" cy="36" r="4" fill="#E2725B"/>
  </svg>`,

  // 部署图标 - 齿轮
  'icon-deploy': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="36" cy="36" r="12" fill="#FEFFFA" stroke="#0B0800" stroke-width="1.8"/>
    <path d="M36 8 L36 16" stroke="#0B0800" stroke-width="2"/>
    <path d="M36 56 L36 64" stroke="#0B0800" stroke-width="2"/>
    <path d="M8 36 L16 36" stroke="#0B0800" stroke-width="2"/>
    <path d="M56 36 L64 36" stroke="#0B0800" stroke-width="2"/>
    <path d="M16 16 L22 22" stroke="#0B0800" stroke-width="2"/>
    <path d="M50 50 L56 56" stroke="#0B0800" stroke-width="2"/>
    <path d="M16 56 L22 50" stroke="#0B0800" stroke-width="2"/>
    <path d="M50 22 L56 16" stroke="#0B0800" stroke-width="2"/>
    <circle cx="36" cy="36" r="5" fill="#E2725B"/>
  </svg>`
};

// ============================================
// SVG → PNG 转换
// ============================================
const SCALE = 3;  // 3x 分辨率
const SIZE = 72 * SCALE;  // 216px

function generateIcons() {
  const imgsDir = path.join(__dirname, 'imgs');

  // 确保 imgs 目录存在
  if (!fs.existsSync(imgsDir)) {
    fs.mkdirSync(imgsDir, { recursive: true });
  }

  // 检查是否有 rsvg-convert（brew install librsvg）
  let useRsvg = false;
  try {
    execSync('which rsvg-convert', { stdio: 'ignore' });
    useRsvg = true;
  } catch (e) {
    // 使用 qlmanage（macOS 内置）
  }

  console.log(`\n🎨 生成图标 (${useRsvg ? 'rsvg-convert' : 'qlmanage'}, ${SIZE}px)...`);

  let generated = 0;
  let skipped = 0;

  for (const [name, svg] of Object.entries(SVG_ICONS)) {
    const outputPath = path.join(imgsDir, `${name}.png`);

    // 检查是否需要重新生成（SVG 定义改变时需要手动删除 PNG）
    if (fs.existsSync(outputPath)) {
      skipped++;
      continue;
    }

    // 写入临时 SVG 文件
    const tmpSvg = `/tmp/${name}.svg`;
    fs.writeFileSync(tmpSvg, svg);

    try {
      if (useRsvg) {
        // 使用 rsvg-convert（更精确）
        execSync(`rsvg-convert -w ${SIZE} -h ${SIZE} "${tmpSvg}" -o "${outputPath}"`, { stdio: 'ignore' });
      } else {
        // 使用 qlmanage（macOS 内置）
        execSync(`qlmanage -t -s ${SIZE} -o /tmp "${tmpSvg}" 2>/dev/null`, { stdio: 'ignore' });
        const qlOutput = `/tmp/${name}.svg.png`;
        if (fs.existsSync(qlOutput)) {
          fs.renameSync(qlOutput, outputPath);
        }
      }
      generated++;
      console.log(`  ✓ ${name}.png`);
    } catch (e) {
      console.error(`  ✗ ${name}: ${e.message}`);
    }
  }

  if (skipped > 0) {
    console.log(`  (${skipped} 个已存在，跳过)`);
  }

  return generated;
}

// ============================================
// 编译 PPTX
// ============================================
async function compile() {
  const pres = new pptxgen();
  pres.layout = 'LAYOUT_16x9';

  // 数据模式 Theme（黑白灰 + 陶土色点缀）
  const theme = {
    primary: "111111",    // 黑 - 主文字
    secondary: "666666",  // 中灰 - 次要文字
    accent: "E2725B",     // 陶土色 - 点缀强调
    light: "E5E5E5",      // 浅灰 - 分割线
    bg: "FFFFFF"          // 纯白背景
  };

  console.log('\n📄 编译幻灯片...');

  for (let i = 1; i <= 7; i++) {
    const num = String(i).padStart(2, '0');
    const slidePath = `./slide-${num}.js`;

    if (fs.existsSync(path.join(__dirname, `slide-${num}.js`))) {
      const slideModule = require(`./slide-${num}.js`);
      slideModule.createSlide(pres, theme);
      console.log(`  ✓ slide-${num}`);
    }
  }

  // 确保输出目录存在
  const outputDir = path.join(__dirname, 'output');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const outputPath = path.join(outputDir, '李诞养虾指南.pptx');
  await pres.writeFile({ fileName: outputPath });
  console.log(`\n✅ PPTX 已生成: ${outputPath}`);

  // 显示文件大小
  const stats = fs.statSync(outputPath);
  const sizeKB = Math.round(stats.size / 1024);
  console.log(`   文件大小: ${sizeKB} KB`);
}

// ============================================
// QA 质量检查
// ============================================
const QA_CHECKS = {
  // 封面检查（不要求页码）
  cover: [
    { id: 'cover-visual', desc: '封面有视觉元素（装饰圆/线条/图案）', required: true },
    { id: 'title-hierarchy', desc: '标题有层次（主标题+副标题）', required: true },
    { id: 'accent-color', desc: '使用了强调色突出关键词', required: true }
  ],

  // 内容页检查
  content: [
    { id: 'card-shadow', desc: '卡片有阴影层（双层偏移）', required: true },
    { id: 'accent-bar', desc: '卡片有强调条（顶部或左侧）', required: false },
    { id: 'visual-break', desc: '有视觉分隔元素（线条/装饰）', required: false },
    { id: 'icon-usage', desc: '使用了视觉元素（图标/序号）', required: false }
  ],

  // 总结页检查（深色背景，风格不同）
  summary: [
    { id: 'accent-color', desc: '使用了强调色', required: true },
    { id: 'title-hierarchy', desc: '标题有层次', required: true }
  ],

  // 全局检查（封面和总结页不需要页码）
  global: [
    { id: 'margin-safe', desc: '边距 >= 0.5 英寸', required: true },
    { id: 'font-consistent', desc: '字体使用一致（中文 Microsoft YaHei）', required: true },
    { id: 'color-theme', desc: '颜色使用 theme 对象而非硬编码', required: true }
  ],

  // 仅内容页需要页码
  contentOnly: [
    { id: 'page-number', desc: '每页有页码徽章', required: true }
  ]
};

function runQAChecks() {
  console.log('\n🔍 QA 质量检查...\n');

  const slides = [
    { file: 'slide-01.js', type: 'cover' },
    { file: 'slide-02.js', type: 'content' },
    { file: 'slide-03.js', type: 'content' },
    { file: 'slide-04.js', type: 'content' },
    { file: 'slide-05.js', type: 'content' },
    { file: 'slide-06.js', type: 'content' },
    { file: 'slide-07.js', type: 'summary' }
  ];

  let totalIssues = 0;

  slides.forEach(slide => {
    const slidePath = path.join(__dirname, slide.file);
    if (!fs.existsSync(slidePath)) return;

    const code = fs.readFileSync(slidePath, 'utf-8');
    const issues = [];

    // 获取适用的检查规则
    let checks = [
      ...QA_CHECKS.global,
      ...(QA_CHECKS[slide.type] || QA_CHECKS.content)
    ];

    // 仅内容页需要页码
    if (slide.type === 'content') {
      checks = [...checks, ...QA_CHECKS.contentOnly];
    }

    checks.forEach(check => {
      const passed = checkCodeForPattern(code, check.id);
      if (!passed && check.required) {
        issues.push({ ...check, slide: slide.file });
      }
    });

    if (issues.length > 0) {
      console.log(`  ⚠️  ${slide.file}`);
      issues.forEach(issue => {
        console.log(`      - ${issue.desc}`);
        if (issue.required) totalIssues++;
      });
    } else {
      console.log(`  ✅ ${slide.file}`);
    }
  });

  if (totalIssues > 0) {
    console.log(`\n❌ 发现 ${totalIssues} 个必须修复的问题`);
    return false;
  } else {
    console.log('\n✅ 所有检查通过');
    return true;
  }
}

function checkCodeForPattern(code, checkId) {
  const patterns = {
    'cover-visual': /addShape.*OVAL|addShape.*LINE|addImage/,
    'title-hierarchy': /fontSize.*\d{2,}[\s\S]*fontSize.*\d{2,}/,
    'accent-color': /accent|E2725B|BA3420/,
    'card-shadow': /E8E4E1|0\.0[346].*y:|shadow/,
    'accent-bar': /w: 0\.05[\s\S]*fill[\s\S]*(accent|E2725B)|0\.05.*h:[\s\S]*accent/,
    'visual-break': /LINE|dashType|OVAL.*fill.*light|分隔|装饰/,
    'icon-usage': /addImage/,
    'page-number': /OVAL[\s\S]*addText.*\d|addText.*\d[\s\S]*OVAL|\d+.*OVAL|页码/,
    'margin-safe': /x: [0-4]\.\d|y: [0-4]\.\d/,
    'font-consistent': /Microsoft YaHei|Georgia|Arial/,
    'color-theme': /theme\.(primary|secondary|accent|light|bg)/
  };

  const pattern = patterns[checkId];
  if (!pattern) return true;
  return pattern.test(code);
}

// ============================================
// 主流程
// ============================================
console.log('═══════════════════════════════════════');
console.log('  李诞养虾指南 PPTX 编译器');
console.log('═══════════════════════════════════════');

// 1. 生成图标
generateIcons();

// 2. 编译 PPTX (async)
(async () => {
  await compile();

  // 3. QA 检查
  const qaPassed = runQAChecks();

  if (!qaPassed) {
    console.log('\n⚠️  请检查上述问题并修复后重新编译');
    process.exit(1);
  }
})();