<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Gallery;
use Inertia\Inertia;

class GalleryController extends Controller
{
    public function index()
    {
        return Inertia::render('GalleryPage', [
            'images' => Gallery::orderBy('created_at', 'desc')->get(),
        ]);
    }
}
