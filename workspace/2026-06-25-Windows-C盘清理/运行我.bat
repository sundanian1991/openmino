@echo off
chcp 65001 >nul
title C 盘清理工具

:: ============================================
:: 管理员权限检查
:: ============================================
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo.
    echo   [*] 需要管理员权限，正在请求...
    powershell -Command "Start-Process -FilePath '%~f0' -Verb RunAs -Wait"
    exit /b
)

:: ============================================
:: 检查脚本文件是否存在
:: ============================================
if not exist "%~dp0Clean-CDrive.ps1" (
    echo.
    echo   [-] 找不到 Clean-CDrive.ps1
    echo   [-] 请确保 bat 和 ps1 放在同一个文件夹里
    echo.
    pause
    exit /b 1
)

:: ============================================
:: 启动 PowerShell 脚本
:: ============================================
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0Clean-CDrive.ps1"

pause
