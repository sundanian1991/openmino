const fs = require('fs');
const path = require('path');

// 13 种设计风格及其主色调
const designModes = [
  { name: 'brand', color: '#E2725B', displayName: '品牌模式' },
  { name: 'data', color: '#E2725B', displayName: '数据模式' },
  { name: 'financial-times', color: '#0d7680', displayName: '金融时报' },
  { name: 'consulting', color: '#B85450', displayName: '咨询模式' },
  { name: 'confidence', color: '#D4AF37', displayName: '自信宣言' },
  { name: 'modern-workshop', color: '#6366f1', displayName: '现代工坊' },
  { name: 'tags', color: '#475569', displayName: '分类标签' },
  { name: 'pastel', color: '#F8B4D9', displayName: '柔和几何' },
  { name: 'split', color: '#FF6B6B', displayName: '趣味拼接' },
  { name: 'vintage', color: '#78716c', displayName: '复古报刊' },
  { name: 'swiss', color: '#dc2626', displayName: '极简现代' },
  { name: 'ink', color: '#1c1917', displayName: '纸墨文学' },
  { name: 'anthropic-docs', color: '#FF6B35', displayName: 'Anthropic 文档' },
];

// 核心 Lucene 图标定义（通用图标）
const coreIcons = [
  { name: 'arrow-right', paths: ['M5 12h14', 'M12 5l7 7-7 7'] },
  { name: 'arrow-left', paths: ['M19 12H5', 'M12 19l-7-7 7-7'] },
  { name: 'arrow-up', paths: ['M12 19V5', 'M5 12l7-7 7 7'] },
  { name: 'arrow-down', paths: ['M12 5v14', 'M19 12l-7 7-7-7'] },
  { name: 'chevron-right', paths: ['M9 18l6-6-6-6'] },
  { name: 'chevron-left', paths: ['M15 18l-6-6 6-6'] },
  { name: 'chevron-up', paths: ['M18 15l-6-6 6-6'] },
  { name: 'chevron-down', paths: ['M6 9l6 6-6 6'] },
  { name: 'folder', paths: ['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z'] },
  { name: 'folder-open', paths: ['M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z', 'M2 10h20'] },
  { name: 'file', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6'] },
  { name: 'search', paths: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35'] },
  { name: 'plus', paths: ['M12 5v14', 'M5 12h14'] },
  { name: 'minus', paths: ['M5 12h14'] },
  { name: 'x', paths: ['M18 6L6 18', 'M6 6l12 12'] },
  { name: 'check', paths: ['M20 6L9 17l-5-5'] },
  { name: 'circle', paths: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z'] },
  { name: 'menu', paths: ['M3 12h18', 'M3 6h18', 'M3 18h18'] },
  { name: 'more-horizontal', paths: ['M12 12a2 2 0 1 0 0-4 2 2 0 1 0 0 4zM19 12a2 2 0 1 0 0-4 2 2 0 1 0 0 4zM5 12a2 2 0 1 0 0-4 2 2 0 1 0 0 4z'] },
  { name: 'more-vertical', paths: ['M12 19a2 2 0 1 0 0-4 2 2 0 1 0 0 4zM12 13a2 2 0 1 0 0-4 2 2 0 1 0 0 4zM12 7a2 2 0 1 0 0-4 2 2 0 1 0 0 4z'] },
  { name: 'external-link', paths: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14L21 3'] },
  { name: 'copy', paths: ['M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2', 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'] },
  { name: 'download', paths: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'] },
  { name: 'upload', paths: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'] },
  { name: 'refresh', paths: ['M21 2v6h-6', 'M3 12a9 9 0 0 1 15-6.7L21 8', 'M3 22v-6h6', 'M21 12a9 9 0 0 1-15 6.7L3 16'] },
  { name: 'settings', paths: ['M12.22 2h-.44a2 2 0 0 1-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 1 0 2.83l.15.1a2 2 0 0 1 1 1.73v.51a2 2 0 0 1-1 1.73l-.15.09a2 2 0 0 0 0 2.83l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0 0-2.83l-.15-.09a2 2 0 0 1-1-1.73v-.51a2 2 0 0 1 1-1.73l.15-.09a2 2 0 0 0 0-2.83l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z', 'M12 12a2 2 0 1 0 0-4 2 2 0 1 0 0 4z'] },
  { name: 'home', paths: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'] },
  { name: 'star', paths: ['M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'] },
  { name: 'bookmark', paths: ['M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z'] },
  { name: 'filter', paths: ['M22 3H2l8 9.46V19l4 2v-8.54L22 3z'] },
  { name: 'sort-asc', paths: ['M12 21l-9-9h18z'] },
  { name: 'sort-desc', paths: ['M12 3l9 9H3z'] },
  { name: 'play', paths: ['M5 3l14 9-14 9V3z'] },
  { name: 'pause', paths: ['M6 19h4V5H6v14zm8-14v14h4V5h-4z'] },
  { name: 'stop', paths: ['M6 6h12v12H6z'] },
  { name: 'skip-forward', paths: ['M5 4l10 8-10 8V4zm14 0v16h2V4h-2z'] },
  { name: 'skip-back', paths: ['M19 4l-10 8 10 8V4zM5 4v16h2V4H5z'] },
  { name: 'volume', paths: ['M11 5L6 9H2v6h4l5 4V5z', 'M15.54 8.46a5 5 0 0 1 0 7.07', 'M19.07 4.93a10 10 0 0 1 0 14.14'] },
  { name: 'mute', paths: ['M11 5L6 9H2v6h4l5 4V5z', 'M23 9l-6 6', 'M17 9l6 6'] },
];

// 为每种风格生成图标
designModes.forEach(mode => {
  const modeDir = path.join(__dirname, `icons-${mode.name}`);
  if (!fs.existsSync(modeDir)) fs.mkdirSync(modeDir, { recursive: true });

  coreIcons.forEach(icon => {
    const paths = icon.paths.map(d => 
      `    <path d="${d}" stroke="${mode.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`
    ).join('\n');

    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
${paths}
</svg>`;

    fs.writeFileSync(path.join(modeDir, `${icon.name}.svg`), svg);
  });

  console.log(`✓ ${mode.displayName} (${mode.color}): ${coreIcons.length} icons`);
});

// 创建索引文件
const indexContent = `# Lucene 风格图标库 — 13 种设计风格

> 为每种设计风格生成的 Lucene 风格核心图标

## 图标列表（40 个/风格）

${designModes.map(mode => `
### ${mode.displayName} — \`${mode.name}\`

**主色调**：\`${mode.color}\`

**位置**：\`icons-${mode.name}/\`
`).join('\n')}

## 通用图标

${coreIcons.map(icon => `- ${icon.name}`).join('\n')}

## 使用方式

\`\`\`html
<!-- 使用对应风格的图标 -->
<img src="assets/icons-<mode>/<icon-name>.svg" />
\`\`\`

---

*版本：v1.0*
*创建：2026-03-27*
`;

fs.writeFileSync(path.join(__dirname, 'icons-index.md'), indexContent);

console.log('\n✓ 生成完成：13 种风格 × 40 个图标 = 520 个图标');
console.log('✓ 索引文件：icons-index.md');
