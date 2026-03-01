#!/bin/bash
# Chrome 登录状态闪烁修复脚本
# 使用方法：完全关闭Chrome后执行此脚本

echo "🔧 Chrome 登录状态修复工具"
echo "================================"
echo ""

# 检查Chrome是否还在运行
chrome_running=$(ps aux | grep -i chrome | grep -v grep | wc -l | tr -d ' ')

if [ "$chrome_running" -gt 0 ]; then
    echo "⚠️ 检测到Chrome仍在运行（$chrome_running 个进程）"
    echo "请先完全关闭Chrome（包括菜单栏的图标），然后重新运行此脚本"
    echo ""
    echo "按回车键退出..."
    read
    exit 1
fi

echo "✅ Chrome已关闭，开始修复..."
echo ""

# 定义Chrome目录
CHROME_DIR="$HOME/Library/Application Support/Google/Chrome"
DEFAULT_DIR="$CHROME_DIR/Default"

# 创建备份目录
BACKUP_DIR="$HOME/Desktop/Chrome_Backup_$(date +%Y%m%d_%H%M%S)"
mkdir -p "$BACKUP_DIR"
echo "📁 备份目录: $BACKUP_DIR"

# 1. 备份关键文件
echo ""
echo "📦 备份关键文件..."
cp "$CHROME_DIR/Local State" "$BACKUP_DIR/" 2>/dev/null
cp "$DEFAULT_DIR/Preferences" "$BACKUP_DIR/" 2>/dev/null
echo "✅ 备份完成"

# 2. 清除同步缓存
echo ""
echo "🧹 清除同步缓存..."
if [ -d "$DEFAULT_DIR/Sync Data" ]; then
    rm -rf "$DEFAULT_DIR/Sync Data"
    echo "✅ 已清除 Sync Data"
fi

if [ -d "$DEFAULT_DIR/Sync Extension Settings" ]; then
    rm -rf "$DEFAULT_DIR/Sync Extension Settings"
    echo "✅ 已清除 Sync Extension Settings"
fi

# 3. 重置Token文件
echo ""
echo "🔄 重置认证文件..."
rm -f "$DEFAULT_DIR/Local Auth State" 2>/dev/null
echo "✅ 已清除 Local Auth State"

# 4. 清除可能的损坏数据库
echo ""
echo "💾 修复数据库..."
if [ -f "$DEFAULT_DIR/Web Data" ]; then
    # 使用SQLite进行完整性检查和修复
    sqlite3 "$DEFAULT_DIR/Web Data" "PRAGMA integrity_check;" >/dev/null 2>&1
    if [ $? -ne 0 ]; then
        mv "$DEFAULT_DIR/Web Data" "$BACKUP_DIR/Web Data.corrupted"
        echo "⚠️ Web Data已损坏，已移除备份（会重新生成）"
    else
        echo "✅ Web Data完整"
    fi
fi

# 5. 清除缓存（可选，会让首次启动稍慢但更干净）
echo ""
read -p "是否清除浏览器缓存？（推荐）[Y/n]: " clear_cache
if [[ ! "$clear_cache" =~ ^[Nn]$ ]]; then
    rm -rf "$DEFAULT_DIR/Cache" 2>/dev/null
    rm -rf "$DEFAULT_DIR/GPUCache" 2>/dev/null
    echo "✅ 缓存已清除"
fi

echo ""
echo "================================"
echo "✅ 修复完成！"
echo ""
echo "接下来："
echo "1. 重启Chrome"
echo "2. 如果仍显示登录状态闪烁，请："
echo "   - 点击右上角头像"
echo "   - 退出登录"
echo "   - 重新登录你的Google账号"
echo ""
echo "3. 如果问题仍然存在，可以尝试："
echo "   - 创建新的Chrome Profile（设置→添加新用户）"
echo ""
echo "按回车键打开Chrome..."
read

open -a "Google Chrome"

echo "Chrome已启动"
