<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Inertia\Inertia;

class GalleryAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Gallery', [
            'images' => Gallery::orderBy('created_at', 'desc')->get(),
        ]);
    }
}
