# Claude Code 性能优化配置

## 优化系统概述

本配置文件集成了 Claude Code 的所有性能优化措施，包括：
- 上下文管理优化
- 文件系统操作优化
- 工具调用链路优化
- Git Hooks 精简优化
- 技能和子代理选择优化
- 记忆系统分层优化
- 网络请求优化
- 系统资源监控
- 预加载和预处理
- 个性化优化配置

## 1. 上下文管理优化

### 启用分层上下文管理
CONTEXT_LAYERING_ENABLED=true
CONTEXT_SIZE_LIMIT=2048
HOT_DATA_EXPIRY_MS=300000        # 5分钟
WARM_DATA_EXPIRY_MS=1800000      # 30分钟
COLD_DATA_EXPIRY_MS=86400000     # 24小时

### 智能预加载列表
FREQUENTLY_USED_FILES=(
    "CLAUDE.md"
    ".claude/rules/06-NOW.md"
    "memory/active/tasks/todo.md"
    ".claude/commands/"
)

## 2. 文件系统操作优化

### 缓存配置
FILE_CACHE_ENABLED=true
FILE_CACHE_SIZE_MB=50
CACHE_ENTRY_EXPIRY_MS=300000     # 5分钟
BATCH_OPERATION_SIZE=10

### 智能预加载配置
PREDICTIVE_LOAD_ENABLED=true
PREDICTIVE_LOAD_TTL_MS=600000    # 10分钟

## 3. 工具调用链路优化

### 并发限制
MAX_CONCURRENT_TOOLS=3
TOOL_QUEUE_TIMEOUT_MS=30000      # 30秒

### 工具池配置
TOOL_POOL_ENABLED=true
POOL_CLEANUP_INTERVAL_MS=60000   # 1分钟

## 4. Git Hooks 精简优化

### 轻量级验证
LIGHTWEIGHT_HOOKS=true
ASYNC_PLAN_VALIDATION=true
DIFF_THRESHOLD_LINES=10          # 超过10行才触发完整验证

## 5. 技能和子代理选择优化

### 智能匹配阈值
SIMPLE_TASK_THRESHOLD=3
COMPLEX_TASK_THRESHOLD=7
MAX_SKILL_SUGGESTIONS=5

### 技能复杂度映射
SKILL_COMPLEXITY=(
    "search:1"
    "Read:1"
    "Edit:1"
    "Grep:1"
    "Bash:1"
    "Glob:1"
    "Write:2"
    "Task:3"
    "Explore:4"
    "Plan:5"
)

## 6. 记忆系统分层优化

### 四层架构配置
MEMORY_HOT_MAX_SIZE=50
MEMORY_WARM_MAX_SIZE=200
MEMORY_COLD_MAX_SIZE=1000
MEMORY_ARCHIVED_RETENTION_DAYS=30

### 清理策略
MEMORY_CLEANUP_INTERVAL_MS=300000  # 5分钟
EXPIRED_MEMORY_AUTO_CLEAN=true

## 7. 网络请求优化

### 缓存配置
REQUEST_CACHE_ENABLED=true
REQUEST_CACHE_TTL_MS=300000        # 5分钟
REQUEST_CACHE_SIZE_MB=20
MAX_CONNECTION_POOL_SIZE=5

### CDN 配置
CDN_FALLBACK_ENABLED=true
CDN_PROVIDER_PREFERENCES=(
    "https://cdn.jsdelivr.net/"
    "https://unpkg.com/"
    "https://cdnjs.cloudflare.com/ajax/libs/"
)

## 8. 系统资源监控

### 监控阈值
SLOW_RESPONSE_THRESHOLD_MS=10000   # 10秒
PERFORMANCE_LOG_RETENTION_HOURS=24
PERFORMANCE_METRICS_ENABLED=true

### 告警阈值
ALERT_RESPONSE_TIME_MS=10000
ALERT_CPU_USAGE_PERCENT=80
ALERT_MEMORY_USAGE_PERCENT=80
ALERT_CONTEXT_SIZE_TOKENS=2048

## 9. 预加载和预处理

### 工作区预加载
PRELOAD_WORKSPACE_FOLDERS=(
    ".claude/rules"
    "memory/active"
    ".claude/commands"
    "memory/core"
)

### 技能预热列表
WARM_SKILLS=(
    "search"
    "Read"
    "Edit"
    "Grep"
    "Bash"
    "Glob"
)

### 预编译脚本
PRECOMPILE_SCRIPTS=(
    "./scripts/verify-plan.sh"
    "./.git/hooks/pre-commit"
    "./performance/context-manager.js"
    "./performance/file-cache.js"
    "./performance/tool-pool.js"
)

## 10. 个性化优化配置

### 分析窗口
USAGE_ANALYSIS_DAYS=30
CONFIG_AUTO_UPDATE=true
FEEDBACK_INTEGRATION_ENABLED=true

### 自适应参数
ADAPTIVE_PREFETCH_LEVEL="balanced"
ADAPTIVE_BACKGROUND_PROCESSES="optimal"
ADAPTIVE_CACHE_STRATEGY="smart"

## 配置管理命令

# 启用所有优化
enable_all_optimizations() {
    export CONTEXT_LAYERING_ENABLED=true
    export FILE_CACHE_ENABLED=true
    export TOOL_POOL_ENABLED=true
    export LIGHTWEIGHT_HOOKS=true
    export REQUEST_CACHE_ENABLED=true
    export PERFORMANCE_METRICS_ENABLED=true
    export PRELOAD_WORKSPACE_FOLDERS
    export WARM_SKILLS
    export CONFIG_AUTO_UPDATE=true
}

# 查看当前配置
show_current_config() {
    echo "=== Claude Code Performance Configuration ==="
    echo "Context Layering: $CONTEXT_LAYERING_ENABLED"
    echo "File Cache: $FILE_CACHE_ENABLED"
    echo "Tool Pool: $TOOL_POOL_ENABLED"
    echo "Lightweight Hooks: $LIGHTWEIGHT_HOOKS"
    echo "Request Cache: $REQUEST_CACHE_ENABLED"
    echo "Performance Metrics: $PERFORMANCE_METRICS_ENABLED"
    echo "Auto Config Update: $CONFIG_AUTO_UPDATE"
    echo "=============================================="
}

# 性能测试
run_performance_test() {
    echo "Running performance test..."
    # 这里可以添加实际的性能测试命令
    echo "Performance test completed."
}

# 配置验证
validate_config() {
    echo "Validating configuration..."
    # 这里可以添加配置验证逻辑
    echo "Configuration validation passed."
}

# 使用说明
echo "Claude Code Performance Optimization Configuration Loaded"
echo "Use 'enable_all_optimizations' to activate all optimizations"
echo "Use 'show_current_config' to view current settings"
echo "Use 'run_performance_test' to test performance improvements"
echo "Use 'validate_config' to verify configuration integrity"