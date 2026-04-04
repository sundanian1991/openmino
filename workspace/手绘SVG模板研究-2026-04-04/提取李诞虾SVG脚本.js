const fs = require('fs');

const html = fs.readFileSync('/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/已归档/2026-W12/李诞养虾指南/李诞养虾指南_日式手绘风格.html', 'utf-8');

const svgRegex = /<svg[^>]*>[\s\S]*?<\/svg>/g;
const svgs = html.match(svgRegex) || [];

console.log(`李诞虾: 找到 ${svgs.length} 个SVG\n`);

svgs.forEach((svg, index) => {
  const pathCount = (svg.match(/<path/g) || []).length;
  const viewBoxMatch = svg.match(/viewBox="([^"]+)"/);
  const viewBox = viewBoxMatch ? viewBoxMatch[1] : 'unknown';
  
  // 获取class或id来判断用途
  const classMatch = svg.match(/class="([^"]+)"/);
  const className = classMatch ? classMatch[1] : '';
  
  console.log(`SVG #${index + 1}: ${pathCount} paths, viewBox: ${viewBox}, class: ${className}`);
  
  fs.writeFileSync(
    `/Users/sundanian/Documents/projects/ai-agents/my-agent/workspace/手绘SVG模板研究-2026-04-04/shrimp-svg-${index + 1}-${pathCount}paths.svg`,
    svg
  );
});

console.log('\n✅ 李诞虾SVG提取完成');
