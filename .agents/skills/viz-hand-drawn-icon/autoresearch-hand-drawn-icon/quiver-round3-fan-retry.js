#!/usr/bin/env node
/**
 * Quiver API Round 3 Retry: 电扇（修正版）
 * 修正：明确物体、添加否定约束、增加视觉锚点
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
  console.log('🎨 Round 3 Retry: 电扇（修正 Prompt）\n');
  console.log('='.repeat(50));

  // 修正后的 Prompt：明确物体、添加否定约束、增加视觉锚点
  const prompt = `A hand-drawn electric COOLING FAN — the machine that blows air to cool people.

IMPORTANT NEGATIVE CONSTRAINTS:
- NOT a human face
- NOT a sports fan
- NOT a hand-held folding fan
- This is an ELECTRIC APPLIANCE

Visual anchors (must include):
1. Circular protective grille (wire mesh circle, front and center)
2. 3-4 fan blades visible through the grille (curved, radiating from center)
3. Vertical stand/neck connecting the fan head to a base
4. Flat stable base at the bottom

Perspective: Slightly elevated view (20-25° angle) — looking slightly down at the fan to show both the circular grille depth and the flat base.

Color philosophy:
- Main body: Rice white #FEFFFE throughout (overall tone for inanimate object)
- Accents: Terracotta #D6654B for functional controls only — use sparingly, ≤10%
- Shadows: Deep terracotta #B03A21 for grille mesh shadows and base depth
- Strokes: Ink black #1A1612 for all outlines

Structure:
- Layer 1: Circular protective grille (outer ring + wire mesh pattern + center hub)
- Layer 2: Fan blades (3-4 curved blades radiating from center, show depth through grille)
- Layer 3: Stand/neck (vertical rod connecting fan head to base)
- Layer 4: Base (flat circular or oval platform for stability)
- Layer 5: Controls (speed switch button on base, power cord)

Line hierarchy:
- Main outline: 4.0px (grille outer ring, base silhouette)
- Structure lines: 3.0px (grille mesh, stand, blade edges)
- Detail lines: 1.7px (switch button, power cord)

Style: Warm, functional household appliance. The grille circle should have hand-drawn irregularity (not perfect). The wire mesh can be simplified — suggest the grid without drawing every intersection. The fan blades should look curved and organic, not mechanical straight lines.`;

  const instructions = `CRITICAL: This MUST be an electric cooling fan appliance. DO NOT generate a human face. The visual anchors are: (1) circular wire grille, (2) fan blades through grille, (3) vertical stand, (4) flat base. Follow the color philosophy: rice white as overall tone, terracotta accents ONLY for controls (≤10%). Use stroke-linecap="round" and stroke-linejoin="round" for all strokes.`;

  try {
    const result = await generateSVG(prompt, instructions);

    console.log('\n✅ 生成成功！');
    console.log('\n📥 结果:');
    console.log(JSON.stringify(result, null, 2));

    if (result.data && result.data[0] && result.data[0].svg) {
      const fs = require('fs');
      const svg = result.data[0].svg;
      fs.writeFileSync(
        '.claude/skills/hand-drawn-icon/autoresearch-hand-drawn-icon/quiver-round3-fan-retry.svg',
        svg
      );
      console.log('\n💾 SVG 已保存到 quiver-round3-fan-retry.svg');
    }

  } catch (error) {
    console.error('\n❌ 生成失败:', error.message);
    process.exit(1);
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 验证重点：');
  console.log('1. 是否为电扇（不是人脸）？');
  console.log('2. 圆形扇罩是否可见？');
  console.log('3. 扇叶是否清晰（透过扇罩）？');
  console.log('4. 支架和底座是否正确？');
  console.log('5. 色彩是否符合米白主色+陶土点缀？');
}

main();
