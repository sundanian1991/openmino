import { Section, Aside, Table } from "reacticle";

// 第六节：问题分类 → 透镜组合映射
export function SectionMapping() {
  return (
    <Section index="06" title="问题分类映射：15 类问题对应的最优透镜组合">
      <p>
        不是所有问题都需要 25 个视角。多数情况下，先判断问题类型，再调用对应的最小有效透镜组合
        （2-5 个），比无差别地全扫一遍更高效。这就是 Input Gate 第三步"查表交叉"用到的映射表——
        15 类常见问题，每类对应一组已经验证过互补结构的透镜组合。
      </p>
      <p>
        每组组合遵循同一个互补结构：<strong>诊断 → 建模 → 人际 → 推演</strong>。先找问题在哪
        （诊断），把问题结构化（建模），理解人的层面（人际），看未来会怎样（推演）。一个有效组合
        通常包含至少两类透镜，避免同类型重复。
      </p>

      <Table
        caption="15 类问题 → 最优透镜组合映射（核心盲区 + 组合逻辑）"
        columns={[
          { key: "type", label: "问题类型" },
          { key: "blind", label: "核心盲区" },
          { key: "combo", label: "推荐组合" },
        ]}
        rows={[
          { type: "人际冲突/沟通障碍", blind: "自我中心、知识诅咒、误解动机", combo: "Psychologist + Teacher + Anthropologist + Salesperson" },
          { type: "系统故障/根因不明", blind: "只看症状、忽视结构、不敢拆解", combo: "Doctor + Engineer + Hacker + Plumber" },
          { type: "战略决策/重大选择", blind: "过早收敛、忽视二阶效应", combo: "Economist + Philosopher + Chess Master + Politician" },
          { type: "创意瓶颈/同质化", blind: "思维定势、路径依赖", combo: "Artist + Entrepreneur + Critic + 强制跨界" },
          { type: "执行偏差/流程失控", blind: "纪律松弛、标准模糊", combo: "Soldier + Programmer + Designer + Accountant" },
          { type: "方案/文档审查", blind: "叙事混乱、事实偏差、受众错位", combo: "Journalist + Novelist + Designer + Politician + Critic" },
          { type: "业绩诊断/数据异常", blind: "归因错误、口径混乱、忽视比率", combo: "Doctor + Accountant + Scientist + Engineer" },
          { type: "团队激励/士气低落", blind: "激励错位、理解偏差、文化隔阂", combo: "Economist + Psychologist + Teacher + Anthropologist" },
          { type: "谈判/说服", blind: "误判筹码、忽视对方底线", combo: "Salesperson + Chess Master + Politician" },
          { type: "制度/规则设计", blind: "理想化、忽视人性、激励错位", combo: "Soldier + Programmer + Designer + Economist" },
          { type: "个人状态/决策畏缩", blind: "情绪干扰、恐惧未知、缺乏 routine", combo: "Actor + Soldier + Plumber" },
          { type: "内容创作/表达优化", blind: "信息密度低、逻辑不清", combo: "Novelist + Designer + Critic" },
          { type: "竞争策略/市场分析", blind: "忽视对手、只看自己、静态视角", combo: "Chess Master + Anthropologist + Hacker" },
          { type: "资源有限/方向不明", blind: "完美主义、不敢试错、信息过载", combo: "Entrepreneur + Artist + Journalist" },
          { type: "跨部门协作/文化冲突", blind: "本位主义、信息不对称、目标错位", combo: "Anthropologist + Teacher + Politician + Economist" },
        ]}
      />

      <Aside tone="principle" label="跨类型问题怎么处理">
        现实问题往往是跨类型的——"供应商不配合"既涉及人际又涉及系统。这时候判定主类型（最突出的
        维度）+ 标注次类型（隐藏的维度），主类型给 2 个透镜、次类型给 1 个透镜，避免透镜数量爆炸。
        输出时明确告知用户："这个问题涉及人际和系统，我先从人际切入，同时补充系统的视角。"
      </Aside>

      <p>
        这张表不是死规则，而是<strong>起点</strong>。系统的实际做法是：先用映射表选出 4-7 个候选，
        再结合用户问题的特殊性做交叉筛选——优先保留在多个类型中重复出现的透镜（重复出现说明它
        对这个问题确实关键），最后经回环验证确定 3-5 个最终组合。映射表降低选择成本，回环验证
        保证选择对准痛点。
      </p>
      <p>
        对于新手（使用次数少于 20 次），直接套用这张表就够——遇到问题查表、调用推荐组合，先在实战中
        感受每个透镜的"味道"。对于进阶用户（20-50 次），可以追问原理、微调组合。对于高手（50 次以上），
        可以基于自己的职业经验提炼第 26、27 个透镜——这套系统的边界是开放的。
      </p>
    </Section>
  );
}
