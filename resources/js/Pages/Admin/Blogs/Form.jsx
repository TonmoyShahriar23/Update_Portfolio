import { Head, Link, useForm } from '@inertiajs/react';
import AdminLayout from '../../../Layouts/AdminLayout';
import ImageInput from '../../../Components/ImageInput';
import { ArrowLeftIcon } from '../../../Components/Icons';
import { Checkbox, ErrorSummary, Field, PrimaryButton, TextArea, TextInput } from '../../../Components/Form';

export default function BlogForm({ post }) {
    const isEdit = Boolean(post);

    const { data, setData, post: submitForm, processing, errors } = useForm({
        title: post?.title ?? '',
        slug: post?.slug ?? '',
        excerpt: post?.excerpt ?? '',
        content: post?.content ?? '',
        is_published: Boolean(post?.is_published),
        thumbnail: null,
    });

    const submit = (e) => {
        e.preventDefault();
        const options = { forceFormData: true };
        if (isEdit) {
            submitForm(`/admin/blogs/${post.id}`, options);
        } else {
            submitForm('/admin/blogs', options);
        }
    };

    return (
        <AdminLayout title={isEdit ? 'Edit post' : 'New post'}>
            <Head title={isEdit ? 'Edit post' : 'New post'} />

            <Link
                href="/admin/blogs"
                className="mb-5 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
            >
                <ArrowLeftIcon className="h-4 w-4" /> All posts
            </Link>

            <form
                onSubmit={submit}
                className="max-w-3xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
                <ErrorSummary errors={errors} />
                <Field label="Title" error={errors.title}>
                    <TextInput value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                </Field>
                <Field label="Slug (leave blank to auto-generate from the title)" error={errors.slug}>
                    <TextInput
                        value={data.slug}
                        onChange={(e) => setData('slug', e.target.value)}
                        placeholder="my-first-post"
                    />
                </Field>
                <Field label="Excerpt (short teaser shown in lists)" error={errors.excerpt}>
                    <TextArea rows={2} value={data.excerpt} onChange={(e) => setData('excerpt', e.target.value)} />
                </Field>
                <Field label="Content" error={errors.content}>
                    <TextArea
                        rows={14}
                        value={data.content}
                        onChange={(e) => setData('content', e.target.value)}
                        required
                    />
                </Field>
                <ImageInput
                    label="Thumbnail"
                    currentUrl={post?.thumbnail_url}
                    onChange={(file) => setData('thumbnail', file)}
                    error={errors.thumbnail}
                />
                <Checkbox
                    label="Published (visible on the public site)"
                    checked={data.is_published}
                    onChange={(e) => setData('is_published', e.target.checked)}
                />
                <div className="flex gap-3">
                    <PrimaryButton disabled={processing}>
                        {processing ? 'Saving…' : isEdit ? 'Save changes' : 'Create post'}
                    </PrimaryButton>
                </div>
            </form>
        </AdminLayout>
    );
}
