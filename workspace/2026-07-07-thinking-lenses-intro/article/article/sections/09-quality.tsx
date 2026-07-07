import { Section, Aside, Table, Raw } from "reacticle";

// 第九节：质量控制 — 自检清单与反模式
export function SectionQuality() {
  return (
    <Section index="09" title="质量控制：9 道自检门与 8 个反模式">
      <p>
        一套思维工具最容易垮掉的地方，不是"透镜不够多"，而是"流程走了但质量没守住"。为了防止输出
        退化成"换标签的问题清单"，系统在输出前设置了最后一道质量门——一份 9 项的执行自检清单，
        逐项过一遍，不跳过。
      </p>

      <Raw title="输出前自检清单（9 项，时间紧时至少做 #4 #5 #9）">
        <div style={{ marginTop: "var(--ra-space-3, 0.75rem)" }}>
          {[
            { n: "1", c: "结构化摘要做了吗？", bad: "直接跳到分析", fix: "回到 1a 补拆解（背景/目标/约束/痛点/模糊点）", core: false },
            { n: "2", c: "查表交叉做了吗？", bad: "直接列出透镜，无推导路径", fix: "回到 3c 补映射表推导", core: false },
            { n: "3", c: "回环验证做了吗？", bad: "透镜通用正确但不锋利", fix: "回到 4a 对准用户痛点检查", core: false },
            { n: "4", c: "每个透镜加载了完整认知协议？", bad: "跳过步骤、不用职业术语、直接出结论", fix: "重新执行 3-6 步协议", core: true },
            { n: "5", c: "铁律 2 异质性检查了吗？", bad: "两个透镜只是换了标签说同一件事", fix: "换异质性框架重新切入", core: true },
            { n: "6", c: "冲突矩阵利用了吗？", bad: "所有透镜都在同一维度分析", fix: "选一个冲突对强制对撞", core: false },
            { n: "7", c: "停止信号表格式完整？", bad: "盲区列写透镜名或百分比", fix: "改为「你最容易忽略的 X」", core: false },
            { n: "8", c: "结尾留了关键不确定性？", bad: "平铺清单 +「需要展开吗？」", fix: "从涌现判断中开放式抛出", core: false },
            { n: "9", c: "冲突焊接做了吗？", bad: "综合只是各透镜结论拼接，没涌现", fix: "回到 5a 找碰撞和汇聚", core: true },
          ].map((item) => (
            <div
              key={item.n}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                gap: "var(--ra-space-3, 0.75rem)",
                padding: "var(--ra-space-2, 0.5rem) 0",
                borderBottom: "1px solid var(--ra-color-border, currentColor)",
                alignItems: "start",
              }}
            >
              <div
                style={{
                  minWidth: "2rem",
                  height: "2rem",
                  borderRadius: "50%",
                  border: item.core ? "2px solid var(--ra-color-accent, currentColor)" : "1px solid var(--ra-color-border, currentColor)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "var(--ra-text-sm, 0.85rem)",
                  fontWeight: "var(--ra-font-weight-bold, 700)",
                  color: item.core ? "var(--ra-color-accent, currentColor)" : "var(--ra-color-muted, inherit)",
                }}
              >
                {item.n}
              </div>
              <div style={{ fontSize: "var(--ra-text-sm, 0.88rem)", lineHeight: 1.5 }}>
                <div style={{ fontWeight: "var(--ra-font-weight-bold, 600)", marginBottom: "0.2rem" }}>
                  {item.c}
                  {item.core && (
                    <span style={{ marginLeft: "0.5rem", fontSize: "var(--ra-text-xs, 0.7rem)", color: "var(--ra-color-accent, currentColor)", letterSpacing: "0.08em" }}>
                      核心
                    </span>
                  )}
                </div>
                <div style={{ color: "var(--ra-color-muted, inherit)", fontSize: "var(--ra-text-xs, 0.78rem)" }}>
                  <span style={{ opacity: 0.7 }}>不通过：</span>{item.bad}
                  <span style={{ margin: "0 0.4rem", opacity: 0.4 }}>|</span>
                  <span style={{ opacity: 0.7 }}>修复：</span>{item.fix}
                </div>
              </div>
            </div>
          ))}
        </div>
        <p style={{ fontSize: "var(--ra-text-xs, 0.74rem)", color: "var(--ra-color-muted, inherit)", marginTop: "var(--ra-space-3, 0.75rem)", textAlign: "center", opacity: 0.8 }}>
          时间只够做 3 项时，做 #4（协议执行）、#5（异质性检查）、#9（冲突焊接）——这三项直接决定输出是深度对话还是浅层分析。
        </p>
      </Raw>

      <Aside tone="warning" label="结尾设计的硬约束">
        系统明确禁止"交作业式收尾"——平铺行动清单加一句"需要我帮你深入展开某个透镜吗"。这种收尾
        让用户拿到清单就走，对话就断了。正确做法是从涌现判断里提取一个最值得继续深挖的矛盾，
        用开放式问题抛给用户（"这里最大的不确定性是 X，你怎么看？"），让对话能继续。
      </Aside>

      <p>
        除了自检清单，系统还维护了一份<strong>反模式黑名单</strong>——8 种"看起来在做但其实没做"的
        失败方式。它们和自检清单有重叠，但角度不同：清单是"该做的做了没"，黑名单是"不该做的有没有
        正在做"。
      </p>

      <Table
        caption="8 个反模式：这样用等于没用"
        columns={[
          { key: "bad", label: "反模式" },
          { key: "why", label: "为什么不要做" },
          { key: "fix", label: "替代做法" },
        ]}
        rows={[
          { bad: "一次性抛出 25 个透镜让用户选", why: "认知负荷爆炸，等于没推荐", fix: "先分析再精准推荐 3-5 个" },
          { bad: "每个透镜只提问不分析", why: "输出变成问题清单，用户没得到判断", fix: "分析是主体，提问是收尾验证" },
          { bad: "透镜间换标签不换角度", why: "Economist 说激励不匹配，Salesperson 说动机没对准——同一件事", fix: "铁律 2：异质性检查" },
          { bad: "锚定用抽象描述", why: "「从激励角度看」没有刺穿问题", fix: "引用用户输入中的具体数字/人名/约束" },
          { bad: "收尾用「你会发现」", why: "导游话术，降低判断力", fix: "直接给判断，句号结尾" },
          { bad: "跳过 Input Gate 直接选透镜", why: "透镜选择基于直觉而非推导", fix: "查表交叉是强制门" },
          { bad: "验证用通用提问", why: "「你觉得可行吗？」不含用户具体事实", fix: "锚定问题必须含用户描述中的具体信息" },
          { bad: "模式 A 没有盲区裁决表", why: "用户无法根据时间选择深度", fix: "每次必须先给核心/补充/深度三级" },
        ]}
      />

      <p>
        此外还有一份<strong>失败模式 Fallback 表</strong>，处理流程跑不通的异常情况：输入太模糊时
        追问一个关键问题、降级到快速版；透镜匹配不准时回到查表交叉重新筛选、或降级为全视角扫描
        让用户自己选；透镜间同构时换异质框架、或砍掉重复透镜减到 2 个；用户无响应时用关键不确定性
        追问一次、然后停止推进。这些 fallback 的存在，让系统在非理想输入下也能给出有用输出，
        而不是硬撑着跑完一个失败的流程。
      </p>
    </Section>
  );
}
