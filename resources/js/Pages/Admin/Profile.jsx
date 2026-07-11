import { Head, useForm } from '@inertiajs/react';
import AdminLayout from '../../Layouts/AdminLayout';
import ImageInput from '../../Components/ImageInput';
import { Field, PrimaryButton, TextArea, TextInput } from '../../Components/Form';

export default function Profile({ profile }) {
    const { data, setData, post, processing, errors } = useForm({
        name: profile.name ?? '',
        headline: profile.headline ?? '',
        summary: profile.summary ?? '',
        about: profile.about ?? '',
        location: profile.location ?? '',
        email: profile.email ?? '',
        phone: profile.phone ?? '',
        github_url: profile.github_url ?? '',
        linkedin_url: profile.linkedin_url ?? '',
        resume_url: profile.resume_url ?? '',
        avatar: null,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/profile', { forceFormData: true, preserveScroll: true });
    };

    return (
        <AdminLayout title="Profile & About">
            <Head title="Profile" />
            <form
                onSubmit={submit}
                className="max-w-3xl space-y-5 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
            >
                <ImageInput
                    label="Profile photo"
                    currentUrl={profile.avatar_url}
                    onChange={(file) => setData('avatar', file)}
                    error={errors.avatar}
                />
                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Name" error={errors.name}>
                        <TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} required />
                    </Field>
                    <Field label="Headline / Title" error={errors.headline}>
                        <TextInput
                            value={data.headline}
                            onChange={(e) => setData('headline', e.target.value)}
                            placeholder="Full-Stack Developer"
                        />
                    </Field>
                </div>
                <Field label="Hero summary (short intro shown on the landing section)" error={errors.summary}>
                    <TextArea rows={3} value={data.summary} onChange={(e) => setData('summary', e.target.value)} />
                </Field>
                <Field label="About (longer background shown in the About section)" error={errors.about}>
                    <TextArea rows={6} value={data.about} onChange={(e) => setData('about', e.target.value)} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                    <Field label="Location" error={errors.location}>
                        <TextInput value={data.location} onChange={(e) => setData('location', e.target.value)} />
                    </Field>
                    <Field label="Public email" error={errors.email}>
                        <TextInput type="email" value={data.email} onChange={(e) => setData('email', e.target.value)} />
                    </Field>
                    <Field label="Phone" error={errors.phone}>
                        <TextInput value={data.phone} onChange={(e) => setData('phone', e.target.value)} />
                    </Field>
                    <Field label="Resume URL" error={errors.resume_url}>
                        <TextInput
                            value={data.resume_url}
                            onChange={(e) => setData('resume_url', e.target.value)}
                            placeholder="https://…"
                        />
                    </Field>
                    <Field label="GitHub URL" error={errors.github_url}>
                        <TextInput value={data.github_url} onChange={(e) => setData('github_url', e.target.value)} />
                    </Field>
                    <Field label="LinkedIn URL" error={errors.linkedin_url}>
                        <TextInput
                            value={data.linkedin_url}
                            onChange={(e) => setData('linkedin_url', e.target.value)}
                        />
                    </Field>
                </div>
                <PrimaryButton disabled={processing}>{processing ? 'Saving…' : 'Save changes'}</PrimaryButton>
            </form>
        </AdminLayout>
    );
}
