# 三个页面 Design Tokens 提取报告

> L2 视觉层补完 — 之前只做了结构层，现在补颜色、字体、间距、圆角、阴影等具体数值
> 日期: 2026-05-10

---

## 1. Apple 中国官网 (apple.com.cn)

### 色板

| Token | 色值 | 用途 |
|-------|------|------|
| `--apple-black` | `#1D1D1F` | 主文本色、标题色 |
| `--apple-gray-dark` | `#86868B` | 次要描述文本 |
| `--apple-gray-light` | `#F5F5F7` | 浅灰背景 |
| `--apple-white` | `#FFFFFF` | 纯白背景、深色底上的文本 |
| `--apple-blue-link` | `#2997FF` | 链接和 CTA（浅底） |
| `--apple-blue-link-hover` | `#0071E3` | 链接悬停 |
| `--apple-cta-blue` | `#0071E3` | 实心按钮底色 |
| `--apple-nav-bg` | `rgba(29,29,31,0.72)` | 导航栏半透明底色 |
| `--apple-divider` | `#D2D2D7` | 分割线 |

**关键洞察**：Apple 的深色不是纯黑 `#000`，而是 `#1D1D1F`——偏暖的深灰。浅色背景也不是纯白，是 `#F5F5F7`——偏蓝灰的浅白。这制造了一种"柔和但不脏"的质感。

### 字体

| 层级 | 字体 | 字号 | 字重 | 行高 |
|------|------|------|------|------|
| Hero 标题 | SF Pro Display | 48-56px | 600 (SemiBold) | 1.07 |
| 产品标题 | SF Pro Display | 28-40px | 600 | 1.1 |
| 描述文案 | SF Pro Text | 21px | 400 (Regular) | 1.38 |
| 小字说明 | SF Pro Text | 14-17px | 400 | 1.43 |
| 导航文字 | SF Pro Text | 12px | 400 | 1.0 |
| 链接/CTA | SF Pro Text | 17px | 400 | 1.0 |

**关键洞察**：Apple 用两个变体——Display 用于大标题（优化了大字号下的字形间距），Text 用于正文和小字。行高极度紧凑（标题 1.07），但因为是无衬线 + 大字号，不会挤。

### 间距

| Token | 值 | 用途 |
|-------|-----|------|
| `--spacing-hero-top` | 120px | Hero 标题距顶部 |
| `--spacing-section` | 80-100px | 模块间距（全屏区块之间） |
| `--spacing-grid-gap` | 20px | 网格产品卡片间距 |
| `--spacing-card-padding` | 40px | 卡片内边距 |
| `--spacing-cta-margin` | 16px | 双 CTA 按钮间距 |

### 圆角

| 元素 | 圆角 |
|------|------|
| 产品卡片 | 18px |
| 按钮 | 980px（接近全圆角） |
| 图片容器 | 0（全屏图无圆角） |

### 阴影

| 元素 | 阴影 |
|------|------|
| 导航栏 | 无阴影，靠半透明底色区分 |
| 产品卡片 | 无阴影，靠背景色差异区分 |
| 按钮 | 无阴影，纯扁平 |

**关键洞察**：Apple 几乎不用阴影。层级靠色块和大小对比制造，不是靠阴影。

---

## 2. Notion AI 产品页 (notion.com/product/ai)

### 色板

| Token | 色值 | 用途 |
|-------|------|------|
| `--notion-black` | `#000000` | 主文本色、标题色 |
| `--notion-body` | `#37352F` | 正文文本色（偏暖的深灰褐） |
| `--notion-gray` | `#9B9A97` | 次要文本、占位符 |
| `--notion-gray-light` | `#F1F1EF` | 浅灰背景、分隔 |
| `--notion-gray-bg` | `#F7F7F5` | 区块背景色 |
| `--notion-white` | `#FFFFFF` | 纯白背景 |
| `--notion-accent-blue` | `#2383E2` | 链接和 CTA 主色 |
| `--notion-accent-blue-hover` | `#1B6EC2` | 链接悬停 |
| `--notion-accent-red` | `#EB5757` | 错误、删除 |
| `--notion-accent-orange` | `#FF9500` | 标签、高亮 |
| `--notion-accent-green` | `#40AE62` | 成功、完成 |
| `--notion-border` | `#E3E2E0` | 分割线、边框 |
| `--notion-code-bg` | `#F7F6F3` | 代码块背景 |

**关键洞察**：Notion 的正文不是纯黑，是 `#37352F`——一个偏暖的灰褐色，比纯黑柔和但不像 Apple 那样冷。灰色系偏暖（带黄色倾向），整体感觉比 Apple 更"纸质"。

### 字体

| 层级 | 字体 | 字号 | 字重 | 行高 |
|------|------|------|------|------|
| Hero 标题 | Inter, -apple-system | 48-56px | 700 (Bold) | 1.15 |
| 区块标题 | Inter, -apple-system | 24-32px | 600 (SemiBold) | 1.2 |
| 卡片标题 | Inter, -apple-system | 18-20px | 600 | 1.3 |
| 正文 | Inter, -apple-system | 16px | 400 (Regular) | 1.5 |
| 小字说明 | Inter, -apple-system | 14px | 400 | 1.5 |
| CTA 按钮 | Inter, -apple-system | 14px | 500 (Medium) | 1.0 |

**关键洞察**：Notion 全站用 Inter（+ 系统回退），不区分 Display 和 Text。层级完全靠字重和字号拉开，不是靠不同字体变体。

### 间距

| Token | 值 | 用途 |
|-------|-----|------|
| `--spacing-hero-top` | 80px | Hero 距顶部 |
| `--spacing-section` | 96-120px | 功能模块间距 |
| `--spacing-section-dark` | 120px | 深色信任区块间距 |
| `--spacing-card-gap` | 16px | 卡片间距 |
| `--spacing-card-padding` | 24px | 卡片内边距 |
| `--spacing-logo-bar` | 40px | Logo 墙上下间距 |
| `--container-max` | 1200px | 最大容器宽度 |
| `--content-max` | 800px | 正文最大宽度 |

### 圆角

| 元素 | 圆角 |
|------|------|
| 功能卡片 GIF | 12px |
| 按钮 | 8px |
| 输入框 | 6px |
| Logo 卡片 | 8px |
| FAQ 手风琴 | 8px |

### 阴影

| 元素 | 阴影 |
|------|------|
| 功能卡片 | `0px 2px 8px rgba(0,0,0,0.08)` |
| 按钮悬停 | `0px 4px 12px rgba(0,0,0,0.12)` |
| 导航栏 | `0px 1px 0px #E3E2E0`（底线而非阴影） |

---

## 3. Anthropic Academy (anthropic.skilljar.com)

### 色板

| Token | 色值 | 用途 |
|-------|------|------|
| `--anthropic-dark` | `#141413` | 主文本色（官方品牌色） |
| `--anthropic-light` | `#FAF9F5` | 浅背景色（官方品牌色） |
| `--anthropic-mid-gray` | `#B0AEA5` | 次要元素 |
| `--anthropic-light-gray` | `#E8E6DC` | 微妙背景 |
| `--anthropic-accent-orange` | `#D97757` | 主强调色 |
| `--anthropic-accent-blue` | `#6A9BCC` | 次强调色 |
| `--anthropic-accent-green` | `#788C5D` | 第三强调色 |
| `--anthropic-white` | `#FFFFFF` | 纯白 |

**来源**：Anthropic 官方 Brand Guidelines skill（github.com/anthropics/skills）。

**关键洞察**：Anthropic 的色板最克制——没有纯黑、没有纯白。主文本 `#141413`，背景 `#FAF9F5`，全部偏暖。三色系统（橙/蓝/绿）全部是低饱和的"大地色系"。

### 字体

| 层级 | 字体 | 字号 | 字重 | 行高 |
|------|------|------|------|------|
| 页面标题 | Poppins | 36-48px | 600-700 | 1.2 |
| 课程标题 | Poppins | 20-24px | 600 | 1.25 |
| 描述文案 | Lora | 16px | 400 | 1.6 |
| 小字说明 | Lora | 14px | 400 | 1.6 |
| 按钮/标签 | Poppins | 14px | 500 | 1.0 |

**关键洞察**：Anthropic 是三个里面唯一用衬线体做正文的（Lora）。标题用无衬线（Poppins），正文用衬线（Lora）——经典的"无衬线标题 + 衬线正文"组合，阅读感最像出版物。

### 间距

| Token | 值 | 用途 |
|-------|-----|------|
| `--spacing-section` | 64-80px | 课程卡片间距 |
| `--spacing-card-gap` | 16-24px | 卡片间距（网格） |
| `--spacing-card-padding` | 24-32px | 卡片内边距 |
| `--container-max` | 1200px | 最大容器宽度 |
| `--content-max` | 720px | 正文最大宽度 |

### 圆角

| 元素 | 圆角 |
|------|------|
| 课程卡片 | 8-12px |
| 按钮 | 4-6px（微圆角，非全圆角） |
| 图片 | 4px |

### 阴影

| 元素 | 阴影 |
|------|------|
| 课程卡片 | `0px 1px 3px rgba(0,0,0,0.06)`（极轻） |
| 卡片悬停 | `0px 4px 12px rgba(0,0,0,0.1)` |

---

## 三页对比

### 色彩策略

| 维度 | Apple | Notion | Anthropic |
|------|-------|--------|-----------|
| 主文本 | `#1D1D1F` 暖深灰 | `#37352F` 暖灰褐 | `#141413` 暖极深灰 |
| 背景 | `#F5F5F7` 冷浅灰白 | `#F7F7F5` 暖浅灰 | `#FAF9F5` 暖象牙白 |
| 强调色 | `#2997FF` 亮蓝 | `#2383E2` 中性蓝 | `#D97757` 赤陶橙 |
| 色彩温度 | 冷 | 中性偏暖 | 暖 |
| 色彩数量 | 3 色（极少） | 8+ 色（丰富） | 7 色（大地系） |

### 字体策略

| 维度 | Apple | Notion | Anthropic |
|------|-------|--------|-----------|
| 字体数量 | 2 变体（SF Display + Text） | 1 族（Inter） | 2 族（Poppins + Lora） |
| Hero 标题 | 48-56px / 600 | 48-56px / 700 | 36-48px / 600-700 |
| 正文 | 21px / 400 | 16px / 400 | 16px / 400 |
| 正文行高 | 1.38（紧凑） | 1.5（标准） | 1.6（宽松） |
| 风格感受 | 科技、克制 | SaaS、通用 | 出版物、人文 |

### 间距与密度

| 维度 | Apple | Notion | Anthropic |
|------|-------|--------|-----------|
| 模块间距 | 80-100px | 96-120px | 64-80px |
| 卡片间距 | 20px | 16px | 16-24px |
| 卡片内边距 | 40px | 24px | 24-32px |
| 密度评级 | 极低（大气） | 中等（均衡） | 中等偏高（密集） |

### 圆角与阴影

| 维度 | Apple | Notion | Anthropic |
|------|-------|--------|-----------|
| 卡片圆角 | 18px | 12px | 8-12px |
| 按钮圆角 | 980px（全圆角） | 8px | 4-6px |
| 卡片阴影 | 无 | 轻（0.08 透明度） | 极轻（0.06 透明度） |
| 导航区分方式 | 半透明底色 | 底线分隔 | 无明显区分 |

---

## 复刻要点总结

如果要复刻其中一个页面的视觉风格，**最关键的 5 个参数**：

### 复刻 Apple

```css
--text-primary: #1D1D1F;
--bg-light: #F5F5F7;
--accent-blue: #2997FF;
--font-stack: -apple-system, 'SF Pro Display', 'SF Pro Text', sans-serif;
--card-radius: 18px;
--btn-radius: 980px;
--spacing-section: 100px;
shadow: none; /* 零阴影，靠色块 */
```

### 复刻 Notion

```css
--text-primary: #37352F;
--bg-light: #F7F7F5;
--accent-blue: #2383E2;
--font-stack: Inter, -apple-system, sans-serif;
--card-radius: 12px;
--btn-radius: 8px;
--spacing-section: 120px;
shadow: 0px 2px 8px rgba(0,0,0,0.08);
```

### 复刻 Anthropic

```css
--text-primary: #141413;
--bg-light: #FAF9F5;
--accent-orange: #D97757;
--font-heading: Poppins, sans-serif;
--font-body: Lora, serif;
--card-radius: 10px;
--btn-radius: 6px;
--spacing-section: 80px;
shadow: 0px 1px 3px rgba(0,0,0,0.06);
```
