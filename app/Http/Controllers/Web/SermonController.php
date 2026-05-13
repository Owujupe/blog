<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use App\Models\Sermon;
use Inertia\Inertia;

class SermonController extends Controller
{
    public function index()
    {
        return Inertia::render('SermonsPage', [
            'sermons' => Sermon::orderBy('sermonDate', 'desc')->get(),
            'speakers' => Sermon::distinct()->pluck('speaker')->filter()->values(),
            'seriesList' => Sermon::distinct()->pluck('series')->filter()->values(),
        ]);
    }

    public function show(string $slug)
    {
        $sermon = Sermon::where('slug', $slug)->firstOrFail();
        return Inertia::render('SermonDetailPage', ['sermon' => $sermon]);
    }
}
