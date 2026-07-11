<?php

namespace Database\Seeders;

use App\Models\Achievement;
use App\Models\Education;
use App\Models\Experience;
use App\Models\Profile;
use App\Models\Project;
use App\Models\Skill;
use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

/**
 * Seeds the single admin user and all initial portfolio content.
 * Everything seeded here remains editable from the admin panel.
 */
class PortfolioSeeder extends Seeder
{
    public function run(): void
    {
        // ---- Admin user (no public registration; change the password after first login) ----
        User::updateOrCreate(
            ['email' => 'tonmoyshahriar792@gmail.com'],
            [
                'name' => 'Mostaque Shahriar Tonmoy',
                'password' => Hash::make('password'),
            ],
        );

        // ---- Profile / Hero / About ----
        Profile::updateOrCreate(
            ['id' => Profile::query()->value('id') ?? 1],
            [
                'name' => 'Mostaque Shahriar Tonmoy',
                'headline' => 'Full-Stack Developer',
                'summary' => 'Full-stack developer with hands-on experience building web applications using PHP (Laravel), JavaScript, and Python. Skilled in RESTful API design, relational databases (MySQL), and frontend development.',
                'about' => "Full-stack developer with hands-on experience building web applications using PHP (Laravel), JavaScript, and Python. Skilled in RESTful API design, relational databases (MySQL), and frontend development.\n\nExperienced with payment gateway integration, admin dashboards, and real-world project delivery. Published researcher with a strong problem-solving background and growing expertise in React.",
                'location' => 'Mohammadpur, Dhaka',
                'email' => 'tonmoyshahriar792@gmail.com',
                'github_url' => 'https://github.com/TonmoyShahriar23',
                'linkedin_url' => 'https://www.linkedin.com/in/tonmoy-shahriar-479a8730b/?skipRedirect=true',
            ],
        );

        // ---- Skills ----
        Skill::query()->delete();
        $skills = [
            'Languages' => ['Python', 'PHP', 'JavaScript', 'SQL', 'HTML/CSS'],
            'Frameworks & Libraries' => ['React', 'Laravel', 'Laravel Inertia', 'Pandas', 'Scikit-learn', 'XGBoost', 'Matplotlib'],
            'Tools & Platforms' => ['Git', 'GitHub', 'Docker', 'MySQL', 'Power BI'],
            'Methodologies' => ['Agile', 'Scrum', 'CI/CD', 'DevOps', 'Unit Testing'],
            'Other' => ['REST APIs', 'Payment Gateway Integration'],
        ];

        foreach ($skills as $category => $names) {
            foreach ($names as $order => $name) {
                Skill::create(['category' => $category, 'name' => $name, 'sort_order' => $order]);
            }
        }

        // ---- Experience ----
        Experience::query()->delete();
        Experience::create([
            'title' => 'Technical Support Executive',
            'company' => 'Programming Hero',
            'start_date' => '2026-02-01',
            'is_current' => true,
            'description' => "Provide technical support for a platform with 1M+ downloads.\nAuthored documentation across 20+ modules.\nDesigned Python learning modules used by 1M+ learners.",
            'sort_order' => 1,
        ]);
        Experience::create([
            'title' => 'Machine Learning Intern',
            'company' => 'Future Interns',
            'start_date' => '2025-06-01',
            'end_date' => '2025-07-31',
            'description' => "Built sales forecasting models with Prophet, Scikit-learn, and Pandas, visualized in Power BI.\nDeveloped a churn prediction system with XGBoost.",
            'sort_order' => 2,
        ]);
        Experience::create([
            'title' => 'Software Developer',
            'company' => 'CSE-Tech',
            'start_date' => '2025-01-01',
            'end_date' => '2026-01-31',
            'description' => "Built real-world web applications with HTML, CSS, JavaScript, PHP, and Laravel.\nDesigned RESTful APIs following OOP and MVC principles.",
            'sort_order' => 3,
        ]);

        // ---- Projects ----
        Project::query()->delete();
        Project::create([
            'title' => 'Ray Omni',
            'description' => 'Full-stack web application built with Laravel, Inertia.js, and React. Fully Dockerized, with MinIO providing S3-compatible object storage.',
            'tech_stack' => ['Laravel', 'Inertia.js', 'React', 'Docker', 'MinIO', 'MySQL'],
            'live_url' => null,
            'repo_url' => null,
            'is_featured' => true,
            'sort_order' => 1,
        ]);
        Project::create([
            'title' => 'Custom AI Agent',
            'description' => 'Full-stack AI agent with an admin dashboard, report generation, and mail verification. Custom REST APIs built with PHP/Laravel (OOP, CRUD), payment gateway with invoicing, and secure authentication.',
            'tech_stack' => ['PHP', 'Laravel', 'REST API', 'Payment Gateway', 'MySQL'],
            'repo_url' => 'https://github.com/TonmoyShahriar23',
            'is_featured' => true,
            'sort_order' => 2,
        ]);
        Project::create([
            'title' => 'Kajwala – Business & Worker Discovery Platform',
            'description' => 'Geolocation-based worker discovery platform. HTML/CSS/JS frontend with a Laravel + MySQL backend, payment gateway integration, and a full authentication system.',
            'tech_stack' => ['HTML', 'CSS', 'JavaScript', 'Laravel', 'MySQL', 'Payment Gateway'],
            'repo_url' => 'https://github.com/TonmoyShahriar23',
            'sort_order' => 3,
        ]);

        // ---- Education ----
        Education::query()->delete();
        Education::create([
            'institution' => 'Daffodil International University',
            'degree' => 'B.Sc. in Computer Science and Engineering',
            'start_date' => '2022-01-01',
            'end_date' => '2025-12-31',
            'gpa' => '3.51/4.0',
            'highlights' => [
                'Thesis: Machine Learning-Based Dengue Detection from CBC Data Using a Stacking Ensemble Model',
                'Published Paper: Optimizing Human Activity Recognition Using a Support Vector Machine with a Custom Kernel and Feature Selection Techniques',
            ],
            'sort_order' => 1,
        ]);

        // ---- Achievements ----
        Achievement::query()->delete();
        $achievements = [
            ['title' => 'Inter University Programming Contest – TAKE OFF Finalist'],
            ['title' => 'Inter University ML Contest – CRACK DATASET 2024 Finalist', 'year' => '2024'],
            ['title' => 'Top 10, Inter-University PROMPT BATTLE Contest 2025', 'year' => '2025'],
            ['title' => 'Assistant General Secretary, DIU Embedded System Research Center', 'year' => '2025'],
            ['title' => 'Vice President, District Student Association'],
        ];

        foreach ($achievements as $order => $achievement) {
            Achievement::create([...$achievement, 'sort_order' => $order + 1]);
        }
    }
}
