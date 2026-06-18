import { Section, Quote, Image } from "reacticle";
import leadershipImg from "../../assets/leadership-press.jpg";

export function SectionLeadership() {
  return (
    <Section index="02" title="为什么大部分人最终都用不了2亿？">
      <p>
        这和 Vibe Coding 无关，和 Coding 无关，甚至和 AI 无关。
      </p>

      <p>
        做一个思想实验：给你 20 个 985 毕业、有 5 年工作经验的年轻人。每个人每个月只要 1000 元工资。条件是，他们只能做脑力工作，不能送外卖，不能开滴滴。你要带着他们每个月产出 5 到 10 万的价值——
      </p>

      <p>
        大部分人做不到。虽然这个工资已经远低于基本工资了。
      </p>

      <Image
        src={leadershipImg}
        alt="几何木块构成的流动网络，象征组织与调用能力"
        caption="组织能力不是 skill，而是 craft。"
        ratio="1/1"
      />

      <Quote>
        很多人能熟练 vibe coding，却用不掉 token。和 coding 无关，本质是 leadership 问题，即“组织一群人去创造价值”的能力。
      </Quote>

      <p>
        这种“用兵能力”不是一种 skill（技术），而是一种 craft（手艺）。skill 可以被封装给 Claude，但 craft 是要带有 sense-making 的压缩能力的。这种压缩能力在目前阶段是人类独有的，需要靠训练积累。

      </p>

      <p>
        就像在工业化时代，带过 10 个人团队的 leader，和带过 1 万人团队的 leader，是两种人。AI 时代也是一样。你不缺兵，缺的是持续调兵的能力和意愿。
      </p>
    </Section>
  );
}
