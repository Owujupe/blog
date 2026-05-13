<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Str;

use Illuminate\Database\Eloquent\Factories\HasFactory;

class Giving extends Model
{
    use HasFactory;
    protected $keyType = 'string';
    public $incrementing = false;

    protected $fillable = [
        'reference',
        'email',
        'amount',
        'givingType',
        'name',
        'phone',
        'status',
        'paidAt',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
        'paidAt' => 'datetime',
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
}