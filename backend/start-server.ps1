# Start Backend Server for Node.js v22 Compatibility
Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "  Starting My Legal Advisor Backend Server" -ForegroundColor Cyan
Write-Host "  Node.js v22 Compatibility Mode" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

Write-Host "⚠️  WARNING: Using insecure TLS mode for Node.js v22" -ForegroundColor Yellow
Write-Host "   For production, please use Node.js v20 LTS`n" -ForegroundColor Yellow

$env:NODE_TLS_REJECT_UNAUTHORIZED = "0"
$env:NODE_OPTIONS = "--no-warnings"

cd $PSScriptRoot
npm run dev
