---
title: Arch Linux 清理包
date: 2020-04-26
tags:
  - Arch Linux
categories:
  - Linux
---

## 删除孤立软件包

(注意可能会清理一些还在使用的包，例如`yarn`)

```bash
sudo pacman -Rns $(pacman -Qdtq)
```

如果没有孤立软件包，将显示错误 error: no targets specified. 这个是正常的，因为 pacman -Rns 没有收到任何参数.

## 清除已下载的安装包

```bash
sudo pacman -Scc
```

[pacman (简体中文) - ArchWiki](https://wiki.archlinux.org/index.php/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E5%88%A0%E9%99%A4%E8%BD%AF%E4%BB%B6%E5%8C%85)

[删除孤立软件包](https://wiki.archlinux.org/index.php/Pacman_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)/Tips_and_tricks_(%E7%AE%80%E4%BD%93%E4%B8%AD%E6%96%87)#%E5%88%A0%E9%99%A4%E5%AD%A4%E7%AB%8B%E8%BD%AF%E4%BB%B6%E5%8C%85)