// preloader.js
// 预加载和预处理系统 - 工作区预加载、技能预热、脚本预编译

class Preloader {
  constructor() {
    this.preloadedWorkspace = new Set();
    this.warmedSkills = new Set();
    this.precompiledScripts = new Map();
    this.loadingProgress = new Map();
  }

  /**
   * 工作区预加载
   */
  async preloadWorkspace(foldersToLoad = ['.claude/rules', 'memory/active', '.claude/commands']) {
    console.log('🚀 开始工作区预加载...');

    const loadPromises = foldersToLoad.map(async (folder) => {
      try {
        const fs = require('fs');
        const path = require('path');

        // 获取目录内容
        const fullPath = path.join(process.cwd(), folder);
        if (fs.existsSync(fullPath)) {
          const files = fs.readdirSync(fullPath);

          // 预加载目录中的关键文件
          const criticalFiles = files.filter(file =>
            file.endsWith('.md') || file.endsWith('.json') || file.endsWith('.js')
          ).slice(0, 10); // 限制预加载数量

          const fileContents = {};
          for (const file of criticalFiles) {
            const filePath = path.join(fullPath, file);
            if (fs.statSync(filePath).isFile()) {
              try {
                const content = fs.readFileSync(filePath, 'utf8');
                fileContents[file] = content.substring(0, 2000); // 限制大小
              } catch (error) {
                console.warn(`⚠️ 无法预加载文件: ${filePath}`, error.message);
              }
            }
          }

          this.preloadedWorkspace.add(folder);
          this.loadingProgress.set(folder, {
            loaded: Object.keys(fileContents).length,
            total: criticalFiles.length,
            files: Object.keys(fileContents)
          });

          console.log(`✅ 预加载目录: ${folder} (${Object.keys(fileContents).length} 个文件)`);
          return { folder, success: true, fileCount: Object.keys(fileContents).length };
        } else {
          console.warn(`⚠️ 目录不存在: ${folder}`);
          return { folder, success: false, error: 'Directory not found' };
        }
      } catch (error) {
        console.error(`❌ 预加载失败: ${folder}`, error.message);
        return { folder, success: false, error: error.message };
      }
    });

    const results = await Promise.all(loadPromises);
    console.log(`🎉 工作区预加载完成: ${results.filter(r => r.success).length}/${results.length} 个目录`);

    return results;
  }

  /**
   * 技能预热
   */
  async warmSkills(skillNames = ['search', 'Read', 'Edit', 'Grep', 'Bash', 'Glob']) {
    console.log('🔥 开始技能预热...');

    const warmPromises = skillNames.map(async (skill) => {
      try {
        // 模拟技能初始化
        await this.simulateSkillInitialization(skill);

        this.warmedSkills.add(skill);
        console.log(`✅ 技能预热完成: ${skill}`);
        return { skill, success: true };
      } catch (error) {
        console.error(`❌ 技能预热失败: ${skill}`, error.message);
        return { skill, success: false, error: error.message };
      }
    });

    const results = await Promise.all(warmPromises);
    console.log(`🎉 技能预热完成: ${results.filter(r => r.success).length}/${results.length} 个技能`);

    return results;
  }

  /**
   * 模拟技能初始化
   */
  async simulateSkillInitialization(skillName) {
    // 模拟技能初始化过程（如加载配置、连接服务等）
    return new Promise(resolve => {
      setTimeout(() => {
        // 不同技能有不同的初始化时间
        const initTime = {
          'search': 100,
          'Read': 50,
          'Edit': 60,
          'Grep': 120,
          'Bash': 80,
          'Glob': 70
        }[skillName] || 100;

        setTimeout(resolve, initTime);
      }, Math.random() * 50); // 随机延迟
    });
  }

  /**
   * 预编译脚本
   */
  async precompileScripts(scriptPaths = []) {
    console.log('⚙️ 开始脚本预编译...');

    // 默认预编译项目中的关键脚本
    if (scriptPaths.length === 0) {
      scriptPaths = [
        './scripts/verify-plan.sh',
        './.git/hooks/pre-commit',
        './performance/context-manager.js',
        './performance/file-cache.js',
        './performance/tool-pool.js'
      ];
    }

    const compilePromises = scriptPaths.map(async (scriptPath) => {
      try {
        const fs = require('fs');
        const path = require('path');

        const fullPath = path.join(process.cwd(), scriptPath);
        if (fs.existsSync(fullPath)) {
          const scriptContent = fs.readFileSync(fullPath, 'utf8');

          // 模拟预编译过程（在实际应用中这会是真正的编译过程）
          const compiled = await this.simulateScriptCompilation(scriptContent, scriptPath);

          this.precompiledScripts.set(scriptPath, {
            originalSize: scriptContent.length,
            compiled: compiled,
            timestamp: Date.now()
          });

          console.log(`✅ 脚本预编译完成: ${scriptPath}`);
          return { script: scriptPath, success: true, size: scriptContent.length };
        } else {
          console.warn(`⚠️ 脚本文件不存在: ${scriptPath}`);
          return { script: scriptPath, success: false, error: 'File not found' };
        }
      } catch (error) {
        console.error(`❌ 脚本预编译失败: ${scriptPath}`, error.message);
        return { script: scriptPath, success: false, error: error.message };
      }
    });

    const results = await Promise.all(compilePromises);
    console.log(`🎉 脚本预编译完成: ${results.filter(r => r.success).length}/${results.length} 个脚本`);

    return results;
  }

  /**
   * 模拟脚本编译
   */
  async simulateScriptCompilation(content, scriptPath) {
    return new Promise(resolve => {
      setTimeout(() => {
        // 简单的"编译"：移除注释和空行（模拟优化）
        let compiled = content;

        if (scriptPath.endsWith('.js')) {
          // 对于JS文件，移除注释
          compiled = content.replace(/\/\/.*$/gm, '') // 行注释
                           .replace(/\/\*[\s\S]*?\*\//g, ''); // 块注释
        } else if (scriptPath.endsWith('.sh')) {
          // 对于Shell脚本，简单处理
          compiled = content;
        }

        resolve(compiled.trim());
      }, Math.random() * 100); // 随机编译时间
    });
  }

  /**
   * 智能预加载 - 根据使用模式预测加载
   */
  async predictivePreload(userActivityPattern = {}) {
    console.log('🧠 开始智能预加载（基于使用模式）...');

    // 分析用户的使用模式来预测需要预加载的内容
    const prediction = this.analyzeUsagePattern(userActivityPattern);

    const tasks = [];

    // 预加载预测的目录
    if (prediction.folders && prediction.folders.length > 0) {
      tasks.push(this.preloadWorkspace(prediction.folders));
    }

    // 预热预测的技能
    if (prediction.skills && prediction.skills.length > 0) {
      tasks.push(this.warmSkills(prediction.skills));
    }

    // 预编译预测的脚本
    if (prediction.scripts && prediction.scripts.length > 0) {
      tasks.push(this.precompileScripts(prediction.scripts));
    }

    if (tasks.length > 0) {
      const results = await Promise.all(tasks);
      console.log('🎉 智能预加载完成');
      return results.flat();
    }

    return [];
  }

  /**
   * 分析使用模式
   */
  analyzeUsagePattern(activityPattern) {
    // 简单的模式分析（在实际应用中这会更复杂��
    const patterns = {
      timeBased: activityPattern.time || {},
      commandBased: activityPattern.commands || [],
      fileBased: activityPattern.files || []
    };

    // 预测基于时间的活动模式
    const hour = new Date().getHours();
    let predictedFolders = ['.claude/rules'];

    if (hour >= 9 && hour <= 17) {
      // 工作时间可能需要更多内存相关文件
      predictedFolders.push('memory/active', 'memory/transient');
    } else {
      // 非工作时间可能需要规则文件
      predictedFolders.push('memory/core');
    }

    // 预测基于历史命令的技能
    let predictedSkills = ['Read', 'Grep', 'Edit']; // 默认高频技能

    if (patterns.commandBased.includes('search') || patterns.commandBased.includes('find')) {
      predictedSkills.push('search', 'Glob');
    }

    if (patterns.commandBased.includes('modify') || patterns.commandBased.includes('change')) {
      predictedSkills.push('Edit', 'Write');
    }

    // 预测基于文件类型的脚本
    let predictedScripts = ['./scripts/verify-plan.sh'];

    if (patterns.fileBased.some(file => file.includes('hook'))) {
      predictedScripts.push('./.git/hooks/pre-commit');
    }

    return {
      folders: predictedFolders,
      skills: predictedSkills,
      scripts: predictedScripts
    };
  }

  /**
   * 获取预加载状态
   */
  getStatus() {
    return {
      workspace: {
        preloaded: Array.from(this.preloadedWorkspace),
        progress: Object.fromEntries(this.loadingProgress)
      },
      skills: {
        warmed: Array.from(this.warmedSkills)
      },
      scripts: {
        precompiled: Array.from(this.precompiledScripts.keys())
      },
      overall: {
        workspaceLoaded: this.preloadedWorkspace.size,
        skillsWarmed: this.warmedSkills.size,
        scriptsCompiled: this.precompiledScripts.size
      }
    };
  }

  /**
   * 完整预加载流程
   */
  async fullPreload(options = {}) {
    console.log('🌈 开始完整预加载流程...');

    const startTime = Date.now();

    // 1. 预加载工作区
    const workspaceResults = await this.preloadWorkspace(
      options.workspaceFolders || ['.claude/rules', 'memory/active', '.claude/commands']
    );

    // 2. 预热技能
    const skillResults = await this.warmSkills(
      options.skills || ['search', 'Read', 'Edit', 'Grep', 'Bash', 'Glob']
    );

    // 3. 预编译脚本
    const scriptResults = await this.precompileScripts(
      options.scripts || undefined
    );

    const totalTime = Date.now() - startTime;

    console.log(`⚡ 完整预加载完成，耗时: ${totalTime}ms`);

    return {
      workspace: workspaceResults,
      skills: skillResults,
      scripts: scriptResults,
      totalTime,
      successRate: {
        workspace: workspaceResults.filter(r => r.success).length / workspaceResults.length,
        skills: skillResults.filter(r => r.success).length / skillResults.length,
        scripts: scriptResults.filter(r => r.success).length / scriptResults.length
      }
    };
  }

  /**
   * 清理预加载缓存
   */
  clearCache() {
    this.preloadedWorkspace.clear();
    this.warmedSkills.clear();
    this.precompiledScripts.clear();
    this.loadingProgress.clear();

    console.log('🗑️ 预加载缓存已清理');
  }
}

module.exports = Preloader;