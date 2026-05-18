@echo off
chcp 65001 >nul
setlocal enabledelayedexpansion

:: ============================================
:: SwiftAdmin 一键安装脚本 (Windows)
:: ============================================

echo ========================================
echo    SwiftAdmin 一键安装脚本 v1.0
echo ========================================
echo.

set "PROJECT_DIR=%~dp0"
cd /d "%PROJECT_DIR%"

:: -------- 1. 环境检测 ----------
echo [1/7] 环境检测...

where php >nul 2>nul || (echo 错误: 未找到 PHP & pause & exit /b 1)
where composer >nul 2>nul || (echo 错误: 未找到 Composer & pause & exit /b 1)
where node >nul 2>nul || (echo 错误: 未找到 Node.js & pause & exit /b 1)
where npm >nul 2>nul || (echo 错误: 未找到 npm & pause & exit /b 1)

for /f "tokens=1,2 delims=." %%a in ('php -r "echo PHP_MAJOR_VERSION.'.'.PHP_MINOR_VERSION;"') do (
    set "PHP_MAJOR=%%a"
    set "PHP_MINOR=%%b"
)
if !PHP_MAJOR! lss 7 (echo PHP ^>= 7.2.5 需要 & pause & exit /b 1)
if !PHP_MAJOR! equ 7 if !PHP_MINOR! lss 2 (echo PHP ^>= 7.2.5 需要 & pause & exit /b 1)

for /f "tokens=1 delims=v." %%a in ('node -v') do set "NODE_MAJOR=%%a"
if !NODE_MAJOR! lss 16 (echo Node.js ^>= 16 需要 & pause & exit /b 1)

echo   PHP OK - Composer OK - Node.js OK - npm OK

:: -------- 2. 数据库配置 ----------
echo.
echo [2/7] 数据库配置...

set "DB_HOST=127.0.0.1"
set "DB_PORT=3306"
set "DB_USER=root"
set "DB_PASS="
set "DB_NAME=swiftadmin"
set "DB_PREFIX=swift_"

set "INPUT="
set /p "INPUT=  MySQL 主机 [127.0.0.1]: "
if not "!INPUT!"=="" set "DB_HOST=!INPUT!"

set "INPUT="
set /p "INPUT=  MySQL 端口 [3306]: "
if not "!INPUT!"=="" set "DB_PORT=!INPUT!"

set "INPUT="
set /p "INPUT=  MySQL 用户名 [root]: "
if not "!INPUT!"=="" set "DB_USER=!INPUT!"

set /p "DB_PASS=  MySQL 密码: "

set "INPUT="
set /p "INPUT=  数据库名 [swiftadmin]: "
if not "!INPUT!"=="" set "DB_NAME=!INPUT!"

set "INPUT="
set /p "INPUT=  表前缀 [swift_]: "
if not "!INPUT!"=="" set "DB_PREFIX=!INPUT!"

:: -------- 3. 创建库 ----------
echo.
echo [3/7] 创建数据库...

if "!DB_PASS!"=="" (
    mysql -h!DB_HOST! -P!DB_PORT! -u!DB_USER! -e "CREATE DATABASE IF NOT EXISTS `!DB_NAME!` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
) else (
    mysql -h!DB_HOST! -P!DB_PORT! -u!DB_USER! -p!DB_PASS! -e "CREATE DATABASE IF NOT EXISTS `!DB_NAME!` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul
)
if %errorlevel% neq 0 (echo 数据库连接失败 & pause & exit /b 1)
echo   数据库 !DB_NAME! OK

:: -------- 4. 导入表结构 ----------
echo.
echo [4/7] 导入表结构...

if exist "database\install.sql" (
    if "!DB_PASS!"=="" (
        mysql -h!DB_HOST! -P!DB_PORT! -u!DB_USER! !DB_NAME! < database\install.sql 2>nul
    ) else (
        mysql -h!DB_HOST! -P!DB_PORT! -u!DB_USER! -p!DB_PASS! !DB_NAME! < database\install.sql 2>nul
    )
    echo   导入 完成 OK
) else (
    echo   跳过 (install.sql 不存在)
)

:: -------- 5. 生成 .env ----------
echo.
echo [5/7] 生成 .env...

(
echo APP_DEBUG = true
echo.
echo [DATABASE]
echo TYPE = mysql
echo HOSTNAME = !DB_HOST!
echo DATABASE = !DB_NAME!
echo USERNAME = !DB_USER!
echo PASSWORD = !DB_PASS!
echo HOSTPORT = !DB_PORT!
echo CHARSET = utf8mb4
echo PREFIX = !DB_PREFIX!
echo.
echo [REDIS]
echo HOST = 127.0.0.1
echo PORT = 6379
echo PASSWORD =
echo SELECT = 0
echo.
echo [CACHE]
echo DRIVER = file
) > .env
echo   .env 已生成 OK

:: -------- 6. 安装依赖 ----------
echo.
echo [6/7] 安装依赖...

echo   安装 Composer 依赖...
call composer install --no-interaction --prefer-dist 2>nul
if %errorlevel% neq 0 (echo Composer 安装失败 & pause & exit /b 1)

echo   安装 NPM 依赖...
cd frontend\admin
call npm install --silent 2>nul
if %errorlevel% neq 0 (echo npm install 失败 & pause & exit /b 1)

echo   构建前端...
call npm run build 2>nul
if %errorlevel% neq 0 (echo 前端构建失败 & pause & exit /b 1)

cd /d "%PROJECT_DIR%"
echo   依赖 完成 OK

:: -------- 7. 目录 ----------
echo.
echo [7/7] 创建目录...

if not exist "runtime" mkdir runtime
if not exist "public\uploads" mkdir public\uploads
if not exist "public\static" mkdir public\static
echo   目录 完成 OK

:: -------- 完成 ----------
echo.
echo ========================================
echo    安装完成！
echo ========================================
echo   启动后端: php think run
echo   启动前端: cd frontend\admin ^&^& npm run dev
echo   登录账号: admin / admin123
echo.

pause
