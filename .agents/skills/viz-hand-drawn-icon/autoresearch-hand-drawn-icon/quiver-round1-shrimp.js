#!/usr/bin/env node
/**
 * Quiver API Round 1: 虾
 * 目标：验证 DNA + 设计决策规则能否引导生成"像样的虾"
 */

const API_KEY = 'sk_live_JTeCrNxZLMMeBL9pgbijT2';
const BASE_URL = 'https://api.quiver.ai/v1';

async function generateSVG(prompt, instructions = '') {
  console.log('📤 发送请求到 Quiver API...');
  console.log('Prompt:', prompt);

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

async function main() {
  console.log('🎨 Round 1: 虾 — 设计哲学驱动测试\n');
  console.log('='.repeat(50));

  // 规格文档中的 Prompt
  const prompt = `A hand-drawn shrimp icon in organic, warm style.

Perspective: Side view to show body curves and natural proportions.

Color philosophy:
- Main body: Terracotta #D6654B throughout (overall tone, not segmented)
- Highlights: Rice white #FEFFFE on the back center (most prominent part)
- Shadows: Deep terracotta #B03A21 in body segments and bottom
- Strokes: Ink black #1A1612 for all outlines

Structure:
- Layer 1: One long continuous path for the main body silhouette
- Layer 2: Internal structure (head-body-tail divisions)
- Layer 3: Decorative details (antennae, legs, segment lines)

Line hierarchy:
- Main outline: 4.5px
- Structure lines: 3.8px
- Detail lines: 2.0px

Curve rhythm: Natural, organic Bezier curves with variation (70% small ±5px, 30% large ±15-30px). Avoid mechanical symmetry or regular patterns.

Style: Warm, alive, not rigid specimen or cute cartoon.`;

  const instructions = `Follow the color philosophy strictly: terracotta as overall tone, not segmented coloring. Use stroke-linecap="round" for all strokes. Layer structure: fill-layer first, then stroke-layer.`;

  try {
    const result = await generateSVG(prompt, instructions);

    console.log('\n✅ 生成成功！');
    console.log('\n📥 结果:');
    console.log(JSON.stringify(result, null, 2));

    // 如果返回了 SVG，保存到文件
    if (result.data && result.data[0] && result.data[0].svg) {
      const fs = require('fs');
      const svg = result.data[0].svg;
      fs.writeFileSync(
        '.claude/skills/hand-drawn-icon/autoresearch-hand-drawn-icon/quiver-round1-shrimp.svg',
        svg
      );
      console.log('\n💾 SVG 已保存到 quiver-round1-shrimp.svg');
    }

  } catch (error) {
    console.error('\n❌ 生成失败:', error.message);
    process.exit(1);
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 后续分析重点：');
  console.log('1. 视角选择 — 是否侧视图？角度差异？');
  console.log('2. 结构分解 — 主体轮廓如何一笔到底？');
  console.log('3. 色彩分配 — 陶土色是否贯穿？高光/阴影位置？');
  console.log('4. 曲线节奏 — 有机感和"手抖感"边界？');
}

main();
