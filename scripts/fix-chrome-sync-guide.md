---
input: N/A
output: N/A
pos: N/A
---

# Chrome 登录状态闪烁 - 解决方案

## 方案一：创建新Profile（推荐，5分钟解决）

1. **打开Chrome**
2. **右上角点击头像 → 添加用户**
3. **选择"继续而不登录账号"**（先测试）
4. **测试新Profile登录状态是否稳定**
   - 如果稳定 → 说明是原Profile损坏
   - 可以逐步迁移数据（书签、密码）

## 方案二：重置原Profile（10分钟）

1. **完全退出Chrome**（菜单→退出Chrome）
2. **重命名Profile目录**（保留数据）：
   ```bash
   mv ~/Library/Application\ Support/Google/Chrome/Default \
      ~/Library/Application\ Support/Google/Chrome/Default.backup
   ```
3. **重启Chrome**（会创建新的Default目录）
4. **登录Google账号测试**
5. **如果正常**，手动迁移书签、密码等数据
   ```bash
   # 书签
   cp ~/Library/Application\ Support/Google/Chrome/Default.backup/Bookmarks \
      ~/Library/Application\ Support/Google/Chrome/Default/
   
   # 密码（可选）
   cp ~/Library/Application\ Support/Google/Chrome/Default.backup/Login\ Data \
      ~/Library/Application\ Support/Google/Chrome/Default/
   ```

## 方案三：重新安装Chrome

如果以上都不行，完全重装：
```bash
# 1. 完全退出Chrome
# 2. 删除应用和数据
rm -rf /Applications/Google\ Chrome.app
rm -rf ~/Library/Application\ Support/Google/Chrome
rm -rf ~/Library/Caches/Google/Chrome
rm -rf ~/Library/Preferences/com.google.Chrome.plist
# 3. 重新下载安装Chrome
```

---

**建议先试方案一** - 最快速、风险最低。
