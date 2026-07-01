#!/bin/bash
#
# 自动执行 UPDATE_MEMORY 机制
# 每周一早上9点通过 launchd 自动触发
#
# 功能：
# 1. 记录执行日志
# 2. 检查超期文件
# 3. 自动归档到 archive/
# 4. 自动更新索引
#

set -e  # 遇到错误立即退出

# 配置
WORK_DIR="$HOME/Documents/projects/ai-agents/my-agent"
LOG_FILE="$WORK_DIR/memory/logs/update-memory.log"
MEMORY_DIR="$WORK_DIR/memory"

# 创建日志目录
mkdir -p "$(dirname "$LOG_FILE")"

# 日志函数
log() {
    echo "[$(date '+%Y-%m-%d %H:%M:%S')] $*" | tee -a "$LOG_FILE"
}

log "=== 开始执行 UPDATE_MEMORY ==="

# 切换到工作目录
cd "$WORK_DIR" || {
    log "❌ 无法切换到工作目录: $WORK_DIR"
    exit 1
}

# Step 1: 检查超期文件
log "📋 步骤 1: 检查超期文件"
if [ -f "$MEMORY_DIR/active/tasks/scripts/lifecycle_manager.py" ]; then
    python3 "$MEMORY_DIR/active/tasks/scripts/lifecycle_manager.py" check 2>&1 | tee -a "$LOG_FILE" || {
        log "⚠️  生命周期检查发现超期文件"
    }
else
    log "⚠️  lifecycle_manager.py 不存在，跳过检查"
fi

# Step 2: 归档超期文件
log "📦 步骤 2: 归档超期文件"
# 这里需要实现具体的归档逻辑
# 目前先记录日志，后续完善
log "📝 归档功能待完善（需要手动执行 /UPDATE_MEMORY）"

# Step 3: 更新索引
log "📇 步骤 3: 更新索引"
if [ -f "$MEMORY_DIR/active/tasks/scripts/index_manager.py" ]; then
    python3 "$MEMORY_DIR/active/tasks/scripts/index_manager.py" --action update-all 2>&1 | tee -a "$LOG_FILE" || {
        log "⚠️  索引更新失败"
    }
else
    log "⚠️  index_manager.py 不存在，跳过索引更新"
fi

log "=== UPDATE_MEMORY 执行完成 ==="
log ""
