import { Section, Aside, Table, Raw } from "reacticle";

// 第三节：透镜输出协议 + 冲突矩阵
export function SectionProtocol() {
  return (
    <Section index="03" title="透镜输出协议：两条铁律与一座冲突矩阵">
      <p>
        选出透镜只是开始。每个透镜在被"加载"时，必须遵守两条铁律——它们是区分"真多视角"和"假换标签"
        的硬性边界。
      </p>

      <p>
        <strong>铁律 1：加载完整认知协议。</strong>每个透镜背后是一套 3-6 步的微型思维算法，必须按步骤
        逐一执行，每一步都要输出中间推理。以 Doctor 为例，它不是"问一句诊断是什么"，而是跑完六步：
        主诉识别 → 现病史 → 鉴别诊断（至少三个，按概率排序）→ 辅助检查 → 初步诊断 → 治疗验证。
        更关键的是语言约束——Doctor 必须用"主诉""病变""鉴别诊断"思考，不能用"问题""原因"。
        语言塑造思维：当你被迫用临床术语组织判断时，你调用的真的是医生那套推理，而不是泛泛的归因。
      </p>
      <p>
        输出还有几条原则：透镜名称英文在前、中文括号跟后（如 Engineer（工程师），照顾可能不熟悉
        英文名的读者）；不显示"第一步""语言约束"这种步骤标签，让分析自然流动像讲故事；每个透镜
        开头用一句话点破核心、收尾用一句话概括判断；行动优先级用时间层（立即→本周→决定→准备）
        而非红黄绿灯。
      </p>

      <Aside tone="principle" label="铁律 2：永不重复上一轮">
        输出当前透镜前，先检查上一个透镜的核心判断。如果当前分析结构和上一个同构——只是换了职业
        标签——立即停止，换一个异质性框架重新切入。上一个拆结构，这一个就追问矛盾；上一个对比张力，
        这一个就推演后果。这个检查在内部完成，不暴露给用户。
      </Aside>

      <p>
        铁律 2 要防的是最常见的失败模式：Economist 说"激励不匹配导致不愿配合"，Salesperson 说
        "动机没对准所以缺乏动力"——两句话职业标签不同，思考框架完全一样，都在讲"动力没对齐"。
        真正的异质性是 Engineer 建模之后 Hacker 拆解，一个搭框架、一个找漏洞；或者 Doctor 诊断
        之后 Philosopher 追问"如果把这个直觉推到极致会怎样"。
      </p>

      <p>
        为了主动制造张力而不是被动避免重复，系统内置了一座<strong>冲突矩阵</strong>——故意把对立视角
        配对，让它们在同一个问题上碰撞。单一视角看不到的张力，往往就藏在这种对撞里。
      </p>

      <Table
        caption="内置冲突矩阵：6 对故意制造的张力和它们各自适用的场景"
        columns={[
          { key: "pair", label: "冲突对" },
          { key: "tension", label: "张力" },
          { key: "scene", label: "适用场景" },
        ]}
        rows={[
          { pair: "Artist × Accountant", tension: "创造力 vs 数字纪律", scene: "制度设计、创新评估" },
          { pair: "Soldier × Entrepreneur", tension: "流程 vs 试错", scene: "体系搭建、风险决策" },
          { pair: "Journalist × Novelist", tension: "事实 vs 叙事", scene: "向上汇报、晋升述职" },
          { pair: "Engineer × Hacker", tension: "建模 vs 拆解", scene: "问题诊断、系统设计" },
          { pair: "Politician × Mathematician", tension: "可信 vs 可证", scene: "跨部门推动、方案说服" },
          { pair: "Doctor × Philosopher", tension: "诊断 vs 追问后果", scene: "业绩下滑根因分析" },
        ]}
      />

      <Raw title="冲突焊接：让对立视角在同一问题上对撞">
        <div
          style={{
            marginTop: "var(--ra-space-3, 0.75rem)",
            padding: "var(--ra-space-4, 1rem)",
            borderTop: "1px solid var(--ra-color-border, currentColor)",
            borderBottom: "1px solid var(--ra-color-border, currentColor)",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr auto 1fr",
            }}
          >
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "var(--ra-text-sm, 0.9rem)", fontWeight: "var(--ra-font-weight-bold, 600)", marginBottom: "0.3rem" }}>
                Doctor
              </div>
              <div style={{ fontSize: "var(--ra-text-xs, 0.78rem)", color: "var(--ra-color-muted, inherit)" }}>
                "根因是 X，证据是 Y"
              </div>
            </div>
            <div
              style={{
                alignSelf: "center",
                padding: "0 var(--ra-space-4, 1rem)",
                color: "var(--ra-color-accent, currentColor)",
                fontWeight: "var(--ra-font-weight-bold, 700)",
                fontSize: "1.4rem",
              }}
            >
              ×
            </div>
            <div style={{ textAlign: "center" }}>
              <div style={{ fontSize: "var(--ra-text-sm, 0.9rem)", fontWeight: "var(--ra-font-weight-bold, 600)", marginBottom: "0.3rem" }}>
                Philosopher
              </div>
              <div style={{ fontSize: "var(--ra-text-xs, 0.78rem)", color: "var(--ra-color-muted, inherit)" }}>
                "如果根因推到极致会怎样"
              </div>
            </div>
          </div>
          <div
            style={{
              marginTop: "var(--ra-space-3, 0.75rem)",
              paddingTop: "var(--ra-space-3, 0.75rem)",
              borderTop: "1px dashed var(--ra-color-border, currentColor)",
              textAlign: "center",
              fontSize: "var(--ra-text-sm, 0.9rem)",
            }}
          >
            <span style={{ color: "var(--ra-color-accent, currentColor)", fontWeight: "var(--ra-font-weight-bold, 600)" }}>
              碰撞后涌现：
            </span>
            <span style={{ color: "var(--ra-color-muted, inherit)" }}>
              "根因诊断正确，但治疗方案本身会触发新的二阶后果"
            </span>
          </div>
        </div>
      </Raw>

      <p>
        冲突焊接不是"列一遍结论"，是找碰撞和汇聚。如果跑完一轮找不到任何冲突或汇聚，说明透镜结果
        还没真正交叉——这时候不是再加透镜，而是回到回环验证重新对准用户的痛点。
      </p>
    </Section>
  );
}
