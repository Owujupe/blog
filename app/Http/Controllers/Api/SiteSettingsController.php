<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\SiteSettings;
use Illuminate\Http\Request;

class SiteSettingsController extends Controller
{
    public function show()
    {
        return response()->json(SiteSettings::getOrCreate());
    }

    public function update(Request $request)
    {
        $settings = SiteSettings::getOrCreate();

        $settings->update(array_filter([
            'churchName' => $request->churchName,
            'tagline' => $request->tagline,
            'address' => $request->address,
            'phone' => $request->phone,
            'email' => $request->email,
            'serviceDay' => $request->serviceDay,
            'serviceTime' => $request->serviceTime,
            'aboutShort' => $request->aboutShort,
            'vision' => $request->vision,
            'mission' => $request->mission,
            'facebookUrl' => $request->facebookUrl,
            'instagramUrl' => $request->instagramUrl,
            'twitterUrl' => $request->twitterUrl,
            'youtubeUrl' => $request->youtubeUrl,
        ], fn($v) => $v !== null));

        return response()->json($settings->fresh());
    }
}
