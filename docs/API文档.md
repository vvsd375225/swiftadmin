# SwiftAdmin API 接口文档

> **基础路径**: `/admin`  
> **版本**: ThinkPHP 6.0  
> **数据格式**: JSON  
> **最后更新**: 2026-05-18

---

## 目录

1. [通用说明](#1-通用说明)
2. [Auth 认证](#2-auth-认证)
3. [Role 角色管理](#3-role-角色管理)
4. [Menu 菜单管理](#4-menu-菜单管理)
5. [Admin 管理员管理](#5-admin-管理员管理)
6. [User 用户管理](#6-user-用户管理)
7. [Config 系统配置](#7-config-系统配置)
8. [Attachment 附件管理](#8-attachment-附件管理)
9. [Recycle 回收站](#9-recycle-回收站)
10. [SecurityDataRecycle 安全回收站](#10-securitydatarecycle-安全回收站)
11. [SensitiveDataLog 敏感数据日志](#11-sensitivedatalog-敏感数据日志)
12. [DataRecycleRule 数据回收规则](#12-datarecyclerule-数据回收规则)
13. [SensitiveFieldRule 敏感字段规则](#13-sensitivefieldrule-敏感字段规则)
14. [Dashboard 仪表盘](#14-dashboard-仪表盘)
15. [DataScreen 数据大屏](#15-datascreen-数据大屏)
16. [Generator 代码生成器](#16-generator-代码生成器)
17. [AI 助手](#17-ai-助手)
18. [Terminal 终端命令](#18-terminal-终端命令)
19. [Module 模块管理](#19-module-模块管理)
20. [CMS Category 栏目管理](#20-cms-category-栏目管理)
21. [CMS Article 文章管理](#21-cms-article-文章管理)
22. [Notification 通知管理](#22-notification-通知管理)
23. [Cron 定时任务](#23-cron-定时任务)
24. [Tenant 租户管理](#24-tenant-租户管理)
25. [Payment 支付管理](#25-payment-支付管理)
26. [Monitor 系统监控](#26-monitor-系统监控)
27. [CRUD 生成器](#27-crud-生成器)
28. [AuthLog 操作日志](#28-authlog-操作日志)
29. [UserGroup 用户组管理](#29-usergroup-用户组管理)
30. [错误码](#30-错误码)

---

## 1. 通用说明

### 1.1 请求规范

| 项目 | 说明 |
|------|------|
| 基础路径 | `/admin` |
| 请求方式 | RESTful（GET / POST / PUT / DELETE） |
| 数据格式 | JSON |
| 编码 | UTF-8 |
| 鉴权方式 | Bearer Token（Header: `Authorization: Bearer <token>`），登录接口除外 |

### 1.2 请求参数位置

| 请求方法 | Content-Type | 参数位置 |
|---------|-------------|---------|
| GET | 无 | URL Query String（如 `?page=1&limit=15&keyword=admin`） |
| POST | `application/json` | JSON Body |
| PUT | `application/json` | JSON Body |
| DELETE | 无 | URL 路径参数（如 `/delete/3`） |

### 1.3 通用响应格式

**成功响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": { ... }
}
```

**分页列表响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "list": [ ... ],
    "total": 100,
    "page": 1,
    "limit": 15
  }
}
```

**错误响应:**
```json
{
  "code": 1,
  "msg": "错误描述信息",
  "data": []
}
```

### 1.4 通用 Query 参数（分页列表接口）

| 参数 | 类型 | 必填 | 默认值 | 说明 |
|-----|------|-----|-------|------|
| page | int | 否 | 1 | 当前页码 |
| limit | int | 否 | 15 | 每页条数（部分接口默认 10） |
| keyword | string | 否 | - | 模糊搜索关键词 |

> **注意**：Role、Menu、Config 等接口返回全量数据不分页，无 `total`、`page`、`limit` 字段。

---

## 2. Auth 认证

### POST `/auth/login` -- 登录

**无需 Token**

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| username | string | 是 | 管理员用户名 |
| password | string | 是 | 管理员密码（明文传输，后端 bcrypt 验证） |

**响应示例:**
```json
{
  "code": 0,
  "msg": "登录成功",
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "id": 1,
    "username": "admin",
    "nickname": "超级管理员",
    "avatar": "/uploads/avatar/1.png"
  }
}
```

**错误示例（用户名或密码错误）:**
```json
{
  "code": 1,
  "msg": "用户名或密码错误",
  "data": []
}
```

**错误示例（账号被禁用）:**
```json
{
  "code": 1,
  "msg": "账号已被禁用",
  "data": []
}
```

### GET `/auth/info` -- 获取当前用户信息

**需要 Token**

**响应示例:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "id": 1,
    "username": "admin",
    "nickname": "超级管理员",
    "email": "admin@example.com",
    "mobile": "13800000000",
    "avatar": "/uploads/avatar/1.png",
    "role_id": 1,
    "status": 1,
    "last_login_ip": "127.0.0.1",
    "last_login_time": 1715904000,
    "create_time": 1700000000
  }
}
```

> 注意：响应中 **不包含** `password` 字段。若 Token 对应的用户不存在，返回 `code: 1, msg: "用户不存在"`。

### GET `/auth/permissions` -- 获取用户权限

**需要 Token**

**响应示例:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "menus": [
      {
        "id": 1,
        "parent_id": 0,
        "title": "系统管理",
        "name": "system",
        "icon": "settings-outline",
        "path": "/system",
        "component": "Layout",
        "type": 1,
        "permission": "",
        "sort": 100,
        "status": 1,
        "children": [
          {
            "id": 2,
            "parent_id": 1,
            "title": "管理员管理",
            "name": "admin",
            "icon": "person-outline",
            "path": "admin",
            "component": "admin/index",
            "type": 2,
            "permission": "admin",
            "sort": 1,
            "status": 1
          }
        ]
      }
    ],
    "permissions": "admin,role,menu,user"
  }
}
```

| 字段 | 说明 |
|-----|------|
| menus | 树形菜单结构，含 `children` 嵌套子菜单 |
| permissions | 当前角色权限标识字符串，逗号分隔 |

### POST `/auth/logout` -- 退出登录

**需要 Token**

**响应:** `{"code": 0, "msg": "退出成功", "data": []}`

---

## 3. Role 角色管理

### GET `/role/index` -- 角色列表

> **不分页**，返回全量数据。

**响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "超级管理员",
        "description": "拥有全部权限",
        "rules": "*",
        "status": 1,
        "create_time": 1700000000
      }
    ]
  }
}
```

### POST `/role/save` -- 创建角色

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| name | string | 是 | 角色名称 |
| description | string | 否 | 角色描述 |
| rules | string | 否 | 权限标识（逗号分隔，`*` 表示全部权限） |
| status | int | 否 | 状态：1 启用，0 禁用 |

**响应:** `{"code": 0, "msg": "添加成功", "data": []}`

### PUT `/role/update` -- 更新角色

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| id | int | 是 | 角色ID |
| name | string | 否 | 角色名称 |
| description | string | 否 | 角色描述 |
| rules | string | 否 | 权限标识 |
| status | int | 否 | 状态 |

**响应:** `{"code": 0, "msg": "更新成功", "data": []}`

### DELETE `/role/delete/:id` -- 删除角色

- `:id` 为角色ID（数字）

> 超级管理员角色（id=1）**不可删除**。删除成功返回 `{"code": 0, "msg": "删除成功", "data": []}`。

---

## 4. Menu 菜单管理

### GET `/menu/index` -- 菜单列表（树形）

> **不分页**，返回嵌套树形结构。

**响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "parent_id": 0,
        "title": "系统管理",
        "name": "system",
        "icon": "settings-outline",
        "path": "/system",
        "component": "Layout",
        "type": 1,
        "permission": "",
        "sort": 100,
        "status": 1,
        "create_time": 1700000000,
        "children": [ ... ]
      }
    ]
  }
}
```

### POST `/menu/save` -- 创建菜单

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| parent_id | int | 是 | 父菜单ID，0 表示顶级菜单 |
| name | string | 是 | 路由名称（英文） |
| title | string | 是 | 菜单标题（中文） |
| icon | string | 否 | 图标名称 |
| path | string | 否 | 前端路由路径 |
| component | string | 否 | 前端组件路径 |
| type | int | 否 | 类型：1-目录, 2-菜单, 3-按钮 |
| permission | string | 否 | 权限标识字符串 |
| sort | int | 否 | 排序值（越小越靠前） |

### PUT `/menu/update` -- 更新菜单

请求体需附带 `id` 参数，其余字段同创建。

### DELETE `/menu/delete/:id` -- 删除菜单

> 若存在子菜单则**删除失败**（返回 `"请先删除子菜单"`），需先递归删除所有子菜单。

---

## 5. Admin 管理员管理

### GET `/admin/index` -- 管理员列表

**Query 参数:**

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| page | int | 1 | 页码 |
| limit | int | 15 | 每页条数 |
| keyword | string | - | 按 username / nickname 模糊搜索 |

**响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "username": "admin",
        "nickname": "超级管理员",
        "email": "admin@example.com",
        "mobile": "13800000000",
        "role_id": 1,
        "status": 1,
        "avatar": "/uploads/avatar/1.png",
        "create_time": 1700000000
      }
    ],
    "total": 10,
    "page": 1,
    "limit": 15
  }
}
```

### POST `/admin/save` -- 创建管理员

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码（明文，后端自动 bcrypt 加密） |
| nickname | string | 否 | 昵称 |
| email | string | 否 | 邮箱 |
| mobile | string | 否 | 手机号 |
| role_id | int | 否 | 关联角色ID |
| status | int | 否 | 状态：1 启用，0 禁用 |

### PUT `/admin/update` -- 更新管理员

请求体需附带 `id`。

> **重要**：`password` 为空字符串或不传时**不修改密码**；所有字段均为可选覆盖。

### DELETE `/admin/delete/:id` -- 删除管理员（软删除）

> 超级管理员（id=1）**不可删除**。此操作为软删除，仅设置 `delete_time`。

---

## 6. User 用户管理

### GET `/user/index` -- 用户列表

**Query 参数:**

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| page | int | 1 | 页码 |
| limit | int | 15 | 每页条数 |
| keyword | string | - | 按 username / nickname / mobile 模糊搜索 |

### POST `/user/save` -- 创建用户

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| username | string | 是 | 用户名 |
| password | string | 是 | 密码（明文，后端自动 bcrypt 加密） |
| nickname | string | 否 | 昵称 |
| email | string | 否 | 邮箱 |
| mobile | string | 否 | 手机号 |
| group_id | int | 否 | 关联用户组ID |
| status | int | 否 | 状态：1 启用，0 禁用 |

### PUT `/user/update` -- 更新用户

请求体需附带 `id`。`password` 为空不修改密码。

### DELETE `/user/delete/:id` -- 删除用户（软删除）

> 软删除，仅设置 `delete_time`。

---

## 7. Config 系统配置

### GET `/config/index` -- 配置列表

**Query 参数:**

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| group | string | - | 按配置分组过滤（如 `site`、`upload`） |

> **不分页**，返回全量。

**响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "list": [
      {
        "id": 1,
        "name": "site_name",
        "group": "site",
        "value": "SwiftAdmin",
        "type": "text",
        "description": "站点名称"
      }
    ]
  }
}
```

### POST `/config/save` -- 创建配置

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| name | string | 是 | 配置键名 |
| group | string | 否 | 配置分组 |
| value | string | 否 | 配置值 |
| type | string | 否 | 值类型（text / textarea / image / file 等） |
| description | string | 否 | 配置说明 |

### PUT `/config/update` -- 更新配置

请求体需附带 `id`，其余字段同创建。

### DELETE `/config/delete/:id` -- 删除配置

---

## 8. Attachment 附件管理

### GET `/attachment/index` -- 附件列表

**Query 参数:**

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| page | int | 1 | 页码 |
| limit | int | 15 | 每页条数 |
| ext | string | - | 按文件扩展名过滤（如 `jpg`、`png`、`pdf`） |

### DELETE `/attachment/delete/:id` -- 删除附件

> 同时**物理删除**服务器上的对应文件。

---

## 9. Recycle 回收站

### GET `/recycle/index` -- 回收站列表

支持 `page`、`limit` 分页参数。

### POST `/recycle/restore/:id` -- 恢复数据

将回收站中的记录还原到原始数据表。

### DELETE `/recycle/delete/:id` -- 永久删除

彻底删除回收站记录，不可恢复。

---

## 10. SecurityDataRecycle 安全回收站

### GET `/security_data_recycle/index` -- 列表

**Query 参数:** `page`、`limit`、`keyword`（按规则名称模糊搜索）。

**响应:** 分页列表，含管理员昵称关联信息。

### POST `/security_data_recycle/restore/:id` -- 恢复单条

### DELETE `/security_data_recycle/delete/:id` -- 删除单条

### POST `/security_data_recycle/batchDelete` -- 批量删除

**请求体:**
```json
{ "ids": [1, 2, 3] }
```

### POST `/security_data_recycle/batchRestore` -- 批量恢复

请求体同上：`{ "ids": [1, 2, 3] }`。逐条将 `data` 字段 JSON 解析后插回原表。

---

## 11. SensitiveDataLog 敏感数据日志

### GET `/sensitive_data_log/index` -- 列表

**Query 参数:** `page`、`limit`、`keyword`。

### GET `/sensitive_data_log/detail/:id` -- 日志详情

**响应:** 含管理员昵称、修改前后值对比等完整信息。

### POST `/sensitive_data_log/rollback/:id` -- 回滚单条

> 将表中对应记录的字段值恢复为 `before_value`，然后删除该日志记录。

### POST `/sensitive_data_log/batchRollback` -- 批量回滚

**请求体:** `{ "ids": [1, 2, 3] }`

### DELETE `/sensitive_data_log/delete/:id` -- 删除单条

### POST `/sensitive_data_log/batchDelete` -- 批量删除

**请求体:** `{ "ids": [1, 2, 3] }`

---

## 12. DataRecycleRule 数据回收规则

### GET `/data_recycle_rule/index` -- 列表

支持 `page`、`limit`、`keyword`。

### POST `/data_recycle_rule/save` -- 创建规则

接收全部 POST 的 JSON Body 字段，`create_time` 和 `update_time` 自动设置。

### PUT `/data_recycle_rule/update` -- 更新规则

接收全部 PUT 的 JSON Body 字段，需包含 `id`。

### DELETE `/data_recycle_rule/delete/:id` -- 删除规则

### POST `/data_recycle_rule/toggleStatus/:id` -- 切换启用状态

> 将 `status` 在 0 和 1 之间切换。响应 `{"data": {"status": 1}}` 或 `{"data": {"status": 0}}`。

---

## 13. SensitiveFieldRule 敏感字段规则

### GET `/sensitive_field_rule/index` -- 列表

支持 `page`、`limit`、`keyword`。

### POST `/sensitive_field_rule/save` -- 创建规则

接收全部 POST 的 JSON Body 字段。

### PUT `/sensitive_field_rule/update` -- 更新规则

接收全部 PUT 的 JSON Body 字段，需包含 `id`。

### DELETE `/sensitive_field_rule/delete/:id` -- 删除规则

### POST `/sensitive_field_rule/toggleStatus/:id` -- 切换启用状态

> 用法同 12 章节。

---

## 14. Dashboard 仪表盘

### GET `/dashboard/index` -- 仪表盘数据

> 聚合展示系统核心指标。

**响应示例:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "admin_count": 5,
    "user_count": 1280,
    "article_count": 356,
    "attachment_count": 89,
    "payment_count": 42,
    "payment_amount": 12800.00,
    "today_user": 12,
    "today_article": 3,
    "seven_days": [
      { "date": "05-12", "count": 15 },
      { "date": "05-13", "count": 22 },
      { "date": "05-14", "count": 18 },
      { "date": "05-15", "count": 30 },
      { "date": "05-16", "count": 25 },
      { "date": "05-17", "count": 20 },
      { "date": "05-18", "count": 12 }
    ],
    "article_trend": [
      { "date": "05-12", "count": 4 }
    ],
    "recent_logs": [
      {
        "title": "登录",
        "create_time": "2026-05-18 14:30:00",
        "nickname": "管理员"
      }
    ],
    "category_stats": [
      { "name": "新闻资讯", "count": 120 },
      { "name": "产品动态", "count": 80 }
    ]
  }
}
```

| 字段 | 类型 | 说明 |
|-----|------|------|
| admin_count | int | 管理员总数 |
| user_count | int | 前端用户总数 |
| article_count | int | CMS文章总数 |
| attachment_count | int | 附件总数 |
| payment_count | int | 支付订单总数 |
| payment_amount | float | 已支付总金额（sum of amount where status=1） |
| today_user | int | 今日新增用户数 |
| today_article | int | 今日新增文章数 |
| seven_days | array | 近7天每日新增用户趋势 |
| article_trend | array | 近7天每日新增文章趋势 |
| recent_logs | array | 最近8条操作日志 |
| category_stats | array | 各栏目文章数量分布（含栏目名称） |

---

## 15. DataScreen 数据大屏

### GET `/datascreen/index` -- 大屏数据

**响应结构:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "server": {
      "php_version": "8.1.0",
      "os": "WINNT",
      "server": "Apache/2.4",
      "time": "2026-05-18 14:30:00",
      "db_size": "12.5 MB"
    },
    "stats": {
      "user_total": 1280,
      "user_today": 12,
      "article_total": 356,
      "article_today": 3,
      "payment_total": 42,
      "payment_amount": 12800,
      "attachment_total": 89,
      "attachment_size": 524288000,
      "admin_total": 5
    },
    "user_trend": [
      { "date": "2026-05-12", "count": 15 }
    ],
    "user_level": [
      { "level": 0, "count": 800, "name": "普通用户" },
      { "level": 1, "count": 300, "name": "VIP1" },
      { "level": 2, "count": 150, "name": "VIP2" },
      { "level": 3, "count": 30, "name": "VIP3" }
    ],
    "payment_trend": [
      { "date": "2026-05-12", "count": 5, "amount": 1500 }
    ],
    "article_trend": [
      { "date": "2026-05-12", "count": 4, "views": 230 }
    ],
    "file_stats": [
      { "ext": "jpg", "count": 45 },
      { "ext": "png", "count": 30 }
    ],
    "recent_logs": [ ... ],
    "cron_status": {
      "total": 5,
      "running": 3,
      "jobs": [ ... ]
    }
  }
}
```

| 子模块 | 说明 |
|-------|------|
| server | 服务器环境信息（PHP版本、操作系统、Web服务器、当前时间、数据库大小） |
| stats | 核心统计数据（用户、文章、支付、附件、管理员） |
| user_trend | 近7天每日新增用户趋势 |
| user_level | 用户等级分布（level -> 名称映射） |
| payment_trend | 近7天每日支付数量及金额趋势 |
| article_trend | 近7天每日文章数及浏览量趋势 |
| file_stats | 附件按扩展名聚合统计 |
| recent_logs | 最近10条操作日志 |
| cron_status | 定时任务状态（总数、运行中、任务列表） |

---

## 16. Generator 代码生成器

### GET `/generator/index` -- 表列表

返回数据库中所有可生成代码的表（排除 `swift_workflow_`、`swift_payment`、`swift_tenant` 等系统预留表）。

### GET `/generator/fields` -- 获取表字段

**Query 参数:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| table | string | 是 | 完整表名（含前缀，如 `swift_article`） |

**响应示例:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "table": "swift_article",
    "fields": [
      {
        "name": "title",
        "type": "varchar(255)",
        "base_type": "varchar",
        "component": "Input",
        "val_type": "string",
        "comment": "标题",
        "nullable": false,
        "default": "",
        "key": ""
      }
    ]
  }
}
```

| fields 子字段 | 说明 |
|-------------|------|
| component | 自动映射的表单组件（Input, Textarea, Switch, DateTimePicker, RichText 等） |
| val_type | 值类型（string, number, switch, datetime, json 等） |
| key | PRI = 主键, MUL = 索引，空 = 普通字段 |

### GET `/generator/preview` -- 预览代码

**Query 参数:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| table | string | 是 | 完整表名 |
| fields | array | 否 | 字段配置覆盖（`fields[][name]`、`fields[][component]`、`fields[][comment]`、`fields[][searchable]`） |

返回 Controller、Vue、API、Route 代码文本，**不写入文件**。

### GET `/generator/types` -- 获取表单组件类型

返回所有可用组件：Input, InputNumber, Textarea, Select, Switch, DatePicker, DateTimePicker, TimePicker, Radio, Checkbox, Upload, ImageUpload, RichText, Markdown, CodeEditor, ColorPicker, Rate, Slider。

### POST `/generator/generate` -- 生成代码（写入文件）

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| table | string | 是 | 完整表名 |
| fields | array | 否 | 字段配置覆盖 |

**响应示例:**
```json
{
  "code": 0,
  "msg": "代码生成成功",
  "data": {
    "files": [
      "app/admin/controller/Article.php",
      "frontend/admin/src/views/article/index.vue",
      "frontend/admin/src/api/article.ts",
      "app/admin/route/route.php (追加路由)"
    ]
  }
}
```

生成内容：Controller（ThinkPHP）+ Vue 页面（Naive UI）+ TypeScript API + 路由注册。

---

## 17. AI 助手

### GET `/ai/config` -- 获取 AI 配置状态

**需要 Token**

**响应示例:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "activated": true,
    "is_trial": false,
    "tier": "basic",
    "tier_name": "基础版",
    "expiry": 1735689600,
    "expiry_at": "2026-01-01",
    "domain": "example.com",
    "brand": "码创软件开发工作室",
    "has_provider": true,
    "quota": { ... },
    "tiers": [ ... ],
    "has_master": true
  }
}
```

| 字段 | 说明 |
|-----|------|
| activated | License 是否已激活 |
| is_trial | 是否为免费体验模式 |
| has_provider | 是否已配置 AI 供应商 |
| has_master | 是否已设置主密钥 |

### POST `/ai/chat` -- AI 对话

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| messages | array | 是 | 对话消息数组 |
| mode | string | 否 | 模式，默认 `chat` |

**响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "reply": "AI 回复内容...",
    "quota": { "used": 5, "total": 100, "remaining": 95 }
  }
}
```

> 免费体验额度用完时返回错误：`"体验额度已用完"`。

### POST `/ai/activate` -- 激活 License

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| license | string | 是 | License 密钥字符串 |

激活成功后自动配置 AI 供应商。

### POST `/ai/setupprovider` -- 配置 AI 主密钥

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| api_url | string | 是 | AI API 接口地址 |
| api_key | string | 是 | API 密钥（加密存储于服务端） |

### POST `/ai/genlicense` -- 生成 License

**请求体（JSON Body）:**

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| domain | string | 当前域名 | 授权域名 |
| days | int | 365 | 有效天数 |
| tier | string | basic | 版本级别（basic / standard / premium） |

### POST `/ai/savefile` -- 保存 AI 生成的文件

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| path | string | 是 | 文件保存的相对路径（自动安全检查，禁止 `..` 和 `~`） |
| content | string | 是 | 文件内容 |

写入 `aisc/` 目录。

### GET `/ai/listfiles` -- 列出 AI 生成的文件

返回 `aisc/` 目录下所有文件列表及数量。

---

## 18. Terminal 终端命令

### POST `/terminal/execute` -- 执行终端命令

> **高风险接口**，仅允许白名单命令。

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| command | string | 是 | 终端命令字符串 |

**允许的命令白名单:** `ls`, `dir`, `cd`, `pwd`, `cat`, `type`, `head`, `tail`, `grep`, `find`, `wc`, `du`, `df`, `free`, `ps`, `top`, `uptime`, `whoami`, `date`, `time`, `echo`, `php`, `composer`, `git`, `node`, `npm`, `yarn`, `which`, `where`, `uname`, `hostname`, `ping`, `ifconfig`, `ipconfig`, `netstat`, `clear`。

**禁止的危险操作:** `rm`、`mv`、`cp`、`dd`、`chmod`、`chown`、`shutdown`、`reboot` 及任何包含 `>` 重定向的命令。

**响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "output": "命令执行输出...",
    "exit": 0,
    "command": "ls -la"
  }
}
```

---

## 19. Module 模块管理

### GET `/module/index` -- 模块列表

读取 `modules/` 目录下所有 `manifest.json` 定义的模块，返回名称、标题、版本、描述、作者、依赖、安装状态等。

### GET `/module/scanaisc` -- 扫描 AISC 模块

读取 `aisc/modules/` 目录下待安装的模块信息。

### POST `/module/install` -- 安装模块

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| name | string | 是 | 模块目录名 |

> 自动检查依赖（不满足则安装失败），执行 `install.sql`（若存在）。

### POST `/module/installfromaisc` -- 从 AISC 一键安装

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| name | string | 是 | 模块目录名（禁止路径穿越字符 `/`、`\`、`..`） |

> 从 `aisc/modules/` 复制到 `modules/` 后执行安装。若 SQL 执行失败自动回滚（删除复制目录）。

### POST `/module/uninstall` -- 卸载模块

**请求体:** `{ "name": "module-name" }`

> 执行 `uninstall.sql`（若存在），然后从注册表移除。

### POST `/module/enable` -- 启用模块

**请求体:** `{ "name": "module-name" }`

### POST `/module/disable` -- 禁用模块

**请求体:** `{ "name": "module-name" }`

---

## 20. CMS Category 栏目管理

### GET `/cms/category/index` -- 栏目列表（平铺）

> **不分页**，返回全量平铺列表（含格式化后的 `create_time`、`update_time`）。

### GET `/cms/category/tree` -- 栏目树

> 返回嵌套树形结构（仅 `status=1` 的启用栏目）。

**响应示例:**
```json
{
  "code": 0,
  "msg": "success",
  "data": [
    {
      "id": 1,
      "parent_id": 0,
      "name": "新闻资讯",
      "sort": 1,
      "description": "",
      "status": 1,
      "children": [
        {
          "id": 2,
          "parent_id": 1,
          "name": "公司新闻",
          "sort": 1,
          "status": 1
        }
      ]
    }
  ]
}
```

### POST `/cms/category/save` -- 创建栏目

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| parent_id | int | 否 | 父栏目ID，0 为顶级栏目 |
| name | string | 是 | 栏目名称 |
| sort | int | 否 | 排序数值 |
| description | string | 否 | 栏目描述 |
| status | int | 否 | 状态：1 启用，0 禁用 |

### PUT `/cms/category/update` -- 更新栏目

请求体需附带 `id`，其余字段同创建。

### DELETE `/cms/category/delete/:id` -- 删除栏目

> **约束**：若该栏目存在子栏目，返回 `"请先删除子栏目"`；若存在关联文章，返回 `"该栏目下有文章，无法删除"`。

---

## 21. CMS Article 文章管理

### GET `/cms/article/index` -- 文章列表

**Query 参数:**

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| page | int | 1 | 页码 |
| limit | int | 15 | 每页条数 |
| keyword | string | - | 按 title / tags 模糊搜索 |
| category_id | int | 0 | 按栏目ID过滤 |

**响应:** 列表中每条记录含 `category_name`（栏目名称）、格式化的时间字段。

### GET `/cms/article/detail/:id` -- 文章详情

返回单篇文章完整信息。

### POST `/cms/article/save` -- 创建文章

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| category_id | int | 否 | 所属栏目ID |
| title | string | 是 | 文章标题 |
| content | string | 否 | 文章正文（HTML） |
| cover | string | 否 | 封面图路径 |
| summary | string | 否 | 摘要 |
| tags | string | 否 | 标签（逗号分隔） |
| author | string | 否 | 作者 |
| seo_title | string | 否 | SEO 标题 |
| seo_keywords | string | 否 | SEO 关键词 |
| seo_description | string | 否 | SEO 描述 |
| views | int | 否 | 浏览量 |
| status | int | 否 | 状态：1 发布，0 草稿 |

> `publish_time` 自动设为当前时间戳。

### PUT `/cms/article/update` -- 更新文章

请求体需附带 `id`，其余字段同创建。仅更新 `update_time`，不修改 `publish_time`。

### DELETE `/cms/article/delete/:id` -- 删除文章

---

## 22. Notification 通知管理

### GET `/notification/index` -- 通知列表

**Query 参数:**

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| page | int | 1 | 页码 |
| limit | int | 15 | 每页条数 |
| type | string | - | 按通知类型过滤 |
| is_read | int | - | 已读状态：1-已读，0-未读 |

> 列表仅返回**当前登录管理员**的通知（按 `user_id` 过滤）。

### GET `/notification/unread` -- 未读通知

**响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "count": 5,
    "latest": [
      {
        "id": 100,
        "type": "system",
        "title": "系统维护通知",
        "content": "今晚 22:00 进行系统维护",
        "is_read": 0,
        "create_time": "2026-05-18 10:00:00"
      }
    ]
  }
}
```

> `count` 为未读总数，`latest` 为最近 5 条未读通知。

### POST `/notification/read/:id` -- 标记单条已读

### POST `/notification/readall` -- 全部标记已读

### DELETE `/notification/delete/:id` -- 删除通知

### POST `/notification/send` -- 发送通知

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| user_id | int | 是 | 接收用户ID |
| type | string | 否 | 通知类型（如 system、article、payment） |
| title | string | 是 | 通知标题 |
| content | string | 否 | 通知正文内容 |
| target_url | string | 否 | 点击通知后的跳转链接 |

---

## 23. Cron 定时任务

### GET `/cron/index` -- 任务列表

**Query 参数:** `page`（默认 1）、`limit`（默认 10）。

### POST `/cron/save` -- 创建任务

接收全部 POST 的 JSON Body 字段。`create_time` 和 `update_time` 自动设置。常用字段：`name`、`command`、`cron_expression`、`status` 等。

### PUT `/cron/update` -- 更新任务

接收全部 PUT 的 JSON Body 字段，需包含 `id`。

### DELETE `/cron/delete/:id` -- 删除任务

> 同时删除该任务的所有执行日志记录。

### POST `/cron/execute/:id` -- 手动立即执行

执行结果写入 `cron_log` 表，同时更新任务表的 `last_run_time` 和 `run_count`。

### GET `/cron/logs` -- 全部执行日志

**Query 参数:** `page`（默认 1）、`limit`（默认 10）。

### GET `/cron/logs/:id` -- 指定任务的执行日志

`:id` 为任务ID。Query 参数同上。

---

## 24. Tenant 租户管理

### GET `/tenant/index` -- 租户列表

**Query 参数:** `page`（默认 1）、`limit`（默认 10）。

### GET `/tenant/detail/:id` -- 租户详情

### POST `/tenant/save` -- 创建租户

接收全部 POST 的 JSON Body 字段。`create_time`、`update_time` 自动设置。若 `expire_time` 为非数字格式则自动转为时间戳。

### PUT `/tenant/update` -- 更新租户

接收全部 PUT 的 JSON Body 字段，需包含 `id`。

### DELETE `/tenant/delete/:id` -- 删除租户

### GET `/tenant/plans` -- 套餐计划列表

**响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": [
    { "id": 1, "name": "基础版", "price": "99", "max_users": 10, "storage": "5GB" },
    { "id": 2, "name": "标准版", "price": "299", "max_users": 50, "storage": "20GB" },
    { "id": 3, "name": "旗舰版", "price": "999", "max_users": 200, "storage": "100GB" }
  ]
}
```

---

## 25. Payment 支付管理

### GET `/payment/index` -- 支付列表

**Query 参数:**

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| page | int | 1 | 页码 |
| limit | int | 10 | 每页条数 |
| status | int | - | 支付状态：0-待支付，1-支付中，2-已支付，3-已退款 |
| channel | string | - | 支付渠道：wechat / alipay |

### GET `/payment/detail/:id` -- 支付详情

### POST `/payment/save` -- 创建支付单

接收全部 POST 的 JSON Body 字段。`order_no` 自动生成（格式：`PAY` + 年月日时分秒 + 4位随机数）。

### PUT `/payment/update` -- 更新支付单

接收全部 PUT 的 JSON Body 字段，需包含 `id`。`pay_time` 支持日期字符串或时间戳。

### DELETE `/payment/delete/:id` -- 删除支付单

### POST `/payment/refund/:id` -- 退款

> **约束**：仅 `status=2`（已支付）的订单可退款，退款后状态变更为 `status=3`。

### GET `/payment/summary` -- 支付汇总

**响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "total_count": 100,
    "paid_count": 80,
    "refund_count": 5,
    "total_amount": 50000.00,
    "refund_amount": 3000.00,
    "wechat_count": 60,
    "alipay_count": 40
  }
}
```

---

## 26. Monitor 系统监控

### GET `/monitor/index` -- 系统概览

**响应:**
```json
{
  "code": 0,
  "msg": "success",
  "data": {
    "cpu": { "usage": 35.5, "cores": 4 },
    "memory": { "total": "16GB", "used": "8.5GB", "free": "7.5GB", "usage": 53.1 },
    "disk": { "total": "256GB", "used": "120GB", "free": "136GB", "usage": 46.9 },
    "server": {
      "os": "WINNT",
      "php_version": "8.1.0",
      "server_software": "Apache/2.4",
      "uptime": "2026-05-18 08:00:00",
      "time": "2026-05-18 14:30:00"
    }
  }
}
```

> 支持 Windows 和 Linux 环境。真实数据通过 `wmic`、`sys_getloadavg`、`exec` 等获取，获取失败时返回模拟数据。

### GET `/monitor/requests` -- 请求统计

返回总请求数、今日请求数、平均响应时间（ms）、错误率（%）、每小时请求量趋势（24小时数组）。

### GET `/monitor/logs` -- 系统日志文件

返回 `runtime/log/` 目录下最近 10 个 `.log` 文件（文件名、大小、修改时间）。

---

## 27. CRUD 生成器

### GET `/crud/index` -- 表列表

返回所有 `swift_` 前缀的数据表及其记录总数。

### GET `/crud/fields/:table` -- 获取表字段

`:table` 参数需**去掉** `swift_` 前缀（如 `admin`、`user`）。

返回字段名、数据库类型、基础类型、是否可空、默认值、注释、是否主键（PRI）。

### GET `/crud/types` -- 获取字段类型表

返回可用的数据库字段类型及其对应的前端表单组件映射。

### POST `/crud/generate` -- 生成 CRUD 代码

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| table | string | 是 | 表名（去掉前缀） |
| comment | string | 否 | 表注释 |
| fields | array | 是 | 字段定义数组，每个元素含 `name`、`type`、`comment`、`nullable`、`default`、`pk` |

执行建表 SQL + 生成 Controller（ThinkPHP 6.0） + 生成 Vue 页面（Naive UI + TypeScript）并写入文件。

### POST `/crud/preview` -- 预览 CRUD 代码

参数同 generate，仅返回 SQL / Controller / Vue 代码文本，**不写入文件**、**不执行 SQL**。

---

## 28. AuthLog 操作日志

### GET `/auth_log/index` -- 日志列表

**Query 参数:**

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| page | int | 1 | 页码 |
| limit | int | 15 | 每页条数 |
| keyword | string | - | 按 username / title / url 模糊搜索 |

### DELETE `/auth_log/delete/:id` -- 删除日志

---

## 29. UserGroup 用户组管理

### GET `/user_group/index` -- 用户组列表

**Query 参数:**

| 参数 | 类型 | 默认值 | 说明 |
|-----|------|-------|------|
| page | int | 1 | 页码 |
| limit | int | 15 | 每页条数 |
| keyword | string | - | 按 name 模糊搜索 |

### POST `/user_group/save` -- 创建用户组

**请求体（JSON Body）:**

| 参数 | 类型 | 必填 | 说明 |
|-----|------|-----|------|
| name | string | 是 | 用户组名称 |
| description | string | 否 | 描述 |
| rules | string | 否 | 权限标识（逗号分隔） |
| status | int | 否 | 状态：1 启用，0 禁用 |

### PUT `/user_group/update` -- 更新用户组

请求体需附带 `id`，其余字段同创建。

### DELETE `/user_group/delete/:id` -- 删除用户组

---

## 30. 错误码

| code | 含义 | 说明 |
|------|------|------|
| 0 | 成功 | 请求处理正常，`data` 中包含业务数据 |
| 1 | 通用业务错误 | 参数校验失败、数据不存在、操作被拒绝等，具体原因见 `msg` |
| 401 | 未授权 | Token 无效或用户不存在 |

> 所有错误信息均为中文，通过 `msg` 字段返回。常见业务错误消息包括：
> - `"用户名或密码错误"` -- 登录凭据不匹配
> - `"账号已被禁用"` -- 账户被管理员禁用
> - `"超级管理员角色不可删除"` -- 角色保护
> - `"超级管理员不可删除"` -- 管理员保护
> - `"请先删除子菜单"` -- 级联删除约束
> - `"请先删除子栏目"` -- 级联删除约束
> - `"体验额度已用完"` -- AI 免费额度耗尽
> - `"命令不被允许"` -- 终端命令不在白名单中
> - `"检测到危险操作，已阻止"` -- 终端命令含危险字符
> - `"缺少依赖模块: xxx"` -- 模块安装时依赖不满足
