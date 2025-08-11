@echo off
echo ========================================
echo    Fixing Git Sync Issues
echo ========================================
echo.

echo [1/5] Checking current status...
git status
echo.

echo [2/5] Pulling latest changes from GitHub...
echo This will merge remote changes with your local changes.
git pull origin main --no-edit
echo.

if %errorlevel% neq 0 (
    echo [3/5] Handling merge conflicts (if any)...
    echo If there are conflicts, please resolve them manually and then run this script again.
    echo Or press any key to force push your changes (WARNING: This will overwrite remote changes)
    pause
    
    echo Forcing your local changes to remote...
    git push origin main --force
    goto :success
)

echo [3/5] Adding your latest changes...
git add .
echo.

echo [4/5] Committing your changes...
git commit -m "Update: Refined ML models and database skills for quantitative trading"
echo.

echo [5/5] Pushing to GitHub...
git push origin main

:success
if %errorlevel% equ 0 (
    echo.
    echo ========================================
    echo    Sync Completed Successfully!
    echo ========================================
    echo.
    echo Your resume website has been updated!
    echo Check your GitHub repository and website:
    echo - GitHub: https://github.com/Antonio-ccj/resume
    echo - Website: https://antonio-ccj.github.io/Resume/
    echo - Custom Domain: https://junchuresume.com (if DNS configured)
    echo.
) else (
    echo.
    echo ========================================
    echo    Sync Failed!
    echo ========================================
    echo.
    echo Please try the alternative solution below.
    echo.
)

pause
