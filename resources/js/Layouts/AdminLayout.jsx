import { Link, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Flash from '../Components/Flash';
import {
    AwardIcon,
    BriefcaseIcon,
    CodeIcon,
    ExternalLinkIcon,
    EyeIcon,
    GraduationCapIcon,
    InboxIcon,
    MenuIcon,
    PencilIcon,
    TrophyIcon,
    XIcon,
} from '../Components/Icons';
import ThemeToggle from '../Components/ThemeToggle';

const nav = [
    { label: 'Dashboard', href: '/admin', icon: EyeIcon },
    { label: 'Profile & About', href: '/admin/profile', icon: PencilIcon },
    { label: 'Projects', href: '/admin/projects', icon: CodeIcon },
    { label: 'Skills', href: '/admin/skills', icon: AwardIcon },
    { label: 'Experience', href: '/admin/experiences', icon: BriefcaseIcon },
    { label: 'Certificates', href: '/admin/certificates', icon: AwardIcon },
    { label: 'Blog', href: '/admin/blogs', icon: PencilIcon },
    { label: 'Achievements', href: '/admin/achievements', icon: TrophyIcon },
    { label: 'Education', href: '/admin/education', icon: GraduationCapIcon },
    { label: 'Messages', href: '/admin/messages', icon: InboxIcon },
];

export default function AdminLayout({ title, children }) {
    const { url, props } = usePage();
    const [open, setOpen] = useState(false);

    const isActive = (href) => (href === '/admin' ? url === '/admin' : url.startsWith(href));

    const logout = () => router.post('/admin/logout');

    const sidebar = (
        <div className="flex h-full flex-col">
            <div className="flex h-16 items-center justify-between border-b border-slate-200 px-5 dark:border-slate-800">
                <Link href="/admin" className="text-lg font-bold text-slate-900 dark:text-white">
                    Admin<span className="text-indigo-600 dark:text-indigo-400">.panel</span>
                </Link>
                <button className="md:hidden" onClick={() => setOpen(false)} aria-label="Close sidebar">
                    <XIcon className="h-5 w-5 text-slate-500" />
                </button>
            </div>
            <nav className="flex-1 space-y-1 overflow-y-auto p-3">
                {nav.map((item) => (
                    <Link
                        key={item.href}
                        href={item.href}
                        onClick={() => setOpen(false)}
                        className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition ${
                            isActive(item.href)
                                ? 'bg-indigo-50 text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300'
                                : 'text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                        }`}
                    >
                        <item.icon className="h-4 w-4" />
                        {item.label}
                    </Link>
                ))}
            </nav>
            <div className="border-t border-slate-200 p-3 dark:border-slate-800">
                <a
                    href="/"
                    target="_blank"
                    rel="noreferrer"
                    className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                >
                    <ExternalLinkIcon className="h-4 w-4" /> View site
                </a>
                <button
                    onClick={logout}
                    className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-400 dark:hover:bg-rose-500/10"
                >
                    <XIcon className="h-4 w-4" /> Log out
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-slate-100 text-slate-800 dark:bg-slate-950 dark:text-slate-200">
            {/* Desktop sidebar */}
            <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white md:block dark:border-slate-800 dark:bg-slate-900">
                {sidebar}
            </aside>

            {/* Mobile sidebar */}
            {open && (
                <div className="fixed inset-0 z-40 md:hidden">
                    <div className="fixed inset-0 bg-slate-900/50" onClick={() => setOpen(false)} />
                    <aside className="fixed inset-y-0 left-0 w-64 bg-white shadow-xl dark:bg-slate-900">{sidebar}</aside>
                </div>
            )}

            <div className="md:pl-64">
                <header className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-slate-200 bg-white/80 px-4 backdrop-blur sm:px-6 dark:border-slate-800 dark:bg-slate-900/80">
                    <div className="flex items-center gap-3">
                        <button className="md:hidden" onClick={() => setOpen(true)} aria-label="Open sidebar">
                            <MenuIcon className="h-5 w-5 text-slate-600 dark:text-slate-300" />
                        </button>
                        <h1 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h1>
                    </div>
                    <div className="flex items-center gap-3">
                        <span className="hidden text-sm text-slate-500 sm:block dark:text-slate-400">
                            {props.auth?.user?.email}
                        </span>
                        <ThemeToggle />
                    </div>
                </header>
                <main className="p-4 sm:p-6">{children}</main>
            </div>

            <Flash />
        </div>
    );
}
