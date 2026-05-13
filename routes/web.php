<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Web\AboutController;
use App\Http\Controllers\Web\SermonController;
use App\Http\Controllers\Web\EventController;
use App\Http\Controllers\Web\GalleryController;
use App\Http\Controllers\Web\PostController;
use App\Http\Controllers\Web\ContactController;
use App\Http\Controllers\Web\GivingController;
use App\Http\Controllers\Admin\AuthController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\PostAdminController;
use App\Http\Controllers\Admin\SermonAdminController;
use App\Http\Controllers\Admin\EventAdminController;
use App\Http\Controllers\Admin\GalleryAdminController;
use App\Http\Controllers\Admin\LivestreamAdminController;
use App\Http\Controllers\Admin\PrayerRequestAdminController;
use App\Http\Controllers\Admin\MessageAdminController;
use App\Http\Controllers\Admin\SettingAdminController;
use App\Http\Controllers\Admin\GivingAdminController;

// ==================== PUBLIC ROUTES ====================
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/about', [AboutController::class, 'index'])->name('about');

Route::get('/sermons', [SermonController::class, 'index'])->name('sermons');
Route::get('/sermons/{slug}', [SermonController::class, 'show'])->name('sermons.show');

Route::get('/events', [EventController::class, 'index'])->name('events');
Route::get('/events/{slug}', [EventController::class, 'show'])->name('events.show');

Route::get('/gallery', [GalleryController::class, 'index'])->name('gallery');

Route::get('/posts', [PostController::class, 'index'])->name('posts');
Route::get('/posts/{slug}', [PostController::class, 'show'])->name('posts.show');

Route::get('/contact', [ContactController::class, 'index'])->name('contact');

Route::get('/giving', [GivingController::class, 'index'])->name('giving');
Route::get('/giving/callback', [GivingController::class, 'callback'])->name('giving.callback');

// ==================== ADMIN AUTH ====================
Route::get('/admin', fn () => redirect()->route('admin.dashboard'));
Route::get('/admin/login', [AuthController::class, 'showLogin'])->name('admin.login');
Route::post('/admin/login', [AuthController::class, 'login'])->name('admin.login.post');

// ==================== ADMIN PROTECTED ROUTES ====================
Route::middleware('admin.auth')->prefix('admin')->name('admin.')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

    Route::get('/dashboard', [DashboardController::class, 'index'])->name('dashboard');

    Route::get('/posts', [PostAdminController::class, 'index'])->name('posts');
    Route::get('/posts/create', [PostAdminController::class, 'create'])->name('posts.create');
    Route::get('/posts/{post}/edit', [PostAdminController::class, 'edit'])->name('posts.edit');

    Route::get('/sermons', [SermonAdminController::class, 'index'])->name('sermons');
    Route::get('/sermons/create', [SermonAdminController::class, 'create'])->name('sermons.create');
    Route::get('/sermons/{sermon}/edit', [SermonAdminController::class, 'edit'])->name('sermons.edit');

    Route::get('/events', [EventAdminController::class, 'index'])->name('events');
    Route::get('/events/create', [EventAdminController::class, 'create'])->name('events.create');
    Route::get('/events/{event}/edit', [EventAdminController::class, 'edit'])->name('events.edit');

    Route::get('/gallery', [GalleryAdminController::class, 'index'])->name('gallery');
    Route::get('/livestream', [LivestreamAdminController::class, 'index'])->name('livestream');
    Route::get('/prayer-requests', [PrayerRequestAdminController::class, 'index'])->name('prayer-requests');
    Route::get('/messages', [MessageAdminController::class, 'index'])->name('messages');
    Route::get('/settings', [SettingAdminController::class, 'index'])->name('settings');
    Route::get('/giving', [GivingAdminController::class, 'index'])->name('giving');
});
