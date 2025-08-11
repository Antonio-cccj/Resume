#!/bin/bash

echo "========================================"
echo "   Jun Chu Resume Website Deployment"
echo "========================================"
echo

echo "[1/5] Initializing Git repository..."
git init
echo

echo "[2/5] Adding all files..."
git add .
echo

echo "[3/5] Creating initial commit..."
git commit -m "Deploy Jun Chu Resume Website - Professional Quantitative Trader Portfolio"
echo

echo "[4/5] Setting up remote repository..."
echo "Please enter your GitHub repository URL (e.g., https://github.com/username/resume.git):"
read -p "Repository URL: " repo_url
git remote add origin $repo_url
echo

echo "[5/5] Pushing to GitHub..."
git branch -M main
git push -u origin main
echo

echo "========================================"
echo "    Deployment Complete!"
echo "========================================"
echo
echo "Next steps:"
echo "1. Go to your GitHub repository"
echo "2. Navigate to Settings > Pages"
echo "3. Select 'Deploy from a branch'"
echo "4. Choose 'main' branch and '/ (root)' folder"
echo "5. Save settings"
echo
echo "Your website will be available at:"
echo "https://username.github.io/repository-name/"
echo
echo "For custom domain setup, see deploy-guide.md"
echo
