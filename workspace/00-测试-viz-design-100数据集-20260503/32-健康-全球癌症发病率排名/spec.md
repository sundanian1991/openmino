# Compiled SPEC — 全球癌症发病率排名

---

## Page: 全球癌症新发病例Top20

- **场景论文**：中国482万例断层第一，占全球近四分之一
- **签名视觉元素**：中国条形Warm高亮+占比标注，其余19国灰化
- **签名视觉元素 source id**：Custom（13-柱状图 + 单线高亮手法）
- **为什么不能简化为默认模板**：需要突出中国作为唯一高亮对象，其余19国灰化处理，标注写"占全球24.1%"而非仅写数字

### 叙事意图

**【可视化目的】**
- 认知缺口：读者可能模糊知道"中国癌症多"，但不知道"482万是美国的2.1倍，占全球四分之一"

**【想传达什么】**
- 核心信息（一句话）：中国新发癌症病例全球断层第一，占全球总量近四分之一

**【结论】**
- 读者应得出的判断：中国癌症负担远超其他国家，即使考虑人口基数，482万绝对值也意味着巨大的公共卫生压力

**【思路】**
- 视觉叙事路径：第一眼看到中国超长条形 → 第二眼看到Top5梯队差距 → 最终理解中国占比24.1%的震撼量级

### 视觉编码

- **X 轴编码**：新发病例数（万例），从0开始
- **Y 轴编码**：国家名称，按病例数降序排列
- **颜色编码**：中国条形 Warm 500（#c26d3a），其余19国 Stone 300（#ada599）灰化
- **大小编码**：所有条形等高，宽度一致

### 数据组织

- **字段清单**：排名、国家、新发病例数（万例）、占全球比例（%）
- **排序规则**：按新发病例数降序
- **聚合规则**：无聚合，原始排名数据
- **数据示例**：中国→482, 美国→227, 印度→142

### 标注策略

- **高亮点（≤10%）**：1个国家（中国）
- **标注内容**：中国条形右侧标注"482万例 占全球24.1%"
- **基准线/参考线**：无

### 入口映射

| 元素 | 视觉处理 | 为什么 |
|------|----------|--------|
| 标题 | 16px/600/Warm 800，顶部居中 | 结论性标题最先被读取 |
| 核心数据区 | 中国条形Warm 500高亮 | 唯一高亮对象立即跳出来 |
| 高亮元素 | 中国条形+右侧标注 | 引导读取具体数值和占比 |
| 次要元素 | 其余19国Stone 300灰化 | 提供对比参照不抢戏 |

### 布局

- **画布**：800 x 550
- **标题区**：顶部，距上20px
- **图表区**：居中，占比75%
- **标注区**：中国条形右侧
- **留白**：四周 ≥20px
- **配色**：Warm + Stone 默认组合

### 图例与辅助

- **图例**：不需要（单高亮对象直接标注）
- **脚注**：来源：WHO/IARC GLOBOCAN 2024 估计数据
- **特殊说明**：X轴从0开始

## Source ID 清单

| 决策 | Source ID | 来源文件 | 说明 |
|------|-----------|----------|------|
| 模式选择 | 13-柱状图 | viz-design SKILL.md §五 分类A | 分类+数值排名对比 |
| 风格选择 | restrained-warm | style-schools.md | 数据报告场景 |
| 配色选择 | Warm + Stone | 13-VISUALIZATION.md | 默认组合，Warm高亮+Stone灰化 |
| 构图选择 | 单图居中 | composition-templates.md | 单图场景 |
| 字体选择 | system-ui sans-serif | typography-moods.md | professional-clear |
| DNA参考 | 内置模式库 | chart-dna-db.md | 排名条形图+单高亮 |

## 渲染委托

**渲染技能**：viz-echarts

## 渲染契约 JSON（机器可读）

```json
{
  "version": "viz-design-spec-v1",
  "renderTarget": "viz-echarts",
  "chartType": "bar_chart",
  "title": "中国新发癌症病例全球断层第一，占全球近四分之一",
  "subtitle": "2024年 · WHO GLOBOCAN 估计数据 · Top20国家",
  "canvas": { "width": 800, "height": 550 },
  "data": {
    "fields": ["国家", "新发病例数（万例）"],
    "series": [
      { "name": "中国", "values": [482], "highlight": true },
      { "name": "美国", "values": [227], "highlight": false },
      { "name": "印度", "values": [142], "highlight": false },
      { "name": "日本", "values": [101], "highlight": false },
      { "name": "巴西", "values": [71], "highlight": false },
      { "name": "德国", "values": [63], "highlight": false },
      { "name": "法国", "values": [53], "highlight": false },
      { "name": "英国", "values": [48], "highlight": false },
      { "name": "俄罗斯", "values": [46], "highlight": false },
      { "name": "意大利", "values": [44], "highlight": false },
      { "name": "韩国", "values": [39], "highlight": false },
      { "name": "墨西哥", "values": [32], "highlight": false },
      { "name": "印尼", "values": [31], "highlight": false },
      { "name": "土耳其", "values": [28], "highlight": false },
      { "name": "西班牙", "values": [27], "highlight": false },
      { "name": "加拿大", "values": [25], "highlight": false },
      { "name": "澳大利亚", "values": [22], "highlight": false },
      { "name": "越南", "values": [20], "highlight": false },
      { "name": "泰国", "values": [19], "highlight": false },
      { "name": "菲律宾", "values": [16], "highlight": false }
    ]
  },
  "visualEncoding": {
    "highlight": [{ "series": "中国", "color": "#c26d3a" }],
    "grayscale": true,
    "maxHighlightRatio": 0.1
  },
  "annotations": [
    { "text": "482万例 占全球24.1%", "target": "中国" }
  ],
  "referenceLines": [],
  "theme": "default",
  "layout": { "padding": { "top": 20, "right": 80, "bottom": 40, "left": 70 } }
}
```
