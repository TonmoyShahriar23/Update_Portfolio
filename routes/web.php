<?php

use App\Http\Controllers\Admin;
use App\Http\Controllers\Auth\AuthenticatedSessionController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactController;
use App\Http\Controllers\HomeController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Public site
|--------------------------------------------------------------------------
*/

Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/blog', [BlogController::class, 'index'])->name('blog.index');
Route::get('/blog/{slug}', [BlogController::class, 'show'])->name('blog.show');
Route::post('/contact', [ContactController::class, 'store'])
    ->middleware('throttle:10,1')
    ->name('contact.store');

/*
|--------------------------------------------------------------------------
| Auth
|--------------------------------------------------------------------------
*/

Route::middleware('guest')->group(function () {
    Route::get('/admin/login', [AuthenticatedSessionController::class, 'create'])->name('login');
    Route::post('/admin/login', [AuthenticatedSessionController::class, 'store'])
        ->middleware('throttle:10,1');
});

Route::post('/admin/logout', [AuthenticatedSessionController::class, 'destroy'])
    ->middleware('auth')
    ->name('logout');

/*
|--------------------------------------------------------------------------
| Admin panel
|--------------------------------------------------------------------------
*/

Route::prefix('admin')->name('admin.')->middleware('auth')->group(function () {
    Route::get('/', [Admin\DashboardController::class, 'index'])->name('dashboard');

    Route::get('/profile', [Admin\ProfileController::class, 'edit'])->name('profile.edit');
    Route::post('/profile', [Admin\ProfileController::class, 'update'])->name('profile.update');

    Route::resource('projects', Admin\ProjectController::class)->only(['index', 'store', 'destroy']);
    Route::post('projects/{project}', [Admin\ProjectController::class, 'update'])->name('projects.update');

    Route::resource('skills', Admin\SkillController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('experiences', Admin\ExperienceController::class)->only(['index', 'store', 'update', 'destroy']);

    Route::resource('certificates', Admin\CertificateController::class)->only(['index', 'store', 'destroy']);
    Route::post('certificates/{certificate}', [Admin\CertificateController::class, 'update'])->name('certificates.update');

    Route::resource('blogs', Admin\BlogController::class)->only(['index', 'create', 'store', 'edit', 'destroy']);
    Route::post('blogs/{blog}', [Admin\BlogController::class, 'update'])->name('blogs.update');
    Route::patch('blogs/{blog}/toggle-publish', [Admin\BlogController::class, 'togglePublish'])->name('blogs.toggle-publish');

    Route::resource('achievements', Admin\AchievementController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('education', Admin\EducationController::class)
        ->parameters(['education' => 'education'])
        ->only(['index', 'store', 'update', 'destroy']);

    Route::get('messages', [Admin\MessageController::class, 'index'])->name('messages.index');
    Route::patch('messages/{message}/toggle-read', [Admin\MessageController::class, 'toggleRead'])->name('messages.toggle-read');
    Route::delete('messages/{message}', [Admin\MessageController::class, 'destroy'])->name('messages.destroy');
});
