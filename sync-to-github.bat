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

:: Get current timestamp (without wmic for better compatibility)
for /f "tokens=1-3 delims=/ " %%a in ('echo %date%') do set "today=%%c-%%a-%%b"
for /f "tokens=1-2 delims=: " %%a in ('echo %time%') do set "now=%%a:%%b"
set "timestamp=%today% %now%"

echo [1/4] Fetching latest changes from GitHub...
git fetch origin main > nul 2>&1

:: Check if we're behind remote
git rev-list HEAD..origin/main --count > temp_count.txt 2>nul
set /p behind=<temp_count.txt
del temp_count.txt

if "%behind%" GTR "0" (
    echo Remote has %behind% new commits. Merging changes...
    git merge origin/main --no-edit --strategy=recursive -X ours > nul 2>&1
    if %errorlevel% neq 0 (
        echo Merge failed. Attempting to stash and reapply...
        git stash
        git pull origin main --rebase
        git stash pop > nul 2>&1
    )
)

echo [2/4] Checking for local changes...
git status --porcelain > temp_status.txt 2>&1
set has_changes=0
for /f "tokens=*" %%i in (temp_status.txt) do set has_changes=1
del temp_status.txt

if %has_changes% equ 0 (
    echo No local changes detected.
    
    :: Check if we have unpushed commits
    git rev-list origin/main..HEAD --count > temp_ahead.txt 2>nul
    set /p ahead=<temp_ahead.txt
    del temp_ahead.txt
    
    if "%ahead%" GTR "0" (
        echo You have %ahead% unpushed commits. Pushing now...
        git push origin main
        if %errorlevel% equ 0 (
            echo Push successful!
        ) else (
            echo Push failed. Please check your connection.
        )
    ) else (
        echo Everything is up to date!
    )
    goto :end
)

echo [3/4] Committing changes...
git add -A
git commit -m "Update resume website - %timestamp%" > nul 2>&1

echo [4/4] Pushing to GitHub...
git push origin main 2>temp_error.txt

if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    Sync Complete Successfully!
    echo ========================================
    echo.
    echo Your changes have been pushed to GitHub.
    echo GitHub Pages will update in 2-5 minutes.
    echo.
    echo Website URLs:
    echo - GitHub Pages: https://antonio-ccj.github.io/Resume/
    echo - Custom Domain: https://junchuresume.com
    echo.
) else (
    :: Check if it's a non-fast-forward error
    findstr /C:"non-fast-forward" temp_error.txt > nul
    if %errorlevel% equ 0 (
        echo Push rejected: Remote has changes. Auto-resolving...
        git pull origin main --rebase
        git push origin main
        if %errorlevel% equ 0 (
            echo Successfully resolved and pushed!
        ) else (
            echo Auto-resolution failed. Manual intervention needed.
        )
    ) else (
        echo.
        echo ========================================
        echo    Sync Failed!
        echo ========================================
        echo.
        type temp_error.txt
        echo.
        echo Possible solutions:
        echo 1. Check your internet connection
        echo 2. Verify GitHub credentials
        echo 3. Run: git push origin main --force
        echo.
    )
)

if exist temp_error.txt del temp_error.txt

:end
echo.
echo Press any key to exit...
pause > nul