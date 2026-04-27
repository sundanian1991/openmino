# 神秘岛好书分享 - Design Spec (v2)

## I. Project Information

| Item | Value |
|------|-------|
| **Project Name** | liang-junrui-mysterious-island-v3 |
| **Canvas Format** | PPT 16:9 (1280x720) |
| **Page Count** | 11 |
| **Design Style** | General Versatile — 儿童友好视觉 |
| **Target Audience** | 二年级小朋友（7-8岁） |
| **Use Case** | 六年级学生给低年级做《神秘岛》好书分享，约5分钟 |
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

- **Style**: 儿童友好视觉型 — 明亮、圆角、大字号、Emoji装饰、彩色卡片
- **Theme**: 浅色主题
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

---

## IV. Typography System

| Level | Font | Size | Weight | Used For |
|-------|------|------|--------|----------|
| Cover Title | Microsoft YaHei | 72px | 700 | 封面书名 |
| Page Title | Microsoft YaHei | 40px | 700 | 每页标题 |
| Subtitle | Microsoft YaHei | 20px | 400 | 副标题 |
| Body | Microsoft YaHei | 18px | 400 | 正文 |
| Highlight | Microsoft YaHei | 22px | 700 | 关键词加粗 |
| Small text | Microsoft YaHei | 14px | 400 | 标注、页码 |
| Emoji | Segoe UI Emoji | 32-60px | - | 装饰图标 |

---

## V. Layout Principles

- **Header**: 4px 顶部彩色横条（Primary 色）
- **Content**: 标题区（顶部）+ 内容区（中部）+ 留白
- **Footer**: 页码（右下角，Primary 色圆角方块）
- **Spacing**: 元素间距 16-24px
- **Cards**: 圆角 16px，浅背景色，左边 6px 彩色条
- **Layout modes**: 居中、三列、四列、时间线、左右对比

---

## VI. Icon Usage Spec

- **Source**: Emoji 字符
- **Recommended icons**: 📖🏝️🧠⭐📝⚓🍳🤝🧒🐕🌊🔥🧱🚢💪🤔💡🎈🌋😱🏠⛈️🔨🌾🐐⛺

---

## VII. Chart Reference List

无数据图表需求。

---

## VIII. Image Resource List

不使用外部图片，纯 SVG + Emoji。

---

## IX. Content Outline

### Page 1 — 封面

- **Title**: 神秘岛
- **Subtitle**: 一本让你不想放下的冒险书
- **Info**: 六年级12班 梁峻睿 · 给二年级小朋友的好书分享
- **装饰**: 🏝️ 大装饰圆 + 散布小圆点

### Page 2 — 关于这本书

- **Title**: 关于这本书 📖
- **Content**:
  - 作者：儒勒·凡尔纳（法国，1828-1905）
  - 被称为"科幻小说之父"
  - 1874 年出版，是凡尔纳"科幻三部曲"的最后一部
  - 三部曲：《格兰特船长的儿女》→《海底两万里》→《神秘岛》
  - 一句话介绍：五个遇难的人，用智慧和双手，把荒岛变成了家园！

### Page 3 — 故事是怎么开始的

- **Title**: 故事是怎么开始的？
- **Content**:
  - 1865 年，美国南北战争期间 ⚔️
  - 五个北方俘虏被困在南方城市里士满
  - 他们趁乱偷了一个热气球 🎈
  - 结果遇到大风暴，被吹到了太平洋上
  - 最后落在了一个谁也没去过的荒岛上
  - 他们给这座岛取名为"林肯岛"，纪念林肯总统 🏝️

### Page 4 — 人物图鉴

- **Title**: 认识岛上的英雄们 ⭐
- **Cards**:
  1. 🧠 赛勒斯·史密斯 — 铁路工程师，知识渊博，团队的大脑
  2. 📝 吉丁·史佩莱 — 通讯记者，什么都写下来
  3. 🍳 纳布 — 史密斯的仆人，忠心耿耿，厨艺了得
  4. ⚓ 潘克洛夫 — 水手，意志坚定，造船高手
  5. 🧒 赫伯特 — 15 岁少年，勇敢好学，潘克洛夫的徒弟
  6. 🤝 艾尔通 — 后来加入的伙伴，曾经犯错，但改过自新
  - 还有一条忠诚的狗叫托普 🐕

### Page 5 — 科技树：从一无所有到建起家园

- **Title**: 他们用科学改变了荒岛 🔬
- **Steps** (timeline):
  1. 🔥 生火 — 用两块玻璃做凸透镜，聚焦阳光点燃干草
  2. 🏺 陶器 — 用黏土做锅碗瓢盆，能煮饭了
  3. 🧱 砖块 — 找到黏土和沙子，烧制出砖头
  4. ⚙️ 铁器 — 找到铁矿石，炼出了铁工具
  5. 📡 电报 — 用电池和电线，建了简易电报机
  6. 🚢 造船 — 造了"乘风破浪号"，绕岛航行

### Page 6 — 他们的大本营：花岗岩宫

- **Title**: 他们住在哪？🏠
- **Content**:
  - 起初：用树枝和帆布搭了临时帐篷 ⛺
  - 后来：发现悬崖上的大洞穴，改造成了"花岗岩宫"
  - 有客厅、卧室、仓库，还有窗户！
  - 他们还驯养了一只猩猩，名叫"朱普" 🦧
  - 朱普会帮忙干活，像家里的一个小成员

### Page 7 — 神秘的守护者

- **Title**: 岛上有个神秘人！🤫
- **Content**:
  - 岛上发生了好多奇怪的事……
  - 🔍 史密斯掉进海里，却神奇地出现在 800 里外
  - 🔍 小狗托普自己走了 8 千米找到主人
  - 🔍 捕获的野猪身上有子弹
  - 🔍 海边的遇难船上有个装满工具的箱子
  - 他们发现，岛上一直有一个人在暗中帮助他们！
  - 他就是 —— 尼摩船长！（《海底两万里》里的人物）🌊
  - 尼摩船长其实是印度的达卡王子，热爱自由，反对压迫

### Page 8 — 最惊险的时刻

- **Title**: 最惊险的时刻！😱
- **Content**:
  - 🏴‍☠️ 海盗来了！一群海盗想把林肯岛当老巢
  - 六个"岛民"勇敢地和海盗搏斗
  - 尼摩船长用电报和炸弹，神秘地消灭了海盗船
  - 🌋 火山要爆发了！
  - 尼摩船长在去世前警告了他们
  - 他们及时离开，整座岛被火山吞没了……

### Page 9 — 结局

- **Title**: 最后他们怎么样了？
- **Content**:
  - 一艘叫"邓肯号"的船来救他们了 🚢
  - 这是《格兰特船长的儿女》里那艘船！
  - 他们带着尼摩船长留下的财宝回到了美国
  - 在爱荷华州建立了一个新殖民地，过上了幸福的生活
  - 故事告诉我们：只要不放弃，什么困难都能克服！

### Page 10 — 学到的道理 + 互动

- **Title**: 读完这本书，我学到了……
- **Cards**:
  1. 💪 学会勇敢 — 遇到困难不放弃，害怕是正常的，但不能被害怕打败
  2. 🤝 团结力量大 — 五个人各有本领，团结起来就没有做不到的事
  3. 💡 知识就是力量 — 史密斯的知识救了所有人！学好本领，将来也能帮助别人
  4. 🔬 科学真神奇 — 用玻璃就能生火！书里还有好多有趣的科学知识
- **互动问题**: 🤔 如果你也到了荒岛上，你最想带什么？

### Page 11 — 结尾

- **Title**: 谢谢大家！
- **Subtitle**: 你们也想登上神秘岛吗？
- **CTA**: 快去读《神秘岛》吧！📖
- **Info**: 分享人：六年级12班 梁峻睿
- **Fun note**: 🏝️ 好书就是——看完还想再看一遍！

---

## X. Speaker Notes Requirements

- 总时长：约 5 分钟
- 风格：亲切、互动、口语化（面向二年级）
- 每页 25-35 秒

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
