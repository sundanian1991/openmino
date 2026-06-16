---
name: kaas-kb
description: |
  调用金融科技事业群 KaaS 知识库中台(MCP)。当用户想查/写/改事业群内的 PRD、wiki、接口文档、
  设计文档、测试用例,或提到任何已收录项目(声纹/aipay/支付基础/3C租赁等)时,务必使用本技能。
  说人话即可:"查一下声纹支付的PRD"、"帮我写二期PRD"、"改这个页面要注意什么"、
  "知识库里有什么文档"、"读一下那篇声纹H5的文档"——本技能自动调对工具、走对流程。
  前提:项目 .mcp.json 已配置 kaas-knowledge 服务。
---

# KaaS 知识库调用技能

> **同事不用懂 MCP。他们对你说一句话,你按本技能的流程自动调对工具。**

本技能封装 KaaS 知识库中台的 6 个 MCP 工具,内置正确的调用工作流。
你(agent)负责判断意图、选流程、调工具、组织结果;用户只管提需求。

---

## 这是什么

KaaS 是金融科技事业群的知识库。收录了 PRD、角色 wiki、历史决策、接口文档、测试用例。
你的职责:让 AI 写 PRD / 改代码 / 写用例时,先从知识库拿到历史全量上下文,再动手。

**一句话原则:写作前先 kb_pack 拿全量,不要只用 kb_search 片段。**

---

## 意图判断(收到用户需求,先看这里)

用户说完需求,按下表判断走哪条流程:

| 用户说的话(示例) | 意图 | 流程 |
|---|---|---|
| "帮我查/写/补 XX 的 PRD"、"起草二期方案"、"写需求文档" | **写产物** | **流程 A** |
| "改/加 XX 的前端页面"、"XX 后端接口怎么调"、"写测试用例"、"这个功能怎么实现" | **改代码/写用例** | **流程 B** |
| "知识库里有什么"、"XX 项目有哪些文档"、"有哪些项目" | **纯探索** | **流程 C** |
| "读一下 XX 这篇文档"、给了具体文件路径 | **读单篇** | **流程 D** |

> 用户没明说项目名时,用 kb_search 的结果判断 topic。多个项目命中时,列出来让用户选。

---

## 流程 A:写 PRD / 写 wiki / 二期需求(最常用)

```
1) kb_search(query=需求关键词, top_k=10, role="pm")
   → 看命中的文档属于哪个 topic
2) kb_pack(topic=命中的topic, role="pm", intent="write_prd", query=需求关键词)
   → 一次性拿到:模板 + pm角色wiki + 一期PRD全文 + 历史决策
3) 按 kb_pack 返回的 template 章节顺序起草
4) 如 template/wikis/docs 里有 siblings 未加载且相关 → kb_get_artifacts(paths=[...]) 补齐
```

**关键纪律:**
- 步骤 2 的 kb_pack 是核心,**不能跳过**只用步骤 1 的片段就动笔
- 起草时引用来源(citations),标注每段信息来自哪篇文档
- 如果 kb_search 一个都搜不到 → 告诉用户"知识库里没有相关内容",不要凭空编

---

## 流程 B:改前端 / 改后端 / 写测试用例

```
1) kb_search(query=功能关键词, top_k=8, role="fe"|"be"|"qa")
   → 看命中的 topic 和 related_paths
2) kb_pack(topic=命中的topic, role=同步骤1的role, intent="frontend"|"backend"|"test")
   → 拿到角色 wiki + 关联文档(前端拿组件规范、后端拿接口契约、qa 拿历史用例)
3) 仍有缺口 → kb_get_artifacts(paths=[related_paths里的路径]) 补齐
4) 基于上下文给出修改建议/代码/用例
```

**role 怎么选:**

| role | 拿到什么 | 用户是 |
|---|---|---|
| `fe` | 前端组件规范、页面约定、接口联调说明 | 前端工程师 |
| `be` | 服务设计、接口契约、数据库变更、部署约定 | 后端工程师 |
| `qa` | 历史测试方案、用例库、缺陷与回归范围 | 测试工程师 |
| `pm` | 用户心智、权益状态机、入口枚举、卖点字段 | 产品经理 |

---

## 流程 C:纯探索 / 看知识库有什么

```
1) kb_describe()  → 看服务能力
2) kb_resolve(query=业务关键词)  → 返回候选 topic + 每个topic的完整文件清单
3) 用户感兴趣哪个文件 → kb_get_artifact(path=具体路径) 读全文
4) 或 kb_search(query=..., top_k=5) 看片段概览
```

**场景示例:**
- 用户:"知识库里有什么项目?" → kb_resolve(query="所有") 看全量项目列表
- 用户:"声纹项目有哪些文档?" → kb_resolve(query="声纹") 看文件清单
- 用户:"随便看看声纹的东西" → kb_search(query="声纹支付") 看5个片段

---

## 流程 D:读指定文档

```
用户给了文件路径或文档名 → 直接 kb_get_artifact(path=路径)
用户只给了文档名不确定路径 → kb_resolve(query=文档名) 找到路径,再 kb_get_artifact
多篇一起读 → kb_get_artifacts(paths=[路径1, 路径2, ...])
```

---

## 工具速查(6 个)

| 工具 | 用途 | 关键参数 |
|---|---|---|
| `kb_describe` | 服务能力自描述 | 无 |
| `kb_search` | 关键词检索,返回片段 | `query`(必填)、`top_k`(默认8)、`role`(可选) |
| `kb_resolve` | 路由决策+候选主题文件清单 | `query`(必填) |
| `kb_pack` ★ | **写作前首选**:组装模板+wiki+PRD全文 | `topic`(必填)、`role`、`intent`、`query` |
| `kb_get_artifact` | 读单篇完整原文 | `path`(必填)、`line_start`/`line_end`(可选) |
| `kb_get_artifacts` | 批量读多篇原文 | `paths`(必填,数组) |

### kb_pack 参数详解

`kb_pack(topic, role, intent, query, docs_top_k, wikis_top_k)`

- **topic**:项目 slug,如 `voiceprint`、`aipay`(从 kb_search 结果拿)
- **role**:`pm` / `fe` / `be` / `qa` / `ops`(决定拿到哪类 wiki)
- **intent**:`write_prd` / `frontend` / `backend` / `test` / `explore`
- **query**:需求关键词,用于相关性排序
- **docs_top_k / wikis_top_k**:控制加载的文档/wiki 数量(默认受字数预算限制,约40000字符)

### kb_pack 返回结构(理解你拿到了什么)

```
{
  "template": "PRD规约模版.md 全文",     ← 写PRD的章节骨架
  "wikis": [角色wiki全文],               ← 用户心智、决策因果、避坑指南
  "docs": [历史PRD全文,按相关性排序],     ← 一期完整内容
  "siblings": {
    "docs_not_loaded": [...],            ← 因预算截断未加载的文档路径
    "wikis_not_loaded": [...],
    "artifacts": [...]                   ← 架构图等附件
  }
}
```

> siblings 里有相关文件时,主动用 kb_get_artifacts 补齐,不要让用户自己找。

---

## 当前已收录项目(常见 topic)

| topic | 中文名 | 一级域 | 检索关键词 |
|---|---|---|---|
| `voiceprint` | 声纹识别 | payment | 声纹、声纹支付、语音支付、生物识别 |
| `aipay` | 京东AI付 | payment | AI购、AI任务、AI眼镜 |
| `payment-basic` | 支付基础 | payment | 支付SDK、支付工具 |
| `rental-3c` | 3C租赁 | enterprise-finance | 企业金融、3C租赁 |

> 用户提到的业务不在上表 → 先 kb_search 试试,搜不到就是还没收录,告诉用户"这个项目还没接入知识库"。

---

## 反模式(绝对不要做)

1. **只用 kb_search 片段就写 PRD / 改代码** —— 片段不足以覆盖入口枚举、用户心智、历史决策。必须走 kb_pack。

2. **只读一篇 doc 就动笔** —— 应同时读 template + wiki + 至少一篇 doc。kb_pack 已经帮你组装好了,直接用。

3. **调完 kb_search 忽略返回的 `next_step_hint` 和 `related_paths`** —— 这是服务端给你的行动建议,跟着走。

4. **知识库没有的内容硬编** —— kb_search 搜不到就如实说"知识库里没有",不要凭空生成虚假文档内容。

---

## 输出规范

给用户的结果,按场景组织:

**写完 PRD / 方案:**
```
## 基于知识库的 [需求名] 方案

### 上下文来源
- 模板: domains/xxx/template/PRD规约模版.md
- 历史: domains/xxx/docs/250514_xxx.md
- Wiki: domains/xxx/wiki/pm-wiki.md(用户心智)、evolution-wiki.md(决策因果)

### [方案正文,按模板章节]

### 引用文档
[1] xxx.md
[2] xxx.md
```

**探索结果:**
```
## 知识库检索结果

**命中文档(top 5):**
1. [文档名] —— [一句话摘要]
2. ...

**可深入阅读:**
- domains/xxx/docs/xxx.md(一期PRD全文)
- domains/xxx/wiki/xxx.md(角色知识)

需要我读哪篇的全文,或基于这些起草方案吗?
```

---

## 故障处理

| 问题 | 处理 |
|---|---|
| MCP 工具调用报错(连接失败) | 提示用户:"知识库服务暂时连不上,可能不在内网环境。检查 VPN/内网后重试。" |
| kb_search 返回空 | 提示用户:"知识库里没找到相关内容。可能是:① 这个项目还没收录;② 关键词换一个试试;③ 联系平台维护者录入。" |
| kb_pack 返回的 docs 被截断 | 用 kb_get_artifacts 补齐 siblings 里的相关文件 |
| 用户问的项目不在知识库 | 如实说没收录,建议走 JoySpace 录入流程(见手册) |

---

## 前提配置(仅首次)

本技能依赖项目的 `.mcp.json` 已配置 kaas-knowledge 服务:

```json
{
  "mcpServers": {
    "kaas-knowledge": {
      "type": "http",
      "url": "https://ai-analysis-api.jd.com/mcp/"
    }
  }
}
```

如果工具调用报 "工具不存在",说明 MCP 没加载,提示用户重启 agent 会话。

> URL 必须带尾斜杠 `/mcp/`,否则连接失败。
> 仅在京东内网环境可用。
