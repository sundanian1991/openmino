#!/usr/bin/env node
/**
 * validate-nian-html.mjs
 * nian-design HTML 产出校验
 *
 * v3 (2026-06-20)：
 *   - 色板白名单改为从 tokens/colors.css 动态解析（唯一信源，根治双轨制雾蒙蒙）
 *   - R4 ghost 改为「有则校验区间、无则不报错」（对齐 CRAFT-RULES 四选一打破）
 *   - R3 对称布局放行 Split 气质（V2-Split 骨架本就是左右平分）
 *   - 新增 -d 后缀深色 token 支持
 *
 * 用法：node validate-nian-html.mjs path/to/file.html
 *       node validate-nian-html.mjs 'dir/*.html'   (shell 展开)
 *       node validate-nian-html.mjs --strict file.html  (WARN 也算 FAIL)
 *
 * 校验项（任一 FAIL 则 exit 1）：
 *  R2  字体族 ≤2（Playfair serif + Inter/Mono sans；禁 Doto/Georgia）
 *  R2  字重 ≤2（推荐 400 + 600）
 *  R4  ghost opacity 若出现，必须 ∈ [0.03, 0.06]（非强制存在）
 *  配色  所有 hex 必须在 colors.css 解析出的 token 集合内
 *  R3  无对称布局 grid-template-columns:1fr 1fr（Split 气质除外）
 *  头  必须有 <!-- QA: 5/5 passed --> 头注释
 */
import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const COLORS_CSS = resolve(__dirname, '../tokens/colors.css');

// ── CLI ──
const argv = process.argv.slice(2);
const strict = argv.includes('--strict');
const files = argv.filter(a => !a.startsWith('--'));
if (files.length === 0) {
  console.error('用法：node validate-nian-html.mjs <file.html> [more.html ...] [--strict]');
  process.exit(1);
}

// ── 从 colors.css 动态解析所有 hex 值，作为唯一信源 ──
function loadColorWhitelist() {
  let css;
  try {
    css = readFileSync(COLORS_CSS, 'utf-8');
  } catch (e) {
    console.error(`✗ 无法读取 ${COLORS_CSS}：${e.message}`);
    process.exit(1);
  }
  const hexes = new Set();
  // 匹配 : #RRGGBB 或 #RGB，跳过注释行里的说明性 hex（只取 var 定义 + 别名赋值里的）
  const tokenRegex = /--[a-z0-9-]+:\s*(#[0-9a-fA-F]{6}|#[0-9a-fA-F]{3})\b/g;
  let m;
  while ((m = tokenRegex.exec(css)) !== null) {
    hexes.add(m[1].toLowerCase().replace('#', ''));
  }
  // rgba() 里的纯黑纯白也放行
  for (const h of ['ffffff', 'fff', '000', '000000']) hexes.add(h);
  if (hexes.size < 10) {
    console.error(`✗ 从 colors.css 只解析到 ${hexes.size} 个色值，文件可能损坏`);
    process.exit(1);
  }
  return hexes;
}

const ALLOWED_HEX = loadColorWhitelist();

// ── 纯黑纯白别名，用于 rgba() 上下文放行 ──
const MONO = new Set(['ffffff', 'fff', '000', '000000']);

let totalErrors = 0, totalFiles = 0, passedFiles = 0;

for (const filePath of files) {
  const html = readFileSync(resolve(filePath), 'utf-8');
  const errors = [];
  const warnings = [];
  totalFiles++;

  const lineOf = idx => html.substring(0, idx).split('\n').length;

  // 检测气质：Split 气质放行对称布局
  const isSplitTemperament = /data-temperament=["']split["']/i.test(html)
    || /visualStream["']?\s*[:=]\s*["']?split/i.test(html);

  // ── R2-1 字体族 ≤2，禁 Doto/Georgia ──
  const fonts = new Set();
  const famRegex = /font-family:\s*([^;}\n]+)/g;
  let m;
  while ((m = famRegex.exec(html)) !== null) {
    const fam = m[1].replace(/var\(--[^)]+\)/g, '').replace(/['"]/g, '');
    if (/Playfair/i.test(fam)) fonts.add('serif');
    if (/Inter|JetBrains|Mono|system-ui/i.test(fam)) fonts.add('sans');
    if (/Doto/i.test(fam)) errors.push(`L${lineOf(m.index)}: R2 检测到 Doto 字体（禁用，装饰数字用 Playfair italic 替代）`);
    if (/Georgia/i.test(fam)) warnings.push(`L${lineOf(m.index)}: Georgia 仅允许作 Playfair fallback，勿作主字体`);
  }
  if (fonts.size > 2) errors.push(`R2 字体族 ${fonts.size} 个 ${[...fonts].join('+')}（应 ≤2）`);

  // ── R2-2 字重 ≤2 ──
  const weights = new Set();
  const wRegex = /font-weight:\s*(\d+)/g;
  while ((m = wRegex.exec(html)) !== null) weights.add(m[1]);
  if (weights.size > 2) errors.push(`R2 字重 ${weights.size} 种 ${[...weights].sort().join('/')}（应 ≤2，推荐 400+600）`);

  // ── R4 ghost opacity：有则校验区间，无则放行（对齐 CRAFT-RULES 打破四选一）──
  const ghostRegex = /opacity:\s*0\.0(\d)/g;
  let ghostCount = 0;
  while ((m = ghostRegex.exec(html)) !== null) {
    ghostCount++;
    const v = parseInt(m[1]);
    if (v < 3) warnings.push(`L${lineOf(m.index)}: ghost opacity 0.0${v} 过低（<0.03 失效）`);
    else if (v > 6 && v < 10) warnings.push(`L${lineOf(m.index)}: ghost opacity 0.0${v} 偏高（>0.06 喧宾夺主）`);
  }
  // ghost 是打破四选一之一，非强制；但若一处都没打破则提示
  // （accent 色 / 出血图 / 异形元素都算打破，这里不强制 ghost）

  // ── 配色越界：所有 hex 必须 ∈ colors.css 解析出的集合 ──
  const hexRegex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
  const badHex = [];
  while ((m = hexRegex.exec(html)) !== null) {
    const h = m[1].toLowerCase();
    const ctx = html.substring(Math.max(0, m.index - 30), m.index + m[0].length + 10);
    if (ctx.includes('rgba(') || ctx.includes('rgb(')) continue;
    if (ALLOWED_HEX.has(h)) continue;
    if (MONO.has(h)) continue;
    badHex.push(`L${lineOf(m.index)}:${m[0]}`);
  }
  if (badHex.length) errors.push(`配色越界 ${badHex.length} 处（不在 colors.css 内）: ${badHex.slice(0, 6).join(' ')}${badHex.length > 6 ? ' ...' : ''}`);

  // ── R3 对称布局 1fr 1fr / repeat(2,1fr)——Split 气质放行 ──
  const symRegex = /grid-template-columns:\s*(?:1fr\s+1fr(?!\s*\d)|repeat\(\s*2\s*,\s*1fr\s*\))/g;
  const sym = [];
  while ((m = symRegex.exec(html)) !== null) sym.push(`L${lineOf(m.index)}`);
  if (sym.length && !isSplitTemperament) {
    errors.push(`R3 对称布局 ${sym.length} 处（非 Split 气质）: ${sym.join(',')}`);
  } else if (sym.length && isSplitTemperament) {
    warnings.push(`R3 对称布局 ${sym.length} 处，但气质为 Split，放行（V2-Split 骨架合法）`);
  }

  // ── QA 头注释 ──
  if (!/QA:\s*5\/5\s*passed/.test(html)) errors.push('未找到 <!-- QA: 5/5 passed --> 头注释');

  // ── 汇总 ──
  const name = filePath.split('/').pop();
  const fail = errors.length > 0 || (strict && warnings.length > 0);
  if (!fail) {
    passedFiles++;
    console.log(`✅ ${name}  PASS  (warnings: ${warnings.length})`);
    warnings.forEach(w => console.log(`   ⚠  ${w}`));
  } else {
    totalErrors += errors.length;
    console.log(`❌ ${name}  FAIL  (${errors.length} errors${strict ? ' + ' + warnings.length + ' strict-warns' : ''})`);
    errors.forEach(e => console.log(`   ✗  ${e}`));
    warnings.forEach(w => console.log(`   ⚠  ${w}`));
  }
}

console.log('');
console.log('═══════════════════════════════════════');
console.log(`色板信源：tokens/colors.css（${ALLOWED_HEX.size} 色）`);
console.log(`${passedFiles}/${totalFiles} 文件 PASS，共 ${totalErrors} 个 error`);
process.exit(totalErrors === 0 ? 0 : 1);
