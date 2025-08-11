# 自动同步设置指南

## 🚀 快速同步方案

### 方案一：手动运行同步脚本（推荐）

**使用方法：**
1. 修改任何文件后
2. 双击运行 `sync-to-github.bat`（Windows）或 `sync-to-github.sh`（Mac/Linux）
3. 按提示输入提交信息（或使用默认）
4. 自动推送到GitHub

**优点：**
- ✅ 简单易用
- ✅ 可控制提交时机
- ✅ 可以添加有意义的提交信息

### 方案二：VS Code自动同步扩展

**安装扩展：**
1. 打开VS Code
2. 安装 "GitLens" 扩展
3. 安装 "Auto Commit" 扩展

**配置步骤：**
1. 打开VS Code设置
2. 搜索 "auto commit"
3. 启用自动提交功能

### 方案三：文件监控自动同步（高级）

需要安装 Git Bash 或 PowerShell 支持。

## 📋 初始设置（首次使用）

### 1. 确保Git仓库已初始化
```bash
# 在WEB CV文件夹中运行
git status
```

如果显示 "not a git repository"，请先运行：
- Windows: `deploy.bat`
- Mac/Linux: `./deploy.sh`

### 2. 配置Git用户信息（首次使用）
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### 3. 设置GitHub认证

**方法A: GitHub CLI（推荐）**
1. 下载安装 [GitHub CLI](https://cli.github.com/)
2. 运行：`gh auth login`
3. 按提示完成认证

**方法B: Personal Access Token**
1. GitHub → Settings → Developer settings → Personal access tokens
2. 创建新token，勾选 `repo` 权限
3. 首次推送时输入用户名和token

## 🔄 日常同步工作流程

### 标准流程：
1. **编辑文件** - 修改简历内容、样式等
2. **运行同步脚本** - 双击 `sync-to-github.bat`
3. **输入提交信息** - 描述这次修改了什么
4. **等待完成** - 脚本自动处理Git操作
5. **访问网站** - 几分钟后在线查看更新

### 快速流程：
1. **编辑文件**
2. **双击同步脚本**
3. **直接回车** - 使用默认提交信息
4. **完成**

## 🎯 同步脚本功能

### 自动检测变化
- ✅ 自动检测文件修改
- ✅ 只在有变化时才同步
- ✅ 显示详细的操作状态

### 智能提交信息
- ✅ 自定义提交信息
- ✅ 默认时间戳信息
- ✅ 清晰的操作历史

### 错误处理
- ✅ 网络连接检查
- ✅ Git仓库状态验证
- ✅ 友好的错误提示

## 📁 文件结构管理

### 推荐的工作目录结构：
```
WEB CV/
├── index.html          # 主页面
├── styles.css          # 样式文件
├── script.js           # 交互脚本
├── README.md           # 项目说明
├── sync-to-github.bat  # Windows同步脚本
├── sync-to-github.sh   # Linux/Mac同步脚本
├── deploy.bat          # 初始部署脚本
└── .git/               # Git仓库（自动生成）
```

### 同步包含的文件：
- ✅ 所有HTML、CSS、JS文件
- ✅ 图片和资源文件
- ✅ 配置文件（robots.txt、sitemap.xml等）
- ❌ .gitignore中列出的文件

## 🔧 故障排除

### 常见问题：

**1. "not a git repository" 错误**
```bash
# 解决方法：初始化仓库
git init
git remote add origin YOUR_REPO_URL
```

**2. 认证失败**
```bash
# 解决方法：重新配置认证
gh auth login
# 或者使用Personal Access Token
```

**3. 推送被拒绝**
```bash
# 解决方法：先拉取最新版本
git pull origin main
# 然后重新运行同步脚本
```

**4. 合并冲突**
```bash
# 解决方法：手动解决冲突
git status              # 查看冲突文件
# 编辑冲突文件，删除冲突标记
git add .
git commit -m "Resolve conflicts"
git push origin main
```

## 🚀 高级技巧

### 1. 批量提交不同类型的修改
```bash
# 只提交CSS修改
git add styles.css
git commit -m "Update: Enhanced visual design"

# 只提交内容修改
git add index.html
git commit -m "Content: Updated work experience"
```

### 2. 查看同步历史
```bash
git log --oneline       # 查看提交历史
git status             # 查看当前状态
```

### 3. 撤销最后一次提交
```bash
git reset --soft HEAD~1  # 撤销提交但保留修改
git reset --hard HEAD~1  # 完全撤销（谨慎使用）
```

## 📊 同步监控

### 验证同步成功：
1. **GitHub仓库** - 检查最新提交时间
2. **GitHub Pages** - 查看Actions页面构建状态
3. **在线网站** - 几分钟后访问确认更新

### 同步频率建议：
- 🟢 **日常修改**: 每次修改后立即同步
- 🟡 **实验性修改**: 测试完成后再同步
- 🔴 **重大更新**: 分步骤多次提交

---

**小提示：** 
- 同步脚本会自动检测是否有变化，无变化时不会执行操作
- 建议每次修改后都运行同步，保持在线版本最新
- GitHub Pages通常在推送后2-5分钟内更新
