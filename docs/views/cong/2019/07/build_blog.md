---
title: 使用VuePress搭建个人博客
date: 2019-07-22
tags:
 - daily
 - vuepress
categories:
 - wuw
prev: anaconda.md
next: jmm.md

---
![a](https://cdn.jsdelivr.net/gh/qbmzc/images/2021/202111231106767.png)

<!-- more -->

## 效果图

![1563803554554](https://raw.githubusercontent.com/qbmzc/images/master/mdimage/2019/1563803554554.png)

## 安装`yarn`

[yarn地址](https://yarn.bootcss.com/docs/install/#windows-stable)

![yarn](https://raw.githubusercontent.com/qbmzc/images/master/mdimage/2019/%E6%89%B9%E6%B3%A8%202019-07-22%20215621.png)

在使用 Yarn 之前，首先要在您的系统上安装 Yarn 。 以下列出了多种不同的安装方式，并且新的安装方式仍在继续添加：

操作系统:

### Arch Linux

On Arch Linux, Yarn can be installed through the official package manager.

```
pacman -S yarn
```

### Path Setup

如果未在 PATH 环境变量中找到 yarn，请按照以下步骤添加 yarn 到 PATH 环境变量中，使其可以随处运行。

注意：您的配置文件可能是 `.profile`、`.bash_profile`、`.bashrc`、`.zshrc` 等。

1. 将此项加入您的配置文件： `export PATH="$PATH:/opt/yarn-[version]/bin"` （路径可能根据您安装 Yarn 的位置而有差异）
2. 在终端中，执行登录并登出以使更改生效

为了可以全局访问 Yarn 的可执行文件，你需要在您的终端中设置 `PATH` 环境变量。若要执行此操作，请添加 `export PATH="$PATH:`yarn global bin`"` 到您的配置文件中。

通过如下命令测试 Yarn 是否安装成功：

```
yarn --version
```

如果是`Windows`系统，请选择对应的系统

### Windows

在 Windows 系统中有三种安装 Yarn 的方式。

#### 下载安装程序

你将下载到一个 `.msi` 文件，当它运行时会指引你将 Yarn 安装到 Windows 上。

如果你使用此安装程序，需要先安装 [Node.js](https://nodejs.org/)。

[下载安装程序](https://yarn.bootcss.com/latest.msi)

#### 通过 Chocolatey 安装

[Chocolatey](https://chocolatey.org/) 是一个 Windows 专用的软件包管理工具。 请按照此 [说明](https://chocolatey.org/install) 安装 Chocolatey 。

安装 Chocolatey 之后，你就可以在控制台执行如下命令安装 Yarn 了：

```
choco install yarn
```

这也会确保你安装了 [Node.js](https://nodejs.org/) 。

#### 通过 Scoop 安装

[Scoop](http://scoop.sh/) 是一个用于 Windows 的基于命令行的安装工具。 请按照此 [说明](https://github.com/lukesampson/scoop/wiki/Quick-Start) 安装 Scoop 。

Scoop 安装后，你就可以在控制台执行如下命令安装 Yarn 了：

```
scoop install yarn
```

如果 [Node.js](https://nodejs.org/) 未被安装，scoop 会提示你安装。 例如：

```
scoop install nodejs
```

#### 注意

请将您的项目目录和 Yarn 的缓存目录 (%LocalAppData%\Yarn) 列入杀毒软件的白名单中，否则会因为每次向磁盘写入文件时而被扫描，导致安装软件包变得很慢。

通过如下命令测试 Yarn 是否安装成功：

```
yarn --version
```

## VuePress

[VuePress中文网](http://caibaojian.com/vuepress/)

### 全局安装

如果你只是想随便用下 VuePress，你可以在全局安装它：

```bash
# 全局安装
npm install -g vuepress

# 创建一个 markdown 文件
echo '# Hello VuePress' > README.md

# 开始编写文档
vuepress dev

# 构建
vuepress build
```

### 在已有项目中安装

如果你想要在一个已有项目中维护文档，就应该将 `VuePress`安装为本地依赖。此设置还允许你使用 `CI `或 `Netlify `服务，在推送时自动部署。

```bash
# 安装为本地依赖项
npm install -D vuepress

# 创建一个 docs 目录
mkdir docs
# 创建一个 markdown 文件
echo '# Hello VuePress' > docs/README.md

# 开始编写文档
npx vuepress dev docs
```

或者，给 `package.json` 添加一些 scripts 脚本：

```json
{
  "scripts": {
    "docs:dev": "vuepress dev docs",
    "docs:build": "vuepress build docs"
  }
}
```

然后你就可以开始编写文档了：

```bash
npm run docs:dev
```

要生成静态资源，请运行：

```bash
npm run docs:build
```

默认情况下，构建的文件会位于 `.vuepress/dist` 中，该文件可以通过 `.vuepress/config.js` 中的 `dest` 字段进行配置。构建的文件可以部署到任何静态文件服务器。关于如何部署到一些常用服务，请参考 [部署指南](http://caibaojian.com/vuepress/guide/deploy.html)。

## 使用主题

`vuepress-theme-reco`

**# vuepress-theme-reco-cli**

Blog generation tool for vuepress-theme-reco 

**## Version**

|Version|VuePress|VuePress-theme-reco|

|-|:-:|:-:|

|0.x|0.x|0.x|

|1.x|1.x|1.x|

**## Experience**

```bash
# create

npx vuepress-theme-reco-cli init my-blog

# or

npm install  -g

reco-cli init my-blog

# install

cd my-blog

npm install

# run

npm run dev

# build

npm run build
```

***\*if yarn\****

```bash
# create

npx vuepress-theme-reco-cli init my-blog

#or

yarn global add vuepress-theme-reco-cli

reco-cli init my-blog

# install

cd my-blog

yarn install

# run

yarn dev

# build

yarn build
```

以上完成之后，你将会获得一个基础的博客网站，接下来是相关替换改造，选择一个`IDE`或者文本编辑器打开文件夹。

比如`VSCode`

文件结构目录如下：

![23g](https://raw.githubusercontent.com/qbmzc/images/master/mdimage/2019/批注 2019-07-22 221844.png)

修该配置文件，位于`.vuepress/config.js`,`.vuepress/public`文件夹为图片资源。

主题作者已经做了详细的注释在配置文件中，以下可以修改的部分

```js
module.exports = {
  title: "congco", // 对应左上角的标题
  description: '得道者多助，失道者寡助', //对应首页的标语
  dest: 'dist', //build命令打包地址，上面有论述，这里说明一下，作者默认为public，但是在.gitignore中忽略
    //了public，这就会导致git提交缺少图片资源文件。这里修该为dist,与当前文件目录一致。
  head: [
    ['link', { rel: 'icon', href: '/favicon.ico' }],// 网站图标，可以通过PS自己制定
    ['meta', { name: 'viewport', content: 'width=device-width,initial-scale=1,user-scalable=no' }]
  ],
  theme: 'reco',
  themeConfig: {
    nav: [
      { text: 'Home', link: '/', icon: 'reco-home' },
      { text: 'TimeLine', link: '/timeLine/', icon: 'reco-date' },
      { text: 'Contact', 
        icon: 'reco-message',
        items: [ //链接地址，根据自己情况修该，这里有些图标不存在，所以显示会有些问题
          { text: 'GitHub', link: 'https://github.com/qbmzc', icon: 'reco-github' }, 
          { text: '简书', link: 'https://www.jianshu.com/u/1fa980d5267b', icon: 'reco-jianshu' },
          { text: 'CSDN', link: 'https://me.csdn.net/qbmzc', icon: 'reco-csdn' },
          // { text: 'gitlab', link: 'https://gitlab.com/congco?nav_source=navbar', icon: 'reco-gitlab' },
          // { text: '语雀', link: 'https://www.yuque.com/congco', icon: 'reco-yuque' },
        ]
      }
    ],
    // 博客设置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: 'Category' // 默认 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: 'Tag' // 默认 “标签”
      }
    },
    logo: '/head.png',
    // 搜索设置
    search: true,
    searchMaxSuggestions: 10,
    // 自动形成侧边导航
    sidebar: 'auto',
    // 最后更新时间
    lastUpdated: 'Last Updated',
    // 作者
    author: 'congco',
    // 备案号
    record: 'xxxx',
    // 项目开始时间
    startYear: '2019'
    /**
     * 密钥 (if your blog is private)
     */

    // keyPage: {
    //   keys: ['your password'],
    //   color: '#42b983',
    //   lineColor: '#42b983'
    // },

    /**
     * valine 设置 (if you need valine comment )
     */

    // valineConfig: {
    //   appId: '...',// your appId
    //   appKey: '...', // your appKey
    // }
  },
  markdown: {
    lineNumbers: true
  },
  plugins: ['@vuepress/medium-zoom', 'flowchart']
}  
```

## 部署

> 首先需要创建一个使用用户名创建的仓库,例如：`https://foo.github.io`

## GitHub 页面

1. 将 `.vuepress/config.js` 中的 `base` 设置为你的仓库名称。例如，如果你的仓库是 `https://github.com/foo/bar` ，则已部署的页面将在 `https://foo.github.io/bar` 上可用。在这种情况下，你应该将`base`设置为 `"/bar/"` 。
2. 在你的项目中，运行：

```bash
# 构建
yarn build

# 导航到构建输出目录
cd dist

git init
git add -A
git commit -m 'deploy'

# 推到你仓库的的 master
# 将 <USERNAME>/<REPO> 替换为你的信息
git push -f git@github.com:<USERNAME>/<REPO>.git master
```

你可以在 CI 设置中运行此脚本以启用每次推送时的自动部署。

访问`<USERNAME>.github.io`即可看到效果。

