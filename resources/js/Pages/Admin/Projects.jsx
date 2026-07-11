import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import ImageInput from '../../Components/ImageInput';
import Modal from '../../Components/Modal';
import { PencilIcon, PlusIcon, TrashIcon } from '../../Components/Icons';
import { Checkbox, Field, PrimaryButton, SecondaryButton, TextArea, TextInput } from '../../Components/Form';

const empty = {
    title: '',
    description: '',
    tech_stack: [],
    live_url: '',
    repo_url: '',
    is_featured: false,
    sort_order: 0,
    image: null,
};

export default function Projects({ projects }) {
    const [editing, setEditing] = useState(null); // null = closed, 'new' = create, object = edit
    const { data, setData, post, processing, errors, reset, clearErrors, transform } = useForm(empty);
    const [techInput, setTechInput] = useState('');

    const open = (project) => {
        clearErrors();
        if (project === 'new') {
            reset();
            setTechInput('');
        } else {
            setData({
                title: project.title ?? '',
                description: project.description ?? '',
                tech_stack: project.tech_stack ?? [],
                live_url: project.live_url ?? '',
                repo_url: project.repo_url ?? '',
                is_featured: Boolean(project.is_featured),
                sort_order: project.sort_order ?? 0,
                image: null,
            });
            setTechInput((project.tech_stack ?? []).join(', '));
        }
        setEditing(project);
    };

    const close = () => setEditing(null);

    const submit = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true, onSuccess: close };
        // tech stack is edited as a comma-separated string
        transform((data) => ({ ...data, tech_stack: parseTech(techInput) }));
        if (editing === 'new') {
            post('/admin/projects', options);
        } else {
            post(`/admin/projects/${editing.id}`, options);
        }
    };

    const parseTech = (value) =>
        value
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean);

    const destroy = (project) => {
        if (confirm(`Delete project "${project.title}"?`)) {
            router.delete(`/admin/projects/${project.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Projects">
            <Head title="Projects" />

            <div className="mb-5 flex justify-end">
                <PrimaryButton type="button" onClick={() => open('new')}>
                    <PlusIcon className="h-4 w-4" /> New project
                </PrimaryButton>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                    <div
                        key={project.id}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        {project.image_url ? (
                            <img src={project.image_url} alt="" className="h-36 w-full object-cover" />
                        ) : (
                            <div className="h-36 w-full bg-gradient-to-br from-indigo-500/80 to-violet-600/80" />
                        )}
                        <div className="p-4">
                            <div className="flex items-start justify-between gap-2">
                                <h3 className="font-semibold text-slate-900 dark:text-white">{project.title}</h3>
                                {project.is_featured && (
                                    <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                                        Featured
                                    </span>
                                )}
                            </div>
                            <p className="mt-1 line-clamp-2 text-sm text-slate-500 dark:text-slate-400">
                                {project.description}
                            </p>
                            <div className="mt-3 flex gap-2">
                                <SecondaryButton onClick={() => open(project)} className="!px-3 !py-1.5">
                                    <PencilIcon className="h-3.5 w-3.5" /> Edit
                                </SecondaryButton>
                                <SecondaryButton
                                    onClick={() => destroy(project)}
                                    className="!px-3 !py-1.5 !text-rose-600 dark:!text-rose-400"
                                >
                                    <TrashIcon className="h-3.5 w-3.5" /> Delete
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                ))}
                {projects.length === 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No projects yet — add your first one.</p>
                )}
            </div>

            <Modal
                show={editing !== null}
                onClose={close}
                title={editing === 'new' ? 'New project' : 'Edit project'}
                wide
            >
                <form onSubmit={submit} className="space-y-4">
                    <Field label="Title" error={errors.title}>
                        <TextInput value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                    </Field>
                    <Field label="Description" error={errors.description}>
                        <TextArea value={data.description} onChange={(e) => setData('description', e.target.value)} />
                    </Field>
                    <Field label="Tech stack (comma-separated)" error={errors.tech_stack}>
                        <TextInput
                            value={techInput}
                            onChange={(e) => setTechInput(e.target.value)}
                            placeholder="Laravel, React, MySQL"
                        />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Live URL" error={errors.live_url}>
                            <TextInput
                                value={data.live_url}
                                onChange={(e) => setData('live_url', e.target.value)}
                                placeholder="https://…"
                            />
                        </Field>
                        <Field label="Repository URL" error={errors.repo_url}>
                            <TextInput
                                value={data.repo_url}
                                onChange={(e) => setData('repo_url', e.target.value)}
                                placeholder="https://github.com/…"
                            />
                        </Field>
                    </div>
                    <ImageInput
                        label="Project image"
                        currentUrl={editing !== 'new' ? editing?.image_url : null}
                        onChange={(file) => setData('image', file)}
                        error={errors.image}
                    />
                    <div className="flex items-center gap-6">
                        <Checkbox
                            label="Featured"
                            checked={data.is_featured}
                            onChange={(e) => setData('is_featured', e.target.checked)}
                        />
                        <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
                            Sort order
                            <TextInput
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', Number(e.target.value))}
                                className="!w-24"
                            />
                        </div>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <SecondaryButton onClick={close}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>
                            {processing ? 'Saving…' : editing === 'new' ? 'Create project' : 'Save changes'}
                        </PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
