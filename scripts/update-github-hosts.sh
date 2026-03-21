#!/bin/bash

# GitHub Hosts 更新脚本
# 更新日期：2026-03-21

echo "正在更新 GitHub hosts 配置..."

sudo tee /etc/hosts > /dev/null << 'EOF'
##
# Host Database
#
# localhost is used to configure the loopback interface
# when the system is booting.  Do not change this entry.
##
127.0.0.1	localhost
255.255.255.255	broadcasthost
::1             localhost

# This line is auto added by aTrustAgent, do not modify, or aTrustAgent may unable to work
127.0.0.1	localhost.sangfor.com.cn

# GitHub IP hosts Start (Updated: 2026-03-21)
140.82.112.26                alive.github.com
140.82.113.25                alive.github.com
140.82.116.6                 api.github.com
185.199.108.133              avatars.githubusercontent.com
185.199.109.133              avatars.githubusercontent.com
185.199.110.133              avatars.githubusercontent.com
185.199.108.133              avatars0.githubusercontent.com
185.199.109.133              avatars0.githubusercontent.com
185.199.110.133              avatars0.githubusercontent.com
185.199.108.133              avatars1.githubusercontent.com
185.199.109.133              avatars1.githubusercontent.com
185.199.110.133              avatars1.githubusercontent.com
185.199.108.133              avatars2.githubusercontent.com
185.199.109.133              avatars2.githubusercontent.com
185.199.110.133              avatars2.githubusercontent.com
185.199.108.133              avatars3.githubusercontent.com
185.199.109.133              avatars3.githubusercontent.com
185.199.110.133              avatars3.githubusercontent.com
185.199.108.133              codeload.github.com
140.82.114.18                collector.github.com
185.199.108.133              cloud.githubusercontent.com
185.199.109.133              cloud.githubusercontent.com
185.199.110.133              cloud.githubusercontent.com
185.199.108.133              github.githubassets.com
140.82.112.21                central.github.com
185.199.110.133              github.map.fastly.net
151.101.129.194              github.global.ssl.fastly.net
140.82.113.4                 gist.github.com
185.199.108.153              github.io
140.82.113.3                 github.com
140.82.114.5                 api.github.com
185.199.108.133              raw.githubusercontent.com
185.199.109.133              user-images.githubusercontent.com
185.199.109.133              favicons.githubusercontent.com
140.82.112.17                github.community
185.199.109.133              raw.github.com
# GitHub IP hosts End
EOF

echo "hosts 文件已更新！"
echo ""
echo "正在刷新 DNS 缓存..."
sudo dscacheutil -flushcache
sudo killall -HUP mDNSResponder
echo "DNS 缓存已刷新！"
echo ""
echo "GitHub hosts 更新完成。"
