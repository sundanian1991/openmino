import coverImg from "../assets/cover-press.jpg";

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
        borderRadius: "var(--ra-radius-md, 0)",
        border: "1px solid var(--ra-color-border, currentColor)",
        isolation: "isolate",
      }}
    >
      <img
        src={coverImg}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 1,
          background: "linear-gradient(to bottom, color-mix(in srgb, var(--ra-color-bg, #fbf7ee) 55%, transparent) 0%, color-mix(in srgb, var(--ra-color-bg, #fbf7ee) 78%, transparent) 55%, color-mix(in srgb, var(--ra-color-bg, #fbf7ee) 92%, transparent) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 2,
          display: "grid",
          gridTemplateRows: "1fr 1.4fr",
          padding:
            "var(--ra-space-7, 3rem) var(--ra-space-8, 4rem) var(--ra-space-7, 3rem) var(--ra-space-8, 4rem)",
        }}
      >
        <div style={{ display: "grid", alignContent: "start", gap: "var(--ra-space-3, 0.75rem)" }}>
          <span
            style={{
              fontSize: "var(--ra-text-xs, 0.75rem)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--ra-color-muted, inherit)",
              opacity: 0.85,
            }}
          >
            微信公众号文章转网页
          </span>
          <p
            style={{
              margin: 0,
              fontSize: "clamp(2rem, 5.4vw, var(--ra-text-4xl, 3rem))",
              lineHeight: 1.05,
              fontWeight: "var(--ra-font-weight-normal, 400)",
              color: "var(--ra-color-fg, inherit)",
              maxWidth: "85%",
            }}
          >
            The Art of Token
          </p>
          <p
            style={{
              margin: 0,
              fontSize: "var(--ra-text-lg, 1.15rem)",
              color: "var(--ra-color-muted, inherit)",
              maxWidth: "85%",
              lineHeight: 1.4,
            }}
          >
            AI 时代的调用能力
          </p>
        </div>
        <div
          style={{
            display: "grid",
            alignContent: "end",
            justifyItems: "start",
            gap: "var(--ra-space-2, 0.5rem)",
          }}
        >
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "var(--ra-color-border, currentColor)",
              opacity: 0.6,
            }}
          />
          <p
            style={{
              margin: 0,
              fontSize: "var(--ra-text-sm, 0.95rem)",
              color: "var(--ra-color-muted, inherit)",
              lineHeight: 1.5,
              maxWidth: "90%",
            }}
          >
            智能已便宜如兵，限制你的从不是成本，而是调兵的能力。
          </p>
        </div>
      </div>
    </section>
  );
}
