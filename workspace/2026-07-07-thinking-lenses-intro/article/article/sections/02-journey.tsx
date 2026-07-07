import { Section, Aside, Raw } from "reacticle";

// 第二节：动态思考旅程 —— 内部怎么运转
export function SectionJourney() {
  return (
    <Section index="02" title="动态思考旅程：5 阶段流水线与 3 道强制门">
      <p>
        thinking-lenses 每次被调用，内部都跑一条统一的 5 阶段流水线：
        <strong>Situation → Check-In → Input Gate → Tool Thinking → Synthesis</strong>。
        其中前三个阶段是强制门——不跳过任何一步，跳过等于输出质量不可控。这不是建议，是协议。
      </p>
      <p>
        之所以设三道门，是因为"换个角度想"这件事最大的失败模式不是"没换角度"，而是"没搞清楚问题就急着换"。
        一个连背景、目标、约束、痛点都还没拆解清楚的问题，套上再多透镜也只是制造噪音。所以系统在让你看到
        任何透镜之前，先逼你（和它自己）把问题的骨架摸清楚。
      </p>

      <Raw title="5 阶段旅程与 3 道 CHECKPOINT">
        <svg viewBox="0 0 900 280" width="100%" aria-hidden="true">
          {/* 主线 */}
          <line
            x1="60"
            y1="140"
            x2="840"
            y2="140"
            stroke="var(--ra-color-border, currentColor)"
            strokeWidth="1"
          />
          {/* 5 阶段节点 */}
          {[
            { x: 90, label: "1 Situation", sub: "锚定问题", gate: "[门] 1a 结构化摘要" },
            { x: 250, label: "2 Check-In", sub: "用户适配", gate: null },
            { x: 410, label: "3 Input Gate", sub: "选透镜前必过", gate: "[门] 3c 查表交叉" },
            { x: 570, label: "4 Tool Thinking", sub: "视角调用", gate: "[门] 4a 回环验证" },
            { x: 760, label: "5 Synthesis", sub: "综合洞察", gate: "5a 冲突焊接" },
          ].map((n, i) => (
            <g key={i}>
              <circle
                cx={n.x}
                cy="140"
                r="14"
                fill="var(--ra-color-bg, #fff)"
                stroke="var(--ra-color-accent, #8B2C2C)"
                strokeWidth="2"
              />
              <text
                x={n.x}
                y="120"
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="var(--ra-color-fg, currentColor)"
                fontFamily="var(--ra-font-serif, Georgia, serif)"
              >
                {n.label}
              </text>
              <text
                x={n.x}
                y="172"
                textAnchor="middle"
                fontSize="11"
                fill="var(--ra-color-muted, currentColor)"
                opacity="0.85"
              >
                {n.sub}
              </text>
              {n.gate && (
                <text
                  x={n.x}
                  y="200"
                  textAnchor="middle"
                  fontSize="10"
                  fill="var(--ra-color-accent, #8B2C2C)"
                  fontWeight="600"
                >
                  {n.gate}
                </text>
              )}
            </g>
          ))}
          {/* 门标记 */}
          <text x="60" y="40" fontSize="11" fill="var(--ra-color-muted, currentColor)" opacity="0.7">
            强制门（不跳过）
          </text>
          <text x="60" y="245" fontSize="10" fill="var(--ra-color-muted, currentColor)" opacity="0.6">
            前 3 阶段是 CHECKPOINT，跳过 = 输出质量不可控
          </text>
        </svg>
      </Raw>

      <p>
        <strong>第一阶段 Situation</strong> 做的事比看起来重。它不只是"接收输入"，还要把用户的话拆成
        五个要素——背景、目标、约束、痛点、模糊点。每个要素用一句话概括，必须包含用户原话里的具体数字、
        人名、资源限制。如果某个要素缺失（比如没说清目标），系统标注"用户未明确"，而不是自己偷偷补一个。
        这五要素是后续所有透镜选择的锚点。
      </p>
      <p>
        <strong>第二阶段 Check-In</strong> 在系统内部静默完成：问题分类、情绪识别、约束判断，不增加
        额外交互轮次。只有在关键信息实在推不出来时，才会问最多一个追问——比如"你希望通过这次思考达成
        什么结果"。这一步识别一类常见输入：用户说得含糊（"烦死了""感觉不对""事多且杂"），只有情绪
        没有事实。系统不在表面回应情绪，而是提取情绪背后的具体事实。
      </p>

      <Aside tone="warning" label="为什么 Input Gate 是强制门">
        透镜选择最容易出错的环节，是"凭直觉挑了几个看起来相关的透镜"。
        Input Gate 强制要求：先用 Journalist 精神做事实/观点校验，再对照 8 种认知偏差做扫描，
        然后查问题分类映射表做交叉筛选。跳过这一步直接选透镜，等于让透镜选择基于直觉而非推导——
        这正是浅层做法的入口。
      </Aside>

      <p>
        <strong>第三阶段 Input Gate</strong> 是选透镜前的最后一道关卡，内部一次性完成三件事：事实/观点
        校验（区分事实、推测、情绪，推测标"待核实"）、认知偏差扫描（对照 8 种偏差信号）、查表交叉
        （把问题映射到类型表，获取推荐透镜，交叉筛选出 4-7 个候选）。这个候选集不是最终选择，而是
        第四阶段的输入。
      </p>
      <p>
        <strong>第四阶段 Tool Thinking</strong> 从候选集里确定最终的 3-5 个透镜组合，要求覆盖至少 3 个
        认知原理类别（不能全是诊断类，得有推演或共情）。这里有一个关键的回环验证：选完透镜后，回到
        用户标注的"痛点"要素，问自己"这个组合真的对准了用户最痛的点吗"。如果没对准，回到第三阶段
        重新筛选。回环最多做一次，不无限循环。
      </p>
      <p>
        <strong>第五阶段 Synthesis</strong> 是整个流程里产生"通透感"的关键。它不是把各透镜的结论拼接
        在一起，而是做"冲突焊接"——列出所有透镜的核心判断，识别哪些互相冲突、哪些是同一发现的不同
        表述，对每个冲突判断是事实矛盾还是视角差异，最后找出多个透镜指向同一个发现的"汇聚信号"
        （这是最高信度的判断）。冲突焊接之后还有一个涌现检查：综合后是否冒出了单个透镜看不到的新判断？
        如果没有，说明碰撞还不够深，不是透镜不够多。
      </p>

      <p>
        最后是结尾设计。系统强制要求结尾不能是"平铺行动清单 + 需要我帮你深入展开某个透镜吗"这种
        交作业式收尾——那会让用户拿到清单就走。相反，它要求从涌现判断里提取一个最值得继续深挖的
        矛盾或假设，用一个开放式问题抛给用户。比如"三方激励交集为零"不是答案，是让用户想继续想
        的东西。
      </p>
    </Section>
  );
}
