import { Section, Aside, Table, Raw } from "reacticle";

// 第八节：停止信号（认知负荷控制）
export function SectionStop() {
  return (
    <Section index="08" title="停止信号：不是每个盲区都值得看">
      <p>
        这是整个系统里最反直觉、也最体贴用户的一条设计：<strong>5 个透镜等于 5 次认知切换，每次使用
        都在付认知税</strong>。用户的时间有限，不是每个盲区都值得看。所以系统不追求"覆盖全部 25 个
        透镜"，而是用经济学的边际收益原理，主动控制输出量。
      </p>
      <p>
        逻辑很直白：第 1-2 个透镜覆盖约 80% 的核心盲区，边际收益最高；第 3 个透镜覆盖特定场景下的
        遗漏风险，边际收益递减；第 4-5 个透镜仅在决策重大、时间充裕或用户明确要求时才展开，边际
        收益最低。这就是为什么默认推荐 3-5 个而不是更多——多出来的那几个，对多数决策来说是浪费。
      </p>

      <Aside tone="principle" label="为什么快速版不是偷工减料">
        模式 A 的快速版只推 2 个透镜、输出控制在 200 字以内，看起来像"省略了"。但它的本质是用 20%
        的时间获取 80% 的价值——在快速咨询、碎片时间的场景下，用户要的是一个能立刻用的判断，不是
        一份深度报告。快速版是经过经济学计算的最优解，不是简化版。
      </Aside>

      <p>
        为了让用户能根据自己的时间和决策重要度选择深度，系统强制要求：每次模式 A 的输出必须附带
        一张<strong>盲区覆盖裁决表</strong>。这张表的关键不在透镜本身，而在"覆盖的盲区"那一列——
        它必须用第二人称描述具体盲区（"你最容易忽略的供应商在没钱赚时的真实需求"），不能写透镜名
        或抽象百分比。
      </p>

      <Table
        caption="盲区覆盖裁决表的标准格式（4 列，盲区列必须第二人称）"
        columns={[
          { key: "pri", label: "优先级" },
          { key: "lens", label: "透镜" },
          { key: "blind", label: "覆盖的盲区（第二人称）" },
          { key: "time", label: "建议投入" },
        ]}
        rows={[
          { pri: "核心（必看）", lens: "Economist + Architect", blind: "你最容易忽略的「供应商在没钱赚时的真实需求」和「联盟一年后到底长什么样」", time: "2-3 分钟" },
          { pri: "补充（建议看）", lens: "Salesperson", blind: "特定场景下「对方嘴上说的和真实动机之间的差距」", time: "1-2 分钟" },
          { pri: "深度（可选）", lens: "Philosopher + Politician", blind: "重大决策时需补充的「把这个方案推到极致会崩在哪」", time: "3-5 分钟" },
        ]}
      />

      <Raw title="盲区列的常见错误（左错右对）">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--ra-space-4, 1rem)",
            marginTop: "var(--ra-space-3, 0.75rem)",
            fontSize: "var(--ra-text-sm, 0.88rem)",
          }}
        >
          <div style={{ padding: "var(--ra-space-3, 0.75rem)", borderTop: "1px solid var(--ra-color-border, currentColor)", opacity: 0.7 }}>
            <div style={{ fontSize: "var(--ra-text-xs, 0.72rem)", color: "var(--ra-color-muted, inherit)", marginBottom: "0.3rem" }}>
              错误写法
            </div>
            <div style={{ lineHeight: 1.6 }}>
              <div>·「覆盖 80% 关键盲区」（百分比，不是盲区）</div>
              <div>·「覆盖的盲区：Economist」（透镜名）</div>
              <div>·「激励机制维度」（抽象概念）</div>
            </div>
          </div>
          <div style={{ padding: "var(--ra-space-3, 0.75rem)", borderTop: "2px solid var(--ra-color-accent, currentColor)" }}>
            <div style={{ fontSize: "var(--ra-text-xs, 0.72rem)", color: "var(--ra-color-accent, currentColor)", marginBottom: "0.3rem", fontWeight: "var(--ra-font-weight-bold, 600)" }}>
              正确写法
            </div>
            <div style={{ lineHeight: 1.6 }}>
              <div>·「你最容易忽略的供应商在没钱赚时的真实需求」</div>
              <div>·「联盟一年后到底长什么样」</div>
              <div>·「30 家里有几家真没钱赚，还是在拿没钱赚当谈判筹码」</div>
            </div>
          </div>
        </div>
      </Raw>

      <p>
        为什么非要第二人称？因为<strong>抽象的盲区描述不会刺穿问题</strong>。"覆盖激励机制维度"
        是一句正确的废话，它对任何涉及人的问题都成立；但"你最容易忽略的供应商在没钱赚时的真实需求"
        是一句会让人停下来想一下的话——它指向了用户具体处境里那个容易被略过的东西。盲区列的
        质量，直接决定裁决表是有用还是摆设。
      </p>
    </Section>
  );
}
