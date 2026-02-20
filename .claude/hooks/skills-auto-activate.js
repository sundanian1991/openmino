/**
 * Skills 自动激活 Hook
 * 
 * 功能：分析用户消息，自动注入skill激活提醒
 * 原理：匹配关键词/场景 → 注入激活指令
 */

// 核心触发规则
const SKILL_RULES = {
  // 创意与思考类
  brainstorming: {
    keywords: ['帮我想想', '头脑风暴', '想点子', '有什么想法'],
    hint: '用 brainstorming skill 进行头脑风暴'
  },
  'writing-plans': {
    keywords: ['写方案', '做计划', '规划', '设计方案'],
    hint: '用 writing-plans skill 创建结构化方案'
  },
  'executing-plans': {
    keywords: ['按计划执行', '执行计划', '实施方案'],
    hint: '用 executing-plans skill 执行计划'
  },
  'systematic-debugging': {
    keywords: ['有bug', '排查', '调试', '不对劲', '异常', '有问题'],
    hint: '用 systematic-debugging skill 系统化排查问题'
  },

  // 内容创作类
  copywriting: {
    keywords: ['写文案', '文案', '写介绍', '写描述'],
    hint: '用 copywriting skill 创作结构化文案'
  },
  'copy-editing': {
    keywords: ['改文案', '编辑文案', '润色', 'review文案'],
    hint: '用 copy-editing skill 编辑优化文案'
  },
  'content-creation': {
    keywords: ['写篇文章', '写博客', '写内容'],
    hint: '用 content-creation skill 创作多渠道内容'
  },
  pptx: {
    keywords: ['做ppt', '做演示', '做幻灯片', '写ppt'],
    hint: '用 pptx skill 创建专业演示文稿'
  },

  // 设计类
  'frontend-design': {
    keywords: ['设计页面', '做ui', '设计界面'],
    hint: '用 frontend-design skill 创建生产级UI'
  },
  'web-design-guidelines': {
    keywords: ['审查设计', '检查设计', '审查ui'],
    hint: '用 web-design-guidelines skill 审查设计规范'
  },

  // 办公文档类
  pdf: {
    keywords: ['处理pdf', '提取pdf', 'pdf文件'],
    hint: '用 pdf skill 处理PDF文档'
  },
  xlsx: {
    keywords: ['做表格', 'excel', 'xlsx'],
    hint: '用 xlsx skill 创建编辑表格'
  },

  // 供应商管理专用
  'steal-learning': {
    keywords: ['萃取经验', '提炼方法', '学习经验'],
    hint: '用 steal-learning skill 萃取他人经验'
  }
};

/**
 * 分析消息，匹配skill
 */
function analyzeMessage(message) {
  const lowerMessage = message.toLowerCase();
  
  for (const [skillName, rule] of Object.entries(SKILL_RULES)) {
    for (const keyword of rule.keywords) {
      if (lowerMessage.includes(keyword.toLowerCase())) {
        return {
          skill: skillName,
          hint: rule.hint,
          confidence: 'high'
        };
      }
    }
  }
  
  return null;
}

/**
 * Hook主函数
 */
function skillsAutoActivate(input) {
  // 分析用户消息
  const match = analyzeMessage(input);
  
  if (match) {
    // 注入激活提醒
    const reminder = `
⚡ 检测到可能需要使用 skill: ${match.skill}

${match.hint}

是否激活此 skill？（如不需要，可忽略此提醒）
    `.trim();
    
    // 将提醒注入到输入前
    return reminder + '\n\n---\n\n' + input;
  }
  
  return input;
}

// 导出Hook函数
module.exports = skillsAutoActivate;
