# KaaS 智能知识库中台 · 操作手册

> **服务全称**：KaaS 知识库服务（kaas-knowledge v1.27.2）
> **归属**：京东集团 · 京东科技 · 金融科技事业群
> **管理台**：http://ai-kaas.pre-apps.jd.com
> **MCP 接口**：https://ai-analysis-api.jd.com/mcp/
> **数据源**：`git@coding.jd.com:ai-infra-apps/knowledge-base.git`（master 分支）
> **手册日期**：2026-06-16

---

## 一、这是什么？

KaaS 是一个**事业群级知识库中台**，把散落在各团队的 PRD、前后端实现文档、测试用例、架构说明沉淀到一个 Git 仓库里，再通过两种方式对外提供检索：

1. **Web 管理台**——人用，做项目维护、文档录入、召回调试。
2. **MCP 服务**——AI Agent 用，让 AI 写 PRD / 改代码 / 写用例时能拿到历史全量上下文。

**典型使用者**：产品经理（PRD）、前端（Vue/React）、后端（Java）、测试（用例）。

**适合的场景**：
- 撰写或评审事业群内的 PRD、需求说明、二期方案
- 前端开发需要历史页面规范、组件约定、接口联调说明
- 后端开发需要历史服务设计、接口契约、部署约定
- 测试工程师补充用例、回归范围
- 存量需求二期开发：需要一期 PRD、设计、缺陷记录等全量上下文

**不适合**：实时生产数据查询、线上日志查询、事业群知识库以外的集团文档。

---

## 二、核心概念

要理解 KaaS，先搞清三个层级：

| 概念 | 说明 | 例子 |
|---|---|---|
| **一级域（L1 Domain）** | 事业群下的业务大块，作为目录的第一层 | `payment`（支付）、`enterprise-finance`（企业金融）、`wealth`（财富） |
| **项目（Topic）** | 一级域下的具体业务主题，是知识检索的最小单元 | `voiceprint`（声纹识别）、`aipay`（京东AI付） |
| **知识库（Knowledge Base）** | 项目下可独立配置召回策略的库（可选，一个项目可对应一个 KB） | `kb_e4bbdf31`（声纹识别库） |

### 仓库目录结构

知识库源是 Git 仓库，按固定结构组织：

```
domains/
└── <一级域>/                    # 如 payment
    └── <项目>/                  # 如 voiceprint
        ├── template/            # 模板（PRD 章节骨架等）
        ├── wiki/                # 角色 wiki（用户心智、规范、约定）
        ├── docs/                # 历史 PRD、设计文档、一期上线说明
        └── artifacts/           # 架构图、ADR、Runbook 等附件
```

> 当前仓库共 **241 个文件**，已收录项目示例见下表。

### 当前已收录项目（示例）

| 项目 slug | 中文名 | 一级域 | 路径 | 关键词 |
|---|---|---|---|---|
| `rental-3c` | 企业金融中3C 租赁 | enterprise-finance | `domains/enterprise-finance/rental-3c` | 企业金融、3C租赁、电子产品 |
| `payment-basic` | 支付基础的业务 | payment | `domains/payment/payment-basic` | 支付SDK、支付基础工具 |
| `aipay` | 京东AI付 | payment | `domains/payment/aipay` | 京东AI购、AI任务功能、AI 眼镜 |
| `voiceprint` | 支付-声纹识别 | payment | `domains/payment/voiceprint2` | 声纹、声纹支付、语音支付、生物识别支付 |

---

## 三、Web 管理台操作

访问 http://ai-kaas.pre-apps.jd.com，左侧导航 7 个模块：

| 模块 | 用途 |
|---|---|
| **接入指南** | 目录批量接入指引（首次使用必读） |
| **加工流水线** | 三层消化架构（文档如何被切分、向量化） |
| **项目管理** | 一级域下项目（topic）的新增 / 编辑 / 删除 / 查询 |
| **文档批量录入** | JoySpace 目录批量入库 |
| **知识库管理** | 召回策略配置、文档统计 |
| **外部集成** | OpenAPI / MCP 管理 |
| **召回调试** | 实时测试召回效果 |

> ⚠️ **注意**：除「项目管理」「知识库管理」「文档批量录入」外，部分页面需要**登录**后才显示完整内容（右上角「登录」按钮）。本手册的截图与数据基于项目管理页抓取。

### 3.1 项目管理（核心页面）

地址：http://ai-kaas.pre-apps.jd.com/project-management

**页面功能**：维护一级域下的项目（topic）信息，支持新增、编辑、删除、查询。

#### 页面元素

- **顶部操作区**：
  - `同步后 git push` 复选框——勾选后点「同步」会把改动 push 到 Git 仓库
  - `同步` 按钮——手动触发 git pull（对应 API `POST /api/agent/sync`）
  - `+ 新建项目` 按钮
- **筛选区**：
  - 一级域下拉（全部 / consumer-finance / enterprise-finance / payment / wealth / data-science / agriculture / consumer-finance-company / development / other）
  - 来源下拉（全部 / `legacy_api` / `topic_system`）
  - 搜索框（按 原始ID / 完整名称 / 关键词 / 描述 搜索）
- **项目表格列**：项目 · 一级域 · 来源 · 原始 ID · 路径 · 关键词 · 知识库 ID · 操作（编辑/删除）

#### 如何新增项目

1. 点击右上角 **`+ 新建项目`**
2. 在弹出的表单中填写：

| 字段 | 必填 | 说明 |
|---|---|---|
| **一级域** | ✅ | 下拉选择，如 `payment` |
| **来源** | ✅ | `topic_system`（推荐，走主题系统）或 `legacy_api`（对接旧外部系统） |
| **原始 ID** | 默认与目录名相同 | 对接外部系统时使用；勾选复选框才出现 |
| **项目 slug** | ✅ | 小写英文一个词，如 `prd_v1`、`voice-print` |
| **名称** | ✅ | 例如「支付业务的 PRD 需求文档」 |
| **关键词** | ✅ | 短句描述主要事项，如「声纹支付开通流程、H5 组件化接入」 |
| **描述** | ✅ | 较长语句说明范围与边界；**文档自动分类会参考此字段**，请写清业务场景与归属 |
| **高级选项**（可折叠） | — | 知识库 ID、层级、文档所有者，均可选 |

3. 点击 **`创建`** 即可。如勾选了「同步后 git push」，会同步推送到 Git 仓库。

> 💡 **关键词和描述很重要**：它们直接影响后续 `kb_search` 的检索打分和文档自动分类，请认真写。

#### 如何编辑/删除/查询

- **编辑**：点击项目行的「编辑」按钮，修改字段后保存
- **删除**：点击项目行的「删除」按钮
- **查询**：用筛选区的一级域下拉、来源下拉、搜索框组合过滤

### 3.2 知识库管理

地址：http://ai-kaas.pre-apps.jd.com/knowledge-base

**页面功能**：按领域划分知识库，查看知识库信息与文档统计。

- `+ 新建知识库` 按钮
- 每个知识库卡片显示：名称、状态（活跃）、类型（结构化）、embedding 模型（如 `qwen3-embedding-06b`）、文档数 / 切片数 / 最后更新时间

> 一个项目可以对应一个知识库（在项目的高级选项里绑定 `知识库 ID`，如 `kb_e4bbdf31`）。

### 3.3 文档批量录入

地址：http://ai-kaas.pre-apps.jd.com/knowledge-input

**页面功能**：从 JoySpace（京东文档平台）目录批量入库。

- 顶部问答框：输入问题查询知识库
- `录入文档` 按钮：批量录入文档到指定知识库

### 3.4 召回调试

地址：http://ai-kaas.pre-apps.jd.com/retrieval-debug

**页面功能**：实时测试召回效果，验证某个查询能召回哪些文档、打分如何。**需要登录**。

---

## 四、AI Agent 如何调用（MCP）

这是 KaaS 的核心价值：让 AI 在写 PRD / 改代码 / 写用例时自动拿到历史上下文。

### 4.1 接入 MCP

在项目的 `.mcp.json` 中加入（本项目已配置）：

```json
"kaas-knowledge": {
  "type": "http",
  "url": "https://ai-analysis-api.jd.com/mcp/"
}
```

> ⚠️ URL **必须带尾斜杠**，否则会被 307 重定向（https→http 降级），部分 client 会连接失败。

### 4.2 可用工具（6 个）

| 工具 | 用途 | 关键参数 |
|---|---|---|
| **`kb_describe`** | 服务能力自描述（返回 manifest） | 无参数 |
| **`kb_search`** | 关键词检索，返回片段 + citations + topic + related_paths + hint | `query`(必填)、`top_k`(默认8)、`role`(pm/fe/be/qa/ops)、`include_full_artifacts` |
| **`kb_resolve`** | 路由决策 + 候选主题完整文件清单 | `query`(必填) |
| **`kb_pack`** | **写作前首选**：一次性组装「模板+wiki+一期PRD全文」 | `topic`(必填)、`role`、`intent`、`query` |
| **`kb_get_artifact`** | 按路径读取单篇完整原文（可分段） | `path`(必填)、`line_start`/`line_end`(可选) |
| **`kb_get_artifacts`** | 批量读取多个文件完整正文 | `paths`(必填，数组) |

### 4.3 强制工作流（按任务类型选一条）

> ⚠️ 服务端明确要求遵守，违反是**已知反模式**。

#### A. 写 PRD / 写 wiki / 二期需求（首选）

```
1) kb_search(query="需求名")          → 看命中哪个 topic
2) kb_pack(topic, role="pm", 
           intent="write_prd", 
           query="需求名")            → 一次性拿模板 + 角色 wiki + 一期 PRD 全文
3) 用 pack 中的 template 章节顺序写作
4) 若 pack 的 siblings 还有想看的文件 → kb_get_artifacts(paths=[...]) 补齐
```

#### B. 改前端 Vue/React / 改 Java / 写测试用例

```
1) kb_search(query=..., role="fe"|"be"|"qa")  → 看 topic 与 related_paths
2) kb_pack(topic=..., role=同上)                → 拿角色 wiki + 关联 doc
3) 仍有缺口 → kb_get_artifacts(paths=[...])
```

#### C. 仅探索 / 调试路由

```
1) kb_describe → kb_resolve(query)  → 看 topics 完整文件清单
2) kb_search 看片段，不写产物
```

### 4.4 反模式（不要这么做）

- ❌ **仅依据 `kb_search` 的 snippet 就写二期 PRD / 改代码 / 写用例**——片段不足，会漏入口枚举、用户心智、历史决策、卖点字段
- ❌ **只读一篇 doc 就动笔**——应同时阅读 template + wiki + 至少一篇 doc
- ❌ **调用 `kb_search` 后忽略响应中的 `next_step_hint` 与 `related_paths`**

### 4.5 调用示例

**示例 1：写声纹识别二期 PRD**
```
kb_search(query="声纹开通 多入口 个性化", top_k=12, role="pm")
  → 发现 topic=voiceprint
kb_pack(topic="voiceprint", role="pm", intent="write_prd", query="多入口 个性化")
  → 拿到模板 + pm 角色 wiki + 一期 PRD 全文
```

**示例 2：改支付收银台前端**
```
kb_search(query="支付收银台 Vue 组件规范", top_k=8, role="fe")
  → 发现 topic 与 related_paths
kb_pack(topic="<topic-slug>", role="fe", intent="frontend")
  → 拿到前端 wiki + 关联 doc
```

**示例 3：补齐缺失文件**
```
kb_get_artifacts(paths=[
  "domains/payment/voiceprint2/docs/v1-launch-notes.md",
  "domains/payment/voiceprint2/artifacts/architecture.md"
])
```

---

## 五、REST API（高级）

除 MCP 外，KaaS 还提供 REST 接口（base：`/api/agent`）：

| 方法 | 路径 | 说明 |
|---|---|---|
| GET | `/api/agent/manifest` | 服务能力自描述（同 kb_describe） |
| GET | `/api/agent/llm-config` | LLM 是否 Mock、是否已配置 Key |
| GET | `/api/agent/sources` | 已注册 Retriever 及状态 |
| POST | `/api/agent/sync` | 手动触发知识库 git pull |
| GET | `/api/agent/artifact` | 按路径读取仓库原文（支持行范围） |
| POST | `/api/agent/run` | LangGraph 多层 Agent 问答 |
| POST | `/api/agent/resume` | 人工审核断点恢复（approve / reject） |

**手动触发同步示例**：
```bash
curl -X POST http://ai-kaas.pre-apps.jd.com/api/agent/sync
```

---

## 六、快速上手 Checklist

**新用户第一次用 KaaS**：
1. 打开 http://ai-kaas.pre-apps.jd.com/project-management，浏览已有项目
2. 点击 `+ 新建项目`，把自己的业务主题加进去（认真写关键词和描述）
3. 把历史文档录入对应项目目录（通过「文档批量录入」或直接提交 Git）
4. 在「知识库管理」创建知识库并绑定到项目
5. 在「召回调试」验证文档能被正确召回
6. 在 AI Agent 的 `.mcp.json` 配置 MCP，让 AI 自动检索

**AI Agent 配置好后**：
1. 重启会话加载 MCP
2. 写 PRD 前先 `kb_search` → `kb_pack`
3. 改代码前先 `kb_search` → `kb_pack`
4. 永远不要只用 `kb_search` 片段就动笔

---

## 七、常见问题

| 问题 | 解决 |
|---|---|
| MCP 连接失败（307 重定向） | URL 必须是 `https://ai-analysis-api.jd.com/mcp/`（带尾斜杠） |
| 外网访问不了 | 这是京东内网服务，需接入内网或 VPN |
| 页面内容空白 | 多数页面需登录，点右上角「登录」 |
| `kb_search` 召回不准 | 检查项目的关键词和描述是否写得充分；调整 `top_k`（二期建议 10~20） |
| 文档没被收录 | 检查 Git 仓库对应目录是否有文件；在管理台点「同步」触发 git pull |
| 需要批量录入 | 用「文档批量录入」页面，从 JoySpace 目录批量入库 |

---

*本手册基于管理台实际界面（2026-06-16 抓取）和 MCP manifest 整理。如界面有更新，以实际页面为准。*
