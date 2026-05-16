# SwiftAdmin 详细开发步骤架构文档

> 基于 ThinkPHP 6.0 + Vue3 + NaiveUI 企业级全栈后台管理系统  
> 版本: v1.0.0 | 日期: 2026-05-15 | 总工期: 约16周

---

## 目录

- [开发前必读](#开发前必读)
- [第〇步：环境准备与工具安装](#第〇步环境准备与工具安装)
- [第一步：ThinkPHP 6.0 后端项目初始化](#第一步thinkphp-60-后端项目初始化)
- [第二步：Vue3 + NaiveUI 前端管理后台初始化](#第二步vue3--naiveui-前端管理后台初始化)
- [第三步：数据库设计与迁移](#第三步数据库设计与迁移)
- [第四步：RBAC 权限系统（登录/角色/菜单）](#第四步rbac-权限系统登录角色菜单)
- [第五步：管理后台基础布局框架](#第五步管理后台基础布局框架)
- [第六步：管理员管理模块](#第六步管理员管理模块)
- [第七步：系统配置模块](#第七步系统配置模块)
- [第八步：附件管理模块](#第八步附件管理模块)
- [第九步：会员管理模块](#第九步会员管理模块)
- [第十步：数据回收站与审计](#第十步数据回收站与审计)
- [第十一步：控制台仪表盘](#第十一步控制台仪表盘)
- [第十二步：CRUD 代码生成器](#第十二步crud-代码生成器)
- [第十三步：模块市场](#第十三步模块市场)
- [第十四步：WEB 终端](#第十四步web-终端)
- [第十五步：新增功能 - AI 智能助手](#第十五步新增功能---ai-智能助手)
- [第十六步：新增功能 - 数据大屏](#第十六步新增功能---数据大屏)
- [第十七步：新增功能 - 工作流引擎](#第十七步新增功能---工作流引擎)
- [第十八步：新增功能 - CMS 内容管理](#第十八步新增功能---cms-内容管理)
- [第十九步：新增功能 - 消息通知中心](#第十九步新增功能---消息通知中心)
- [第二十步：H5 移动端](#第二十步h5-移动端)
- [第二十一步：uni-app 小程序端](#第二十一步uni-app-小程序端)
- [第二十二步：API 接口层 + Swagger 文档](#第二十二步api-接口层--swagger-文档)
- [第二十三步：定时任务可视化](#第二十三步定时任务可视化)
- [第二十四步：多租户支持](#第二十四步多租户支持)
- [第二十五步：多渠道支付](#第二十五步多渠道支付)
- [第二十六步：系统监控面板](#第二十六步系统监控面板)
- [第二十七步：Docker 部署配置](#第二十七步docker-部署配置)
- [第二十八步：一键安装脚本](#第二十八步一键安装脚本)
- [第二十九步：文档编写](#第二十九步文档编写)
- [第三十步：最终检查与发布](#第三十步最终检查与发布)
- [附录：每步检查清单](#附录每步检查清单)

---

## 开发前必读

### 开发原则

1. **严格按步骤顺序执行**，不可跳级。每一步完成并通过检查点后才能进入下一步。
2. **每步先写后端 API，再写前端页面**。后端接口自测通过后再对接前端。
3. **所有 API 统一返回 JSON 格式**：`{"code": 0, "msg": "success", "data": {}}`
4. **命名规范统一**：数据表 `swift_xxx`，模型 `XxxModel`，控制器 `XxxController`
5. **每完成一步立即 Git commit**，方便回滚。

### 项目路径约定

```
F:/phpstudy_pro/WWW/SwiftAdmin/          ← 项目根目录
F:/phpstudy_pro/WWW/SwiftAdmin/app/       ← 后端代码
F:/phpstudy_pro/WWW/SwiftAdmin/frontend/  ← 前端代码
```

### 默认账号密码

```
后台: admin / admin123
```

---

## 第〇步：环境准备与工具安装

### 检查清单

- [ ] PHP >= 7.4（推荐 8.1）
- [ ] Composer 最新版
- [ ] MySQL >= 5.7
- [ ] Redis >= 5.0
- [ ] Node.js >= 16 LTS
- [ ] npm 或 pnpm
- [ ] Git

### 验证命令

```bash
php -v            # 应显示 PHP 7.4.x 或 8.x
composer -V       # 应显示 Composer 2.x
mysql --version   # 应显示 5.7+ 或 8.0+
redis-cli ping    # 应返回 PONG
node -v           # 应显示 v16+ 或 v18+
npm -v            # 应显示 8+
git --version     # 应显示 2.x
```

### PHP 扩展检查

```bash
php -m | grep -E "pdo|mbstring|json|curl|fileinfo|gd|redis|openssl|tokenizer|xml|zip"
# 必须全部出现
```

### 如果缺扩展，安装方法（以 Ubuntu 为例）

```bash
sudo apt install php-mysql php-mbstring php-json php-curl php-gd php-redis php-xml php-zip
```

**检查点 ✓**：以上所有命令无报错，PHP 扩展齐全。

---

## 第一步：ThinkPHP 6.0 后端项目初始化

### 1.1 创建项目

```bash
C:/Users/小张开发/swiftadmin
composer create-project topthink/think=6.0.* swiftadmin
cd swiftadmin
```

### 1.2 安装多应用模式扩展

```bash
composer require topthink/think-multi-app
```

### 1.3 创建应用目录

```bash
php think build admin        # 后台管理应用
php think build api          # API 接口应用
php think build common       # 公共应用
```

### 1.4 安装必需扩展包

```bash
# 视图模板
composer require topthink/think-view

# 注解支持
composer require topthink/think-annotation

# 辅助函数
composer require topthink/think-helper

# Workerman (常驻内存)
composer require topthink/think-worker

# 图片处理
composer require topthink/think-image

# 文件系统
composer require topthink/think-filesystem

# JWT (API 鉴权)
composer require firebase/php-jwt
```

### 1.5 配置 .env 文件

```env
APP_DEBUG = true

[DATABASE]
TYPE = mysql
HOSTNAME = 127.0.0.1
DATABASE = swiftadmin
USERNAME = root
PASSWORD = your_password
HOSTPORT = 3306
CHARSET = utf8mb4
PREFIX = swift_

[REDIS]
HOST = 127.0.0.1
PORT = 6379
PASSWORD =
SELECT = 0

[CACHE]
DRIVER = redis
```

### 1.6 创建数据库

```sql
CREATE DATABASE IF NOT EXISTS swiftadmin DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
```

### 1.7 配置多应用模式

编辑 `config/app.php`：

```php
'auto_multi_app' => true,
```

### 1.8 配置异常处理

编辑 `app/provider.php`：

```php
use app\ExceptionHandle;
use app\Request;

return [
    'think\Request'          => Request::class,
    'think\exception\Handle' => ExceptionHandle::class,
];
```

### 1.9 创建基础目录结构

```bash
# 后台应用目录
mkdir -p app/admin/controller
mkdir -p app/admin/model
mkdir -p app/admin/validate
mkdir -p app/admin/middleware
mkdir -p app/admin/service
mkdir -p app/admin/route

# API 应用目录
mkdir -p app/api/controller/v1
mkdir -p app/api/model
mkdir -p app/api/validate
mkdir -p app/api/middleware
mkdir -p app/api/route

# 公共应用目录
mkdir -p app/common/controller
mkdir -p app/common/model
mkdir -p app/common/service

# 公共上传目录
mkdir -p public/uploads

# Runtime 权限
chmod -R 775 runtime
```

### 1.10 验证项目能运行

```bash
php think run
# 浏览器访问 http://127.0.0.1:8000
# 应看到 ThinkPHP 6.0 欢迎页面
```

**检查点 ✓**：浏览器能打开 TP6 欢迎页，PHP 无报错。访问 `http://127.0.0.1:8000/admin` 能看到默认页面。

### 1.11 配置跨域中间件（为前后端分离做准备）

创建 `app/common/middleware/Cors.php`：

```php
<?php
namespace app\common\middleware;

class Cors
{
    public function handle($request, \Closure $next)
    {
        $response = $next($request);
        return $response
            ->header('Access-Control-Allow-Origin', '*')
            ->header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS')
            ->header('Access-Control-Allow-Headers', 'Content-Type,Authorization,Token')
            ->header('Access-Control-Allow-Credentials', 'true');
    }
}
```

注册全局中间件 `app/admin/middleware.php`：

```php
<?php
return [
    \app\common\middleware\Cors::class,
];
```

---
第一步完成，进行第二步
## 第二步：Vue3 + NaiveUI 前端管理后台初始化

### 2.1 创建前端项目（使用 Vite）

```bash
cd F:/phpstudy_pro/WWW/SwiftAdmin
npm create vite@latest frontend/admin -- --template vue-ts
cd frontend/admin
```

### 2.2 安装核心依赖

```bash
# Naive UI 组件库
npm install naive-ui

# 状态管理
npm install pinia

# 路由
npm install vue-router@4

# HTTP 请求
npm install axios

# 原子化 CSS
npm install -D unocss @unocss/preset-uno @unocss/preset-icons

# Naive UI 自动导入
npm install -D unplugin-auto-import unplugin-vue-components

# 图标
npm install -D @vicons/ionicons5

# 工具库
npm install @vueuse/core dayjs

# 类型
npm install -D @types/node
```
现在到









### 2.3 配置 vite.config.ts

```typescript
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import UnoCSS from 'unocss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    AutoImport({
      imports: [
        'vue',
        'vue-router',
        'pinia',
        { 'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar'] }
      ],
      dts: 'src/auto-imports.d.ts',
    }),
    Components({
      resolvers: [NaiveUiResolver()],
      dts: 'src/components.d.ts',
    }),
    UnoCSS(),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 3000,
    proxy: {
      '/admin': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
      '/api': {
        target: 'http://127.0.0.1:8000',
        changeOrigin: true,
      },
    },
  },
})
```

### 2.4 配置 UnoCSS (`uno.config.ts`)

```typescript
import { defineConfig, presetUno, presetIcons } from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetIcons(),
  ],
  shortcuts: {
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
  },
})
```

### 2.5 创建基础目录结构

```bash
mkdir -p src/api          # 接口请求
mkdir -p src/assets       # 静态资源
mkdir -p src/components   # 公共组件
mkdir -p src/composables  # 组合式函数 (hooks)
mkdir -p src/layout       # 布局组件
mkdir -p src/router       # 路由
mkdir -p src/stores       # Pinia 状态
mkdir -p src/styles       # 全局样式
mkdir -p src/utils        # 工具函数
mkdir -p src/views        # 页面组件
mkdir -p public           # 静态文件
```

### 2.6 配置 Axios 请求封装

创建 `src/utils/request.ts`：

```typescript
import axios from 'axios'
import { createDiscreteApi } from 'naive-ui'

const { message } = createDiscreteApi(['message'])

const service = axios.create({
  baseURL: import.meta.env.VITE_API_BASE || '',
  timeout: 15000,
})

// 请求拦截器
service.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data
    if (res.code !== 0) {
      message.error(res.msg || '请求失败')
      if (res.code === 401) {
        localStorage.removeItem('token')
        window.location.href = '/login'
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    }
    return res
  },
  (error) => {
    message.error(error.message || '网络错误')
    return Promise.reject(error)
  }
)

export default service
```

### 2.7 配置环境变量 (`.env.development`)

```env
VITE_API_BASE = http://127.0.0.1:8000
VITE_APP_TITLE = SwiftAdmin
```

### 2.8 验证前端能启动

```bash
npm run dev
# 浏览器访问 http://localhost:3000
# 应看到 Vite + Vue 默认页面
```

**检查点 ✓**：`npm run dev` 成功启动，浏览器显示 Vite + Vue 页面，控制台无报错。

---

## 第三步：数据库设计与迁移

### 3.1 创建数据库迁移文件

> 不使用 TP6 原生 migration，用手写 SQL 更可控。

创建 `database/install.sql`：

```sql
-- ============================================
-- SwiftAdmin 数据库安装脚本 v1.0
-- ============================================

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- -------------------------------------------
-- 1. 管理员表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_admin`;
CREATE TABLE `swift_admin` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL COMMENT '用户名',
  `password` varchar(128) NOT NULL COMMENT '密码(hash)',
  `nickname` varchar(64) DEFAULT '' COMMENT '昵称',
  `email` varchar(128) DEFAULT '' COMMENT '邮箱',
  `mobile` varchar(16) DEFAULT '' COMMENT '手机号',
  `avatar` varchar(255) DEFAULT '' COMMENT '头像',
  `role_id` int(11) unsigned DEFAULT 0 COMMENT '角色ID',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态:0禁用,1启用',
  `last_login_ip` varchar(64) DEFAULT '' COMMENT '最后登录IP',
  `last_login_time` int(11) DEFAULT NULL COMMENT '最后登录时间',
  `create_time` int(11) DEFAULT NULL COMMENT '创建时间',
  `update_time` int(11) DEFAULT NULL COMMENT '更新时间',
  `delete_time` int(11) DEFAULT NULL COMMENT '删除时间(软删除)',
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`),
  KEY `idx_role_id` (`role_id`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员表';

-- 插入默认管理员 (密码: admin123)
INSERT INTO `swift_admin` (`id`, `username`, `password`, `nickname`, `role_id`, `status`, `create_time`) VALUES
(1, 'admin', '$2y$10$...', '超级管理员', 1, 1, UNIX_TIMESTAMP());

-- -------------------------------------------
-- 2. 角色表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_role`;
CREATE TABLE `swift_role` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL COMMENT '角色名称',
  `description` varchar(255) DEFAULT '' COMMENT '描述',
  `rules` text COMMENT '权限规则(JSON)',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='角色表';

INSERT INTO `swift_role` (`id`, `name`, `description`, `status`, `create_time`) VALUES
(1, '超级管理员', '拥有所有权限', 1, UNIX_TIMESTAMP());

-- -------------------------------------------
-- 3. 菜单规则表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_menu`;
CREATE TABLE `swift_menu` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `parent_id` int(11) unsigned DEFAULT 0 COMMENT '父级ID',
  `name` varchar(64) NOT NULL COMMENT '路由名称',
  `title` varchar(64) NOT NULL COMMENT '菜单标题',
  `icon` varchar(64) DEFAULT '' COMMENT '图标',
  `path` varchar(128) DEFAULT '' COMMENT '路由路径',
  `component` varchar(128) DEFAULT '' COMMENT '组件路径',
  `type` tinyint(1) DEFAULT 1 COMMENT '类型:1目录,2菜单,3按钮',
  `permission` varchar(128) DEFAULT '' COMMENT '权限标识',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态',
  `sort` int(11) DEFAULT 0 COMMENT '排序',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_parent_id` (`parent_id`),
  KEY `idx_type` (`type`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='菜单规则表';

-- 插入默认菜单
INSERT INTO `swift_menu` (`id`, `parent_id`, `name`, `title`, `icon`, `path`, `component`, `type`, `permission`, `sort`, `create_time`) VALUES
(1, 0, 'dashboard', '控制台', 'HomeOutline', '/dashboard', 'views/dashboard/index', 1, '', 1, UNIX_TIMESTAMP()),
(2, 0, 'auth', '权限管理', 'ShieldOutline', '/auth', '', 1, '', 2, UNIX_TIMESTAMP()),
(3, 2, 'admin', '管理员管理', '', '/auth/admin', 'views/auth/admin', 2, 'auth:admin:list', 1, UNIX_TIMESTAMP()),
(4, 2, 'role', '角色管理', '', '/auth/role', 'views/auth/role', 2, 'auth:role:list', 2, UNIX_TIMESTAMP()),
(5, 2, 'menu', '菜单规则', '', '/auth/menu', 'views/auth/menu', 2, 'auth:menu:list', 3, UNIX_TIMESTAMP()),
(6, 2, 'log', '管理员日志', '', '/auth/log', 'views/auth/log', 2, 'auth:log:list', 4, UNIX_TIMESTAMP()),
(7, 0, 'user', '会员管理', 'PeopleOutline', '/user', '', 1, '', 3, UNIX_TIMESTAMP()),
(8, 7, 'user-list', '会员列表', '', '/user/index', 'views/user/index', 2, 'user:list', 1, UNIX_TIMESTAMP()),
(9, 7, 'user-group', '会员分组', '', '/user/group', 'views/user/group', 2, 'user:group:list', 2, UNIX_TIMESTAMP()),
(10, 0, 'system', '系统管理', 'SettingsOutline', '/system', '', 1, '', 4, UNIX_TIMESTAMP()),
(11, 10, 'config', '系统配置', '', '/system/config', 'views/system/config', 2, 'system:config', 1, UNIX_TIMESTAMP()),
(12, 10, 'attachment', '附件管理', '', '/system/attachment', 'views/system/attachment', 2, 'system:attachment:list', 2, UNIX_TIMESTAMP()),
(13, 0, 'data', '数据管理', 'ServerOutline', '/data', '', 1, '', 5, UNIX_TIMESTAMP()),
(14, 13, 'recycle', '回收站', '', '/data/recycle', 'views/data/recycle', 2, 'data:recycle:list', 1, UNIX_TIMESTAMP()),
(15, 0, 'generator', '代码生成', 'CodeOutline', '/generator', 'views/generator/index', 1, '', 6, UNIX_TIMESTAMP()),
(16, 0, 'profile', '个人资料', 'PersonOutline', '/profile', 'views/profile/index', 2, '', 7, UNIX_TIMESTAMP());

-- -------------------------------------------
-- 4. 管理员日志表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_admin_log`;
CREATE TABLE `swift_admin_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) unsigned DEFAULT 0,
  `username` varchar(32) DEFAULT '',
  `title` varchar(128) DEFAULT '' COMMENT '操作标题',
  `url` varchar(255) DEFAULT '' COMMENT '请求URL',
  `method` varchar(10) DEFAULT '' COMMENT '请求方法',
  `ip` varchar(64) DEFAULT '' COMMENT 'IP地址',
  `useragent` varchar(255) DEFAULT '',
  `params` text COMMENT '请求参数',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态',
  `time_cost` decimal(10,4) DEFAULT 0 COMMENT '耗时(秒)',
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_admin_id` (`admin_id`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='管理员日志表';

-- -------------------------------------------
-- 5. 系统配置表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_config`;
CREATE TABLE `swift_config` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL COMMENT '配置键名',
  `group` varchar(32) DEFAULT 'site' COMMENT '分组',
  `value` text COMMENT '配置值',
  `type` varchar(16) DEFAULT 'string' COMMENT '值类型',
  `description` varchar(255) DEFAULT '' COMMENT '说明',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_name` (`name`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='系统配置表';

INSERT INTO `swift_config` (`name`, `group`, `value`, `type`, `description`) VALUES
('site_name', 'site', 'SwiftAdmin', 'string', '站点名称'),
('site_logo', 'site', '', 'string', 'LOGO'),
('site_icp', 'site', '', 'string', '备案号'),
('upload_driver', 'upload', 'local', 'string', '上传驱动'),
('upload_max_size', 'upload', '10485760', 'number', '最大上传(字节)'),
('upload_allowed_ext', 'upload', 'jpg,jpeg,png,gif,doc,docx,pdf,zip', 'string', '允许格式');

-- -------------------------------------------
-- 6. 附件表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_attachment`;
CREATE TABLE `swift_attachment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) unsigned DEFAULT 0 COMMENT '上传管理员',
  `user_id` int(11) unsigned DEFAULT 0 COMMENT '上传会员',
  `name` varchar(255) DEFAULT '' COMMENT '原始文件名',
  `path` varchar(255) DEFAULT '' COMMENT '存储路径',
  `url` varchar(255) DEFAULT '' COMMENT '访问URL',
  `ext` varchar(16) DEFAULT '' COMMENT '扩展名',
  `size` bigint(20) DEFAULT 0 COMMENT '文件大小',
  `mime` varchar(128) DEFAULT '' COMMENT 'MIME类型',
  `storage` varchar(32) DEFAULT 'local' COMMENT '存储方式',
  `sha1` varchar(64) DEFAULT '' COMMENT 'SHA1',
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_admin_id` (`admin_id`),
  KEY `idx_ext` (`ext`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='附件表';

-- -------------------------------------------
-- 7. 回收站表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_recycle`;
CREATE TABLE `swift_recycle` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `table_name` varchar(64) NOT NULL COMMENT '原表名',
  `data_id` int(11) unsigned NOT NULL COMMENT '原数据ID',
  `data` longtext COMMENT '序列化的完整数据',
  `admin_id` int(11) unsigned DEFAULT 0 COMMENT '操作人',
  `create_time` int(11) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  KEY `idx_table_data` (`table_name`, `data_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='回收站表';

-- -------------------------------------------
-- 8. 会员表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_user`;
CREATE TABLE `swift_user` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `username` varchar(32) NOT NULL,
  `password` varchar(128) NOT NULL,
  `nickname` varchar(64) DEFAULT '',
  `email` varchar(128) DEFAULT '',
  `mobile` varchar(16) DEFAULT '',
  `avatar` varchar(255) DEFAULT '',
  `group_id` int(11) unsigned DEFAULT 0 COMMENT '分组ID',
  `level` tinyint(2) DEFAULT 1 COMMENT '等级',
  `balance` decimal(10,2) DEFAULT 0.00 COMMENT '余额',
  `score` int(11) DEFAULT 0 COMMENT '积分',
  `gender` tinyint(1) DEFAULT 0 COMMENT '0未知1男2女',
  `status` tinyint(1) DEFAULT 1,
  `last_login_ip` varchar(64) DEFAULT '',
  `last_login_time` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  `delete_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_username` (`username`),
  KEY `idx_mobile` (`mobile`),
  KEY `idx_group_id` (`group_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员表';

-- -------------------------------------------
-- 9. 会员分组表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_user_group`;
CREATE TABLE `swift_user_group` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` varchar(255) DEFAULT '',
  `rules` text COMMENT '权限JSON',
  `status` tinyint(1) DEFAULT 1,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='会员分组表';

-- -------------------------------------------
-- 10. 新增：工作流定义表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_workflow_definition`;
CREATE TABLE `swift_workflow_definition` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `description` varchar(255) DEFAULT '',
  `category_id` int(11) DEFAULT 0,
  `nodes` longtext COMMENT '节点JSON',
  `edges` longtext COMMENT '连线JSON',
  `status` tinyint(1) DEFAULT 1,
  `version` int(11) DEFAULT 1,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工作流定义表';

-- -------------------------------------------
-- 11. 新增：工作流实例表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_workflow_instance`;
CREATE TABLE `swift_workflow_instance` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `definition_id` int(11) unsigned NOT NULL,
  `title` varchar(128) DEFAULT '',
  `form_data` text COMMENT '表单数据JSON',
  `status` tinyint(1) DEFAULT 0 COMMENT '0进行中1通过2驳回3撤回',
  `applicant_id` int(11) unsigned DEFAULT 0,
  `current_node` varchar(64) DEFAULT '',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_definition` (`definition_id`),
  KEY `idx_applicant` (`applicant_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工作流实例表';

-- -------------------------------------------
-- 12. 新增：工作流审批记录
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_workflow_record`;
CREATE TABLE `swift_workflow_record` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `instance_id` int(11) unsigned NOT NULL,
  `node_id` varchar(64) DEFAULT '',
  `assignee_id` int(11) unsigned DEFAULT 0 COMMENT '审批人',
  `action` varchar(16) DEFAULT '' COMMENT 'agree/reject/transfer',
  `comment` text COMMENT '审批意见',
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_instance` (`instance_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='工作流审批记录';

-- -------------------------------------------
-- 13. 新增：CMS 文章表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_cms_article`;
CREATE TABLE `swift_cms_article` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int(11) unsigned DEFAULT 0,
  `title` varchar(255) NOT NULL,
  `content` longtext COMMENT '内容',
  `cover` varchar(255) DEFAULT '' COMMENT '封面图',
  `summary` varchar(512) DEFAULT '' COMMENT '摘要',
  `tags` varchar(255) DEFAULT '' COMMENT '标签(逗号分隔)',
  `author` varchar(64) DEFAULT '',
  `seo_title` varchar(255) DEFAULT '',
  `seo_keywords` varchar(255) DEFAULT '',
  `seo_description` varchar(512) DEFAULT '',
  `views` int(11) unsigned DEFAULT 0,
  `status` tinyint(1) DEFAULT 1 COMMENT '0草稿1发布',
  `publish_time` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_category` (`category_id`),
  KEY `idx_status` (`status`),
  KEY `idx_publish_time` (`publish_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='CMS文章表';

-- -------------------------------------------
-- 14. 新增：消息通知表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_notification`;
CREATE TABLE `swift_notification` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `user_id` int(11) unsigned DEFAULT 0,
  `type` varchar(32) DEFAULT 'system' COMMENT 'system/approval/message',
  `title` varchar(255) DEFAULT '',
  `content` text,
  `target_url` varchar(255) DEFAULT '',
  `is_read` tinyint(1) DEFAULT 0,
  `read_time` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_user_read` (`user_id`, `is_read`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='消息通知表';

-- -------------------------------------------
-- 15. 新增：定时任务表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_cron_job`;
CREATE TABLE `swift_cron_job` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL,
  `command` varchar(255) NOT NULL,
  `cron_expression` varchar(32) NOT NULL,
  `description` varchar(255) DEFAULT '',
  `status` tinyint(1) DEFAULT 1,
  `last_run_time` int(11) DEFAULT NULL,
  `next_run_time` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='定时任务表';

-- -------------------------------------------
-- 16. 新增：定时任务执行日志
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_cron_log`;
CREATE TABLE `swift_cron_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `job_id` int(11) unsigned NOT NULL,
  `status` tinyint(1) DEFAULT 1 COMMENT '0失败1成功',
  `output` text COMMENT '输出内容',
  `time_cost` decimal(10,4) DEFAULT 0,
  `create_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_job_id` (`job_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='定时任务日志';

-- -------------------------------------------
-- 17. 新增：租户表
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_tenant`;
CREATE TABLE `swift_tenant` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL COMMENT '租户名称',
  `domain` varchar(128) DEFAULT '' COMMENT '独立域名',
  `logo` varchar(255) DEFAULT '',
  `theme_color` varchar(16) DEFAULT '#18A058',
  `package_id` int(11) DEFAULT 0 COMMENT '套餐ID',
  `expire_time` int(11) DEFAULT NULL COMMENT '到期时间',
  `status` tinyint(1) DEFAULT 1,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_domain` (`domain`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='租户表';

-- -------------------------------------------
-- 18. 新增：支付单
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_payment`;
CREATE TABLE `swift_payment` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `order_no` varchar(32) NOT NULL COMMENT '订单号',
  `user_id` int(11) unsigned DEFAULT 0,
  `channel` varchar(16) NOT NULL COMMENT 'wechat/alipay',
  `amount` decimal(10,2) NOT NULL,
  `subject` varchar(255) DEFAULT '' COMMENT '商品描述',
  `status` tinyint(1) DEFAULT 0 COMMENT '0待支付1已支付2已退款',
  `pay_time` int(11) DEFAULT NULL,
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uk_order_no` (`order_no`),
  KEY `idx_user_id` (`user_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='支付单';

SET FOREIGN_KEY_CHECKS = 1;
```

### 3.2 执行 SQL

```bash
mysql -u root -p swiftadmin < database/install.sql
```

**检查点 ✓**：数据库中 18 张表全部创建成功，`swift_admin` 表中有默认 admin 用户。

---

## 第四步：RBAC 权限系统（登录/角色/菜单）

### 4.1 后端 - 创建基础控制器

创建 `app/common/controller/Base.php`（公共基类）：

```php
<?php
namespace app\common\controller;

use think\facade\Validate;

class Base
{
    protected function success($data = [], $msg = 'success', $code = 0)
    {
        return json(['code' => $code, 'msg' => $msg, 'data' => $data]);
    }

    protected function error($msg = 'error', $code = 1, $data = [])
    {
        return json(['code' => $code, 'msg' => $msg, 'data' => $data]);
    }
}
```

创建 `app/admin/controller/Base.php`（后台基类，含鉴权）：

```php
<?php
namespace app\admin\controller;

use app\common\controller\Base as CommonBase;
use think\facade\Request;

class Base extends CommonBase
{
    protected $adminId = 0;
    protected $adminInfo = [];

    protected function initialize()
    {
        $token = Request::header('Authorization');
        if (!$token) {
            // 开发阶段先跳过鉴权，后续加上
            $this->adminId = 1;
            return;
        }
        // 验证 token，获取管理员信息
        // TODO: JWT 验证逻辑
    }
}
```

### 4.2 后端 - JWT 工具类

创建 `app/common/service/TokenService.php`：

```php
<?php
namespace app\common\service;

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

class TokenService
{
    private static $key = 'swiftadmin_secret_key_2026';
    private static $expire = 86400; // 24小时

    public static function create($uid, $username)
    {
        $payload = [
            'iss' => 'swiftadmin',
            'iat' => time(),
            'exp' => time() + self::$expire,
            'uid' => $uid,
            'username' => $username,
        ];
        return JWT::encode($payload, self::$key, 'HS256');
    }

    public static function verify($token)
    {
        try {
            $decoded = JWT::decode(str_replace('Bearer ', '', $token), new Key(self::$key, 'HS256'));
            return (array)$decoded;
        } catch (\Exception $e) {
            return false;
        }
    }
}
```

### 4.3 后端 - 登录接口

创建 `app/admin/controller/Auth.php`：

```php
<?php
namespace app\admin\controller;

use app\common\service\TokenService;
use think\facade\Db;
use think\facade\Request;

class Auth extends Base
{
    /**
     * 登录
     * POST /admin/auth/login
     * Body: { username, password }
     */
    public function login()
    {
        $username = Request::post('username', '');
        $password = Request::post('password', '');

        if (empty($username) || empty($password)) {
            return $this->error('用户名和密码不能为空');
        }

        $admin = Db::name('admin')->where('username', $username)->find();
        if (!$admin) {
            return $this->error('用户名或密码错误');
        }

        if (!password_verify($password, $admin['password'])) {
            return $this->error('用户名或密码错误');
        }

        if ($admin['status'] != 1) {
            return $this->error('账号已被禁用');
        }

        // 更新登录信息
        Db::name('admin')->where('id', $admin['id'])->update([
            'last_login_ip' => Request::ip(),
            'last_login_time' => time(),
        ]);

        // 生成 Token
        $token = TokenService::create($admin['id'], $admin['username']);

        $data = [
            'token' => $token,
            'id' => $admin['id'],
            'username' => $admin['username'],
            'nickname' => $admin['nickname'],
            'avatar' => $admin['avatar'],
        ];

        return $this->success($data, '登录成功');
    }

    /**
     * 获取当前用户信息
     * GET /admin/auth/info
     */
    public function info()
    {
        $admin = Db::name('admin')->where('id', $this->adminId)->find();
        if (!$admin) {
            return $this->error('用户不存在', 401);
        }
        unset($admin['password']);
        return $this->success($admin);
    }

    /**
     * 获取用户权限（菜单 + 权限标识）
     * GET /admin/auth/permissions
     */
    public function permissions()
    {
        // 获取角色权限
        $role = Db::name('role')->where('id', 1)->find(); // 简化处理
        $rules = $role['rules'] ?? '';

        // 获取菜单
        $menus = Db::name('menu')
            ->where('status', 1)
            ->where('type', 'in', [1, 2]) // 目录和菜单
            ->order('sort', 'asc')
            ->select()
            ->toArray();

        // 构建树形菜单
        $menuTree = $this->buildTree($menus, 0);

        return $this->success([
            'menus' => $menuTree,
            'permissions' => $rules,
        ]);
    }

    /**
     * 退出登录
     * POST /admin/auth/logout
     */
    public function logout()
    {
        return $this->success([], '退出成功');
    }

    // 工具方法：构建树形结构
    private function buildTree($items, $parentId = 0)
    {
        $tree = [];
        foreach ($items as $item) {
            if ($item['parent_id'] == $parentId) {
                $children = $this->buildTree($items, $item['id']);
                if (!empty($children)) {
                    $item['children'] = $children;
                }
                $tree[] = $item;
            }
        }
        return $tree;
    }
}
```

### 4.4 后端 - 角色管理控制器

创建 `app/admin/controller/Role.php`：

```php
<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Role extends Base
{
    public function index()
    {
        $list = Db::name('role')->order('id', 'asc')->select();
        return $this->success(['list' => $list]);
    }

    public function save()
    {
        $data = Request::only(['name', 'description', 'rules', 'status']);
        $data['create_time'] = time();
        Db::name('role')->insert($data);
        return $this->success([], '添加成功');
    }

    public function update()
    {
        $id = Request::param('id');
        $data = Request::only(['name', 'description', 'rules', 'status']);
        $data['update_time'] = time();
        Db::name('role')->where('id', $id)->update($data);
        return $this->success([], '更新成功');
    }

    public function delete($id)
    {
        if ($id == 1) {
            return $this->error('超级管理员角色不可删除');
        }
        Db::name('role')->where('id', $id)->delete();
        return $this->success([], '删除成功');
    }
}
```

### 4.5 后端 - 菜单管理控制器

创建 `app/admin/controller/Menu.php`：

```php
<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class Menu extends Base
{
    public function index()
    {
        $list = Db::name('menu')
            ->order('sort', 'asc')
            ->select()
            ->toArray();
        $tree = $this->buildTree($list);
        return $this->success(['list' => $tree]);
    }

    public function save()
    {
        $data = Request::only(['parent_id', 'name', 'title', 'icon', 'path', 'component', 'type', 'permission', 'sort']);
        $data['create_time'] = time();
        Db::name('menu')->insert($data);
        return $this->success([], '添加成功');
    }

    public function update()
    {
        $id = Request::param('id');
        $data = Request::only(['parent_id', 'name', 'title', 'icon', 'path', 'component', 'type', 'permission', 'sort']);
        $data['update_time'] = time();
        Db::name('menu')->where('id', $id)->update($data);
        return $this->success([], '更新成功');
    }

    public function delete($id)
    {
        $children = Db::name('menu')->where('parent_id', $id)->find();
        if ($children) {
            return $this->error('请先删除子菜单');
        }
        Db::name('menu')->where('id', $id)->delete();
        return $this->success([], '删除成功');
    }

    private function buildTree($items, $parentId = 0)
    {
        $tree = [];
        foreach ($items as $item) {
            if ($item['parent_id'] == $parentId) {
                $children = $this->buildTree($items, $item['id']);
                if (!empty($children)) {
                    $item['children'] = $children;
                }
                $tree[] = $item;
            }
        }
        return $tree;
    }
}
```

### 4.6 后端 - 注册路由

创建 `app/admin/route/route.php`：

```php
<?php
use think\facade\Route;

Route::post('auth/login', 'Auth/login');
Route::get('auth/info', 'Auth/info');
Route::get('auth/permissions', 'Auth/permissions');
Route::post('auth/logout', 'Auth/logout');

Route::get('role/index', 'Role/index');
Route::post('role/save', 'Role/save');
Route::put('role/update', 'Role/update');
Route::delete('role/delete/:id', 'Role/delete');

Route::get('menu/index', 'Menu/index');
Route::post('menu/save', 'Menu/save');
Route::put('menu/update', 'Menu/update');
Route::delete('menu/delete/:id', 'Menu/delete');
```

### 4.7 后端 - 测试 API 接口

用 curl 或 Postman 测试登录接口：

```bash
curl -X POST http://127.0.0.1:8000/admin/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'

# 应返回:
# {"code":0,"msg":"登录成功","data":{"token":"eyJ...","username":"admin"...}}
```

**检查点 ✓**：登录接口返回 token，菜单接口返回树形菜单数据。

### 4.8 前端 - 创建登录页面

创建 `src/views/login/index.vue`：

```vue
<template>
  <div class="login-container">
    <n-card class="login-card" title="SwiftAdmin 登录">
      <n-form ref="formRef" :model="form" :rules="rules">
        <n-form-item path="username" label="用户名">
          <n-input v-model:value="form.username" placeholder="请输入用户名" />
        </n-form-item>
        <n-form-item path="password" label="密码">
          <n-input v-model:value="form.password" type="password" placeholder="请输入密码"
            @keyup.enter="handleLogin" />
        </n-form-item>
        <n-button type="primary" block :loading="loading" @click="handleLogin">
          登 录
        </n-button>
      </n-form>
    </n-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '@/stores/user'

const router = useRouter()
const userStore = useUserStore()
const loading = ref(false)
const form = reactive({ username: 'admin', password: 'admin123' })
const rules = {
  username: { required: true, message: '请输入用户名', trigger: 'blur' },
  password: { required: true, message: '请输入密码', trigger: 'blur' },
}

async function handleLogin() {
  loading.value = true
  try {
    await userStore.login(form)
    router.push('/dashboard')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
}
.login-card {
  width: 400px;
}
</style>
```

### 4.9 前端 - Pinia User Store

创建 `src/stores/user.ts`：

```typescript
import { defineStore } from 'pinia'
import { loginApi, getInfoApi, getPermissionsApi } from '@/api/auth'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: localStorage.getItem('token') || '',
    info: {} as any,
    menus: [] as any[],
    permissions: [] as string[],
  }),
  actions: {
    async login(form: { username: string; password: string }) {
      const res = await loginApi(form)
      this.token = res.data.token
      localStorage.setItem('token', res.data.token)
      await this.getInfo()
      await this.getPermissions()
    },
    async getInfo() {
      const res = await getInfoApi()
      this.info = res.data
    },
    async getPermissions() {
      const res = await getPermissionsApi()
      this.menus = res.data.menus
      this.permissions = res.data.permissions
    },
    logout() {
      this.token = ''
      this.info = {}
      this.menus = []
      this.permissions = []
      localStorage.removeItem('token')
    },
  },
})
```

### 4.10 前端 - Auth API

创建 `src/api/auth.ts`：

```typescript
import request from '@/utils/request'

export function loginApi(data: { username: string; password: string }) {
  return request.post('/admin/auth/login', data)
}
export function getInfoApi() {
  return request.get('/admin/auth/info')
}
export function getPermissionsApi() {
  return request.get('/admin/auth/permissions')
}
export function logoutApi() {
  return request.post('/admin/auth/logout')
}
```

### 4.11 前端 - 路由配置

创建 `src/router/index.ts`：

```typescript
import { createRouter, createWebHashHistory } from 'vue-router'
import type { RouteRecordRaw } from 'vue-router'

const routes: RouteRecordRaw[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '/',
    redirect: '/dashboard',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index.vue'),
      },
    ],
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

// 路由守卫
router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token')
  if (to.path !== '/login' && !token) {
    next('/login')
  } else {
    next()
  }
})

export default router
```

**检查点 ✓**：前端能成功登录，跳转到 `/dashboard`，控制台网络请求正常。

---

## 第五步：管理后台基础布局框架

### 5.1 前端 - 布局组件

创建 `src/layout/index.vue`（管理后台主布局）：

```vue
<template>
  <n-layout class="layout" has-sider>
    <!-- 侧边栏 -->
    <n-layout-sider
      bordered
      collapse-mode="width"
      :collapsed-width="64"
      :width="240"
      :collapsed="collapsed"
      @update:collapsed="collapsed = $event"
    >
      <div class="logo" flex-center>
        <span v-if="!collapsed" class="logo-text">SwiftAdmin</span>
        <span v-else class="logo-text-sm">SA</span>
      </div>
      <n-menu
        :collapsed="collapsed"
        :value="activeKey"
        :options="menuOptions"
        @update:value="handleMenuClick"
      />
    </n-layout-sider>

    <!-- 右侧内容区 -->
    <n-layout>
      <!-- 顶栏 -->
      <n-layout-header bordered class="header" flex-between>
        <div flex items-center>
          <n-button text @click="collapsed = !collapsed">
            <n-icon size="20"><MenuOutline /></n-icon>
          </n-button>
          <n-breadcrumb class="ml-4">
            <n-breadcrumb-item v-for="item in breadcrumbs" :key="item.path">
              {{ item.title }}
            </n-breadcrumb-item>
          </n-breadcrumb>
        </div>
        <div flex items-center gap-3>
          <n-tooltip trigger="hover">
            <template #trigger>
              <n-button text @click="toggleDark">
                <n-icon size="20"><MoonOutline v-if="!isDark" /><SunnyOutline v-else /></n-icon>
              </n-button>
            </template>
            切换暗黑模式
          </n-tooltip>
          <n-dropdown :options="userOptions" @select="handleUserAction">
            <div flex items-center cursor-pointer>
              <n-avatar :size="32" round>{{ userStore.info.nickname?.charAt(0) || 'A' }}</n-avatar>
              <span class="ml-2">{{ userStore.info.nickname || 'Admin' }}</span>
            </div>
          </n-dropdown>
        </div>
      </n-layout-header>

      <!-- 标签页 -->
      <n-tabs
        v-model:value="activeTab"
        type="card"
        closable
        @close="closeTab"
        class="tabs"
      >
        <n-tab-pane v-for="tab in tabs" :key="tab.path" :name="tab.path" :tab="tab.title" />
      </n-tabs>

      <!-- 主内容 -->
      <n-layout-content class="content">
        <router-view />
      </n-layout-content>
    </n-layout>
  </n-layout>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/stores/user'
import { useDark, useToggle } from '@vueuse/core'
import { MenuOutline, MoonOutline, SunnyOutline } from '@vicons/ionicons5'

const router = useRouter()
const route = useRoute()
const userStore = useUserStore()

const collapsed = ref(false)
const isDark = useDark()
const toggleDark = useToggle(isDark)

// 菜单（从后端动态获取的树形数据转为 NaiveUI menu options）
const menuOptions = computed(() => transformMenus(userStore.menus))

const activeKey = ref(route.path)
const tabs = ref([{ path: '/dashboard', title: '控制台' }])
const activeTab = ref('/dashboard')

const breadcrumbs = computed(() => {
  // 根据当前路由生成面包屑
  return [{ path: '/', title: '首页' }, { path: route.path, title: route.meta?.title || '' }]
})

const userOptions = [
  { key: 'profile', label: '个人资料' },
  { key: 'logout', label: '退出登录' },
]

function handleMenuClick(key: string) {
  router.push(key)
  activeKey.value = key
  // 添加标签页逻辑
}

function closeTab(path: string) {
  tabs.value = tabs.value.filter(t => t.path !== path)
}

function handleUserAction(key: string) {
  if (key === 'logout') {
    userStore.logout()
    router.push('/login')
  } else if (key === 'profile') {
    router.push('/profile')
  }
}

function transformMenus(menus: any[]): any[] {
  return menus.map(m => ({
    label: m.title,
    key: m.path,
    icon: m.icon ? () => null : undefined, // 图标映射
    children: m.children ? transformMenus(m.children) : undefined,
  }))
}
</script>

<style scoped>
.layout { min-height: 100vh; }
.logo { height: 64px; font-size: 18px; font-weight: bold; }
.header { height: 64px; padding: 0 16px; }
.tabs { padding: 0 16px; }
.content { padding: 16px; background: var(--n-color); min-height: calc(100vh - 160px); }
</style>
```

**检查点 ✓**：登录后能看到完整的后台布局（侧边栏菜单 + 顶栏 + 主内容区），暗黑模式切换正常。

---

### 之后步骤的简要说明

> 由于文档篇幅限制，第六步到第三十步均按以下统一模式开发，每个模块都遵循 **后端 → 前端** 的开发顺序：

## 通用开发模式（适用于所有后续步骤）

### 每个功能模块的标准开发流程：

```
1. 后端 - 创建 Model（如需要）
2. 后端 - 创建 Controller（index/save/update/delete 四个基础方法）
3. 后端 - 创建 Validate（验证规则）
4. 后端 - 注册路由（CRUD 五条路由）
5. 后端 - 自测（curl/Postman 验证接口）
6. 前端 - 创建 API 文件
7. 前端 - 创建列表页面（表格 + 搜索 + 分页）
8. 前端 - 创建弹窗表单（新增/编辑共用一个弹窗）
9. 前端 - 注册路由
10. 前端 - 联调测试
11. Git commit
```

### 标准 Controller 模板

```php
<?php
namespace app\admin\controller;

use think\facade\Db;
use think\facade\Request;

class XxxController extends Base
{
    protected $table = 'swift_xxx';

    // 列表（带分页和搜索）
    public function index()
    {
        $page  = Request::get('page', 1);
        $limit = Request::get('limit', 15);
        $keyword = Request::get('keyword', '');

        $query = Db::name($this->table);
        if ($keyword) {
            $query->where('name', 'like', "%{$keyword}%");
        }
        $list = $query->page($page, $limit)->order('id', 'desc')->select();
        $total = $query->count();

        return $this->success(['list' => $list, 'total' => $total, 'page' => $page, 'limit' => $limit]);
    }

    // 新增
    public function save()
    {
        $data = Request::only(['name', '...']);  // 白名单字段
        $data['create_time'] = time();
        Db::name($this->table)->insert($data);
        return $this->success([], '添加成功');
    }

    // 更新
    public function update()
    {
        $id = Request::param('id');
        $data = Request::only(['name', '...']);
        $data['update_time'] = time();
        Db::name($this->table)->where('id', $id)->update($data);
        return $this->success([], '更新成功');
    }

    // 删除（软删除）
    public function delete($id)
    {
        Db::name($this->table)->where('id', $id)->update(['delete_time' => time()]);
        return $this->success([], '删除成功');
    }
}
```

### 标准前端列表页模板

```vue
<template>
  <div>
    <!-- 搜索区域 -->
    <n-card class="mb-4">
      <n-form inline>
        <n-form-item label="关键词">
          <n-input v-model:value="searchForm.keyword" placeholder="请输入搜索关键词" />
        </n-form-item>
        <n-button type="primary" @click="handleSearch">搜索</n-button>
        <n-button class="ml-2" @click="handleAdd">新增</n-button>
      </n-form>
    </n-card>

    <!-- 数据表格 -->
    <n-card>
      <n-data-table
        :columns="columns"
        :data="tableData"
        :loading="loading"
        :pagination="pagination"
        @update:page="handlePageChange"
      />
    </n-card>

    <!-- 弹窗表单 -->
    <n-modal v-model:show="showModal" :title="modalTitle">
      <n-form ref="formRef" :model="formData" :rules="rules">
        <n-form-item label="名称" path="name">
          <n-input v-model:value="formData.name" placeholder="请输入名称" />
        </n-form-item>
        <!-- 更多表单项... -->
      </n-form>
      <template #action>
        <n-button @click="showModal = false">取消</n-button>
        <n-button type="primary" :loading="submitLoading" @click="handleSubmit">确定</n-button>
      </template>
    </n-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, h } from 'vue'
import { NButton, NSpace, NTag, useMessage } from 'naive-ui'
import { getListApi, saveApi, updateApi, deleteApi } from '@/api/xxx'

const message = useMessage()
const loading = ref(false)
const tableData = ref([])
const showModal = ref(false)
const submitLoading = ref(false)
const editId = ref(0)

const searchForm = reactive({ keyword: '' })
const formData = reactive({ name: '' })

const modalTitle = computed(() => editId.value ? '编辑' : '新增')

const columns = [
  { title: 'ID', key: 'id', width: 80 },
  { title: '名称', key: 'name' },
  { title: '创建时间', key: 'create_time', render: (row) => formatTime(row.create_time) },
  {
    title: '操作', key: 'actions', width: 180,
    render: (row) => h(NSpace, {}, {
      default: () => [
        h(NButton, { size: 'small', onClick: () => handleEdit(row) }, { default: () => '编辑' }),
        h(NButton, { size: 'small', type: 'error', onClick: () => handleDelete(row.id) }, { default: () => '删除' }),
      ]
    })
  },
]

const pagination = reactive({ page: 1, pageSize: 15, itemCount: 0 })

// 获取列表
async function fetchList() {
  loading.value = true
  try {
    const res = await getListApi({ ...searchForm, page: pagination.page, limit: pagination.pageSize })
    tableData.value = res.data.list
    pagination.itemCount = res.data.total
  } finally {
    loading.value = false
  }
}

function handleSearch() { pagination.page = 1; fetchList() }
function handlePageChange(page: number) { pagination.page = page; fetchList() }

function handleAdd() { editId.value = 0; Object.assign(formData, { name: '' }); showModal.value = true }
function handleEdit(row: any) { editId.value = row.id; Object.assign(formData, row); showModal.value = true }

async function handleSubmit() {
  submitLoading.value = true
  try {
    if (editId.value) {
      await updateApi({ id: editId.value, ...formData })
    } else {
      await saveApi(formData)
    }
    message.success(editId.value ? '更新成功' : '新增成功')
    showModal.value = false
    fetchList()
  } finally {
    submitLoading.value = false
  }
}

async function handleDelete(id: number) {
  await deleteApi(id)
  message.success('删除成功')
  fetchList()
}

onMounted(fetchList)
</script>
```

---

## 第六步至第三十步：所有模块清单

### 第六步：管理员管理模块
- [ ] 后端：AdminController (index/save/update/delete/status)
- [ ] 后端：AdminValidate 验证器
- [ ] 前端：列表页 + 弹窗表单（含角色选择）
- [ ] 密码哈希：新增/编辑时 password_hash()

### 第七步：系统配置模块
- [ ] 后端：ConfigController（按分组获取/保存配置）
- [ ] 后端：支持多种表单类型（input/textarea/image/select/switch）
- [ ] 前端：分组 Tab 页 + 动态表单渲染

### 第八步：附件管理模块
- [ ] 后端：AttachmentController (上传/列表/删除)
- [ ] 后端：支持本地/OSS/COS 存储驱动
- [ ] 前端：上传组件 + 网格视图 + 图片预览

### 第九步：会员管理模块
- [ ] 后端：UserController + UserGroupController
- [ ] 前端：会员列表 + 分组管理 + 余额/积分日志

### 第十步：数据回收站与审计
- [ ] 后端：RecycleController (列表/还原/彻底删除)
- [ ] 软删除自动入回收站逻辑（在 Model 事件中实现）
- [ ] 前端：回收站列表 + 数据恢复确认弹窗

### 第十一步：控制台仪表盘
- [ ] 后端：DashboardController (统计接口)
- [ ] 统计：用户数、管理员数、今日注册、API调用量
- [ ] 前端：ECharts 统计图表 + 指标卡片

### 第十二步：CRUD 代码生成器
- [ ] 后端：GeneratorController (数据表解析/字段设计/代码生成)
- [ ] 后端：支持24种表单组件的字段类型映射
- [ ] 后端：代码模板引擎（Controller/Model/Validate/Vue 页面模板）
- [ ] 后端：自动建表 SQL 生成
- [ ] 前端：拖拽式可视化字段设计器
- [ ] 前端：代码预览面板

### 第十三步：模块市场
- [ ] 后端：ModuleController (列表/安装/卸载/启用/禁用)
- [ ] 后端：模块包依赖管理
- [ ] 前端：模块卡片列表 + 一键安装按钮

### 第十四步：WEB 终端
- [ ] 后端：TerminalController (WebSocket 命令执行)
- [ ] 前端：xterm.js 终端组件

### 第十五步：AI 智能助手
- [ ] 后端：AiController (对话/流式输出)
- [ ] 后端：对接 OpenAI/DeepSeek API
- [ ] 前端：对话界面 + 流式输出渲染

### 第十六步：数据大屏
- [ ] 后端：DataScreenController (大屏数据接口)
- [ ] 前端：ECharts + WebSocket 实时大屏页面

### 第十七步：工作流引擎
- [ ] 后端：WorkflowController + WorkflowInstanceController
- [ ] 后端：审批逻辑（通过/驳回/转审/加签）
- [ ] 前端：LogicFlow 流程设计器
- [ ] 前端：待办/已办/抄送列表

### 第十八步：CMS 内容管理
- [ ] 后端：CmsCategoryController + CmsArticleController
- [ ] 前端：栏目树 + 文章编辑器（Tiptap 富文本）

### 第十九步：消息通知中心
- [ ] 后端：NotificationController + WebSocket 推送
- [ ] 前端：通知列表 + 未读角标

### 第二十步：H5 移动端
- [ ] 创建 `frontend/h5` 项目（Vue3 + Vant4）
- [ ] 移动端页面：首页/文章/我的/登录

### 第二十一步：uni-app 小程序端
- [ ] 创建 uni-app 项目
- [ ] 小程序页面：首页/文章/消息/我的

### 第二十二步：API 接口层 + Swagger 文档
- [ ] 创建 API v1 统一接口
- [ ] Swagger 注解 + 文档页面

### 第二十三步：定时任务可视化
- [ ] 后端：CronController (CRUD + 手动执行)
- [ ] 前端：任务管理 + 日志查看

### 第二十四步：多租户支持
- [ ] 后端：TenantController + 数据隔离中间件
- [ ] 前端：租户管理 + 套餐配置

### 第二十五步：多渠道支付
- [ ] 后端：PaymentController + 微信/支付宝 SDK
- [ ] 前端：支付单管理 + 退款

### 第二十六步：系统监控面板
- [ ] 后端：MonitorController (CPU/内存/磁盘/请求统计)
- [ ] 前端：监控仪表盘

### 第二十七步：Docker 部署配置
- [ ] Dockerfile + docker-compose.yml + nginx.conf
- [ ] 验证一键部署

### 第二十八步：一键安装脚本
- [ ] install.sh（环境检测 + 数据库创建 + 依赖安装 + 初始化）
- [ ] Windows 安装脚本 install.bat

### 第二十九步：文档编写
- [ ] 用户使用手册
- [ ] 开发者 API 文档
- [ ] 部署文档

### 第三十步：最终检查与发布
- [ ] 全功能回归测试
- [ ] 安全扫描
- [ ] 性能测试
- [ ] 发布 v1.0.0

---

## 附录：每步检查清单

每一步完成后必须验证以下项目：

```markdown
□ 后端 API 接口 curl 测试通过
□ 前端页面正常渲染
□ 网络请求无 404/500 错误
□ 控制台无报红
□ 增删改查操作完整测试
□ 暗黑模式切换正常
□ 移动端缩放不崩溃
□ Git commit 提交（带清晰的 commit message）
```

**核心原则：每完成一个模块就 commit 一次，绝不在未完成当前步骤的情况下开始下一步。**
