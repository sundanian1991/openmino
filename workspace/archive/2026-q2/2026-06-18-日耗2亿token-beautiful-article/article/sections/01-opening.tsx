import { Section, Quote, Aside, Raw } from "reacticle";

export function SectionOpening() {
  return (
    <Section index="01" title="兵仙与霸王：token 消耗是调用智能的能力">
      <p>
        大部分人对 token 的直觉还停留在“成本”。用了多少 token，就等于花了多少钱。但这个理解太浅了。
      </p>

      <Quote>
        「Token消耗」的本质，是一个人调用智能的能力。
      </Quote>

      <p>
        你每天能调动 10 万 token，和你每天能调动 10 亿 token，不是同一种工作方式。如果用“带兵打仗”的比喻，token 消耗能力，就是你对智能的“用兵能力”。
      </p>

      <Aside tone="principle" label="核心判断">
        重点不在于成本，而在于你用不出来。
      </Aside>

      <p>
        把数字相对简化一下。假设有两个人才：项羽每天能调用 1000 万 token，用出 10 倍 ROI；韩信每天能调用 100 亿 token，用出 2 倍 ROI。谁创造的价值更大？
      </p>

      <p>
        答案：韩信。它的用兵能力是项羽的 200 倍。霸王项羽很能打，但兵仙韩信能点兵。
      </p>

      <p>
        你要做兵仙，不要做霸王。AI 时代奖励的不是项羽，奖励的是韩信。
      </p>

      <p>
        这一切的原因在于：兵，也就是智能，极其便宜，且会越来越便宜。2 亿 token 在 O 家月包下不到 100 元人民币。但 99% 的人听到 2 亿 token，没有感觉。
      </p>

      <p>
        因为他们还在用“我今天问了 AI 几个问题”的方式理解 AI——这就像手里有一支军队，但每天只派一个士兵去门口买水，然后说军队没帮自己改变什么。当然改变不了。前者是工具，后者是组织能力。
      </p>

      <Raw title="项羽 vs 韩信：调用量与 ROI 的乘积决定用兵能力">
        <svg viewBox="0 0 560 320" width="100%" role="img" aria-label="项羽与韩信的 token 调用能力对比">
          {/* axes */}
          <line x1="60" y1="40" x2="60" y2="270" stroke="var(--ra-color-border)" strokeWidth="1" />
          <line x1="60" y1="270" x2="520" y2="270" stroke="var(--ra-color-border)" strokeWidth="1" />

          {/* grid lines */}
          <line x1="60" y1="210" x2="520" y2="210" stroke="var(--ra-color-border)" strokeWidth="0.5" opacity="0.5" />
          <line x1="60" y1="150" x2="520" y2="150" stroke="var(--ra-color-border)" strokeWidth="0.5" opacity="0.5" />
          <line x1="60" y1="90" x2="520" y2="90" stroke="var(--ra-color-border)" strokeWidth="0.5" opacity="0.5" />

          {/* Xiang Yu */}
          <circle cx="180" cy="255" r="5" fill="var(--ra-color-muted)" />
          <text x="180" y="285" textAnchor="middle" fontSize="12" fill="var(--ra-color-fg)">项羽</text>
          <text x="180" y="300" textAnchor="middle" fontSize="10" fill="var(--ra-color-muted)">1000万 token/日 · 10×ROI</text>

          {/* Han Xin */}
          <circle cx="420" cy="100" r="10" fill="var(--ra-color-risk)" opacity="0.9" />
          <text x="420" y="80" textAnchor="middle" fontSize="12" fill="var(--ra-color-fg)">韩信</text>
          <text x="420" y="65" textAnchor="middle" fontSize="10" fill="var(--ra-color-muted)">100亿 token/日 · 2×ROI</text>

          {/* slope line */}
          <line x1="186" y1="255" x2="410" y2="105" stroke="var(--ra-color-accent)" strokeWidth="1.5" strokeDasharray="4 3" />

          {/* annotations */}
          <text x="300" y="190" textAnchor="middle" fontSize="11" fill="var(--ra-color-accent)">用兵能力 = 调用量 × 有效 ROI</text>
          <text x="300" y="205" textAnchor="middle" fontSize="10" fill="var(--ra-color-muted)">韩信的有效调用能力约为项羽的 200 倍</text>

          {/* y label */}
          <text x="30" y="155" textAnchor="middle" fontSize="10" fill="var(--ra-color-muted)" transform="rotate(-90 30 155)">有效智能调用</text>
        </svg>
      </Raw>
    </Section>
  );
}
