#!/bin/bash

# 批量添加检查规则到模板文件

BASE_DIR="/Users/sundanian/Documents/projects/ai-agents/my-agent/.claude/skills/official-docs/templates"

# 通用检查规则（所有模板都适用）
COMMON_CHECK="
---

## 本模板检查规则

### L1 语言风格检查
- [ ] 无口语化表达（这个、那个、咱们、还行、挺好）
- [ ] 无模糊词（看情况、也许、可能、大概）
- [ ] 无情绪化表达（我觉得、我希望、我认为）
- [ ] 无废话开场（好的、收到、没问题）
- [ ] 无感叹号、emoji、网络用语

### L2 场景适当性检查
- [ ] 内容适合目标场景（向上审批/对外沟通/内部协调）
- [ ] 优缺点平衡，不只说优点
- [ ] 细节适度，符合接收方需求

### L3 政治敏感性检查
- [ ] 不给内部供应商贴负面标签
- [ ] 避免被解读为"对内部工具支持不够"
- [ ] 不点名批评内部部门

### L4 结构完整性检查
- [ ] 结构完整，包含必需部分
- [ ] 逻辑清晰，段落之间有过渡

### L5 逻辑一致性检查
- [ ] 理由与结论匹配
- [ ] 数据一致性（同一数据多处一致）
- [ ] 能量化尽量量化

### L6 格式规范性检查
- [ ] 表格有表头、边框
- [ ] 段落间有空行
- [ ] 关键段落用<strong>加粗
- [ ] 无分割线、手动编号
"

# 决策请示特殊检查
DECISION_REQUEST_CHECK="
### L3 政治敏感性检查（决策请示专用）
- [ ] 不给内部供应商贴负面标签
- [ ] 无充分把握时优先考虑赛马机制
- [ ] 决策理由要经得起"为什么不选内部供应商"的追问
- [ ] 供应商选择决策树：两家都有把握→选更合适的；一家有把握→选有把握的；两家都没把握→赛马机制

### L4 结构完整性检查（决策请示专用）
- [ ] 有事项背景
- [ ] 有备选方案表格（至少2个方案）
- [ ] 有我方建议
- [ ] 有需要决策
- [ ] 有预期影响（优点/风险/成本）
"

# 函数：添加检查规则到文件
add_check_rules() {
    local file=$1
    local type=$2

    echo "处理: $file"

    # 检查文件是否已有检查规则
    if grep -q "本模板检查规则" "$file"; then
        echo "  → 已有检查规则，跳过"
        return
    fi

    # 添加通用检查规则
    echo "$COMMON_CHECK" >> "$file"

    # 根据类型添加特殊检查规则
    if [ "$type" = "decision" ]; then
        echo "$DECISION_REQUEST_CHECK" >> "$file"
    fi

    echo "  → 已添加检查规则"
}

# 处理所有模板文件
echo "开始批量添加检查规则..."
echo ""

# 通用公文
add_check_rules "$BASE_DIR/general/decision-request.md" "decision"
add_check_rules "$BASE_DIR/general/formal-report.md" "general"
add_check_rules "$BASE_DIR/general/notification.md" "general"
add_check_rules "$BASE_DIR/general/collaboration.md" "general"

# 供应商管理
for file in "$BASE_DIR"/supplier/*.md; do
    add_check_rules "$file" "supplier"
done

# 内部协调
add_check_rules "$BASE_DIR/internal/internal-coordination.md" "internal"

echo ""
echo "完成！共处理了 $(find $BASE_DIR -name "*.md" | wc -l) 个模板文件。"
