const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.yeah.net',
  port: 465,
  secure: true,
  auth: {
    user: 'sundanian@yeah.net',
    pass: 'GFTHt35ZqjdxFUfP'
  }
});

const htmlContent = `
<p>尊敬的领导：</p>

<p>现就AI外呼加微项目供应商选择事宜，请示如下。</p>

<p><strong>项目背景：</strong></p>

<p>本项目为AI外呼加微，目标为160万京东商家数据加满10万企微好友（转化率要求6.25%），获客成本≤20元/单（含14元加微成本+6元券成本）。由于技术对接成本较高，短时间仅能对接一家供应商。</p>

<p><strong>寻源情况：</strong></p>

<table>
<thead>
<tr>
<th>供应商</th>
<th>场景匹配度</th>
<th>配合度</th>
<th>技术对接</th>
</tr>
</thead>
<tbody>
<tr>
<td>言犀（京东内）</td>
<td>零售商家场景对口</td>
<td>前期反馈慢、态度反复</td>
<td>排期已确认，未开始对接</td>
</tr>
<tr>
<td>零犀（第三方）</td>
<td>金融加微案例丰富，话术已验证</td>
<td>配合度高，响应及时</td>
<td>已进行技术对接</td>
</tr>
</tbody>
</table>

<p><strong>关键信息：</strong></p>

<ul>
<li>两家供应商外呼来电身份均可用京东，信任基础一致</li>
<li>6元为券成本（非券面值），商家权益价值可支撑</li>
<li>零犀有多个金融加微成功案例，话术录音质量已确认</li>
<li>6.25%转化率无行业参考，两家供应商均无把握，需持续优化迭代</li>
</ul>

<p><strong>选择建议：</strong></p>

<p>综合评估建议选择零犀。理由：第一，来电身份可用京东，两家在同一起跑线；第二，零犀配合度高，技术对接已进行，切换成本高；第三，6.25%转化率需持续优化话术和时间段，配合度是迭代效率的关键；第四，零犀话术质量已验证，金融到商家的场景调整难度可控。</p>

<p><strong>风险控制：</strong></p>

<p>设定两周验证期，若转化率低于4%或配合度出现问题，可快速切换至言犀（排期已确认，可随时接入）。</p>

<p>妥否，请批示。</p>

<div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e0e0e0;">
  <p><strong>孙大年</strong></p>
  <p style="margin: 5px 0; color: #666; font-size: 13px;">
    京东科技-金融科技事业群-数据科技业务部-电销服务组
  </p>
  <p style="margin: 5px 0; color: #666; font-size: 13px;">
    电话：+86 18249515580<br>
    邮箱：sundanian@jd.com
  </p>
  <p style="margin: 5px 0; color: #666; font-size: 13px;">
    地址：北京市经济技术开发区科创十一街京东总部二号楼A座19层
  </p>
  <p style="margin-top: 15px; padding: 10px; background: #f9f9f9; border-left: 3px solid #e74c3c; color: #666; font-size: 12px;">
    <strong>重要提示：</strong>此邮件及附件具保密性质，包含商业秘密，受法律保护不得泄露，特此提醒您此邮件的机密性。如果您意外收到此邮件，请立即通知我，并从您的系统中删除此邮件及附件，禁止使用、复制或向他人披露邮件及附件相关内容。
  </p>
</div>
`;

transporter.sendMail({
  from: 'sundanian@yeah.net',
  to: 'sundanian@jd.com',
  subject: '关于AI外呼加微项目供应商选择的请示',
  html: htmlContent
}).then(info => {
  console.log('邮件发送成功');
  console.log('Message ID:', info.messageId);
}).catch(err => {
  console.error('邮件发送失败:', err);
});
