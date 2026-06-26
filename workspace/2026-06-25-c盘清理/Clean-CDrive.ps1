<#
.SYNOPSIS
    C 盘清理脚本 - 三阶段执行 + 性能诊断
.DESCRIPTION
    阶段 0 环境自检 -> 阶段 1 扫描评估（只读） -> 阶段 2 预览确认 -> 阶段 3 执行删除
    只删可重建缓存，不碰休眠文件/Windows.old/还原点/下载/WinSxS DISM。
    纯 PowerShell 系统命令，需管理员权限。
.PARAMETER ScanOnly
    只扫描评估，不出删除确认
.PARAMETER ReportPath
    报告输出目录（默认桌面 C盘清理报告_时间戳）
.EXAMPLE
    .\Clean-CDrive.ps1 -ScanOnly
    .\Clean-CDrive.ps1
#>
[CmdletBinding()]
param(
    [switch]$ScanOnly,
    [string]$ReportPath
)

$ErrorActionPreference = 'Continue'

# ========== 工具函数 ==========

function Get-PathSize {
    param([string]$Path)
    if (-not (Test-Path -LiteralPath $Path)) { return [long]0 }
    $item = Get-Item -LiteralPath $Path -Force -ErrorAction SilentlyContinue
    if (-not $item) { return [long]0 }
    if ($item.PSIsContainer) {
        $s = (Get-ChildItem -LiteralPath $Path -Recurse -Force -ErrorAction SilentlyContinue |
              Measure-Object -Sum Length).Sum
        if ($null -eq $s) { return [long]0 }
        return [long]$s
    } else {
        return [long]$item.Length
    }
}

function Format-Size {
    param([long]$Bytes)
    if ($Bytes -ge 1GB) { return ('{0:N2} GB' -f ($Bytes / 1GB)) }
    if ($Bytes -ge 1MB) { return ('{0:N2} MB' -f ($Bytes / 1MB)) }
    if ($Bytes -ge 1KB) { return ('{0:N2} KB' -f ($Bytes / 1KB)) }
    return "$Bytes B"
}

function Write-Section {
    param([string]$Title)
    Write-Host ""
    Write-Host ('=' * 60) -ForegroundColor Cyan
    Write-Host $Title -ForegroundColor Cyan
    Write-Host ('=' * 60) -ForegroundColor Cyan
}

# 构建清理项（展开为具体路径，便于阶段 3 直接用）
function Build-CleanTargets {
    $t = @()

    $t += [PSCustomObject]@{ Name='用户临时文件';        Paths=@($env:TEMP);                                         Kind='Folder'; Note=''; Warn=$false }
    $t += [PSCustomObject]@{ Name='系统临时文件';        Paths=@('C:\Windows\Temp');                                 Kind='Folder'; Note=''; Warn=$false }
    $t += [PSCustomObject]@{ Name='Windows Update 缓存'; Paths=@('C:\Windows\SoftwareDistribution\Download');        Kind='Folder'; Note='清理时停 wuauserv 服务'; Warn=$false }
    $t += [PSCustomObject]@{ Name='传递优化缓存';        Paths=@();                                                   Kind='DO';     Note='Delete-DeliveryOptimizationCache'; Warn=$false }

    # 缩略图 + 图标缓存文件
    $thumbPath = Join-Path $env:LOCALAPPDATA 'Microsoft\Windows\Explorer'
    $thumbFiles = @()
    if (Test-Path -LiteralPath $thumbPath) {
        $thumbFiles += (Get-ChildItem -LiteralPath $thumbPath -Filter 'thumbcache_*.db' -Force -ErrorAction SilentlyContinue).FullName
        $thumbFiles += (Get-ChildItem -LiteralPath $thumbPath -Filter 'iconcache_*.db'   -Force -ErrorAction SilentlyContinue).FullName
    }
    $t += [PSCustomObject]@{ Name='缩略图缓存';          Paths=$thumbFiles;                                          Kind='File';    Note=''; Warn=$false }

    $iconCache = Join-Path $env:LOCALAPPDATA 'IconCache.db'
    $t += [PSCustomObject]@{ Name='图标缓存 IconCache';  Paths=@($iconCache);                                        Kind='File';    Note=''; Warn=$false }

    # 内存转储
    $dumps = @()
    if (Test-Path 'C:\Windows\Memory.dmp')  { $dumps += 'C:\Windows\Memory.dmp' }
    if (Test-Path 'C:\Windows\Minidump')    { $dumps += 'C:\Windows\Minidump' }
    $t += [PSCustomObject]@{ Name='内存转储文件';        Paths=$dumps;                                               Kind='Mixed';   Note=''; Warn=$false }

    $t += [PSCustomObject]@{ Name='WER 错误报告';        Paths=@('C:\ProgramData\Microsoft\Windows\WER');           Kind='Folder';  Note=''; Warn=$false }
    $t += [PSCustomObject]@{ Name='Prefetch 预读取';     Paths=@('C:\Windows\Prefetch');                             Kind='FolderContents'; Note='清后首次启动应用会略慢'; Warn=$true }

    # 浏览器缓存 - 动态找 Cache / Code Cache / GPUCache 目录
    foreach ($b in @(
        @{ N='Edge';   R=Join-Path $env:LOCALAPPDATA 'Microsoft\Edge\User Data' },
        @{ N='Chrome'; R=Join-Path $env:LOCALAPPDATA 'Google\Chrome\User Data' }
    )) {
        $caches = @()
        if (Test-Path -LiteralPath $b.R) {
            $caches = (Get-ChildItem -LiteralPath $b.R -Recurse -Directory -Force -ErrorAction SilentlyContinue |
                       Where-Object { $_.Name -in @('Cache','Code Cache','GPUCache') }).FullName
        }
        $t += [PSCustomObject]@{ Name=("$($b.N) 缓存"); Paths=$caches; Kind='Folder'; Note="建议先关闭 $($b.N)"; Warn=$false }
    }
    $ffRoot = Join-Path $env:LOCALAPPDATA 'Mozilla\Firefox\Profiles'
    $ffCaches = @()
    if (Test-Path -LiteralPath $ffRoot) {
        Get-ChildItem -LiteralPath $ffRoot -Directory -Force -ErrorAction SilentlyContinue | ForEach-Object {
            $c = Join-Path $_.FullName 'cache2'
            if (Test-Path -LiteralPath $c) { $ffCaches += $c }
        }
    }
    $t += [PSCustomObject]@{ Name='Firefox 缓存';        Paths=$ffCaches;                                           Kind='Folder';  Note='建议先关闭 Firefox'; Warn=$false }

    $t += [PSCustomObject]@{ Name='CBS 日志';            Paths=@('C:\Windows\Logs\CBS');                            Kind='Folder';  Note=''; Warn=$false }
    $t += [PSCustomObject]@{ Name='Panther 升级日志';    Paths=@('C:\Windows\Panther');                             Kind='Folder';  Note=''; Warn=$false }
    $t += [PSCustomObject]@{ Name='回收站';              Paths=@();                                                  Kind='Recycle'; Note=''; Warn=$false }

    return $t
}

# 执行单项清理
function Invoke-CleanItem {
    param($Item)
    foreach ($p in $Item.Paths) {
        if (-not (Test-Path -LiteralPath $p)) { continue }
        try {
            if ($Item.Kind -in @('Folder','FolderContents')) {
                Get-ChildItem -LiteralPath $p -Force -ErrorAction SilentlyContinue |
                    Remove-Item -Recurse -Force -ErrorAction SilentlyContinue
            } elseif ($Item.Kind -in @('File','Mixed')) {
                Remove-Item -LiteralPath $p -Recurse -Force -ErrorAction SilentlyContinue
            }
        } catch {}
    }
    switch ($Item.Kind) {
        'Recycle' { Clear-RecycleBin -Force -Confirm:$false -ErrorAction SilentlyContinue }
        'DO'      { Delete-DeliveryOptimizationCache -Force -ErrorAction SilentlyContinue }
    }
}

# ========== 阶段 0：环境自检 ==========

$isAdmin = ([Security.Principal.WindowsPrincipal][Security.Principal.WindowsIdentity]::GetCurrent()).IsInRole([Security.Principal.WindowsBuiltInRole]::Administrator)
if (-not $isAdmin) {
    Write-Host '[X] 请以管理员身份运行此脚本' -ForegroundColor Red
    Write-Host '    右键 PowerShell -> 以管理员身份运行' -ForegroundColor Yellow
    exit 1
}

$os = Get-CimInstance Win32_OperatingSystem
$timestamp = Get-Date -Format 'yyyyMMdd_HHmmss'

if (-not $ReportPath) {
    $ReportPath = Join-Path $env:USERPROFILE "Desktop\C盘清理报告_$timestamp"
}
if (-not (Test-Path -LiteralPath $ReportPath)) {
    New-Item -ItemType Directory -Path $ReportPath -Force | Out-Null
}

$scanReportPath  = Join-Path $ReportPath '01_扫描报告.txt'
$scanJsonPath    = Join-Path $ReportPath '01_扫描数据.json'
$perfReportPath  = Join-Path $ReportPath '性能诊断报告.txt'
$execReportPath  = Join-Path $ReportPath '02_执行报告.txt'

Write-Section '阶段 0：环境自检'
Write-Host ('系统：{0} {1}' -f $os.Caption, $os.Version) -ForegroundColor Gray
Write-Host ('报告目录：{0}' -f $ReportPath) -ForegroundColor Gray

# ========== 阶段 1：扫描评估 ==========

Write-Section '阶段 1：扫描评估（只读，不删除）'
Write-Host '正在构建清理项清单...' -ForegroundColor Gray
$targets = Build-CleanTargets

# 扫描每项大小
$results = @()
$i = 0
foreach ($t in $targets) {
    $i++
    Write-Host ('  [{0}/{1}] 扫描 {2}...' -f $i, $targets.Count, $t.Name) -ForegroundColor Gray
    $size = [long]0
    if ($t.Kind -eq 'DO') {
        try {
            $do = Get-DeliveryOptimizationCache -ErrorAction SilentlyContinue
            if ($do) {
                $s = ($do | Measure-Object -Property FileSize -Sum).Sum
                if ($s) { $size = [long]$s }
            }
        } catch { $size = [long]0 }
    } elseif ($t.Kind -eq 'Recycle') {
        try {
            $shell = New-Object -ComObject Shell.Application
            $rb = $shell.Namespace(10)
            if ($rb) {
                foreach ($it in $rb.Items()) { $size += $it.Size }
            }
        } catch {}
    } else {
        foreach ($p in $t.Paths) { $size += Get-PathSize -Path $p }
    }
    $exists = ($size -gt 0) -or ($t.Paths.Count -gt 0 -and ($t.Paths | Where-Object { Test-Path -LiteralPath $_ }).Count -gt 0) -or ($t.Kind -in @('Recycle','DO'))
    $results += [PSCustomObject]@{
        Index    = $results.Count + 1
        Name     = $t.Name
        Kind     = $t.Kind
        Paths    = $t.Paths
        Size     = $size
        SizeText = Format-Size $size
        Exists   = $exists
        Note     = $t.Note
        Warn     = $t.Warn
    }
}

# 参考项（不删，只显示大头）
Write-Host '  扫描参考项（不删除）...' -ForegroundColor Gray
$refResults = @()
foreach ($r in @(
    @{ N='Windows.old（参考）';    P='C:\Windows.old' },
    @{ N='休眠文件 hiberfil.sys（参考）'; P='C:\hiberfil.sys' },
    @{ N='页面文件 pagefile.sys（参考）'; P='C:\pagefile.sys' }
)) {
    $sz = Get-PathSize -Path $r.P
    $refResults += [PSCustomObject]@{ Name=$r.N; Path=$r.P; SizeText=(Format-Size $sz); Exists=($sz -gt 0) }
}

# 各用户 Downloads
$dlResults = @()
if (Test-Path 'C:\Users') {
    Get-ChildItem 'C:\Users' -Directory -Force -ErrorAction SilentlyContinue | ForEach-Object {
        $dl = Join-Path $_.FullName 'Downloads'
        if (Test-Path -LiteralPath $dl) {
            $sz = Get-PathSize -Path $dl
            $dlResults += [PSCustomObject]@{ User=$_.Name; Path=$dl; SizeText=(Format-Size $sz) }
        }
    }
}

$totalCleanable = ($results | Where-Object { $_.Size -gt 0 } | Measure-Object -Property Size -Sum).Sum
if ($null -eq $totalCleanable) { $totalCleanable = [long]0 }

# 控制台输出
Write-Host ''
Write-Host '【可清理项】' -ForegroundColor Green
$results | Where-Object { $_.Size -gt 0 } |
    Format-Table Index, Name, SizeText, @{N='备注';E={$_.Note}} -AutoSize | Out-String | Write-Host

Write-Host '【参考项（不删除，仅显示大头）】' -ForegroundColor DarkYellow
$refResults | Format-Table Name, SizeText, Exists -AutoSize | Out-String | Write-Host
Write-Host '提示：WinSxS 组件库体积请单独运行 -> Dism /Online /Cleanup-Image /AnalyzeComponentStore' -ForegroundColor DarkGray

if ($dlResults) {
    Write-Host '【各用户 Downloads（不删除，参考）】' -ForegroundColor DarkYellow
    $dlResults | Format-Table User, SizeText -AutoSize | Out-String | Write-Host
}

Write-Host ('总可释放空间（可清理项合计）：{0}' -f (Format-Size $totalCleanable)) -ForegroundColor Green

# 写扫描报告 txt
$scanLines = @()
$scanLines += '=' * 60
$scanLines += 'C 盘清理 - 扫描报告'
$scanLines += ('生成时间：{0}' -f (Get-Date))
$scanLines += ('系统：{0} {1}' -f $os.Caption, $os.Version)
$scanLines += '=' * 60
$scanLines += ''
$scanLines += '【可清理项】'
$scanLines += ($results | Where-Object { $_.Size -gt 0 } |
    Format-Table Index, Name, SizeText, Paths, Note -AutoSize | Out-String)
$scanLines += '【参考项（不删除）】'
$scanLines += ($refResults | Format-Table Name, SizeText, Path -AutoSize | Out-String)
$scanLines += '【各用户 Downloads（不删除）】'
$scanLines += ($dlResults | Format-Table User, SizeText, Path -AutoSize | Out-String)
$scanLines += ''
$scanLines += ('总可释放空间：{0}' -f (Format-Size $totalCleanable))
$scanLines | Out-File -FilePath $scanReportPath -Encoding UTF8

# 写 JSON
$results | Select-Object Index, Name, Kind, Size, Exists, Note, Warn |
    ConvertTo-Json -Depth 3 | Out-File -FilePath $scanJsonPath -Encoding UTF8

# ========== 性能诊断 ==========

Write-Section "性能诊断（解释'卡'的可能来源，不修改任何设置）"
$perfLines = @()
$perfLines += '性能诊断报告'
$perfLines += ('生成时间：{0}' -f (Get-Date))
$perfLines += ('=' * 60)

# 磁盘
$cDrive = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'"
$totalGB = [math]::Round($cDrive.Size / 1GB, 2)
$freeGB  = [math]::Round($cDrive.FreeSpace / 1GB, 2)
$usedGB  = [math]::Round(($cDrive.Size - $cDrive.FreeSpace) / 1GB, 2)
$freePct = [math]::Round($cDrive.FreeSpace / $cDrive.Size * 100, 1)

Write-Host ''
Write-Host '[磁盘]' -ForegroundColor Cyan
$diskMsg = ('C 盘：总计 {0} GB / 已用 {1} GB / 可用 {2} GB（{3}%）' -f $totalGB,$usedGB,$freeGB,$freePct)
Write-Host "  $diskMsg"
$perfLines += ''
$perfLines += "[磁盘] $diskMsg"

$physDisks = Get-PhysicalDisk | Select-Object FriendlyName, MediaType, BusType, HealthStatus
Write-Host '  物理磁盘：' 
$pdStr = ($physDisks | Format-Table -AutoSize | Out-String)
Write-Host $pdStr
$perfLines += '[物理磁盘]'
$perfLines += $pdStr

if ($freePct -lt 15) {
    Write-Host '  [!] 可用空间不足 15%，磁盘 I/O 会显著变慢（HDD 尤甚）' -ForegroundColor Red
    $perfLines += '[!] 可用空间不足 15%，磁盘 I/O 会显著变慢'
} elseif ($freePct -lt 25) {
    Write-Host '  [!] 可用空间偏低（<25%），建议清理' -ForegroundColor Yellow
    $perfLines += '[!] 可用空间偏低（<25%），建议清理'
}

# 开机时长
$bootTime = $os.LastBootUpTime
$uptime = (Get-Date) - $bootTime
Write-Host ''
Write-Host '[开机时长]' -ForegroundColor Cyan
$bootMsg = ('最后开机：{0:yyyy-MM-dd HH:mm:ss}' -f $bootTime)
$upMsg   = ('已运行：{0} 天 {1} 小时 {2} 分' -f [math]::Floor($uptime.TotalDays), $uptime.Hours, $uptime.Minutes)
Write-Host "  $bootMsg"
Write-Host "  $upMsg"
$perfLines += ''
$perfLines += "[开机时长] $bootMsg"
$perfLines += $upMsg

# 启动项
$startup = Get-CimInstance Win32_StartupCommand | Select-Object Name, Command, Location, User
Write-Host ''
Write-Host ('[启动项] 共 {0} 项' -f ($startup | Measure-Object).Count) -ForegroundColor Cyan
$suStr = ($startup | Format-Table -AutoSize | Out-String)
Write-Host $suStr
$perfLines += ''
$perfLines += "[启动项] 共 $(($startup | Measure-Object).Count) 项"
$perfLines += $suStr

# 自启服务
$autoSvc = Get-Service | Where-Object { $_.StartType -eq 'Automatic' }
$autoRun = ($autoSvc | Where-Object { $_.Status -eq 'Running' } | Measure-Object).Count
Write-Host ''
Write-Host ('[自启服务] Automatic 共 {0} 个，运行中 {1} 个' -f ($autoSvc | Measure-Object).Count, $autoRun) -ForegroundColor Cyan
$perfLines += ''
$perfLines += "[自启服务] Automatic 共 $(($autoSvc | Measure-Object).Count) 个，运行中 $autoRun 个"

# 进程 Top 10（内存）
Write-Host ''
Write-Host '[进程 Top 10 - 按内存]' -ForegroundColor Cyan
$topMem = Get-Process | Sort-Object WorkingSet -Descending | Select-Object -First 10 |
    Select-Object Name, @{N='内存MB';E={[math]::Round($_.WorkingSet/1MB,1)}}, @{N='CPU秒';E={[math]::Round($_.CPU,1)}}
$tmStr = ($topMem | Format-Table -AutoSize | Out-String)
Write-Host $tmStr
$perfLines += ''
$perfLines += '[进程 Top 10 - 按内存]'
$perfLines += $tmStr

# C 盘大文件夹 Top 10
Write-Host ''
Write-Host '[C 盘大文件夹 Top 10 - 顶层目录（可能需要 1-2 分钟）]' -ForegroundColor Cyan
$topDirs = @()
Get-ChildItem 'C:\' -Directory -Force -ErrorAction SilentlyContinue | ForEach-Object {
    $sz = Get-PathSize -Path $_.FullName
    $topDirs += [PSCustomObject]@{ 目录=$_.FullName; 大小=(Format-Size $sz); Bytes=$sz }
}
$topDirs = $topDirs | Sort-Object Bytes -Descending | Select-Object -First 10
$tdStr = ($topDirs | Format-Table -AutoSize | Out-String)
Write-Host $tdStr
$perfLines += ''
$perfLines += '[C 盘大文件夹 Top 10]'
$perfLines += $tdStr

$perfLines | Out-File -FilePath $perfReportPath -Encoding UTF8

Write-Host ''
Write-Host ('扫描报告：{0}' -f $scanReportPath) -ForegroundColor Gray
Write-Host ('扫描数据：{0}' -f $scanJsonPath) -ForegroundColor Gray
Write-Host ('性能诊断：{0}' -f $perfReportPath) -ForegroundColor Gray

# ========== 阶段 2：预览确认 ==========

if ($ScanOnly) {
    Write-Section 'ScanOnly 模式：仅扫描完成，未执行删除'
    Write-Host '如需执行清理，去掉 -ScanOnly 参数重新运行' -ForegroundColor Yellow
    exit 0
}

Write-Section '阶段 2：预览确认'
Write-Host '将删除以下可清理项（均为可重建缓存）：' -ForegroundColor Yellow
$results | Where-Object { $_.Size -gt 0 } |
    Format-Table Index, Name, SizeText -AutoSize | Out-String | Write-Host
Write-Host ('总可释放：{0}' -f (Format-Size $totalCleanable)) -ForegroundColor Green
Write-Host ('清理后预计可用：{0}' -f (Format-Size ([long]$cDrive.FreeSpace + $totalCleanable))) -ForegroundColor Green
Write-Host ''
Write-Host '[!] 浏览器缓存项请先关闭 Edge/Chrome/Firefox，否则部分文件被占用会跳过' -ForegroundColor Yellow
$warnItems = $results | Where-Object { $_.Warn -and $_.Size -gt 0 }
if ($warnItems) {
    Write-Host '[!] Prefetch 清理后首次启动应用会略慢（正常现象）' -ForegroundColor Yellow
}
Write-Host ''
Write-Host '选项：Y 全部执行 / S 选择编号（如 1,3,5）/ N 取消' -ForegroundColor Cyan
$choice = Read-Host '请输入'

$toClean = @()
if ($choice -eq 'Y' -or $choice -eq 'y') {
    $toClean = $results | Where-Object { $_.Size -gt 0 }
} elseif ($choice -eq 'S' -or $choice -eq 's') {
    $nums = Read-Host '输入要执行的编号（逗号分隔）'
    $ids = $nums.Split(',') | ForEach-Object { [int]($_.Trim()) } | Where-Object { $_ -gt 0 }
    $toClean = $results | Where-Object { $ids -contains $_.Index }
} else {
    Write-Host '已取消，未删除任何文件' -ForegroundColor Yellow
    exit 0
}

if (-not $toClean -or ($toClean | Measure-Object).Count -eq 0) {
    Write-Host '未选择任何项，退出' -ForegroundColor Yellow
    exit 0
}

# ========== 阶段 3：执行删除 ==========

Write-Section '阶段 3：执行删除'

$needWU = $toClean | Where-Object { $_.Name -like '*Windows Update*' }
if ($needWU) {
    Write-Host '停止 Windows Update 服务 (wuauserv)...' -ForegroundColor Gray
    Stop-Service -Name wuauserv -Force -ErrorAction SilentlyContinue
}

$execLines = @()
$execLines += '执行报告'
$execLines += ('时间：{0}' -f (Get-Date))
$execLines += ('=' * 60)

foreach ($item in $toClean) {
    Write-Host ''
    Write-Host ('清理：{0} （预计 {1}）' -f $item.Name, $item.SizeText) -ForegroundColor Cyan
    $before = [long]$item.Size

    Invoke-CleanItem -Item $item

    # 重算实际释放
    $after = [long]0
    if ($item.Kind -eq 'Recycle') {
        $after = [long]0  # 回收站清空后为 0
    } elseif ($item.Kind -eq 'DO') {
        try {
            $do = Get-DeliveryOptimizationCache -ErrorAction SilentlyContinue
            if ($do) { $after = [long](($do | Measure-Object -Property FileSize -Sum).Sum) }
        } catch {}
    } else {
        foreach ($p in $item.Paths) { $after += Get-PathSize -Path $p }
    }
    $actual = $before - $after
    if ($actual -lt 0) { $actual = [long]0 }

    if ($before -eq 0) {
        $status = '无内容'; $color = 'Gray'
    } elseif ($actual -ge $before * 0.9) {
        $status = '完成'; $color = 'Green'
    } elseif ($actual -gt 0) {
        $status = '部分'; $color = 'Yellow'
    } else {
        $status = '跳过'; $color = 'Red'
    }
    Write-Host ('  结果：{0} - 实际释放 {1}' -f $status, (Format-Size $actual)) -ForegroundColor $color
    $execLines += ('[{0}] {1} | 预计 {2} | 实际 {3}' -f $status, $item.Name, $item.SizeText, (Format-Size $actual))
}

if ($needWU) {
    Write-Host ''
    Write-Host '重启 Windows Update 服务...' -ForegroundColor Gray
    Start-Service -Name wuauserv -ErrorAction SilentlyContinue
}

# 最终对比
$cDriveAfter = Get-CimInstance Win32_LogicalDisk -Filter "DeviceID='C:'"
$freedActual = [long]$cDriveAfter.FreeSpace - [long]$cDrive.FreeSpace

Write-Section '清理完成'
Write-Host ('清理前可用：{0}' -f (Format-Size [long]$cDrive.FreeSpace)) -ForegroundColor Gray
Write-Host ('清理后可用：{0}' -f (Format-Size [long]$cDriveAfter.FreeSpace)) -ForegroundColor Gray
if ($freedActual -ge 0) {
    Write-Host ('实际释放：{0}' -f (Format-Size $freedActual)) -ForegroundColor Green
} else {
    Write-Host ('实际释放：{0}（清理后有程序写入新文件）' -f (Format-Size $freedActual)) -ForegroundColor Yellow
}

$execLines += ''
$execLines += ('=' * 60)
$execLines += ('清理前可用：{0}' -f (Format-Size [long]$cDrive.FreeSpace))
$execLines += ('清理后可用：{0}' -f (Format-Size [long]$cDriveAfter.FreeSpace))
$execLines += ('实际释放：{0}' -f (Format-Size $freedActual))
$execLines | Out-File -FilePath $execReportPath -Encoding UTF8

Write-Host ''
Write-Host ('执行报告：{0}' -f $execReportPath) -ForegroundColor Gray
Write-Host ''
Write-Host '完成。' -ForegroundColor Green
