# Workspace 项目组织规范 (SOP)

## 1. 核心原则
所有在 `workspace/` 下启动的实质性项目（周期 $> 3$ 次往返），必须采用“标准骨架”进行管理。禁止散乱存放文件，必须实现“目标 $\to$ 决策 $\to$ 状态”的闭环。

## 2. 标准骨架定义
项目文件夹必须包含以下三个拦截文件：
- `README.md`：定义项目 Target、Context 和 Constraints。
- `DECISIONS.md`：记录关键取舍方案（Decision Log）。
- `STATE.md`：作为项目状态拦截器（Loop-State），记录当前任务、变更日志和下一步计划。

## 3. AI 执行拦截流 (Mandatory)
AI 在处理 `workspace` 项目时必须执行以下动作：

### 启动阶段 (Init)
1. **检查**：进入项目目录后，立即检查三个骨架文件是否存在。
2. **补齐**：若缺失，必须调用 `.codex/templates/workspace-project/` 下的模板立即补齐。
3. **对齐**：优先读取 `STATE.md` 的 `Next Steps` $\to$ 读取 `README.md` 的 `Target` $\to$ 确定本次执行目标。

### 执行阶段 (Process)
1. **记录**：产生关键方案取舍时，实时更新 `DECISIONS.md`。
2. **同步**：每完成一个阶段性任务，更新 `STATE.md` 的 `Change Log`。

### 结束阶段 (Closing)
1. **状态截断**：在本次 session 结束前，必须更新 `STATE.md` 的 `Current Task` 和 `Next Steps`。
2. **状态确认**：向用户汇报：“已更新 `STATE.md`，下次接续点为 [XXX]”。

## 4. 违规定义
- 仅有代码/文档而无 `STATE.md` $\to$ 定义为“状态丢失”，AI 必须主动提示并补齐。
- 目标发生变更但未更新 `README.md` $\to$ 定义为“目标漂移”，AI 必须触发对齐请求。
