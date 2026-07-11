<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Profile extends Model
{
    protected $guarded = [];

    /**
     * The single profile row, created on first access.
     */
    public static function current(): self
    {
        return static::firstOrCreate([], ['name' => config('app.name')]);
    }
}
