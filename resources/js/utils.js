export function formatDate(value, options = { year: 'numeric', month: 'short' }) {
    if (!value) return '';
    return new Date(value).toLocaleDateString('en-US', options);
}

export function formatFullDate(value) {
    return formatDate(value, { year: 'numeric', month: 'long', day: 'numeric' });
}

export function experienceRange(exp) {
    const start = formatDate(exp.start_date);
    const end = exp.is_current ? 'Present' : formatDate(exp.end_date);
    return `${start} – ${end || 'Present'}`;
}
