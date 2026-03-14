'use client';

import type { Style } from '@/types/style';
import { StylePreview } from './style-preview';

interface StyleModalProps {
  style: Style;
  onClose: () => void;
}

export function StyleModal({ style, onClose }: StyleModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm" onClick={onClose}>
      <div
        className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 关闭按钮 */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-md transition-all"
        >
          ✕
        </button>

        {/* 顶部：大尺寸风格预览 - 用 detailed 模式 */}
        <div className="h-96 w-full border-b border-gray-200 bg-gray-50">
          <StylePreview style={style} variant="detailed" className="h-full w-full" />
        </div>

        {/* 内容区 */}
        <div className="p-8">
          {/* 风格名称和关键词 */}
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">{style.name}</h2>
            <div className="flex flex-wrap gap-2">
              {style.keywords.map((kw, i) => (
                <span
                  key={i}
                  className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700"
                >
                  {kw}
                </span>
              ))}
            </div>
          </div>

          {/* 两列布局 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* 左列：配色方案 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">配色方案</h3>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500 mb-2">主色</p>
                  <div className="flex gap-2 flex-wrap">
                    {style.primaryColors.map((color, i) => (
                      <div key={i} className="text-center">
                        <div
                          className="w-16 h-16 rounded-lg border border-gray-200 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <p className="text-xs text-gray-600 mt-1 font-mono">{color.hex}</p>
                        {color.name && <p className="text-xs text-gray-400">{color.name}</p>}
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500 mb-2">辅助色</p>
                  <div className="flex gap-2 flex-wrap">
                    {style.secondaryColors.slice(0, 5).map((color, i) => (
                      <div key={i} className="text-center">
                        <div
                          className="w-12 h-12 rounded-lg border border-gray-200 shadow-sm"
                          style={{ backgroundColor: color.hex }}
                        />
                        <p className="text-xs text-gray-600 mt-1 font-mono">{color.hex}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 右列：效果与动画 */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">效果与动画</h3>
              <div className="p-4 rounded-lg bg-gray-50 border border-gray-200">
                <p className="text-sm text-gray-700 leading-relaxed">
                  {style.effects || '暂无描述'}
                </p>
              </div>
            </div>
          </div>

          {/* 适用场景 */}
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold text-green-700 mb-2">✅ 适合场景</h3>
              <ul className="space-y-1">
                {style.bestFor.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-green-500 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold text-red-700 mb-2">❌ 不适用场景</h3>
              <ul className="space-y-1">
                {style.doNotUseFor.map((item, i) => (
                  <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                    <span className="text-red-500 mt-0.5">•</span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* 适配性指标 */}
          <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">适配性指标</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-sm text-gray-500">浅色模式</p>
                <p className="text-lg font-semibold">{style.lightMode || '-'}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">深色模式</p>
                <p className="text-lg font-semibold">{style.darkMode || '-'}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">性能</p>
                <p className="text-lg font-semibold">{style.performance || '-'}</p>
              </div>
              <div className="text-center">
                <p className="text-sm text-gray-500">可访问性</p>
                <p className="text-lg font-semibold">{style.accessibility || '-'}</p>
              </div>
            </div>
          </div>

          {/* CSS 技术关键词 */}
          <div className="mt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">CSS 技术关键词</h3>
            <div className="p-4 rounded-lg bg-gray-900 text-gray-100 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap">{style.cssKeywords || '暂无'}</pre>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
