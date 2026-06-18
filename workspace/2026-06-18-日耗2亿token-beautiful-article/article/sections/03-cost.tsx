import { Section, Table, Raw, Aside } from "reacticle";

export function SectionCost() {
  return (
    <Section index="03" title="2亿 = 100元，怎么算出来的？">
      <p>
        写到这里，肯定有一部分人会问：怎么算出来的？这里就原地展开一下。
      </p>

      <p>
        第一个 source 是笔者个人的数据。目前的平均日耗在 10 亿以上（在 5.5 发布以后，比之前的日耗 5 亿有显著提升；考虑到单位 token 的智力也提升了，可以理解为整体调用智力随模型升级有约 3 倍提升），主要依靠两个 200 刀的月包。
      </p>

      <p>
        因为每天 track token 用量，所以可以得出相对可靠的数据：O 家目前的 200 刀月包，周额度在 30 亿左右，日均 4–5 亿。注意，这里还不含 O 家过去几个月隔三差五送的免费额度。如果算上的话，保守估计可以乘以 1.5 倍。
      </p>

      <Table
        caption="200 刀月包换算"
        columns={[
          { key: "item", label: "项目" },
          { key: "value", label: "数值", align: "right" },
        ]}
        rows={[
          { item: "月包价格", value: "200 美元 ≈ 1400 元人民币" },
          { item: "周额度", value: "约 30 亿 token" },
          { item: "日额度（不含赠送）", value: "约 4–5 亿 token" },
          { item: "2 亿 token 对应成本", value: "≈ 93 元人民币" },
        ]}
        source="按作者个人追踪数据估算。不含 OpenAI 赠送的免费额度。"
      />

      <Aside tone="principle" label="关键数字">
        仅按照 200 刀 = 1400 元 = 30 亿 token，得出 2 亿 token = 93 元。
      </Aside>

      <Raw title="一个快速换算：2 亿 token 能买什么？">
        <div style={{ display: "grid", gap: "var(--ra-space-3, 0.75rem)" }}>
          <div style={{ display: "flex", alignItems: "baseline", gap: "var(--ra-space-2, 0.5rem)" }}>
            <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--ra-color-fg)" }}>93 元</span>
            <span style={{ color: "var(--ra-color-muted)" }}>=</span>
            <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--ra-color-accent)", fontWeight: 500 }}>2 亿 token</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "var(--ra-space-2, 0.5rem)" }}>
            <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--ra-color-fg)" }}>1400 元</span>
            <span style={{ color: "var(--ra-color-muted)" }}>=</span>
            <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--ra-color-accent)", fontWeight: 500 }}>30 亿 token / 月</span>
          </div>
          <div style={{ display: "flex", alignItems: "baseline", gap: "var(--ra-space-2, 0.5rem)" }}>
            <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--ra-color-fg)" }}>约 47 元</span>
            <span style={{ color: "var(--ra-color-muted)" }}>=</span>
            <span style={{ fontVariantNumeric: "tabular-nums", color: "var(--ra-color-accent)", fontWeight: 500 }}>1 亿 token / 日</span>
          </div>
          <p style={{ margin: 0, fontSize: "var(--ra-text-sm, 0.95rem)", color: "var(--ra-color-muted)", lineHeight: 1.5 }}>
            换句话说，每天花不到一杯咖啡的钱，就能调用 2 亿 token 的 SOTA 智能。
          </p>
        </div>
      </Raw>
    </Section>
  );
}
