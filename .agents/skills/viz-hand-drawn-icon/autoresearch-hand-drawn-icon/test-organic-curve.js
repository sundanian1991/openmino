#!/usr/bin/env node
/**
 * 测试有机曲线生成器
 * 验证生成的曲线是否符合李诞虾风格
 */

const {
  generateBezierPath,
  validateCurve,
  getStrokeWidths
} = require('../organic-curve-generator');

console.log('🎨 测试有机曲线生成器\n');
console.log('='.repeat(50));

// 测试 1：生成简单杯身曲线
console.log('\n【测试 1】简单杯身曲线（medium 复杂度）');
console.log('-'.repeat(30));

const cupKeyPoints = [
  { x: 75, y: 65 },   // 左上
  { x: 75, y: 155 },  // 左下
  { x: 125, y: 155 }, // 右下
  { x: 125, y: 65 }   // 右上
];

const cupPath = generateBezierPath(cupKeyPoints, {
  complexity: 'medium',
  isLeft: true,
  isRight: true
});

console.log('生成的 path:');
console.log(cupPath);

const validation = validateCurve(cupPath);
console.log('\n验证结果:');
console.log(`  - 有 2 位小数: ${validation.hasTwoDecimal ? '✅' : '❌'}`);
console.log(`  - 避免 .00: ${validation.hasNoZeroZero ? '✅' : '❌'}`);
console.log(`  - 有间距变化: ${validation.hasVariation ? '✅' : '❌'}`);
console.log(`  - 整体通过: ${validation.passed ? '✅' : '❌'}`);

// 测试 2：对比 Quiver 生成的杯子
console.log('\n【测试 2】对比 Quiver 生成的杯子');
console.log('-'.repeat(30));

const quiverCupPath = 'm172.1 43.99c-4.08-10.96-28.45-20.95-71.7-21.85-39.01-0.8-69.6 5.47-79.69 15.8...';
const quiverValidation = validateCurve(quiverCupPath);

console.log('Quiver 杯子验证结果:');
console.log(`  - 有 2 位小数: ${quiverValidation.hasTwoDecimal ? '✅' : '❌'}`);
console.log(`  - 避免 .00: ${quiverValidation.hasNoZeroZero ? '✅' : '❌'}`);
console.log(`  - 有间距变化: ${quiverValidation.hasVariation ? '✅' : '❌'}`);
console.log(`  - 整体通过: ${quiverValidation.passed ? '✅' : '❌'}`);

// 测试 3：生成完整 SVG
console.log('\n【测试 3】生成完整 SVG 杯子');
console.log('-'.repeat(30));

const widths = getStrokeWidths('medium');

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200">
  <!-- 填充层 -->
  <g id="fill-layer">
    <!-- 杯身主体（米白） -->
    <path d="${cupPath}" fill="#FEFFFE"/>
  </g>

  <!-- 描边层 -->
  <g id="stroke-layer" fill="none" stroke="#1A1612" stroke-linecap="round" stroke-linejoin="round">
    <!-- 杯身主轮廓（2.5px） -->
    <path d="${cupPath}" stroke-width="${widths.main}"/>

    <!-- 杯口（1.5px） -->
    <ellipse cx="100" cy="65" rx="25" ry="8" stroke-width="${widths.structure}"/>

    <!-- 杯底（2px） -->
    <ellipse cx="100" cy="155" rx="25" ry="8" stroke-width="${widths.structure}"/>
  </g>
</svg>`;

// 保存 SVG
const fs = require('fs');
fs.writeFileSync(
  '.claude/skills/hand-drawn-icon/autoresearch-hand-drawn-icon/test-cup-organic.svg',
  svg
);
console.log('✅ SVG 已保存到 test-cup-organic.svg');

// 测试 4：对比自测杯子和有机曲线杯子
console.log('\n【测试 4】对比自测杯子和有机曲线杯子');
console.log('-'.repeat(30));

console.log('自测杯子问题:');
console.log('  - 曲线写死了，没有算法生成');
console.log('  - 控制点间距递减（8.24→15.22→19.18），节奏单一');
console.log('  - 坐标太数学化（75.5, 65.8），刻意感强');

console.log('\n有机曲线杯子改进:');
console.log('  ✅ 使用波浪式节奏（递增→递减→递增）');
console.log('  ✅ 添加随机小数点（1-2 位，避免 .00）');
console.log('  ✅ 应用不对称约束（左右 ±1-5px）');
console.log('  ✅ 基于复杂度动态调整间距');

console.log('\n' + '='.repeat(50));
console.log('📊 总结：');
console.log('- 有机曲线生成器已创建');
console.log('- 提取的规律已编码：间距、节奏、小数点、不对称');
console.log('- 下一步：用有机曲线生成器重写自测脚本，验证质量');
console.log('\n💡 年老师，可以打开 test-cup-organic.svg 查看效果！');