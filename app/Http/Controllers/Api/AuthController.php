<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Admin;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        if (Admin::count() > 0) {
            return response()->json(['detail' => 'Admin already exists. Only one admin allowed.'], 400);
        }

        $request->validate([
            'email' => 'required|email|unique:admins,email',
            'password' => 'required|min:6',
        ]);

        $admin = Admin::create([
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);

        $token = $admin->generateApiToken();

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'admin' => ['id' => $admin->id, 'email' => $admin->email, 'created_at' => $admin->created_at],
        ]);
    }

    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email',
            'password' => 'required',
        ]);

        $admin = Admin::where('email', $request->email)->first();

        if (!$admin || !Hash::check($request->password, $admin->password)) {
            return response()->json(['detail' => 'Invalid email or password'], 401);
        }

        $token = $admin->generateApiToken();

        return response()->json([
            'access_token' => $token,
            'token_type' => 'bearer',
            'admin' => ['id' => $admin->id, 'email' => $admin->email, 'created_at' => $admin->created_at],
        ]);
    }

    public function me(Request $request)
    {
        $admin = $request->user();
        return response()->json(['id' => $admin->id, 'email' => $admin->email, 'created_at' => $admin->created_at]);
    }
}
