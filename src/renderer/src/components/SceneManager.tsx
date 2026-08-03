import React, { useState, useEffect, useCallback } from 'react'
import { Button } from './Button'
import { Icon } from './Icon'
import { ConfirmDialog } from './ConfirmDialog'
import { TopBar } from './TopBar'
import { EmptyState } from './EmptyState'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface SceneManagerProps {
  onBack?: () => void
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

type Priority = Scene['priority']
type Category = Scene['category']

interface SceneStats {
  total: number
  byPriority: Record<string, number>
  byCategory: Record<string, number>
}

interface SceneFormData {
  name: string
  description: string
  goal: string
  priority: Priority
  category: Category
  defaultAudience: string
  skillIds: string[]
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

const PRIORITY_LABELS: Record<Priority, string> = {
  P0: 'P0',
  P1: 'P1',
  P2: 'P2',
  P3: 'P3'
}

const PRIORITY_COLORS: Record<Priority, string> = {
  P0: '#e53e3e',
  P1: '#dd6b20',
  P2: '#d69e2e',
  P3: '#718096'
}

const CATEGORY_LABELS: Record<Category, string> = {
  fixed: '固定框架',
  mix: '混合框架',
  guided: '引导框架'
}

const EMPTY_FORM: SceneFormData = {
  name: '',
  description: '',
  goal: '',
  priority: 'P2',
  category: 'mix',
  defaultAudience: '',
  skillIds: []
}

/* ------------------------------------------------------------------ */
/*  Styles                                                             */
/* ------------------------------------------------------------------ */

const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    height: '100%',
    backgroundColor: 'var(--c-bg, #0f0f0f)',
    color: 'var(--c-fg, #e8e6e3)'
  },
  body: {
    flex: 1,
    overflow: 'auto',
    padding: '24px 32px'
  },
  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 600,
    color: 'var(--c-fg, #e8e6e3)'
  },
  headerActions: {
    display: 'flex',
    gap: 8
  },

  /* Stats bar */
  statsBar: {
    display: 'flex',
    gap: 12,
    marginBottom: 24,
    flexWrap: 'wrap' as const
  },
  statCard: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 100,
    padding: '12px 16px',
    borderRadius: 'var(--r-lg, 12px)',
    backgroundColor: 'var(--c-bg-card, #1a1a1a)',
    border: '1px solid var(--c-border, #2a2a2a)'
  },
  statValue: {
    fontSize: 24,
    fontWeight: 700,
    color: 'var(--c-forest, #4ade80)',
    lineHeight: 1.2
  },
  statLabel: {
    fontSize: 12,
    color: 'var(--c-fg-muted, #8a8a8a)',
    marginTop: 4
  },

  /* Table */
  tableWrapper: {
    borderRadius: 'var(--r-lg, 12px)',
    border: '1px solid var(--c-border, #2a2a2a)',
    overflow: 'hidden'
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 14
  },
  th: {
    textAlign: 'left' as const,
    padding: '10px 14px',
    fontWeight: 600,
    color: 'var(--c-fg-muted, #8a8a8a)',
    backgroundColor: 'var(--c-bg-card, #1a1a1a)',
    borderBottom: '1px solid var(--c-border, #2a2a2a)',
    whiteSpace: 'nowrap' as const,
    fontSize: 12,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.05em'
  },
  td: {
    padding: '10px 14px',
    borderBottom: '1px solid var(--c-border, #2a2a2a)',
    verticalAlign: 'middle' as const
  },
  row: {
    cursor: 'pointer',
    transition: 'background-color 0.15s'
  },
  rowHover: {
    backgroundColor: 'var(--c-bg-hover, #1f1f1f)'
  },

  /* Priority badge */
  priorityBadge: (priority: Priority): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2px 8px',
    borderRadius: 4,
    fontSize: 11,
    fontWeight: 700,
    color: '#fff',
    backgroundColor: PRIORITY_COLORS[priority],
    lineHeight: 1.4
  }),

  /* Name cell */
  nameCell: {
    fontWeight: 500,
    color: 'var(--c-fg, #e8e6e3)'
  },
  descCell: {
    color: 'var(--c-fg-muted, #8a8a8a)',
    fontSize: 13,
    maxWidth: 260,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    whiteSpace: 'nowrap' as const
  },

  /* Action buttons */
  actions: {
    display: 'flex',
    gap: 6
  },
  actionBtn: {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 32,
    height: 32,
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'var(--c-fg-muted, #8a8a8a)',
    transition: 'all 0.15s'
  },

  /* Loading */
  loadingContainer: {
    display: 'flex',
    flexDirection: 'column' as const,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 80,
    gap: 12,
    color: 'var(--c-fg-muted, #8a8a8a)'
  },

  /* Skill tag */
  skillTag: {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 4,
    padding: '2px 8px',
    borderRadius: 4,
    fontSize: 12,
    backgroundColor: 'var(--c-bg-tag, rgba(74, 222, 128, 0.12))',
    color: 'var(--c-forest, #4ade80)'
  }
}

/* ------------------------------------------------------------------ */
/*  Modal                                                              */
/* ------------------------------------------------------------------ */

interface SceneFormModalProps {
  open: boolean
  initialData: SceneFormData
  saving: boolean
  onSave: (data: SceneFormData) => void
  onClose: () => void
}

function SceneFormModal({ open, initialData, saving, onSave, onClose }: SceneFormModalProps) {
  const [form, setForm] = useState<SceneFormData>(initialData)
  const [errors, setErrors] = useState<Partial<Record<keyof SceneFormData, string>>>({})
  const [tagInput, setTagInput] = useState('')

  useEffect(() => {
    if (open) {
      setForm(initialData)
      setErrors({})
      setTagInput('')
    }
  }, [open, initialData])

  if (!open) return null

  const handleChange = (field: keyof SceneFormData, value: string | string[]) => {
    setForm((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[field]
        return next
      })
    }
  }

  const addTag = () => {
    const trimmed = tagInput.trim()
    if (!trimmed) return
    if (form.skillIds.includes(trimmed)) {
      setTagInput('')
      return
    }
    handleChange('skillIds', [...form.skillIds, trimmed])
    setTagInput('')
  }

  const removeTag = (tag: string) => {
    handleChange(
      'skillIds',
      form.skillIds.filter((t) => t !== tag)
    )
  }

  const handleTagKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      addTag()
    }
    if (e.key === 'Backspace' && !tagInput && form.skillIds.length > 0) {
      removeTag(form.skillIds[form.skillIds.length - 1])
    }
  }

  const validate = (): boolean => {
    const errs: Partial<Record<keyof SceneFormData, string>> = {}
    if (!form.name.trim()) errs.name = '场景名称不能为空'
    if (!form.description.trim()) errs.description = '描述不能为空'
    if (!form.goal.trim()) errs.goal = '目标不能为空'
    setErrors(errs)
    return Object.keys(errs).length === 0
  }

  const handleSubmit = () => {
    if (!validate()) return
    onSave(form)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    padding: '8px 12px',
    borderRadius: 'var(--r-sm, 8px)',
    border: '1px solid var(--c-border, #2a2a2a)',
    backgroundColor: 'var(--c-bg-input, #141414)',
    color: 'var(--c-fg, #e8e6e3)',
    fontSize: 14,
    outline: 'none',
    boxSizing: 'border-box'
  }

  const textareaStyle: React.CSSProperties = {
    ...inputStyle,
    resize: 'vertical',
    minHeight: 72,
    fontFamily: 'inherit'
  }

  const labelStyle: React.CSSProperties = {
    display: 'block',
    fontSize: 13,
    fontWeight: 500,
    color: 'var(--c-fg-muted, #8a8a8a)',
    marginBottom: 6
  }

  const fieldGroupStyle: React.CSSProperties = {
    marginBottom: 16
  }

  const errorTextStyle: React.CSSProperties = {
    fontSize: 12,
    color: '#e53e3e',
    marginTop: 4
  }

  const selectStyle: React.CSSProperties = {
    ...inputStyle,
    cursor: 'pointer',
    appearance: 'none'
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed',
    inset: 0,
    backgroundColor: 'rgba(0,0,0,0.6)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  }

  const modalStyle: React.CSSProperties = {
    width: 560,
    maxHeight: '85vh',
    overflow: 'auto',
    backgroundColor: 'var(--c-bg-card, #1a1a1a)',
    borderRadius: 'var(--r-lg, 12px)',
    border: '1px solid var(--c-border, #2a2a2a)',
    padding: 0
  }

  const modalHeaderStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '16px 20px',
    borderBottom: '1px solid var(--c-border, #2a2a2a)'
  }

  const modalTitleStyle: React.CSSProperties = {
    fontSize: 16,
    fontWeight: 600,
    color: 'var(--c-fg, #e8e6e3)'
  }

  const modalBodyStyle: React.CSSProperties = {
    padding: '20px'
  }

  const modalFooterStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'flex-end',
    gap: 8,
    padding: '12px 20px',
    borderTop: '1px solid var(--c-border, #2a2a2a)'
  }

  const tagWrapperStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 6,
    padding: '6px 8px',
    borderRadius: 'var(--r-sm, 8px)',
    border: `1px solid ${errors.skillIds ? '#e53e3e' : 'var(--c-border, #2a2a2a)'}`,
    backgroundColor: 'var(--c-bg-input, #141414)',
    cursor: 'text',
    alignItems: 'center'
  }

  const tagInputStyle: React.CSSProperties = {
    border: 'none',
    outline: 'none',
    backgroundColor: 'transparent',
    color: 'var(--c-fg, #e8e6e3)',
    fontSize: 14,
    flex: 1,
    minWidth: 80,
    padding: '2px 0'
  }

  const tagRemoveBtn: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 16,
    height: 16,
    borderRadius: '50%',
    border: 'none',
    cursor: 'pointer',
    backgroundColor: 'transparent',
    color: 'var(--c-fg-muted, #8a8a8a)',
    fontSize: 14,
    lineHeight: 1,
    padding: 0,
    marginLeft: 2
  }

  return (
    <div style={overlayStyle} onClick={onClose}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div style={modalHeaderStyle}>
          <span style={modalTitleStyle}>
            {initialData.name ? '编辑场景' : '新建场景'}
          </span>
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--c-fg-muted, #8a8a8a)',
              cursor: 'pointer',
              fontSize: 18,
              padding: 4
            }}
          >
            ✕
          </button>
        </div>

        {/* Body */}
        <div style={modalBodyStyle}>
          {/* name */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>场景名称 *</label>
            <input
              style={{
                ...inputStyle,
                borderColor: errors.name ? '#e53e3e' : inputStyle.borderColor
              }}
              value={form.name}
              onChange={(e) => handleChange('name', e.target.value)}
              placeholder="例如：客户异议处理"
              autoFocus
            />
            {errors.name && <div style={errorTextStyle}>{errors.name}</div>}
          </div>

          {/* description */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>描述 *</label>
            <textarea
              style={{
                ...textareaStyle,
                borderColor: errors.description ? '#e53e3e' : textareaStyle.borderColor
              }}
              value={form.description}
              onChange={(e) => handleChange('description', e.target.value)}
              placeholder="描述这个场景的用途和背景"
            />
            {errors.description && <div style={errorTextStyle}>{errors.description}</div>}
          </div>

          {/* goal */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>目标 *</label>
            <span
              style={{
                fontSize: 11,
                color: 'var(--c-fg-muted, #8a8a8a)',
                marginLeft: 8
              }}
            >
              （框架据此自适应调整）
            </span>
            <textarea
              style={{
                ...textareaStyle,
                borderColor: errors.goal ? '#e53e3e' : textareaStyle.borderColor
              }}
              value={form.goal}
              onChange={(e) => handleChange('goal', e.target.value)}
              placeholder="设定场景的核心目标，框架会根据此目标动态调整"
              minHeight={80}
            />
            {errors.goal && <div style={errorTextStyle}>{errors.goal}</div>}
          </div>

          {/* Row: priority + category */}
          <div style={{ display: 'flex', gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>优先级</label>
              <select
                style={selectStyle}
                value={form.priority}
                onChange={(e) => handleChange('priority', e.target.value)}
              >
                <option value="P0">P0 — 紧急</option>
                <option value="P1">P1 — 高</option>
                <option value="P2">P2 — 中</option>
                <option value="P3">P3 — 低</option>
              </select>
            </div>
            <div style={{ flex: 1 }}>
              <label style={labelStyle}>类别</label>
              <select
                style={selectStyle}
                value={form.category}
                onChange={(e) => handleChange('category', e.target.value)}
              >
                <option value="fixed">固定框架（fixed）</option>
                <option value="mix">混合框架（mix）</option>
                <option value="guided">引导框架（guided）</option>
              </select>
            </div>
          </div>

          {/* defaultAudience */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>
              默认受众
              <span style={{ fontSize: 11, color: 'var(--c-fg-muted, #8a8a8a)', marginLeft: 4 }}>
                （可选）
              </span>
            </label>
            <input
              style={inputStyle}
              value={form.defaultAudience}
              onChange={(e) => handleChange('defaultAudience', e.target.value)}
              placeholder="例如：一线客服、销售顾问"
            />
          </div>

          {/* skillIds — tag input */}
          <div style={fieldGroupStyle}>
            <label style={labelStyle}>
              关联技能
              <span style={{ fontSize: 11, color: 'var(--c-fg-muted, #8a8a8a)', marginLeft: 4 }}>
                （可选，Enter 添加）
              </span>
            </label>
            <div
              style={tagWrapperStyle}
              onClick={() => {
                const input = document.getElementById('scene-skill-tag-input')
                input?.focus()
              }}
            >
              {form.skillIds.map((tag) => (
                <span key={tag} style={styles.skillTag}>
                  {tag}
                  <button
                    style={tagRemoveBtn}
                    onClick={() => removeTag(tag)}
                    title="移除"
                  >
                    ×
                  </button>
                </span>
              ))}
              <input
                id="scene-skill-tag-input"
                style={tagInputStyle}
                value={tagInput}
                onChange={(e) => setTagInput(e.target.value)}
                onKeyDown={handleTagKeyDown}
                placeholder={form.skillIds.length === 0 ? '输入技能名称后按 Enter' : ''}
              />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div style={modalFooterStyle}>
          <Button variant="ghost" onClick={onClose}>
            取消
          </Button>
          <Button variant="primary" onClick={handleSubmit} disabled={saving}>
            {saving ? '保存中...' : initialData.name ? '保存修改' : '创建场景'}
          </Button>
        </div>
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Main Component                                                     */
/* ------------------------------------------------------------------ */

export function SceneManager({ onBack }: SceneManagerProps) {
  const [scenes, setScenes] = useState<Scene[]>([])
  const [stats, setStats] = useState<SceneStats | null>(null)
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editingScene, setEditingScene] = useState<Scene | null>(null)
  const [deletingScene, setDeletingScene] = useState<Scene | null>(null)
  const [saving, setSaving] = useState(false)
  const [hoveredRow, setHoveredRow] = useState<string | null>(null)

  /* ---- data fetching ---- */

  const loadData = useCallback(async () => {
    setLoading(true)
    try {
      const [sceneList, sceneStats] = await Promise.all([
        window.api.scene.list(),
        window.api.scene.stats()
      ])
      setScenes(sceneList)
      setStats(sceneStats)
    } catch (err) {
      console.error('Failed to load scenes:', err)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadData()
  }, [loadData])

  /* ---- CRUD handlers ---- */

  const handleNew = () => {
    setEditingScene(null)
    setModalOpen(true)
  }

  const handleEdit = (scene: Scene) => {
    setEditingScene(scene)
    setModalOpen(true)
  }

  const handleSave = async (formData: SceneFormData) => {
    setSaving(true)
    try {
      const payload = editingScene
        ? { ...editingScene, ...formData }
        : { ...formData }
      await window.api.scene.save(payload)
      setModalOpen(false)
      setEditingScene(null)
      await loadData()
    } catch (err) {
      console.error('Failed to save scene:', err)
    } finally {
      setSaving(false)
    }
  }

  const handleDeleteConfirm = async () => {
    if (!deletingScene) return
    try {
      await window.api.scene.delete(deletingScene.id)
      setDeletingScene(null)
      await loadData()
    } catch (err) {
      console.error('Failed to delete scene:', err)
    }
  }

  const getFormInitialData = (): SceneFormData => {
    if (editingScene) {
      return {
        name: editingScene.name,
        description: editingScene.description,
        goal: editingScene.goal,
        priority: editingScene.priority,
        category: editingScene.category,
        defaultAudience: editingScene.defaultAudience ?? '',
        skillIds: [...editingScene.skillIds]
      }
    }
    return { ...EMPTY_FORM }
  }

  /* ---- render helpers ---- */

  const renderPriorityBadge = (priority: Priority) => (
    <span style={styles.priorityBadge(priority)}>{PRIORITY_LABELS[priority]}</span>
  )

  const renderStats = () => {
    if (!stats) return null
    const categoryEntries = Object.entries(stats.byCategory).map(([key, val]) => [
      CATEGORY_LABELS[key as Category] || key,
      val
    ] as [string, number])
    const priorityEntries = Object.entries(stats.byPriority).sort(
      (a, b) => PRIORITY_LABELS[a[0] as Priority]?.localeCompare(PRIORITY_LABELS[b[0] as Priority] ?? '') ?? 0
    )

    return (
      <div style={styles.statsBar}>
        <div style={styles.statCard}>
          <span style={styles.statValue}>{stats.total}</span>
          <span style={styles.statLabel}>总场景数</span>
        </div>
        {priorityEntries.map(([key, val]) => (
          <div key={key} style={styles.statCard}>
            <span style={{ ...styles.statValue, color: PRIORITY_COLORS[key as Priority] || styles.statValue.color }}>
              {val}
            </span>
            <span style={styles.statLabel}>{key}</span>
          </div>
        ))}
        {categoryEntries.map(([label, val]) => (
          <div key={label} style={styles.statCard}>
            <span style={styles.statValue}>{val}</span>
            <span style={styles.statLabel}>{label}</span>
          </div>
        ))}
      </div>
    )
  }

  const renderTable = () => {
    if (scenes.length === 0) {
      return (
        <EmptyState
          icon="folder"
          title="暂无场景"
          description="创建一个写作场景来开始配置"
          action={
            <Button variant="primary" onClick={handleNew}>
              新建场景
            </Button>
          }
        />
      )
    }

    return (
      <div style={styles.tableWrapper}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>优先级</th>
              <th style={styles.th}>名称</th>
              <th style={styles.th}>描述</th>
              <th style={styles.th}>默认受众</th>
              <th style={{ ...styles.th, textAlign: 'center' }}>技能数</th>
              <th style={{ ...styles.th, textAlign: 'right' }}>操作</th>
            </tr>
          </thead>
          <tbody>
            {scenes.map((scene) => (
              <tr
                key={scene.id}
                style={{
                  ...styles.row,
                  ...(hoveredRow === scene.id ? styles.rowHover : {})
                }}
                onMouseEnter={() => setHoveredRow(scene.id)}
                onMouseLeave={() => setHoveredRow(null)}
                onDoubleClick={() => handleEdit(scene)}
              >
                <td style={styles.td}>{renderPriorityBadge(scene.priority)}</td>
                <td style={styles.td}>
                  <div style={styles.nameCell}>{scene.name}</div>
                </td>
                <td style={styles.td}>
                  <div style={styles.descCell}>{scene.description}</div>
                </td>
                <td style={{ ...styles.td, color: 'var(--c-fg-muted, #8a8a8a)', fontSize: 13 }}>
                  {scene.defaultAudience || <span style={{ opacity: 0.4 }}>—</span>}
                </td>
                <td style={{ ...styles.td, textAlign: 'center' }}>
                  {scene.skillIds.length > 0 ? (
                    <span style={styles.skillTag}>{scene.skillIds.length}</span>
                  ) : (
                    <span style={{ opacity: 0.3, fontSize: 13 }}>0</span>
                  )}
                </td>
                <td style={{ ...styles.td, textAlign: 'right' }}>
                  <div style={styles.actions}>
                    <button
                      style={styles.actionBtn}
                      onClick={(e) => {
                        e.stopPropagation()
                        handleEdit(scene)
                      }}
                      title="编辑"
                    >
                      <Icon name="edit" size={16} />
                    </button>
                    <button
                      style={styles.actionBtn}
                      onClick={(e) => {
                        e.stopPropagation()
                        setDeletingScene(scene)
                      }}
                      title="删除"
                    >
                      <Icon name="trash" size={16} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  /* ---- render ---- */

  return (
    <div style={styles.container}>
      <TopBar
        title="场景管理"
        onBack={onBack}
        actions={
          <Button variant="primary" size="sm" onClick={handleNew}>
            <Icon name="plus" size={14} style={{ marginRight: 4 }} />
            新建场景
          </Button>
        }
      />

      <div style={styles.body}>
        {loading ? (
          <div style={styles.loadingContainer}>
            <Icon name="spinner" size={24} />
            <span>加载场景中...</span>
          </div>
        ) : (
          <>
            {renderStats()}
            {renderTable()}
          </>
        )}
      </div>

      {/* Scene Form Modal */}
      <SceneFormModal
        open={modalOpen}
        initialData={getFormInitialData()}
        saving={saving}
        onSave={handleSave}
        onClose={() => {
          setModalOpen(false)
          setEditingScene(null)
        }}
      />

      {/* Delete Confirm Dialog */}
      <ConfirmDialog
        open={!!deletingScene}
        title="删除场景"
        message={`确定要删除场景「${deletingScene?.name ?? ''}」吗？此操作不可撤销。`}
        confirmLabel="删除"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingScene(null)}
      />
    </div>
  )
}
