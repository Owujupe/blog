<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Giving;
use Inertia\Inertia;

class GivingAdminController extends Controller
{
    public function index()
    {
        $rows = Giving::where('status', 'success')
            ->selectRaw('givingType, SUM(amount) as total, COUNT(*) as count')
            ->groupBy('givingType')
            ->get()
            ->keyBy('givingType');

        return Inertia::render('Admin/Giving', [
            'givings' => Giving::where('status', 'success')->orderBy('created_at', 'desc')->get(),
            'stats' => [
                'tithe' => (float) ($rows->get('tithe')?->total ?? 0),
                'offering' => (float) ($rows->get('offering')?->total ?? 0),
                'benevolent' => (float) ($rows->get('benevolent')?->total ?? 0),
                'total' => (float) (($rows->get('tithe')?->total ?? 0) + ($rows->get('offering')?->total ?? 0) + ($rows->get('benevolent')?->total ?? 0)),
                'total_transactions' => Giving::where('status', 'success')->count(),
            ],
        ]);
    }
}
