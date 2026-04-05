# Errors

> 记录：命令失败、异常、集成错误

---

## 历史数据导入（2026-03-06 至 2026-04-05）

> 来源：memory/daily/ 最近30天日志提取

---

## [ERR-20260322-001] 人力看板JS调试失败

**Logged**: 2026-03-22T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary
连续3次修补失败，暴露代码调试思维缺陷

### Error
```
Cannot read properties of undefined (reading 'primary')
```

### Context
- **Command attempted**: 修复人力看板HTML文件的DS.colors梯度引用错误
- **错误尝试**:
  1. 添加 `typeof DS` 检查 → 失败
  2. 改为 `getECT()` 函数延迟执行 → 失败
  3. 继续加检查 → 失败，陷入修补循环
- **Environment**: JavaScript单线程，对象字面量初始化时序问题

### Suggested Fix
- **正确方案**（别人一次性解决）：重构架构，去掉`DS`嵌套对象，改为扁平常量`C`
- **铁律**：修补失败2次 → 立刻停下来反思方向
- **核心差异**："报错了修掉它" vs "为什么会报错？执行时序是什么？"

### Metadata
- Reproducible: yes
- Related Files: workspace/产电/人力看板.html
- Pattern-Key: debugging.stop_after_two_attempts
- Recurrence-Count: 1
- Date: 2026-03-22

---

*导入完成：2026-04-05*
*来源：memory/daily/ 2026-03-06 至 2026-04-05*

---

## 历史数据导入（2026-02-01 至 2026-04-05）

> 来源：~/.myagents/sessions/ 686 个对话文件回溯提炼
> 详细报告：workspace/inbox/learning-records-v2-20260405.md

---

## [ERR-20260405-001] 通用通报海报模式固定问题

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: design

### Summary
通报海报模式过于固定，缺少版式变化

### Details
**问题**：最近几个内容都使用通用海报模式，但实际有多种模板可用
**年老师反馈**："我最近做了几个内容，你都是使用这个通用的海报模式，但我们有很多这类模板。请看看这块是否有问题"
**期望**：补充其他类型作为可选项，组件化设计

### Suggested Action
mino-frontend 应该支持多种通报版式，不要固定一种模式

### Metadata
- Source: user_feedback
- Tags: 设计, 通报模式, mino-frontend
- Date: 2026-04-04

---

## [ERR-20260404-002] HTML页面布局挤压

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: frontend

### Summary
Dashboard 右侧内容挤压到一起

### Details
**问题**：权责不对等研究 Dashboard 左边正常，右边挤压
**年老师反馈**："左边是正常的，右边都挤压到一起了"

### Suggested Action
检查响应式布局，确保不同屏幕尺寸下内容正常显示

### Metadata
- Source: user_feedback
- Tags: HTML, 布局, 响应式
- Date: 2026-04-04

---

## [ERR-20260404-003] 板块内容不均衡

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: low
**Status**: pending
**Area**: design

### Summary
部分板块内容较少，视觉上不均衡

### Details
**问题**：联盟可行性评估、边界识别清单、时间框架三个部分字数少、行短，显得瘦长
**年老师反馈**："与其他板块相比，它们的字数、内容相对更少，一行也更短，所以整体呈现出来显得瘦瘦的、拉长的，感觉不是特别好看"

### Suggested Action
设计时注意各板块内容均衡，避免视觉不协调

### Metadata
- Source: user_feedback
- Tags: 设计, 版式, 内容均衡
- Date: 2026-04-04

---

## [ERR-20260404-004] 技能改造失败

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: skills

### Summary
Ownership 技能改造流程需要重新梳理

### Details
**问题**：把 PUA 的内容提取到 Ownership 技能时，发现仍有企业文化味道
**年老师反馈**："把 PUA 里独有的味道系统和展示协议提取出来，作为 Ownership 的一部分。我发现这里仍然带有一些企业文化的味道"

### Suggested Action
技能移植时要去掉原项目的特定文化元素

### Metadata
- Source: user_feedback
- Tags: 技能, 移植, 去文化化
- Date: 2026-04-04

---

## [ERR-20260404-005] 网络连接问题

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
Get笔记网站登录困难

### Details
**问题**：IP 对应后仍有问题，登录不顺畅
**年老师反馈**："之前有一段时间还好，我就让把 IP 重新对应搞了一下。现在是 IP 那边有问题吗？"
**期望**：快速响应、丝滑登录

### Suggested Action
- 尝试 DNS 解析
- 使用国内镜像源

### Metadata
- Source: user_feedback
- Tags: 网络, 登录, API
- Date: 2026-04-04

---

## [ERR-20260404-006] 供应商看板多版本失败

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary
供应商站点看板改了很多版本仍不满意

### Details
**问题**：需求写好后没有数据，改了很多版本仍然不行
**年老师反馈**："我前面聊了很久，却仍然解决不了这个问题，感觉非常笨拙。需求之前已经写好，但写完后没有数据，改了很多版本仍然不行"
**参考版本**：workspace/output/供应商看板.html（喜欢的版本）

### Suggested Action
找到满意版本的模型/运行方式，理解为什么能成功

### Metadata
- Source: user_feedback
- Tags: 供应商, 看板, 数据可视化
- Date: 2026-04-04

---

## [ERR-20260404-007] SVG绘制能力不足

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: design

### Summary
手绘 SVG 质量不达标，连简单图形都画不好

### Details
**问题**：
1. 画的杯子"还是不太像杯子"
2. "就连简简单单的那个都做不好"
**年老师反馈**："你的能力边界到底是在哪里？你想画一个 SVG 杯子，连做到很像都做不到吗？"

### Suggested Action
建立手绘 SVG 基础能力库，先掌握简单图形

### Metadata
- Source: user_feedback
- Tags: SVG, 手绘, 设计
- Date: 2026-04-04

---

## [ERR-20260404-008] API额度限制

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
Quiver API 额度不足，无法支撑高频使用

### Details
**问题**：一周只有 20 次调用额度，不够用
**年老师反馈**："API 根本不够用。我一周就只有 20 次调用 API 的。我没有那么多 API 可以调用"
**需求**：找免费或更高额度的替代 API

### Suggested Action
- 寻找 Quiver API 免费替代
- 或寻找更高额度的 API 方案

### Metadata
- Source: user_feedback
- Tags: API, 额度, 成本
- Date: 2026-04-04

---

## [ERR-20260404-009] SVG颜色分段问题

**Logged**: 2026-04-04T00:00:00+08:00
**Priority**: low
**Status**: pending
**Area**: design

### Summary
虾的颜色需要保持一致，其他物体按对照着色

### Details
**问题**：颜色分段涂色不符合预期
**年老师反馈**："虾本身，需要颜色保持一致，然后其他的要根据这个物体进行对照"

### Suggested Action
同一物体颜色统一，不同物体按视觉对照分配

### Metadata
- Source: user_feedback
- Tags: SVG, 颜色, 设计
- Date: 2026-04-04

---

## [ERR-20260403-001] 供应商看板数据筛选问题

**Logged**: 2026-04-03T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary
看板筛选后数据不完整

### Details
**问题**：选全部时都有数据，但筛选站点/供应商/业务后，数据不完整
**年老师反馈**："有的有，有的没有；有的数据里边也不是全部都有，有的有，有的又没有"

### Suggested Action
检查数据绑定逻辑，确保筛选后数据完整性

### Metadata
- Source: user_feedback
- Tags: 供应商, 看板, 数据筛选
- Date: 2026-04-03

---

## [ERR-20260403-002] 数据源结构问题

**Logged**: 2026-04-03T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: data

### Summary
原始数据总表导致处理复杂

### Details
**问题**：原始数据是总表，需要很多细表，代码处理复杂
**建议**：在原始 MD 中按业务拆分数据，预先处理
**年老师反馈**："你看能否在原始的供应商站点的 MD 中，加上后续需要的所有数据，单独成表"

### Suggested Action
优化数据源结构，按业务拆分预处理

### Metadata
- Source: user_feedback
- Tags: 数据, 结构优化
- Date: 2026-04-03

---

## [ERR-20260403-003] AI对话报错

**Logged**: 2026-04-03T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: infra

### Summary
阿里云百炼 glm-5 模型报错

### Error
```
server_error
```

### Context
- **供应商**: 阿里云百炼
- **模型**: glm-5
- **工作区**: /Users/sundanian/Documents/proj...

### Suggested Action
查询日志诊断问题，检查供应商状态

### Metadata
- Reproducible: unknown
- Date: 2026-04-03

---

## [ERR-20260403-004] HTML打开有问题

**Logged**: 2026-04-03T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: frontend

### Summary
生成的 HTML 文件打开有问题

### Details
**年老师反馈**："你看看还有啥问题，我打开还是有问题"

### Suggested Action
检查 HTML 文件完整性、浏览器兼容性

### Metadata
- Source: user_feedback
- Tags: HTML, 兼容性
- Date: 2026-04-03

---

## [ERR-20260403-005] 数据和交互问题

**Logged**: 2026-04-03T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary
产出物"不行"，数据和交互都有问题

### Details
**年老师反馈**："这个不行啊。数据和交互"
**问题**：数据展示和交互设计都不满意

### Suggested Action
数据展示和交互需要分开验证

### Metadata
- Source: user_feedback
- Tags: 数据, 交互, 前端
- Date: 2026-04-03

---

## [ERR-20260403-006] 内容不显示

**Logged**: 2026-04-03T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary
页面内容不显示

### Details
**年老师反馈**："还是不行，没有显示内容"

### Suggested Action
检查数据加载、DOM 渲染、JS 执行

### Metadata
- Source: user_feedback
- Tags: HTML, 渲染
- Date: 2026-04-03

---

## [ERR-20260402-001] 职场业务线分布图表问题

**Logged**: 2026-04-02T00:00:00+08:00
**Priority**: medium
**Status**: pending
**Area**: design

### Summary
职场业务线分布图不行

### Details
**问题**：当前图表类型不合适
**年老师反馈**："职场业务线分布 这个不行。还是得气泡，但是你看怎么调整显示"

### Suggested Action
改用气泡图，调整显示参数

### Metadata
- Source: user_feedback
- Tags: 图表, 数据可视化
- Date: 2026-04-02

---

## [ERR-20260331-001] 设计产出反复调整

**Logged**: 2026-03-31T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: design

### Summary
每个产出都需要反复调整，设计原则或技能有问题

### Details
**问题**：设计产出不能一次达标，总是需要反复调整
**年老师反馈**："如果后续每一个产出都需要这样反复去调整的话，那我觉得我们的设计原则是不是还有问题？或者是我们的设计技能有问题"

### Suggested Action
审查设计方法论和设计判断力

### Metadata
- Source: user_feedback
- Tags: 设计, 方法论, 设计判断力
- Date: 2026-03-31

---

## [ERR-20260330-001] HTML像PPT

**Logged**: 2026-03-30T00:00:00+08:00
**Priority**: high
**Status**: pending
**Area**: frontend

### Summary
HTML 在大屏幕上被撑满，像 PPT

### Details
**问题**：响应式设计问题，大屏幕显示异常
**年老师反馈**："感觉是在 HTML 上面做了个 PPT，然后呢，因为我的屏幕显示比较大，你把它给撑满了。这种情况是我最不能容忍的，非常丑"

### Suggested Action
设置最大宽度，大屏幕居中显示

### Metadata
- Source: user_feedback
- Tags: HTML, 响应式, 大屏幕
- Date: 2026-03-30

---

*MyAgents 导入完成：2026-04-05*
*来源：~/.myagents/sessions/ 686个文件（2026-02-01至2026-04-05）*
