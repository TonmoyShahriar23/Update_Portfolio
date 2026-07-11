<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Education;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class EducationController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Education', [
            'educations' => Education::orderBy('sort_order')->orderByDesc('start_date')->get(),
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Education::create($this->validated($request));

        return back()->with('success', 'Education entry added.');
    }

    public function update(Request $request, Education $education): RedirectResponse
    {
        $education->update($this->validated($request));

        return back()->with('success', 'Education entry updated.');
    }

    public function destroy(Education $education): RedirectResponse
    {
        $education->delete();

        return back()->with('success', 'Education entry deleted.');
    }

    protected function validated(Request $request): array
    {
        return $request->validate([
            'institution' => ['required', 'string', 'max:255'],
            'degree' => ['required', 'string', 'max:255'],
            'start_date' => ['nullable', 'date'],
            'end_date' => ['nullable', 'date'],
            'gpa' => ['nullable', 'string', 'max:50'],
            'highlights' => ['nullable', 'array'],
            'highlights.*' => ['string', 'max:500'],
            'sort_order' => ['integer', 'min:0'],
        ]);
    }
}
