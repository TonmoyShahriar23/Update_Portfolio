import { usePage } from '@inertiajs/react';
import { useEffect, useState } from 'react';

/**
 * Toast for flash messages shared via HandleInertiaRequests.
 */
export default function Flash() {
    const { flash } = usePage().props;
    const [visible, setVisible] = useState(false);
    const message = flash?.success || flash?.error;
    const isError = Boolean(flash?.error);

    useEffect(() => {
        if (message) {
            setVisible(true);
            const timer = setTimeout(() => setVisible(false), 4000);
            return () => clearTimeout(timer);
        }
    }, [message, flash]);

    if (!message || !visible) return null;

    return (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
            <div
                className={`rounded-lg px-4 py-3 text-sm font-medium text-white shadow-lg ${
                    isError ? 'bg-rose-600' : 'bg-emerald-600'
                }`}
                role="status"
            >
                {message}
            </div>
        </div>
    );
}
