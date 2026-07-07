import { Section, Aside, Table, Raw } from "reacticle";

// 第五节：认知原理七分类
export function SectionPrinciples() {
  return (
    <Section index="05" title="认知原理七分类：透镜选择的底层逻辑">
      <p>
        如果说五个家族是按"职能"分组，那七分类是按<strong>底层认知机制</strong>分组——它回答一个更深的
        问题：每个透镜本质上在调用哪一种思维操作？"职业"只是认知原理的载体，真正起作用的不是"医生"
        这个身份，而是"根因分析"这个机制。
      </p>
      <p>
        这套分类的核心用途是<strong>跨类别覆盖检查</strong>：选透镜组合时，必须确保覆盖至少 3 个不同
        类别。如果一组透镜全是诊断类（Doctor + Accountant + Engineer），即使有三个透镜，思考维度
        其实只在一个层面上打转——都在"找问题在哪"，没有人看未来、没有人理解人。覆盖至少三类，
        才能保证组合的异质性。
      </p>

      <Table
        caption="认知原理七分类：每个透镜的底层机制与一句话定义"
        columns={[
          { key: "cat", label: "类别" },
          { key: "mech", label: "核心机制" },
          { key: "lens", label: "透镜" },
          { key: "one", label: "一句话" },
        ]}
        rows={[
          { cat: "诊断类", mech: "从症状到根因", lens: "Doctor, Accountant, Engineer, Hacker", one: "找到问题在哪" },
          { cat: "建模类", mech: "抽象、量化、预测", lens: "Engineer, Architect, Programmer, Mathematician", one: "把问题结构化" },
          { cat: "人际类", mech: "动机推断、认知弥合", lens: "Salesperson, Psychologist, Teacher, Anthropologist, Economist", one: "理解人" },
          { cat: "推演类", mech: "多步预判、极限检验", lens: "Chess Master, Philosopher, Politician", one: "看未来会怎样" },
          { cat: "创意类", mech: "约束释放、快速试错", lens: "Artist, Entrepreneur, Critic, Novelist", one: "打破定势" },
          { cat: "执行类", mech: "纪律、自动化、设计", lens: "Soldier, Programmer, Designer, Plumber", one: "保落地" },
          { cat: "求真类", mech: "事实核查、假设检验", lens: "Journalist, Scientist, Mathematician", one: "去噪音" },
        ]}
      />

      <Aside tone="principle" label="为什么是七类不是五类">
        五大家族按"职能"分（看清楚/预判/理解/构建/验证），方便记忆和快速调用。
        七分类按"机制"分（诊断/建模/人际/推演/创意/执行/求真），更细，专门用于选组合时做覆盖检查。
        两套分类交叉使用：日常用家族速查，选组合时用七类验证异质性。
      </Aside>

      <p>
        每个类别都有自己的<strong>共同盲区</strong>——这是跨类别覆盖检查的另一个理由。诊断类容易过度
        分析、忽视情绪；建模类容易把模型当现实、忽视假设边界；人际类容易过度解读、把简单行为复杂化；
        推演类容易分析瘫痪、想太多做太少；创意类容易脱离现实、产出不可行方案；执行类容易僵化、
        把流程当目的；求真类在紧急场景下可能过度延迟决策。一个透镜组合如果只集中在一个类别，
        就会把这个类别的盲区放大。
      </p>

      <Raw title="七分类的跨类别覆盖：为什么 3 个诊断类透镜不如 3 个异类透镜">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--ra-space-4, 1rem)",
            marginTop: "var(--ra-space-3, 0.75rem)",
          }}
        >
          <div style={{ padding: "var(--ra-space-3, 0.75rem)", borderTop: "2px solid var(--ra-color-border, currentColor)", opacity: 0.7 }}>
            <div style={{ fontSize: "var(--ra-text-xs, 0.72rem)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ra-color-muted, inherit)", marginBottom: "0.4rem" }}>
              同类堆叠（差）
            </div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {["Doctor", "Accountant", "Engineer"].map((l) => (
                <span key={l} style={{ fontSize: "var(--ra-text-xs, 0.74rem)", padding: "0.2rem 0.5rem", border: "1px solid var(--ra-color-border, currentColor)", color: "var(--ra-color-muted, inherit)" }}>
                  {l}
                </span>
              ))}
            </div>
            <div style={{ fontSize: "var(--ra-text-xs, 0.74rem)", color: "var(--ra-color-muted, inherit)", marginTop: "0.5rem", lineHeight: 1.5 }}>
              全是诊断类 → 都在找问题，没人看未来、没人理解人。盲区重叠，洞察不会比单个透镜多多少。
            </div>
          </div>
          <div style={{ padding: "var(--ra-space-3, 0.75rem)", borderTop: "2px solid var(--ra-color-accent, currentColor)" }}>
            <div style={{ fontSize: "var(--ra-text-xs, 0.72rem)", letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--ra-color-accent, currentColor)", marginBottom: "0.4rem", fontWeight: "var(--ra-font-weight-bold, 600)" }}>
              异类覆盖（好）
            </div>
            <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
              {["Doctor", "Salesperson", "Chess Master"].map((l) => (
                <span key={l} style={{ fontSize: "var(--ra-text-xs, 0.74rem)", padding: "0.2rem 0.5rem", border: "1px solid var(--ra-color-accent, currentColor)", color: "var(--ra-color-accent, currentColor)" }}>
                  {l}
                </span>
              ))}
            </div>
            <div style={{ fontSize: "var(--ra-text-xs, 0.74rem)", color: "var(--ra-color-muted, inherit)", marginTop: "0.5rem", lineHeight: 1.5 }}>
              诊断 + 人际 + 推演 → 找问题、理解动机、预判连锁反应。三类盲区互补，能涌现单个视角看不到的判断。
            </div>
          </div>
        </div>
      </Raw>

      <p>
        Engineer、Programmer、Mathematician 跨两个类别——Engineer 既能诊断（建模找问题）也能构建
        （搭系统），Programmer 既能建模（抽象模式）也能执行（自动化），Mathematician 既能建模
        （严谨结构）也能求真（可证伪）。选组合时它们可以计入其中任一类别来满足覆盖要求，这让
        组合设计更灵活。
      </p>
    </Section>
  );
}
