<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Certificate;
use App\Services\CloudinaryService;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class CertificateController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Certificates', [
            'certificates' => Certificate::orderBy('sort_order')->orderByDesc('issued_at')->get(),
        ]);
    }

    public function store(Request $request, CloudinaryService $cloudinary): RedirectResponse
    {
        $data = $this->validated($request, imageRequired: true);

        $uploaded = $cloudinary->upload($request->file('image'), 'certificates');
        $data['image_url'] = $uploaded['url'];
        $data['image_public_id'] = $uploaded['public_id'];

        unset($data['image']);
        Certificate::create($data);

        return back()->with('success', 'Certificate added.');
    }

    public function update(Request $request, Certificate $certificate, CloudinaryService $cloudinary): RedirectResponse
    {
        $data = $this->validated($request, imageRequired: false);

        if ($request->hasFile('image')) {
            $uploaded = $cloudinary->replace($request->file('image'), $certificate->image_public_id, 'certificates');
            $data['image_url'] = $uploaded['url'];
            $data['image_public_id'] = $uploaded['public_id'];
        }

        unset($data['image']);
        $certificate->update($data);

        return back()->with('success', 'Certificate updated.');
    }

    public function destroy(Certificate $certificate, CloudinaryService $cloudinary): RedirectResponse
    {
        $cloudinary->destroy($certificate->image_public_id);
        $certificate->delete();

        return back()->with('success', 'Certificate deleted.');
    }

    protected function validated(Request $request, bool $imageRequired): array
    {
        return $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'issuer' => ['nullable', 'string', 'max:255'],
            'issued_at' => ['nullable', 'date'],
            'credential_url' => ['nullable', 'url', 'max:500'],
            'sort_order' => ['integer', 'min:0'],
            'image' => [$imageRequired ? 'required' : 'nullable', 'image', 'max:4096'],
        ]);
    }
}
