<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ContactMessage;
use Illuminate\Http\Request;

class ContactController extends Controller
{
    public function index()
    {
        return response()->json(ContactMessage::orderBy('created_at', 'desc')->get());
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'message' => 'required|string',
        ]);

        $message = ContactMessage::create([
            'name' => $request->name,
            'email' => $request->email,
            'phone' => $request->phone,
            'message' => $request->message,
        ]);

        return response()->json($message, 201);
    }

    public function destroy($id)
    {
        $message = ContactMessage::find($id);

        if (!$message) {
            return response()->json(['detail' => 'Message not found'], 404);
        }

        $message->delete();

        return response()->json(['message' => 'Message deleted']);
    }
}
