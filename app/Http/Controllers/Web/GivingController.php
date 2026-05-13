<?php

namespace App\Http\Controllers\Web;

use App\Http\Controllers\Controller;
use Inertia\Inertia;

class GivingController extends Controller
{
    public function index()
    {
        return Inertia::render('GivingPage');
    }

    public function callback()
    {
        return Inertia::render('GivingCallbackPage');
    }
}
