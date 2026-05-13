<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class UploadController extends Controller
{
    private const ALLOWED_CATEGORIES = ['gallery', 'sermons', 'events', 'posts'];
    private const ALLOWED_MIME_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

    public function store(Request $request, string $category)
    {
        if (!in_array($category, self::ALLOWED_CATEGORIES)) {
            return response()->json(['detail' => 'Invalid category'], 400);
        }

        $request->validate([
            'file' => 'required|file|mimes:jpeg,jpg,png,gif,webp|max:10240',
        ]);

        $file = $request->file('file');

        if (!in_array($file->getMimeType(), self::ALLOWED_MIME_TYPES)) {
            return response()->json(['detail' => 'Invalid file type. Only images allowed.'], 400);
        }

        $filename = Str::uuid() . '.' . $file->getClientOriginalExtension();
        $path = "uploads/{$category}/{$filename}";

        Storage::disk('public')->put($path, file_get_contents($file->getRealPath()));

        return response()->json([
            'filename' => $filename,
            'path' => '/storage/' . $path,
        ]);
    }
}
