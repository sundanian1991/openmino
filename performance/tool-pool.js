// tool-pool.js
// 工具调用池 - 管理并发工具调用，减少延迟

class ToolPool {
  constructor(maxConcurrent = 3) {
    this.maxConcurrent = maxConcurrent;
    this.runningTasks = 0;
    this.taskQueue = [];
    this.taskResolvers = new Map();
  }

  /**
   * 异步执行工具调用
   */
  async executeTool(toolName, params, taskId = null) {
    if (!taskId) {
      taskId = this.generateTaskId();
    }

    return new Promise((resolve, reject) => {
      const task = {
        id: taskId,
        toolName,
        params,
        resolve,
        reject,
        createdAt: Date.now()
      };

      this.taskResolvers.set(taskId, { resolve, reject });

      if (this.runningTasks < this.maxConcurrent) {
        this.executeNextTask();
      } else {
        this.taskQueue.push(task);
      }
    });
  }

  /**
   * 异步并行执行多个工具调用
   */
  async executeParallelTools(toolCalls) {
    console.log(`🔗 并行执行 ${toolCalls.length} 个工具调用`);

    const promises = toolCalls.map(({ toolName, params }) =>
      this.executeTool(toolName, params)
    );

    const results = await Promise.all(promises);

    console.log(`✅ 并行执行完成`);
    return results;
  }

  /**
   * 执行下一个任务
   */
  async executeNextTask() {
    if (this.runningTasks >= this.maxConcurrent || this.taskQueue.length === 0) {
      return;
    }

    const task = this.taskQueue.shift();
    this.runningTasks++;

    console.log(`🔧 执行工具: ${task.toolName} (ID: ${task.id})`);

    try {
      // 模拟工具调用（在实际应用中会调用真实工具）
      const result = await this.callActualTool(task.toolName, task.params);

      // 标记完成
      this.markTaskComplete(task.id, result);
    } catch (error) {
      console.error(`❌ 工具执行失败: ${task.toolName}`, error.message);
      this.markTaskFailed(task.id, error);
    } finally {
      this.runningTasks--;

      // 尝试执行队列中的下一个任务
      setImmediate(() => this.executeNextTask());
    }
  }

  /**
   * 调用实际工具
   */
  async callActualTool(toolName, params) {
    // 这里模拟不同的工具调用
    switch (toolName) {
      case 'Read':
        return this.simulateReadTool(params);
      case 'Edit':
        return this.simulateEditTool(params);
      case 'Grep':
        return this.simulateGrepTool(params);
      case 'Bash':
        return this.simulateBashTool(params);
      default:
        return this.simulateGenericTool(toolName, params);
    }
  }

  /**
   * 模拟读取工具
   */
  simulateReadTool(params) {
    return new Promise(resolve => {
      setTimeout(() => {
        // 模拟读取文件内容
        resolve({
          success: true,
          content: `Content of ${params.filePath}`,
          bytesRead: 1024
        });
      }, Math.random() * 500); // 随机延迟0-500ms
    });
  }

  /**
   * 模拟编辑工具
   */
  simulateEditTool(params) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          changesApplied: 1,
          affectedLines: [params.lineNumber || 1]
        });
      }, Math.random() * 300); // 随机延迟0-300ms
    });
  }

  /**
   * 模拟搜索工具
   */
  simulateGrepTool(params) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          matches: [{ line: 1, content: 'Sample match' }],
          fileCount: 1
        });
      }, Math.random() * 400); // 随机延迟0-400ms
    });
  }

  /**
   * 模拟Bash工具
   */
  simulateBashTool(params) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          stdout: 'Command output',
          stderr: '',
          exitCode: 0
        });
      }, Math.random() * 600); // 随机延迟0-600ms
    });
  }

  /**
   * 模拟通用工具
   */
  simulateGenericTool(toolName, params) {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          success: true,
          result: `Result from ${toolName}`,
          params
        });
      }, Math.random() * 400); // 随机延迟0-400ms
    });
  }

  /**
   * 标记任务完成
   */
  markTaskComplete(taskId, result) {
    const resolver = this.taskResolvers.get(taskId);
    if (resolver) {
      resolver.resolve(result);
      this.taskResolvers.delete(taskId);
    }
  }

  /**
   * 标记任务失败
   */
  markTaskFailed(taskId, error) {
    const resolver = this.taskResolvers.get(taskId);
    if (resolver) {
      resolver.reject(error);
      this.taskResolvers.delete(taskId);
    }
  }

  /**
   * 生成任务ID
   */
  generateTaskId() {
    return `task_${Date.now()}_${Math.floor(Math.random() * 10000)}`;
  }

  /**
   * 获取当前状态
   */
  getStatus() {
    return {
      runningTasks: this.runningTasks,
      queuedTasks: this.taskQueue.length,
      maxConcurrent: this.maxConcurrent,
      utilization: (this.runningTasks / this.maxConcurrent) * 100
    };
  }

  /**
   * 执行工具调用的便捷方法
   */
  static async runTool(toolName, params) {
    const pool = new ToolPool();
    return await pool.executeTool(toolName, params);
  }
}

module.exports = ToolPool;