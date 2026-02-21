# 文档格式规范

## 头部格式

### 核心文件 (rules/)

```markdown
# FILENAME.md - 中文标题

简短描述（一句话，可选）

---
```

示例：
```markdown
# IDENTITY.md - 我是谁

我是个AI Agent，但我不是个工具。

---
```

### 参考文档 (workspace/reference/)

```markdown
# filename.md - 中文标题

*简短描述或引言*

---

## 章节1
```

示例：
```markdown
# capability-assessment.md - 能力评估标准

*我能判断自己做得好不好，才能持续进化。*

---
```

## 命名规范

### 文件命名

| 类型 | 格式 | 示例 |
|------|------|------|
| 核心配置 | `数字缩写-名称.md` | 01-IDENTITY.md |
| 功能文件 | `kebab-case.md` | heartbeat.md |
| 参考文档 | `kebab-case.md` | capability-assessment.md |
| 日志文件 | `kebab-case.md` | search-log.md |

### 禁止的命名方式

- ❌ 大写字母：CAPABILITY-ASSESSMENT.md
- ❌ 下划线：capability_assessment.md
- ❌ 空格：capability assessment.md
- ❌ P1/P2前缀：P1-评估.md

## 目录结构规范

### Markdown标题层级

```
# 一级标题（文件名）
## 二级标题（主要章节）
### 三级标题（子章节）
#### 四级标题（细节内容）
```

### 列表格式

- 无序列表：使用 `-`
- 有序列表：使用 `1.` `2.` `3.`
- 嵌套列表：使用2空格缩进

### 表格格式

```markdown
| 列1 | 列2 | 列3 |
|-----|-----|-----|
| 内容 | 内容 | 内容 |
```

### 代码块格式

````markdown
```bash
# 代码内容
```
````

## 元数据规范

### 创建/更新时间

文档底部添加：
```markdown
---

*最后更新：YYYY-MM-DD*
```

### 作者/来源

如有需要：
```markdown
---

*作者：Mino*
*来源：从某处学习*
```

## 特殊格式

### WAL协议触发标记

```markdown
**[YYYY-MM-DD] 📋 决策：xxx**
- 内容说明
```

### 优先级标记

- 🔴 P0：最高优先级
- 🟠 P1：高优先级
- 🟡 P2：中优先级
- 🟢 P3：低优先级

### 状态标记

- ✅ 已完成
- 🔄 进行中
- ❌ 取消/失败
- ⚠️ 警告

---

*最后更新：2026-02-21*
