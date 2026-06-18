import { Section, Quote, Raw } from "reacticle";

// Section 01：用兵能力 —— 项羽 vs 韩信
// 核心论点：Token消耗的本质是调用智能的能力，不是成本
export function SectionTokenAsArtOfWar() {
  return (
    <Section index="01" title="用兵能力：项羽 vs 韩信">
      <p>
        大部分人对 token 的直觉还停留在"成本"。用了多少 token，就等于花了多少钱。但这个理解太浅了。Token消耗的本质，是一个人调用智能的能力。
      </p>

      <p>
        如果用"带兵打仗"的比喻，token 消耗能力，就是你对于智能的"用兵能力"。当然，这个消耗量基于一个 sensible 的条件——排除用 token 看 100 集迪迦奥特曼的情况。衡量消耗能力的前提是：单位 token 创造的价值大于 token 的成本。
      </p>

      <p>
        这时就有人说"用 AI 不在于消耗量大，而在于用在刀刃上"。微观上看，这句话对；放大尺度看，这句话错。
      </p>

      <Raw title="项羽 vs 韩信：两种用兵能力">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "var(--ra-space-4, 1rem)",
            margin: "var(--ra-space-5, 1.5rem) 0",
          }}
        >
          {/* 项羽 */}
          <div
            style={{
              padding: "var(--ra-space-4, 1rem)",
              border: "1px solid var(--ra-color-border, currentColor)",
            }}
          >
            <div
              style={{
                fontSize: "var(--ra-text-sm, 0.875rem)",
                color: "var(--ra-color-muted, inherit)",
                marginBottom: "var(--ra-space-2, 0.5rem)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              霸王项羽
            </div>
            <div
              style={{
                fontSize: "var(--ra-text-2xl, 1.5rem)",
                fontWeight: 700,
                marginBottom: "var(--ra-space-2, 0.5rem)",
              }}
            >
              1,000 万 token / 天
            </div>
            <div
              style={{
                fontSize: "var(--ra-text-lg, 1.125rem)",
                color: "var(--ra-color-accent, inherit)",
              }}
            >
              10 倍 ROI
            </div>
            <div
              style={{
                marginTop: "var(--ra-space-3, 0.75rem)",
                fontSize: "var(--ra-text-sm, 0.875rem)",
                color: "var(--ra-color-muted, inherit)",
              }}
            >
              很能打，刀法漂亮
            </div>
          </div>

          {/* 韩信 */}
          <div
            style={{
              padding: "var(--ra-space-4, 1rem)",
              border: "2px solid var(--ra-color-accent, currentColor)",
            }}
          >
            <div
              style={{
                fontSize: "var(--ra-text-sm, 0.875rem)",
                color: "var(--ra-color-muted, inherit)",
                marginBottom: "var(--ra-space-2, 0.5rem)",
                letterSpacing: "0.05em",
                textTransform: "uppercase",
              }}
            >
              兵仙韩信
            </div>
            <div
              style={{
                fontSize: "var(--ra-text-2xl, 1.5rem)",
                fontWeight: 700,
                marginBottom: "var(--ra-space-2, 0.5rem)",
              }}
            >
              100 亿 token / 天
            </div>
            <div
              style={{
                fontSize: "var(--ra-text-lg, 1.125rem)",
                color: "var(--ra-color-accent, inherit)",
              }}
            >
              2 倍 ROI
            </div>
            <div
              style={{
                marginTop: "var(--ra-space-3, 0.75rem)",
                fontSize: "var(--ra-text-sm, 0.875rem)",
                color: "var(--ra-color-muted, inherit)",
              }}
            >
              用兵能力是项羽的 200 倍
            </div>
          </div>
        </div>
      </Raw>

      <p>
        哪个人的价值更大？答案是韩信。霸王项羽很能打，但兵仙韩信能点兵。你要做兵仙，不要做霸王。当然，如果你关注的是上场砍人的刀法有多漂亮，你自然会觉得项羽和他的 28 铁骑很厉害。但 AI 时代奖励的不是项羽，奖励的是韩信。
      </p>

      <Quote source="奶牛Denny">
        重点不在于成本，而在于你用不出来。
      </Quote>

      <p>
        这一切的原因是：兵，也就是智能，极其便宜，且会越来越便宜。2 亿 token，在 OpenAI 的 package 下面，大概也就不到 50 元人民币。但 99% 的人听到 2 亿 token，没有感觉。甚至很多已经在 vibe coding 的人，也没有感觉。
      </p>

      <p>
        因为他们还在用"我今天问了 AI 几个问题"、"我用 AI 做了几个小应用"的方式理解 AI——这就像一个人手里有一支军队，但每天只派一个士兵去门口买水。然后他说，这支军队好像也没帮我改变什么。当然改变不了。因为你没有真的调用它，你只是偶尔使用它。
      </p>

      <p>
        前者是工具，后者是组织能力。
      </p>
    </Section>
  );
}
