#!/usr/bin/env node
/**
 * Quiver AI SVG 生成测试脚本
 * 日式手绘风格测试
 */

const API_KEY = 'sk_live_JTeCrNxZLMMeBL9pgbijT2';
const BASE_URL = 'https://api.quiver.ai/v1';

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

async function main() {
  console.log('🎨 Quiver AI SVG 生成测试\n');

  // 测试 1: 招财猫
  console.log('生成招财猫...');
  const cat = await generateSVG(
    'Japanese maneki-neko lucky cat, hand-drawn ink style, raised paw, sitting pose',
    'Use traditional Japanese vermillion #BA3420 for accents, ink black #0B0800 for outlines, cream white #FEFFFA for fill. Minimal clean lines with round stroke caps.'
  );
  console.log('招财猫结果:', JSON.stringify(cat, null, 2));

  // 测试 2: 虾
  console.log('\n生成虾...');
  const shrimp = await generateSVG(
    'Japanese shrimp, traditional sumi-e ink wash style, elegant curved body, long whiskers, fan tail',
    'Use ink black #0B0800 with varying stroke widths (1.04, 1.3, 1.5px), vermillion #BA3420 for accent mark, minimal fill, lots of negative space.'
  );
  console.log('虾结果:', JSON.stringify(shrimp, null, 2));

  console.log('\n✅ 测试完成');
}

main().catch(console.error);