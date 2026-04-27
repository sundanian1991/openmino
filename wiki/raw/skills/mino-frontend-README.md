# Anthropic Icons — 技术文档图标库

> 100 个技术文档场景图标，Lucene 风格 + 手绘风格
>
> 用于 mino-frontend 技能的「Anthropic 技术文档风格」设计模式

---

## 图标分类

### Lucene 风格（50 个）— 核心 UI 图标

| 类别 | 数量 | 用途 |
|------|------|------|
| 文件类型 | 15 | .md、.py、.js、.json、.yaml、.txt、.html、.css、.ts、.tsx、.sh、.env、.lock、.toml、.xml |
| 操作图标 | 15 | 运行、调试、测试、部署、构建、复制、粘贴、保存、下载、上传、刷新、搜索、设置、帮助、关闭 |
| 导航图标 | 8 | 箭头（4 方向）、菜单、home、链接、外部链接 |
| 状态图标 | 7 | 成功、错误、警告、信息、加载、未完成、进行中 |
| 代码元素 | 5 | 函数、类、变量、常量、接口 |

### 手绘风格（50 个）— 装饰元素

| 类别 | 数量 | 用途 |
|------|------|------|
| 章节分隔 | 10 | 波浪线、虚线、点线、双线、三线、斜线、曲线、圆点、方块、星形 |
| 装饰插图 | 15 | 代码、文档、设置、搜索、通知、用户、团队、安全、备份、同步、分享、收藏、历史、日历、时钟 |
| 概念图标 | 15 | API、SDK、CLI、集成、部署、测试、调试、监控、日志、配置、数据库、服务器、云端、网络、性能 |
| 空状态插画 | 10 | 无数据、无文件、无网络、错误、加载中、完成、搜索空、收藏空、历史空、通知空 |

---

## 色彩系统

### 功能色（文件类型）

| 文件类型 | 颜色 | 用途 |
|---------|------|------|
| Markdown | `#4CAF50`（绿） | .md 文档 |
| Python | `#2196F3`（蓝） | .py 脚本 |
| JavaScript | `#FFC107`（黄） | .js 代码 |
| JSON | `#9C27B0`（紫） | .json 配置 |
| YAML | `#FF5722`（橙红） | .yaml 配置 |
| HTML | `#E44D26`（红橙） | .html 页面 |
| CSS | `#264DE4`（深蓝） | .css 样式 |
| Config | `#9E9E9E`（灰） | .env、.lock 等 |

### 强调色

| 用途 | 颜色 |
|------|------|
| 箭头、导航 | `#FF6B35`（橙色） |
| 运行、操作 | `#FF6B35`（橙色） |
| 成功状态 | `#4CAF50`（绿色） |
| 错误状态 | `#F44336`（红色） |
| 警告状态 | `#FF9800`（橙黄） |

---

## 使用方式

### 方式 1：直接嵌入 SVG

```html
<!-- Lucene 风格 -->
<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
  <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z" stroke="#4CAF50" stroke-width="2"/>
  <path d="M14 2v6h6" stroke="#4CAF50" stroke-width="2"/>
</svg>

<!-- 手绘风格 -->
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 20" style="width:200px;height:20px">
  <path d="M0 10 Q25 5, 50 10 T100 10" fill="none" stroke="#E2725B" stroke-width="2.5" stroke-linecap="round"/>
</svg>
```

### 方式 2：读取文件

```html
<img src="assets/anthropic-icons/lucide/file-md.svg" alt="Markdown">
<object data="assets/anthropic-icons/hand-drawn/wave.svg" type="image/svg+xml"></object>
```

### 方式 3：CSS 内联（推荐）

```html
<style>
  .icon-md {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'%3E%3Cpath d='M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z' stroke='%234CAF50' stroke-width='2'/%3E%3C/svg%3E");
    width: 24px;
    height: 24px;
  }
</style>
```

---

## 图标规范

### Lucene 风格

| 属性 | 规格 |
|------|------|
| 尺寸 | 24×24 px |
| 线条粗细 | 2px |
| 端点/转角 | `round` |
| 颜色 | 功能色（见上表） |

### 手绘风格

| 属性 | 规格 |
|------|------|
| 尺寸 | 可变（自定义 viewBox） |
| 线条粗细 | 2.5px |
| 端点/转角 | `round` |
| 颜色 | `#E2725B`（陶土色） |

---

## 文件结构

```
assets/anthropic-icons/
├── lucide/          # 50 个 Lucene 风格图标
│   ├── file-md.svg
│   ├── file-py.svg
│   ├── play.svg
│   └── ...
├── hand-drawn/      # 50 个手绘风格图标
│   ├── wave.svg
│   ├── cli.svg
│   ├── empty-loading.svg
│   └── ...
├── preview.html     # 预览页面
└── README.md        # 本文档
```

---

## 开源参考

本图标库灵感来源于以下开源项目：

| 图标库 | 风格 | 用途 |
|--------|------|------|
| **Lucide Icons** | 简洁几何，24px | 核心 UI 图标 |
| **Feather Icons** | 轻量线条，24px | 备选图标库 |
| **Phosphor Icons** | 多种粗细，可选 | 需要更多变体时 |

---

*版本：v1.0*
*创建：2026-03-26*
*所属技能：mino-frontend v1.5*
