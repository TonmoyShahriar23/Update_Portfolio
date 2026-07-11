import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import Modal from '../../Components/Modal';
import { PencilIcon, PlusIcon, TrashIcon, TrophyIcon } from '../../Components/Icons';
import { ErrorSummary, Field, PrimaryButton, SecondaryButton, TextArea, TextInput } from '../../Components/Form';

const empty = { title: '', description: '', year: '', sort_order: 0 };

export default function Achievements({ achievements }) {
    const [editing, setEditing] = useState(null);
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm(empty);

    const open = (item) => {
        clearErrors();
        if (item === 'new') {
            reset();
        } else {
            setData({
                title: item.title ?? '',
                description: item.description ?? '',
                year: item.year ?? '',
                sort_order: item.sort_order ?? 0,
            });
        }
        setEditing(item);
    };

    const close = () => setEditing(null);

    const submit = (e) => {
        e.preventDefault();
        const options = { preserveScroll: true, onSuccess: close };
        if (editing === 'new') {
            post('/admin/achievements', options);
        } else {
            put(`/admin/achievements/${editing.id}`, options);
        }
    };

    const destroy = (item) => {
        if (confirm(`Delete achievement "${item.title}"?`)) {
            router.delete(`/admin/achievements/${item.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Achievements">
            <Head title="Achievements" />

            <div className="mb-5 flex justify-end">
                <PrimaryButton type="button" onClick={() => open('new')}>
                    <PlusIcon className="h-4 w-4" /> Add achievement
                </PrimaryButton>
            </div>

            <div className="space-y-3">
                {achievements.map((item) => (
                    <div
                        key={item.id}
                        className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex items-start gap-3">
                            <span className="rounded-lg bg-amber-50 p-2 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                                <TrophyIcon className="h-4 w-4" />
                            </span>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    {item.title}
                                    {item.year && (
                                        <span className="ml-2 text-sm font-normal text-slate-500">{item.year}</span>
                                    )}
                                </h3>
                                {item.description && (
                                    <p className="mt-0.5 text-sm text-slate-600 dark:text-slate-300">
                                        {item.description}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex shrink-0 gap-2">
                            <SecondaryButton onClick={() => open(item)} className="!px-3 !py-1.5">
                                <PencilIcon className="h-3.5 w-3.5" />
                            </SecondaryButton>
                            <SecondaryButton
                                onClick={() => destroy(item)}
                                className="!px-3 !py-1.5 !text-rose-600 dark:!text-rose-400"
                            >
                                <TrashIcon className="h-3.5 w-3.5" />
                            </SecondaryButton>
                        </div>
                    </div>
                ))}
                {achievements.length === 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No achievements yet.</p>
                )}
            </div>

            <Modal
                show={editing !== null}
                onClose={close}
                title={editing === 'new' ? 'Add achievement' : 'Edit achievement'}
            >
                <form onSubmit={submit} className="space-y-4">
                    <ErrorSummary errors={errors} />
                    <Field label="Title" error={errors.title}>
                        <TextInput value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                    </Field>
                    <Field label="Description" error={errors.description}>
                        <TextArea
                            rows={3}
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                        />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Year" error={errors.year}>
                            <TextInput
                                value={data.year}
                                onChange={(e) => setData('year', e.target.value)}
                                placeholder="2025"
                            />
                        </Field>
                        <Field label="Sort order" error={errors.sort_order}>
                            <TextInput
                                type="number"
                                min="0"
                                value={data.sort_order}
                                onChange={(e) => setData('sort_order', Number(e.target.value))}
                            />
                        </Field>
                    </div>
                    <div className="flex justify-end gap-3 pt-2">
                        <SecondaryButton onClick={close}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>{processing ? 'Saving…' : 'Save'}</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
