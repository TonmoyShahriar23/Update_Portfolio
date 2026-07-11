<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use App\Models\Blog;
use App\Models\Certificate;
use App\Models\Experience;
use App\Models\Message;
use App\Models\Project;
use App\Models\Skill;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Dashboard', [
            'stats' => [
                'projects' => Project::count(),
                'skills' => Skill::count(),
                'experiences' => Experience::count(),
                'certificates' => Certificate::count(),
                'blogs' => Blog::count(),
                'publishedBlogs' => Blog::published()->count(),
                'achievements' => Achievement::count(),
                'messages' => Message::count(),
                'unreadMessages' => Message::where('is_read', false)->count(),
            ],
            'recentMessages' => Message::orderByDesc('created_at')->limit(5)->get(),
        ]);
    }
}
