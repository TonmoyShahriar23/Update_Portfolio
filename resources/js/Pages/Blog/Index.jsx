import { Head, Link } from '@inertiajs/react';
import PublicLayout from '../../Layouts/PublicLayout';
import { formatFullDate } from '../../utils';

export default function BlogIndex({ profile, posts }) {
    return (
        <PublicLayout profile={profile}>
            <Head title="Blog" />
            <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
                <div className="mb-12">
                    <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        Blog
                    </p>
                    <h1 className="text-4xl font-bold tracking-tight text-slate-900 dark:text-white">
                        Notes on what I'm learning
                    </h1>
                </div>

                {posts.data.length === 0 ? (
                    <p className="text-slate-500 dark:text-slate-400">No posts yet — check back soon!</p>
                ) : (
                    <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                        {posts.data.map((post) => (
                            <Link
                                key={post.id}
                                href={`/blog/${post.slug}`}
                                className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                            >
                                {post.thumbnail_url ? (
                                    <img
                                        src={post.thumbnail_url}
                                        alt={post.title}
                                        loading="lazy"
                                        className="h-44 w-full object-cover"
                                    />
                                ) : (
                                    <div className="h-44 w-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
                                )}
                                <div className="p-5">
                                    <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                        {formatFullDate(post.published_at)}
                                    </p>
                                    <h2 className="mt-1.5 text-lg font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                        {post.title}
                                    </h2>
                                    {post.excerpt && (
                                        <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                                            {post.excerpt}
                                        </p>
                                    )}
                                </div>
                            </Link>
                        ))}
                    </div>
                )}

                {(posts.prev_page_url || posts.next_page_url) && (
                    <div className="mt-12 flex items-center justify-center gap-4">
                        {posts.prev_page_url && (
                            <Link
                                href={posts.prev_page_url}
                                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                ← Newer
                            </Link>
                        )}
                        {posts.next_page_url && (
                            <Link
                                href={posts.next_page_url}
                                className="rounded-lg border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                            >
                                Older →
                            </Link>
                        )}
                    </div>
                )}
            </div>
        </PublicLayout>
    );
}
