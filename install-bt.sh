#!/usr/bin/env bash
# ============================================
# SwiftAdmin 宝塔面板一键安装脚本
# 适配：CentOS 7+ / Alibaba Cloud Linux + 宝塔面板
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
echo -e "${CYAN}   SwiftAdmin 宝塔面板一键部署 v1.0${NC}"
echo -e "${CYAN}========================================${NC}"
echo ""

# -------- 1. 宝塔面板检测 ----------
echo -e "${YELLOW}[1/9] 宝塔面板检测...${NC}"

if ! command -v bt >/dev/null 2>&1; then
    echo -e "${RED}未检测到宝塔面板，请先安装宝塔面板${NC}"
    echo -e "  安装命令: curl -sSO https://download.bt.cn/install/install_panel.sh && bash install_panel.sh"
    exit 1
fi
echo -e "  宝塔面板 ${GREEN}已安装${NC} OK"

# -------- 2. PHP 检测 ----------
echo ""
echo -e "${YELLOW}[2/9] PHP 检测...${NC}"

PHP_BIN=""
for php_path in /www/server/php/74/bin/php /www/server/php/80/bin/php /www/server/php/81/bin/php /www/server/php/82/bin/php /www/server/php/83/bin/php; do
    if [ -f "$php_path" ]; then
        PHP_BIN="$php_path"
        break
    fi
done

if [ -z "$PHP_BIN" ]; then
    echo -e "${RED}未找到 PHP 7.4+，请在宝塔面板「软件商店」安装 PHP 7.4 或以上版本${NC}"
    exit 1
fi

PHP_VER=$($PHP_BIN -r "echo PHP_VERSION;")
echo -e "  PHP ${GREEN}$PHP_VER${NC} ($PHP_BIN) OK"

# 检查 PHP 扩展
for ext in pdo_mysql gd fileinfo zip; do
    $PHP_BIN -m 2>/dev/null | grep -qi "$ext" || echo -e "${YELLOW}  警告: 缺少 $ext 扩展，请在宝塔面板 PHP 设置中安装${NC}"
done

# -------- 3. Composer 检测 ----------
echo ""
echo -e "${YELLOW}[3/9] Composer 检测...${NC}"

if ! command -v composer >/dev/null 2>&1; then
    echo "  安装 Composer..."
    curl -sS https://getcomposer.org/installer | $PHP_BIN
    mv composer.phar /usr/local/bin/composer
    chmod +x /usr/local/bin/composer
fi
echo -e "  Composer ${GREEN}$(composer --version 2>/dev/null | head -1)${NC} OK"

# -------- 4. Node.js 检测 ----------
echo ""
echo -e "${YELLOW}[4/9] Node.js 检测...${NC}"

if ! command -v node >/dev/null 2>&1; then
    echo -e "${YELLOW}  Node.js 未安装。请在宝塔面板「软件商店」安装 Node.js 版本管理器${NC}"
    echo -e "${YELLOW}  如不需要前端构建可跳过${NC}"
else
    echo -e "  Node $(node -v) OK  npm $(npm -v) OK"
fi

# -------- 5. 数据库配置 ----------
echo ""
echo -e "${YELLOW}[5/9] 数据库配置...${NC}"

DB_HOST="${DB_HOST:-127.0.0.1}"
DB_PORT="${DB_PORT:-3306}"
DB_USER="${DB_USER:-root}"

read -p "  MySQL 用户名 [root]: " input_user; DB_USER=${input_user:-$DB_USER}
read -sp "  MySQL 密码: " DB_PASS; echo ""
read -p "  数据库名 [swiftadmin]: " DB_NAME; DB_NAME=${DB_NAME:-swiftadmin}
read -p "  表前缀 [swift_]: " DB_PREFIX; DB_PREFIX=${DB_PREFIX:-swift_}

# -------- 6. 创建数据库 ----------
echo ""
echo -e "${YELLOW}[6/9] 创建数据库...${NC}"

mysql -u"$DB_USER" -p"$DB_PASS" -e "CREATE DATABASE IF NOT EXISTS \`$DB_NAME\` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>/dev/null \
    || { echo -e "${RED}数据库连接失败，请检查账号密码${NC}"; exit 1; }
echo -e "  数据库 ${GREEN}$DB_NAME${NC} OK"

# -------- 7. 导入表结构 ----------
echo ""
echo -e "${YELLOW}[7/9] 导入表结构...${NC}"

if [ -f "database/install.sql" ]; then
    mysql -u"$DB_USER" -p"$DB_PASS" "$DB_NAME" < database/install.sql 2>/dev/null
    echo -e "  导入 ${GREEN}完成${NC} OK"
else
    echo -e "  ${YELLOW}跳过 (install.sql 不存在)${NC}"
fi

# -------- 8. 生成 .env ----------
echo ""
echo -e "${YELLOW}[8/9] 生成 .env...${NC}"

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
echo -e "  .env ${GREEN}已生成${NC} OK"

# -------- 9. 安装依赖 & 权限 ----------
echo ""
echo -e "${YELLOW}[9/9] 安装依赖 & 设置权限...${NC}"

# Composer 依赖
echo "  安装 PHP 依赖..."
if command -v composer >/dev/null 2>&1; then
    composer install --no-interaction --prefer-dist --no-dev 2>&1 | tail -1
else
    $PHP_BIN /usr/local/bin/composer install --no-interaction --prefer-dist --no-dev 2>&1 | tail -1
fi

# 前端构建
if command -v node >/dev/null 2>&1; then
    echo "  构建前端..."
    cd frontend/admin
    npm install --silent 2>&1 | tail -1
    npm run build 2>&1 | tail -3
    cd "$PROJECT_DIR"
fi

# 权限
echo "  设置目录权限..."
mkdir -p runtime public/uploads public/static
chown -R www:www "$PROJECT_DIR" 2>/dev/null || true
chmod -R 755 "$PROJECT_DIR"
chmod -R 777 runtime public/uploads public/static
echo -e "  依赖和权限 ${GREEN}完成${NC} OK"

# -------- Nginx 伪静态提示 ----------
echo ""
echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}   部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo ""
echo -e "  ${CYAN}请手动完成以下步骤:${NC}"
echo ""
echo -e "  1. 宝塔面板 → 网站 → 添加站点"
echo -e "     根目录设为: ${CYAN}$PROJECT_DIR/public${NC}"
echo -e "     PHP 版本: 选择 7.4+"
echo ""
echo -e "  2. 设置伪静态 (URL 重写)"
echo -e "     站点设置 → 伪静态 → 粘贴:"
echo ""
echo -e "${YELLOW}  location / {${NC}"
echo -e "${YELLOW}      if (!-e \$request_filename) {${NC}"
echo -e "${YELLOW}          rewrite ^(.*)$ /index.php?s=\$1 last;${NC}"
echo -e "${YELLOW}      }${NC}"
echo -e "${YELLOW}  }${NC}"
echo ""
echo -e "  3. 如需 Redis，请在软件商店安装并配置密码"
echo ""
echo -e "  4. 访问后台: ${CYAN}http://你的域名/admin${NC}"
echo -e "     账号: ${CYAN}admin${NC} / ${CYAN}admin123${NC}"
echo ""
