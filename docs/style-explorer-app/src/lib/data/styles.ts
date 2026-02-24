import { parse } from 'csv-parse/sync';
import { readFileSync } from 'fs';
import { join } from 'path';
import type { Style } from '@/types/style';

// 常见 UI/设计术语翻译表
const TERM_TRANSLATIONS: Record<string, string> = {
  // 通用术语
  'Clean': '简洁',
  'Simple': '简单',
  'Functional': '功能性强',
  'Modern': '现代',
  'Classic': '经典',
  'Bold': '大胆',
  'Elegant': '优雅',
  'Minimal': '极简',
  'Playful': '活泼',
  'Professional': '专业',
  'Creative': '创意',
  'Innovative': '创新',
  'Traditional': '传统',
  'Experimental': '实验性',
  'Geometric': '几何',
  'Organic': '有机',
  'Abstract': '抽象',
  'Realistic': '写实',

  // 布局与空间
  'Grid-based': '网格化',
  'Grid-based layout': '网格布局',
  'Asymmetric': '不对称',
  'Symmetric': '对称',
  'Balanced': '平衡',
  'Spacious': '宽敞',
  'Compact': '紧凑',
  'Responsive': '响应式',
  'Mobile-first': '移动优先',
  '12-16 columns': '12-16 列',

  // 排版
  'Sans-serif': '无衬线字体',
  'Serif': '衬线字体',
  'Monospace': '等宽字体',
  'Typography': '排版',
  'Type hierarchy': '字体层级',
  'Font weight': '字重',
  'Line height': '行高',
  'Letter spacing': '字间距',
  'High contrast': '高对比度',
  'Large': '大号',
  'Small': '小号',

  // 颜色
  'Monochromatic': '单色',
  'Vibrant': '鲜艳',
  'Muted': '柔和',
  'Pastel': '粉彩',
  'Gradient': '渐变',
  'Translucent': '半透明',
  'Opaque': '不透明',
  'Primary': '主色',
  'Secondary': '辅助色',
  'Accent': '强调色',
  'Neutral': '中性色',
  'Warm': '暖色',
  'Cool': '冷色',

  // 效果与动画
  'Smooth': '平滑',
  'Subtle': '微妙',
  'Sharp': '锐利',
  'Soft': '柔和',
  'Hard': '硬朗',
  'Blur': '模糊',
  'Shadow': '阴影',
  'Glow': '发光',
  'Fade': '淡入淡出',
  'Slide': '滑动',
  'Scale': '缩放',
  'Rotate': '旋转',
  'Hover': '悬停',
  'Transition': '过渡',
  'Animation': '动画',
  'Instant': '即时',
  'Delayed': '延迟',

  // 形状与边框
  'Rounded': '圆角',
  'Sharp corners': '尖角',
  'Border': '边框',
  'Outline': '轮廓',
  'Stroke': '描边',
  'Filled': '填充',
  'Outlined': '线框',

  // 材质与质感
  'Glass': '玻璃',
  'Frosted': '磨砂',
  'Metallic': '金属',
  'Matte': '哑光',
  'Glossy': '光亮',
  'Textured': '纹理',
  'Flat': '扁平',
  '3D': '三维',
  'Embossed': '浮雕',
  'Debossed': '凹雕',

  // 场景用途
  'Enterprise': '企业级',
  'Dashboard': '仪表盘',
  'Documentation': '文档',
  'Landing page': '落地页',
  'Portfolio': '作品集',
  'E-commerce': '电商',
  'Social media': '社交媒体',
  'Mobile app': '移动应用',
  'Web app': 'Web 应用',
  'SaaS': 'SaaS 平台',
  'Startup': '初创公司',
  'Corporate': '公司官网',
  'Personal': '个人博客',
  'Editorial': '编辑出版',
  'Marketing': '营销推广',

  // 品牌类型
  'Brand': '品牌',
  'Playful brands': '活泼品牌',
  'Conservative': '保守行业',
  'Luxury': '奢侈品',
  'Tech': '科技',
  'Health': '健康医疗',
  'Finance': '金融',
  'Education': '教育',
  'Entertainment': '娱乐',
  'Art': '艺术',
  'Fashion': '时尚',
  'Food': '餐饮',

  // 性能与可访问性
  'Fast loading': '快速加载',
  'Lightweight': '轻量级',
  'Optimized': '优化',
  'Accessible': '无障碍',
  'WCAG': 'WCAG 无障碍标准',
  'AAA': 'AAA 级（最高）',
  'AA': 'AA 级（标准）',
  'A': 'A 级（基础）',
  'Good': '良好',
  'Excellent': '优秀',
  'Medium': '中等',
  'Low': '低',
  'High': '高',

  // 技术框架
  'Tailwind': 'Tailwind CSS',
  'Bootstrap': 'Bootstrap',
  'Material UI': 'Material UI',
  'Chakra': 'Chakra UI',
  'Ant Design': 'Ant Design',
  'CSS-in-JS': 'CSS-in-JS',
  'React': 'React',
  'Vue': 'Vue',
  'Angular': 'Angular',
  'Next.js': 'Next.js',
  'Nuxt': 'Nuxt',

  // 设计元素
  'White space': '留白',
  'Card': '卡片',
  'Modal': '模态框',
  'Overlay': '覆盖层',
  'Navigation': '导航',
  'Button': '按钮',
  'Input': '输入框',
  'Form': '表单',
  'Icon': '图标',
  'Image': '图片',
  'Video': '视频',
  'Background': '背景',
  'Foreground': '前景',
  'Layer': '图层',
  'Depth': '深度',
  'Z-index': 'Z 轴层级',

  // 其他常用词
  'And': '和',
  'With': '带有',
  'For': '用于',
  'No': '无',
  'Not': '不',
  'If': '如果',
  'Any': '任何',
  'Only': '仅',
  'All': '全部',
  'Some': '一些',
  'More': '更多',
  'Less': '更少',
  'Very': '非常',
  'Most': '最',
  'Just': '仅仅',
  'Like': '像',
  'Such': '这样的',
  'Especially': '特别是',
  'Including': '包括',
  'Based': '基于',
  'Style': '风格',
  'Design': '设计',
  'Color': '颜色',
  'Layout': '布局',
  'System': '系统',
  'Variables': '变量',
  'Keywords': '关键词',
  'Implementation': '实现',
  'Checklist': '清单',
};

// 翻译英文文本到中文
function translateText(text: string): string {
  if (!text) return text;

  let result = text;

  // 先翻译长词组（避免单词被单独翻译）
  const longTerms = Object.keys(TERM_TRANSLATIONS).sort((a, b) => b.length - a.length);
  for (const term of longTerms) {
    const translation = TERM_TRANSLATIONS[term];
    if (result.includes(term)) {
      // 使用正则表达式，保留大小写匹配
      const regex = new RegExp(term.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'gi');
      result = result.replace(regex, translation);
    }
  }

  return result;
}

// 翻译数组中的每个项目
function translateArray(items: string[]): string[] {
  return items.map(item => translateText(item));
}

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
    keywords: parseArray(row.Keywords || '').map(k => translateText(k)),
    primaryColors: parseColors(row['Primary Colors'] || ''),
    secondaryColors: parseColors(row['Secondary Colors'] || ''),
    effects: translateText(row['Effects & Animation'] || ''),
    bestFor: translateArray(parseArray(row['Best For'] || '')),
    doNotUseFor: translateArray(parseArray(row['Do Not Use For'] || '')),
    lightMode: row['Light Mode ✓'] || '',
    darkMode: row['Dark Mode ✓'] || '',
    performance: row['Performance'] || '',
    accessibility: row['Accessibility'] || '',
    mobileFriendly: row['Mobile-Friendly'] || '',
    conversionFocused: row['Conversion-Focused'] || '',
    frameworkCompatibility: row['Framework Compatibility'] || '',
    era: row['Era/Origin'] || '',
    complexity: row['Complexity'] || '',
    aiPromptKeywords: translateText(row['AI Prompt Keywords'] || ''),
    cssKeywords: translateText(row['CSS/Technical Keywords'] || ''),
    implementationChecklist: translateText(row['Implementation Checklist'] || ''),
    designVariables: translateText(row['Design System Variables'] || ''),
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
