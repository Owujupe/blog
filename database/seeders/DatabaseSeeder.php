<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // 1. Create SuperAdmin
        \App\Models\Admin::updateOrCreate(
            ['email' => 'superadmin@gla.org'],
            ['password' => \Illuminate\Support\Facades\Hash::make('superpassword')]
        );

        // 2. Create Default Admin (as before)
        \App\Models\Admin::updateOrCreate(
            ['email' => 'admin@glaabuja.org'],
            ['password' => \Illuminate\Support\Facades\Hash::make('secret')]
        );

        // 3. Initialize Singletons
        \App\Models\SiteSettings::getOrCreate();
        \App\Models\Livestream::getOrCreate();

        // 4. Seed Fake Data
        \App\Models\Post::factory(10)->create();
        \App\Models\Sermon::factory(8)->create();
        \App\Models\Event::factory(5)->create();
        \App\Models\Gallery::factory(12)->create();
        \App\Models\Giving::factory(20)->create();
        \App\Models\PrayerRequest::factory(15)->create();
        \App\Models\ContactMessage::factory(10)->create();
        \App\Models\User::factory(5)->create(); // Regular users if needed
    }
}
