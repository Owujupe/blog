<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Inertia\Inertia;

class EventController extends Controller
{
    public function index()
    {
        $today = now()->toDateString();

        return Inertia::render('EventsPage', [
            'upcomingEvents' => Event::where('eventDate', '>=', $today)->orderBy('eventDate')->get(),
            'pastEvents' => Event::where('eventDate', '<', $today)->orderBy('eventDate', 'desc')->limit(12)->get(),
        ]);
    }

    public function show(string $slug)
    {
        $event = Event::where('slug', $slug)->firstOrFail();
        return Inertia::render('EventDetailPage', ['event' => $event]);
    }
}
