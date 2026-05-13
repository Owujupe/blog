<?php

namespace App\Models;

use App\Models\Traits\HasSlug;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Storage;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Post extends Model
{
    use HasSlug, HasFactory;

    protected $keyType = 'string';
    public $incrementing = false;

    protected $table = 'posts';

    protected $fillable = [
        'title',
        'content',
        'featuredImage',
        'status',
        'slug',
    ];

    protected static function boot()
    {
        parent::boot();

        static::creating(function ($model) {
            if (empty($model->id)) {
                $model->id = (string) Str::uuid();
            }
            if (empty($model->slug)) {
                $model->slug = static::generateSlug($model->title);
            }
        });

        static::updating(function ($model) {
            if ($model->isDirty('title')) {
                $model->slug = static::generateSlug($model->title);
            }
        });

        static::deleting(function ($model) {
            if ($model->featuredImage) {
                $path = str_replace('/storage/', '', $model->featuredImage);
                if (Storage::disk('public')->exists($path)) {
                    Storage::disk('public')->delete($path);
                }
            }
        });
    }
}
