# 2026-07-15 - 七文件夹知识体系重组

**决策**：按 Dan Martell 七文件夹模型重组 memory/ 目录结构
**决策人**：年与 Mino 共同确认

**背景**：
对比 Dan Martell 的 AI 大脑体系后，发现现有结构是"散+重"——内容不缺，缺的是跨目录链接、标准化提取模板和日级整理节奏。

**备选方案**：
- A. 完全重建，按 Dan 模型从零搭建（否决：成本太高，现有内容已丰富）
- B. 维持现状，只加 buffer 写入（否决：没有改善检索准确率）
- C. 不搬移、加结构、补索引（采用：最小破坏，最大收益）

**选择理由**：原内容留在原位不动，只新增 decisions/ 和 meetings/ 两个目录 + 补全 MOC 索引 + 配置每日整理 cron。

**具体改动**：
1. 新建 memory/decisions/ 目录（含 README MOC）
2. 新建 memory/meetings/ 目录（含 TEMPLATE.md + README MOC）
3. 为 10 个已有目录补 MOC README.md
4. 配置 LaunchAgent `com.mino.daily-memory-organize` 每日 10:00 自动整理
5. 更新 MEMORY.md 记录新结构

**预期后果**：AI 检索准确率提升（单次问答减少重复提问），会议信息有标准提取格式。

**后续验证**：下周验证 buffer 是否有条目被正确分类、decisions/ 和 meetings/ 是否被写入。
