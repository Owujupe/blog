<?php

namespace App\Http\Middleware;

use App\Models\SiteSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'auth' => [
                'admin' => Auth::guard('admin')->user() ? [
                    'id' => Auth::guard('admin')->user()->id,
                    'email' => Auth::guard('admin')->user()->email,
                    'token' => $request->session()->get('admin_api_token'),
                ] : null,
            ],
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
            'siteSettings' => fn () => SiteSettings::getOrCreate(),
        ]);
    }
}
