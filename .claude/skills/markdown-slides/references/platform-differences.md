---
input: 平台对比需求
output: platform-differences.md
pos: .claude/skills/markdown-slides/references/platform-differences.md
---

# Platform Differences: Deckset vs Marp

Markdown Slides 两大主流平台完整对比指南。

## Quick Comparison Table

| 特性 | Deckset (推荐) | Marp |
|------|---------------|------|
| **演讲者注释** | `^ ` prefix | `<!-- -->` HTML 注释 |
| **图片背景** | `![]()` | `![bg]()` |
| **图片定位** | `![right fit]()` 等丰富格式 | `![bg right:50%]()` 等 |
| **Frontmatter** | 简单 key-value | YAML with `marp: true` |
| **分页控制** | `slidenumbers: true` | `paginate: true` |
| **主题系统** | `theme: Plain Jane, 3` | `theme: default` |
| **代码高亮** | 自动 | 需指定 `code` 语言 |
| **数学公式** | 支持 | 支持 (KaTeX) |
| **输出格式** | PDF, Keynote, PPTX | PDF, HTML, PPTX |
| **价格** | $19.99 (一次性) | 免费 (VS Code 扩展) |

---

## Deckset (Default)

### Frontmatter

```markdown
slidenumbers: true
autoscale: true
theme: Plain Jane, 3
```

### Speaker Notes

```markdown
^ 这是演讲者注释。每行以 ^ + 空格 开头。

^ 第二段注释。多段注释自动分隔。
```

### Image Positioning

```markdown
![](background.png)          <!-- 全背景 -->
![right fit](image.png)      <!-- 右图左文，自动适配 -->
![right 70%](image.png)      <!-- 右图，70% 宽度 -->
![left](image.png)           <!-- 左图右文 -->
![inline](diagram.svg)       <!-- inline 嵌入 -->
![inline fill](wide.png)     <!-- 全宽 inline -->
```

### Section Dividers

```markdown
# 1. Section Title 🎯

![](section-background.png)

^ 章节介绍。

---

## Content Slide 📊

内容...
```

### Features

- **自动缩放**：`autoscale: true` 自动调整字体
- **主题丰富**：30+ 内置主题
- **Presenter View**：专业的演讲者视图
- **Live Preview**：实时预览
- **iCloud Sync**：Mac/iPad 同步

---

## Marp (Optional)

### Frontmatter

```markdown
---
marp: true
paginate: true
theme: default
style: |
  section {
    font-size: 28px;
  }
---
```

### Speaker Notes

```markdown
<!-- 这是演讲者注释。Marp 使用 HTML 注释格式。 -->

<!-- 第二段注释。 -->
```

### Image Positioning

```markdown
![bg](background.png)           <!-- 全背景 -->
![bg right:50%](image.png)      <!-- 右图，50% 宽度 -->
![bg left:70%](image.png)       <!-- 左图，70% 宽度 -->
![inline](diagram.svg)          <!-- inline 嵌入 -->
```

### Section Dividers

```markdown
# 1. Section Title 🎯

![bg](section-background.png)

<!-- 章节介绍。 -->

---

## Content Slide 📊

内容...
```

### Features

- **免费开源**：VS Code 扩展完全免费
- **高度可定制**：CSS 完全控制
- **多格式输出**：PDF/HTML/PPTX
- **插件生态**：丰富的社区插件
- **跨平台**：Windows/Mac/Linux

---

## Conversion Guide

### Deckset → Marp

```markdown
<!-- Deckset -->
slidenumbers: true
theme: Plain Jane, 3

^ 注释内容。

![](background.png)
![right fit](image.png)

---

<!-- Marp -->
---
marp: true
paginate: true
theme: default
---

<!-- 注释内容。 -->

![bg](background.png)
![bg right:50%](image.png)
```

### Marp → Deckset

```markdown
<!-- Marp -->
---
marp: true
paginate: true
---

<!-- 注释内容。 -->

![bg](background.png)

---

<!-- Deckset -->
slidenumbers: true

^ 注释内容。

![](background.png)
```

---

## Syntax Comparison

### Headers

```markdown
# 两者相同
## 两者相同
### 两者相同
```

### Lists

```markdown
# 两者相同
- Item 1
- Item 2
  - Nested item
```

### Code Blocks

```markdown
# Deckset (自动检测)
```python
def hello():
    print("Hello")
```

# Marp (需指定语言)
```python
def hello():
    print("Hello")
```
```

### Tables

```markdown
# 两者相同
| Header 1 | Header 2 |
|----------|----------|
| Cell 1   | Cell 2   |
```

### Blockquotes

```markdown
# 两者相同
> This is a quote
```

---

## Theme Comparison

### Deckset Themes

| 主题 | 风格 | 适用场景 |
|------|------|---------|
| Plain Jane | 极简 | 商务汇报 |
| Gaia | 现代 | 技术分享 |
| Pitchfork | 粗犷 | 创意展示 |
| Uncover | 优雅 | 学术演讲 |

### Marp Themes

| 主题 | 风格 | 获取方式 |
|------|------|---------|
| default | 默认 | 内置 |
| gaia | 现代 | 内置 |
| uncover | 优雅 | 内置 |
| custom | 自定义 | CSS 定义 |

---

## When to Use Which

### Choose Deckset When:

- 追求开箱即用的精美设计
- 需要专业的 Presenter View
- 愿意付费获得更好体验
- Mac/iPad 生态用户
- 快速制作高质量幻灯片

### Choose Marp When:

- 预算有限 (免费)
- 需要高度定制化
- 跨平台需求 (Win/Mac/Linux)
- VS Code 重度用户
- 需要 HTML 输出

---

## Common Issues & Solutions

### Issue 1: Images Not Showing

**Deckset**:
```markdown
<!-- Wrong -->
![right](image.png)

<!-- Right -->
![right fit](image.png)
```

**Marp**:
```markdown
<!-- Wrong -->
![right fit](image.png)

<!-- Right -->
![bg right:50%](image.png)
```

### Issue 2: Speaker Notes Not Showing

**Deckset**: Check `^ ` has space after caret
**Marp**: Check `<!-- -->` is valid HTML comment

### Issue 3: Theme Not Applying

**Deckset**: `theme: Plain Jane, 3` (exact name)
**Marp**: `theme: gaia` (built-in names)

---

## Migration Checklist

### Deckset → Marp

- [ ] 添加 YAML frontmatter (`marp: true`)
- [ ] `slidenumbers` → `paginate`
- [ ] `^ ` → `<!-- -->` 注释
- [ ] `![]()` → `![bg]()` 背景
- [ ] `![right fit]()` → `![bg right:50%]()`
- [ ] 验证主题兼容性

### Marp → Deckset

- [ ] 简化 frontmatter 为 key-value
- [ ] `<!-- -->` → `^ ` 注释
- [ ] `![bg]()` → `![]()` 背景
- [ ] `![bg right:50%]()` → `![right fit]()`
- [ ] 验证主题名称

---

## Recommendation

**Default to Deckset** because:
1. More intuitive syntax
2. Better presenter tools
3. Richer image positioning
4. Professional themes out-of-box

**Use Marp when**:
1. Budget constraints
2. Heavy customization needed
3. Cross-platform requirement
4. VS Code workflow

---

## Resources

- [Deckset Documentation](https://support.decksetapp.com/)
- [Marp Documentation](https://marpit.marp.app/)
- [Marp for VS Code](https://marketplace.visualstudio.com/items?itemName=marp-team.marp-vscode)
