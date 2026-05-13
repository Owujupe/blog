<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Illuminate\Http\Request;

class PostController extends Controller
{
    public function index(Request $request)
    {
        $query = Post::query();

        if ($request->status) {
            $query->where('status', $request->status);
        }

        $posts = $query->orderBy('created_at', 'desc')
            ->skip($request->get('skip', 0))
            ->take($request->get('limit', 100))
            ->get();

        return response()->json($posts);
    }

    public function show($slug)
    {
        $post = Post::where('slug', $slug)->first();

        if (!$post) {
            return response()->json(['detail' => 'Post not found'], 404);
        }

        return response()->json($post);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|string',
            'status' => 'in:draft,published',
        ]);

        $post = Post::create([
            'title' => $request->title,
            'content' => $request->content,
            'featuredImage' => $request->featuredImage,
            'status' => $request->get('status', 'draft'),
        ]);

        return response()->json($post, 201);
    }

    public function update(Request $request, $id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['detail' => 'Post not found'], 404);
        }

        $data = array_filter([
            'title' => $request->title,
            'content' => $request->content,
            'featuredImage' => $request->featuredImage,
            'status' => $request->status,
        ], fn($v) => $v !== null);

        $post->update($data);

        return response()->json($post);
    }

    public function destroy($id)
    {
        $post = Post::find($id);

        if (!$post) {
            return response()->json(['detail' => 'Post not found'], 404);
        }

        $post->delete();

        return response()->json(['message' => 'Post deleted']);
    }
}
