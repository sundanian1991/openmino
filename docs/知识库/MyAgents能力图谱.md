# MyAgents 能力图谱

> 基于 v0.1.51 实验验证，2026-04-23
> 每条结论均来自实际测试，非理论推断

---

## 一、任务系统

### 能做什么
- **任务创建**：`myagents task create-direct` / `create-from-alignment` 两种方式，后者从 4 份文档自动创建
- **状态机**：`todo → running → done/blocked`，严格状态转换，非法转换会报错（如 running → running）
- **立即执行**：`myagents task run <id>` 派发独立 session
- **重新执行**：`myagents task rerun <id>` 可重新触发已完成的一次性任务
- **手动更新状态**：`myagents task update-status <id> <status> --message "..."` 允许手动推进状态
- **附加 session**：`myagents task append-session <id> <sessionId>` 可将外部 session 关联到任务
- **文档读写**：任务文档在 `~/.myagents/tasks/<taskId>/` 下，执行 Agent 可直接读写
- **定时任务**：`myagents cron` 支持 cron 表达式和 every 间隔，4 个 cron 同时运行无冲突
- **创建/停止/删除 cron**：`myagents cron add/stop/start/remove` 均验证可用
- **任务通知**：支持 desktop 通知，可配置事件触发（done/blocked/endCondition）
- **runMode**：`new-session`（每次新 session）和 `single-session`（单 session 复用）两种模式

### 不能做什么
- **任务嵌套**：任务内部不能创建新任务（独立 session 中没有 task CLI 的写入权限，只有读取）
- **状态回退**：done → running 不能直接转，需通过 rerun
- **并发任务限制**：未测出明确上限，但多个 cron 同时触发会排队执行

### 踩坑
- `myagents cron add` 的 `--schedule` 参数不接受 JSON，只接受标准 cron 表达式字符串
- `myagents task update-status` 有严格状态机约束，不能随意跳转
- 一次性任务跑完后状态是 `done`，不能 `run`，只能 `rerun`

### 最佳实践
- 一次性任务用 `create-from-alignment` 带 4 份文档；周期任务用 `cron add`
- 重要任务配 `--notification`，避免错过结果
- 长任务用 `single-session` 模式保持上下文连续性

---

## 二、子代理 & 多 Agent

### 能做什
- **子代理并行**：主 Agent 可同时启动 3-5 个子代理（Explore / general-purpose / Plan / 自定义专家）
- **不同子代理有不同工具集**：
  - Explore：文件搜索 + 读取 + MCP 工具
  - general-purpose：完整工具集 + 可创建孙子代理（但测试中 Agent 工具不可用）
  - 纪年（专家代理）：独立系统提示 + 独立工具集 + 专属 accumulation 目录
- **子代理可见 workspace 文件**：能读取主 Agent workspace 下的文件
- **多 Agent 独立 workspace**：每个 Agent 有独立 workspace 路径，互不干扰
- **模型异构**：不同 Agent 可配不同模型（如 mino 用 qwen3.6-plus，Downloads 用 gemma-4-26b）
- **跨 Agent 不直接调用**：Agent 之间没有 API 可以互相调用，各自独立

### 不能做什么
- **子代理不能创建孙子代理**：Explore/general-purpose 子代理中没有 Agent 工具
- **纪年专家代理的模型已失效**：配置为 `glm-5.1`，但该模型已不可用（400 错误）
- **子代理不可见主会话的 memory/ 目录**：文件系统隔离，子代理的 `~/.myagents/memory/` 不存在
- **Agent 之间无直接通信机制**：不能从一个 Agent 调用另一个 Agent

### 踩坑
- 纪年子代理调用直接 400 报错：`model 'glm-5.1' is not supported`，需要更新模型配置
- 子代理类型决定工具集，不要用 Explore 做需要写操作的活
- `myagents agent show <id>` 能看到 Agent 的完整有效配置

### 最佳实践
- 探索型搜索用 Explore，需要完整工具用 general-purpose，领域任务用专家代理
- 专家代理定期验证模型可用性，避免模型下线导致失效
- 子代理间通过文件系统交换数据（主 workspace 是共享区）

---

## 三、记忆 & 认知

### 能做什
- **本地记忆**：`memory/` 目录完整体系（MEMORY.md / insights.md / daily / learnings / context / projects），跨会话持久化
- **MemOS（外部记忆）**：
  - `search_memory`：语义搜索，返回事实记忆 + 偏好记忆，带相关度百分比
  - `add_message`：异步写入，返回 task_id，后台处理
- **GetNote（笔记服务）**：
  - `list_notes` / `list_knowledge` / `get_note` / `save_note`
  - 已知 bug：标签返回 `[object Object]` 而非实际字符串
- **Session 持久化**：
  - 975 个 `.jsonl` 会话文件，总大小约 1.1GB
  - 每次对话自动保存，可用于回溯和每日书信等 cron 任务
- **记忆自动更新**：Agent 配置中 `memoryAutoUpdate` 可自动从 session 提取记忆（24 小时周期，可配置阈值和时间窗口）

### 不能做什么
- **子代理看不到主会话的 memory/ 目录**：文件系统级别隔离
- **MemOS 写入是异步的**：不能立即确认写入成功，需轮询
- **GetNote 标签有 bug**：JSON 序列化问题

### 三套记忆系统对比
| 维度 | 本地 memory/ | MemOS | GetNote |
|------|-------------|-------|---------|
| 数据格式 | Markdown 文件 | 向量化语义搜索 | 笔记服务 API |
| 读写速度 | 即时 | 读即时，写异步 | API 延迟 |
| 跨 Agent | 否 | 是（通过 MCP） | 是（通过 MCP） |
| 适用场景 | 项目级持久化 | 个人长期记忆 | 外部笔记归档 |
| 维护成本 | 手动（或 cron） | 自动 | 手动 |

### 踩坑
- 本地 memory/ 和 MemOS 是两套独立系统，不要混用
- 记忆自动更新有 `queryThreshold`（至少 N 次对话才更新），新 Agent 默认 5 次

### 最佳实践
- 项目级记忆存 `memory/`，个人认知记忆存 MemOS
- 重要笔记同步存 GetNote 作为外部备份
- 定期运行 UPDATE_MEMORY cron 维护记忆质量

---

## 四、工具集成

### MCP 服务器
- **已配置 10 个 MCP**，4 个启用：ddg-search、tavily-search、cuse、getnote-mcp
- **禁用但有配置**：playwright、gemini-image、edge-tts、tavily-remote-mcp、mindos、mineru-document-explorer
- **每个 Agent 可独立启用 MCP**：mino 启用 tavily+playwright+mindos，lily 启用 tavily+mindos+getnote，Downloads 启用 tavily+getnote
- **MCP 类型**：stdio（本地进程）和 http（远程 URL）两种

### IM 集成
- **微信**：通过 OpenClaw 插件（openclaw-weixin），mino 和 lily 各有一个微信 channel
- **工具组**：doc、chat、wiki_drive、bitable、calendar、task、sheet、search、common
- **IM Bot 配置**：`imBotConfigs` 数组为空 — **未配置任何 IM Bot 自动响应**
- **`myagents im` 命令**：仅支持 `send-media` 操作，不是完整的 IM 管理命令

### 浏览器自动化
- **Playwright MCP**：已配置但 disabled，需要 `myagents mcp enable playwright` 启用
- **agent-browser skill**：已安装且 enabled，但依赖 Playwright MCP

### 模型提供商
- **7 个模型提供商**：智谱、阿里云百炼（2 个实例）、stepfun、openrouter、本地（MLX）、小米
- **有效验证**：阿里云百炼、智谱、stepfun、本地、custom-stepfun 5 个 valid
- **无效**：minimax、moonshot、openrouter、siliconflow 4 个 invalid

### 心跳机制
- **配置**：activeHours 08:00-22:00，interval 30 分钟，ackMaxChars 300
- **作用**：定时唤醒检查 Agent 活跃度，空闲时段不消耗

### 技能系统
- **13 个已安装 skill**，全部 enabled
- **安装方式**：`myagents skill add` 支持 GitHub URL 或插件名
- **权限模式**：auto / plan / fullAgency / custom（Claude Code）/ default / bypassPermissions / suggest / auto-edit / full-auto / no-restrictions

### 踩坑
- `myagents mcp show <id>` 命令不存在，报错 "Unknown admin route"
- `myagents im --help` 不可用，im 不是独立命令组
- MCP enable/disable 的 `--scope` 参数支持 global/project/both

### 最佳实践
- 不用的 MCP 禁用以节省资源
- 每个 Agent 只启用需要的 MCP，不要全局全开
- IM Bot 需要单独配置，默认只支持 send-media

---

## 五、Runtime 环境

### 三种 Runtime
| Runtime | 模型选择 | 权限模式 | 特点 |
|---------|---------|---------|------|
| **builtin** | 取决于 provider 配置 | auto/fullAgency/custom | Claude Agent SDK，默认 |
| **claude-code** | sonnet/opus/haiku | default/plan/acceptEdits/bypassPermissions | CLI 版本 2.1.90 |
| **codex** | gpt-5.3/5.4 等 Codex 模型 | suggest/auto-edit/full-auto/no-restrictions | OpenAI 模型，版本 0.120.0 |

### 创建任务时的 Runtime 选择
- `myagents task create-direct` 支持 `--runtime` 和 `--model` 参数覆盖默认
- 不指定则继承 Agent workspace 默认配置
- Codex 任务可以用 GPT 模型跑，Claude Agent 用 qwen/claude 跑

---

## 六、能力上限总结

| 维度 | 已知上限 | 未验证边界 |
|------|---------|-----------|
| 并行子代理 | 5 个（建议值） | 实际最大能跑几个 |
| Cron 任务 | 5 个同时运行无冲突 | 数量上限 |
| Session 文件 | 975 个 / 1.1GB | 文件过多是否影响性能 |
| 任务链 | 单次创建→run→done 可 rerun | 任务间数据传递 |
| 记忆容量 | MemOS 相关度 47-55% 匹配 | 上限条目数 |
| MCP 连接 | 10 个配置 / 4 个启用 | 最大连接数 |
| 模型切换 | 7 个 provider 可选 | 运行时热切换 |

---

*实验日期：2026-04-23 | MyAgents 版本：0.1.51*
