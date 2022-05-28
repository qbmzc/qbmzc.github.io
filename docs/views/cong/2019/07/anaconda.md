---
title: Anaconda
date: 2019-07-19
tags:
 - anaconda
 - python
categories:
 - work
prev: 312125.md
next: build_blog.md

---
![a](https://fastly.jsdelivr.net/gh/qbmzc/images/2021/202111231105094.png)

<!-- more -->

## 安装

[Anaconda网址](https://www.anaconda.com/)

[下载地址](https://www.anaconda.com/distribution/)

## 清华开源镜像

[清华开源镜像地址](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/)

选择对应的版本，以下是`Linux`系统环境安装

```bash
bash Anaconda3-2019.03-Linux-x86_64.sh
```

验证

```bash
conda --version
```

输出

```bash
conda 4.7.5
```

如果没有，需要配置环境变量，在终端输入`sudo vim /etc/profile`，打开`profile`文件。添加语句`export PATH=/home/congco/anaconda3/bin:$PATH`(注意：这里是自己本机的安装路径)，保存，退出。 
重启终端，再次验证。
這裏會引起一個問題，就是如果是gnome桌面環境的話，會導致gnome-tweaks 啓動失敗，參考博客[https://www.jianshu.com/p/c23aa0cf90df](https://www.jianshu.com/p/c23aa0cf90df)解決方案就是刪除上面的環境變量，使用`conda init`，如果使用安裝過程中的初始化，則沒有這個問題
使用`conda init`初始化環境變量信息

```bash
# >>> conda initialize >>>
# !! Contents within this block are managed by 'conda init' !!
__conda_setup="$('/home/congco/anaconda3/bin/conda' 'shell.bash' 'hook' 2> /dev/null)"
if [ $? -eq 0 ]; then
    eval "$__conda_setup"
else
    if [ -f "/home/congco/anaconda3/etc/profile.d/conda.sh" ]; then
        . "/home/congco/anaconda3/etc/profile.d/conda.sh"
    else
        export PATH="/home/congco/anaconda3/bin:$PATH"
    fi
fi
unset __conda_setup
# <<< conda initialize <<<
```

这样的话，启动终端，每次都会默认激活base环境，建议还是在自己的终端中添加对应的环境变量，而不是在系统中全局添加。`bash`在`~/.bashrc`,`zsh`在`~/.zshrc`中。

## 卸载

由于Anaconda在Linux下是安装在一个文件夹里/root/anaconda ,如果安装过程中出错问题，或者想更新另一个版本，删除anaconda也很方便，执行下面命令 

```bash
sudo rm -rf ~/anaconda 
```

[镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/)

> 内容来自清华大学开源镜像站----start----

## [Anaconda 镜像使用帮助](https://mirrors.tuna.tsinghua.edu.cn/help/anaconda/)

Anaconda 是一个用于科学计算的 Python 发行版，支持 Linux, Mac, Windows, 包含了众多流行的科学计算、数据分析的 Python 包。

Anaconda 安装包可以到 [https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/](https://mirrors.tuna.tsinghua.edu.cn/anaconda/archive/) 下载。

TUNA 还提供了 Anaconda 仓库的镜像，运行以下命令:

```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/free/

conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/pkgs/main/

conda config --set show_channel_urls yes
```

即可添加 Anaconda Python 免费仓库。

运行 `conda install numpy` 测试一下吧。

## Miniconda 镜像使用帮助

Miniconda 是一个 Anaconda 的轻量级替代，默认只包含了 python 和 conda，但是可以通过 pip 和 conda 来安装所需要的包。

Miniconda 安装包可以到 [https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/](https://mirrors.tuna.tsinghua.edu.cn/anaconda/miniconda/) 下载。

## Conda 三方源

当前tuna还维护了一些anaconda三方源。

### Conda Forge

```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/conda-forge/
```

### msys2

```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/msys2/
```

### bioconda

```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/bioconda/
```

### menpo

```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/menpo/
```

### pytorch

```bash
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/pytorch/

# for legacy win-64
conda config --add channels https://mirrors.tuna.tsinghua.edu.cn/anaconda/cloud/peterjc123/

```

### 其他三方源

对于conda的其他三方源，如有需要请在[这个issue](https://github.com/tuna/issues/issues/112)中提出请求，我们会综合考虑多方因素来酌情增减。

> ---------------end--------------------
