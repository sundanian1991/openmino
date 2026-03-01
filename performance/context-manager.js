// context-manager.js
// 上下文分层管理系统 - 热/温/冷数据分离

class ContextManager {
  constructor() {
    this.hotData = new Map(); // 热数据：当前会话频繁访问
    this.warmData = new Map(); // 温数据：近期访问，中等频率
    this.coldData = new Map(); // 冷数据：历史数据，低频访问
    this.contextSizeLimit = 2048; // 默认上下文限制
  }

  /**
   * 智能上下文加载 - 只加载必要的数据
   */
  async loadContext(filePaths, priority = 'hot') {
    const loadedFiles = [];

    for (const filePath of filePaths) {
      // 根据文件访问频率分类
      const accessFrequency = await this.getAccessFrequency(filePath);

      if (accessFrequency > 10) {
        // 高频访问 - 热数据
        const content = await this.loadHotFile(filePath);
        this.hotData.set(filePath, { content, lastAccess: Date.now() });
        loadedFiles.push({ path: filePath, priority: 'hot', content });
      } else if (accessFrequency > 3) {
        // 中频访问 - 温数据
        const content = await this.loadWarmFile(filePath);
        this.warmData.set(filePath, { content, lastAccess: Date.now() });
        loadedFiles.push({ path: filePath, priority: 'warm', content });
      } else {
        // 低频访问 - 冷数据（只在必要时加载）
        if (priority === 'cold') {
          const content = await this.loadColdFile(filePath);
          this.coldData.set(filePath, { content, lastAccess: Date.now() });
          loadedFiles.push({ path: filePath, priority: 'cold', content });
        }
      }
    }

    return loadedFiles;
  }

  /**
   * 获取文件访问频率统计
   */
  async getAccessFrequency(filePath) {
    // 模拟访问频率统计逻辑
    // 实际应用中会从访问日志中获取真实数据
    try {
      const accessLogPath = `${filePath}.access_log`;
      if (require('fs').existsSync(accessLogPath)) {
        const logContent = require('fs').readFileSync(accessLogPath, 'utf8');
        return (logContent.match(/ACCESS/g) || []).length;
      }
      return 1; // 默认访问频率
    } catch (e) {
      return 1; // 访问失败时返回默认值
    }
  }

  /**
   * 加载热数据文件
   */
  async loadHotFile(filePath) {
    // 热数据完整加载，不做截断
    const fs = require('fs');
    return fs.readFileSync(filePath, 'utf8');
  }

  /**
   * 加载温数据文件（部分加载）
   */
  async loadWarmFile(filePath) {
    const fs = require('fs');
    const content = fs.readFileSync(filePath, 'utf8');

    // 如果文件太大，只加载前半部分（节省上下文空间）
    if (content.length > 2000) {
      return content.substring(0, 2000) + '\n... [TRUNCATED - WARM DATA]';
    }
    return content;
  }

  /**
   * 加载冷数据文件（最小化加载）
   */
  async loadColdFile(filePath) {
    const fs = require('fs');
    const content = fs.readFileSync(filePath, 'utf8');

    // 冷数据只加载文件头和摘要信息
    const lines = content.split('\n');
    const headerLines = Math.min(20, lines.length);
    return lines.slice(0, headerLines).join('\n') + '\n... [TRUNCATED - COLD DATA]';
  }

  /**
   * 上下文清理 - 移除不活跃的数据
   */
  cleanupInactiveContext(maxAgeMs = 300000) { // 5分钟
    const now = Date.now();
    const expiredKeys = [];

    // 清理热数据中的过期项
    for (const [key, value] of this.hotData.entries()) {
      if (now - value.lastAccess > maxAgeMs) {
        expiredKeys.push(key);
      }
    }
    expiredKeys.forEach(key => this.hotData.delete(key));

    // 清理温数据中的过期项
    expiredKeys.length = 0;
    for (const [key, value] of this.warmData.entries()) {
      if (now - value.lastAccess > maxAgeMs * 2) { // 温数据存活时间更长
        expiredKeys.push(key);
      }
    }
    expiredKeys.forEach(key => this.warmData.delete(key));
  }

  /**
   * 获取当前上下文大小
   */
  getContextSize() {
    let totalSize = 0;

    for (const [_, value] of this.hotData) {
      totalSize += value.content.length;
    }
    for (const [_, value] of this.warmData) {
      totalSize += value.content.length;
    }
    for (const [_, value] of this.coldData) {
      totalSize += value.content.length;
    }

    return totalSize;
  }

  /**
   * 检查是否超过上下文限制
   */
  isOverLimit() {
    return this.getContextSize() > this.contextSizeLimit;
  }

  /**
   * 获取当前活跃上下文
   */
  getActiveContext() {
    const context = {
      hot: Array.from(this.hotData.entries()).map(([path, data]) => ({
        path,
        content: data.content,
        lastAccess: data.lastAccess
      })),
      warm: Array.from(this.warmData.entries()).map(([path, data]) => ({
        path,
        content: data.content,
        lastAccess: data.lastAccess
      })),
      cold: Array.from(this.coldData.entries()).map(([path, data]) => ({
        path,
        content: data.content,
        lastAccess: data.lastAccess
      }))
    };

    return context;
  }
}

module.exports = ContextManager;