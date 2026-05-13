<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Sermon;
use Illuminate\Http\Request;

class SermonController extends Controller
{
    public function index(Request $request)
    {
        $query = Sermon::query();

        if ($request->series) {
            $query->where('series', $request->series);
        }
        if ($request->speaker) {
            $query->where('speaker', $request->speaker);
        }
        if ($request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('title', 'like', "%$search%")
                  ->orWhere('description', 'like', "%$search%");
            });
        }

        $sermons = $query->orderBy('sermonDate', 'desc')
            ->skip($request->get('skip', 0))
            ->take($request->get('limit', 100))
            ->get();

        return response()->json($sermons);
    }

    public function latest()
    {
        $sermon = Sermon::orderBy('sermonDate', 'desc')->first();

        if (!$sermon) {
            return response()->json(['detail' => 'No sermons found'], 404);
        }

        return response()->json($sermon);
    }

    public function show($slug)
    {
        $sermon = Sermon::where('slug', $slug)->first();

        if (!$sermon) {
            return response()->json(['detail' => 'Sermon not found'], 404);
        }

        return response()->json($sermon);
    }

    public function speakers()
    {
        $speakers = Sermon::distinct()->pluck('speaker')->filter()->values();
        return response()->json($speakers);
    }

    public function series()
    {
        $series = Sermon::distinct()->pluck('series')->filter()->values();
        return response()->json($series);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'speaker' => 'required|string',
            'videoUrl' => 'required|string',
            'sermonDate' => 'required|date',
        ]);

        $sermon = Sermon::create([
            'title' => $request->title,
            'speaker' => $request->speaker,
            'series' => $request->series,
            'description' => $request->description,
            'videoUrl' => $request->videoUrl,
            'thumbnail' => $request->thumbnail,
            'sermonDate' => $request->sermonDate,
        ]);

        return response()->json($sermon, 201);
    }

    public function update(Request $request, $id)
    {
        $sermon = Sermon::find($id);

        if (!$sermon) {
            return response()->json(['detail' => 'Sermon not found'], 404);
        }

        $data = array_filter([
            'title' => $request->title,
            'speaker' => $request->speaker,
            'series' => $request->series,
            'description' => $request->description,
            'videoUrl' => $request->videoUrl,
            'thumbnail' => $request->thumbnail,
            'sermonDate' => $request->sermonDate,
        ], fn($v) => $v !== null);

        $sermon->update($data);

        return response()->json($sermon);
    }

    public function destroy($id)
    {
        $sermon = Sermon::find($id);

        if (!$sermon) {
            return response()->json(['detail' => 'Sermon not found'], 404);
        }

        $sermon->delete();

        return response()->json(['message' => 'Sermon deleted']);
    }
}
