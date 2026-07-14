import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { GraduationCap, BookOpen } from 'lucide-react';

const DEFAULT_SUBTITLE =
    'A structured overview of my academic background, showcasing continuous growth, discipline, and a strong foundation in computer science and engineering.';

// Year-range pill text, e.g. "2021 – 2025" or "2021 – Present".
function yearRange(start, end) {
    const startYear = start ? new Date(start).getFullYear() : '';
    const endYear = end ? new Date(end).getFullYear() : 'Present';
    if (!startYear && endYear === 'Present') return '';
    return `${startYear} – ${endYear}`;
}

function TimelineCard({ edu, side }) {
    const range = yearRange(edu.start_date, edu.end_date);

    return (
        <motion.div
            initial={{ opacity: 0, x: side === 'right' ? 60 : -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            // Content is always left-aligned/LTR; only `md:ml-auto` shifts the whole
            // block to hug the center line — it never affects inner alignment.
            className={`rounded-xl border border-slate-200 bg-white/80 p-5 text-left shadow-sm backdrop-blur-sm sm:p-6 md:max-w-lg dark:border-gray-800 dark:bg-gray-900/50 ${
                side === 'left' ? 'md:ml-auto' : ''
            }`}
        >
            {/* Date + GPA pills */}
            <div className="flex flex-wrap items-center gap-2">
                {range && (
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-600 ring-1 ring-emerald-500/20 dark:text-emerald-400">
                        {range}
                    </span>
                )}
                {edu.gpa && (
                    <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-600 ring-1 ring-slate-200 dark:bg-white/5 dark:text-slate-300 dark:ring-white/10">
                        GPA: {edu.gpa}
                    </span>
                )}
            </div>

            {/* Degree */}
            <h3 className="mt-3 text-xl font-bold text-slate-900 sm:text-2xl dark:text-white">{edu.degree}</h3>

            {/* Institution */}
            <div className="mt-1.5 flex items-center gap-1.5 text-sm font-medium text-teal-600 dark:text-teal-300">
                <BookOpen className="h-4 w-4 shrink-0" aria-hidden="true" />
                <span>{edu.institution}</span>
            </div>

            {/* Highlights */}
            {edu.highlights?.length > 0 && (
                <div className="mt-3 space-y-1.5">
                    {edu.highlights.map((h, i) => (
                        <p key={i} className="text-sm leading-relaxed text-slate-500 dark:text-slate-400">
                            {h}
                        </p>
                    ))}
                </div>
            )}
        </motion.div>
    );
}

export default function EducationTimeline({ educations = [], subtitle = DEFAULT_SUBTITLE }) {
    const timelineRef = useRef(null);

    // Draw the center line from top to bottom as the section scrolls through the viewport.
    const { scrollYProgress } = useScroll({
        target: timelineRef,
        offset: ['start center', 'end center'],
    });
    const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%']);

    if (!educations.length) return null;

    return (
        <section id="education" className="scroll-mt-20 py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                {/* Heading */}
                <div className="mb-14 text-center">
                    <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
                        <span className="text-slate-900 dark:text-white">Academic </span>
                        <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                            Journey
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

                    <div className="space-y-16 md:space-y-28">
                        {educations.map((edu, i) => {
                            // Even entries sit on the right, odd on the left (alternating zigzag).
                            const side = i % 2 === 0 ? 'right' : 'left';
                            return (
                                <div key={edu.id} className="relative">
                                    {/* Node icon on the center line */}
                                    <motion.span
                                        initial={{ scale: 0, opacity: 0 }}
                                        whileInView={{ scale: 1, opacity: 1 }}
                                        viewport={{ once: true, amount: 0.5 }}
                                        transition={{ duration: 0.5, ease: 'easeOut', delay: 0.1 }}
                                        className="absolute top-2 left-5 z-10 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full bg-gray-950 text-emerald-400 ring-2 ring-emerald-400/60 shadow-[0_0_16px_rgba(16,185,129,0.5)] md:left-1/2"
                                    >
                                        <GraduationCap className="h-5 w-5" aria-hidden="true" />
                                    </motion.span>

                                    {/* Card column — full width on mobile (offset past the line),
                                        half width and pushed to its side on md+ */}
                                    <div
                                        className={`pl-16 md:w-1/2 ${
                                            side === 'right'
                                                ? 'md:ml-auto md:pl-12'
                                                : 'md:pr-12 md:pl-0'
                                        }`}
                                    >
                                        <TimelineCard edu={edu} side={side} />
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
