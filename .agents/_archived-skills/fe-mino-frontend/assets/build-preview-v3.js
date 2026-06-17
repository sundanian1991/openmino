/**
 * 生成第二批图标预览页面（自包含HTML）
 */

const fs = require('fs');
const path = require('path');

const iconsDir = path.join(__dirname, 'icons-v2');
const files = fs.readdirSync(iconsDir).filter(f => f.endsWith('.svg'));

let iconsHTML = '';

// 按类别分组
const categories = {
  '金融电销营销': ['坐席', '话术', '拨打', '接通', '挂断', '首call', '重拨', '有效call', '无效call', '获客', '进件', '进件审批', '拒件', '批贷', '放款', '提款', '还款', '逾期', '催收', '卡激活', '分期', '提额', '销户', '标签', '线索', '商机', '意向客户', '成交', '未成交', '回访'],
  '供应商生命周期': ['需求发起', '市场调研', '招标邀请', '投标响应', '开标', '评标', '中标', '未中标', '签约谈判', '入场培训', '试运行', '正式运营', '爬坡期', '稳定期', '月度考核', '季度评估', '年度评级', '结算', '对账', '开票', '续约评估', '续约签约', '交接', '退出结算', '业务扩展'],
  '日常配合管理': ['及时响应', '周末值班', '数据报送', '异常上报', '出勤', '人员变动', '离职交接', 'SOP执行', '应急响应', '配合评分', '扣分机制', '免责条款', '排名公示', '配额调整', '赛马机制'],
  '质检合规': ['通话质检', '实时质检', '抽检', '全检', '合规话术', '违规话术', '敏感词', '误导销售', '过度承诺', '投诉处理', '争议解决', '录音归档', '数据脱敏', '信息安全', '审计追踪'],
  '数据指标': ['日均产能', '及时率', '流失率', '留存率', '利用率', '接通率', '平均通话时长', '服务等级', '环比', '同比', '累计', '基础分', '月度分', '综合排名', '合规率']
};

for (const [cat, names] of Object.entries(categories)) {
  iconsHTML += `<div class="category"><h2>${cat}</h2><div class="grid">`;
  for (const name of names) {
    const svgPath = path.join(iconsDir, `${name}.svg`);
    if (fs.existsSync(svgPath)) {
      const svgContent = fs.readFileSync(svgPath, 'utf-8');
      iconsHTML += `
        <div class="icon-card">
          <div class="icon">${svgContent}</div>
          <div class="name">${name}</div>
        </div>`;
    }
  }
  iconsHTML += `</div></div>`;
}

const html = `<!DOCTYPE html>
<html lang="zh-CN">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>手绘风格图标 v3 - 第二批</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body {
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      background: #F5F1EE;
      color: #3D2C29;
      padding: 40px;
    }
    h1 {
      text-align: center;
      margin-bottom: 10px;
      font-size: 28px;
    }
    .subtitle {
      text-align: center;
      color: #6B5B54;
      margin-bottom: 40px;
    }
    .category {
      margin-bottom: 40px;
    }
    .category h2 {
      font-size: 18px;
      color: #E2725B;
      margin-bottom: 16px;
      padding-bottom: 8px;
      border-bottom: 2px solid #E2725B;
    }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
      gap: 16px;
    }
    .icon-card {
      background: white;
      border-radius: 12px;
      padding: 16px;
      display: flex;
      flex-direction: column;
      align-items: center;
      box-shadow: 0 2px 8px rgba(61, 44, 41, 0.08);
      transition: transform 0.2s, box-shadow 0.2s;
    }
    .icon-card:hover {
      transform: translateY(-4px);
      box-shadow: 0 8px 24px rgba(61, 44, 41, 0.12);
    }
    .icon {
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
    }
    .icon svg {
      width: 100%;
      height: 100%;
    }
    .name {
      font-size: 11px;
      color: #6B5B54;
      text-align: center;
    }
    .stats {
      text-align: center;
      padding: 20px;
      background: white;
      border-radius: 12px;
      margin-bottom: 40px;
    }
    .stats span {
      color: #E2725B;
      font-weight: 600;
    }
  </style>
</head>
<body>
  <h1>手绘风格图标 v3</h1>
  <p class="subtitle">线条为主 + 陶土色点缀 | 第二批 100 个</p>
  <div class="stats">
    共 <span>100</span> 个图标 | 设计原则：炭灰色线条 <span>#3D2C29</span> + 陶土色点缀 <span>#E2725B</span>
  </div>
  ${iconsHTML}
</body>
</html>`;

fs.writeFileSync(path.join(__dirname, 'icon-preview-v3.html'), html);
console.log('✅ 预览页面已生成: icon-preview-v3.html');
console.log(`   包含 ${files.length} 个图标`);