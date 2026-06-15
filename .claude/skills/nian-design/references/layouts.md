# 页面布局库（Layouts）

> 28 种页面级骨架。从 Guizang 32 种布局中提取去重，用 nian 设计语言重写。
> 每种是完整可粘贴的 `<section>` HTML 代码块。AI 做：选骨架 → 替文案 → 完成。

---

## ⚠️ 使用前必读

### 版式锁定

- 每个 `<section>` **必须**写 `data-layout="S01"` ~ `"S20"`
- **不允许**临时发明 S01-S20 之外的骨架
- 如需微调，在骨架内用 inline style 修改，不改骨架结构
- 交付前运行 `node scripts/validate-nian-deck.mjs output.html`

### nian 审美硬规则

| 规则 | 约束 |
|------|------|
| 8:1 字号 | Hero 字号 ÷ 正文 ≥ 8:1 |
| 字体四工 | Playfair = Hero / Inter = Body / JetBrains = Data / Doto = 装饰 |
| 一处打破 | 每页恰好 1 处不守规则的元素 |
| 单一场景色 | 同一 section 只用一个场景色（Olive/Glacier/Rock） |
| 禁止项 | 渐变/阴影/圆角>8px/emoji（深色模式可用，见 components.md 双模式色板） |

### 颜色 Token（Brand DNA 7 色）

| Token | 色值 | 角色 |
|-------|------|------|
| `var(--bg)` | `#FAFAF8` | 主背景 |
| `var(--surface)` | `#FFFFFF` | 纯白表面 |
| `var(--surface-raised)` | `#F5F5F0` | 浮起表面层 |
| `var(--border)` | `#E5E5E0` | 边框·分割线 |
| `var(--text-primary)` | `#1A1A1A` | 正文·标题 |
| `var(--text-secondary)` | `#6B6B6B` | 次要文字·标签 |
| `var(--darkgray)` | `#2C2C2C` | 深色区块背景 |
| `var(--olive)` | `#4A5D3A` | 主色·权威增长 |
| `var(--glacier)` | `#2A4A5A` | 辅色·冷峻精确 |
| `var(--rock)` | `#808080` | 中性灰 |
| `var(--yellow)` | `#FFD100` | 信号色·强调 |
| `var(--orange)` | `#E55B2B` | 信号色·警示 |

---

# 一、Hero / 开屏（S01-S04）

---

## S01 · Hero 封面（Cover）

**用途**：整篇文档的开屏。一句话定调。
**来源**：Guizang L1/S01 + Nian V1 Diagonal 斜切。
**内容形状**：纯文字（标题 + 副标 + 来源），无数据。

```html
<section data-layout="S01" style="min-height:100vh;display:grid;grid-template-columns:5fr 7fr;background:var(--bg);overflow:hidden">
  <!-- 左：浅色叙事区 -->
  <div style="display:flex;flex-direction:column;justify-content:center;padding:80px 48px 80px 120px;position:relative;z-index:1">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:32px">
      [必填] SECTION · 2026
    </div>
    <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(48px,7vw,96px);font-weight:300;line-height:1.05;letter-spacing:-2px;color:var(--text-primary);margin-bottom:24px">
      [必填] 核心标题
    </h1>
    <p style="font-family:'Inter',sans-serif;font-size:17px;line-height:1.7;color:var(--text-secondary);max-width:400px;margin-bottom:40px">
      [必填] 一句副标定调。
    </p>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary)">
      [必填] 来源 · DATE
    </div>
  </div>
  <!-- 右：深色斜切区（打破） -->
  <div style="background:var(--darkgray);clip-path:polygon(12% 0,100% 0,100% 100%,0 100%);display:flex;flex-direction:column;justify-content:center;padding:80px 80px 80px 96px;position:relative">
    <!-- 装饰数字 -->
    <div style="position:absolute;right:40px;bottom:40px;font-family:'Playfair Display',Georgia,serif;font-size:180px;font-weight:300;color:rgba(255,255,255,.06);line-height:1">01</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:24px">VOLUME 01</div>
    <div style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(24px,3vw,40px);font-weight:300;color:#fff;line-height:1.2;letter-spacing:-0.5px">[必填] 右侧副文案</div>
  </div>
</section>
```

**要点**：
- 左 5 : 右 7 分割，右侧深色区用 `clip-path` 斜切（nian V1 Diagonal）
- 右侧装饰数字 opacity .06 是"打破"元素
- 斜切角度 `polygon(12% 0,...)` 保持锐利

---

## S02 · Hero 章节幕封（Act Divider）

**用途**：章节开场，制造呼吸节奏。
**来源**：Guizang L2 + Nian V2 Split。
**内容形状**：标签 + 大标题 + 一行引语。

```html
<section data-layout="S02" style="min-height:100vh;display:grid;grid-template-columns:1fr 1fr;background:var(--bg)">
  <!-- 左：深色区 -->
  <div style="background:var(--darkgray);display:flex;flex-direction:column;justify-content:center;padding:80px 64px 80px 120px;position:relative">
    <!-- Ghost 水印（打破元素） -->
    <div style="position:absolute;right:40px;bottom:40px;font-family:'Playfair Display',Georgia,serif;font-size:clamp(80px,12vw,200px);font-weight:300;color:rgba(255,255,255,.04);line-height:1;pointer-events:none;user-select:none">02</div>
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:24px">
      [必填] ACT I
    </div>
    <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(48px,7vw,96px);font-weight:300;line-height:1.05;letter-spacing:-2px;color:#fff">
      [必填] 章节标题
    </h1>
  </div>
  <!-- 右：浅色引语 -->
  <div style="display:flex;flex-direction:column;justify-content:center;padding:80px 120px 80px 64px">
    <p style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(20px,2.5vw,32px);font-weight:300;line-height:1.4;color:var(--text-secondary);max-width:360px">
      [必填] 一句引语，定调本章。
    </p>
    <div style="margin-top:32px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary)">
      [必填] SECTION LABEL
    </div>
  </div>
</section>
```

**要点**：
- 左深右浅 1:1 分割，无斜切（V2 Split）
- 左侧反白大字，右侧灰色引语
- 章节间交替深浅方向（本页左深，下章左浅）
- **Ghost 水印**：右下角超大低透明度数字，opacity 0.04

---

## S03 · Hero 数据（Numeral Hero）

**用途**：以 3-5 个大数字开屏。数据驱动的第一印象。
**来源**：Guizang L3/S06 + Nian hero-numeral。
**内容形状**：3-5 个核心指标。

```html
<section data-layout="S03" style="min-height:100vh;display:flex;flex-direction:column;justify-content:center;padding:80px 120px;background:var(--darkgray);color:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:24px">
    [必填] KEY METRICS
  </div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(36px,5vw,72px);font-weight:300;line-height:1.1;letter-spacing:-1.5px;color:#fff;max-width:700px;margin-bottom:64px">
    [必填] 指标总览
  </h1>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:32px">
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px">[必填] LABEL</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(36px,5vw,64px);font-weight:400;color:#fff;line-height:1">[必填] 128</div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:rgba(255,255,255,.55);margin-top:8px">[必填] 说明</div>
    </div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px">[必填] LABEL</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(36px,5vw,64px);font-weight:400;color:var(--yellow);line-height:1">[必填] 96.4%</div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:rgba(255,255,255,.55);margin-top:8px">[必填] 说明</div>
    </div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px">[必填] LABEL</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(36px,5vw,64px);font-weight:400;color:#fff;line-height:1">[必填] 3.2M</div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:rgba(255,255,255,.55);margin-top:8px">[必填] 说明</div>
    </div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:rgba(255,255,255,.4);margin-bottom:12px">[必填] LABEL</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(36px,5vw,64px);font-weight:400;color:#fff;line-height:1">[必填] 47</div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:rgba(255,255,255,.55);margin-top:8px">[必填] 说明</div>
    </div>
  </div>
</section>
```

---

## S04 · Hero 分割宣言（Split Statement）

**用途**：左数据右宣言，或左图右文的 Hero 变体。
**来源**：Guizang S03 + Nian V5 Bevel。
**内容形状**：左侧大字陈述 + 右侧数据/装饰。

```html
<section data-layout="S04" style="min-height:100vh;display:grid;grid-template-columns:7fr 5fr;background:var(--bg);overflow:hidden">
  <!-- 左：浅色陈述 -->
  <div style="display:flex;flex-direction:column;justify-content:center;padding:80px 48px 80px 120px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:32px">MANIFESTO</div>
    <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(36px,5vw,72px);font-weight:300;line-height:1.1;letter-spacing:-1.5px;color:var(--text-primary);margin-bottom:24px">
      [必填] 核心宣言，<br>一句话力量。
    </h1>
    <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.7;color:var(--text-secondary);max-width:440px">
      [必填] 支撑这句宣言的上下文。
    </p>
  </div>
  <!-- 右：深色数据区 -->
  <div style="background:var(--surface-raised);display:flex;flex-direction:column;justify-content:center;padding:80px 80px 80px 48px;position:relative">
    <div style="position:absolute;right:-20px;top:50%;transform:translateY(-50%);font-family:'Playfair Display',Georgia,serif;font-size:240px;font-weight:300;color:var(--border);opacity:.3;line-height:1;pointer-events:none">V</div>
    <div style="display:flex;flex-direction:column;gap:32px;position:relative;z-index:1">
      <div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">[必填] INDICATOR</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(32px,4vw,56px);font-weight:400;color:var(--text-primary);line-height:1">[必填] 847</div>
        <div style="height:1px;background:var(--border);margin-top:12px"></div>
      </div>
      <div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">[必填] INDICATOR</div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(32px,4vw,56px);font-weight:400;color:var(--olive);line-height:1">[必填] +23%</div>
      </div>
    </div>
  </div>
</section>
```

---

# 二、数据展示（S05-S08）

---

## S05 · 指标卡网格（Metric Grid）

**用途**：3-5 个核心指标并排。
**来源**：Guizang S06 KPI Tower + S20 Ledger + Nian numeral-grid。
**内容形状**：3-5 个同质指标卡。

```html
<section data-layout="S05" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] SECTION LABEL</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 指标概览</h2>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:24px">
    <div style="background:var(--surface);border:1px solid var(--border);padding:28px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">[必填] LABEL</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">[必填] 1,284</div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--olive)">+12.3%</div>
    </div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:28px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">[必填] LABEL</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">[必填] 96.4%</div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--olive)">+2.1%</div>
    </div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:28px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">[必填] LABEL</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">[必填] ¥3.2M</div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary)">持平</div>
    </div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:28px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">[必填] LABEL</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">[必填] 47</div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--orange)">-5.2%</div>
    </div>
  </div>
</section>
```

---

## S06 · 排名条形（Rank Bars）

**用途**：5-10 项横向排名。长度 = 大小。
**来源**：Guizang S07 H-Bar Chart + Nian rank-row__bar。
**内容形状**：5-10 项 = 标签 + 条形 + 数值。

```html
<section data-layout="S06" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] SECTION · RANKING</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 排名标题</h2>
  <div style="display:flex;flex-direction:column;gap:20px">
    <div style="display:grid;grid-template-columns:160px 1fr 60px;gap:16px;align-items:center">
      <div style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--text-primary);text-align:right">[必填] 项目</div>
      <div style="height:8px;background:var(--surface-raised)"><div style="height:100%;background:var(--olive);width:92%"></div></div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-primary);text-align:right">92</div>
    </div>
    <div style="display:grid;grid-template-columns:160px 1fr 60px;gap:16px;align-items:center">
      <div style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--text-primary);text-align:right">[必填] 项目</div>
      <div style="height:8px;background:var(--surface-raised)"><div style="height:100%;background:var(--olive);width:84%"></div></div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-primary);text-align:right">84</div>
    </div>
    <div style="display:grid;grid-template-columns:160px 1fr 60px;gap:16px;align-items:center">
      <div style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--text-primary);text-align:right">[必填] 项目</div>
      <div style="height:8px;background:var(--surface-raised)"><div style="height:100%;background:var(--glacier);width:71%"></div></div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-primary);text-align:right">71</div>
    </div>
    <div style="display:grid;grid-template-columns:160px 1fr 60px;gap:16px;align-items:center">
      <div style="font-family:'Inter',sans-serif;font-size:14px;font-weight:500;color:var(--text-primary);text-align:right">[必填] 项目</div>
      <div style="height:8px;background:var(--surface-raised)"><div style="height:100%;background:var(--text-secondary);width:58%"></div></div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:13px;color:var(--text-primary);text-align:right">58</div>
    </div>
  </div>
</section>
```

---

## S07 · 数据表格（Data Table）

**用途**：密集数据结构化展示。
**来源**：Guizang S21 Tech Spec + Nian data-table。
**内容形状**：多行多列数据。

```html
<section data-layout="S07" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] SECTION · DATA</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 数据表标题</h2>
  <div style="width:100%;overflow-x:auto">
    <table style="width:100%;border-collapse:collapse;font-family:'Inter',sans-serif;font-size:14px">
      <thead>
        <tr style="border-bottom:2px solid var(--text-primary)">
          <th style="text-align:left;padding:12px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);font-weight:500">[必填] 列头</th>
          <th style="text-align:right;padding:12px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);font-weight:500">[必填] 列头</th>
          <th style="text-align:right;padding:12px 16px;font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);font-weight:500">[必填] 列头</th>
        </tr>
      </thead>
      <tbody>
        <tr style="border-bottom:1px solid var(--border)">
          <td style="padding:14px 16px;font-weight:500;color:var(--text-primary)">[必填] 实体</td>
          <td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-primary)">128</td>
          <td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--olive)">+12%</td>
        </tr>
        <tr style="border-bottom:1px solid var(--border)">
          <td style="padding:14px 16px;font-weight:500;color:var(--text-primary)">[必填] 实体</td>
          <td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-primary)">96</td>
          <td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--orange)">-3%</td>
        </tr>
        <tr>
          <td style="padding:14px 16px;font-weight:500;color:var(--text-primary)">[必填] 实体</td>
          <td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-primary)">72</td>
          <td style="padding:14px 16px;text-align:right;font-family:'JetBrains Mono',monospace;color:var(--text-secondary)">0%</td>
        </tr>
      </tbody>
    </table>
  </div>
</section>
```

---

## S08 · 纵向时间线（Vertical Timeline）

**用途**：2-5 个时间节点的演化对比。
**来源**：Guizang S02 Vertical Timeline。
**内容形状**：每节点 = 年份 + 数据 + 描述。

```html
<section data-layout="S08" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] SECTION · EVOLUTION</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 演化标题</h2>
  <div style="display:flex;flex-direction:column;gap:0;position:relative;padding-left:32px">
    <!-- 轴线 -->
    <div style="position:absolute;left:11px;top:0;bottom:0;width:1px;background:var(--border)"></div>
    <!-- 节点 1 -->
    <div style="position:relative;padding:24px 0 24px 32px">
      <div style="position:absolute;left:-21px;top:28px;width:10px;height:10px;background:var(--olive);border-radius:50%"></div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:4px">2023</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(24px,3vw,40px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">1×</div>
      <div style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-secondary)">[必填] 节点描述</div>
    </div>
    <!-- 节点 2 -->
    <div style="position:relative;padding:24px 0 24px 32px">
      <div style="position:absolute;left:-21px;top:28px;width:10px;height:10px;background:var(--olive);border-radius:50%"></div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:4px">2024</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(24px,3vw,40px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">4×</div>
      <div style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-secondary)">[必填] 节点描述</div>
    </div>
    <!-- 节点 3 -->
    <div style="position:relative;padding:24px 0 24px 32px">
      <div style="position:absolute;left:-21px;top:28px;width:10px;height:10px;background:var(--glacier);border-radius:50%"></div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:4px">2025</div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(24px,3vw,40px);font-weight:400;color:var(--text-primary);line-height:1;margin-bottom:8px">12×</div>
      <div style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-secondary)">[必填] 节点描述</div>
    </div>
  </div>
</section>
```

---

# 三、内容结构（S09-S14）

---

## S09 · 对照双栏（Comparison）

**用途**：A vs B 对比。
**来源**：Guizang L9/S08 Duo Compare + Nian comparison。
**内容形状**：正好 2 项对照。

```html
<section data-layout="S09" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] COMPARISON</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 对比标题</h2>
  <div style="display:grid;grid-template-columns:1fr 1px 1fr;gap:0 48px">
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:16px">LABEL A</div>
      <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;color:var(--text-primary);margin-bottom:24px">[必填] 方案 A</h3>
      <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:16px">
        <li style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:var(--text-secondary);padding-left:16px;border-left:2px solid var(--olive)">[必填] 要点</li>
        <li style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:var(--text-secondary);padding-left:16px;border-left:2px solid var(--olive)">[必填] 要点</li>
      </ul>
    </div>
    <div style="background:var(--border)"></div>
    <div>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:16px">LABEL B</div>
      <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;color:var(--text-primary);margin-bottom:24px">[必填] 方案 B</h3>
      <ul style="list-style:none;padding:0;display:flex;flex-direction:column;gap:16px">
        <li style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:var(--text-secondary);padding-left:16px;border-left:2px solid var(--glacier)">[必填] 要点</li>
        <li style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:var(--text-secondary);padding-left:16px;border-left:2px solid var(--glacier)">[必填] 要点</li>
      </ul>
    </div>
  </div>
</section>
```

---

## S10 · 流程步骤（Pipeline / Timeline-H）

**用途**：3-7 步线性流程。
**来源**：Guizang L6 Pipeline + S11 H-Timeline。
**内容形状**：3-7 步 = 编号 + 标题 + 说明。

```html
<section data-layout="S10" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] PROCESS</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 流程标题</h2>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:0;position:relative">
    <div style="position:absolute;top:20px;left:0;right:0;height:1px;background:var(--border)"></div>
    <div style="position:relative;padding-right:24px">
      <div style="width:40px;height:40px;background:var(--olive);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;margin-bottom:20px;position:relative;z-index:1">01</div>
      <h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 步骤</h4>
      <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary)">[必填] 说明</p>
    </div>
    <div style="position:relative;padding-right:24px">
      <div style="width:40px;height:40px;background:var(--olive);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;margin-bottom:20px;position:relative;z-index:1">02</div>
      <h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 步骤</h4>
      <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary)">[必填] 说明</p>
    </div>
    <div style="position:relative;padding-right:24px">
      <div style="width:40px;height:40px;background:var(--glacier);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;margin-bottom:20px;position:relative;z-index:1">03</div>
      <h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 步骤</h4>
      <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary)">[必填] 说明</p>
    </div>
    <div style="position:relative">
      <div style="width:40px;height:40px;background:var(--text-secondary);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:13px;font-weight:500;margin-bottom:20px;position:relative;z-index:1">04</div>
      <h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 步骤</h4>
      <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary)">[必填] 说明</p>
    </div>
  </div>
</section>
```

---

## S11 · 图文混排（Image + Text）

**用途**：左文右图 / 左图右文。
**来源**：Guizang L4/L10 + S22/S23 + Nian bento-grid。
**内容形状**：文字 + 图片并排。

```html
<section data-layout="S11" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] SECTION</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 章节标题</h2>
  <div style="display:grid;grid-template-columns:5fr 7fr;gap:48px;align-items:start">
    <div style="padding-top:12px">
      <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:24px;font-weight:300;color:var(--text-primary);margin-bottom:16px">[必填] 小标题</h3>
      <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;color:var(--text-secondary);margin-bottom:24px">[必填] 正文内容。</p>
      <div style="border-left:2px solid var(--olive);padding:12px 16px;background:var(--surface-raised)">
        <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:6px">KEY INSIGHT</div>
        <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-primary)">[必填] 洞察。</p>
      </div>
    </div>
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMAGE · 16:10</div>
    </div>
  </div>
</section>
```

---

## S12 · 图片网格（Image Grid / Matrix）

**用途**：多图对比/实证。
**来源**：Guizang L5 + S15 Matrix + Nian bento-grid。
**内容形状**：2-6 张图片网格。

```html
<section data-layout="S12" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] EVIDENCE</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 图片标题</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:16px">
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 01</div>
    </div>
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 02</div>
    </div>
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 03</div>
    </div>
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 04</div>
    </div>
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 05</div>
    </div>
    <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border)">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 06</div>
    </div>
  </div>
</section>
```

---

## S13 · 三力卡片（Three Forces / Three Layers）

**用途**：3 个对等概念深化。
**来源**：Guizang S05/S13 Three Forces。
**内容形状**：3 张卡片 = 编号 + 标题 + 描述。

```html
<section data-layout="S13" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] FRAMEWORK</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 框架标题</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
    <div style="background:var(--surface);border:1px solid var(--border);padding:32px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:16px">FORCE 01</div>
      <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:300;color:var(--text-primary);margin-bottom:12px">[必填] 力量一</h3>
      <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary)">[必填] 描述这一力量的核心主张。</p>
    </div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:32px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--glacier);margin-bottom:16px">FORCE 02</div>
      <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:300;color:var(--text-primary);margin-bottom:12px">[必填] 力量二</h3>
      <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary)">[必填] 描述。</p>
    </div>
    <div style="background:var(--surface);border:1px solid var(--border);padding:32px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:16px">FORCE 03</div>
      <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:22px;font-weight:300;color:var(--text-primary);margin-bottom:12px">[必填] 力量三</h3>
      <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary)">[必填] 描述。</p>
    </div>
  </div>
</section>
```

---

## S14 · 格子卡（Cells / Four Cards）

**用途**：4-6 项并列概念/功能。
**来源**：Guizang S04 Six Cells + S19 Four Cards。
**内容形状**：4-6 格 = 图标 + 编号 + 标题 + 一行描述。

```html
<section data-layout="S14" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] OVERVIEW</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 总览标题</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border)">
    <div style="background:var(--surface);padding:28px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">01</div>
      <h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 标题</h4>
      <p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);line-height:1.5">[必填] 一行描述。</p>
    </div>
    <div style="background:var(--surface);padding:28px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">02</div>
      <h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 标题</h4>
      <p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);line-height:1.5">[必填] 一行描述。</p>
    </div>
    <div style="background:var(--surface);padding:28px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">03</div>
      <h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 标题</h4>
      <p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);line-height:1.5">[必填] 一行描述。</p>
    </div>
    <div style="background:var(--surface);padding:28px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">04</div>
      <h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 标题</h4>
      <p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);line-height:1.5">[必填] 一行描述。</p>
    </div>
    <div style="background:var(--surface);padding:28px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">05</div>
      <h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 标题</h4>
      <p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);line-height:1.5">[必填] 一行描述。</p>
    </div>
    <div style="background:var(--surface);padding:28px 24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">06</div>
      <h4 style="font-family:'Inter',sans-serif;font-size:16px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 标题</h4>
      <p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);line-height:1.5">[必填] 一行描述。</p>
    </div>
  </div>
</section>
```

---

# 四、特殊结构（S15-S20）

---

## S15 · 金句 / 陈述页（Statement / Quote）

**用途**：一句金句独占一屏。
**来源**：Guizang L8 S03 Statement + S09 Dot Matrix + S12 Manifesto。
**内容形状**：1 句话 + 出处。

```html
<section data-layout="S15" style="min-height:80vh;display:flex;flex-direction:column;justify-content:center;padding:96px 120px;background:var(--surface-raised);position:relative">
  <!-- 装饰点阵（打破） -->
  <svg style="position:absolute;right:120px;top:50%;transform:translateY(-50%);width:200px;height:200px;opacity:.08" viewBox="0 0 200 200">
    <circle cx="100" cy="100" r="90" fill="none" stroke="var(--text-secondary)" stroke-width="1" stroke-dasharray="6 8" />
  </svg>
  <div style="font-family:'Playfair Display',Georgia,serif;font-size:120px;color:var(--border);line-height:1;margin-bottom:-40px;position:relative;z-index:1">"</div>
  <blockquote style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,4vw,56px);font-weight:300;line-height:1.25;letter-spacing:-1px;color:var(--text-primary);max-width:720px;margin-bottom:32px;position:relative;z-index:1">
    [必填] 核心金句。
  </blockquote>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);position:relative;z-index:1">
    — [必填] 出处 · DATE
  </div>
</section>
```

---

## S16 · 三论点递进（Why Now）

**用途**：三论点 + 各自数据支撑。
**来源**：Guizang S18 Why Now。
**内容形状**：3 列 = 论点 + 描述 + 底部巨数。

```html
<section data-layout="S16" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] WHY NOW</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 为什么是现在</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:32px">
    <div style="border-top:2px solid var(--olive);padding-top:24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:12px">ARGUMENT 01</div>
      <h3 style="font-family:'Inter',sans-serif;font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:12px">[必填] 论点标题</h3>
      <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary);margin-bottom:24px">[必填] 论点描述。</p>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1">[必填] 847</div>
    </div>
    <div style="border-top:2px solid var(--glacier);padding-top:24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--glacier);margin-bottom:12px">ARGUMENT 02</div>
      <h3 style="font-family:'Inter',sans-serif;font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:12px">[必填] 论点标题</h3>
      <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary);margin-bottom:24px">[必填] 论点描述。</p>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--text-primary);line-height:1">[必填] 96%</div>
    </div>
    <div style="border-top:2px solid var(--yellow);padding-top:24px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--yellow);margin-bottom:12px">ARGUMENT 03</div>
      <h3 style="font-family:'Inter',sans-serif;font-size:18px;font-weight:600;color:var(--text-primary);margin-bottom:12px">[必填] 论点标题</h3>
      <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary);margin-bottom:24px">[必填] 论点描述。</p>
      <div style="font-family:'JetBrains Mono',monospace;font-size:clamp(28px,3.5vw,44px);font-weight:400;color:var(--yellow);line-height:1">[必填] ¥2.4M</div>
    </div>
  </div>
</section>
```

---

## S17 · 系统图（System Diagram）

**用途**：三层嵌套架构（core→middle→outer）。
**来源**：Guizang S17 System Diagram。
**内容形状**：左标题 + 右同心圆/三层结构。

```html
<section data-layout="S17" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] ARCHITECTURE</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 系统标题</h2>
  <div style="display:grid;grid-template-columns:5fr 7fr;gap:48px;align-items:center">
    <div>
      <div style="display:flex;flex-direction:column;gap:20px">
        <div style="border-left:3px solid var(--olive);padding-left:16px">
          <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:4px">CORE</div>
          <p style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-primary);font-weight:500">[必填] 内核层描述</p>
        </div>
        <div style="border-left:3px solid var(--glacier);padding-left:16px">
          <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--glacier);margin-bottom:4px">MIDDLE</div>
          <p style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-primary);font-weight:500">[必填] 中间层描述</p>
        </div>
        <div style="border-left:3px solid var(--text-secondary);padding-left:16px">
          <div style="font-family:'JetBrains Mono',monospace;font-size:9px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:4px">OUTER</div>
          <p style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-primary);font-weight:500">[必填] 外圈层描述</p>
        </div>
      </div>
    </div>
    <!-- 同心圆 SVG -->
    <div style="display:flex;align-items:center;justify-content:center">
      <svg width="320" height="320" viewBox="0 0 320 320">
        <circle cx="160" cy="160" r="150" fill="none" stroke="var(--border)" stroke-width="1"/>
        <circle cx="160" cy="160" r="100" fill="none" stroke="var(--glacier)" stroke-width="1"/>
        <circle cx="160" cy="160" r="50" fill="var(--olive)" opacity=".15"/>
        <text x="160" y="164" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="var(--text-secondary)">CORE</text>
        <text x="160" y="110" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="var(--glacier)">MIDDLE</text>
        <text x="160" y="50" text-anchor="middle" font-family="JetBrains Mono,monospace" font-size="10" fill="var(--text-secondary)">OUTER</text>
      </svg>
    </div>
  </div>
</section>
```

---

## S18 · 收束宣言（Closing Manifesto）

**用途**：倒数第二页，核心结论 + 行动项。
**来源**：Guizang L7 S10 Closing + N11 原版。
**内容形状**：深色背景 + 反白结论 + 行动列表。

```html
<section data-layout="S18" style="min-height:80vh;display:flex;flex-direction:column;justify-content:center;padding:96px 120px;background:var(--darkgray);color:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:rgba(255,255,255,.45);margin-bottom:32px">CONCLUSION</div>
  <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(36px,5vw,72px);font-weight:300;line-height:1.1;letter-spacing:-1.5px;color:#fff;max-width:700px;margin-bottom:48px">
    [必填] 核心结论。
  </h1>
  <div style="display:flex;flex-direction:column;gap:20px;max-width:560px">
    <div style="display:flex;gap:16px;align-items:start">
      <div style="width:28px;height:28px;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.6);flex-shrink:0">01</div>
      <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,.75)">[必填] 行动项。</p>
    </div>
    <div style="display:flex;gap:16px;align-items:start">
      <div style="width:28px;height:28px;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.6);flex-shrink:0">02</div>
      <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,.75)">[必填] 行动项。</p>
    </div>
    <div style="display:flex;gap:16px;align-items:start">
      <div style="width:28px;height:28px;border:1px solid rgba(255,255,255,.3);display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;color:rgba(255,255,255,.6);flex-shrink:0">03</div>
      <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,.75)">[必填] 行动项。</p>
    </div>
  </div>
</section>
```

---

## S19 · 证据墙（Evidence Grid）

**用途**：2-3 张同类图片并列，展示证据链。
**来源**：Guizang S24 Evidence Grid（实验区）。
**内容形状**：2-3 张同类型图片 + caption。

```html
<section data-layout="S19" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] EVIDENCE</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 证据标题</h2>
  <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:24px">
    <div>
      <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);margin-bottom:12px">
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 01</div>
      </div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-primary);font-weight:500">[必填] 图片标题</div>
      <div style="font-family:'Inter',sans-serif;font-size:12px;color:var(--text-secondary);margin-top:4px">16:10 · fit-contain</div>
    </div>
    <div>
      <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);margin-bottom:12px">
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 02</div>
      </div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-primary);font-weight:500">[必填] 图片标题</div>
      <div style="font-family:'Inter',sans-serif;font-size:12px;color:var(--text-secondary);margin-top:4px">16:10 · fit-contain</div>
    </div>
    <div>
      <div style="background:var(--surface-raised);aspect-ratio:16/10;display:flex;align-items:center;justify-content:center;border:1px solid var(--border);margin-bottom:12px">
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">IMG 03</div>
      </div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-primary);font-weight:500">[必填] 图片标题</div>
      <div style="font-family:'Inter',sans-serif;font-size:12px;color:var(--text-secondary);margin-top:4px">16:10 · fit-contain</div>
    </div>
  </div>
</section>
```

---

## S20 · 闭环流程（Loop Diagram）

**用途**：3-5 步循环流程（自学闭环、反馈循环）。
**来源**：Guizang S14 Loop Form。
**内容形状**：左步骤列表 + 右 SVG 圆环。

```html
<section data-layout="S20" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] LOOP</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 闭环标题</h2>
  <div style="display:grid;grid-template-columns:5fr 7fr;gap:48px;align-items:center">
    <div style="display:flex;flex-direction:column;gap:20px">
      <div style="display:flex;gap:16px;align-items:start">
        <div style="width:28px;height:28px;background:var(--olive);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;flex-shrink:0">01</div>
        <div><div style="font-family:'Inter',sans-serif;font-size:15px;font-weight:500;color:var(--text-primary)">[必填] 步骤一</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);margin-top:4px">[必填] 说明</div></div>
      </div>
      <div style="display:flex;gap:16px;align-items:start">
        <div style="width:28px;height:28px;background:var(--glacier);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;flex-shrink:0">02</div>
        <div><div style="font-family:'Inter',sans-serif;font-size:15px;font-weight:500;color:var(--text-primary)">[必填] 步骤二</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);margin-top:4px">[必填] 说明</div></div>
      </div>
      <div style="display:flex;gap:16px;align-items:start">
        <div style="width:28px;height:28px;background:var(--text-secondary);color:#fff;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:11px;flex-shrink:0">03</div>
        <div><div style="font-family:'Inter',sans-serif;font-size:15px;font-weight:500;color:var(--text-primary)">[必填] 步骤三</div><div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);margin-top:4px">[必填] 说明</div></div>
      </div>
    </div>
    <!-- SVG 圆环 -->
    <div style="display:flex;align-items:center;justify-content:center">
      <svg width="280" height="280" viewBox="0 0 280 280">
        <circle cx="140" cy="140" r="120" fill="none" stroke="var(--border)" stroke-width="1" stroke-dasharray="8 4"/>
        <circle cx="140" cy="140" r="80" fill="none" stroke="var(--glacier)" stroke-width="1"/>
        <circle cx="140" cy="20" r="6" fill="var(--olive)"/>
        <circle cx="260" cy="140" r="6" fill="var(--glacier)"/>
        <circle cx="140" cy="260" r="6" fill="var(--text-secondary)"/>
        <text x="140" y="144" text-anchor="middle" font-family="Playfair Display,Georgia,serif" font-size="24" font-weight="300" fill="var(--text-primary)">LOOP</text>
      </svg>
    </div>
  </div>
</section>
```

---

## S21 · 页脚收束（Footer）

**用途**：品牌信息 + 版权。最后一页。

```html
<section data-layout="S21" style="padding:48px 120px;background:var(--darkgray);color:rgba(255,255,255,.35);display:flex;justify-content:space-between;align-items:center">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em">[必填] BRAND · 2026</div>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em">[必填] VERSION · DATE</div>
</section>
```

---

# 五、索引

## 选骨架决策表

| 内容意图 | 推荐骨架 | 来源 |
|---------|---------|------|
| 开屏封面 | S01 | Guizang L1/S01 + Nian V1 |
| 章节幕封 | S02 | Guizang L2 + Nian V2 |
| 数据开屏 | S03 | Guizang L3/S06 |
| 分割宣言 Hero | S04 | Guizang S03 + Nian V5 |
| 3-5 核心指标 | S05 | Guizang S06/S20 |
| 5-10 排名 | S06 | Guizang S07 |
| 密集数据表 | S07 | Guizang S21 |
| 纵向时间线 | S08 | Guizang S02 |
| A vs B 对照 | S09 | Guizang L9/S08 |
| 线性流程 | S10 | Guizang L6/S11 |
| 左文右图 | S11 | Guizang L4/L10/S22 |
| 图片网格 | S12 | Guizang L5/S15 |
| 三力/三层 | S13 | Guizang S05/S13 |
| 4-6 格子卡 | S14 | Guizang S04/S19 |
| 金句陈述 | S15 | Guizang L8/S03/S09 |
| 三论点递进 | S16 | Guizang S18 |
| 系统图 | S17 | Guizang S17 |
| 收束结论 | S18 | Guizang S10 |
| 证据墙 | S19 | Guizang S24 |
| 闭环流程 | S20 | Guizang S14 |
| 页脚 | S21 | 通用 |
| Bento 布局 | S22 | R2-方案选型 + Guizang S04/S19 |
| 分屏页 | S23 | R2-预算报告 + Guizang S08 |
| 进度步骤 | S24 | R4-周报 + Guizang S11 |
| 空状态 | S25 | R4-周报 + R5-SOP |
| 编辑感版式 | S26 | R1-全景报告 + H061 |
| 品牌收束 | S27 | R3-品牌展示 + R6-最佳实践 |
| 阅读流 | S28 | R5-深度阅读 + H003/H046/H023/H066 |

## 骨架节奏规则

- 不连续 3 个 section 同族
- 每 3-4 个插 S15（金句转场）
- 深色骨架（S03/S18）≤ 总数 1/3
- 最后一页 S21

---

## S22 · Bento 布局（Bento Grid）

**用途**：能力全景、产品矩阵、服务分类。不规则网格 + 卡片密度变化。
**来源**：R2-方案选型评估 + R3-品牌展示 + Guizang S04/S19。
**内容形状**：4-9 个卡片，大小不一（1x1 / 2x1 / 2x2），形成视觉重心。

```html
<section data-layout="S22" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] SECTION</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:56px">[必填] 章节标题</h2>
  <div style="display:grid;grid-template-columns:repeat(4,1fr);gap:16px;max-width:1120px">
    <!-- 大卡片（2x2） -->
    <div style="grid-column:span 2;grid-row:span 2;padding:32px;background:var(--surface-raised);border:1px solid var(--border)">
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--olive);margin-bottom:12px">[必填] TAG</div>
      <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:28px;font-weight:300;color:var(--text-primary);margin-bottom:12px">[必填] 标题</h3>
      <p style="font-family:'Inter',sans-serif;font-size:14px;line-height:1.6;color:var(--text-secondary)">[必填] 描述。</p>
    </div>
    <!-- 标准卡片（1x1） -->
    <div style="padding:24px;background:var(--surface);border:1px solid var(--border)">
      <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--moss);margin-bottom:8px">[必填] TAG</div>
      <h3 style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:300;color:var(--text-primary);margin-bottom:8px">[必填] 标题</h3>
      <p style="font-family:'Inter',sans-serif;font-size:13px;line-height:1.5;color:var(--text-secondary)">[必填] 描述。</p>
    </div>
    <!-- 更多卡片... -->
  </div>
</section>
```

---

## S23 · 分屏页（Split Screen）

**用途**：强对比场景（"两个世界"）、前后对比、方案对照。左右劈开 + 独立底色。
**来源**：R2-预算申请报告 + R4-风险预警-标杆 + Guizang S08。
**内容形状**：左右两块内容，各占 50%，底色不同。

```html
<section data-layout="S23" style="display:grid;grid-template-columns:1fr 1fr;min-height:80vh">
  <!-- 左侧 -->
  <div style="padding:96px 80px;background:var(--bg);display:flex;flex-direction:column;justify-content:center">
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] LEFT</div>
    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(32px,4vw,56px);font-weight:300;line-height:1.1;color:var(--text-primary);margin-bottom:24px">[必填] 左侧标题</h2>
    <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;color:var(--text-secondary)">[必填] 左侧描述。</p>
  </div>
  <!-- 右侧 -->
  <div style="padding:96px 80px;background:var(--surface-raised);display:flex;flex-direction:column;justify-content:center">
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.1em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] RIGHT</div>
    <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(32px,4vw,56px);font-weight:300;line-height:1.1;color:var(--text-primary);margin-bottom:24px">[必填] 右侧标题</h2>
    <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.7;color:var(--text-secondary)">[必填] 右侧描述。</p>
  </div>
</section>
```

---

## S24 · 进度步骤页（Progress Steps）

**用途**：项目汇报、路线图、实施计划。带进度指示的步骤序列。
**来源**：R4-周报进度同步 + R5-金条赛马规则 + Guizang S11。
**内容形状**：3-7 个步骤，横向排列，带完成状态指示。

```html
<section data-layout="S24" style="padding:96px 120px;background:var(--bg)">
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:4px;text-transform:uppercase;color:var(--text-secondary);margin-bottom:24px">[必填] SECTION</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(28px,3.5vw,48px);font-weight:300;line-height:1.15;letter-spacing:-1px;color:var(--text-primary);max-width:700px;margin-bottom:64px">[必填] 章节标题</h2>
  <div style="display:flex;justify-content:space-between;gap:32px;max-width:1120px">
    <!-- 步骤 1（已完成） -->
    <div style="flex:1;text-align:center">
      <div style="width:40px;height:40px;margin:0 auto 16px;background:var(--olive);color:#fff;border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:600">1</div>
      <h3 style="font-family:'Inter',sans-serif;font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 步骤名</h3>
      <p style="font-family:'Inter',sans-serif;font-size:12px;color:var(--text-secondary)">[必填] 状态</p>
    </div>
    <!-- 连接线 -->
    <div style="width:100%;height:2px;margin-top:20px;background:var(--border)"></div>
    <!-- 步骤 2（进行中） -->
    <div style="flex:1;text-align:center">
      <div style="width:40px;height:40px;margin:0 auto 16px;border:2px solid var(--olive);color:var(--olive);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:600">2</div>
      <h3 style="font-family:'Inter',sans-serif;font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 步骤名</h3>
      <p style="font-family:'Inter',sans-serif;font-size:12px;color:var(--text-secondary)">[必填] 状态</p>
    </div>
    <!-- 步骤 3（待开始） -->
    <div style="flex:1;text-align:center">
      <div style="width:40px;height:40px;margin:0 auto 16px;border:2px solid var(--border);color:var(--text-disabled);border-radius:50%;display:flex;align-items:center;justify-content:center;font-family:'JetBrains Mono',monospace;font-size:14px;font-weight:600">3</div>
      <h3 style="font-family:'Inter',sans-serif;font-size:14px;font-weight:600;color:var(--text-primary);margin-bottom:8px">[必填] 步骤名</h3>
      <p style="font-family:'Inter',sans-serif;font-size:12px;color:var(--text-secondary)">[必填] 状态</p>
    </div>
  </div>
</section>
```

---

## S25 · 空状态页（Empty State）

**用途**："接下来需要做什么"、待开始任务、引导行动。
**来源**：R4-周报进度同步 + R5-供应商准入SOP。
**内容形状**：中心图标 + 标题 + 行动指引。

```html
<section data-layout="S25" style="padding:120px;background:var(--surface);text-align:center;min-height:60vh;display:flex;flex-direction:column;justify-content:center;align-items:center">
  <div style="font-size:64px;margin-bottom:24px;opacity:0.4">[必填] 图标/emoji</div>
  <h2 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(24px,3vw,40px);font-weight:300;line-height:1.2;color:var(--text-primary);max-width:560px;margin-bottom:16px">[必填] 空状态标题</h2>
  <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:var(--text-secondary);max-width:420px;margin-bottom:32px">[必填] 描述和引导。</p>
  <button style="padding:12px 32px;background:var(--darkgray);color:#fff;border:none;border-radius:4px;font-family:'Inter',sans-serif;font-size:14px;font-weight:500;cursor:pointer">[必填] 行动按钮</button>
</section>
```

---

## S26 · 编辑感版式（Editorial Layout）

**用途**：关键观点页、让某页跳出来。打破网格的强视觉冲击。
**来源**：R1-行业全景报告 + R6-供应商最佳实践库 + H061（Hero 水印）。
**内容形状**：超大字号 + 装饰元素 + 不对称布局。

```html
<section data-layout="S26" style="padding:120px;background:var(--darkgray);color:#fff;position:relative;overflow:hidden;min-height:80vh">
  <!-- 水印 -->
  <div style="position:absolute;right:-0.02em;top:0.1em;font-family:'Playfair Display',Georgia,serif;font-size:clamp(12rem,28vw,32rem);font-weight:700;color:var(--olive);opacity:0.04;line-height:0.8;pointer-events:none;letter-spacing:-0.06em">[必填]水印字</div>
  <!-- 内容 -->
  <div style="position:relative;z-index:2;max-width:800px">
    <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.12em;text-transform:uppercase;color:var(--olive);margin-bottom:32px">[必填] LABEL</div>
    <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(56px,8vw,120px);font-weight:300;line-height:1.05;letter-spacing:-2px;color:#fff;margin-bottom:32px">[必填] 核心观点</h1>
    <p style="font-family:'Inter',sans-serif;font-size:18px;line-height:1.7;color:rgba(255,255,255,.7);max-width:560px">[必填] 支撑描述。</p>
  </div>
</section>
```

---

## S27 · 品牌收束（Brand Signature）

**用途**：最后一页品牌签名、视觉收尾。
**来源**：R3-品牌展示 + R6-供应商最佳实践库。
**内容形状**：居中品牌 + 签名 + 行动指引。

```html
<section data-layout="S27" style="padding:96px 120px;background:var(--darkgray);color:#fff;text-align:center;display:flex;flex-direction:column;justify-content:center;align-items:center;min-height:60vh">
  <div style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(48px,6vw,72px);font-weight:300;line-height:1.1;letter-spacing:-1px;margin-bottom:32px">[必填] 品牌名</div>
  <p style="font-family:'Inter',sans-serif;font-size:15px;line-height:1.6;color:rgba(255,255,255,.6);max-width:480px;margin-bottom:48px">[必填] 品牌宣言或签名。</p>
  <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;color:rgba(255,255,255,.35)">[必填] © 2026 BRAND. All rights reserved.</div>
</section>
```

---

# 五、阅读专用骨架（S28）

---

## S28 · 阅读流（Reading Flow）

**用途**：深度阅读、读书笔记、知识管理。粘性侧边栏 + 正文 + 边注系统。
**来源**：R5-深度阅读 + H003 + H046 + H023 + H066（5 个文件构成完整体系）。
**内容形状**：长文阅读，含正文 + 侧边栏注释 + 浮动引用 + 术语卡 + 进度轨迹。

```html
<section data-layout="S28" style="display:grid;grid-template-columns:1fr 320px;gap:48px;max-width:1120px;margin:0 auto;padding:96px 32px">
  <!-- 左：主阅读区 -->
  <div>
    <!-- 阅读入口 -->
    <div style="margin-bottom:48px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">VOLUME 01 · [必填] 系列名</div>
      <h1 style="font-family:'Playfair Display',Georgia,serif;font-size:clamp(36px,5vw,56px);font-weight:300;line-height:1.1;letter-spacing:-1px;color:var(--text-primary);margin-bottom:16px">[必填] 文章标题</h1>
      <p style="font-family:'Inter',sans-serif;font-size:16px;color:var(--text-secondary);margin-bottom:8px">[必填] 副标题或摘要</p>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary)">[必填] 作者 · 日期</div>
    </div>

    <!-- 序言段（首字下沉） -->
    <div style="margin-bottom:48px">
      <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.8;color:var(--text-primary)">
        <span style="font-family:'Playfair Display',Georgia,serif;font-size:48px;font-weight:300;float:left;line-height:1;margin-right:8px;margin-top:4px;color:var(--olive)">[必填]首</span>[必填] 正文段落。首字下沉是阅读流的标志性处理。正文用 Inter 16px，行高 1.8，提供舒适的阅读体验。
      </p>
    </div>

    <!-- 边注式正文（3:1 grid） -->
    <div style="display:grid;grid-template-columns:3fr 1fr;gap:32px;margin-bottom:48px">
      <div>
        <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.8;color:var(--text-primary);margin-bottom:16px">[必填] 正文段落。边注式布局让正文占据 3/4 宽度，右侧 1/4 放置注释、引用或补充信息。</p>
        <p style="font-family:'Inter',sans-serif;font-size:16px;line-height:1.8;color:var(--text-primary)">[必填] 继续正文。</p>
      </div>
      <div style="font-family:'Inter',sans-serif;font-size:13px;line-height:1.6;color:var(--text-secondary);border-left:2px solid var(--border);padding-left:16px">
        <div style="font-family:'JetBrains Mono',monospace;font-size:10px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:8px">MARGINALIA</div>
        [必填] 侧边注释。可以是术语解释、背景补充、或相关链接。
      </div>
    </div>

    <!-- 浮动引用 -->
    <div style="border-left:2px solid var(--olive);padding:16px 24px;background:var(--surface-raised);margin:32px 0">
      <p style="font-family:'Playfair Display',Georgia,serif;font-size:20px;font-weight:300;line-height:1.4;color:var(--text-primary);font-style:italic">[必填] 浮动引用。在正文中突出显示的关键观点。</p>
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary);margin-top:8px">— [必填] 出处</div>
    </div>

    <!-- 术语卡 -->
    <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px;margin:32px 0">
      <div style="background:var(--surface);border:1px solid var(--border);padding:16px;border-radius:8px">
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:300;color:var(--text-primary);margin-bottom:4px">[必填] 术语</div>
        <p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);line-height:1.5">[必填] 术语定义。</p>
      </div>
      <div style="background:var(--surface);border:1px solid var(--border);padding:16px;border-radius:8px">
        <div style="font-family:'Playfair Display',Georgia,serif;font-size:18px;font-weight:300;color:var(--text-primary);margin-bottom:4px">[必填] 术语</div>
        <p style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);line-height:1.5">[必填] 术语定义。</p>
      </div>
    </div>

    <!-- 引言阵列 -->
    <div style="display:grid;grid-template-columns:repeat(3,1fr);gap:1px;background:var(--border);margin:32px 0">
      <div style="background:var(--surface);padding:20px">
        <p style="font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:300;color:var(--text-primary);font-style:italic">[必填] 引言片段</p>
      </div>
      <div style="background:var(--surface);padding:20px">
        <p style="font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:300;color:var(--text-primary);font-style:italic">[必填] 引言片段</p>
      </div>
      <div style="background:var(--surface);padding:20px">
        <p style="font-family:'Playfair Display',Georgia,serif;font-size:16px;font-weight:300;color:var(--text-primary);font-style:italic">[必填] 引言片段</p>
      </div>
    </div>

    <!-- 摘要胶囊 -->
    <div style="display:flex;align-items:center;gap:24px;padding:24px;background:var(--surface-raised);border-radius:8px;margin:32px 0">
      <div style="font-family:'Playfair Display',Georgia,serif;font-size:48px;font-weight:300;color:var(--olive)">3</div>
      <div>
        <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:4px">KEY TAKEAWAYS</div>
        <p style="font-family:'Inter',sans-serif;font-size:14px;color:var(--text-primary);line-height:1.6">[必填] 三条核心要点的简短总结。</p>
      </div>
    </div>
  </div>

  <!-- 右：粘性侧边栏 -->
  <div style="position:sticky;top:96px;align-self:start">
    <!-- 目录 -->
    <div style="margin-bottom:32px">
      <div style="font-family:'JetBrains Mono',monospace;font-size:11px;letter-spacing:0.06em;text-transform:uppercase;color:var(--text-secondary);margin-bottom:12px">CONTENTS</div>
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-primary);cursor:pointer">[必填] 章节一</div>
        <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);cursor:pointer">[必填] 章节二</div>
        <div style="font-family:'Inter',sans-serif;font-size:13px;color:var(--text-secondary);cursor:pointer">[必填] 章节三</div>
      </div>
    </div>
    <!-- 进度轨迹 -->
    <div style="display:flex;gap:4px;align-items:center;margin-bottom:32px">
      <div style="width:16px;height:4px;background:var(--olive);border-radius:2px"></div>
      <div style="width:16px;height:4px;background:var(--olive);border-radius:2px"></div>
      <div style="width:16px;height:4px;background:var(--olive);border-radius:2px"></div>
      <div style="width:24px;height:4px;background:var(--border);border-radius:2px"></div>
      <div style="width:16px;height:4px;background:var(--border);border-radius:2px"></div>
    </div>
    <!-- 元信息 -->
    <div style="font-family:'JetBrains Mono',monospace;font-size:11px;color:var(--text-secondary);line-height:1.8">
      <div>阅读时间：约 [必填] 分钟</div>
      <div>字数：[必填]</div>
      <div>最后更新：[必填]</div>
    </div>
  </div>
</section>
```

**要点**：
- `grid-template-columns: 1fr 320px`（主内容 + 粘性侧边栏）
- 侧边栏 `position: sticky; top: 96px; align-self: start`
- 首字下沉用 `float:left` + Playfair Display 48px
- 边注用 `grid-template-columns: 3fr 1fr`
- 引言阵列用 1px 边框网格
- 摘要胶囊用 flex + 大数字

---

## 选骨架决策表（更新）

| 内容意图 | 推荐骨架 | 来源 |
|---------|---------|------|
| 开屏封面 | S01 | Guizang L1/S01 + Nian V1 |
| 章节幕封 | S03 | Guizang L2 + Nian V2 |
| 数据开屏 | S02 | Guizang L3/S06 |
| 分割宣言 Hero | S01（V5 变体） | Guizang S03 + Nian V5 |
| 3-5 核心指标 | S04 | Guizang S06/S20 |
| 5-10 排名 | S05（排名变体） | Guizang S07 |
| 密集数据表 | S12 | Guizang S21 |
| 纵向时间线 | S11 | Guizang S02 |
| A vs B 对照 | S05 | Guizang L9/S08 |
| 线性流程 | S06 | Guizang L6/S11 |
| 左文右图 | S08 | Guizang L4/L10/S22 |
| 图片网格 | S08（网格变体） | Guizang L5/S15 |
| 三力/三层 | S15（三卡变体） | Guizang S05/S13 |
| 4-6 格子卡 | S15 | Guizang S04/S19 |
| 金句陈述 | S13 | Guizang L8/S03/S09 |
| 三论点递进 | S16 | Guizang S18 |
| 系统图 | S17 | Guizang S17 |
| 收束结论 | S09 | Guizang S10 |
| 证据墙 | S08（网格变体） | Guizang S24 |
| 闭环流程 | S16（循环变体） | Guizang S14 |
| **深度阅读** | **S28 阅读流** | R5-深度阅读, H003, H046 |
| 页脚 | S10 | 通用 |

## 骨架节奏规则（更新）

- 不连续 3 个 section 同族
- 每 3-4 个插 S13（金句转场）
- 深色骨架（S02/S09）≤ 总数 1/3
- 最后一页 S10
- S28 阅读流为独立骨架，不与其他骨架混排

---

*28 种骨架。从 Guizang 32 种去重提取 + 阅读流补充，nian 设计语言重写。2026-06-07*
