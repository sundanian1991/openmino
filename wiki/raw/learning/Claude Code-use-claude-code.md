上周，我的朋友老张找我诉苦。他用Claude Code2 个月了，但觉得自己只发挥了它10%的能力。每次就是简单聊代码，让它写函数、修bug。

"我知道Claude Code很强大，但那些高级功能太多了，不知道从哪下手。"

这不是老张一个人的问题。在和几十个Claude Code用户交流后,我发现:90%的人只用过基础对话功能,其他七大组件基本闲置。

但如果你把这些组件组合起来用,效果是什么?同样是修复一个bug,基础对话可能需要5轮交互,而用上CLAUDE.md、Hooks、SubAgents、Skills,1轮就搞定,而且质量更高。

这篇文章,我不用枯燥的功能罗列。通过7个真实场景,带你看看每个组件在实战中怎么用,以及它们之间如何配合产生1+1>2的效果。

读完之后，你会有一个清晰的认识：哪些组件适合你的工作流，以及如何立即上手。

一、先搞清楚：Claude Code是什么

claude 七大件
Claude Code是Anthropic推出的agentic coding工具，安装在终端里运行。

和Cursor、Windsurf这类IDE集成工具不同，Claude Code走的是CLI-first路线。这意味着它更轻量、更灵活、更适合脚本化和自动化。

Claude Code官方文档的定位很清晰：
https://code.claude.com/docs/en/overview

根据官方描述，Claude Code可以直接编辑文件、运行命令、创建提交，通过MCP连接外部数据源如Google Drive、Figma、Slack。

这七大组件是:

1. CLAUDE.md:项目上下文文件,自动加载到对话
2. Commands:斜杠命令,快速触发预定义任务
3. Hooks:在特定事件触发时自动执行shell命令
4. SubAgents:专门的AI子代理,处理特定任务
5. Skills:用户自定义的可复用技能包
6. Plugins:打包好的功能组合,一键安装即用
7. MCP Servers:外部工具和数据源连接器
接下来，我们通过实战场景，一个一个来。

二、用CLAUDE.md打造项目记忆
痛点：每次都要重复交代项目背景
你是不是经历过这样的对话：

你：帮我在用户服务里加个接口
Claude：好的，请问用什么框架？
你：NestJS
Claude：测试怎么跑？
你：npm run test
Claude：代码风格有什么要求？
你：用ESLint...
每次开新会话，都要重复这些背景信息，很浪费时间。

解决方案：CLAUDE.md
CLAUDE.md是一个特殊的Markdown文件，Claude Code会在每次会话开始时自动读取它。

你可以把它放在项目根目录（推荐），这样整个团队都能共享。也可以放在~/.claude/目录，让它应用到所有会话。

一个典型的CLAUDE.md长这样：

# 项目命令
- npm run dev: 启动开发服务器
- npm run test: 运行测试
- npm run lint: 检查代码风格

# 代码规范
- 使用TypeScript strict模式
- 优先使用ES模块语法(import/export)
- 组件用函数式，不用类组件

# 工作流
- 提交前必须跑测试和lint
- 优先写单元测试，覆盖率要求80%+
Anthropic的最佳实践指南详细说明了CLAUDE.md的用法：
https://www.anthropic.com/engineering/claude-code-best-practices

官方指南指出，CLAUDE.md是理想的文档场所，包括常见bash命令、核心文件、代码风格指南、测试说明、仓库礼仪等。

实战案例：新成员快速上手
我带过一个新项目，第一天就让Claude Code帮我生成CLAUDE.md。我让它分析package.json、README、现有代码结构，然后自动生成文档。

结果是什么？第二天新同事加入，他问Claude的问题都能得到准确回答，因为所有上下文都在CLAUDE.md里。

进阶技巧：按需优化
CLAUDE.md不是写一次就完事了。你需要像优化prompt一样持续迭代。

Anthropic的工程师建议：
https://www.anthropic.com/engineering/claude-code-best-practices

根据官方经验，偶尔把CLAUDE.md通过prompt improver处理，或者调整指令（如添加"IMPORTANT"或"YOU MUST"）能提高遵循度。

三、用Hooks自动执行日常任务
痛点：重复性手工操作太多
每次代码修改后，你都要手动运行测试、检查lint、格式化代码。这些操作很机械，但又必须做。

解决方案：Hooks
Hooks让你在Claude Code的特定事件发生时，自动执行shell命令。

比如，每次文件修改后自动运行lint：

{
  "userPromptSubmit": {
    "command": "npm run lint -- --fix",
    "description": "Auto-fix lint issues"
  }
}
可用的事件类型包括：

• tool_use：工具调用后
• user_prompt_submit：用户提交prompt后
• session_start：会话开始时
• 每个工具调用：如Bash、Edit等
官方文档详细说明了Hooks的配置：
https://code.claude.com/docs/en/hooks-guide

根据文档，Hooks提供确定性控制，让用户定义在Claude Code生命周期的各个点执行的shell命令。

实战案例：自动修复代码风格
我有个项目，代码风格检查特别严格。每次改完代码，都要跑eslint --fix，很烦。

后来我配了个Hook：

{
  "Edit": {
    "command": "npm run lint -- --fix $FILE",
    "description": "Auto-fix lint issues for edited file"
  }
}
现在每次Claude编辑文件后，自动修复格式问题。省心多了。

进阶技巧：用Hooks做质量控制
你还可以配置多个Hooks，形成一个质量控制链：

{
  "Edit":[
    {
      "command":"npm run lint -- --fix $FILE",
      "description":"Fix lint issues"
    },
    {
      "command":"npm run test -- --related $FILE",
      "description":"Run related tests"
    }
]
}
这样每次代码变更，自动修格式 + 跑测试。

四、用SubAgents分解复杂任务
痛点：单个Agent处理复杂任务容易出问题
当你让Claude处理一个复杂任务时，比如重构整个认证系统，它可能会：

• 遗漏边界情况
• 在不同部分之间不一致
• 中途跑偏
为什么会这样？因为上下文太长，单一Agent难以保持专注。

解决方案：SubAgents
SubAgents是专门的AI子代理，每个负责一个子任务。它们有独立的上下文，可以并行工作，最后合并结果。

官方SubAgents文档：
https://code.claude.com/docs/en/sub-agents

根据官方说明，SubAgents创建专门的AI子代理用于任务特定工作流和改进的上下文管理。

实战案例：重构认证系统
假设要重构一个认证系统，我可以这样分解：

主Agent：规划整体架构
├── SubAgent 1：重构登录逻辑
├── SubAgent 2：重构Token管理
├── SubAgent 3：重构权限验证
└── SubAgent 4：更新单元测试
每个SubAgent独立工作，专注自己的部分。完成后，主Agent负责整合和验证。

Shrivu Shankar在他的文章中分享了SubAgents的使用经验：
https://blog.sshh.io/p/how-i-use-every-claude-code-feature

他指出，理论上，自定义SubAgents是Claude Code最强大的上下文管理功能，复杂任务需要X个token，拆成多个SubAgent后可以大幅减少token使用。

进阶技巧：并行SubAgents
对于独立任务，可以让SubAgents并行运行。

比如，我要给多个模块加日志：

主Agent：生成任务列表
├── SubAgent 1：给模块A加日志（并行）
├── SubAgent 2：给模块B加日志（并行）
├── SubAgent 3：给模块C加日志（并行）
└── 主Agent：汇总结果
这样比串行处理快得多。

五、用Commands快速调用常规任务
痛点:重复输入相同的指令很麻烦
比如代码审查,你每次都要说"请检查代码质量、安全性、性能..."。重复且容易遗漏。

解决方案:Commands(斜杠命令)
Commands是可自定义的斜杠命令,让你用简短的命令快速触发复杂的prompt。

官方最佳实践文档说明了Commands的用法:
https://www.anthropic.com/engineering/claude-code-best-practices

根据文档,将重复工作流存储为.claude/commands文件夹中的Markdown文件,这些文件会通过斜杠命令菜单提供,可以签入git供团队共享。

实战案例:自动代码审查命令
我在.claude/commands/目录下创建了一个review.md文件:

请对当前分支的改动进行代码审查,重点检查:

1. 代码质量和可维护性
2. 潜在的安全漏洞
3. 性能问题
4. 测试覆盖率
5. 文档完整性

请使用GitHub CLI查看PR详情,并提供改进建议。
现在我只需要输入:

/review
Claude就会自动执行完整的审查流程。

进阶技巧:使用$ARGUMENTS传参
Commands支持$ARGUMENTS关键字来传递参数。

比如创建.claude/commands/fix-issue.md:

请分析并修复GitHub issue: $ARGUMENTS

步骤:
1. 使用`gh issue view`获取issue详情
2. 搜索代码库找到相关文件
3. 实现必要的修改
4. 编写并运行测试验证修复
5. 创建提交并推送PR
使用时:

/fix-issue 123
Claude会自动处理issue #123的修复流程。

六、用Skills复用你的工作流
痛点：有些复杂操作，每次都要一步步教Claude
比如，我经常要做"添加新API端点"这个操作，包括：

1. 创建路由文件
2. 添加控制器
3. 添加验证
4. 添加单元测试
5. 更新API文档
每次都要跟Claude解释一遍，很累。

解决方案：Skills
Skills是你自定义的可复用技能包。把一个完整工作流封装起来，下次直接调用。

创建Skill很简单，把你的prompt放到.claude/skills目录，它会自动变成可调用技能。

实战案例:一键添加API端点
我在.claude/skills/add-api-endpoint/目录下创建了一个SKILL.md文件:

---
name: add-api-endpoint
description: 添加新的API端点,包括路由、控制器、验证、测试和文档更新
---

# Add API Endpoint

添加一个新的API端点,包括以下步骤:

1. 创建路由文件(如果不存在)
2. 添加控制器方法
3. 添加请求验证(DTO)
4. 添加单元测试
5. 更新API文档(README.md)

## 实现指南

当用户请求添加API端点时:
- 询问端点名称、HTTP方法、路由路径和功能描述
- 按照项目现有代码结构创建文件
- 确保遵循项目代码规范
- 运行测试验证功能正常
Anthropic官方Skills文档说明了正确格式:
https://code.claude.com/docs/en/skills

根据文档,SKILL.md文件必须以YAML frontmatter开始,包含name和description两个必需字段,后面跟着Markdown格式的指令。

以后我只要说:

请帮我添加一个GET /api/users端点,用于获取用户列表
Claude会识别到这个请求匹配add-api-endpoint技能,自动加载并按照定义的流程完成所有步骤。

进阶技巧：Skills链式调用
Skills之间可以互相调用，形成复杂工作流。

比如，我的deploy Skill会调用其他Skills：

deploy
├── run-tests
├── build
├── bump-version
└── create-release
一个命令，完成从测试到发布的全流程。

七、用MCP连接外部世界
痛点：Claude Code只能访问本地文件和命令
有时候你需要Claude访问外部资源，比如：

• 从Jira读取需求文档
• 从Figma获取设计稿
• 从Google Docs读取规范
• 从Slack读取讨论历史
解决方案：MCP Servers
MCP（Model Context Protocol）是Anthropic推出的开放标准，让AI工具能连接外部数据源。

MCP的官方介绍：
https://www.anthropic.com/news/model-context-protocol

根据官方公告，MCP是一个开放标准，使开发人员能够在AI驱动的工具和数据源之间构建安全的双向连接。

实战案例：从Figma读取设计稿
我安装了Figma MCP Server后，可以让Claude直接读取设计稿并实现UI：

请读取这个Figma文件的设计稿，然后用React实现它：
https://www.figma.com/file/xxx
Claude会：

1. 通过MCP连接Figma
2. 读取设计稿的图层、样式、布局
3. 生成对应的React代码
4. 保持设计规范一致
进阶技巧：组合多个MCP Servers
你可以同时连接多个MCP Servers，让Claude访问多个数据源。

比如，一个典型的全栈开发流程：

Google Drive（需求文档）
├── Figma（设计稿）
├── GitHub（代码仓库）
└── Slack（团队讨论）
Claude可以从所有这些来源获取信息，给出更全面的建议。

社区有很多现成的MCP Servers可以参考：
https://github.com/modelcontextprotocol

八、用Plugins打包复用完整工作流
痛点:每个项目都要重新配置Commands、Skills、Hooks
你花了很多时间配置好一套开发工作流:

• 自定义了10个Commands
• 写了5个Skills
• 配了3个Hooks
• 装了2个MCP服务器
结果新项目又要重新来一遍。复制粘贴配置文件,还容易漏掉东西。

解决方案:Plugins
Plugins是打包好的功能组合,可以包含Commands、SubAgents、Skills、Hooks、MCP配置等任何组件。

Anthropic官方博客介绍了Plugins的价值:
https://www.anthropic.com/news/claude-code-plugins

根据官方说明,Plugins是轻量级的打包方式,可以组合任意数量的斜杠命令、子代理、MCP服务器和Hooks,通过单个命令安装。

实战案例:一键安装PR审查工作流
Anthropic官方提供了一个PR审查插件:

/plugin marketplace add anthropics/claude-code-plugins
/plugin install pr-review-toolkit
这个插件包含:

• 6个专业审查代理:comment-analyzer(注释分析)、pr-test-analyzer(测试分析)、silent-failure-hunter(静默失败检测)、type-design-analyzer(类型设计分析)、code-reviewer(代码审查)、code-simplifier(代码简化)
• 审查命令:/pr-review-toolkit:review-pr - 支持可选的审查维度(comments、tests、errors、types、code、simplify、all)
• 并行执行:多个代理同时工作,快速完成全面审查
安装后,一个命令就能启动完整的PR审查流程:

/pr-review-toolkit:review-pr all
Claude会自动:

1. 启动6个专业代理并行审查
2. 从不同角度分析代码(注释、测试、错误处理、类型设计、代码质量、简化机会)
3. 汇总所有发现,给出综合建议
官方Plugins文档详细说明了使用方法:
https://code.claude.com/docs/en/plugins

根据文档,每个plugin都有自己的目录,包含manifest和自定义commands、agents或hooks,Claude Code使用manifest中的元数据在plugin管理器中显示plugin。

进阶技巧:创建团队专属Marketplace
你可以为团队创建私有Plugin Marketplace,统一工作流标准。

创建一个Git仓库,添加.claude-plugin/marketplace.json:

{
  "name":"my-team-marketplace",
"description":"Our team's coding standards and workflows",
"plugins":[
    {
      "name":"team-coding-standards",
      "path":"plugins/coding-standards"
    },
    {
      "name":"team-pr-workflow",
      "path":"plugins/pr-workflow"
    }
]
}
团队成员安装:

/plugin marketplace add your-org/team-marketplace
/plugin install team-coding-standards
/plugin install team-pr-workflow
一次配置,全员共享。新成员加入,三个命令就能同步整个团队的工作流。

Plugin vs Skills vs Commands
很多人会混淆这三个概念,简单对比:

Commands: 单个斜杠命令,快速触发一段prompt

Skills: 可复用的工作流模板,Claude自动识别何时使用

Plugins: 打包好的组合,可以包含Commands、Skills、SubAgents、Hooks、MCP配置等任何组件

打个比方:

• Commands是一个快捷键
• Skills是一本操作手册
• Plugins是一整套工具箱(包含快捷键、操作手册、工具、自动化脚本)
社区有很多优秀的Plugin Marketplace可以参考:
https://claudecodemarketplace.com/

九、组件组合:1+1>2的效果
单个组件很好用，但组合起来才是真正的威力所在。

案例1：CLAUDE.md + Hooks
• CLAUDE.md提供项目上下文
• Hooks自动执行质量检查
新成员加入时，CLAUDE.md确保Claude理解项目规范，Hooks确保每次修改都符合规范。双重保障。

案例2：SubAgents + MCP
• SubAgents分解复杂任务
• MCP提供外部数据支持
比如，要做一个"分析竞品功能"的任务：

主Agent：规划分析框架
├── SubAgent 1：从GitHub读取竞品代码（通过GitHub MCP）
├── SubAgent 2：从文档网站读取竞品文档（通过Web Fetch MCP）
├── SubAgent 3：从社交媒体读取用户反馈（通过Social Media MCP）
└── 主Agent：汇总分析报告
案例3:Commands + Skills
• Commands提供快捷入口
• Skills提供自定义能力
比如,我的开发工作流是:

1. /feature-dev - Command触发功能开发流程
2. Claude自动加载相关Skills(如代码规范、测试要求)
3. /review - Command触发代码审查
4. /commit - Command生成提交信息并推送
Commands让我快速启动任务,Skills确保执行过程符合团队标准。

案例4:Plugins一键配置完整环境
• Plugins打包所有组件
• 一个命令完成团队标准化
比如,新项目启动流程:

# 安装团队标准插件
/plugin install team-coding-standards

# 这个Plugin自动配置了:
# - 10个常用Commands(代码审查、提交、部署等)
# - 5个团队Skills(代码规范、测试要求、文档标准等)  
# - 3个质量检查Hooks(代码格式化、测试运行、安全扫描)
# - 2个MCP服务器(连接Jira和Figma)
# - 项目级CLAUDE.md模板

# 一个命令,整个团队的工作流标准全部就绪
Plugins让团队协作标准化,新成员快速对齐工作方式。

十、实战建议:立即上手指南
立即可做的4件事
1. 创建你的第一个CLAUDE.md
cd your-project
/init
Claude会自动生成一个初始CLAUDE.md，你可以根据需要调整。
2. 配置一个简单的Hook
{
  "Edit": {
    "command": "npm run lint -- --fix $FILE",
    "description": "Auto-fix lint issues"
}
放在.claude/settings.json或~/.claude.json
3. 创建一个简单的Command
在.claude/commands/review.md中创建:
请审查当前分支的代码改动,重点检查:
- 代码质量
- 潜在bug
- 测试覆盖
然后使用/review命令快速触发代码审查
4. 安装一个官方Plugin
/plugin marketplace add anthropics/claude-code-plugins
/plugin install code-review
体验一下打包好的专业工具
避坑清单
1. 不要一次性启用太多功能
从CLAUDE.md开始，逐步添加其他组件。一下子全用会很混乱。
2. CLAUDE.md要持续优化
不是写一次就完事了。根据实际效果不断调整。
3. Hooks要谨慎选择
只对你100%信任的操作启用自动执行。数据修改类操作建议保持手动确认。
4. SubAgents不是万能的
简单任务用主Agent就够了。复杂任务才需要分解。
5. MCP Servers要注意安全
只安装可信来源的Servers。有些Servers需要你的API密钥,要确保安全。
6. Plugins要审查来源
优先使用官方和知名开发者的Plugins。安装前查看Plugin包含的内容,避免引入不必要的风险。
进阶方向
当你熟练掌握基础用法后，可以探索：

1. 自定义Skills开发
把你的常用工作流封装成Skills
2. MCP Server开发
为你的内部工具开发MCP Server
3. Plugin开发
为团队创建私有Plugin Marketplace,统一工作流标准
4. 多Claude协作
用git worktree同时运行多个Claude实例,并行处理不同任务
5. Headless模式自动化
把Claude集成到CI/CD流程中
参考清单
本文引用的信息来源如下：

1. Claude Code overview - Claude Code Docs
https://code.claude.com/docs/en/overview
2. Claude Code: Best practices for agentic coding - Anthropic Engineering
https://www.anthropic.com/engineering/claude-code-best-practices
3. Subagents - Claude Code Docs
https://code.claude.com/docs/en/sub-agents
4. Get started with Claude Code hooks - Claude Code Docs
https://code.claude.com/docs/en/hooks-guide
5. Introducing the Model Context Protocol - Anthropic News
https://www.anthropic.com/news/model-context-protocol
6. How I Use Every Claude Code Feature - Shrivu Shankar
https://blog.sshh.io/p/how-i-use-every-claude-code-feature
7. 20+ Real Use Cases That Prove Claude Code Is a Game Changer - Medium
https://medium.com/@agencyai/20-real-use-cases-that-prove-claude-code-is-a-game-changer-46ceefaf19ed
8. Claude Code vs Cursor: Complete comparison guide in 2025 - Northflank
https://northflank.com/blog/claude-code-vs-cursor-comparison
9. A Guide to Claude Code 2.0 and getting better at using coding agents - Bear Blog
https://sankalp.bearblog.dev/my-experience-with-claude-code-20-and-how-to-get-better-at-using-coding-agents/
10. The Ultimate Claude Code Tips Collection (Advent of Claude 2025) - Dev.to
https://dev.to/damogallagher/the-ultimate-claude-code-tips-collection-advent-of-claude-2025-5b73
11. Customize Claude Code with plugins - Anthropic News
https://www.anthropic.com/news/claude-code-plugins
12. Create plugins - Claude Code Docs
https://code.claude.com/docs/en/plugins