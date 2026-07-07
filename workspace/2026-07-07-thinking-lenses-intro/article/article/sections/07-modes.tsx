import { Section, Table, Raw } from "reacticle";

// 第七节：五种使用模式
export function SectionModes() {
  return (
    <Section index="07" title="五种使用模式：从精准诊断到强制跨界">
      <p>
        thinking-lenses 不是只有一种调用方式。根据用户的不同情境——是描述了一个具体问题、还是想全面
        扫描、还是陷入深度定势想要个离谱的角度——系统会在隐形 Check-In 阶段自动判定进入哪种模式。
        五种模式各有清晰的触发条件和流程。
      </p>

      <Raw title="五种模式速览">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: "var(--ra-space-3, 0.75rem)",
            marginTop: "var(--ra-space-3, 0.75rem)",
          }}
        >
          {[
            { tag: "A", name: "精准诊断", trig: "具体问题描述（默认）", out: "盲区裁决表 + 3-5 透镜 + 行动优先级", acc: true },
            { tag: "B", name: "全视角扫描", trig: "「全面看看」「有没有漏掉」", out: "高/中/低分组 + 高风险盲区标记", acc: false },
            { tag: "C", name: "强制跨界", trig: "「来个离谱的」「换个反直觉的」", out: "最不相关的 2 透镜组合 + 认知冲突", acc: false },
            { tag: "D", name: "单透镜深入", trig: "「用 XX 视角看看」", out: "该透镜完整解释 + 3-4 层递进问题", acc: false },
            { tag: "E", name: "内容审查", trig: "「帮我审一下」+ 内容", out: "逐条发现 + 严重度标注（必改/优化/可考虑）", acc: false },
          ].map((m) => (
            <div
              key={m.tag}
              style={{
                padding: "var(--ra-space-3, 0.75rem)",
                borderTop: m.acc ? "2px solid var(--ra-color-accent, currentColor)" : "1px solid var(--ra-color-border, currentColor)",
              }}
            >
              <div style={{ display: "flex", alignItems: "baseline", gap: "0.4rem", marginBottom: "0.4rem" }}>
                <span
                  style={{
                    fontSize: "var(--ra-text-lg, 1.15rem)",
                    fontWeight: "var(--ra-font-weight-bold, 700)",
                    color: m.acc ? "var(--ra-color-accent, currentColor)" : "var(--ra-color-fg, inherit)",
                    fontFamily: "var(--ra-font-serif, Georgia, serif)",
                  }}
                >
                  {m.tag}
                </span>
                <span style={{ fontSize: "var(--ra-text-sm, 0.9rem)", fontWeight: "var(--ra-font-weight-bold, 600)" }}>
                  {m.name}
                </span>
                {m.acc && (
                  <span style={{ fontSize: "var(--ra-text-xs, 0.68rem)", color: "var(--ra-color-accent, currentColor)", letterSpacing: "0.08em" }}>
                    默认
                  </span>
                )}
              </div>
              <div style={{ fontSize: "var(--ra-text-xs, 0.76rem)", color: "var(--ra-color-muted, inherit)", lineHeight: 1.5 }}>
                <div><span style={{ opacity: 0.7 }}>触发：</span>{m.trig}</div>
                <div style={{ marginTop: "0.25rem" }}><span style={{ opacity: 0.7 }}>产出：</span>{m.out}</div>
              </div>
            </div>
          ))}
        </div>
      </Raw>

      <p>
        <strong>模式 A 精准诊断</strong>是默认模式，也是设计最细的。它的核心不是"推荐几个透镜"，
        而是<strong>盲区覆盖裁决</strong>——每次输出必须先给一张表，按"核心盲区（必看，Top 2，覆盖
        约 80% 高频盲区）/ 补充盲区（建议看，第 3 个）/ 深度盲区（可选，第 4-5 个）"分级，让用户
        根据自己的时间和决策重要度选择看到多深。这张表的存在，是为了对抗"越多越好"的错觉。
      </p>
      <p>
        模式 A 还有两个子版。<strong>深挖版</strong>用于用户对第一轮结果追问"更全面""更深入"时：
        第一轮看机制层（系统、激励、流程），第二轮定向补人和体验层（文化、叙事、心理、感知）——
        不是重复扫描，是基于第一轮盲区的补充。<strong>快速版</strong>用于"简单说说""一句话"或输入
        很短的场景：只推 Top 2 透镜，每个给一句话匹配 + 一个核心问题，输出控制在 200 字以内。
      </p>

      <Table
        caption="模式 A 的三个版本对比"
        columns={[
          { key: "dim", label: "维度" },
          { key: "quick", label: "快速版" },
          { key: "full", label: "完整版" },
          { key: "deep", label: "深挖版" },
        ]}
        rows={[
          { dim: "透镜数量", quick: "2 个", full: "3-5 个", deep: "两轮共 6-8 个" },
          { dim: "覆盖类别", quick: "1-2 个", full: "3-4 个", deep: "6-7 个（机制+人+体验）" },
          { dim: "输出长度", quick: "<200 字", full: "不限", deep: "两份合并" },
          { dim: "使用场景", quick: "快速咨询、碎片时间", full: "深度分析、重要决策", deep: "第一轮不够、需补盲区" },
        ]}
      />

      <p>
        <strong>模式 B 全视角扫描</strong>把 25 个透镜按问题性质分成高/中/低相关三组，每组选 2-3 个
        最有洞察力的提问，用结构化格式输出，并标记"高风险盲区"——你最可能漏掉的那几类。
        <strong>模式 C 强制跨界</strong>是反直觉模式：识别你当前最常用的思维习惯，故意推荐最不相关、
        最反直觉的 2 个透镜组合（比如 Artist + Plumber），强制制造认知冲突来打破框架。
      </p>
      <p>
        <strong>模式 D 单透镜深入</strong>用于用户主动指定"我想用 XX 的视角"时：加载该透镜的完整解释，
        提出 3-4 个层层递进的引导问题，帮助用户把洞察转化为可执行结论。
        <strong>模式 E 内容审查</strong>专门处理"帮我审一下这段方案/邮件/PPT"——自动选取一组沟通类
        透镜（Journalist 核查事实、Novelist 看叙事、Designer 看信息设计、Politician 看受众感知、
        Critic 做深度解读），逐条标注严重度：必须改、建议优化、可考虑。
      </p>

      <Raw title="快捷指令速查：说什么话触发什么模式">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "auto 1fr auto",
            gap: "var(--ra-space-2, 0.5rem) var(--ra-space-4, 1rem)",
            marginTop: "var(--ra-space-3, 0.75rem)",
            fontSize: "var(--ra-text-sm, 0.88rem)",
            alignItems: "baseline",
          }}
        >
          {[
            { cmd: "「帮我审一下」/「过一遍」+ 内容", mode: "E 内容审查" },
            { cmd: "「扫一下」/「全面看看」", mode: "B 全视角扫描" },
            { cmd: "「用 [职业] 视角」/「从 [职业] 角度」", mode: "D 单透镜深入" },
            { cmd: "「来个离谱的」/「换个反直觉的」", mode: "C 强制跨界" },
            { cmd: "「帮我看看」（无具体描述）", mode: "先 Check-In 再 A" },
            { cmd: "具体问题描述（默认）", mode: "A 精准诊断" },
          ].map((r, i) => (
            <div key={i} style={{ display: "contents" }}>
              <span style={{ color: "var(--ra-color-muted, inherit)", borderBottom: i % 2 === 0 ? "none" : "1px dashed var(--ra-color-border, currentColor)", padding: "0.3rem 0" }}>{r.cmd}</span>
              <span style={{ padding: "0.3rem 0", borderBottom: i % 2 === 0 ? "none" : "1px dashed var(--ra-color-border, currentColor)" }} />
              <span style={{ color: "var(--ra-color-accent, currentColor)", fontWeight: "var(--ra-font-weight-bold, 600)", borderBottom: i % 2 === 0 ? "none" : "1px dashed var(--ra-color-border, currentColor)", padding: "0.3rem 0" }}>
                {r.mode}
              </span>
            </div>
          ))}
        </div>
      </Raw>
    </Section>
  );
}
