import { Head, Link } from '@inertiajs/react';
import { ArrowLeftIcon } from '../../Components/Icons';
import PublicLayout from '../../Layouts/PublicLayout';
import { formatFullDate } from '../../utils';

export default function BlogShow({ profile, post }) {
    return (
        <PublicLayout profile={profile}>
            <Head title={post.title}>
                <meta name="description" content={post.excerpt ?? ''} />
            </Head>
            <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                >
                    <ArrowLeftIcon className="h-4 w-4" /> All posts
                </Link>

                <h1 className="mt-6 text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
                    {post.title}
                </h1>
                <p className="mt-3 text-sm font-medium text-slate-500 dark:text-slate-400">
                    {formatFullDate(post.published_at)}
                </p>

                {post.thumbnail_url && (
                    <img
                        src={post.thumbnail_url}
                        alt={post.title}
                        className="mt-8 w-full rounded-2xl border border-slate-200 object-cover shadow-sm dark:border-slate-800"
                    />
                )}

                <div className="mt-8 whitespace-pre-line break-words text-lg leading-relaxed text-slate-700 dark:text-slate-300">
                    {post.content}
                </div>
            </article>
        </PublicLayout>
    );
}
