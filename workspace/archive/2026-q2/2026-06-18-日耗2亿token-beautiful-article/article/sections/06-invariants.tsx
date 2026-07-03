import { Section, Raw, Aside } from "reacticle";

export function SectionInvariants() {
  return (
    <Section index="06" title="只关注「不变」的洪流">
      <p>
        很多人天天关注模型变化、Agent 框架变化、工具迭代，这些都是很表面的东西。真正值得关注的，是以下几个「不变」的条件：
      </p>

      <Aside tone="principle" label="条件 1">
        智能的成本已经极其低了。
      </Aside>

      <Aside tone="principle" label="条件 2">
        智能的成本会持续飞速下降。
      </Aside>

      <Aside tone="principle" label="条件 3">
        人类社会对智能的需求没有上限。人类有解决不完的问题，且解决旧问题后会产生更大价值的新问题。
      </Aside>

      <Aside tone="principle" label="条件 4">
        单个人类调用智能的能力是有上限的。这个上限决定未来每个个体的上限。
      </Aside>

      <Raw title="四个不变条件 → 一个结论">
        <svg viewBox="0 0 560 320" width="100%" role="img" aria-label="四个不变条件共同推导出调用能力决定社会阶层">
          {/* four condition boxes */}
          <g>
            <rect x="20" y="20" width="110" height="60" fill="none" stroke="var(--ra-color-border)" strokeWidth="1" />
            <text x="75" y="55" textAnchor="middle" fontSize="11" fill="var(--ra-color-fg)">成本已极低</text>
          </g>
          <g>
            <rect x="155" y="20" width="110" height="60" fill="none" stroke="var(--ra-color-border)" strokeWidth="1" />
            <text x="210" y="55" textAnchor="middle" fontSize="11" fill="var(--ra-color-fg)">持续下降</text>
          </g>
          <g>
            <rect x="290" y="20" width="110" height="60" fill="none" stroke="var(--ra-color-border)" strokeWidth="1" />
            <text x="345" y="55" textAnchor="middle" fontSize="11" fill="var(--ra-color-fg)">需求无上限</text>
          </g>
          <g>
            <rect x="425" y="20" width="110" height="60" fill="none" stroke="var(--ra-color-border)" strokeWidth="1" />
            <text x="480" y="55" textAnchor="middle" fontSize="11" fill="var(--ra-color-fg)">个人调用有上限</text>
          </g>

          {/* arrows down */}
          <line x1="75" y1="80" x2="280" y2="140" stroke="var(--ra-color-accent)" strokeWidth="1" />
          <line x1="210" y1="80" x2="280" y2="140" stroke="var(--ra-color-accent)" strokeWidth="1" />
          <line x1="345" y1="80" x2="280" y2="140" stroke="var(--ra-color-accent)" strokeWidth="1" />
          <line x1="480" y1="80" x2="280" y2="140" stroke="var(--ra-color-accent)" strokeWidth="1" />

          {/* conclusion box */}
          <rect x="120" y="140" width="320" height="70" fill="none" stroke="var(--ra-color-accent)" strokeWidth="1.5" />
          <text x="280" y="172" textAnchor="middle" fontSize="13" fill="var(--ra-color-fg)">能调用智能的量级</text>
          <text x="280" y="193" textAnchor="middle" fontSize="13" fill="var(--ra-color-fg)">决定一个人未来的社会阶层</text>

          {/* implication */}
          <line x1="280" y1="210" x2="280" y2="250" stroke="var(--ra-color-border)" strokeWidth="1" strokeDasharray="3 2" />
          <text x="280" y="270" textAnchor="middle" fontSize="11" fill="var(--ra-color-muted)">关注指标：每天能消耗的 token 量</text>
          <text x="280" y="288" textAnchor="middle" fontSize="11" fill="var(--ra-color-muted)">You can only manage what you measure.</text>
        </svg>
      </Raw>

      <p>
        所以对于大部分新人来说，真正优先要关注的指标就一个，就是每天能消耗的 token 量。You can only manage what you measure.
      </p>

      <p>
        先至少达到 2 亿再说。这是一门需要靠练兵练出手感的 craft，而练兵的成本真的太低了。
      </p>
    </Section>
  );
}
