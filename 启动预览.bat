@echo off
chcp 65001 >nul
title 武当太极导览 - 本地预览
echo.
echo   武当太极导览 - 本地预览服务器
echo   ================================
echo.
echo   正在启动...
echo.

cd /d "%~dp0"

:: 尝试用 Python 启动
python --version >nul 2>&1
if %errorlevel% equ 0 (
    echo   服务器已启动，请在浏览器中访问：
    echo.
    echo     http://localhost:8080
    echo.
    echo   按 Ctrl+C 停止服务器
    echo.
    start http://localhost:8080
    python -m http.server 8080
    goto :end
)

:: 尝试用 Node.js 启动
npx --version >nul 2>&1
if %errorlevel% equ 0 (
    echo   服务器已启动，请在浏览器中访问：
    echo.
    echo     http://localhost:8080
    echo.
    echo   按 Ctrl+C 停止服务器
    echo.
    start http://localhost:8080
    npx serve -l 8080
    goto :end
)

:: 都没有则提示
echo   未检测到 Python 或 Node.js，请先安装其中一个：
echo.
echo   Python:  https://www.python.org/downloads/
echo   Node.js: https://nodejs.org/
echo.
pause

:end
