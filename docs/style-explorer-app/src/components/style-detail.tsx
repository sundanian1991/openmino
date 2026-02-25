'use client';

import { useState, useEffect } from 'react';
import type { Style } from '@/types/style';
import { StylePreview } from './style-preview';

interface ProductColorScheme {
  id: string;
  productType: string;
  primary: string;
  secondary: string;
  cta: string;
  background: string;
  text: string;
  border: string;
  notes: string;
}

interface StyleDetailProps {
  style: Style;
}

export function StyleDetail({ style }: StyleDetailProps) {
  const [activeTab, setActiveTab] = useState<'preview' | 'colors' | 'guide'>('preview');
  const [colorSchemes, setColorSchemes] = useState<ProductColorScheme[]>([]);

  // 加载行业配色方案
  useEffect(() => {
    fetch('/api/styles?type=colors')
      .then((res) => res.json())
      .then((data: ProductColorScheme[]) => {
        // 根据风格类型推荐相关的行业配色
        const recommended = recommendColorSchemes(style, data);
        setColorSchemes(recommended.slice(0, 8)); // 最多显示 8 个
      })
      .catch(console.error);
  }, [style]);

  return (
    <div className="space-y-8">
      {/* Tab 切换 */}
      <div className="flex gap-2 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('preview')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'preview'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          视觉预览
        </button>
        <button
          onClick={() => setActiveTab('colors')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'colors'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          配色方案
        </button>
        <button
          onClick={() => setActiveTab('guide')}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            activeTab === 'guide'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-500 hover:text-gray-700'
          }`}
        >
          设计指南
        </button>
      </div>

      {/* 预览标签页 */}
      {activeTab === 'preview' && (
// 根据风格类型推荐相关的行业配色方案
function recommendColorSchemes(style: Style, schemes: ProductColorScheme[]): ProductColorScheme[] {
  const keywords = style.keywords.join(' ').toLowerCase();
  const bestFor = style.bestFor.join(' ').toLowerCase();
  const styleName = style.name.toLowerCase();

  // 评分排序
  const scored = schemes.map((scheme) => {
    let score = 0;
    const productType = scheme.productType.toLowerCase();
    const notes = scheme.notes.toLowerCase();

    // 匹配关键词
    if (keywords.includes('saas') || productType.includes('saas')) score += 3;
    if (keywords.includes('enterprise') || productType.includes('saas')) score += 2;
    if (keywords.includes('dashboard') || productType.includes('dashboard')) score += 3;
    if (keywords.includes('ecommerce') || productType.includes('ecommerce')) score += 3;
    if (keywords.includes('finance') || productType.includes('fintech')) score += 3;
    if (keywords.includes('health') || productType.includes('healthcare')) score += 3;
    if (keywords.includes('education') || productType.includes('educational')) score += 3;
    if (keywords.includes('gaming') || productType.includes('gaming')) score += 3;
    if (keywords.includes('crypto') || productType.includes('crypto')) score += 3;
    if (keywords.includes('social') || productType.includes('social')) score += 2;

    // 匹配备注
    if (notes.includes('professional')) score += 1;
    if (notes.includes('trust')) score += 1;
    if (notes.includes('modern')) score += 1;
    if (notes.includes('playful')) score += 1;

    return { scheme, score };
  });

  // 按评分排序，返回高分的
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, 8)
    .map((item) => item.scheme);
}
        <div className="space-y-6">
          {/* 主预览 - 完整桌面布局 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">桌面端预览</h3>
            <div className="rounded-xl overflow-hidden border border-gray-200 shadow-lg">
              <StylePreview style={style} variant="detailed" className="w-full" />
            </div>
          </div>

          {/* 组件展示 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 按钮样式 */}
            <div className="rounded-xl border border-gray-200 p-6 bg-white">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">按钮样式</h4>
              <div className="space-y-3">
                <button className="px-4 py-2 rounded text-sm font-medium text-white"
                        style={{ backgroundColor: style.primaryColors[0]?.hex || '#3b82f6' }}>
                  主要按钮
                </button>
                <button className="px-4 py-2 rounded text-sm font-medium border"
                        style={{ borderColor: style.primaryColors[0]?.hex || '#3b82f6', color: style.primaryColors[0]?.hex || '#3b82f6' }}>
                  次要按钮
                </button>
                <button className="px-4 py-2 rounded text-sm font-medium text-gray-600 bg-gray-100">
                  禁用状态
                </button>
              </div>
            </div>

            {/* 卡片样式 */}
            <div className="rounded-xl border border-gray-200 p-6 bg-white">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">卡片样式</h4>
              <div
                className="p-4 rounded-lg"
                style={{
                  backgroundColor: `${style.primaryColors[0]?.hex}10`,
                  border: `1px solid ${style.primaryColors[0]?.hex}30`,
                }}
              >
                <p className="text-sm font-medium text-gray-900">卡片标题</p>
                <p className="text-xs text-gray-500 mt-1">这是一些卡片内容描述</p>
              </div>
            </div>

            {/* 表单元素 */}
            <div className="rounded-xl border border-gray-200 p-6 bg-white">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">表单元素</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="输入框"
                  className="w-full px-3 py-2 rounded border border-gray-300 text-sm focus:outline-none focus:ring-2"
                  style={{ '--tw-ring-color': style.primaryColors[0]?.hex } as React.CSSProperties}
                />
                <select className="w-full px-3 py-2 rounded border border-gray-300 text-sm bg-white">
                  <option>下拉选择</option>
                </select>
              </div>
            </div>

            {/* 排版样式 */}
            <div className="rounded-xl border border-gray-200 p-6 bg-white">
              <h4 className="text-sm font-semibold text-gray-700 mb-4">排版样式</h4>
              <div className="space-y-2">
                <h1 className="text-2xl font-bold text-gray-900">标题 H1</h1>
                <h2 className="text-xl font-semibold text-gray-900">标题 H2</h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  这是一段正文文本，展示字体的可读性和行间距。
                  {style.keywords.slice(0, 3).join(' · ')}
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* 配色标签页 */}
      {activeTab === 'colors' && (
        <div className="space-y-6">
          {/* 主色 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">主色系</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {style.primaryColors.map((color, i) => (
                <div key={i} className="rounded-xl overflow-hidden border border-gray-200">
                  <div className="h-24" style={{ backgroundColor: color.hex }} />
                  <div className="p-3 bg-white">
                    <p className="text-xs font-mono text-gray-900">{color.hex}</p>
                    {color.name && <p className="text-xs text-gray-500 mt-1">{color.name}</p>}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 辅助色 */}
          {style.secondaryColors.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">辅助色系</h3>
              <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                {style.secondaryColors.slice(0, 6).map((color, i) => (
                  <div key={i} className="rounded-xl overflow-hidden border border-gray-200">
                    <div className="h-20" style={{ backgroundColor: color.hex }} />
                    <div className="p-2 bg-white">
                      <p className="text-xs font-mono text-gray-900">{color.hex}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 配色使用建议 */}
          <div className="rounded-xl border border-gray-200 p-6 bg-blue-50">
            <h4 className="text-sm font-semibold text-blue-900 mb-2">配色使用建议</h4>
            <p className="text-sm text-blue-700">
              主色用于主要按钮、链接和重要视觉元素。辅助色用于背景、边框和次要元素。
              确保文本与背景的对比度符合无障碍标准。
            </p>
          </div>

          {/* 行业配色方案推荐 */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">🎨 行业配色方案参考</h3>
            {colorSchemes.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {colorSchemes.map((scheme) => (
                  <div key={scheme.id} className="rounded-xl border border-gray-200 p-4 bg-white hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-semibold text-gray-900">{scheme.productType}</h4>
                      <span className="text-xs text-gray-500">No.{scheme.id}</span>
                    </div>
                    {/* 配色预览 */}
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 h-10 rounded border border-gray-200" style={{ backgroundColor: scheme.primary }} title="主色" />
                      <div className="flex-1 h-10 rounded border border-gray-200" style={{ backgroundColor: scheme.secondary }} title="辅助色" />
                      <div className="flex-1 h-10 rounded border border-gray-200" style={{ backgroundColor: scheme.cta }} title="CTA 按钮色" />
                    </div>
                    <div className="flex gap-2 mb-3">
                      <div className="flex-1 h-8 rounded border border-gray-200" style={{ backgroundColor: scheme.background }} title="背景色" />
                      <div className="flex-1 h-8 rounded border border-gray-200" style={{ backgroundColor: scheme.text }} title="文字色" />
                      <div className="flex-1 h-8 rounded border border-gray-200" style={{ backgroundColor: scheme.border }} title="边框色" />
                    </div>
                    {/* 说明 */}
                    <p className="text-xs text-gray-600">{scheme.notes}</p>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-gray-500">
                <p>加载中...</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* 设计指南标签页 */}
      {activeTab === 'guide' && (
        <div className="space-y-6">
          {/* 风格描述 */}
          <div className="rounded-xl border border-gray-200 p-6 bg-white">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">风格描述</h3>
            <p className="text-sm text-gray-700 leading-relaxed">
              {style.effects || '暂无详细描述'}
            </p>
          </div>

          {/* 适合场景 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-green-200 p-6 bg-green-50">
              <h3 className="text-sm font-semibold text-green-900 mb-3">✅ 适合场景</h3>
              <ul className="space-y-2">
                {style.bestFor.map((item, i) => (
                  <li key={i} className="text-sm text-green-800 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-xl border border-red-200 p-6 bg-red-50">
              <h3 className="text-sm font-semibold text-red-900 mb-3">❌ 不适用场景</h3>
              <ul className="space-y-2">
                {style.doNotUseFor.map((item, i) => (
                  <li key={i} className="text-sm text-red-800 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 技术实现 */}
          <div className="rounded-xl border border-gray-200 p-6 bg-gray-900">
            <h3 className="text-sm font-semibold text-gray-100 mb-3">CSS 技术关键词</h3>
            <pre className="text-xs text-gray-300 font-mono whitespace-pre-wrap leading-relaxed">
              {style.cssKeywords || '暂无技术信息'}
            </pre>
          </div>

          {/* 设计变量 */}
          {style.designVariables && (
            <div className="rounded-xl border border-gray-200 p-6 bg-gray-50">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">设计系统变量</h3>
              <pre className="text-xs text-gray-700 font-mono whitespace-pre-wrap leading-relaxed">
                {style.designVariables}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
