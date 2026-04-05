#!/usr/bin/env node
/**
 * 有机曲线生成器 — Organic Curve Generator
 *
 * 基于 4 个 SVG 样本提取的规律，生成李诞虾风格的贝塞尔曲线
 *
 * 核心规律：
 * 1. 控制点间距 = 复杂度倒数的函数
 * 2. 间距变化 = 波浪式节奏（递增→递减→递增）
 * 3. 小数点 = 1-2 位随机（避免 .00）
 * 4. 线条粗细 = 物体大小的函数
 * 5. 不对称约束 = 左右 ±(1-5px) 偏差
 */

// ============================================
// 核心算法层
// ============================================

/**
 * 获取基础间距（基于复杂度）
 */
function getBaseSpacing(complexity = 'medium') {
  const spacing = {
    simple: { min: 20, max: 50, avg: 35 },
    medium: { min: 10, max: 30, avg: 20 },
    complex: { min: 2, max: 15, avg: 8 }
  };
  return spacing[complexity];
}

/**
 * 生成下一个间距（波浪式节奏）
 * @param {number} prevSpacing - 上一个间距
 * @param {string} trend - 'increasing' | 'decreasing' | 'switch'
 * @param {number} variationRate - 变化率（默认 0.3 = 30% 波动）
 */
function getNextSpacing(prevSpacing, trend = 'switch', variationRate = 0.3) {
  const variation = prevSpacing * variationRate;
  let direction;

  if (trend === 'switch') {
    // 随机切换方向，但倾向于延续（70% 概率）
    direction = Math.random() > 0.7 ? 1 : -1;
  } else {
    direction = trend === 'increasing' ? 1 : -1;
  }

  const delta = direction * variation * Math.random();
  const next = prevSpacing + delta;

  // 确保不小于 1
  return Math.max(1, next);
}

/**
 * 添加随机小数点（1-2 位，避免 .00）
 */
function addRandomDecimal(num) {
  // 70% 概率 2 位小数，30% 概率 1 位小数
  const decimalPlaces = Math.random() > 0.3 ? 2 : 1;
  return parseFloat(num.toFixed(decimalPlaces));
}

/**
 * 添加不对称约束（左右 ±(1-5px) 偏差）
 */
function addAsymmetry(coord, isLeft = false, isRight = false) {
  if (!isLeft && !isRight) return coord;
  const deviation = (Math.random() * 4 + 1) * (isLeft ? 1 : -1);
  return addRandomDecimal(coord + deviation);
}

/**
 * 生成控制点序列（关键点之间的中间点）
 * @param {Object} start - 起始点 {x, y}
 * @param {Object} end - 结束点 {x, y}
 * @param {Object} options - 选项 {complexity, numControlPoints, isLeft, isRight}
 */
function generateControlPoints(start, end, options = {}) {
  const {
    complexity = 'medium',
    numControlPoints = 3,
    isLeft = false,
    isRight = false
  } = options;

  const baseSpacing = getBaseSpacing(complexity);
  const controlPoints = [];
  let current = { ...start };
  let trend = Math.random() > 0.5 ? 'increasing' : 'decreasing';
  let currentSpacing = baseSpacing.avg;

  // 计算总距离
  const totalDist = Math.sqrt(
    Math.pow(end.x - start.x, 2) + Math.pow(end.y - start.y, 2)
  );

  // 生成控制点
  for (let i = 0; i < numControlPoints; i++) {
    // 计算方向向量
    const progress = (i + 1) / (numControlPoints + 1);
    const idealX = start.x + (end.x - start.x) * progress;
    const idealY = start.y + (end.y - start.y) * progress;

    // 添加随机偏移（垂直于主方向）
    const angle = Math.atan2(end.y - start.y, end.x - start.x);
    const perpendicular = angle + Math.PI / 2;
    const offset = (Math.random() - 0.5) * totalDist * 0.15; // 15% 的垂直偏移

    const offsetX = Math.cos(perpendicular) * offset;
    const offsetY = Math.sin(perpendicular) * offset;

    // 应用不对称约束
    const x = addAsymmetry(idealX + offsetX, isLeft, isRight);
    const y = addAsymmetry(idealY + offsetY, isLeft, isRight);

    controlPoints.push({ x, y });

    // 更新趋势（每 2 个点切换一次）
    if (i % 2 === 0) {
      trend = trend === 'increasing' ? 'decreasing' : 'increasing';
    }

    // 更新当前间距
    currentSpacing = getNextSpacing(currentSpacing, trend);
  }

  return controlPoints;
}

/**
 * 生成贝塞尔曲线 d 属性
 * @param {Array} keyPoints - 关键点数组 [{x, y}, ...]
 * @param {Object} options - 选项 {complexity, isLeft, isRight}
 */
function generateBezierPath(keyPoints, options = {}) {
  if (keyPoints.length < 2) {
    throw new Error('至少需要 2 个关键点');
  }

  const { complexity = 'medium', isLeft = false, isRight = false } = options;
  const startX = addRandomDecimal(keyPoints[0].x);
  const startY = addRandomDecimal(keyPoints[0].y);
  let d = `m${startX} ${startY}`;

  for (let i = 0; i < keyPoints.length - 1; i++) {
    const start = keyPoints[i];
    const end = keyPoints[i + 1];

    // 生成控制点
    const numControlPoints = complexity === 'complex' ? 4 :
                            complexity === 'simple' ? 2 : 3;
    const controlPoints = generateControlPoints(start, end, {
      complexity,
      numControlPoints,
      isLeft,
      isRight
    });

    // 构建 cubic bezier 命令 (C x1 y1, x2 y2, x y)
    if (controlPoints.length >= 2) {
      d += `c${addRandomDecimal(controlPoints[0].x - start.x)} ${addRandomDecimal(controlPoints[0].y - start.y)}`;
      d += ` ${addRandomDecimal(controlPoints[1].x - controlPoints[0].x)} ${addRandomDecimal(controlPoints[1].y - controlPoints[0].y)}`;
      d += ` ${addRandomDecimal(end.x - controlPoints[1].x)} ${addRandomDecimal(end.y - controlPoints[1].y)}`;
    }
  }

  return d;
}

// ============================================
// 线条粗细系统
// ============================================

/**
 * 获取线条粗细（基于物体大小）
 */
function getStrokeWidths(size = 'medium') {
  const widths = {
    small: { main: 1.5, structure: 1.0, detail: 0.7 },
    medium: { main: 3.0, structure: 2.0, detail: 1.0 },
    large: { main: 5.0, structure: 3.5, detail: 2.0 }
  };
  return widths[size];
}

// ============================================
// 验证工具
// ============================================

/**
 * 验证生成的曲线是否符合李诞虾风格
 */
function validateCurve(d) {
  const matches = d.match(/[cm][0-9.-]+/g);
  if (!matches) return false;

  // 提取所有数值
  const numbers = [];
  for (const match of matches) {
    const nums = match.substring(1).split(/[\s,]+/).filter(n => n !== '');
    numbers.push(...nums.map(parseFloat));
  }

  // 检查小数点
  const hasTwoDecimal = numbers.some(n => {
    const str = n.toString();
    return str.includes('.') && str.split('.')[1].length === 2;
  });

  // 检查避免 .00
  const hasNoZeroZero = !numbers.some(n => {
    const str = n.toString();
    return str.endsWith('.00') || str === '0.00';
  });

  // 检查间距变化（至少有 2 个不同的间距）
  const spacings = [];
  for (let i = 0; i < numbers.length - 1; i += 2) {
    const dist = Math.sqrt(
      Math.pow(numbers[i + 2] - numbers[i], 2) +
      Math.pow(numbers[i + 3] - numbers[i + 1], 2)
    );
    spacings.push(dist);
  }
  const uniqueSpacings = new Set(spacings.map(s => s.toFixed(1))).size;
  const hasVariation = uniqueSpacings > 2;

  return {
    hasTwoDecimal,
    hasNoZeroZero,
    hasVariation,
    passed: hasTwoDecimal && hasNoZeroZero && hasVariation
  };
}

// ============================================
// 导出
// ============================================

module.exports = {
  // 核心算法
  generateControlPoints,
  generateBezierPath,

  // 配置系统
  getBaseSpacing,
  getNextSpacing,
  addRandomDecimal,
  addAsymmetry,
  getStrokeWidths,

  // 验证工具
  validateCurve
};