<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class SiteSettings extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'churchName',
        'tagline',
        'address',
        'phone',
        'email',
        'serviceDay',
        'serviceTime',
        'aboutShort',
        'vision',
        'mission',
        'facebookUrl',
        'instagramUrl',
        'twitterUrl',
        'youtubeUrl',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
        });
    }

    public static function getOrCreate(): self
    {
        $settings = static::first();
        if (!$settings) {
            $settings = static::create([
                'churchName' => 'Guiding Light Assembly Abuja',
                'tagline' => 'Building Leaders. Changing the World',
                'address' => '123 Faith Avenue, Wuse 2, Abuja, Nigeria',
                'phone' => '+234 800 123 4567',
                'email' => 'info@guidinglightassembly.org',
                'serviceDay' => 'Sunday',
                'serviceTime' => '9:00 AM',
                'aboutShort' => 'Welcome to Guiding Light Assembly - a place where faith meets purpose.',
                'vision' => "To raise a generation of leaders who will transform their world through the power of God's Word.",
                'mission' => "To build leaders through the teaching of God's Word, fellowship, and community service.",
            ]);
        }
        return $settings;
    }
}
