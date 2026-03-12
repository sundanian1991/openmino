---
name: seo-audit
description: SEO 诊断与优化建议。当用户需要审计网站 SEO、分析排名问题、检查技术 SEO 时使用。
metadata:
  version: 1.0.0
---

# SEO Audit

专业的搜索引擎优化审计技能。

## 触发条件

- "SEO 诊断"、"SEO 审计"、"SEO 检查"
- "为什么不排名"、"SEO 问题"
- "技术 SEO"、"页面 SEO"
- "meta 标签检查"、"SEO 健康检查"

## Initial Assessment

**审计前了解**:

1. **站点背景**
   - 站点类型 (SaaS/电商/博客)
   - 主要业务目标
   - 优先关键词/主题

2. **当前状态**
   - 已知问题
   - 当前自然流量
   - 近期变更/迁移

3. **范围**
   - 全站 or 特定页面
   - 技术 + 页面 or 单一领域
   - Search Console/分析工具访问

---

## Audit Framework

### ⚠️ Schema Markup 检测限制

**重要**: `web_fetch` 和 `curl` **无法可靠检测结构化数据**。

许多 CMS 插件 (AIOSEO, Yoast, RankMath) 通过客户端 JS 注入 JSON-LD — 它不会出现在静态 HTML 或 `web_fetch` 输出中。

**准确检测 schema 的方法**:
1. **浏览器工具** — 渲染页面并运行：`document.querySelectorAll('script[type="application/ld+json"]')`
2. **Google Rich Results Test** — https://search.google.com/test/rich-results
3. **Screaming Frog 导出** — 如有客户提供 (SF 渲染 JS)

**切勿仅基于 `web_fetch` 报告"无 schema"** — 这会导致误判。

---

## Priority Order

1. **可抓取性和索引** (能否被抓取/索引)
2. **技术基础** (速度/功能)
3. **页面优化** (内容优化)
4. **内容质量** (是否值得排名)
5. **权威和链接** (可信度)

---

## Technical SEO Checklist

### Crawlability

- [ ] **Robots.txt**: 无意外屏蔽，重要页面允许
- [ ] **XML Sitemap**: 存在、提交 Search Console、仅含规范 URL
- [ ] **站点架构**: 重要页面距首页≤3 次点击
- [ ] **抓取预算**: 无参数化 URL 泛滥、分面导航妥善处理

### Indexation

- [ ] **索引状态**: `site:domain.com` 检查
- [ ] **问题检查**: 无错误 noindex、规范标签正确、无重定向链
- [ ] **Canonical**: 所有页面有规范标签、HTTP→HTTPS、www 一致

### Core Web Vitals

| 指标 | 目标 | 工具 |
|------|------|------|
| LCP | < 2.5s | PageSpeed Insights |
| INP | < 200ms | Chrome DevTools |
| CLS | < 0.1 | Search Console |

### Mobile & HTTPS

- [ ] 响应式设计、tap target 大小适当
- [ ] 全站 HTTPS、SSL 有效、无 mixed content

### URL Structure

- [ ] 可读、描述性、关键词自然
- [ ] 小写、连字符分隔、无多余参数

---

## On-Page SEO Checklist

### Title Tags

- [ ] 每页唯一、主关键词靠前
- [ ] 50-60 字符、有吸引力
- [ ] 品牌名置后

### Meta Descriptions

- [ ] 每页唯一、150-160 字符
- [ ] 含主关键词、价值主张清晰
- [ ] 有 CTA

### Heading Structure

- [ ] 每页一个 H1、含主关键词
- [ ] 层级清晰 (H1→H2→H3)
- [ ] 标题描述内容，非仅样式

### Content

- [ ] 首段含关键词
- [ ] 相关关键词自然使用
- [ ] 深度足够、满足搜索意图
- [ ] 优于竞争对手

### Images

- [ ] 描述性文件名
- [ ] 所有图片有 alt 文本
- [ ] 压缩、WebP 格式
- [ ] Lazy loading

### Internal Linking

- [ ] 重要页面链接充分
- [ ] 描述性锚文本
- [ ] 无孤立页面
- [ ] 无死链

---

## Content Quality: E-E-A-T

| 维度 | 检查项 |
|------|--------|
| **Experience** | 第一手经验、原创洞察、真实案例 |
| **Expertise** | 作者资质、信息准确、引用规范 |
| **Authoritativeness** | 行业认可、被引用、资质证书 |
| **Trustworthiness** | 信息准确、业务透明、联系方式、隐私政策 |

---

## Common Issues by Site Type

| 站点类型 | 常见问题 |
|---------|---------|
| **SaaS/产品** | 产品页内容单薄的、缺少对比页、博客未整合 |
| **电商** | 分类页内容单薄、重复产品描述、分面导航重复 |
| **博客** | 内容未更新、关键词内耗、无主题聚类 |
| **本地商业** | NAP 不一致、缺少本地 schema、无 Google Business Profile |

---

## Output Format

### Audit Report Structure

**Executive Summary**
- 整体健康评估
- 前 3-5 优先问题
- 快速致胜机会

**Technical Findings** (每条)
- **问题**: 什么错了
- **影响**: 高/中/低
- **证据**: 如何发现
- **修复**: 具体建议
- **优先级**: 1-5

**On-Page Findings** (同上格式)

**Content Findings** (同上格式)

**Prioritized Action Plan**
1. 关键修复 (阻碍索引/排名)
2. 高影响改进
3. 快速致胜
4. 长期建议

---

## Tools

**免费工具**:
- Google Search Console (必备)
- PageSpeed Insights
- Rich Results Test (检测 schema)
- Mobile-Friendly Test

**付费工具** (如有):
- Screaming Frog
- Ahrefs/Semrush
- Sitebulb

---

## References

- [AI Writing Detection](references/ai-writing-detection.md) — AI 写作模式检测
- [AEO & GEO Patterns](references/aeo-geo-patterns.md) — 答案引擎/AI 引用优化
- [Technical SEO Deep Dive](references/technical-checklist.md) — 技术 SEO 详细清单
- [On-Page Optimization](references/on-page-guide.md) — 页面优化详细指南
- [Schema Implementation](references/schema-guide.md) — 结构化数据实现指南

---

## Related Skills

- **programmatic-seo** — 批量构建 SEO 页面
- **schema-markup** — 实现结构化数据
- **page-cro** — 转化率优化
- **analytics-tracking** — SEO 性能追踪
