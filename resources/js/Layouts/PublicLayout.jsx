import { Link, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Flash from '../Components/Flash';
import { GitHubIcon, LinkedInIcon, MailIcon, MenuIcon, XIcon } from '../Components/Icons';
import ThemeToggle from '../Components/ThemeToggle';

const sections = [
    { label: 'About', anchor: 'about' },
    { label: 'Skills', anchor: 'skills' },
    { label: 'Experience', anchor: 'experience' },
    { label: 'Projects', anchor: 'projects' },
    { label: 'Certificates', anchor: 'certificates' },
    { label: 'Contact', anchor: 'contact' },
];

export default function PublicLayout({ children, profile }) {
    const [open, setOpen] = useState(false);
    const { url } = usePage();
    const onHome = url === '/' || url.startsWith('/#') || url.startsWith('/?');

    const anchorHref = (anchor) => (onHome ? `#${anchor}` : `/#${anchor}`);
    const firstName = (profile?.name ?? 'Portfolio').split(' ')[0];

    return (
        <div className="min-h-screen bg-white text-slate-800 transition-colors dark:bg-slate-950 dark:text-slate-200">
            <header className="fixed inset-x-0 top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur-md dark:border-slate-800 dark:bg-slate-950/80">
                <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
                    <Link href="/" className="text-lg font-bold tracking-tight text-slate-900 dark:text-white">
                        {firstName}
                        <span className="text-indigo-600 dark:text-indigo-400">.dev</span>
                    </Link>

                    <div className="hidden items-center gap-1 md:flex">
                        {sections.map((s) => (
                            <a
                                key={s.anchor}
                                href={anchorHref(s.anchor)}
                                className="rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400"
                            >
                                {s.label}
                            </a>
                        ))}
                        <Link
                            href="/blog"
                            className={`rounded-lg px-3 py-2 text-sm font-medium transition ${
                                url.startsWith('/blog')
                                    ? 'text-indigo-600 dark:text-indigo-400'
                                    : 'text-slate-600 hover:text-indigo-600 dark:text-slate-300 dark:hover:text-indigo-400'
                            }`}
                        >
                            Blog
                        </Link>
                        <ThemeToggle className="ml-1" />
                    </div>

                    <div className="flex items-center gap-1 md:hidden">
                        <ThemeToggle />
                        <button
                            type="button"
                            onClick={() => setOpen(!open)}
                            aria-label="Toggle menu"
                            className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            {open ? <XIcon className="h-5 w-5" /> : <MenuIcon className="h-5 w-5" />}
                        </button>
                    </div>
                </nav>

                {open && (
                    <div className="border-t border-slate-200 bg-white px-4 pb-4 pt-2 md:hidden dark:border-slate-800 dark:bg-slate-950">
                        {sections.map((s) => (
                            <a
                                key={s.anchor}
                                href={anchorHref(s.anchor)}
                                onClick={() => setOpen(false)}
                                className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                            >
                                {s.label}
                            </a>
                        ))}
                        <Link
                            href="/blog"
                            onClick={() => setOpen(false)}
                            className="block rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                        >
                            Blog
                        </Link>
                    </div>
                )}
            </header>

            <main className="pt-16">{children}</main>

            <footer className="border-t border-slate-200 py-10 dark:border-slate-800">
                <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-4 sm:px-6">
                    <div className="flex items-center gap-4">
                        {profile?.github_url && (
                            <a
                                href={profile.github_url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="GitHub"
                                className="text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
                            >
                                <GitHubIcon className="h-5 w-5" />
                            </a>
                        )}
                        {profile?.linkedin_url && (
                            <a
                                href={profile.linkedin_url}
                                target="_blank"
                                rel="noreferrer"
                                aria-label="LinkedIn"
                                className="text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
                            >
                                <LinkedInIcon className="h-5 w-5" />
                            </a>
                        )}
                        {profile?.email && (
                            <a
                                href={`mailto:${profile.email}`}
                                aria-label="Email"
                                className="text-slate-500 transition hover:text-slate-900 dark:hover:text-white"
                            >
                                <MailIcon className="h-5 w-5" />
                            </a>
                        )}
                    </div>
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        © {new Date().getFullYear()} {profile?.name ?? 'Portfolio'}. Built with Laravel, React &amp; Inertia.
                    </p>
                </div>
            </footer>

            <Flash />
        </div>
    );
}
