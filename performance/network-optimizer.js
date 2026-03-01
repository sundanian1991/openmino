// network-optimizer.js
// 网络请求优化器 - 缓存、连接池、CDN加速

class NetworkOptimizer {
  constructor() {
    this.requestCache = new Map(); // 请求缓存
    this.connectionPool = []; // 连接池
    this.poolSize = 5; // 最大连接数
    this.activeConnections = 0;

    this.defaultTTL = 300000; // 5分钟默认缓存时间
    this.cacheSizeLimit = 50 * 1024 * 1024; // 50MB缓存限制
    this.currentCacheSize = 0;
  }

  /**
   * 带缓存的HTTP请求
   */
  async cachedRequest(url, options = {}, ttl = null) {
    const cacheKey = this.generateCacheKey(url, options);
    const now = Date.now();
    ttl = ttl || this.defaultTTL;

    // 检查缓存
    if (this.requestCache.has(cacheKey)) {
      const cached = this.requestCache.get(cacheKey);

      if (now - cached.timestamp < ttl) {
        console.log(`🎯 从缓存获取: ${url}`);
        return cached.data;
      } else {
        // 缓存过期，删除旧缓存
        this.removeCacheEntry(cacheKey);
      }
    }

    // 执行实际请求
    const response = await this.makeRequest(url, options);

    // 存储到缓存
    this.setCache(cacheKey, response, ttl);

    return response;
  }

  /**
   * 执行HTTP请求（使用连接池）
   */
  async makeRequest(url, options = {}) {
    console.log(`📡 请求: ${url}`);

    // 获取可用连接
    const connection = await this.getConnection();

    try {
      // 这里模拟实际的HTTP请求
      // 在实际应用中，这里会使用fetch、axios或其他HTTP客户端
      const result = await this.simulateHttpRequest(url, options);
      return result;
    } finally {
      // 释放连接
      this.releaseConnection(connection);
    }
  }

  /**
   * 模拟HTTP请求（在实际应用中替换为真实请求）
   */
  async simulateHttpRequest(url, options) {
    return new Promise((resolve) => {
      setTimeout(() => {
        // 模拟不同类型的响应
        if (url.includes('tavily') || url.includes('search')) {
          resolve({
            success: true,
            data: {
              results: [
                { title: 'Sample Result', url, content: 'Sample content...' }
              ],
              query: url,
              response_time: 0.5
            }
          });
        } else {
          resolve({
            success: true,
            data: 'Response content',
            url,
            timestamp: Date.now()
          });
        }
      }, Math.random() * 300); // 随机延迟0-300ms
    });
  }

  /**
   * 获取连接（从连接池）
   */
  async getConnection() {
    if (this.activeConnections < this.poolSize) {
      this.activeConnections++;
      return { id: `conn_${this.activeConnections}`, acquiredAt: Date.now() };
    }

    // 如果池已满，等待可用连接
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        if (this.activeConnections < this.poolSize) {
          clearInterval(interval);
          this.activeConnections++;
          resolve({ id: `conn_${this.activeConnections}`, acquiredAt: Date.now() });
        }
      }, 10);
    });
  }

  /**
   * 释放连接（回到连接池）
   */
  releaseConnection(connection) {
    this.activeConnections--;
    // 连接会被自动回收，不需要显式放回池中
  }

  /**
   * 生成缓存键
   */
  generateCacheKey(url, options) {
    const sortedOptions = Object.keys(options).sort().map(key =>
      `${key}:${JSON.stringify(options[key])}`
    ).join('&');

    return `${url}?${sortedOptions}`;
  }

  /**
   * 设置缓存
   */
  setCache(key, data, ttl = null) {
    const dataSize = JSON.stringify(data).length;

    // 检查缓存大小限制
    while ((this.currentCacheSize + dataSize) > this.cacheSizeLimit && this.requestCache.size > 0) {
      // 删除最久未使用的缓存项
      const oldestKey = this.getOldestCacheKey();
      if (oldestKey) {
        this.removeCacheEntry(oldestKey);
      } else {
        break;
      }
    }

    // 添加新缓存项
    this.requestCache.set(key, {
      data,
      timestamp: Date.now(),
      size: dataSize,
      ttl: ttl || this.defaultTTL
    });
    this.currentCacheSize += dataSize;
  }

  /**
   * 删除缓存项
   */
  removeCacheEntry(key) {
    if (this.requestCache.has(key)) {
      const item = this.requestCache.get(key);
      this.currentCacheSize -= item.size;
      this.requestCache.delete(key);
    }
  }

  /**
   * 获取最久未使用的缓存键
   */
  getOldestCacheKey() {
    let oldestKey = null;
    let oldestTime = Infinity;

    for (const [key, value] of this.requestCache.entries()) {
      if (value.timestamp < oldestTime) {
        oldestTime = value.timestamp;
        oldestKey = key;
      }
    }

    return oldestKey;
  }

  /**
   * 批量请求优化
   */
  async batchRequest(requests) {
    console.log(`🔗 批量请求 ${requests.length} 个URL`);

    // 并行执行，但使用连接池限制并发数
    const results = [];
    const batchSize = this.poolSize; // 根据连接池大小分批

    for (let i = 0; i < requests.length; i += batchSize) {
      const batch = requests.slice(i, i + batchSize);
      const batchPromises = batch.map(req => this.cachedRequest(req.url, req.options, req.ttl));
      const batchResults = await Promise.all(batchPromises);
      results.push(...batchResults);
    }

    return results;
  }

  /**
   * CDN加速 - 静态资源优化
   */
  async getCdnResource(resourceUrl, cdnOptions = {}) {
    const cdnProviders = [
      'https://cdn.jsdelivr.net/',
      'https://unpkg.com/',
      'https://cdnjs.cloudflare.com/ajax/libs/'
    ];

    // 尝试主要源
    try {
      const result = await this.cachedRequest(resourceUrl, {}, 3600000); // 1小时CDN缓存
      return result;
    } catch (error) {
      // 如果主要源失败，尝试CDN
      console.log(`🔄 尝试CDN备选方案...`);

      for (const cdn of cdnProviders) {
        try {
          const cdnUrl = this.convertToCdnUrl(resourceUrl, cdn);
          const cdnResult = await this.cachedRequest(cdnUrl, {}, 3600000);
          return cdnResult;
        } catch (cdnError) {
          continue; // 尝试下一个CDN
        }
      }

      throw error; // 所有都失败，抛出原错误
    }
  }

  /**
   * 将URL转换为CDN URL
   */
  convertToCdnUrl(originalUrl, cdnBase) {
    // 简单的URL转换逻辑
    // 在实际应用中可能需要更复杂的映射
    const urlObj = new URL(originalUrl);
    const path = urlObj.pathname.replace(/^\//, '');

    if (originalUrl.includes('github.com')) {
      // GitHub资源转换为jsDelivr
      return `${cdnBase}gh/${path}`;
    } else if (originalUrl.includes('unpkg.com')) {
      return originalUrl.replace('unpkg.com', cdnBase.replace('https://', '').replace('/libs/', ''));
    }

    return cdnBase + path;
  }

  /**
   * 清理过期缓存
   */
  cleanupExpired() {
    const now = Date.now();
    const expiredKeys = [];

    for (const [key, value] of this.requestCache.entries()) {
      if (now - value.timestamp > value.ttl) {
        expiredKeys.push(key);
      }
    }

    expiredKeys.forEach(key => this.removeCacheEntry(key));
    console.log(`🧹 清理了 ${expiredKeys.length} 个过期缓存项`);
  }

  /**
   * 获取缓存统计
   */
  getStats() {
    return {
      cacheEntries: this.requestCache.size,
      cacheSize: this.currentCacheSize,
      cacheLimit: this.cacheSizeLimit,
      cacheUsagePercent: (this.currentCacheSize / this.cacheSizeLimit) * 100,
      activeConnections: this.activeConnections,
      poolSize: this.poolSize,
      poolUtilization: (this.activeConnections / this.poolSize) * 100
    };
  }

  /**
   * 智能预加载 - 根据历史模式预加载资源
   */
  async predictivePreload(urls, priority = 'normal') {
    console.log(`🚀 预加载 ${urls.length} 个资源 (优先级: ${priority})`);

    // 根据优先级决定预加载策略
    const preloadPromises = urls.map(async (url) => {
      try {
        // 使用较短的TTL进行预加载，避免占用过多缓存
        await this.cachedRequest(url, {}, priority === 'high' ? 600000 : 300000); // 高优先级缓存10分钟，普通5分钟
        return { url, success: true };
      } catch (error) {
        return { url, success: false, error: error.message };
      }
    });

    const results = await Promise.all(preloadPromises);
    const successful = results.filter(r => r.success).length;

    console.log(`✅ 预加载完成: ${successful}/${results.length} 成功`);
    return results;
  }
}

module.exports = NetworkOptimizer;