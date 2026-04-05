const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// 手绘风格 SVG 图标（从 HTML 中提取，统一 72x72 viewBox）
const icons = {
  // 人设 - 心形
  'icon-soul': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- 心形填充层 -->
    <path d="m36 62c-20-14-26-24-24-34s10-16 18-16c6 0 10 4 12 8 2-4 6-8 12-8 8 0 16 6 18 16s-4 20-24 34"
          fill="#FEFFFA" stroke="none"/>
    <!-- 心形墨线层 -->
    <path d="m36 62c-20-14-26-24-24-34s10-16 18-16c6 0 10 4 12 8 2-4 6-8 12-8 8 0 16 6 18 16s-4 20-24 34"
          stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <!-- 朱红心尖 -->
    <circle cx="36" cy="42" r="3.5" fill="#BA3420"/>
  </svg>`,

  // 技能 - 四个模块
  'icon-skills': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- 模块填充层 -->
    <rect x="10" y="10" width="20" height="20" rx="2" fill="#FEFFFA"/>
    <rect x="42" y="10" width="20" height="20" rx="2" fill="#FEFFFA"/>
    <rect x="10" y="42" width="20" height="20" rx="2" fill="#FEFFFA"/>
    <rect x="42" y="42" width="20" height="20" rx="2" fill="#BA3420"/>
    <!-- 模块墨线层 -->
    <rect x="10" y="10" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <rect x="42" y="10" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <rect x="10" y="42" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <rect x="42" y="42" width="20" height="20" rx="2" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <!-- 核心标记 -->
    <circle cx="52" cy="52" r="3" fill="#FEFFFA"/>
  </svg>`,

  // 记忆 - 书本
  'icon-memory': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- 书本填充层 -->
    <path d="m12 14c16 2 24 4 24 4v44c0 0-8-2-24-6z" fill="#FEFFFA"/>
    <path d="m60 14c-16 2-24 4-24 4v44c0 0 8-2 24-6z" fill="#FEFFFA"/>
    <!-- 书本墨线层 -->
    <path d="m12 14c16 2 24 4 24 4v44c0 0-8-2-24-6z" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <path d="m60 14c-16 2-24 4-24 4v44c0 0 8-2 24-6z" stroke="#0B0800" stroke-width="1.3" fill="none"/>
    <line x1="36" y1="18" x2="36" y2="62" stroke="#0B0800" stroke-width="1.3"/>
    <!-- 书签朱红 -->
    <path d="m46 16l3-4l3 4v8h-6z" fill="#BA3420"/>
    <!-- 文字线 -->
    <g stroke="#0B0800" stroke-width="1.04" fill="none">
      <line x1="18" y1="28" x2="30" y2="30"/>
      <line x1="18" y1="36" x2="28" y2="38"/>
      <line x1="42" y1="30" x2="54" y2="28"/>
      <line x1="42" y1="38" x2="52" y2="36"/>
    </g>
  </svg>`,

  // 天平 - 做判断
  'icon-balance': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- 底座填充 -->
    <rect x="26" y="56" width="20" height="6" rx="1.5" fill="#FEFFFA"/>
    <!-- 底座墨线 -->
    <rect x="26" y="56" width="20" height="6" rx="1.5" stroke="#0B0800" stroke-width="1.5" fill="none"/>
    <!-- 支柱 -->
    <line x1="36" y1="14" x2="36" y2="56" stroke="#0B0800" stroke-width="1.8" stroke-linecap="round"/>
    <!-- 横梁 -->
    <line x1="8" y1="22" x2="64" y2="22" stroke="#0B0800" stroke-width="1.8" stroke-linecap="round"/>
    <!-- 左托盘 -->
    <ellipse cx="14" cy="32" rx="10" ry="5" fill="#FEFFFA" stroke="#0B0800" stroke-width="1.5"/>
    <!-- 右托盘 -->
    <ellipse cx="58" cy="32" rx="10" ry="5" fill="#FEFFFA" stroke="#0B0800" stroke-width="1.5"/>
    <!-- 悬挂线 -->
    <line x1="14" y1="22" x2="14" y2="27" stroke="#0B0800" stroke-width="1.2"/>
    <line x1="58" y1="22" x2="58" y2="27" stroke="#0B0800" stroke-width="1.2"/>
  </svg>`,

  // 大脑 - 学习
  'icon-brain': `<svg viewBox="0 0 72 72" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <!-- 大脑轮廓填充 -->
    <path d="M36 8 C22 8 12 20 12 34 C12 48 22 58 36 58 C50 58 60 48 60 34 C60 20 50 8 36 8 Z"
          fill="#FEFFFA"/>
    <!-- 大脑轮廓墨线 -->
    <path d="M36 8 C22 8 12 20 12 34 C12 48 22 58 36 58 C50 58 60 48 60 34 C60 20 50 8 36 8 Z"
          stroke="#6B7F5A" stroke-width="1.8" fill="none"/>
    <!-- 中线 -->
    <path d="M36 14 Q40 34 36 52" fill="none" stroke="#6B7F5A" stroke-width="1.5" stroke-linecap="round"/>
    <!-- 左脑沟回 -->
    <path d="M20 24 Q26 30 22 40" fill="none" stroke="#6B7F5A" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M26 20 Q30 26 26 36" fill="none" stroke="#6B7F5A" stroke-width="1.2" stroke-linecap="round"/>
    <!-- 右脑沟回 -->
    <path d="M52 24 Q46 30 50 40" fill="none" stroke="#6B7F5A" stroke-width="1.2" stroke-linecap="round"/>
    <path d="M46 20 Q42 26 46 36" fill="none" stroke="#6B7F5A" stroke-width="1.2" stroke-linecap="round"/>
  </svg>`,

  // 步骤圆圈 1
  'icon-step-1': `<svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="26" cy="26" r="20" stroke="#0B0800" stroke-width="1.5"/>
    <text x="26" y="32" text-anchor="middle" font-size="16" fill="#0B0800" font-weight="600">1</text>
  </svg>`,

  // 步骤圆圈 2
  'icon-step-2': `<svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="26" cy="26" r="20" stroke="#0B0800" stroke-width="1.5"/>
    <text x="26" y="32" text-anchor="middle" font-size="16" fill="#0B0800" font-weight="600">2</text>
  </svg>`,

  // 步骤圆圈 3
  'icon-step-3': `<svg viewBox="0 0 52 52" xmlns="http://www.w3.org/2000/svg" fill="none" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="26" cy="26" r="20" stroke="#0B0800" stroke-width="1.5"/>
    <text x="26" y="32" text-anchor="middle" font-size="16" fill="#0B0800" font-weight="600">3</text>
  </svg>`,

  // 封面虾（简化版，用于 PPTX）
  'icon-shrimp': `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <ellipse cx="50" cy="50" rx="35" ry="25" fill="#BA3420"/>
    <path d="M20 40 Q35 30 50 40 Q65 50 80 40" stroke="#0B0800" stroke-width="1.5" fill="none"/>
    <circle cx="70" cy="45" r="4" fill="#0B0800"/>
    <path d="M30 50 Q25 60 35 70" stroke="#0B0800" stroke-width="1.5" fill="none"/>
  </svg>`
};

async function generateIcons() {
  const outputDir = path.join(__dirname, 'imgs');

  // 确保输出目录存在
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const scale = 3; // 3x 分辨率

  for (const [name, svg] of Object.entries(icons)) {
    const outputPath = path.join(outputDir, `${name}.png`);

    try {
      // 解析 viewBox 获取原始尺寸
      const viewBoxMatch = svg.match(/viewBox="0 0 (\d+) (\d+)"/);
      const originalWidth = viewBoxMatch ? parseInt(viewBoxMatch[1]) : 72;
      const originalHeight = viewBoxMatch ? parseInt(viewBoxMatch[2]) : 72;

      await sharp(Buffer.from(svg))
        .resize(originalWidth * scale, originalHeight * scale)
        .png()
        .toFile(outputPath);

      console.log(`✓ ${name}.png (${originalWidth * scale}x${originalHeight * scale})`);
    } catch (err) {
      console.error(`✗ ${name}: ${err.message}`);
    }
  }

  console.log('\n所有图标已生成到 imgs/ 目录');
}

generateIcons().catch(console.error);