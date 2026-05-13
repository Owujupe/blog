<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sermon;
use App\Models\Event;
use App\Models\Post;
use App\Models\Gallery;
use App\Models\PrayerRequest;
use App\Models\ContactMessage;

class DashboardController extends Controller
{
    public function stats()
    {
        return response()->json([
            'sermons' => Sermon::count(),
            'events' => Event::count(),
            'posts' => Post::count(),
            'gallery' => Gallery::count(),
            'prayer_requests' => PrayerRequest::count(),
            'unread_prayers' => PrayerRequest::where('isRead', false)->count(),
            'contact_messages' => ContactMessage::count(),
        ]);
    }
}
