# 设计哲学风格库：20 种体系

> html-interactive 的扩展编辑风格层。5 大流派 × 20 种设计哲学，每种提供 CSS 设计系统覆盖 + 硬约束 + 关键视觉模式。
> 选择风格时，先匹配流派（调性/氛围），再在流派内选具体风格（细节偏好）。

---

## 风格速查表

| 风格 | 派别 | 关键词 | 色彩特征 | 最佳路径 |
|------|------|--------|----------|----------|
| 01 Pentagram | 信息建筑 | pentagram, 网格, 排版, 克制 | 黑白+1品牌色 | HTML |
| 02 Stamen | 信息建筑 | stamen, 数据诗学, 地图, 有机 | 赭石/鼠尾草/深蓝 | 混合 |
| 03 iA | 信息建筑 | ia, 内容优先, 系统字体, 阅读 | 系统默认+蓝链接 | HTML |
| 04 Fathom | 信息建筑 | fathom, 科学, 精确, 严谨 | 灰/海军蓝/1高亮 | HTML |
| 05 Locomotive | 运动诗学 | locomotive, 滚动叙事, 电影感, 视差 | 深色+发光强调 | HTML+AI |
| 06 Active Theory | 运动诗学 | webgl, 粒子, 3D, 霓虹 | 深空+霓虹 | AI |
| 07 Field.io | 运动诗学 | 生成艺术, 算法, 几何, computational | 单色+鲜活强调 | AI |
| 08 Resn | 运动诗学 | 游戏化, 叙事, 插画, 探索 | 暖色+科技 | HTML+AI |
| 09 Experimental Jetset | 极简 | jetset, 概念极简, 三原色, 蒙德里安 | 红蓝黄+黑白 | HTML+AI |
| 10 Müller-Brockmann | 极简 | 瑞士, 网格, 客观, 功能主义 | 黑+1强调色 | HTML |
| 11 Build | 极简 | build, 奢侈, 留白, 呼吸感 | 微妙单色+1强调 | HTML |
| 12 Sagmeister | 极简 | 快乐, 手工, 实验, 意外色彩 | 爆发色+克制基底 | AI |
| 13 Zach Lieberman | 实验先锋 | 代码诗学, 手绘, 黑白, 生成 | 纯黑白 | AI |
| 14 Raven Kwok | 实验先锋 | 参数化, 分形, 递归, 建筑 | 高对比黑白 | AI |
| 15 Ash Thorp | 实验先锋 | 赛博, 电影光影, 橙青, 孤独诗 | 橙/青暖赛博 | AI |
| 16 Territory | 实验先锋 | FUI, 科幻, 全息, 未来界面 | 琥珀/青 | AI |
| 17 Takram | 东方哲学 | takram, 日式, 思辨, 柔和科技 | 米色/柔灰/淡绿 | HTML |
| 18 Kenya Hara | 东方哲学 | 原研哉, 空, 留白, 纸张, MUJI | 白色层次 | HTML |
| 19 Irma Boom | 东方哲学 | 书籍建筑, 非线性, 边界, 意外色彩 | 粉+红/橙+棕 | HTML+AI |
| 20 Neo Shen | 东方哲学 | 水墨, 光影, 诗意, 东方 | 深蓝/暖灰/柔金 | AI |

---

## 一、信息建筑派（01-04）

> 哲学：数据不是装饰，是建筑材料。理性、数据驱动、克制。

---

### 01. Pentagram / Michael Bierut

**哲学**：字体即语言，网格即思想

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #FFFFFF;
  --paper:     #FFFFFF;
  --ink:       #1A1A1A;
  --accent:    #E8542A;
  --rule:      #D4D0C8;
  --g100:      #F5F5F5;
  --g300:      #D0D0D0;
  --g500:      #888888;
  --headline:  "Helvetica Neue", Helvetica, Arial, sans-serif;
  --body:      "Helvetica Neue", Helvetica, Arial, sans-serif;
  --mono:      "Space Mono", "SF Mono", Menlo, Monaco, Consolas, monospace;
}
```

#### 硬约束

- 配色严格：黑白 + 1 个品牌色（`--accent`），禁止其他彩色
- 瑞士网格系统：12-column Swiss grid, 8pt baseline，所有元素对齐网格
- 字体排印是主要视觉语言，不用插画/照片做装饰
- 字重体系：Display Heavy 700-800 / Body Light 300, Regular 400 / Mono Space Mono
- 字号层级：Display 48-72px / Body 14-16px / Caption 11-12px
- 60%+ 战略性留白，负空间是设计的一部分
- 标题层级用字号+字重区分，不多加装饰线
- 数据可视化是唯一的"装饰"形式

#### 关键视觉模式

- 大标题 Helvetica Heavy 700-800，字号 48-72px，与 Light 300 正文形成极端粗细对比
- 正文 Helvetica Light/Regular 14-16px，数据标签 Space Mono
- 网格可见但不喧哗——内容精确对齐就是网格的表达
- 品牌色只用于：关键数字、状态指示、交互高亮
- 信息密度高但秩序井然，每个像素都有理由

#### 风格气质

> 极端的理性主义。像一份经过精确排版的政府报告——不花哨，但你一眼就知道每个信息在哪、谁最重要。留白不是空，是呼吸。

---

### 02. Stamen Design / 数据诗学

**哲学**：让数据成为可触摸的风景

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #F5F0E8;
  --paper:     #FFFCF5;
  --ink:       #3A3025;
  --accent:    #C07040;
  --sage:      #6B8E5A;
  --deep:      #2D4A6F;
  --g100:      #EDE8DD;
  --g300:      #C9C1B3;
  --g500:      #8A8275;
  --headline:  "Playfair Display", Georgia, serif;
  --body:      "Source Serif Pro", Georgia, serif;
  --mono:      "Space Mono", "SF Mono", Menlo, Monaco, Consolas, monospace;
}
```

#### 硬约束

- 暖色数据可视化色调：赭石（terracotta `#C07040`）、鼠尾草绿（`#6B8E5A`）、深蓝（`#2D4A6F`），禁止冷灰科技感
- 地图学思维：信息用层叠、等高线、地形图的方式组织，数据深度最多 3 层
- 有机图形：算法生成曲线、流动形状，避免纯几何刚性；线条保留手工微小不规则感
- 数据可视化用柔和阴影（`rgba(0,0,0,0.06)`）和深度感，不是平面图表
- 字体衬线为主，给数据一种"被手触摸过"的质感；Display Semibold 600，Body Regular 400
- 字号层级：Headline 衬线大标题 / Body 13-14px / Data labels 10-11px `#888`
- Free-form organic layout，非刚性网格；数据簇间距 16-24px
- 图例融入布局，不独立侧栏

#### 关键视觉模式

- 数据区域像地形图，有深浅渐变和等高线
- 可交互层级系统：hover 展开细节层
- 有机流动的 SVG 曲线替代直线/矩形
- 温暖的底色上叠加多层半透明数据

#### 风格气质

> 数据不是冰冷的数字，是一片你可以走进去的风景。像一幅画了人口密度和河流的旧地图——数据有温度，信息有触感。

---

### 03. Information Architects / 内容优先

**哲学**：设计不是装饰，是内容的建筑

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #FFFFFF;
  --paper:     #FFFFFF;
  --ink:       #333333;
  --link:      #0000EE;
  --link-visited: #551A8B;
  --subtle:    #999999;
  --g100:      #FAFAFA;
  --g300:      #CCCCCC;
  --g500:      #666666;
  --headline:  -apple-system, BlinkMacSystemFont, "SF Pro Display", "Segoe UI", Roboto, sans-serif;
  --body:      -apple-system, BlinkMacSystemFont, "SF Pro Text", "Segoe UI", Roboto, sans-serif;
  --mono:      ui-monospace, "SF Mono", Menlo, Monaco, Consolas, monospace;
}
```

#### 硬约束

- **只使用系统字体**：不加载任何外部字体，性能即美学；Display Semibold 600，Body Regular 400
- 字号层级：H1 24-28px / H2 18-20px / Body 15-16px / small 13px
- 蓝色超链接传统：`#0000EE` 未访问，`#551A8B` 已访问
- 阅读行宽：`max-width: 660px`，单栏布局
- 零装饰元素：没有背景图案、没有装饰线、没有图标装饰
- 背景色仅允许 `#fff` 或 `#fafafa`
- 内容层级纯靠字号+字重+间距，不靠颜色/装饰
- 渐进式披露：默认只展示核心，详情按需展开
- 段落间距 16px，section 间距 32px
- 性能硬线：延迟阅读 0.5s 以上的元素直接移除

#### 关键视觉模式

- 段落间宽松行距（1.8+），阅读舒适
- 标题用更大字号+更重字重，不外加颜色/边框
- 超链接下划线，hover 变深色
- 图表用最简线框，标注清晰

#### 风格气质

> 极致的阅读体验。像一篇排版精良的维基百科条目——没有多余的东西，但每个字都好读。设计隐形，内容可见。

---

### 04. Fathom / 科学叙事

**哲学**：每一个像素都必须承载信息

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #E8E6E1;
  --paper:     #FFFFFF;
  --ink:       #333333;
  --accent:    #1E3A5F;
  --highlight: #C44E52;
  --g100:      #F0F0F0;
  --g300:      #CCCCCC;
  --g500:      #888888;
  --headline:  "Source Sans Pro", "Helvetica Neue", sans-serif;
  --body:      "Source Serif Pro", Georgia, serif;
  --mono:      "IBM Plex Mono", "Source Code Pro", "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 科学期刊审美：严谨但优雅，非实验室感
- 配色限定：灰阶 + 海军蓝 `#1E3A5F` + 1 个高亮色（用于异常/关键发现）
- 字重体系：Display Medium 500，Body Regular 400
- 字号层级：Body 13-14px / Captions & labels 10-11px #777 / Source citation 10px #999
- 数据可视化精确：每个数据点有标注，图表有 source 注释；图表无背景网格，极简轴线，数据聚焦
- 脚注/引用系统设计化：不是小字堆砌，而是可交互的注释层
- 三线表：顶底粗线 + 中间细线，无侧边框无背景色
- 图表 caption 置于下方（非上方），source 强制标注 "Source: XXX, YYYY"
- 颜色编码仅用于有意义的分类，禁止装饰性用色
- Structured grid 布局：数据列 + 注释边栏；数据元素间距 12px，section 间距 20px
- 版心 ≤ 860px，行宽控制严格

#### 关键视觉模式

- 散点图/时间线/分布图用精确刻度，无背景网格，极简轴线
- 注释用侧边栏或脚注格式，可点击展开
- 图表标题用结论陈述句（"X 下降 30%"，非"X 变化趋势"）
- 引用/出处用小号等宽字体，灰色

#### 风格气质

> 科学论文的严谨 + 纽约时报信息图的优雅。每个数字都有出处，每条线都有理由。不花哨，但信息密度极高。

---

## 二、运动诗学派（05-08）

> 哲学：技术本身就是一种流动的诗。动感、沉浸、技术美学。

---

### 05. Locomotive / 滚动叙事

**哲学**：滚动不是浏览，是旅程

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #0A0A0A;
  --paper:     #111111;
  --ink:       #E8E8E8;
  --accent:    #FF6B35;
  --glow:      #FF6B3566;
  --g300:      #333333;
  --g500:      #888888;
  --headline:  "Inter", system-ui, sans-serif;
  --body:      "Inter", system-ui, sans-serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 深色背景（近黑 `#0A0A0A`），文字浅灰
- 每个 section 100vh 全屏，scroll-snap 对齐
- 视差滚动：前景/中景/背景三层速度差
- 发光强调色只用于核心元素，像黑暗中的灯塔
- 电影化分镜：大字标题从暗处浮现（fade-in + translate-up）
- 字体粗细对比极端：标题 800，正文 300

#### 关键视觉模式

- IntersectionObserver 触发元素入场动画
- 大面积暗色 + 局部发光点
- 滚动进度指示器（细线，底部或侧边）
- 段落间 200px+ 垂直间距制造电影感的"镜头切换"

#### 风格气质

> 像一部你用手滚动的电影。每滚一屏是一个新场景，黑暗中文字和数字缓缓浮现。沉浸但不压迫，有节奏感。

---

### 06. Active Theory / WebGL 诗人

**哲学**：让技术可见化即让技术可理解

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #050510;
  --paper:     #0A0A1A;
  --ink:       #E0E0FF;
  --accent:    #00FFFF;
  --accent2:   #FF00FF;
  --accent3:   #4488FF;
  --glow:      #00FFFF44;
  --headline:  "Inter", system-ui, sans-serif;
  --body:      "Inter", system-ui, sans-serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 极深色背景（近黑带蓝调）
- 霓虹配色：青/品红/电蓝，只在暗底上使用
- 粒子效果是核心视觉元素（CSS/SVG 粒子模拟）
- 鼠标交互驱动：hover 产生涟漪/引力效果
- 玻璃拟态 UI：`backdrop-filter: blur()` + 半透明
- **HTML 近似路径**：用 CSS 动画 + SVG 粒子模拟 3D 效果，不做真实 WebGL

#### 关键视觉模式

- CSS `@keyframes` 粒子飘浮（小圆点，随机运动）
- 径向渐变模拟光晕/辉光
- 鼠标跟踪用 JS `mousemove` 事件
- 玻璃卡片：`background: rgba(255,255,255,0.05); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1)`

#### 风格气质

> 像漂浮在星空中——粒子在周围流动，光从深处照射。未来感但不是冷冰冰的，有一种宇宙的诗意。

---

### 07. Field.io / 算法美学

**哲学**：代码即设计师

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #FAFAFA;
  --paper:     #FFFFFF;
  --ink:       #1A1A1A;
  --accent:    #FF3366;
  --secondary: #666666;
  --g100:      #F0F0F0;
  --g300:      #CCCCCC;
  --g500:      #999999;
  --headline:  "Space Grotesk", "Helvetica Neue", sans-serif;
  --body:      "Space Grotesk", system-ui, sans-serif;
  --mono:      "SF Mono", "JetBrains Mono", Menlo, monospace;
}
```

#### 硬约束

- 单色基底 + 1 个鲜活强调色（如亮粉/亮橙/亮绿）
- 生成感视觉：Voronoi 图、Delaunay 三角、分形线条（SVG 实现）
- 数学精确间距：所有间距是 8 的倍数
- 几何图案有"计算感"：规则但不重复
- 禁止手绘/有机曲线，只用几何/算法图形

#### 关键视觉模式

- SVG 几何图案做背景/分隔（低 opacity）
- 关键数据用几何形状包裹（六边形/三角形/圆）
- 强调色只用于核心数据点/交互元素
- 代码注释式的标注风格（`// key insight`）

#### 风格气质

> 每个形状都在告诉你"这是算法算出来的"。像数学证明的视觉化——精确、干净、但有一种因为规则而产生的意外美感。

---

### 08. Resn / 叙事交互

**哲学**：每个点击都推进故事

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #FFF8F0;
  --paper:     #FFFFFF;
  --ink:       #2A2A2A;
  --accent:    #FF6B6B;
  --warm:      #FFB347;
  --cool:      #4ECDC4;
  --g100:      #F5F0E8;
  --g300:      #D9D0C3;
  --g500:      #8A8275;
  --headline:  "DM Sans", "Nunito", system-ui, sans-serif;
  --body:      "DM Sans", system-ui, sans-serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 暖色+科技感的反差：即使技术主题也用温暖底色
- 游戏化元素：进度条、探索指引、解锁机制
- 插画风格与 UI 元素融合：SVG 简笔画 + 现代组件
- 非线性探索：内容不是上下滚动，而是可点击的节点/卡片
- 情感化设计：用颜色/动画传达情绪（成功=绿，惊喜=弹跳）

#### 关键视觉模式

- 卡片网格布局，每张卡片可点击展开"下一章"
- 进度指示器（圆形/线性）
- 微交互动画：hover 弹跳、点击涟漪
- 简笔 SVG 插画做章节图标

#### 风格气质

> 像一本会动的绘本——点一下翻一页，每页都有小惊喜。技术内容不冰冷，而是有温度的小冒险。

---

## 三、极简主义派（09-12）

> 哲学：删减到无法再删。秩序、留白、精致。

---

### 09. Experimental Jetset / 概念极简

**哲学**：一个想法 = 一个形式

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #FFFFFF;
  --paper:     #FFFFFF;
  --ink:       #000000;
  --red:       #FF0000;
  --blue:      #0000FF;
  --yellow:    #FFDD00;
  --g100:      #F0F0F0;
  --g300:      #CCCCCC;
  --g500:      #888888;
  --headline:  "Helvetica Neue", Helvetica, Arial, sans-serif;
  --body:      "Helvetica Neue", Helvetica, Arial, sans-serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 蒙德里安色系：红/蓝/黄 + 黑白，禁止其他颜色
- 字体即图形：大写 Helvetica 是唯一视觉元素，不用插画/照片
- 单一视觉隐喻贯穿全场（如一个反复出现的几何形状/字母）
- 网格为基础，允许在网格上故意打破规则（制造张力）
- 反商业的诚实设计：无渐变、无阴影、无圆角
- 所有边框 `1px solid`，所有圆角 `0`

#### 关键视觉模式

- 纯文字排版作为视觉焦点（超大字号关键词）
- 色块分割：用红/蓝/黄矩形做区域划分
- 字母/数字既是信息也是装饰（如巨大的 "01" 做章节标记）
- 黑白为主，三原色只做点睛

#### 风格气质

> 蒙德里安的数字版。像一份用打字机敲出来的宣言——没有废话，每个字母都有存在的理由。三原色是革命的颜色。

---

### 10. Müller-Brockmann / 瑞士网格

**哲学**：客观性即美

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #FFFFFF;
  --paper:     #FFFFFF;
  --ink:       #000000;
  --accent:    #E30613;
  --g100:      #F0F0F0;
  --g300:      #CCCCCC;
  --g500:      #888888;
  --headline:  "Univers", "Helvetica Neue", Arial, sans-serif;
  --body:      "Univers", "Helvetica Neue", Arial, sans-serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 数学精确的 8pt 基线网格，所有元素对齐
- 绝对左对齐或居中，不居右
- 双色方案：黑 + 1 强调色，禁止第三色
- 功能主义至上：装饰 = 罪恶
- 无圆角（`border-radius: 0`），无渐变，无阴影
- 标题全部大写，字间距 `0.1em+`

#### 关键视觉模式

- 网格线可见但不突兀（辅助线 `#eee`，1px）
- 几何形状做视觉锚点（圆形/正方形/线条）
- 图表用纯几何形式（无圆角的柱状图，无曲线）
- 留白是最大的设计元素

#### 风格气质

> 客观性就是美。像一份瑞士铁路时刻表——精确、无误、不容置疑。没有"个人风格"，只有"正确答案"。

---

### 11. Build / 当代极简品牌

**哲学**：精致的简单比复杂更难

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #FAFAFA;
  --paper:     #FFFFFF;
  --ink:       #1A1A1A;
  --accent:    #C8A96E;
  --g100:      #F5F5F5;
  --g300:      #E0E0E0;
  --g500:      #999999;
  --headline:  "Inter", "Helvetica Neue", sans-serif;
  --body:      "Inter", system-ui, sans-serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 奢侈品级留白：70%+ 区域为空白
- 微妙字重对比：标题 600，正文 300-400，注释 200
- 单一强调色战略使用：如金色 `#C8A96E`，只用于品牌标记和关键数字
- 柔和阴影（`box-shadow: 0 2px 20px rgba(0,0,0,0.06)`）
- 黄金比例节奏：间距递进 8/13/21/34/55
- 不允许：粗边框、大色块、强对比

#### 关键视觉模式

- 数值指标：超大字号（3em+）+ 极细字重（200-300）
- 产品级图片处理：圆角 8px + 微阴影 + 充足边距
- 分隔用间距而非线条
- 卡片 hover：`translateY(-2px)` + 阴影加深

#### 风格气质

> 像一家安静的精品店——灯光明亮，空间宽敞，每件商品都在自己的位置上呼吸。精致不是加法，是减法。

---

### 12. Sagmeister & Walsh / 快乐极简

**哲学**：美即功能的情感维度

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #FFFEF7;
  --paper:     #FFFFFF;
  --ink:       #1A1A1A;
  --accent:    #FF2D55;
  --warm:      #FF9500;
  --cool:      #5AC8FA;
  --g100:      #FFF5E6;
  --g300:      #E0D5C5;
  --g500:      #998877;
  --headline:  "DM Serif Display", Georgia, serif;
  --body:      "DM Sans", system-ui, sans-serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 克制基底 + 意外色彩爆发：主体极简，关键元素用鲜艳色
- 手工感：不完美的边缘、微微旋转、有机曲线
- 正能量视觉语言：圆角、暖色、弹跳动画
- 实验性但可读：标题可以疯狂，正文必须清晰
- 人味通过不完美传递：微微倾斜、手绘感边框
- 禁止：冰冷科技感、对称到无趣、完美对齐

#### 关键视觉模式

- 关键文字用 SVG 手绘效果（不规则描边）
- 色彩爆发：一个区域突然用 3+ 种鲜艳色
- 微动画：`transform: rotate(-1deg)` + hover `rotate(0deg)`
- 有机形状替代矩形（blob clip-path）

#### 风格气质

> 极简但快乐。像一张手写贺卡——白纸上一行字，但字是彩色的、微微歪的、带着笑脸。严肃内容也可以有人味。

---

## 四、实验先锋派（13-16）

> 哲学：打破规则即创造规则。先锋、生成艺术、视觉冲击。

> **注意**：本流派多数风格以 AI 生成为最佳路径。HTML 近似时，用 CSS 动画 + SVG 模拟核心视觉特征，不做精确还原。

---

### 13. Zach Lieberman / 代码诗学

**哲学**：编程即绘画

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #FFFFFF;
  --paper:     #FAFAFA;
  --ink:       #000000;
  --g100:      #F0F0F0;
  --g300:      #CCCCCC;
  --g500:      #888888;
  --headline:  "Courier New", "SF Mono", monospace;
  --body:      "Courier New", "SF Mono", monospace;
  --mono:      "Courier New", "SF Mono", monospace;
}
```

#### 硬约束

- **纯黑白**：零彩色，零灰阶（只用纯黑 `#000` + 纯白 `#FFF`）
- 等宽字体作为唯一字体（标题/正文/注释全部 monospace）
- 手绘感算法图形：SVG 线条有抖动/不完美感
- 可见过程：网格线、辅助线、坐标轴不隐藏
- 代码即装饰：函数名/变量名作为视觉元素
- 每根线条都是代码的痕迹，不修饰

#### 关键视觉模式

- SVG 线条用 `stroke-dasharray` + `stroke-dashoffset` 做绘制动画
- 背景网格线 `1px solid #eee`
- 手绘效果：SVG 路径添加微小随机偏移
- 代码片段作为装饰性元素（低 opacity 等宽文字）

#### 风格气质

> 像一本程序员的素描本——每根线都是代码画出来的，每个点都是算法算出来的。粗糙但诗意，简单但深邃。

---

### 14. Raven Kwok / 参数化美学

**哲学**：系统的美胜过个体的美

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #000000;
  --paper:     #0A0A0A;
  --ink:       #FFFFFF;
  --g100:      #1A1A1A;
  --g300:      #444444;
  --g500:      #888888;
  --headline:  "Space Mono", "Courier New", monospace;
  --body:      "Space Mono", "Courier New", monospace;
  --mono:      "Space Mono", "Courier New", monospace;
}
```

#### 硬约束

- 高对比黑白：深黑底 + 纯白字
- 分形/递归视觉：每个单元是更大单元的缩放版
- 建筑化信息结构：信息像楼层/柱廊一样堆叠
- 等宽字体，精确几何排列
- 禁止：曲线、有机形状、手绘感
- 缩放奖励细节：hover 放大揭示更深层结构

#### 关键视觉模式

- SVG 递归几何（三角形内嵌三角形，方形内嵌方形）
- `transform: scale()` + `transition` 做缩放探索
- 网格化数据展示，每格等大等距
- 白色细线在黑底上构建"建筑结构"

#### 风格气质

> 像一座哥特式大教堂的蓝图——分形、递归、无穷嵌套。个体的美不重要，系统的美才是永恒。

---

### 15. Ash Thorp / 赛博诗意

**哲学**：未来不是冰冷的，是孤独的诗

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #0D0D0F;
  --paper:     #141418;
  --ink:       #E8E4E0;
  --accent:    #FF8C42;
  --cool:      #3EC9C2;
  --warm:      #D4956A;
  --g100:      #1E1E24;
  --g300:      #333340;
  --g500:      #66667A;
  --headline:  "Oswald", "Inter", sans-serif;
  --body:      "Inter", system-ui, sans-serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 暖赛博配色：橙色 `#FF8C42` + 青色 `#3EC9C2`（非冷蓝/纯紫）
- 电影级光影：径向渐变模拟体积光，大范围柔阴影
- 深色底但不纯黑——带微暖/微蓝调
- 工业美学精致化：精密线条 + 精致字体 + 深色氛围
- 故事性构图：每个页面像一幅电影帧
- 禁止：冷蓝赛博、纯紫霓虹、无层次平面

#### 关键视觉模式

- 径向渐变做"光晕"（`radial-gradient(circle at 30% 40%, rgba(255,140,66,0.15), transparent 60%)`）
- 大标题+微弱辉光（`text-shadow: 0 0 30px rgba(255,140,66,0.3)`）
- 横向扫描线效果（`background: repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.02) 2px, rgba(255,255,255,0.02) 4px)`）
- 细边框卡片 + 微光角标

#### 风格气质

> 银翼杀手的温暖版本——霓虹不是冰冷的蓝，是孤独的橙。未来不是金属质感，是一个人在深夜城市里的呼吸。

---

### 16. Territory Studio / 屏幕虚构

**哲学**：未来 UI 的今日想象

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #0A0C10;
  --paper:     #0F1218;
  --ink:       #D4D8E0;
  --accent:    #FFB347;
  --accent2:   #00E5FF;
  --g100:      #161A24;
  --g300:      #2A3040;
  --g500:      #556080;
  --headline:  "Share Tech Mono", "Oswald", monospace;
  --body:      "Share Tech Mono", "Inter", monospace;
  --mono:      "Share Tech Mono", "SF Mono", monospace;
}
```

#### 硬约束

- 琥珀色系为主（`#FFB347`），青色做辅助（`#00E5FF`）
- FUI（Fantasy User Interface）：看起来像科幻电影里的操作系统
- 全息投影感：半透明层叠 + 微弱扫描线
- 多层数据可视化叠加：背景地图 + 中景数据流 + 前景 UI
- 等宽字体为主，模拟"终端/仪表盘"
- 技术细节密集：坐标/时间戳/状态码 作为装饰元素

#### 关键视觉模式

- 半透明面板（`background: rgba(15,18,24,0.85); border: 1px solid rgba(255,179,71,0.3)`）
- HUD 元素：角标、扫描框、十字准星（SVG 装饰）
- 数据流效果：滚动文字（CSS `@keyframes scroll`）
- 六边形网格做背景图案

#### 风格气质

> 像坐在飞船驾驶舱里——琥珀色仪表盘闪烁，全息投影缓缓旋转。不是真的未来，但是一个可信的未来想象。

---

## 五、东方哲学派（17-20）

> 哲学：留白即内容。温润、诗意、思辨。

---

### 17. Takram / 日式思辨

**哲学**：技术是思考的媒介

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #F5F2EC;
  --paper:     #FAFAF7;
  --ink:       #3A3A3A;
  --accent:    #7A9B6D;
  --secondary: #8B7D6B;
  --g100:      #EDE8DD;
  --g300:      #C9C1B3;
  --g500:      #8A8275;
  --headline:  "Noto Sans JP", "Noto Sans SC", system-ui, sans-serif;
  --body:      "Noto Sans JP", "Noto Sans SC", system-ui, sans-serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 中性自然色：米色、柔灰、淡绿，禁止亮色/饱和色
- 柔和科技感：圆角 8-12px、柔和阴影、温润的交互
- 图表即艺术：数据可视化用极简线条 + 留白
- 谦逊精致：不大声，不抢眼，但每个细节都打磨过
- 间距宽松，呼吸感
- 中日文字体优先，西文用无衬线

#### 关键视觉模式

- 圆角卡片 + 微阴影（`box-shadow: 0 2px 12px rgba(0,0,0,0.06)`）
- 淡绿强调色只用于：进度/成功/关键节点
- 数据图表用极简线条（2px 宽，`--secondary` 色）
- 图表标题在图上方，source 在图下方，都是小字

#### 风格气质

> 像一台精心设计的日本家电——安静、精准、不张扬。技术在里面，但你看不见齿轮，只感受到温度。

---

### 18. Kenya Hara / 空的设计

**哲学**：设计不是填充，是清空

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #FFFFFF;
  --paper:     #FEFEFE;
  --ink:       #333333;
  --warm-white:#F8F5F0;
  --cool-white:#F5F7FA;
  --off-white: #F2EFE8;
  --cinnabar:  #B22222;
  --g100:      #F5F2ED;
  --g300:      #D8D2C8;
  --g500:      #8A8275;
  --headline:  "Noto Serif JP", "Noto Serif SC", serif;
  --body:      "Noto Serif JP", "Noto Serif SC", serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 80%+ 极致留白：信息量极小，每个元素都被留白包围
- 白色的层次：暖白/冷白/米白，用白色差异做区域划分
- 纸张质感：微妙的底色变化（非纯白 `#FFF`）
- 衬线字体为主，字间距宽松（`0.05em`），行高 2.0+
- 禁止：亮色、渐变、粗边框、阴影、emoji
- 信息极度克制：一段话只说一件事

#### 关键视觉模式

- 巨大留白（段落间 3em+）
- 白色层次用 `--warm-white`/`--cool-white`/`--off-white` 区分区域
- 极偶尔用朱砂红（`--cinnabar`）标记一个关键词
- 标题左对齐，旁边可配一枚红色圆形印章（SVG，刻一汉字）

#### 风格气质

> 像一张铺开的宣纸——几乎什么都没写，但每一个字都在呼吸。留白不是空，是等待被感知的空间。MUJI 的精神内核。

---

### 19. Irma Boom / 书籍建筑师

**哲学**：信息的物理诗学

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #FAF8F5;
  --paper:     #FFFFFF;
  --ink:       #1A1A1A;
  --accent:    #E85D75;
  --secondary: #D4845A;
  --g100:      #F0EBE3;
  --g300:      #CFC5B8;
  --g500:      #8A8275;
  --headline:  "Playfair Display", "Noto Serif SC", serif;
  --body:      "Source Serif Pro", "Noto Serif SC", Georgia, serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 意外颜色组合：粉+红、橙+棕，非传统配色
- 非线性信息架构：内容不必从上到下，可跳跃/循环
- 边缘与边界的游戏：裁切、出血、不规则 margin
- 手工艺的数字转译：微微不完美、触感
- 书籍式编排：双页展开感、页码、章节页
- 衬线字体为主，字重对比温和

#### 关键视觉模式

- 不对称布局：内容偏左/偏右，非居中
- 页面边缘裁切效果（`clip-path` 或负 margin）
- 色块用意外组合（粉色标题 + 棕色正文）
- 折叠/翻页交互（CSS `transform: rotateY()`）

#### 风格气质

> 像一本打开后想一页页翻的书——每个跨页都是一个惊喜。不按套路出牌，但每一步都有道理。设计就是信息的建筑。

---

### 20. Neo Shen / 东方光影诗

**哲学**：技术需要人的温度

#### CSS 设计系统覆盖

```css
:root {
  --bg:        #1A1D2E;
  --paper:     #1E2235;
  --ink:       #D8D4CC;
  --deep-blue: #2A3050;
  --warm-gray: #8B7D6B;
  --soft-gold: #C8A96E;
  --g100:      #252840;
  --g300:      #3A3F5C;
  --g500:      #6A6F8A;
  --headline:  "Noto Serif SC", "Noto Serif JP", serif;
  --body:      "Noto Serif SC", system-ui, serif;
  --mono:      "SF Mono", Menlo, monospace;
}
```

#### 硬约束

- 深蓝底（非纯黑，带蓝调暖灰调）
- 情感化色彩：深蓝/暖灰/柔金三色
- 水墨晕染数字化：径向渐变模拟墨迹扩散
- 柔和光晕效果（`box-shadow` 扩散 + 低 opacity）
- 诗意的留白：不是空，是意境
- 书法影响：标题用衬线，行笔感

#### 关键视觉模式

- 水墨效果：`radial-gradient(ellipse at 50% 50%, rgba(200,169,110,0.08), transparent 70%)`
- 光晕：`box-shadow: 0 0 60px rgba(200,169,110,0.1)`
- 深蓝底 + 金色强调字
- 标题字体放大 + 字间距 + 微光效果
- SVG 水墨笔触做装饰（低 opacity 曲线路径）

#### 风格气质

> 像一幅数字水墨画——深蓝夜色中，柔金的光晕缓缓晕开。技术有了人的呼吸，数据有了诗的韵律。深处的温暖。

---

## 提示词使用指南

### 风格选择流程

1. **先定流派**：内容调性匹配哪个大派？
   - 理性/数据/权威 → 信息建筑派（01-04）
   - 沉浸/动感/技术美学 → 运动诗学派（05-08）
   - 克制/秩序/精致 → 极简主义派（09-12）
   - 先锋/实验/视觉冲击 → 实验先锋派（13-16）
   - 温润/诗意/东方 → 东方哲学派（17-20）
2. **再选具体风格**：流派内 4 个风格，选最契合的
3. **匹配编辑风格**：如果 20 种都不匹配，回退到原有编辑风格（economist/apple-keynote/academic-paper/chinese-minimal/ft-data-story/loreal/warm-default）

### HTML 执行路径指南

| 路径 | 风格编号 | 说明 |
|------|---------|------|
| **HTML 渲染** | 01, 03, 04, 10, 11, 17, 18 | 精确排版+数据，HTML 完全可控 |
| **HTML + AI 配图** | 02, 05, 08, 09, 19 | HTML 做骨架布局 + AI 生成关键视觉素材 |
| **AI 生成为主** | 06, 07, 12, 13, 14, 15, 16, 20 | 核心视觉依赖生成艺术/AI 图像，HTML 做容器 |

### 与原有编辑风格的关系

设计哲学风格和原有编辑风格是**同一层的互斥选项**——选一个用，不叠加：

| 场景 | 选编辑风格 | 选设计哲学 |
|------|-----------|-----------|
| 文档/报告/长文 | economist, academic-paper, ft-data-story | 01, 04, 17, 18 |
| 产品/品牌/方案 | apple-keynote, loreal | 11, 09, 10 |
| 文化/哲思/中式 | chinese-minimal | 17, 18, 19, 20 |
| 设计/创意/视觉 | （无匹配） | 05-08, 12-16 |
| 不确定/默认 | warm-default | 11 (Build) |

---

*版本 v1.0 | 来源：huashu-design/references/design-styles.md，适配 html-interactive 编辑风格层格式 | 2026-05-20*
