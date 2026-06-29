#!/usr/bin/env node
/**
 * fetch-meetings.js - JoyMinutes 会议记录提取
 *
 * 检测用户当前正在使用的浏览器，复用其登录态获取会议数据。
 * 支持 Chrome 和 Tabbit（基于 Chromium，支持 CDP）
 * 注意：Safari 和 Firefox 不支持 CDP，无法直接复用。
 *
 * Usage:
 *   node fetch-meetings.js                                    # 今天的会议
 *   node fetch-meetings.js --date yesterday                   # 昨天的会议
 *   node fetch-meetings.js --start 2026-06-03 --end 2026-06-09  # 日期区间
 *   node fetch-meetings.js --date 2026-06-08 --detail         # 含文字记录
 *   node fetch-meetings.js --id 21ac80c26e507f76 --detail     # 指定会议ID
 *
 * Output: JSON on stdout
 */

const { spawn, execSync, exec } = require('child_process')
const { existsSync, mkdirSync, copyFileSync, readdirSync, unlinkSync, statSync } = require('fs')
const { join } = require('path')
const { homedir, platform: osPlatform } = require('os')
const http = require('http')
const net = require('net')
const crypto = require('crypto')

// ─── Configuration ─────────────────────────────────────────
const CDP_PORT_START = 9333 // 起始端口
const CDP_PORT_END = 9350 // 结束端口
const CDP_TIMEOUT_MS = 20000
const NAV_TIMEOUT_MS = 15000
const EVAL_TIMEOUT_MS = 60000

// 动态分配的 CDP 端口
let CDP_PORT = CDP_PORT_START

// 检测端口是否可用
function isPortAvailable(port) {
  return new Promise((resolve) => {
    const server = net.createServer()
    server.once('error', () => resolve(false))
    server.once('listening', () => {
      server.close()
      resolve(true)
    })
    server.listen(port, '127.0.0.1')
  })
}

// 查找可用端口
async function findAvailablePort(startPort, endPort) {
  for (let port = startPort; port <= endPort; port++) {
    const available = await isPortAvailable(port)
    if (available) {
      return port
    }
  }
  throw new Error(`No available port found in range ${startPort}-${endPort}`)
}

// ─── Parse CLI args ────────────────────────────────────────
function getArg(name) {
  const idx = process.argv.indexOf('--' + name)
  return idx !== -1 && process.argv[idx + 1] ? process.argv[idx + 1] : null
}
const hasFlag = (name) => process.argv.includes('--' + name)

function parseDateRange() {
  const startArg = getArg('start')
  const endArg = getArg('end')
  const dateArg = getArg('date')
  const today = new Date()
  today.setHours(0, 0, 0, 0)

  if (startArg && endArg) {
    return { start: new Date(startArg), end: new Date(endArg) }
  }

  if (dateArg) {
    if (dateArg === 'today') return { start: today, end: today }
    if (dateArg === 'yesterday') {
      const d = new Date(today)
      d.setDate(d.getDate() - 1)
      return { start: d, end: d }
    }
    if (dateArg === 'thisweek' || dateArg === 'week') {
      // 本周：从周一到今天
      const dayOfWeek = today.getDay() // 0=周日, 1=周一, ..., 6=周六
      const monday = new Date(today)
      // 计算周一：如果是周日(0)，则周一在6天前；否则周一在 (dayOfWeek-1) 天前
      monday.setDate(today.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
      return { start: monday, end: today }
    }
    if (dateArg === 'lastweek') {
      // 上周：从上周一到上周日
      const dayOfWeek = today.getDay()
      const lastSunday = new Date(today)
      // 上周日：如果今天是周日(0)，则上周日是7天前；否则上周日是 dayOfWeek 天前
      lastSunday.setDate(today.getDate() - (dayOfWeek === 0 ? 7 : dayOfWeek))
      const lastMonday = new Date(lastSunday)
      lastMonday.setDate(lastSunday.getDate() - 6)
      return { start: lastMonday, end: lastSunday }
    }
    const m = dateArg.match(/^last(\d+)days?$/i)
    if (m) {
      const d = new Date(today)
      d.setDate(d.getDate() - parseInt(m[1]) + 1)
      return { start: d, end: today }
    }
    const parsed = new Date(dateArg)
    return { start: parsed, end: parsed }
  }

  return { start: today, end: today }
}

const MEETING_ID = getArg('id')
const WANT_DETAIL = hasFlag('detail')
const { start: START_DATE, end: END_DATE } = parseDateRange()

function fmt(d) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, '0')
  const day = String(d.getDate()).padStart(2, '0')
  return `${y}-${m}-${day}`
}

// ─── Helpers ───────────────────────────────────────────────
function output(obj) {
  process.stdout.write(JSON.stringify(obj, null, 2) + '\n')
}

function getProfileDir(browserType) {
  const baseDir =
    osPlatform() === 'win32' ? join(process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local'), '.zero') : join(homedir(), '.zero')
  return join(baseDir, 'chrome-profile-' + (browserType || 'default'))
}

// ─── Browser Detection ─────────────────────────────────────

// 检测正在运行的浏览器（通过进程）
function detectRunningBrowsers() {
  const running = { chrome: false, tabbit: false, edge: false, safari: false, firefox: false }

  try {
    if (osPlatform() === 'darwin') {
      const result = execSync('ps aux | grep -i "Google Chrome\\|Tabbit\\|Microsoft Edge\\|Safari\\|Firefox" | grep -v grep', {
        encoding: 'utf8',
        timeout: 5000,
      })
      running.chrome = result.includes('Google Chrome')
      running.tabbit = result.includes('Tabbit')
      running.edge = result.includes('Microsoft Edge')
      running.safari = result.includes('Safari') && !result.includes('Tabbit')
      running.firefox = result.includes('Firefox')
    } else if (osPlatform() === 'win32') {
      const result = execSync('tasklist', { encoding: 'utf8', timeout: 5000 })
      running.chrome = result.toLowerCase().includes('chrome.exe')
      running.tabbit = result.toLowerCase().includes('tabbit')
      running.edge = result.toLowerCase().includes('msedge.exe')
      running.firefox = result.toLowerCase().includes('firefox')
    }
  } catch {}

  return running
}

// 检测浏览器安装路径
function getBrowserPath(browserType) {
  if (osPlatform() === 'darwin') {
    const paths = []
    if (browserType === 'chrome') {
      paths.push(
        '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
        join(homedir(), 'Applications/Google Chrome.app/Contents/MacOS/Google Chrome'),
      )
    } else if (browserType === 'tabbit') {
      paths.push('/Applications/Tabbit.app/Contents/MacOS/Tabbit', join(homedir(), 'Applications/Tabbit.app/Contents/MacOS/Tabbit'))
    } else if (browserType === 'edge') {
      paths.push(
        '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
        join(homedir(), 'Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge'),
      )
    } else if (browserType === 'chromium') {
      paths.push('/Applications/Chromium.app/Contents/MacOS/Chromium', join(homedir(), 'Applications/Chromium.app/Contents/MacOS/Chromium'))
    }
    for (const p of paths) {
      if (existsSync(p)) return p
    }
  } else if (osPlatform() === 'win32') {
    const pf = process.env['ProgramFiles'] || 'C:\\Program Files'
    const pfx86 = process.env['ProgramFiles(x86)'] || 'C:\\Program Files (x86)'
    const localApp = process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local')
    const paths = []
    if (browserType === 'chrome') {
      paths.push(
        join(pf, 'Google\\Chrome\\Application\\chrome.exe'),
        join(pfx86, 'Google\\Chrome\\Application\\chrome.exe'),
        join(localApp, 'Google\\Chrome\\Application\\chrome.exe'),
      )
    } else if (browserType === 'tabbit') {
      paths.push(
        join(pf, 'Tabbit\\Application\\tabbit.exe'),
        join(pfx86, 'Tabbit\\Application\\tabbit.exe'),
        join(localApp, 'Tabbit\\Application\\tabbit.exe'),
      )
    } else if (browserType === 'edge') {
      paths.push(
        join(pf, 'Microsoft\\Edge\\Application\\msedge.exe'),
        join(pfx86, 'Microsoft\\Edge\\Application\\msedge.exe'),
        join(localApp, 'Microsoft\\Edge\\Application\\msedge.exe'),
      )
    }
    for (const p of paths) {
      if (existsSync(p)) return p
    }
  } else if (osPlatform() === 'linux') {
    const paths = []
    if (browserType === 'chrome') {
      paths.push('/usr/bin/google-chrome', '/usr/bin/google-chrome-stable', '/snap/bin/google-chrome')
    } else if (browserType === 'chromium') {
      paths.push('/usr/bin/chromium', '/usr/bin/chromium-browser', '/snap/bin/chromium')
    } else if (browserType === 'edge') {
      paths.push('/usr/bin/microsoft-edge', '/usr/bin/microsoft-edge-stable')
    }
    for (const p of paths) {
      if (existsSync(p)) return p
    }
  }
  return null
}

function getSourceUserDataDir(browserType) {
  if (osPlatform() === 'darwin') {
    if (browserType === 'tabbit') return join(homedir(), 'Library/Application Support/Tabbit')
    if (browserType === 'edge') return join(homedir(), 'Library/Application Support/Microsoft Edge')
    if (browserType === 'chromium') return join(homedir(), 'Library/Application Support/Chromium')
    return join(homedir(), 'Library/Application Support/Google/Chrome')
  } else if (osPlatform() === 'win32') {
    const localApp = process.env.LOCALAPPDATA || join(homedir(), 'AppData', 'Local')
    if (browserType === 'tabbit') return join(localApp, 'Tabbit\\User Data')
    if (browserType === 'edge') return join(localApp, 'Microsoft\\Edge\\User Data')
    if (browserType === 'chromium') return join(localApp, 'Chromium\\User Data')
    return join(localApp, 'Google\\Chrome\\User Data')
  } else if (osPlatform() === 'linux') {
    if (browserType === 'edge') return join(homedir(), '.config/microsoft-edge')
    if (browserType === 'chromium') return join(homedir(), '.config/chromium')
    return join(homedir(), '.config/google-chrome')
  }
  return null
}

// 检查浏览器是否有远程调试端口开启
function checkRemoteDebuggingPort(port) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/json/version`, { timeout: 2000 }, (res) => {
      if (res.statusCode === 200) {
        let d = ''
        res.on('data', (c) => {
          d += c
        })
        res.on('end', () => resolve({ alive: true, port }))
      } else resolve({ alive: false })
    })
    req.on('error', () => resolve({ alive: false }))
    req.on('timeout', () => {
      req.destroy()
      resolve({ alive: false })
    })
  })
}

// 检测正在运行的浏览器的调试端口
async function detectRunningBrowserPort(browserType) {
  // 常见调试端口
  const portsToCheck = [9222, 9223, 9229, 9333]

  for (const port of portsToCheck) {
    const result = await checkRemoteDebuggingPort(port)
    if (result.alive) {
      // 检查这个端口是否属于目标浏览器
      try {
        const pagesResult = await new Promise((resolve) => {
          http
            .get(`http://127.0.0.1:${port}/json`, { timeout: 2000 }, (res) => {
              let d = ''
              res.on('data', (c) => {
                d += c
              })
              res.on('end', () => {
                try {
                  resolve(JSON.parse(d))
                } catch {
                  resolve([])
                }
              })
            })
            .on('error', () => resolve([]))
            .on('timeout', () => resolve([]))
        })

        // 检查页面 URL 是否包含该浏览器的特征
        if (pagesResult && pagesResult.length > 0) {
          const urls = pagesResult.map((p) => p.url || '').join(' ')
          if (browserType === 'tabbit' && urls.includes('tabbit')) {
            return port
          }
          if (browserType === 'chrome' && !urls.includes('tabbit')) {
            return port
          }
        }
      } catch {}
    }
  }
  return null
}

// ─── Profile Copy ──────────────────────────────────────────

const SKIP_NAMES_BASE = [
  'Cache',
  'Code Cache',
  'GPUCache',
  'Service Worker',
  'Session Storage', // 会话存储，可能锁定
  'Extension State',
  'Extensions',
  'Local Extension Settings',
  'Sessions',
  'Last Session',
  'Last Tabs',
  'Current Session',
  'Current Tabs',
  'blob_storage',
  'File System',
  'databases',
  'GCM Store',
]
// Windows 下 IndexedDB / Local Storage 可能被运行中的浏览器锁定，跳过以避免复制失败
if (osPlatform() === 'win32') {
  SKIP_NAMES_BASE.push('IndexedDB', 'Local Storage')
}
const SKIP_NAMES = new Set(SKIP_NAMES_BASE)

function shouldSkip(name) {
  if (SKIP_NAMES.has(name)) return true
  if (name.endsWith('.log')) return true
  if (name.startsWith('BrowserMetrics')) return true
  if (name.startsWith('Crash')) return true
  if (name.startsWith('Extension')) return true
  if (name.startsWith('Cache')) return true
  return false
}

function copyDirSync(src, dest) {
  if (!existsSync(dest)) mkdirSync(dest, { recursive: true })
  let entries
  try {
    entries = readdirSync(src, { withFileTypes: true })
  } catch {
    return
  }
  for (const entry of entries) {
    if (shouldSkip(entry.name)) continue
    const srcPath = join(src, entry.name)
    const destPath = join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDirSync(srcPath, destPath)
    } else {
      try {
        copyFileSync(srcPath, destPath)
      } catch {}
    }
  }
}

function copyProfile(browserType) {
  const profileDir = getProfileDir(browserType)
  const sourceDir = getSourceUserDataDir(browserType)
  const sourceProfile = join(sourceDir, 'Default')
  const targetProfile = join(profileDir, 'Default')

  mkdirSync(targetProfile, { recursive: true })

  for (const lockFile of ['SingletonLock', 'SingletonSocket', 'SingletonCookie']) {
    const lf = join(profileDir, lockFile)
    try {
      unlinkSync(lf)
    } catch {}
  }

  for (const file of ['First Run', 'Local State']) {
    const src = join(sourceDir, file)
    if (existsSync(src)) {
      try {
        copyFileSync(src, join(profileDir, file))
      } catch {}
    }
  }
  if (existsSync(sourceProfile)) {
    copyDirSync(sourceProfile, targetProfile)
  }
}

// ─── Chrome Launch Args ───────────────────────────────────

function buildChromeArgs(browserType, port) {
  const profileDir = getProfileDir(browserType)
  const debugPort = port || CDP_PORT

  // 基础参数
  const args = [
    `--user-data-dir=${profileDir}`,
    '--profile-directory=Default',
    `--remote-debugging-port=${debugPort}`,
    '--no-first-run',
    '--no-default-browser-check',
    '--disable-extensions',
    '--disable-component-update',
    '--disable-background-networking',
    '--disable-default-apps',
    '--disable-sync',
    '--noerrdialogs',
    '--disable-background-timer-throttling',
    '--disable-breakpad',
    '--disable-dev-shm-usage',
    '--metrics-recording-only',
    '--no-pings',
    '--hide-scrollbars',
    '--mute-audio',
    // ── 关键：禁用 Cookie 隔离 / 隐私沙盒 / 自动化检测 / ABE，保证 SSO 登录态可用 ──
    // Chrome 149+ 启用 App-Bound Encryption (ABE)，cookie 加密密钥绑定到原始 Chrome 程序，
    // 复制 profile 到独立 headless 实例后 cookie 无法解密会被静默丢弃，必须禁用。
    '--disable-features=ImprovedCookieControls,ThirdPartyStoragePartitioning,PrivacySandboxSettings4,AutomationControlled,BackForwardCache,DestroyProfileOnBrowserClose,HttpsUpgrades,AppBoundEncryption',
    '--disable-blink-features=AutomationControlled',
    '--enable-features=NetworkService,NetworkServiceInProcess',
    // ── 额外稳定性参数 ──
    '--disable-hang-monitor',
    '--disable-infobars',
    '--disable-popup-blocking',
    '--disable-prompt-on-repost',
    '--disable-client-side-phishing-detection',
    '--disable-ipc-flooding-protection',
    '--disable-renderer-backgrounding',
    '--disable-backgrounding-occluded-windows',
    '--disable-domain-reliability',
    '--disable-external-intent-requests',
    '--silent-debugger-extension-api',
    'about:blank',
  ]

  // 使用 headless 模式，配合窗口参数避免灰色窗口问题
  args.unshift('--headless=new', '--disable-gpu', '--disable-software-rasterizer')
  // 窗口大小使用标准尺寸（某些网站检测过小窗口），位置放到屏幕外
  args.push('--window-position=-24000,-24000', '--window-size=1920,1080')

  if (osPlatform() === 'linux') {
    if (typeof process.getuid === 'function' && process.getuid() === 0) {
      args.push('--no-sandbox')
    }
  }
  return args
}

// ─── CDP Utilities ─────────────────────────────────────────

function httpGet(url) {
  return new Promise((resolve, reject) => {
    const req = http.get(url, { timeout: 5000 }, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(new Error(`Invalid JSON from ${url}`))
        }
      })
    })
    req.on('error', reject)
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('HTTP timeout'))
    })
  })
}

function httpPut(url) {
  return new Promise((resolve, reject) => {
    const req = http.request(url, { method: 'PUT', timeout: 5000 }, (res) => {
      let data = ''
      res.on('data', (chunk) => {
        data += chunk
      })
      res.on('end', () => {
        try {
          resolve(JSON.parse(data))
        } catch (e) {
          reject(new Error(`Invalid JSON from ${url}`))
        }
      })
    })
    req.on('error', reject)
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('HTTP timeout'))
    })
    req.end()
  })
}

function checkCDPAlive(port = CDP_PORT) {
  return new Promise((resolve) => {
    const req = http.get(`http://127.0.0.1:${port}/json/version`, { timeout: 2000 }, (res) => {
      if (res.statusCode === 200) resolve(true)
      else resolve(false)
    })
    req.on('error', () => resolve(false))
    req.on('timeout', () => {
      req.destroy()
      resolve(false)
    })
  })
}

function waitForCDP(port, browserProcess, timeout = CDP_TIMEOUT_MS) {
  const start = Date.now()
  let attempts = 0
  return new Promise((resolve, reject) => {
    const check = () => {
      attempts++
      // 检查进程是否已退出
      if (browserProcess && browserProcess.exitCode !== null) {
        return reject(new Error(`Browser process exited before CDP was ready (exitCode=${browserProcess.exitCode})`))
      }
      if (Date.now() - start > timeout) {
        return reject(new Error(`CDP port ${port} not ready after ${timeout}ms (${attempts} attempts)`))
      }
      checkCDPAlive(port).then((alive) => {
        if (alive) {
          console.error(`[INFO] CDP ready after ${attempts} attempts (${Date.now() - start}ms)`)
          return resolve()
        }
        if (attempts % 10 === 0) {
          console.error(`[INFO] CDP attempt ${attempts}: still waiting... (${Date.now() - start}ms elapsed)`)
        }
        setTimeout(check, 500)
      })
    }
    check()
  })
}

function killCDP(port) {
  const killPort = port || CDP_PORT
  try {
    if (osPlatform() === 'win32') {
      // Windows: 使用 PowerShell 根据命令行参数匹配进程
      // 匹配 remote-debugging-port
      execSync(
        `powershell -NoProfile -Command "Get-Process chrome,msedge,tabbit -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -match 'remote-debugging-port=${killPort}' } | Stop-Process -Force"`,
        { stdio: 'ignore', timeout: 5000 },
      )
      // 额外清理：匹配 headless 和我们的 profile 目录
      execSync(
        `powershell -NoProfile -Command "Get-Process chrome,msedge,tabbit -ErrorAction SilentlyContinue | Where-Object { $_.CommandLine -match 'headless.*chrome-profile' } | Stop-Process -Force"`,
        { stdio: 'ignore', timeout: 5000 },
      )
    } else {
      // macOS/Linux: 使用 pkill 根据命令行参数匹配进程
      // 同时匹配 headless 参数，确保只杀我们启动的进程
      execSync(`pkill -f "remote-debugging-port=${killPort}" 2>/dev/null`, { stdio: 'ignore' })
      // 额外清理：匹配 headless 和我们的 profile 目录
      execSync(`pkill -f "headless.*chrome-profile" 2>/dev/null`, { stdio: 'ignore' })
      execSync(`pkill -f "headless.*Tabbit" 2>/dev/null`, { stdio: 'ignore' })
      execSync(`pkill -f "headless.*Microsoft Edge" 2>/dev/null`, { stdio: 'ignore' })
    }
  } catch {}
}

// 注册退出时的清理函数
let cleanupRegistered = false
let launchedBrowsers = []

function registerCleanup() {
  if (cleanupRegistered) return
  cleanupRegistered = true

  const cleanup = () => {
    // 终止所有我们启动的浏览器进程
    for (const { browserProcess, port } of launchedBrowsers) {
      try {
        if (browserProcess && !browserProcess.killed) {
          browserProcess.kill('SIGTERM')
        }
      } catch {}
      killCDP(port)
    }
    launchedBrowsers = []
  }

  process.on('exit', cleanup)
  process.on('SIGINT', () => {
    cleanup()
    process.exit(0)
  })
  process.on('SIGTERM', () => {
    cleanup()
    process.exit(0)
  })
  process.on('uncaughtException', (err) => {
    console.error('[ERROR] Uncaught exception:', err.message)
    cleanup()
    process.exit(1)
  })
}

// ─── CDP WebSocket Client ──────────────────────────────────

class CDPClient {
  constructor(wsUrl) {
    this._wsUrl = wsUrl
    this._socket = null
    this._msgId = 0
    this._pending = new Map()
    this._events = new Map()
    this._buffer = Buffer.alloc(0)
  }

  connect() {
    return new Promise((resolve, reject) => {
      const url = new URL(this._wsUrl)
      const key = crypto.randomBytes(16).toString('base64')
      const socket = net.createConnection({ host: url.hostname, port: parseInt(url.port) }, () => {
        socket.write(
          `GET ${url.pathname} HTTP/1.1\r\nHost: ${url.host}\r\nUpgrade: websocket\r\nConnection: Upgrade\r\nSec-WebSocket-Key: ${key}\r\nSec-WebSocket-Version: 13\r\n\r\n`,
        )
      })
      let handshakeDone = false
      socket.on('data', (chunk) => {
        this._buffer = Buffer.concat([this._buffer, chunk])
        if (!handshakeDone) {
          const hEnd = this._buffer.indexOf('\r\n\r\n')
          if (hEnd === -1) return
          const header = this._buffer.slice(0, hEnd).toString()
          if (!header.includes('101')) {
            socket.destroy()
            return reject(new Error('WS handshake failed'))
          }
          handshakeDone = true
          this._buffer = this._buffer.slice(hEnd + 4)
          this._socket = socket
          resolve()
        }
        this._processBuffer()
      })
      socket.on('error', (err) => {
        if (!handshakeDone) reject(err)
      })
      socket.on('close', () => {
        for (const [, { reject: r }] of this._pending) r(new Error('WS closed'))
        this._pending.clear()
      })
    })
  }

  _processBuffer() {
    while (this._buffer.length >= 2) {
      const opcode = this._buffer[0] & 0x0f
      const payloadLen = this._buffer[1] & 0x7f
      let offset = 2,
        actualLen = payloadLen
      if (payloadLen === 126) {
        if (this._buffer.length < 4) break
        actualLen = this._buffer.readUInt16BE(2)
        offset = 4
      } else if (payloadLen === 127) {
        if (this._buffer.length < 10) break
        actualLen = Number(this._buffer.readBigUInt64BE(2))
        offset = 10
      }
      if (this._buffer.length < offset + actualLen) break
      const payload = this._buffer.slice(offset, offset + actualLen)
      this._buffer = this._buffer.slice(offset + actualLen)
      if (opcode === 1) {
        try {
          const msg = JSON.parse(payload.toString())
          if (msg.id !== undefined && this._pending.has(msg.id)) {
            const { resolve, reject } = this._pending.get(msg.id)
            this._pending.delete(msg.id)
            if (msg.error) reject(new Error(msg.error.message || JSON.stringify(msg.error)))
            else resolve(msg.result)
          } else if (msg.method) {
            const handlers = this._events.get(msg.method)
            if (handlers) for (const h of handlers) h(msg.params)
          }
        } catch {}
      }
    }
  }

  send(method, params = {}, timeout = 10000) {
    return new Promise((resolve, reject) => {
      const id = ++this._msgId
      const data = Buffer.from(JSON.stringify({ id, method, params }))
      const mask = crypto.randomBytes(4)
      let header
      if (data.length < 126) {
        header = Buffer.alloc(6)
        header[0] = 0x81
        header[1] = 0x80 | data.length
        mask.copy(header, 2)
      } else if (data.length < 65536) {
        header = Buffer.alloc(8)
        header[0] = 0x81
        header[1] = 0x80 | 126
        header.writeUInt16BE(data.length, 2)
        mask.copy(header, 4)
      } else {
        header = Buffer.alloc(14)
        header[0] = 0x81
        header[1] = 0x80 | 127
        header.writeBigUInt64BE(BigInt(data.length), 2)
        mask.copy(header, 10)
      }
      const masked = Buffer.alloc(data.length)
      for (let i = 0; i < data.length; i++) masked[i] = data[i] ^ mask[i & 3]
      const timer = setTimeout(() => {
        this._pending.delete(id)
        reject(new Error(`${method} timed out`))
      }, timeout)
      this._pending.set(id, {
        resolve: (v) => {
          clearTimeout(timer)
          resolve(v)
        },
        reject: (e) => {
          clearTimeout(timer)
          reject(e)
        },
      })
      this._socket.write(Buffer.concat([header, masked]))
    })
  }

  on(event, handler) {
    if (!this._events.has(event)) this._events.set(event, [])
    this._events.get(event).push(handler)
  }

  close() {
    if (this._socket)
      try {
        this._socket.destroy()
      } catch {}
  }
}

// ─── Core: Navigate + Evaluate via raw CDP ─────────────────

async function navigateAndEvaluate(pageWsUrl, targetUrl, jsExpression) {
  const client = new CDPClient(pageWsUrl)
  await client.connect()

  await client.send('Page.enable')
  await client.send('Runtime.enable')

  const navDone = new Promise((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(`Navigation to ${targetUrl} timed out`)), NAV_TIMEOUT_MS)
    client.on('Page.loadEventFired', () => {
      clearTimeout(timer)
      resolve()
    })
  })
  await client.send('Page.navigate', { url: targetUrl })
  await navDone

  const urlCheck = await client.send('Runtime.evaluate', { expression: 'window.location.href', returnByValue: true })
  const currentUrl = urlCheck.result?.value || ''
  if (
    currentUrl.includes('ssa.jd.com') ||
    currentUrl.includes('passport') ||
    currentUrl.includes('login') ||
    currentUrl.includes('authme')
  ) {
    client.close()
    throw new Error('SSO_REDIRECT: ERP cookie expired. Please log in to joyminutes.jd.com and retry.')
  }

  const result = await client.send(
    'Runtime.evaluate',
    {
      expression: `(${jsExpression})()`,
      awaitPromise: true,
      returnByValue: true,
      timeout: EVAL_TIMEOUT_MS,
    },
    EVAL_TIMEOUT_MS + 5000,
  )

  client.close()

  if (result.exceptionDetails) {
    throw new Error(`JS evaluation error: ${result.exceptionDetails.text || JSON.stringify(result.exceptionDetails)}`)
  }

  return result.result?.value
}

// ─── JoyMinutes API Expression Builder ─────────────────────

function buildFetchExpression(startDate, endDate, wantDetail, meetingId) {
  return `async function() {
    const startDate = '${fmt(startDate)}';
    const endDate = '${fmt(endDate)}';
    const wantDetail = ${wantDetail};
    const specificId = ${meetingId ? `'${meetingId}'` : 'null'};

    function apiCall(functionId, body) {
      return fetch('https://api.m.jd.com/api?functionId=' + functionId, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'functionId': functionId,
          'loginType': '15',
          'x-client': 'WEB',
          'x-team-id': '00046419'
        },
        credentials: 'include',
        body: 'appid=JoyMinutes&cthr=1&functionId=' + functionId
          + '&body=' + encodeURIComponent(JSON.stringify(Object.assign({ jdmeAppId: 'ee' }, body)))
          + '&clientVersion=1.0.0&lang=zh_CN&loginType=15&t=' + Date.now()
      }).then(r => r.json()).catch(e => ({ _fetchError: e.message }));
    }

    // If specific meeting ID, fetch directly
    if (specificId) {
      const [detail, asr, speakers] = await Promise.all([
        apiCall('minutes.detail', { minutesId: specificId }),
        wantDetail ? apiCall('minutes.asr', { minutesId: specificId }) : null,
        apiCall('minutes.speakers.timelines', { minutesId: specificId })
      ]);
      const md = detail?.content?.minutesDetail || detail?.content || {};
      const spkTimelines = speakers?.content?.timelines || [];
      const speakerList = spkTimelines.map(s => ({
        name: s.realName || s.speakerName || '',
        proportion: s.proportion || 0,
        totalTime: s.totalTime || 0
      }));
      const asrContent = asr?.content || {};
      const asrList = asrContent.asrDataList || [];
      const transcript = asrList.length > 0 ? asrList.map(p => {
        const speaker = p.user?.realName || '';
        const sentences = (p.sentences || []).map(s => s.text).join('');
        return { speaker, text: sentences, beginMs: p.beginMs, endMs: p.endMs };
      }) : null;
      return {
        success: true,
        dateRange: { start: startDate, end: endDate },
        meetings: [{
          id: specificId,
          title: md.title || md.name || '',
          startTime: md.createAt || md.startTime || '',
          duration: md.recordDuration || 0,
          creator: md.creatorName || '',
          members: (md.members || []).map(m => ({ name: m.realName || '', account: m.account || '' })),
          url: 'https://joyminutes.jd.com/video/' + specificId,
          speakers: speakerList,
          transcript: transcript,
          attachments: (md.attachments || []).map(a => ({ name: a.fileName || '', url: a.fileUrl || '', type: a.fileType || '' }))
        }]
      };
    }

    // Fetch meeting list (paginated, get all pages up to 200 items)
    let allItems = [];
    let pageNum = 1;
    const pageSize = 50;
    while (pageNum <= 10) {
      const listResp = await apiCall('minutes.list.frontpage', {
        pageNum: pageNum,
        pageSize: pageSize,
        userList: []
      });

      // 检查 API 响应中的登录态错误
      if (listResp && listResp.errorCode && listResp.errorCode !== '0') {
        if (listResp.errorCode === '0002' || listResp.errorMsg?.includes('token') || listResp.errorMsg?.includes('登录')) {
          throw new Error('SSO_REDIRECT: API returned token error - ' + (listResp.errorMsg || listResp.errorCode));
        }
        break;
      }

      if (!listResp || listResp.errorCode !== '0') break;
      const content = listResp.content || listResp.data || {};

      const items = content.pages || content.dataList || content.list || content.items || [];
      if (items.length === 0) break;
      allItems = allItems.concat(items);

      const total = content.total || 0;
      if (allItems.length >= total) break;

      const lastItem = items[items.length - 1];
      const lastTime = lastItem.recordTime || lastItem.receiveTime || lastItem.createTime || lastItem.startTime || 0;
      const lastDate = typeof lastTime === 'number' ? new Date(lastTime + 8*3600000).toISOString().slice(0, 10) : String(lastTime).slice(0, 10);
      if (lastDate < startDate) break;

      pageNum++;
    }

    const startTs = new Date(startDate + 'T00:00:00+08:00').getTime();
    const endTs = new Date(endDate + 'T23:59:59+08:00').getTime();

    const filtered = allItems.filter(item => {
      const ts = item.recordTime || item.receiveTime || item.createTime || item.startTime || 0;
      const itemTs = typeof ts === 'number' ? ts : new Date(ts).getTime();
      return itemTs >= startTs && itemTs <= endTs;
    });

    const meetings = [];
    for (const item of filtered) {
      const mid = item.minutesId || item.id || '';
      if (!mid) continue;

      const promises = [
        apiCall('minutes.detail', { minutesId: mid }),
        apiCall('minutes.speakers.timelines', { minutesId: mid })
      ];
      if (wantDetail) {
        promises.push(apiCall('minutes.asr', { minutesId: mid }));
      }

      const results = await Promise.all(promises);
      const md = results[0]?.content?.minutesDetail || results[0]?.content || {};
      const spkTimelines = results[1]?.content?.timelines || [];
      const asrContent = wantDetail ? (results[2]?.content || {}) : null;
      const asrList = asrContent?.asrDataList || [];

      const speakerList = spkTimelines.map(s => ({
        name: s.realName || s.speakerName || '',
        proportion: s.proportion || 0,
        totalTime: s.totalTime || 0
      }));

      const transcript = asrList.length > 0 ? asrList.map(p => {
        const speaker = p.user?.realName || '';
        const sentences = (p.sentences || []).map(s => s.text).join('');
        return { speaker, text: sentences, beginMs: p.beginMs, endMs: p.endMs };
      }) : null;

      meetings.push({
        id: mid,
        title: md.title || md.name || item.title || '',
        startTime: md.createAt || md.startTime || item.recordTime || item.receiveTime || '',
        duration: md.recordDuration || item.recordDuration || 0,
        creator: md.creatorName || item.userInfo?.realName || '',
        members: (md.members || []).map(m => ({ name: m.realName || '', account: m.account || '' })),
        url: 'https://joyminutes.jd.com/video/' + mid,
        speakers: speakerList,
        transcript: transcript,
        attachments: (md.attachments || []).map(a => ({ name: a.fileName || '', url: a.fileUrl || '', type: a.fileType || '' }))
      });
    }

    return {
      success: true,
      dateRange: { start: startDate, end: endDate },
      totalInList: allItems.length,
      filteredCount: filtered.length,
      meetings: meetings
    };
  }`
}

// ─── Main ──────────────────────────────────────────────────

async function launchBrowser(browserType, port) {
  const browserPath = getBrowserPath(browserType)
  if (!browserPath || !existsSync(browserPath)) {
    throw new Error(`${browserType} not found`)
  }

  // 注册清理函数
  registerCleanup()

  copyProfile(browserType)
  const args = buildChromeArgs(browserType, port)

  let proc
  if (osPlatform() === 'darwin') {
    let appName = 'Google Chrome'
    if (browserType === 'tabbit') appName = 'Tabbit'
    else if (browserType === 'edge') appName = 'Microsoft Edge'

    // 直接启动浏览器进程
    proc = spawn(browserPath, args, {
      detached: true,
      stdio: ['ignore', 'ignore', 'ignore'],
    })
  } else {
    const spawnOptions = { detached: true, stdio: ['ignore', 'ignore', 'ignore'] }
    if (osPlatform() === 'win32') spawnOptions.windowsHide = true
    proc = spawn(browserPath, args, spawnOptions)
  }

  proc.unref()
  if (!proc.pid) {
    throw new Error('Failed to spawn browser')
  }

  try {
    await waitForCDP(port, proc)
  } catch (err) {
    // 如果启动失败，尝试终止进程
    try {
      proc.kill()
    } catch {}
    throw err
  }

  // 记录启动的浏览器，以便在退出时清理
  launchedBrowsers.push({ browserProcess: proc, port })

  return proc
}

async function tryFetchWithBrowser(browserType, existingPort = null) {
  let port = existingPort
  let browserProcess = null

  try {
    // 如果使用已存在的端口，直接连接
    if (!existingPort) {
      // 查找可用端口
      port = await findAvailablePort(CDP_PORT_START, CDP_PORT_END)
      console.error(`[INFO] 使用端口: ${port}`)

      // 检查浏览器是否正在运行
      const running = detectRunningBrowsers()
      const isRunning = browserType === 'tabbit' ? running.tabbit : browserType === 'edge' ? running.edge : running.chrome

      if (isRunning) {
        console.error(`[INFO] ${browserType} 正在运行但无调试端口，将使用其登录态启动独立实例`)
      }

      browserProcess = await launchBrowser(browserType, port)
    }

    // 创建新标签页
    const newTab = await httpPut(`http://127.0.0.1:${port}/json/new?about:blank`)
    const pageWsUrl = newTab.webSocketDebuggerUrl
    if (!pageWsUrl) {
      throw new Error('Could not get page WebSocket URL from CDP')
    }

    try {
      const expr = buildFetchExpression(START_DATE, END_DATE, WANT_DETAIL, MEETING_ID)
      const data = await navigateAndEvaluate(pageWsUrl, 'https://joyminutes.jd.com/home', expr)
      return { success: true, data, port, browserProcess }
    } finally {
      try {
        await httpGet(`http://127.0.0.1:${port}/json/close/${newTab.id}`)
      } catch {}
    }
  } catch (err) {
    return { success: false, error: err.message, port, browserProcess }
  }
}

async function openLoginPage(browserType) {
  const loginUrl = 'https://joyminutes.jd.com/home'
  const browserPath = getBrowserPath(browserType)

  if (browserPath && existsSync(browserPath)) {
    if (osPlatform() === 'darwin') {
      let appName = 'Google Chrome'
      if (browserType === 'tabbit') appName = 'Tabbit'
      else if (browserType === 'edge') appName = 'Microsoft Edge'
      spawn('open', ['-a', appName, loginUrl], { detached: true, stdio: 'ignore' }).unref()
    } else if (osPlatform() === 'win32') {
      let cmdApp = 'chrome'
      if (browserType === 'tabbit') cmdApp = 'tabbit'
      else if (browserType === 'edge') cmdApp = 'msedge'
      spawn('cmd', ['/c', 'start', cmdApp, loginUrl], { detached: true, stdio: 'ignore' }).unref()
    }
    return true
  }
  return false
}

// ─── Windows 专用流程 ─────────────────────────────────────────
// Windows + Chrome/Edge 149+ 使用 App-Bound Encryption (ABE)，cookie 密钥绑定到「原始默认 user-data-dir」。
// 复制 / junction profile 到独立实例 → cookie 无法解密（实测 0 cookie）。
// 唯一可行方案：优雅关闭用户浏览器 → 用「默认 user-data-dir」+ debug port 重启（ABE 可正常解密）→ CDP 取数 → 恢复浏览器。
// 优雅关闭用 CloseMainWindow（非强杀），session 不丢失。
async function mainWindows() {
  // 检测哪个浏览器的 Default profile 里有 jd.com cookie
  function profileHasJdCookie(browserType) {
    try {
      const cookiesDb = join(getSourceUserDataDir(browserType), 'Default', 'Network', 'Cookies')
      if (!existsSync(cookiesDb)) return false
      // 简单读取 SQLite 文件二进制，查找 jd.com host_key（避免依赖 sqlite 库）
      const buf = require('fs').readFileSync(cookiesDb)
      return buf.includes(Buffer.from('joyminutes.jd.com')) || buf.includes(Buffer.from('.jd.com'))
    } catch {
      return false
    }
  }

  // 优雅关闭浏览器进程（CloseMainWindow，不强杀，保留 session）
  function gracefulCloseBrowser(processName) {
    try {
      execSync(
        `powershell -NoProfile -Command "Get-Process ${processName} -ErrorAction SilentlyContinue | ForEach-Object { [void]$_.CloseMainWindow() }"`,
        { stdio: 'ignore', timeout: 10000 },
      )
    } catch {}
  }

  function browserProcCount(processName) {
    try {
      const out = execSync(
        `powershell -NoProfile -Command "(Get-Process ${processName} -ErrorAction SilentlyContinue | Measure-Object).Count"`,
        { encoding: 'utf8', timeout: 5000 },
      )
      return parseInt(out.trim()) || 0
    } catch {
      return 0
    }
  }

  let chosenBrowser = null
  let restoreNeeded = false
  let restoreProcessName = null
  let restoreBrowserPath = null

  try {
    registerCleanup()

    // 1. 选浏览器：优先选「Default profile 里有 jd.com cookie」的浏览器
    const installed = []
    for (const type of ['chrome', 'edge', 'tabbit']) {
      const bp = getBrowserPath(type)
      if (bp && existsSync(bp)) installed.push({ type, path: bp })
    }
    if (installed.length === 0) {
      return output({ success: false, error: '未找到 Chrome、Edge 或 Tabbit 浏览器。请安装其中之一。' })
    }

    // 先找有 jd cookie 的
    for (const b of installed) {
      if (profileHasJdCookie(b.type)) {
        chosenBrowser = b
        break
      }
    }
    // 没有则用第一个安装的
    if (!chosenBrowser) chosenBrowser = installed[0]

    const browserType = chosenBrowser.type
    const browserPath = chosenBrowser.path
    const processName = browserType === 'edge' ? 'msedge' : browserType === 'tabbit' ? 'tabbit' : 'chrome'
    console.error(`[INFO] 使用浏览器: ${browserType} (${browserPath})`)

    // 2. 检查是否已有可用 CDP 实例（之前残留 / 用户自带 debug port）
    let port = null
    let reusingExisting = false
    for (let p = CDP_PORT_START; p <= CDP_PORT_END; p++) {
      if (await checkCDPAlive(p)) {
        port = p
        reusingExisting = true
        break
      }
    }
    if (reusingExisting) console.error(`[INFO] 复用已有 CDP 实例 (port ${port})`)

    if (!reusingExisting) {
      const defaultUserData = getSourceUserDataDir(browserType)

      // 3. 优雅关闭用户浏览器（保留 session，ABE 才能在重启后解密）
      const wasRunning = browserProcCount(processName) > 0
      if (wasRunning) {
        console.error(`[INFO] 优雅关闭 ${browserType}（保留登录态）...`)
        gracefulCloseBrowser(processName)
        // 等待进程退出（最多 8 秒）
        for (let i = 0; i < 16; i++) {
          await new Promise((r) => setTimeout(r, 500))
          if (browserProcCount(processName) === 0) break
        }
        // 仍有残留则强制关闭
        if (browserProcCount(processName) > 0) {
          try {
            execSync(`powershell -NoProfile -Command "Stop-Process -Name ${processName} -Force -ErrorAction SilentlyContinue"`, {
              stdio: 'ignore',
              timeout: 5000,
            })
          } catch {}
          await new Promise((r) => setTimeout(r, 1500))
        }
        restoreNeeded = true
        restoreProcessName = processName
        restoreBrowserPath = browserPath
      }

      // 4. 用「默认 user-data-dir」+ debug port 重启（ABE 可正常解密 cookie）
      port = await findAvailablePort(CDP_PORT_START, CDP_PORT_END)
      console.error(`[INFO] 使用端口: ${port}`)

      const args = [
        `--user-data-dir=${defaultUserData}`,
        '--profile-directory=Default',
        `--remote-debugging-port=${port}`,
        '--no-first-run',
        '--no-default-browser-check',
        '--restore-last-session',
        '--start-minimized',
        '--disable-features=AutomationControlled',
        '--disable-blink-features=AutomationControlled',
      ]

      const proc = spawn(browserPath, args, { detached: true, stdio: ['ignore', 'ignore', 'ignore'], windowsHide: true })
      proc.unref()
      if (!proc.pid) {
        return output({ success: false, error: 'Failed to spawn browser' })
      }

      try {
        await waitForCDP(port, proc)
      } catch (err) {
        return output({ success: false, error: err.message })
      }
    }

    // 5. 创建 tab，执行 API 调用
    try {
      const newTab = await httpPut(`http://127.0.0.1:${port}/json/new?about:blank`)
      const pageWsUrl = newTab.webSocketDebuggerUrl
      if (!pageWsUrl) throw new Error('Could not get page WebSocket URL from CDP')

      try {
        const expr = buildFetchExpression(START_DATE, END_DATE, WANT_DETAIL, MEETING_ID)
        const data = await navigateAndEvaluate(pageWsUrl, 'https://joyminutes.jd.com/home', expr)
        if (!data) {
          output({ success: false, error: 'No data returned. ERP cookie may have expired — please log in to joyminutes.jd.com and retry.' })
        } else {
          output(data)
        }
      } finally {
        try {
          await httpGet(`http://127.0.0.1:${port}/json/close/${newTab.id}`)
        } catch {}
      }
    } finally {
      // 6. 关闭 debug 实例并恢复用户浏览器
      if (!reusingExisting && restoreNeeded) {
        // 优雅关闭 debug 实例
        try {
          execSync(`powershell -NoProfile -Command "Stop-Process -Name ${restoreProcessName} -Force -ErrorAction SilentlyContinue"`, {
            stdio: 'ignore',
            timeout: 8000,
          })
        } catch {}
        await new Promise((r) => setTimeout(r, 1500))
        // 恢复用户浏览器（普通启动，会话恢复）
        console.error(`[INFO] 恢复 ${chosenBrowser.type}...`)
        spawn(restoreBrowserPath, ['--restore-last-session'], { detached: true, stdio: 'ignore', windowsHide: false }).unref()
      }
    }
  } catch (err) {
    output({ success: false, error: err.message })
    // 出错也尝试恢复浏览器
    if (restoreNeeded && restoreBrowserPath) {
      try {
        spawn(restoreBrowserPath, ['--restore-last-session'], { detached: true, stdio: 'ignore', windowsHide: false }).unref()
      } catch {}
    }
  }
}

// ─── macOS/Linux 多浏览器 fallback 流程 ─────────────────────
async function mainDarwinLinux() {
  try {
    // 1. 检测正在运行的浏览器
    const running = detectRunningBrowsers()
    console.error(`[INFO] 检测到运行中的浏览器: Chrome=${running.chrome}, Tabbit=${running.tabbit}, Edge=${running.edge}`)

    // 2. macOS 不检测活跃窗口（避免权限弹窗）
    console.error(`[INFO] 跳过活跃窗口检测（避免权限弹窗）`)

    // 3. 确定 CDP 支持的浏览器优先级
    const cdpBrowsers = []

    // 添加正在运行的浏览器
    if (running.chrome) cdpBrowsers.push({ type: 'chrome', running: true })
    if (running.tabbit) cdpBrowsers.push({ type: 'tabbit', running: true })
    if (running.edge) cdpBrowsers.push({ type: 'edge', running: true })

    // 如果没有运行中的，添加静态检测
    const chromePath = getBrowserPath('chrome')
    const tabbitPath = getBrowserPath('tabbit')
    const edgePath = getBrowserPath('edge')
    if (!running.chrome && chromePath && existsSync(chromePath)) cdpBrowsers.push({ type: 'chrome', running: false })
    if (!running.tabbit && tabbitPath && existsSync(tabbitPath)) cdpBrowsers.push({ type: 'tabbit', running: false })
    if (!running.edge && edgePath && existsSync(edgePath)) cdpBrowsers.push({ type: 'edge', running: false })

    if (cdpBrowsers.length === 0) {
      return output({ success: false, error: '未找到 Chrome、Tabbit 或 Edge 浏览器。请安装其中之一。' })
    }

    // 4. 依次尝试每个浏览器
    for (const browser of cdpBrowsers) {
      console.error(`[INFO] 尝试使用 ${browser.type}...`)

      // 如果浏览器正在运行，尝试检测其调试端口
      let existingPort = null
      if (browser.running) {
        existingPort = await detectRunningBrowserPort(browser.type)
        if (existingPort) {
          console.error(`[INFO] 检测到 ${browser.type} 调试端口: ${existingPort}`)
        }
      }

      const result = await tryFetchWithBrowser(browser.type, existingPort)

      if (result.success && result.data) {
        if (!existingPort && result.browserProcess) {
          try {
            result.browserProcess.kill()
          } catch {}
          killCDP(result.port)
        }
        return output(result.data)
      }

      if (result.error && result.error.includes('SSO_REDIRECT')) {
        console.error(`[INFO] ${browser.type} 登录态失效`)
        if (!existingPort && result.browserProcess) {
          try {
            result.browserProcess.kill()
          } catch {}
          killCDP(result.port)
        }
        continue
      }

      console.error(`[INFO] ${browser.type} 错误: ${result.error}`)
      if (!existingPort && result.browserProcess) {
        try {
          result.browserProcess.kill()
        } catch {}
        killCDP(result.port)
      }
    }

    // 5. 所有浏览器都失败，打开登录页
    const browserToOpen = running.tabbit ? 'tabbit' : running.chrome ? 'chrome' : running.edge ? 'edge' : cdpBrowsers[0]?.type
    if (browserToOpen) {
      const opened = await openLoginPage(browserToOpen)
      return output({
        success: false,
        error: '所有浏览器的 ERP 登录态已过期。已在浏览器中打开登录页面，请完成登录后重试。',
        loginOpened: opened,
        browserUsed: browserToOpen,
      })
    }

    output({ success: false, error: '无法打开登录页面，请手动访问 joyminutes.jd.com 登录' })
  } catch (err) {
    output({ success: false, error: err.message })
  }
}

async function main() {
  if (osPlatform() === 'win32') {
    return mainWindows()
  }
  return mainDarwinLinux()
}

main()
