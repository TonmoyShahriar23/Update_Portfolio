import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import Modal from '../../Components/Modal';
import { GraduationCapIcon, PencilIcon, PlusIcon, TrashIcon } from '../../Components/Icons';
import { ErrorSummary, Field, PrimaryButton, SecondaryButton, TextArea, TextInput } from '../../Components/Form';
import { formatDate } from '../../utils';

const empty = {
    institution: '',
    degree: '',
    start_date: '',
    end_date: '',
    gpa: '',
    highlights: '',
    sort_order: 0,
};

export default function Education({ educations }) {
    const [editing, setEditing] = useState(null);
    const { data, setData, post, put, processing, errors, reset, clearErrors, transform } = useForm(empty);

    const open = (edu) => {
        clearErrors();
        if (edu === 'new') {
            reset();
        } else {
            setData({
                institution: edu.institution ?? '',
                degree: edu.degree ?? '',
                start_date: edu.start_date?.slice(0, 10) ?? '',
                end_date: edu.end_date?.slice(0, 10) ?? '',
                gpa: edu.gpa ?? '',
                highlights: (edu.highlights ?? []).join('\n'),
                sort_order: edu.sort_order ?? 0,
            });
        }
        setEditing(edu);
    };

    const close = () => setEditing(null);

    const submit = (e) => {
        e.preventDefault();
        transform((current) => ({
            ...current,
            highlights: current.highlights
                .split('\n')
                .map((h) => h.trim())
                .filter(Boolean),
        }));
        const options = { preserveScroll: true, onSuccess: close };
        if (editing === 'new') {
            post('/admin/education', options);
        } else {
            put(`/admin/education/${editing.id}`, options);
        }
    };

    const destroy = (edu) => {
        if (confirm(`Delete "${edu.degree} — ${edu.institution}"?`)) {
            router.delete(`/admin/education/${edu.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Education">
            <Head title="Education" />

            <div className="mb-5 flex justify-end">
                <PrimaryButton type="button" onClick={() => open('new')}>
                    <PlusIcon className="h-4 w-4" /> Add education
                </PrimaryButton>
            </div>

            <div className="space-y-4">
                {educations.map((edu) => (
                    <div
                        key={edu.id}
                        className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="flex items-start gap-3">
                            <span className="mt-0.5 rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                <GraduationCapIcon className="h-4 w-4" />
                            </span>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">{edu.degree}</h3>
                                <p className="text-sm font-medium text-indigo-600 dark:text-indigo-400">
                                    {edu.institution}
                                </p>
                                <p className="mt-0.5 text-xs text-slate-500 dark:text-slate-400">
                                    {formatDate(edu.start_date)} – {formatDate(edu.end_date) || 'Present'}
                                    {edu.gpa ? ` · CGPA ${edu.gpa}` : ''}
                                </p>
                            </div>
                        </div>
                        <div className="flex shrink-0 gap-2">
                            <SecondaryButton onClick={() => open(edu)} className="!px-3 !py-1.5">
                                <PencilIcon className="h-3.5 w-3.5" />
                            </SecondaryButton>
                            <SecondaryButton
                                onClick={() => destroy(edu)}
                                className="!px-3 !py-1.5 !text-rose-600 dark:!text-rose-400"
                            >
                                <TrashIcon className="h-3.5 w-3.5" />
                            </SecondaryButton>
                        </div>
                    </div>
                ))}
                {educations.length === 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No education entries yet.</p>
                )}
            </div>

            <Modal
                show={editing !== null}
                onClose={close}
                title={editing === 'new' ? 'Add education' : 'Edit education'}
                wide
            >
                <form onSubmit={submit} className="space-y-4">
                    <ErrorSummary errors={errors} />
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Institution" error={errors.institution}>
                            <TextInput
                                value={data.institution}
                                onChange={(e) => setData('institution', e.target.value)}
                                required
                            />
                        </Field>
                        <Field label="Degree" error={errors.degree}>
                            <TextInput value={data.degree} onChange={(e) => setData('degree', e.target.value)} required />
                        </Field>
                        <Field label="Start date" error={errors.start_date}>
                            <TextInput
                                type="date"
                                min="1900-01-01"
                                max="2100-12-31"
                                value={data.start_date}
                                onChange={(e) => setData('start_date', e.target.value)}
                            />
                        </Field>
                        <Field label="End date" error={errors.end_date}>
                            <TextInput
                                type="date"
                                min="1900-01-01"
                                max="2100-12-31"
                                value={data.end_date}
                                onChange={(e) => setData('end_date', e.target.value)}
                            />
                        </Field>
                        <Field label="GPA / CGPA" error={errors.gpa}>
                            <TextInput
                                value={data.gpa}
                                onChange={(e) => setData('gpa', e.target.value)}
                                placeholder="3.51/4.0"
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
                    <Field label="Highlights (one per line — thesis, publications, etc.)" error={errors.highlights}>
                        <TextArea
                            rows={4}
                            value={data.highlights}
                            onChange={(e) => setData('highlights', e.target.value)}
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
