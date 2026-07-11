import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import Modal from '../../Components/Modal';
import { PencilIcon, PlusIcon, TrashIcon } from '../../Components/Icons';
import { ErrorSummary, Field, PrimaryButton, SecondaryButton, Select, TextInput } from '../../Components/Form';

export default function Skills({ skills, categories }) {
    const [editing, setEditing] = useState(null);
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        category: categories[0],
        sort_order: 0,
    });

    const open = (skill) => {
        clearErrors();
        if (skill === 'new') {
            reset();
        } else {
            setData({ name: skill.name, category: skill.category, sort_order: skill.sort_order });
        }
        setEditing(skill);
    };

    const close = () => setEditing(null);

    const submit = (e) => {
        e.preventDefault();
        const options = { preserveScroll: true, onSuccess: close };
        if (editing === 'new') {
            post('/admin/skills', options);
        } else {
            put(`/admin/skills/${editing.id}`, options);
        }
    };

    const destroy = (skill) => {
        if (confirm(`Delete skill "${skill.name}"?`)) {
            router.delete(`/admin/skills/${skill.id}`, { preserveScroll: true });
        }
    };

    const grouped = categories
        .map((category) => ({ category, items: skills.filter((s) => s.category === category) }))
        .filter((g) => g.items.length);

    return (
        <AdminLayout title="Skills">
            <Head title="Skills" />

            <div className="mb-5 flex justify-end">
                <PrimaryButton type="button" onClick={() => open('new')}>
                    <PlusIcon className="h-4 w-4" /> Add skill
                </PrimaryButton>
            </div>

            <div className="space-y-6">
                {grouped.map(({ category, items }) => (
                    <div
                        key={category}
                        className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        <h2 className="mb-3 font-semibold text-slate-900 dark:text-white">{category}</h2>
                        <div className="flex flex-wrap gap-2">
                            {items.map((skill) => (
                                <span
                                    key={skill.id}
                                    className="group inline-flex items-center gap-1.5 rounded-full bg-indigo-50 py-1 pl-3 pr-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                                >
                                    {skill.name}
                                    <button
                                        type="button"
                                        onClick={() => open(skill)}
                                        aria-label={`Edit ${skill.name}`}
                                        className="rounded-full p-1 text-indigo-400 hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-500/20"
                                    >
                                        <PencilIcon className="h-3 w-3" />
                                    </button>
                                    <button
                                        type="button"
                                        onClick={() => destroy(skill)}
                                        aria-label={`Delete ${skill.name}`}
                                        className="rounded-full p-1 text-indigo-400 hover:bg-rose-100 hover:text-rose-600 dark:hover:bg-rose-500/20"
                                    >
                                        <TrashIcon className="h-3 w-3" />
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                ))}
                {grouped.length === 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No skills yet — add your first one.</p>
                )}
            </div>

            <Modal show={editing !== null} onClose={close} title={editing === 'new' ? 'Add skill' : 'Edit skill'}>
                <form onSubmit={submit} className="space-y-4">
                    <ErrorSummary errors={errors} />
                    <Field label="Name" error={errors.name}>
                        <TextInput value={data.name} onChange={(e) => setData('name', e.target.value)} required autoFocus />
                    </Field>
                    <Field label="Category" error={errors.category}>
                        <Select value={data.category} onChange={(e) => setData('category', e.target.value)}>
                            {categories.map((c) => (
                                <option key={c} value={c}>
                                    {c}
                                </option>
                            ))}
                        </Select>
                    </Field>
                    <Field label="Sort order" error={errors.sort_order}>
                        <TextInput
                            type="number"
                            min="0"
                            value={data.sort_order}
                            onChange={(e) => setData('sort_order', Number(e.target.value))}
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
