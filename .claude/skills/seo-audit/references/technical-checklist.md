---
input: SEO 审计需求
output: technical-checklist.md
pos: .claude/skills/seo-audit/references/technical-checklist.md
---

# Technical SEO Deep Dive

技术 SEO 详细检查清单 — 确保网站可被抓取、索引和排名。

---

## Crawlability (可抓取性)

### Robots.txt

**检查项目**:
```
1. 文件存在：domain.com/robots.txt
2. 无意外屏蔽重要页面
3. Sitemap 引用正确
4. User-agent 覆盖全面
```

**常见问题**:
```
❌ Disallow: /* 屏蔽全站
❌ Disallow: /blog/ 屏蔽内容
❌ 缺少 Sitemap 引用
```

**修复示例**:
```robots.txt
User-agent: *
Allow: /
Allow: /blog/
Disallow: /admin/
Disallow: /private/

Sitemap: https://domain.com/sitemap.xml
```

---

### XML Sitemap

**检查清单**:
- [ ] 存在并可访问
- [ ] 提交到 Search Console
- [ ] 仅含规范 URL
- [ ] 定期更新
- [ ] 格式正确

**问题排查**:
```
1. 检查返回状态码 (应为 200)
2. 验证 XML 格式
3. 确认 URL 数量合理
4. 检查最后修改时间
```

**工具验证**:
```bash
# 检查 sitemap
curl -I https://domain.com/sitemap.xml

# 验证格式
xmllint --noout sitemap.xml
```

---

### Site Architecture

**最佳实践**:
```
✅ 重要页面 ≤3 次点击从首页
✅ 逻辑层级清晰
✅ 内部链接充分
✅ 无孤立页面
```

**检查方法**:
```
1. 绘制站点地图
2. 计算点击深度
3. 识别孤立页面
4. 分析内链分布
```

---

## Indexation (索引)

### Index Status Check

**检查方法**:
```
1. site:domain.com 搜索
2. Search Console Coverage Report
3. 对比预期索引量
```

**问题诊断**:
```
索引过少 → 检查抓取障碍
索引过多 → 检查重复内容
波动大 → 检查技术问题
```

---

### Noindex Issues

**常见错误位置**:
```
❌ 开发环境标签遗留
❌ 错误配置 SEO 插件
❌ 动态标签误用
```

**检查代码**:
```html
<!-- 错误示例 -->
<meta name="robots" content="noindex">

<!-- 正确 (或移除标签) -->
<meta name="robots" content="index, follow">
```

---

### Canonical Issues

**检查项目**:
```
1. 所有页面有 canonical 标签
2. 自引用规范 (唯一页面)
3. HTTP→HTTPS 规范
4. www/non-www 一致
5. 无循环指向
```

**示例**:
```html
<!-- 自引用规范 -->
<link rel="canonical" href="https://domain.com/page">

<!-- 跨域规范 -->
<link rel="canonical" href="https://main-domain.com/page">
```

---

### Redirect Issues

**问题类型**:
```
❌ 重定向链：A→B→C→D
❌ 重定向循环：A→B→A
❌ 302 误用 (应 301)
❌ 软 404 (返回 200 的错误页)
```

**修复方法**:
```
1. 识别所有重定向
2. 简化链条为单跳
3. 301 用于永久移动
4. 修复软 404 为真 404
```

---

## Core Web Vitals

### LCP (Largest Contentful Paint)

**目标**: < 2.5s

**影响因素**:
```
- 服务器响应时间
- 资源加载顺序
- 图片/字体大小
- 客户端渲染
```

**优化方法**:
```
1. 升级服务器/CDN
2. 预加载关键资源
3. 压缩/优化图片
4. 延迟非关键 JS
```

---

### INP (Interaction to Next Paint)

**目标**: < 200ms

**影响因素**:
```
- 主线程阻塞
- 事件监听器过多
- 复杂 DOM
- 长任务执行
```

**优化方法**:
```
1. 拆分长任务
2. 使用 Web Workers
3. 减少 JS 执行
4. 优化事件委托
```

---

### CLS (Cumulative Layout Shift)

**目标**: < 0.1

**常见原因**:
```
- 图片无尺寸属性
- 动态内容插入
- 字体加载闪烁
- 广告/嵌入内容
```

**修复方法**:
```
1. 指定图片宽高
2. 预留广告位
3. 使用 font-display: optional
4. 避免顶部内容动态插入
```

---

## Mobile-First

### Responsive Design

**检查清单**:
- [ ] 视口配置正确
- [ ] 无水平滚动
- [ ] Tap target≥44px
- [ ] 字体大小≥16px
- [ ] 内容无遮挡

**Viewport 配置**:
```html
<meta name="viewport" content="width=device-width, initial-scale=1">
```

---

## HTTPS & Security

### HTTPS Migration

**检查项目**:
```
- [ ] 全站 HTTPS
- [ ] SSL 证书有效
- [ ] 无 mixed content
- [ ] HTTP→HTTPS 重定向
- [ ] HSTS 头部
```

**Mixed Content 修复**:
```html
<!-- 错误 -->
<img src="http://example.com/image.jpg">

<!-- 正确 -->
<img src="https://example.com/image.jpg">
```

---

## URL Structure

### Best Practices

**好的 URL**:
```
✅ domain.com/category/product
✅ domain.com/blog/seo-guide
✅ 小写、连字符
```

**避免的 URL**:
```
❌ domain.com/?id=123&cat=456
❌ domain.com/SEO_Guide/
❌ domain.com/页面/？参数=值
```

---

## Technical Audit Tools

### Free Tools
| 工具 | 用途 | URL |
|------|------|-----|
| Search Console | 索引状态 | search.google.com |
| PageSpeed Insights | 性能分析 | pagespeed.web.dev |
| Rich Results Test | Schema 检测 | search.google.com/test/rich-results |
| Mobile-Friendly Test | 移动友好 | search.google.com/test/mobile-friendly |

### Paid Tools
| 工具 | 特点 | 价格 |
|------|------|------|
| Screaming Frog | 全站爬取 | $259/年 |
| Ahrefs | 外链分析 | $99/月起 |
| Sitebulb | 可视化报告 | $21/月 |

---

## Quick Checklist

- [ ] Robots.txt 配置正确
- [ ] Sitemap 提交且有效
- [ ] 站点架构清晰
- [ ] 索引状态正常
- [ ] 无 noindex 错误
- [ ] Canonical 正确
- [ ] 无重定向问题
- [ ] Core Web Vitals 达标
- [ ] 移动友好
- [ ] 全站 HTTPS
- [ ] URL 结构清晰
