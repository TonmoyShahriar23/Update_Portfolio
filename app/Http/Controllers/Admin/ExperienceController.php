<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Experience;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ExperienceController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Experiences', [
            'experiences' => Experience::orderBy('sort_order')->orderByDesc('start_date')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Experience::create($this->validated($request));

        return back()->with('success', 'Experience added.');
    }

    public function update(Request $request, Experience $experience): RedirectResponse
    {
        $experience->update($this->validated($request));

        return back()->with('success', 'Experience updated.');
    }

    public function destroy(Experience $experience): RedirectResponse
    {
        $experience->delete();

        return back()->with('success', 'Experience deleted.');
    }

    protected function validated(Request $request): array
    {
        $data = $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'company' => ['required', 'string', 'max:255'],
            'location' => ['nullable', 'string', 'max:255'],
            'start_date' => ['required', 'date', 'after_or_equal:1900-01-01', 'before_or_equal:2100-12-31'],
            'end_date' => ['nullable', 'date', 'after_or_equal:start_date', 'before_or_equal:2100-12-31'],
            'is_current' => ['boolean'],
            'description' => ['nullable', 'string', 'max:5000'],
            'sort_order' => ['integer', 'min:0'],
        ]);

        if (! empty($data['is_current'])) {
            $data['end_date'] = null;
        }

        return $data;
    }
}
