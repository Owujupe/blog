<?php

namespace App\Http\Middleware;

use App\Models\Admin;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class ApiAdminAuth
{
    public function handle(Request $request, Closure $next): Response
    {
        $token = $request->bearerToken();

        if (!$token) {
            return response()->json(['detail' => 'Authentication required'], 401);
        }

        $admin = Admin::where('api_token', hash('sha256', $token))->first();

        if (!$admin) {
            return response()->json(['detail' => 'Invalid or expired token'], 401);
        }

        $request->setUserResolver(fn() => $admin);

        return $next($request);
    }
}
