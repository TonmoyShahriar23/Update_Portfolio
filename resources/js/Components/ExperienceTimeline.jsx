import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Briefcase, Building2 } from 'lucide-react';

const DEFAULT_SUBTITLE =
    'A timeline of the roles and internships where I have grown as an engineer, contributed to real products, and sharpened my craft.';

// Formats an experience date range, e.g. "Jan 2024 – Present".
function dateRange(start, end, isCurrent) {
    const fmt = (v) => (v ? new Date(v).toLocaleDateString('en-US', { year: 'numeric', month: 'short' }) : '');
    const startLabel = fmt(start);
    const endLabel = isCurrent ? 'Present' : fmt(end) || 'Present';
    if (!startLabel) return endLabel;
    return `${startLabel} – ${endLabel}`;
}

function TimelineCard({ exp, side }) {
    const range = dateRange(exp.start_date, exp.end_date, exp.is_current);

    return (
        <motion.div
            initial={{ opacity: 0, x: side === 'right' ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            // Content is always left-aligned/LTR; only `md:ml-auto` shifts the whole
            // block to hug the center line — it never affects inner alignment.
            className={`rounded-xl border border-slate-200 bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm sm:p-6 md:max-w-2xl dark:border-gray-800 dark:bg-gray-900/50 ${
                side === 'left' ? 'md:ml-auto' : ''
            }`}
        >
            {/* Date + Current pills */}
            <div className="flex flex-wrap items-center gap-2">
                {range && (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                        {range}
                    </span>
                )}
                {exp.is_current && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10">
                        Current
                    </span>
                )}
            </div>

            {/* Title */}
            <h3 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">{exp.title}</h3>

            {/* Company + location */}
            <div className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-teal-600 dark:text-teal-300">
                <Building2 className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>
                    {exp.company}
                    {exp.location ? ` · ${exp.location}` : ''}
                </span>
            </div>

            {/* Description */}
            {exp.description && (
                <p className="mt-3 whitespace-pre-line break-words text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                    {exp.description}
                </p>
            )}
        </motion.div>
    );
}

export default function ExperienceTimeline({ experiences = [], subtitle = DEFAULT_SUBTITLE }) {
    const timelineRef = useRef(null);

    // Draw the center line from top to bottom as the section scrolls through the viewport.
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start center', 'end center'],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    if (!experiences.length) return null;

    return (
        <section id="experience" className="scroll-mt-20 bg-slate-50 py-20 dark:bg-slate-900/50">
            <div className="mx-auto max-w-7xl px-4 sm:px-6">
                {/* Heading */}
                <div className="mb-14 text-center">
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        <span className="text-slate-900 dark:text-white">Professional </span>
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Experience
                        </span>
                    </h2>
                    {subtitle && (
                        <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            {subtitle}
                        </p>
                    )}
                </div>

                {/* Timeline */}
                <div ref={timelineRef} className="relative">
                    {/* Center line — faint static track */}
                    <div className="absolute top-0 bottom-0 left-5 w-px -translate-x-1/2 bg-slate-200 md:left-1/2 dark:bg-white/10" />
                    {/* Center line — animated draw layer with glow */}
                    <motion.div
                        style={{ height: lineHeight }}
                        className="absolute top-0 left-5 w-px -translate-x-1/2 bg-gradient-to-b from-emerald-400 to-cyan-400 shadow-[0_0_12px_rgba(16,185,129,0.6)] md:left-1/2"
                    />

                    <div className="space-y-10 md:space-y-14">
                        {experiences.map((exp, i) => {
                            // Even entries sit on the right, odd on the left (alternating zigzag).
                            const side = i % 2 === 0 ? 'right' : 'left';
                            return (
                                <div key={exp.id} className="relative">
                                    {/* Node icon on the center line */}
                                    <motion.span
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                                        className="absolute top-2 left-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-gray-950 text-emerald-400 ring-2 ring-emerald-400/60 shadow-[0_0_16px_rgba(16,185,129,0.5)] md:left-1/2"
                                    >
                                        <Briefcase className="h-5 w-5" aria-hidden="true" />
                                    </motion.span>

                                    {/* Card column — full width on mobile (offset past the line),
                                        half width and pushed to its side on md+ */}
                                    <div
                                        className={`pl-16 md:w-1/2 ${
                                            side === 'right'
                                                ? 'md:ml-auto md:pl-8'
                                                : 'md:pr-8 md:pl-0'
                                        }`}
                                    >
                                        <TimelineCard exp={exp} side={side} />
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
}
