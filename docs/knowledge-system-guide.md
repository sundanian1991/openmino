# 知识库系统操作规程

> 本文档定义 memory/ 知识体系的日常使用规则。面向 Mino（AI 协作者），规定何时写、写在哪、怎么整理。

---

## 一、系统全景

### 1.1 七文件夹结构

```
memory/
├── projects/              # 项目信息（项目文档 + 关键人画像）
│   ├── 关键人画像/         # 人员档案（上级/供应商/同事）
│   └── *.md               # 各项目文档
├── decisions/             # 独立决策记录 ⭐
│   └── 2026/              # 按月归档
├── meetings/              # 会议提取记录 ⭐
│   ├── TEMPLATE.md        # 4类提取模板
│   └── 2026/              # 按月归档
├── daily/                 # 每日工作日志
├── daily-letter/          # 每日手札/偏好记录
├── topics/                # 知识主题
│   ├── 工作方法/           # 方法论、框架
│   ├── 工作规范/           # 制度、规则、标准
│   ├── 年老师画像/         # 深度用户画像
│   ├── 年老师知识体系/      # 按领域分类（供应商运营/团队管理/技术探索/个人成长/行业认知）
│   ├── cognitive-contract.md  # 认知协议（Agent 运行时自检）
│   ├── design-philosophy.md   # 设计哲学
│   └── _archive/          # 旧版归档
├── events/                # 关键事件（JSON 格式）
├── thinking/              # 思考过程（buffer 实时落盘 + 错题本 + journal）
├── learnings/             # 经验教训（insights 完整版 + 归档子集）
├── conversations/         # 对话摘录
└── archive/               # 归档内容
    ├── 供应商画像/          # 18家完整档案
    ├── opinions/           # 信念地图 OPINIONS.md
    ├── projects/           # 已完成项目方法论
    ├── conversations-2026-01至06/  # 早期对话
    ├── daily-早期/         # 早期日志
    └── daily-letter-2026-04至06/  # 早期手札
```

每个目录都有 `README.md` 索引（MOC = Map of Content），标注内容清单和跨目录链接。

### 1.2 身份文件（三层、不合并）

| 层级 | 路径 | 何时读取 |
|:---|:---|:---|
| 当前主文件 | `.codex/rules/` (01-SOUL, 02-COLLAB, 03-OUTPUT, 04-HONESTY, 05-AI-METH, MEMORY-L1) | 每次会话启动自动加载 |
| 工作上下文 | `.codex/workspace/Rules/` (about-me, work-detail, write-style, ai-methodology) | 会话启动时读取 |
| 原始深度版 | `.claude/reference/` (03-USER 445行, 00-IDENTITY-PUSH, honesty-constitution 等) | 需要深度理解时按需读取 |
| 简洁骨架 | `.claude/rules/` (02-SOUL, 03-USER, 04-MEMORY) | 备用/校验 |

---

## 二、什么时候写 buffer

### 2.1 触发条件（与 WAL 协议一致）

以下情况**立即**写入 `memory/thinking/buffer.md`：

| 信号 | 写什么 | 类型标注 |
|:---|:---|:---|
| 年老师做了一个决定 | 决定内容 + 理由 | [决策] |
| 年老师表达了一个偏好 | 偏好的具体描述 | [偏好] |
| 出现了一个新人物/公司 | 人物/公司关键信息 | [线索] |
| 发现一个错误或异常 | 错误描述 + 影响范围 | [异常] |
| 年老师说了一句重要的原话 | 原话（加引号标注） | [原话] |
| 发现一个值得复用的方法论/洞察 | 具体内容 | [线索] |

### 2.2 不写 buffer 的情况

- 闲聊、无信息量的对话
- 已有完整记录的重复信息
- 纯技术问题（文件路径、命令参数等）

### 2.3 格式

```
- YYYY-MM-DD HH:MM | [类型] 内容
```

示例：
```
- 2026-07-15 14:30 | [决策] 金条供应商排名改用新公式：业绩权重从35%→40%，合规从20%→15%。理由：Q2出现业绩高但合规风险大的案例。
```

---

## 三、每日自动整理（10:00 AM）

### 3.1 触发机制

- **工具**：macOS LaunchAgent `com.mino.daily-memory-organize`
- **时间**：每日 10:00（次日上午，年老师已开机）
- **脚本**：`scripts/daily-memory-organize.sh` → 调用 Claude Code 按 `scripts/daily-memory-organizer.md` 执行

### 3.2 6 步流程

```
① 读取 buffer.md
② 逐条分类（决策→decisions/ | 人物→people/ | 会议→meetings/ | 洞察→topics/ | 日常→daily/）
③ 写入目标目录
④ 更新各目录 MOC 索引
⑤ 清空已处理条目
⑥ 输出整理摘要
```

### 3.3 与每周维护的关系

| | 每日整理 | 每周维护 |
|:---|:---|:---|
| 频率 | 每天 10:00 | 每周日 |
| 深度 | 分类归档 | 去重 + insights 升级 |
| 产出 | 分布式归档 | MEMORY.md 更新 |

---

## 四、会议信息提取

### 4.1 适用范围

- 供应商月度复盘会议
- 联盟培训/分享会
- 内部跨团队协同会议
- 任何产生决策或承诺的讨论

### 4.2 提取模板

见 `memory/meetings/TEMPLATE.md`。每次提取 4 类核心信息：

1. **决策**：决定了什么 + 为什么
2. **承诺**：谁答应做什么 + 截止时间
3. **人员观察**：参会人的偏好/习惯/态度变化
4. **洞察**：新框架 / 战略变化 / 反常识信息

### 4.3 存放路径

```
memory/meetings/2026/YYYY-MM-DD-会议名.md
```

原始转写/录音保留为溯源证据。

---

## 五、MOC 索引维护规则

### 5.1 写入即更新

每创建或更新一个目录内的文件，**必须同步更新该目录的 README.md**：
- 追加到"按时间倒序"列表
- 如果有对应主题，追加到"按主题索引"

### 5.2 跨目录链接

4 条固定链接规则（在 MOC 中体现）：

| 链接 | 方向 | 标注方式 |
|:---|:---|:---|
| people ↔ companies | 关键人 → 供应商画像 | 在 people 的 README 中链接 |
| meetings ↔ decisions | 会议 → 决策记录 | 在 meeting 文件中交叉引用 |
| projects ↔ decisions | 项目 → 相关决策 | 在项目文件中链接 |
| daily ↔ meetings | 日志 → 会议记录 | 在 daily 文件中链接 |

---

## 六、会话启动时的检查清单

Mino 每次会话**开始**时（按 AGENTS.md 启动流程）：

1. ✅ 读 `.codex/rules/` 核心规则（自动加载）
2. ✅ 读 `.codex/workspace/Rules/` 工作上下文（自动加载）
3. ✅ 读 `memory/state.json` + `MEMORY-L1.md`（自动加载）
4. 🔍 **检查 buffer.md**：如果有待处理条目（不是只有头部），在回复最开头提一句：
   > "⚠️ buffer 中有 N 条未整理内容，本次对话结束后将自动分类。"
5. 🔍 **检查 todo.md**：如果有待办，同样在开头提及。

---

## 七、常见问题

### Q: 一条信息同时属于多个目录怎么处理？

**A**: 写入最相关的那个目录，在其他目录的 MOC 中加交叉引用链接。不要复制内容到两个地方。

示例：一个供应商月度复会的决策
- 主写入：`meetings/2026/2026-07-20-monthly-review.md`
- 决策同步：`decisions/2026/2026-07-20-xxx.md`
- MOC 链接：decisions/README.md 中标注"来源于 meeting/2026-07-20"

### Q: buffer 满了怎么办？

**A**: buffer 不会"满"。每日整理会清空已处理条目。如果一个条目连续 3 天未被分类（cron 未能识别），需要人工确认归类。

### Q: 历史决策怎么迁移？

**A**: 不要一次性迁移。MEMORY.md 中的"关键决策"表格保留作为总索引。只有当需要查看某条决策的完整上下文时，才从 MEMORY.md 中提取并写入 `decisions/` 独立文件。

### Q: 供应商画像有重复（archive/ + projects/关键人画像/）怎么办？

**A**: 不合并、不删除。`archive/供应商画像/` 是详细档案（18家完整图像），`projects/关键人画像/供应商/` 是关系维度的快速参考。两者内容互补而非重复，MOC 链接处理。

---

## 八、目录使用速查表

| 我要存… | 存到哪 | 格式 |
|:---|:---|:---|
| 一个决策 | `decisions/YYYY/YYYY-MM-DD-主题.md` | 独立文件，含背景/理由/预期 |
| 一场会议 | `meetings/YYYY/YYYY-MM-DD-会议.md` | TEMPLATE.md 的 4 类模板 |
| 一个人的人物画像 | `projects/关键人画像/分类/姓名/档案.md` | 追加或新建 |
| 一个供应商详细档案 | `archive/供应商画像/公司名.md` | 完整档案 |
| 一条日常记录 | `daily/YYYY-MM-DD.md` 或 `daily-letter/` | 按日期 |
| 一个洞察/方法论 | `topics/工作方法/主题.md` 或 `learnings/insights.md` | 追加或新建 |
| 一条待处理的临时信息 | `thinking/buffer.md` | `- YYYY-MM-DD HH:MM \| [类型] 内容` |

---

*最后更新：2026-07-15 — 知识库体系建立，Dan Martell 对标验证完成*
