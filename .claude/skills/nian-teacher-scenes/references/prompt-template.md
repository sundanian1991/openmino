# 生图提示词模板

每张图单独生成。根据当前内容替换变量，不要把多张拼在一起。

## 标准 2.0 模板

```text
Generate one standalone 16:9 horizontal Chinese article illustration in Nian Teacher Scenes 2.0 style.

Core visual DNA:
Natural outdoor scene background (forest, meadow, stream, cabin, mountain path). All scenes share consistent Ghibli-style hand-drawn illustration aesthetic with soft lines and rich colors. The scene should feel like a frame from a Studio Ghibli film: warm, natural, slightly nostalgic, with soft lighting and gentle shadows. Premium, restrained, thoughtful, clear, not cute poster, not PPT, not infographic.

Template master lock:
Use {母版文件，例如 assets/examples/03-production-alert.png} as a quality anchor, not a layout to copy. Extract only these invariants: {比例/留白/自然场景质感/年老师动作清晰/标签稀疏等不变量}. Required mutations for this image: {至少 3 个变异点：主场景类别、空间方向、年老师动作、配件、标签位置、视角或叙事重心}. Do not reproduce the master image's exact spatial topology, scene combination, prop placement, Nian Teacher pose, or label placement. The image must feel like the same quality family, but clearly be a new visual metaphor grown from the current theme.

3-second readability:
Without reading any explanation, a viewer should understand this conflict in 3 seconds: {画面 3 秒读懂句}. If the metaphor requires explanatory context, simplify or change the physical action.

Approved proportion:
The high-quality template examples are the required quality standard for restraint, whitespace, scene realism, Nian Teacher presence, label density, and color accent rhythm. The whole scene footprint should feel medium-light: about 52%-64% of canvas width and 32%-44% of canvas height for first-pass previews. Do not make it miniature. Do not make it close-up. Any single large element, such as a tree or cabin, must stay visually light and must not dominate the composition. Elements need air between them.

Scene budget:
One core natural scene only. One main natural element or one compact scene group only. At most 1 small prop for first-pass previews, 2 maximum only when necessary. At most 3 handwritten Chinese labels. Do not include every noun from the theme. Remove any element that does not serve the core natural metaphor. Avoid using the same signature prop set as the selected master.

Nian Teacher IP:
East Asian male figure with soft features, wearing square black-framed glasses, light grey-blue hoodie with hood up, black backpack. Ghibli-style hand-drawn illustration aesthetic. Calm, observant, thoughtful expression. Nian Teacher must perform the core observational action, not decorate the scene.

Theme:
{主题}

Reader situation:
{读者处境 / 痛点}

Natural metaphor:
{把抽象观点转译成的自然场景动作}

Scene composition:
{自然主场景 + 小元素 + 场景如何摆放}

Nian Teacher action:
{年老师具体正在做什么}

Handwritten Chinese labels:
{短标签1} / {短标签2} / {短标签3} / {可选短标签4}

Color accents:
Use only natural sparse accents: forest green, warm brown, sky blue, soft yellow sunlight, grey-blue for the hoodie. 4-6 accents total.

Constraints:
No UI screenshot, no app logo, no unrequested company name, no unrequested personal information, no pasted rectangular photo edge, no collage chaos. User-provided names, project names, and self-introduction facts may appear only when they are essential to the requested image. No big title. No long explanation. No workflow chart. No multiple scenes. No office room background. No dark tech background. No off-white background, no grey background, no vignette, no gradient. No concept inventory, no element checklist image. Do not copy the selected master as a topic-swap. Do not repeat its exact scene combination, left-right layout, Nian Teacher pose, prop set, or label positions. The examples are high-quality template masters and the required quality bar, not layouts to trace.
```

## 极简变体

用于封面感、强隐喻、海报式正文图：

```text
Ultra restrained Nian Teacher Scenes 2.0 variant. Keep one natural core scene, one Nian Teacher action, and 2-3 short handwritten Chinese labels. Scene still uses Ghibli-style hand-drawn illustration aesthetic with soft lines and rich colors. Preserve scene scale and breathing room. Do not explain the full system; keep one thoughtful but precise natural metaphor.
```

## 彩蛋长卷模式模板

用于个人经历、项目复盘、成长路径。核心母版是 `assets/examples/07-long-scroll-story-master.png`。目标是一条连续的自然探索线。

```text
Generate one ultra-wide horizontal Nian Teacher long-scroll story image in Nian Teacher Scenes 2.0 style.

Use the long-scroll master example assets/examples/07-long-scroll-story-master.png as the core template master and quality bar. Preserve its spatial logic and narrative rhythm, not its specific personal facts.

Core visual DNA:
An ultra-wide natural exploration long scroll, about 2.6:1 to 3:1 ratio. A thin hand-drawn black winding line travels from left to right across the whole image. Along the route, 5-8 natural scene milestone nodes appear with airy spacing and gentle vertical ups and downs. Each node has Nian Teacher physically interacting with the scene or the route. Small handwritten Chinese notes sit close to each node. The milestone nodes must not use numbers, numbered circles, step labels, or visible sequence markers; the order should feel natural through the winding route. The left side starts with identity / origin text. The right side closes with current focus / conclusion / next stage.

Strict long-scroll master layout requirements:
The route must feel hand-drawn and organic, not mathematical. Use irregular vertical rhythm and uneven node spacing: one quiet low stretch, one sudden climb, one shallow arc, one deeper dip, then an unforced right-side finish. Do not create a regular sine wave, do not alternate high-low-high-low, and do not place milestones at equal intervals. Do not align all milestones on one baseline. Keep the layout loose and balanced, with large clean white gaps between nodes; no dense cluster, no full-width scene pile, no oversized central hero object. Node copy should be handwritten directly in the open white space beside or under scenes, not inside sticky notes, cards, paper slips, labels, or caption boxes. Use colored tape, dots, and short underlines only as tiny rhythm accents, not as text containers.

Background:
Use a natural soft background, not dead pure white. Keep a subtle warm natural feeling close to #F5F5F0 or #FAFAF5. The background must still be clean, light, and high-end: no dirty grey, no cold blue, no paper texture, no heavy vignette, no poster gradient. Only very light contact shadows under scenes and Nian Teacher.

Nian Teacher IP:
East Asian male figure with soft features, wearing square black-framed glasses, light grey-blue hoodie with hood up, black backpack. Ghibli-style hand-drawn illustration aesthetic. Calm, observant, thoughtful. Nian Teacher must participate in each milestone action, not decorate the route.

Story theme:
{长卷主题}

Left opening:
{左侧身份 / 起点 / 开场文案}

Milestone nodes, written as unnumbered natural life notes:
- {节点主题} | scene: {自然场景} | Nian Teacher action: {动作} | note: {短注释}
- {节点主题} | scene: {自然场景} | Nian Teacher action: {动作} | note: {短注释}
- {节点主题} | scene: {自然场景} | Nian Teacher action: {动作} | note: {短注释}
- {节点主题} | scene: {自然场景} | Nian Teacher action: {动作} | note: {短注释}
- {节点主题} | scene: {自然场景} | Nian Teacher action: {动作} | note: {短注释}
- {可选节点}
- {可选节点}
- {可选节点}

Right closing:
{右侧现在关注 / 结论 / 下一阶段}

Color accents:
Sparse rhythm accents only: forest green, warm brown, sky blue, soft yellow sunlight, grey-blue for the hoodie. Accents should mark milestones and route rhythm, not become decoration noise.

Constraints:
Do not redesign into a timeline infographic. Do not create separate cards or modules. Do not add numbered circles, step numbers, milestone numbers, or timeline markers. Do not put every milestone note on sticky notes, paper slips, cards, flags, or boxed labels. Do not make a tight horizontal row. Do not make a regular sine-wave route. Do not make equal node spacing. Do not make one giant object dominate the whole canvas. Do not make it a PPT, poster, UI screenshot, dashboard, collage, or multiple scenes. Do not copy the original personal details unless the user is explicitly making a personal intro or provides equivalent facts to include. Keep the long-scroll master skeleton: left opening, organic winding route with irregular vertical rhythm, airy natural scene nodes, Nian Teacher at every node, freehand notes in open space, right closing, natural soft background.
```

## 多图批量生成提示

当用户要求一次生成多张，先为每张写独立主题，再逐张调用生图工具：

```text
Create 8 separate 16:9 images, one by one, not a collage. Before each image, lock one specific standard template master from assets/examples/01-06 as a quality anchor. For each image, list invariants and at least 3 required mutations so it cannot become a master-image topic swap. Maintain the same Nian Teacher Scenes 2.0 restraint, Ghibli-style hand-drawn illustration aesthetic, scene realism, sparse labels, and natural color rhythm across the series. Do not deliver the first generated candidate until it has been visually compared with the selected master and passed QA for originality, scale, and 3-second readability.
```

彩蛋长卷模式默认先生成 1 张母版效果图，确认后再迭代。

## 常用负面约束

```text
Negative for standard 16:9 mode: no UI screenshot, no phone chat interface, no code editor screenshot, no GitHub screenshot, no unrequested app logo, no unrequested company logo, no personal photo, no dense text, no huge red arrows, no PPT infographic, no formal flowchart, no business dashboard, no cute mascot, no children's cartoon, no 3D render, no dark cyberpunk, no off-white background, no grey background, no background gradient, no vignette, no paper texture, no frame, no pasted rectangular image.
Additional negative for standard mode: no concept inventory, no element checklist image, no overloaded scene, no multiple unrelated objects, no busy urban background, no office interior, no city nightscape, no cold tech aesthetic.
Anti-copy negative for standard mode: no direct master replica, no topic-swap remake of the selected example, no same forest + cabin + Nian Teacher + book arrangement, no same stream + rocks + Nian Teacher + camera arrangement, no same meadow + flowers + Nian Teacher + notebook arrangement, no same mountain path + trees + Nian Teacher + backpack arrangement.

Negative for long-scroll mode: no UI screenshot, no phone chat interface, no code editor screenshot, no unrequested app logo, no unrequested company logo, no dense text blocks, no separate cards, no boxed timeline, no numbered circles, no step numbers, no milestone numbers, no visible sequence badges, no PPT infographic, no formal flowchart, no business dashboard, no cute mascot, no children's cartoon, no dark cyberpunk, no dirty grey background, no cold blue background, no heavy vignette, no poster gradient, no paper texture, no pasted rectangular image, no multi-image collage.
```

## 局部编辑提示

去掉错误文字：

```text
Edit the provided image. Remove only the incorrect handwritten text "{错误文字}" and its underline. Replace it with clean background matching the surrounding area. Preserve all natural scenes, Nian Teacher, shadows, accents, composition, and image quality.
```

缩减复杂度：

```text
Regenerate the image with the same core metaphor, but reduce visual complexity. Keep one main natural scene, one Nian Teacher action, at most 3 short Chinese labels, 1-2 small props, and sparse natural color accents. Preserve medium scene coverage and airy spacing.
```

修正年老师：

```text
Keep the scene and elements similar, but adjust Nian Teacher only: make it a recognizable East Asian male figure with soft features, square black-framed glasses, light grey-blue hoodie with hood up, black backpack, calm observant expression, Ghibli-style hand-drawn illustration aesthetic. It can be subtly different for the action, but must not become a cute mascot or cartoon character.
```
