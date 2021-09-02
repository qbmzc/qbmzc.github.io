---
title: mysql数据导入以及去重
date: 2020-05-13
tags: 
  - mysql
categories:
  - work
---

![wallhaven-q6k8jq](https://gitee.com/snowyan/image/raw/master/1589358032_20200513162024863_1345674842.png)

## 需求分析

将一个数据库中的表字段值导入到另外一个数据库的表中

## sql

```sql
INSERT INTO schemas.table_target (name)
SELECT name
FROM schemas.table_source
GROUP BY name;
```

## 获取需要导入的表

[MySQL中 如何查询表名中包含某字段的表](https://www.cnblogs.com/acm-bingzi/p/mysql-information-schema.html)

```sql
select TABLE_SCHEMA,TABLE_NAME 
from information_schema.TABLES 
where TABLE_NAME like '%_single'; --表名称中以_single结尾的
```

## 去重

```sql
DELETE FROM schemas.table_target
WHERE id NOT IN (
		SELECT t.min_id
		FROM (
			SELECT MIN(id) AS min_id
			FROM schemas.table_target
			GROUP BY name
		) t
	);
```

## 验证

```sql
SELECT name, COUNT(1) AS c
FROM schemas.table_target
GROUP BY name
HAVING c > 1;-- 验证是否还有重复数
```

## 使用python处理sql文件

```python
# 查询出的需要被导入的数据库表
file = '/data/Keeep/report.txt'
# sql文件
sql_f = '/data/Keeep/sql_f.sql'
# 执行语句
base_sql = 'insert into schemas.table_target (name) select name from table_resouce group by name;'

fo = open(sql_f, 'w')
foo = open(file)

lines = foo .readlines()
for line in lines:
    sql = base_sql.replace('table_resouce', line)
    fo.write(sql)

foo.close()
fo.close()
```
