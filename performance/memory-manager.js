// memory-manager.js
// 四层记忆管理系统 - 热/温/冷/归档数据分层

class MemoryManager {
  constructor() {
    this.hotLayer = new Map(); // 热数据：当前活跃记忆
    this.warmLayer = new Map(); // 温数据：近期记忆
    this.coldLayer = new Map(); // 冷数据：历史记忆
    this.archivedLayer = []; // 归档数据：长期存储

    this.hotExpiry = 300000; // 5分钟
    this.warmExpiry = 1800000; // 30分钟
    this.coldExpiry = 86400000; // 24小时

    this.hotMaxSize = 50; // 热数据最大50项
    this.warmMaxSize = 200; // 温数据最大200项
    this.coldMaxSize = 1000; // 冷数据最大1000项
  }

  /**
   * 存储记忆（自动分层）
   */
  storeMemory(key, data, priority = 'normal', expiryTime = null) {
    const memoryItem = {
      key,
      data,
      timestamp: Date.now(),
      priority,
      expiry: expiryTime || this.getDefaultExpiry(priority)
    };

    if (priority === 'hot' || this.isHotMemory(key)) {
      this.addToHotLayer(memoryItem);
    } else if (priority === 'warm' || this.isWarmMemory(key)) {
      this.addToWarmLayer(memoryItem);
    } else {
      this.addToColdLayer(memoryItem);
    }
  }

  /**
   * 获取记忆（自动分层查找）
   */
  getMemory(key) {
    // 优先在热数据中查找
    if (this.hotLayer.has(key)) {
      const item = this.hotLayer.get(key);
      if (this.isExpired(item)) {
        this.hotLayer.delete(key);
        return null;
      }
      // 延长生存时间（热点数据）
      item.timestamp = Date.now();
      return item.data;
    }

    // 然后在温数据中查找
    if (this.warmLayer.has(key)) {
      const item = this.warmLayer.get(key);
      if (this.isExpired(item)) {
        this.warmLayer.delete(key);
        return null;
      }
      // 降级到热数据（频繁访问的数据）
      this.moveToHot(key, item);
      return item.data;
    }

    // 最后在冷数据中查找
    if (this.coldLayer.has(key)) {
      const item = this.coldLayer.get(key);
      if (this.isExpired(item)) {
        this.coldLayer.delete(key);
        return null;
      }
      // 提升到温数据（冷数据被访问）
      this.moveToWarm(key, item);
      return item.data;
    }

    return null;
  }

  /**
   * 添加到热数据层
   */
  addToHotLayer(item) {
    // 检查是否超过容量
    if (this.hotLayer.size >= this.hotMaxSize) {
      this.evictFromHotLayer();
    }

    this.hotLayer.set(item.key, item);
  }

  /**
   * 添加到温数据层
   */
  addToWarmLayer(item) {
    // 检查是否超过容量
    if (this.warmLayer.size >= this.warmMaxSize) {
      this.evictFromWarmLayer();
    }

    this.warmLayer.set(item.key, item);
  }

  /**
   * 添加到冷数据层
   */
  addToColdLayer(item) {
    // 检查是否超过容量
    if (this.coldLayer.size >= this.coldMaxSize) {
      this.evictFromColdLayer();
    }

    this.coldLayer.set(item.key, item);
  }

  /**
   * 从热数据移动到温数据
   */
  moveToWarm(key, item) {
    this.hotLayer.delete(key);
    this.addToWarmLayer(item);
  }

  /**
   * 从温数据移动到热数据
   */
  moveToHot(key, item) {
    this.warmLayer.delete(key);
    this.addToHotLayer(item);
  }

  /**
   * 从温数据移动到冷数据
   */
  moveToCold(key, item) {
    this.warmLayer.delete(key);
    this.addToColdLayer(item);
  }

  /**
   * 淘汰热数据（LRU策略）
   */
  evictFromHotLayer() {
    // 找到最久未使用的项目
    let oldestKey = null;
    let oldestTime = Infinity;

    for (const [key, item] of this.hotLayer.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      const item = this.hotLayer.get(oldestKey);
      // 移动到温数据层而不是直接丢弃
      this.hotLayer.delete(oldestKey);
      this.addToWarmLayer(item);
    }
  }

  /**
   * 淘汰温数据
   */
  evictFromWarmLayer() {
    let oldestKey = null;
    let oldestTime = Infinity;

    for (const [key, item] of this.warmLayer.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      const item = this.warmLayer.get(oldestKey);
      // 移动到冷数据层
      this.warmLayer.delete(oldestKey);
      this.addToColdLayer(item);
    }
  }

  /**
   * 淘汰冷数据（归档）
   */
  evictFromColdLayer() {
    let oldestKey = null;
    let oldestTime = Infinity;

    for (const [key, item] of this.coldLayer.entries()) {
      if (item.timestamp < oldestTime) {
        oldestTime = item.timestamp;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      const item = this.coldLayer.get(oldestKey);
      // 移动到归档层
      this.coldLayer.delete(oldestKey);
      this.addToArchive(item);
    }
  }

  /**
   * 添加到归档
   */
  addToArchive(item) {
    this.archivedLayer.push(item);

    // 限制归档大小，定期清理过期归档
    this.cleanupArchive();
  }

  /**
   * 清理过期归档
   */
  cleanupArchive(retentionDays = 30) {
    const retentionTime = retentionDays * 24 * 60 * 60 * 1000; // 30天
    const cutoffTime = Date.now() - retentionTime;

    this.archivedLayer = this.archivedLayer.filter(item => item.timestamp > cutoffTime);
  }

  /**
   * 检查记忆是否过期
   */
  isExpired(item) {
    return Date.now() - item.timestamp > item.expiry;
  }

  /**
   * 获取默认过期时间
   */
  getDefaultExpiry(priority) {
    switch (priority) {
      case 'hot':
        return this.hotExpiry;
      case 'warm':
        return this.warmExpiry;
      case 'cold':
        return this.coldExpiry;
      default:
        return this.warmExpiry;
    }
  }

  /**
   * 判断是否为热记忆
   */
  isHotMemory(key) {
    return this.hotLayer.has(key);
  }

  /**
   * 判断是否为温记忆
   */
  isWarmMemory(key) {
    return this.warmLayer.has(key);
  }

  /**
   * 访问统计 - 增加热点检测
   */
  incrementAccessCount(key) {
    const item = this.hotLayer.get(key) || this.warmLayer.get(key) || this.coldLayer.get(key);
    if (item) {
      item.accessCount = (item.accessCount || 0) + 1;

      // 如果访问频率很高，提升到热数据
      if (item.accessCount > 5 && this.warmLayer.has(key)) {
        this.moveToHot(key, item);
      }
    }
  }

  /**
   * 智能预热 - 根据访问模式预加载
   */
  predictivePrefetch(keys) {
    // 分析访问模式，提前加载可能需要的数据
    keys.forEach(key => {
      const item = this.getMemory(key);
      if (item && !this.isHotMemory(key)) {
        // 如果该项被频繁访问，提升到热数据
        this.incrementAccessCount(key);
      }
    });
  }

  /**
   * 获取各层统计数据
   */
  getStats() {
    return {
      hot: {
        count: this.hotLayer.size,
        maxSize: this.hotMaxSize,
        utilization: (this.hotLayer.size / this.hotMaxSize) * 100
      },
      warm: {
        count: this.warmLayer.size,
        maxSize: this.warmMaxSize,
        utilization: (this.warmLayer.size / this.warmMaxSize) * 100
      },
      cold: {
        count: this.coldLayer.size,
        maxSize: this.coldMaxSize,
        utilization: (this.coldLayer.size / this.coldMaxSize) * 100
      },
      archived: {
        count: this.archivedLayer.length
      },
      total: this.hotLayer.size + this.warmLayer.size + this.coldLayer.size + this.archivedLayer.length
    };
  }

  /**
   * 清理过期记忆
   */
  cleanupExpired() {
    // 清理热数据
    for (const [key, item] of this.hotLayer.entries()) {
      if (this.isExpired(item)) {
        this.hotLayer.delete(key);
      }
    }

    // 清理温数据
    for (const [key, item] of this.warmLayer.entries()) {
      if (this.isExpired(item)) {
        this.warmLayer.delete(key);
      }
    }

    // 清理冷数据
    for (const [key, item] of this.coldLayer.entries()) {
      if (this.isExpired(item)) {
        this.coldLayer.delete(key);
      }
    }
  }

  /**
   * 记忆索引优化 - 为快速检索创建索引
   */
  createIndex(tags = []) {
    const index = {
      byTag: new Map(), // 按标签索引
      byTime: [], // 按时间排序
      byPriority: {
        hot: [],
        warm: [],
        cold: []
      }
    };

    // 构建标签索引
    for (const [key, item] of this.hotLayer.entries()) {
      this.updateIndexForItem(index, key, item, 'hot');
    }

    for (const [key, item] of this.warmLayer.entries()) {
      this.updateIndexForItem(index, key, item, 'warm');
    }

    for (const [key, item] of this.coldLayer.entries()) {
      this.updateIndexForItem(index, key, item, 'cold');
    }

    return index;
  }

  /**
   * 更新单项的索引
   */
  updateIndexForItem(index, key, item, layer) {
    // 按时间排序
    index.byTime.push({
      key,
      timestamp: item.timestamp,
      layer
    });

    // 按优先级分类
    index.byPriority[layer].push(key);

    // 如果有标签，则按标签索引
    if (item.tags) {
      for (const tag of item.tags) {
        if (!index.byTag.has(tag)) {
          index.byTag.set(tag, []);
        }
        index.byTag.get(tag).push(key);
      }
    }
  }

  /**
   * 根据标签搜索记忆
   */
  searchByTag(tag) {
    const index = this.createIndex();
    const taggedKeys = index.byTag.get(tag) || [];
    return taggedKeys.map(key => this.getMemory(key)).filter(Boolean);
  }
}

module.exports = MemoryManager;