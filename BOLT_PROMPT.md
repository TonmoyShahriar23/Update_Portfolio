# Bolt AI Prompt — Personal Portfolio Website

> Copy everything below the line and paste it into Bolt AI as a single prompt.

---

Build a complete, production-quality **personal portfolio website** for me with two parts: a polished public portfolio site and a private admin panel that manages ALL of the site's content. Use whatever modern stack you prefer — but every feature, section, design detail, and piece of content described below is **required** and must match exactly.

## 1. Overall Design System

- **Font:** Instrument Sans (fallback: system-ui sans-serif stack), weights 400/500/600.
- **Light mode:** white background, slate-800 text. **Dark mode:** slate-950 background, slate-200 text. Sections alternate between the base background and a subtle band (slate-50 in light mode, semi-transparent slate-900 in dark mode).
- **Dark/light theme toggle** (sun/moon icon) in the navbar. Persist the choice to localStorage, respect the system `prefers-color-scheme` when unset, and apply the theme before first paint so there is no flash of the wrong theme. Native form controls (date pickers) should follow the theme.
- **Accent colors:**
  - **Indigo** — nav link hover, text links, focus rings, admin panel active states, text selection highlight.
  - **Cyan → sky → blue gradient** — hero name text and primary buttons (primary buttons get a soft cyan glow shadow, ~`shadow-cyan-500/25`).
  - **Emerald → cyan gradient with a glow** (`0 0 12px rgba(16,185,129,0.6)`) — the Experience and Education timeline lines and nodes.
  - **Amber** — "Featured" badges and achievement trophy icons. **Rose** — danger/delete/logout buttons. **Purple/fuchsia gradient** — one highlighted "featured" skill category card.
  - Stat card numbers use these exact hex colors: `#34D399` (Technologies), `#22D3EE` (Experience), `#C084FC` (Projects). Hero background has a soft radial glow of `rgba(6,182,212,0.14)`.
- **Animations:**
  - Timeline center lines **draw in progressively as you scroll**.
  - Timeline cards slide in from the left/right (offset ~60px, fading in) alternately.
  - Skill chips scale up slightly on hover with a springy motion.
  - Project/certificate cards lift on hover (`translate-y` up + stronger shadow).
  - Pulsing green dot on the availability pill; blinking caret on the typewriter text.
  - Smooth scrolling for all in-page anchor links.
- **Responsive:** mobile-first. Hero columns stack (image above text on mobile), timelines collapse to a single-side layout on small screens, navbar collapses to a hamburger menu.

## 2. Public Site — Single-Page Portfolio

A single home page with anchored sections in this exact order, plus separate Blog pages.

### Navbar
Fixed at top, height ~64px, max-width ~72rem centered, translucent background with backdrop blur and a bottom border. Left: logo text **"Mostaque"** with an indigo **".dev"** suffix (→ "Mostaque.dev"). Right (desktop): anchor links **About, Skills, Experience, Projects, Certificates, Education, Contact**, a **Blog** link (separate page), and the theme toggle. Mobile: hamburger (menu/X icon) opening a dropdown panel with the same links.

### Hero Section
Two columns (text left, image right; reversed stacking on mobile):
- A pill badge with a pulsing green dot: **"Available For New Opportunities"**.
- Large heading: first name "Mostaque" in slate/white, the rest "Shahriar Tonmoy" in the cyan→sky→blue gradient.
- Below it, a **typewriter effect** that types and deletes these roles in a loop, in gradient (cyan/sky/emerald) text with a blinking caret:
  1. Full-Stack Developer
  2. AI Enthusiast
  3. CSE Graduate
  4. Ex-ML Intern at Future Interns
  5. Junior Project Manager at Fibu
- A location line with a map-pin icon: **Mohammadpur, Dhaka**.
- Summary paragraph: *"Full-stack developer with hands-on experience building web applications using PHP (Laravel), JavaScript, and Python. Skilled in RESTful API design, relational databases (MySQL), and frontend development."*
- Six small colored tech badge pills: **Laravel** (red), **PHP** (indigo), **JavaScript** (amber), **Python** (blue), **MySQL** (cyan), **REST APIs** (emerald).
- CTA row: gradient primary button **"View Projects"** (with an arrow icon rotated −45°) scrolling to Projects, and an outlined **"Download Resume"** button (shown only if a resume file is uploaded in admin). Next to them, circular social icon buttons for GitHub and LinkedIn.
- Right column: circular profile photo (up to ~420px) with a blurred cyan→blue→emerald gradient halo behind it and a thin (~3px) gradient ring around it. If no photo is uploaded, show the owner's initials on a gradient circle instead.

### Section Heading Pattern (used by every section)
A small uppercase, letter-spaced indigo eyebrow label, then a bold 3xl–4xl title in slate/white. Some titles put their second word in the emerald→cyan gradient (noted below).

### About
Heading "About". A multi-paragraph bio (preserve line breaks): the hero summary above **plus**: *"Experienced with payment gateway integration, admin dashboards, and real-world project delivery. Published researcher with a strong problem-solving background and growing expertise in React."*

### Skills
Two-column grid of category cards; each card lists skill "chips" — small bordered rounded tiles with a colored technology icon (use each technology's brand color for the icon, icon background = the brand color at low opacity) that spring-scale on hover. One category card is "featured" with a purple/fuchsia gradient style. Categories and skills:
- **Languages:** Python, PHP, JavaScript, SQL, HTML/CSS
- **Frameworks & Libraries:** React, Laravel, Laravel Inertia, Pandas, Scikit-learn, XGBoost, Matplotlib
- **Tools & Platforms:** Git, GitHub, Docker, MySQL, Power BI
- **Methodologies:** Agile, Scrum, CI/CD, DevOps, Unit Testing
- **Other:** REST APIs, Payment Gateway Integration

Below the grid, three stat cards: **Technologies count** (`#34D399`), **Years of Experience** (`#22D3EE`, shown as "X+ Yrs"), **Projects count** (`#C084FC`).

### Experience (title: "Professional **Experience**" — second word in emerald→cyan gradient, with a subtitle line)
A vertical timeline: center line that animates its draw-in on scroll (emerald→cyan gradient, glowing), circular briefcase-icon nodes with an emerald ring glow, and cards alternating left/right that slide in as they enter the viewport. Each card: role, company, date range (a "Present" state for current roles), description. Entries:
1. **Technical Support Executive — Programming Hero** (Feb 2026 – Present, current). Provide technical support for a platform with 1M+ downloads. Authored documentation across 20+ modules. Designed Python learning modules used by 1M+ learners.
2. **Machine Learning Intern — Future Interns** (Jun 2025 – Jul 2025). Built sales forecasting models with Prophet, Scikit-learn, and Pandas, visualized in Power BI. Developed a churn prediction system with XGBoost.
3. **Software Developer — CSE-Tech** (Jan 2025 – Jan 2026). Built real-world web applications with HTML, CSS, JavaScript, PHP, and Laravel. Designed RESTful APIs following OOP and MVC principles.

### Projects
Heading "Projects". A 3-column card grid (responsive). Each card: image header (or a gradient placeholder if no image), title, an amber "Featured" badge when flagged, description, small tech-stack tag pills, and "Live" / "Code" link buttons. Cards lift on hover. Entries:
1. **Ray Omni** (Featured) — Full-stack web application built with Laravel, Inertia.js, and React. Fully Dockerized, with MinIO providing S3-compatible object storage. Tech: Laravel, Inertia.js, React, Docker, MinIO, MySQL.
2. **Custom AI Agent** (Featured) — Full-stack AI agent with an admin dashboard, report generation, and mail verification. Custom REST APIs built with PHP/Laravel (OOP, CRUD), payment gateway with invoicing, and secure authentication. Tech: PHP, Laravel, REST API, Payment Gateway, MySQL.
3. **Kajwala – Business & Worker Discovery Platform** — Geolocation-based worker discovery platform. HTML/CSS/JS frontend with a Laravel + MySQL backend, payment gateway integration, and a full authentication system. Tech: HTML, CSS, JavaScript, Laravel, MySQL, Payment Gateway.

### Certificates
Heading "Certificates". Card grid of certificate images; clicking a card opens a **modal** with the full image, issuer, date, and a credential link. (No certificates pre-filled — added via admin.)

### Education (title: "Academic **Journey**" — second word in emerald→cyan gradient, with a subtitle line)
Same animated timeline style as Experience but with graduation-cap nodes. Entry:
- **Daffodil International University** — B.Sc. in Computer Science and Engineering (2022 – 2025), GPA 3.51/4.0. Highlights: Thesis — "Machine Learning-Based Dengue Detection from CBC Data Using a Stacking Ensemble Model"; Published Paper — "Optimizing Human Activity Recognition Using a Support Vector Machine with a Custom Kernel and Feature Selection Techniques".

### Achievements
Heading "Achievements". Two-column cards, each with an amber trophy icon, title, optional year, and description. Entries:
1. Inter University Programming Contest – TAKE OFF Finalist
2. Inter University ML Contest – CRACK DATASET 2024 Finalist (2024)
3. Top 10, Inter-University PROMPT BATTLE Contest 2025 (2025)
4. Assistant General Secretary, DIU Embedded System Research Center (2025)
5. Vice President, District Student Association

### Contact
Heading "Contact". Two columns:
- Left: intro text — *"Have a project in mind, a role to fill, or just want to say hi? Drop me a message — I read everything and reply as soon as I can."* — followed by contact rows: email **tonmoyshahriar792@gmail.com**, location **Mohammadpur, Dhaka**, and LinkedIn.
- Right: a contact form with fields **name** (required), **email** (required, validated), **subject** (optional), **message** (required, max 5000 chars). Inline validation errors under each field. On success, show: **"Thanks for reaching out! I'll get back to you soon."** Submissions are **saved to the database** (no email sending) and the endpoint is rate-limited (~10 requests/minute). Messages appear in the admin inbox.

### Footer
Top border, centered social icon links (GitHub, LinkedIn, Email) and **© {current year} Mostaque Shahriar Tonmoy**.

### Social Links (used in hero + footer)
- GitHub: https://github.com/TonmoyShahriar23
- LinkedIn: https://www.linkedin.com/in/tonmoy-shahriar-479a8730b/
- Email: tonmoyshahriar792@gmail.com

## 3. Blog (separate pages)

- **/blog** — paginated list of published posts: thumbnail, title, excerpt, date.
- **/blog/{slug}** — full post page: thumbnail, title, date, long-form content.
- Posts have **published/draft** states; drafts are never visible publicly. Same navbar/footer/theme as the rest of the site.

## 4. Admin Panel (private, content management)

**Every piece of public content above must be database-driven and editable here** — the public site reads everything (profile, bio, skills, experiences, projects, certificates, education, achievements, blog posts) from the database, seeded initially with the content in this prompt.

- **Auth:** login page only (email + password + "remember me") — **no public registration**. One admin account seeded: email `tonmoyshahriar792@gmail.com`, password `password` (I will change it after setup). Logging out returns to the login page; all admin routes require auth.
- **Layout:** fixed left sidebar (~256px) with a logo reading **"Admin"** + indigo **".panel"**, nav items: **Dashboard, Profile & About, Projects, Skills, Experience, Certificates, Blog, Achievements, Education, Messages**; at the bottom a "View site" link and a rose "Log out" button. Sticky top header showing the current page title, the admin email, and the theme toggle. Indigo primary buttons, rose delete buttons, indigo focus rings throughout.
- **Dashboard:** stat cards showing counts for each content section, a highlighted indigo **Messages** card with the unread count, and a recent-messages list.
- **Profile & About:** edit name, headline, location, email, hero summary, about text, social links, availability toggle; upload/replace profile photo and resume (PDF).
- **Projects / Skills / Experience / Certificates / Achievements / Education:** full CRUD (create, edit, delete, list) with all fields shown on the public site — including project images, "featured" flags, skill categories, date ranges with a "current" option, certificate images + credential links.
- **Blog:** full CRUD with thumbnail upload, slug, excerpt, content, and a **publish/unpublish toggle**.
- **Messages:** inbox of contact-form submissions with unread indicators, a read/unread toggle, and delete.
- **File uploads:** profile photo, resume, project images, certificate images, blog thumbnails — store them in whatever media solution fits your stack; replacing or deleting a record must clean up its old file.

## 5. Quality Requirements

- Clean, consistent component styling across public site and admin; both fully support dark/light mode.
- Accessible: proper labels on all form fields, keyboard-dismissable modal, sensible focus states.
- All seeded content must render exactly as written above on first load, with no placeholder "lorem ipsum" anywhere.
