<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Blog;
use App\Services\CloudinaryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class BlogController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Blogs/Index', [
            'posts' => Blog::orderByDesc('created_at')->paginate(10),
        ]);
    }

    public function create(): Response
    {
        return Inertia::render('Admin/Blogs/Form', ['post' => null]);
    }

    public function store(Request $request, CloudinaryService $cloudinary): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('thumbnail')) {
            $uploaded = $cloudinary->upload($request->file('thumbnail'), 'blog');
            $data['thumbnail_url'] = $uploaded['url'];
            $data['thumbnail_public_id'] = $uploaded['public_id'];
        }

        unset($data['thumbnail']);
        $data['published_at'] = $data['is_published'] ? now() : null;

        Blog::create($data);

        return redirect()->route('admin.blogs.index')->with('success', 'Post created.');
    }

    public function edit(Blog $blog): Response
    {
        return Inertia::render('Admin/Blogs/Form', ['post' => $blog]);
    }

    public function update(Request $request, Blog $blog, CloudinaryService $cloudinary): RedirectResponse
    {
        $data = $this->validated($request, $blog);

        if ($request->hasFile('thumbnail')) {
            $uploaded = $cloudinary->replace($request->file('thumbnail'), $blog->thumbnail_public_id, 'blog');
            $data['thumbnail_url'] = $uploaded['url'];
            $data['thumbnail_public_id'] = $uploaded['public_id'];
        }

        unset($data['thumbnail']);

        if ($data['is_published'] && ! $blog->published_at) {
            $data['published_at'] = now();
        }

        $blog->update($data);

        return redirect()->route('admin.blogs.index')->with('success', 'Post updated.');
    }

    public function togglePublish(Blog $blog): RedirectResponse
    {
        $blog->update([
            'is_published' => ! $blog->is_published,
            'published_at' => $blog->published_at ?? now(),
        ]);

        return back()->with('success', $blog->is_published ? 'Post published.' : 'Post unpublished.');
    }

    public function destroy(Blog $blog, CloudinaryService $cloudinary): RedirectResponse
    {
        $cloudinary->destroy($blog->thumbnail_public_id);
        $blog->delete();

        return redirect()->route('admin.blogs.index')->with('success', 'Post deleted.');
    }

    protected function validated(Request $request, ?Blog $blog = null): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['nullable', 'string', 'max:255', Rule::unique('blogs', 'slug')->ignore($blog?->id)],
            'excerpt' => ['nullable', 'string', 'max:1000'],
            'content' => ['required', 'string'],
            'is_published' => ['boolean'],
            'thumbnail' => ['nullable', 'image', 'max:4096'],
        ]);

        $data['slug'] = ($data['slug'] ?? null) ?: $this->uniqueSlug($data['title'], $blog?->id);

        return $data;
    }

    protected function uniqueSlug(string $title, ?int $ignoreId): string
    {
        $base = Str::slug($title) ?: 'post';
        $slug = $base;
        $i = 2;

        while (Blog::where('slug', $slug)->when($ignoreId, fn ($q) => $q->where('id', '!=', $ignoreId))->exists()) {
            $slug = "{$base}-{$i}";
            $i++;
        }

        return $slug;
    }
}
