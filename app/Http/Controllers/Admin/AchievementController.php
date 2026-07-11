<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Achievement;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AchievementController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Achievements', [
            'achievements' => Achievement::orderBy('sort_order')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Achievement::create($this->validated($request));

        return back()->with('success', 'Achievement added.');
    }

    public function update(Request $request, Achievement $achievement): RedirectResponse
    {
        $achievement->update($this->validated($request));

        return back()->with('success', 'Achievement updated.');
    }

    public function destroy(Achievement $achievement): RedirectResponse
    {
        $achievement->delete();

        return back()->with('success', 'Achievement deleted.');
    }

    protected function validated(Request $request): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'year' => ['nullable', 'string', 'max:20'],
            'sort_order' => ['integer', 'min:0'],
        ]);
    }
}
