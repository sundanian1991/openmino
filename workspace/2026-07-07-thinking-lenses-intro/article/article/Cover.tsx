// Cover.tsx —— 思维透镜介绍页封面
// 构图：25 个透镜节点矩阵（5×5 网格）+ 5 家族色带 + 技能名
// 风格：press 编辑感，氧化血红 accent，以线代框

export function Cover() {
  return (
    <section
      className="ra-cover"
      aria-label="文章封面"
      data-ra-cover=""
      style={{
        position: "relative",
        width: "100%",
        maxWidth: "min(100%, 48rem, calc((100vh - 8rem) * 3 / 4))",
        margin: "0 auto var(--ra-space-7, 3rem) auto",
        aspectRatio: "3 / 4",
        overflow: "hidden",
        background: "transparent",
        color: "var(--ra-color-fg, inherit)",
        borderRadius: "var(--ra-radius-md, 0)",
        border: "1px solid var(--ra-color-border, currentColor)",
        isolation: "isolate",
      }}
    >
      <CoverContent />
    </section>
  );
}

function CoverContent() {
  // 25 个透镜的唯一缩写（5×5 网格），按 5 家族分组
  // 行1 诊断组：Doctor / Journalist / Accountant / Hacker / Plumber
  // 行2 推演组：Chess / Engineer / Economist / Philosopher / Architect
  // 行3 共情组：Sales / Anthrop / Psych / Teacher / Politician
  // 行4 构建组：Program / Designer / Novelist / Entrepre / Actor
  // 行5 验证组：Math / Scientist / Critic / Soldier (+ Hacker 跨类，这里用唯一标记)
  const lenses = [
    "Dc", "Jr", "Ac", "Hk", "Pl",
    "Ch", "En", "Ec", "Ph", "Ar",
    "Sp", "An", "Py", "Te", "Po",
    "Pg", "De", "No", "Ep", "Ac",
    "Mt", "Sc", "Cr", "Sl", "Hb",
  ];
  // 家族色（用 --ra-* token 派生，不引入新色）
  const families = [
    { label: "诊断", tone: "var(--ra-color-accent, #8B2C2C)" },
    { label: "推演", tone: "var(--ra-color-fg, #2a2a2a)" },
    { label: "共情", tone: "var(--ra-color-accent, #8B2C2C)" },
    { label: "构建", tone: "var(--ra-color-fg, #2a2a2a)" },
    { label: "验证", tone: "var(--ra-color-accent, #8B2C2C)" },
  ];

  return (
    <>
      {/* 上半部：25 透镜网格 */}
      <svg
        viewBox="0 0 600 720"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "62%",
          color: "var(--ra-color-border, currentColor)",
          zIndex: 0,
        }}
      >
        {/* 5 列引导线 */}
        {[120, 220, 320, 420, 520].map((x) => (
          <line
            key={`v-${x}`}
            x1={x}
            y1={80}
            x2={x}
            y2={660}
            stroke="currentColor"
            strokeWidth="0.5"
            opacity="0.25"
          />
        ))}
        {/* 顶部家族色带 */}
        {families.map((f, i) => (
          <rect
            key={`fam-${i}`}
            x={70 + i * 100}
            y={40}
            width={100}
            height={3}
            fill={f.tone}
            opacity={i % 2 === 0 ? 0.85 : 0.4}
          />
        ))}
        {/* 25 节点：5 行 × 5 列 */}
        {lenses.map((label, idx) => {
          const row = Math.floor(idx / 5);
          const col = idx % 5;
          const cx = 120 + col * 100;
          const cy = 120 + row * 110;
          const isAccent = row % 2 === 0;
          return (
            <g key={`lens-${idx}`}>
              <circle
                cx={cx}
                cy={cy}
                r={26}
                fill="none"
                stroke={isAccent ? "var(--ra-color-accent, #8B2C2C)" : "currentColor"}
                strokeWidth={isAccent ? 1.4 : 0.8}
                opacity={isAccent ? 0.9 : 0.55}
              />
              <circle
                cx={cx}
                cy={cy}
                r={3}
                fill="var(--ra-color-accent, #8B2C2C)"
                opacity={isAccent ? 0.85 : 0.4}
              />
              <text
                x={cx}
                y={cy + 48}
                textAnchor="middle"
                fontSize="13"
                fontFamily="var(--ra-font-mono, monospace)"
                fill="var(--ra-color-muted, currentColor)"
                opacity="0.7"
                letterSpacing="0.05em"
              >
                {label}
              </text>
            </g>
          );
        })}
        {/* 底部收束线 */}
        <line
          x1={70}
          y1={685}
          x2={530}
          y2={685}
          stroke="var(--ra-color-accent, #8B2C2C)"
          strokeWidth="1.5"
        />
      </svg>

      {/* 下半部：文字层 */}
      <div
        style={{
          position: "absolute",
          top: "62%",
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-end",
          padding:
            "var(--ra-space-4, 1rem) var(--ra-space-7, 3rem) var(--ra-space-6, 2.5rem) var(--ra-space-7, 3rem)",
          gap: "var(--ra-space-2, 0.5rem)",
        }}
      >
        <span
          style={{
            fontSize: "var(--ra-text-xs, 0.72rem)",
            letterSpacing: "0.28em",
            textTransform: "uppercase",
            color: "var(--ra-color-accent, #8B2C2C)",
            fontWeight: "var(--ra-font-weight-bold, 600)",
          }}
        >
          Thinking Lenses · 思维透镜
        </span>
        <h1
          style={{
            margin: 0,
            fontSize: "clamp(1.7rem, 5vw, var(--ra-text-4xl, 2.8rem))",
            lineHeight: 1.08,
            fontWeight: "var(--ra-font-weight-bold, 700)",
            color: "var(--ra-color-fg, inherit)",
            fontFamily: "var(--ra-font-serif, Georgia, serif)",
            letterSpacing: "-0.01em",
          }}
        >
          25 把看问题的钥匙
        </h1>
        <p
          style={{
            margin: 0,
            fontSize: "var(--ra-text-sm, 0.92rem)",
            color: "var(--ra-color-muted, inherit)",
            lineHeight: 1.5,
            maxWidth: "85%",
            fontStyle: "normal",
          }}
        >
          一套带强制门的跨职业认知协议系统——每个透镜是一台 3–6 步的微型思维算法，有语言约束、有异质性检查、有冲突焊接。
        </p>
        <div
          style={{
            display: "flex",
            gap: "var(--ra-space-4, 1rem)",
            marginTop: "var(--ra-space-3, 0.75rem)",
            fontSize: "var(--ra-text-xs, 0.72rem)",
            color: "var(--ra-color-muted, inherit)",
            letterSpacing: "0.04em",
          }}
        >
          <span><strong style={{ color: "var(--ra-color-accent, #8B2C2C)" }}>25</strong> 透镜</span>
          <span><strong style={{ color: "var(--ra-color-accent, #8B2C2C)" }}>5</strong> 家族</span>
          <span><strong style={{ color: "var(--ra-color-accent, #8B2C2C)" }}>7</strong> 认知原理</span>
          <span><strong style={{ color: "var(--ra-color-accent, #8B2C2C)" }}>5</strong> 模式</span>
        </div>
      </div>
    </>
  );
}
