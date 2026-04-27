# Cinematic UI (cinematic-ui)

> Sources: AKSeoLabs / Community, 2026-04-25
> Raw: [SKILL.md](../../raw/skills/cinematic-ui/SKILL.md); [directors-library.md](../../raw/skills/cinematic-ui/directors-library.md); [references/premium-calibration.md](../../raw/skills/cinematic-ui/references/premium-calibration.md); [references/anti-convergence.md](../../raw/skills/cinematic-ui/references/anti-convergence.md); [references/anti-garbage.md](../../raw/skills/cinematic-ui/references/anti-garbage.md); [references/output-templates.md](../../raw/skills/cinematic-ui/references/output-templates.md); [references/implementation-guardrails.md](../../raw/skills/cinematic-ui/references/implementation-guardrails.md); [references/library-index.md](../../raw/skills/cinematic-ui/references/library-index.md); [references/reference-protocol.md](../../raw/skills/cinematic-ui/references/reference-protocol.md); [references/data/camera-shots-50.md](../../raw/skills/cinematic-ui/references/data/camera-shots-50.md); [references/data/color-grades.md](../../raw/skills/cinematic-ui/references/data/color-grades.md); [references/data/compositions.md](../../raw/skills/cinematic-ui/references/data/compositions.md); [references/data/directors-200.md](../../raw/skills/cinematic-ui/references/data/directors-200.md); [references/data/font-moods.md](../../raw/skills/cinematic-ui/references/data/font-moods.md); [references/data/hero-archetypes.md](../../raw/skills/cinematic-ui/references/data/hero-archetypes.md); [references/data/image-direction.md](../../raw/skills/cinematic-ui/references/data/image-direction.md); [references/data/interaction-effects-50.md](../../raw/skills/cinematic-ui/references/data/interaction-effects-50.md); [references/data/narrative-beats.md](../../raw/skills/cinematic-ui/references/data/narrative-beats.md); [references/data/section-archetypes.md](../../raw/skills/cinematic-ui/references/data/section-archetypes.md); [references/data/section-functions.md](../../raw/skills/cinematic-ui/references/data/section-functions.md); [references/data/textures.md](../../raw/skills/cinematic-ui/references/data/textures.md); [references/data/typography-cinema.md](../../raw/skills/cinematic-ui/references/data/typography-cinema.md); [references/data/visual-elements.md](../../raw/skills/cinematic-ui/references/data/visual-elements.md); [references/data/visual-styles.md](../../raw/skills/cinematic-ui/references/data/visual-styles.md); [references/data/background-techniques.md](../../raw/skills/cinematic-ui/references/data/background-techniques.md)

## Overview

cinematic-ui 是一个将电影制作逻辑移植到网页设计的技能。核心理念：**像电影制片一样设计网站，而不是像普通落地页一样**。它使用导演（director）+ 具体电影（film）作为情感语言来源，将电影中的视觉语言翻译成网页结构、动效规范和实现规格。该技能面向 Claude Code、OpenAI Codex、Gemini、Cursor、Windsurf、GitHub Copilot 等多个 AI 平台，是一套跨工具的设计系统。

## 核心机制

**导演 + 电影 = 情感语言 → 网页结构**。

核心机制固定不变：选定一位导演和一部具体电影，确定网站的情感语言，然后将这种语言翻译成页面叙事、区块结构、动效方向和可实现的网页规格。电影不是规格清单或组件清单——它是研究输入和情感来源。计算机可操作的工作流始于将观察翻译成 `decisions.md`、`storyboard.md`、`compiled-spec.md` 和实现。

## 启动问卷

每次调用都必须先完成启动问卷，然后才能进入 Phase 1：

1. **如何开始**：`Screenshot`（从图片或 URL 逆向工程）、`Step-by-step`（用户自选类型/导演/电影）、`Surprise me`（选一个与之前不同的新组合）
2. **是否包含图片占位符**
3. **网站的 niche 和页面列表**

如果用户已预先回答了部分问题，确认或记录这些答案，只追问缺失项。

## Demo Uniqueness Protocol（演示唯一性协议）

当同一用户已用此技能创建过其他网站时触发：

- 将之前的输出视为设计历史上下文，**不是可复用的外壳**
- Phase 1 完成前，检查之前的输出并在 `decisions.md` 中记录唯一性审计
- 写出 `Previous-work audit`——命名最可能重复的特质（如左文案右物件 hero、顶部导航+堆叠面板、圆角高级卡片、深色奢华配色）
- 写出 `Shell-ban list`——新项目中明确禁止的布局特质
- 写出 `Primary composition family`——新项目必须选择不同的主构图家族（可选：full-bleed stage / corridor / vertical tower / archive wall / panoramic slab / cutaway monolith）
- **失败标准**：如果去掉颜色、字体样式和装饰效果后，新 demo 的线框图看起来和之前的 demo 一样，则视为失败

## 四阶段工作流

### Phase 1：Decisions（决策）

- 读取 `references/data/directors-200.md`——200 位导演风格库
- 如果有子代理，将电影研究、niche 研究或参考拆解委托为独立任务
- 如果有网页访问权限，**必须**研究选定的导演和电影——收集调色板、灯光行为、摄影模式、取景逻辑、场景节奏、导演签名技术、2-3 个同 niche 的高级网站
- 记录研究来源和简短解读笔记——不倾倒剧情摘要或通用花絮
- 将唯一性审计、shell-ban list 和主构图家族记录到 `decisions.md`

### Phase 2：Storyboard（故事板）

- 按顺序读取：`anti-convergence.md` → `hero-archetypes.md` → `narrative-beats.md` → `section-functions.md` → `section-archetypes.md`
- 使用 `dna-index.tsv` 通过 mood、font direction、shape language、motion、restraint、density、material richness 投射 2-3 个兼容的设计 DNA 源
- **在全站电影语法定义之前不设计任何单个页面**：捕获页面外壳逻辑、导航姿态、取景规则、密度节奏、循环的材料或大气层
- 构建导演简报：一句视觉论点、3 个签名技术及其网页翻译、精确的色值令牌、排版方向、运动规则
- 运行 premium calibration（来自 `premium-calibration.md`）
- 为每个主要页面角色写一个独立的场景论点——每个页面都是一个独立的场景或海报，然后再将页面连接成一个站点
- 定义每个页面的视觉论点（单一主导思想，如 monumental type、sculptural light、editorial framing、void + glow、object-as-stage）
- 定义每个页面一个不可替代的签名构图
- 将每个页面映射到叙事弧，而不是默认的 `Hero → Features → Stats → CTA`
- 应用 anti-convergence 系统选择 hero 原型、叙事弧和区块原型
- 将结果写入 `storyboard.md`，获取用户批准后再进入 Phase 3

### Phase 3：Compiled Spec（编译规格）

- 读取 `implementation-guardrails.md`
- 按需读取：`camera-shots-50.md`、`interaction-effects-50.md`、`compositions.md`、`visual-elements.md`、`background-techniques.md`、`typography-cinema.md`、`color-grades.md`、`font-moods.md`、`textures.md`
- 读取 `anti-garbage.md`——最终过滤
- 在导出共享布局原语之前锁定每个页面的签名构图
- **交互预算限制**：每页最多 1 个重交互、最多 2 个吸引注意力的揭示模式，其余动效必须从属于页面的视觉论点
- 偏好更少但更强的手势，而非许多巧妙的效果
- 将高级线索翻译成表面、间距、类型层次、边缘处理和大气层，而不仅仅是动画
- 每个页面在写区块规格之前创建入口映射：`fadeUp` / `opacity + translateY` 每页最多出现 2 次；页面有足够区块时使用至少 4 种不同的入口类型
- 相邻区块不能以相同方式揭示
- 为每个页面记录所选库源 id（camera/reveal behavior、interaction behavior、composition、typography treatment、atmospheric/background technique）
- 每个重交互、突出的揭示、hero 大气层和签名构图必须引用其库条目 id
- 提取完整的 CSS 和 JS（如果所选交互需要）
- 写入 `compiled-spec.md` 作为实现的唯一真实来源

### Phase 4：Build And Verify（构建与验证）

- 只读取 `compiled-spec.md`、`anti-garbage.md`、`implementation-guardrails.md`
- 从规格构建，不即兴创作新的布局逻辑
- 添加 reduced-motion 处理和响应式行为，不破坏所选电影语言
- 对照故事板和编译规格验证输出
- 使用 Screening Room 和 Post-Screening Adjustments 规则进行优化

## 导演库

导演库按电影类型组织，涵盖 8 大类、60+ 位导演：

### 动作片
Michael Bay（爆炸+低角度+golden hour → 全出血图片、快速过渡、暖渐变）、Chad Stahelski（精致暴力+霓虹+夜景 → 暗底+霓虹点缀、锐利边缘、聚光灯悬停）、吴宇森（双枪慢动作+白鸽+教堂 → 慢动作滚动揭示、暗底白色元素、对称双布局）、朴赞郁（暴力美学+对称+复仇色调 → 对称网格、深宝石色调、点击揭示秘密）、李安（武侠飘逸+自然融合 → 流动动画、自然意象、视差层叠）、北野武（暴力+长静默+突然爆发 → 长静态区域→突然动画爆发、蓝海洋色调）

### 科幻片
Denis Villeneuve（极简+沉浸+巨大尺度 → 巨型排版、100vh 区块、雾渐变、0px 圆角）、Ridley Scott（暗色湿润+工业细节+氛围 → 雨纹理、工业网格、冷凝效果）、押井守（哲学+机械+水面反射 → CSS 反射表面、代码雨、玻璃拟态）、奉俊昊（封闭空间+阶级视觉化 → 垂直滚动=社会阶层、分屏对比）、Christopher Nolan（时间操控+IMAX尺度+理性 → 滚动方向操控、基于时间的揭示、单色+蓝）、Alfonso Cuarón（长镜头+无缝+太空 → 无缝滚动、无区块分隔、连续流）

### 爱情片
王家卫（色彩诗意+慢动作+手持 → 饱和暖色调、慢 CSS 过渡 0.8s+、模糊层）、Sofia Coppola（梦幻极简+粉色+孤独 → 粉彩色调、慷慨留白、微妙颗粒感）、岩井俊二（雪景+手写信+柔焦+青春 → 柔焦模糊、手写字体、白/蓝冬季调色）、新海诚（超饱和天空+光线+雨滴 → 鲜艳渐变、光线效果、雨粒子动画）、Jean-Pierre Jeunet（暖黄绿+奇幻+细节特写 → 暖黄绿调色、异想天开的交互、悬停缩放）

### 惊悚片
David Fincher（精准冷酷+去饱和+深阴影 → 去饱和青色、深阴影、故障效果、扫描线）、Alfred Hitchcock（悬念+窥视+红色恐惧 → 窥视悬停效果、红色点缀、螺旋母题）、Nicolas Winding Refn（霓虹粉+暴力+沉默 → 热粉+深蓝、霓虹发光、极简文字、长停留）

### 喜剧片
Wes Anderson（对称+粉彩+planimetric → 一切居中、粉彩色调、装饰框架、章节卡片）、Edgar Wright（快速剪辑+视觉笑点 → 快速过渡、漫画面板、拟声文字效果）、周星驰（漫画夸张+特效+底层英雄 → 夸张缩放动画、弹簧弹跳、 playful 阴影）

### 纪录片
David Attenborough（自然壮阔+叙事节奏 → 自然意象、平静滚动、数据叠加）、Ken Burns（照片平移+历史感 → Ken Burns 效果滚动、棕褐色调、时间线）、是枝裕和（日常纪实+自然光 → 手持感觉、温暖自然色调、文字密集、无炫目效果）

### 史诗片
张艺谋（色彩分段+丝绸+群体 → 彩色主题区块（每个区块=一种颜色）、织物纹理）、黑泽明（动态构图+雨中决斗+群戏 → 动态对角线布局、雨效果、大胆的笔触排版）

### 黑色电影
Billy Wilder（经典 noir+双重赔偿 → 高对比黑白、对角线阴影、衬线排版）、Robert Rodriguez（现代 noir+漫画 → 黑白+单色弹出、漫画面板布局）、杜琪峰（港式黑帮+精准构图 → 暗色极简、精确对称布局、克制交互）、Jean-Pierre Melville（极简+沉默+风衣 → 超极简、单元素焦点、蓝灰色调）

### 动画片
宫崎骏（自然+手绘+风与飞行 → 有机形状、绿色调色、柔和漂浮动画）、今敏（现实扭曲+快速剪辑 → 变形过渡、现实弯曲滚动、无缝图片融合）、Phil Lord（混搭+漫画半色调 → 混合媒体纹理、半色调圆点、风格间故障）

## 数据参考库

| 文件 | 内容 |
|------|------|
| `camera-shots-50.md` | 50 种电影镜头/拍摄手法及其网页翻译 |
| `interaction-effects-50.md` | 50 种交互效果，标注 JS 依赖 |
| `compositions.md` | 构图模式库 |
| `color-grades.md` | 电影调色板及其网页对应 |
| `typography-cinema.md` | 电影排版规则 |
| `font-moods.md` | 字体情绪映射 |
| `textures.md` | 纹理库 |
| `background-techniques.md` | 背景/大气层技术 |
| `visual-elements.md` | 视觉元素库 |
| `visual-styles.md` | 视觉风格库 |
| `image-direction.md` | 图片处理方向 |
| `hero-archetypes.md` | Hero 区域原型 |
| `narrative-beats.md` | 叙事节奏 |
| `section-archetypes.md` | 区块原型 |
| `section-functions.md` | 区块功能 |
| `directors-200.md` | 200 位导演完整库 |

## 硬性规则

- 通过颜色、排版、间距、构图和运动保留选定的导演和电影语言
- 保持导演和电影作为感觉的主要来源——用 premium calibration 锐化结果，不覆盖所选电影 DNA
- 导演名、电影标题、章节标记、校准术语和工作流元数据默认放在工作文件内，不出现在用户界面上
- 禁止在最终界面暴露 `chapter`、`director`、`film`、`calibrated` 等流程语言
- 变换区块节奏——包含奇观、密集信息和呼吸空间的混合
- 每页使用至少 4 种不同的入口模式（页面有足够区块时）
- 相邻区块不能以相同方式揭示
- Hero 区域至少需要 3 个视觉元素
- 每个页面围绕一个大的视觉想法保持易读
- 内部页面必须像同一部电影中的新场景，而不是首页的简化版
- 每个主要页面角色需要一个无法被通用产品营销网格替代的签名构图
- 网格是基础设施，不是构图——如果一个区块作为通用 2×2 或三列产品网格仍然有效，构图太弱
- 将克制视为设计工具——高端作品通常删除 20% 的明显动作，而非增加 20% 的细节

## 反模式

- 输出通用的渐变 hero + 居中文案（除非源电影真正支持）
- 用导演名、电影标题、章节标签或流程标签伪装成高级微文案
- 在每个区块重用相同的悬停、揭示或卡片模式
- 页面变成动效演示或效果采样
- 将参考用作布局模板——借用质量维度，而非完整构图
- 让共享容器或可复用卡片擦除页面特定的场景身份
- 在页面级构图锁定之前决定共享组件系统
- 用户请求后直接从 HTML 跳过 `decisions.md`、`storyboard.md`、`compiled-spec.md`
- 一次性读取整个库——按需加载
