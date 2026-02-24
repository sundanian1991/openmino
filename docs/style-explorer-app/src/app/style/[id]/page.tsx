'use client';

import { useState, useEffect, use } from 'react';
import type { Style } from '@/types/style';
import { StyleDetail } from '@/components/style-detail';
import Link from 'next/link';

export default function StylePage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [style, setStyle] = useState<Style | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('/api/styles')
      .then((res) => res.json())
      .then((data: Style[]) => {
        const found = data.find((s) => s.id === id);
        setStyle(found || null);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16" />
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600" />
            <p className="mt-4 text-gray-500">加载中...</p>
          </div>
        </main>
      </div>
    );
  }

  if (!style) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
        <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <Link href="/" className="text-sm text-blue-600 hover:text-blue-700">
                ← 返回首页
              </Link>
            </div>
          </div>
        </header>
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-2">风格未找到</h1>
            <p className="text-gray-500 mb-4">无法找到 ID 为 {id} 的风格</p>
            <Link href="/" className="text-blue-600 hover:text-blue-700">
              返回首页 →
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/" className="text-sm text-blue-600 hover:text-blue-700 font-medium">
              ← 返回首页
            </Link>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-500">
                {style.name}
              </span>
              <div className="flex gap-1">
                {style.primaryColors.slice(0, 4).map((color, i) => (
                  <div
                    key={i}
                    className="w-5 h-5 rounded-full border border-gray-200"
                    style={{ backgroundColor: color.hex }}
                    title={color.hex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 风格标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-3">{style.name}</h1>
          <div className="flex flex-wrap gap-2">
            {style.keywords.map((kw, i) => (
              <span
                key={i}
                className="px-3 py-1 text-sm rounded-full bg-blue-50 text-blue-700 font-medium"
              >
                {kw}
              </span>
            ))}
          </div>
        </div>

        {/* 风格详情组件 */}
        <StyleDetail style={style} />
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            基于 ui-ux-pro-max 设计系统 · 67 种 UI 风格
          </p>
        </div>
      </footer>
    </div>
  );
}
