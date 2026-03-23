#!/usr/bin/env node
/**
 * Quiver AI 日式手绘风格 SVG 生成脚本
 * 基于 zaraintokyo.com 招财猫风格分析
 */

const API_KEY = 'sk_live_JTeCrNxZLMMeBL9pgbijT2';
const BASE_URL = 'https://api.quiver.ai/v1';

// 日式手绘风格配置
const JAPANESE_STYLE = {
  colors: {
    ink: '#0B0800',           // 深墨黑
    cream: '#FEFFFA',         // 奶油白
    vermillion: '#BA3420',     // 朱红
    stone: '#C8B9A0',         // 石灰
  },
  strokes: {
    main: 1.5,      // 主轮廓
    detail: 1.04,   // 细节
    accent: 2.5,    // 强调
  }
};

/**
 * 生成 SVG
 * @param {string} prompt - 主体描述
 * @param {string} instructions - 风格指令
 * @returns {Promise<Object>}
 */
async function generateSVG(prompt, instructions = '') {
  const response = await fetch(`${BASE_URL}/svgs/generations`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'arrow-preview',
      prompt,
      instructions,
      n: 1,
      stream: false,
    }),
  });

  if (!response.ok) {
    const error = await response.json();
    throw new Error(`API Error: ${JSON.stringify(error)}`);
  }

  return response.json();
}

/**
 * 日式手绘风格指令模板
 */
const styleTemplates = {
  // 招财猫 - 精确版
  manekiNeko: `
Japanese maneki-neko (lucky cat), sitting pose, one paw raised, welcoming gesture.

STRUCTURE (draw as separate layered elements):
1. Body: cream #FEFFFA fill, then ink #0B0800 outline (1.5px stroke, round caps/joins)
2. Ears: vermillion #BA3420 fill, then ink outline (left and right ears separately)
3. Collar: vermillion #BA3420 fill, then ink outline around neck
4. Eyes: ink #0B0800 filled almond shapes (not circles), with outline
5. Nose: small vermillion triangle, ink outline (1.04px)
6. Mouth: two vermillion curves (w shape), stroke only
7. Whiskers: 12 thin ink lines (1.04px), 6 on each side, radiating outward
8. Belly/apron: cream fill, then ink outline (large oval shape)
9. Bell: cream fill, then ink outline, with small center circle detail
10. Paws: separated toes with ink outline (3-4 toes visible per paw)
11. CRITICAL: Hand-drawn Japanese kanji character on belly (ink #0B0800 filled)

COLOR PALETTE (exact hex codes):
- Ink/outline: #0B0800 (NOT #140E02 or "black")
- Cream fill: #FEFFFA (NOT #F8FEF0 or "white")
- Vermillion accent: #BA3420 (NOT #B12D1C or "red")

LINE WORK:
- Main body: 1.5px stroke width
- Details (whiskers, nose, toes): 1.04px stroke width
- All strokes: stroke-linecap="round" stroke-linejoin="round"

STYLE:
- Traditional sumi-e ink wash painting aesthetic
- Layered: draw fill shapes FIRST, then overlay stroke outlines on top
- Organic curved paths, not geometric or cartoonish
- Lots of negative space
- Elegant, minimal, refined
- Hand-drawn feel with slight imperfections in curves
`.trim(),

  // 虾
  shrimp: `
Japanese shrimp (ebi), traditional ink wash style.
Curved body, long whiskers, fan tail, segmented shell.

Color palette:
- Ink: #0B0800 (varying opacity for depth)
- Accent: #BA3420 (small marks)
- Background: transparent

Line work:
- Main body: 1.5px stroke
- Whiskers: 1.04px delicate lines
- Segments: 1.04px fine detail lines

Style:
- Sumi-e aesthetic: minimal, lots of negative space
- Organic flowing curves
- Accent marks in vermillion #BA3420
- Elegant, not cartoonish
`.trim(),

  // 通用图标
  icon: (subject) => `
Simple Japanese hand-drawn icon of ${subject}.
Minimal flat design, sumi-e ink style.

Color palette:
- Outline: #0B0800
- Fill: #FEFFFA
- Accent: #BA3420 (use sparingly for emphasis)

Line work:
- 1.5px main strokes
- Round caps and joins
- Clean but organic (slight hand-drawn feel)

Style:
- Minimal, elegant
- Lots of negative space
- One accent color maximum
`.trim(),
};

/**
 * 后处理：修复颜色代码（Quiver 输出颜色有偏差）
 */
function fixColors(svg) {
  const fixes = [
    // 墨色修复
    { from: /#0B0900/g, to: '#0B0800', desc: 'ink color variant 1' },
    { from: /#140E02/g, to: '#0B0800', desc: 'ink color variant 2' },
    { from: /#1A1612/g, to: '#0B0800', desc: 'ink color variant 3' },
    { from: /#0A0700/g, to: '#0B0800', desc: 'ink color variant 4' },

    // 奶油色修复
    { from: /#F8FFEA/g, to: '#FEFFFA', desc: 'cream variant 1' },
    { from: /#F8FEF0/g, to: '#FEFFFA', desc: 'cream variant 2' },
    { from: /#ECE8CC/g, to: '#FEFFFA', desc: 'cream variant 3' },

    // 朱红色修复
    { from: /#B6321B/g, to: '#BA3420', desc: 'vermillion variant 1' },
    { from: /#B12D1C/g, to: '#BA3420', desc: 'vermillion variant 2' },
    { from: /#6D180A/g, to: '#BA3420', desc: 'vermillion variant 3' },
  ];

  let fixed = svg;
  const applied = [];

  for (const fix of fixes) {
    const before = fixed;
    fixed = fixed.replace(fix.from, fix.to);
    if (before !== fixed) {
      applied.push(fix.desc);
    }
  }

  if (applied.length > 0) {
    console.log(`  🔧 颜色修复: ${applied.join(', ')}`);
  }

  return fixed;
}

/**
 * 保存 SVG 到文件
 */
function saveSVG(svg, filename, applyFix = true) {
  const fs = require('fs');
  const path = require('path');
  const filepath = path.join(process.cwd(), filename);

  // 后处理颜色修复
  const processed = applyFix ? fixColors(svg) : svg;

  // 添加 XML 声明和注释
  const header = `<?xml version="1.0" encoding="UTF-8"?>
<!-- Generated with Quiver AI - Japanese Hand-Drawn Style -->
<!-- Color: ink=#0B0800, cream=#FEFFFA, vermillion=#BA3420 -->
`;
  const content = header + processed;

  fs.writeFileSync(filepath, content);
  console.log(`✅ Saved: ${filepath}`);
  return filepath;
}

/**
 * 主函数
 */
async function main() {
  const args = process.argv.slice(2);
  const command = args[0];

  console.log('🎨 Quiver AI 日式手绘风格生成\n');

  try {
    switch (command) {
      case 'cat': {
        console.log('生成招财猫...');
        const result = await generateSVG(
          'Japanese maneki-neko lucky cat, sitting pose, one paw raised, hand-drawn ink style',
          styleTemplates.manekiNeko
        );
        saveSVG(result.data[0].svg, 'maneki-neko.svg');
        console.log('\nUsage:', result.usage);
        break;
      }

      case 'shrimp': {
        console.log('生成虾...');
        const result = await generateSVG(
          'Japanese shrimp, curved body, long whiskers, fan tail, sumi-e ink style',
          styleTemplates.shrimp
        );
        saveSVG(result.data[0].svg, 'shrimp.svg');
        console.log('\nUsage:', result.usage);
        break;
      }

      case 'icon': {
        const subject = args[1] || 'heart';
        console.log(`生成图标: ${subject}...`);
        const template = styleTemplates.icon(subject);
        const result = await generateSVG(
          `Simple hand-drawn ${subject} icon, Japanese style`,
          template
        );
        saveSVG(result.data[0].svg, `${subject}-icon.svg`);
        console.log('\nUsage:', result.usage);
        break;
      }

      case 'custom': {
        const prompt = args[1];
        if (!prompt) {
          console.error('请提供 prompt');
          console.log('用法: node quiver-api.js custom "your prompt here"');
          process.exit(1);
        }
        console.log(`生成: ${prompt}...`);
        const instructions = args[2] || styleTemplates.icon('subject');
        const result = await generateSVG(prompt, instructions);
        const filename = args[3] || 'custom.svg';
        saveSVG(result.data[0].svg, filename);
        console.log('\nUsage:', result.usage);
        break;
      }

      default:
        console.log(`
用法:
  node quiver-api.js cat          # 生成招财猫
  node quiver-api.js shrimp       # 生成虾
  node quiver-api.js icon <name>  # 生成图标 (如: icon heart)
  node quiver-api.js custom <prompt> [instructions] [output]

示例:
  node quiver-api.js cat
  node quiver-api.js icon book
  node quiver-api.js custom "Japanese mountain" "${styleTemplates.icon('mountain')}" mountain.svg

颜色规范:
  墨色:   #0B0800
  奶油:   #FEFFFA
  朱红:   #BA3420
  石灰:   #C8B9A0

线条规范:
  主轮廓: 1.5px
  细节:   1.04px
  强调:   2.5px
        `);
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

// 导出供其他模块使用
module.exports = {
  generateSVG,
  styleTemplates,
  JAPANESE_STYLE,
};

// 直接运行
if (require.main === module) {
  main();
}