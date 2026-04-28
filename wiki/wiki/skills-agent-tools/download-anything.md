# download-anything — 数字资源下载

> Sources: MyAgents, 2026-04-27
> Raw:[SKILL.md](../../raw/skills/download-anything-SKILL.md); [cloud-search.md](../../raw/skills/download-anything-cloud-search.md); [ebooks.md](../../raw/skills/download-anything-ebooks.md); [education.md](../../raw/skills/download-anything-education.md); [media-assets.md](../../raw/skills/download-anything-media-assets.md); [music.md](../../raw/skills/download-anything-music.md); [search-techniques.md](../../raw/skills/download-anything-search-techniques.md); [software.md](../../raw/skills/download-anything-software.md); [tools-reference.md](../../raw/skills/download-anything-tools-reference.md); [video.md](../../raw/skills/download-anything-video.md)

## 概述

download-anything 是全面的互联网数字资源下载技能，覆盖电子书、学术论文、影视视频、音乐音频、软件应用、图片素材、字体、在线课程等。同时覆盖中英文互联网生态，包括百度网盘/阿里云盘/夸克网盘等中文特有资源搜索体系。

核心工具链：yt-dlp（视频/音频）、aria2（多线程下载/种子）、gallery-dl（批量图片）、spotdl（Spotify 音乐）、wget（递归下载）、curl（HTTP 请求）、ffmpeg（媒体转换）。

## 工具集安装

```bash
bash scripts/install-toolkit.sh
```

| 工具 | 安装 | 用途 |
|------|------|------|
| `yt-dlp` | `brew install yt-dlp` | 1800+ 站点的视频/音频下载 |
| `aria2c` | `brew install aria2` | 多线程下载、种子 |
| `gallery-dl` | `pip3 install gallery-dl` | 170+ 站点批量图片/媒体 |
| `spotdl` | `pip3 install spotdl` | Spotify 歌单转本地文件 |
| `wget` | `brew install wget` | 递归下载、网站镜像 |
| `curl` | 预装 | HTTP 请求、API 调用 |
| `ffmpeg` | `brew install ffmpeg` | 媒体转换 |
| `jq` | `brew install jq` | JSON 解析自动化 |

## 决策树

| 想下载... | 工具/方法 |
|-----------|----------|
| YouTube/社交媒体视频 | `scripts/dl-video.sh URL`（自动检测 Bilibili cookie） |
| 任意视频 URL 的音频 | `scripts/dl-audio.sh URL` |
| Spotify 歌单/专辑/单曲 | `spotdl URL` |
| 相册/艺术家页面的图片 | `scripts/dl-gallery.sh URL` |
| 直接文件 URL（快速） | `scripts/dl-file.sh URL`（aria2，16 连接） |
| 种子或磁力链接 | `scripts/dl-torrent.sh "magnet:..."` |
| 字幕 | `scripts/dl-subtitle.sh QUERY` |
| 电子书或论文 | 参考下方电子书章节 |
| 电影或电视剧 | 参考下方视频章节 |
| 音乐/游戏原声 | 参考下方音乐章节 |
| 软件或应用 | 参考下方软件章节 |
| 图片素材/字体 | 参考下方素材章节 |
| 中文网盘资源 | 参考下方网盘搜索章节 |
| 在线课程 | 参考下方教育章节 |

## 常用一行命令

```bash
# 最高质量视频
yt-dlp -f "bv*+ba/b" "URL"

# 1080p + 字幕
yt-dlp -f "bv[height<=1080]+ba" --write-subs --sub-langs "en,zh" "URL"

# 提取 MP3 音频
yt-dlp -x --audio-format mp3 "URL"

# 下载 YouTube 播放列表
yt-dlp --yes-playlist "URL"

# 16 连接快速下载
aria2c -x16 -s16 -k1M "URL"

# 种子下载
aria2c --seed-time=0 "magnet:?xt=..."

# 批量图片
gallery-dl "URL"

# Spotify → 本地 MP3
spotdl "SPOTIFY_URL"

# 页面所有 PDF
wget -r -l1 -A "*.pdf" "URL"
```

## yt-dlp 详解（核心工具）

支持 1800+ 站点，是整个工具栈中最重要的工具。

### 格式选择

```bash
yt-dlp -F "URL"                              # 先列出所有格式
yt-dlp -f "bv[height<=1080]+ba/b[height<=1080]" "URL"  # 最佳 1080p
yt-dlp -f 137+140 "URL"                       # 按格式 ID 选择
yt-dlp -x --audio-format mp3 --audio-quality 0 "URL"   # 最佳质量 MP3
```

### 播放列表与批量

```bash
yt-dlp --yes-playlist "PLAYLIST_URL"          # 完整播放列表
yt-dlp --playlist-items 1,3,5-7 "PLAYLIST_URL"  # 指定范围
yt-dlp -a urls.txt                            # 从文件批量读取
yt-dlp --download-archive archive.txt "URL"   # 跳过已下载
```

### 认证与网络

```bash
yt-dlp --cookies-from-browser chrome "URL"    # 从浏览器获取 cookie
yt-dlp --proxy socks5://127.0.0.1:1080 "URL"  # 代理
yt-dlp --geo-bypass-country US "URL"           # 地理绕过
yt-dlp --limit-rate 5M "URL"                   # 限速
```

### Agent 自动化标志

```bash
yt-dlp -j --no-download "URL"                  # 获取 JSON 元数据（不下载）
yt-dlp -g "URL"                                # 获取直接下载 URL
yt-dlp -o "%(title)s.%(ext)s" "URL"            # 输出模板
```

### 配置文件（`~/.config/yt-dlp/config`）

```
-f bestvideo[height<=1080]+bestaudio/best[height<=1080]
-o %(title)s.%(ext)s
--embed-metadata
--embed-thumbnail
--download-archive ~/.config/yt-dlp/archive.txt
```

### Bilibili 特别支持

```bash
# 大会员内容需要 cookie
yt-dlp --cookies-from-browser chrome "https://www.bilibili.com/video/BV..."
# 下载合集（多部分视频）
yt-dlp --yes-playlist "URL"
yt-dlp --flat-playlist "URL"  # 先列出所有部分
```

## gallery-dl 详解

支持 170+ 站点：Pixiv、Twitter/X、Reddit、Instagram、Danbooru、ArtStation、Flickr 等。

```bash
gallery-dl "URL"                                       # 基本下载
gallery-dl -d ./downloads "URL"                        # 指定目录
gallery-dl -f "{category}_{id}_{num}.{extension}" "URL"  # 自定义文件名
gallery-dl --cookies-from-browser firefox "URL"         # 认证
gallery-dl --range 1-50 "URL"                           # 范围过滤
gallery-dl --filter "width >= 1920 and height >= 1080" "URL"  # 尺寸过滤
gallery-dl --filter "likes >= 100" "URL"                # 互动过滤
gallery-dl --filter "date >= datetime(2024,1,1)" "URL"  # 日期过滤

# Agent 自动化
gallery-dl -g "URL"  # 仅输出 URL（管道到 aria2）
gallery-dl -j "URL"  # JSON 元数据
```

支持 OAuth 一次性设置：`gallery-dl oauth:reddit`、`gallery-dl oauth:deviantart` 等。

## aria2 详解

处理 HTTP、FTP、BitTorrent、Metalink 的多连接下载加速器。

### 基本用法

```bash
aria2c -x 16 -s 16 "URL"                     # 16 连接快速下载
aria2c -d ~/Downloads "URL"                  # 指定目录
aria2c -o output.zip "URL"                   # 自定义文件名
aria2c -c "URL"                              # 断点续传
aria2c "https://mirror1.com/file" "https://mirror2.com/file"  # 多镜像
aria2c --header="Authorization: Bearer TOKEN" "URL"  # 自定义头
```

### 种子下载

```bash
aria2c "magnet:?xt=urn:btih:HASH"            # 磁力链接
aria2c file.torrent                          # 种子文件
aria2c --seed-ratio=0.0 "magnet:?xt=..."     # 下载完不保种
aria2c --select-file=1,3,5 file.torrent      # 选择特定文件
```

### JSON-RPC 守护进程（Agent 自动化）

```bash
aria2c --daemon --enable-rpc --rpc-listen-port=6800
# 通过 RPC 添加下载
curl -s http://localhost:6800/jsonrpc \
  -d '{"jsonrpc":"2.0","id":"1","method":"aria2.addUri","params":[["URL"],{"dir":"/tmp"}]}'
# 查看活跃下载
curl -s http://localhost:6800/jsonrpc \
  -d '{"jsonrpc":"2.0","id":"2","method":"aria2.tellActive","params":[]}'
```

## 视频与影视下载

### Torrent 站点（RARBG 关闭后的替代）

| 站点 | 专注 | 备注 |
|------|------|------|
| **YTS** (yts.mx) | 电影（小体积 x265） | 720p/1080p/2160p，带宽有限首选 |
| **1337x** (1337x.to) | 综合 | RARBG 关闭后最佳综合站点 |
| **TorrentGalaxy** (torrentgalaxy.to) | 综合 | 有 IMDB 评分和截图 |
| **EZTV** (eztvx.to) | 电视剧 | 专用 TV 追踪器 |
| **Nyaa** (nyaa.si) | 动漫 | 动漫/漫画/日本内容 |
| **RuTracker** (rutracker.org) | 综合 | 巨大目录，需注册 |

### 种子搜索引擎

| 站点 | 备注 |
|------|------|
| **Snowfl** (snowfl.com) | 实时聚合，显示健康度/种子数 |
| **BitSearch** (bitsearch.to) | 索引 46M+ 种子，DHT 爬取 |
| **BTDigg** (btdig.com) | DHT 搜索引擎，按内容而非追踪器搜索 |

### 直接下载（DDL）

| 站点 | 专注 |
|------|------|
| **Pahe** (pahe.ink) | 电影/电视剧 x265 小体积 |
| **DDLValley** (ddlvalley.me) | 电影/电视剧/软件 |
| **RleaseBB** (rlsbb.ru) | Scene 发行 |

### 字幕资源

| 站点 | 语言 | 备注 |
|------|------|------|
| **SubDL** (subdl.com) | 100+ 语言 | 现代 UI，有 API |
| **OpenSubtitles** (opensubtitles.com) | 60+ 语言 | 最大字幕数据库 |
| **射手网** (assrt.net) | 中文+英文 | 社区上传 |
| **字幕库** (zimuku.org) | 中文+双语 | 大型中文字幕库 |
| **ChineseSubFinder** | 中文（自动） | CLI 工具，自动匹配媒体库 |

### 中文视频资源

| 站点 | 备注 |
|------|------|
| **BT之家1LOU站** (1lou.me) | 中文综合 torrent |
| **音范丝** (yinfans.me) | 4K 蓝光、Hi-Res 音频 |
| **PT 站** | HDSKY、M-Team、CHDBits、TTG——邀请制，最佳质量 |

### Cobalt（干净的社会化媒体下载器）

支持 YouTube、TikTok、Instagram、Twitter、Reddit、SoundCloud 等 30+ 站点。公共 API 有反 bot 保护，Agent 使用建议自托管。

```bash
curl -X POST "https://YOUR-INSTANCE/" \
  -H "Accept: application/json" \
  -H "Content-Type: application/json" \
  -d '{"url": "VIDEO_URL", "videoQuality": "1080"}'
```

## 音乐与音频

### spotDL（Spotify 下载器）

```bash
spotdl "https://open.spotify.com/track/TRACK_ID"      # 单曲
spotdl "https://open.spotify.com/playlist/PLAYLIST_ID"  # 播放列表
spotdl "https://open.spotify.com/album/ALBUM_ID"       # 专辑
spotdl "artist - song name"                            # 搜索并下载
spotdl --format mp3 "URL"                              # 指定格式
spotdl --format flac "URL"                             # 无损
```

自动匹配 Spotify 曲目到 YouTube，下载时嵌入元数据和专辑封面。

**注意**：spotDL 可能触发 Spotify API 频率限制（24 小时冷却）。被限制时用 `yt-dlp -x` 从 YouTube 直接下载作为替代方案。

### 免费合法音乐

| 站点 | 规模 | 许可 |
|------|------|------|
| **Bandcamp** | 数百万曲目 | 多样（很多"name your price"，输入 $0 即可免费） |
| **Free Music Archive** | 20 万+ 曲目 | CC 许可 |
| **Jamendo** | 24 万+ 曲目 | CC/免版税 |
| **Musopen** | 数千 | 公共领域（古典音乐） |
| **SoundCloud** | 海量 | 多样（查找"Free Download"按钮） |

### 中文音乐

| 工具 | 平台 | 备注 |
|------|------|------|
| **Listen 1** | 桌面/浏览器扩展/移动 | 聚合 QQ 音乐、网易、酷狗、酷我、B 站、咪咕 |
| **洛雪音乐助手 (LX Music)** | 桌面+移动 | 多源播放器，支持自定义源 |
| **YesPlayMusic** | 桌面 | 网易云音乐第三方客户端，美观 |
| **无损控** (wusunk.com) | FLAC/WAV/APE/MP3 | 中文界面 |

### 游戏原声（VGM/OST）

| 站点 | 内容 |
|------|------|
| **KHInsider** (downloads.khinsider.com) | 游戏原声（MP3+FLAC） |
| **VGMdb** (vgmdb.net) | 原声数据库（元数据） |
| **Zophar's Domain** | 复古游戏音乐（NSF/SPC/VGM 格式） |

### 播客

| 工具 | 平台 | 备注 |
|------|------|------|
| **gPodder** | 桌面 | 批量下载最佳 |
| **AntennaPod** | Android | 最佳 FOSS 播客应用 |
| **yt-dlp** | CLI | 从 YouTube/Spotify 下载播客 |

## 电子书与学术论文

### 影子图书馆

| 站点 | 规模 | 备注 |
|------|------|------|
| **Anna's Archive** | 61M+ 书，95M+ 论文 | 统一搜索 LibGen+Sci-Hub+Z-Lib。域名轮换中 |
| **Z-Library** (z-lib.id) | 1000 万书 | 需注册，免费下载 5-10 本/天 |
| **Library Genesis** (libgen.li) | 数百万 | 最老影子图书馆，多镜像 |

### 公共领域/合法电子书

| 站点 | 规模 | 备注 |
|------|------|------|
| **Project Gutenberg** | 7 万+ | 公共领域，无需注册 |
| **Standard Ebooks** | 900+ | 精排公共领域书籍 |
| **Open Library** | 数百万 | Internet Archive 借阅库 |
| **Internet Archive Books** | 2000 万+ | 扫描书籍、杂志、政府文档 |

### 学术论文

| 站点 | 规模 | 访问 |
|------|------|------|
| **Sci-Hub** | 8500 万+ 论文 | 输入 DOI 或 URL，数据冻结约 2022 年 |
| **arXiv** | 240 万+ | 免费预印本：物理、数学、CS、生物、经济 |
| **CORE** | 4.02 亿+ | 全球开放获取聚合，有 API |
| **Semantic Scholar** | 2 亿+ | AI 学术搜索 |
| **PubMed Central** | 800 万+ | 生物医学全文 |
| **Unpaywall** | 3000 万+ | 浏览器扩展找免费版本 |
| **Connected Papers** | 可视化 | 相关论文图谱，适合文献综述 |

### 中文电子书

| 站点 | 内容 |
|------|------|
| **鸠摩搜书** (jiumodiary.com) | 聚合电子书搜索引擎，最佳中文起点 |
| **熊猫搜书** | 类似鸠摩，域名可能变化 |
| **书格** (shuge.org) | 中文古典文本/古籍扫描件 |
| **书伴** (bookfere.com) | Kindle 资源 + 电子书工具 |

### 有声书

| 站点 | 内容 |
|------|------|
| **LibriVox** | 2 万+ 公共领域有声书（志愿者朗读） |
| **AudioBook Bay** | 有声书 torrent |
| **Libby** | 图书馆借阅（需借书证） |
| **Internet Archive Audio** | 公共领域有声书 |

### 漫画

| 站点 | 内容 |
|------|------|
| **MangaDex** (mangadex.org) | 社区驱动，多语言 |
| **MANGA Plus** | 官方集英社漫画，合法免费首/末章 |
| **GetComics** | DC/Marvel/独立漫画 |
| **Nyaa** | 漫画 scanlation torrent |

### 下载建议

- **电子书格式优先级**：EPUB > AZW3/MOBI（Kindle）> PDF。EPUB 可重排，PDF 不行
- **Calibre**（`brew install --cask calibre`）转换所有电子书格式
- **DOI → PDF**：先用 `sci-hub.se/DOI`，不行再搜 Semantic Scholar 或 CORE 找开放获取版本
- **教材**：先查 Anna's Archive → LibGen → Z-Library

## 软件与应用

### 开源仓库

| 站点 | 内容 |
|------|------|
| **GitHub Releases** | 大多数 OSS 项目的官方二进制文件 |
| **F-Droid** | FOSS Android 应用（4000+），从源码构建 |
| **FossHub** | 精选 FOSS，无广告/无捆绑 |
| **Flathub** | Linux Flatpak 应用 |
| **Codeberg** | 非营利 Git 托管（德国） |

### 包管理器（Agent 优先使用）

| 管理器 | 平台 | 安装 |
|--------|------|------|
| **Homebrew** | macOS/Linux | `/bin/bash -c "$(curl -fsSL ...)"` |
| **winget** | Windows 10/11 | 预装 |
| **Chocolatey** | Windows | 最大 Windows 包目录 |
| **Scoop** | Windows | 用户级别，无需管理员 |

### 软件归档与便携软件

| 站点 | 内容 |
|------|------|
| **Ninite** (ninite.com) | Windows 批量安装器，全新装机标准 |
| **Softpedia** | 50 万+ 软件目录，病毒扫描 |
| **MajorGeeks** | 精选下载，无 bloatware |
| **PortableApps** | 400+ 便携 Windows 应用 |

### 中文软件站

| 站点 | 信任度 | 备注 |
|------|--------|------|
| **423Down** | 高 | 绿色/去广告版本，10+ 年信誉 |
| **果核剥壳** (ghxi.com) | 高 | 绿色软件+系统 ISO |
| **异次元软件世界** (iplaysoft.com) | 高 | 高质量评测，2006 年至今 |
| **小众软件** (appinn.com) | 高 | 社区驱动发现 |
| **腾讯软件中心** (pc.qq.com) | 很高 | 腾讯官方，验证来源 |

### 驱动

原则：始终先从**制造商官网**下载。

| 厂商 | URL |
|------|------|
| NVIDIA | nvidia.com/drivers |
| AMD | amd.com/en/support |
| Intel | intel.com/download-center |
| Realtek | realtek.com/downloads |

第三方备选：Station Drivers（稀有/老旧硬件）、Snappy Driver Installer（开源离线安装器）、Driver Booster（自动更新）。

## 素材资源（图片/视频/音频/字体）

### 免费图库

| 站点 | 规模 | 特点 |
|------|------|------|
| **Unsplash** | 100 万+ | 自然/生活风格，API 可用 |
| **Pexels** | 大量 | 含视频，API 可用 |
| **Pixabay** | 海量 | 图片/插画/矢量/视频/音乐/SFX 一站 |
| **Kaboompics** | 数千 | 生活方式/室内设计，提供配色板 |

API 访问（免费限额）：
```bash
# Unsplash: 50 req/hr
curl "https://api.unsplash.com/search/photos?query=mountain" \
  -H "Authorization: Client-ID YOUR_KEY"
# Pexels: 200 req/hr
curl "https://api.pexels.com/v1/search?query=nature" \
  -H "Authorization: YOUR_KEY"
```

### 免费视频素材

| 站点 | 质量 |
|------|------|
| **Pexels Videos** | HD/4K |
| **Pixabay Videos** | 多种 |
| **Mixkit** | HD/4K，Envato 出品 |
| **Coverr** | HD，适合网站背景 |

### 音效与背景音

| 站点 | 规模 | 许可 |
|------|------|------|
| **Freesound** | 40 万+ | CC（逐条不同） |
| **Zapsplat** | 15 万+ | 免费（需署名） |
| **YouTube Audio Library** | 数千 | YouTube 创作者免费 |
| **Mixkit SFX** | 精选 | 免费无需注册 |
| **Pixabay Audio** | 12 万+ | 免费免署名 |

### 英文字体

| 站点 | 规模 | 许可 |
|------|------|------|
| **Google Fonts** | 1800+ | SIL OFL/Apache，个人+商用 |
| **Font Squirrel** | 数千 | 全部可商用 |
| **Fontshare** | 精选 | Indian Type Foundry 出品 |
| **Bunny Fonts** | 1510+ | Google Fonts GDPR 合规替代 |

### 中文字体

**可免费商用：**

| 字体 | 风格 | 备注 |
|------|------|------|
| **思源黑体** (Source Han Sans) | 无衬线，7 字重 | Adobe+Google，CJK 标准字体 |
| **思源宋体** (Source Han Serif) | 衬线，7 字重 | 正文排版优秀 |
| **阿里巴巴普惠体** | 现代无衬线 | 阿里巴巴官方出品 |
| **站酷字体系列** | 7 款展示字体 | 各有独特风格 |
| **霞鹜文楷** | 手写/楷书 | 开源，适合文艺场景 |

**字体发现：**
- **猫啃网** (maoken.com) — 最佳免费中字体单一来源
- **100font** (100font.com) — 免费商用字体，许可已验证

**注意**：CJK 字体文件大（10-30MB/字重），思源黑体全集约 200MB。

## 在线课程

### 主流 MOOC 平台

| 平台 | 费用 | 内容 |
|------|------|------|
| **MIT OpenCourseWare** | 免费 | MIT 课程大纲/讲义/视频/考试，标准 |
| **Khan Academy** | 免费 | K-12 到大学，交互式练习 |
| **Coursera** | 旁听免费 | 顶尖大学课程，证书收费 |
| **edX** | 旁听免费 | MIT/Harvard 等，类似 Coursera |
| **freeCodeCamp** | 免费 | 全栈 Web 开发、数据科学、ML |

### 中文学习平台

| 平台 | 内容 |
|------|------|
| **学堂在线** | 清华大学 MOOC |
| **中国大学MOOC** | 网易+教育部，最大中文 MOOC |
| **网易公开课** | 国际课程中文字幕 |
| **慕课网** (imooc) | 编程/IT 课程，项目导向 |

### B 站教育生态

搜索 `[主题] 教程` 或 `[主题] 课程`。下载课程：
```bash
yt-dlp "https://www.bilibili.com/video/BV..."
yt-dlp --cookies-from-browser chrome "URL"  # 会员内容
yt-dlp --yes-playlist "URL"                  # 合集
```

### 课程材料下载

| 平台 | 可下载内容 | 方法 |
|------|-----------|------|
| MIT OCW | PDF 讲义/习题 | 课程页面直接下载 |
| Coursera | 视频/幻灯片 | `coursera-dl` 或 yt-dlp + cookie |
| edX | 视频/字幕 | `edx-dl` 或 yt-dlp |
| OpenStax | 完整教材 PDF | 网站直接下载 |

## 中文网盘搜索

这是中文互联网用户的**关键基础设施**。资源通过网盘（百度网盘、阿里云盘、夸克等）分享，有专门的搜索引擎索引这些分享链接。相当于英文互联网的 torrent 站点。

**域名警告**：网盘搜索引擎域名频繁更换。如果 URL 失效：
1. 搜索 `[站名] 最新地址`
2. 查 网盘之家导航 (wowenda.com)
3. 微博/V2EX 找社区分享链接

### 多平台聚合搜索

| 站点 | 覆盖 | 备注 |
|------|------|------|
| **网盘之家导航** (wowenda.com) | 多引擎链接 | **起点**，导航枢纽 |
| **兄弟盘** | 7+ 平台 | 最全面的多平台搜索 |
| **优聚搜** (v4.jujuso.com) | 多平台 | 简洁快速 |
| **UP云搜** (upyunso.com) | 阿里云盘为主 | 干净，无需注册 |

### 阿里云盘搜索

| 站点 | 备注 |
|------|------|
| **猫狸盘搜** (alipansou.com) | 最流行的阿里盘搜索，索引大 |

阿里云盘是当前中文资源分享的主导平台，速度快，免费不 throttling。

### 百度网盘搜索

| 站点 | 备注 |
|------|------|
| **学霸盘** | 学术/学习资源 |
| **小白盘** | 老牌，界面简洁 |

百度网盘免费速度极差（约 100KB/s），VIP 推荐。

### 资源导航

| 站点 | 内容 |
|------|------|
| **图欧学习资源导航** (tuostudy.upnb.top) | 学习资源/AI 工具/网盘/软件，数百精选链接 |
| **学吧导航** (xue8nav.com) | 40 万+ 用户，编程/设计/语言 |

### 网盘对比

| 平台 | 免费空间 | 免费速度 | 备注 |
|------|---------|---------|------|
| **阿里云盘** | 100GB+ | 快 | 当前最佳分享平台 |
| **百度网盘** | 5GB | 严重限速 | 历史资源最多 |
| **夸克网盘** | 10GB | 快 | 阿里巴巴出品 |
| **迅雷云盘** | 6GB | 快 | P2P 加速 |
| **123 云盘** | 2TB | 快 | 免费空间大 |

### 网盘使用流程

1. 在聚合搜索（优聚搜/猫狸盘搜）搜索资源名
2. 点击结果跳转网盘分享页
3. 保存到个人网盘
4. 从网盘客户端下载，或用下载管理器

## 搜索技术

### Google Dorks 核心操作符

| 操作符 | 用途 | 示例 |
|--------|------|------|
| `filetype:` | 特定文件格式 | `filetype:pdf "machine learning"` |
| `intitle:` | 页面标题关键词 | `intitle:"index of" mp4` |
| `inurl:` | URL 中的词 | `inurl:download "filename"` |
| `site:` | 限定域名 | `site:github.com "project"` |
| `"精确短语"` | 精确匹配 | `"introduction to algorithms"` |
| `-词` | 排除 | `python tutorial -snake -youtube` |
| `OR` | 二选一 | `filetype:epub OR filetype:pdf` |
| `after:/before:` | 日期范围 | `"LLM" after:2025-01-01` |

### 常见模式

```
# 电子书
"书名" filetype:epub OR filetype:pdf OR filetype:mobi

# 开放目录
intitle:"index of" "parent directory" "文件名"

# 特定站点资源
site:github.com "releases" "文件名.zip"
site:archive.org "标题" filetype:pdf
site:reddit.com "download" "资源名"

# 中文资源
"资源名" filetype:pdf site:pan.baidu.com OR site:aliyundrive.com
```

### 直接下载链接提取

| 服务 | 直接下载 URL |
|------|-------------|
| **Google Drive** | `https://drive.google.com/uc?export=download&id=FILE_ID` |
| **Dropbox** | 改 `?dl=0` 为 `?dl=1` |
| **GitHub Releases** | `https://github.com/user/repo/releases/download/TAG/filename` |
| **GitHub Raw** | `https://raw.githubusercontent.com/user/repo/branch/path/file` |
| **OneDrive** | 嵌入 URL 加 `&download=1` |
| **MEGA** | `megadl "URL"`（需 megatools） |

### 通用搜索策略

**递进搜索**：精确名称 → 添加源站点 → 开放目录 → 中文网盘 → Reddit/论坛

**按资源类型最佳搜索路径**：
- 电子书：Anna's Archive → Z-Library → Google filetype → 网盘搜索
- 学术论文：DOI → Sci-Hub → Google Scholar → CORE → arXiv
- 软件：包管理器 → GitHub Releases → 官网
- 视频：yt-dlp（已知 URL）→ 种子搜索 → 网盘搜索
- 音乐：spotDL → yt-dlp → Bandcamp/FMA
- 图片：gallery-dl → 图库网站 → Google 图片
- 中文一切：网盘搜索 → B 站 → 百度

## 工具选择指南

| 场景 | 工具 |
|------|------|
| 视频/音频从流媒体/社交站点 | **yt-dlp** |
| 快速社交媒体抓取 | **cobalt** |
| 批量图片 | **gallery-dl** |
| 大文件（>100MB） | **aria2c** `-x 16 -s 16` |
| 种子/磁力 | **aria2c** |
| 网站镜像 | **wget** `--mirror` |
| 页面所有 PDF | **wget** `-r -A "*.pdf"` |
| API 交互 | **curl** |
| URL/文件信息检查 | **curl** `-I` |
| Spotify 歌单 | **spotdl** |
| Google Drive/OneDrive 同步 | **rclone** |
| MEGA 下载 | **megatools** |

## 域名不稳定

资源站点域名频繁轮换。URL 失效时：
1. 搜索 `[站名] mirror 2026` 或 `[站名] 最新地址`
2. 查 Reddit/Twitter 社区镜像列表
3. Anna's Archive 是最有韧性的电子书元搜索
4. 中文网盘搜索查 网盘之家导航

## Agent 自动化模式

- **视频管线**：`yt-dlp -j URL` → 解析 JSON → 选择格式 → `yt-dlp -f FORMAT URL -o OUTPUT`
- **电子书搜索**：搜索 Anna's Archive / Z-Library / 鸠摩搜书 → 获取下载页 → 提取链接 → `aria2c`
- **批量媒体**：`gallery-dl --dump-json URL` → 审核项目 → `gallery-dl -d OUTPUT URL`
- **音乐**：`spotdl SPOTIFY_URL`（自动 YouTube 匹配+元数据）或 `yt-dlp -x YOUTUBE_URL`
- **网盘搜索**：Agent 协助识别正确搜索引擎、嵌入查询的搜索 URL、引导保存下载流程
