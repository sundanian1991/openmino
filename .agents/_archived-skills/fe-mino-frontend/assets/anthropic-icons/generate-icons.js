const fs = require('fs');
const path = require('path');

// Base paths
const lucideDir = path.join(__dirname, 'lucide');
const handDrawnDir = path.join(__dirname, 'hand-drawn');

// Ensure directories exist
[lucideDir, handDrawnDir].forEach(dir => {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
});

// ==================== LUCIDE STYLE ICONS (50) ====================
const lucideIcons = [
  // File Types (15)
  { name: 'file-md', color: '#4CAF50', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8', 'M10 9H8'] },
  { name: 'file-py', color: '#2196F3', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M12 18v-6', 'M9 15h6'] },
  { name: 'file-js', color: '#FFC107', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M10 13v6l2-2 2 2v-6'] },
  { name: 'file-json', color: '#9C27B0', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M12 10v-2h-2v2', 'M12 14v-2h-2v2', 'M12 18v-2h-2v2', 'M16 10v-2h-2v2', 'M16 14v-2h-2v2', 'M16 18v-2h-2v2'] },
  { name: 'file-yaml', color: '#FF5722', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M10 18l2-6 2 6', 'M16 18v-6'] },
  { name: 'file-txt', color: '#757575', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M16 13H8', 'M16 17H8'] },
  { name: 'file-html', color: '#E44D26', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M10 11h1l1 3 1-3h1l-2 4 2 4h-1l-1-3-1 3h-1l2-4z'] },
  { name: 'file-css', color: '#264DE4', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M9 18v-6l2 2 2-2v6', 'M16 13v-2h2v2'] },
  { name: 'file-ts', color: '#3178C6', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M9 14v-2l1.5-1 1.5 1v2', 'M14 12v6', 'M17 12v6'] },
  { name: 'file-sh', color: '#4EAA25', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M10 18v-6l-2-1v-2l4 1 4-1v2l-2 1v6'] },
  { name: 'file-env', color: '#9E9E9E', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M8 12h3v1H8v-1m5 0h3v1h-3v-1m-5 3h3v1H8v-1m5 0h3v1h-3v-1'] },
  { name: 'file-lock', color: '#FF9800', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M12 11v-1a2 2 0 0 0-4 0v1', 'M8 11h8v6H8z'] },
  { name: 'file-toml', color: '#9C27B0', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M10 13l2 4 2-4', 'M16 13v4'] },
  { name: 'file-xml', color: '#0066AC', paths: ['M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z', 'M14 2v6h6', 'M9 10l-2 4 2 4', 'M15 10l2 4-2 4', 'M12 17l2-6'] },
  
  // Actions (15)
  { name: 'play', color: '#FF6B35', paths: ['M5 3l14 9-14 9V3z'] },
  { name: 'debug', color: '#FF6B35', paths: ['M6 3v6l6-3-6-3m6 6v6l6-3-6-3', 'M9 12h6', 'M12 9v6'] },
  { name: 'test', color: '#4CAF50', paths: ['M9 11l3 3 6-6', 'M4 12h16'] },
  { name: 'deploy', color: '#2196F3', paths: ['M12 2v20', 'M8 18l4 4 4-4', 'M4 6h16', 'M4 10h12'] },
  { name: 'build', color: '#FF9800', paths: ['M12 2l10 10-10 10L2 12 10 2z', 'M12 6v12', 'M8 12h8'] },
  { name: 'copy', color: '#757575', paths: ['M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2', 'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'] },
  { name: 'paste', color: '#757575', paths: ['M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2'] },
  { name: 'save', color: '#4CAF50', paths: ['M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z', 'M17 21v-8H7v8', 'M7 3v5h8'] },
  { name: 'download', color: '#2196F3', paths: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M7 10l5 5 5-5', 'M12 15V3'] },
  { name: 'upload', color: '#2196F3', paths: ['M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4', 'M17 8l-5-5-5 5', 'M12 3v12'] },
  { name: 'refresh', color: '#FF9800', paths: ['M21 2v6h-6', 'M3 12a9 9 0 0 1 15-6.7L21 8', 'M3 22v-6h6', 'M21 12a9 9 0 0 1-15 6.7L3 16'] },
  { name: 'search', color: '#FF6B35', paths: ['M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z', 'M21 21l-4.35-4.35'] },
  { name: 'settings', color: '#757575', paths: ['M12.22 2h-.44a2 2 0 0 1-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 1 0 2.83l.15.1a2 2 0 0 1 1 1.73v.51a2 2 0 0 1-1 1.73l-.15.09a2 2 0 0 0 0 2.83l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0 0-2.83l-.15-.09a2 2 0 0 1-1-1.73v-.51a2 2 0 0 1 1-1.73l.15-.09a2 2 0 0 0 0-2.83l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z', 'M12 12a2 2 0 1 0 0-4 2 2 0 0 0 0 4z'] },
  { name: 'help', color: '#2196F3', paths: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3', 'M12 17h.01'] },
  { name: 'close', color: '#F44336', paths: ['M18 6L6 18', 'M6 6l12 12'] },
  
  // Navigation (8)
  { name: 'arrow-right', color: '#FF6B35', paths: ['M5 12h14', 'M12 5l7 7-7 7'] },
  { name: 'arrow-left', color: '#FF6B35', paths: ['M19 12H5', 'M12 19l-7-7 7-7'] },
  { name: 'arrow-up', color: '#FF6B35', paths: ['M12 19V5', 'M5 12l7-7 7 7'] },
  { name: 'arrow-down', color: '#FF6B35', paths: ['M12 5v14', 'M19 12l-7 7-7-7'] },
  { name: 'menu', color: '#1A1A1A', paths: ['M3 12h18', 'M3 6h18', 'M3 18h18'] },
  { name: 'home', color: '#1A1A1A', paths: ['M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z', 'M9 22V12h6v10'] },
  { name: 'link', color: '#2196F3', paths: ['M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71', 'M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71'] },
  { name: 'external-link', color: '#2196F3', paths: ['M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6', 'M15 3h6v6', 'M10 14L21 3'] },
  
  // Status (7)
  { name: 'check-circle', color: '#4CAF50', paths: ['M22 11.08V12a10 10 0 1 1-5.93-9.14', 'M22 4L12 14.01l-3-3'] },
  { name: 'x-circle', color: '#F44336', paths: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M15 9l-6 6', 'M9 9l6 6'] },
  { name: 'alert-triangle', color: '#FF9800', paths: ['M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z', 'M12 9v4', 'M12 17h.01'] },
  { name: 'info', color: '#2196F3', paths: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 16v-4', 'M12 8h.01'] },
  { name: 'loader', color: '#FF6B35', paths: ['M12 2v4', 'M12 18v4', 'M4.93 4.93l2.83 2.83', 'M16.24 16.24l2.83 2.83', 'M2 12h4', 'M18 12h4', 'M4.93 19.07l2.83-2.83', 'M16.24 7.76l2.83-2.83'] },
  { name: 'circle', color: '#9E9E9E', paths: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z'] },
  { name: 'clock', color: '#FF6B35', paths: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M12 6v6l4 2'] },
];

// Generate Lucide SVGs
lucideIcons.forEach(icon => {
  const paths = icon.paths.map((d, i) => {
    if (d.startsWith('M') || d.startsWith('L') || d.startsWith('C') || d.startsWith('Q') || d.startsWith('A') || d.startsWith('H') || d.startsWith('V') || d.startsWith('S') || d.startsWith('T') || d.startsWith('Z')) {
      return `    <path d="${d}" stroke="${icon.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
    return `    <path d="${d}" stroke="${icon.color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
  }).join('\n');
  
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
${paths}
</svg>`;
  
  fs.writeFileSync(path.join(lucideDir, `${icon.name}.svg`), svg);
});

// ==================== HAND-DRAWN STYLE ICONS (50) ====================
const handDrawnIcons = [
  // Separators (10)
  { name: 'wave', path: 'M0 10 Q25 5, 50 10 T100 10 T150 10 T200 10', width: 200, height: 20 },
  { name: 'wave-double', path: 'M0 8 Q25 3, 50 8 T100 8 M0 12 Q25 7, 50 12 T100 12', width: 200, height: 20 },
  { name: 'dots', path: 'M10 10 h2 M30 10 h2 M50 10 h2 M70 10 h2 M90 10 h2 M110 10 h2 M130 10 h2 M150 10 h2 M170 10 h2 M190 10 h2', width: 200, height: 20 },
  { name: 'dashed', path: 'M0 10 l20 0 l5 0 l20 0 l5 0 l20 0 l5 0 l20 0 l5 0 l20 0 l5 0 l20 0 l5 0 l20 0', width: 200, height: 20 },
  { name: 'double-line', path: 'M0 8 l200 0 M0 12 l200 0', width: 200, height: 20 },
  { name: 'triple-line', path: 'M0 6 l200 0 M0 10 l200 0 M0 14 l200 0', width: 200, height: 20 },
  { name: 'diagonal', path: 'M0 20 l200 -40', width: 200, height: 40 },
  { name: 'curve', path: 'M0 20 Q100 0, 200 20', width: 200, height: 40 },
  { name: 'circle-sep', path: 'M10 10 a3 3 0 1 1 6 0 a3 3 0 1 1 -6 0 M40 10 a3 3 0 1 1 6 0 a3 3 0 1 1 -6 0 M70 10 a3 3 0 1 1 6 0 a3 3 0 1 1 -6 0 M100 10 a3 3 0 1 1 6 0 a3 3 0 1 1 -6 0 M130 10 a3 3 0 1 1 6 0 a3 3 0 1 1 -6 0 M160 10 a3 3 0 1 1 6 0 a3 3 0 1 1 -6 0', width: 200, height: 20 },
  { name: 'star-sep', path: 'M10 10 l2 -2 l2 2 l-2 2 z M40 10 l2 -2 l2 2 l-2 2 z M70 10 l2 -2 l2 2 l-2 2 z M100 10 l2 -2 l2 2 l-2 2 z M130 10 l2 -2 l2 2 l-2 2 z M160 10 l2 -2 l2 2 l-2 2 z', width: 200, height: 20 },
  
  // Decorative (15)
  { name: 'code', path: 'M8 16 l-6 -6 l6 -6 M24 16 l6 -6 l-6 -6 M18 26 l-4 -24', width: 64, height: 64 },
  { name: 'doc', path: 'M12 8 l16 -4 l16 4 l-16 4 z M12 8 l0 32 l16 4 l16 -4 l0 -32 M12 24 l16 4 l16 -4', width: 64, height: 64 },
  { name: 'gear', path: 'M32 12 m-4 0 a4 4 0 1 0 8 0 a4 4 0 1 0 -8 0 M32 4 l0 6 M32 26 l0 6 M14 16 l6 0 M44 16 l6 0 M19 9 l4 4 M41 23 l4 4 M19 23 l4 -4 M41 9 l4 4', width: 64, height: 64 },
  { name: 'search', path: 'M26 26 a12 12 0 1 0 0 -24 12 12 0 1 0 0 24 M42 42 l-10 -10', width: 64, height: 64 },
  { name: 'bell', path: 'M32 8 a12 12 0 0 1 12 12 l0 8 a6 6 0 0 0 6 6 l-36 0 a6 6 0 0 0 6 -6 l0 -8 a12 12 0 0 1 12 -12 M28 46 a4 4 0 0 0 8 0', width: 64, height: 64 },
  { name: 'user', path: 'M32 16 a10 10 0 1 0 0 -20 10 10 0 1 0 0 20 M12 56 a20 20 0 0 1 40 0', width: 64, height: 64 },
  { name: 'users', path: 'M20 18 a8 8 0 1 0 0 -16 8 8 0 1 0 0 16 M4 52 a16 16 0 0 1 32 0 M44 18 a8 8 0 1 0 0 -16 8 8 0 1 0 0 16 M36 52 a16 16 0 0 1 24 -12', width: 64, height: 64 },
  { name: 'shield', path: 'M32 8 l20 -6 l0 30 a20 20 0 0 1 -20 14 a20 20 0 0 1 -20 -14 l0 -30 z', width: 64, height: 64 },
  { name: 'backup', path: 'M16 32 l10 10 l20 -20 M32 8 l0 36', width: 64, height: 64 },
  { name: 'sync', path: 'M32 16 l-12 0 l8 8 l-8 8 l12 0 M32 48 l12 0 l-8 -8 l8 -8 l-12 0', width: 64, height: 64 },
  { name: 'share', path: 'M12 32 l20 -12 l0 24 z M52 32 l-20 -12 l0 24 z M24 20 l16 -12 M40 44 l-16 12', width: 64, height: 64 },
  { name: 'bookmark', path: 'M16 8 l0 48 l16 -12 l16 12 l0 -48 z', width: 64, height: 64 },
  { name: 'history', path: 'M32 16 a12 12 0 1 1 0 24 a12 12 0 0 1 0 -24 M32 8 l0 10 l6 0', width: 64, height: 64 },
  { name: 'calendar', path: 'M8 12 l0 -6 a4 4 0 0 1 4 -4 l40 0 a4 4 0 0 1 4 4 l0 6 M8 12 l48 0 l0 36 a4 4 0 0 1 -4 4 l-40 0 a4 4 0 0 1 -4 -4 z M16 24 l8 0 M32 24 l8 0 M16 36 l8 0 M32 36 l8 0', width: 64, height: 64 },
  { name: 'clock-hd', path: 'M32 8 a24 24 0 1 0 0 48 a24 24 0 1 0 0 -48 M32 20 l0 16 l12 0', width: 64, height: 64 },
  
  // Concept (15)
  { name: 'api', path: 'M8 32 a8 8 0 1 1 16 0 a8 8 0 1 1 -16 0 M40 32 a8 8 0 1 1 16 0 a8 8 0 1 1 -16 0 M24 32 l16 0', width: 64, height: 64 },
  { name: 'sdk', path: 'M12 20 l10 -10 l20 0 l10 10 l0 24 l-10 10 l-20 0 l-10 -10 z M12 20 l40 0 M12 44 l40 0 M32 20 l0 24', width: 64, height: 64 },
  { name: 'cli', path: 'M8 16 l10 10 l-10 10 M22 36 l24 0', width: 64, height: 64 },
  { name: 'integration', path: 'M16 32 l16 -16 l16 16 M32 16 l0 32', width: 64, height: 64 },
  { name: 'rocket', path: 'M32 8 a24 24 0 0 1 0 48 a12 12 0 0 0 -12 -12 l12 -12 l0 -24', width: 64, height: 64 },
  { name: 'beaker', path: 'M20 12 l-4 36 a6 6 0 0 0 6 4 l20 0 a6 6 0 0 0 6 -4 l-4 -36 M20 20 l24 0 M28 32 a4 4 0 0 1 8 0', width: 64, height: 64 },
  { name: 'bug', path: 'M24 20 l16 0 M20 28 l24 0 M24 36 l16 0 M24 20 l0 16 M40 20 l0 16 M20 28 l-8 8 M44 28 l8 8 M20 36 l-8 -8 M44 36 l8 -8 M32 12 a4 4 0 0 1 0 -8', width: 64, height: 64 },
  { name: 'chart', path: 'M8 56 l0 -48 M8 56 l48 0 M8 48 l12 -12 M8 36 l12 -12 M8 24 l20 -20', width: 64, height: 64 },
  { name: 'log', path: 'M12 12 l8 0 l0 8 l-8 0 z M12 28 l8 0 l0 8 l-8 0 z M12 44 l8 0 l0 8 l-8 0 z M28 12 l24 0 M28 28 l24 0 M28 44 l24 0', width: 64, height: 64 },
  { name: 'config', path: 'M16 24 a6 6 0 0 1 0 -12 a6 6 0 0 1 0 12 M48 24 a6 6 0 0 1 0 -12 a6 6 0 0 1 0 12 M16 40 l16 16 M48 40 l-16 16', width: 64, height: 64 },
  { name: 'database', path: 'M16 16 a16 6 0 0 1 32 0 a16 6 0 0 1 -32 0 M16 32 a16 6 0 0 0 32 0 M16 48 a16 6 0 0 0 32 0 M16 16 l0 32', width: 64, height: 64 },
  { name: 'server', path: 'M12 16 a20 6 0 0 1 40 0 a20 6 0 0 1 -40 0 M12 16 l0 16 a20 6 0 0 0 40 0 l0 -16 M12 32 l0 16 a20 6 0 0 0 40 0 l0 -16', width: 64, height: 64 },
  { name: 'cloud', path: 'M16 48 a12 12 0 0 1 0 -24 a16 16 0 0 1 32 0 a12 12 0 0 1 0 24 z', width: 64, height: 64 },
  { name: 'network', path: 'M32 8 l0 20 M32 28 l-16 16 M32 28 l16 16 M8 8 l20 0 l-6 6 M56 8 l-20 0 l6 6 M32 56 a6 6 0 1 0 0 -12 a6 6 0 1 0 0 12 M16 44 a6 6 0 1 0 0 -12 a6 6 0 1 0 0 12 M48 44 a6 6 0 1 0 0 -12 a6 6 0 1 0 0 12', width: 64, height: 64 },
  { name: 'speed', path: 'M32 56 a20 20 0 1 0 0 -40 a20 20 0 0 0 0 40 M32 56 l0 -40 M32 36 a4 4 0 1 0 0 -8', width: 64, height: 64 },
  
  // Empty State (10)
  { name: 'empty-data', path: 'M8 8 l48 0 l0 48 l-48 0 z M20 24 l24 0 M20 36 l24 0', width: 64, height: 64 },
  { name: 'empty-file', path: 'M16 8 l24 0 l8 8 l0 40 l-32 0 z', width: 64, height: 64 },
  { name: 'empty-wifi', path: 'M32 52 a4 4 0 1 0 0 -8 a4 4 0 1 0 0 8 M12 36 a28 28 0 0 1 40 0 M20 44 a16 16 0 0 1 24 0', width: 64, height: 64 },
  { name: 'empty-error', path: 'M32 8 l-24 48 l48 0 z M32 26 l0 12 M32 46 a2 2 0 1 0 0 4', width: 64, height: 64 },
  { name: 'empty-loading', path: 'M32 8 a24 24 0 1 0 0 48 a24 24 0 1 0 0 -48 M32 16 l0 4 M32 24 l0 4 M32 32 l0 4 M32 40 l0 4', width: 64, height: 64 },
  { name: 'empty-check', path: 'M32 8 a24 24 0 1 0 0 48 a24 24 0 0 0 0 -48 M22 32 l8 8 l16 -16', width: 64, height: 64 },
  { name: 'empty-search', path: 'M24 24 a12 12 0 1 0 0 24 12 12 0 1 0 0 -24 M42 42 l-8 -8 M28 28 l8 8', width: 64, height: 64 },
  { name: 'empty-bookmark', path: 'M16 8 l0 48 l16 -12 l16 12 l0 -48 z', width: 64, height: 64 },
  { name: 'empty-history', path: 'M32 8 l20 -6 l0 30 a20 20 0 0 1 -20 14 a20 20 0 0 1 -20 -14 l0 -30 z M24 28 l16 0 M24 40 l16 0', width: 64, height: 64 },
  { name: 'empty-bell', path: 'M32 12 a12 12 0 0 1 12 12 l0 8 a6 6 0 0 0 6 6 l-36 0 a6 6 0 0 0 6 -6 l0 -8 a12 12 0 0 1 12 -12', width: 64, height: 64 },
];

// Generate Hand-Drawn SVGs
handDrawnIcons.forEach(icon => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${icon.width} ${icon.height}" style="width:${icon.width}px;height:${icon.height}px">
  <path d="${icon.path}" fill="none" stroke="#E2725B" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;
  
  fs.writeFileSync(path.join(handDrawnDir, `${icon.name}.svg`), svg);
});

console.log('Generated 50 Lucide icons and 50 hand-drawn icons');
