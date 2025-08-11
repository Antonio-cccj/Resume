#!/bin/bash

echo "========================================"
echo "   Auto Sync to GitHub Repository"
echo "========================================"
echo

# Check if git repository exists
if [ ! -d ".git" ]; then
    echo "Error: This is not a Git repository!"
    echo "Please run deploy.sh first to initialize the repository."
    exit 1
fi

# Get current timestamp
timestamp=$(date '+%Y-%m-%d %H:%M:%S')

echo "[1/4] Checking for changes..."
if [ -z "$(git status --porcelain)" ]; then
    echo "No changes detected."
    exit 0
fi

echo
echo "[2/4] Adding all changes..."
git add .

echo
echo "[3/4] Creating commit..."
echo "Enter commit message (or press Enter for default):"
read -p "Commit message: " commit_msg

if [ -z "$commit_msg" ]; then
    commit_msg="Update resume website - $timestamp"
fi

git commit -m "$commit_msg"

echo
echo "[4/4] Pushing to GitHub..."
git push origin main

if [ $? -eq 0 ]; then
    echo
    echo "========================================"
    echo "   Sync Complete Successfully!"
    echo "========================================"
    echo
    echo "Your changes have been pushed to GitHub."
    echo "GitHub Pages will update automatically."
    echo
    echo "Website URL: https://antonio-ccj.github.io/Resume/"
    echo "Custom Domain: https://junchuresume.com (if DNS configured)"
    echo
else
    echo
    echo "========================================"
    echo "   Sync Failed!"
    echo "========================================"
    echo
    echo "Please check your internet connection and try again."
    echo "If the problem persists, check your GitHub credentials."
    echo
fi
