#!/usr/bin/env node

/**
 * 手绘风格 SVG 图标生成器
 * 使用 Quiver AI API 批量生成图标
 *
 * 用法:
 *   node generate-icons.js --all           # 生成全部100个图标
 *   node generate-icons.js --category 供应商管理  # 生成指定分类
 *   node generate-icons.js --icons 准入,评估,合同  # 生成指定图标
 */

const fs = require('fs');
const path = require('path');

// ============================================
// 配置
// ============================================

const QUIVER_API_KEY = process.env.QUIVER_API_KEY || 'sk_live_JTeCrNxZLMMeBL9pgbijT2';
const QUIVER_API_URL = 'https://api.quiver.ai/v1/svgs/generations';

const OUTPUT_DIR = path.join(__dirname, 'icons');
const VOCABULARY_FILE = path.join(__dirname, 'icons-vocabulary.md');

// 手绘风格配置
const HAND_DRAWN_STYLE = {
  instructions: `Hand-drawn aesthetic, organic imperfect lines, warm and friendly.
    Use rounded line caps and joins. Line width should be 2-3px.
    Style should feel human-crafted, not machine-perfect.
    Color: #3D2C29 (charcoal) for strokes, #E2725B (terracotta) for fills.
    Background should be transparent.`,
  model: 'arrow-preview',
};

// ============================================
// 图标定义
// ============================================

const ICONS = {
  // 一、供应商管理类（20个）
  供应商管理: [
    { name: '准入', en: 'onboarding', prompt: 'A hand-drawn icon of an open door with an arrow pointing inward, welcoming entrance, simple line art' },
    { name: '评估', en: 'evaluation', prompt: 'A hand-drawn icon of a clipboard with a checkmark, evaluation assessment, simple line art' },
    { name: '清退', en: 'exit', prompt: 'A hand-drawn icon of a door with an arrow pointing outward, exit departure, simple line art' },
    { name: '谈判', en: 'negotiation', prompt: 'A hand-drawn icon of two hands shaking, negotiation agreement, simple line art' },
    { name: '合同', en: 'contract', prompt: 'A hand-drawn icon of a document with a signature line, contract agreement, simple line art' },
    { name: '审批', en: 'approval', prompt: 'A hand-drawn icon of a stamp with a check mark, approval authorized, simple line art' },
    { name: '淘汰', en: 'elimination', prompt: 'A hand-drawn icon of an X mark inside a circle, elimination removal, simple line art' },
    { name: '调研', en: 'due-diligence', prompt: 'A hand-drawn icon of a magnifying glass over a document, investigation research, simple line art' },
    { name: '档案', en: 'profile', prompt: 'A hand-drawn icon of a folder with papers, file archive, simple line art' },
    { name: '分层', en: 'tiering', prompt: 'A hand-drawn icon of three stacked horizontal layers, hierarchy levels, simple line art' },
    { name: '头部', en: 'top-tier', prompt: 'A hand-drawn icon of a crown or star, top ranking best, simple line art' },
    { name: '中腰部', en: 'mid-tier', prompt: 'A hand-drawn icon of a bar chart with middle bar highlighted, middle level, simple line art' },
    { name: '尾部', en: 'bottom-tier', prompt: 'A hand-drawn icon of a downward arrow or lower level indicator, bottom ranking, simple line art' },
    { name: '招投标', en: 'bidding', prompt: 'A hand-drawn icon of a gavel or auction paddle, bidding auction, simple line art' },
    { name: '资质', en: 'qualification', prompt: 'A hand-drawn icon of a certificate with a ribbon, qualification certificate, simple line art' },
    { name: '风险', en: 'risk', prompt: 'A hand-drawn icon of a warning triangle with exclamation mark, risk alert, simple line art' },
    { name: '合规', en: 'compliance', prompt: 'A hand-drawn icon of a shield with a checkmark, compliance protection, simple line art' },
    { name: '合作', en: 'partnership', prompt: 'A hand-drawn icon of two puzzle pieces fitting together, partnership collaboration, simple line art' },
    { name: '博弈', en: 'game', prompt: 'A hand-drawn icon of a chess piece, strategic game, simple line art' },
    { name: '绑架', en: 'capture', prompt: 'A hand-drawn icon of a chain or rope loop, capture constraint, simple line art' },
  ],

  // 二、业务运营类（25个）
  业务运营: [
    { name: '产能', en: 'capacity', prompt: 'A hand-drawn icon of a factory or gears, production capacity, simple line art' },
    { name: '质量', en: 'quality', prompt: 'A hand-drawn icon of a diamond or star badge, quality excellence, simple line art' },
    { name: '效率', en: 'efficiency', prompt: 'A hand-drawn icon of a lightning bolt or speedometer, efficiency speed, simple line art' },
    { name: '成本', en: 'cost', prompt: 'A hand-drawn icon of a coin stack or money bag, cost expense, simple line art' },
    { name: '人力', en: 'headcount', prompt: 'A hand-drawn icon of multiple people silhouettes, headcount personnel, simple line art' },
    { name: '接通率', en: 'connection-rate', prompt: 'A hand-drawn icon of a phone with connected lines, connection rate, simple line art' },
    { name: '转化率', en: 'conversion-rate', prompt: 'A hand-drawn icon of a funnel with arrow, conversion rate, simple line art' },
    { name: '完结率', en: 'completion-rate', prompt: 'A hand-drawn icon of a checkmark in a circle, completion rate, simple line art' },
    { name: '满意度', en: 'satisfaction', prompt: 'A hand-drawn icon of a smiley face or thumbs up, satisfaction approval, simple line art' },
    { name: '投诉', en: 'complaint', prompt: 'A hand-drawn icon of a speech bubble with exclamation, complaint issue, simple line art' },
    { name: '质检', en: 'qc', prompt: 'A hand-drawn icon of a checklist with magnifying glass, quality control, simple line art' },
    { name: '培训', en: 'training', prompt: 'A hand-drawn icon of a presentation board or book, training learning, simple line art' },
    { name: '排班', en: 'scheduling', prompt: 'A hand-drawn icon of a calendar with clock, scheduling planning, simple line art' },
    { name: '现场', en: 'onsite', prompt: 'A hand-drawn icon of a building or office, onsite location, simple line art' },
    { name: '远程', en: 'remote', prompt: 'A hand-drawn icon of a laptop with wifi signal, remote work, simple line art' },
    { name: '高峰', en: 'peak', prompt: 'A hand-drawn icon of a mountain peak or rising graph, peak high point, simple line art' },
    { name: '低谷', en: 'valley', prompt: 'A hand-drawn icon of a valley or descending curve, valley low point, simple line art' },
    { name: '扩容', en: 'scale-up', prompt: 'A hand-drawn icon of an expanding arrow or growth chart, scale up expansion, simple line art' },
    { name: '缩编', en: 'scale-down', prompt: 'A hand-drawn icon of a shrinking arrow or compressing lines, scale down reduction, simple line art' },
    { name: '应急', en: 'emergency', prompt: 'A hand-drawn icon of a siren or alarm bell, emergency alert, simple line art' },
    { name: '优化', en: 'optimization', prompt: 'A hand-drawn icon of an upward trending arrow, optimization improvement, simple line art' },
    { name: '迭代', en: 'iteration', prompt: 'A hand-drawn icon of a circular arrow or cycle, iteration loop, simple line art' },
    { name: '试点', en: 'pilot', prompt: 'A hand-drawn icon of a flag or marker, pilot test, simple line art' },
    { name: '推广', en: 'rollout', prompt: 'A hand-drawn icon of spreading arrows or broadcast, rollout expansion, simple line art' },
    { name: '交付', en: 'delivery', prompt: 'A hand-drawn icon of a package or box, delivery shipment, simple line art' },
  ],

  // 三、数据分析类（20个）
  数据分析: [
    { name: 'KPI', en: 'kpi', prompt: 'A hand-drawn icon of a target with bullseye, key performance indicator, simple line art' },
    { name: '排名', en: 'ranking', prompt: 'A hand-drawn icon of a trophy or podium with numbers, ranking position, simple line art' },
    { name: '趋势', en: 'trend', prompt: 'A hand-drawn icon of a rising line graph, trend analysis, simple line art' },
    { name: '预警', en: 'alert', prompt: 'A hand-drawn icon of a bell with exclamation, alert warning, simple line art' },
    { name: '评分', en: 'score', prompt: 'A hand-drawn icon of a star rating or score card, scoring evaluation, simple line art' },
    { name: '日报', en: 'daily-report', prompt: 'A hand-drawn icon of a calendar page with "D", daily report, simple line art' },
    { name: '周报', en: 'weekly-report', prompt: 'A hand-drawn icon of a calendar page with "W", weekly report, simple line art' },
    { name: '月报', en: 'monthly-report', prompt: 'A hand-drawn icon of a calendar page with "M", monthly report, simple line art' },
    { name: '仪表盘', en: 'dashboard', prompt: 'A hand-drawn icon of multiple gauge meters, dashboard monitoring, simple line art' },
    { name: '对比', en: 'comparison', prompt: 'A hand-drawn icon of two bar charts side by side, comparison analysis, simple line art' },
    { name: '下钻', en: 'drill-down', prompt: 'A hand-drawn icon of a magnifying glass over layers, drill down detail, simple line art' },
    { name: '汇总', en: 'summary', prompt: 'A hand-drawn icon of arrows converging to a point, summary aggregation, simple line art' },
    { name: '异常', en: 'anomaly', prompt: 'A hand-drawn icon of a zigzag or irregular line, anomaly detection, simple line art' },
    { name: '基线', en: 'baseline', prompt: 'A hand-drawn icon of a horizontal dashed line, baseline standard, simple line art' },
    { name: '目标', en: 'target', prompt: 'A hand-drawn icon of a target or dartboard, target goal, simple line art' },
    { name: '达成', en: 'achievement', prompt: 'A hand-drawn icon of a flag on a peak, achievement success, simple line art' },
    { name: '缺口', en: 'gap', prompt: 'A hand-drawn icon of a broken line or gap, gap analysis, simple line art' },
    { name: '预测', en: 'forecast', prompt: 'A hand-drawn icon of a crystal ball or forward arrow, forecast prediction, simple line art' },
    { name: '归因', en: 'attribution', prompt: 'A hand-drawn icon of connected nodes in a tree, attribution analysis, simple line art' },
    { name: '洞察', en: 'insight', prompt: 'A hand-drawn icon of a lightbulb or eye, insight discovery, simple line art' },
  ],

  // 四、沟通协作类（15个）
  沟通协作: [
    { name: '会议', en: 'meeting', prompt: 'A hand-drawn icon of people around a table, meeting discussion, simple line art' },
    { name: '汇报', en: 'report', prompt: 'A hand-drawn icon of a person presenting to audience, report presentation, simple line art' },
    { name: '反馈', en: 'feedback', prompt: 'A hand-drawn icon of a speech bubble with arrow, feedback response, simple line art' },
    { name: '跟进', en: 'follow-up', prompt: 'A hand-drawn icon of a clock with arrow, follow-up tracking, simple line art' },
    { name: '协调', en: 'coordination', prompt: 'A hand-drawn icon of crossed arrows or gears, coordination alignment, simple line art' },
    { name: '推进', en: 'push', prompt: 'A hand-drawn icon of a hand pushing forward, push forward, simple line art' },
    { name: '同步', en: 'sync', prompt: 'A hand-drawn icon of two circular arrows, sync synchronization, simple line art' },
    { name: '确认', en: 'confirm', prompt: 'A hand-drawn icon of a checkmark in a box, confirm verification, simple line art' },
    { name: '追问', en: 'ask', prompt: 'A hand-drawn icon of a question mark in a speech bubble, ask question, simple line art' },
    { name: '预警沟通', en: 'warn', prompt: 'A hand-drawn icon of a megaphone, warn announcement, simple line art' },
    { name: '整改', en: 'rectify', prompt: 'A hand-drawn icon of a wrench or repair symbol, rectify fix, simple line art' },
    { name: '复盘', en: 'review', prompt: 'A hand-drawn icon of a magnifying glass over a clock, review reflection, simple line art' },
    { name: '共识', en: 'consensus', prompt: 'A hand-drawn icon of multiple checkmarks together, consensus agreement, simple line art' },
    { name: '决策', en: 'decision', prompt: 'A hand-drawn icon of a crossroads or fork, decision making, simple line art' },
    { name: '拉齐', en: 'align', prompt: 'A hand-drawn icon of parallel lines meeting, alignment sync, simple line art' },
  ],

  // 五、文档管理类（10个）
  文档管理: [
    { name: '制度', en: 'policy', prompt: 'A hand-drawn icon of a scroll or legal document, policy regulation, simple line art' },
    { name: '流程', en: 'process', prompt: 'A hand-drawn icon of connected steps or flowchart, process workflow, simple line art' },
    { name: '规范', en: 'standard', prompt: 'A hand-drawn icon of a ruler or guideline, standard specification, simple line art' },
    { name: '指南', en: 'guide', prompt: 'A hand-drawn icon of a signpost or arrow, guide direction, simple line art' },
    { name: '清单', en: 'checklist', prompt: 'A hand-drawn icon of a list with checkboxes, checklist items, simple line art' },
    { name: '模板', en: 'template', prompt: 'A hand-drawn icon of a document with placeholder lines, template format, simple line art' },
    { name: '归档', en: 'archive', prompt: 'A hand-drawn icon of a file box or cabinet, archive storage, simple line art' },
    { name: '版本', en: 'version', prompt: 'A hand-drawn icon of stacked documents with numbers, version control, simple line art' },
    { name: '审批流程', en: 'approve', prompt: 'A hand-drawn icon of a stamp or seal, approval authorize, simple line art' },
    { name: '签署', en: 'sign', prompt: 'A hand-drawn icon of a pen on document, sign signature, simple line art' },
  ],

  // 六、状态标识类（10个）
  状态标识: [
    { name: '进行中', en: 'in-progress', prompt: 'A hand-drawn icon of a spinning circle or progress bar, in progress, simple line art' },
    { name: '已完成', en: 'completed', prompt: 'A hand-drawn icon of a checkmark in a circle, completed done, simple line art' },
    { name: '待处理', en: 'pending', prompt: 'A hand-drawn icon of a clock or hourglass, pending waiting, simple line art' },
    { name: '已延期', en: 'delayed', prompt: 'A hand-drawn icon of a clock with exclamation, delayed overdue, simple line art' },
    { name: '已关闭', en: 'closed', prompt: 'A hand-drawn icon of a closed folder or lock, closed finished, simple line art' },
    { name: '重点', en: 'priority', prompt: 'A hand-drawn icon of a star or flag, priority important, simple line art' },
    { name: '新增', en: 'new', prompt: 'A hand-drawn icon of a plus sign or sparkle, new add, simple line art' },
    { name: '更新', en: 'update', prompt: 'A hand-drawn icon of a refresh arrow, update refresh, simple line art' },
    { name: '待定', en: 'tbd', prompt: 'A hand-drawn icon of a question mark in a circle, to be determined, simple line art' },
    { name: '风险状态', en: 'risky', prompt: 'A hand-drawn icon of a red flag or danger symbol, risky danger, simple line art' },
  ],
};

// ============================================
// 生成函数
// ============================================

async function generateIcon(icon) {
  const response = await fetch(QUIVER_API_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${QUIVER_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: HAND_DRAWN_STYLE.model,
      prompt: icon.prompt,
      instructions: HAND_DRAWN_STYLE.instructions,
    }),
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status} ${response.statusText}`);
  }

  const data = await response.json();
  return data.data[0].svg;
}

async function generateAllIcons(options = {}) {
  // 确保输出目录存在
  if (!fs.existsSync(OUTPUT_DIR)) {
    fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  }

  const results = [];
  const categories = options.category
    ? { [options.category]: ICONS[options.category] }
    : ICONS;

  for (const [category, icons] of Object.entries(categories)) {
    console.log(`\n📁 处理分类: ${category}`);

    for (const icon of icons) {
      if (options.icons && !options.icons.includes(icon.name)) {
        continue;
      }

      console.log(`  🎨 生成: ${icon.name} (${icon.en})`);

      try {
        const svg = await generateIcon(icon);

        // 保存 SVG 文件
        const filename = `${icon.en}.svg`;
        const filepath = path.join(OUTPUT_DIR, filename);
        fs.writeFileSync(filepath, svg);

        results.push({
          name: icon.name,
          en: icon.en,
          category,
          file: filename,
          status: 'success',
        });

        console.log(`    ✅ 已保存: ${filename}`);

        // API 限流
        await new Promise(resolve => setTimeout(resolve, 500));

      } catch (error) {
        console.error(`    ❌ 失败: ${error.message}`);
        results.push({
          name: icon.name,
          en: icon.en,
          category,
          status: 'error',
          error: error.message,
        });
      }
    }
  }

  // 生成索引文件
  const indexContent = generateIndexFile(results);
  fs.writeFileSync(path.join(OUTPUT_DIR, 'index.json'), JSON.stringify(results, null, 2));

  console.log(`\n✨ 完成! 共生成 ${results.filter(r => r.status === 'success').length} 个图标`);
  console.log(`📂 输出目录: ${OUTPUT_DIR}`);

  return results;
}

function generateIndexFile(results) {
  return JSON.stringify(results, null, 2);
}

// ============================================
// CLI 入口
// ============================================

async function main() {
  const args = process.argv.slice(2);
  const options = {};

  for (let i = 0; i < args.length; i++) {
    if (args[i] === '--category' && args[i + 1]) {
      options.category = args[i + 1];
      i++;
    } else if (args[i] === '--icons' && args[i + 1]) {
      options.icons = args[i + 1].split(',');
      i++;
    } else if (args[i] === '--all') {
      options.all = true;
    }
  }

  if (!options.all && !options.category && !options.icons) {
    console.log(`
用法:
  node generate-icons.js --all                      # 生成全部100个图标
  node generate-icons.js --category 供应商管理       # 生成指定分类
  node generate-icons.js --icons 准入,评估,合同      # 生成指定图标

可用分类:
  ${Object.keys(ICONS).join('\n  ')}
    `);
    process.exit(0);
  }

  await generateAllIcons(options);
}

main().catch(console.error);