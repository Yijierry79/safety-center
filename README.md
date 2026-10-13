# Cybersecurity Center · EN

## 文件结构

首页入口是 index.html。另外三个 HTML 是详情页，首页卡片会跳转到它们，请一并上传，不要删除。

```text
index.html
vulnerability-reporting.html
security-advisory.html
security-resources.html
assets/
  css/
  js/
  img/
  figma/
  fonts/
README.md
.nojekyll
```

assets 包含网页需要的全部本地样式、脚本、图片和字体。没有安装或构建步骤。运行数据在 assets/js/security-content.js，无需另建 JSON 文件。来源记录 JSON 和旧 ZIP 已从部署目录移出，整理前完整备份保留在开发项目。

本地可以直接双击 index.html 浏览四页。assets/js/local-preview.js 只在本地文件打开时启用，使用原字体和图形的相同字节避免浏览器限制；在线访问不加载此兼容文件。

## 上传并启用 GitHub Pages

1. 新建或使用一个 GitHub 仓库。
2. 上传这个 EN 文件夹**里面的全部内容**到仓库根目录，让 index.html 直接位于根目录。不要只上传 ZIP，也不要把 EN 再嵌套成仓库内的顶层文件夹。
3. 打开仓库 Settings → Pages，在 Source 选择 Deploy from a branch，选择保存文件的分支（通常是 main）和 /(root)，点击 Save。
4. 等 Pages 发布完成后，点击 Visit site。网站地址的首页会加载 index.html；不是在 GitHub 仓库代码列表中点击 HTML 文件。

如果使用 /docs 发布，把同样的全部内容放入 docs，并在 Pages 选择 /docs。以 GitHub 页面实际提示为准。

官方说明：
- https://docs.github.com/en/pages/getting-started-with-github-pages/creating-a-github-pages-site
- https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site

## 导航和内容

首页三个卡片可访问公告、漏洞报告和资源页；各页的 Logo/Home 可返回此首页。其他全站菜单与页脚政策链接访问锐明官网。详情页可以直接打开或刷新，适用于 GitHub 仓库子路径，无需配置服务器路由。

当前是 PC 页面演示。订阅、公告、白皮书、Posts、模板和正式证书仍保留此前确认的占位/演示范围；订阅不发送或保存邮箱。页面显示正常不代表已经接入正式业务服务。

替换正式公告和证书：编辑 assets/js/security-content.js，证书填写 title、image、alt；image 使用相对本站根目录的 assets/... 路径，并把素材一并上传。白皮书/Posts 的占位和模板入口位于对应 HTML。

本文件只提供发布准备与操作说明，本次没有代为上传、推送或部署到 GitHub。
