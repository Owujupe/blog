<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Event;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;

class EventController extends Controller
{
    public function index(Request $request)
    {
        $query = Event::query();
        $today = Carbon::today()->toDateString();

        if ($request->has('upcoming')) {
            if ($request->boolean('upcoming')) {
                $query->where('eventDate', '>=', $today)->orderBy('eventDate', 'asc');
            } else {
                $query->where('eventDate', '<', $today)->orderBy('eventDate', 'desc');
            }
        } else {
            $query->orderBy('eventDate', 'asc');
        }

        $events = $query->skip($request->get('skip', 0))
            ->take($request->get('limit', 100))
            ->get();

        return response()->json($events);
    }

    public function show($slug)
    {
        $event = Event::where('slug', $slug)->first();

        if (!$event) {
            return response()->json(['detail' => 'Event not found'], 404);
        }

        return response()->json($event);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'eventDate' => 'required|date',
            'eventTime' => 'required|string',
            'location' => 'required|string',
        ]);

        $event = Event::create([
            'title' => $request->title,
            'description' => $request->description,
            'eventDate' => $request->eventDate,
            'eventTime' => $request->eventTime,
            'location' => $request->location,
            'banner' => $request->banner,
        ]);

        return response()->json($event, 201);
    }

    public function update(Request $request, $id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['detail' => 'Event not found'], 404);
        }

        $data = array_filter([
            'title' => $request->title,
            'description' => $request->description,
            'eventDate' => $request->eventDate,
            'eventTime' => $request->eventTime,
            'location' => $request->location,
            'banner' => $request->banner,
        ], fn($v) => $v !== null);

        $event->update($data);

        return response()->json($event);
    }

    public function destroy($id)
    {
        $event = Event::find($id);

        if (!$event) {
            return response()->json(['detail' => 'Event not found'], 404);
        }

        $event->delete();

        return response()->json(['message' => 'Event deleted']);
    }
}
