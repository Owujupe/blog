<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Sermon;
use Inertia\Inertia;

class SermonAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Sermons/Index', [
            'sermons' => Sermon::orderBy('sermonDate', 'desc')->get(),
        ]);
    }

    public function create()
    {
        return Inertia::render('Admin/Sermons/Form', ['sermon' => null]);
    }

    public function edit(Sermon $sermon)
    {
        return Inertia::render('Admin/Sermons/Form', ['sermon' => $sermon]);
    }
}
