import { Head, useForm } from '@inertiajs/react';
import { Checkbox, ErrorText, Field, PrimaryButton, TextInput } from '../../Components/Form';
import ThemeToggle from '../../Components/ThemeToggle';

export default function Login() {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();
        post('/admin/login');
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
            <Head title="Admin Login" />
            <div className="absolute right-4 top-4">
                <ThemeToggle />
            </div>
            <div className="w-full max-w-md">
                <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                    <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Admin login</h1>
                    <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                        Sign in to manage your portfolio.
                    </p>

                    <form onSubmit={submit} className="mt-6 space-y-4">
                        <Field label="Email" error={errors.email}>
                            <TextInput
                                type="email"
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                                autoComplete="username"
                                autoFocus
                                required
                            />
                        </Field>
                        <div>
                            <Field label="Password" error={errors.password}>
                                <TextInput
                                    type="password"
                                    value={data.password}
                                    onChange={(e) => setData('password', e.target.value)}
                                    autoComplete="current-password"
                                    required
                                />
                            </Field>
                        </div>
                        <Checkbox
                            label="Remember me"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <PrimaryButton disabled={processing} className="w-full">
                            {processing ? 'Signing in…' : 'Sign in'}
                        </PrimaryButton>
                    </form>
                </div>
            </div>
        </div>
    );
}
