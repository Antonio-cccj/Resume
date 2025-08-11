@echo off
echo ========================================
echo    Resume Website - GitHub Sync
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

echo [1/5] Pulling latest changes from GitHub...
git pull origin main --no-edit
if %errorlevel% neq 0 (
    echo Warning: Pull failed. This might be due to conflicts.
    echo Choose an option:
    echo [1] Try to resolve automatically
    echo [2] Force push your changes (overwrites remote)
    echo [3] Cancel and resolve manually
    set /p choice="Enter choice (1-3): "
    
    if "%choice%"=="1" (
        echo Attempting automatic resolution...
        git pull origin main --strategy=recursive -X ours
    ) else if "%choice%"=="2" (
        goto :force_push
    ) else (
        echo Please resolve conflicts manually and run this script again.
        pause
        exit /b 1
    )
)

echo [2/5] Checking for changes...
git status --porcelain > nul 2>&1
if %errorlevel% equ 0 (
    for /f %%i in ('git status --porcelain') do goto :has_changes
    echo No changes detected.
    goto :end
)

:has_changes
echo [3/5] Adding all changes...
git add .

echo [4/5] Creating commit...
echo Enter commit message (or press Enter for default):
set /p commit_msg="Commit message: "
if "%commit_msg%"=="" (
    set "commit_msg=Update resume website - %timestamp%"
)
git commit -m "%commit_msg%"

echo [5/5] Pushing to GitHub...
git push origin main
goto :check_result

:force_push
echo [3/5] Adding all changes...
git add .
echo [4/5] Creating commit...
git commit -m "Force update: Resume website - %timestamp%"
echo [5/5] Force pushing to GitHub...
git push origin main --force

:check_result
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    Sync Complete Successfully!
    echo ========================================
    echo.
    echo Your resume website has been updated!
    echo GitHub Pages will refresh in 2-5 minutes.
    echo.
    echo Website URLs:
    echo - GitHub Pages: https://antonio-ccj.github.io/Resume/
    echo - Custom Domain: https://junchuresume.com (if DNS configured)
    echo.
) else (
    echo.
    echo ========================================
    echo    Sync Failed!
    echo ========================================
    echo.
    echo Possible solutions:
    echo 1. Check your internet connection
    echo 2. Verify GitHub credentials
    echo 3. Try running deploy.bat to reset the repository
    echo.
)

:end
pause
