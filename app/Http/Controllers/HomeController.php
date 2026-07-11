<?php

namespace App\Http\Controllers;

use App\Models\Achievement;
use App\Models\Blog;
use App\Models\Certificate;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Home', [
            'profile' => Profile::current(),
            'skills' => Skill::orderBy('sort_order')->orderBy('name')->get()
                ->groupBy('category')
                ->map(fn ($group) => $group->values()),
            'skillCategories' => Skill::CATEGORIES,
            'experiences' => Experience::orderBy('sort_order')->orderByDesc('start_date')->get(),
            'projects' => Project::orderBy('sort_order')->orderByDesc('created_at')->get(),
            'certificates' => Certificate::orderBy('sort_order')->orderByDesc('issued_at')->get(),
            'achievements' => Achievement::orderBy('sort_order')->get(),
            'educations' => Education::orderBy('sort_order')->orderByDesc('start_date')->get(),
            'latestPosts' => Blog::published()
                ->orderByDesc('published_at')
                ->limit(3)
                ->get(['id', 'title', 'slug', 'excerpt', 'thumbnail_url', 'published_at']),
        ]);
    }
}
