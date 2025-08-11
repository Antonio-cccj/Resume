@echo off
:: Quick Sync - One-click synchronization
echo Syncing to GitHub...
git add .
git commit -m "Quick update - %date% %time%"
git push origin main
if %errorlevel% equ 0 (
    echo ✓ Sync completed successfully!
    echo Your website will update in 2-5 minutes.
) else (
    echo ✗ Sync failed. Please check your connection.
)
timeout /t 3 >nul
