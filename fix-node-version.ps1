# Node.js Version Fix Script for Windows
# This script helps you downgrade from Node.js v22 to v20 LTS

Write-Host "`n============================================" -ForegroundColor Cyan
Write-Host "  Node.js Version Fix for My Legal Advisor" -ForegroundColor Cyan
Write-Host "============================================`n" -ForegroundColor Cyan

# Check current Node.js version
$currentVersion = node --version
Write-Host "Current Node.js Version: $currentVersion" -ForegroundColor Yellow

if ($currentVersion -like "v22.*") {
    Write-Host "`n❌ WARNING: Node.js v22 has SSL compatibility issues with MongoDB!" -ForegroundColor Red
    Write-Host "   You need to downgrade to Node.js v20 LTS`n" -ForegroundColor Red
    
    Write-Host "OPTIONS TO FIX:" -ForegroundColor Green
    Write-Host "`n1. Using NVM (Node Version Manager) - RECOMMENDED" -ForegroundColor Cyan
    Write-Host "   Download: https://github.com/coreybutler/nvm-windows/releases" -ForegroundColor Gray
    Write-Host "   Then run:" -ForegroundColor Gray
    Write-Host "     nvm install 20.11.0" -ForegroundColor White
    Write-Host "     nvm use 20.11.0" -ForegroundColor White
    
    Write-Host "`n2. Manual Installation" -ForegroundColor Cyan
    Write-Host "   1. Uninstall Node.js v22 from Windows Settings" -ForegroundColor Gray
    Write-Host "   2. Download Node.js v20 LTS from: https://nodejs.org/" -ForegroundColor Gray
    Write-Host "   3. Install and restart your terminal" -ForegroundColor Gray
    
    Write-Host "`n3. Temporary Fix (Not Recommended)" -ForegroundColor Cyan
    Write-Host "   Add to your MongoDB connection string:" -ForegroundColor Gray
    Write-Host "   &tlsInsecure=true" -ForegroundColor White
    
    $response = Read-Host "`nDo you have NVM installed? (y/n)"
    
    if ($response -eq "y" -or $response -eq "Y") {
        Write-Host "`nAttempting to switch to Node.js v20..." -ForegroundColor Yellow
        nvm install 20.11.0
        nvm use 20.11.0
        Write-Host "`n✅ Please close and reopen your terminal for changes to take effect!" -ForegroundColor Green
    } else {
        Write-Host "`nPlease install NVM or manually download Node.js v20 LTS" -ForegroundColor Yellow
        Write-Host "NVM Download: https://github.com/coreybutler/nvm-windows/releases" -ForegroundColor Cyan
        Write-Host "Node.js Download: https://nodejs.org/" -ForegroundColor Cyan
        Start-Process "https://nodejs.org/"
    }
} elseif ($currentVersion -like "v20.*") {
    Write-Host "`n✅ Good! You're using Node.js v20 LTS" -ForegroundColor Green
    Write-Host "   Your MongoDB connection should work fine!`n" -ForegroundColor Green
} else {
    Write-Host "`n⚠️  You're using Node.js $currentVersion" -ForegroundColor Yellow
    Write-Host "   Recommended: Node.js v20 LTS for best compatibility`n" -ForegroundColor Yellow
}

Write-Host "`n============================================`n" -ForegroundColor Cyan

Read-Host "Press Enter to exit"
