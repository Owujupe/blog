<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Post;
use Inertia\Inertia;

class PostAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Posts/Index', [
            'posts' => Post::orderBy('created_at', 'desc')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Posts/Form', ['post' => null]);
    }

    public function edit(Post $post)
    {
        return Inertia::render('Admin/Posts/Form', ['post' => $post]);
    }
}
