# Mostaque Shahriar Tonmoy — Portfolio

A fully dynamic personal portfolio built with **Laravel 13**, **React 19 (Inertia.js)**, **Tailwind CSS v4**, and **MySQL**, with all media stored on **Cloudinary** (deploy-safe for ephemeral filesystems like Railway/Render).

## Features

- **Public site** — Hero, About, Skills (categorized), Experience timeline, Projects, Certificates gallery, Education, Achievements, Blog (list + post pages), Contact form (saved to DB).
- **Admin panel** (`/admin`) — manage every section above, plus contact-message inbox with read/unread. No public registration; single seeded admin.
- **Dark/light mode** — navbar toggle, persisted in `localStorage`, applied pre-paint (no flash).
- **Cloudinary media** — profile photo, project images, certificate images, and blog thumbnails upload to Cloudinary; only the secure URL + `public_id` are stored. Replaced/deleted records clean up their Cloudinary assets.

## Local development (Laragon)

```bash
composer install
npm install
# .env is already configured for MySQL (portfolio_db) + Cloudinary
php artisan migrate:fresh --seed
npm run build        # or: npm run dev (hot reload)
php artisan serve    # http://127.0.0.1:8000
```

## Admin login

- URL: `http://127.0.0.1:8000/admin/login`
- Email: `tonmoyshahriar792@gmail.com`
- Password: `password` — **change this immediately** (update the hash via tinker or re-seed with a new password in `database/seeders/PortfolioSeeder.php`).

## Cloudinary

Configured via `CLOUDINARY_URL` in `.env` (read in `config/services.php`, used by `App\Services\CloudinaryService`).

> ⚠️ The current API secret is rejected by Cloudinary (`api_secret mismatch`). Copy the exact **API Environment variable** from your Cloudinary dashboard (Settings → API Keys) into `CLOUDINARY_URL` — image uploads will fail until then. Everything else works without it.

The official `cloudinary-labs/cloudinary-laravel` package doesn't support Laravel 13 yet, so this project uses the official `cloudinary/cloudinary_php` SDK behind a thin service class — same behaviour, no framework coupling.

## Tests

```bash
php artisan test
```

Feature tests cover the public pages, publish/draft blog visibility, contact form storage, auth redirects/login, and admin CRUD basics.

## Deploying (Railway / Render)

1. Set env vars: `APP_KEY`, `APP_ENV=production`, `APP_DEBUG=false`, `APP_URL`, the `DB_*` values for the hosted MySQL, and `CLOUDINARY_URL`.
2. Build command: `composer install --no-dev --optimize-autoloader && npm ci && npm run build`
3. Release/start: `php artisan migrate --force && php artisan db:seed --force` (first deploy only for the seed), then serve `public/` (e.g. `php artisan serve --host 0.0.0.0 --port $PORT` or nginx/Apache).
4. No local file storage is used anywhere, so the ephemeral filesystem is safe.
