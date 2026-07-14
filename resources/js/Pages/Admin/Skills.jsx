import { Head, router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import AdminLayout from '../../Layouts/AdminLayout';
import Modal from '../../Components/Modal';
import { PencilIcon, PlusIcon, TrashIcon } from '../../Components/Icons';
import { ErrorSummary, Field, PrimaryButton, SecondaryButton, Select, TextInput } from '../../Components/Form';
import { SKILL_CATALOG, SkillGlyph, normalizeSkill } from '../../skillIcons';

export default function Skills({ skills, categories }) {
    const [editing, setEditing] = useState(null);
    const [picking, setPicking] = useState(false);
    const { data, setData, post, put, processing, errors, reset, clearErrors } = useForm({
        name: '',
        category: categories[0],
        sort_order: 0,
    });

    // Normalized names already in use — lets the picker disable duplicates and
    // the icon preview stay in sync with what's saved.
    const addedNames = new Set(skills.map((s) => normalizeSkill(s.name)));

    const nextOrder = (category) => skills.filter((s) => s.category === category).length;

    // One-click add from the catalog: the name is canonical so its icon always
    // resolves on the public page. Keeps the picker open to add several at once.
    const addFromCatalog = (item) => {
        if (addedNames.has(normalizeSkill(item.name))) return;
        router.post(
            '/admin/skills',
            { name: item.name, category: item.category, sort_order: nextOrder(item.category) },
            { preserveScroll: true, preserveState: true },
        );
    };

    const openForm = (skill) => {
        clearErrors();
        if (skill === 'new') {
            reset();
        } else {
            setData({ name: skill.name, category: skill.category, sort_order: skill.sort_order });
        }
        setEditing(skill);
    };

    const closeForm = () => setEditing(null);

    const submit = (e) => {
        e.preventDefault();
        const options = { preserveScroll: true, onSuccess: closeForm };
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

    const catalogGrouped = categories
        .map((category) => ({ category, items: SKILL_CATALOG.filter((i) => i.category === category) }))
        .filter((g) => g.items.length);

    return (
        <AdminLayout title="Skills">
            <Head title="Skills" />

            <div className="mb-5 flex justify-end gap-3">
                <SecondaryButton type="button" onClick={() => openForm('new')}>
                    <PlusIcon className="h-4 w-4" /> Custom skill
                </SecondaryButton>
                <PrimaryButton type="button" onClick={() => setPicking(true)}>
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
                                    className="group inline-flex items-center gap-1.5 rounded-full bg-indigo-50 py-1 pl-1.5 pr-1.5 text-sm font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                                >
                                    <SkillGlyph name={skill.name} size="h-6 w-6" iconSize="h-3.5 w-3.5" />
                                    <span className="pl-0.5">{skill.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => openForm(skill)}
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

            {/* Catalog picker: click a skill to add it with its matching icon. */}
            <Modal show={picking} onClose={() => setPicking(false)} title="Add a skill">
                <div className="space-y-5">
                    <p className="text-sm text-slate-500 dark:text-slate-400">
                        Pick a skill to add it instantly with its icon. Already-added skills are dimmed.
                    </p>
                    {catalogGrouped.map(({ category, items }) => (
                        <div key={category}>
                            <h3 className="mb-2 text-xs font-semibold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                                {category}
                            </h3>
                            <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
                                {items.map((item) => {
                                    const added = addedNames.has(normalizeSkill(item.name));
                                    return (
                                        <button
                                            key={item.name}
                                            type="button"
                                            disabled={added}
                                            onClick={() => addFromCatalog(item)}
                                            className={`flex items-center gap-2 rounded-xl border p-2.5 text-left text-sm font-medium transition-colors ${
                                                added
                                                    ? 'cursor-not-allowed border-slate-200 bg-slate-50 text-slate-400 dark:border-slate-800 dark:bg-slate-800/40 dark:text-slate-600'
                                                    : 'border-slate-200 bg-white text-slate-700 hover:border-indigo-400 hover:bg-indigo-50 dark:border-slate-700 dark:bg-slate-800/60 dark:text-slate-200 dark:hover:border-indigo-500/60 dark:hover:bg-indigo-500/10'
                                            }`}
                                        >
                                            <SkillGlyph name={item.name} size="h-7 w-7" iconSize="h-4 w-4" />
                                            <span className="truncate">{item.name}</span>
                                            {added && <span className="ml-auto text-xs">✓</span>}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                    <div className="flex items-center justify-between border-t border-slate-200 pt-4 dark:border-slate-800">
                        <button
                            type="button"
                            onClick={() => {
                                setPicking(false);
                                openForm('new');
                            }}
                            className="text-sm font-medium text-indigo-600 hover:underline dark:text-indigo-400"
                        >
                            Can't find it? Add a custom skill
                        </button>
                        <SecondaryButton onClick={() => setPicking(false)}>Done</SecondaryButton>
                    </div>
                </div>
            </Modal>

            {/* Manual form: custom (non-catalog) skills and editing existing ones. */}
            <Modal show={editing !== null} onClose={closeForm} title={editing === 'new' ? 'Add custom skill' : 'Edit skill'}>
                <form onSubmit={submit} className="space-y-4">
                    <ErrorSummary errors={errors} />
                    {data.name && (
                        <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400">
                            <SkillGlyph name={data.name} size="h-8 w-8" iconSize="h-4 w-4" />
                            Icon preview
                        </div>
                    )}
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
                        <SecondaryButton onClick={closeForm}>Cancel</SecondaryButton>
                        <PrimaryButton disabled={processing}>{processing ? 'Saving…' : 'Save'}</PrimaryButton>
                    </div>
                </form>
            </Modal>
        </AdminLayout>
    );
}
