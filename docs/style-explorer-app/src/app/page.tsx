'use client';

import { useState, useEffect } from 'react';
import type { Style } from '@/types/style';
import { StyleGrid } from '@/components/style-grid';

export default function Home() {
  const [styles, setStyles] = useState<Style[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    fetch('/api/styles')
      .then((res) => res.json())
      .then((data) => {
        setStyles(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Failed to load styles:', err);
        setLoading(false);
      });
  }, []);

  const filteredStyles = styles.filter((style) =>
    style.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    style.keywords.some((kw) => kw.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white/80 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">审美风格探索器</h1>
              <p className="text-sm text-gray-500">发现你的 UI 审美偏好</p>
            </div>
            <nav className="flex items-center gap-4">
              <a
                href="/quiz"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
              >
                开始测评
              </a>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* 搜索栏 */}
        <div className="mb-8">
          <input
            type="text"
            placeholder="搜索风格、关键词、适用场景..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
          />
        </div>

        {/* 统计信息 */}
        <div className="mb-6 flex items-center justify-between">
          <p className="text-sm text-gray-500">
            共 <span className="font-medium text-gray-900">{filteredStyles.length}</span> 种风格
          </p>
        </div>

        {/* 风格网格 */}
        {loading ? (
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-gray-200 border-t-blue-600" />
            <p className="mt-4 text-gray-500">加载中...</p>
          </div>
        ) : (
          <StyleGrid styles={filteredStyles} />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-gray-500">
            基于 ui-ux-pro-max 设计系统 · 67 种 UI 风格 · 96 种配色方案 · 56 种字体组合
          </p>
        </div>
      </footer>
    </div>
  );
}
