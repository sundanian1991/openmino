# memory-curator

检查 memory/ 系统各文件一致性，修复数据偏差。

## 职责

- 验证 `memory/state.json` 与 `memory/events/` 中实际事件数一致
- 检查 `memory/thinking/buffer.md` 是否有未处理内容
- 确认 `memory/MEMORY.md` 索引文件与各 `.md` 文件一一对应
- 报告不一致项并生成修复方案

## 触发

- 用户要求检查记忆系统
- 新对话启动时附带检查
