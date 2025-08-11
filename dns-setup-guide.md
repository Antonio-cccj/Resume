# DNS配置指南 - 解决GitHub Pages自定义域名问题

## 🚨 当前问题
GitHub Pages显示DNS配置错误，需要正确设置域名的DNS记录。

## ✅ 解决步骤

### 1. 登录域名管理面板
- 如果域名在Namecheap：登录 namecheap.com → Account → Domain List
- 如果域名在GoDaddy：登录 godaddy.com → My Products → Domains
- 如果域名在Cloudflare：登录 cloudflare.com → DNS

### 2. 添加GitHub Pages的A记录

删除现有的A记录，添加以下4条A记录：

```
记录类型: A
主机/名称: @ (或留空)
值/IP地址: 185.199.108.153
TTL: 自动或3600

记录类型: A
主机/名称: @ (或留空)
值/IP地址: 185.199.109.153
TTL: 自动或3600

记录类型: A
主机/名称: @ (或留空)
值/IP地址: 185.199.110.153
TTL: 自动或3600

记录类型: A
主机/名称: @ (或留空)
值/IP地址: 185.199.111.153
TTL: 自动或3600
```

### 3. 添加CNAME记录（可选）

```
记录类型: CNAME
主机/名称: www
值/目标: antonio-ccj.github.io
TTL: 自动或3600
```

### 4. 删除冲突记录
确保删除以下可能冲突的记录：
- 其他指向不同IP的A记录
- 指向域名停放页的记录
- 默认的域名转发设置

## 🔍 验证DNS配置

### 在线工具检查：
1. 访问 [whatsmydns.net](https://whatsmydns.net)
2. 输入 `junchuresume.com`
3. 选择 "A" 记录类型
4. 查看全球DNS传播状态

### 命令行检查：
```bash
# Windows
nslookup junchuresume.com

# Mac/Linux
dig junchuresume.com
```

## ⏰ 等待时间
- DNS传播通常需要：**15分钟 - 24小时**
- 大部分情况下：**1-4小时**内生效

## 🔧 常见域名提供商设置示例

### Namecheap设置：
1. 进入Domain List → Manage
2. 点击Advanced DNS标签
3. 删除现有记录
4. 添加上述A记录和CNAME记录

### GoDaddy设置：
1. 进入DNS管理
2. 编辑A记录（@）
3. 删除默认记录，添加GitHub的4个IP
4. 添加CNAME记录（www）

### Cloudflare设置：
1. 进入DNS管理
2. 添加A记录，关闭橙色云朵（设为DNS only）
3. 添加CNAME记录

## 📋 设置完成后的检查清单

- [ ] 已添加4个GitHub Pages A记录
- [ ] 已添加www CNAME记录（可选）
- [ ] 已删除冲突的DNS记录
- [ ] DNS检查工具显示正确IP
- [ ] 等待24小时内生效

## 🚨 如果仍然有问题

1. **重新检查DNS记录**：确保IP地址完全正确
2. **联系域名提供商**：询问DNS传播状态
3. **暂时移除自定义域名**：在GitHub Pages设置中先删除域名，等DNS生效后再添加

## 📞 技术支持
- Namecheap: 24/7在线客服
- GoDaddy: 电话和在线支持
- Cloudflare: 社区论坛和帮助文档

---

**重要提醒：** 
- DNS传播需要时间，请耐心等待
- 设置正确后，您的网站将在 `https://junchuresume.com` 可用
- GitHub会自动为自定义域名提供SSL证书
