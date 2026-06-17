# 报告模板使用指南

> 本文件告诉 AI 如何使用 assets/templates/ 中的报告模板生成个性化报告。

---

## 核心原则

**模板分两类：成品模板 和 CSS 模板。生成方式完全不同。**

### 成品模板（完整独立 HTML）
这几个模板**有自己的 HTML 结构、类名、布局**，是完整的独立报告骨架。

| 模板 | 结构特点 |
|------|---------|
| `template-loreal.html` | Hero 黑底大标题、Chapter 章节编号、metric-grid 四维指标、priority-block 黑白双色块、skill-grid 三列网格、12 章节 |
| `template-apple.html` | Hero 64px 大标题居中、profile-card 圆形头像+统计、module-stack 圆角灰卡片、compare-wrap 双列对比、kpi-strip 三列指标 |
| `template-nothing.html` | 深色工业风 |
| `template-pentagram.html` | 黑+钴蓝机构风 |

**生成流程（唯一正确方式）：**
1. 读取模板文件
2. 找所有 `{{占位符}}` 并替换为真实数据
3. 直接输出 HTML
4. **不修改模板的 HTML 结构，不提取 CSS 套到其他地方**

对于 `report_template.html` 特有的内容（工作流关联分析、系统视角等），在成品模板中找到最合适的章节手动插入。

### CSS 模板（仅颜色字体）
以下模板**没有自己的 HTML 结构**，只有 `:root` 颜色变量和字体定义。

| 模板 | 特点 |
|------|------|
| `template-original.html` | 奶白底 #faf8f5，衬线字体 |
| `template-hallmark.html` | 橙色 #FC4C02 |
| `template-muller.html` | 白底，零装饰 |

**生成流程：**
1. 读 `assets/report_template.html` 作为结构骨架（类名 `.card`、`.week-section`、`.checklist` 等）
2. 提取选定模板的 `:root` 中的颜色/字体变量
3. 替换到 report_template.html 的 `:root` 中
4. **保留 report_template.html 所有类名不变**
5. 填入真实数据 → 输出

生成流程：读选定模板 → 替换其 `{{占位符}}` → 填入用户真实数据 → 输出。**不能套 report_template.html 的结构。**

### 通用规则

- 不要复制 demo 模板中的示例数据（张明、供应商管理等都是占位内容）
- 生成后必须检查：所有 `{{占位符}}` 是否已替换，0 遗漏

---

## 使用步骤

### 1. 选择模板

根据用户偏好选择模板文件（默认 `template-original.html`）。

### 2. 提取样式系统

读模板 HTML，提取以下内容：

| 提取项 | 用途 |
|--------|------|
| CSS 变量（`:root` 里的 `--xxx`） | 颜色、字体、间距的统一定义 |
| 全局样式（`body`, `html`） | 字体族、字号、行高、背景色 |
| 组件样式（`.card`, `.tag`, `.checklist` 等） | 卡片、标签、清单的视觉规则 |
| 打印样式（`@media print`） | 打印时的特殊处理 |

### 3. 用真实数据生成报告

按以下章节结构生成 HTML，每个章节对应一个 CSS 类：

| 章节 | CSS class / 结构 | 说明 |
|------|-----------------|------|
| 用户画像 | `.profile-table` 或等效表格 | 姓名、部门、岗位、技术背景、容忍度 |
| 工作模块全貌 | `.data-table` | 来源标签（系统/补充）横向排列，区分颜色 |
| 优先改造项 | `.priority-block` + `.priority-block-light` | Buy 用深色块，Build 用浅色块 |
| AgentAI 对照 | `.compare-table` | 两列对比表 |
| Buy/Build 分流 | `.split-list` > `.split-item` | 横向标签布局，Buy/Build/Hold + 状态标签一行展示 |
| 技术栈清单 | `.stack-table` | Skill 名称旁必须有 copy 按钮 |
| Skill 扫描 | `.skill-grid` > `.skill-card` | 三列网格或等效布局 |
| 工具迭代建议 | `.iter-item` | 按容忍度过滤 |
| 定时任务 | `.cron-section` | 平台无关 cron 脚本 + 复制按钮 |
| 周度执行清单 | `.week-section` | W1/W2/W3，可打印复选框 |

### 4. 数据替换规则

| 模板中的占位内容 | 替换为 |
|-----------------|--------|
| 张明 | 用户真实姓名（从 Excel 或对话获取） |
| 服务组 / 供应商管理 | 用户真实部门 |
| 供应商准入材料审核 | 用户的真实工作模块 |
| doc-xlsx, grill-with-docs | 真实匹配的 Skill 名称 |
| 28h / 112h | 真实工时数据 |
| 2026-05-29 | 报告生成日期 |
| MyAgents / JoyClaw（小龙虾） | 保持不变 |
| OpenCode | 统一替换为 JoyClaw（小龙虾） |

### 5. 必须保留的交互功能

```html
<!-- 复选框交互 -->
<div class="cb" onclick="toggleCheck(this)"></div>

<!-- 文本复制按钮 -->
<button class="copy-btn" onclick="copyText('skill-name', this)">copy</button>

<!-- 代码块复制 -->
<button class="code-copy-btn" onclick="copyCodeBlock(this)">copy</button>

<!-- 对应 JS -->
<script>
  function toggleCheck(el) { el.classList.toggle('checked'); }
  function copyText(text, btn) {
    navigator.clipboard.writeText(text).then(function() {
      btn.textContent = 'copied';
      btn.classList.add('copied');
      setTimeout(function() { btn.textContent = 'copy'; btn.classList.remove('copied'); }, 1500);
    });
  }
  function copyCodeBlock(btn) {
    var code = btn.parentElement.textContent.replace('copy', '').trim();
    navigator.clipboard.writeText(code).then(function() {
      btn.textContent = 'copied';
      btn.classList.add('copied');
      setTimeout(function() { btn.textContent = 'copy'; btn.classList.remove('copied'); }, 1500);
    });
  }
</script>
```

---

## 各模板风格差异

| 模板 | CSS 变量特点 | 布局特点 |
|------|-------------|---------|
| original | 奶白底 #faf8f5，衬线字体 | 卡片式，圆角 12px |
| nothing | 深灰 #333 底，Space Grotesk 字体 | 工业风仪表盘，大数字指标 |
| hallmark | 白底，signal orange #FC4C02 | 编辑式排版，粗衬线标题 |
| muller | 白底，零装饰 | 瑞士网格，严格对齐 |
| pentagram | 黑 + 钴蓝 #003DA5 | 粗体机构风，大标题 |
| apple | 白底，SF Pro 字体 | 产品页风格，超大间距 |
| loreal | 黑 #000 底 + 红 #D70015 | 章节结构（Chapter 01-N），横向标签 |

---

## 注意事项

1. 不要在报告中使用 emoji（用 CSS 绘制的图形替代）
2. 报告必须打印友好（`@media print` 样式）
3. Skill 安装引导文字格式：

```
安装方法：打开 JoyClaw（小龙虾）→ Skill 商店 → 搜索「[skill-name]」→ 点击安装
```

4. 平台命名统一使用「JoyClaw（小龙虾）」，不使用 OpenCode 或 WorkBuddy
