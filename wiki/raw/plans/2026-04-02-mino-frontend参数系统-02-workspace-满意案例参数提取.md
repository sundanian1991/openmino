# 年老师"满意"案例参数提取

> **基准案例**：`刘乾坤带节奏分析 -frontend.html` 和 `刘乾坤带节奏分析 -v3.html`
>
> **目的**：用年老师喜欢的实际案例校准参数系统

---

## 一、参数对比

### 字体层级

| 层级 | 我定义的 | 年老师满意的 | 差异 |
|------|---------|------------|------|
| **T1 封面标题** | `clamp(1.75rem, 4vw, 2rem)` 28px | `clamp(2.2rem, 5.5vw, 3.5rem)` **35-40px** | ❌ 太小 |
| **T1 页面标题** | `clamp(1.75rem, 4vw, 2rem)` 28px | `clamp(1.8rem, 4.5vw, 2.8rem)` **28-30px** | ✅ 接近 |
| **T2 模块标题** | `clamp(1.125rem, 2vw, 1.25rem)` 18px | `clamp(1rem, 2vw, 1.3rem)` **16-18px** | ✅ 接近 |
| **T3 卡片标题** | `clamp(0.875rem, 1.5vw, 1rem)` 14px | `clamp(0.85rem, 1.3vw, 1rem)` **14-15px** | ✅ 接近 |
| **T4 正文** | `clamp(0.8125rem, 1.3vw, 0.9rem)` 13px | `clamp(0.75rem, 1.2vw, 0.9rem)` **12-13px** | ✅ 接近 |
| **T5 辅助** | `clamp(0.6875rem, 1vw, 0.75rem)` 11px | — | — |
| **T6 标签** | `clamp(0.625rem, 0.8vw, 0.7rem)` 10px | `clamp(0.6rem, 0.8vw, 0.7rem)` **10px** | ✅ 一致 |

### 间距系统

| 参数 | 我定义的 | 年老师满意的 | 差异 |
|------|---------|------------|------|
| **页面 padding** | `clamp(1.5rem, 4vw, 2rem)` 24-32px | `clamp(1.5rem, 4vw, 3rem)` **24-48px** | ❌ 上限太小 |
| **卡片 padding** | 16px | `clamp(1rem, 2vw, 1.5rem)` **16-24px** | ✅ 接近 |
| **卡片 gap** | 16px | `clamp(1rem, 2vw, 1.5rem)` **16-24px** | ✅ 接近 |
| **表头 padding** | 12px | `0.5rem 0.75rem` **8px 12px** | ❌ 太大 |

### 边框系统

| 参数 | 我定义的 | 年老师满意的 | 差异 |
|------|---------|------------|------|
| **卡片边框** | 1px #E5E5E5 | 1px #e5e5e5 | ✅ 一致 |
| **卡片圆角** | **4px** | **2px** | ❌ 太圆 |
| **表头边框** | 2px #111111 | 2px #111111 | ✅ 一致 |
| **分割线高度** | 1px | **2px** | ❌ 太细 |
| **进度条高度** | 2.4px（顶部装饰线） | **3px** | ❌ 太细 |

### 陶土色使用

| 场景 | 我定义的 | 年老师满意的 | 差异 |
|------|---------|------------|------|
| **进度条** | 顶部装饰线 2.4px | **3px 进度条**（跟随滚动） | ❌ 形式不同 |
| **分割线强调** | — | `.divider-line.accent` 2px | ✅ 有 |
| **关键词强调** | 文字颜色 | 文字颜色 + font-weight:600 | ✅ 接近 |
| **徽章背景** | — | badge-high/medium/low（不同色） | ❌ 没有 |

---

## 二、修正后的参数系统

### 2.1 字体层级修正

```css
:root {
  /* === 字体层级（克制专业主义 — 年老师满意版） === */
  /* T1a: 封面标题（更大） */
  --t1-cover: clamp(2.2rem, 5.5vw, 3.5rem);  /* 35-40px */

  /* T1b: 页面标题 */
  --t1-page: clamp(1.8rem, 4.5vw, 2.8rem);   /* 28-30px */

  /* T2: 模块标题 */
  --t2: clamp(1rem, 2vw, 1.3rem);            /* 16-18px */

  /* T3: 卡片标题 */
  --t3: clamp(0.85rem, 1.3vw, 1rem);         /* 14-15px */

  /* T4: 正文 */
  --t4: clamp(0.75rem, 1.2vw, 0.9rem);       /* 12-13px */

  /* T6: 标签/辅助 */
  --t6: clamp(0.6rem, 0.8vw, 0.7rem);        /* 10px */
}
```

### 2.2 间距系统修正

```css
:root {
  /* === 间距系统 === */
  --page-padding: clamp(1.5rem, 4vw, 3rem);  /* 24-48px */
  --card-padding: clamp(1rem, 2vw, 1.5rem);  /* 16-24px */
  --card-gap: clamp(1rem, 2vw, 1.5rem);      /* 16-24px */
  --table-header-padding: 0.5rem 0.75rem;    /* 8px 12px */
  --table-cell-padding: 0.6rem 0.75rem;      /* 10px 12px */
}
```

### 2.3 边框系统修正

```css
:root {
  /* === 边框系统 === */
  --border-thin: 1px solid var(--border);    /* 卡片边框 */
  --border-thick: 2px solid var(--text-primary); /* 表头边框 */
  --divider-height: 2px;                     /* 分割线高度 */
  --progress-bar-height: 3px;                /* 进度条高度 */
  --border-radius: 2px;                      /* 卡片圆角（不是 4px！） */
}
```

### 2.4 陶土色使用修正

```css
/* 进度条（跟随滚动） */
.progress {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 3px;
  background: transparent;
  z-index: 100;
}

.progress-bar {
  height: 100%;
  background: var(--accent);
  width: 0%;
  transition: width 0.2s;
}

/* 分割线强调 */
.divider-line.accent {
  background: var(--accent);
}

/* 关键词强调 */
.accent-text {
  color: var(--accent);
  font-weight: 600;
}

/* 徽章系统（年老师喜欢的） */
.badge {
  display: inline-block;
  padding: 0.2rem 0.5rem;
  font-size: 0.7rem;
  font-weight: 600;
  border-radius: 2px;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

.badge-high {
  background: rgba(214, 51, 51, 0.1);
  color: #d63333;
}

.badge-medium {
  background: rgba(245, 158, 11, 0.1);
  color: #f59e0b;
}

.badge-low {
  background: rgba(37, 99, 235, 0.1);
  color: #2563eb;
}
```

---

## 三、关键发现

### 我之前定义错的参数

| 参数 | 我定义的 | 年老师喜欢的 | 修正 |
|------|---------|------------|------|
| **卡片圆角** | 4px | **2px** | 更锐利 |
| **分割线高度** | 1px | **2px** | 更明显 |
| **进度条** | 顶部装饰线 2.4px | **跟随滚动进度条 3px** | 更动态 |
| **封面标题** | 28px | **35-40px** | 更有冲击力 |
| **页面 padding 上限** | 32px | **48px** | 更宽松 |

### 年老师喜欢的风格特征

1. **锐利**：圆角 2px（不是 4px），分割线 2px（不是 1px）
2. **动态**：进度条跟随滚动，不是固定顶部装饰线
3. **大标题**：封面标题 35-40px，有冲击力
4. **宽松**：页面 padding 上限 48px，呼吸感
5. **徽章系统**：badge-high/medium/low 不同色标记

---

## 四、下一步

更新 SKILL.md Phase 2.6 参数系统，用年老师满意的参数值替换。