// file-cache.js
// 文件系统缓存管理器 - 内存缓存 + 批量操作

class FileCache {
  constructor(maxCacheSize = 50 * 1024 * 1024) { // 50MB 默认缓存大小
    this.cache = new Map(); // 文件路径 -> {content, timestamp, size}
    this.maxCacheSize = maxCacheSize;
    this.currentCacheSize = 0;
  }

  /**
   * 获取文件内容（优先从缓存获取）
   */
  async getFileContent(filePath, options = {}) {
    // 检查缓存
    if (this.cache.has(filePath)) {
      const cached = this.cache.get(filePath);

      // 检查缓存是否过期
      const cacheAge = Date.now() - cached.timestamp;
      if (cacheAge < (options.maxAge || 300000)) { // 默认5分钟过期
        console.log(`🎯 从缓存获取: ${filePath}`);
        return cached.content;
      } else {
        // 缓存过期，删除旧缓存
        this.removeFromCache(filePath);
      }
    }

    // 从文件系统读取
    const fs = require('fs');
    const content = fs.readFileSync(filePath, 'utf8');

    // 添加到缓存
    this.addToCache(filePath, content);

    return content;
  }

  /**
   * 批量读取文件
   */
  async batchReadFile(filePaths, options = {}) {
    console.log(`🔄 批量读取 ${filePaths.length} 个文件`);

    const results = [];
    for (const path of filePaths) {
      try {
        const content = await this.getFileContent(path, options);
        results.push({ path, content, success: true });
      } catch (error) {
        results.push({ path, error: error.message, success: false });
      }
    }

    return results;
  }

  /**
   * 批量编辑文件
   */
  async batchEditFiles(editOperations) {
    console.log(`✏️ 批量编辑 ${editOperations.length} 个文件`);

    const results = [];
    for (const operation of editOperations) {
      try {
        // 读取当前内容
        const currentContent = await this.getFileContent(operation.filePath);

        // 执行替换操作
        const newContent = this.performReplacement(
          currentContent,
          operation.oldString,
          operation.newString,
          operation.replaceAll
        );

        // 写入文件
        const fs = require('fs');
        fs.writeFileSync(operation.filePath, newContent, 'utf8');

        // 更新缓存
        this.addToCache(operation.filePath, newContent);

        results.push({
          filePath: operation.filePath,
          success: true,
          changes: operation.oldString.length
        });
      } catch (error) {
        results.push({
          filePath: operation.filePath,
          success: false,
          error: error.message
        });
      }
    }

    return results;
  }

  /**
   * 执行字符串替换
   */
  performReplacement(content, oldString, newString, replaceAll = false) {
    if (replaceAll) {
      return content.split(oldString).join(newString);
    } else {
      // 只替换第一个匹配项
      const index = content.indexOf(oldString);
      if (index !== -1) {
        return content.substring(0, index) + newString +
               content.substring(index + oldString.length);
      }
      return content;
    }
  }

  /**
   * 添加到缓存
   */
  addToCache(filePath, content) {
    const size = Buffer.byteLength(content, 'utf8');

    // 如果缓存过大，执行LRU清理
    while ((this.currentCacheSize + size) > this.maxCacheSize && this.cache.size > 0) {
      // 删除最久未使用的项目
      const oldestKey = this.getOldestKey();
      if (oldestKey) {
        this.removeFromCache(oldestKey);
      } else {
        break;
      }
    }

    // 添加新项目
    this.cache.set(filePath, {
      content,
      timestamp: Date.now(),
      size
    });
    this.currentCacheSize += size;
  }

  /**
   * 从缓存移除
   */
  removeFromCache(filePath) {
    if (this.cache.has(filePath)) {
      const item = this.cache.get(filePath);
      this.currentCacheSize -= item.size;
      this.cache.delete(filePath);
    }
  }

  /**
   * 获取最久未使用的键
   */
  getOldestKey() {
    let oldestKey = null;
    let oldestTime = Infinity;

    for (const [key, value] of this.cache.entries()) {
      if (value.timestamp < oldestTime) {
        oldestTime = value.timestamp;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  /**
   * 智能预加载文件
   */
  async predictiveLoad(frequentlyUsedFiles) {
    console.log(`🚀 预加载 ${frequentlyUsedFiles.length} 个常用文件`);

    // 并行预加载
    const loadPromises = frequentlyUsedFiles.map(filePath =>
      this.getFileContent(filePath, { maxAge: 600000 }) // 10分钟过期
    );

    await Promise.all(loadPromises);
    console.log(`✅ 预加载完成`);
  }

  /**
   * 获取缓存统计
   */
  getStats() {
    return {
      cacheSize: this.currentCacheSize,
      maxCacheSize: this.maxCacheSize,
      entryCount: this.cache.size,
      usagePercentage: (this.currentCacheSize / this.maxCacheSize) * 100
    };
  }

  /**
   * 清理过期缓存
   */
  cleanupExpired(maxAge = 600000) { // 10分钟
    const now = Date.now();
    const expiredKeys = [];

    for (const [key, value] of this.cache.entries()) {
      if (now - value.timestamp > maxAge) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => this.removeFromCache(key));
    console.log(`🧹 清理了 ${expiredKeys.length} 个过期缓存项目`);
  }
}

module.exports = FileCache;