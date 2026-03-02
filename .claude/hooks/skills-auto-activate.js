#!/usr/bin/env node

/**
 * Skills Auto-Activation Hook — 基于关键词自动激活 Skills
 *
 * 触发时机：用户消息提交前（UserPromptSubmit）
 *
 * 工作原理：
 * 1. 分析用户 prompt 的关键词/意图
 * 2. 匹配相关 skills
 * 3. 注入激活提醒到 prompt 开头
 * 4. Claude 看到提醒后优先使用对应 skill
 */

// Skill 配置：关键词 → skill 名称映射
const SKILL_CONFIG = {
    // ========== 设计类 ==========
    'frontend-design': {
        keywords: ['前端', 'frontend', 'UI', '界面设计', '页面设计', '组件设计', 'React 组件', '网页设计'],
        description: '创建前端界面和组件'
    },
    'web-design-expert': {
        keywords: ['网页设计', '品牌设计', 'color palette', '视觉设计', 'layout', '响应式设计', 'UI 设计'],
        description: '网页视觉设计和品牌识别'
    },
    'ux-designer': {
        keywords: ['UX', '用户体验', 'wireframe', 'user flow', 'accessibility', 'WCAG', '交互设计', '设计系统'],
        description: '用户体验设计和无障碍'
    },
    'top-design': {
        keywords: ['高端设计', 'portfolio', '品牌网站', '滚动动画', 'Awwwards', 'premium design'],
        description: '高端 portfolio 和品牌网站设计'
    },
    'baoyu-infographic': {
        keywords: ['infographic', '信息图', '可视化', '数据可视化', '图表设计'],
        description: '专业信息图生成'
    },
    'baoyu-slide-deck': {
        keywords: ['slides', 'presentation', 'deck', 'PPT', '演示文稿', '幻灯片'],
        description: '专业演示文稿生成'
    },
    'frontend-slides': {
        keywords: ['HTML slides', 'HTML 演示', '前端幻灯片', 'animation slides'],
        description: 'HTML 动画幻灯片'
    },
    'markdown-slides': {
        keywords: ['markdown slides', 'Marp', 'Deckset', 'markdown 演示'],
        description: 'Markdown 格式演示文稿'
    },

    // ========== 内容创作类 ==========
    'content-creation': {
        keywords: ['marketing', 'blog', 'social media', 'landing page', 'press release', '营销内容', '博客文章'],
        description: '营销内容创作'
    },
    'copywriting': {
        keywords: ['copy', 'headline', 'CTA', '营销文案', '广告语', 'slogan', 'copywriting'],
        description: '营销文案创作'
    },
    'copy-editing': {
        keywords: ['edit copy', 'review copy', 'proofread', 'polish', '文案编辑', '润色'],
        description: '文案编辑和润色'
    },
    'email': {
        keywords: ['email', '邮件', 'SMTP', 'email template', '商务邮件', '邮件模板'],
        description: '邮件发送和模板创建'
    },
    'document-writer': {
        keywords: ['公文', '正式文档', '审批', '汇报', '供应商通知', '公函'],
        description: '公文起草'
    },

    // ========== 开发类 ==========
    'tdd-strict': {
        keywords: ['TDD', 'test-driven', '先写测试', '测试优先', 'red-green-refactor'],
        description: '严格测试驱动开发'
    },
    'testing-patterns': {
        keywords: ['test', '单元测试', '集成测试', 'e2e', 'test coverage', 'mocking', '测试策略'],
        description: '跨语言测试策略'
    },
    'systematic-debugging': {
        keywords: ['debug', 'bug', 'test failure', '调试', '排查问题', '定位错误'],
        description: '系统化调试流程'
    },
    'frontend-patterns': {
        keywords: ['React', 'Next.js', 'state management', 'performance', '前端模式', '组件模式'],
        description: '前端开发模式'
    },
    'webapp-testing': {
        keywords: ['Playwright', 'frontend test', 'browser test', 'E2E test', '前端测试'],
        description: 'Playwright 前端测试'
    },

    // ========== 工具类 ==========
    'github': {
        keywords: ['gh issue', 'gh pr', 'gh run', 'GitHub CLI', 'pull request', 'issue'],
        description: 'GitHub CLI 操作'
    },
    'search': {
        keywords: ['web search', 'Tavily', '搜索', '查找信息', 'internet search'],
        description: '网页搜索'
    },
    'web-search': {
        keywords: ['web search', 'Playwright search', '中文搜索', '浏览器搜索'],
        description: 'Playwright 浏览器搜索'
    },
    'summarize': {
        keywords: ['summarize', 'transcribe', '总结', '摘要', '转录', 'podcast', 'video'],
        description: 'URL/播客/视频总结'
    },
    'deep-reading-analyst': {
        keywords: ['analyze article', 'deep dive', '分析文章', '深度阅读', 'SCQA', '思考模型'],
        description: '深度阅读和分析'
    },
    'steal-learning': {
        keywords: ['学习', '萃取', '经验', '方法论', '他人经验'],
        description: '极简信息萃取'
    },

    // ========== 架构类 ==========
    'planning-with-files': {
        keywords: ['plan', '规划', '多步骤任务', '复杂任务', 'task plan'],
        description: '文件化任务规划'
    },
    'writing-plans': {
        keywords: ['writing plan', 'spec', 'requirements', '写作计划', '需求文档'],
        description: '写作和需求规划'
    },
    'mcp-builder': {
        keywords: ['MCP', 'Model Context Protocol', 'MCP server', 'MCP 集成'],
        description: 'MCP 服务器创建'
    },

    // ========== 审查类 ==========
    'requesting-code-review': {
        keywords: ['code review', 'PR review', '代码审查', '审查代码', 'merge'],
        description: '代码审查请求'
    },
    'seo-audit': {
        keywords: ['SEO', 'seo audit', 'technical SEO', 'ranking', 'on-page SEO', 'meta tags'],
        description: 'SEO 审计'
    },

    // ========== 数据类 ==========
    'xlsx': {
        keywords: ['spreadsheet', 'Excel', 'xlsx', '表格', ' formulas', '数据透视表'],
        description: '电子表格操作'
    },
    'pdf': {
        keywords: ['PDF', 'pdf form', 'extract text', 'merge PDF', 'split PDF'],
        description: 'PDF 操作'
    },
    'docx': {
        keywords: ['Word', 'docx', 'document', 'tracked changes', 'comments', '文档'],
        description: 'Word 文档操作'
    },
    'pptx': {
        keywords: ['PowerPoint', 'pptx', 'slides', '演示文稿', ' deck'],
        description: 'PowerPoint 操作'
    },

    // ========== 学习研究类 ==========
    'ultra-research': {
        keywords: ['research', '调研', '竞品分析', '技术选型', '行业趋势', '深度研究'],
        description: '多 AI 并行深度研究'
    },
    'marketing-ideas': {
        keywords: ['marketing ideas', 'growth ideas', '营销策略', '推广方案', '增长方案'],
        description: '营销策略建议'
    },

    // ========== 技能创建类 ==========
    'skill-creator': {
        keywords: ['create skill', 'new skill', '创建技能', '扩展能力'],
        description: '技能创建指南'
    },
    'find-skills': {
        keywords: ['find skill', 'install skill', 'skill for', '有没有技能'],
        description: '技能发现和安装'
    },
    'claudeception': {
        keywords: ['claudeception', 'save learning', 'extract skill', '总结经验'],
        description: '持续学习系统'
    },

    // ========== 其他 ==========
    'humanizer': {
        keywords: ['humanize', 'remove AI', 'AI writing', '自然化', '去除 AI 味'],
        description: '去除 AI 写作痕迹'
    },
    'napkin': {
        keywords: ['napkin', 'memory', 'lessons learned', '经验教训', '运行记录'],
        description: '持久记忆系统'
    },
    'download-anything': {
        keywords: ['download', 'yt-dlp', 'aria2', 'spotdl', '网盘', '资源下载'],
        description: '数字资源下载'
    },
    'leader-sim': {
        keywords: ['领导模拟', '质询', '压力测试', '方案汇报', '晋升述职'],
        description: '领导模拟质询'
    }
};

/**
 * 分析 prompt 并匹配 skills
 * @param {string} prompt - 用户输入的 prompt
 * @returns {Array} 匹配的 skill 列表
 */
function matchSkills(prompt) {
    const matchedSkills = [];
    const lowerPrompt = prompt.toLowerCase();

    for (const [skillName, config] of Object.entries(SKILL_CONFIG)) {
        for (const keyword of config.keywords) {
            const lowerKeyword = keyword.toLowerCase();
            if (lowerPrompt.includes(lowerKeyword)) {
                matchedSkills.push({
                    name: skillName,
                    description: config.description,
                    matchedKeyword: keyword
                });
                break; // 每个 skill 只匹配一次
            }
        }
    }

    return matchedSkills;
}

/**
 * UserPromptSubmit Hook - 在用户消息提交前触发
 */
async function UserPromptSubmit(context) {
    const { prompt } = context;

    // 分析 prompt 匹配 skills
    const matchedSkills = matchSkills(prompt);

    if (matchedSkills.length > 0) {
        // 构建激活提醒
        const skillNames = matchedSkills.map(s => s.name).join(', ');
        const skillDetails = matchedSkills.map(s =>
            `  - **${s.name}**: ${s.description} (匹配："${s.matchedKeyword}")`
        ).join('\n');

        // 注入激活提醒到 prompt 开头
        context.prompt = `🎯 SKILL ACTIVATION CHECK

检测到以下 skills 可能适用：

${skillDetails}

**强制规则**：如果有 1% 的可能性某个 skill 适用，必须调用它。

---

${prompt}`;
    }

    return context;
}

// 导出
module.exports = {
    UserPromptSubmit,
    matchSkills,
    SKILL_CONFIG
};
