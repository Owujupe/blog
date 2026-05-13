<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Inertia\Inertia;

class MessageAdminController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/Messages', [
            'messages' => ContactMessage::orderBy('created_at', 'desc')->get(),
        ]);
    }
}
