import { Section, Aside, Raw } from "reacticle";

// 第一节：核心理念 —— 为什么需要 25 把钥匙
export function SectionIdea() {
  return (
    <Section index="01" title="核心理念：不是换标签，是换认知协议">
      <p>
        多数人对"换个角度想问题"的理解停留在表面——把同一个问题套上不同职业的皮再说一遍。
        医生问"诊断是什么"，工程师问"能建模吗"，黑客问"底层在运转什么"。三个问题听起来各异，
        本质却都是一句"你觉得问题在哪"。这种浅层切换不会产生新洞察，只会产生新措辞。
      </p>
      <p>
        thinking-lenses 的核心主张是：<strong>每个职业背后都藏着一台完整的认知机器</strong>。
        医生不只是"会诊断"，他脑子里跑的是一套"主诉识别 → 现病史 → 鉴别诊断 → 辅助检查 →
        初步诊断 → 治疗验证"的六步临床推理协议，每一步都强制输出中间推理，都使用专业语言约束
        （用"主诉""病变"而不是"问题""原因"）。加载这套协议和只问一句"诊断是什么"，
        产生的思考深度完全不是一回事。
      </p>
      <p>
        所以这个技能的真正单位不是"25 个视角"，而是"25 套带步骤、有语言、可执行的微型思维算法"。
        它要解决的，是人最容易掉进去的那个陷阱——<strong>误以为自己看到的就是全部</strong>。
      </p>

      <Aside tone="principle" label="设计哲学">
        职业只是认知原理的载体，不是本质。真正起作用的是底层的认知机制——根因分析、系统建模、
        激励相容、极限推演。25 个透镜是 25 把钥匙，开的是 25 类不同的锁。
      </Aside>

      <Raw title="浅层切换 vs 深层加载：同一个「换个角度」，质量天差地别">
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
            gap: "var(--ra-space-4, 1rem)",
            marginTop: "var(--ra-space-3, 0.75rem)",
          }}
        >
          {/* 浅层 */}
          <div
            style={{
              padding: "var(--ra-space-4, 1rem)",
              borderTop: "2px solid var(--ra-color-border, currentColor)",
              opacity: 0.7,
            }}
          >
            <div
              style={{
                fontSize: "var(--ra-text-xs, 0.72rem)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ra-color-muted, inherit)",
                marginBottom: "var(--ra-space-2, 0.5rem)",
              }}
            >
              浅层做法
            </div>
            <div style={{ fontSize: "var(--ra-text-sm, 0.9rem)", lineHeight: 1.7 }}>
              <div style={{ marginBottom: "0.4rem" }}>
                <strong>Doctor：</strong>诊断是什么？
              </div>
              <div style={{ marginBottom: "0.4rem" }}>
                <strong>Engineer：</strong>能建模吗？
              </div>
              <div style={{ marginBottom: "0.6rem" }}>
                <strong>Hacker：</strong>底层在运转什么？
              </div>
              <div
                style={{
                  paddingTop: "var(--ra-space-2, 0.5rem)",
                  borderTop: "1px dashed var(--ra-color-border, currentColor)",
                  color: "var(--ra-color-muted, inherit)",
                }}
              >
                → 三个问题换了皮，本质都是"你觉得问题在哪？"
              </div>
            </div>
          </div>

          {/* 深层 */}
          <div
            style={{
              padding: "var(--ra-space-4, 1rem)",
              borderTop: "2px solid var(--ra-color-accent, currentColor)",
            }}
          >
            <div
              style={{
                fontSize: "var(--ra-text-xs, 0.72rem)",
                letterSpacing: "0.15em",
                textTransform: "uppercase",
                color: "var(--ra-color-accent, currentColor)",
                marginBottom: "var(--ra-space-2, 0.5rem)",
                fontWeight: "var(--ra-font-weight-bold, 600)",
              }}
            >
              深层做法
            </div>
            <div style={{ fontSize: "var(--ra-text-sm, 0.9rem)", lineHeight: 1.6 }}>
              <div style={{ marginBottom: "0.5rem" }}>
                <strong>Doctor 协议（6 步）</strong>
              </div>
              <ol
                style={{
                  paddingLeft: "1.1rem",
                  margin: 0,
                  color: "var(--ra-color-muted, inherit)",
                }}
              >
                <li>主诉识别：最表面的症状</li>
                <li>现病史：何时起、急/缓、伴随症状</li>
                <li>鉴别诊断：≥3 个，按概率排序</li>
                <li>辅助检查：排除/确认的证据</li>
                <li>初步诊断：为什么排除其他</li>
                <li>治疗验证：干预后应观察什么</li>
              </ol>
              <div
                style={{
                  marginTop: "var(--ra-space-2, 0.5rem)",
                  paddingTop: "var(--ra-space-2, 0.5rem)",
                  borderTop: "1px solid var(--ra-color-border, currentColor)",
                  color: "var(--ra-color-accent, currentColor)",
                  fontWeight: "var(--ra-font-weight-bold, 600)",
                }}
              >
                → 每步强制输出中间推理，用"主诉/病变"而非"问题/原因"
              </div>
            </div>
          </div>
        </div>
        <p
          style={{
            fontSize: "var(--ra-text-xs, 0.72rem)",
            color: "var(--ra-color-muted, inherit)",
            marginTop: "var(--ra-space-3, 0.75rem)",
            textAlign: "center",
            opacity: 0.8,
          }}
        >
          同样是"用医生的视角"——左边是一句问句，右边是一台会跑的思维机器。thinking-lenses 只承认右边。
        </p>
      </Raw>

      <p>
        这个区分决定了整个技能的质量基线。系统内置了一条硬性检查：<strong>如果两个透镜的核心判断
        使用了相同的思考框架，判定切换失败，重新加载</strong>。换句话说，Economist 说"激励不匹配"
        和 Salesperson 说"动机没对准"，在系统眼里是同构的——都只是在讲"动力没对齐"，换了个词。
        真正的异质性，是 Engineer 建模之后 Hacker 拆解，一个搭框架、一个找漏洞。
      </p>

      <p>
        斯科特·杨（Scott H. Young）在原始的 25 Thinking Tools 里讲过一个蜡烛实验：让人用一盒图钉
        把蜡烛固定到墙上。解法是把盒子本身当底座——但绝大多数人卡住，因为他们把盒子看作"装工具的容器"，
        而不是"工具本身"。这就是功能性固化。<strong>25 个思维透镜的存在，就是为了对抗这种固化</strong>：
        让你习惯性地想到，手里这把锤子之外，还有 24 把形状各异的钥匙。
      </p>
    </Section>
  );
}
