---
input: 图片处理需求
output: image-handling.md
pos: .claude/skills/markdown-slides/references/image-handling.md
---

# Image Handling Guide

Markdown Slides 技能的图片处理详细指南。

## Core Principles

1. **NEVER invent images** - 只引用源文档或 `_files_/` 文件夹中实际存在的图片
2. **Use original images** - 优先使用源文档中的原始图片
3. **Copy missing images** - 缺失的图片复制到 `_files_/` 目录而非替换
4. **Resolve paths per-image** - 逐个解析相对路径，不假设同目录
5. **Verify existence** - 引用前运行 `ls` 或 glob 确认文件存在

---

## Path Resolution

### Step-by-Step Resolution

```
1. 确定幻灯片文件位置
   ↓
2. 识别图片原始引用
   ↓
3. 计算从幻灯片到图片的相对路径
   ↓
4. URL 编码路径
   ↓
5. 验证文件存在 (ls/glob)
   ↓
6. 更新引用
```

### Example

```
源文件位置：docs/supplier-management/overview.md
幻灯片位置：docs/supplier-management/overview - slides.md
图片引用：../_files_/process-diagram.png

解析后路径：_files_/process-diagram.png
验证：ls docs/supplier-management/_files_/process-diagram.png
编码：_files_/process-diagram.png (无空格，无需编码)
```

---

## URL Encoding

### Required Conversions

| 字符 | 编码 | 示例 |
|------|------|------|
| 空格 | `%20` | `my file.png` → `my%20file.png` |
| 左括号 | `%28` | `test(1).png` → `test%281%29.png` |
| 右括号 | `%29` | `test(1).png` → `test%281%29.png` |
| 左方括号 | `%5B` | `data[2026].png` → `data%5B2026%5D.png` |
| 右方括号 | `%5D` | `data[2026].png` → `data%5B2026%5D.png` |
| 井号 | `%23` | `chart#1.png` → `chart%231.png` |
| 百分号 | `%25` | `100%.png` → `100%25.png` |

### Bash Verification

```bash
# 验证文件存在
ls "path/to/image with spaces.png"

# 查找图片
find . -name "*.png" | grep -i "keyword"

# Glob 搜索 (推荐)
claude-glob "**/*.png"
```

---

## Image Position Formats

### Format Decision Tree

```
Is it a section intro slide?
  ├─ YES → Does background image exist?
  │         ├─ YES → Use ![]() for full background
  │         └─ NO → Skip image, use title + speaker notes only
  │
  └─ NO ↓

Is it a diagram embedded in flowing text?
  ├─ YES → Use ![inline]() or ![inline fill]()
  │
  └─ NO ↓

Is it the main visual for content slide with bullets?
  ├─ YES → Use ![right fit]() ⭐ PRIMARY FORMAT
  │
  └─ NO ↓

Does it need specific sizing?
  └─ YES → Use ![right 80%]() or other percentage
```

### Format Reference Table

| 格式 | 用途 | 适用场景 | 示例 |
|------|------|---------|------|
| `![]()` | 章节 intro 背景 | 全页背景图 | `![](background.png)` |
| `![inline]()` | 文本流内图表 | 图表嵌入文字中 | `![inline](flow.svg)` |
| `![inline fill]()` | 全宽 inline | 跨页宽图 | `![inline fill](wide.png)` |
| `![right fit]()` | **默认**内容幻灯片 | 右图左文 | `![right fit](chart.png)` |
| `![right 80%]()` | 特定尺寸 | 需要调整大小 | `![right 80%](image.png)` |
| `![left]()` | 左图右文 | 特殊布局 | `![left](image.png)` |

---

## Error Handling

### Missing Images Workflow

```
遇到缺失图片
    ↓
1. 检查源 _files_/ 目录
    ↓
2. 检查父目录 _files_/
    ↓
3. 项目内搜索 (glob/find)
    ↓
4. 找到 → 复制到幻灯片 _files_/
    ↓
5. 未找到 → 在 speaker notes 标注并跳过
```

### Broken Path Diagnosis

```bash
# Step 1: 确认幻灯片位置
pwd

# Step 2: 列出可用图片
ls -la _files_/

# Step 3: 测试路径
test -f "resolved/path.png" && echo "Exists" || echo "Not found"

# Step 4: 查找替代
find . -name "*diagram*" -type f
```

---

## Best Practices

1. **Start with outline** - 先创建章节和幻灯片结构，再处理图片
2. **Default to `![right fit]()`** - 内容幻灯片默认右图左文
3. **Verify before commit** - 提交前验证所有图片存在
4. **Copy to _files_/** - 缺失图片统一复制到 `_files_/`
5. **Document missing** - 无法找到的图片在 notes 中标注

---

## Common Issues

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 图片不显示 | 路径未 URL 编码 | 空格→`%20`，括号→`%28/%29` |
| 路径错误 | 相对路径计算错误 | 从幻灯片文件位置重新计算 |
| 文件不存在 | 引用已删除/移动 | 搜索或复制到 `_files_/` |
| 特殊字符 | `#`、`%` 等未转义 | 使用 URL 编码 |

---

## Quick Checklist

- [ ] 所有图片文件实际存在
- [ ] 路径已 URL 编码 (空格→`%20`)
- [ ] 特殊字符已转义
- [ ] 格式选择正确 (`![right fit]()` 等)
- [ ] 语义相关 (图片匹配内容)
- [ ] 无虚构图片引用
