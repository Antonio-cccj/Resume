@echo off
echo ========================================
echo    Auto Sync to GitHub Repository
echo ========================================
echo.

:: Check if git repository exists
if not exist ".git" (
    echo Error: This is not a Git repository!
    echo Please run deploy.bat first to initialize the repository.
    pause
    exit /b 1
)

:: Get current timestamp
for /f "tokens=2 delims==" %%a in ('wmic OS Get localdatetime /value') do set "dt=%%a"
set "timestamp=%dt:~0,4%-%dt:~4,2%-%dt:~6,2% %dt:~8,2%:%dt:~10,2%:%dt:~12,2%"

echo [1/4] Checking for changes...
git status --porcelain > nul
if %errorlevel% neq 0 (
    echo No changes detected.
    goto :end
)

echo.
echo [2/4] Adding all changes...
git add .

echo.
echo [3/4] Creating commit...
echo Enter commit message (or press Enter for default):
set /p commit_msg="Commit message: "
if "%commit_msg%"=="" (
    set "commit_msg=Update resume website - %timestamp%"
)
git commit -m "%commit_msg%"

echo.
echo [4/4] Pushing to GitHub...
git push origin main

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    Sync Complete Successfully!
    echo ========================================
    echo.
    echo Your changes have been pushed to GitHub.
    echo GitHub Pages will update automatically.
    echo.
    echo Website URL: https://antonio-ccj.github.io/Resume/
    echo Custom Domain: https://junchuresume.com (if DNS configured)
    echo.
) else (
    echo.
    echo ========================================
    echo    Sync Failed!
    echo ========================================
    echo.
    echo Please check your internet connection and try again.
    echo If the problem persists, check your GitHub credentials.
    echo.
)

:end
pause
