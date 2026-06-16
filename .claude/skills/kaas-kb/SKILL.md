---
name: kaas-kb
description: |
  KaaS 智能知识库助手。支持知识库检索、文档读取、项目管理、文档上传。
  当用户需要查询知识库、管理知识库项目、上传文档时触发。
  触发词：知识库、kb、检索、搜索知识、上传文档、知识管理、查制度、查SOP
---

# KaaS 知识库助手

> 金融科技事业群智能知识库中台的统一入口。用自然语言操作知识库，无需记忆 MCP 工具名。

---

## 触发条件

当用户提到以下关键词时触发：
- "知识库"、"kb"、"KaaS"
- "检索"、"搜索"、"查一下"
- "上传文档"、"导入文档"
- "新建项目"、"编辑项目"、"同步索引"
- "查制度"、"查SOP"、"查规范"

---

## 功能概览

| 功能 | 说明 | 示例 |
|------|------|------|
| 知识检索 | 搜索知识库中的文档 | "搜一下质检标准" |
| 文档读取 | 获取指定文档全文 | "读取供应商管理办法" |
| 知识打包 | 按主题组装知识包 | "帮我写培训方案" |
| 项目管理 | 新建/编辑/同步项目 | "新建一个项目" |
| 文档上传 | 引导文档上传流程 | "怎么上传文档" |

---

## 工作流

### 流程图

```
用户请求
    ↓
意图判断
    ├── 检索类 → 流程1：知识检索
    ├── 读取类 → 流程2：文档读取
    ├── 打包类 → 流程3：知识打包
    ├── 管理类 → 流程4：项目管理
    ├── 上传类 → 流程5：文档上传
    └── 帮助类 → 流程6：功能说明
```

---

### 流程1：知识检索

**触发**：用户说"搜一下XXX"、"查一下XXX"、"有没有XXX相关文档"

**执行**：
1. 调用 `mcp__kaas-knowledge__kb_search`（query=用户问题，top_k=8）
2. 返回匹配的文档片段 + 来源路径
3. 询问用户是否需要读取完整文档

**输出格式**：
```
找到 N 条相关结果：

1. [文档标题]
   路径：domains/xxx/xxx.md
   摘要：[匹配片段]

2. [文档标题]
   路径：domains/xxx/xxx.md
   摘要：[匹配片段]

需要读取哪篇文档的完整内容？
```

---

### 流程2：文档读取

**触发**：用户说"读取XXX"、"打开XXX文档"、"看下XXX全文"

**执行**：
1. 如果用户提供了路径，直接调用 `mcp__kaas-knowledge__kb_get_artifact`（path=路径）
2. 如果用户提供了文档名，先用流程1搜索找到路径，再读取
3. 返回文档全文

**输出**：直接输出文档内容，不加包装

---

### 流程3：知识打包

**触发**：用户说"帮我写XXX方案"、"整理XXX相关资料"、"给我XXX的完整信息"

**执行**：
1. 调用 `mcp__kaas-knowledge__kb_pack`（topic=主题，role=pm，intent=write_prd）
2. 返回知识包（模板 + wiki + docs）
3. 基于知识包内容帮用户撰写方案

**参数说明**：
- topic：主题 slug 或完整路径（如 `voiceprint` 或 `domains/payment/voiceprint`）
- role：pm / fe / be / qa / ops（决定 wiki 优先顺序）
- intent：write_prd / frontend / backend / test / study

---

### 流程4：项目管理

**触发**：用户说"新建项目"、"编辑项目"、"同步索引"

**子流程**：

#### 4A. 新建项目

1. 询问以下信息（必填）：
   - 一级域（下拉选择）
   - 项目名（英文目录名）
   - 完整名称（中文）
   - TOPIC_KEYWORDS
   - 分类描述

2. 调用 REST API：
   ```bash
   curl -X POST "https://ai-analysis-api.jd.com/api/project-domains" \
     -H "Content-Type: application/json" \
     -d '{
       "domain_level1": "xxx",
       "source_type": "topic_system",
       "project_name": "xxx",
       "full_name": "xxx",
       "keywords": "xxx",
       "description": "xxx"
     }'
   ```

3. 同步索引：
   ```bash
   curl -X POST "https://ai-analysis-api.jd.com/api/agent/sync-index" \
     -H "Content-Type: application/json" \
     -d '{"domain_level1": "xxx"}'
   ```

#### 4B. 编辑项目

1. 查询项目列表找到项目 ID
2. 询问要修改的字段
3. 调用 PUT API 更新

#### 4C. 同步索引

直接调用：
```bash
curl -X POST "https://ai-analysis-api.jd.com/api/agent/sync-index" \
  -H "Content-Type: application/json" \
  -d '{"domain_level1": "xxx"}'
```

---

### 流程5：文档上传

**触发**：用户说"上传文档"、"导入文档"、"怎么把文档放到知识库"

**执行**：

目前 KaaS 不支持直接文件上传，提供两种方案：

**方案A：Git 操作**（适合有 Git 权限的用户）
```bash
# 1. clone 仓库
git clone git@coding.jd.com:ai-infra-apps/knowledge-base.git /tmp/kb

# 2. 复制文档
mkdir -p /tmp/kb/domains/{一级域}/{项目名}/docs
cp /path/to/your/docs/*.md /tmp/kb/domains/{一级域}/{项目名}/docs/

# 3. 提交推送
cd /tmp/kb
git add .
git commit -m "feat: 添加XXX文档"
git push origin master

# 4. 回 KaaS 网页点"同步"
```

**方案B：JoySpace 批量导入**（适合普通用户）
1. 把文档上传到 JoySpace 目录
2. 打开 KaaS 网页：http://ai-kaas.pre-apps.jd.com
3. 进入"文档批量录入"
4. 粘贴 JoySpace 目录 URL
5. 按四步向导操作

---

### 流程6：功能说明

**触发**：用户说"知识库能做什么"、"怎么用"、"帮助"

**输出**：
```
KaaS 知识库支持以下功能：

1. 知识检索
   - "搜一下质检标准"
   - "查一下供应商管理办法"

2. 文档读取
   - "读取 domains/data-science/telemarketing-ops/docs/xxx.md"

3. 知识打包
   - "帮我写一份培训方案"
   - "整理赛马机制相关资料"

4. 项目管理
   - "新建项目：一级域=data-science，项目名=xxx"
   - "同步索引"

5. 文档上传
   - "怎么上传文档到知识库"

直接用自然语言告诉我你想做什么即可。
```

---

## 常用查询模板

### 查制度
```
搜索知识库：供应商管理办法
→ 找到后读取全文
→ 如需对比多篇制度，用 kb_get_artifacts 批量读取
```

### 查 SOP
```
搜索知识库：供应商准入流程
→ 找到场景 SOP 文档
→ 读取完整 SOP 内容
```

### 写方案
```
帮我写一份XXX方案
→ 调用 kb_pack 获取知识包
→ 基于知识包内容撰写方案
```

---

## API 参考

### MCP 工具

| 工具 | 用途 | 参数 |
|------|------|------|
| `kb_search` | 关键词检索 | query, top_k, scope, role |
| `kb_resolve` | 查询路由 | query |
| `kb_pack` | 组装知识包 | topic, role, intent, query |
| `kb_get_artifact` | 读取单篇文档 | path, line_start, line_end |
| `kb_get_artifacts` | 批量读取文档 | paths[] |
| `kb_describe` | 查看能力说明 | 无 |

### REST API

| 端点 | 用途 | 方法 |
|------|------|------|
| `/api/project-domains` | 项目列表 | GET |
| `/api/project-domains` | 新建项目 | POST |
| `/api/project-domains/:id` | 编辑项目 | PUT |
| `/api/agent/sync-index` | 同步索引 | POST |
| `/api/agent/push` | Git 推送 | POST |

---

## 注意事项

1. **TOPIC_KEYWORDS 很重要**：决定检索路由质量，务必认真填写
2. **分类描述要准确**：AI 自动分类时参考此字段
3. **同步后生效**：项目修改后需要同步 INDEX 才能生效
4. **Git 权限**：文档上传需要 coding.jd.com 的 Git 权限
5. **JoySpace SSO**：批量导入需要 JoySpace 的 SSO Cookie

---

## 故障排查

| 问题 | 原因 | 解决方案 |
|------|------|---------|
| 检索无结果 | 关键词不匹配 | 检查项目的 TOPIC_KEYWORDS |
| 文档读取失败 | 路径错误 | 先用 kb_search 找到正确路径 |
| 同步失败 | 网络问题 | 重试或检查网络连接 |
| 上传失败 | 无 Git 权限 | 用 JoySpace 批量导入方案 |

---

*最后更新：2026-06-16*
