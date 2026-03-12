---
input: Schema markup 实现需求
output: schema-guide.md
pos: .claude/skills/seo-audit/references/schema-guide.md
---

# Schema Markup Implementation Guide

结构化数据 (Schema.org) 实现指南 — 帮助搜索引擎更好理解内容，获得丰富搜索结果。

---

## What is Schema Markup?

Schema markup (结构化数据) 是添加到 HTML 的代码，帮助搜索引擎更好理解内容。

**好处**:
- 丰富搜索结果 (Rich Snippets)
- 知识图谱展示
- 语音搜索优化
- 提高点击率 (CTR)

---

## Common Schema Types

### 1. Organization Schema

```json
{
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "公司名称",
  "url": "https://domain.com",
  "logo": "https://domain.com/logo.png",
  "description": "公司简介",
  "foundingDate": "2020",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "地址",
    "addressLocality": "城市",
    "postalCode": "邮编",
    "addressCountry": "国家"
  },
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+86-123-4567-8900",
    "contactType": "Customer Service"
  }
}
```

---

### 2. Product Schema (电商)

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "产品名称",
  "description": "产品描述",
  "image": [
    "https://domain.com/product1.jpg",
    "https://domain.com/product2.jpg"
  ],
  "brand": {
    "@type": "Brand",
    "name": "品牌名"
  },
  "offers": {
    "@type": "Offer",
    "price": "99.00",
    "priceCurrency": "CNY",
    "availability": "https://schema.org/InStock",
    "seller": {
      "@type": "Organization",
      "name": "卖家名"
    }
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "128"
  }
}
```

---

### 3. Article Schema (博客/新闻)

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "文章标题",
  "description": "文章摘要",
  "image": "https://domain.com/featured-image.jpg",
  "author": {
    "@type": "Person",
    "name": "作者名",
    "url": "https://domain.com/author-page"
  },
  "publisher": {
    "@type": "Organization",
    "name": "发布机构",
    "logo": {
      "@type": "ImageObject",
      "url": "https://domain.com/logo.png"
    }
  },
  "datePublished": "2026-03-12",
  "dateModified": "2026-03-12"
}
```

---

### 4. FAQ Schema (问答)

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "问题 1?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "答案 1。"
      }
    },
    {
      "@type": "Question",
      "name": "问题 2?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "答案 2。"
      }
    }
  ]
}
```

---

### 5. LocalBusiness Schema (本地商家)

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "商家名称",
  "image": "https://domain.com/business.jpg",
  "telephone": "+86-123-4567-8900",
  "url": "https://domain.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "街道地址",
    "addressLocality": "城市",
    "addressRegion": "省份",
    "postalCode": "邮编",
    "addressCountry": "国家"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "39.9042",
    "longitude": "116.4074"
  },
  "openingHoursSpecification": [
    {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      "opens": "09:00",
      "closes": "18:00"
    }
  ]
}
```

---

### 6. BreadcrumbList Schema (面包屑)

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "首页",
      "item": "https://domain.com"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "分类",
      "item": "https://domain.com/category"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "当前页面",
      "item": "https://domain.com/category/page"
    }
  ]
}
```

---

## Implementation Methods

### Method 1: JSON-LD (推荐)

Google 首选格式。添加到 `<head>` 或 `<body>`。

```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "标题"
}
</script>
```

### Method 2: Microdata

直接嵌入 HTML 元素。

```html
<div itemscope itemtype="https://schema.org/Product">
  <span itemprop="name">产品名</span>
  <span itemprop="price">99.00</span>
</div>
```

### Method 3: RDFa

类似 Microdata，较少使用。

---

## Testing & Validation

### Google Tools

| 工具 | URL | 用途 |
|------|-----|------|
| Rich Results Test | search.google.com/test/rich-results | 测试丰富结果资格 |
| Schema Markup Validator | validator.schema.org/ | 验证语法正确性 |

### Testing Workflow

```
1. 添加 schema markup
2. 运行 Rich Results Test
3. 修复错误/警告
4. 重新测试
5. 提交 Search Console
```

---

## Best Practices

### Do's ✅

```
✅ 使用 JSON-LD 格式
✅ 只描述真实内容
✅ 保持更新
✅ 使用完整属性
✅ 测试后再发布
```

### Don'ts ❌

```
❌ 标记不可见内容
❌ 虚假/误导信息
❌ 过度标记
❌ 忽略错误警告
❌ 忘记移动端
```

---

## Common Issues

### Issue 1: Missing Required Fields

**错误**: `Missing field "price"`

**修复**: 添加必需字段
```json
"offers": {
  "price": "99.00",
  "priceCurrency": "CNY"
}
```

### Issue 2: Invalid URL Format

**错误**: `Invalid URL format`

**修复**: 使用完整 URL
```json
"url": "https://domain.com/page"  // ✅
"url": "/page"                     // ❌
```

### Issue 3: Type Mismatch

**错误**: `Expected type Text, got Number`

**修复**: 检查字段类型
```json
"price": "99.00"  // 字符串，不是数字
```

---

## CMS Plugins

| CMS | 推荐插件 |
|-----|---------|
| WordPress | Yoast SEO, RankMath, AIOSEO |
| Shopify | 内置 schema + JSON-LD for SEO |
| Webflow | 内置 schema 支持 |
| Custom | 手动添加 JSON-LD |

---

## Quick Reference

### Required vs Optional

| Schema 类型 | 必需字段 | 推荐字段 |
|------------|---------|---------|
| **Article** | headline, image | author, datePublished, publisher |
| **Product** | name, image | offers, brand, aggregateRating |
| **FAQ** | mainEntity (with Q&A) | - |
| **Organization** | name, url | logo, address, contactPoint |
| **LocalBusiness** | name, address | telephone, geo, openingHours |

---

## ROI of Schema

| 指标 | 提升 |
|------|------|
| CTR | 20-30% |
| 可见性 | 显著提升 |
| 语音搜索 | 更友好 |
| 知识图谱 | 有机会展示 |
