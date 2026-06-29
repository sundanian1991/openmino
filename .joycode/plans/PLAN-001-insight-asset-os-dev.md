# Insight Asset OS — 分阶段开发计划

## 任务摘要

基于已有 PRD 和项目骨架，将 Insight Asset OS 从当前「设置页 + 空壳」状态推进到「采集→整理→输出」三步业务闭环完整可用。项目已有 Next.js 15 + SQLite (node:sqlite) + LLM 客户端 + Kernel 注入机制的基础代码，需逐步补全业务层 API、前端页面和核心工作流。

---

## 当前项目状态

已完成：
- [x] Next.js 15 项目初始化 + Tailwind CSS
- [x] 侧边栏导航（仪表盘/采集/资产库/主题/设置）
- [x] SQLite 数据库初始化 + schema（assets/topics/sources/feedback/settings）
- [x] LLM 客户端（OpenAI 兼容，支持 Kernel 注入）
- [x] 设置页（LLM 配置 + Vault 路径 + Kernel 文本框）
- [x] LLM 连通测试 API

未完成（本计划覆盖）：
- [ ] 采集模块（扫描 + intake + 轻量卡）
- [ ] 整理模块（upgrade + 主题分类 + 证据等级）
- [ ] Kernel 管理模块（四类 CRUD + 结构化存储）
- [ ] 输出模块（写作骨架 + 改稿 + 流式输出）
- [ ] 仪表盘（待办看板 + 统计 + 复盘）
- [ ] 写作风格配置
- [ ] FTS5 全文检索

---

## 第一阶段：采集闭环（P0，预计 3-4 天）

核心目标：用户配置本地目录后，能扫描文件、生成轻量卡、确认入库。

### TODO: 1.1 文件扫描服务
- [ ] 创建 `lib/scanner/index.ts` — 递归扫描指定目录
- [ ] 支持文件类型白名单（md/txt/html）
- [ ] 增量扫描：基于 mtime + hash 对比跳过已处理文件
- [ ] 创建 API `app/api/scan/route.ts` — 返回未处理文件列表

### TODO: 1.2 Intake LLM 流程
- [ ] 创建 `lib/intake/prompts.ts` — intake/calibrate 的 prompt 模板
- [ ] 创建 `lib/intake/process.ts` — 读文件 → 调 LLM → 解析轻量卡
- [ ] 创建 API `app/api/intake/route.ts` — 接收文件路径列表，返回轻量卡
- [ ] 处理 LLM 返回格式异常的兜底逻辑

### TODO: 1.3 采集前端页面
- [ ] 创建 `app/intake/page.tsx` — 采集主页面
- [ ] 文件列表展示（文件名/修改时间/大小）
- [ ] 批量选择 + 提交处理
- [ ] 轻量卡预览卡片（title + insight + tags）
- [ ] 确认/编辑/重试交互
- [ ] 保存成功后更新状态

### TODO: 1.4 验证检查点
- [ ] 能扫描本地 md 文件夹并展示文件列表
- [ ] 能调用 LLM 生成轻量卡并预览
- [ ] 确认后轻量卡持久化到 SQLite

---

## 第二阶段：整理闭环（P0，预计 3-4 天）

核心目标：轻量卡升级为资产卡，支持主题分类和证据等级标注。

### TODO: 2.1 Upgrade LLM 流程
- [ ] 创建 `lib/upgrade/prompts.ts` — upgrade 的 prompt 模板
- [ ] 创建 `lib/upgrade/process.ts` — 轻量卡 → LLM → 资产卡（反常识 + E0-E5）
- [ ] 创建 API `app/api/upgrade/route.ts`
- [ ] 批量升级 API `app/api/upgrade/batch/route.ts`

### TODO: 2.2 主题管理
- [ ] 创建 API `app/api/topics/route.ts` — CRUD + 树形结构
- [ ] 创建 `app/topics/page.tsx` — 主题树展示与管理
- [ ] 支持层级主题（parent_id）

### TODO: 2.3 资产库前端
- [ ] 创建 `app/assets/page.tsx` — 资产卡列表（支持按状态/主题筛选）
- [ ] 创建 `app/assets/[id]/page.tsx` — 资产卡详情页
- [ ] 左侧原文 + 中间编辑区 + 右侧操作布局
- [ ] 证据等级选择器（E0-E5）
- [ ] 主题归类选择器
- [ ] 保存/放弃操作

### TODO: 2.4 验证检查点
- [ ] 轻量卡能升级为资产卡
- [ ] 资产卡展示反常识 + 证据等级
- [ ] 主题树可创建/编辑
- [ ] 资产卡可归类到主题

---

## 第三阶段：Kernel 结构化管理（P0，预计 2 天）

核心目标：将文本框 Kernel 升级为四类结构化管理，支持 CRUD 和自动注入。

### TODO: 3.1 Kernel 数据模型
- [ ] 新增 `kernel` 表 migration（type/judgment/scenario/counter_example/confidence）
- [ ] 创建 API `app/api/kernel/route.ts` — CRUD
- [ ] 修改 `lib/llm/kernel.ts` — 从结构化数据拼装注入文本

### TODO: 3.2 Kernel 管理页面
- [ ] 创建 `app/kernel/page.tsx` — 四列卡片墙
- [ ] 新增/编辑弹窗（判断/适用场景/反例/置信度）
- [ ] 置信度颜色区分（高/中/低）
- [ ] 侧边栏新增 Kernel 导航项

### TODO: 3.3 验证检查点
- [ ] 能新增/编辑/删除四类 Kernel
- [ ] LLM 调用时自动注入结构化 Kernel

---

## 第四阶段：输出模块（P0，预计 3-4 天）

核心目标：选择主题 + 资产卡，生成写作骨架，支持改稿。

### TODO: 4.1 写作骨架 API
- [ ] 创建 `lib/output/prompts.ts` — scaffold prompt
- [ ] 创建 API `app/api/output/scaffold/route.ts` — 生成 5 sections
- [ ] 创建 API `app/api/output/review/route.ts` — 改稿（流式输出）

### TODO: 4.2 输出前端页面
- [ ] 创建 `app/output/page.tsx` — 写作工作台
- [ ] 主题选择器 + 资产卡面板
- [ ] 写作骨架编辑区（5 sections 分区块）
- [ ] 改稿指令输入 + 流式输出展示
- [ ] 导出为 Markdown

### TODO: 4.3 验证检查点
- [ ] 选主题后能生成写作骨架
- [ ] 选中段落能触发改稿并流式输出
- [ ] 能导出为 .md 文件

---

## 第五阶段：仪表盘 + 写作风格（P1，预计 2-3 天）

### TODO: 5.1 仪表盘
- [ ] 改造 `app/page.tsx` — 待办看板（待校准/可输出/待反馈）
- [ ] 资产统计卡片（总数/在用/真实案例/待校准）
- [ ] 写作复盘（30天输出折线图 + 高引用资产 TOP5）
- [ ] 创建 API `app/api/dashboard/route.ts` — 聚合统计

### TODO: 5.2 写作风格配置
- [ ] 创建 `lib/style/schema.ts` — YAML 风格定义
- [ ] 3 套预设：vincent-standard / academic / client-comm
- [ ] 创建 `app/settings/style/page.tsx` — 风格配置界面
- [ ] 写作骨架生成时入风格参数

### TODO: 5.3 验证检查点
- [ ] 仪表盘显示真实数据统计
- [ ] 切换写作风格后输出风格有明显差异

---

## 第六阶段：增强功能（P1，预计 2-3 天）

### TODO: 6.1 FTS5 全文检索
- [ ] schema 新增 FTS5 虚拟表
- [ ] 创建 API `app/api/search/route.ts`
- [ ] 全局搜索框组件

### TODO: 6.2 反馈与证据升级
- [ ] 创建 API `app/api/feedback/route.ts`
- [ ] 资产卡详情页增加反馈记录区
- [ ] 反馈后自动重新评估证据等级

### TODO: 6.3 导出与备份
- [ ] 批量导出 Markdown/JSON
- [ ] 一键备份 SQLite + 配置

---

## 技术决策记录

| 决策 | 选择 | 原因 |
|------|------|------|
| 数据库 | node:sqlite (Node 22 内置) | 零依赖、本地优先、PRD 指定 |
| UI 框架 | Next.js 15 App Router | 已初始化，SSR + API Route 合一 |
| LLM 调用 | 服务端 API Route 调用 | 避免浏览器暴露 API Key |
| 流式输出 | ReadableStream + SSE | 改稿场景需要实时反馈 |
| Kernel 存储 | SQLite kernel 表 | 结构化查询，支持按类别筛选 |
| 暂不使用 Electron | 纯 Web 先验证 | 降低复杂度，核心逻辑验证后再壳 |

---

## 建议的启动顺序

1. **从第一阶段开始** — 采集是三步循环的起点，验证文件扫描 + LLM 调用链路
2. **快速验证** — 每个阶段结束时有明确的验证检查点
3. **渐进增强** — P0 阶段保证核心闭环，P1 阶段锦上添花
4. **Electron 后置** — 先在浏览器中跑通全流程，后期加 Electron 壳

---

## 风险与缓解

| 风险 | 缓解方案 |
|------|---------|
| node:sqlite 兼容性 | Node 22+ 已稳定；已有测试验证 |
| LLM 返回格式不稳定 | 每个 prompt 附 JSON schema + 兜底解析 |
| 大文件读取性能 | 限制单文件 10MB，超限截断提示 |
| 本地路径跨平台 | 当前 macOS 优先，path.resolve 适配 |