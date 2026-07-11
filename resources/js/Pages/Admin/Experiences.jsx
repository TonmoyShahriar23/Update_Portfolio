import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import Modal from '../../Components/Modal';
import { PencilIcon, PlusIcon, TrashIcon } from '../../Components/Icons';
import { Checkbox, ErrorSummary, Field, PrimaryButton, SecondaryButton, TextArea, TextInput } from '../../Components/Form';
import { experienceRange } from '../../utils';

const empty = {
    title: '',
    company: '',
    location: '',
    start_date: '',
    end_date: '',
    is_current: false,
    description: '',
    sort_order: 0,
};

export default function Experiences({ experiences }) {
    const [editing, setEditing] = useState(null);
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(empty);

    const open = (exp) => {
        clearErrors();
        if (exp === 'new') {
            reset();
        } else {
            setData({
                title: exp.title ?? '',
                company: exp.company ?? '',
                location: exp.location ?? '',
                start_date: exp.start_date?.slice(0, 10) ?? '',
                end_date: exp.end_date?.slice(0, 10) ?? '',
                is_current: Boolean(exp.is_current),
                description: exp.description ?? '',
                sort_order: exp.sort_order ?? 0,
            });
        }
        setEditing(exp);
    };

    const close = () => setEditing(null);

    const submit = (e) => {
        e.preventDefault();
        const options = { preserveScroll: true, onSuccess: close };
        if (editing === 'new') {
            post('/admin/experiences', options);
        } else {
            put(`/admin/experiences/${editing.id}`, options);
        }
    };

    const destroy = (exp) => {
        if (confirm(`Delete "${exp.title} at ${exp.company}"?`)) {
            router.delete(`/admin/experiences/${exp.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Experience">
            <Head title="Experience" />

            <div className="mb-5 flex justify-end">
                <PrimaryButton type="button" onClick={() => open('new')}>
                    <PlusIcon className="h-4 w-4" /> Add experience
                </PrimaryButton>
            </div>

            <div className="space-y-4">
                {experiences.map((exp) => (
                    <div
                        key={exp.id}
                        className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div>
                            <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                {experienceRange(exp)}
                            </p>
                            <h3 className="mt-0.5 font-semibold text-slate-900 dark:text-white">{exp.title}</h3>
                            <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                {exp.company}
                                {exp.location ? ` · ${exp.location}` : ''}
                            </p>
                            {exp.description && (
                                <p className="mt-2 line-clamp-2 text-sm text-slate-600 dark:text-slate-300">
                                    {exp.description}
                                </p>
                            )}
                        </div>
                        <div className="flex shrink-0 gap-2">
                            <SecondaryButton onClick={() => open(exp)} className="!px-3 !py-1.5">
                                <PencilIcon className="h-3.5 w-3.5" />
                            </SecondaryButton>
                            <SecondaryButton
                                onClick={() => destroy(exp)}
                                className="!px-3 !py-1.5 !text-rose-600 dark:!text-rose-400"
                            >
                                <TrashIcon className="h-3.5 w-3.5" />
                            </SecondaryButton>
                        </div>
                    </div>
                ))}
                {experiences.length === 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No experience entries yet.</p>
                )}
            </div>

            <Modal
                show={editing !== null}
                onClose={close}
                title={editing === 'new' ? 'Add experience' : 'Edit experience'}
                wide
            >
                <form onSubmit={submit} className="space-y-4">
                    <ErrorSummary errors={errors} />
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Job title" error={errors.title}>
                            <TextInput value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                        </Field>
                        <Field label="Company" error={errors.company}>
                            <TextInput
                                value={data.company}
                                onChange={(e) => setData('company', e.target.value)}
                                required
                            />
                        </Field>
                        <Field label="Location" error={errors.location}>
                            <TextInput value={data.location} onChange={(e) => setData('location', e.target.value)} />
                        </Field>
                        <Field label="Sort order" error={errors.sort_order}>
                            <TextInput
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', Number(e.target.value))}
                            />
                        </Field>
                        <Field label="Start date" error={errors.start_date}>
                            <TextInput
                                type="date"
                                min="1900-01-01"
                                max="2100-12-31"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                                required
                            />
                        </Field>
                        <Field label="End date" error={errors.end_date}>
                            <TextInput
                                type="date"
                                min="1900-01-01"
                                max="2100-12-31"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                                disabled={data.is_current}
                            />
                        </Field>
                    </div>
                    <Checkbox
                        label="I currently work here"
                        checked={data.is_current}
                        onChange={(e) => setData('is_current', e.target.checked)}
                    />
                    <Field label="Description" error={errors.description}>
                        <TextArea
                            rows={4}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </Field>
                    <div className="flex justify-end gap-3 pt-2">
                        <SecondaryButton onClick={close}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>{processing ? 'Saving…' : 'Save'}</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
