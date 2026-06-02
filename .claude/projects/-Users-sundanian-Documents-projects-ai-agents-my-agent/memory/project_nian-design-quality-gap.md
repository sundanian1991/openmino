nian-design（原 haglofs-design）质量差距诊断。

背景：最初基于 Haglöfs 品牌基因构建，年老师两次不满意。核心问题不是组件数量，是视觉质量。

差距诊断（历史记录，2026-05）：
1. Nothing Design 有 41 个 showcase 文件（Haglöfs 0→1），实战经验碾压
2. Nothing 有 Doto 点阵字体做 Hero 视觉（Haglöfs 没有，只能用 Georgia）
3. Nothing 的 OLED 深色模式天然有"数据发光"的戏剧感（Haglöfs 浅色模式需要靠别的方式建立视觉张力）
4. Nothing 的工业风组件（LED 卡片、仪表盘弧线、分段方块条）有明确的设计语言（Haglöfs 缺少等价的"户外风"独特组件）

年老师原话核心："当时想法只是换颜色，整体用 Nothing Design"。这意味着正确的做法可能是——直接用 Nothing Design 的框架和组件体系，只做颜色/字体的换肤，而不是试图建立一套独立的"户外风"视觉语言。

TODO:
- [ ] 考虑是否把 nian-design 重新定位为 "Nothing Design + Haglöfs 换肤层"，而不是独立设计系统
- [ ] 用 Nothing Design 做一版信号图谱，对比看效果差异
- [ ] 如果确认 Nothing 更好，把 nian-design 简化为 color+font override config
