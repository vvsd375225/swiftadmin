FROM php:8.0-fpm AS base

RUN apt-get update && apt-get install -y \
    libfreetype6-dev libjpeg62-turbo-dev libpng-dev libwebp-dev \
    libzip-dev unzip git \
    && docker-ext-configure gd --with-freetype --with-jpeg --with-webp \
    && docker-php-ext-install -j$(nproc) gd pdo_mysql zip fileinfo \
    && rm -rf /var/lib/apt/lists/*

COPY --from=composer:2 /usr/bin/composer /usr/bin/composer

WORKDIR /var/www/html

# ---- Stage 2: Build frontend ----
FROM node:20-alpine AS frontend-builder

WORKDIR /app/frontend/admin
COPY frontend/admin/package.json frontend/admin/pnpm-lock.yaml* frontend/admin/npm-lock.yaml* ./
RUN if [ -f pnpm-lock.yaml ]; then npm i -g pnpm && pnpm install; \
    elif [ -f npm-lock.yaml ]; then npm ci; \
    else npm install; fi

COPY frontend/admin/ .
RUN npm run build

# ---- Stage 3: Production ----
FROM base AS production

COPY . /var/www/html
COPY --from=frontend-builder /app/frontend/admin/dist /var/www/html/public/admin

RUN composer install --no-dev --optimize-autoloader --no-interaction \
    && mkdir -p runtime && chmod -R 777 runtime \
    && mkdir -p public/uploads && chmod -R 777 public/uploads \
    && mkdir -p public/static && chmod -R 777 public/static

EXPOSE 9000
CMD ["php-fpm", "-F"]
