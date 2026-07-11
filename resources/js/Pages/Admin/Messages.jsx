import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import { EyeIcon, EyeOffIcon, TrashIcon } from '../../Components/Icons';
import { SecondaryButton } from '../../Components/Form';
import { formatFullDate } from '../../utils';

export default function Messages({ messages }) {
    const toggleRead = (msg) => {
        router.patch(`/admin/messages/${msg.id}/toggle-read`, {}, { preserveScroll: true });
    };

    const destroy = (msg) => {
        if (confirm(`Delete message from ${msg.name}?`)) {
            router.delete(`/admin/messages/${msg.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Messages">
            <Head title="Messages" />

            <div className="space-y-4">
                {messages.data.map((msg) => (
                    <div
                        key={msg.id}
                        className={`rounded-2xl border p-5 shadow-sm ${
                            msg.is_read
                                ? 'border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900'
                                : 'border-indigo-200 bg-indigo-50/60 dark:border-indigo-500/30 dark:bg-indigo-500/5'
                        }`}
                    >
                        <div className="flex flex-wrap items-start justify-between gap-3">
                            <div>
                                <p className="flex flex-wrap items-center gap-2 font-semibold text-slate-900 dark:text-white">
                                    {!msg.is_read && <span className="h-2 w-2 shrink-0 rounded-full bg-indigo-500" />}
                                    {msg.name}
                                    <a
                                        href={`mailto:${msg.email}`}
                                        className="break-all text-sm font-normal text-indigo-600 hover:underline dark:text-indigo-400"
                                    >
                                        {msg.email}
                                    </a>
                                </p>
                                {msg.subject && (
                                    <p className="mt-0.5 text-sm font-medium text-slate-700 dark:text-slate-300">
                                        {msg.subject}
                                    </p>
                                )}
                            </div>
                            <span className="text-xs text-slate-400">{formatFullDate(msg.created_at)}</span>
                        </div>
                        <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                            {msg.body}
                        </p>
                        <div className="mt-4 flex gap-2">
                            <SecondaryButton onClick={() => toggleRead(msg)} className="!px-3 !py-1.5">
                                {msg.is_read ? (
                                    <>
                                        <EyeOffIcon className="h-3.5 w-3.5" /> Mark unread
                                    </>
                                ) : (
                                    <>
                                        <EyeIcon className="h-3.5 w-3.5" /> Mark read
                                    </>
                                )}
                            </SecondaryButton>
                            <SecondaryButton
                                onClick={() => destroy(msg)}
                                className="!px-3 !py-1.5 !text-rose-600 dark:!text-rose-400"
                            >
                                <TrashIcon className="h-3.5 w-3.5" /> Delete
                            </SecondaryButton>
                        </div>
                    </div>
                ))}
                {messages.data.length === 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No messages yet.</p>
                )}
            </div>

            {(messages.prev_page_url || messages.next_page_url) && (
                <div className="mt-8 flex justify-center gap-4">
                    {messages.prev_page_url && (
                        <Link
                            href={messages.prev_page_url}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            ← Previous
                        </Link>
                    )}
                    {messages.next_page_url && (
                        <Link
                            href={messages.next_page_url}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            Next →
                        </Link>
                    )}
                </div>
            )}
        </AdminLayout>
    );
}
