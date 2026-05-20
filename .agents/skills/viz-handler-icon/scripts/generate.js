#!/usr/bin/env node

/**
 * Handler Icon -- Generate Pipeline
 * Two modes: hand-drawn (Quiver API) or code (AI prompt).
 *
 * Usage:
 *   node generate.js "<description>" --style hand-drawn
 *   node generate.js "<description>" --style code
 */

const HAND_DRAWN_STYLE = {
  colors: {
    terraCotta: '#D6654B',
    inkBlack: '#1A1612',
    riceWhite: '#FEFFFE',
    deepTerra: '#B03A21',
  },
  strokes: {
    main: '4.0-5.5px',
    structure: '2.5-3.5px',
    detail: '1.5-2.0px',
  },
  required: ['stroke-linecap="round"', 'stroke-linejoin="round"'],
  api: {
    endpoint: 'https://api.quiver.ai/v1/svgs/generations',
    model: 'arrow-preview',
    aspectRatio: '1:1',
    style: 'hand-drawn',
  },
};

function buildQuiverPrompt(description) {
  const c = HAND_DRAWN_STYLE.colors;
  return `Hand-drawn icon: ${description}

Style rules:
- Primary stroke: ${c.inkBlack}
- Accent/focal: ${c.terraCotta} (max 2 spots)
- Fill: ${c.riceWhite} for inanimate, ${c.terraCotta} for living
- Shadow: ${c.deepTerra} for bottom weight
- Stroke widths: main 4-5.5px, structure 2.5-3.5px, detail 1.5-2px
- All strokes: stroke-linecap="round" stroke-linejoin="round"
- Organic curves (Q bezier), not perfect geometry
- 24x24 or 48x48 viewBox, single-color outline + selective accent fills`;
}

function buildCodePrompt(description) {
  return `Generate a clean SVG icon for: "${description}"

Requirements:
- xmlns="http://www.w3.org/2000/svg"
- viewBox="0 0 24 24"
- 2px stroke, round linecap/linejoin
- No fill unless specified, outline style
- Single color (default #111111 or currentColor)
- No width/height attributes
- Self-contained, no external references

Output only raw SVG code.`;
}

async function generateQuiver(description) {
  const prompt = buildQuiverPrompt(description);
  const apiKey = process.env.QUIVER_API_KEY;

  if (!apiKey) {
    return {
      mode: 'generate',
      method: 'hand-drawn',
      status: 'ready',
      note: 'QUIVER_API_KEY not set. Use prompt below with api.quiver.ai or an AI generator.',
      prompt,
      api: HAND_DRAWN_STYLE.api,
      svg: null,
    };
  }

  try {
    const response = await fetch(HAND_DRAWN_STYLE.api.endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        prompt,
        model: HAND_DRAWN_STYLE.api.model,
        aspect_ratio: HAND_DRAWN_STYLE.api.aspectRatio,
        style: HAND_DRAWN_STYLE.api.style,
      }),
    });

    if (!response.ok) throw new Error(`Quiver HTTP ${response.status}`);
    const data = await response.json();

    return {
      mode: 'generate',
      method: 'hand-drawn',
      status: 'success',
      svg: data.svg || data.result || null,
      credits: 'quiver.ai',
    };
  } catch (e) {
    return {
      mode: 'generate',
      method: 'hand-drawn',
      status: 'error',
      error: e.message,
      fallback: 'Use "--style code" for AI-generated SVG without API',
    };
  }
}

function generateCode(description) {
  return {
    mode: 'generate',
    method: 'code',
    status: 'ready',
    prompt: buildCodePrompt(description),
    note: 'Pass this prompt to Claude or your AI to receive raw SVG. No API needed.',
    svg: null,
  };
}

function main() {
  const args = process.argv.slice(2);

  if (args.length < 1) {
    console.error(JSON.stringify({
      error: 'Missing description',
      usage: 'node generate.js "<description>" --style <hand-drawn|code>',
      examples: [
        'node generate.js "terracotta tea cup with organic curves" --style hand-drawn',
        'node generate.js "24x24 refresh icon, 2px stroke" --style code',
      ],
    }, null, 2));
    process.exit(1);
  }

  const description = args[0];
  let style = 'code';
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--style' && i + 1 < args.length) {
      style = args[i + 1];
      i++;
    }
  }

  if (style === 'hand-drawn') {
    generateQuiver(description).then(r => console.log(JSON.stringify(r, null, 2)));
  } else if (style === 'code') {
    console.log(JSON.stringify(generateCode(description), null, 2));
  } else {
    console.error(JSON.stringify({ error: `Invalid style: "${style}"`, availableStyles: ['hand-drawn', 'code'] }, null, 2));
    process.exit(1);
  }
}

if (require.main === module) {
  main();
}

module.exports = { generateQuiver, generateCode, buildQuiverPrompt, buildCodePrompt };
