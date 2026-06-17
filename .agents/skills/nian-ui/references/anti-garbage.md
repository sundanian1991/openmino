# Anti-Garbage — 质量过滤器（年 UI 版）

最终输出前的自检清单。

## 结构检查

- [ ] 每个页面有自己的场景概念，不是所有页面共用一种布局模板
- [ ] 签名构图无法被通用卡片网格替代
- [ ] 相邻 section 有不同的结构特征族
- [ ] 页面节奏包含 spectacle、密集信息和呼吸空间的混合
- [ ] Hero 有至少 3 个视觉元素（标题、副标题、装饰元素+数据点）

## 年 UI 红线

- [ ] 场景色唯一，同页未混用
- [ ] Hero 底色为 `--bg` 或 `--surface`（非深色全背景）
- [ ] 无渐变、阴影、模糊、毛玻璃、emoji
- [ ] 无 bounce/spring/parallax/scroll-jacking
- [ ] 3 字体不混角色
- [ ] Hero/body 比值 ≥ 8:1
- [ ] 无 accents-orange 做装饰
- [ ] 有装饰元素（ghost 字/装饰线/浮动标签/点阵 选 2-3）

## 电影 UI 质量

- [ ] 每页至少 4 种不同入口类型
- [ ] 相邻 section 不同入口
- [ ] `fadeUp` 最多出现 2 次
- [ ] 互动预算：最多 1 个重互动 + 2 个注意吸引揭示
- [ ] 无工作流术语（director/film/chapter/calibrated）暴露在 UI

## 完成检查

- [ ] 眯眼测试通过（Answer 层主导）
- [ ] 移动端是重新排列不是缩小
- [ ] reduced-motion 已处理
