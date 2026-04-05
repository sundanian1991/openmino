#!/usr/bin/env node
/**
 * R3 杯子 — 新 Prompt 测试
 * 使用 SKILL.md v6.1 的完整 Prompt 模板
 */

const API_KEY = 'sk_live_JTeCrNxZLMMeBL9pgbijT2';
const BASE_URL = 'https://api.quiver.ai/v1';

async function generateSVG() {
  console.log('🎨 R3 杯子 — 新 Prompt 测试\n');
  console.log('='.repeat(50));

  const prompt = `Create a hand-drawn style SVG illustration of a ceramic coffee cup/mug.

**Subject Details:**
- Object: Simple ceramic coffee cup with handle
- View: Slight overhead angle (20-30°) to show the opening and volume
- Style: Organic, hand-drawn, warm aesthetic
- Complexity: Medium (35-45 paths)

**Color Palette (STRICT - use only these 4 colors):**
- Primary fill: #FEFFFE (rice white) - for the cup body
- Accent: #D6654B (terracotta) - for handle only (1 accent location)
- Shadow/depth: #B03A21 (deep terracotta) - for bottom contact shadow
- Stroke: #1A1612 (ink black) - for ALL outlines

**Design Philosophy:**
- "Organic Warmth" movement - imperfect, human-made feeling
- Lines should feel naturally hand-drawn, not geometrically perfect
- Curve rhythm: breathe between tight and loose control points
- Avoid: perfect symmetry, mechanical regularity, mathematical precision

**Line Specifications:**
- Main outline: 1.5-3.0px (cup body outer contour)
- Structure lines: 0.7-1.5px (rim, handle connection, cup bottom)
- Detail lines: 0.25-0.7px (subtle texture, inner rim)
- ALL strokes MUST have: stroke-linecap="round" stroke-linejoin="round"

**Composition:**
- Canvas: 250x250px, viewBox="0 0 250 250"
- Cup centered, occupying 60-70% of frame
- Handle on right side, organic C-curve
- Show subtle shadow beneath cup for grounding
- Cup opening visible as an ellipse

**Curve Characteristics (CRITICAL):**
- Control point spacing: 20-50px (irregular, not uniform)
- Deviation pattern: 70% within ±5px, 30% sudden ±15-30px
- Avoid: .00 coordinates, perfect mirror symmetry, evenly spaced points
- Target: Natural hand-drawn rhythm like "c11.14 7.83 28.25 9.87 43.46 9.83"

**Layer Structure:**
1. Fill layer: White cup body + terracotta handle + deep terracotta shadow
2. Stroke layer: Black outlines with varying weights (main/structure/detail)

**Negative Constraints:**
- NO gradient fills - use solid colors only
- NO perfect circles or ellipses - hand-drawn curves only
- NO decorative patterns - keep it simple and functional
- NO multiple accent colors - terracotta on handle ONLY
- NO human face or figure - this is a cup object

Output clean SVG code with proper indentation, no CSS classes, inline styles only.`;

  console.log('\n📤 发送请求到 Quiver API...');
  console.log('Prompt 长度:', prompt.length, '字符');

  try {
    const response = await fetch(`${BASE_URL}/svgs/generations`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'arrow-preview',
        prompt,
        n: 1,
        stream: false,
      }),
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`API Error: ${JSON.stringify(error)}`);
    }

    const result = await response.json();
    console.log('\n✅ 生成成功！');
    console.log('📄 SVG 长度:', result.data?.[0]?.svg?.length || 'unknown', '字符');

    // 保存 SVG
    const fs = require('fs');
    const svgContent = result.data?.[0]?.svg;
    if (svgContent) {
      fs.writeFileSync('quiver-r3-cup-new.svg', svgContent);
      console.log('💾 已保存到 quiver-r3-cup-new.svg');

      // 输出 SVG 内容
      console.log('\n--- SVG 输出 ---\n');
      console.log(svgContent);
    }

    return result;
  } catch (error) {
    console.error('\n❌ 错误:', error.message);
    throw error;
  }
}

generateSVG();
