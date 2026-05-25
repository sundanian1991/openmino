---
marp: true
theme: default
paginate: true
style: |
  @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@300;400;500;700;900&family=Outfit:wght@400;600;700;800&display=swap');
  section {
    background: #fafafa;
    color: #1a1a1a;
    font-family: 'Noto Sans SC', sans-serif;
    font-weight: 400;
    padding: 56px 72px;
    line-height: 1.6;
  }
  h1 {
    font-family: 'Outfit', 'Noto Sans SC';
    font-weight: 800;
    font-size: 2.8em;
    color: #111;
    letter-spacing: -0.03em;
    line-height: 1.1;
    margin: 0 0 8px;
  }
  h2 {
    font-family: 'Noto Sans SC';
    font-weight: 300;
    font-size: 1.3em;
    color: #666;
    margin: 0 0 20px;
  }
  h3 {
    font-family: 'Outfit', 'Noto Sans SC';
    font-weight: 600;
    font-size: 0.55em;
    color: #999;
    text-transform: uppercase;
    letter-spacing: 0.2em;
    margin: 0 0 8px;
  }
  strong { color: #ea580c; font-weight: 500; }
  table { width: 100%; border-collapse: collapse; font-size: 0.72em; }
  th { text-align: left; padding: 8px 12px; border-bottom: 2px solid #e5e5e5; color: #666; font-weight: 500; }
  td { padding: 8px 12px; border-bottom: 1px solid #f0f0f0; color: #333; }
  section::after { font-family: 'Outfit'; font-size: 0.55em; color: #ccc; }
  .card {
    background: #fff;
    border-radius: 12px;
    padding: 20px 24px;
    border: 1px solid #e5e5e5;
    position: relative;
    overflow: hidden;
    box-shadow: 0 1px 3px rgba(0,0,0,0.04);
  }
  .card::before {
    content: '';
    position: absolute;
    top: 0; left: 0; right: 0;
    height: 2px;
    background: linear-gradient(90deg, #ea580c, transparent);
  }
  .row { display: flex; gap: 16px; }
  .row > div { flex: 1; }
  .tag {
    display: inline-block;
    font-size: 0.65em;
    font-weight: 500;
    letter-spacing: 0.08em;
    padding: 2px 10px;
    border-radius: 4px;
  }
  .metric { font-family: 'Outfit'; font-size: 2em; font-weight: 700; color: #111; }
  .label { font-size: 0.7em; color: #888; margin-top: 2px; }
  .step-circle {
    width: 36px; height: 36px; border-radius: 50%;
    display: flex; align-items: center; justify-content: center;
    margin: 0 auto 8px; font-family: 'Outfit'; font-weight: 700; font-size: 0.85em;
  }
  .divider { border-bottom: 1px solid #e5e5e5; }
footer: ''
---

### Q2 供应商管理 BP

# 供应商分级盘点

## 九宫格评估体系

---

### 现状

# 30+ 供应商，一个维度的评估

<div class="row" style="margin-top: 24px;">
  <div class="card">
    <div class="label" style="margin-bottom: 8px;">覆盖产线</div>
    <div style="font-size: 0.85em; color: #333; line-height: 1.8;">
      金条 · 企金 · 信用卡 · 财富
    </div>
  </div>
  <div class="card">
    <div class="label" style="margin-bottom: 8px;">头部6家</div>
    <div style="font-size: 0.85em; color: #333; line-height: 1.8;">
      毅航 · 毛毛虫 · 伽玛<br>赛维斯 · 岐力 · 翰锐
    </div>
  </div>
</div>

<div style="margin-top: 24px; font-size: 0.75em; color: #666;">
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -3px; margin-right: 4px;">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
    <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
  </svg>
  缺乏系统性分级机制，分级多凭经验和直觉。赛马只看业绩，无合规/稳定性/协作维度。
</div>

---

### 评估体系架构

# 两套体系，月度 + 季度

<div class="row" style="margin-top: 32px;">
  <div class="card" style="text-align: center;">
    <div style="font-size: 0.55em; color: #ea580c; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px;">每月</div>
    <div class="metric" style="font-size: 1.6em;">月度评估</div>
    <div class="label">供应商分级 + 三张清单</div>
    <div style="margin-top: 16px; font-size: 0.75em; color: #666; text-align: left; line-height: 1.8;">
      赛马基础分 → 合规扣分 → 稳定性系数 → 供管自评加分
    </div>
  </div>
  <div class="card" style="text-align: center;">
    <div style="font-size: 0.55em; color: #16a34a; letter-spacing: 0.15em; text-transform: uppercase; margin-bottom: 8px;">每季度</div>
    <div class="metric" style="font-size: 1.6em; color: #16a34a;">季度盘点</div>
    <div class="label">战略校准 + 格局审视</div>
    <div style="margin-top: 16px; font-size: 0.75em; color: #666; text-align: left; line-height: 1.8;">
      战略意义 + 长期潜力 + 风险敞口
    </div>
  </div>
</div>

---

### 月度评估：得分公式

# 最终得分如何计算

<div style="background: #fff; border: 1px solid #e5e5e5; border-radius: 10px; padding: 28px 32px; margin-top: 32px; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.04);">
  <div style="font-size: 1.6em; color: #111; font-family: 'Outfit'; font-weight: 700;">
    最终得分 = <span style="color: #ea580c;">[赛马基础分（扣分后 × 稳定性系数）]</span> + <span style="color: #16a34a;">供管自评加分（0~4分）</span>
  </div>
</div>

<div class="row" style="margin-top: 24px; gap: 12px;">
  <div style="flex: 1; font-size: 0.72em; color: #555; line-height: 1.7;">
    <div style="color: #999; font-weight: 500; margin-bottom: 4px;">第一步</div>
    赛马基础分（满分100）
  </div>
  <div style="color: #ccc; font-size: 1.2em;">→</div>
  <div style="flex: 1; font-size: 0.72em; color: #555; line-height: 1.7;">
    <div style="color: #999; font-weight: 500; margin-bottom: 4px;">第二步</div>
    合规扣分（黄牌/投诉/红线）
  </div>
  <div style="color: #ccc; font-size: 1.2em;">→</div>
  <div style="flex: 1; font-size: 0.72em; color: #555; line-height: 1.7;">
    <div style="color: #999; font-weight: 500; margin-bottom: 4px;">第三步</div>
    稳定性系数（A/B/C）
  </div>
  <div style="color: #ccc; font-size: 1.2em;">→</div>
  <div style="flex: 1; font-size: 0.72em; color: #555; line-height: 1.7;">
    <div style="color: #999; font-weight: 500; margin-bottom: 4px;">第四步</div>
    供管自评加分（0~4分）
  </div>
</div>

---

### 合规扣分 & 稳定性系数

# 两道防线，守住底线

<div class="row" style="margin-top: 24px;">
  <div>
    <div class="label" style="margin-bottom: 8px;">合规扣分</div>
    <table>
      <tr><th>事件</th><th>扣分</th></tr>
      <tr><td>黄牌整改</td><td style="color: #dc2626; font-weight: 500;">-10分/次</td></tr>
      <tr><td>投诉/一般违规</td><td style="color: #d97706; font-weight: 500;">-5分/次</td></tr>
      <tr><td>红线违规</td><td style="color: #dc2626; font-weight: 500;">当月直接降级</td></tr>
    </table>
  </div>
  <div>
    <div class="label" style="margin-bottom: 8px;">稳定性系数</div>
    <table>
      <tr><th>档位</th><th>系数</th><th>触发</th></tr>
      <tr><td><span class="tag" style="background: #16a34a12; color: #16a34a; border: 1px solid #16a34a22;">稳定 A</span></td><td>1.0</td><td>无异常</td></tr>
      <tr><td><span class="tag" style="background: #d9770612; color: #d97706; border: 1px solid #d9770622;">波动 B</span></td><td>0.9</td><td>任一指标预警</td></tr>
      <tr><td><span class="tag" style="background: #dc262612; color: #dc2626; border: 1px solid #dc262622;">失控 C</span></td><td>0.75</td><td>任一指标失控</td></tr>
    </table>
  </div>
</div>

---

### 供管自评加分（0~4分）

# 主观评价，客观触发

<div style="margin-top: 24px;">
  <table>
    <tr><th style="width: 25%;">维度</th><th style="width: 50%;">高=1分的触发条件</th><th style="width: 25%;">得分</th></tr>
    <tr>
      <td><strong>战略协作</strong></td>
      <td>主动提出建设性建议 / 参与规划讨论 / 与业务方向一致</td>
      <td>0 或 1</td>
    </tr>
    <tr>
      <td><strong>响应质量</strong></td>
      <td>24h内响应、反馈有实质内容（非沟通频率）</td>
      <td>0 或 1</td>
    </tr>
    <tr>
      <td><strong>高效执行</strong></td>
      <td>临时任务按时按质完成，无返工</td>
      <td>0 或 1</td>
    </tr>
    <tr>
      <td><strong>共同成长</strong></td>
      <td>产线会议积极贡献、分享经验、对整体产线有额外贡献</td>
      <td>0 或 1</td>
    </tr>
  </table>
</div>

<div style="margin-top: 20px; font-size: 0.7em; color: #888;">
  四项各评高中低，高=1分，中低=0分。满分4分，防"人情分"。
</div>

---

### 计算示例

# 四家供应商的最终得分

<table style="font-size: 0.78em;">
  <tr>
    <th>供应商</th><th>赛马</th><th>合规扣分</th><th>稳定性</th><th>自评</th><th>最终得分</th>
  </tr>
  <tr>
    <td><strong>甲</strong></td><td>90</td><td>0</td><td>A (1.0)</td><td>2/4</td>
    <td style="color: #16a34a; font-weight: 700; font-family: 'Outfit';">90×1.0 + 2 = <strong>92</strong></td>
  </tr>
  <tr>
    <td><strong>乙</strong></td><td>85</td><td style="color: #dc2626;">黄牌(-10)</td><td>A (1.0)</td><td>4/4</td>
    <td style="color: #d97706; font-weight: 700; font-family: 'Outfit';">75×1.0 + 4 = <strong>79</strong></td>
  </tr>
  <tr>
    <td><strong>丙</strong></td><td>90</td><td>0</td><td style="color: #d97706;">B (0.9)</td><td>1/4</td>
    <td style="color: #d97706; font-weight: 700; font-family: 'Outfit';">81×0.9 + 1 = <strong>73.9</strong></td>
  </tr>
  <tr>
    <td><strong>丁</strong></td><td>75</td><td>0</td><td style="color: #dc2626;">C (0.75)</td><td>0/4</td>
    <td style="color: #dc2626; font-weight: 700; font-family: 'Outfit';">56.3 + 0 = <strong>56.3</strong></td>
  </tr>
</table>

<div style="margin-top: 16px; font-size: 0.68em; color: #888;">
  乙：赛马高但有黄牌 → 扣分重；丁：稳定性失控 → 分数腰斩。合规和稳定性的影响大于自评。
</div>

---

### 九宫格定义

# 当月贡献 × 环比趋势

<div style="margin-top: 20px;">
  <table style="font-size: 0.72em; text-align: center;">
    <tr><th style="width: 20%;"></th><th style="width: 26%;">趋势下降</th><th style="width: 26%;">趋势持平</th><th style="width: 26%;">趋势上升</th></tr>
    <tr>
      <td style="font-weight: 500; color: #ea580c;">高贡献</td>
      <td><span class="tag" style="background: #d9770612; color: #d97706; border: 1px solid #d9770622;">预警</span><br><span style="font-size: 0.85em; color: #888;">稳住别掉</span></td>
      <td><span class="tag" style="background: #16a34a12; color: #16a34a; border: 1px solid #16a34a22;">明星</span><br><span style="font-size: 0.85em; color: #888;">稳产主力</span></td>
      <td><span class="tag" style="background: #2563eb12; color: #2563eb; border: 1px solid #2563eb22;">加速器</span><br><span style="font-size: 0.85em; color: #888;">重点投</span></td>
    </tr>
    <tr>
      <td style="font-weight: 500; color: #888;">中贡献</td>
      <td><span class="tag" style="background: #d9770612; color: #d97706; border: 1px solid #d9770622;">关注</span><br><span style="font-size: 0.85em; color: #888;">为什么掉</span></td>
      <td><span class="tag" style="background: #6b728012; color: #6b7280; border: 1px solid #6b728022;">中坚</span><br><span style="font-size: 0.85em; color: #888;">基本盘</span></td>
      <td><span class="tag" style="background: #16a34a12; color: #16a34a; border: 1px solid #16a34a22;">成长</span><br><span style="font-size: 0.85em; color: #888;">重点培养</span></td>
    </tr>
    <tr>
      <td style="font-weight: 500; color: #999;">低贡献</td>
      <td><span class="tag" style="background: #dc262612; color: #dc2626; border: 1px solid #dc262622;">淘汰</span><br><span style="font-size: 0.85em; color: #888;">持续恶化</span></td>
      <td><span class="tag" style="background: #6b728012; color: #6b7280; border: 1px solid #6b728022;">观察</span><br><span style="font-size: 0.85em; color: #888;">给期限</span></td>
      <td><span class="tag" style="background: #2563eb12; color: #2563eb; border: 1px solid #2563eb22;">潜力</span><br><span style="font-size: 0.85em; color: #888;">给机会</span></td>
    </tr>
  </table>
</div>

<div style="margin-top: 16px; font-size: 0.65em; color: #999;">
  X轴：最终得分高中低三分位 | Y轴：环比变化率 ≥5%上升 / -5%~+5%持平 / ≥5%下降
</div>

---

### 季度盘点

# 月度看不出来的维度

<div class="row" style="margin-top: 24px;">
  <div class="card" style="text-align: center;">
    <div style="margin-bottom: 8px;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ea580c" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/>
      </svg>
    </div>
    <div style="font-weight: 500; color: #111; font-size: 0.9em; margin-bottom: 8px;">战略意义</div>
    <div style="font-size: 0.72em; color: #666; line-height: 1.7;">
      是否在关键产线/关键项目有不可替代性
    </div>
    <div class="label" style="margin-top: 8px;">管理层评估</div>
  </div>
  <div class="card" style="text-align: center;">
    <div style="margin-bottom: 8px;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#16a34a" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/>
      </svg>
    </div>
    <div style="font-weight: 500; color: #111; font-size: 0.9em; margin-bottom: 8px;">长期潜力</div>
    <div style="font-size: 0.72em; color: #666; line-height: 1.7;">
      规模扩张意愿、技术升级能力、团队稳定性
    </div>
    <div class="label" style="margin-top: 8px;">访谈 + 观察</div>
  </div>
  <div class="card" style="text-align: center;">
    <div style="margin-bottom: 8px;">
      <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
        <line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>
      </svg>
    </div>
    <div style="font-weight: 500; color: #111; font-size: 0.9em; margin-bottom: 8px;">风险敞口</div>
    <div style="font-size: 0.72em; color: #666; line-height: 1.7;">
      过度依赖单一大客户、财务状况、舆情
    </div>
    <div class="label" style="margin-top: 8px;">公开信息 + 调研</div>
  </div>
</div>

---

### 季度校准结果

# 四象限决策矩阵

<div class="row" style="margin-top: 28px;">
  <div class="card" style="border-top: 2px solid #16a34a;">
    <div class="tag" style="background: #16a34a12; color: #16a34a; margin-bottom: 8px;">月度好 + 季度好</div>
    <div style="font-weight: 500; color: #111; font-size: 0.9em;">保留清单</div>
    <div style="font-size: 0.72em; color: #666; margin-top: 8px; line-height: 1.7;">
      深度绑定，资源倾斜
    </div>
  </div>
  <div class="card" style="border-top: 2px solid #d97706;">
    <div class="tag" style="background: #d9770612; color: #d97706; margin-bottom: 8px;">月度好 + 季度差</div>
    <div style="font-weight: 500; color: #111; font-size: 0.9em;">高贡献但脆弱</div>
    <div style="font-size: 0.72em; color: #666; margin-top: 8px; line-height: 1.7;">
      准备替代方案
    </div>
  </div>
  <div class="card" style="border-top: 2px solid #2563eb;">
    <div class="tag" style="background: #2563eb12; color: #2563eb; margin-bottom: 8px;">月度差 + 季度好</div>
    <div style="font-weight: 500; color: #111; font-size: 0.9em;">低贡献但值得救</div>
    <div style="font-size: 0.72em; color: #666; margin-top: 8px; line-height: 1.7;">
      资源倾斜，给机会
    </div>
  </div>
  <div class="card" style="border-top: 2px solid #dc2626;">
    <div class="tag" style="background: #dc262612; color: #dc2626; margin-bottom: 8px;">月度差 + 季度差</div>
    <div style="font-weight: 500; color: #111; font-size: 0.9em;">优化清单</div>
    <div style="font-size: 0.72em; color: #666; margin-top: 8px; line-height: 1.7;">
      启动清退流程
    </div>
  </div>
</div>

---

### 三张清单

# 分级结果 → 行动策略

<div class="row" style="margin-top: 20px; gap: 14px;">
  <div class="card" style="border-top: 3px solid #16a34a;">
    <div style="font-size: 0.55em; color: #16a34a; letter-spacing: 0.15em; text-transform: uppercase;">保留清单</div>
    <div class="metric" style="font-size: 1.4em; color: #16a34a;">6-10 家</div>
    <div class="label">头部</div>
    <div style="font-size: 0.72em; color: #666; margin-top: 12px; line-height: 1.7;">
      资源倾斜 · 优先分配 · 深度绑定<br>
      来源：明星 + 加速器 + 中坚
    </div>
  </div>
  <div class="card" style="border-top: 3px solid #2563eb;">
    <div style="font-size: 0.55em; color: #2563eb; letter-spacing: 0.15em; text-transform: uppercase;">培养清单</div>
    <div class="metric" style="font-size: 1.4em; color: #2563eb;">12-15 家</div>
    <div class="label">腰部</div>
    <div style="font-size: 0.72em; color: #666; margin-top: 12px; line-height: 1.7;">
      针对性辅导 · 明确方向 · 月度跟踪<br>
      来源：成长 + 潜力 + 关注 + 观察
    </div>
  </div>
  <div class="card" style="border-top: 3px solid #dc2626;">
    <div style="font-size: 0.55em; color: #dc2626; letter-spacing: 0.15em; text-transform: uppercase;">优化清单</div>
    <div class="metric" style="font-size: 1.4em; color: #dc2626;">5-8 家</div>
    <div class="label">尾部</div>
    <div style="font-size: 0.72em; color: #666; margin-top: 12px; line-height: 1.7;">
      限期整改 · 减少份额 · 准备替代<br>
      来源：淘汰 + 预警
    </div>
  </div>
</div>

---

### 实施路径

# 三步走

<div style="margin-top: 28px;">
  <div class="divider" style="display: flex; align-items: flex-start; gap: 20px; padding: 16px 0;">
    <div style="min-width: 80px; text-align: center;">
      <div class="step-circle" style="background: #ea580c; color: #fff;">1</div>
      <div style="font-size: 0.65em; color: #999;">第1个月</div>
    </div>
    <div>
      <div style="font-weight: 500; color: #111; margin-bottom: 4px;">基线建立</div>
      <div style="font-size: 0.75em; color: #666; line-height: 1.6;">收集赛马/合规/稳定性/自评 → 计算30+家得分 → 首次九宫格（趋势标记"基线"）</div>
    </div>
  </div>
  <div class="divider" style="display: flex; align-items: flex-start; gap: 20px; padding: 16px 0;">
    <div style="min-width: 80px; text-align: center;">
      <div class="step-circle" style="background: #555; color: #fff;">2</div>
      <div style="font-size: 0.65em; color: #999;">第2个月起</div>
    </div>
    <div>
      <div style="font-weight: 500; color: #111; margin-bottom: 4px;">月度滚动</div>
      <div style="font-size: 0.75em; color: #666; line-height: 1.6;">每月重复 → 计算环比趋势 → 更新九宫格 → 输出三张清单</div>
    </div>
  </div>
  <div style="display: flex; align-items: flex-start; gap: 20px; padding: 16px 0;">
    <div style="min-width: 80px; text-align: center;">
      <div class="step-circle" style="background: #16a34a; color: #fff;">3</div>
      <div style="font-size: 0.65em; color: #999;">每季度末</div>
    </div>
    <div>
      <div style="font-weight: 500; color: #111; margin-bottom: 4px;">季度校准</div>
      <div style="font-size: 0.75em; color: #666; line-height: 1.6;">追加战略/潜力/风险评估 → 修正月度结果 → 向易人汇报确认</div>
    </div>
  </div>
</div>

---

### 里程碑

# 5月启动 → 6月趋势可见

<table style="font-size: 0.68em;">
  <tr><th>时间</th><th>里程碑</th><th>完成标志</th></tr>
  <tr><td style="color: #ea580c; font-weight: 500;">5月第1周</td><td>基线数据收集</td><td>30+供应商得分计算完毕</td></tr>
  <tr><td style="color: #ea580c; font-weight: 500;">5月第2周</td><td>首次九宫格</td><td>每家供应商有明确位置</td></tr>
  <tr><td style="color: #ea580c; font-weight: 500;">5月第2周</td><td>三张清单输出</td><td>保留/培养/优化清单确认</td></tr>
  <tr><td style="color: #ea580c; font-weight: 500;">5月第3周</td><td>汇报完成</td><td>易人确认分级结果</td></tr>
  <tr><td style="color: #888;">6月起</td><td>月度评估滚动</td><td>每月末自动更新</td></tr>
  <tr><td style="color: #888;">6月底</td><td>首次趋势可见</td><td>5月→6月环比可用</td></tr>
  <tr><td style="color: #888;">Q2末</td><td>首次季度校准</td><td>战略/潜力/风险校准完成</td></tr>
</table>

---

### 量化指标

# 用数据衡量体系有效性

<div class="row" style="margin-top: 24px; gap: 14px; flex-wrap: wrap;">
  <div class="card" style="text-align: center; flex: 1; min-width: 140px;">
    <div class="metric" style="font-size: 1.4em; color: #16a34a;">100%</div>
    <div class="label">评估覆盖率</div>
  </div>
  <div class="card" style="text-align: center; flex: 1; min-width: 140px;">
    <div class="metric" style="font-size: 1.4em; color: #2563eb;">≥1家</div>
    <div class="label">Q2腰部转化率</div>
  </div>
  <div class="card" style="text-align: center; flex: 1; min-width: 140px;">
    <div class="metric" style="font-size: 1.4em; color: #d97706;">≥20%</div>
    <div class="label">自评低分占比</div>
  </div>
  <div class="card" style="text-align: center; flex: 1; min-width: 140px;">
    <div class="metric" style="font-size: 1.4em; color: #888;">基线</div>
    <div class="label">头部产能占比</div>
  </div>
</div>

<div style="margin-top: 16px; font-size: 0.68em; color: #888;">
  自评区分度：至少20%供应商自评得2分以下，防止"人情分"。
</div>

---

### 风险与应对

# 分级不是贴标签

<div style="margin-top: 20px; font-size: 0.72em;">
  <table>
    <tr><th style="width: 45%;">风险</th><th style="width: 55%;">应对</th></tr>
    <tr><td>首次稳定性评估无历史数据</td><td>第1个月标注"待校准"，第2个月有趋势后修正</td></tr>
    <tr><td>合规扣分与赛马合规指标重复</td><td>如已包含则合规扣分减半，只计红线事件</td></tr>
    <tr><td>自评变成"人情分"</td><td>明确触发条件；连续两月无中低分需复核</td></tr>
    <tr><td>分级变"贴标签"，腰部失去积极性</td><td>强调动态调整，每次公布"进步榜"</td></tr>
    <tr><td>精力集中在分级，后续动作跟不上</td><td>分级是起点，重点是三张清单对应的后续动作</td></tr>
  </table>
</div>

---

### 下一步

# 基线数据收集

<div style="margin-top: 32px; text-align: center;">
  <div style="font-size: 0.85em; color: #666; line-height: 2;">
    收集当月赛马成绩<br>
    收集合规事件记录<br>
    评估30+家交付稳定性<br>
    完成供管自评打分<br>
    <br>
    <span style="color: #ea580c; font-weight: 500;">→ 输出首次九宫格 + 三张清单</span>
  </div>
</div>
