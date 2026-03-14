#!/bin/bash
# 测量 Claude API 吞吐量
# 用法：./scripts/measure-throughput.sh

set -e

# 颜色
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}=== Claude API 吞吐量测试 ===${NC}"

# 检查 API Key
if [ -z "$ANTHROPIC_API_KEY" ] && [ -z "$ANTHROPIC_AUTH_TOKEN" ]; then
    echo -e "${RED}错误：未找到 ANTHROPIC_API_KEY 或 ANTHROPIC_AUTH_TOKEN${NC}"
    echo "请先设置环境变量"
    exit 1
fi

# 自动判断用哪个 key
if [ -n "$ANTHROPIC_API_KEY" ]; then
    AUTH_HEADER="x-api-key: $ANTHROPIC_API_KEY"
    echo -e "${YELLOW}使用 ANTHROPIC_API_KEY${NC}"
else
    AUTH_HEADER="Authorization: Bearer $ANTHROPIC_AUTH_TOKEN"
    echo -e "${YELLOW}使用 ANTHROPIC_AUTH_TOKEN${NC}"
fi

# 测试模型
MODEL="${1:-claude-sonnet-4-20250514}"
TOKENS="${2:-1000}"

echo -e "${YELLOW}模型：${MODEL}${NC}"
echo -e "${YELLOW}目标 tokens: ${TOKENS}${NC}"
echo ""

# 记录开始时间
START_TIME=$(date +%s.%N)

echo -e "${GREEN}发送请求...${NC}"

# 发送请求并捕获响应
RESPONSE=$(curl -s -w "\n%{time_total}" -X POST "https://api.anthropic.com/v1/messages" \
    -H "Content-Type: application/json" \
    -H "Anthropic-Version: 2023-06-01" \
    -H "$AUTH_HEADER" \
    -d "{
        \"model\": \"$MODEL\",
        \"max_tokens\": $TOKENS,
        \"messages\": [
            {
                \"role\": \"user\",
                \"content\": \"请用中文写一篇关于 AI 发展的文章，尽可能详细，至少 $TOKENS 个 token。\"
            }
        ]
    }")

# 分离响应和时间（兼容 macOS）
TIME_TOTAL=$(echo "$RESPONSE" | tail -1)
RESPONSE_BODY=$(echo "$RESPONSE" | sed '$d')

# 解析响应
if echo "$RESPONSE_BODY" | grep -q '"error"'; then
    echo -e "${RED}请求失败：${NC}"
    echo "$RESPONSE_BODY" | jq '.error.message'
    exit 1
fi

# 提取 token 数
INPUT_TOKENS=$(echo "$RESPONSE_BODY" | jq '.usage.input_tokens // 0')
OUTPUT_TOKENS=$(echo "$RESPONSE_BODY" | jq '.usage.output_tokens // 0')
TOTAL_TOKENS=$((INPUT_TOKENS + OUTPUT_TOKENS))

# 计算吞吐量
if (( $(echo "$TIME_TOTAL > 0" | bc -l) )); then
    TOTAL_THROUGHPUT=$(echo "scale=2; $TOTAL_TOKENS / $TIME_TOTAL" | bc)
    OUTPUT_THROUGHPUT=$(echo "scale=2; $OUTPUT_TOKENS / $TIME_TOTAL" | bc)
else
    TOTAL_THROUGHPUT="N/A"
    OUTPUT_THROUGHPUT="N/A"
fi

echo ""
echo -e "${GREEN}=== 测试结果 ===${NC}"
echo -e "总耗时：${YELLOW}${TIME_TOTAL} 秒${NC}"
echo -e "输入 tokens: ${INPUT_TOKENS}"
echo -e "输出 tokens: ${OUTPUT_TOKENS}"
echo -e "总 tokens: ${TOTAL_TOKENS}"
echo ""
echo -e "${GREEN}=== 吞吐量 ===${NC}"
echo -e "总吞吐量：${YELLOW}${TOTAL_THROUGHPUT} tokens/秒${NC}"
echo -e "输出吞吐量：${YELLOW}${OUTPUT_THROUGHPUT} tokens/秒${NC}"
echo ""

# 保存到文件
RESULT_FILE="workspace/throughput-$(date +%Y%m%d-%H%M%S).md"
cat > "$RESULT_FILE" << EOF
# API 吞吐量测试

**时间**: $(date '+%Y-%m-%d %H:%M:%S')
**模型**: $MODEL

## 结果

| 指标 | 值 |
|------|-----|
| 总耗时 | ${TIME_TOTAL} 秒 |
| 输入 tokens | ${INPUT_TOKENS} |
| 输出 tokens | ${OUTPUT_TOKENS} |
| 总吞吐量 | ${TOTAL_THROUGHPUT} tokens/秒 |
| 输出吞吐量 | ${OUTPUT_THROUGHPUT} tokens/秒 |

## 原始响应

\`\`\`json
$RESPONSE_BODY
\`\`\`
EOF

echo -e "${GREEN}结果已保存到：${RESULT_FILE}${NC}"
