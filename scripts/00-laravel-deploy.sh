#!/usr/bin/env bash
echo "Running composer"
composer install --no-dev --working-dir=/var/www/html --optimize-autoloader

echo "Caching config..."
php artisan config:cache

echo "Caching routes..."
php artisan route:cache

echo "Building frontend assets..."
npm install
npm run build

echo "Running migrations..."
php artisan migrate --force