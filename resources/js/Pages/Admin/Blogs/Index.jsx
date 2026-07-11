import { Head, Link, router } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import { ExternalLinkIcon, EyeIcon, EyeOffIcon, PencilIcon, PlusIcon, TrashIcon } from '../../../Components/Icons';
import { SecondaryButton } from '../../../Components/Form';
import { formatFullDate } from '../../../utils';

export default function BlogsIndex({ posts }) {
    const togglePublish = (post) => {
        router.patch(`/admin/blogs/${post.id}/toggle-publish`, {}, { preserveScroll: true });
    };

    const destroy = (post) => {
        if (confirm(`Delete post "${post.title}"?`)) {
            router.delete(`/admin/blogs/${post.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Blog posts">
            <Head title="Blog posts" />

            <div className="mb-5 flex justify-end">
                <Link
                    href="/admin/blogs/create"
                    className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-500"
                >
                    <PlusIcon className="h-4 w-4" /> New post
                </Link>
            </div>

            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm">
                        <thead className="border-b border-slate-200 text-xs uppercase tracking-wide text-slate-500 dark:border-slate-800 dark:text-slate-400">
                            <tr>
                                <th className="px-5 py-3">Title</th>
                                <th className="px-5 py-3">Status</th>
                                <th className="px-5 py-3">Published</th>
                                <th className="px-5 py-3 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                            {posts.data.map((post) => (
                                <tr key={post.id}>
                                    <td className="px-5 py-4">
                                        <div className="flex items-center gap-3">
                                            {post.thumbnail_url && (
                                                <img
                                                    src={post.thumbnail_url}
                                                    alt=""
                                                    className="h-10 w-14 rounded object-cover"
                                                />
                                            )}
                                            <div>
                                                <p className="font-medium text-slate-900 dark:text-white">{post.title}</p>
                                                <p className="text-xs text-slate-500 dark:text-slate-400">/{post.slug}</p>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-5 py-4">
                                        <span
                                            className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                                                post.is_published
                                                    ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400'
                                                    : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-300'
                                            }`}
                                        >
                                            {post.is_published ? 'Published' : 'Draft'}
                                        </span>
                                    </td>
                                    <td className="px-5 py-4 text-slate-500 dark:text-slate-400">
                                        {post.published_at ? formatFullDate(post.published_at) : '—'}
                                    </td>
                                    <td className="px-5 py-4">
                                        <div className="flex justify-end gap-2">
                                            {post.is_published && (
                                                <a
                                                    href={`/blog/${post.slug}`}
                                                    target="_blank"
                                                    rel="noreferrer"
                                                    className="inline-flex items-center rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                                                    aria-label="View post"
                                                >
                                                    <ExternalLinkIcon className="h-3.5 w-3.5" />
                                                </a>
                                            )}
                                            <SecondaryButton
                                                onClick={() => togglePublish(post)}
                                                className="!p-2"
                                                aria-label={post.is_published ? 'Unpublish' : 'Publish'}
                                            >
                                                {post.is_published ? (
                                                    <EyeOffIcon className="h-3.5 w-3.5" />
                                                ) : (
                                                    <EyeIcon className="h-3.5 w-3.5" />
                                                )}
                                            </SecondaryButton>
                                            <Link
                                                href={`/admin/blogs/${post.id}/edit`}
                                                className="inline-flex items-center rounded-lg border border-slate-300 p-2 text-slate-600 hover:bg-slate-50 dark:border-slate-600 dark:text-slate-300 dark:hover:bg-slate-800"
                                                aria-label="Edit post"
                                            >
                                                <PencilIcon className="h-3.5 w-3.5" />
                                            </Link>
                                            <SecondaryButton
                                                onClick={() => destroy(post)}
                                                className="!p-2 !text-rose-600 dark:!text-rose-400"
                                                aria-label="Delete post"
                                            >
                                                <TrashIcon className="h-3.5 w-3.5" />
                                            </SecondaryButton>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                            {posts.data.length === 0 && (
                                <tr>
                                    <td colSpan={4} className="px-5 py-10 text-center text-slate-500 dark:text-slate-400">
                                        No posts yet — write your first one!
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {(posts.prev_page_url || posts.next_page_url) && (
                <div className="mt-6 flex justify-center gap-4">
                    {posts.prev_page_url && (
                        <Link
                            href={posts.prev_page_url}
                            className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            ← Previous
                        </Link>
                    )}
                    {posts.next_page_url && (
                        <Link
                            href={posts.next_page_url}
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
