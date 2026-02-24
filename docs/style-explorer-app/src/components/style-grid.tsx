'use client';

import type { Style } from '@/types/style';
import { StyleCard } from './style-card';

interface StyleGridProps {
  styles: Style[];
}

export function StyleGrid({ styles }: StyleGridProps) {
  if (styles.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500">暂无风格数据</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {styles.map((style) => (
        <StyleCard
          key={style.id}
          style={style}
        />
      ))}
    </div>
  );
}
