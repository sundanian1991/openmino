#!/bin/bash

# MemOS 记忆迁移脚本
# 将本地历史记忆同步到 MemOS 云端

API_KEY="mpg-IjBklEsmy6TBl6JF55QO4WOZ4u/yzfEh84OznkPz"
API_BASE="https://memos.memtensor.cn/api/openmem/v1"
USER_ID="mino"
CONVERSATION_ID="memory-migration-$(date +%Y%m%d)"

echo "🚀 开始迁移记忆到 MemOS..."
echo ""

# ===== 1. 观察记录 =====
echo "📝 迁移观察记录..."

curl -s -X POST "$API_BASE/add/message" \
  -H "Content-Type: application/json" \
  -H "Authorization: Token $API_KEY" \
  -d "{
    \"user_id\": \"$USER_ID\",
    \"conversation_id\": \"$CONVERSATION_ID\",
    \"messages\": [
      {
        \"role\": \"user\",
        \"content\": \"2026年2月观察记录汇总：物尽其用原则、分形文档架构、减法思维\"
      },
      {
        \"role\": \"assistant\",
        \"content\": \"核心洞察：年老师通过三次清理（commands、skills、MCP+hooks）教会我'删了反而清爽'。判断标准从'留着吧万一需要'变成'没用就删'。\"
      }
    ],
    \"tags\": [\"#观察\", \"#洞察\", \"#减法思维\"]
  }" | jq -r '.message'

echo ""
sleep 2

# ===== 2. 周度总结 =====
echo "📊 迁移周度总结..."

curl -s -X POST "$API_BASE/add/message" \
  -H "Content-Type: application/json" \
  -H "Authorization: Token $API_KEY" \
  -d "{
    \"user_id\": \"$USER_ID\",
    \"conversation_id\": \"$CONVERSATION_ID\",
    \"messages\": [
      {
        \"role\": \"user\",
        \"content\": \"2026年第9周总结：机制优化与经验固化\"
      },
      {
        \"role\": \"assistant\",
        \"content\": \"核心事件：启动速度优化、Plan First自动化、5311工作框架、深化理解项目。洞察：年老师是体系构建者，'搭体系'是核心产出。\"
      }
    ],
    \"tags\": [\"#周报\", \"#工作框架\", \"#P7角色\"]
  }" | jq -r '.message'

echo ""
sleep 2

# ===== 3. 用户偏好 =====
echo "❤️ 迁移用户偏好..."

curl -s -X POST "$API_BASE/add/message" \
  -H "Content-Type: application/json" \
  -H "Authorization: Token $API_KEY" \
  -d "{
    \"user_id\": \"$USER_ID\",
    \"conversation_id\": \"$CONVERSATION_ID\",
    \"messages\": [
      {
        \"role\": \"user\",
        \"content\": \"我的核心偏好：物尽其用、简洁优先、体系化思维、机制化预防\"
      },
      {
        \"role\": \"assistant\",
        \"content\": \"记住了：年老师偏好'简洁 > 功能'，删了反而清爽；重视'机制化预防'而不是单次解决；是体系搭建者，不是纯PM。\"
      }
    ],
    \"tags\": [\"#偏好\", \"#核心价值\", \"#工作风格\"]
  }" | jq -r '.message'

echo ""
sleep 2

# ===== 4. 决策记录 =====
echo "🎯 迁移重要决策..."

curl -s -X POST "$API_BASE/add/message" \
  -H "Content-Type: application/json" \
  -H "Authorization: Token $API_KEY" \
  -d "{
    \"user_id\": \"$USER_ID\",
    \"conversation_id\": \"$CONVERSATION_ID\",
    \"messages\": [
      {
        \"role\": \"user\",
        \"content\": \"重要决策：采用双轨制记忆系统（本地文件 + MemOS云端）\"
      },
      {
        \"role\": \"assistant\",
        \"content\": \"决策理由：本地文件用于完整备份和可追溯，MemOS云端用于语义检索和跨会话记忆。详细记录保留本地，摘要同步云端。\"
      }
    ],
    \"tags\": [\"#决策\", \"#记忆系统\", \"#架构设计\"]
  }" | jq -r '.message'

echo ""
echo "✅ 记忆迁移完成！"
echo ""
echo "📊 验证迁移结果..."
sleep 5

# 验证检索
echo ""
echo "🔍 检索测试：物尽其用"
curl -s -X POST "$API_BASE/search/memory" \
  -H "Content-Type: application/json" \
  -H "Authorization: Token $API_KEY" \
  -d "{
    \"query\": \"物尽其用\",
    \"user_id\": \"$USER_ID\",
    \"memory_limit_number\": 3
  }" | jq -r '.data.memory_detail_list[]?.memory_value' | head -3

echo ""
echo "✨ 迁移完成！现在可以用 MemOS 检索这些记忆了。"
