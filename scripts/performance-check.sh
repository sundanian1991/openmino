#!/bin/bash
# performance-check.sh - 快速性能检查脚本

echo "🚀 Claude Code 性能检查工具"
echo "==========================="

echo "📅 时间: $(date '+%Y-%m-%d %H:%M:%S')"

echo ""
echo "📦 系统信息:"
echo "   Node.js: $(node --version 2>/dev/null || echo '未安装')"
echo "   工作目录: $(pwd)"
echo "   内存使用: $(ps -o rss= -p $$ 2>/dev/null || echo 'N/A') KB"

echo ""
echo "📁 关键文件统计:"
echo "   CLAUDE.md: $(stat -f%z CLAUDE.md 2>/dev/null || stat -c%s CLAUDE.md 2>/dev/null || echo '0') 字节"
echo "   Rules目录: $(find .claude/rules -type f | wc -l) 个文件"
echo "   Memory目录: $(find memory -type f | wc -l) 个文件"

echo ""
echo "⚡ 性能测试:"
echo "   1. 简单读取操作: "
   time (cat CLAUDE.md >/dev/null 2>&1)

echo ""
echo "   2. 搜索操作: "
   time (grep -i "context" CLAUDE.md | head -5 >/dev/null 2>&1)

echo ""
echo "📈 优化模块状态:"
echo "   ✓ Context Manager: $(ls performance/context-manager.js >/dev/null && echo '已加载' || echo '缺失')"
echo "   ✓ File Cache: $(ls performance/file-cache.js >/dev/null && echo '已加载' || echo '缺失')"
echo "   ✓ Tool Pool: $(ls performance/tool-pool.js >/dev/null && echo '已加载' || echo '缺失')"
echo "   ✓ Skill Selector: $(ls performance/skill-selector.js >/dev/null && echo '已加载' || echo '缺失')"
echo "   ✓ Memory Manager: $(ls performance/memory-manager.js >/dev/null && echo '已加载' || echo '缺失')"
echo "   ✓ Performance Monitor: $(ls performance/performance-monitor.js >/dev/null && echo '已加载' || echo '缺失')"
echo "   ✓ Preloader: $(ls performance/preloader.js >/dev/null && echo '已加载' || echo '缺失')"
echo "   ✓ Personal Optimizer: $(ls performance/personal-optimizer.js >/dev/null && echo '已加载' || echo '缺失')"
echo "   ✓ Network Optimizer: $(ls performance/network-optimizer.js >/dev/null && echo '已加载' || echo '缺失')"

echo ""
echo "🔧 推荐操作:"
echo "   1. 检查性能监控: node -e \"const m = require('./performance/performance-monitor.js'); console.log(new m().getPerformanceSummary(1))\""
echo "   2. 运行完整性能测试: source performance/performance-config.sh && run_performance_test"
echo "   3. 查看当前配置: source performance/performance-config.sh && show_current_config"

echo ""
echo "💡 性能优化提示:"
echo "   • 使用缓存读取: const cache = require('./performance/file-cache.js'); const c = new cache(); c.getFileContent('file')"
echo "   • 性能监控: const monitor = require('./performance/performance-monitor.js'); const m = new monitor()"
echo "   • 智能技能选择: const selector = require('./performance/skill-selector.js'); const s = new selector()"

echo ""
echo "✅ 性能检查完成"