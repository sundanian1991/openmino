'use client';

import type { Style } from '@/types/style';

interface StylePreviewProps {
  style: Style;
  variant?: 'compact' | 'detailed';
}

// 根据风格类型生成独特的导航栏
function renderNavBar(style: Style, isDark: boolean) {
  const textColor = isDark ? 'text-white' : 'text-gray-900';

  // Brutalism - 粗边框导航
  if (style.name.includes('Brutalism')) {
    return (
      <div className={`border-b-4 border-black py-3 px-4 ${isDark ? 'bg-yellow-400' : 'bg-white'}`}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-black" />
            <span className={`font-bold text-lg ${textColor}`}>品牌</span>
          </div>
          <div className="flex gap-4">
            {['首页', '关于', '联系'].map((item) => (
              <span key={item} className={`font-bold text-sm ${textColor} border-b-2 border-black`}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Glassmorphism - 半透明导航
  if (style.name.includes('Glassmorphism')) {
    return (
      <div className="backdrop-blur-md bg-white/30 border-b border-white/20 py-3 px-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400/60 to-pink-400/60 backdrop-blur-sm" />
            <span className={`font-medium ${textColor}`}>GlassUI</span>
          </div>
          <div className="flex gap-6">
            {['产品', '定价', '关于'].map((item) => (
              <span key={item} className={`text-sm ${textColor}/80 hover:${textColor} transition-colors`}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Neumorphism - 软性 3D 导航
  if (style.name.includes('Neumorphism')) {
    return (
      <div className="py-3 px-4" style={{ background: '#E0E5EC', boxShadow: 'inset 3px 3px 7px rgba(0,0,0,0.1), inset -3px -3px 7px rgba(255,255,255,0.9)' }}>
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div
              className="w-8 h-8 rounded-full"
              style={{ background: '#E0E5EC', boxShadow: '3px 3px 6px rgba(0,0,0,0.1), -3px -3px 6px rgba(255,255,255,0.9)' }}
            />
            <span className={`font-medium ${textColor}`}>NeoUI</span>
          </div>
          <div className="flex gap-2">
            {['首页', '功能', '联系'].map((item) => (
              <span
                key={item}
                className={`px-3 py-1.5 text-sm rounded-full ${textColor}`}
                style={{ background: '#E0E5EC', boxShadow: '2px 2px 4px rgba(0,0,0,0.08), -2px -2px 4px rgba(255,255,255,0.9)' }}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Minimalist - 极简导航
  if (style.name.includes('Minimalist') || style.name.includes('Swiss')) {
    return (
      <div className={`py-4 px-4 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <div className="flex justify-between items-center">
          <span className={`font-bold text-xl tracking-tight ${textColor}`}>简</span>
          <div className="flex gap-8">
            {['工作', '关于', '联系'].map((item) => (
              <span key={item} className={`text-xs uppercase tracking-widest ${textColor}`}>{item}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Playful/Vibrant - 活泼导航
  if (style.name.includes('Playful') || style.name.includes('Vibrant') || style.name.includes('Block')) {
    return (
      <div className="py-3 px-4 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">✨</div>
            <span className="font-bold text-white">Playful</span>
          </div>
          <div className="flex gap-2">
            {['🏠', '⭐', '💌'].map((emoji) => (
              <span key={emoji} className="text-xl">{emoji}</span>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // 默认导航
  return (
    <div className={`py-3 px-4 border-b ${isDark ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'}`}>
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className={`w-8 h-8 rounded ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
          <span className={`font-semibold ${textColor}`}>Brand</span>
        </div>
        <div className="flex gap-6">
          {['产品', '案例', '关于'].map((item) => (
            <span key={item} className={`text-sm ${textColor}/70`}>{item}</span>
          ))}
        </div>
      </div>
    </div>
  );
}

// 生成 Hero 区域
function renderHero(style: Style, isDark: boolean) {
  const textColor = isDark ? 'text-white' : 'text-gray-900';
  const subtextColor = isDark ? 'text-gray-400' : 'text-gray-600';
  const primaryColor = style.primaryColors[0]?.hex || '#3b82f6';

  // Brutalism Hero
  if (style.name.includes('Brutalism')) {
    return (
      <div className="p-6 bg-white">
        <h2 className="text-3xl font-black text-black mb-4 uppercase leading-none">
          原始 ·<br/>大胆
        </h2>
        <p className="text-sm text-gray-600 mb-6 font-mono">
          {style.effects?.slice(0, 80) || '打破常规，拥抱原始设计美学。无修饰，无妥协。'}
        </p>
        <div className="flex gap-3">
          <button className="px-6 py-3 bg-red-600 text-white font-bold text-sm border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all">
            立即行动 →
          </button>
          <button className="px-6 py-3 bg-yellow-400 text-black font-bold text-sm border-4 border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] transition-all">
            了解更多
          </button>
        </div>
      </div>
    );
  }

  // Glassmorphism Hero
  if (style.name.includes('Glassmorphism')) {
    return (
      <div className="relative p-6 overflow-hidden">
        {/* 背景装饰 */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-2xl opacity-50 -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-blue-400 to-cyan-400 rounded-full blur-xl opacity-40 translate-y-1/2 -translate-x-1/2" />

        <div className="relative z-10">
          <h2 className={`text-2xl font-semibold ${textColor} mb-3`}>
            透明之美
          </h2>
          <p className={`text-sm ${subtextColor} mb-6 leading-relaxed`}>
            {style.effects?.slice(0, 80) || '磨砂玻璃效果，层次感设计，营造现代科技感。'}
          </p>
          <div className="flex gap-3">
            <button
              className="px-5 py-2.5 rounded-lg text-sm font-medium text-white backdrop-blur-md bg-white/30 border border-white/40 hover:bg-white/40 transition-all"
              style={{ boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
            >
              开始使用
            </button>
            <button className={`px-5 py-2.5 rounded-lg text-sm font-medium ${textColor} hover:bg-white/20 transition-all`}>
              查看演示
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Neumorphism Hero
  if (style.name.includes('Neumorphism')) {
    return (
      <div className="p-6" style={{ background: '#E0E5EC' }}>
        <h2 className={`text-xl font-semibold ${textColor} mb-3`}>
          柔软 3D
        </h2>
        <p className={`text-sm ${subtextColor} mb-6`}>
          {style.effects?.slice(0, 80) || '柔软立体的视觉体验，温和的光影效果。'}
        </p>
        <div className="flex gap-3">
          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium text-blue-600"
            style={{
              background: '#E0E5EC',
              boxShadow: '5px 5px 10px rgba(0,0,0,0.1), -5px -5px 10px rgba(255,255,255,0.9)',
            }}
          >
            开始使用
          </button>
          <button
            className="px-5 py-2.5 rounded-full text-sm font-medium"
            style={{
              background: '#E0E5EC',
              boxShadow: 'inset 3px 3px 6px rgba(0,0,0,0.1), inset -3px -3px 6px rgba(255,255,255,0.9)',
            }}
          >
            了解更多
          </button>
        </div>
      </div>
    );
  }

  // Minimalist Hero
  if (style.name.includes('Minimalist') || style.name.includes('Swiss')) {
    return (
      <div className={`p-8 ${isDark ? 'bg-black' : 'bg-white'}`}>
        <h2 className={`text-4xl font-light ${textColor} mb-4 tracking-tight`}>
          少即是多
        </h2>
        <p className={`text-sm ${subtextColor} mb-8 font-light leading-loose`}>
          {style.effects?.slice(0, 80) || '去除多余，回归本质。留白与排版本身就是设计语言。'}
        </p>
        <div className="flex gap-4">
          <button className={`px-6 py-3 ${isDark ? 'bg-white text-black' : 'bg-black text-white'} text-sm font-medium`}>
            探索作品
          </button>
        </div>
      </div>
    );
  }

  // Playful Hero
  if (style.name.includes('Playful') || style.name.includes('Vibrant')) {
    return (
      <div className="p-6 bg-gradient-to-br from-pink-100 via-purple-100 to-indigo-100">
        <h2 className={`text-2xl font-bold ${textColor} mb-3`}>
          ✨ 让设计更有趣！
        </h2>
        <p className={`text-sm ${subtextColor} mb-6`}>
          {style.effects?.slice(0, 80) || '鲜艳配色，圆润造型，活泼动效，打造愉悦体验。'}
        </p>
        <div className="flex gap-3">
          <button
            className="px-5 py-2.5 rounded-full text-sm font-bold text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            style={{ background: primaryColor }}
          >
            开始冒险 🚀
          </button>
        </div>
      </div>
    );
  }

  // 默认 Hero
  return (
    <div className={`p-6 ${isDark ? 'bg-gray-800' : 'bg-gray-50'}`}>
      <h2 className={`text-xl font-semibold ${textColor} mb-3`}>
        {style.name.split(' ')[0]} 设计
      </h2>
      <p className={`text-sm ${subtextColor} mb-6`}>
        {style.effects?.slice(0, 80) || '体验独特的设计美学。'}
      </p>
      <button
        className="px-5 py-2.5 rounded-lg text-sm font-medium text-white"
        style={{ backgroundColor: primaryColor }}
      >
        了解更多
      </button>
    </div>
  );
}

// 生成底部卡片展示
function renderFeatureCard(style: Style, isDark: boolean) {
  const textColor = isDark ? 'text-white' : 'text-gray-900';

  // Brutalism
  if (style.name.includes('Brutalism')) {
    return (
      <div className="border-t-4 border-black p-4 bg-yellow-400">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 bg-black flex items-center justify-center text-white font-bold">★</div>
          <div>
            <h3 className="font-bold text-black text-sm">核心特性</h3>
            <p className="text-xs text-black/80 mt-1">原始 · 直接 · 无修饰</p>
          </div>
        </div>
      </div>
    );
  }

  // Glassmorphism
  if (style.name.includes('Glassmorphism')) {
    return (
      <div className="p-4 backdrop-blur-md bg-white/20 border-t border-white/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400/50 to-pink-400/50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-white text-sm">✨</span>
          </div>
          <div>
            <h3 className={`text-sm font-medium ${textColor}`}>精致细节</h3>
            <p className={`text-xs ${textColor}/70`}>透明 · 层次 · 光影</p>
          </div>
        </div>
      </div>
    );
  }

  // Neumorphism
  if (style.name.includes('Neumorphism')) {
    return (
      <div className="p-4" style={{ background: '#E0E5EC' }}>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center"
            style={{
              background: '#E0E5EC',
              boxShadow: '3px 3px 6px rgba(0,0,0,0.1), -3px -3px 6px rgba(255,255,255,0.9)'
            }}
          >
            ●
          </div>
          <div>
            <h3 className={`text-sm font-medium ${textColor}`}>触感体验</h3>
            <p className={`text-xs ${textColor}/70`}>柔软 · 立体 · 温和</p>
          </div>
        </div>
      </div>
    );
  }

  // 默认
  return (
    <div className={`p-4 border-t ${isDark ? 'border-gray-700 bg-gray-800' : 'border-gray-200 bg-white'}`}>
      <div className="flex items-center gap-3">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${isDark ? 'bg-gray-700' : 'bg-gray-100'}`}>
          <div className={`w-4 h-4 rounded ${isDark ? 'bg-blue-500' : 'bg-blue-600'}`} />
        </div>
        <div>
          <h3 className={`text-sm font-medium ${textColor}`}>特性</h3>
          <p className={`text-xs ${textColor}/70`}>专业 · 现代</p>
        </div>
      </div>
    </div>
  );
}

export function StylePreview({ style, variant = 'compact' }: StylePreviewProps) {
  const isDark = style.name.includes('Dark') || style.darkMode === '✓ Full';

  // 大尺寸详细预览
  if (variant === 'detailed') {
    return (
      <div className={`w-full rounded-xl overflow-hidden shadow-lg ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
        {renderNavBar(style, isDark)}
        {renderHero(style, isDark)}
        {renderFeatureCard(style, isDark)}
      </div>
    );
  }

  // 紧凑预览（用于卡片网格）
  return (
    <div className={`w-full h-full rounded-xl overflow-hidden ${isDark ? 'bg-gray-900' : 'bg-white'}`}>
      {renderNavBar(style, isDark)}
      <div className="h-28">
        {renderHero(style, isDark)}
      </div>
    </div>
  );
}
