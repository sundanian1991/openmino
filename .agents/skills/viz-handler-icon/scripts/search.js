#!/usr/bin/env node

/**
 * Handler Icon — Search Pipeline
 * Primary: Iconify API (150+ collections, 200k+ icons)
 * Fallback: WeaveFox API
 *
 * Usage:
 *   node search.js "<query>" [--style <lucide|mingcute|ph|carbon|mdi|material-symbols|all>] [--topK N]
 */

const STYLE_PREFIXES = {
  lucide: 'lucide',
  mingcute: 'mingcute',
  ph: 'ph',
  phosphor: 'ph',
  carbon: 'carbon',
  mdi: 'mdi',
  'material-symbols': 'material-symbols',
  'material': 'material-symbols',
  all: null,
};

// Iconify collections with style metadata for auto-tagging
const COLLECTION_META = {
  lucide: { styleTags: ['outline', '2px-stroke', 'round', 'minimal'] },
  mingcute: { styleTags: ['precise', 'geometric', 'padding'] },
  ph: { styleTags: ['multi-weight', 'thin', 'light', 'regular', 'bold', 'fill', 'duotone'] },
  carbon: { styleTags: ['enterprise', 'ibm', '16px', '32px', 'precise'] },
  mdi: { styleTags: ['material', 'filled', 'outline'] },
  'material-symbols': { styleTags: ['google', 'variable', 'filled', 'outline', 'rounded'] },
};

async function searchIconify(query, style, topK) {
  const prefix = STYLE_PREFIXES[style] || STYLE_PREFIXES[style.toLowerCase()] || null;

  // Build search URL
  const params = new URLSearchParams({ query, limit: Math.min(topK * 3, 64).toString() });
  if (prefix) params.set('prefix', prefix);

  const url = `https://api.iconify.design/search?${params}`;
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Iconify HTTP ${response.status}`);
  }

  const data = await response.json();
  const icons = (data.icons || []).slice(0, topK);

  // Fetch SVG for each icon
  const results = [];
  for (const iconRef of icons) {
    const [collection, name] = iconRef.split(':');
    if (!collection || !name) continue;

    try {
      const svgUrl = `https://api.iconify.design/${collection}:${name}.svg`;
      const svgResp = await fetch(svgUrl);
      if (!svgResp.ok) continue;
      const svg = await svgResp.text();

      const meta = COLLECTION_META[collection] || { styleTags: [] };
      results.push({
        source: `iconify:${collection}:${name}`,
        collection,
        name,
        svg,
        styleTags: meta.styleTags,
        url: svgUrl,
      });
    } catch (e) {
      // Skip failed fetches
    }
  }

  return results;
}

async function searchWeaveFox(query, topK) {
  const params = new URLSearchParams({ text: query, topK: topK.toString() });
  const apiUrl = `https://www.weavefox.cn/api/open/v1/icon?${params}`;

  const response = await fetch(apiUrl);
  if (!response.ok) {
    throw new Error(`WeaveFox HTTP ${response.status}`);
  }

  const data = await response.json();
  if (!data.status || !data.data?.success) {
    throw new Error(data.message || 'WeaveFox API failed');
  }

  const iconUrls = data.data.data || [];
  const results = [];

  for (const url of iconUrls.slice(0, topK)) {
    try {
      const svgResp = await fetch(url);
      if (!svgResp.ok) continue;
      const svg = await svgResp.text();
      results.push({
        source: `weavefox:${url}`,
        collection: 'weavefox',
        name: url.split('/').pop()?.replace('.svg', '') || 'unknown',
        svg,
        styleTags: ['unknown'],
        url,
      });
    } catch (e) {
      // Skip failed fetches
    }
  }

  return results;
}

function parseArgs(args) {
  const query = args[0];
  let style = 'all';
  let topK = 5;

  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--style' && i + 1 < args.length) {
      style = args[i + 1];
      i++;
    } else if (args[i] === '--topK' && i + 1 < args.length) {
      topK = parseInt(args[i + 1], 10);
      i++;
    }
  }

  return { query, style, topK };
}

async function main() {
  const args = process.argv.slice(2);

  if (args.length < 1 || args[0].startsWith('--')) {
    console.error(JSON.stringify({
      error: 'Missing search query',
      usage: 'node search.js "<query>" [--style <lucide|mingcute|ph|carbon|mdi|material-symbols|all>] [--topK N]',
      examples: [
        'node search.js "warning"',
        'node search.js "search" --style lucide --topK 3',
        'node search.js "bell" --style ph',
      ],
      availableStyles: Object.keys(STYLE_PREFIXES).filter((v, i, a) => a.indexOf(v) === i),
    }, null, 2));
    process.exit(1);
  }

  const { query, style, topK } = parseArgs(args);

  if (!STYLE_PREFIXES[style] && !STYLE_PREFIXES[style.toLowerCase()]) {
    console.error(JSON.stringify({
      error: `Invalid style: "${style}"`,
      availableStyles: Object.keys(STYLE_PREFIXES).filter((v, i, a) => a.indexOf(v) === i),
    }, null, 2));
    process.exit(1);
  }

  let results = [];
  let source = 'iconify';
  let fallback = false;

  // Primary: Iconify
  try {
    results = await searchIconify(query, style, topK);
  } catch (e) {
    // Fallback: WeaveFox
    try {
      results = await searchWeaveFox(query, topK);
      source = 'weavefox';
      fallback = true;
    } catch (e2) {
      console.error(JSON.stringify({
        error: `Both Iconify and WeaveFox failed: ${e2.message}`,
        query,
        style,
      }, null, 2));
      process.exit(1);
    }
  }

  const output = {
    mode: 'search',
    query,
    style,
    source,
    fallback,
    count: results.length,
    results,
  };

  console.log(JSON.stringify(output, null, 2));
}

if (require.main === module) {
  main();
}

module.exports = { searchIconify, searchWeaveFox };
