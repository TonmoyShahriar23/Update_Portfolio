<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Profile;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Blog/Index', [
            'profile' => Profile::current()->only('name', 'github_url', 'linkedin_url', 'email'),
            'posts' => Blog::published()
                ->orderByDesc('published_at')
                ->paginate(9, ['id', 'title', 'slug', 'excerpt', 'thumbnail_url', 'published_at']),
        ]);
    }

    public function show(string $slug): Response
    {
        $post = Blog::published()->where('slug', $slug)->firstOrFail();

        return Inertia::render('Blog/Show', [
            'profile' => Profile::current()->only('name', 'github_url', 'linkedin_url', 'email'),
            'post' => $post,
        ]);
    }
}
