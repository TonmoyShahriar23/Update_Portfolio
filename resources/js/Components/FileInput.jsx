import { useState } from 'react';
import { ErrorText, Label } from './Form';

/**
 * File input for documents (e.g. a PDF resume). Shows a link to the current
 * uploaded file (if any) and the name of a newly selected file. The file
 * itself is uploaded to Cloudinary as a `raw` asset by the server.
 */
export default function FileInput({
    label = 'File',
    currentUrl,
    onChange,
    error,
    accept = 'application/pdf',
    maxSizeMb = 8, // must match the `max:8192` validation rule on the server
    currentLabel = 'View current file',
}) {
    const [fileName, setFileName] = useState(null);
    const [sizeError, setSizeError] = useState(null);

    const handleChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        if (file && file.size > maxSizeMb * 1024 * 1024) {
            setSizeError(
                `This file is ${(file.size / 1024 / 1024).toFixed(1)} MB — the maximum is ${maxSizeMb} MB. Please choose a smaller file.`,
            );
            onChange(null);
            setFileName(null);
            e.target.value = '';
            return;
        }
        setSizeError(null);
        onChange(file);
        setFileName(file?.name ?? null);
    };

    return (
        <div>
            <Label>{label}</Label>
            <div className="flex flex-wrap items-center gap-4">
                {currentUrl ? (
                    <a
                        href={currentUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="shrink-0 text-sm font-semibold text-indigo-600 underline-offset-2 hover:underline dark:text-indigo-400"
                    >
                        {currentLabel}
                    </a>
                ) : (
                    <span className="shrink-0 text-sm text-slate-400">No file uploaded</span>
                )}
                <input
                    type="file"
                    accept={accept}
                    onChange={handleChange}
                    className="block text-sm text-slate-600 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:text-slate-300 dark:file:bg-slate-700 dark:file:text-slate-200"
                />
            </div>
            {fileName && (
                <p className="mt-1.5 text-xs text-slate-500 dark:text-slate-400">
                    Selected: <span className="font-medium">{fileName}</span> — click “Save changes” to upload.
                </p>
            )}
            <ErrorText error={sizeError ?? error} />
        </div>
    );
}
