import React from 'react'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

export interface Evaluation {
  score: number
  detail: string
}

export interface Evaluations {
  completeness: Evaluation
  clarity: Evaluation
  actionability: Evaluation
}

export interface Suggestion {
  type: 'conclusion' | 'gap' | 'specific'
  tag: string
  text: string
}

export interface AICoachPanelProps {
  /** Current scenario info */
  scenarioName: string
  audienceName?: string
  projectName?: string
  /** Text quality evaluations (0-100) */
  evaluations?: Evaluations
  /** Structural suggestions */
  suggestions?: Suggestion[]
  /** Next step guidance text */
  nextStep?: string
  /** Session stats */
  durationSec?: number
  wordCount?: number
  /** Whether recording is active */
  isRecording?: boolean
}

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const EVAL_KEYS: (keyof Evaluations)[] = [
  'completeness',
  'clarity',
  'actionability'
]

const EVAL_LABELS: Record<keyof Evaluations, string> = {
  completeness: '信息完整性',
  clarity: '结论清晰度',
  actionability: '行动明确性'
}

const SUGGESTION_TAG_LABELS: Record<Suggestion['type'], string> = {
  conclusion: '结论前置',
  gap: '信息缺口',
  specific: '具体化'
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getScoreColor(score: number): string {
  if (score >= 70) return 'var(--c-forest, #4ade80)'
  if (score >= 50) return '#d69e2e'
  return 'var(--c-fg-muted, #8a8a8a)'
}

function formatDuration(sec?: number): string {
  if (sec == null) return ''
  const m = Math.floor(sec / 60)
  const s = sec % 60
  if (m === 0) return `${s}秒`
  return s > 0 ? `${m}分${s}秒` : `${m}分`
}

/* ------------------------------------------------------------------ */
/*  Animations (injected once)                                        */
/* ------------------------------------------------------------------ */

const ANIMATION_STYLES = `
@keyframes ai-coach-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 0.8; }
}
@keyframes ai-coach-dot {
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.3; transform: scale(0.75); }
}
`

/* ------------------------------------------------------------------ */
/*  Inline SVG Icons                                                  */
/* ------------------------------------------------------------------ */

function IconChart() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect x="2" y="8" width="3" height="6" rx="0.5" fill="currentColor" />
      <rect x="6.5" y="4" width="3" height="10" rx="0.5" fill="currentColor" />
      <rect x="11" y="1" width="3" height="13" rx="0.5" fill="currentColor" />
    </svg>
  )
}

function IconBulb() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <path
        d="M8 1a4.5 4.5 0 00-2 8.5c.5.3 1 1 1 1.5v1a1 1 0 001 1h0a1 1 0 001-1v-1c0-.5.5-1.2 1-1.5A4.5 4.5 0 008 1z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M6.5 13h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconArrow() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M2 8h10M8 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconCircle() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <circle cx="8" cy="8" r="5" stroke="currentColor" strokeWidth="1.5" />
      <path d="M8 5v4M8 10.5v.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

function IconFile() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M4 2h5l3 3v9H4V2z"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M9 2v3h3" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path d="M6 7.5h4M6 10h4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
    </svg>
  )
}

function IconNext() {
  return (
    <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
      <path
        d="M6 4l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function IconClipboard() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
      <rect
        x="3"
        y="2"
        width="10"
        height="13"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
      <path d="M6 1h4v2H6V1z" stroke="currentColor" strokeWidth="1.2" strokeLinejoin="round" />
      <path
        d="M5.5 6.5h5M5.5 9h5M5.5 11.5h3"
        stroke="currentColor"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </svg>
  )
}

function IconChartLarge() {
  return (
    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" opacity="0.3">
      <rect x="8" y="22" width="7" height="14" rx="2" fill="currentColor" />
      <rect x="17" y="14" width="7" height="22" rx="2" fill="currentColor" />
      <rect x="26" y="6" width="7" height="30" rx="2" fill="currentColor" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Skeleton primitives                                                */
/* ------------------------------------------------------------------ */

function SkeletonBar({ width }: { width: number }) {
  return (
    <div
      style={{
        height: 14,
        width: `${width}%`,
        borderRadius: 4,
        backgroundColor: 'var(--c-border, #2a2a2a)',
        animation: 'ai-coach-pulse 1.5s ease-in-out infinite'
      }}
    />
  )
}

function SkeletonBlock({ height }: { height: number }) {
  return (
    <div
      style={{
        height,
        width: '100%',
        borderRadius: 8,
        backgroundColor: 'var(--c-border, #2a2a2a)',
        animation: 'ai-coach-pulse 1.5s ease-in-out infinite'
      }}
    />
  )
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const styles = {
  panel: {
    width: 290,
    height: '100%',
    display: 'flex',
    flexDirection: 'column' as const,
    backgroundColor: 'var(--c-bg-card, #1a1a1a)',
    borderLeft: '1px solid var(--c-border, #2a2a2a)',
    color: 'var(--c-fg, #e8e6e3)',
    fontSize: 13,
    overflow: 'hidden'
  },

  scrollArea: {
    flex: 1,
    overflowY: 'auto' as const,
    padding: '16px 16px 24px'
  },

  header: {
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '14px 16px',
    borderBottom: '1px solid var(--c-border, #2a2a2a)',
    fontSize: 14,
    fontWeight: 600
  },

  section: {
    marginBottom: 20
  },

  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    fontSize: 12,
    fontWeight: 600,
    color: 'var(--c-fg-muted, #8a8a8a)',
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em',
    marginBottom: 12
  },

  /* ---- evaluation rows ---- */

  evalRow: {
    marginBottom: 12
  },

  evalLabelRow: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center',
    marginBottom: 4
  },

  evalLabelText: {
    color: 'var(--c-fg, #e8e6e3)',
    fontWeight: 500
  },

  evalScore: (score: number): React.CSSProperties => ({
    fontWeight: 700,
    fontSize: 12,
    color: getScoreColor(score)
  }),

  barTrack: {
    width: '100%',
    height: 6,
    borderRadius: 3,
    backgroundColor: 'var(--c-border, #2a2a2a)',
    overflow: 'hidden'
  },

  barFill: (score: number): React.CSSProperties => ({
    height: '100%',
    borderRadius: 3,
    backgroundColor: getScoreColor(score),
    width: `${Math.min(score, 100)}%`,
    transition: 'width 0.6s ease'
  }),

  evalDetail: {
    fontSize: 11,
    color: 'var(--c-fg-muted, #8a8a8a)',
    marginTop: 4,
    lineHeight: 1.4
  },

  /* ---- suggestion items ---- */

  suggestionItem: {
    display: 'flex',
    gap: 8,
    padding: '8px 10px',
    borderRadius: 'var(--r-sm, 8px)',
    backgroundColor: 'var(--c-bg, #0f0f0f)',
    marginBottom: 6
  },

  suggestionIcon: (type: Suggestion['type']): React.CSSProperties => ({
    flexShrink: 0,
    marginTop: 2,
    color:
      type === 'conclusion'
        ? 'var(--c-forest, #4ade80)'
        : type === 'gap'
          ? '#d69e2e'
          : 'var(--c-fg-muted, #8a8a8a)'
  }),

  suggestionTag: (type: Suggestion['type']): React.CSSProperties => ({
    display: 'inline-block',
    padding: '1px 6px',
    borderRadius: 3,
    fontSize: 10,
    fontWeight: 600,
    marginBottom: 4,
    width: 'fit-content',
    color:
      type === 'conclusion'
        ? 'var(--c-forest, #4ade80)'
        : type === 'gap'
          ? '#d69e2e'
          : 'var(--c-fg, #e8e6e3)',
    backgroundColor:
      type === 'conclusion'
        ? 'rgba(74, 222, 128, 0.12)'
        : type === 'gap'
          ? 'rgba(214, 158, 46, 0.12)'
          : 'rgba(138, 138, 138, 0.12)'
  }),

  suggestionText: {
    fontSize: 12,
    lineHeight: 1.5,
    color: 'var(--c-fg, #e8e6e3)'
  },

  /* ---- next step ---- */

  nextStepBox: {
    padding: '10px 12px',
    borderRadius: 'var(--r-sm, 8px)',
    border: '1px solid rgba(74, 222, 128, 0.25)',
    backgroundColor: 'rgba(74, 222, 128, 0.06)',
    fontSize: 12,
    lineHeight: 1.6,
    color: 'var(--c-fg, #e8e6e3)',
    fontStyle: 'italic' as const
  },

  nextStepLabel: {
    color: 'var(--c-forest, #4ade80)',
    fontWeight: 600,
    fontStyle: 'normal'
  },

  /* ---- session info ---- */

  divider: {
    height: 1,
    backgroundColor: 'var(--c-border, #2a2a2a)',
    margin: '12px 0'
  },

  sessionRow: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    alignItems: 'center',
    padding: '4px 0',
    fontSize: 12,
    color: 'var(--c-fg-muted, #8a8a8a)'
  },

  sessionValue: {
    color: 'var(--c-fg, #e8e6e3)',
    textAlign: 'right' as const
  },

  /* ---- recording badge ---- */

  recordingBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 12px',
    borderRadius: 6,
    backgroundColor: 'rgba(229, 62, 62, 0.1)',
    color: '#e53e3e',
    fontSize: 11,
    fontWeight: 600,
    marginBottom: 12
  },

  recordingDot: {
    width: 8,
    height: 8,
    borderRadius: '50%',
    backgroundColor: '#e53e3e',
    animation: 'ai-coach-dot 1s ease-in-out infinite'
  },

  /* ---- idle state ---- */

  idleContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    gap: 10,
    color: 'var(--c-fg-muted, #8a8a8a)',
    padding: 40,
    textAlign: 'center' as const
  },

  /* ---- skeleton section ---- */

  skeletonEval: {
    marginBottom: 12
  },

  skeletonBarRow: {
    display: 'flex',
    justifyContent: 'space-between' as const,
    marginBottom: 4
  },

  skeletonSpacer4: {
    height: 4
  },

  skeletonSpacer12: {
    height: 12
  },

  skeletonSpacer8: {
    height: 8
  },

  skeletonSpacer16: {
    height: 16
  }
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                     */
/* ------------------------------------------------------------------ */

function EvaluationBars({ evaluations }: { evaluations: Evaluations }) {
  return (
    <>
      {EVAL_KEYS.map((key) => {
        const evalData = evaluations[key]
        return (
          <div key={key} style={styles.evalRow}>
            <div style={styles.evalLabelRow}>
              <span style={styles.evalLabelText}>{EVAL_LABELS[key]}</span>
              <span style={styles.evalScore(evalData.score)}>{evalData.score}%</span>
            </div>
            <div style={styles.barTrack}>
              <div style={styles.barFill(evalData.score)} />
            </div>
            <div style={styles.evalDetail}>{evalData.detail}</div>
          </div>
        )
      })}
    </>
  )
}

function SuggestionsList({ suggestions }: { suggestions: Suggestion[] }) {
  if (suggestions.length === 0) return null

  return (
    <>
      {suggestions.map((sug, i) => (
        <div key={i} style={styles.suggestionItem}>
          <div style={styles.suggestionIcon(sug.type)}>
            {sug.type === 'conclusion' ? (
              <IconArrow />
            ) : sug.type === 'gap' ? (
              <IconCircle />
            ) : (
              <IconFile />
            )}
          </div>
          <div>
            <div style={styles.suggestionTag(sug.type)}>
              {sug.tag || SUGGESTION_TAG_LABELS[sug.type]}
            </div>
            <div style={styles.suggestionText}>{sug.text}</div>
          </div>
        </div>
      ))}
    </>
  )
}

function SessionInfo({
  scenarioName,
  projectName,
  durationSec,
  wordCount
}: {
  scenarioName: string
  projectName?: string
  durationSec?: number
  wordCount?: number
}) {
  return (
    <>
      <div style={styles.sessionRow}>
        <span>场景</span>
        <span style={styles.sessionValue}>{scenarioName}</span>
      </div>
      {projectName && (
        <div style={styles.sessionRow}>
          <span>项目</span>
          <span style={styles.sessionValue}>{projectName}</span>
        </div>
      )}
      {(durationSec != null || wordCount != null) && (
        <div style={styles.sessionRow}>
          <span>已讲</span>
          <span style={styles.sessionValue}>
            {durationSec != null ? formatDuration(durationSec) : ''}
            {durationSec != null && wordCount != null ? ' · ' : ''}
            {wordCount != null ? `${wordCount}字` : ''}
          </span>
        </div>
      )}
    </>
  )
}

function LoadingSkeleton() {
  return (
    <div style={styles.scrollArea}>
      <div style={styles.recordingBadge}>
        <div style={styles.recordingDot} />
        录音中...
      </div>

      <div style={styles.section}>
        <SkeletonBar width={60} />
        <div style={styles.skeletonSpacer12} />

        {[1, 2, 3].map((i) => (
          <div key={i} style={styles.skeletonEval}>
            <div style={styles.skeletonBarRow}>
              <SkeletonBar width={50} />
              <SkeletonBar width={20} />
            </div>
            <SkeletonBlock height={6} />
            <div style={styles.skeletonSpacer4} />
            <SkeletonBar width={70} />
          </div>
        ))}
      </div>

      <div style={styles.skeletonSpacer16} />
      <SkeletonBar width={40} />
      <div style={styles.skeletonSpacer8} />
      {[1, 2].map((i) => (
        <div key={i} style={{ marginBottom: 6 }}>
          <SkeletonBlock height={44} />
        </div>
      ))}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export default function AICoachPanel({
  scenarioName,
  audienceName,
  projectName,
  evaluations,
  suggestions,
  nextStep,
  durationSec,
  wordCount,
  isRecording
}: AICoachPanelProps) {
  /* ---- resolve state ---- */
  const isIdle = !evaluations && !isRecording
  const isLoading = !evaluations && isRecording

  /* ---- idle: empty state ---- */
  if (isIdle) {
    return (
      <div style={styles.panel}>
        <style>{ANIMATION_STYLES}</style>
        <div style={styles.header}>
          <IconChart />
          AI 教练
        </div>
        <div style={styles.idleContainer}>
          <IconChartLarge />
          <span>选择场景开始口述</span>
        </div>
      </div>
    )
  }

  /* ---- loading: skeleton ---- */
  if (isLoading) {
    return (
      <div style={styles.panel}>
        <style>{ANIMATION_STYLES}</style>
        <div style={styles.header}>
          <IconChart />
          AI 教练
        </div>
        <LoadingSkeleton />
      </div>
    )
  }

  /* ---- data: full panel ---- */
  return (
    <div style={styles.panel}>
      <style>{ANIMATION_STYLES}</style>

      {/* Header */}
      <div style={styles.header}>
        <IconChart />
        AI 教练
      </div>

      <div style={styles.scrollArea}>
        {/* Recording indicator */}
        {isRecording && (
          <div style={styles.recordingBadge}>
            <div style={styles.recordingDot} />
            录音中...
          </div>
        )}

        {/* Reader perspective evaluations */}
        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <IconChart />
            读者视角评估
            {audienceName && (
              <span style={{ fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>
                · {audienceName}
              </span>
            )}
          </div>
          <EvaluationBars evaluations={evaluations!} />
        </div>

        {/* Structural suggestions */}
        {suggestions && suggestions.length > 0 && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <IconBulb />
              结构建议
            </div>
            <SuggestionsList suggestions={suggestions} />
          </div>
        )}

        {/* Next step guidance */}
        {nextStep && (
          <div style={styles.section}>
            <div style={styles.sectionTitle}>
              <IconNext />
              下一步
            </div>
            <div style={styles.nextStepBox}>
              <span style={styles.nextStepLabel}>试试说：</span>
              {nextStep}
            </div>
          </div>
        )}

        {/* Divider + session info */}
        <div style={styles.divider} />

        <div style={styles.section}>
          <div style={styles.sectionTitle}>
            <IconClipboard />
            本次会话
          </div>
          <SessionInfo
            scenarioName={scenarioName}
            projectName={projectName}
            durationSec={durationSec}
            wordCount={wordCount}
          />
        </div>
      </div>
    </div>
  )
}
