import { Head, Link, useForm } from '@inertiajs/react';
import {
    ArrowRightIcon,
    BriefcaseIcon,
    CalendarIcon,
    CodeIcon,
    ExternalLinkIcon,
    GitHubIcon,
    GraduationCapIcon,
    LinkedInIcon,
    MailIcon,
    MapPinIcon,
    TrophyIcon,
} from '../Components/Icons';
import PublicLayout from '../Layouts/PublicLayout';
import { ErrorText, PrimaryButton, TextArea, TextInput } from '../Components/Form';
import { experienceRange, formatDate } from '../utils';

function SectionHeading({ eyebrow, title }) {
    return (
        <div className="mb-10">
            <p className="mb-2 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                {eyebrow}
            </p>
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">{title}</h2>
        </div>
    );
}

function Hero({ profile }) {
    return (
        <section className="relative overflow-hidden">
            <div
                className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(99,102,241,0.15),transparent_55%)]"
                aria-hidden="true"
            />
            <div className="mx-auto flex max-w-6xl flex-col-reverse items-center gap-10 px-4 py-20 sm:px-6 md:flex-row md:justify-between md:py-28">
                <div className="max-w-2xl text-center md:text-left">
                    <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-indigo-600 dark:text-indigo-400">
                        {profile.headline}
                    </p>
                    <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl dark:text-white">
                        {profile.name}
                    </h1>
                    {profile.location && (
                        <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-slate-500 md:justify-start dark:text-slate-400">
                            <MapPinIcon className="h-4 w-4" /> {profile.location}
                        </p>
                    )}
                    <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-300">{profile.summary}</p>
                    <div className="mt-8 flex flex-wrap items-center justify-center gap-3 md:justify-start">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 rounded-lg bg-indigo-600 px-5 py-2.5 text-sm font-semibold text-white shadow-md transition hover:bg-indigo-500"
                        >
                            Get in touch <ArrowRightIcon className="h-4 w-4" />
                        </a>
                        <a
                            href="#projects"
                            className="inline-flex items-center gap-2 rounded-lg border border-slate-300 px-5 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-100 dark:border-slate-700 dark:text-slate-200 dark:hover:bg-slate-800"
                        >
                            View projects
                        </a>
                        <div className="ml-1 flex items-center gap-2">
                            {profile.github_url && (
                                <a
                                    href={profile.github_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="GitHub"
                                    className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                                >
                                    <GitHubIcon className="h-5 w-5" />
                                </a>
                            )}
                            {profile.linkedin_url && (
                                <a
                                    href={profile.linkedin_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    aria-label="LinkedIn"
                                    className="rounded-full p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900 dark:hover:bg-slate-800 dark:hover:text-white"
                                >
                                    <LinkedInIcon className="h-5 w-5" />
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <div className="shrink-0">
                    {profile.avatar_url ? (
                        <img
                            src={profile.avatar_url}
                            alt={profile.name}
                            className="h-44 w-44 rounded-full border-4 border-white object-cover shadow-xl sm:h-56 sm:w-56 dark:border-slate-800"
                        />
                    ) : (
                        <div className="flex h-44 w-44 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-5xl font-bold text-white shadow-xl sm:h-56 sm:w-56 sm:text-6xl">
                            {profile.name
                                .split(' ')
                                .map((w) => w[0])
                                .slice(0, 2)
                                .join('')}
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
}

function About({ profile }) {
    if (!profile.about) return null;
    return (
        <section id="about" className="scroll-mt-20 bg-slate-50 py-20 dark:bg-slate-900/50">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow="About" title="A little background" />
                <p className="max-w-3xl whitespace-pre-line text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                    {profile.about}
                </p>
            </div>
        </section>
    );
}

function Skills({ skills, skillCategories }) {
    const categories = skillCategories.filter((c) => skills[c]?.length);
    if (!categories.length) return null;
    return (
        <section id="skills" className="scroll-mt-20 py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow="Skills" title="Technologies I work with" />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category) => (
                        <div
                            key={category}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                        >
                            <h3 className="mb-4 flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
                                <CodeIcon className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
                                {category}
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {skills[category].map((skill) => (
                                    <span
                                        key={skill.id}
                                        className="rounded-full bg-indigo-50 px-3 py-1 text-sm font-medium text-indigo-700 dark:bg-indigo-500/10 dark:text-indigo-300"
                                    >
                                        {skill.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Experience({ experiences }) {
    if (!experiences.length) return null;
    return (
        <section id="experience" className="scroll-mt-20 bg-slate-50 py-20 dark:bg-slate-900/50">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow="Experience" title="Where I've worked" />
                <div className="relative ml-3 space-y-10 border-l-2 border-slate-200 pl-8 dark:border-slate-700">
                    {experiences.map((exp) => (
                        <div key={exp.id} className="relative">
                            <span className="absolute -left-[41px] flex h-6 w-6 items-center justify-center rounded-full bg-indigo-600 ring-4 ring-slate-50 dark:ring-slate-900">
                                <BriefcaseIcon className="h-3 w-3 text-white" />
                            </span>
                            <p className="flex items-center gap-1.5 text-sm font-medium text-slate-500 dark:text-slate-400">
                                <CalendarIcon className="h-3.5 w-3.5" />
                                {experienceRange(exp)}
                                {exp.is_current && (
                                    <span className="ml-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-700 dark:bg-emerald-500/10 dark:text-emerald-400">
                                        Current
                                    </span>
                                )}
                            </p>
                            <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">{exp.title}</h3>
                            <p className="font-medium text-indigo-600 dark:text-indigo-400">
                                {exp.company}
                                {exp.location ? ` · ${exp.location}` : ''}
                            </p>
                            {exp.description && (
                                <p className="mt-2 max-w-3xl whitespace-pre-line leading-relaxed text-slate-600 dark:text-slate-300">
                                    {exp.description}
                                </p>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Projects({ projects }) {
    if (!projects.length) return null;
    return (
        <section id="projects" className="scroll-mt-20 py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow="Projects" title="Things I've built" />
                <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {projects.map((project) => (
                        <article
                            key={project.id}
                            className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                        >
                            {project.image_url ? (
                                <img
                                    src={project.image_url}
                                    alt={project.title}
                                    loading="lazy"
                                    className="h-44 w-full object-cover"
                                />
                            ) : (
                                <div className="flex h-44 w-full items-center justify-center bg-gradient-to-br from-indigo-500/90 to-violet-600/90">
                                    <CodeIcon className="h-10 w-10 text-white/80" />
                                </div>
                            )}
                            <div className="flex flex-1 flex-col p-5">
                                <div className="flex items-start justify-between gap-2">
                                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                        {project.title}
                                    </h3>
                                    {project.is_featured && (
                                        <span className="shrink-0 rounded-full bg-amber-100 px-2 py-0.5 text-xs font-semibold text-amber-700 dark:bg-amber-500/10 dark:text-amber-400">
                                            Featured
                                        </span>
                                    )}
                                </div>
                                {project.description && (
                                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                        {project.description}
                                    </p>
                                )}
                                {project.tech_stack?.length > 0 && (
                                    <div className="mt-4 flex flex-wrap gap-1.5">
                                        {project.tech_stack.map((tech) => (
                                            <span
                                                key={tech}
                                                className="rounded bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-600 dark:bg-slate-800 dark:text-slate-300"
                                            >
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                )}
                                <div className="mt-4 flex items-center gap-4 border-t border-slate-100 pt-4 dark:border-slate-800">
                                    {project.live_url && (
                                        <a
                                            href={project.live_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                        >
                                            <ExternalLinkIcon className="h-4 w-4" /> Live
                                        </a>
                                    )}
                                    {project.repo_url && (
                                        <a
                                            href={project.repo_url}
                                            target="_blank"
                                            rel="noreferrer"
                                            className="inline-flex items-center gap-1.5 text-sm font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
                                        >
                                            <GitHubIcon className="h-4 w-4" /> Code
                                        </a>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Certificates({ certificates }) {
    if (!certificates.length) return null;
    return (
        <section id="certificates" className="scroll-mt-20 bg-slate-50 py-20 dark:bg-slate-900/50">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow="Certificates" title="Certifications & courses" />
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {certificates.map((cert) => (
                        <article
                            key={cert.id}
                            className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:shadow-md dark:border-slate-800 dark:bg-slate-900"
                        >
                            {cert.image_url && (
                                <img
                                    src={cert.image_url}
                                    alt={cert.title}
                                    loading="lazy"
                                    className="h-44 w-full border-b border-slate-100 object-cover dark:border-slate-800"
                                />
                            )}
                            <div className="p-5">
                                <h3 className="font-semibold text-slate-900 dark:text-white">{cert.title}</h3>
                                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                                    {cert.issuer}
                                    {cert.issued_at ? ` · ${formatDate(cert.issued_at)}` : ''}
                                </p>
                                {cert.credential_url && (
                                    <a
                                        href={cert.credential_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500 dark:text-indigo-400"
                                    >
                                        <ExternalLinkIcon className="h-4 w-4" /> View credential
                                    </a>
                                )}
                            </div>
                        </article>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Education({ educations }) {
    if (!educations.length) return null;
    return (
        <section id="education" className="scroll-mt-20 py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow="Education" title="Academic background" />
                <div className="space-y-6">
                    {educations.map((edu) => (
                        <div
                            key={edu.id}
                            className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <div className="flex flex-wrap items-start justify-between gap-2">
                                <div className="flex items-start gap-3">
                                    <span className="mt-1 rounded-lg bg-indigo-50 p-2 text-indigo-600 dark:bg-indigo-500/10 dark:text-indigo-400">
                                        <GraduationCapIcon className="h-5 w-5" />
                                    </span>
                                    <div>
                                        <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                                            {edu.degree}
                                        </h3>
                                        <p className="font-medium text-indigo-600 dark:text-indigo-400">
                                            {edu.institution}
                                        </p>
                                    </div>
                                </div>
                                <div className="text-right text-sm text-slate-500 dark:text-slate-400">
                                    {(edu.start_date || edu.end_date) && (
                                        <p>
                                            {formatDate(edu.start_date)} – {formatDate(edu.end_date) || 'Present'}
                                        </p>
                                    )}
                                    {edu.gpa && <p className="mt-0.5 font-semibold">CGPA: {edu.gpa}</p>}
                                </div>
                            </div>
                            {edu.highlights?.length > 0 && (
                                <ul className="mt-4 space-y-1.5 pl-4 text-sm leading-relaxed text-slate-600 dark:text-slate-300">
                                    {edu.highlights.map((h, i) => (
                                        <li key={i} className="list-disc">
                                            {h}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Achievements({ achievements }) {
    if (!achievements.length) return null;
    return (
        <section id="achievements" className="scroll-mt-20 bg-slate-50 py-20 dark:bg-slate-900/50">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow="Achievements" title="Contests & leadership" />
                <div className="grid gap-4 sm:grid-cols-2">
                    {achievements.map((item) => (
                        <div
                            key={item.id}
                            className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                        >
                            <span className="rounded-lg bg-amber-50 p-2 text-amber-600 dark:bg-amber-500/10 dark:text-amber-400">
                                <TrophyIcon className="h-5 w-5" />
                            </span>
                            <div>
                                <h3 className="font-semibold text-slate-900 dark:text-white">
                                    {item.title}
                                    {item.year && (
                                        <span className="ml-2 text-sm font-normal text-slate-500 dark:text-slate-400">
                                            {item.year}
                                        </span>
                                    )}
                                </h3>
                                {item.description && (
                                    <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.description}</p>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

function BlogPreview({ posts }) {
    if (!posts.length) return null;
    return (
        <section id="blog" className="scroll-mt-20 py-20">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <div className="flex items-end justify-between">
                    <SectionHeading eyebrow="Blog" title="Latest posts" />
                    <Link
                        href="/blog"
                        className="mb-10 hidden items-center gap-1.5 text-sm font-semibold text-indigo-600 hover:text-indigo-500 sm:inline-flex dark:text-indigo-400"
                    >
                        All posts <ArrowRightIcon className="h-4 w-4" />
                    </Link>
                </div>
                <div className="grid gap-8 md:grid-cols-3">
                    {posts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/blog/${post.slug}`}
                            className="group overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg dark:border-slate-800 dark:bg-slate-900"
                        >
                            {post.thumbnail_url ? (
                                <img
                                    src={post.thumbnail_url}
                                    alt={post.title}
                                    loading="lazy"
                                    className="h-40 w-full object-cover"
                                />
                            ) : (
                                <div className="h-40 w-full bg-gradient-to-br from-slate-200 to-slate-300 dark:from-slate-800 dark:to-slate-700" />
                            )}
                            <div className="p-5">
                                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                                    {formatDate(post.published_at, { year: 'numeric', month: 'long', day: 'numeric' })}
                                </p>
                                <h3 className="mt-1.5 font-semibold text-slate-900 group-hover:text-indigo-600 dark:text-white dark:group-hover:text-indigo-400">
                                    {post.title}
                                </h3>
                                {post.excerpt && (
                                    <p className="mt-2 line-clamp-3 text-sm text-slate-600 dark:text-slate-300">
                                        {post.excerpt}
                                    </p>
                                )}
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

function Contact({ profile }) {
    const { data, setData, post, processing, errors, reset, wasSuccessful } = useForm({
        name: '',
        email: '',
        subject: '',
        body: '',
    });

    const submit = (e) => {
        e.preventDefault();
        post('/contact', { preserveScroll: true, onSuccess: () => reset() });
    };

    return (
        <section id="contact" className="scroll-mt-20 bg-slate-50 py-20 dark:bg-slate-900/50">
            <div className="mx-auto max-w-6xl px-4 sm:px-6">
                <SectionHeading eyebrow="Contact" title="Let's work together" />
                <div className="grid gap-12 lg:grid-cols-2">
                    <div>
                        <p className="max-w-md text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                            Have a project in mind, a role to fill, or just want to say hi? Drop me a message — I read
                            everything and reply as soon as I can.
                        </p>
                        <div className="mt-8 space-y-4 text-slate-600 dark:text-slate-300">
                            {profile.email && (
                                <a
                                    href={`mailto:${profile.email}`}
                                    className="flex items-center gap-3 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                    <MailIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> {profile.email}
                                </a>
                            )}
                            {profile.location && (
                                <p className="flex items-center gap-3">
                                    <MapPinIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />{' '}
                                    {profile.location}
                                </p>
                            )}
                            {profile.linkedin_url && (
                                <a
                                    href={profile.linkedin_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center gap-3 hover:text-indigo-600 dark:hover:text-indigo-400"
                                >
                                    <LinkedInIcon className="h-5 w-5 text-indigo-600 dark:text-indigo-400" /> LinkedIn
                                </a>
                            )}
                        </div>
                    </div>
                    <form
                        onSubmit={submit}
                        className="space-y-4 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900"
                    >
                        <div className="grid gap-4 sm:grid-cols-2">
                            <div>
                                <TextInput
                                    placeholder="Your name"
                                    value={data.name}
                                    onChange={(e) => setData('name', e.target.value)}
                                    required
                                />
                                <ErrorText error={errors.name} />
                            </div>
                            <div>
                                <TextInput
                                    type="email"
                                    placeholder="Your email"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <ErrorText error={errors.email} />
                            </div>
                        </div>
                        <div>
                            <TextInput
                                placeholder="Subject (optional)"
                                value={data.subject}
                                onChange={(e) => setData('subject', e.target.value)}
                            />
                            <ErrorText error={errors.subject} />
                        </div>
                        <div>
                            <TextArea
                                rows={5}
                                placeholder="Your message"
                                value={data.body}
                                onChange={(e) => setData('body', e.target.value)}
                                required
                            />
                            <ErrorText error={errors.body} />
                        </div>
                        <PrimaryButton disabled={processing} className="w-full">
                            {processing ? 'Sending…' : 'Send message'}
                        </PrimaryButton>
                        {wasSuccessful && (
                            <p className="text-center text-sm font-medium text-emerald-600 dark:text-emerald-400">
                                Message sent — thank you!
                            </p>
                        )}
                    </form>
                </div>
            </div>
        </section>
    );
}

export default function Home({
    profile,
    skills,
    skillCategories,
    experiences,
    projects,
    certificates,
    achievements,
    educations,
    latestPosts,
}) {
    return (
        <PublicLayout profile={profile}>
            <Head title="Home">
                <meta name="description" content={profile.summary ?? ''} />
            </Head>
            <Hero profile={profile} />
            <About profile={profile} />
            <Skills skills={skills} skillCategories={skillCategories} />
            <Experience experiences={experiences} />
            <Projects projects={projects} />
            <Certificates certificates={certificates} />
            <Education educations={educations} />
            <Achievements achievements={achievements} />
            <BlogPreview posts={latestPosts} />
            <Contact profile={profile} />
        </PublicLayout>
    );
}
