# Compiled Spec — 京东科技 2026 新客服节申报材料

## Site Tokens

```css
--bg: #FFFFFF;
--bg-subtle: #F5F5F5;
--text: #1A1A1A;
--text-secondary: #666666;
--text-tertiary: #999999;
--accent: #E2231A;
--border: #E0E0E0;
--border-strong: #CCCCCC;
--page-w: 720pt;
--page-h: 405pt;
--pad-x: 48pt;
--font: Arial, "Microsoft YaHei", sans-serif;
```

---

## 全局页面框架

```css
body {
  width: 720pt;
  height: 405pt;
  margin: 0;
  padding: 0;
  background: #FFFFFF;
  font-family: Arial, "Microsoft YaHei", sans-serif;
  display: flex;
}

.content {
  margin: 20-36pt 48pt 0;  /* 视页面内容密度调整 */
  width: calc(100% - 96pt);
}

.page-header {
  position: absolute;
  top: 12pt;
  left: 48pt;
  display: flex;
  align-items: center;
  gap: 8pt;
}

.page-num {
  font-size: 11pt;
  font-weight: 700;
  color: #E2231A;
}

.page-label {
  font-size: 11pt;
  font-weight: 500;
  color: #666666;
}

.title-bar {
  margin-bottom: 6-12pt;
  padding-bottom: 3-5pt;
  border-bottom: 3px solid #E2231A;
}

.title-text {
  font-size: 16-22pt;
  font-weight: 700;
  color: #1A1A1A;
}

.footer {
  position: absolute;
  bottom: 12pt;
  left: 48pt;
  right: 48pt;
  display: flex;
  justify-content: space-between;
  font-size: 8pt;
  color: #999999;
}
```

---

## 通用组件

### 数据数字
```css
.stat-number, .result-number {
  font-size: 20-32pt;
  font-weight: 700;
  color: #E2231A;
  line-height: 1;
}

.stat-label, .result-label {
  font-size: 8-10pt;
  color: #666666;
  margin-top: 2-4pt;
}
```

### 双列布局
```css
.two-col {
  display: flex;
  gap: 20-32pt;
}
.col { flex: 1; }
```

### 引用块/注释框
```css
.note-box, .channel-note, .inspiration-note {
  padding: 5-10pt;
  background: #F5F5F5;
}
.note-box p {
  font-size: 7-10pt;
  color: #666666;
}
```

### 列表项
```css
.key-item, .people-item, .info-item {
  padding: 3-4pt 0;
}
```

---

## Page Specs（实际最终值）

### P1: 封面
- 布局：flex 垂直居中
- 主标题：28pt 深灰，"最佳实践"16pt 红色
- 副标题：14pt 中灰
- 公司名：14pt 深灰加粗
- 无页眉页脚

### P2: 企业介绍
- 布局：双栏（左35%/右65%）
- 企业名称：20pt 加粗
- SLOGAN：10pt 中灰
- 愿景/价值观：8pt 中灰
- 基本信息：label 7pt 浅灰，value 9pt 深灰
- 信息间隔：1px 灰色横线

### P3: 呼叫中心现况简介
- 布局：顶部3列数字 + 表格 + 底部说明
- 关键数字：28pt 红色加粗
- 标签：9pt 中灰
- 表格：header 9pt 灰色底，body 9pt
- 底部说明：9pt 灰色引用块

### P4: 呼叫中心组织架构
- 布局：垂直层级（1→2→3）
- L1 节点：11pt 加粗，黑底白字
- L2 节点：11pt 加粗，浅灰底
- L3 节点：10pt 加粗，白底
- 节点详情：8pt
- 连接线：2pt 红色，8pt 高

### P5: 客服转型背景与战略目标
- 布局：左右对比 + 中间箭头
- 挑战块：浅灰底，标题13pt，内容11pt
- 目标块：红色2px边框，标题13pt红色，内容11pt加粗
- 箭头：28pt 红色
- 底部驱动说明：10pt 中灰

### P6: 客服转型实施过程
- 布局：4列等宽卡片
- 卡片：灰色1px边框，padding 16pt 14pt
- 序号：22pt×22pt 红色圆形，白字 11pt
- 阶段标题：12pt 加粗
- 子项标签：8pt 浅灰加粗
- 子项内容：9pt 中灰

### P7: 客服转型具体成果
- 布局：6宫格 + 底部3栏
- 数据数字：20pt 红色加粗
- 数据标签：8pt 中灰
- 维度卡片：浅灰底，标题10pt加粗，内容8pt

### P8: 客服转型的成功关键
- 布局：纵向5条 + 底部引用块
- 序号：11pt 红色加粗
- 标题：9pt 加粗
- 解释：8pt 中灰
- 底部启发：7pt 灰色引用块

### P9: 组织变革与人才培养
- 布局：双栏对比
- 栏目标题：左浅灰底/右红底白字，11pt加粗
- 条目标题：10pt 加粗（右栏红色强调）
- 条目描述：8pt 中灰

### P10: 下一步计划
- 布局：2×2网格
- 卡片：灰色1px边框，红色左边框4pt
- 序号：18pt 红色加粗
- 标题：10pt 加粗
- 描述：8pt 中灰
- 高亮卡片：红底白字反色

### P11: 结束页
- 布局：flex 垂直居中
- THANKS：48pt 红色加粗，字间距6pt
- 公司名：14pt 深灰加粗
- 副标题：10pt 浅灰
- 顶部/底部：4pt 红色横线
- 无页眉页脚

---

## External Library Decision

- 不使用外部库，纯 CSS 布局
- 输出格式：HTML → PptxGenJS → PPTX
- 无动画需求（静态展示）

---

## Quality Check

- [x] 11 页完整（封面 → 结束页）
- [x] 颜色体系一致（白底+京东红#E2231A+灰阶）
- [x] 字体：Arial + Microsoft YaHei（web-safe）
- [x] 所有文本包裹在 `<p>` 标签中（html2pptx 要求）
- [x] `<p>` 元素无 border/background（移到 wrapper div）
- [x] 每页内容不溢出 405pt 高度
- [x] 无 emoji、无渐变、无圆角
- [x] 红色使用克制
- [x] 生成 PPTX 288KB，11 页
