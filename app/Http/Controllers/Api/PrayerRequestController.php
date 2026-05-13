<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\PrayerRequest;
use Illuminate\Http\Request;

class PrayerRequestController extends Controller
{
    public function index(Request $request)
    {
        $query = PrayerRequest::query();

        if ($request->has('isRead')) {
            $query->where('isRead', $request->boolean('isRead'));
        }

        $requests = $query->orderBy('created_at', 'desc')->get();

        return response()->json($requests);
    }

    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string',
            'email' => 'required|email',
            'request' => 'required|string',
        ]);

        $prayerRequest = PrayerRequest::create([
            'name' => $request->name,
            'email' => $request->email,
            'request' => $request->request,
            'isRead' => false,
        ]);

        return response()->json($prayerRequest, 201);
    }

    public function markRead($id)
    {
        $prayerRequest = PrayerRequest::find($id);

        if (!$prayerRequest) {
            return response()->json(['detail' => 'Prayer request not found'], 404);
        }

        $prayerRequest->update(['isRead' => true]);

        return response()->json(['message' => 'Marked as read']);
    }

    public function destroy($id)
    {
        $prayerRequest = PrayerRequest::find($id);

        if (!$prayerRequest) {
            return response()->json(['detail' => 'Prayer request not found'], 404);
        }

        $prayerRequest->delete();

        return response()->json(['message' => 'Prayer request deleted']);
    }
}
