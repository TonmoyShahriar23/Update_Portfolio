import { useEffect } from 'react';
import { XIcon } from './Icons';

export default function Modal({ show, onClose, title, children, wide = false }) {
    useEffect(() => {
        const onKey = (e) => e.key === 'Escape' && onClose();
        if (show) {
            document.addEventListener('keydown', onKey);
            document.body.style.overflow = 'hidden';
        }
        return () => {
            document.removeEventListener('keydown', onKey);
            document.body.style.overflow = '';
        };
    }, [show, onClose]);

    if (!show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8">
            <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={onClose} />
            <div
                className={`relative z-10 my-auto w-full ${wide ? 'max-w-3xl' : 'max-w-lg'} rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800`}
                role="dialog"
                aria-modal="true"
            >
                <div className="mb-4 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{title}</h3>
                    <button
                        type="button"
                        onClick={onClose}
                        className="rounded-full p-1 text-slate-400 hover:bg-slate-100 hover:text-slate-700 dark:hover:bg-slate-700 dark:hover:text-white"
                        aria-label="Close"
                    >
                        <XIcon className="h-5 w-5" />
                    </button>
                </div>
                {children}
            </div>
        </div>
    );
}
