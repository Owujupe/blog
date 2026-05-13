<?php

namespace App\Http\Controllers;

use App\Models\Sermon;
use App\Models\Event;
use App\Models\Gallery;
use App\Models\Livestream;
use App\Models\SiteSettings;
use Inertia\Inertia;
use App\Models\Post;

class HomeController extends Controller
{
    public function index()
    {
        $latestSermon = Sermon::orderBy('sermonDate', 'desc')->first();
        $upcomingEvents = Event::where('eventDate', '>=', now()->toDateString())
            ->orderBy('eventDate')
            ->limit(3)
            ->get();
        $galleryImages = Gallery::orderBy('created_at', 'desc')->limit(6)->get();
        $livestream = Livestream::first();
        $settings = SiteSettings::first();

       $posts = Post::latest()
            ->limit(3)
            ->get();

        return Inertia::render('HomePage', [
            'latestSermon' => $latestSermon,
            'upcomingEvents' => $upcomingEvents,
            'galleryImages' => $galleryImages,
            'livestream' => $livestream,
            'settings' => $settings,
            'posts' => $posts,
        ]);
    }
}