import { useEffect, useState } from 'react';
import { MoonIcon, SunIcon } from './Icons';

export default function ThemeToggle({ className = '' }) {
    const [dark, setDark] = useState(() =>
        typeof document !== 'undefined' ? document.documentElement.classList.contains('dark') : true,
    );

    useEffect(() => {
        document.documentElement.classList.toggle('dark', dark);
        localStorage.setItem('theme', dark ? 'dark' : 'light');
    }, [dark]);

    return (
        <button
            type="button"
            onClick={() => setDark(!dark)}
            aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
            className={`inline-flex h-9 w-9 items-center justify-center rounded-full text-slate-500 transition hover:bg-slate-200/70 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-700/60 dark:hover:text-white ${className}`}
        >
            {dark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
        </button>
    );
}
