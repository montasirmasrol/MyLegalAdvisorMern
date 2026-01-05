@echo off
echo ============================================
echo   Starting My Legal Advisor Backend Server
echo   Node.js v22 Compatibility Mode
echo ============================================
echo.
echo WARNING: Using insecure TLS mode for Node.js v22
echo For production, please use Node.js v20 LTS
echo.

set NODE_TLS_REJECT_UNAUTHORIZED=0
set NODE_OPTIONS=--no-warnings

cd /d "%~dp0"
npm run dev
