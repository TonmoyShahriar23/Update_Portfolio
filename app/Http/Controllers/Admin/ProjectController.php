<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Project;
use App\Services\CloudinaryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Inertia\Inertia;
use Inertia\Response;

class ProjectController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Projects', [
            'projects' => Project::orderBy('sort_order')->orderByDesc('created_at')->get(),
        ]);
    }

    public function store(Request $request, CloudinaryService $cloudinary): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('image')) {
            $uploaded = $this->uploadOrFail(
                fn () => $cloudinary->upload($request->file('image'), 'projects')
            );
            $data['image_url'] = $uploaded['url'];
            $data['image_public_id'] = $uploaded['public_id'];
        }

        unset($data['image']);
        Project::create($data);

        return back()->with('success', 'Project created.');
    }

    public function update(Request $request, Project $project, CloudinaryService $cloudinary): RedirectResponse
    {
        $data = $this->validated($request);

        if ($request->hasFile('image')) {
            $uploaded = $this->uploadOrFail(
                fn () => $cloudinary->replace($request->file('image'), $project->image_public_id, 'projects')
            );
            $data['image_url'] = $uploaded['url'];
            $data['image_public_id'] = $uploaded['public_id'];
        }

        unset($data['image']);
        $project->update($data);

        return back()->with('success', 'Project updated.');
    }

    public function destroy(Project $project, CloudinaryService $cloudinary): RedirectResponse
    {
        $cloudinary->destroy($project->image_public_id);
        $project->delete();

        return back()->with('success', 'Project deleted.');
    }

    /**
     * Run a Cloudinary upload, converting SDK failures (bad credentials,
     * network errors) into a validation error on the image field instead
     * of an opaque 500 response.
     *
     * @return array{url: string, public_id: string}
     */
    protected function uploadOrFail(callable $upload): array
    {
        try {
            return $upload();
        } catch (\Throwable $e) {
            throw ValidationException::withMessages([
                'image' => 'Image upload failed: '.$e->getMessage().' — check the CLOUDINARY_URL credentials in .env.',
            ]);
        }
    }

    protected function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:5000'],
            'tech_stack' => ['nullable', 'array'],
            'tech_stack.*' => ['string', 'max:100'],
            'live_url' => ['nullable', 'url', 'max:500'],
            'repo_url' => ['nullable', 'url', 'max:500'],
            'is_featured' => ['boolean'],
            'sort_order' => ['integer', 'min:0'],
            'image' => ['nullable', 'image', 'max:4096'],
        ]);
    }
}
