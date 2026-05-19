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

INSERT INTO `swift_admin` (`id`, `username`, `password`, `nickname`, `role_id`, `status`, `create_time`) VALUES
(1, 'admin', '$2y$10$1eFNLhXgiShDknz6E2cNV.APT0etOof7AOnatuBL8o6pPwrcgZ/6q', '超级管理员', 1, 1, UNIX_TIMESTAMP());

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
(13, 0, 'data', '数据管理', 'FolderOutline', '/data', '', 1, '', 5, UNIX_TIMESTAMP()),
(15, 0, 'generator', '代码生成', 'CodeOutline', '/generator', 'views/generator/index', 1, '', 7, UNIX_TIMESTAMP()),
(16, 0, 'profile', '个人资料', 'PersonOutline', '/profile', 'views/profile/index', 2, '', 17, UNIX_TIMESTAMP()),
(36, 13, 'security-recycle', '数据回收站', '', '/data/security-recycle', 'views/data/security/recycle', 2, 'data:security:recycle:list', 1, UNIX_TIMESTAMP()),
(37, 13, 'sensitive-log', '敏感数据修改记录', '', '/data/sensitive-log', 'views/data/security/sensitive-log', 2, 'data:security:sensitive-log:list', 2, UNIX_TIMESTAMP()),
(38, 13, 'recycle-rule', '数据回收规则管理', '', '/data/recycle-rule', 'views/data/security/recycle-rule', 2, 'data:security:recycle-rule:list', 3, UNIX_TIMESTAMP()),
(39, 13, 'sensitive-field-rule', '敏感字段规则管理', '', '/data/sensitive-field-rule', 'views/data/security/sensitive-field-rule', 2, 'data:security:sensitive-field-rule:list', 4, UNIX_TIMESTAMP());

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
-- 10. CMS 文章表
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
-- 14. 消息通知表
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
-- 15. 定时任务表
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
-- 16. 定时任务执行日志
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
-- 17. 租户表
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
-- 18. 支付单
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

-- -------------------------------------------
-- 19. 安全-数据回收站
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_security_data_recycle`;
CREATE TABLE `swift_security_data_recycle` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) unsigned DEFAULT 0 COMMENT '操作管理员',
  `rule_name` varchar(64) DEFAULT '' COMMENT '规则名称',
  `controller` varchar(128) DEFAULT '' COMMENT '来源控制器',
  `connect_id` int(11) unsigned DEFAULT 0 COMMENT '数据库连接ID',
  `table_name` varchar(64) NOT NULL COMMENT '原表名',
  `data` longtext COMMENT '被删数据JSON',
  `ip` varchar(64) DEFAULT '' COMMENT '操作IP',
  `create_time` int(11) DEFAULT NULL COMMENT '删除时间',
  PRIMARY KEY (`id`),
  KEY `idx_table_name` (`table_name`),
  KEY `idx_admin_id` (`admin_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='安全数据回收站';

-- -------------------------------------------
-- 20. 安全-敏感数据修改记录
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_security_sensitive_data_log`;
CREATE TABLE `swift_security_sensitive_data_log` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `admin_id` int(11) unsigned DEFAULT 0 COMMENT '操作管理员',
  `rule_name` varchar(64) DEFAULT '' COMMENT '规则名称',
  `controller` varchar(128) DEFAULT '' COMMENT '来源控制器',
  `connect_id` int(11) unsigned DEFAULT 0 COMMENT '数据库连接ID',
  `table_name` varchar(64) NOT NULL COMMENT '数据表名',
  `row_id` int(11) unsigned DEFAULT 0 COMMENT '被修改行ID',
  `field_name` varchar(64) DEFAULT '' COMMENT '修改字段',
  `before_value` text COMMENT '修改前值',
  `after_value` text COMMENT '修改后值',
  `ip` varchar(64) DEFAULT '' COMMENT '操作IP',
  `create_time` int(11) DEFAULT NULL COMMENT '修改时间',
  PRIMARY KEY (`id`),
  KEY `idx_table_name` (`table_name`),
  KEY `idx_admin_id` (`admin_id`),
  KEY `idx_create_time` (`create_time`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='敏感数据修改记录';

-- -------------------------------------------
-- 21. 安全-数据回收规则管理
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_security_data_recycle_rule`;
CREATE TABLE `swift_security_data_recycle_rule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL COMMENT '规则名称',
  `controller` varchar(128) NOT NULL COMMENT '控制器',
  `connect_id` int(11) unsigned DEFAULT 0 COMMENT '数据库连接ID',
  `table_name` varchar(64) NOT NULL COMMENT '数据表名',
  `primary_key` varchar(32) DEFAULT 'id' COMMENT '主键字段',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态:0禁用,1启用',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_controller` (`controller`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='数据回收规则';

-- -------------------------------------------
-- 22. 安全-敏感字段规则管理
-- -------------------------------------------
DROP TABLE IF EXISTS `swift_security_sensitive_field_rule`;
CREATE TABLE `swift_security_sensitive_field_rule` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT,
  `name` varchar(64) NOT NULL COMMENT '规则名称',
  `controller` varchar(128) NOT NULL COMMENT '控制器',
  `connect_id` int(11) unsigned DEFAULT 0 COMMENT '数据库连接ID',
  `table_name` varchar(64) NOT NULL COMMENT '数据表名',
  `primary_key` varchar(32) DEFAULT 'id' COMMENT '主键字段',
  `sensitive_fields` text COMMENT '敏感字段(JSON数组)',
  `status` tinyint(1) DEFAULT 1 COMMENT '状态:0禁用,1启用',
  `create_time` int(11) DEFAULT NULL,
  `update_time` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `idx_controller` (`controller`),
  KEY `idx_status` (`status`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COMMENT='敏感字段规则';

SET FOREIGN_KEY_CHECKS = 1;
