<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class GalleryController extends Controller
{
    public function index(Request $request)
    {
        $query = Gallery::query();

        if ($request->category) {
            $query->where('category', $request->category);
        }

        $images = $query->orderBy('created_at', 'desc')
            ->skip($request->get('skip', 0))
            ->take($request->get('limit', 100))
            ->get();

        return response()->json($images);
    }

    public function store(Request $request)
    {
        $request->validate([
            'imagePath' => 'required|string',
            'category' => 'in:worship,conferences,community,general',
        ]);

        $item = Gallery::create([
            'imagePath' => $request->imagePath,
            'caption' => $request->caption,
            'category' => $request->get('category', 'general'),
        ]);

        return response()->json($item, 201);
    }

    public function destroy($id)
    {
        $item = Gallery::find($id);

        if (!$item) {
            return response()->json(['detail' => 'Gallery item not found'], 404);
        }

        $item->delete();

        return response()->json(['message' => 'Gallery item deleted']);
    }
}
