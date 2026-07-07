# Presentation Strategy Brief（lite）

## 摘要（人读）
- **一句话主张**：Zero不是AI工具，是AI工作伙伴——能记住你、能自动调度200+ Skill、能帮你出日报
- **听众听完应记住**：五层记忆架构、Skill六阶段进阶、四个提问方法
- **听众听完应做**：今天就试一次"盲点扫描"提问
- **推荐叙事骨架**：培训型 What → Why → How → Check（4模块，从产品到方法论递进）
- **推荐时长策略**：25分钟讲述 + 5分钟Q&A
- **状态**：信息完整

## Timing Brief（时长策略）
- **总时长预估**：30分钟
- **正式讲述 / Q&A**：25分钟 / 5分钟
- **建议页数**：8页
- **平均节奏**：每页2-3分钟，模块1产品演示4分钟
- **重点页预计耗时**：第2页（产品演示）4分钟；第6页（提问方法）4分钟含现场演示
- **可压缩版本**：砍掉第5页技能进阶和第7页来源标注，只讲产品+记忆+提问核心，20分钟
- **超时风险**：产品演示容易展开过多（准备30秒快速版）；记忆体系五层结构概念多（用类比简化）

## Slide Title Chain

| 页码 | 叙事阶段 | 结论式标题 | 本页作用 | 证据 / 素材 | 备注 |
| --- | --- | --- | --- | --- | --- |
| 1 | Hook | Zero不是AI工具，是AI工作伙伴 | 开场定调，建立认知 | 演示：帮我总结邮件 | 1min，快速演示 |
| 2 | What-1 | Skill就是把经验封装成技能包 | 展示产品核心能力 | 200+ Skill、3个演示场景 | 4min，现场演示 |
| 3 | What-2 | 你教AI一次，它下次还记得 | 记忆体系一句话定义 | 记忆摘要截图 | 2min，引出下一页 |
| 4 | How-1 | 五层记忆：按热度分层，按用途分文件 | 记忆体系核心架构 | 五层结构图、双文件架构 | 2min，概念讲解 |
| 5 | How-2 | 从下载到创建：Skill进阶六阶段 | 技能使用方法论 | 六阶段表、三步改造法 | 3min，阶梯式成长 |
| 6 | How-3 | 四个方法，让AI回答质量翻倍 | 提问技巧核心+防谄媚 | 苏格拉底式反问、盲点扫描、第一性原理、来源标注 | 6min含演示 |
| 7 | Resources | AI认知来源：去哪学、跟谁学 | 一手信息聚合 | x.ai、GetNote | 2min，推荐资源 |
| 8 | Check | 今天就试这三件事 | 行动号召 | 三个行动项 | 1min+Q&A |

## Universal Handoff Contract（权威）

```yaml
brief_tier: lite
run_mode: interactive
output_language: zh
handoff_mode: universal_only
adapter_resolution:
  requested: none
  resolved: none
  status: none
deck_intent:
  scenario: 内部技术分享/培训
  audience: 同事/团队成员，AI使用深度不一
  desired_action: 听完能上手用Zero，至少掌握记忆体系和提问技巧
  success_criteria: 听众离开时能记住1-3个可立即用的方法；有人当场试用
narrative:
  framework: What → Why → How → Check
  rationale: 培训型结构，从产品展示到方法论递进，每10分钟一个互动点
  hook:
    type: demo
    content: 现场演示"帮我总结邮件"，展示Zero自动匹配Skill
    first_30s: 直接演示，不解释
  stages:
    - What: 产品是什么（Zero + Skill）
    - What: 记忆体系是什么
    - How: 记忆体系怎么做（五层+双文件）
    - How: 技能使用怎么做（六阶段+三步改造）
    - How: 提问技巧怎么做（四个方法）
    - Check: 今天就试什么
  closing:
    type: cta
    content: 三个行动项 + Q&A
runtime_plan:
  total_duration: 30分钟
  talk_time: 25分钟
  qa_time: 5分钟
  slide_count_target: 8页
  pacing: 培训节奏，每模块结束有互动点
  section_allocation:
    - section: Hook + What-1 产品演示
      time: 5分钟
      slides: [1, 2]
      note: 模块1：产品使用
    - section: What-2 + How-1 记忆体系
      time: 4分钟
      slides: [3, 4]
      note: 模块2：记忆体系
    - section: How-2 技能进阶
      time: 3分钟
      slides: [5]
      note: 模块3：技能使用
    - section: How-3 提问技巧+防谄媚
      time: 6分钟
      slides: [6]
      note: 模块4：更好问AI
    - section: Check + Q&A
      time: 3分钟+5分钟
      slides: [8]
  heavy_slides: [2, 6]
  cut_if_short_on_time:
    - "砍掉第5页技能进阶和第7页来源标注，只讲产品+记忆+提问核心"
    - "压缩第4页记忆体系到1分钟，只讲五层不讲双文件"
  overrun_risks:
    - "第2页产品演示容易展开过多，准备30秒快速版"
    - "第6页提问演示可能超时，准备跳过现场演示只讲模板"
slide_plan:
  - slide: 1
    stage: Hook
    spec_density: compact
    title: "Zero不是AI工具，是AI工作伙伴"
    job: 开场定调，建立"AI是工作伙伴"的认知
    evidence: 现场演示
    asset_hint: Zero界面截图（可选）
    visual_hint: 大字号标题，简洁有力
    speaker_note_focus: 直接演示，不解释，30秒内完成
    content_spec:
      content_role: hook
      primary_message: Zero能记住你的习惯、自动调度Skill、帮你出日报，说需求就行
      on_slide_copy:
        headline: Zero不是AI工具，是AI工作伙伴
        subheadline: 不需要知道"怎么用"，说需求就行
        body_blocks:
          - type: callout
            text: "能记住你的习惯、能自动调度200+ Skill、能帮你出日报"
      visual_blueprint:
        primary_visual:
          type: none
          purpose: 纯文字开场，快速过渡到演示
          data_refs: []
          asset_refs: []
          annotation: 大字号标题，下方一行定位语
        layout_intent:
          composition: 居中标题，下方定位语
          hierarchy: 标题 > 定位语
          density: low
      narration:
        talk_time: 1分钟
        key_talking_points:
          - 直接说"我来演示一下"
          - 演示"帮我总结邮件"，展示Zero自动匹配Skill
          - 不解释原理，跑完再说"这说明了什么"
      constraints:
        must_include:
          - 现场演示
        must_avoid:
          - 解释原理（留给后面）
          - 演示超时（30秒内完成）
        placeholder_policy: honest_placeholder

  - slide: 2
    stage: What-1
    spec_density: full
    title: "Skill就是把经验封装成技能包"
    job: 展示Zero的核心能力：200+ Skill自动匹配
    evidence: 200+ Skill、3个演示场景
    asset_hint: Skill速查表
    visual_hint: 三个演示场景的流程图
    speaker_note_focus: 每个演示30秒，跑完再说"这说明了什么"
    content_spec:
      content_role: explanation
      primary_message: 200+ Skill自动匹配，用户说需求，AI自动找工具
      on_slide_copy:
        headline: 200+ Skill，说需求就自动匹配
        body_blocks:
          - type: bullets
            text: |
              "帮我总结邮件" → read-email
              "搜一下双周会关于AI幻觉的讨论" → 慧记搜索
              "帮我把需求写到JoySpace" → read-joyspace + save_note
        footnotes:
          - Skill来源：官方内置 + 社区共享 + 自建
      visual_blueprint:
        primary_visual:
          type: process
          purpose: 展示三个演示场景的触发词→Skill匹配
          data_refs: []
          asset_refs: []
          annotation: 每个场景：用户说→AI匹配→执行结果
        layout_intent:
          composition: 三行流程，每行一个场景
          hierarchy: 用户输入 > Skill匹配 > 执行结果
          density: medium
      data_requirements:
        metrics: []
        missing_sources: []
      narration:
        talk_time: 4分钟
        key_talking_points:
          - 演示1："帮我总结邮件" → read-email（1分钟）
          - 演示2："搜双周会关于AI幻觉的讨论" → 慧记搜索（1分钟）
          - 演示3："帮我把需求写到JoySpace" → read-joyspace + save_note（1分钟）
          - 总结："Skill就是把经验封装成技能包"（30秒）
      constraints:
        must_include:
          - 三个演示场景
          - Skill速查表
        must_avoid:
          - 每个演示超过1分钟
          - 解释Skill技术原理
        split_if:
          - 如果演示超时，只演示1-2个场景
        placeholder_policy: honest_placeholder

  - slide: 3
    stage: What-2
    spec_density: compact
    title: "你教AI一次，它下次还记得"
    job: 记忆体系一句话定义，引出下一页架构
    evidence: 记忆摘要截图
    visual_hint: 记忆摘要截图 + 一句话定义
    speaker_note_focus: 用刚才演示的对话作为案例
    content_spec:
      content_role: explanation
      primary_message: 每次对话结束，系统自动摘录关键信息，下次对话自动注入
      on_slide_copy:
        headline: 你教AI一次，它下次还记得
        body_blocks:
          - type: paragraph
            text: "不是因为'模型变聪明了'，是因为每次对话结束，系统自动把关键信息摘录成记忆，下次对话自动注入。不需要手动保存。"
      visual_blueprint:
        primary_visual:
          type: image_hero
          purpose: 展示真实的记忆摘要截图
          data_refs: []
          asset_refs: []
          annotation: 截图：Session Title / Current State / Decisions & Learnings
        layout_intent:
          composition: 上方截图，下方一句话定义
          hierarchy: 截图 > 定义
          density: low
      narration:
        talk_time: 2分钟
        key_talking_points:
          - 指着截图："你们刚才看到的摘录，就是记忆体系在干活"
          - 展示记忆摘要的结构：Session Title / Current State / Decisions
          - 强调"不需要手动保存，系统自动完成"
          - 过渡："具体怎么分层的？我们来看五层记忆架构"
      constraints:
        must_include:
          - 真实记忆摘要截图
        must_avoid:
          - 展开讲五层（留给下一页）
        placeholder_policy: honest_placeholder

  - slide: 4
    stage: How-1
    spec_density: full
    title: "五层记忆：按热度分层，按用途分文件"
    job: 记忆体系核心架构，讲清楚五层+双文件
    evidence: 五层结构图、双文件架构
    asset_hint: 五层架构图、CLAUDE.md vs MEMORY.md对比
    visual_hint: 五层结构图 + 双文件对比表
    speaker_note_focus: 用类比：人脑的记忆分短期/长期/永久
    content_spec:
      content_role: explanation
      primary_message: 记忆分五层（热度）+ 双文件（规则vs学习），不混在一起
      on_slide_copy:
        headline: 五层记忆 + 双文件架构
        body_blocks:
          - type: bullets
            text: |
              五层（按热度）：
              L1 置顶区：用户画像、核心规则（极少变）
              L2 高频区：30天内调用≥3次（月度更新）
              L3 时新区：最近7天关键信息（周度更新）
              L4 知识区：体系化内容、方法论（季度更新）
              L5 日记区：每日记录、原始素材（每日更新）

              双文件：
              CLAUDE.md = 显式规则（你必须怎么做）
              MEMORY.md = 自动学习（AI学到的）
      visual_blueprint:
        primary_visual:
          type: diagram
          purpose: 展示五层结构和双文件关系
          data_refs: []
          asset_refs: []
          annotation: 左侧五层从上到下（L1最小L5最大），右侧双文件对比
        layout_intent:
          composition: 左侧五层架构，右侧双文件对比
          hierarchy: 五层 > 双文件 > 解释
          density: high
      data_requirements:
        metrics: []
        missing_sources: []
      narration:
        talk_time: 2分钟
        key_talking_points:
          - 用类比："人脑的记忆也是分层的——短期记忆、长期记忆、永久记忆"
          - 快速过五层：L1置顶（用户画像）、L2高频（常用规则）、L3时新（最近动态）、L4知识（方法论）、L5日记（原始记录）
          - 重点讲双文件："分离的好处：规则不被噪声淹没，AI的学习不污染你的铁律"
          - 一句话总结："不是让AI记住，而是每次开新会话主动喂回它"
      constraints:
        must_include:
          - 五层结构表
          - 双文件对比
        must_avoid:
          - 每层展开讲（控制在2分钟内）
          - 技术细节（token、embedding等）
        split_if:
          - 如果时间不够，只讲五层不讲双文件
        placeholder_policy: honest_placeholder

  - slide: 5
    stage: How-2
    spec_density: full
    title: "从下载到创建：Skill进阶六阶段"
    job: 技能使用方法论，阶梯式成长路径
    evidence: 六阶段表、三步改造法
    asset_hint: 六阶段阶梯图
    visual_hint: 六阶段阶梯 + 三步改造法流程
    speaker_note_focus: 强调"大多数人卡在第3阶段筛选"
    content_spec:
      content_role: explanation
      primary_message: 技能使用有六个阶段，大多数人卡在第3阶段筛选
      on_slide_copy:
        headline: Skill进阶六阶段
        body_blocks:
          - type: bullets
            text: |
              1. 学习：读懂场景，理解适用边界
              2. 下载：拿来试用，先跑通一个场景
              3. 筛选：只留有效，淘汰低效 ← 大多数人卡在这里
              4. 融合：多Skill串成工作流
              5. 创建：用skill-creator把工作流程变成技能包
              6. 进化：基于第一性原理打分调优

              三步改造法：
              1. 先用起来：下载→跑通场景→感受效果
              2. 再改触发词：改成自己会说的自然语言
              3. 最后融合：多Skill串成工作流
      visual_blueprint:
        primary_visual:
          type: diagram
          purpose: 展示六阶段阶梯式成长
          data_refs: []
          asset_refs: []
          annotation: 阶梯从左下到右上，第3阶段标注"大多数人卡在这里"
        layout_intent:
          composition: 左侧六阶段阶梯，右侧三步改造法
          hierarchy: 六阶段 > 三步改造 > 解释
          density: medium
      data_requirements:
        metrics: []
        missing_sources: []
      narration:
        talk_time: 3分钟
        key_talking_points:
          - 强调"大多数人卡在第3阶段筛选"
          - 用例子说明融合："read-email → personal-insight-summary → scheduled-task发群"
          - 用例子说明改造："read-email"改成"帮我总结邮件"
          - 一句话总结："先把流程跑通，然后让AI总结成Skill，再基于第一性原理打分调优"
      constraints:
        must_include:
          - 六阶段表
          - 三步改造法
        must_avoid:
          - 每个阶段展开讲
          - 技术细节
        placeholder_policy: honest_placeholder

  - slide: 6
    stage: How-3
    spec_density: full
    title: "四个方法，让AI回答质量翻倍"
    job: 提问技巧核心，现场演示效果差异
    evidence: 苏格拉底式反问模板、盲点扫描模板
    asset_hint: 两组提问模板
    visual_hint: 四个方法的卡片式布局
    speaker_note_focus: 现场演示盲点扫描，让听众看到效果
    content_spec:
      content_role: explanation
      primary_message: 四个方法：苏格拉底式反问、盲点扫描、第一性原理、来源标注
      on_slide_copy:
        headline: 四个方法，让AI回答质量翻倍
        body_blocks:
          - type: bullets
            text: |
              方法 1：苏格拉底式反问
我想完成[任务目标]。我希望你能成为这方面的顶尖专家。
但在你给出具体回答之前，请先向我提出 N 个关键问题。
这些问题应该帮助你充分了解我的背景、需求和限制条件。
等我回答完这些问题后，你再根据我的回答，给出最完美的解决方案。
方法 2：盲点扫描
我正在做【任务】，目标是给【对象】看，最后要交付【结果】。
我目前知道的信息有：【材料1、材料2、材料3】。
我不熟的地方有：【行业/数据/流程/工具/老板真实意图】。
1. 请先帮我做一次盲点扫描：
2. 我可能漏掉了哪些关键信息？
3. 哪些问题会影响最终方案方向？
4. 你需要先问我哪些问题？
请先不要直接产出正文，先帮我把问题问清楚。
方法 3：第一性原理和对抗性审查
核心原则	实施方法
挖根本问题	优先思考"这到底在解决什么"，而非直接进入"怎么做"
质疑前提	对存疑的前提先纠正再执行
拒绝过度设计	评估每个动作是否服务根本目标
收口到最小必要	主动控制方案范围
现场演示：用盲点扫描模板 —
"我正在做「供应商培训分享的 AI 演示脚本」，目标是给「团队同事」看，最后要交付「可演示的 HTML 页面」。我不熟的地方有「大家真实的 AI 使用水平」。请先帮我做一次盲点扫描。"方法4:来源标注 + 置信度（李开复的防谄媚指令）
要求 AI 给重要判断标注来源类型：

[可靠事实] / [计算] / [推断] / [通用知识] / [理论模型] / [低置信]
4 级置信度：高 ≥80% / 中 50-80% / 低 20-50% / 很低 <20% / 未知
关键规则：如果不知道，第一句话直接说"我不知道"或"目前无法判断"。不要把不确定藏在后面。

  - slide: 7
    stage: Resources
    spec_density: compact
    title: "AI认知来源：去哪学、跟谁学"
    job: 推荐一手信息源，让听众知道去哪获取最新AI认知
    evidence: x.ai、GetNote
    asset_hint: 无特殊素材
    visual_hint: 两个来源卡片
    speaker_note_focus: 强调"去一手源头，不要看二手解读"
    content_spec:
      content_role: explanation
      primary_message: 最直观的一线源头是产品经理/创始人自己写的，不是媒体转述
      on_slide_copy:
        headline: 去哪学、跟谁学
        body_blocks:
          - type: bullets
            text: |
              x.ai — 一手信息聚合
              OpenAI、Anthropic、Google产品经理原始分享，不经过媒体转述

              GetNote — 实战经验沉淀
              搜使用经验，看别人怎么用的、踩过什么坑
      visual_blueprint:
        primary_visual:
          type: none
          purpose: 两个来源卡片，简洁有力
          data_refs: []
          asset_refs: []
          annotation: x.ai在上，GetNote在下
        layout_intent:
          composition: 两个卡片垂直排列
          hierarchy: 来源名 > 描述
          density: low
      narration:
        talk_time: 2分钟
        key_talking_points:
          - "学AI认知，去一手源头。二手解读会丢失细节和语境"
          - "x.ai上的原始分享，比任何'XX总结'都有价值"
          - "GetNote搜使用经验，比官方文档更接近真实使用场景"
      constraints:
        must_include:
          - x.ai
          - GetNote
        must_avoid:
          - 展开讲每个来源
        placeholder_policy: honest_placeholder

  - slide: 8
    stage: Check
    spec_density: compact
    title: "今天就试这三件事"
    job: 行动号召，让听众有明确的下一步
    evidence: -
    asset_hint: 无特殊素材
    visual_hint: 三个行动项，简洁有力
    speaker_note_focus: 强调"今天就试"，不要等到明天
    content_spec:
      content_role: cta
      primary_message: 三个今天就能试的行动：用盲点扫描、要求来源标注、查看技能市场
      on_slide_copy:
        headline: 今天就试这三件事
        body_blocks:
          - type: bullets
            text: |
              1. 对AI说"请先帮我做一次盲点扫描"
              2. 让AI回答后追问"请标注来源类型和置信度"
              3. 搜索一个你需要的Skill
      visual_blueprint:
        primary_visual:
          type: none
          purpose: 纯文字行动号召页
          data_refs: []
          asset_refs: []
          annotation: 三个行动项，编号清晰
        layout_intent:
          composition: 三个行动项，居中
          hierarchy: 标题 > 行动项
          density: low
      narration:
        talk_time: 1分钟
        key_talking_points:
          - 强调"今天就试"，不要等到明天
          - 每个行动项花20秒
          - 结尾："有任何问题，现在可以问"
      constraints:
        must_include:
          - 三个行动项
        must_avoid:
          - 理论解释
          - 新内容
        placeholder_policy: honest_placeholder
references_consulted:
  - narrative-frameworks.md
  - scenario-playbooks.md
  - content-spec-guide.md
  - myagents_files/ai-sharing-demo-outline.md
open_questions: []
```

## 交付前自检（最弱环）
- **最可能翻车处 1**：第2页产品演示——如果Zero界面加载慢或演示失败，准备30秒口头描述版备选
- **最可能翻车处 2**：第6页提问演示——如果盲点扫描演示效果不好，用PPT展示AI的反问过程
- **其余扫描通过项**：每页一个主张、标题结论式、有行动号召、有Q&A预留

---

## 附：AI 认知的来源——X 平台一手信息源

> 定位：分享结尾的"延伸资源"环节（1-2分钟口头讲，不进核心 8 页），或作为 Q&A 时被问到"去哪看 AI 动态"的标准答案。
> 核心主张：**想建立对 AI 的真实认知，别读二手解读，去 X 找一手发布。** X 是当前 AI 行业唯一的高密度实时信息源——模型上线、能力评测、产品策略、人物观点，首发几乎都在 X。

### 为什么是 X

| 维度 | X 的优势 | 二手渠道的问题 |
| --- | --- | --- |
| **时效** | 模型上线、定价调整、功能开放，首发往往就在创始人的 X 帖子 | 公众号/科技媒体有 12-48 小时滞后，且常被二次加工 |
| **密度** | 一条帖子=一个观点+一个数据+一个链接，30 秒可消化 | 长文水分大，一篇 3000 字可能只有 3 条有效信息 |
| **互动** | 可以直接在 Sam Altman / Dario 帖子下提问，偶有回复 | 单向传播，无法求证 |
| **跨界** | 研究员、产品经理、独立开发者、投资人同场发声，视角齐全 | 中文圈层隔离，难看到海外一线声音 |

### 关注谁（精选清单）

**公司官方账号**（发布动态、定价、安全报告）：
- `@OpenAI` `@AnthropicAI` `@GoogleDeepMind` `@xai` `@huggingface`
- 中文：`@月之暗面Kimi` `@智谱AI` `@DeepSeek`

**关键人物**（真实观点、非公关稿）：
| 人物 | 机构 | 看什么 |
| --- | --- | --- |
| Sam Altman | OpenAI CEO | 战略信号、新品预告 |
| Dario Amodei | Anthropic CEO | 安全观、AGI 路径 |
| Andrej Karpathy | 独立 | 技术教育、vibe coding、agentic 思辨（高价值，必看）|
| Cat Wu | Anthropic 产品 | prototype-first、eval 设计、PM 方法论 |
| Andrew Ambrosino | OpenAI Codex | agent 编排、工程实践金句（"删代码>写代码"）|
| Thariq Shihipar | Anthropic | 《Fable》系列、盲点扫描法 |
| Grant Sanderson | 3Blue1Brown | AI 的数学直觉、可视化解释 |
| Boris Cherny | Anthropic | Claude Code 设计哲学 |

**中文视角**：杨植麟（Kimi）、唐杰（智谱）、梁文锋（DeepSeek）——但不一定亲自发，关注公司号 + 钛媒体/36氪的深度访谈。

### 怎么刷（玩法）

1. **建 Lists，别刷 Home**：X 的默认时间线噪声大。建 3-4 个 List：
   - 「AI Labs」（公司号 + 创始人）
   - 「AI Builders」（PM + 研究员，如 Cat Wu / Karpathy）
   - 「AI 中文」（月之暗面 / 智谱 / 科技媒体记者）
2. **跟 Thread，不跟单帖**：重要观点常以 Thread 形式展开（如 Thariq 的 Fable、Ambrosino 的 Codex 复盘），看完整个 thread 再下判断。
3. **看 Quote Tweet**：一条帖子被引用转发时，引用者的评论往往比原帖更有价值——这是 X 的"二次校验"机制。
4. **查发帖历史**：判断一个人是否值得长期关注，看他最近 20 条帖子的信息密度，而非单条爆款。
5. **用 X 搜索**：`"Claude Code" min_faves:100 filter:threads` 这类语法能快速捞高价值讨论，比算法推荐准。

### 防坑提醒

- **警惕"AI 大 V"**：粉丝多 ≠ 懂 AI。很多中文 AI 账号是搬运+情绪输出，信息密度低。判断标准：原创比例、是否给出可验证的数据/链接。
- **区分观点与事实**：X 上观点多于事实。看到"XX 要变天了"先找一手来源（公司博客、官方帖）。
- **时间盒**：X 容易陷入信息焦虑。建议每天固定 15-20 分钟刷 List，其余时间关闭。
- **回到一手**：X 上的链接最终要回到原始博客/论文/代码库读全文，X 只是入口。