# Quiver AI vs 手写 SVG 对比

## Quiver AI 生成

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
  <path d="m247.9 60.91c-3.1-0.7-8.86-0.86-9.76-1.55..." fill="#C96C4B"/>
  <!-- 50+ 行复杂 path 数据，总代码量 ~100 行 -->
</svg>
```

**特点：**
- ✅ 精致复杂，像真实手绘插画
- ✅ 适合封面、大尺寸展示
- ❌ 代码量大，不适合嵌入大量图标
- ❌ 颜色硬编码，难通过 CSS 控制
- ❌ 需要 API 调用，有成本和延迟

## 手写 SVG

```svg
<svg viewBox="0 0 48 48">
  <path class="hand-drawn-fill" d="M8 10 Q24 14 24 14 L24 38 Q24 38 8 34 Z"/>
  <path class="hand-drawn" d="M40 10 Q24 14 24 14 L24 38 Q24 38 40 34 Z"/>
  <line x1="24" y1="14" x2="24" y2="38" class="hand-drawn"/>
</svg>
```

**特点：**
- ✅ 简洁，易于维护
- ✅ 可通过 CSS 变量控制颜色
- ✅ 零成本，无 API 依赖
- ✅ 适合图标、装饰元素
- ❌ 复杂插画需要大量手写

## 使用建议

| 场景 | 推荐 | 理由 |
|------|------|------|
| **图标、小装饰** | 手写 | 简洁、可控、零成本 |
| **复杂插图、封面** | Quiver API | 精致、专业、节省时间 |
| **需要大量图标** | 手写 | 文件小、性能好 |
| **时间紧张** | Quiver API | 快速生成 |

## 集成方案

### 方案A：手写为主，API 补充

```
mino-frontend/
├── icons/           # 手写基础图标库（书、人、箭头等）
└── SKILL.md         # 提到 Quiver 作为可选补充
```

### 方案B：API 优先

```
mino-frontend/
├── references/
│   └── quiver-calls.md  # API 调用示例
└── SKILL.md         # 优先推荐 Quiver
```

## 推荐：方案A

**理由：**
1. 大部分幻灯片场景（图标、装饰）手写够用且更好
2. 复杂插图可以按需调用 Quiver
3. 保持零依赖核心优势
4. 成本可控（API 按次收费）
