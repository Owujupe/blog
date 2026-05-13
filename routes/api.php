<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\PostController;
use App\Http\Controllers\Api\SermonController;
use App\Http\Controllers\Api\EventController;
use App\Http\Controllers\Api\GalleryController;
use App\Http\Controllers\Api\LivestreamController;
use App\Http\Controllers\Api\PrayerRequestController;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\SiteSettingsController;
use App\Http\Controllers\Api\UploadController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\GivingController;

// ==================== AUTH ====================
Route::post('/auth/register', [AuthController::class, 'register']);
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/auth/me', [AuthController::class, 'me'])->middleware('api.admin.auth');

// ==================== POSTS (public read, admin write) ====================
Route::get('/posts', [PostController::class, 'index']);
Route::get('/posts/{slug}', [PostController::class, 'show']);
Route::middleware('api.admin.auth')->group(function () {
    Route::post('/posts', [PostController::class, 'store']);
    Route::put('/posts/{post}', [PostController::class, 'update']);
    Route::delete('/posts/{post}', [PostController::class, 'destroy']);
});

// ==================== SERMONS ====================
Route::get('/sermons', [SermonController::class, 'index']);
Route::get('/sermons/latest', [SermonController::class, 'latest']);
Route::get('/sermons/meta/speakers', [SermonController::class, 'speakers']);
Route::get('/sermons/meta/series', [SermonController::class, 'series']);
Route::get('/sermons/{slug}', [SermonController::class, 'show']);
Route::middleware('api.admin.auth')->group(function () {
    Route::post('/sermons', [SermonController::class, 'store']);
    Route::put('/sermons/{sermon}', [SermonController::class, 'update']);
    Route::delete('/sermons/{sermon}', [SermonController::class, 'destroy']);
});

// ==================== EVENTS ====================
Route::get('/events', [EventController::class, 'index']);
Route::get('/events/{slug}', [EventController::class, 'show']);
Route::middleware('api.admin.auth')->group(function () {
    Route::post('/events', [EventController::class, 'store']);
    Route::put('/events/{event}', [EventController::class, 'update']);
    Route::delete('/events/{event}', [EventController::class, 'destroy']);
});

// ==================== GALLERY ====================
Route::get('/gallery', [GalleryController::class, 'index']);
Route::middleware('api.admin.auth')->group(function () {
    Route::post('/gallery', [GalleryController::class, 'store']);
    Route::delete('/gallery/{gallery}', [GalleryController::class, 'destroy']);
});

// ==================== LIVESTREAM ====================
Route::get('/livestream', [LivestreamController::class, 'show']);
Route::middleware('api.admin.auth')->group(function () {
    Route::put('/livestream', [LivestreamController::class, 'update']);
});

// ==================== PRAYER REQUESTS ====================
Route::post('/prayer-requests', [PrayerRequestController::class, 'store']);
Route::middleware('api.admin.auth')->group(function () {
    Route::get('/prayer-requests', [PrayerRequestController::class, 'index']);
    Route::put('/prayer-requests/{prayerRequest}/read', [PrayerRequestController::class, 'markRead']);
    Route::delete('/prayer-requests/{prayerRequest}', [PrayerRequestController::class, 'destroy']);
});

// ==================== CONTACT ====================
Route::post('/contact', [ContactController::class, 'store']);
Route::middleware('api.admin.auth')->group(function () {
    Route::get('/contact', [ContactController::class, 'index']);
    Route::delete('/contact/{contactMessage}', [ContactController::class, 'destroy']);
});

// ==================== SITE SETTINGS ====================
Route::get('/settings', [SiteSettingsController::class, 'show']);
Route::middleware('api.admin.auth')->group(function () {
    Route::put('/settings', [SiteSettingsController::class, 'update']);
});

// ==================== FILE UPLOAD ====================
Route::middleware('api.admin.auth')->group(function () {
    Route::post('/upload/{category}', [UploadController::class, 'store']);
});

// ==================== DASHBOARD ====================
Route::middleware('api.admin.auth')->group(function () {
    Route::get('/dashboard/stats', [DashboardController::class, 'stats']);
});

// ==================== GIVING / PAYSTACK ====================
Route::post('/giving/initialize', [GivingController::class, 'initialize']);
Route::get('/giving/verify/{reference}', [GivingController::class, 'verify']);
Route::post('/giving/webhook', [GivingController::class, 'webhook']);
Route::get('/giving/public-key', [GivingController::class, 'publicKey']);
Route::middleware('api.admin.auth')->group(function () {
    Route::get('/giving/history', [GivingController::class, 'history']);
    Route::get('/giving/stats', [GivingController::class, 'stats']);
});
