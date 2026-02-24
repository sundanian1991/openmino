'use client';

import Link from 'next/link';
import type { Style } from '@/types/style';
import { StylePreview } from './style-preview';

export function StyleCard({ style }: { style: Style }) {
  return (
    <Link href={`/style/${style.id}`}>
      <article className="group relative rounded-2xl border border-gray-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* 风格预览区域（主要视觉） - 增大高度 */}
        <div className="h-56 w-full bg-gray-50">
          <StylePreview style={style} className="h-full w-full" />
        </div>

        {/* 底部信息区 */}
        <div className="p-5 bg-white border-t border-gray-100">
          {/* 风格名称 */}
          <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
            {style.name}
          </h3>

          {/* 关键词标签 */}
          <div className="flex flex-wrap gap-1.5 mb-4">
            {style.keywords.slice(0, 4).map((kw, i) => (
              <span
                key={i}
                className="px-2.5 py-1 text-xs rounded-md bg-gray-100 text-gray-700 font-medium"
              >
                {kw}
              </span>
            ))}
          </div>

          {/* 配色预览 */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2 font-medium">配色方案</p>
            <div className="flex items-center gap-2">
              {style.primaryColors.slice(0, 5).map((color, i) => (
                <div
                  key={i}
                  className="w-7 h-7 rounded-lg border-2 border-white shadow-sm flex-shrink-0"
                  style={{ backgroundColor: color.hex }}
                  title={color.name || color.hex}
                />
              ))}
            </div>
          </div>

          {/* 适用场景标签 */}
          <div className="mb-4">
            <p className="text-xs text-gray-500 mb-2 font-medium">适合场景</p>
            <div className="flex flex-wrap gap-1">
              {style.bestFor.slice(0, 2).map((item, i) => (
                <span
                  key={i}
                  className="px-2 py-1 text-xs rounded-md bg-green-50 text-green-700"
                >
                  {item.length > 10 ? item.slice(0, 10) + '...' : item}
                </span>
              ))}
            </div>
          </div>

          {/* 适配性指标 */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center gap-3 text-sm">
              {style.lightMode?.includes('✓') && (
                <span className="flex items-center gap-1 text-gray-600" title="支持浅色模式">
                  🌞
                </span>
              )}
              {style.darkMode?.includes('✓') && (
                <span className="flex items-center gap-1 text-gray-600" title="支持深色模式">
                  🌙
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 text-xs font-medium">
              <span className={`px-2 py-1 rounded ${
                style.performance?.includes('Excellent') ? 'bg-green-100 text-green-700' :
                style.performance?.includes('Good') ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-600'
              }`}>
                {style.performance?.includes('Excellent') ? '⚡' :
                 style.performance?.includes('Good') ? '✓' : '标准'}
              </span>
              <span className={`px-2 py-1 rounded ${
                style.accessibility?.includes('AAA') ? 'bg-blue-100 text-blue-700' :
                style.accessibility?.includes('AA') ? 'bg-blue-50 text-blue-600' :
                'bg-gray-100 text-gray-600'
              }`}>
                {style.accessibility?.includes('AAA') ? 'AAA' :
                 style.accessibility?.includes('AA') ? 'AA' : '标准'}
              </span>
            </div>
          </div>

          {/* 查看详情提示 */}
          <div className="mt-4 pt-4 border-t border-gray-100 text-center">
            <span className="text-sm text-blue-600 font-medium group-hover:underline">
              查看详情 →
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}
