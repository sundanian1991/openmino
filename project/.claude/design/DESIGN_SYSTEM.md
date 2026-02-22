# 设计规范 - Design System

> Mino的设计语言：Clean > Minimalist > Modern

---

## Vibe Coding 标准

### 图标系统（第一梯队）

| 库 | 场景 | 特点 |
|---|------|------|
| **Lucide Icons** ⭐ | 默认首选 | Shadcn UI御用，线条完美 |
| Heroicons | Tailwind技术栈 | 官方出品，两种风格 |
| Radix Icons | 开发者工具 | 技术感、极客风 |

**使用原则**：
- 禁止让AI"绘制"图标，必须调用组件库
- React组件导入：`import { Home } from 'lucide-react'`
- 使用 `currentColor` 继承文本颜色
- Tailwind类控制尺寸：`w-4 h-4` 或 `w-5 h-5`

---

## 色彩系统

### 主色系（Slate）
```css
/* 背景 */
bg-slate-50   /* 浅色背景 */
bg-slate-100  /* 卡片背景 */
bg-white      /* 纯白卡片 */

/* 文字 */
text-slate-400 /* 次要文字 */
text-slate-600 /* 正文 */
text-slate-900 /* 标题 */

/* 边框 */
border-slate-200 /* 分割线 */
```

### 强调色（Violet）
```css
text-violet-600    /* 链接、强调 */
bg-violet-100      /* 图标背景 */
border-violet-300  /* hover边框 */
```

### 辅助色（Amber）
```css
text-amber-600     /* 次要强调 */
bg-amber-100       /* 图标背景（深度版） */
```

---

## 圆角系统

```css
rounded-xl    /* 12px - 卡片 */
rounded-2xl   /* 16px - 大卡片 */
rounded-full  /* 完整圆形 - 图标背景 */
```

---

## 阴影系统

```css
shadow-sm          /* 浅阴影 - 默认状态 */
shadow-lg          /* 深阴影 - hover状态 */
hover:shadow-xl    /* 更深阴影 - hover加强 */
```

---

## 动效系统

### 基础过渡
```css
transition-all duration-200          /* 快速 */
transition-all duration-300          /* 标准 */
```

### Hover效果
```css
hover:-translate-y-0.5              /* 轻微上浮 */
hover:-translate-y-1                /* 明显上浮 */
hover:shadow-lg                     /* 阴影加深 */
hover:border-violet-300             /* 边框变色 */
```

### 进场动画（Framer Motion风格）
```css
/* 列表项 */
initial: opacity-0, y-20
animate: opacity-1, y-0
exit: opacity-0, y-20

/* 模态框 */
initial: opacity-0, scale-0.95, y-20
animate: opacity-1, scale-1, y-0
```

---

## 间距系统

```css
gap-2   /* 8px - 小间距 */
gap-4   /* 16px - 标准间距 */
gap-6   /* 24px - 大间距 */
gap-8   /* 32px - 超大间距 */

p-4    /* 16px - 内边距 */
p-6    /* 24px - 大内边距 */
p-8    /* 32px - 超大内边距 */
```

---

## 字体系统

### 字体族
```css
font-family: "Inter", "Noto Sans SC", sans-serif
```

### 字号
```css
text-xs      /* 12px - 辅助信息 */
text-sm      /* 14px - 正文 */
text-base    /* 16px - 标准正文 */
text-lg      /* 18px - 小标题 */
text-xl      /* 20px - 中标题 */
text-2xl     /* 24px - 大标题 */
text-3xl     /* 30px - 超大标题 */
```

### 字重
```css
font-normal   /* 400 */
font-medium   /* 500 */
font-semibold /* 600 */
font-bold     /* 700 */
```

---

## 排版原则

### 信息层级
```
1. 视觉焦点 > 核心内容 > 辅助信息
2. 大标题 > 小标题 > 正文 > 注释
3. 强调色 > 主色 > 次要色
```

### 阅读节奏
```
- 段落间距：line-height-6 (1.6-1.7)
- 列表间距：space-y-1.5 或 space-y-2
- 卡片间距：space-y-4 或 gap-6
```

### 文本截断
```css
line-clamp-1  /* 单行截断 */
line-clamp-2  /* 两行截断 */
line-clamp-3  /* 三行截断 */
```

---

## 组件模式

### 卡片组件
```html
<article class="bg-white rounded-xl p-5 shadow-sm border border-slate-200
                   hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
  <!-- 内容 -->
</article>
```

### 图标+文字组合
```html
<div class="flex items-center gap-2">
  <i data-lucide="icon-name" class="w-4 h-4"></i>
  <span>文字</span>
</div>
```

### 标签徽章
```html
<span class="inline-flex items-center px-2 py-1 rounded-md text-xs font-medium bg-violet-100 text-violet-600">
  标签
</span>
```

---

## 响应式设计

### 断点
```css
max-w-2xl mx-auto    /* 移动优先 */
md:max-w-3xl         /* 中等屏幕 */
lg:max-w-4xl         /* 大屏幕 */
```

### 网格
```css
grid-cols-1          /* 单列（移动） */
md:grid-cols-2       /* 双列（平板+） */
lg:grid-cols-3       /* 三列（桌面） */
```

---

## 无障碍设计

### 焦点管理
```css
focus:outline-none           /* 移除默认轮廓 */
focus:ring-2 focus:ring-violet-500  /* 自定义焦点环 */
```

### ARIA标签
```html
<button aria-label="关闭">
  <i data-lucide="x"></i>
</button>
```

---

## 性能优化

### 图片
```html
<img src="..." loading="lazy" class="rounded-lg" />
```

### 代码分割
```javascript
const HeavyChart = lazy(() => import('./HeavyChart'))
```

---

*设计规范持续演进中...*

---

## 快速参考

### 常用组合

**文章卡片**
```html
<article class="bg-white rounded-xl p-5 shadow-sm border border-slate-200
                   hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200">
```

**主要按钮**
```html
<button class="px-4 py-2 bg-violet-600 text-white rounded-lg
                hover:bg-violet-700 transition-colors">
  按钮
</button>
```

**次要按钮**
```html
<button class="px-4 py-2 border border-slate-200 text-slate-700 rounded-lg
                hover:bg-slate-50 transition-colors">
  按钮
</button>
```

**输入框**
```html
<input class="w-full px-4 py-2 border border-slate-200 rounded-lg
               focus:ring-2 focus:ring-violet-500 focus:border-transparent" />
```
