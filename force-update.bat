@echo off
echo ========================================
echo    Force Update to GitHub (Alternative)
echo ========================================
echo.
echo WARNING: This will overwrite any changes on GitHub
echo with your local changes. Use only if you're sure
echo your local version is the correct one.
echo.
echo Press any key to continue or Ctrl+C to cancel...
pause
echo.

echo [1/4] Adding all your changes...
git add .
echo.

echo [2/4] Creating commit...
git commit -m "Force update: Latest resume with refined skills - %date% %time%"
echo.

echo [3/4] Force pushing to GitHub...
git push origin main --force
echo.

echo [4/4] Verifying update...
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    Force Update Successful!
    echo ========================================
    echo.
    echo Your local changes have been pushed to GitHub.
    echo The website will update in 2-5 minutes.
    echo.
    echo Website URLs:
    echo - GitHub Pages: https://antonio-ccj.github.io/Resume/
    echo - Custom Domain: https://junchuresume.com
    echo.
) else (
    echo.
    echo ========================================
    echo    Force Update Failed!
    echo ========================================
    echo.
    echo Please check your internet connection and try again.
    echo.
)

pause
