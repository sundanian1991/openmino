/**
 * nian-design Token 替换映射表
 * 用于将独立 token 统一替换为标准 Nian 14 色
 */

// 常见独立 token → 标准 Nian 14 色映射
const TOKEN_MAP = {
  // === 背景色 ===
  '--sf': '--surface',                    // surface #FFFFFF
  '--sr': '--bg-alt',                    // 替代背景 #F8F7F5
  '--bg-alt': '#F8F7F5',

  // === 边框色 ===
  '--bd': '--border',                    // #E8E5E0 → #E5E5E0

  // === 文字色 ===
  '--td': '--text-display',              // #1A1A1A → #2C2C2C
  '--tp': '--text-primary',              // #1A1A1A
  '--ts': '--text-secondary',            // #6B6B6B
  '--tda': '--text-disabled',            // #A0A0A0

  // === 字体 ===
  '--fd': '--font-display',
  '--fb': '--font-body',
  '--fm': '--font-mono',

  // === 间距（命名不统一的需手动检查）===
  '--s1': '--space-xs',                  // 4px
  '--s2': '--space-sm',                  // 8px
  '--s3': '12px',                        // 12px 需手动添加
  '--s4': '--space-md',                  // 16px
  '--s5': '20px',                        // 20px 需手动添加
  '--s6': '--space-lg',                  // 24px
  '--s8': '--space-xl',                  // 32px
  '--s10': '40px',                       // 40px 需手动添加
  '--s12': '--space-2xl',                // 48px
  '--s16': '64px',                       // 64px 需手动添加
  '--s20': '80px',                       // 80px 需手动添加
  '--s24': '--space-4xl',                // 96px

  // === 字号（命名不统一的需手动检查）===
  '--xs': '--text-xs',                   // 10px
  '--sm': '--text-sm',                   // 12px
  '--base': '--text-base',               // 14px
  '--lg': '--text-lg',                   // 16px
  '--xl': '--text-xl',                   // 20px
  '--2xl': '--text-2xl',                 // 24px
  '--3xl': '--text-3xl',                 // 32px
  '--4xl': '--text-4xl',                 // 48px
  '--5xl': '--text-5xl',                 // 64px

  // === 特殊色 ===
  '--org': '--org',                      // 保持不变 #E55B2B
  '--earth': '--earth',                  // 保持不变 #8B7355

  // === 其他 ===
  '--r4': '--radius-sm',                 // 4px
  '--eo': '--ease-out',
  '--df': '--dur-fast',
  '--dn': '--dur-normal',
};

// 完整的标准 Nian 14 色变量（用于替换时生成新的 :root）
const STANDARD_VARS = `:root{
  --bg:#FAFAF8;--sf:#FFFFFF;--sf-alt:#F5F5F0;--bd:#E5E5E0;--bd-s:#C0C0B8;
  --td:#2C2C2C;--tp:#1A1A1A;--ts:#6B6B6B;--tda:#A0A0A0;
  --glacier:#2A4A5A;--olive:#4A5D3A;--moss:#7A9B6D;--org:#E55B2B;--red:#D9433A;
  --sky:#4A80C0;--gold:#C4A44A;
  --fd:'Playfair Display',Georgia,'Times New Roman',serif;
  --fb:'Inter',-apple-system,'Helvetica Neue',Arial,sans-serif;
  --fm:'JetBrains Mono','SF Mono',monospace;
  --s-xs:4px;--s-sm:8px;--s-md:16px;--s-lg:24px;--s-xl:32px;--s-2xl:48px;--s-3xl:64px;--s-4xl:96px;
  --r-sm:4px;--r-md:8px;--c-max:1120px;--pad:32px
}`;

// 需要批量替换的文件列表
const FILES_TO_FIX = [
  // R 系列
  '.claude/skills/nian-design/references/showcase/R/R1-FT粉红图表.html',
  '.claude/skills/nian-design/references/showcase/R/R1-数据分析报告-split.html',
  '.claude/skills/nian-design/references/showcase/R/R1-数据叙事-pulse.html',
  '.claude/skills/nian-design/references/showcase/R/R1-数据形式展示.html',
  '.claude/skills/nian-design/references/showcase/R/R1-数据看板.html',
  '.claude/skills/nian-design/references/showcase/R/R2-定价分析.html',
  '.claude/skills/nian-design/references/showcase/R/R2-方案选型评估.html',
  '.claude/skills/nian-design/references/showcase/R/R3-品牌声明.html',
  '.claude/skills/nian-design/references/showcase/R/R3-品牌展示.html',
  '.claude/skills/nian-design/references/showcase/R/R4-供应商月度-带简报.html',
  '.claude/skills/nian-design/references/showcase/R/R4-供应商管理体系.html',
  '.claude/skills/nian-design/references/showcase/R/R4-工作汇报-diagonal.html',
  '.claude/skills/nian-design/references/showcase/R/R4-风险预警-标杆.html',

  // H 系列
  '.claude/skills/nian-design/references/showcase/H/H001-品牌展示.html',
  '.claude/skills/nian-design/references/showcase/H/H002-数据看板.html',
  '.claude/skills/nian-design/references/showcase/H/H003-深度阅读.html',
  '.claude/skills/nian-design/references/showcase/H/H004-供应商管理.html',
  '.claude/skills/nian-design/references/showcase/H/H005-自主系统.html',
  '.claude/skills/nian-design/references/showcase/H/H006-工作汇报.html',
  // ... 更多文件
];

module.exports = { TOKEN_MAP, STANDARD_VARS, FILES_TO_FIX };
