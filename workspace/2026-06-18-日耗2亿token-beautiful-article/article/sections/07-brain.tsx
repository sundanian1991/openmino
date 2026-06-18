import { Section, Raw, Aside, Image } from "reacticle";
import brainImg from "../../assets/brain-press.jpg";

export function SectionBrain() {
  return (
    <Section index="07" title="日耗越大，大脑杠杆越高">
      <p>
        每个「超体」社区的成员，在第一阶段结束以后，至少要能达到 2 亿 token 每天的智能调用能力。调用的 reasoning 智能越多，对前额叶的不必要负荷就越少，同时大脑在白天堆积的谷氨酸也会大幅减少（就是让你产生脑雾的东西）。
      </p>

      <Image
        src={brainImg}
        alt="抽象人头侧影与发光的神经网络线条"
        caption="让 AI 接管 reasoning，前额叶回归 sense-making。"
        ratio="1/1"
      />

      <Raw title="前额叶负荷：传统 reasoning vs AI 接管 reasoning">
        <svg viewBox="0 0 520 220" width="100%" role="img" aria-label="AI 接管 reasoning 后前额叶负荷下降">
          {/* traditional */}
          <text x="110" y="30" textAnchor="middle" fontSize="12" fill="var(--ra-color-fg)">自己完成 reasoning</text>
          <rect x="40" y="45" width="140" height="120" fill="var(--ra-color-risk)" opacity="0.12" stroke="var(--ra-color-risk)" strokeWidth="1" />
          {/* stacked blocks representing cognitive load */}
          <rect x="60" y="145" width="100" height="10" fill="var(--ra-color-risk)" opacity="0.5" />
          <rect x="60" y="130" width="100" height="12" fill="var(--ra-color-risk)" opacity="0.55" />
          <rect x="60" y="113" width="100" height="14" fill="var(--ra-color-risk)" opacity="0.6" />
          <rect x="60" y="94" width="100" height="16" fill="var(--ra-color-risk)" opacity="0.65" />
          <rect x="60" y="73" width="100" height="18" fill="var(--ra-color-risk)" opacity="0.7" />
          <rect x="60" y="50" width="100" height="20" fill="var(--ra-color-risk)" opacity="0.8" />
          <text x="110" y="190" textAnchor="middle" fontSize="11" fill="var(--ra-color-muted)">高负荷 · 谷氨酸堆积</text>

          {/* arrow */}
          <line x1="220" y1="105" x2="300" y2="105" stroke="var(--ra-color-accent)" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
          <defs>
            <marker id="arrowhead" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
              <polygon points="0 0, 8 3, 0 6" fill="var(--ra-color-accent)" />
            </marker>
          </defs>

          {/* ai-assisted */}
          <text x="390" y="30" textAnchor="middle" fontSize="12" fill="var(--ra-color-fg)">AI 接管 reasoning</text>
          <rect x="340" y="45" width="140" height="120" fill="var(--ra-color-accent)" opacity="0.08" stroke="var(--ra-color-accent)" strokeWidth="1" />
          <rect x="360" y="145" width="100" height="10" fill="var(--ra-color-accent)" opacity="0.35" />
          <rect x="360" y="130" width="100" height="12" fill="var(--ra-color-accent)" opacity="0.3" />
          <text x="410" y="110" textAnchor="middle" fontSize="11" fill="var(--ra-color-muted)">前额叶只做</text>
          <text x="410" y="125" textAnchor="middle" fontSize="11" fill="var(--ra-color-muted)">sense-making</text>
          <text x="410" y="190" textAnchor="middle" fontSize="11" fill="var(--ra-color-muted)">低负荷 · 少谷氨酸</text>
        </svg>
      </Raw>

      <p>
        前额叶的最宝贵能力，并不是 reasoning（推理、逻辑），这是 AI 显著比前额叶做得好的地方。用前额叶来做 AI 擅长的 reasoning，本身就是对前额叶最大的浪费。
      </p>

      <Aside tone="warning" label="误区">
        还有种错误的观点，天天让 AI 来思考，自己就变笨了——持有这种观点的人，缺乏对于大脑的基本认知。你不断用前额叶做各种类型的 reasoning，并不会锻炼你的前额叶，基本都是在消耗而已。
      </Aside>
    </Section>
  );
}
