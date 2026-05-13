<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\PrayerRequest;
use Inertia\Inertia;

class PrayerRequestAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/PrayerRequests', [
            'prayerRequests' => PrayerRequest::orderBy('created_at', 'desc')->get(),
        ]);
    }
}
