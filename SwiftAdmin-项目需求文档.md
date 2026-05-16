# 基于 ThinkPHP 6.0 的企业级全栈后台管理系统 — 需求规格说明书

> **项目代号**: SwiftAdmin  
> **版本**: v1.0.0  
> **日期**: 2026-05-15  
> **作者**: AI 架构设计

---

## 目录

1. [项目概述](#1-项目概述)
2. [技术栈选型](#2-技术栈选型)
3. [对标 BuildAdmin 的完整功能清单](#3-对标功能清单)
4. [新增差异化功能设计](#4-新增差异化功能)
5. [系统架构设计](#5-系统架构设计)
6. [数据库核心表设计](#6-数据库核心表设计)
7. [前端 UI/UX 设计规范](#7-前端-uiux-设计规范)
8. [部署方案](#8-部署方案)
9. [开发计划与里程碑](#9-开发计划与里程碑)
10. [附录](#10-附录)

---

## 1. 项目概述

### 1.1 项目背景

开发一个集颜值、实用、敏捷于一身的企业级后台管理系统，功能对标 BuildAdmin，并在此基础上新增多项差异化特性，目标成为 ThinkPHP 6.0 生态中最强大的开源后台框架。

### 1.2 核心目标

| 目标 | 说明 |
|------|------|
| **功能完整** | 覆盖 BuildAdmin 所有功能 + 新增 10+ 差异化功能 |
| **部署简单** | 一条命令完成环境检测与部署，支持 Docker 一键部署 |
| **UI 美观** | 现代化设计，4 种布局，暗黑模式，自定义主题色 |
| **全端适配** | PC / 平板 / H5 手机 / 微信小程序，一套代码多端运行 |
| **高性能** | Workerman 常驻内存，WebSocket 实时通信，Redis 缓存 |
| **安全可靠** | XSS/CSRF/SQL注入防护，字段级修改审计，数据回收站 |

### 1.3 目标用户

- 中小型企业信息化管理
- 个人开发者快速搭建后台
- SaaS 服务提供商
- 微信小程序后端管理系统

---

## 2. 技术栈选型

### 2.1 推荐技术栈

| 层级 | 技术 | 版本要求 | 选型理由 |
|------|------|---------|---------|
| **后端框架** | ThinkPHP 6.0 | >= 6.0.12 | 用户指定，成熟稳定，生态丰富 |
| **PHP** | PHP | >= 7.4（推荐 8.1） | TP6 最低要求 |
| **前端框架** | Vue 3 | >= 3.4 | Composition API + `<script setup>` |
| **UI 组件库** | Naive UI | >= 2.38 | TypeScript 原生支持，组件丰富，比 Element Plus 更现代 |
| **移动端 UI** | Vant 4 | - | H5 移动端专属组件 |
| **小程序端** | uni-app | - | 一套代码编译到微信/支付宝等多端小程序 |
| **构建工具** | Vite | >= 5.0 | 极速 HMR，按需编译 |
| **状态管理** | Pinia | >= 2.1 | 官方推荐，TypeScript 友好 |
| **类型系统** | TypeScript | >= 5.0 | 类型安全 |
| **CSS 方案** | UnoCSS | - | 原子化 CSS，比 Tailwind 更灵活 |
| **HTTP 请求** | Axios + 拦截器 | - | 统一请求处理 |
| **图表库** | ECharts 5 | - | 数据大屏可视化 |
| **富文本** | Tiptap | - | 现代化编辑器，支持协作 |
| **代码编辑器** | Monaco Editor | - | VS Code 内核 |
| **数据库** | MySQL | >= 5.7 | TP6 最佳搭配 |
| **缓存** | Redis | >= 5.0 | Session/缓存/队列 |
| **常驻内存** | Workerman | >= 4.1 | HTTP + WebSocket 服务 |
| **部署** | Docker + Nginx | - | 一键部署 |

### 2.2 为什么选择 Naive UI 而非 Element Plus

| 对比维度 | Naive UI | Element Plus |
|---------|----------|-------------|
| TypeScript 支持 | 原生，类型推断完美 | 后续添加，类型有瑕疵 |
| Tree Shaking | 天然支持，按需引入 | 需要额外配置 |
| 设计风格 | 更现代、更年轻化 | 传统稳重 |
| 组件完整度 | 80+ 组件 | 90+ 组件 |
| 暗黑模式 | 内置完善 | 需要额外配置 |
| 移动端适配 | 较好 | 一般 |
| 主题定制 | CSS 变量，灵活 | 较复杂 |

---

## 3. 对标功能清单

### 3.1 功能全量对标表（BuildAdmin 所有功能 → SwiftAdmin 实现）

#### 模块一：控制台 Dashboard

| 序号 | 功能点 | 说明 | 优先级 |
|------|--------|------|--------|
| D01 | 系统概览面板 | 关键指标卡片（用户数、订单数、收入等） | P0 |
| D02 | 统计图表 | ECharts 折线图/柱状图/饼图，7日/30日趋势 | P0 |
| D03 | 快捷操作入口 | 常用功能快捷跳转 | P1 |
| D04 | 实时数据 | WebSocket 推送实时注册/登录/订单数据 | P1 |
| D05 | 系统信息 | PHP版本、数据库版本、系统负载 | P1 |

#### 模块二：权限管理 Auth

| 序号 | 功能点 | 说明 | 优先级 |
|------|--------|------|--------|
| A01 | 角色组管理 | CRUD + 可视化分配权限（树形勾选） | P0 |
| A02 | 管理员管理 | CRUD + 分配角色 + 状态启用/禁用 | P0 |
| A03 | 菜单规则管理 | 无限级菜单树，支持目录/菜单/按钮三种类型 | P0 |
| A04 | 按钮级权限 | v-auth 指令控制按钮显隐，后端接口鉴权 | P0 |
| A05 | 数据权限 | 本人/本部门/全部/自定义，5种数据隔离模式 | P1 |
| A06 | 管理员日志 | 操作标题、URL、IP、参数、时间、耗时 | P0 |
| A07 | 登录日志 | 记录登录IP、时间、设备、失败次数 | P1 |

#### 模块三：会员管理 User

| 序号 | 功能点 | 说明 | 优先级 |
|------|--------|------|--------|
| U01 | 会员列表 | CRUD + 头像、手机、邮箱、状态 | P0 |
| U02 | 会员分组 | 分组管理 + 权限分配 | P1 |
| U03 | 余额管理 | 余额充值/扣减 + 变动日志 | P1 |
| U04 | 积分管理 | 积分增减 + 变动日志 | P1 |
| U05 | 会员等级 | 等级规则配置，自动升降级 | P1 |
| U06 | 前台菜单规则 | 会员端菜单权限管理 | P1 |

#### 模块四：系统配置 System

| 序号 | 功能点 | 说明 | 优先级 |
|------|--------|------|--------|
| S01 | 站点配置 | 名称、LOGO、ICON、备案号、CDN | P0 |
| S02 | 上传配置 | 存储驱动（本地/OSS/COS）、文件大小、格式限制 | P0 |
| S03 | 邮件配置 | SMTP服务器、端口、账号密码、模板 | P1 |
| S04 | 短信配置 | 短信平台、签名、模板ID | P1 |
| S05 | 安全配置 | 登录失败锁定、密码复杂度、验证码策略 | P1 |
| S06 | 缓存配置 | Redis连接、缓存驱动切换 | P1 |
| S07 | 个性化配置 | 自定义主题色、布局模式 | P1 |

#### 模块五：附件管理 Attachment

| 序号 | 功能点 | 说明 | 优先级 |
|------|--------|------|--------|
| F01 | 附件上传 | 拖拽/粘贴上传，多文件，进度条 | P0 |
| F02 | 附件列表 | 网格/列表视图，筛选（类型/日期/大小） | P0 |
| F03 | 附件预览 | 图片预览、视频播放、文件下载 | P1 |
| F04 | 附件选择器 | 弹窗选择，支持分页搜索 | P1 |
| F05 | 云存储 | 阿里云OSS / 腾讯云COS / 七牛云 | P1 |

#### 模块六：数据安全 Data

| 序号 | 功能点 | 说明 | 优先级 |
|------|--------|------|--------|
| G01 | 全局回收站 | 软删除数据统一展示，支持还原/彻底删除 | P0 |
| G02 | 字段修改记录 | 配置敏感字段，自动记录修改前后值 | P1 |
| G03 | 数据对比展示 | 修改前后的 diff 对比视图 | P1 |
| G04 | 一键回滚 | 单条或多条数据还原 | P1 |

#### 模块七：CRUD 代码生成 Generator

| 序号 | 功能点 | 说明 | 优先级 |
|------|--------|------|--------|
| C01 | 可视设计器 | 拖拽式字段设计，实时预览 | P0 |
| C02 | 24+ 表单组件 | 文本/数字/下拉/开关/日期/富文本/图片/文件/城市/颜色/远程选择等 | P0 |
| C03 | 自动建表 | 根据设计自动生成 SQL（CREATE/ALTER） | P0 |
| C04 | 关联表 | remoteSelect/remoteSelects 关联表操作 | P0 |
| C05 | 代码生成 | 一键生成：Controller + Model + Validate + Vue页面 + 菜单 | P0 |
| C06 | 历史记录 | 设计记录保存/复制/编辑/删除，支持云备份 | P1 |
| C07 | 代码预览 | 生成前预览代码 | P1 |
| C08 | 模板自定义 | 自定义代码生成模板 | P2 |

#### 模块八：模块市场 Module Store

| 序号 | 功能点 | 说明 | 优先级 |
|------|--------|------|--------|
| M01 | 模块列表 | 模块浏览、搜索、详情 | P1 |
| M02 | 一键安装 | 自动处理 composer.json 和 package.json 依赖 | P1 |
| M03 | 模块管理 | 启用/禁用/卸载/更新 | P1 |
| M04 | 模块开发 | 模块开发规范、脚手架 | P2 |

#### 模块九：WEB 终端 Terminal

| 序号 | 功能点 | 说明 | 优先级 |
|------|--------|------|--------|
| T01 | 命令执行 | composer/npm/node/git/自定义 | P1 |
| T02 | 终端界面 | xterm.js，多标签，命令历史 | P1 |
| T03 | 快捷命令 | 预设常用命令（清缓存、生成代码等） | P1 |
| T04 | 任务列表 | 后台任务状态查看 | P1 |

#### 模块十：布局与UI Layout

| 序号 | 功能点 | 说明 | 优先级 |
|------|--------|------|--------|
| L01 | 4种布局 | 侧边栏/顶部导航/混合/双栏，可视化切换 | P0 |
| L02 | 暗黑模式 | 一键切换 + 跟随系统 | P0 |
| L03 | 主题色 | 预设色板 + 自定义颜色 | P0 |
| L04 | 标签页 | 多标签、右键菜单、刷新/关闭 | P0 |
| L05 | PC/平板/手机 | 响应式自适应 | P0 |
| L06 | 国际化 i18n | 中/英/自定义语言包 | P1 |
| L07 | 全屏模式 | 浏览器全屏 | P1 |
| L08 | 面包屑 | 自动生成 | P0 |

---

## 4. 新增差异化功能

以下为 SwiftAdmin 独有的创新功能，BuildAdmin 不具备：

### 4.1 🤖 AI 智能助手 (P1)

| 功能 | 说明 |
|------|------|
| 智能问答 | 基于 LLM API（OpenAI/DeepSeek/通义千问），回答系统使用问题 |
| SQL 生成 | 自然语言生成 SQL 查询 |
| 代码辅助 | 根据描述生成 CRUD 设计/控制器代码 |
| 数据分析 | 自然语言提问，自动生成图表 |
| 错误诊断 | 粘贴错误日志，AI 分析根因并给出修复建议 |
| 可配置模型 | 支持切换不同 AI 模型和 API Key |

### 4.2 📊 数据大屏 (P1)

| 功能 | 说明 |
|------|------|
| 可视化大屏 | ECharts GL 3D 地图/飞线/热力图 |
| 实时数据 | WebSocket 实时刷新 |
| 多屏切换 | 多套大屏模板，一键切换 |
| 自定义布局 | 拖拽组件，自定义大屏（低代码） |
| 全屏展示 | 支持展厅大屏、TV 横屏 |
| 数据源配置 | 每个图表独立配置数据接口 |

### 4.3 🔄 工作流引擎 (P1)

| 功能 | 说明 |
|------|------|
| 流程设计器 | 可视化拖拽流程图（基于 LogicFlow/bpmn.js） |
| 节点类型 | 审批/条件分支/并行/会签/知会/子流程/定时等待 |
| 表单绑定 | 每个节点绑定独立表单 |
| 审批操作 | 通过/驳回/转审/加签/催办 |
| 流程实例 | 发起/待办/已办/抄送/草稿 |
| 流转记录 | 时间线展示每一步操作 |
| 通知 | 审批到达/通过/驳回时站内信+邮件通知 |

### 4.4 📝 内容管理系统 CMS (P1)

| 功能 | 说明 |
|------|------|
| 栏目管理 | 无限级分类，单页/列表/链接类型 |
| 文章管理 | 富文本编辑、封面图、SEO、定时发布 |
| 标签管理 | 标签CRUD + 关联文章 |
| 页面管理 | 独立页面（关于我们、帮助中心等） |
| 广告管理 | 广告位 + 广告素材，支持图片/HTML |
| 友情链接 | 链接管理，分类展示 |
| SEO 配置 | TDK(title/description/keywords)每页独立设置 |

### 4.5 📨 消息通知中心 (P1)

| 功能 | 说明 |
|------|------|
| 站内信 | 系统通知 + 私信，已读/未读 |
| WebSocket 推送 | 实时推送新消息 |
| 多渠道 | 邮件 + 短信 + 微信公众号模板消息 |
| 通知模板 | 可配置的通知模板，变量替换 |
| 订阅管理 | 用户自定义接收哪些通知 |
| 消息记录 | 所有发送记录，状态追踪 |

### 4.6 📱 小程序端 (P1)

| 功能 | 说明 |
|------|------|
| uni-app 开发 | 一套代码编译微信/支付宝/百度/字节小程序 |
| 会员中心 | 登录/注册/个人信息/我的订单 |
| CMS展示 | 文章列表/详情，栏目导航 |
| 消息中心 | 站内信查看 |
| 扫码登录 | 小程序扫码登录PC后台 |
| 手机验证码登录 | 微信授权 + 手机号绑定 |

### 4.7 ⏰ 定时任务可视化 (P2)

| 功能 | 说明 |
|------|------|
| 任务管理 | 可视化管理定时任务（CRUD） |
| Cron 表达式 | 可视化生成 + 预览下次执行时间 |
| 执行日志 | 每次执行结果、耗时、输出 |
| 手动触发 | 一键手动执行 |
| 启停控制 | 单个任务启用/禁用 |

### 4.8 📖 API 文档自动生成 (P2)

| 功能 | 说明 |
|------|------|
| 注解驱动 | 控制器方法注解定义接口信息 |
| Swagger UI | 内嵌 Swagger 文档页面 |
| 在线调试 | 文档页面直接发送测试请求 |
| 导出 | OpenAPI 3.0 JSON/YAML 导出 |

### 4.9 🏢 多租户支持 (P2)

| 功能 | 说明 |
|------|------|
| 租户管理 | 租户CRUD + 套餐分配 |
| 数据隔离 | 共享数据库 + tenant_id 隔离 |
| 套餐管理 | 功能权限 + 用量限制 |
| 独立域名 | 租户绑定独立域名 |
| 自定义主题 | 每个租户自定义LOGO/颜色 |

### 4.10 💰 多渠道支付 (P2)

| 功能 | 说明 |
|------|------|
| 微信支付 | JSAPI/小程序/H5/Native/App |
| 支付宝 | 电脑/手机/H5/App |
| 支付单管理 | 支付单查询、退款 |
| 支付日志 | 完整回调日志 |

### 4.11 其他新增功能 (P2)

| 功能 | 说明 |
|------|------|
| **文件管理器** | 类似网盘的目录结构，上传/下载/移动/重命名/删除/分享 |
| **系统监控** | CPU/内存/磁盘/网络 实时监控面板 |
| **API 调用统计** | 接口调用次数/耗时/成功率统计，慢查询定位 |
| **数据导出** | Excel/CSV/PDF 多格式导出 |
| **操作引导** | 新用户引导教程，功能提示 |
| **IP 黑名单** | IP 自动/手动封禁，防恶意攻击 |

---

## 5. 系统架构设计

### 5.1 整体架构图

```
┌─────────────────────────────────────────────────────────────┐
│                     Nginx (反向代理 + 静态资源)               │
├──────────────────────┬──────────────────────────────────────┤
│   Frontend (Vue3)    │       API Server (TP6 + Workerman)    │
│                      │                                      │
│  ┌────────────────┐  │  ┌──────────────────────────────────┐ │
│  │  Naive UI      │  │  │  Controller 层                    │ │
│  │  + UnoCSS      │  │  │  (路由分发 + 参数验证)            │ │
│  └────────────────┘  │  └────────────┬─────────────────────┘ │
│  ┌────────────────┐  │               │                       │
│  │  Pinia Store   │  │  ┌────────────▼─────────────────────┐ │
│  │  + Axios       │──┼──│  Service 层 (业务逻辑)           │ │
│  └────────────────┘  │  └────────────┬─────────────────────┘ │
│  ┌────────────────┐  │               │                       │
│  │  Vue Router     │  │  ┌────────────▼─────────────────────┐ │
│  │  (动态路由)     │  │  │  Model 层 (ORM + 关联)           │ │
│  └────────────────┘  │  └────────────┬─────────────────────┘ │
│  ┌────────────────┐  │               │                       │
│  │  WebSocket     │──┼───────────────┤  (实时通信)           │
│  └────────────────┘  │               │                       │
├──────────────────────┴───────────────┼───────────────────────┤
│                                      │                       │
│  ┌──────────┐ ┌──────────┐ ┌───────▼─────────┐             │
│  │  MySQL    │ │  Redis    │ │  Filesystem/OSS │             │
│  │ (主数据库) │ │ (缓存/Session/队列) │ (文件存储)    │             │
│  └──────────┘ └──────────┘ └─────────────────┘             │
└─────────────────────────────────────────────────────────────┘
```

### 5.2 目录结构

```
swiftadmin/
├── app/                          # 后端应用
│   ├── admin/                    # 后台管理应用
│   │   ├── controller/           # 控制器
│   │   │   ├── Auth.php          # 登录认证
│   │   │   ├── Admin.php         # 管理员管理
│   │   │   ├── Role.php          # 角色管理
│   │   │   ├── Menu.php          # 菜单规则
│   │   │   ├── User.php          # 会员管理
│   │   │   ├── Config.php        # 系统配置
│   │   │   ├── Attachment.php    # 附件管理
│   │   │   ├── Generator.php     # CRUD代码生成
│   │   │   ├── Module.php        # 模块市场
│   │   │   ├── Dashboard.php     # 控制台
│   │   │   ├── Recycle.php       # 数据回收站
│   │   │   ├── Workflow.php      # 工作流 [新增]
│   │   │   ├── Cms.php           # 内容管理 [新增]
│   │   │   ├── Notification.php  # 消息通知 [新增]
│   │   │   ├── DataScreen.php    # 数据大屏 [新增]
│   │   │   └── Ai.php            # AI助手 [新增]
│   │   ├── model/                # 模型
│   │   ├── validate/             # 验证器
│   │   ├── middleware/            # 中间件
│   │   ├── service/              # 业务服务层
│   │   └── route/                # 路由
│   ├── api/                      # API接口应用（小程序/H5前端用）
│   │   ├── controller/
│   │   │   ├── v1/               # API v1
│   │   │   │   ├── Auth.php      # 登录注册
│   │   │   │   ├── User.php      # 用户中心
│   │   │   │   ├── Article.php   # 文章
│   │   │   │   └── ...
│   │   │   └── ...
│   │   ├── route/
│   │   └── middleware/
│   ├── common/                   # 公共
│   │   ├── controller/
│   │   ├── model/
│   │   └── service/
│   └── provider.php              # 容器绑定
├── config/                       # 配置文件
├── public/                       # Web 入口
│   ├── index.php                 # 入口文件
│   ├── admin/                    # 管理后台静态资源
│   └── uploads/                  # 上传目录
├── frontend/                     # 前端项目（独立仓库或子目录）
│   ├── admin/                    # PC 管理后台 (Vue3 + NaiveUI)
│   │   ├── src/
│   │   │   ├── views/            # 页面组件
│   │   │   ├── components/       # 公共组件
│   │   │   ├── store/            # Pinia 状态
│   │   │   ├── router/           # 路由
│   │   │   ├── api/              # 接口请求
│   │   │   ├── hooks/            # 组合式函数
│   │   │   ├── utils/            # 工具函数
│   │   │   ├── styles/           # 全局样式
│   │   │   └── locales/          # 国际化
│   │   ├── package.json
│   │   └── vite.config.ts
│   ├── h5/                       # H5 移动端 (Vue3 + Vant4)
│   └── miniprogram/              # 小程序 (uni-app)
├── extend/                       # 扩展类库
├── runtime/                      # 运行时目录
├── vendor/                       # Composer 依赖
├── docker/                       # Docker 部署配置
│   ├── Dockerfile
│   ├── docker-compose.yml
│   └── nginx.conf
├── .env                          # 环境变量
├── composer.json
└── install.sh                    # 一键安装脚本
```

### 5.3 前端路由设计

```
/admin
├── /login                          # 登录页
├── /dashboard                      # 控制台
├── /auth
│   ├── /admin                      # 管理员管理
│   ├── /admin/log                  # 管理员日志
│   ├── /role                       # 角色管理
│   └── /menu                       # 菜单规则
├── /user
│   ├── /index                      # 会员管理
│   ├── /group                      # 会员分组
│   └── /rule                       # 会员规则
├── /system
│   ├── /config                     # 系统配置
│   └── /attachment                 # 附件管理
├── /data
│   ├── /recycle                    # 回收站
│   └── /audit                      # 数据审计
├── /generator                      # CRUD代码生成
├── /module                         # 模块市场
├── /terminal                       # WEB终端
│
├── [新增] /datascreen              # 数据大屏
├── [新增] /workflow                # 工作流
│   ├── /design                     # 流程设计
│   ├── /instance                   # 流程实例
│   └── /task                       # 我的待办
├── [新增] /cms
│   ├── /category                   # 栏目管理
│   ├── /article                    # 文章管理
│   ├── /tag                        # 标签管理
│   └── /ad                         # 广告管理
├── [新增] /notification            # 消息通知
├── [新增] /ai                      # AI助手
├── [新增] /monitor                 # 系统监控
├── [新增] /schedule                # 定时任务
├── [新增] /api-doc                 # API文档
└── /profile                        # 个人资料
```

---

## 6. 数据库核心表设计

### 6.1 基础系统表（对标 BuildAdmin）

```sql
-- 管理员表
swift_admin (id, username, password, nickname, email, mobile, avatar, role_id, status, last_login_ip, last_login_time, create_time, update_time, delete_time)

-- 角色表
swift_role (id, name, description, status, rules, create_time, update_time)

-- 菜单规则表
swift_menu (id, parent_id, name, title, icon, path, component, type[menu/button/api], permission, status, sort, create_time, update_time)

-- 管理员日志
swift_admin_log (id, admin_id, username, title, url, method, ip, useragent, params, status, time_cost, create_time)

-- 系统配置表
swift_config (id, name, group, value, type, description, create_time, update_time)

-- 附件表
swift_attachment (id, admin_id, user_id, name, path, url, ext, size, mime, storage, sha1, create_time)

-- 回收站
swift_recycle (id, table_name, data_id, data, admin_id, create_time)
```

### 6.2 新增功能表

```sql
-- 工作流定义表 [新增]
swift_workflow_definition (id, name, description, category_id, nodes_json, edges_json, status, version, create_time, update_time)

-- 工作流实例表 [新增]
swift_workflow_instance (id, definition_id, title, form_data, status, applicant_id, current_node, create_time, update_time)

-- 工作流审批记录 [新增]
swift_workflow_record (id, instance_id, node_id, assignee_id, action, comment, create_time)

-- CMS 分类表 [新增]
swift_cms_category (id, parent_id, name, type, description, image, seo_title, seo_keywords, seo_description, sort, status, create_time)

-- CMS 文章表 [新增]
swift_cms_article (id, category_id, title, content, cover, summary, tags, author, seo_title, seo_keywords, seo_description, views, status, publish_time, create_time, update_time)

-- 消息通知表 [新增]
swift_notification (id, user_id, type, title, content, target_url, is_read, read_time, create_time)

-- AI 对话记录 [新增]
swift_ai_conversation (id, admin_id, title, messages_json, model, tokens, create_time, update_time)

-- 定时任务表 [新增]
swift_cron_job (id, name, command, cron_expression, description, status, last_run_time, next_run_time, create_time)

-- 定时任务日志 [新增]
swift_cron_log (id, job_id, status, output, time_cost, create_time)

-- API 调用日志 [新增]
swift_api_log (id, user_id, method, path, params, ip, status_code, time_cost, create_time)

-- 租户表 [新增]
swift_tenant (id, name, domain, logo, theme_color, package_id, expire_time, status, create_time)

-- 支付单 [新增]
swift_payment (id, order_no, user_id, channel, amount, subject, status, pay_time, create_time, update_time)
```

---

## 7. 前端 UI/UX 设计规范

### 7.1 设计原则

| 原则 | 说明 |
|------|------|
| **简洁** | 去除冗余元素，突出核心内容 |
| **高效** | 常用操作 ≤ 2 次点击可达 |
| **一致** | 全系统统一交互模式、图标风格、间距 |
| **反馈** | 所有操作有明确反馈（loading/success/error） |
| **可访问** | 键盘导航、屏幕阅读器友好 |

### 7.2 布局方案

```
┌──────────────────────────────────────────────────┐
│  [LOGO]  系统名称    [全局搜索] [暗黑] [通知] [用户] │ Header 64px
├────┬─────────────────────────────────────────────┤
│ 菜 │  [标签页1] [标签页2] [标签页3]        [刷新]  │ Tabs 40px
│ 单 │ ├─────────────────────────────────────────┤
│ 区 │ │                                          │
│    │ │         主内容区域                        │
│240 │ │      (面包屑 + 页面内容)                   │ Content
│ px │ │                                          │
│    │ │                                          │
│    │ │                                          │
├────┴─────────────────────────────────────────────┤
│               Footer (可选)                        │
└──────────────────────────────────────────────────┘
```

### 7.3 颜色方案

| 用途 | 浅色模式 | 暗黑模式 |
|------|---------|---------|
| 主色 | #18A058 (NaiveUI 默认绿) | 同 |
| 辅色 | #2080F0 (蓝色) | 同 |
| 背景 | #F5F7FA | #101014 |
| 卡片 | #FFFFFF | #1E1E20 |
| 文字 | #333639 | #E5E5E5 |
| 边框 | #E0E0E6 | #333335 |

### 7.4 响应式断点

| 断点 | 宽度 | 适配 |
|------|------|------|
| xs | < 640px | 手机竖屏 |
| sm | 640px - 768px | 手机横屏/小平板 |
| md | 768px - 1024px | 平板 |
| lg | 1024px - 1280px | 笔记本 |
| xl | > 1280px | 桌面显示器 |

手机端：侧边栏折叠为底部导航 + 抽屉菜单
平板端：侧边栏默认折叠，可展开

### 7.5 动画规范

| 场景 | 动画 | 时长 |
|------|------|------|
| 页面切换 | 淡入淡出 + 轻微上移 | 300ms |
| 弹窗 | 缩放 + 淡入 | 200ms |
| 下拉 | 展开/收起 | 200ms |
| 悬浮 | 轻微放大 + 阴影 | 150ms |
| 加载 | 骨架屏 + 脉冲动画 | - |

---

## 8. 部署方案

### 8.1 极简部署（3步）

```bash
# 步骤1: 克隆项目
git clone https://github.com/xxx/swiftadmin.git
cd swiftadmin

# 步骤2: 一键安装（自动检测环境）
bash install.sh

# 步骤3: 访问
# 后台: http://your-domain.com/admin
# 默认账号: admin / admin123
```

### 8.2 Docker 部署（推荐）

```yaml
# docker-compose.yml
services:
  swiftadmin:
    build: ./docker
    ports:
      - "80:80"
    depends_on:
      - mysql
      - redis
    environment:
      DB_HOST: mysql
      DB_NAME: swiftadmin
      DB_USER: root
      DB_PASS: swiftadmin123
      REDIS_HOST: redis

  mysql:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: swiftadmin123
      MYSQL_DATABASE: swiftadmin
    volumes:
      - mysql_data:/var/lib/mysql

  redis:
    image: redis:7-alpine
    volumes:
      - redis_data:/data

volumes:
  mysql_data:
  redis_data:
```

```bash
docker-compose up -d
# 一键启动，包含 MySQL + Redis + 应用
```

### 8.3 环境要求

| 依赖 | 最低版本 | 推荐版本 |
|------|---------|---------|
| PHP | 7.4 | 8.1+ |
| PHP 扩展 | pdo, mbstring, json, curl, fileinfo, gd, redis | - |
| MySQL | 5.7 | 8.0+ |
| Redis | 5.0 | 7.0+ |
| Node.js | 16 | 20 LTS |
| Nginx | 1.18 | 1.24+ |

---

## 9. 开发计划与里程碑

### Phase 1: 基础框架搭建（2周）
- [ ] ThinkPHP 6.0 项目初始化 + 多应用模式
- [ ] Vue3 + NaiveUI 前端项目脚手架
- [ ] 数据库基础表设计 + 迁移
- [ ] 登录/权限系统（RBAC）
- [ ] 动态路由 + 菜单渲染
- [ ] 基础布局（侧边栏/顶栏/内容区/标签页）

### Phase 2: 核心CRUD + 对标功能（3周）
- [ ] 管理员/角色/菜单管理
- [ ] 系统配置
- [ ] 附件管理
- [ ] 会员管理
- [ ] 数据回收站
- [ ] 管理员日志
- [ ] 个人资料
- [ ] 控制台仪表盘

### Phase 3: CRUD代码生成器（2周）
- [ ] 可视设计器（拖拽字段）
- [ ] 代码生成引擎（Controller/Model/Validate/Vue页面）
- [ ] 24种表单组件
- [ ] 关联表支持
- [ ] 历史记录管理

### Phase 4: 新增差异化功能（4周）
- [ ] 数据大屏
- [ ] 工作流引擎
- [ ] CMS内容管理
- [ ] AI智能助手
- [ ] 消息通知中心

### Phase 5: 端侧拓展（2周）
- [ ] H5移动端
- [ ] uni-app小程序
- [ ] API接口层
- [ ] Swagger文档

### Phase 6: 高级功能 + 优化（2周）
- [ ] 模块市场
- [ ] WEB终端
- [ ] 多租户
- [ ] 定时任务
- [ ] 多渠道支付
- [ ] 系统监控
- [ ] 性能优化

### Phase 7: 部署 + 文档（1周）
- [ ] Docker 配置
- [ ] 一键安装脚本
- [ ] 用户手册
- [ ] 开发者文档
- [ ] 演示站点

---

## 10. 附录

### 10.1 与 BuildAdmin 的完整对比

| 维度 | BuildAdmin | SwiftAdmin |
|------|-----------|------------|
| 后端框架 | ThinkPHP 8 | ThinkPHP 6.0 |
| 前端UI | Element Plus | Naive UI（更现代） |
| CSS方案 | SCSS | UnoCSS（原子化） |
| 权限系统 | RBAC | RBAC + 数据权限 + 多租户 |
| CRUD生成 | 24种组件 | 24+种组件 + AI辅助设计 |
| 布局 | 4种 | 4种 + 自定义 |
| 数据大屏 | 无 | ✅ 内置 |
| 工作流 | 无 | ✅ 内置 |
| CMS | 通过模块 | ✅ 内置 |
| AI助手 | 无 | ✅ 内置 |
| 消息通知 | 基础 | ✅ 多渠道 |
| 小程序 | 无 | ✅ uni-app |
| 多租户 | 无 | ✅ 内置 |
| API文档 | 无 | ✅ Swagger自动生成 |
| 系统监控 | 无 | ✅ 内置面板 |
| 文件管理器 | 无 | ✅ 内置 |
| 定时任务 | 无UI | ✅ 可视化管理 |
| 部署 | 需手动 | ✅ Docker一键 + 安装脚本 |
| H5响应式 | 支持 | ✅ 更优 |
| 国际化 | 支持 | ✅ 支持 |

### 10.2 参考资源

- ThinkPHP 6.0 手册: https://www.kancloud.cn/manual/thinkphp6_0
- BuildAdmin 官方: https://www.buildadmin.com
- Naive UI: https://www.naiveui.com
- Vant 4: https://vant-ui.github.io
- uni-app: https://uniapp.dcloud.net.cn
