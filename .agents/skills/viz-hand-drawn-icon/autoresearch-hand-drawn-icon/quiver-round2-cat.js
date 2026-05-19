#!/usr/bin/env node
/**
 * Quiver API Round 2: 东京猫（完整版 - 88 path）
 * 目标：验证 R1 学到的"复杂模式"是否适用于更细节的版本
 * 学习重点：细节如何增加但不破坏整体感
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
  console.log('🎨 Round 2: 东京猫（完整版）— 复杂场景深度学习\n');
  console.log('='.repeat(50));

  // 基于东京猫分析报告的设计哲学
  const prompt = `A hand-drawn Japanese lucky cat (maneki-neko) in organic, warm style.

Perspective: Front-facing slightly elevated view to show both the raised paw and the seated posture.

Color philosophy:
- Main body: Cream white #FEFFFA throughout (overall tone, not segmented)
- Accents: Vermillion #BA3420 for collar, bell, and inner ears (focal points, minimal use)
- Shadows: Deep ink #0B0800 in body folds and under the chin
- Strokes: Ink black #0B0800 for all outlines

Structure (5 main components → 25-30 sub-components):
- Layer 1: Head (ears, face, eyes, nose, mouth, whiskers)
- Layer 2: Body (torso, arm patterns, coin)
- Layer 3: Limbs (raised right paw, seated left paw, hidden legs)
- Layer 4: Tail (curved, decorative)
- Layer 5: Base (platform or pillow)

Line hierarchy:
- Main outline: 1.5px (head, body, paws)
- Structure lines: 1.0-1.2px (facial features, limb divisions)
- Detail lines: 0.7px (whiskers, fur texture, coin details)

Curve rhythm: Natural, organic Bezier curves with variation (70% small ±3px, 25% medium ±8px, 5% large ±15px). Avoid mechanical symmetry—left and right sides should have subtle differences like real hand-drawing.

Style: Warm, alive, inviting. Not geometric or stiff. The raised paw should feel dynamic, like greeting. The face should have personality—eyes that look at the viewer, a friendly small smile.

Details to include:
- Coin in the paw (circle with Japanese character or simple pattern)
- Bell on the collar (small circle with clapper)
- Whiskers (3-4 on each side, thin and elegant)
- Subtle fur texture on the body (short strokes, not overdone)`;

  const instructions = `Follow the color philosophy strictly: cream white as overall tone, vermillion as minimal accents (only collar, bell, inner ears). Use stroke-linecap="round" and stroke-linejoin="round" for all strokes. Layer structure: define 5 main components (head/body/limbs/tail/base), then detail each with 5-6 sub-paths. Total should be around 80-90 paths for full detail. Keep the organic, hand-drawn feel—no perfect symmetry, natural curve variations.`;

  try {
    const result = await generateSVG(prompt, instructions);

    console.log('\n✅ 生成成功！');
    console.log('\n📥 结果:');
    console.log(JSON.stringify(result, null, 2));

    if (result.data && result.data[0] && result.data[0].svg) {
      const fs = require('fs');
      const svg = result.data[0].svg;
      fs.writeFileSync(
        '.claude/skills/hand-drawn-icon/autoresearch-hand-drawn-icon/quiver-round2-cat.svg',
        svg
      );
      console.log('\n💾 SVG 已保存到 quiver-round2-cat.svg');
    }

  } catch (error) {
    console.error('\n❌ 生成失败:', error.message);
    process.exit(1);
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 后续分析重点：');
  console.log('1. 复杂度验证 — 88 path 是否带来质的提升？');
  console.log('2. 细节边界 — 哪些细节是必要的，哪些是多余的？');
  console.log('3. 组件模式 — 5 大组件（头/身/四肢/尾/底）如何拆分？');
  console.log('4. 繁而不乱 — 如何在增加细节的同时保持整体感？');
}

main();
