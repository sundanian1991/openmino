import React, { useState, useEffect, useCallback } from 'react'
import { Icon } from './Icon'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SceneSelectorProps {
  selectedSceneId: string | null
  onSceneSelect: (sceneId: string) => void
  onManageScenes: () => void
  onNewScene: () => void
  /** Current session context */
  context: {
    projectName?: string
    audienceName?: string
    skillNames: string[]
  }
}

interface Scene {
  id: string
  name: string
  description: string
  goal: string
  priority: 'P0' | 'P1' | 'P2' | 'P3'
  category: 'fixed' | 'mix' | 'guided'
  defaultAudience?: string
  skillIds: string[]
  createdAt?: string
  updatedAt?: string
}

interface SceneStats {
  total: number
  byPriority: Record<string, number>
  byCategory: Record<string, number>
}

type Priority = Scene['priority']
type Category = Scene['category']

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const PRIORITY_LABELS: Record<Priority, string> = {
  P0: 'P0',
  P1: 'P1',
  P2: 'P2',
  P3: 'P3'
}

/** Priority colors for badges — P0 forest green, P1 amber, P2 purple, P3 fade */
const PRIORITY_BG: Record<Priority, string> = {
  P0: 'var(--c-forest, #4ade80)',
  P1: '#dd6b20',
  P2: '#8b5cf6',
  P3: '#718096'
}

const PRIORITY_SORT: Record<Priority, number> = { P0: 0, P1: 1, P2: 2, P3: 3 }

const BATCH_SIZE = 5

/** Simple SVG icon per scene category */
function SceneTypeIcon({ category, size = 16 }: { category: Category; size?: number }) {
  const s = size
  switch (category) {
    case 'fixed':
      return (
        <svg width={s} height={s} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="2" y="2" width="12" height="12" rx="2" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <line x1="5" y1="6" x2="11" y2="6" stroke="currentColor" strokeWidth="1.2" />
          <line x1="5" y1="9" x2="9" y2="9" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )
    case 'mix':
      return (
        <svg width={s} height={s} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="1.5" y="4.5" width="5" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <rect x="9.5" y="4.5" width="5" height="7" rx="1" stroke="currentColor" strokeWidth="1.2" fill="none" />
          <line x1="8" y1="2" x2="8" y2="4" stroke="currentColor" strokeWidth="1.2" />
          <line x1="8" y1="10" x2="8" y2="14" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )
    case 'guided':
      return (
        <svg width={s} height={s} viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 12V4L13 8L3 12Z" stroke="currentColor" strokeWidth="1.2" fill="none" strokeLinejoin="round" />
          <line x1="3" y1="4" x2="3" y2="12" stroke="currentColor" strokeWidth="1.2" />
        </svg>
      )
  }
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const SIDEBAR_WIDTH = 240

const styles = {
  container: {
    width: SIDEBAR_WIDTH,
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    backgroundColor: 'var(--c-bg-card, #1a1a1a)',
    borderRight: '1px solid var(--c-border, #2a2a2a)',
    color: 'var(--c-fg, #e8e6e3)',
    fontSize: 13,
    userSelect: 'none' as const
  },

  /* Section title bar */
  sectionTitle: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '12px 14px 8px',
    fontSize: 11,
    fontWeight: 600,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.06em',
    color: 'var(--c-fg-muted, #8a8a8a)'
  },

  /* Scene list */
  sceneList: {
    flex: 1,
    overflow: 'auto',
    padding: '0 6px'
  },

  sceneItem: (selected: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    padding: '8px 8px 8px 12px',
    marginBottom: 2,
    borderRadius: 'var(--r-sm, 8px)',
    cursor: 'pointer',
    transition: 'all 0.15s',
    backgroundColor: selected ? 'var(--c-bg-hover, #1f1f1f)' : 'transparent',
    borderLeft: selected
      ? '3px solid var(--c-forest, #4ade80)'
      : '3px solid transparent'
  }),

  sceneIcon: {
    flexShrink: 0,
    color: 'var(--c-fg-muted, #8a8a8a)'
  },

  sceneName: (selected: boolean): React.CSSProperties => ({
    flex: 1,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const,
    fontWeight: selected ? 600 : 400,
    color: selected ? 'var(--c-fg, #e8e6e3)' : 'var(--c-fg-muted, #8a8a8a)',
    fontSize: 13
  }),

  sceneCheck: {
    flexShrink: 0,
    color: 'var(--c-forest, #4ade80)'
  },

  /* Priority badge */
  priorityBadge: (priority: Priority): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '1px 5px',
    borderRadius: 3,
    fontSize: 10,
    fontWeight: 700,
    color: '#fff',
    backgroundColor: PRIORITY_BG[priority],
    lineHeight: 1.4,
    flexShrink: 0,
    minWidth: 22,
    letterSpacing: '0.02em'
  }),

  /* Rotate button */
  rotateRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '6px 14px 12px',
    gap: 4
  },

  rotateBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '4px 10px',
    borderRadius: 'var(--r-sm, 8px)',
    border: '1px solid var(--c-border, #2a2a2a)',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'var(--c-fg-muted, #8a8a8a)',
    fontSize: 12,
    transition: 'all 0.15s'
  },

  /* Divider */
  divider: {
    height: 1,
    backgroundColor: 'var(--c-border, #2a2a2a)',
    margin: '0 14px'
  },

  /* Context section */
  contextSection: {
    padding: '10px 14px'
  },

  contextRow: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 6,
    padding: '3px 0',
    fontSize: 12,
    lineHeight: 1.5
  },

  contextLabel: {
    color: 'var(--c-fg-muted, #8a8a8a)',
    whiteSpace: 'nowrap' as const,
    flexShrink: 0
  },

  contextValue: {
    color: 'var(--c-fg, #e8e6e3)',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const
  },

  /* Skill tags */
  skillList: {
    display: 'flex',
    flexWrap: 'wrap' as const,
    gap: 4,
    padding: '4px 0'
  },

  skillTag: (active: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 3,
    padding: '2px 7px',
    borderRadius: 4,
    fontSize: 11,
    backgroundColor: active
      ? 'var(--c-bg-tag, rgba(74, 222, 128, 0.12))'
      : 'transparent',
    color: active
      ? 'var(--c-forest, #4ade80)'
      : 'var(--c-fg-muted, #8a8a8a)',
    border: active
      ? '1px solid transparent'
      : '1px solid var(--c-border, #2a2a2a)'
  }),

  /* Bottom actions */
  bottom: {
    borderTop: '1px solid var(--c-border, #2a2a2a)',
    padding: '8px 14px 12px',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: 4
  },

  bottomBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 8px',
    borderRadius: 'var(--r-sm, 8px)',
    border: 'none',
    cursor: 'pointer',
    fontSize: 12,
    fontWeight: 500,
    transition: 'all 0.15s',
    textAlign: 'left' as const
  },

  manageBtn: {
    backgroundColor: 'transparent',
    color: 'var(--c-fg-muted, #8a8a8a)'
  },

  newBtn: {
    backgroundColor: 'var(--c-forest, #4ade80)',
    color: '#0f0f0f'
  },

  /* Loading */
  loadingContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 14px',
    gap: 8,
    color: 'var(--c-fg-muted, #8a8a8a)',
    fontSize: 12
  }
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function SceneSelector({
  selectedSceneId,
  onSceneSelect,
  onManageScenes,
  onNewScene,
  context
}: SceneSelectorProps) {
  const [scenes, setScenes] = useState<Scene[]>([])
  const [batchIndex, setBatchIndex] = useState(0)
  const [loading, setLoading] = useState(true)

  /* ---- data loading ---- */

  const loadScenes = useCallback(async () => {
    setLoading(true)
    try {
      const sceneList: Scene[] = await window.api.scene.list()
      // Sort by priority P0 → P3
      const sorted = [...sceneList].sort(
        (a, b) => PRIORITY_SORT[a.priority] - PRIORITY_SORT[b.priority]
      )
      setScenes(sorted)
    } catch (err) {
      console.error('Failed to load scenes:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadScenes()
  }, [loadScenes])

  /* ---- batch rotation ---- */

  const totalBatches = Math.max(1, Math.ceil(scenes.length / BATCH_SIZE))

  const visibleScenes = scenes.slice(
    batchIndex * BATCH_SIZE,
    batchIndex * BATCH_SIZE + BATCH_SIZE
  )

  const handleRotate = () => {
    setBatchIndex((prev) => (prev + 1) % totalBatches)
  }

  /* ---- render helpers ---- */

  const renderSceneItem = (scene: Scene) => {
    const isSelected = scene.id === selectedSceneId
    return (
      <div
        key={scene.id}
        style={styles.sceneItem(isSelected)}
        onClick={() => onSceneSelect(scene.id)}
        title={scene.name}
      >
        <span style={styles.priorityBadge(scene.priority)}>
          {PRIORITY_LABELS[scene.priority]}
        </span>
        <span style={styles.sceneIcon}>
          <SceneTypeIcon category={scene.category} size={14} />
        </span>
        <span style={styles.sceneName(isSelected)}>{scene.name}</span>
        {isSelected && (
          <span style={styles.sceneCheck}>
            <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
              <path
                d="M3 7.5L5.5 10L11 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </span>
        )}
      </div>
    )
  }

  const renderContextSection = () => {
    const { projectName, audienceName, skillNames } = context
    const hasContext = projectName || audienceName || skillNames.length > 0

    if (!hasContext) return null

    return (
      <>
        <div style={styles.divider} />
        <div style={styles.sectionTitle}>上下文</div>
        <div style={styles.contextSection}>
          {projectName && (
            <div style={styles.contextRow}>
              <span style={styles.contextLabel}>关联项目:</span>
              <span style={styles.contextValue}>{projectName}</span>
            </div>
          )}
          {audienceName && (
            <div style={styles.contextRow}>
              <span style={styles.contextLabel}>受众:</span>
              <span style={styles.contextValue}>{audienceName}</span>
            </div>
          )}
          {skillNames.length > 0 && (
            <div style={styles.skillList}>
              {skillNames.map((skill) => (
                <span key={skill} style={styles.skillTag(true)}>
                  <svg width={10} height={10} viewBox="0 0 10 10" fill="none">
                    <path
                      d="M2.5 5h5M5 2.5v5"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>
      </>
    )
  }

  /* ---- render ---- */

  return (
    <div style={styles.container}>
      {/* Scene library header */}
      <div style={styles.sectionTitle}>
        <span>场景库</span>
        {scenes.length > 0 && (
          <span style={{ fontSize: 11, fontWeight: 400, color: 'var(--c-fg-muted, #8a8a8a)' }}>
            {scenes.length}
          </span>
        )}
      </div>

      {/* Scene list */}
      <div style={styles.sceneList}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <Icon name="spinner" size={14} />
            <span>加载中...</span>
          </div>
        ) : visibleScenes.length > 0 ? (
          visibleScenes.map(renderSceneItem)
        ) : (
          <div style={styles.loadingContainer}>
            <span>暂无场景</span>
          </div>
        )}
      </div>

      {/* Rotate button */}
      {scenes.length > BATCH_SIZE && (
        <div style={styles.rotateRow}>
          <button
            style={styles.rotateBtn}
            onClick={handleRotate}
            title="换一批"
          >
            <svg width={12} height={12} viewBox="0 0 12 12" fill="none">
              <path
                d="M2 6a4 4 0 0 1 7-2.5M10 6a4 4 0 0 1-7 2.5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
              />
              <path
                d="M9 1.5V3.5H7M3 10.5V8.5H5"
                stroke="currentColor"
                strokeWidth="1.2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            换一批
            <span style={{ fontSize: 10, opacity: 0.6 }}>
              {batchIndex + 1}/{totalBatches}
            </span>
          </button>
        </div>
      )}

      {/* Context section */}
      {renderContextSection()}

      {/* Bottom actions */}
      <div style={styles.bottom}>
        <button
          style={{ ...styles.bottomBtn, ...styles.manageBtn }}
          onClick={onManageScenes}
        >
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
            <rect
              x="1.5"
              y="1.5"
              width="11"
              height="11"
              rx="2"
              stroke="currentColor"
              strokeWidth="1.2"
              fill="none"
            />
            <line x1="4" y1="7" x2="10" y2="7" stroke="currentColor" strokeWidth="1.2" />
            <line x1="7" y1="4" x2="7" y2="10" stroke="currentColor" strokeWidth="1.2" />
          </svg>
          全部场景
          <svg width={12} height={12} viewBox="0 0 12 12" fill="none" style={{ marginLeft: 'auto' }}>
            <path
              d="M4.5 2.5L8 6l-3.5 3.5"
              stroke="currentColor"
              strokeWidth="1.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          style={{ ...styles.bottomBtn, ...styles.newBtn }}
          onClick={onNewScene}
        >
          <svg width={14} height={14} viewBox="0 0 14 14" fill="none">
            <line x1="7" y1="2" x2="7" y2="12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            <line x1="2" y1="7" x2="12" y2="7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          新建场景
        </button>
      </div>
    </div>
  )
}
