import { Section, Aside, Table, Raw } from "reacticle";

// 第十节：咏春哲学 — 深度与广度的组合
export function SectionWingChun() {
  return (
    <Section index="10" title="咏春哲学：透镜负责广度，咏春负责深度">
      <p>
        这是 thinking-lenses 最有特色的一个设计：它把 25 个思维透镜和咏春拳的四大支柱做了对应。
        听起来跨界得有点奇怪——一个思维工具为什么要借武术哲学？答案在于<strong>广度和深度的分工</strong>：
        透镜擅长快速扫描多个维度（广度），但不擅长在找到核心后一击制胜（深度）；咏春正好相反，
        它的哲学是关于如何用最小结构撬动最大改变（深度）。两者组合，正好补齐彼此的短板。
      </p>

      <Table
        caption="咏春四支柱 ↔ 认知原理类别的对应"
        columns={[
          { key: "pillar", label: "咏春支柱" },
          { key: "mean", label: "核心含义" },
          { key: "cat", label: "对应认知类别" },
          { key: "lens", label: "具体透镜" },
        ]}
        rows={[
          { pillar: "结构 > 力量", mean: "角度和框架优于蛮力", cat: "建模类", lens: "Engineer、Architect、Programmer" },
          { pillar: "守中用中", mean: "控制核心通道，找最优破局点", cat: "诊断类", lens: "Doctor、Accountant、Hacker" },
          { pillar: "同时攻防", mean: "化解阻力同时直达目的", cat: "推演类", lens: "Chess Master、Philosopher、Politician" },
          { pillar: "小念头", mean: "回到最原初的基本结构", cat: "求真类", lens: "Journalist、Scientist、Mathematician" },
        ]}
      />

      <Aside tone="principle" label="为什么是这个对应">
        咏春的"结构大于力量"和建模类的"用变量与关系预测结果"本质相同——都不靠蛮力硬撑，
        而是找到正确的结构让问题自然解决。"守中用中"和诊断类的"从症状找根因"也同源——
        都是定位那个一旦撬动就能牵一发而动全身的关键点。武术和思维工具在底层是同一套关于
        "效率"的哲学。
      </Aside>

      <p>
        实战中的组合公式是：<strong>先用透镜扫描（广度）→ 再用咏春破局（深度）</strong>。具体四步：
        问题出现时，先用问题分类映射表选出 2-5 个最相关的透镜；透镜扫描快速暴露盲区、收集多维度
        信息；找到核心后，用咏春的"守中用中"定位最关键的 1-2 个破局点；最后用"结构大于力量"
        设计一个最小调整来撬动最大改变。
      </p>

      <Raw title="实战示例：供应商不配合（跨类型问题）">
        <div
          style={{
            marginTop: "var(--ra-space-3, 0.75rem)",
            padding: "var(--ra-space-4, 1rem)",
            borderLeft: "3px solid var(--ra-color-accent, currentColor)",
            background: "var(--ra-color-surface, transparent)",
          }}
        >
          <div style={{ fontSize: "var(--ra-text-sm, 0.9rem)", lineHeight: 1.8 }}>
            <div style={{ marginBottom: "var(--ra-space-3, 0.75rem)" }}>
              <span style={{ color: "var(--ra-color-accent, currentColor)", fontWeight: "var(--ra-font-weight-bold, 600)" }}>第一步 · 透镜扫描（广度）</span>
              <div style={{ color: "var(--ra-color-muted, inherit)", marginTop: "0.2rem" }}>
                Economist（激励错位？）+ Salesperson（真实动机？）+ Hacker（组织层级卡在哪？）
              </div>
            </div>
            <div style={{ marginBottom: "var(--ra-space-3, 0.75rem)" }}>
              <span style={{ color: "var(--ra-color-accent, currentColor)", fontWeight: "var(--ra-font-weight-bold, 600)" }}>第二步 · 找到核心</span>
              <div style={{ color: "var(--ra-color-muted, inherit)", marginTop: "0.2rem" }}>
                发现是"结算周期"——Economist 识别出的激励问题，根源在现金流时点
              </div>
            </div>
            <div style={{ marginBottom: "var(--ra-space-3, 0.75rem)" }}>
              <span style={{ color: "var(--ra-color-accent, currentColor)", fontWeight: "var(--ra-font-weight-bold, 600)" }}>第三步 · 守中用中（深度破局）</span>
              <div style={{ color: "var(--ra-color-muted, inherit)", marginTop: "0.2rem" }}>
                结算周期是核心通道——调整它同时解决激励和现金流，一个动作解两个结
              </div>
            </div>
            <div>
              <span style={{ color: "var(--ra-color-accent, currentColor)", fontWeight: "var(--ra-font-weight-bold, 600)" }}>第四步 · 同时攻防</span>
              <div style={{ color: "var(--ra-color-muted, inherit)", marginTop: "0.2rem" }}>
                调整结算周期的同时，建立新的评估机制——防止供应商得寸进尺（攻防同时）
              </div>
            </div>
          </div>
        </div>
      </Raw>

      <p>
        这个组合的妙处在于：<strong>透镜负责把问题看全，咏春负责把动作做精</strong>。只透镜不咏春，
        容易看完一堆维度却不知道先动哪个；只咏春不透镜，容易一击即出但打错了地方。两者结合，
        才是"既看准又打狠"。这也呼应了系统一贯的设计哲学——不是给更多的工具，而是给工具之间
        更好的协作方式。
      </p>

      <p>
        回到最初的蜡烛实验：那个盒子之所以被忽视，不是因为它不存在，而是因为思维固化让人只把它
        看作"容器"。thinking-lenses 想做的，就是让你在面对任何一个问题时，脑子里能同时浮现 25 种
        看它的方式——不是为了每次都用上全部 25 种，而是为了在需要换一种看法的时候，知道还有哪些
        钥匙可以试。这就是芒格那句话的实操含义：更多的思维模型，意味着更多解决问题的办法。
      </p>
    </Section>
  );
}
