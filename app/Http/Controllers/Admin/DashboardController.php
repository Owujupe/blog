<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sermon;
use App\Models\Event;
use App\Models\Post;
use App\Models\Gallery;
use App\Models\PrayerRequest;
use App\Models\ContactMessage;
use App\Models\Giving;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'sermons' => Sermon::count(),
                'events' => Event::count(),
                'posts' => Post::count(),
                'gallery' => Gallery::count(),
                'prayer_requests' => PrayerRequest::count(),
                'unread_prayers' => PrayerRequest::where('isRead', false)->count(),
                'contact_messages' => ContactMessage::count(),
            ],
        ]);
    }
}
