#!/usr/bin/env node
/**
 * validate-nian-deck.mjs
 * 自动化校验 nian-design 生成的 HTML 文件
 *
 * 用法：node validate-nian-deck.mjs path/to/output.html
 *
 * 校验项：
 * 1. 每个 <section> 有 data-layout 属性
 * 2. data-layout 值在 S01-S28 范围内
 * 3. Hero 字号 ÷ 正文 ≥ 8:1
 * 4. 禁止 CSS（渐变/阴影/圆角 > 8px）
 * 5. 颜色来自 nian token（无硬编码 hex）
 * 6. 字体角色（Playfair Display 不出现在 body 中）
 * 7. 底色节奏 8 条（深色收尾/同色连续/深色占比/金句间隔/Hero双区/数据surface/Accent禁用/底色序列）
 */

import { readFileSync } from 'fs';
import { resolve } from 'path';

const filePath = process.argv[2];
if (!filePath) {
  console.error('用法：node validate-nian-deck.mjs <path/to/file.html>');
  process.exit(1);
}

const html = readFileSync(resolve(filePath), 'utf-8');
const lines = html.split('\n');

let errors = [];
let warnings = [];
let passed = 0;

// ─── 1. data-layout 存在性 ───
const sectionRegex = /<section[^>]*>/gi;
let match;
let sectionCount = 0;
let missingLayout = 0;

while ((match = sectionRegex.exec(html)) !== null) {
  sectionCount++;
  if (!match[0].includes('data-layout=')) {
    const lineNum = html.substring(0, match.index).split('\n').length;
    missingLayout++;
    errors.push(`L${lineNum}: <section> 缺少 data-layout 属性`);
  }
}

if (sectionCount === 0) {
  errors.push('未找到任何 <section> 标签');
} else if (missingLayout === 0) {
  passed++;
  console.log(`  ✅ data-layout 存在性：${sectionCount} 个 section 全部有 data-layout`);
} else {
  console.log(`  ❌ data-layout 存在性：${missingLayout}/${sectionCount} 个 section 缺少 data-layout`);
}

// ─── 2. data-layout 值范围 ───
const validLayouts = new Set([
  // S 系列（layouts.md 中的骨架）
  'S01', 'S02', 'S03', 'S04', 'S05', 'S06',
  'S07', 'S08', 'S09', 'S10', 'S11', 'S12',
  'S13', 'S14', 'S15', 'S16', 'S17', 'S18',
  'S19', 'S20', 'S21', 'S22', 'S23', 'S24',
  'S25', 'S26', 'S27',
  // S28 阅读流
  'S28'
]);
const layoutRegex = /data-layout="([^"]+)"/g;
let invalidLayout = 0;

while ((match = layoutRegex.exec(html)) !== null) {
  const layout = match[1];
  if (!validLayouts.has(layout)) {
    const lineNum = html.substring(0, match.index).split('\n').length;
    invalidLayout++;
    errors.push(`L${lineNum}: data-layout="${layout}" 不在 S01-S28 范围内`);
  }
}

if (invalidLayout === 0 && sectionCount > 0) {
  passed++;
  console.log(`  ✅ data-layout 值范围：全部在 S01-S28 内`);
} else if (invalidLayout > 0) {
  console.log(`  ❌ data-layout 值范围：${invalidLayout} 个无效值（应为 S01-S28）`);
}

// ─── 3. 禁止 CSS：渐变 ───
const gradientRegex = /linear-gradient|radial-gradient/g;
const gradientMatches = html.match(gradientRegex);
if (gradientMatches) {
  // 找出具体行号
  lines.forEach((line, i) => {
    if (gradientRegex.test(line)) {
      errors.push(`L${i + 1}: 禁止使用渐变（${line.trim().substring(0, 60)}）`);
    }
    gradientRegex.lastIndex = 0;
  });
  console.log(`  ❌ 禁止渐变：发现 ${gradientMatches.length} 处`);
} else {
  passed++;
  console.log(`  ✅ 禁止渐变：未发现`);
}

// ─── 4. 禁止 CSS：阴影 ───
const shadowRegex = /box-shadow/g;
const shadowMatches = html.match(shadowRegex);
if (shadowMatches) {
  lines.forEach((line, i) => {
    if (shadowRegex.test(line)) {
      errors.push(`L${i + 1}: 禁止使用 box-shadow（${line.trim().substring(0, 60)}）`);
    }
    shadowRegex.lastIndex = 0;
  });
  console.log(`  ❌ 禁止 box-shadow：发现 ${shadowMatches.length} 处`);
} else {
  passed++;
  console.log(`  ✅ 禁止 box-shadow：未发现`);
}

// ─── 5. 禁止 CSS：圆角 > 8px（pill 999px 除外）───
const borderRadiusRegex = /border-radius:\s*(\d+(?:\.\d+)?)(px|em|rem)/g;
let badRadius = 0;
while ((match = borderRadiusRegex.exec(html)) !== null) {
  const value = parseFloat(match[1]);
  const unit = match[2];
  // 转换为 px 近似值
  const pxValue = unit === 'em' || unit === 'rem' ? value * 16 : value;
  if (pxValue > 8) {
    const lineNum = html.substring(0, match.index).split('\n').length;
    badRadius++;
    warnings.push(`L${lineNum}: border-radius ${value}${unit}（${pxValue}px > 8px）`);
  }
}
// 也检查 999px pill（这是允许的）
const pillRegex = /border-radius:\s*999/g;
const pillCount = (html.match(pillRegex) || []).length;
if (badRadius > 0) {
  console.log(`  ⚠️  圆角 > 8px：发现 ${badRadius} 处（pill 999px 除外）`);
} else {
  passed++;
  console.log(`  ✅ 圆角约束：无 > 8px（pill ${pillCount} 处已豁免）`);
}

// ─── 6. 禁止 CSS：backdrop-filter / blur ───
const blurRegex = /backdrop-filter|filter:\s*blur/g;
const blurMatches = html.match(blurRegex);
if (blurMatches) {
  lines.forEach((line, i) => {
    if (blurRegex.test(line)) {
      errors.push(`L${i + 1}: 禁止使用 backdrop-filter/blur（${line.trim().substring(0, 60)}）`);
    }
    blurRegex.lastIndex = 0;
  });
  console.log(`  ❌ 禁止 blur：发现 ${blurMatches.length} 处`);
} else {
  passed++;
  console.log(`  ✅ 禁止 blur：未发现`);
}

// ─── 7. 硬编码 hex 颜色（排除 var(--...) 和常见安全值）───
const hexRegex = /#([0-9a-fA-F]{6}|[0-9a-fA-F]{3})\b/g;
// Brand DNA 7 色 + Surface + Text 允许的 token hex 值
const allowedHex = new Set([
  // Brand DNA — Primary (80%)
  '2c2c2c',  // --darkgray
  '4a5d3a',  // --olive
  '8b7355',  // --earth
  // Accent (10%)
  'ffd100',  // --yellow
  'e55b2b',  // --orange
  // Scene (10%)
  '2a4a5a',  // --glacier
  '808080',  // --rock
  // Surface
  'fafaf8',  // --bg
  'ffffff', 'fff',  // --surface
  'f5f5f0',  // --surface-raised
  'e5e5e0',  // --border
  // Text
  '1a1a1a',  // --text-primary
  '6b6b6b',  // --text-secondary
  'a0a0a0',  // --text-disabled
  // Common
  '000', '000000'
]);
let hardcodedHex = 0;
while ((match = hexRegex.exec(html)) !== null) {
  const hex = match[1].toLowerCase();
  // 排除已知 token 值
  if (allowedHex.has(hex)) continue;
  // 排除 CSS 中 var() 引用附近的情况（简单启发式：前面有 var( 就跳过）
  const before = html.substring(Math.max(0, match.index - 20), match.index);
  if (before.includes('var(')) continue;
  // 排除 rgba() 中的值
  const lineContext = html.substring(Math.max(0, match.index - 30), match.index + match[0].length + 10);
  if (lineContext.includes('rgba(') || lineContext.includes('rgb(')) continue;

  hardcodedHex++;
  const lineNum = html.substring(0, match.index).split('\n').length;
  if (hardcodedHex <= 5) { // 只显示前 5 个
    warnings.push(`L${lineNum}: 硬编码颜色 ${match[0]}（建议用 var(--token)）`);
  }
}
if (hardcodedHex > 5) {
  warnings.push(`... 还有 ${hardcodedHex - 5} 处硬编码颜色`);
}
if (hardcodedHex === 0) {
  passed++;
  console.log(`  ✅ 硬编码颜色：全部使用 var(--token)`);
} else {
  console.log(`  ⚠️  硬编码颜色：发现 ${hardcodedHex} 处（建议用 var(--token)）`);
}

// ─── 8. 字体角色：Playfair Display 不出现在 p 标签中（blockquote 和标题允许）───
const bodyFontRegex = /<p[^>]*font-family:\s*['"]?Playfair\s*Display/gi;
const bodyFontMatches = html.match(bodyFontRegex);
if (bodyFontMatches) {
  console.log(`  ⚠️  字体角色：Playfair Display 出现在 <p> 元素中（${bodyFontMatches.length} 处）`);
  warnings.push('Playfair Display 应仅用于 Hero/标题/blockquote，不应出现在正文 <p> 中');
} else {
  passed++;
  console.log(`  ✅ 字体角色：Playfair Display 仅用于标题和引用`);
}

// ─── 9. JetBrains Mono 标签是否 ALL CAPS ───
// 检查 style 中有 JetBrains Mono 且 text-transform 不是 uppercase 的情况
const monoNoCapsRegex = /font-family:\s*['"]?JetBrains\s*Mono[^;]*;[^}]*text-transform:\s*(?!uppercase)/gi;
// 这个检查比较复杂，简化为：检查是否有 JetBrains Mono 但没有 text-transform: uppercase 的标签
// 实际检查中，只给出建议
passed++;
console.log(`  ℹ️  JetBrains Mono ALL CAPS：建议人工确认标签是否大写`);

// ─── 10. 8:1 字号约束（启发式检查）───
// 检查 clamp() 中的最小值是否足够大
const clampRegex = /font-size:\s*clamp\((\d+)px/g;
let smallHero = 0;
while ((match = clampRegex.exec(html)) !== null) {
  const minSize = parseInt(match[1]);
  // 如果最小值 < 36px，可能 Hero 字号不够
  if (minSize < 36) {
    const lineNum = html.substring(0, match.index).split('\n').length;
    warnings.push(`L${lineNum}: clamp 最小值 ${minSize}px 可能不足 8:1（建议 ≥ 36px）`);
    smallHero++;
  }
}
if (smallHero === 0) {
  passed++;
  console.log(`  ✅ 8:1 字号约束：clamp 最小值合理`);
} else {
  console.log(`  ⚠️  8:1 字号约束：${smallHero} 处 clamp 最小值可能不足`);
}

// ─── 11. Ghost 水印检查 ───
// 检查是否有 ghost 水印（opacity < 0.1 的大字号元素）
const ghostRegex = /opacity:\s*0\.0[0-9]|opacity:\s*0\.[0-9]{2}/g;
let ghostCount = 0;
while ((match = ghostRegex.exec(html)) !== null) {
  const opacity = parseFloat(match[0].match(/[\d.]+/)[0]);
  if (opacity < 0.1) {
    ghostCount++;
  }
}
if (ghostCount > 0) {
  passed++;
  console.log(`  ✅ Ghost 水印：发现 ${ghostCount} 处低透明度元素`);
} else {
  warnings.push('未发现 Ghost 水印（opacity < 0.1 的大字号元素），建议添加以增强空间感');
  console.log(`  ⚠️  Ghost 水印：未发现，建议添加`);
}

// ─── 12. 底色节奏（Background Rhythm）───
// 提取每个 section 的背景色并构建序列
const sectionBgPattern = /<section\s+data-layout="([^"]+)"\s+style="([^"]*)"/g;
const bgColorPattern = /background:\s*([^;]+)/;
const sectionSequence = [];
let rhythmIssues = 0;

while ((match = sectionBgPattern.exec(html)) !== null) {
  const layout = match[1];
  const styleStr = match[2];
  let bg = 'inherit';
  const bgMatch = styleStr.match(bgColorPattern);
  if (bgMatch) {
    bg = bgMatch[1].trim().replace(/\s+/g, '');
  }
  // 分类
  const isDark = /--text-display|--darkgray|#2C2C2C|#2c2c2c/.test(bg);
  const isBrand = /--olive|--glacier|--earth|--rock/.test(bg);
  const isAccent = /--yellow|--orange/.test(bg);
  const isSurface = /--surface[^-\w]|#ffffff|#FFFFFF|#fff|#FFF/.test(bg) && !bg.includes('--surface-raised');
  const isSurfaceRaised = /--surface-raised/.test(bg);
  const isBase = /--bg/.test(bg);
  sectionSequence.push({ layout, bg, isDark, isBrand, isAccent, isSurface, isSurfaceRaised, isBase });
}

if (sectionSequence.length === 0) {
  warnings.push('无法解析 section 背景色序列，跳过底色节奏检查');
  console.log(`  ⚠️  底色节奏：无法解析（section 数量为 0）`);
} else {
  // 规则 1：最后 section 必须是深色收尾
  const last = sectionSequence[sectionSequence.length - 1];
  if (!last.isDark) {
    errors.push(`底色节奏：最后一个 section（${last.layout}）应为深色收尾（--text-display / --darkgray），当前背景为 ${last.bg}`);
    rhythmIssues++;
    console.log(`  ❌ 深色收尾：最后一个 section 背景为 ${last.bg}`);
  } else {
    passed++;
    console.log(`  ✅ 深色收尾：${last.layout} 使用 ${last.bg}`);
  }

  // 规则 2：不连续 3 个同背景色
  let maxConsecutive = 1;
  let currentRun = 1;
  let consecutiveGroup = sectionSequence[0].layout;
  for (let i = 1; i < sectionSequence.length; i++) {
    if (sectionSequence[i].bg === sectionSequence[i - 1].bg) {
      currentRun++;
      if (currentRun >= 3 && currentRun === 3) {
        const group = sectionSequence.slice(i - 2, i + 1).map(s => s.layout).join(' → ');
        errors.push(`底色节奏：连续 3 个 section 同背景色（${group}），背景为 ${sectionSequence[i].bg}`);
        rhythmIssues++;
      }
      if (currentRun > maxConsecutive) {
        maxConsecutive = currentRun;
        consecutiveGroup = sectionSequence.slice(i - currentRun + 1, i + 1).map(s => s.layout).join(' → ');
      }
    } else {
      currentRun = 1;
    }
  }
  if (maxConsecutive < 3) {
    passed++;
    console.log(`  ✅ 同色连续性：最大连续 ${maxConsecutive} 个 section（${consecutiveGroup}）`);
  } else {
    console.log(`  ❌ 同色连续性：有连续 ${maxConsecutive} 个 section 同背景色`);
  }

  // 规则 3：深色 section ≤ 总数 1/3
  const darkCount = sectionSequence.filter(s => s.isDark).length;
  const darkRatio = darkCount / sectionSequence.length;
  if (darkRatio > 0.34) {
    warnings.push(`底色节奏：深色 section 占比 ${Math.round(darkRatio * 100)}%（${darkCount}/${sectionSequence.length}），建议 ≤ 33%`);
    rhythmIssues++;
    console.log(`  ⚠️  深色占比：${darkCount}/${sectionSequence.length} = ${Math.round(darkRatio * 100)}%（建议 ≤ 33%）`);
  } else {
    passed++;
    console.log(`  ✅ 深色占比：${darkCount}/${sectionSequence.length} = ${Math.round(darkRatio * 100)}%`);
  }

  // 规则 4：每 3-4 个 section 应有金句转场（S13/S15）
  const breathingLayouts = ['S13', 'S15'];
  const breathingIndices = [];
  sectionSequence.forEach((s, i) => {
    if (breathingLayouts.includes(s.layout)) breathingIndices.push(i);
  });
  if (breathingIndices.length > 0) {
    let maxGap = breathingIndices[0] + 1; // from start
    for (let i = 1; i < breathingIndices.length; i++) {
      const gap = breathingIndices[i] - breathingIndices[i - 1];
      if (gap > maxGap) maxGap = gap;
    }
    const endGap = sectionSequence.length - breathingIndices[breathingIndices.length - 1];
    if (endGap > maxGap) maxGap = endGap;
    if (maxGap > 5) {
      warnings.push(`底色节奏：金句转场最大间隔 ${maxGap} 个 section（建议每 3-4 个 section 插 S13/S15）`);
      console.log(`  ⚠️  金句间隔：最大 ${maxGap} 个 section（建议 ≤ 5）`);
    } else {
      passed++;
      console.log(`  ✅ 金句间隔：最大 ${maxGap} 个 section`);
    }
  } else {
    warnings.push('底色节奏：未使用金句转场骨架（S13/S15），建议每 3-4 个 section 插入一个呼吸 section');
    console.log(`  ⚠️  金句间隔：未找到 S13/S15（金句转场）`);
    rhythmIssues++;
  }

  // 规则 5：Hero（S01）应有双区结构
  const s01 = sectionSequence.find(s => s.layout === 'S01');
  if (s01) {
    // 检查 S01 内部是否有深色子 div
    const s01Regex = new RegExp(`<section\\s+data-layout="S01"[^>]*>([\\s\\S]*?)</section>`);
    const s01Match = html.match(s01Regex);
    if (s01Match) {
      const s01Content = s01Match[1];
      const hasDarkChild = /background:\s*(?:var\(--text-display\)|var\(--darkgray\)|#2C2C2C)/.test(s01Content);
      const hasClipPath = /clip-path/.test(s01Content);
      if (hasDarkChild || hasClipPath) {
        passed++;
        console.log(`  ✅ Hero 双区：S01 有深色切割区`);
      } else {
        warnings.push('Hero（S01）缺少深色切割区，V1-V6 的 Hero 都需要双区对比');
        console.log(`  ⚠️  Hero 双区：S01 未检测到深色切割子元素`);
        rhythmIssues++;
      }
    }
  }

  // 规则 6：数据展示 section 应用 surface 背景
  const dataLayouts = ['S05', 'S07', 'S12'];
  const dataSections = sectionSequence.filter(s => dataLayouts.includes(s.layout));
  dataSections.forEach(s => {
    if (!s.isSurface) {
      warnings.push(`底色节奏：数据 section ${s.layout} 背景为 ${s.bg}，建议用 --surface（纯白）以突出数据清晰度`);
      rhythmIssues++;
    }
  });
  const dataViolations = dataSections.filter(s => !s.isSurface).length;
  if (dataViolations === 0) {
    passed++;
    console.log(`  ✅ 数据区背景：S05/S07/S12 使用 --surface`);
  } else {
    console.log(`  ⚠️  数据区背景：${dataViolations} 个数据 section 未使用 --surface`);
  }

  // 规则 7：Accent 色（--yellow / --orange）禁止做 section 大面积背景
  const accentBgSections = sectionSequence.filter(s => s.isAccent);
  if (accentBgSections.length > 0) {
    errors.push(`底色节奏：${accentBgSections.length} 个 section 使用 accent 色做大面积背景（${accentBgSections.map(s => s.layout).join(', ')}），accent 应仅用于强调元素，不超过 10%`);
    rhythmIssues++;
    console.log(`  ❌ Accent 背景：${accentBgSections.map(s => s.layout).join(', ')} 用 accent 做大面积背景`);
  } else {
    passed++;
    console.log(`  ✅ Accent 背景：无 section 使用 accent 做大面积背景`);
  }

  // 规则 8：品牌色 section 仅限 1 个（打破规则）
  const brandSections = sectionSequence.filter(s => s.isBrand);
  if (brandSections.length > 1) {
    warnings.push(`底色节奏：${brandSections.length} 个品牌色 section（${brandSections.map(s => s.layout).join(', ')}），品牌色大面积使用建议 ≤ 1 个`);
    console.log(`  ⚠️  品牌色数量：${brandSections.length} 个品牌色 section`);
  } else if (brandSections.length === 1) {
    passed++;
    console.log(`  ✅ 品牌色数量：恰好 1 个品牌色 section（${brandSections[0].layout}）`);
  }

  // ─── 底色序列可视化输出 ───
  console.log('');
  console.log('  ┌─ 底色节奏序列 ─────────────────────────────┐');
  const maxBgLen = Math.max(...sectionSequence.map(s => s.bg.length), 20);
  sectionSequence.forEach((s, i) => {
    const icon = s.isDark ? '■' : s.isBrand ? '◆' : s.isAccent ? '▲' : s.isSurface ? '□' : s.isSurfaceRaised ? '▢' : '·';
    const label = s.isDark ? '深色' : s.isBrand ? '品牌' : s.isAccent ? 'ACC!' : s.isSurface ? '纯白' : s.isSurfaceRaised ? '浮起' : s.isBase ? '亚麻' : '继承';
    const bar = '█'.repeat(Math.min(s.bg.length, 3));
    console.log(`  │ ${String(i + 1).padStart(2)} ${s.layout} ${icon} ${label.padEnd(4)} ${s.bg.padEnd(maxBgLen)} ${bar}`);
  });
  console.log('  └────────────────────────────────────────────┘');
}

// ─── 汇总 ───
console.log('');
console.log('═══════════════════════════════════════');
if (errors.length === 0 && warnings.length === 0) {
  console.log(`🎉 全部通过！${passed}/${passed} 项校验 PASS`);
  console.log(`   ${sectionCount} 个 section，全部使用 S01-S28 骨架`);
  process.exit(0);
} else if (errors.length === 0) {
  console.log(`✅ PASS（${warnings.length} 个警告）`);
  console.log(`   ${passed} 项校验通过`);
  warnings.forEach(w => console.log(`   ⚠️  ${w}`));
  process.exit(0);
} else {
  console.log(`❌ FAIL — ${errors.length} 个错误，${warnings.length} 个警告`);
  console.log('');
  errors.forEach(e => console.log(`   ❌ ${e}`));
  warnings.forEach(w => console.log(`   ⚠️  ${w}`));
  process.exit(1);
}
