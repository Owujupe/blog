<?php

namespace App\Models\Traits;

use Illuminate\Support\Str;

trait HasSlug
{
    public static function generateSlug(string $title): string
    {
        $slug = strtolower(trim(preg_replace('/[^\w\s-]/', '', $title)));
        $slug = preg_replace('/[-\s]+/', '-', $slug);
        return $slug . '-' . substr(str_replace('-', '', (string) Str::uuid()), 0, 8);
    }
}
