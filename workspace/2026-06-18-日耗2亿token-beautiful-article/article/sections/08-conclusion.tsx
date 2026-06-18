import { Section, Quote, Raw } from "reacticle";

export function SectionConclusion() {
  return (
    <Section index="08" title="写在最后，关于超体">
      <p>
        以上，是为什么我创立「超体」社区的原因之一。读到这里，你也能理解，为什么 coding、vibe coding 都不是「超体」真正的主线。
      </p>

      <p>
        未来人与人的差距，不是会不会用 AI、会不会 vibe coding，也不会是「用 AI 的人」替代「不用 AI 的人」。
      </p>

      <p>
        这些说法都太温和了。
      </p>

      <Quote>
        兵已经极其便宜，但一个人每天只能调用几万 token，另一个人每天能调动几十亿 token，两者有 10 万倍的调兵能力差距。关键是，这个差距因为它是 sense、是 craft，所以它并不是技术可以抹平的。
      </Quote>

      <p>
        换个角度说，这就是未来人和人之间根本的竞争力差距。
      </p>

      <p>
        10 万倍差异，意味着在未来这两类人不是一个物种。
      </p>

      <Raw title="作者与出处">
        <div style={{ marginTop: "var(--ra-space-6, 2rem)", paddingTop: "var(--ra-space-5, 1.5rem)", borderTop: "1px solid var(--ra-color-border)", color: "var(--ra-color-muted)", fontSize: "var(--ra-text-sm, 0.95rem)", lineHeight: 1.6 }}>
          <p style={{ margin: 0 }}>
            <strong>关于作者</strong>：奶牛Denny，乐纯 CEO，生理黑客（physiological hacker），神经科学与 AI 系统研究者。正在与神经科学、AI 领域前沿专家共建「超体」：一套系统化内容 + 邀请制行动社区。
          </p>
          <p style={{ margin: "var(--ra-space-3, 0.75rem) 0 0 0" }}>
            原文发表于微信公众号「奶牛Denny」：
            <a href="https://mp.weixin.qq.com/s/roX3jOVMjjs3N5NihLnpDg" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
              日耗2亿token，是脑力工作者的底线。
            </a>
          </p>
          <p style={{ margin: "var(--ra-space-2, 0.5rem) 0 0 0" }}>
            完整邀请信：
            <a href="https://mp.weixin.qq.com/s?__biz=MzA3MDQyNDUzMA==&mid=2649927292&idx=1&sn=639709314ce5697cf55097f072734138&scene=21#wechat_redirect" target="_blank" rel="noopener noreferrer" style={{ color: "inherit" }}>
              Denny的邀请信：给「超体」的种子用户
            </a>
          </p>
        </div>
      </Raw>
    </Section>
  );
}
