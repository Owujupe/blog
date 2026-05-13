<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Livestream;
use Illuminate\Http\Request;

class LivestreamController extends Controller
{
    public function show()
    {
        return response()->json(Livestream::getOrCreate());
    }

    public function update(Request $request)
    {
        $livestream = Livestream::getOrCreate();

        $data = array_filter([
            'youtubeUrl' => $request->youtubeUrl,
            'isActive' => $request->has('isActive') ? $request->boolean('isActive') : null,
        ], fn($v) => $v !== null);

        $livestream->update($data);

        return response()->json($livestream->fresh());
    }
}
