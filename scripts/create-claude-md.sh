#!/bin/bash

# create-claude-md.sh — 自动生成 CLAUDE.md 三行注释
#
# 用法：
#   ./scripts/create-claude-md.sh [目录路径]
#   ./scripts/create-claude-md.sh --check    # 检查缺失
#   ./scripts/create-claude-md.sh --all      # 为所有缺失目录创建
#

set -e

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(dirname "$SCRIPT_DIR")"

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

# 生成三行注释 - 使用简单模板
generate_header() {
    local dir_path="$1"
    local dir_name=$(basename "$dir_path")
    local relative_path="${dir_path#$PROJECT_ROOT/}"
    local dir_name_upper=$(echo "$dir_name" | tr '[:lower:]' '[:upper:]')

    # 特殊目录处理
    case "$dir_name" in
        daily)
            echo "---"
            echo "input: 对话记录、observer"
            echo "output: 每日事实记录（P1 活跃期）"
            echo "pos: active/daily/的成员，存放 30 天内日记"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Daily 每日日记"
            ;;
        my-thoughts)
            echo "---"
            echo "input: 对话触发、有感而发"
            echo "output: 个人思考记录（P1 活跃期）"
            echo "pos: active/my-thoughts/的成员，存放 30 天内思考"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — My Thoughts 我的思考"
            ;;
        plans)
            echo "---"
            echo "input: 复杂任务规划请求"
            echo "output: Plan 文档模板、项目规划"
            echo "pos: active/tasks/plans/的成员，规划文档存储"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Plans 规划文档"
            ;;
        system|reminders|scripts|templates|cognition|tracking)
            echo "---"
            echo "input: ${dir_name}相关需求"
            echo "output: ${dir_name}功能文档"
            echo "pos: active/tasks/${dir_name}/的成员"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — ${dir_name_upper}"
            ;;
        observations)
            echo "---"
            echo "input: daily 事实记录、observer 洞察"
            echo "output: 月度洞察报告（模式、复盘、认知）"
            echo "pos: archive/observations/的成员，月维度归档"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Observations 洞察"
            ;;
        weekly)
            echo "---"
            echo "input: 周度对话记录、UPDATE_MEMORY"
            echo "output: 周文档汇总（事实 + 洞察）"
            echo "pos: archive/weekly/的成员，周维度归档"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Weekly 周文档"
            ;;
        preferences)
            echo "---"
            echo "input: 03-USER.md，对话中浮现的偏好"
            echo "output: 用户偏好文档（审美、沟通、写作）"
            echo "pos: core/的成员，P0 永久核心"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Preferences 偏好"
            ;;
        identity)
            echo "---"
            echo "input: 04-MEMORY.md, 02-SOUL.md, 01-IDENTITY.md"
            echo "output: 身份认知文档"
            echo "pos: core/identity/的成员，P0 永久核心"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Identity 身份"
            ;;
        decisions)
            echo "---"
            echo "input: 对话中的决策、WAL 协议触发"
            echo "output: 决策记录、协议文档"
            echo "pos: core/decisions/的成员，P0 永久核心"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Decisions 决策"
            ;;
        staging)
            echo "---"
            echo "input: 新创建的临时文件"
            echo "output: 待分类文件"
            echo "pos: memory/staging/的成员，新文件默认落点"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Staging 中转区"
            ;;
        transient)
            echo "---"
            echo "input: 降级文件、临时记录"
            echo "output: 临时记忆（30 天）"
            echo "pos: memory/transient/的成员，P2 临时区"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Transient 临时区"
            ;;
        active)
            echo "---"
            echo "input: 新文件、当前会话记录"
            echo "output: 活跃中的记忆（30-90 天）"
            echo "pos: memory/active/的成员，P1 活跃区"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Active 活跃记忆"
            ;;
        archive)
            echo "---"
            echo "input: 超期的 daily/observations/weekly"
            echo "output: 历史归档"
            echo "pos: memory/archive/的成员"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Archive 归档"
            ;;
        core)
            echo "---"
            echo "input: 04-MEMORY.md, 03-USER.md, WAL 协议"
            echo "output: 永久核心记忆（偏好、决策、身份）"
            echo "pos: memory/core/的成员，P0 永久核心"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Core 永久核心"
            ;;
        memory)
            echo "---"
            echo "input: 对话记录、observer、UPDATE_MEMORY"
            echo "output: 记忆系统全景地图"
            echo "pos: memory/根目录，L1 总地图"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Memory 记忆系统"
            ;;
        business)
            echo "---"
            echo "input: 业务需求、工作场景"
            echo "output: 业务配置与规则"
            echo "pos: business/根目录，工作区配置"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Business 业务区"
            ;;
        projects)
            echo "---"
            echo "input: 项目文件、代码资产"
            echo "output: 项目归档、文档"
            echo "pos: projects/根目录，项目资产库"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Projects 项目库"
            ;;
        scripts)
            echo "---"
            echo "input: 自动化需求"
            echo "output: Shell/Python 脚本工具"
            echo "pos: scripts/根目录，自动化工具库"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Scripts 脚本库"
            ;;
        python)
            echo "---"
            echo "input: Python 自动化需求"
            echo "output: Python 脚本工具"
            echo "pos: scripts/python/的成员，Python 工具"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Python 脚本"
            ;;
        shell)
            echo "---"
            echo "input: Shell 自动化需求"
            echo "output: Shell 脚本工具"
            echo "pos: scripts/shell/的成员，Shell 工具"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Shell 脚本"
            ;;
        职业发展)
            echo "---"
            echo "input: 职业发展需求"
            echo "output: 职业资产文档"
            echo "pos: business/职业发展/的成员，职业资产"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Career 职业资产"
            ;;
        docs)
            echo "---"
            echo "input: 文档编写需求"
            echo "output: 项目文档"
            echo "pos: projects/docs/的成员，项目文档"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Docs 文档"
            ;;
        mcp-servers)
            echo "---"
            echo "input: MCP 服务开发需求"
            echo "output: MCP Server 实现"
            echo "pos: projects/mcp-servers/的成员，MCP 服务"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — MCP Servers"
            ;;
        getnote)
            echo "---"
            echo "input: GetNote 服务请求"
            echo "output: GetNote MCP 服务"
            echo "pos: projects/mcp-servers/getnote/的成员"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — GetNote MCP"
            ;;
        archive)
            echo "---"
            echo "input: 历史项目归档"
            echo "output: 归档项目文档"
            echo "pos: projects/archive/的成员"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Archive 归档"
            ;;
        architecture)
            echo "---"
            echo "input: 架构设计需求"
            echo "output: 架构文档"
            echo "pos: projects/archive/architecture/的成员"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — Architecture 架构"
            ;;
        01-*|02-*|03-*|04-*|05-*|06-*|07-*)
            local module_name="${dir_name#0[0-9]-}"
            echo "---"
            echo "input: 供应商管理${module_name}需求"
            echo "output: 供应商管理${module_name}文档"
            echo "pos: business/供应商管理/${dir_name}/的成员"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — ${module_name}"
            ;;
        *)
            # 通用模板
            echo "---"
            echo "input: [依赖外部资源]"
            echo "output: [对外提供功能]"
            echo "pos: ${relative_path}/的成员"
            echo "# 文件夹变化需同步注释及所属文件夹 md"
            echo "---"
            echo ""
            echo "# CLAUDE.md — ${dir_name_upper}"
            echo ""
            echo "> [目录说明]"
            echo ""
            echo "---"
            echo ""
            echo "## Summary"
            echo ""
            echo "[目录功能说明]"
            echo ""
            echo "---"
            echo ""
            echo "## Members"
            echo ""
            echo "| 文件 | 用途 |"
            echo "|------|------|"
            echo "| [文件 1] | [说明] |"
            ;;
    esac
}

# 检查缺失的 CLAUDE.md
check_missing() {
    echo -e "${YELLOW}检查缺少 CLAUDE.md 的目录...${NC}"
    local count=0

    while IFS= read -r dir; do
        if [ -d "$dir" ]; then
            # 跳过 git 忽略和特殊目录
            if [[ "$dir" == */workspace/* ]] || [[ "$dir" == *"/.git" ]] || [[ "$dir" == *"/.git/"* ]] || [[ "$dir" == *"/.claude/skills" ]] || [[ "$dir" == *"/.claude/skills/"* ]]; then
                continue
            fi

            local has_subdir=$(find "$dir" -maxdepth 1 -mindepth 1 -type d 2>/dev/null | head -1)

            if [ -n "$has_subdir" ]; then
                if [ ! -f "$dir/CLAUDE.md" ] && [ ! -f "$dir/Claude.md" ]; then
                    echo -e "${RED}❌ $dir${NC}"
                    ((count++))
                fi
            fi
        fi
    done < <(find "$PROJECT_ROOT" -type d -mindepth 1 -maxdepth 3 2>/dev/null)

    echo ""
    if [ $count -eq 0 ]; then
        echo -e "${GREEN}✅ 所有目录都有 CLAUDE.md${NC}"
    else
        echo -e "${RED}共发现 $count 个目录缺少 CLAUDE.md${NC}"
    fi
}

# 为所有缺失目录创建 CLAUDE.md
create_all() {
    echo -e "${YELLOW}为所有缺失目录创建 CLAUDE.md...${NC}"
    local count=0

    while IFS= read -r dir; do
        if [ -d "$dir" ]; then
            # 跳过 git 忽略和特殊目录
            if [[ "$dir" == */workspace/* ]] || [[ "$dir" == *"/.git" ]] || [[ "$dir" == *"/.git/"* ]] || [[ "$dir" == *"/.claude/skills" ]] || [[ "$dir" == *"/.claude/skills/"* ]]; then
                continue
            fi

            local has_subdir=$(find "$dir" -maxdepth 1 -mindepth 1 -type d 2>/dev/null | head -1)

            if [ -n "$has_subdir" ]; then
                if [ ! -f "$dir/CLAUDE.md" ] && [ ! -f "$dir/Claude.md" ]; then
                    generate_header "$dir" > "$dir/CLAUDE.md"
                    echo -e "${GREEN}✅ 创建：$dir/CLAUDE.md${NC}"
                    ((count++))
                fi
            fi
        fi
    done < <(find "$PROJECT_ROOT" -type d -mindepth 1 -maxdepth 3 2>/dev/null)

    echo ""
    echo -e "${GREEN}共创建 $count 个 CLAUDE.md 文件${NC}"
}

# 主函数
main() {
    case "$1" in
        --check)
            check_missing
            ;;
        --all)
            create_all
            ;;
        "")
            echo "用法：$0 [目录路径|--check|--all]"
            echo ""
            echo "  [目录路径]  为指定目录创建 CLAUDE.md"
            echo "  --check     检查缺失的 CLAUDE.md"
            echo "  --all       为所有缺失目录创建"
            ;;
        *)
            target_dir="$1"
            if [ ! -d "$target_dir" ]; then
                echo -e "${RED}❌ 目录不存在：$target_dir${NC}"
                exit 1
            fi

            generate_header "$target_dir" > "$target_dir/CLAUDE.md"
            echo -e "${GREEN}✅ 创建：$target_dir/CLAUDE.md${NC}"
            ;;
    esac
}

main "$@"
