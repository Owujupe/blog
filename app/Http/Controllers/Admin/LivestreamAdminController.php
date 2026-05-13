<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Livestream;
use Inertia\Inertia;

class LivestreamAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Livestream', [
            'livestream' => Livestream::getOrCreate(),
        ]);
    }
}
