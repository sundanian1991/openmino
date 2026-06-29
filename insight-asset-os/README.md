# Insight Asset OS

本地优先的个人思想资产工作台 —— 把零散经验变成可调用的判断力。

## 功能

| 模块 | 路由 | 说明 |
|------|------|------|
| 仪表盘 | `/` | 待办看板 + 资产统计 + 最近待处理 |
| 采集 | `/intake` | 扫描文件夹 → LLM 提取轻量卡 |
| 资产库 | `/assets` | 列表筛选 + 详情 + AI 升级资产卡 |
| 主题分类 | `/topics` | 树形 CRUD，支持父子层级 |
| Insight Kernel | `/kernel` | 四分类管理 + 编译为注入文本 |
| 写作输出 | `/output` | 主题 → 风格 → AI 骨架生成 |
| 设置 | `/settings` | LLM / Vault / Kernel 配置 |

**语义搜索与智能聚类**：设置页可运行「智能聚类」（node-llama-cpp + Qwen3-Embedding-0.6B GGUF，模型随 linkly-ai 预装，无需联网下载），自动为资产生成 embedding → K-means 聚类发现主题分组。资产库搜索支持关键词 / 语义两种模式。

**图片 OCR**：采集时支持 png/jpg/webp/bmp 图片文件，通过本地 PP-OCRv6 引擎（ppu-paddle-ocr + onnxruntime-node）自动提取文字，无需联网。

**三步业务循环**：采集 → 整理 → 输出。Insight Kernel 自动注入所有 LLM 调用，输出保持个人判断风格。

## 开发

```bash
npm install
npm run dev      # 自动选可用端口（3456/3457/…）
npm test         # 112 个单元测试
npm run build    # 生产构建
```

启动后打开 `http://localhost:3456`，先到「设置」页配置 LLM。

## 配置使用

1. 启动后打开「设置」页
2. 填写 LLM 的 Base URL / API Key / 模型（默认 GLM，可改 DeepSeek/Qwen 等 OpenAI 兼容服务）
3. 点「测试连通」验证 LLM 可用
4. 填写 Vault 文件夹路径（采集时递归扫描 md/txt/pdf/docx/html）
5. 可选：填写 Insight Kernel 或到「内核」页结构化管理

## 数据存储

所有数据本地存储，不上云：
- 结构化数据：`data/insight.db`（SQLite）
- 数据库已被 `.gitignore` 忽略

## 技术栈

Next.js 15 · React 19 · TypeScript · Tailwind CSS · better-sqlite3 · node-llama-cpp · ppu-paddle-ocr · OpenAI 兼容 LLM
