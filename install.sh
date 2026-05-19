#!/usr/bin/env bash
# ============================================
# SwiftAdmin 一键安装脚本 (Linux / macOS)
# ============================================
set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

PROJECT_DIR="$(cd "$(dirname "$0")" && pwd)"
cd "$PROJECT_DIR"

echo -e "${CYAN}========================================${NC}"
echo -e "${CYAN}   SwiftAdmin 一键安装脚本 v1.0${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# -------- 1. 环境检测 ----------
echo -e "${YELLOW}[1/7] 环境检测...${NC}"

check_cmd() { command -v "$1" >/dev/null 2>&1 || { echo -e "${RED}错误: 未找到 $1${NC}"; exit 1; }; }

check_cmd php
check_cmd composer
check_cmd node
check_cmd npm

PHP_VER=$(php -r "echo PHP_VERSION;")
PHP_MAJOR=$(php -r "echo PHP_MAJOR_VERSION;")
PHP_MINOR=$(php -r "echo PHP_MINOR_VERSION;")

if [ "$PHP_MAJOR" -lt 7 ] || ([ "$PHP_MAJOR" -eq 7 ] && [ "$PHP_MINOR" -lt 2 ]); then
    echo -e "${RED}PHP >= 7.2.5 需要, 当前: $PHP_VER${NC}"; exit 1
fi
for ext in pdo_mysql gd fileinfo zip; do
    php -m | grep -qi "$ext" || { echo -e "${RED}缺少 PHP 扩展: $ext${NC}"; exit 1; }
done

NODE_VER=$(node -v | sed 's/v//' | cut -d. -f1)
[ "$NODE_VER" -lt 16 ] && { echo -e "${RED}Node.js >= 16 需要${NC}"; exit 1; }

echo -e "  PHP ${GREEN}$PHP_VER${NC} ✓"
echo -e "  Composer ✓  Node $(node -v) ✓  npm $(npm -v) ✓"

# -------- 2. 数据库配置 ----------
echo ""
echo -e "${YELLOW}[2/7] 数据库配置...${NC}"

read -p "  MySQL 主机 [127.0.0.1]: " DB_HOST; DB_HOST=${DB_HOST:-127.0.0.1}
read -p "  MySQL 端口 [3306]: "       DB_PORT; DB_PORT=${DB_PORT:-3306}
read -p "  MySQL 用户名 [root]: "      DB_USER; DB_USER=${DB_USER:-root}
read -sp "  MySQL 密码: "              DB_PASS; echo ""
read -p "  数据库名 [swiftadmin]: "   DB_NAME; DB_NAME=${DB_NAME:-swiftadmin}
read -p "  表前缀 [swift_]: "         DB_PREFIX; DB_PREFIX=${DB_PREFIX:-swift_}

# -------- 3. 创建库 ----------
echo ""
echo -e "${YELLOW}[3/7] 创建数据库...${NC}"
mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" \
    -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null \
    || { echo -e "${RED}数据库连接失败${NC}"; exit 1; }
echo -e "  数据库 ${GREEN}$DB_NAME${NC} ✓"

# -------- 4. 导入表结构 ----------
echo ""
echo -e "${YELLOW}[4/7] 导入表结构...${NC}"
if [ -f "database/install.sql" ]; then
    mysql -h"$DB_HOST" -P"$DB_PORT" -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" < database/install.sql 2>/dev/null
    echo -e "  导入 ${GREEN}完成${NC} ✓"
else
    echo -e "  ${YELLOW}跳过 (install.sql 不存在)${NC}"
fi

# -------- 5. 生成 .env ----------
echo ""
echo -e "${YELLOW}[5/7] 生成 .env...${NC}"
cat > .env << EOF
APP_DEBUG = true

[DATABASE]
TYPE = mysql
HOSTNAME = $DB_HOST
DATABASE = $DB_NAME
USERNAME = $DB_USER
PASSWORD = $DB_PASS
HOSTPORT = $DB_PORT
CHARSET = utf8mb4
PREFIX = $DB_PREFIX

[REDIS]
HOST = 127.0.0.1
PORT = 6379
PASSWORD =
SELECT = 0

[CACHE]
DRIVER = file
EOF
echo -e "  .env ${GREEN}已生成${NC} ✓"

# -------- 6. 安装依赖 ----------
echo ""
echo -e "${YELLOW}[6/7] 安装依赖...${NC}"
composer install --no-interaction --prefer-dist 2>&1 | tail -1

cd frontend/admin
npm install --silent 2>&1 | tail -1
npm run build 2>&1 | tail -3
cd "$PROJECT_DIR"
echo -e "  依赖 ${GREEN}完成${NC} ✓"

# -------- 7. 目录权限 ----------
echo ""
echo -e "${YELLOW}[7/7] 设置权限...${NC}"
mkdir -p runtime public/uploads public/static
chmod -R 777 runtime public/uploads public/static 2>/dev/null || true
echo -e "  权限 ${GREEN}完成${NC} ✓"

# -------- 完成 ----------
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   安装完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "  后端: ${CYAN}php think run${NC}"
echo -e "  前端: ${CYAN}cd frontend/admin && npm run dev${NC}"
echo -e "  账号: ${CYAN}admin${NC} / ${CYAN}admin123${NC}"
