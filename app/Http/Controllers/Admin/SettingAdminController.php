<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\SiteSettings;
use Inertia\Inertia;

class SettingAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Settings', [
            'settings' => SiteSettings::getOrCreate(),
        ]);
    }
}
