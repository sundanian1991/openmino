---
input: 相关文档
output: 文档内容
pos: 项目目录
---

# GitHub hosts 更新提醒

**日期**：2026-03-14
**优先级**：中等

---

## 待办事项

回到电脑后，执行以下命令更新 GitHub hosts：

```bash
cd /Users/sundanian/Documents/projects/ai-agents/my-agent
bash scripts/update-github-hosts.sh
```

---

## 背景

GitHub 访问慢（287-465ms），需要更新 hosts 文件中的 IP 地址。

脚本会自动：
- 备份原 hosts
- 删除旧配置
- 添加最新 IP
- 清理 DNS 缓存
- 测试连通性

---

## 状态

- [ ] 执行脚本
- [ ] 验证连通性（应该 < 100ms）
- [ ] 测试克隆速度