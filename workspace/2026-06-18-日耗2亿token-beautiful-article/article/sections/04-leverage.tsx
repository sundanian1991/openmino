import { Section, Table, Raw, Aside, Quote } from "reacticle";

export function SectionLeverage() {
  return (
    <Section index="04" title="为什么200刀可能是地球上定价最低的杠杆？">
      <p>
        接下来两个 source，可以回应我在《超体邀请信》里提到的那句话：
      </p>

      <Quote source="《超体邀请信》">
        这个 200 美元的订阅包。因为 OpenAI 和 Anthropic 的激烈竞争，它们以极低的方式被定价——不仅远低于它能创造的价值，甚至还低于其实际成本。
      </Quote>

      <p>
        第二个 source 是 Peter Steinberger，也就是已经加入 O 家的小龙虾的创始人。他上周晒了团队的月度账单：一个团队通过 API 消耗了 6030 亿 token，价值 130 万美元。
      </p>

      <p>
        换句话说，从 API 接口调用的话，2 亿 token 的内部计价是 130 万美元 × 7 汇率 / 6030 × 2 ≈ 3018 元人民币。当然，Peter 后来补充说他全部使用了 Fast，如果不用 Fast，成本可以降低 70%。
      </p>

      <Table
        caption="三种 source 对 2 亿 token 成本的估算"
        columns={[
          { key: "source", label: "Source" },
          { key: "cost", label: "2 亿 token 成本", align: "right" },
          { key: "note", label: "说明" },
        ]}
        rows={[
          { source: "作者月包追踪", cost: "≈ 93 元", note: "200 刀月包，周 30 亿额度" },
          { source: "Peter Steinberger API 账单", cost: "≈ 3018 元", note: "按 API 价、含 Fast 溢价" },
          { source: "API 价打三折", cost: "≈ 1000 元", note: "若不用 Fast，成本降低 70%" },
        ]}
        source="数据来源：微信公众号原文引用。汇率按 7 估算。"
      />

      <Aside tone="note" label="结论">
        所以打一个三折：你用 93 元买到的 2 亿 token，API 价约 1000 元。换句话说，通过这个包，你用不到 100 元可以调用 1000 元的 SOTA 智能。1 折。
      </Aside>

      <p>
        第三类 source，是 X 上各类用户的自测。大体也会得到和上面接近的成本数据：每周 500 美元 = 每月 2000 美元。而你只需要花 200 美元。1 折。
      </p>

      <Raw title="价格杠杆：月包价 vs API 价">
        <svg viewBox="0 0 520 160" width="100%" role="img" aria-label="2 亿 token 的月包价与 API 价对比">
          {/* baseline */}
          <line x1="40" y1="120" x2="480" y2="120" stroke="var(--ra-color-border)" strokeWidth="1" />

          {/* API price bar */}
          <rect x="80" y="40" width="120" height="80" fill="var(--ra-color-accent)" opacity="0.25" />
          <line x1="80" y1="40" x2="200" y2="40" stroke="var(--ra-color-accent)" strokeWidth="1.5" />
          <text x="140" y="32" textAnchor="middle" fontSize="12" fill="var(--ra-color-fg)">API 价</text>
          <text x="140" y="100" textAnchor="middle" fontSize="13" fill="var(--ra-color-fg)">≈1000 元</text>

          {/* Package price bar */}
          <rect x="300" y="100" width="120" height="20" fill="var(--ra-color-risk)" opacity="0.85" />
          <text x="360" y="92" textAnchor="middle" fontSize="12" fill="var(--ra-color-fg)">200 刀月包对应价</text>
          <text x="360" y="116" textAnchor="middle" fontSize="13" fill="var(--ra-color-bg)">≈93 元</text>

          {/* brace */}
          <path d="M 210 80 Q 255 80 255 100 Q 255 120 300 110" fill="none" stroke="var(--ra-color-border)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="255" y="74" textAnchor="middle" fontSize="11" fill="var(--ra-color-muted)">约 1 折</text>
        </svg>
      </Raw>

      <Aside tone="principle" label="重点转移">
        重点早已经不在于智能的成本有多便宜，而在于当智能已经那么便宜了，你究竟能调用多少。
      </Aside>

      <p>
        如果你能用 100 块钱的智能调用创造 200 块的价值，那问题就不是“我为什么要花这么多 token”。问题是：“我为什么只能花这么少？”
      </p>
    </Section>
  );
}
