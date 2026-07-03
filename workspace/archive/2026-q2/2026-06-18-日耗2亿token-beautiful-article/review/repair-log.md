## 2026-06-18 Phase 6 终审修复

### 1. Cover 渲染非确定性（Visual blocker）
- **问题**：`article/Cover.tsx` 在 render 中调用 `Math.random()`，每次刷新点阵不同，SSR/PDF 不可复现。
- **定位层**：视觉 / 构建
- **最小修复单位**：`article/Cover.tsx` 的 `TokenField`
- **改动**：引入基于 `Math.sin(seed)` 的确定性伪随机函数 `seededRandom`，用 `r * cols + c` 作为 seed 替代 `Math.random()`。
- **验证**：Playwright 刷新 4 次，321 个 circle 的 cx/cy/r/opacity 哈希完全一致。

### 2. Section 06 结论框填色违反 tufte（Visual blocker）
- **问题**：`article/sections/06-invariants.tsx` 中结论 `<rect>` 使用 `fill="var(--ra-color-accent)" opacity="0.08"`。
- **定位层**：视觉 / 主题
- **最小修复单位**：`article/sections/06-invariants.tsx` 的 Raw SVG
- **改动**：删除 `fill` 与 `opacity` 属性，改为 `fill="none"`，仅保留 `stroke` 细线框。
- **验证**：渲染后 5 个 rect 的 `fill` 均为 `none`。

### 3. 页面出现两个 H1（Technical blocker）
- **问题**：`article/Cover.tsx` 的封面标题用了 `<h1>The Art of Token</h1>`，与 `Hero` 主标题冲突。
- **定位层**：技术 / 可访问性
- **最小修复单位**：`article/Cover.tsx` 的封面标题标签
- **改动**：将封面标题从 `<h1>` 降级为 `<p>`，保留完全相同的视觉样式。
- **验证**：页面 `h1` 数量由 2 降为 1，唯一 h1 为 Hero 主标题 "日耗2亿token，是脑力工作者的底线。"

### 4. 作者身份中英文混排（Editorial 建议）
- **问题**：`article/sections/08-conclusion.tsx` 中 "physiological hacker" 与前后中文语体不一致。
- **定位层**：内容
- **最小修复单位**：`article/sections/08-conclusion.tsx` 的作者简介段落
- **改动**：改为 "生理黑客（physiological hacker）"。

### 5. 消费观图表数字自洽（Phase 5 遗留）
- **问题**：`article/sections/05-consumption.tsx` 的 Raw 图表标题写 "月收入 12000 元"、智能投资 "≈1200 元"，与正文 "1400 元" 不一致。
- **定位层**：内容 / 视觉
- **最小修复单位**：`article/sections/05-consumption.tsx` 的 Raw SVG
- **改动**：图表标题改为 "以月收入约 14000 元为例：10% 调用智能预算"，智能投资标注 "1400 元"，条形比例调整为必要支出 90% + 智能投资 10%。

### 6. Section 02 结尾隐喻重复（Phase 5 遗留）
- **问题**：`article/sections/02-leadership.tsx` 结尾 "手里有一支军队..." 与 Section 01 的用兵隐喻重复。
- **定位层**：内容 / 节奏
- **最小修复单位**：`article/sections/02-leadership.tsx` 末段
- **改动**：简化为 "你不缺兵，缺的是持续调兵的能力和意愿。"

### 7. Section 04 blockquote 组件策略违规（Phase 5 遗留）
- **问题**：`article/sections/04-leverage.tsx` 使用原生 `<blockquote style={...}>`，违反 component-policy。
- **定位层**：构建 / 组件策略
- **最小修复单位**：`article/sections/04-leverage.tsx` 的引用块
- **改动**：替换为 `reacticle` 的 `<Quote source="《超体邀请信》">`，并更新 imports。

---

**最终验证**：`npm run typecheck` 通过，`npm run html` 通过，浏览器控制台 0 error / 0 warning，页面 h1 唯一，封面点阵稳定。

---

## 2026-06-18 press 主题重设计（反馈后迭代）

用户反馈首版 tufte "内容太多、太素"，确认方案 B：切换主题 + 精简内容 + 添加 3 张 AI 生成 editorial 图片，信息保留从 ~100% 降到 ~70%。

### 1. 主题切换为 press
- **文件**：`article/main.tsx`
- **改动**：`<ThemeProvider theme="tufte">` → `<ThemeProvider theme="press">`。

### 2. 封面重构为 editorial 图片背景
- **文件**：`article/Cover.tsx`、`article/assets.d.ts`、`vite.config.ts`
- **改动**：
  - 删除原 `TokenField` 点阵 SVG，改用 `assets/cover-press.jpg` 作为全幅背景；
  - 添加 `color-mix()` 渐变遮罩，压上标题、副题与底部断言；
  - 创建 `assets.d.ts` 声明 `*.jpg/png/jpeg` 模块；
  - `vite.config.ts` 增加 `assetsInlineLimit: Number.POSITIVE_INFINITY`，保证图片内联为 base64，单文件 HTML 可离线打开。
- **修复**：最初用 `<img src="assets/cover-press.jpg">` 导致 Vite SPA fallback 返回 HTML，改为 `import coverImg from "../assets/cover-press.jpg"` 后正常内联。

### 3. 内容精简
- **01-opening**：合并重复的「有人会说」反问，删除多次出现的「你要做兵仙」口号。
- **02-leadership**：保持思想实验与 Quote，删除 craft 细节重复段落。
- **04-leverage**：删除「O 家毛利」猜测段落，保留三段 source 对比表。
- **06-invariants**：删除四个条件的展开解释、医疗/科学演化例子，以及重复的练兵成本段落；保留四条件信息图。
- **07-brain**：删除文末 PS 段落。

### 4. 新增章节配图
- **02-leadership**：`assets/leadership-press.jpg`（几何木块网络，象征组织与调用能力）。
- **07-brain**：`assets/brain-press.jpg`（抽象人头侧影与神经网络）。

### 5. 依赖安装环境修复
- **问题**：`npm install` 仅安装生产依赖，`node_modules/@types/` 为空，导致 TS 报找不到 JSX 运行时和 React 类型。
- **根因**：当前 shell 环境变量 `NODE_ENV=production`，npm 默认 `omit=dev`。
- **修复**：用 `NODE_ENV=development npm install` 重新安装全部 devDependencies。

### 6. 规划文档同步
- **文件**：`plan/plan.md`
- **改动**：更新 Theme 为 `press`，Assets 策略为 `ai-generated`，记录 3 张图片清单与 ~70% 信息保留比例。

**最终验证**：`npm run html` 构建成功，`article/article.html` 9.7 MB；3 张图片均为 `data:image/jpeg;base64` 内联；浏览器控制台 0 error；标题、封面、章节图片渲染正常。
