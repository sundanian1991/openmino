# voice-workstation 项目

> 创建：2026-07-22
> 最后更新：2026-08-17（园丁下放 buffer：教练化决策 07-19/07-20）

---

## 项目概述

**名称**：语音工作站 (Voice Workstation)
**位置**：`~/Documents/projects/voice-workstation/`
**定位**：个人效率工具 — "说出来的事，立刻变成可用的工作成果"
**技术栈**：Electron 39 + React 19 + TypeScript + Tailwind + Sherpa-ONNX

---

## 核心功能

- **练**：8 种场景化表达训练（自由训练、材料讲解、汇报演练等）
- **写**：5 种口述成文（报告、方案、邮件、汇报稿、日志）
- **记**：会议纪要 + 待办追踪 + 未决问题

---

## 里程碑

| 里程碑 | 状态 | 说明 |
|--------|------|------|
| M1 产品设计 | ✅ | 完成 |
| M2 技术骨架 | ✅ | 完成 |
| M3 训练模式 | ✅ | 完成 |
| M4 文档模式 | ✅ | 完成 |
| P1 词库扩充 + 热词系统 | ✅ | 填充词119、犹豫词106、笼统词86、情绪词519 |
| P2 云端 ASR | ✅ | mimo-v2.5-asr 双模式 |
| P3 UI 增强 | ✅ | 分层深度体系、顶栏重设计 |
| 代码重构 | ✅ | 2026-07-22 完成 |
| P4 布局统一 + 组件库 | ✅ | 2026-07-29 完成 |
| P5 商业化 UI 优化 | 🚧 | 进行中（视觉精细化、微交互、品牌感） |

---

## 代码架构（2026-07-22 重构后）

```
src/main/
├── index.ts              # 主进程入口（901 行）
├── engine/
│   ├── asr.ts            # ASR 引擎（425 行）
│   ├── ai-backend.ts     # AI 后端
│   ├── recorder.ts       # 原生录音器
│   └── prompts/          # Prompt 模板
├── ipc/
│   ├── ai-handlers.ts    # AI IPC handlers（352 行）
│   ├── data-handlers.ts  # 数据 IPC handlers（163 行）
│   └── settings.ts       # 设置 IPC handlers

src/renderer/src/
├── hooks/
│   ├── useRecordingSession.ts  # 三模式共用录制 hook（305 行）
│   └── useTrainSession.ts      # 训练专属 hook（574 行）
├── components/
│   ├── OrganizingView.tsx      # 整理中 UI（126 行）
│   ├── VersionHistoryPanel.tsx # 版本管理面板（98 行）
│   ├── RecordingSession.tsx    # 统一录制组件
│   ├── DataBoard.tsx           # 数据看板
│   └── ProgressChart.tsx       # 进步曲线
├── modes/
│   ├── TrainMode.tsx    # 训练模式（1342 行）
│   ├── DocMode.tsx      # 文档模式（1012 行）
│   └── MeetingMode.tsx  # 会议模式（1144 行）
```

---

## 关键决策

| 日期 | 决策 | 原因 |
|------|------|------|
| 2026-07-19 | 教练化改造方向：评测→教练 | 4 能力原子（诊断/示范/激励/成长）；视觉：森林绿 #4A6741 + 琥珀 #D49B5C，三字体 Playfair Display / Inter / JetBrains Mono |
| 2026-07-20 | 教练化 1.0+S5 验收（71 项检查覆盖 10 模块） | S1 实时反馈用纯音频 4 规则（停顿/能量/语调/频次），8 秒间隔 + 10 秒窗口 |
| 2026-07-22 | TrainMode 不迁移到 useRecordingSession | 训练专属逻辑多，迁移风险大收益小 |
| 2026-07-22 | asr.ts 不拆分 | 425 行可管理，函数间共享状态多 |
| 2026-07-22 | AI 反馈 prompt 不调优 | 已经相当完善，调优是长期迭代 |
| 2026-07-29 | 提取 PageContainer 组件 | 统一所有模式的布局结构，减少重复代码 |
| 2026-07-29 | 创建 LoadingSpinner/ConfirmDialog/Skeleton | 统一组件库，提升开发效率和一致性 |

---

## 已知问题

- 三模式的 organizing useEffect 仍各写一份（可下沉到 hook）
- 三模式的 processing UI 结构相似（可提取组件）
- TrainMode 仍用旧 useTrainSession hook

## 商业化 UI 优化方向（2026-07-29）

**已完成**：
- PageContainer 组件（统一布局）
- LoadingSpinner 组件（统一加载状态）
- ConfirmDialog 组件（确认对话框）
- Skeleton 组件（骨架屏）
- format.ts 工具函数（统一时间格式化）
- animations.css 动画系统

**待优化**：
- 视觉精致度：卡片阴影、圆角、边框需要更细腻
- 微交互：hover效果、点击反馈不够丰富
- 品牌感：缺少独特的品牌视觉元素（logo、品牌色）
- 细节处理：文字大小、行高、字间距需要调整
- 可访问性：键盘导航、颜色对比度需要完善

**商业化标准**：
- 参考 Notion、Linear、Figma 等产品的 UI
- 每个像素都经过精心设计
- 微交互丰富且一致
- 品牌视觉识别度高

**设计资源（2026-08-01）**：
- 安装了 Refero MCP（styles.refero.design），200+精选设计系统目录
- 可用自然语言搜索匹配风格，生成 DESIGN.md
- 待用 Refero 搜索适合语音工作站的深色科技风设计

**森林绿色科技风 DESIGN.md（2026-08-07）**：
- 生成 `workspace/voice-workstation-DESIGN.md`，基于 Linear 设计系统拆解适配
- 画布 `#090c0a`（绿调深黑）、主色 `#22c55e` Forest Green
- 保留 Linear 精密仪器哲学：发丝边框、内阴影、4级表面阶梯、三半径词汇表
- 新增语音工作站专属组件：波形可视化器、录音指示器
- 完整 CSS Variables + Agent Prompt Guide

**Refero MCP 接入 MyAgents（2026-08-07）**：
- 已添加到 `~/.myagents/config.json`（全局 + voice-workstation agent）
- 待重启 MyAgents 后生效，可用 `refero_search → refero_get → design_md` 链路

---

## 参考资料

- `VOICE-GOALS.md` — 项目路线图
- `README.md` — 产品说明
- `plans/voice-workstation-产品设计-2026-07-20/` — 产品设计计划
