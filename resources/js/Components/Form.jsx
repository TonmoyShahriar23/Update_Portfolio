// Shared form controls used across the admin panel.

export function Label({ children, htmlFor }) {
    return (
        <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-slate-700 dark:text-slate-300">
            {children}
        </label>
    );
}

const inputClasses =
    'block w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 shadow-sm placeholder:text-slate-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 dark:border-slate-600 dark:bg-slate-900 dark:text-white';

export function TextInput(props) {
    return <input {...props} className={`${inputClasses} ${props.className ?? ''}`} />;
}

export function TextArea(props) {
    return <textarea rows={props.rows ?? 4} {...props} className={`${inputClasses} ${props.className ?? ''}`} />;
}

export function Select({ children, ...props }) {
    return (
        <select {...props} className={`${inputClasses} ${props.className ?? ''}`}>
            {children}
        </select>
    );
}

export function Checkbox({ label, ...props }) {
    return (
        <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
            <input
                type="checkbox"
                {...props}
                className="h-4 w-4 rounded border-slate-300 text-indigo-600 focus:ring-indigo-500 dark:border-slate-600 dark:bg-slate-900"
            />
            {label}
        </label>
    );
}

export function ErrorText({ error }) {
    if (!error) return null;
    return <p className="mt-1 text-sm text-rose-600 dark:text-rose-400">{error}</p>;
}

export function Field({ label, error, children }) {
    return (
        <div>
            <Label>{label}</Label>
            {children}
            <ErrorText error={error} />
        </div>
    );
}

export function PrimaryButton({ children, ...props }) {
    return (
        <button
            type="submit"
            {...props}
            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/50 disabled:cursor-not-allowed disabled:opacity-60 ${props.className ?? ''}`}
        >
            {children}
        </button>
    );
}

export function SecondaryButton({ children, ...props }) {
    return (
        <button
            type="button"
            {...props}
            className={`inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-4 py-2 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-200 dark:hover:bg-slate-700 ${props.className ?? ''}`}
        >
            {children}
        </button>
    );
}

export function DangerButton({ children, ...props }) {
    return (
        <button
            type="button"
            {...props}
            className={`inline-flex items-center justify-center gap-2 rounded-lg bg-rose-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-rose-500 disabled:opacity-60 ${props.className ?? ''}`}
        >
            {children}
        </button>
    );
}
