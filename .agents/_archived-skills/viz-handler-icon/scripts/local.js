#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const ASSET_BASE = path.resolve(__dirname, '../../fe-mino-frontend/assets/anthropic-icons');

const VARIANTS = {
  lucide: path.join(ASSET_BASE, 'lucide'),
  'hand-drawn': path.join(ASSET_BASE, 'hand-drawn'),
};

function listIcons() {
  const result = { lucide: [], 'hand-drawn': [] };
  for (const [variant, dir] of Object.entries(VARIANTS)) {
    if (fs.existsSync(dir)) {
      result[variant] = fs.readdirSync(dir)
        .filter(f => f.endsWith('.svg'))
        .map(f => f.replace('.svg', ''))
        .sort();
    }
  }
  return result;
}

function readIcon(id, variant) {
  const dirs = variant
    ? (VARIANTS[variant] ? [VARIANTS[variant]] : [])
    : [VARIANTS.lucide, VARIANTS['hand-drawn']];

  for (const dir of dirs) {
    if (!dir || !fs.existsSync(dir)) continue;
    const filePath = path.join(dir, `${id}.svg`);
    if (fs.existsSync(filePath)) {
      return {
        id,
        variant: dir === VARIANTS.lucide ? 'lucide' : 'hand-drawn',
        svg: fs.readFileSync(filePath, 'utf-8'),
        path: path.relative(process.cwd(), filePath),
      };
    }
  }
  return null;
}

function main() {
  const args = process.argv.slice(2);

  if (args.includes('--list')) {
    const all = listIcons();
    console.log(JSON.stringify({
      mode: 'local',
      action: 'list',
      total: all.lucide.length + all['hand-drawn'].length,
      variants: {
        lucide: { count: all.lucide.length, ids: all.lucide },
        'hand-drawn': { count: all['hand-drawn'].length, ids: all['hand-drawn'] },
      },
    }, null, 2));
    return;
  }

  if (args.length < 1 || args[0].startsWith('--')) {
    console.error(JSON.stringify({
      error: 'Missing icon ID',
      usage: 'node local.js "<icon-id>" [--style <lucide|hand-drawn>]',
      examples: [
        'node local.js "file-py"',
        'node local.js "wave" --style hand-drawn',
        'node local.js --list',
      ],
    }, null, 2));
    process.exit(1);
  }

  const id = args[0];
  let variant = null;
  for (let i = 1; i < args.length; i++) {
    if (args[i] === '--style' && i + 1 < args.length) {
      variant = args[i + 1];
      i++;
    }
  }

  const icon = readIcon(id, variant);
  if (!icon) {
    const all = listIcons();
    const suggestions = [
      ...all.lucide.filter(s => s.includes(id) || id.includes(s)),
      ...all['hand-drawn'].filter(s => s.includes(id) || id.includes(s)),
    ].slice(0, 5);

    console.error(JSON.stringify({
      error: `Icon "${id}" not found`,
      suggestions: suggestions.length > 0 ? suggestions : undefined,
      hint: 'Run "node local.js --list" to see all available icons',
    }, null, 2));
    process.exit(1);
  }

  console.log(JSON.stringify({ mode: 'local', ...icon }, null, 2));
}

if (require.main === module) {
  main();
}

module.exports = { listIcons, readIcon };
