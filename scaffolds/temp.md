---
title: 生成自签名证书
date: 2023-07-14
tags:
  -  openssl
categories:
  -  Linux
toc: true
---

生成自签名证书

<!-- more -->



## 创建服务器私钥

```bash
openssl genrsa -out test.key 2048
```

## 创建证书签名请求（CSR）

```bash
openssl req -new -key test.key -out test.csr
# 会要求填写一些证书相关信息
```

## 使用私钥和CSR对证书进行签名

```bash
openssl x509 -req -days 365 -in test.csr -signkey test.key -out test.crt
```

现在，您已生成有效期为365天的SSL证书