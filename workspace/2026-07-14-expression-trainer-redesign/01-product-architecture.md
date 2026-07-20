# 01 - 产品架构设计文档

> 语音表达与文档工作站 · 产品架构
> 版本：v1.0 · 日期：2026-07-14 · 定位：自用工具

---

## 目录

1. [产品概述](#1-产品概述)
2. [系统架构](#2-系统架构)
3. [引擎层详解](#3-引擎层详解)
4. [模式层详解](#4-模式层详解)
5. [数据流设计](#5-数据流设计)
6. [扩展性说明](#6-扩展性说明)

---

## 1. 产品概述

### 1.1 一句话定位

**一个把"开口说话"变成"交付物"的本地语音工作站** —— 你对着麦克风讲，它实时听写、分析表达质量，并按你选择的模式产出训练报告或正式文档。

### 1.2 核心价值主张

| 维度 | 传统表达训练工具 | 本产品 |
|------|----------------|--------|
| 输出 | 只有"评分/反馈" | 训练报告 + 可交付文档（报告/纪要/邮件/笔记） |
| 反馈 | 事后一次性给 | 录制中实时高亮（填充词、犹豫词、笼统词、有力表达） |
| 文档生成 | 纯转换，给完即走 | 转换 + 对比教学（标注每处改动的原文、改后、原因） |
| 隐私 | 云端上传 | 全本地 ASR；AI 双模式（云端 API 或本地 Ollama）可切换 |
| 定位 | 通用 SaaS | 自用工作站，单一用户、单一设备、零妥协 |

### 1.3 核心差异化：转换 + 对比教学

文档模式不是"语音转文字再润色"的一次性黑盒。它产出三栏并列视图：

```
┌──────────────┬──────────────┬──────────────┐
│  原文标注     │  正式文档     │  变更说明     │
│ (你说了什么)  │ (改成什么样) │ (为什么改)   │
└──────────────┴──────────────┴──────────────┘
```

每一处改动都可在三栏间联动定位：点击"变更说明"里的某条，左侧原文对应句子高亮，右侧正式文档的对应段落高亮。这让每一次文档生成都附带一次"表达教学"。

---

## 2. 系统架构

### 2.1 分层总览

整个应用分为三层，自下而上：**引擎层 → 模式层 → 表现层**。引擎层是共享底层，模式层各自独立配置，表现层根据模式配置渲染 UI。

```
┌─────────────────────────────────────────────────────────────┐
│                    表现层 (Presentation)                      │
│   React 组件 · Framer Motion 动画 · Tailwind 样式            │
│   根据 Mode 配置决定显示什么、怎么显示                          │
└────────────────────────┬────────────────────────────────────┘
                         │ 读取 Mode 配置 + 调用引擎
┌────────────────────────┴────────────────────────────────────┐
│                    模式层 (Mode Layer)                        │
│                                                              │
│   ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌───────┐│
│   │ 训练模式 │ │ 报告模式 │ │ 纪要模式 │ │ 邮件模式 │ │笔记模式││
│   │ Train   │ │ Report  │ │ Minutes │ │  Mail   │ │ Notes ││
│   └─────────┘ └─────────┘ └─────────┘ └─────────┘ └───────┘│
│         每个模式 = 一个 Mode 配置对象（声明式）                 │
└────────────────────────┬────────────────────────────────────┘
                         │ 统一通过引擎接口调用
┌────────────────────────┴────────────────────────────────────┐
│                    引擎层 (Engine Layer)                      │
│                                                              │
│   ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│   │ ASR Engine   │  │ Lexicon Eng. │  │ AI Backend   │      │
│   │ (Sherpa-ONNX)│  │ (词库分析)    │  │ (云/本地双模) │      │
│   └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

### 2.2 层级关系与接口边界

**关键原则：模式层不直接碰底层 SDK，引擎层不知道上层有几个模式。**

| 层 | 职责 | 知道什么 | 不知道什么 |
|----|------|---------|-----------|
| 引擎层 | 提供原子能力（听写、分析、生成） | 自己的输入输出契约 | 上层有几种模式、UI 长什么样 |
| 模式层 | 声明"这个模式要什么、怎么处理、结果怎么展示" | 引擎接口 + 自己的配置 | 引擎内部实现细节 |
| 表现层 | 把状态和配置渲染成界面，处理用户交互 | 当前 Mode 配置 + 当前状态 | 引擎怎么干活 |

**接口边界规则：**
- 引擎层对上只暴露 `init / start / feed / stop / analyze / generate` 这类动词方法，返回纯数据结构。
- 模式层是纯配置对象（`Mode` interface 的实例），不含业务逻辑分支。
- 表现层有一个通用的 `<ModeWorkspace mode={...} />` 组件，根据 Mode 配置决定渲染哪些子组件、调用哪个引擎方法。

### 2.3 进程架构（Electron）

```
┌─────────────── Main Process ───────────────┐
│  · 窗口管理、生命周期                          │
│  · 文件 I/O（保存报告/导出文档）                │
│  · ASR Engine（CPU 密集，放主进程避免阻塞渲染） │
│  · Lexicon Engine（纯计算）                   │
│  · AI Backend（网络/本地 Ollama HTTP）        │
└───────────────────┬────────────────────────┘
                    │ IPC (ipcMain.handle)
┌───────────────────┴────────────────────────┐
│              Renderer Process               │
│  · React UI                                  │
│  · 状态机 (idle/recording/processing/result) │
│  · 音频采集 (Web Audio API → Float32Array)   │
│  · 通过 IPC 把音频帧喂给主进程 ASR            │
└─────────────────────────────────────────────┘
```

**音频流方向：** 麦克风 → Renderer 的 AudioWorklet → Float32Array 分帧 → IPC 推送 Main → ASR `feedSamples()` → 识别文本回流 Renderer。

**为什么 ASR 放主进程：** Sherpa-ONNX 的模型推理是 CPU/GPU 密集型，放 Renderer 会卡 UI 线程。主进程通过 IPC 把增量识别结果（partial/final）推回渲染进程即可。

---

## 3. 引擎层详解

三个引擎各司其职，互不依赖。模式层按需组合调用。

### 3.1 ASR Engine（语音识别引擎）

**职责：** 把麦克风的音频流实时转成中文文本。基于 Sherpa-ONNX，离线、本地、无网络。

**为什么这样抽象：** 把"识别器实现"和"音频来源"解耦。ASR Engine 只认 `Float32Array` 样本，不关心音频是来自麦克风、音频文件还是网络流。这让未来支持"导入音频文件转写"几乎零成本。

**接口定义：**

```typescript
interface ASREngine {
  /** 初始化 Sherpa-ONNX 识别器，加载声学模型 + 语言模型。幂等。 */
  init(config?: ASRConfig): Promise<void>

  /** 创建一条新的识别流。一次录制对应一条流。 */
  startStream(): ASRStream

  /** 喂入音频样本（16kHz 单声道 Float32，归一化到 [-1,1]）。
   *  返回增量识别结果。partial 表示中间结果（会变），final 表示已确定。 */
  feedSamples(samples: Float32Array): { text: string; isFinal: boolean }

  /** 结束流，返回整段最终文本。内部 flush 残留帧。 */
  stopStream(): Promise<string>

  /** 释放模型资源。应用退出时调用。 */
  dispose(): void
}

interface ASRConfig {
  modelPath: string         // 模型目录
  sampleRate: 16000         // 固定 16k
  decodingMethod: 'greedy_search' | 'modified_beam_search'
  enableITN: boolean        // 逆文本归一化（数字/日期口语→书面）
}

interface ASRStream {
  id: string
  createdAt: number
}
```

**数据流：**

```
麦克风 PCM 16k
   │
   ▼  (每 ~100ms 一帧, Float32Array)
feedSamples()
   │
   ▼
Sherpa-ONNX OnlineRecognizer.acceptWaveform()
   │
   ├──→ partial text (中间结果, UI 实时显示, 灰色)
   │
   ▼  (检测到 endpoint / 静音段)
final text (确定结果, UI 转黑色, 进入累积文本)
```

**关键点：**
- 增量返回：每帧都返回当前 `text`，`isFinal` 在端点检测触发时为 true。
- 累积策略：调用方（模式层）负责把多个 final 片段拼成完整文本。ASR Engine 只管当前流。
- ITN 开启：口语"两百块" → 书面"200元"，减少后续词库分析的噪音。

### 3.2 Lexicon Engine（词库分析引擎）

**职责：** 对文本做基于词库的"表达质量分析"——找出填充词、犹豫词、笼统词、情绪词、有力表达，并给出统计。纯本地、纯规则、零延迟。

**为什么这样抽象：** 词库分析是"训练模式"的核心，但文档模式也可能用它（给变更说明提供"原文为什么弱"的佐证）。把它独立成引擎，任何模式按需调用，而不是焊死在训练流程里。

**接口定义：**

```typescript
interface LexiconEngine {
  /** 加载词库数据（JSON）。支持热重载。 */
  load(path: string): Promise<void>

  /** 分析一段文本，返回标注结果 + 统计。无副作用。 */
  analyze(text: string): LexiconResult
}

interface LexiconResult {
  /** 填充词命中：嗯/啊/那个/就是/然后... */
  fillers: LexiconHit[]
  /** 犹豫词命中：可能/也许/大概/应该吧/算是... */
  hedges: LexiconHit[]
  /** 笼统词命中：很好/不错/各种/之类/东西... */
  vagueWords: LexiconHit[]
  /** 情绪词命中：开心/焦虑/愤怒...(带强度) */
  emotions: EmotionHit[]
  /** 高亮片段：把上面四类压平成有序列表，供字幕渲染 */
  highlights: Highlight[]
  /** 汇总统计 */
  stats: LexiconStats
}

interface LexiconHit {
  word: string
  position: number      // 在原文的字符偏移
  suggestion: string    // 替换建议，如 "嗯" → "（删除）"
}

interface EmotionHit {
  word: string
  category: 'positive' | 'negative' | 'neutral'
  intensity: number     // 0-1
}

interface Highlight {
  text: string
  type: 'filler' | 'hedge' | 'vague' | 'strong'
  position: number
}

interface LexiconStats {
  fillerCount: number
  hedgeCount: number
  vagueCount: number
  emotionCount: number
}
```

**数据流：**

```
ASR 累积文本
   │
   ▼
Lexicon.analyze(text)
   │
   ├──→ fillers / hedges / vagueWords / emotions  (清单，供报告)
   ├──→ highlights  (有序片段，供字幕实时高亮染色)
   └──→ stats  (计数，供录制中的统计条)
```

**调用时机（两种）：**
- **录制中**：每收到一段 final text 就 `analyze` 一次，UI 字幕根据 `highlights` 染色，统计条根据 `stats` 滚动数字。
- **录制后**：对完整文本做一次完整 `analyze`，结果喂给报告或文档生成的变更说明。

**词库数据结构（示意）：**

```json
{
  "fillers": [
    { "word": "嗯", "suggestion": "（删除或停顿替代）" },
    { "word": "那个", "suggestion": "（删除，直接进入下文）" }
  ],
  "hedges": [
    { "word": "可能", "suggestion": "用更确定的判断或给出依据" }
  ],
  "vague": [
    { "word": "很好", "suggestion": "具体说明好在哪里，用数据或事实" }
  ],
  "emotions": [
    { "word": "焦虑", "category": "negative", "intensity": 0.7 }
  ]
}
```

### 3.3 AI Backend（AI 后端）

**职责：** 提供两种 AI 能力——"表达反馈"（训练用）和"文档生成"（文档模式用）。双模式可切换：云端 API（OpenAI 兼容）或本地 Ollama。

**为什么这样抽象：** 云端和本地对上层应该是透明的。切换只是 `configure()` 时传不同 provider，调用方代码不变。这层封装抹平了两个后端的请求格式、流式协议、错误处理的差异。

**接口定义：**

```typescript
interface AIBackend {
  /** 配置后端。切换云端/本地只需改这里。 */
  configure(config: AIConfig): void

  /** 流式生成表达反馈（训练模式用）。逐 token 回调。 */
  streamFeedback(
    text: string,
    options?: { customPrompt?: string; onToken?: (t: string) => void }
  ): Promise<string>

  /** 生成训练报告（训练模式用，结构化）。 */
  generateReport(
    text: string,
    stats: LexiconStats,
    options?: { customPrompt?: string }
  ): Promise<TrainingReport>

  /** 生成文档（文档模式用）。返回正式文档 + 变更清单 + 摘要。 */
  generateDocument(
    text: string,
    docType: DocType,
    options?: { customPrompt?: string }
  ): Promise<DocumentResult>
}

interface AIConfig {
  provider: 'cloud' | 'ollama'
  // cloud 模式
  apiKey?: string
  baseURL?: string
  model?: string        // 如 'gpt-4o-mini'
  // ollama 模式
  ollamaUrl?: string    // 如 'http://localhost:11434'
  ollamaModel?: string  // 如 'qwen2.5:7b'
}

type DocType = 'formal-report' | 'meeting-minutes' | 'email' | 'notes-weekly'

interface TrainingReport {
  scores: {
    clarity: number      // 清晰度 0-100
    conciseness: number  // 简洁度
    confidence: number   // 自信度
    structure: number    // 结构性
    emotion: number      // 情绪稳定
    persuasiveness: number // 说服力
  }
  summary: string
  strengths: string[]
  improvements: string[]
}

interface DocumentResult {
  content: string                 // 正式文档（Markdown）
  changes: DocChange[]            // 变更清单（对比教学的燃料）
  summary: string                 // 一句话总结这次转换
}

interface DocChange {
  original: string                // 原文片段
  revised: string                 // 改后片段
  reason: string                  // 为什么改
  type: 'conciseness' | 'formality' | 'clarity' | 'structure' | 'filler-removal'
}
```

**数据流（以文档生成为例）：**

```
完整文本 + docType
   │
   ▼
AIBackend.generateDocument()
   │
   ▼  构造 prompt（含 docType 模板 + "输出 changes 清单"指令）
   │
   ├──→ cloud: POST /v1/chat/completions (stream=true)
   └──→ ollama: POST /api/chat (stream=true)
   │
   ▼  解析流式 JSON, 累积内容
   │
   ▼  解析出 content + changes + summary
DocumentResult
```

**双模式实现要点：**
- 两个后端都走 SSE/流式，但响应字段不同。封装层统一成 `onToken` 回调。
- Prompt 模板按 `docType` 切换，存成独立文件（`prompts/report.md` 等），便于单独迭代。
- 强制要求模型输出结构化 changes：prompt 里给 JSON schema 示例 + few-shot。若模型不遵循，降级为只返回 content、changes 为空。

---

## 4. 模式层详解

每个模式是一个 `Mode` 配置对象。表现层读取配置决定行为。

### 4.1 Mode 接口回顾

```typescript
interface Mode {
  id: string
  name: string
  recordingConfig: {
    showLexiconHighlights: boolean
    showStats: boolean
    showFeedback: boolean
    subtitleStyle: 'annotated' | 'clean'
  }
  processing: {
    useLexicon: boolean
    aiTask: 'feedback' | 'document'
    docType?: string
  }
  resultView: 'report' | 'document-compare' | 'document-only'
}
```

### 4.2 五个模式配置表

#### 模式 1：训练模式（Train）— MVP

| 维度 | 配置 |
|------|------|
| id | `train` |
| name | 训练 |
| **录制时** | |
| showLexiconHighlights | `true`（字幕实时染色：填充词红、犹豫词琥珀、笼统词沙金、有力表达绿） |
| showStats | `true`（顶部统计条：填充词数 / 犹豫词数 / 笼统词数 / 时长，数字滚动） |
| showFeedback | `true`（右栏流式 AI 反馈，边录边出） |
| subtitleStyle | `annotated`（带词库标注的字幕） |
| **录制后** | |
| useLexicon | `true`（完整文本再做一次 analyze，喂给报告） |
| aiTask | `feedback` |
| **结果视图** | `report`（6 维度雷达 + 优势 + 改进建议） |

**对引擎的调用：**
```
录制中: ASR.feedSamples() → Lexicon.analyze(partial) → AIBackend.streamFeedback()
录制后: ASR.stopStream() → Lexicon.analyze(full) → AIBackend.generateReport(text, stats)
```

#### 模式 2：正式报告模式（Report）— MVP

| 维度 | 配置 |
|------|------|
| id | `report` |
| name | 报告 |
| **录制时** | |
| showLexiconHighlights | `false`（不染色，避免干扰"讲内容"的注意力） |
| showStats | `false` |
| showFeedback | `false` |
| subtitleStyle | `clean`（干净字幕，只显示识别文本） |
| **录制后** | |
| useLexicon | `false`（报告模式不评分，专注内容转换） |
| aiTask | `document` |
| docType | `formal-report` |
| **结果视图** | `document-compare`（三栏：原文标注 \| 正式文档 \| 变更说明） |

**对引擎的调用：**
```
录制中: ASR.feedSamples()  (只用 ASR，Lexicon/AI 不参与)
录制后: ASR.stopStream() → AIBackend.generateDocument(text, 'formal-report')
```

**为什么录制时关闭词库分析：** 报告模式的用户注意力在"内容对不对、全不全"，不在"我有没有说嗯"。实时高亮填充词会制造不必要的心理负担。词库能力保留在引擎层，需要时可随时打开。

#### 模式 3：会议纪要模式（Minutes）— 后续

| 维度 | 配置 |
|------|------|
| id | `minutes` |
| name | 纪要 |
| 录制时 | clean 字幕，无分析。可选显示时长 |
| 录制后 | aiTask=`document`, docType=`meeting-minutes` |
| 结果视图 | `document-compare`（纪要重点是"决议/待办/责任人"提取，changes 聚焦结构化） |

#### 模式 4：邮件消息模式（Mail）— 后续

| 维度 | 配置 |
|------|------|
| id | `mail` |
| name | 邮件 |
| 录制时 | clean 字幕 |
| 录制后 | aiTask=`document`, docType=`email` |
| 结果视图 | `document-only`（邮件较短，变更少，单栏即可，底部附"修改要点"折叠区） |

#### 模式 5：笔记周报模式（Notes）— 后续

| 维度 | 配置 |
|------|------|
| id | `notes` |
| name | 笔记 |
| 录制时 | clean 字幕，可选开 stats（统计信息密度） |
| 录制后 | aiTask=`document`, docType=`notes-weekly` |
| 结果视图 | `document-compare`（changes 聚焦"口语流水账→结构化条目"） |

### 4.3 模式配置矩阵速查

| 模式 | 字幕样式 | 词库高亮 | 统计条 | 实时反馈 | AI 任务 | 结果视图 |
|------|---------|---------|--------|---------|---------|---------|
| 训练 | annotated | ✓ | ✓ | ✓ | feedback | report |
| 报告 | clean | ✗ | ✗ | ✗ | document | document-compare |
| 纪要 | clean | ✗ | ✗ | ✗ | document | document-compare |
| 邮件 | clean | ✗ | ✗ | ✗ | document | document-only |
| 笔记 | clean | ✗ | 可选 | ✗ | document | document-compare |

---

## 5. 数据流设计

### 5.1 训练模式数据流

```
┌─────────┐
│  麦克风   │
└────┬────┘
     │ PCM 16k mono
     ▼
┌─────────────────┐
│ AudioWorklet     │  每 ~100ms 产出一帧 Float32Array(1600)
│ (Renderer)       │
└────┬────────────┘
     │ IPC: asr:feed { samples }
     ▼
┌─────────────────┐
│ ASR Engine       │  feedSamples() → { text, isFinal }
│ (Main)           │
└────┬────────────┘
     │ IPC 回推: asr:result { text, isFinal }
     ▼
┌─────────────────────────────────────────────────────┐
│  Renderer 状态管理                                    │
│                                                       │
│  partial text ──→ 字幕区(灰色, 实时变)                 │
│  final text ────→ 累积到 fullText                      │
│                  ├─→ Lexicon.analyze(fullText)         │
│                  │     ├─ highlights → 字幕染色         │
│                  │     └─ stats → 统计条数字滚动        │
│                  └─→ AIBackend.streamFeedback(fullText)│
│                        └─ onToken → 右栏反馈流式输出    │
└─────────────────────────────────────────────────────┘

==== 用户点击"停止" ====

┌─────────────────┐
│ ASR.stopStream() │ → 最终 fullText
└────┬────────────┘
     ▼
┌──────────────────────────────────────────┐
│ Lexicon.analyze(fullText) → stats         │
└────┬─────────────────────────────────────┘
     ▼
┌──────────────────────────────────────────────────┐
│ AIBackend.generateReport(fullText, stats)         │
│   → { scores(6维), summary, strengths, improvements }│
└────┬─────────────────────────────────────────────┘
     ▼
┌─────────────────┐
│ 报告视图 (report) │  6 维度雷达 + 文字
└─────────────────┘
```

### 5.2 文档模式（正式报告）数据流

```
┌─────────┐
│  麦克风   │
└────┬────┘
     │ PCM 16k mono
     ▼
┌─────────────────┐
│ AudioWorklet     │
└────┬────────────┘
     │ IPC: asr:feed
     ▼
┌─────────────────┐
│ ASR Engine       │  feedSamples() → { text, isFinal }
└────┬────────────┘
     │ IPC 回推
     ▼
┌──────────────────────────────────┐
│  Renderer 状态管理                 │
│                                    │
│  partial → 字幕区(灰色)            │
│  final → 累积 fullText             │
│                                    │
│  (Lexicon / AI 不参与, 干净字幕)    │
└──────────────────────────────────┘

==== 用户点击"停止" ====

┌─────────────────┐
│ ASR.stopStream() │ → 最终 fullText
└────┬────────────┘
     ▼
┌──────────────────────────────────────────────────┐
│ AIBackend.generateDocument(fullText, 'formal-report')│
│   → { content, changes[], summary }                │
└────┬─────────────────────────────────────────────┘
     ▼
┌─────────────────────────────────────────────────────┐
│ 三栏对比视图 (document-compare)                       │
│                                                       │
│  左栏: fullText + 高亮改动位置 (来自 changes 匹配)      │
│  中栏: content (正式文档, Markdown 渲染)               │
│  右栏: changes 清单 (original/revised/reason)          │
│  三栏联动: 点右栏条目 → 左/中对应处高亮                 │
└─────────────────────────────────────────────────────┘
```

### 5.3 两条数据流的关键差异

| 环节 | 训练模式 | 文档模式 |
|------|---------|---------|
| 录制中引擎 | ASR + Lexicon + AI(流式反馈) | 仅 ASR |
| 录制中 UI 信息密度 | 高（字幕染色 + 统计 + 反馈） | 低（纯字幕） |
| 录制后处理 | Lexicon 完整分析 + AI 报告 | AI 文档生成 |
| 结果产物 | 6 维评分报告 | 可编辑/导出的文档 + 教学性变更清单 |

---

## 6. 扩展性说明

### 6.1 新增一个模式需要做什么

假设未来要加"演讲稿模式"（把口语转成演讲稿，强化节奏和排比）。工作量分三档：

**最小代价（纯配置，0 行逻辑代码）：**

如果新模式只是现有能力的组合，只需新增一个 Mode 配置对象：

```typescript
{
  id: 'speech',
  name: '演讲稿',
  recordingConfig: {
    showLexiconHighlights: true,   // 演讲要控填充词
    showStats: true,
    showFeedback: false,
    subtitleStyle: 'annotated'
  },
  processing: {
    useLexicon: true,
    aiTask: 'document',
    docType: 'speech-draft'
  },
  resultView: 'document-compare'
}
```

加一个 `prompts/speech-draft.md` 模板文件。在 Tab 栏配置里注册。完成。表现层的 `<ModeWorkspace>` 会自动按配置渲染。

**中等代价（新的 docType + prompt 工程）：**

新文档类型需要 AI 输出特殊结构。在 AI Backend 的 `generateDocument` 里加一个 `docType` 分支（或 prompt 模板），定义该类型的 prompt 和（如有）输出 schema。引擎层代码结构不变，只是多一条配置。

**最大代价（新引擎能力）：**

如果新模式需要全新能力（如"语速/停顿分析"需要新的信号处理引擎），则在引擎层新增一个 `ProsodyEngine`，定义接口，在 Mode 配置里声明是否启用。表现层加一个对应的展示组件。但这种情况下，现有三个引擎和五个模式都不需要改动——新增是加法。

### 6.2 架构可扩展性的三个保证

1. **引擎层不知道模式数量。** 加模式不动引擎代码。
2. **模式层是声明式配置。** 加模式是加一个对象 + 一个 prompt 文件，不是加 if/else 分支。
3. **表现层由配置驱动。** `<ModeWorkspace>` 根据 Mode 的 `recordingConfig` / `processing` / `resultView` 决定渲染什么组件。新增 `resultView` 类型才需要加组件，否则复用现有。

### 6.3 不该改的地方（防止架构腐蚀）

- 不要在表现层直接调 Sherpa-ONNX。必须经 ASR Engine 接口。
- 不要在某个模式组件里硬编码词库分析。必须经 Lexicon Engine。
- 不要为单个模式在引擎层加 `if (mode === 'xxx')` 分支。模式的差异体现在配置和 prompt，不体现在引擎逻辑。
- AI Backend 的 `provider` 切换只应发生在 `configure()`，不应在调用方法里传 provider 参数。

---

## 附录：技术栈确认

| 层 | 技术 |
|----|------|
| 桌面框架 | Electron |
| 构建 | Vite |
| UI | React + TypeScript |
| 样式 | Tailwind CSS |
| 无样式行为组件 | Radix UI |
| 动画 | Framer Motion |
| ASR | Sherpa-ONNX（本地，离线中文） |
| AI（云） | OpenAI 兼容 API |
| AI（本地） | Ollama |
| 设计 token | Tailwind config + CSS variables |

---

*文档结束。下一篇：02-interaction-flow.md（交互流程）*
