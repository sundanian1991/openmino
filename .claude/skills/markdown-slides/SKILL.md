---
name: markdown-slides
description: Create presentation slides in Markdown format (Deckset/Marp compatible). Use when user requests to create slides, presentations, or convert documents to slide format.
allowed-tools: [Read, Write, Glob, Bash]
license: MIT
---

# Markdown Slides Skill

Convert content to presentation slides in Markdown format compatible with Deckset and Marp.

## When to Activate

- 创建幻灯片/演示文稿
- 转换文档为幻灯片格式
- 提及 Deckset 或 Marp
- 需要生成演讲者注释 (speaker notes)
- 需要格式化图片

## Input Requirements

- **源内容**: Markdown 文件、大纲或结构化内容
- **图片**: `_files_/` 目录中的文件或可解析路径
- **目标平台**: Deckset(默认) 或 Marp
- **选项**: 演讲者注释 (默认启用)、幻灯片编号、emoji 增强

## Output Specifications

- **文件位置**: 与源文件同文件夹
- **命名**: 原名 + `- slides` 后缀 (例：`document.md` → `document - slides.md`)
- **格式**: Deckset-compatible markdown
- **结构**: 正确的幻灯片分隔符、图片标签、演讲者注释

## Core Process

### Step 1: Slide Structure Setup

**目标**: 创建逻辑清晰的幻灯片结构

**动作**:
1. 读取并分析源内容结构
2. 在逻辑断点插入幻灯片分隔符 (`---`)
3. 维持内容层级：H1(章节标题) → H2(幻灯片标题) → H3(子主题)
4. 保留原始组织和流程
5. 可选 frontmatter: `slidenumbers: true`

**示例**:
```markdown
slidenumbers: true
# 1. Section Title 🎯

![](section-background.png)

^ 章节介绍。

---

## Main Topic 📊

Content here...
```

### Step 2: Image Format Conversion

**目标**: 转换为 Deckset 格式，正确定位图片

**Critical Rules**:
- ⚠️ 必须逐个解析相对路径
- ⚠️ URL 编码空格和特殊字符
- ⚠️ 验证图片文件存在

**Image Position Formats**:

| 格式 | 用途 | 示例 |
|------|------|------|
| `![]()` | 章节 intro 背景 | `![](background.png)` |
| `![inline]()` | 文本流内图表 | `![inline](diagram.svg)` |
| `![right fit]()` | **主要**: 内容幻灯片 | `![right fit](chart.png)` |
| `![right 80%]()` | 特定尺寸 | `![right 80%](image.png)` |
| `![inline fill]()` | 全宽 inline | `![inline fill](wide.png)` |

**动作**:
1. 识别所有图片引用
2. 对每张图片：
   - 确定 appropriate 格式
   - 从幻灯片文件位置解析相对路径
   - URL 编码：` ` → `%20`
   - 转义括号：`(` → `%28`, `)` → `%29`
   - 验证文件存在
3. 基于上下文应用定位：
   - 章节 intro: `![]()` 全背景
   - 文本流图表：`![inline]()`
   - 默认内容幻灯片：`![right fit]()` ⭐
   - 全宽 inline: `![inline fill]()`

### Step 3: Speaker Notes Conversion

**目标**: 转换适当内容为演讲者注释

**格式**: 行首 `^ ` (caret + space)

**位置**: 每张幻灯片末尾

**转换为注释** ✅:
- 多句段落
- 解释性文本
- 额外上下文
- 演讲要点

**不转换** ❌:
- 单句段落
- 列表 (bullet/numbered)
- 引用块
- 冒号结尾的句子
- 标题 (H1/H2/H3)
- 表格内容

**Marp 平台**: 使用 HTML 注释
```markdown
<!-- This is a speaker note for Marp -->
```

### Step 4: Content Enhancement

**目标**: 优化演示文稿呈现效果

**动作**:
1. **添加 emoji** 到标题：
   - 使用相关、专业的 emoji
   - 示例：🎯📊🤖💡🚀📚
2. **清理注释**:
   - 移除 markdown 注释
   - 移除 TODO 项
3. **确保格式清晰**:
   - 一致间距
   - 正确的 header 层级
   - 清晰的幻灯片断点
4. **添加 frontmatter** (如请求): `slidenumbers: true`
5. **最终检查**: 每页焦点清晰、图片定位正确、注释就位

## Platform Differences

### Deckset (Default)

- **演讲者注释**: `^ ` prefix
- **图片定位**: 全格式支持
- **Frontmatter**: 简单 key-value
- **特性**: 自动编号、丰富的 presenter notes

### Marp (Optional)

- **演讲者注释**: HTML 注释 `<!-- note -->`
- **Frontmatter**: YAML with `marp: true`
- **图片背景**: `![bg]()` 替代 `![]()`

**详细对比**: 见 [references/platform-differences.md](references/platform-differences.md)

## Quality Checklist

- [ ] **无虚构图片** - 所有引用指向真实文件
- [ ] 所有图片路径 URL 编码正确
- [ ] 图片文件存在 (运行 `ls` 验证)
- [ ] 空格转义为 `%20`
- [ ] 特殊字符正确转义
- [ ] 演讲者注释使用 `^ ` (Deckset) 或 HTML 注释 (Marp)
- [ ] 注释位于幻灯片末尾
- [ ] 分隔符 `---` 在逻辑断点
- [ ] Header 层级一致 (H1→H2→H3)
- [ ] Emoji 适当添加到标题
- [ ] 文件名含 `- slides` 后缀
- [ ] 内部注释已移除

## Error Handling

### Missing Images
1. 检查源 `_files_/` 目录
2. 检查父目录 `_files_/`
3. 项目内搜索图片
4. 找到则复制到 `_files_/`
5. 未找到则在注释中标注并跳过

### Broken Relative Paths
1. 确定幻灯片文件位置
2. 计算从幻灯片到图片的相对路径
3. 测试路径解析
4. URL 编码可用路径

### Invalid Characters
- 空格 → `%20`
- 括号 → `(`: `%28`, `)`: `%29`
- 方括号 → `[`: `%5B`, `]`: `%5D`

## Tips

1. 从大纲开始：先创建清晰的章节和幻灯片结构
2. 一页一观点：每页单一清晰信息
3. 视觉层级：H1=章节，H2=幻灯片，H3=子主题
4. 图片定位：默认 `![right fit]()`
5. 演讲者注释：添加帮助演讲者但 clutter 页面的内容
6. 测试：在 Deckset 中预览验证格式

## References

- [图片处理指南](references/image-handling.md) - 路径解析、URL 编码、验证流程
- [演讲者注释指南](references/speaker-notes-guide.md) - 何时转换、最佳实践
- [平台差异](references/platform-differences.md) - Deckset vs Marp 完整对比
