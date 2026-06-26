<#
.SYNOPSIS
    Windows C 盘诊断与清理脚本
.DESCRIPTION
    四阶段清理流程：
      1) 磁盘占用分析（大文件夹排行、常见大户扫描）
      2) 生成三级清理清单（安全 / 中等 / 深度）及预估释放量
      3) 用户选择级别并确认
      4) 执行清理 + 结果报告 + HDD 碎片整理（可选）
.NOTES
    需要管理员权限运行。
    安全级几乎零风险，中等级需谨慎，深度级有实际影响。
#>


$ErrorActionPreference = "Stop"
$ErrorActionPreference = "Continue"
[Console]::OutputEncoding = [Text.Encoding]::UTF8
$Host.UI.RawUI.WindowTitle = "C 盘清理工具"

# ============================================================
# 工具函数
# ============================================================

function Format-Size([long]$Bytes) {
    if ($Bytes -ge 1TB) { return "{0:N2} TB" -f ($Bytes / 1TB) }
    if ($Bytes -ge 1GB) { return "{0:N2} GB" -f ($Bytes / 1GB) }
    if ($Bytes -ge 1MB) { return "{0:N2} MB" -f ($Bytes / 1MB) }
    if ($Bytes -ge 1KB) { return "{0:N2} KB" -f ($Bytes / 1KB) }
    return "$Bytes B"
}

function Get-FolderSize([string]$Path) {
    if (-not (Test-Path $Path)) { return 0 }
    try {
        return (Get-ChildItem -Path $Path -Recurse -Force -ErrorAction SilentlyContinue |
            Where-Object { -not $_.PSIsContainer } |
            Measure-Object -Property Length -Sum).Sum
    } catch {
        return 0
    }
}

function Write-Section([string]$Title) {
    Write-Host ""
    Write-Host ("=" * 60) -ForegroundColor Cyan
    Write-Host "  $Title" -ForegroundColor Cyan
    Write-Host ("=" * 60) -ForegroundColor Cyan
}

function Write-Step([string]$Text) {
    Write-Host "  [*] $Text" -ForegroundColor Yellow
}

function Write-OK([string]$Text) {
    Write-Host "  [+] $Text" -ForegroundColor Green
}

function Write-Warn([string]$Text) {
    Write-Host "  [!] $Text" -ForegroundColor Magenta
}

function Write-Fail([string]$Text) {
    Write-Host "  [-] $Text" -ForegroundColor Red
}

function Write-Item([string]$Label, [string]$Value) {
    Write-Host ("  {0,-25} : {1}" -f $Label, $Value)
}

# ============================================================
# Phase 0: 环境检查
# ============================================================

Clear-Host
Write-Section "C 盘诊断与清理工具"

Write-Host "  提示：请阅读同目录下的「使用说明.txt」" -ForegroundColor Gray
Write-Host ""

Write-Step "检查运行环境..."

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Fail "需要管理员权限。请右键以管理员身份运行 PowerShell，然后重新执行本脚本。"
    Write-Host ""
    Write-Host "按任意键退出..."
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
    exit 1
}
Write-OK "管理员权限已确认"

$drive = Get-PSDrive -Name C -ErrorAction SilentlyContinue
if (-not $drive) {
    Write-Fail "未找到 C 盘。"
    exit 1
}

$freeGB = [math]::Round($drive.Free / 1GB, 2)
$usedGB = [math]::Round($drive.Used / 1GB, 2)
$totalGB = [math]::Round(($drive.Free + $drive.Used) / 1GB, 2)
$freePercent = [math]::Round(($drive.Free / ($drive.Free + $drive.Used)) * 100, 1)
$usedPercent = [math]::Round(100 - $freePercent, 1)

# ============================================================
# Phase 1: 磁盘占用分析
# ============================================================

Write-Section "Phase 1/4 — 磁盘占用分析"

Write-Host ""
Write-Item "C 盘总容量" (Format-Size ($totalGB * 1GB))
Write-Item "已使用" (Format-Size ($usedGB * 1GB))
Write-Item "剩余空间" (Format-Size ($freeGB * 1GB))
Write-Item "使用率" "$usedPercent%"

if ($usedPercent -gt 90) {
    Write-Warn "磁盘使用率超过 90%，系统性能可能严重受影响"
} elseif ($usedPercent -gt 80) {
    Write-Warn "磁盘使用率超过 80%，建议尽快清理"
}

# --- 大文件夹扫描 ---
Write-Host ""
Write-Step "正在扫描 C 盘大文件夹（Top 20）... 可能需要 1-3 分钟"

$scanPaths = @(
    "C:\Windows",
    "C:\Program Files",
    "C:\Program Files (x86)",
    "C:\ProgramData",
    "C:\Users",
    "C:\Temp",
    "C:\$Recycle.Bin"
)

$largeFolders = @()
foreach ($basePath in $scanPaths) {
    if (-not (Test-Path $basePath)) { continue }
    try {
        $subDirs = Get-ChildItem -Path $basePath -Directory -ErrorAction SilentlyContinue
        foreach ($dir in $subDirs) {
            # 跳过系统链接和重解析点
            if ($dir.Attributes -band [IO.FileAttributes]::ReparsePoint) { continue }
            $size = Get-FolderSize $dir.FullName
            if ($size -gt 50MB) {
                $largeFolders += [PSCustomObject]@{
                    Path = $dir.FullName
                    Size = $size
                    Name = $dir.Name
                }
            }
        }
    } catch { }
}

# 对根目录也做二级扫描（Users 下子文件夹）
if (Test-Path "C:\Users") {
    try {
        $userDirs = Get-ChildItem -Path "C:\Users" -Directory -ErrorAction SilentlyContinue
        foreach ($userDir in $userDirs) {
            if ($userDir.Attributes -band [IO.FileAttributes]::ReparsePoint) { continue }
            $subSubDirs = Get-ChildItem -Path $userDir.FullName -Directory -ErrorAction SilentlyContinue
            foreach ($subDir in $subSubDirs) {
                if ($subDir.Attributes -band [IO.FileAttributes]::ReparsePoint) { continue }
                $size = Get-FolderSize $subDir.FullName
                if ($size -gt 50MB) {
                    $largeFolders += [PSCustomObject]@{
                        Path = $subDir.FullName
                        Size = $size
                        Name = "$($userDir.Name)\$($subDir.Name)"
                    }
                }
            }
        }
    } catch { }
}

# 排序取 Top 20
$topFolders = $largeFolders | Sort-Object Size -Descending | Select-Object -First 20

Write-Host ""
Write-Host "  Top 20 大文件夹：" -ForegroundColor White
Write-Host "  --------------------------------------------------"
$rank = 1
foreach ($f in $topFolders) {
    $sizeStr = Format-Size $f.Size
    Write-Host ("  {0,2}. [{1,10}] {2}" -f $rank, $sizeStr, $f.Name)
    $rank++
}

# --- 常见空间大户扫描 ---
Write-Host ""
Write-Step "正在扫描常见软件缓存..."

$knownHogs = @(
    @{ Name = "微信 (WeChat)";         Path = "$env:USERPROFILE\Documents\WeChat Files";       Cleanable = $false },
    @{ Name = "QQ";                    Path = "$env:USERPROFILE\Documents\Tencent Files";      Cleanable = $false },
    @{ Name = "企业微信";              Path = "$env:USERPROFILE\Documents\WXWork";             Cleanable = $false },
    @{ Name = "钉钉";                  Path = "$env:APPDATA\DingTalk";                        Cleanable = $false },
    @{ Name = "Chrome 缓存";           Path = "$env:LOCALAPPDATA\Google\Chrome\User Data";     Cleanable = $true  },
    @{ Name = "Edge 缓存";             Path = "$env:LOCALAPPDATA\Microsoft\Edge\User Data";    Cleanable = $true  },
    @{ Name = "Firefox 缓存";          Path = "$env:APPDATA\Mozilla\Firefox\Profiles";         Cleanable = $true  },
    @{ Name = "VS Code 缓存";          Path = "$env:APPDATA\Code\Cache";                      Cleanable = $true  },
    @{ Name = "Windows 更新缓存";      Path = "C:\Windows\SoftwareDistribution\Download";      Cleanable = $true  },
    @{ Name = "Docker 虚拟磁盘";       Path = "$env:LOCALAPPDATA\Docker";                     Cleanable = $false },
    @{ Name = "WSL 虚拟磁盘";          Path = "$env:LOCALAPPDATA\Packages\CanonicalGroupLimited*"; Cleanable = $false },
    @{ Name = "NPM 缓存";              Path = "$env:APPDATA\npm-cache";                       Cleanable = $true  },
    @{ Name = "pip 缓存";              Path = "$env:LOCALAPPDATA\pip\cache";                   Cleanable = $true  },
    @{ Name = "NuGet 缓存";            Path = "$env:USERPROFILE\.nuget\packages";              Cleanable = $true  },
    @{ Name = "OneDrive 本地缓存";     Path = "$env:LOCALAPPDATA\Microsoft\OneDrive";          Cleanable = $false }
)

$foundHogs = @()
foreach ($hog in $knownHogs) {
    $resolvedPath = $hog.Path
    # 处理通配符路径
    if ($resolvedPath -like '*\*') {
        $base = Split-Path $resolvedPath -Parent
        $pattern = Split-Path $resolvedPath -Leaf
        if (Test-Path $base) {
            $matches = Get-ChildItem -Path $base -Directory -Filter $pattern -ErrorAction SilentlyContinue
            foreach ($m in $matches) {
                $size = Get-FolderSize $m.FullName
                if ($size -gt 10MB) {
                    $foundHogs += [PSCustomObject]@{ Name = $hog.Name; Path = $m.FullName; Size = $size; Cleanable = $hog.Cleanable }
                }
            }
        }
    } elseif (Test-Path $resolvedPath) {
        $size = Get-FolderSize $resolvedPath
        if ($size -gt 10MB) {
            $foundHogs += [PSCustomObject]@{ Name = $hog.Name; Path = $resolvedPath; Size = $size; Cleanable = $hog.Cleanable }
        }
    }
}

if ($foundHogs.Count -gt 0) {
    Write-Host ""
    Write-Host "  发现以下软件数据：" -ForegroundColor White
    Write-Host "  --------------------------------------------------"
    foreach ($h in ($foundHogs | Sort-Object Size -Descending)) {
        $prefix = if ($h.Cleanable) { "✓ 可清理" } else { "✗ 勿自动清理" }
        $color = if ($h.Cleanable) { "Green" } else { "DarkGray" }
        Write-Host ("  {0,-14} [{1,10}] {2}" -f $prefix, (Format-Size $h.Size), $h.Name) -ForegroundColor $color
    }
    Write-Host ""
    Write-Warn "标记为「勿自动清理」的项目包含个人数据，不会被自动删除。"
    Write-Warn "如需清理，请手动处理或用相应软件自带的缓存管理。"
} else {
    Write-Host "  未发现常见大户。"
}

# ============================================================
# Phase 2: 生成清理清单
# ============================================================

Write-Section "Phase 2/4 — 清理清单"

# 定义三级清理项
$cleanupItems = @()

# --- 安全级 ---
$safeItems = @(
    @{
        Category = "安全级"
        Name = "回收站"
        Description = "清空所有用户的回收站"
        Path = "C:\`$Recycle.Bin"
        Method = "RecycleBin"
        Risk = "几乎无风险"
    },
    @{
        Category = "安全级"
        Name = "Windows 临时文件"
        Description = "C:\Windows\Temp 目录"
        Path = "C:\Windows\Temp"
        Method = "Folder"
        Risk = "几乎无风险"
    },
    @{
        Category = "安全级"
        Name = "用户临时文件"
        Description = "%TEMP% 目录"
        Path = $env:TEMP
        Method = "Folder"
        Risk = "几乎无风险"
    },
    @{
        Category = "安全级"
        Name = "Prefetch 文件"
        Description = "C:\Windows\Prefetch"
        Path = "C:\Windows\Prefetch"
        Method = "Folder"
        Risk = "几乎无风险（下次启动慢些许）"
    },
    @{
        Category = "安全级"
        Name = "Windows 更新下载缓存"
        Description = "SoftwareDistribution\Download"
        Path = "C:\Windows\SoftwareDistribution\Download"
        Method = "Folder"
        Risk = "几乎无风险"
    },
    @{
        Category = "安全级"
        Name = "缩略图缓存"
        Description = "thumbs.db / 缩略图数据库"
        Path = "Thumbnails"
        Method = "ThumbnailCache"
        Risk = "几乎无风险（下次浏览略慢）"
    },
    @{
        Category = "安全级"
        Name = "DNS 缓存"
        Description = "ipconfig /flushdns"
        Path = "N/A"
        Method = "Command"
        Risk = "几乎无风险"
    },
    @{
        Category = "安全级"
        Name = "浏览器缓存"
        Description = "Chrome/Edge/Firefox 缓存"
        Path = "BrowserCache"
        Method = "BrowserCache"
        Risk = "几乎无风险"
    }
)

# --- 中等级 ---
$mediumItems = @(
    @{
        Category = "中等级"
        Name = "Delivery Optimization 文件"
        Description = "Windows 更新 P2P 分发缓存"
        Path = "C:\Windows\SoftwareDistribution\DeliveryOptimization"
        Method = "Folder"
        Risk = "低风险"
    },
    @{
        Category = "中等级"
        Name = "Windows 事件日志"
        Description = "清理系统/应用程序日志"
        Path = "N/A"
        Method = "EventLogs"
        Risk = "低风险（清理后无法查看旧日志）"
    },
    @{
        Category = "中等级"
        Name = "Windows 错误报告"
        Description = "WER 错误报告存档"
        Path = "C:\ProgramData\Microsoft\Windows\WER"
        Method = "Folder"
        Risk = "低风险"
    },
    @{
        Category = "中等级"
        Name = "旧 Windows 安装"
        Description = "Windows.old（大版本升级后残留）"
        Path = "C:\Windows.old"
        Method = "Folder"
        Risk = "中等风险（清理后无法回滚到旧版本）"
    },
    @{
        Category = "中等级"
        Name = "设备驱动包备份"
        Description = "DriverStore 中的旧驱动"
        Path = "C:\Windows\System32\DriverStore\FileRepository"
        Method = "DriverStore"
        Risk = "低风险（仅清理旧版本）"
    },
    @{
        Category = "中等级"
        Name = "DISM 清理"
        Description = "清理 WinSxS 组件存储"
        Path = "N/A"
        Method = "DISM"
        Risk = "低风险"
    }
)

# --- 深度级 ---
$deepItems = @(
    @{
        Category = "深度级"
        Name = "系统还原点（保留最新）"
        Description = "删除除最新外的所有还原点"
        Path = "N/A"
        Method = "SystemRestore"
        Risk = "高风险（无法恢复到旧还原点）"
    },
    @{
        Category = "深度级"
        Name = "休眠文件"
        Description = "禁用休眠功能 (powercfg -h off)"
        Path = "C:\hiberfil.sys"
        Method = "Hibernate"
        Risk = "高风险（禁用快速启动和休眠）"
    },
    @{
        Category = "深度级"
        Name = "用户下载文件夹（>30 天旧文件）"
        Description = "清理 %USERPROFILE%\Downloads 中旧文件"
        Path = "$env:USERPROFILE\Downloads"
        Method = "OldDownloads"
        Risk = "高风险（会删除旧下载文件）"
    }
)

# 收集所有清理项并计算预估大小
$allItems = @()
# 安全级
foreach ($item in $safeItems) {
    $estSize = 0
    switch ($item.Method) {
        "RecycleBin" {
            # 回收站大小难以精确预估，给范围
            $estSize = 500MB
        }
        "Folder" {
            $estSize = Get-FolderSize $item.Path
        }
        "ThumbnailCache" {
            $estSize = 200MB
        }
        "Command" {
            $estSize = 1MB
        }
        "BrowserCache" {
            $browserSize = 0
            $browserPaths = @(
                "$env:LOCALAPPDATA\Google\Chrome\User Data\*\Cache\Cache_Data",
                "$env:LOCALAPPDATA\Microsoft\Edge\User Data\*\Cache\Cache_Data",
                "$env:APPDATA\Mozilla\Firefox\Profiles\*\cache2"
            )
            foreach ($bp in $browserPaths) {
                $browserSize += Get-FolderSize $bp
            }
            $estSize = $browserSize
        }
    }
    $allItems += [PSCustomObject]@{
        Category = $item.Category
        Name = $item.Name
        Path = $item.Path
        Method = $item.Method
        Description = $item.Description
        EstSize = $estSize
        Risk = $item.Risk
    }
}

# 中等级
foreach ($item in $mediumItems) {
    $estSize = 0
    switch ($item.Method) {
        "Folder" {
            $estSize = Get-FolderSize $item.Path
        }
        "EventLogs" {
            $estSize = 500MB
        }
        "DISM" {
            $estSize = 1GB
        }
        "DriverStore" {
            $estSize = 500MB
        }
    }
    $allItems += [PSCustomObject]@{
        Category = $item.Category
        Name = $item.Name
        Path = $item.Path
        Method = $item.Method
        Description = $item.Description
        EstSize = $estSize
        Risk = $item.Risk
    }
}

# 深度级
foreach ($item in $deepItems) {
    $estSize = 0
    switch ($item.Method) {
        "SystemRestore" {
            $estSize = 2GB
        }
        "Hibernate" {
            if (Test-Path "C:\hiberfil.sys") {
                $estSize = (Get-Item "C:\hiberfil.sys" -Force).Length
            }
        }
        "OldDownloads" {
            if (Test-Path $item.Path) {
                $cutoff = (Get-Date).AddDays(-30)
                $estSize = (Get-ChildItem -Path $item.Path -File -Recurse -ErrorAction SilentlyContinue |
                    Where-Object { $_.LastWriteTime -lt $cutoff } |
                    Measure-Object -Property Length -Sum).Sum
            }
        }
    }
    $allItems += [PSCustomObject]@{
        Category = $item.Category
        Name = $item.Name
        Path = $item.Path
        Method = $item.Method
        Description = $item.Description
        EstSize = $estSize
        Risk = $item.Risk
    }
}

# 按类别汇总
$safeTotal = ($allItems | Where-Object Category -eq "安全级" | Measure-Object EstSize -Sum).Sum
$mediumTotal = ($allItems | Where-Object Category -eq "中等级" | Measure-Object EstSize -Sum).Sum
$deepTotal = ($allItems | Where-Object Category -eq "深度级" | Measure-Object EstSize -Sum).Sum

Write-Host ""
Write-Host "  清理级别           项目数       预估释放量      风险" -ForegroundColor White
Write-Host "  ------------------------------------------------------------"
Write-Host ("  [1] 安全级          {0}          ~{1}        几乎无风险" -f $safeItems.Count, (Format-Size $safeTotal)) -ForegroundColor Green
Write-Host ("  [2] 中等级          {0}          ~{1}        低-中风险" -f $mediumItems.Count, (Format-Size ($safeTotal + $mediumTotal))) -ForegroundColor Yellow
Write-Host ("  [3] 深度级          {0}          ~{1}        高风险" -f $deepItems.Count, (Format-Size ($safeTotal + $mediumTotal + $deepTotal))) -ForegroundColor Red

# 显示详细清单
Write-Host ""
Write-Host "  === 安全级详细清单 ===" -ForegroundColor Green
foreach ($item in ($allItems | Where-Object Category -eq "安全级")) {
    $indicator = if ($item.EstSize -gt 100MB) { "  ← 大户" } else { "" }
    Write-Host ("  · {0,-25} ~{1,-10} {2}{3}" -f $item.Name, (Format-Size $item.EstSize), $item.Risk, $indicator)
}

Write-Host "  === 中等级详细清单 ===" -ForegroundColor Yellow
foreach ($item in ($allItems | Where-Object Category -eq "中等级")) {
    $indicator = if ($item.EstSize -gt 500MB) { "  ← 大户" } else { "" }
    Write-Host ("  · {0,-25} ~{1,-10} {2}{3}" -f $item.Name, (Format-Size $item.EstSize), $item.Risk, $indicator)
}

Write-Host "  === 深度级详细清单 ===" -ForegroundColor Red
foreach ($item in ($allItems | Where-Object Category -eq "深度级")) {
    $indicator = if ($item.EstSize -gt 1GB) { "  ← 大户" } else { "" }
    Write-Host ("  · {0,-25} ~{1,-10} {2}{3}" -f $item.Name, (Format-Size $item.EstSize), $item.Risk, $indicator)
}

Write-Host ""
Write-Warn "预估大小基于快速扫描，实际可能略有偏差（±20%）。"

# ============================================================
# Phase 3: 用户选择
# ============================================================

Write-Section "Phase 3/4 — 选择清理级别"

Write-Host ""
Write-Host "  请选择清理级别：" -ForegroundColor White
Write-Host "    [1] 安全级 — 建议日常使用，几乎无风险" -ForegroundColor Green
Write-Host "    [2] 中等级 — 适度清理，建议每月一次" -ForegroundColor Yellow
Write-Host "    [3] 深度级 — 激进清理，仅在空间严重不足时使用" -ForegroundColor Red
Write-Host "    [Q] 退出 — 不做任何清理" -ForegroundColor Gray
Write-Host ""

$choice = Read-Host "  输入选择 [1/2/3/Q]"

switch ($choice) {
    "1" { $level = 1; $levelName = "安全级" }
    "2" { $level = 2; $levelName = "中等级" }
    "3" { $level = 3; $levelName = "深度级" }
    "Q" {
        Write-Host ""
        Write-OK "已取消清理，脚本退出。"
        exit 0
    }
    default {
        Write-Fail "无效输入，脚本退出。"
        exit 1
    }
}

# 筛选要执行的清理项
$toExecute = switch ($level) {
    1 { $allItems | Where-Object Category -eq "安全级" }
    2 { $allItems | Where-Object { $_.Category -in @("安全级", "中等级") } }
    3 { $allItems }
}

$estTotal = ($toExecute | Measure-Object EstSize -Sum).Sum

# 最终确认
Write-Host ""
Write-Section "最终确认"

Write-Host ""
$toExecute | Format-Table Name, @{Label="预估"; Expression={Format-Size $_.EstSize}}, Risk -AutoSize
Write-Host ""
Write-Warn "即将执行以上 $($toExecute.Count) 项清理，预估释放 ~$(Format-Size $estTotal)"
Write-Warn "当前 C 盘剩余：$(Format-Size ($freeGB * 1GB))"
Write-Host ""

$confirm = Read-Host "  确认执行？[Y/N]"
if ($confirm -ne "Y" -and $confirm -ne "y") {
    Write-Host ""
    Write-OK "已取消清理，脚本退出。"
    exit 0
}

# ============================================================
# Phase 4: 执行清理
# ============================================================

Write-Section "Phase 4/4 — 执行清理"

$initialFree = (Get-PSDrive -Name C).Free
$cleanedItems = 0
$failedItems = 0

Write-Host ""

foreach ($item in $toExecute) {
    Write-Step "正在处理：$($item.Name)..."

    try {
        switch ($item.Method) {
            "RecycleBin" {
                # 清空回收站
                $shell = New-Object -ComObject Shell.Application
                $shell.Namespace(0xA).Items() | ForEach-Object { $_.InvokeVerb("delete") }
                Write-OK "  回收站已清空"
            }
            "Folder" {
                if (Test-Path $item.Path) {
                    Get-ChildItem -Path $item.Path -Recurse -Force -ErrorAction SilentlyContinue |
                        Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
                    Write-OK "  已清理"
                } else {
                    Write-Host "  跳过（路径不存在）" -ForegroundColor Gray
                }
            }
            "ThumbnailCache" {
                # 清理缩略图缓存
                Get-ChildItem -Path "C:\Users" -Directory | ForEach-Object {
                    $thumbDb = "$($_.FullName)\AppData\Local\Microsoft\Windows\Explorer"
                    if (Test-Path $thumbDb) {
                        Get-ChildItem -Path $thumbDb -Filter "thumbcache_*.db" -Force -ErrorAction SilentlyContinue |
                            Remove-Item -Force -ErrorAction SilentlyContinue
                    }
                }
                Write-OK "  缩略图缓存已清理"
            }
            "Command" {
                # DNS 缓存
                ipconfig /flushdns | Out-Null
                Write-OK "  DNS 缓存已清理"
            }
            "BrowserCache" {
                $browserPaths = @(
                    "$env:LOCALAPPDATA\Google\Chrome\User Data\*\Cache\Cache_Data",
                    "$env:LOCALAPPDATA\Microsoft\Edge\User Data\*\Cache\Cache_Data",
                    "$env:APPDATA\Mozilla\Firefox\Profiles\*\cache2"
                )
                foreach ($bp in $browserPaths) {
                    $parent = Split-Path $bp -Parent
                    if (Test-Path $parent) {
                        Get-ChildItem -Path $bp -Recurse -Force -ErrorAction SilentlyContinue |
                            Remove-Item -Force -Recurse -ErrorAction SilentlyContinue
                    }
                }
                Write-OK "  浏览器缓存已清理"
            }
            "EventLogs" {
                wevtutil el | ForEach-Object { wevtutil cl $_ 2>$null }
                Write-OK "  事件日志已清理"
            }
            "DISM" {
                Write-Host "  正在运行 DISM 清理（可能需要几分钟）..." -ForegroundColor Gray
                dism /online /cleanup-image /startcomponentcleanup /resetbase | Out-Null
                Write-OK "  DISM 清理完成"
            }
            "DriverStore" {
                Write-Host "  正在清理旧驱动..." -ForegroundColor Gray
                pnputil /enum-drivers | ForEach-Object {
                    if ($_ -match "Published Name : (.*\.inf)") {
                        pnputil /delete-driver $Matches[1] /uninstall /force 2>$null
                    }
                }
                Write-OK "  旧驱动已清理"
            }
            "SystemRestore" {
                Write-Host "  正在清理系统还原点..." -ForegroundColor Gray
                vssadmin delete shadows /for=C: /all /quiet 2>$null
                Write-OK "  系统还原点已清理"
            }
            "Hibernate" {
                powercfg -h off
                Write-OK "  休眠功能已禁用，hiberfil.sys 已删除"
            }
            "OldDownloads" {
                if (Test-Path $item.Path) {
                    $cutoff = (Get-Date).AddDays(-30)
                    Get-ChildItem -Path $item.Path -File -Recurse -ErrorAction SilentlyContinue |
                        Where-Object { $_.LastWriteTime -lt $cutoff } |
                        Remove-Item -Force -ErrorAction SilentlyContinue
                    Write-OK "  30 天前的下载文件已清理"
                }
            }
            default {
                Write-Host "  未知清理方法，跳过" -ForegroundColor Gray
            }
        }
        $cleanedItems++
    } catch {
        Write-Fail "  清理失败：$($_.Exception.Message)"
        $failedItems++
    }
}

# ============================================================
# 结果报告
# ============================================================

Write-Host ""
Write-Section "清理结果"

$finalFree = (Get-PSDrive -Name C).Free
$freed = $finalFree - $initialFree
$finalFreeGB = [math]::Round($finalFree / 1GB, 2)
$freedGB = [math]::Round($freed / 1GB, 2)
$finalPercent = [math]::Round(($finalFree / ($finalFree + (Get-PSDrive -Name C).Used)) * 100, 1)

Write-Host ""
Write-Item "成功清理" "$cleanedItems 项"
if ($failedItems -gt 0) {
    Write-Item "失败" "$failedItems 项"
}
Write-Item "实际释放空间" (Format-Size $freed)
Write-Item "清理前剩余" (Format-Size $initialFree)
Write-Item "清理后剩余" (Format-Size $finalFree)
Write-Item "当前使用率" "$finalPercent%"

# ============================================================
# HDD 磁盘优化（可选）
# ============================================================

Write-Host ""
Write-Section "HDD 磁盘优化"

Write-Host ""
Write-Host "  检测到您的磁盘为 HDD，建议执行碎片整理以提升性能。" -ForegroundColor Yellow
Write-Host "  注意：碎片整理可能需要 30 分钟到几小时，期间电脑可使用但较慢。" -ForegroundColor Yellow
Write-Host ""

$defragChoice = Read-Host "  是否执行碎片整理？[Y/N]"

if ($defragChoice -eq "Y" -or $defragChoice -eq "y") {
    Write-Host ""
    Write-Step "正在分析碎片状态..."
    defrag C: /A

    Write-Host ""
    Write-Step "开始碎片整理..."
    defrag C: /U /V

    Write-OK "碎片整理完成"
}

# ============================================================
# 收尾
# ============================================================

Write-Host ""
Write-Host ("=" * 60) -ForegroundColor Cyan
Write-OK "清理流程全部完成！"
Write-Host ""
Write-Host "  建议：" -ForegroundColor White
Write-Host "    · 定期（每月）运行本脚本的安全级清理" -ForegroundColor Gray
Write-Host "    · 将大文件/不常用软件迁移到其他盘" -ForegroundColor Gray
Write-Host "    · 在 Windows 设置中更改默认下载/文档路径到其他盘" -ForegroundColor Gray
Write-Host ""
Write-Host "按任意键退出..."
$null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
