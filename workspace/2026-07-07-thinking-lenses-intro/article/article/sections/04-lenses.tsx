import { Section, Raw } from "reacticle";

// 第四节：25 个思维透镜完整清单（按 5 家族组织）
export function SectionLenses() {
  const families = [
    {
      name: "诊断组",
      subtitle: "看清「是什么」",
      lenses: [
        { en: "Doctor", zh: "医生", q: "What's the Diagnosis?", steps: 6, lang: "主诉 / 鉴别诊断 / 病变", best: "根因分析、故障排查" },
        { en: "Journalist", zh: "记者", q: "Just the Facts", steps: 5, lang: "观察 / 一级推断 / 二级推断 / 假设", best: "事实核查、去情绪化" },
        { en: "Accountant", zh: "会计师", q: "Watch the Ratios", steps: 5, lang: "比率 / 异动 / 基准线", best: "数据诊断、隐藏问题" },
        { en: "Hacker", zh: "黑客", q: "What's Really Going on Underneath?", steps: 5, lang: "表面声明 / 信任边界 / 利用链", best: "深层机制、系统漏洞" },
        { en: "Plumber", zh: "水管工", q: "Take it Apart and See What's Broken", steps: 5, lang: "拆开 / 部件 / 连接处 / 堵塞", best: "系统拆解、动手实践" },
      ],
    },
    {
      name: "推演组",
      subtitle: "预判「会怎样」",
      lenses: [
        { en: "Chess Master", zh: "象棋大师", q: "See The Moves In Your Mind's Eye", steps: 6, lang: "局面 / 着法 / 应对 / 变化", best: "多步预判、通用分析" },
        { en: "Engineer", zh: "工程师", q: "Can I Model This and Calculate?", steps: 6, lang: "变量 / 约束 / 输入 / 输出 / 弹性", best: "建模量化、模糊决策" },
        { en: "Economist", zh: "经济学家", q: "How Do People React to Incentives?", steps: 5, lang: "激励 / 边际 / 权衡 / 均衡", best: "激励设计、行为预测" },
        { en: "Philosopher", zh: "哲学家", q: "What are the Unexpected Consequences?", steps: 6, lang: "前提 / 推论 / 极限 / 崩溃", best: "极限推演、二阶效应" },
        { en: "Architect", zh: "建筑师", q: "Envisioning the Future", steps: 5, lang: "蓝图 / 结构 / 空间 / 体验", best: "长期规划、愿景构建" },
      ],
    },
    {
      name: "共情组",
      subtitle: "理解「他们要什么」",
      lenses: [
        { en: "Salesperson", zh: "销售", q: "Understand Their Minds Better than They Do", steps: 6, lang: "需求 / 痛点 / 动机 / 筹码", best: "谈判准备、客户洞察" },
        { en: "Anthropologist", zh: "人类学家", q: "Can You Immerse and Join Another Culture?", steps: 5, lang: "文化 / 语言 / 仪式 / 局内人", best: "跨部门协作、文化差异" },
        { en: "Psychologist", zh: "心理学家", q: "Test Your Understanding of Other People", steps: 5, lang: "检验 / 验证 / 预测 / 反馈", best: "人际冲突、认知偏差" },
        { en: "Teacher", zh: "教师", q: "Can You See What it is Like Not to Know?", steps: 5, lang: "已知 / 未知 / 前提知识 / 误解", best: "知识诅咒、沟通障碍" },
        { en: "Politician", zh: "政治家", q: "What Will People Believe?", steps: 5, lang: "信念 / 解读 / 联盟 / 叙事", best: "感知管理、利益相关者" },
        { en: "Actor", zh: "演员", q: "The Best Way to Pretend is to Be Real", steps: 5, lang: "感受 / 状态 / 唤起 / 角色", best: "状态管理、情绪调节" },
      ],
    },
    {
      name: "构建组",
      subtitle: "创造「怎么做」",
      lenses: [
        { en: "Programmer", zh: "程序员", q: "What's the Pattern I Can Automate?", steps: 5, lang: "模式 / 规则 / 输入 / 输出 / 重构", best: "流程自动化、标准化" },
        { en: "Designer", zh: "设计师", q: "The Things You Make Communicate For You", steps: 5, lang: "形式 / 引导 / 暗示 / 自解释", best: "信息设计、体验优化" },
        { en: "Novelist", zh: "小说家", q: "Does Your Story Make Sense?", steps: 5, lang: "角色 / 情节 / 动机 / 连贯", best: "叙事结构、说服力" },
        { en: "Entrepreneur", zh: "企业家", q: "Do a Lot of Things; See What Works", steps: 5, lang: "验证 / 迭代 / 假设 / 速度", best: "资源有限、快速验证" },
        { en: "Artist", zh: "艺术家", q: "What if Creativity Were the Priority?", steps: 5, lang: "独特 / 有趣 / 约束 / 新奇", best: "创意瓶颈、差异化" },
      ],
    },
    {
      name: "验证组",
      subtitle: "检验「对不对」",
      lenses: [
        { en: "Mathematician", zh: "数学家", q: "You Don't Know Until You Can Prove It", steps: 5, lang: "证明 / 证伪 / 前提 / 命题", best: "逻辑严谨、漏洞排查" },
        { en: "Scientist", zh: "科学家", q: "Make a Hypothesis and Test It", steps: 5, lang: "假设 / 零假设 / 实验 / 变量", best: "假设验证、因果推断" },
        { en: "Critic", zh: "评论家", q: "Can You Build on The Work of Others?", steps: 5, lang: "作品 / 脉络 / 位置 / 超越", best: "深度解读、二次创作" },
        { en: "Soldier", zh: "军人", q: "Routine and Discipline Prevent Deadly Mistakes", steps: 5, lang: "流程 / 检查点 / 纪律 / 保护", best: "关键流程、安全合规" },
      ],
    },
  ];

  return (
    <Section index="04" title="25 个思维透镜：按家族组织的完整清单">
      <p>
        这 25 个透镜不是随机排列，而是按它们解决的认知问题归入五个家族。每个家族承担一种思维职能：
        诊断组找问题在哪、推演组看未来会怎样、共情组理解人要什么、构建组想怎么做、验证组检验对不对。
        注意共情组有 6 个透镜（人多复杂，需要的视角更多）、验证组只有 4 个——这是按实际洞察力分布来的，
        不是为了凑数。
      </p>
      <p>
        下面每个透镜列出四样东西：<strong>核心问题</strong>（一句话点破它怎么看世界）、<strong>协议步数</strong>
        （3-6 步微型算法）、<strong>语言约束</strong>（必须使用的职业术语）、<strong>最佳场景</strong>。
        Engineer、Programmer、Mathematician 跨两个类别——它们既能建模也能验证，既能构建也能求真。
      </p>

      <Raw title="25 透镜家族矩阵（点开任一卡片看协议要点）">
        <div style={{ marginTop: "var(--ra-space-3, 0.75rem)" }}>
          {families.map((fam, fi) => (
            <div key={fi} style={{ marginBottom: "var(--ra-space-5, 2rem)" }}>
              {/* 家族头 */}
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "var(--ra-space-3, 0.75rem)",
                  paddingBottom: "var(--ra-space-2, 0.5rem)",
                  marginBottom: "var(--ra-space-3, 0.75rem)",
                  borderBottom: "2px solid var(--ra-color-accent, currentColor)",
                }}
              >
                <span
                  style={{
                    fontSize: "var(--ra-text-lg, 1.1rem)",
                    fontWeight: "var(--ra-font-weight-bold, 700)",
                    color: "var(--ra-color-fg, inherit)",
                    fontFamily: "var(--ra-font-serif, Georgia, serif)",
                  }}
                >
                  {fam.name}
                </span>
                <span
                  style={{
                    fontSize: "var(--ra-text-sm, 0.88rem)",
                    color: "var(--ra-color-muted, inherit)",
                    letterSpacing: "0.05em",
                  }}
                >
                  {fam.subtitle}
                </span>
              </div>
              {/* 透镜卡片网格 */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
                  gap: "var(--ra-space-3, 0.75rem)",
                }}
              >
                {fam.lenses.map((lens, li) => (
                  <div
                    key={li}
                    style={{
                      padding: "var(--ra-space-3, 0.75rem) var(--ra-space-4, 1rem)",
                      borderTop: "1px solid var(--ra-color-border, currentColor)",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "baseline",
                        justifyContent: "space-between",
                        marginBottom: "0.3rem",
                      }}
                    >
                      <span style={{ fontWeight: "var(--ra-font-weight-bold, 600)", fontSize: "var(--ra-text-base, 1rem)" }}>
                        {lens.en}
                        <span style={{ color: "var(--ra-color-muted, inherit)", fontWeight: "normal", marginLeft: "0.3rem", fontSize: "var(--ra-text-sm, 0.88rem)" }}>
                          （{lens.zh}）
                        </span>
                      </span>
                      <span
                        style={{
                          fontSize: "var(--ra-text-xs, 0.7rem)",
                          color: "var(--ra-color-accent, currentColor)",
                          fontWeight: "var(--ra-font-weight-bold, 600)",
                          letterSpacing: "0.05em",
                        }}
                      >
                        {lens.steps} 步
                      </span>
                    </div>
                    <div
                      style={{
                        fontSize: "var(--ra-text-sm, 0.85rem)",
                        fontStyle: "normal",
                        color: "var(--ra-color-fg, inherit)",
                        marginBottom: "0.4rem",
                        lineHeight: 1.4,
                        paddingLeft: "var(--ra-space-3, 0.75rem)",
                        borderLeft: "2px solid var(--ra-color-accent, currentColor)",
                      }}
                    >
                      {lens.q}
                    </div>
                    <div
                      style={{
                        fontSize: "var(--ra-text-xs, 0.74rem)",
                        color: "var(--ra-color-muted, inherit)",
                        lineHeight: 1.5,
                      }}
                    >
                      <div>
                        <span style={{ opacity: 0.7 }}>语言：</span>
                        {lens.lang}
                      </div>
                      <div style={{ marginTop: "0.2rem" }}>
                        <span style={{ opacity: 0.7 }}>擅长：</span>
                        {lens.best}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Raw>

      <p>
        这张清单的价值不在于"记住 25 个名字"，而在于<strong>建立一种条件反射</strong>：遇到问题时，
        能快速判断"这个问题最缺的是诊断、推演、共情、构建，还是验证"。多数人习惯性地只用其中两三类
        透镜（比如工程师惯用建模和诊断，却几乎不用共情和验证），剩下的就是盲区。25 个透镜存在的意义，
        就是让盲区有名字、可被调用。
      </p>
    </Section>
  );
}
