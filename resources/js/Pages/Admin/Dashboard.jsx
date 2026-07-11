import { Head, Link } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { formatFullDate } from '../../utils';

const cards = [
    { key: 'projects', label: 'Projects', href: '/admin/projects' },
    { key: 'skills', label: 'Skills', href: '/admin/skills' },
    { key: 'experiences', label: 'Experience entries', href: '/admin/experiences' },
    { key: 'certificates', label: 'Certificates', href: '/admin/certificates' },
    { key: 'blogs', label: 'Blog posts', href: '/admin/blogs' },
    { key: 'achievements', label: 'Achievements', href: '/admin/achievements' },
];

export default function Dashboard({ stats, recentMessages }) {
    return (
        <AdminLayout title="Dashboard">
            <Head title="Dashboard" />

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {cards.map((card) => (
                    <Link
                        key={card.key}
                        href={card.href}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                    >
                        <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
                        <p className="mt-1 text-3xl font-bold text-slate-900 dark:text-white">{stats[card.key]}</p>
                        {card.key === 'blogs' && (
                            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">
                                {stats.publishedBlogs} published
                            </p>
                        )}
                    </Link>
                ))}
                <Link
                    href="/admin/messages"
                    className="rounded-2xl border border-indigo-200 bg-indigo-50 p-5 shadow-sm transition hover:shadow-md dark:border-indigo-500/30 dark:bg-indigo-500/10"
                >
                    <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300">Messages</p>
                    <p className="mt-1 text-3xl font-bold text-indigo-900 dark:text-indigo-200">{stats.messages}</p>
                    <p className="mt-1 text-xs font-semibold text-indigo-700 dark:text-indigo-300">
                        {stats.unreadMessages} unread
                    </p>
                </Link>
            </div>

            <div className="mt-8 rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4 dark:border-slate-800">
                    <h2 className="font-semibold text-slate-900 dark:text-white">Recent messages</h2>
                    <Link
                        href="/admin/messages"
                        className="text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                    >
                        View all
                    </Link>
                </div>
                {recentMessages.length === 0 ? (
                    <p className="px-5 py-8 text-sm text-slate-500 dark:text-slate-400">No messages yet.</p>
                ) : (
                    <ul className="divide-y divide-slate-100 dark:divide-slate-800">
                        {recentMessages.map((msg) => (
                            <li key={msg.id} className="flex items-start justify-between gap-4 px-5 py-4">
                                <div className="min-w-0">
                                    <p className="flex items-center gap-2 font-medium text-slate-900 dark:text-white">
                                        {!msg.is_read && (
                                            <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />
                                        )}
                                        {msg.name}
                                        <span className="truncate text-sm font-normal text-slate-500 dark:text-slate-400">
                                            {msg.email}
                                        </span>
                                    </p>
                                    <p className="mt-1 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                                        {msg.body}
                                    </p>
                                </div>
                                <span className="shrink-0 text-xs text-slate-400">{formatFullDate(msg.created_at)}</span>
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </AdminLayout>
    );
}
