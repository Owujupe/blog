<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

class Livestream extends Model
{
    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'livestreams';

    protected $fillable = [
        'youtubeUrl',
        'isActive',
    ];

    protected $casts = [
        'isActive' => 'boolean',
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
        $livestream = static::first();
        if (!$livestream) {
            $livestream = static::create(['youtubeUrl' => '', 'isActive' => false]);
        }
        return $livestream;
    }
}
