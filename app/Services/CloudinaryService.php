<?php

namespace App\Services;

use Cloudinary\Cloudinary;
use Illuminate\Http\UploadedFile;

/**
 * Thin wrapper around the official Cloudinary PHP SDK.
 *
 * All media lives on Cloudinary; the database only stores the returned
 * secure URL and public_id (so images survive ephemeral filesystems on
 * Railway/Render and can be deleted later).
 */
class CloudinaryService
{
    protected Cloudinary $cloudinary;

    public function __construct()
    {
        $this->cloudinary = new Cloudinary(config('services.cloudinary.url'));
    }

    /**
     * Upload a file and return its secure URL + public_id.
     *
     * $resourceType is 'image' for photos and 'raw' for documents such as
     * PDFs (raw assets are delivered as-is and bypass Cloudinary's
     * PDF-image delivery restriction).
     *
     * @return array{url: string, public_id: string}
     */
    public function upload(UploadedFile $file, string $folder, string $resourceType = 'image'): array
    {
        $result = $this->cloudinary->uploadApi()->upload($file->getRealPath(), [
            'folder' => "portfolio/{$folder}",
            'resource_type' => $resourceType,
        ]);

        return [
            'url' => $result['secure_url'],
            'public_id' => $result['public_id'],
        ];
    }

    /**
     * Delete an asset by public_id. Failures are swallowed — a stale
     * asset on Cloudinary must never block a DB update/delete.
     */
    public function destroy(?string $publicId, string $resourceType = 'image'): void
    {
        if (! $publicId) {
            return;
        }

        try {
            $this->cloudinary->uploadApi()->destroy($publicId, ['resource_type' => $resourceType]);
        } catch (\Throwable) {
            // ignore
        }
    }

    /**
     * Upload a replacement asset, deleting the previous one.
     *
     * @return array{url: string, public_id: string}
     */
    public function replace(UploadedFile $file, ?string $oldPublicId, string $folder, string $resourceType = 'image'): array
    {
        $uploaded = $this->upload($file, $folder, $resourceType);
        $this->destroy($oldPublicId, $resourceType);

        return $uploaded;
    }
}
