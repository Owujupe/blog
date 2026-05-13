<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Inertia\Inertia;

class PostController extends Controller
{
    public function index()
    {
        return Inertia::render('PostsPage', [
            'posts' => Post::where('status', 'published')->orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function show(string $slug)
    {
        $post = Post::where('slug', $slug)->where('status', 'published')->firstOrFail();
        return Inertia::render('PostDetailPage', ['post' => $post]);
    }
}
