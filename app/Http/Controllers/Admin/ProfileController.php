<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Profile;
use App\Services\CloudinaryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    public function edit(): Response
    {
        return Inertia::render('Admin/Profile', [
            'profile' => Profile::current(),
        ]);
    }

    public function update(Request $request, CloudinaryService $cloudinary): RedirectResponse
    {
        $data = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'headline' => ['nullable', 'string', 'max:255'],
            'summary' => ['nullable', 'string', 'max:2000'],
            'about' => ['nullable', 'string', 'max:10000'],
            'location' => ['nullable', 'string', 'max:255'],
            'email' => ['nullable', 'email', 'max:255'],
            'phone' => ['nullable', 'string', 'max:50'],
            'github_url' => ['nullable', 'url', 'max:500'],
            'linkedin_url' => ['nullable', 'url', 'max:500'],
            'resume_url' => ['nullable', 'url', 'max:500'],
            'avatar' => ['nullable', 'image', 'max:4096'],
            'resume' => ['nullable', 'file', 'mimes:pdf', 'max:8192'],
        ]);

        $profile = Profile::current();

        if ($request->hasFile('avatar')) {
            $uploaded = $cloudinary->replace($request->file('avatar'), $profile->avatar_public_id, 'profile');
            $data['avatar_url'] = $uploaded['url'];
            $data['avatar_public_id'] = $uploaded['public_id'];
        }

        if ($request->hasFile('resume')) {
            $uploaded = $cloudinary->replace($request->file('resume'), $profile->resume_public_id, 'resume', 'raw');
            $data['resume_url'] = $uploaded['url'];
            $data['resume_public_id'] = $uploaded['public_id'];
        }

        unset($data['avatar'], $data['resume']);
        $profile->update($data);

        return back()->with('success', 'Profile updated.');
    }
}
