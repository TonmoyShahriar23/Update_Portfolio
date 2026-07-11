<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Skill extends Model
{
    protected $guarded = [];

    public const CATEGORIES = [
        'Languages',
        'Frameworks & Libraries',
        'Tools & Platforms',
        'Methodologies',
        'Other',
    ];
}
