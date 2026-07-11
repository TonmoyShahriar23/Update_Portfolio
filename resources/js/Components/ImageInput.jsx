import { useEffect, useRef, useState } from 'react';
import { ErrorText, Label } from './Form';

/**
 * File input with live preview. Shows the current Cloudinary image (if any)
 * until a new file is selected.
 */
export default function ImageInput({ label = 'Image', currentUrl, onChange, error }) {
    const [preview, setPreview] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => () => preview && URL.revokeObjectURL(preview), [preview]);

    const handleChange = (e) => {
        const file = e.target.files?.[0] ?? null;
        onChange(file);
        if (preview) URL.revokeObjectURL(preview);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    const shown = preview || currentUrl;

    return (
        <div>
            <Label>{label}</Label>
            <div className="flex items-center gap-4">
                {shown ? (
                    <img
                        src={shown}
                        alt="Preview"
                        className="h-20 w-28 rounded-lg border border-slate-200 object-cover dark:border-slate-700"
                    />
                ) : (
                    <div className="flex h-20 w-28 items-center justify-center rounded-lg border border-dashed border-slate-300 text-xs text-slate-400 dark:border-slate-600">
                        No image
                    </div>
                )}
                <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleChange}
                    className="block text-sm text-slate-600 file:mr-3 file:cursor-pointer file:rounded-lg file:border-0 file:bg-indigo-50 file:px-3 file:py-2 file:text-sm file:font-semibold file:text-indigo-700 hover:file:bg-indigo-100 dark:text-slate-300 dark:file:bg-slate-700 dark:file:text-slate-200"
                />
            </div>
            <ErrorText error={error} />
        </div>
    );
}
