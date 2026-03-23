---
name: hand-drawn-svg
description: |
  手绘风格 SVG 生成技能 — 通过 Quiver AI API 生成高质量手绘风格矢量图形。

  触发场景：用户说"画个XX"、"生成SVG插图"、"手绘风格图标"、"把这个图片转成SVG"、"做个Logo"时使用。

  支持两种模式：
  - 文本生成SVG：描述 → 手绘风格SVG
  - 图片转SVG：上传图片 → 矢量化手绘风格

  自动与页面风格融合，提供融入建议。
---

# 手绘风格 SVG 生成技能

## 配置

```bash
# API 配置（已内置）
QUIVER_API_KEY="sk_live_JTeCrNxZLMMeBL9pgbijT2"
QUIVER_API_URL="https://api.quiver.ai/v1"
```

---

## 一、风格预设

### 技术核心：日式手绘风（来自 Zara's Tokyo 招财猫分析）

**为什么这么精细？**

| 要素 | 技术实现 | 效果 |
|------|---------|------|
| **双层结构** | 同一path画两次：一次fill，一次stroke | 填充色+轮廓线，层次丰富 |
| **圆角线条** | `stroke-linecap="round"` + `stroke-linejoin="round"` | 手绘感，无尖锐转角 |
| **有机曲线** | 大量曲线段（c指令），少直线 | 柔和自然，不像机械绘图 |
| **无背景框** | 禁止 `<rect>` 背景矩形 | 自然融入页面，不被框住 |
| **适度留白** | 元素之间有空隙，不挤在一起 | 呼吸感，视觉舒适 |

**Prompt 必加关键词**：
```
hand-drawn sketch style, filled shapes with outline strokes,
soft organic curves, rounded line endings, no background rectangle,
transparent background, ample negative space
```

### 1. 日式手绘风（Tokyo Sketch）
```
关键词：Japanese ink brush, hand-drawn sketch, organic curves
配色：#E2725B(朱红) + #F5F1EE(暖白) + #1A1612(墨黑)
特点：圆润线条，填充式，留白多
适用：Hero插图、品牌图标、文化类内容
技术要求：同一path双层（fill+stroke），圆角端点，无背景框
```

### 2. 北欧极简风（Nordic Minimal）
```
关键词：Scandinavian minimal, clean lines, geometric
配色：#2D3436(炭灰) + #DFE6E9(雾白) + #E17055(点缀橙)
特点：细线条描边，几何感，高对比
适用：技术产品、数据可视化、企业站
```

### 3. 涂鸦艺术风（Doodle Art）
```
关键词：Playful doodle, hand-drawn imperfect, fun
配色：#6C5CE7(紫) + #00B894(绿) + #FDCB6E(黄) + #E17055(橙)
特点：不规则线条，多彩填充，活泼感
适用：教育内容、儿童产品、创意项目
```

### 4. 水彩晕染风（Watercolor）
```
关键词：Watercolor wash, soft gradients, artistic
配色：低饱和色系，渐变过渡
特点：半透明效果，柔和边界
适用：艺术类、婚礼、生活方式
```

### 5. 线条描边风（Line Art）
```
关键词：Minimalist line art, outline only, no fill
配色：单色线条 + 透明背景
特点：纯描边，无填充，极简
适用：图标、装饰元素、UI插图
```

### 6. 扁平插画风（Flat Illustration）
```
关键词：Flat design, vector illustration, modern
配色：品牌色系，纯色填充
特点：无描边，色块组合，现代感
适用：商业应用、App、网站
```

---

## 二、交互流程

### Step 1: 确认内容

**必须问用户**：
1. **要画什么？**
   - 具体对象（虾、猫、火箭...）
   - 抽象概念（成长、连接、创新...）

2. **用途是什么？**
   - Hero插图（大尺寸，视觉焦点）
   - 图标（小尺寸，识别性）
   - 装饰元素（背景、边框）
   - Logo/品牌标识

### Step 2: 确认风格

**展示风格选项**（根据用途推荐）：

```
推荐预设：
- Hero插图 → 日式手绘 / 水彩晕染
- 图标 → 线条描边 / 扁平插画
- 装饰元素 → 线条描边 / 涂鸦艺术
- Logo → 北欧极简 / 扁平插画
```

**询问**：
1. 选择哪种风格？（或自定义）
2. 配色方案？
   - 从当前页面继承（需要用户提供色值）
   - 使用风格预设配色
   - 自定义颜色

3. 是否需要背景？
   - 透明背景（推荐，便于融合）
   - 纯色背景
   - 渐变背景

### Step 3: 生成

根据用户选择构建 Prompt 并调用 API。

---

## 三、API 调用

### 模式 A：文本生成 SVG

```bash
curl -s --request POST \
  --url https://api.quiver.ai/v1/svgs/generations \
  --header 'Authorization: Bearer sk_live_JTeCrNxZLMMeBL9pgbijT2' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "arrow-preview",
    "prompt": "<构建的prompt>",
    "n": 1,
    "stream": false
  }'
```

### 模式 B：图片转 SVG

```bash
curl -s --request POST \
  --url https://api.quiver.ai/v1/svgs/vectorizations \
  --header 'Authorization: Bearer sk_live_JTeCrNxZLMMeBL9pgbijT2' \
  --header 'Content-Type: application/json' \
  --data '{
    "model": "arrow-preview",
    "stream": false,
    "image": {
      "url": "<图片URL>"
    }
  }'
```

**注意**：图片需要是可访问的URL。如果用户提供本地图片：
1. 先询问用户是否有可访问的图片URL
2. 或建议用户上传到图床后提供URL

---

## 四、Prompt 构建模板

根据风格预设构建 Prompt：

```
基础结构：
[风格关键词], [对象描述], [配色指定], [技术要求]

示例（日式手绘风-虾）：
A hand-drawn sketch style shrimp illustration,
Japanese ink brush aesthetic,
terracotta orange (#E2725B) on warm cream background (#F5F1EE),
soft organic curves with rounded line endings,
clean vector style, side-view pose,
ample negative space, warm and approachable feeling,
no border, transparent background preferred
```

### 各风格 Prompt 模板

**日式手绘风**：
```
A hand-drawn sketch style [OBJECT], Japanese ink brush aesthetic,
terracotta orange (#E2725B) and warm cream (#F5F1EE),
soft organic curves with rounded line endings,
clean vector style, ample negative space,
warm and approachable, [TRANSPARENT BACKGROUND/no background]
```

**北欧极简风**：
```
A Scandinavian minimal style [OBJECT], clean geometric lines,
charcoal (#2D3436) on mist white (#DFE6E9) with accent orange (#E17055),
thin stroke outline, high contrast, modern and professional,
[TRANSPARENT BACKGROUND]
```

**涂鸦艺术风**：
```
A playful doodle style [OBJECT], hand-drawn imperfect lines,
vibrant colors (#6C5CE7, #00B894, #FDCB6E, #E17055),
fun and energetic, cartoon-like proportions,
[TRANSPARENT BACKGROUND]
```

**线条描边风**：
```
A minimalist line art [OBJECT], outline only no fill,
single color (#1A1612) stroke on transparent background,
clean continuous lines, simple and elegant,
suitable for icon use
```

**扁平插画风**：
```
A flat design [OBJECT], modern vector illustration,
[COLOR PALETTE], solid color fills no strokes,
geometric shapes, clean and professional,
[TRANSPARENT BACKGROUND]
```

---

## 五、融入建议

生成 SVG 后，提供融合建议：

### 1. 去除边框
检查 SVG 是否有背景矩形，建议移除：
```svg
<!-- 如果有这类元素，建议删除 -->
<rect width="100%" height="100%" fill="#..."/>
```

### 2. CSS 融合技巧
```css
/* 让 SVG 自然融入 */
.hero-illustration svg {
  width: 100%;
  height: auto;
  /* 悬停效果 */
  transition: transform 0.4s ease, filter 0.4s ease;
}
.hero-illustration:hover svg {
  transform: translateY(-4px);
  filter: drop-shadow(0 12px 32px rgba(226,114,91,0.25));
}
```

### 3. 与页面元素叠加
```html
<!-- 建议使用相对定位 + z-index 层叠 -->
<div class="hero" style="position: relative;">
  <div class="hero-illustration" style="z-index: 1;">
    <!-- SVG 放这里 -->
  </div>
</div>
```

### 4. 颜色协调
如果 SVG 颜色与页面不协调，建议：
- 提取 SVG 中的颜色值
- 建议用户调整页面配色以匹配
- 或重新生成 SVG 时指定页面配色

---

## 六、输出格式

完成生成后，输出：

```markdown
### 生成完成

**风格**：[选择的风格]
**模式**：文本生成 / 图片转换

**SVG 预览**：
[显示 SVG 或保存路径]

**融入建议**：
1. [具体建议]
2. [具体建议]

**保存路径**：`workspace/[filename].svg`

**是否满意？** 如需调整，可以：
- 重新选择风格
- 调整配色
- 修改描述词
```

---

## 七、常见问题处理

### Q: 生成的 SVG 有白边/被框住
**解决**：
1. 检查 SVG 第一个 `<path>` 是否是背景矩形
2. 在 prompt 中添加 "no background, transparent background"
3. 手动移除 `fill` 属性值为背景色的 `<rect>` 或 `<path>`

### Q: SVG 颜色与页面不搭
**解决**：
1. 在 prompt 中明确指定颜色：`colors (#E2725B, #F5F1EE)`
2. 或生成后在 SVG 代码中全局替换颜色值

### Q: SVG 太复杂/太简单
**解决**：
1. 在 prompt 中添加 "simple, minimalist" 或 "detailed, intricate"
2. 调整描述词的详细程度

### Q: 图片转换失败
**解决**：
1. 确认图片 URL 可公开访问
2. 建议用户使用图床上传后重试

---

## 八、完整工作流示例

```
用户：帮我画一个手绘风格的猫，用在幻灯片里

Step 1 - 确认内容：
- 对象：猫
- 用途：幻灯片装饰
- 推荐：日式手绘风 或 线条描边风

Step 2 - 确认风格：
用户选择：线条描边风
配色：使用页面配色 #3D2C29
背景：透明

Step 3 - 构建Prompt：
A minimalist line art cat, outline only no fill,
charcoal (#3D2C29) stroke on transparent background,
clean continuous lines, simple and elegant,
suitable for presentation slide decoration

Step 4 - 调用API生成

Step 5 - 输出结果 + 融入建议
```

---

## 九、限额说明

Quiver AI API 限额：
- 20 请求 / 60 秒
- 每次请求消耗 1 credit

如遇限额，告知用户稍后重试。