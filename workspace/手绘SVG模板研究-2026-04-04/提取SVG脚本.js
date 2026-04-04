const fs = require('fs');

const html = fs.readFileSync('/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/已归档/2026-W12/手绘实验/东京猫.html', 'utf-8');

// 提取所有SVG
const svgRegex = /<svg[^>]*>[\s\S]*?<\/svg>/g;
const svgs = html.match(svgRegex) || [];

console.log(`找到 ${svgs.length} 个SVG`);

svgs.forEach((svg, index) => {
  // 统计path数量
  const pathCount = (svg.match(/<path/g) || []).length;
  
  // 获取viewBox
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : 'unknown';
  
  // 获取width/height
  const widthMatch = svg.match(/width="([^"]+)"/);
  const heightMatch = svg.match(/height="([^"]+)"/);
  const size = `${widthMatch?.[1] || '?'}x${heightMatch?.[1] || '?'}`;
  
  console.log(`\nSVG #${index + 1}:`);
  console.log(`  尺寸: ${size}`);
  console.log(`  viewBox: ${viewBox}`);
  console.log(`  path数量: ${pathCount}`);
  
  // 保存到文件
  const filename = `svg-${index + 1}-${pathCount}paths.svg`;
  fs.writeFileSync(
    `/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/手绘SVG模板研究-2026-04-04/${filename}`,
    svg
  );
  console.log(`  → 保存为: ${filename}`);
});

console.log('\n✅ 提取完成');
