<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Inertia\Inertia;

class EventAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Events/Index', [
            'events' => Event::orderBy('eventDate', 'desc')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Events/Form', ['event' => null]);
    }

    public function edit(Event $event)
    {
        return Inertia::render('Admin/Events/Form', ['event' => $event]);
    }
}
