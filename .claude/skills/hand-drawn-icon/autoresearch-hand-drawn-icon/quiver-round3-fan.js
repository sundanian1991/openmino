#!/usr/bin/env node
/**
 * Quiver API Round 3: 电扇（复杂器物）
 * 目标：验证生物类模式（5组件）是否可迁移到器物类
 * 学习重点：可动部件表达、色彩分配差异、网眼简化策略
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
  console.log('🎨 Round 3: 电扇（复杂器物）— 器物类模式验证\n');
  console.log('='.repeat(50));

  // 基于电扇规格书的设计哲学
  const prompt = `A hand-drawn electric desk fan in organic, warm style.

Perspective: Slightly elevated view (20-25° angle) to show both the front grille depth and the base stability.

Color philosophy:
- Main body: Rice white #FEFFFE throughout (overall tone for inanimate object)
- Accents: Terracotta #D6654B for functional controls only (switches, buttons, brand logo) — use sparingly, ≤10%
- Shadows: Deep terracotta #B03A21 for grille intersections and base shadow
- Strokes: Ink black #1A1612 for all outlines

Structure (5 main components → 40-60 sub-components):
- Layer 1: Fan grille (outer ring, mesh/grid pattern, center hub)
- Layer 2: Fan blades (3-4 blades radiating, show depth/overlap, curved edges)
- Layer 3: Stand/neck (connecting rod, optional angle joint)
- Layer 4: Base (stable platform, circular or oval)
- Layer 5: Controls (switch, buttons, power cord)

Line hierarchy:
- Main outline: 4.0px (grille outer ring, base silhouette)
- Structure lines: 3.0px (grille mesh, stand, blade edges)
- Detail lines: 1.7px (switch buttons, logo, power cord)

Curve rhythm: Natural Bezier curves with variation. The grille circle should have hand-drawn irregularity (70% small ±5px deviation, 30% large ±15px). Blade edges should show organic curvature, not mechanical straight lines. The stand can be mostly straight but with slight natural bend.

Style: Warm, functional, not cold industrial. The fan should look like a well-used household item, not a CAD drawing. The mesh pattern can be simplified — suggest the grid without drawing every intersection.

Details to include:
- Speed control switch on the base (circular knob or rectangular button)
- Power cord extending from base (gentle curve)
- Subtle brand logo (simple text or shape)
- Blade depth: show front blades overlapping back blades`;

  const instructions = `Follow the color philosophy strictly: rice white as overall tone, terracotta accents ONLY for functional controls (≤10% of visual weight). Use stroke-linecap="round" and stroke-linejoin="round" for all strokes. Layer structure: define 5 main components (grille/blades/stand/base/controls), then detail each. Total should be around 60-80 paths. Keep the organic, hand-drawn feel—no perfect circles or mechanical symmetry. The fan blades must show depth/perspective (front blades overlapping back blades).`;

  try {
    const result = await generateSVG(prompt, instructions);

    console.log('\n✅ 生成成功！');
    console.log('\n📥 结果:');
    console.log(JSON.stringify(result, null, 2));

    if (result.data && result.data[0] && result.data[0].svg) {
      const fs = require('fs');
      const svg = result.data[0].svg;
      fs.writeFileSync(
        '.claude/skills/hand-drawn-icon/autoresearch-hand-drawn-icon/quiver-round3-fan.svg',
        svg
      );
      console.log('\n💾 SVG 已保存到 quiver-round3-fan.svg');
    }

  } catch (error) {
    console.error('\n❌ 生成失败:', error.message);
    process.exit(1);
  }

  console.log('\n' + '='.repeat(50));
  console.log('📊 后续分析重点：');
  console.log('1. 组件迁移 — 5组件模式（扇罩/扇叶/支架/底座/功能）是否适用？');
  console.log('2. 可动部件 — 扇叶透视是否正确（前后重叠感）？');
  console.log('3. 色彩差异 — 米白主色+陶土点缀≤10% 是否执行？');
  console.log('4. 网眼简化 — 网格线条如何平衡细节与简洁？');
  console.log('5. 器物特征 — 与生物类（虾、猫）的设计哲学差异？');
}

main();
