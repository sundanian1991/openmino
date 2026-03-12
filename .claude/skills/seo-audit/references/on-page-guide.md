---
input: 页面 SEO 优化需求
output: on-page-guide.md
pos: .claude/skills/seo-audit/references/on-page-guide.md
---

# On-Page SEO Optimization Guide

页面 SEO 优化详细指南 — 让单个页面在搜索结果中排名更高。

---

## Title Tags (标题标签)

### Best Practices

```
✅ 50-60 字符 (可见于 SERP)
✅ 主关键词靠前
✅ 唯一，每页不同
✅ 有吸引力，促点击
✅ 品牌名置后
```

### 示例

```html
<!-- 好 ✅ -->
<title>SEO 审计工具 - 免费网站 SEO 检查 | BrandName</title>

<!-- 坏 ❌ -->
<title>首页</title>
<title>SEO 工具 SEO 审计 SEO 检查 SEO 优化 - BrandName 最好最好的工具</title>
```

### 常见问题

| 问题 | 影响 | 修复 |
|------|------|------|
| 重复标题 | 排名分散 | 每页唯一定制 |
| 太长 (>60 字符) | SERP 截断 | 精简到 60 字符内 |
| 太短 (<30 字符) | 浪费机会 | 添加价值主张 |
| 关键词堆砌 | 可能被 penalize | 自然使用 1-2 次 |
| 缺失 | 无排名信号 | 立即添加 |

---

## Meta Descriptions (元描述)

### Best Practices

```
✅ 150-160 字符
✅ 含主关键词
✅ 清晰价值主张
✅ 有行动号召
✅ 每页唯一
```

### 示例

```html
<!-- 好 ✅ -->
<meta name="description" content="免费 SEO 审计工具，5 分钟内发现网站技术问题。生成详细报告，提供优先级修复建议。立即开始优化！">

<!-- 坏 ❌ -->
<meta name="description" content="这是一个关于 SEO 工具的页面。我们提供很多功能。">
```

### CTA 示例

```
🔹 立即开始
🔹 免费试用
🔹 了解更多
🔹 获取报告
🔹 今天咨询
```

---

## Heading Structure (标题结构)

### 正确层级

```html
<h1>主标题 (含主关键词)</h1>
  <h2>主要分节</h2>
    <h3>子分节</h3>
      <h4>细节</h4>
```

### 规则

```
✅ 每页一个 H1
✅ H1 含主关键词
✅ 逻辑层级 (不跳级)
✅ 描述内容，非样式
✅ 长度 20-70 字符
```

### 常见错误

```html
<!-- ❌ 多个 H1 -->
<h1>公司名</h1>
<h1>页面标题</h1>

<!-- ❌ 跳级 -->
<h1>标题</h1>
<h3>子标题</h3>  <!-- 缺少 H2 -->

<!-- ❌ 仅用于样式 -->
<h1 style="font-size: 12px">大标题</h1>
```

---

## Content Optimization

### Keyword Placement

```
✅ 首段 100 字内
✅ H1/H2 标题
✅ URL slug
✅ 图片 alt 文本
✅ 自然分布全文
```

### Content Depth

| 内容类型 | 建议长度 |
|---------|---------|
| 产品页 | 300-500 字 |
| 服务页 | 500-800 字 |
| 博客文章 | 1000-2000 字 |
| 指南/教程 | 2000-5000 字 |
| 支柱页面 | 3000-10000 字 |

### Search Intent Matching

| 意图类型 | 特征 | 示例 |
|---------|------|------|
| **信息型** | 学习/研究 | "什么是 SEO" |
| **导航型** | 找特定网站 | "Ahrefs 登录" |
| **商业调查** | 比较/评估 | "最佳 SEO 工具" |
| **交易型** | 购买/行动 | "购买 SEO 服务" |

---

## Image Optimization

### File Naming

```
✅ descriptive-keyword.jpg
✅ seo-audit-tool.png
❌ IMG_1234.jpg
❌ 图片 1.png
```

### Alt Text

```html
<!-- 好 ✅ -->
<img src="dashboard.png" alt="SEO 审计工具仪表板显示网站健康分数和优先级问题列表">

<!-- 坏 ❌ -->
<img src="dashboard.png" alt="图片">
<img src="dashboard.png" alt="SEO 工具 SEO 优化 SEO 审计...">
<img src="dashboard.png">  <!-- 缺失 alt -->
```

### Compression

| 格式 | 适用场景 | 压缩率 |
|------|---------|--------|
| WebP | 通用 (首选) | 高 |
| JPEG | 照片 | 中 |
| PNG | 透明/图形 | 低 |
| SVG | 图标/标志 | 无损 |

### Lazy Loading

```html
<img src="image.jpg" loading="lazy" alt="描述">
```

---

## Internal Linking

### Best Practices

```
✅ 描述性锚文本
✅ 链接到重要页面
✅ 逻辑相关
✅ 合理数量 (每页 3-10 个)
```

### 锚文本示例

```html
<!-- 好 ✅ -->
<a href="/seo-tools">了解我们的 SEO 工具</a>

<!-- 坏 ❌ -->
<a href="/seo-tools">点击这里</a>
<a href="/seo-tools">SEO 工具 SEO 优化 SEO 服务</a>
```

### Link Relationships

```
层级链接：首页 → 分类 → 产品
相关链接：产品 A ↔ 产品 B
支柱链接：博客 → 支柱页面
```

---

## URL Optimization

### Best Practices

```
✅ domain.com/primary-keyword
✅ domain.com/category/keyword
✅ 小写、连字符
✅ 简短描述性
```

### 示例

```
✅ domain.com/seo-audit-tool
✅ domain.com/blog/seo-guide
❌ domain.com/?p=123
❌ domain.com/SEO_Audit_Tool
❌ domain.com/seo-audit-tool-copy-final-v2
```

---

## Content Quality: E-E-A-T

### Experience (经验)

```
✅ 第一手案例
✅ 真实数据
✅ 原创研究
✅ 实操分享
```

### Expertise (专业)

```
✅ 作者资质展示
✅ 准确信息
✅ 引用来源
✅ 专业术语正确使用
```

### Authoritativeness (权威)

```
✅ 行业认可
✅ 被引用/链接
✅ 获奖/认证
✅ 媒体报道
```

### Trustworthiness (可信)

```
✅ 联系方式清晰
✅ 关于我们
✅ 隐私政策
✅ 安全连接 (HTTPS)
✅ 用户评价真实
```

---

## On-Page Audit Checklist

### 基础要素

- [ ] Title tag 唯一且优化
- [ ] Meta description 有吸引力
- [ ] H1 唯一且含关键词
- [ ] Heading 层级清晰
- [ ] URL 简短描述性

### 内容质量

- [ ] 首段含关键词
- [ ] 内容深度足够
- [ ] 满足搜索意图
- [ ] 优于竞争对手
- [ ] 更新及时

### 技术要素

- [ ] 图片 alt 完整
- [ ] 内部链接合理
- [ ] 无死链
- [ ] Schema markup 正确
- [ ] 移动端友好

---

## Quick Wins

1. **修复缺失 title/meta** — 10 分钟/页
2. **优化 H1** — 5 分钟/页
3. **添加内部链接** — 15 分钟/页
4. **压缩图片** — 批量工具
5. **修复死链** — 工具扫描后批量修复
