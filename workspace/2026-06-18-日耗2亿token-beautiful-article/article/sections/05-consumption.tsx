import { Section, Quote, Raw } from "reacticle";

export function SectionConsumption() {
  return (
    <Section index="05" title="一个朴素的消费观：10%">
      <p>
        然后有些人可能会说，哪怕就是一个月 1400 元，但我就是花不起。
      </p>

      <p>
        所以我在超体邀请信里也设置了一条线：月薪 12000 元以上的脑力工作者。换句话说，个人的消费观是，在刨除了必要的衣食住行以后，如果你有 1400 元的可支配消费预算，那么你月收入的至少 10% 左右，选择优先花在「调用智能」上，而不是其它消费。
      </p>

      <Quote>
        Always create more than you consume.
      </Quote>

      <p>
        用创造替代消费。这是最大的复利效应。
      </p>

      <p>
        为什么 2 亿 token 的消费很便宜？因为它本质是创造，而不是消费。
      </p>

      <p>
        这里会延展到「超体」里会系统性讲的 Harness Self 的一个系统模块，也就是多巴胺管理（人类神经系统的 Reward System）。消费（买衣服、买包包）带来的是外源性多巴胺，而创造带来的是内源性多巴胺。后者是显著更健康且有复利杠杆的，前者没有复利。
      </p>

      <Raw title="以月收入约 14000 元为例：10% 调用智能预算">
        <svg viewBox="0 0 520 120" width="100%" role="img" aria-label="月收入约 14000 元按必要支出与智能投资分配">
          {/* necessary */}
          <rect x="0" y="20" width="468" height="40" fill="var(--ra-color-accent)" opacity="0.2" />
          <text x="234" y="46" textAnchor="middle" fontSize="12" fill="var(--ra-color-fg)">必要支出</text>

          {/* ai investment */}
          <rect x="468" y="20" width="52" height="40" fill="var(--ra-color-risk)" opacity="0.85" />
          <text x="494" y="46" textAnchor="middle" fontSize="11" fill="var(--ra-color-bg)">1400 元</text>

          {/* labels */}
          <text x="0" y="85" fontSize="11" fill="var(--ra-color-muted)">0</text>
          <text x="468" y="85" textAnchor="end" fontSize="11" fill="var(--ra-color-muted)">约 90%</text>
          <text x="520" y="85" textAnchor="end" fontSize="11" fill="var(--ra-color-muted)">100%</text>
          <text x="260" y="105" fontSize="11" fill="var(--ra-color-risk)">智能投资：≈1400 元 / 月</text>
        </svg>
      </Raw>

      <p>
        这里只是表达这个朴素的消费观，并不是说所有人都要认同。这是每个人的选择。
      </p>
    </Section>
  );
}
