---
name: note-slides
description: 将文章、笔记或网页内容转换为结构化演示文稿的脚本工具集。支持从 Markdown / HTML / 文本提取素材、校验幻灯片计划、检查生成后的 HTML 卡组，以及打包核心文件。
---

# Note Slides

note-slides 提供从原始素材到成品幻灯片卡组的完整中间层脚本，用于支持文章/笔记/网页内容 → 结构化演示稿的工作流。

## 脚本说明

### prepare_source.py
从输入文件（Markdown / HTML / 纯文本）提取并结构化素材。

- 解析标题、作者、发布时间、来源 URL 等元信息
- 将正文分割为语义块（标题、问题、段落）
- 自动识别信号：包含数字的段落、疑问句、重点句
- 检测微信验证页干扰并告警
- 输出标准 `source.json`，供后续步骤使用

### check_plan.py
校验幻灯片计划 `deck.plan.json` 的质量与合规性。

- 检查幻灯片数量与布局多样性
- 验证必填字段：sourceIds、sourceLabel、screenLabel、point、anchor
- 检测 L9（三栏标题）布局的过度使用
- 识别模糊/空洞的引导语（如"最该带走的是"）
- 校验长卡组是否在结尾包含总结页

### check_deck.py
检查生成的 HTML 幻灯片是否符合技术规范。

- 验证 `<section>` 标签的 `data-theme`、`data-screen-label`、`data-source` 属性
- 检测占位符、TODO、禁用表达（如 `---` 破折号）
- 检查布局一致性：统计块、三栏布局、表格的混用预警
- CSS 限制：禁止 `aspect-ratio`，`font-size` 需使用 `clamp()`
- 检测导航脚本、进度持久化、图片包裹结构

### pack_core.py
打包核心技能文件到独立输出目录。

- 复制白名单文件与目录（`.gitignore`、`LICENSE`、`README.md`、`SKILL.md`、`template.html`、`references`、`scripts`）
- 排除构建产物（`output/`、`dist/`、`__pycache__`、`.pyc` 等）
- 可选：初始化 Git 仓库并提交

## 使用流程

1. `prepare_source.py -i <input.md>` → 生成 `source.json`
2. 编写 `deck.plan.json`（基于 source 中的候选块设计幻灯片）
3. `check_plan.py -p deck.plan.json -s source.json` → 校验计划
4. 生成 HTML 幻灯片卡组
5. `check_deck.py -i <output.html>` → 校验成品
6. `pack_core.py --output <dir>` → 打包核心文件
