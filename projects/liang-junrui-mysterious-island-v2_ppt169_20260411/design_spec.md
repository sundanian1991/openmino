# 神秘岛好书分享 - Design Spec

## I. Project Information

| Item | Value |
|------|-------|
| **Project Name** | liang-junrui-mysterious-island-v2 |
| **Canvas Format** | PPT 16:9 (1280x720) |
| **Page Count** | 8 |
| **Design Style** | General Versatile — 儿童友好视觉 |
| **Target Audience** | 二年级小朋友（7-8岁） |
| **Use Case** | 六年级学生给低年级做《神秘岛》好书分享 |
| **Created Date** | 2026-04-11 |

---

## II. Canvas Specification

| Property | Value |
|----------|-------|
| **Format** | PPT 16:9 |
| **Dimensions** | 1280 x 720 px |
| **viewBox** | `0 0 1280 720` |
| **Margins** | 左右 50px，上下 40px |
| **Content Area** | 1180 x 640 px |

---

## III. Visual Theme

### Theme Style

- **Style**: 儿童友好视觉型 — 明亮、圆角、大字号、Emoji装饰
- **Theme**: 浅色主题（纯白底 + 活泼色彩）
- **Tone**: 温暖、冒险、有趣，适合7-8岁孩子

### Color Scheme

| Role | HEX | Purpose |
|------|-----|---------|
| **Background** | `#FFFFFF` | 页面背景 |
| **Secondary bg** | `#F0FAF9` | 卡片/区块背景 |
| **Primary** | `#2ec4b6` | 标题色、主装饰 |
| **Accent** | `#ff9f1c` | 强调色、关键词高亮 |
| **Secondary accent** | `#ffbf69` | 次强调、装饰元素 |
| **Body text** | `#333333` | 正文 |
| **Secondary text** | `#666666` | 辅助说明 |
| **Tertiary text** | `#999999` | 页码、脚注 |

### Decorative Elements

- 圆角装饰圆圈（Primary/Accent 色，半透明）
- 彩色圆点散布（增加童趣感）
- 每页顶部 4px 彩色横条（Primary 色）
- 页面右下角页码圆角方块（Primary 色）

---

## IV. Typography System

| Level | Font | Size | Weight | Used For |
|-------|------|------|--------|----------|
| Cover Title | Microsoft YaHei | 72px | 700 | 封面书名 |
| Page Title | Microsoft YaHei | 44px | 700 | 每页标题 |
| Subtitle | Microsoft YaHei | 22px | 400 | 副标题 |
| Body | Microsoft YaHei | 22px | 400 | 正文（适合二年级阅读） |
| Small text | Microsoft YaHei | 16px | 400 | 标注、页码 |
| Highlight | Microsoft YaHei | 26px | 700 | 关键词加粗 |

---

## V. Layout Principles

- **Header**: 4px 顶部彩色横条
- **Content**: 标题区（顶部）+ 内容区（中部）+ 留白
- **Footer**: 页码（右下角，16px，Primary 色圆角方块）
- **Spacing**: 元素间距 20-30px
- **Cards**: 圆角 16px，浅背景色，无边框或 1px 浅灰边框
- **Layout modes**: 居中、三列、四列、时间线、对比

---

## VI. Icon Usage Spec

- **Source**: Emoji 字符
- **Size**: 40-60px 作为装饰图标
- **Recommended icons**:
  - 📖 阅读/书籍
  - 🏝️ 岛屿
  - 🧠 聪明/大脑
  - ⚓ 航海
  - 🔥 火/生存
  - 🏠 房屋/家园
  - ⭐ 勇敢/星星
  - 🌊 海洋
  - 🎬 冒险/电影
  - 💡 知识/灯泡
  - 💪 勇敢/力量
  - 🤝 团结/合作

---

## VII. Chart Reference List

无数据图表需求。

---

## VIII. Image Resource List

不使用外部图片，纯 SVG + Emoji。

---

## IX. Content Outline

### Page 1 — 封面

- **Layout**: 居中 + 右侧装饰圆
- **Title**: 神秘岛
- **Subtitle**: 一本让你不想放下的冒险书
- **Info**: 六年级12班 梁峻睿 · 给二年级小朋友的好书分享
- **装饰**: 右侧大圆圈 + 散布小圆点

### Page 2 — 关于这本书

- **Layout**: 左侧文字 + 右侧装饰
- **Title**: 关于这本书 📖
- **Content**:
  - 作者：儒勒·凡尔纳（法国）
  - 类型：冒险小说
  - 一句话：五个遇难的人，飘到荒岛，用双手建起了家园！
- **装饰**: Emoji 🏝️ 🌊 📖

### Page 3 — 故事背景

- **Layout**: 全宽信息块 + 要点列表
- **Title**: 故事是怎么开始的？
- **Content**:
  - 一场大风暴 ⛈️
  - 五个遇难的人被冲上了荒岛
  - 什么都没有 — 没有食物、没有房子、没有人来接
  - 但他们说："我们一起努力！"
- **装饰**: ⛈️ 🏝️ 💪

### Page 4 — 人物图鉴

- **Layout**: 2x3 卡片网格
- **Title**: 认识岛上的英雄们 ⭐
- **Cards**:
  1. 🧠 史密斯工程师 — 聪明的大脑，什么都知道
  2. ⭐ 小托普 — 勇敢的小男孩，和你差不多大
  3. 📝 记者史佩莱 — 会讲故事的人
  4. ⚓ 水手潘克洛夫 — 航海高手
  5. 🍳 黑人纳布 — 厨艺大师
  6. 🤝 艾尔通 — 后来加入的伙伴

### Page 5 — 冒险旅程（时间线）

- **Layout**: 四步时间线
- **Title**: 从一无所有到建起家园 🏠
- **Steps**:
  1. 🔨 搭帐篷 — 用树枝和帆布搭了一个临时小家
  2. 🌾 找食物 — 打猎、种庄稼、还驯养了动物
  3. 🧱 造房子 — 用石头和泥土建了坚固的住所
  4. 🚢 造大船 — 有了砖窑、电报，还造了一艘船！

### Page 6 — 最精彩的故事

- **Layout**: 两列对比卡片
- **Title**: 最让你尖叫的情节！😱
- **Content**:
  - **左边**: 🔥 岛上突然来了一个神秘人！他是谁？从哪里来？
  - **右边**: 🐕 他们还有一只忠诚的狗，叫托普！
  - **底部**: 尼摩船长出现了！原来岛上有更大的秘密……

### Page 7 — 学到的道理 + 互动

- **Layout**: 上半部分三个道理卡片 + 下半部分互动问题
- **Title**: 读完这本书，我学到了……
- **Cards**:
  1. 💪 学会勇敢 — 遇到困难不放弃
  2. 🤝 团结力量大 — 五个人一起才能成功
  3. 💡 知识就是力量 — 工程师的知识救了所有人
- **互动问题**: 如果你也到了荒岛上，你最想带什么？

### Page 8 — 结尾

- **Layout**: 居中
- **Title**: 谢谢大家！
- **Subtitle**: 你们也想登上神秘岛吗？
- **CTA**: 快去读《神秘岛》吧！📖
- **Info**: 分享人：六年级12班 梁峻睿

---

## X. Speaker Notes Requirements

- 总时长：约 5 分钟
- 风格：亲切、互动、口语化（面向二年级）
- 每页 30-45 秒

---

## XI. Technical Constraints

- SVG 生成，每页 1280x720
- Emoji 使用 `font-family="Segoe UI Emoji, Apple Color Emoji, Noto Color Emoji"`
- 所有文字用 `Microsoft YaHei`
- 颜色使用 HEX 不带 #

---

## XII. Design Checklist

- [x] 色彩方案确认
- [x] 字体大小确认
- [x] Emoji 图标清单
- [x] 内容大纲确认
- [ ] SVG 生成
- [ ] PPTX 导出

---

## XIII. Next Steps

✅ Design spec complete. No images needed.
→ Invoke Executor (free design for every page)
