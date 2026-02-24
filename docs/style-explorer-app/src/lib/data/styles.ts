import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Style } from '@/types/style';

// 解析 CSV 字段为字符串数组
function parseArray(field: string): string[] {
  if (!field || field.trim() === '') return [];
  return field.split(',').map(s => s.trim()).filter(Boolean);
}

// 解析颜色字段
function parseColors(field: string): Array<{ name?: string; hex: string }> {
  if (!field || field.trim() === '') return [];

  const colors: Array<{ name?: string; hex: string }> = [];
  const parts = field.split(',');

  for (const part of parts) {
    const trimmed = part.trim();
    if (!trimmed) continue;

    // 匹配 hex 颜色代码
    const hexMatch = trimmed.match(/#[0-9A-Fa-f]{6}/);
    if (hexMatch) {
      const name = trimmed.replace(hexMatch[0], '').trim().replace(/[():]/g, '').trim();
      colors.push({
        name: name || undefined,
        hex: hexMatch[0]
      });
    }
  }

  return colors;
}

export function loadStyles(): Style[] {
  const filePath = join(process.cwd(), 'public/data/styles.csv');
  const fileContent = readFileSync(filePath, 'utf-8');

  const records = parse(fileContent, {
    columns: true,
    skip_empty_lines: true,
    trim: true,
  });

  return records.map((row: any) => ({
    id: row.No?.toString() || '',
    name: row['Style Category'] || '',
    type: row.Type || '',
    keywords: parseArray(row.Keywords || ''),
    primaryColors: parseColors(row['Primary Colors'] || ''),
    secondaryColors: parseColors(row['Secondary Colors'] || ''),
    effects: row['Effects & Animation'] || '',
    bestFor: parseArray(row['Best For'] || ''),
    doNotUseFor: parseArray(row['Do Not Use For'] || ''),
    lightMode: row['Light Mode ✓'] || '',
    darkMode: row['Dark Mode ✓'] || '',
    performance: row['Performance'] || '',
    accessibility: row['Accessibility'] || '',
    mobileFriendly: row['Mobile-Friendly'] || '',
    conversionFocused: row['Conversion-Focused'] || '',
    frameworkCompatibility: row['Framework Compatibility'] || '',
    era: row['Era/Origin'] || '',
    complexity: row['Complexity'] || '',
    aiPromptKeywords: row['AI Prompt Keywords'] || '',
    cssKeywords: row['CSS/Technical Keywords'] || '',
    implementationChecklist: row['Implementation Checklist'] || '',
    designVariables: row['Design System Variables'] || '',
  }));
}

// 预加载并缓存数据
let cachedStyles: Style[] | null = null;

export function getStyles(): Style[] {
  if (!cachedStyles) {
    cachedStyles = loadStyles();
  }
  return cachedStyles;
}

export function getStyleById(id: string): Style | undefined {
  return getStyles().find(style => style.id === id);
}

export function searchStyles(query: string): Style[] {
  const styles = getStyles();
  const lowerQuery = query.toLowerCase();

  return styles.filter(style =>
    style.name.toLowerCase().includes(lowerQuery) ||
    style.keywords.some(kw => kw.toLowerCase().includes(lowerQuery)) ||
    style.bestFor.some(best => best.toLowerCase().includes(lowerQuery))
  );
}
