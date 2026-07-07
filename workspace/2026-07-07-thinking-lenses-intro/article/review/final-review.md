# Final Review

> 审阅对象：thinking-lenses 技能介绍页（explainer · ~80% 保留 · press 主题 · wide · TOC 开 · 配图 none · 封面开）
> 审阅范围：`Article.tsx`（assembler）+ `Cover.tsx` + `sections/01-10` 共 10 节
> 审阅方式：三视角逐项核查（Editorial / Visual / Technical）

## 总体结论

**pass-with-fixes**

这是一篇高质量的方法论白皮书式解释文。叙事连贯、信息保留到位、press 主题气质统一、
技术可构建。绝大多数验收项通过。仅 2 项必修（移动端 2 列网格 + 节 02 SVG emoji），
其余为建议优化。

---

## Editorial Review

### 1. 文章性 — ✅ pass
读起来是一篇文章，不是组件堆砌。Lead（导言）→ 核心理念 → 旅程 → 协议 → 清单 → 原理 → 映射
→ 模式 → 停止 → 质量 → 咏春，是一条清晰的"它解决什么 → 它怎么运转 → 它怎么用 → 它怎么不垮"
的递进线。每一节都用正文铺陈论点，Raw / Table 是为论点服务的佐证，不是替代正文。

### 2. 信息取舍（~80% 保留）— ✅ pass
关键内容全部在位，无意外丢失：
- ✅ 5 阶段旅程 + 3 CHECKPOINT（节 02，含 1a/3c/4a/5a 全标注）
- ✅ 25 透镜完整清单（节 04，5 家族；共情组 6 个含 Actor、验证组 4 个，与源一致）
- ✅ 5 种模式 A/B/C/D/E + 模式 A 三子版对比（节 07）
- ✅ 认知原理七分类（节 05）
- ✅ 15 类问题 → 透镜组合映射（节 06，15 行全列）
- ✅ 自检清单 9 项（节 09，含 #4/#5/#9 核心标注）
- ✅ 冲突矩阵 6 对（节 03 Table）
- ✅ 咏春哲学对应 + 实战组合公式（节 10）
- ✅ Munger 引言（Hero Lead + 节 10 收尾）+ 蜡烛实验（节 01 + 节 10）
可删减项处理合理：失败 Fallback 表压缩为节 09 一段、模糊输入识别并入节 02/06 正文、
配套资源表按计划精简（仅在节 06 提到"新手/进阶/高手"分层，未逐行列资源）。

### 3. 结构 — ✅ pass
10 节顺序合理：理念 → 机制 → 协议 → 清单 → 原理 → 映射 → 模式 → 负荷控制 → 质量门 → 哲学收尾。
标题几乎全是"一句话结论"而非名词短语，质量很高：
- "停止信号：**不是每个盲区都值得看**"
- "咏春哲学：**透镜负责广度，咏春负责深度**"
- "核心理念：**不是换标签，是换认知协议**"
仅节 04"按家族组织的完整清单"略偏描述，但可接受（它本就是清单页）。

### 4. 正文比例 — ✅ pass
正文是主体。每一节都有 2-5 段实质 prose 论证，Raw / Table 是点睛与佐证。
节 04（25 透镜）和节 09（自检清单）视觉块体量较大，但前后都有正文承接与收束，
没有出现"组件墙缺正文"。节 02 流程图前后各 5-6 段正文，节奏健康。

### 5. 衔接 — ✅ pass
节与节承接自然。节 01 末尾点出"硬性检查 / 异质性"，节 02 开篇承接"每次调用内部跑流水线"；
节 02 讲完流程的"选透镜"，节 03 紧接"选出透镜只是开始，每个透镜要守两条铁律"；
节 04 末尾引出"盲区"，节 05 讲"跨类别覆盖检查"正好回应。第一节（节 01）开篇直接承接 Lead
的"换标签 vs 换认知协议"主题。无突兀跳转。

### 6. 语气 — ✅ pass
像一份精良的方法论白皮书：清晰、有结构、有解释力、不卖弄。
明确规避了源材料里点名的导游话术——节 09 黑名单 #5"收尾用「你会发现」"被写进正文，
收尾段落也确实用判断句结尾。无明显 AI 味（无"让我们深入探讨""值得注意的是"套话）。

### 7. 结尾 — ✅ pass
节 10 收尾回到蜡烛实验 + Munger："这就是芒格那句话的实操含义：更多的思维模型，
意味着更多解决问题的办法。"呼应 Hero 的 Munger 引言，闭环完整。结尾不强行留"想了解更多？
点击这里"，留有思考余地，有持续对话感（开放式抛出"知道还有哪些钥匙可以试"）。

---

## Visual Review

### 8. press 主题气质 — ✅ pass
忠实执行 press 的"以线代框、无卡片投影"纪律。所有 Raw 块都用 `borderTop`/`borderBottom`/
`borderLeft` 线条分隔，无一例 `box-shadow` / `background` 填色块（节 10 用了
`background: var(--ra-color-surface, transparent)` 但 fallback 为透明，可接受）。
氧化血红 accent（`--ra-color-accent`）统一用于章节强调线、家族头、核心标记，符合 press
"一个浓郁主色串起全篇"。

### 9. Raw 质量 — ✅ pass
每个 Raw 都服务具体段落、有明确目的，无装饰性 Raw：
- 节 01"浅层 vs 深层"对照 — 解释核心理念
- 节 02"5 阶段旅程"SVG 流程图 — 直观呈现 CHECKPOINT
- 节 03"冲突焊接"对撞图 — 可视化张力涌现
- 节 04"25 透镜家族矩阵" — 清单的结构化呈现
- 节 05"同类堆叠 vs 异类覆盖"对比 — 佐证跨类别原则
- 节 07"五模式速览"+"快捷指令速查" — 模式总览
- 节 08"盲区列错对对比" — 强化"第二人称"规则
- 节 09"自检清单 9 项" — 核心交付物
- 节 10"供应商不配合"实战示例 — 组合公式落地

### 10. token 纪律 — ✅ pass
所有颜色 / 字体 / 间距取自 `--ra-*` token，每处都带合理 fallback（如 `var(--ra-color-accent, #8B2C2C)`）。
**无写死颜色**（grep `#[0-9A-Fa-f]{3,6}` 仅命中 fallback 值，无独立 hex）。
字体走 `var(--ra-font-serif)` / `var(--ra-font-mono)`，间距走 `var(--ra-space-*)`，
字号走 `var(--ra-text-*)`。符合"自由但一致：用 token"。

### 11. 视觉块多样性 — ✅ pass
9 个 Raw 形式多样，无明显同质化：横向 SVG 流程图、左右两栏对比块、对撞图（三列 grid）、
家族分组卡片矩阵、tag 集合对比、模式卡片网格、指令速查表、checklist 列表、纵向步骤示例。
节 03（对撞）与节 05（堆叠对比）虽然都是"对比块"，但一个是三方碰撞、一个是 tag 集合，
形式有区分。

### 12. 封面 — ✅ pass
呼应主旨（25 透镜 5×5 网格 + 家族色带）、图文并茂（SVG 网格 + 标题 + 数字徽章）、
token 化、3:4 外壳未动（`aspectRatio: "3 / 4"`，外壳来自 scaffold）。SVG `aria-hidden="true"`，
section 有 `aria-label="文章封面"`。下半部文字层用衬线 + accent 小标题，press 气质到位。
- 小瑕疵（不计入 fail）：Cover 第 4 行把 Actor 放进"构建组"行、Hacker 以 "Hb" 跨类出现在"验证组"行，
  与正文节 04 的家族归属（Actor 属共情组、Hacker 属诊断组）不完全对应。但封面是抽象示意
  （25 节点 5×5 矩阵，非严格家族映射），且 25 总数正确，不影响主旨表达。可在后续微调。

### 13. 移动端 — ⚠️ pass-with-fixes（见必须修复 #1）
- ✅ 节 04（`repeat(auto-fill, minmax(260px, 1fr))`）、节 07 模式卡片（`minmax(220px, 1fr)`）
  会自适应塌成单列，安全。
- ✅ 节 05 的 tag 集合用 `flexWrap: "wrap"`，安全。
- ⚠️ 节 01 / 节 05 / 节 08 的 **`gridTemplateColumns: "1fr 1fr"` 两列固定**：在窄屏（375px）
  下两列各 ~150px，中文长句会挤。节 01 深层做法的 `<ol>` 六步、节 08 错对对比的整句
  会被压窄。建议加 `@media (max-width: 560px)` 塌成单列，或改为 `repeat(auto-fit, minmax(240px, 1fr))`。
- ⚠️ 节 02 的 SVG 流程图 `viewBox="0 0 900 280"` + `width="100%"`：5 个阶段标签在窄屏会重叠
  （每个节点中心间距 160px，缩放后文字 fontSize 13/11 可能糊）。`preserveAspectRatio` 未设，
  默认会等比缩放，基本可读，但小屏文字偏小。可接受，建议保留观察。
- ⚠️ 节 07 快捷指令速查 `gridTemplateColumns: "auto 1fr auto"`：三列在窄屏命令文字过长时
  中间空列会塌缩。低风险。

---

## Technical Review

### 14. 构建 — ✅ pass
- `npm run typecheck`（`tsc --noEmit`）✅ 通过，零报错。
- `npm run build` ✅ 通过，产出 `dist/index.html`（~2MB，CSS+JS 内联单文件，可离线打开分享）。
- 代码质量整体干净。

### 15. 组件协议 — ✅ pass
遵守 reacticle 协议。使用语义组件 `Section` / `Aside` / `Table` / `Raw` / `Hero` / `Lead` / `Quote`。
正文用 `<p>`、`<strong>`。Raw 内部虽用了大量行内 `style` 的 `<div>`，但这符合 Raw 的自由层
定义（Raw 内可写任意 HTML/CSS/React）。未滥用语义组件，无把内容硬塞进 `Aside` 当卡片的问题。

### 16. 一节一文件 — ✅ pass
10 节全部是独立组件文件（`01-idea.tsx` … `10-wingchun.tsx`），每个 export 一个 Section 组件。
`Article.tsx` 仅做 import + 排序，是干净的 assembler。

### 17. Colophon — ✅ pass
保留在 `Article.tsx` 末尾（第 51-79 行），位于最后一个 Section 之后、`</Article>` 之前。
未删除、未移位、未浮动。内容为 `Made with beautiful-article · press theme`，主题名与
`main.tsx` 的 `ThemeProvider theme="press"` 一致。用 `--ra-*` token，低对比小字。

### 18. 可访问性 — ✅ pass
- 节 02 SVG（流程图）、Cover SVG（透镜网格）均有 `aria-hidden="true"`。
- Cover `<section>` 有 `aria-label="文章封面"`。
- Table 有 caption。
- Hero / Lead 是语义组件，标题层级由组件库处理。
- 小提醒（非 fail）：节 01/03/05/07/08/09/10 的装饰性 `<div>` 容器未标 `aria-hidden`，
  屏幕阅读器会读到里面的 `<strong>` 文本——但这些都是有信息量的内容（不是纯装饰），
  应该被读出，故正确。

### 19. 代码异味 — ✅ pass
- 无 `dangerouslySetInnerHTML`。
- 无 `any` 类型、无 `as any`。
- 无明显未使用变量。
- emoji 限定在节 02 SVG 文本标签里（🛑/🔴 作 CHECKPOINT 停车/风险标记）——见必须修复 #2。
- Cover `lenses`/`families` 数组定义在组件内部，无副作用，无泄漏。

---

## 必须修复的点（fail 项，按优先级）

### #1 【移动端·高】节 01 / 05 / 08 的两列固定网格在窄屏会塌陷
- **文件:行**：
  - `sections/01-idea.tsx:33` — `gridTemplateColumns: "1fr 1fr"`
  - `sections/05-principles.tsx:56` — `gridTemplateColumns: "1fr 1fr"`
  - `sections/08-stop.tsx:50` — `gridTemplateColumns: "1fr 1fr"`
- **问题**：375px 窄屏下两列各 ~150px，中文长句 / 节 01 的六步 `<ol>` / 节 08 的整句
  被压窄，影响可读。press 是 wide 版式，正文容器在移动端更窄。
- **建议修法**（任选其一，最小切片）：
  - A（推荐，最简单）：改为 `gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))"`，
    窄屏自动单列、宽屏双列，无需媒体查询。
  - B：在 Raw 内加一段 `<style>{`@media(max-width:560px){...grid-template-columns:1fr!important}"}</style>`。
  - 三处同理改。

### #2 【press 禁止项·中】节 02 SVG 流程图用 emoji 作 CHECKPOINT 标记
- **文件:行**：`sections/02-journey.tsx:31-34`（`gate: "🛑 1a 结构化摘要"` / `"🛑 3c ..."` / `"🔴 4a ..."`）
- **问题**：press 主题明确禁止"emoji / 图标当装饰"。虽然这是功能性 emoji（停车 / 风险标记，
  承袭自源材料），但它在 SVG 文本里渲染依赖系统字体，跨平台不一致（Windows 上 🛑 是彩色 emoji，
  与 press 的线条编辑气质冲突）。
- **建议修法**（最小切片）：把 emoji 换成 press 风格的符号或前缀：
  - `🛑` → `■` 或 `[门]` 或纯文字 `CHECKPOINT`，用 `var(--ra-color-accent)` 着色。
  - `🔴` → `●`（实心圆，accent 色）或 `[验证]`。
  - 例如 `gate: "■ 1a 结构化摘要（门）"` + text `fill="var(--ra-color-accent,...)"`。
  - 同步检查 SVG 里对应 `<text>` 的 `fill` 是否已是 accent（节 02:73 已是 accent，✓）。

---

## 建议优化（可选）

1. **Cover 家族归属对齐**（节 Cover.tsx 第 4 行数组注释 + 着色）：
   Cover 把 Actor 放进"构建组"行、Hacker 以 "Hb" 跨类进"验证组"行，与正文节 04 的家族归属
   不完全一致。封面是抽象 5×5 示意，25 总数正确、不影响主旨。若追求严谨，可把第 4 行末位的
   "Ac"(Actor) 与第 3 行对调，或在 caption 注明"网格为示意，非严格家族分区"。低优先。

2. **节 02 SVG 流程图小屏字号**：`viewBox` 900×280 在 375px 下文字偏小（fontSize 13/11 缩放后）。
   建议给 `<svg>` 加 `preserveAspectRatio="xMidYMid meet"`（当前默认即此，✓），实际可读，
   保留观察即可，不必改。

3. **节 07 快捷指令速查**：`gridTemplateColumns: "auto 1fr auto"` 中间空列在窄屏可能塌缩。
   低风险，若发现塌陷可改为 `gridTemplateColumns: "1fr auto"`（去掉中间占位列）。

4. **节 04 家族头分隔线**：5 个家族都用 `borderBottom: "2px solid var(--ra-color-accent)"`
   全部 accent 色。可考虑诊断/推演/共情/构建/验证分别用 accent 与 fg 交替（如封面那样
   `opacity` 区分），增强家族辨识度。纯视觉增强，非必需。
