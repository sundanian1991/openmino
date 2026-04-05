#!/usr/bin/env node
/**
 * Quiver API Round 3: 杯子
 * 目标：验证器物类模式 + 验证词汇选择原则（无歧义词）
 * 学习重点：器物类的略俯视视角、器物类结构分解
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
  console.log('🎨 Round 3: 杯子 — 器物类模式验证\n');
  console.log('='.repeat(50));

  // 器物类设计哲学
  const prompt = `A hand-drawn drinking cup (ceramic mug) in organic, warm style.

Perspective: Slightly elevated top-down view (15-30 degrees) to show both the circular cup opening and the base.

Color philosophy:
- Main body: Rice white #FEFFFE throughout (overall tone, not segmented)
- Accents: Terracotta #D6654B for the handle and subtle rim highlight (minimal use, focal points only)
- Shadows: Deep ink #1A1612 under the rim, handle base, and cup bottom
- Strokes: Ink black #1A1612 for all outlines

Structure (3 main components → 15-20 sub-paths for simple object):
- Layer 1: Cup body (main silhouette, rim ellipse, interior shadow)
- Layer 2: Handle (curved, attached to right side, with shadow)
- Layer 3: Base (flat bottom ellipse or curved line)

Line hierarchy:
- Main outline: 2.0px (cup body, handle)
- Structure lines: 1.0-1.2px (rim ellipse, interior lines)
- Detail lines: 0.7px (handle shadow, rim highlight)

Curve rhythm: Natural, organic Bezier curves with variation (70% small ±3px, 25% medium ±8px, 5% large ±15px). The handle should have a natural, flowing curve—not a perfect C-shape. The cup body should have subtle asymmetry like a real hand-made mug.

Style: Simple, warm, everyday object. Not geometric or industrial. The cup should feel hand-made, with small imperfections that give it character.

Details to include:
- Subtle rim highlight in terracotta on the front edge
- Handle shadow where it attaches to the cup body
- Small interior shadow to show depth`;

  const instructions = `Follow the color philosophy strictly: rice white as overall tone, terracotta only for handle and minimal rim highlight. Use stroke-linecap="round" and stroke-linejoin="round" for all strokes. Layer structure: 3 main components (body/handle/base), with 15-20 total paths. Keep it simple—this is a basic object, not a complex scene. The perspective must show both the cup opening and the base (15-30 degree elevated view).`;

  try {
    const result = await generateSVG(prompt, instructions);

    console.log('\n✅ 生成成功！');
    console.log('\n📥 结果:');
    console.log(JSON.stringify(result, null, 2));

    if (result.data && result.data[0] && result.data[0].svg) {
      const fs = require('fs');
      const svg = result.data[0].svg;
      fs.writeFileSync(
        '.claude/skills/hand-drawn-icon/autoresearch-hand-drawn-icon/quiver-round3-cup.svg',
        svg
      );
      console.log('\n💾 SVG 已保存到 quiver-round3-cup.svg');
    }

  } catch (error) {
    console.error('\n❌ 生成失败:', error.message);
    process.exit(1);
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 后续分析重点：');
  console.log('1. 词汇选择 — "cup" 是否无歧义？');
  console.log('2. 器物视角 — 略俯视 15-30° 是否正确执行？');
  console.log('3. 器物结构 — 3 组件模式（身/把/底）是否成立？');
  console.log('4. 简单对象 — path 数量是否合理（15-20）？');
  console.log('5. 控笔节奏 — Quiver 的曲线节奏是否比我们自测好？');
}

main();