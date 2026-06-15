# Decisions — Stephen Chow 周星驰

## Start Questionnaire

1. **How to start**: Step-by-step
2. **Image placeholders**: No
3. **Site niche**: 单页品牌展示 — "草根逆袭"主题的虚构品牌展示页
4. **Page list**: 单页 — Hero + 能力展示 + 故事 + 数据 + 结尾

## 场景色（nian token 映射）

| 电影 UI 原有 | nian 映射 |
|-------------|----------|
| Stephen Chow 调色板（暖色/夸张/活力） | **Olive** `#4A5D3A` — 增长、生命力、"草根崛起" |

**正当性**: Stephen Chow 的叙事始终关于"小人物逆袭"——少林足球的拾荒者→球王、功夫的街头混混→宗师。Olive 的"生长"意象完美匹配这种从底层向上的生命力。场景色注入：

```css
--scene: #4A5D3A;
--scene-bg: rgba(74, 93, 58, 0.06);
--scene-border: rgba(74, 93, 58, 0.2);
```

## 字体（nian 固定）

| 角色 | 字体 |
|------|------|
| Display | Playfair Display 300/600 |
| Body | Inter 400/500 |
| Data | JetBrains Mono 500 |

## 深度系统（nian 无阴影）

Border-only 层级，代替 box-shadow。

## Previous-work audit

— 新项目，无重复历史

## Shell-ban list

- 无 SaaS Hero（这不是产品页）
- 无数据面板（这不是分析报告）
- 无行业通用模板布局

## Primary composition family

- **Vertical tower** — 垂直堆叠，从地面"生长"起来的感觉，匹配草根逆袭叙事
