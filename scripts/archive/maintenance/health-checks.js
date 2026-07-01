#!/usr/bin/env node

/**
 * L3 智能自动层 - 健康检查脚本
 *
 * 功能：
 * 1. Orphan Notes 检测（无 incoming links 的笔记）
 * 2. Stale Notes 检测（30+ 天未更新且连接稀疏的笔记）
 * 3. Dangling Links 检测（wiki links 指向不存在的文件）
 * 4. 健康分数计算（0-100 分）
 * 5. JSON 格式输出与修复建议生成
 */

const fs = require('fs');
const path = require('path');

// ==================== 配置 ====================
const STALE_THRESHOLD_DAYS = 30;
const MIN_CONNECTIONS = 2;
// 支持多个笔记目录
const NOTE_DIRS = [
  path.join(process.cwd(), 'memory'),
  path.join(process.cwd(), 'notes'),
  path.join(process.cwd(), 'docs')
];
const OUTPUT_FILE = path.join(process.cwd(), 'ops/queue/health-report.json');

// ==================== 工具函数 ====================

/**
 * 提取 Wiki-links
 * @param {string} content - 文件内容
 * @returns {string[]} - 提取的链接数组
 */
function extractWikiLinks(content) {
  const wikiLinkRegex = /\[\[([^\]]+)\]\]/g;
  const links = [];
  let match;
  while ((match = wikiLinkRegex.exec(content)) !== null) {
    links.push(match[1]);
  }
  return links;
}

/**
 * 读取 Markdown 文件的前置元数据
 * @param {string} filePath - 文件路径
 * @returns {object|null} - YAML frontmatter 解析结果
 */
function readFrontmatter(filePath) {
  try {
    const content = fs.readFileSync(filePath, 'utf-8');
    const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---/);
    if (!frontmatterMatch) return null;

    const yaml = frontmatterMatch[1];
    const result = {};
    yaml.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length > 0) {
        result[key.trim()] = valueParts.join(':').trim();
      }
    });
    return result;
  } catch (error) {
    return null;
  }
}

/**
 * 计算文件年龄（天数）
 * @param {string} filePath - 文件路径
 * @returns {number} - 文件年龄（天）
 */
function getFileAgeDays(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const createdTime = stats.birthtimeMs;
    const now = Date.now();
    return Math.floor((now - createdTime) / (1000 * 60 * 60 * 24));
  } catch (error) {
    return 0;
  }
}

/**
 * 获取文件最后修改时间（天数）
 * @param {string} filePath - 文件路径
 * @returns {number} - 最后修改至今的天数
 */
function getDaysSinceModified(filePath) {
  try {
    const stats = fs.statSync(filePath);
    const modifiedTime = stats.mtimeMs;
    const now = Date.now();
    return Math.floor((now - modifiedTime) / (1000 * 60 * 60 * 24));
  } catch (error) {
    return 0;
  }
}

/**
 * 构建链接图（谁引用了谁）
 * @param {Map<string, object>} notes - 笔记 Map
 * @returns {Map<string, string[]>} - 链接图（noteName -> [引用它的 notes]）
 */
function buildLinkGraph(notes) {
  const linkGraph = new Map();

  for (const [filePath, note] of notes) {
    const incomingLinks = linkGraph.get(note.name) || [];

    for (const link of note.links) {
      // 找到被引用的 note
      const targetNote = Array.from(notes.values()).find(
        n => n.name.toLowerCase() === link.toLowerCase() ||
             n.relativePath.toLowerCase().includes(link.toLowerCase())
      );

      if (targetNote) {
        const targetIncoming = linkGraph.get(targetNote.name) || [];
        if (!targetIncoming.includes(note.name)) {
          targetIncoming.push(note.name);
          linkGraph.set(targetNote.name, targetIncoming);
        }
      }
    }
  }

  return linkGraph;
}

// ==================== 核心检测函数 ====================

/**
 * 扫描所有笔记
 * @returns {Map<string, object>} - 笔记 Map (filePath -> note 对象)
 */
function scanNotes() {
  const notes = new Map();

  // 扫描所有配置的笔记目录
  for (const dir of NOTE_DIRS) {
    if (!fs.existsSync(dir)) {
      continue;
    }

    function scanDir(dir) {
      const files = fs.readdirSync(dir);
      for (const file of files) {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
          scanDir(filePath);
        } else if (file.endsWith('.md')) {
          const content = fs.readFileSync(filePath, 'utf-8');
          const frontmatter = readFrontmatter(filePath);
          const links = extractWikiLinks(content);

          notes.set(filePath, {
            name: path.basename(file, '.md'),
            relativePath: path.relative(process.cwd(), filePath),
            content,
            links,
            frontmatter,
            ageDays: getFileAgeDays(filePath),
            daysSinceModified: getDaysSinceModified(filePath)
          });
        }
      }
    }

    scanDir(dir);
  }

  return notes;
}

/**
 * 检测 Orphan Notes（无 incoming links）
 * @param {Map<string, object>} notes - 笔记 Map
 * @param {Map<string, string[]>} linkGraph - 链接图
 * @returns {object[]} - Orphan Notes 列表
 */
function findOrphanNotes(notes, linkGraph) {
  const orphans = [];

  for (const [filePath, note] of notes) {
    // 跳过索引页和 MOCs
    if (note.name.toLowerCase().includes('index') ||
        note.name.toLowerCase().includes('moc')) {
      continue;
    }

    const incomingLinks = linkGraph.get(note.name) || [];
    if (incomingLinks.length === 0) {
      orphans.push({
        path: note.relativePath,
        name: note.name,
        ageDays: note.ageDays,
        links: note.links.length
      });
    }
  }

  return orphans;
}

/**
 * 检测 Stale Notes（30+ 天未更新且连接稀疏）
 * @param {Map<string, object>} notes - 笔记 Map
 * @param {Map<string, string[]>} linkGraph - 链接图
 * @returns {object[]} - Stale Notes 列表
 */
function findStaleNotes(notes, linkGraph) {
  const stale = [];

  for (const [filePath, note] of notes) {
    // 跳过索引页和 MOCs
    if (note.name.toLowerCase().includes('index') ||
        note.name.toLowerCase().includes('moc')) {
      continue;
    }

    const incomingLinks = linkGraph.get(note.name) || [];
    const isStale = note.daysSinceModified >= STALE_THRESHOLD_DAYS;
    const hasFewConnections = incomingLinks.length < MIN_CONNECTIONS;

    if (isStale && hasFewConnections) {
      stale.push({
        path: note.relativePath,
        name: note.name,
        daysSinceModified: note.daysSinceModified,
        incomingLinks: incomingLinks.length,
        outgoingLinks: note.links.length
      });
    }
  }

  return stale;
}

/**
 * 检测 Dangling Links（指向不存在文件的 wiki links）
 * @param {Map<string, object>} notes - 笔记 Map
 * @returns {object[]} - Dangling Links 列表
 */
function findDanglingLinks(notes) {
  const dangling = [];
  const existingNames = new Set(Array.from(notes.values()).map(n => n.name.toLowerCase()));
  const existingPaths = new Set(Array.from(notes.values()).map(n => n.relativePath.toLowerCase()));

  for (const [filePath, note] of notes) {
    for (const link of note.links) {
      const linkName = link.toLowerCase();
      // 检查 note name 或 relative path 是否匹配
      const nameMatch = existingNames.has(linkName);
      // 检查是否有任何文件的 relative path 包含这个链接
      const pathMatch = Array.from(notes.values()).some(n =>
        n.relativePath.toLowerCase().includes(linkName) ||
        linkName.includes(n.name.toLowerCase())
      );

      if (!nameMatch && !pathMatch) {
        dangling.push({
          sourcePath: note.relativePath,
          sourceName: note.name,
          targetLink: link,
          lineNumber: note.content.split('\n').findIndex(line => line.includes(`[[${link}]]`)) + 1
        });
      }
    }
  }

  return dangling;
}

/**
 * 计算健康分数
 * @param {number} total - 总笔记数
 * @param {number} orphans - Orphan Notes 数
 * @param {number} stale - Stale Notes 数
 * @param {number} dangling - Dangling Links 数
 * @returns {number} - 健康分数（0-100）
 */
function calculateHealthScore(total, orphans, stale, dangling) {
  if (total === 0) return 100;

  const orphanRate = orphans / total;
  const staleRate = stale / total;
  const danglingRate = dangling / total;

  // 权重：orphan 30%, stale 40%, dangling 30%
  const score = 100 - (orphanRate * 30 + staleRate * 40 + danglingRate * 30) * 100;
  return Math.max(0, Math.min(100, Math.round(score)));
}

/**
 * 生成修复建议
 * @param {object[]} orphans - Orphan Notes 列表
 * @param {object[]} stale - Stale Notes 列表
 * @param {object[]} dangling - Dangling Links 列表
 * @returns {object[]} - 修复建议列表
 */
function generateRecommendations(orphans, stale, dangling) {
  const recommendations = [];

  // Orphan Notes 修复建议
  if (orphans.length > 0) {
    recommendations.push({
      type: 'orphan_notes',
      priority: orphans.length > 5 ? 'high' : 'medium',
      action: 'connect',
      description: `${orphans.length} 个笔记没有 incoming links`,
      affected: orphans.slice(0, 5).map(o => o.path),
      suggestion: `运行 /connect 命令或手动添加 wiki links 从其他笔记引用这些笔记`
    });
  }

  // Stale Notes 修复建议
  if (stale.length > 0) {
    recommendations.push({
      type: 'stale_notes',
      priority: stale.length > 10 ? 'high' : 'medium',
      action: 'maintain',
      description: `${stale.length} 个笔记超过 ${STALE_THRESHOLD_DAYS} 天未更新且连接稀疏`,
      affected: stale.slice(0, 5).map(s => s.path),
      suggestion: `运行 /maintain 命令审查这些笔记，更新内容或归档`
    });
  }

  // Dangling Links 修复建议
  if (dangling.length > 0) {
    recommendations.push({
      type: 'dangling_links',
      priority: dangling.length > 3 ? 'high' : 'low',
      action: 'fix_manually',
      description: `${dangling.length} 个 wiki links 指向不存在的文件`,
      affected: dangling.slice(0, 5).map(d => `${d.sourcePath}#${d.targetLink}`),
      suggestion: `创建缺失的笔记或移除无效的 wiki links`
    });
  }

  return recommendations;
}

// ==================== 主函数 ====================

function main() {
  console.log('🔍 运行健康检查...');

  // 扫描笔记
  const notes = scanNotes();
  if (notes.size === 0) {
    console.error('❌ 没有找到任何笔记');
    process.exit(1);
  }

  console.log(`📊 扫描到 ${notes.size} 个笔记`);

  // 构建链接图
  const linkGraph = buildLinkGraph(notes);

  // 执行检测
  const orphans = findOrphanNotes(notes, linkGraph);
  const stale = findStaleNotes(notes, linkGraph);
  const dangling = findDanglingLinks(notes);

  // 计算健康分数
  const healthScore = calculateHealthScore(notes.size, orphans.length, stale.length, dangling.length);

  // 生成修复建议
  const recommendations = generateRecommendations(orphans, stale, dangling);

  // 构建报告
  const report = {
    timestamp: new Date().toISOString(),
    summary: {
      totalNotes: notes.size,
      healthScore,
      orphans: orphans.length,
      stale: stale.length,
      dangling: dangling.length
    },
    details: {
      orphans,
      stale,
      dangling
    },
    recommendations
  };

  // 输出报告
  const outputDir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(report, null, 2));
  console.log(`✅ 健康报告已保存到：${OUTPUT_FILE}`);

  // 输出摘要
  console.log('\n📋 健康摘要:');
  console.log(`  总笔记数：${notes.size}`);
  console.log(`  健康分数：${healthScore}/100`);
  console.log(`  Orphan Notes: ${orphans.length}`);
  console.log(`  Stale Notes: ${stale.length}`);
  console.log(`  Dangling Links: ${dangling.length}`);

  if (recommendations.length > 0) {
    console.log('\n⚠️  需要关注的项:');
    recommendations.forEach(rec => {
      console.log(`  [${rec.priority.toUpperCase()}] ${rec.description}`);
      console.log(`    建议：${rec.suggestion}`);
    });
  } else {
    console.log('\n✅ 图谱健康状况良好');
  }

  // 返回报告路径供 Hook 使用
  console.log(`\n📄 REPORT_PATH=${OUTPUT_FILE}`);
}

// 执行
main();
