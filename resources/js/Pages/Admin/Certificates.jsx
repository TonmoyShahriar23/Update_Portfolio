import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import ImageInput from '../../Components/ImageInput';
import Modal from '../../Components/Modal';
import { PencilIcon, PlusIcon, TrashIcon } from '../../Components/Icons';
import { ErrorSummary, Field, PrimaryButton, SecondaryButton, TextInput } from '../../Components/Form';
import { formatDate } from '../../utils';

const empty = {
    title: '',
    issuer: '',
    issued_at: '',
    credential_url: '',
    sort_order: 0,
    image: null,
};

export default function Certificates({ certificates }) {
    const [editing, setEditing] = useState(null);
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm(empty);

    const open = (cert) => {
        clearErrors();
        if (cert === 'new') {
            reset();
        } else {
            setData({
                title: cert.title ?? '',
                issuer: cert.issuer ?? '',
                issued_at: cert.issued_at?.slice(0, 10) ?? '',
                credential_url: cert.credential_url ?? '',
                sort_order: cert.sort_order ?? 0,
                image: null,
            });
        }
        setEditing(cert);
    };

    const close = () => setEditing(null);

    const submit = (e) => {
        e.preventDefault();
        const options = { forceFormData: true, preserveScroll: true, onSuccess: close };
        if (editing === 'new') {
            post('/admin/certificates', options);
        } else {
            post(`/admin/certificates/${editing.id}`, options);
        }
    };

    const destroy = (cert) => {
        if (confirm(`Delete certificate "${cert.title}"?`)) {
            router.delete(`/admin/certificates/${cert.id}`, { preserveScroll: true });
        }
    };

    return (
        <AdminLayout title="Certificates">
            <Head title="Certificates" />

            <div className="mb-5 flex justify-end">
                <PrimaryButton type="button" onClick={() => open('new')}>
                    <PlusIcon className="h-4 w-4" /> Add certificate
                </PrimaryButton>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {certificates.map((cert) => (
                    <div
                        key={cert.id}
                        className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        {cert.image_url && <img src={cert.image_url} alt="" className="h-36 w-full object-cover" />}
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-900 dark:text-white">{cert.title}</h3>
                            <p className="mt-0.5 text-sm text-slate-500 dark:text-slate-400">
                                {cert.issuer}
                                {cert.issued_at ? ` · ${formatDate(cert.issued_at)}` : ''}
                            </p>
                            <div className="mt-3 flex gap-2">
                                <SecondaryButton onClick={() => open(cert)} className="!px-3 !py-1.5">
                                    <PencilIcon className="h-3.5 w-3.5" /> Edit
                                </SecondaryButton>
                                <SecondaryButton
                                    onClick={() => destroy(cert)}
                                    className="!px-3 !py-1.5 !text-rose-600 dark:!text-rose-400"
                                >
                                    <TrashIcon className="h-3.5 w-3.5" /> Delete
                                </SecondaryButton>
                            </div>
                        </div>
                    </div>
                ))}
                {certificates.length === 0 && (
                    <p className="text-sm text-slate-500 dark:text-slate-400">No certificates yet.</p>
                )}
            </div>

            <Modal
                show={editing !== null}
                onClose={close}
                title={editing === 'new' ? 'Add certificate' : 'Edit certificate'}
            >
                <form onSubmit={submit} className="space-y-4">
                    <ErrorSummary errors={errors} />
                    <Field label="Title" error={errors.title}>
                        <TextInput value={data.title} onChange={(e) => setData('title', e.target.value)} required />
                    </Field>
                    <div className="grid gap-4 sm:grid-cols-2">
                        <Field label="Issuer" error={errors.issuer}>
                            <TextInput value={data.issuer} onChange={(e) => setData('issuer', e.target.value)} />
                        </Field>
                        <Field label="Issue date" error={errors.issued_at}>
                            <TextInput
                                type="date"
                                min="1900-01-01"
                                max="2100-12-31"
                                value={data.issued_at}
                                onChange={(e) => setData('issued_at', e.target.value)}
                            />
                        </Field>
                    </div>
                    <Field label="Credential URL" error={errors.credential_url}>
                        <TextInput
                            value={data.credential_url}
                            onChange={(e) => setData('credential_url', e.target.value)}
                            placeholder="https://…"
                        />
                    </Field>
                    <ImageInput
                        label={editing === 'new' ? 'Certificate image (required)' : 'Certificate image'}
                        currentUrl={editing !== 'new' ? editing?.image_url : null}
                        onChange={(file) => setData('image', file)}
                        error={errors.image}
                    />
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
