<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Skill;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;
use Inertia\Response;

class SkillController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Skills', [
            'skills' => Skill::orderBy('category')->orderBy('sort_order')->orderBy('name')->get(),
            'categories' => Skill::CATEGORIES,
        ]);
    }

    public function store(Request $request): RedirectResponse
    {
        Skill::create($this->validated($request));

        return back()->with('success', 'Skill added.');
    }

    public function update(Request $request, Skill $skill): RedirectResponse
    {
        $skill->update($this->validated($request));

        return back()->with('success', 'Skill updated.');
    }

    public function destroy(Skill $skill): RedirectResponse
    {
        $skill->delete();

        return back()->with('success', 'Skill deleted.');
    }

    protected function validated(Request $request): array
    {
        return $request->validate([
            'name' => ['required', 'string', 'max:100'],
            'category' => ['required', 'string', Rule::in(Skill::CATEGORIES)],
            'sort_order' => ['integer', 'min:0'],
        ]);
    }
}
