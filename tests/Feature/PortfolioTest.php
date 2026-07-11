<?php

namespace Tests\Feature;

use App\Models\Blog;
use App\Models\Message;
use App\Models\Skill;
use App\Models\User;
use Database\Seeders\PortfolioSeeder;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class PortfolioTest extends TestCase
{
    use RefreshDatabase;

    public function test_home_page_renders_with_seeded_content(): void
    {
        $this->seed(PortfolioSeeder::class);

        $this->get('/')
            ->assertOk()
            ->assertSee('Mostaque Shahriar Tonmoy')
            ->assertSee('Ray Omni');
    }

    public function test_blog_index_shows_only_published_posts(): void
    {
        Blog::create(['title' => 'Published', 'slug' => 'published', 'content' => 'Body', 'is_published' => true, 'published_at' => now()]);
        Blog::create(['title' => 'Draft post', 'slug' => 'draft-post', 'content' => 'Body', 'is_published' => false]);

        $this->get('/blog')->assertOk()->assertSee('Published')->assertDontSee('Draft post');
        $this->get('/blog/draft-post')->assertNotFound();
        $this->get('/blog/published')->assertOk();
    }

    public function test_contact_form_stores_message(): void
    {
        $this->post('/contact', [
            'name' => 'Jane Doe',
            'email' => 'jane@example.com',
            'subject' => 'Hello',
            'body' => 'Nice portfolio!',
        ])->assertRedirect();

        $this->assertDatabaseHas('messages', ['email' => 'jane@example.com', 'is_read' => false]);
    }

    public function test_guest_is_redirected_from_admin(): void
    {
        $this->get('/admin')->assertRedirect('/admin/login');
    }

    public function test_admin_can_login_and_access_dashboard(): void
    {
        $this->seed(PortfolioSeeder::class);

        $this->post('/admin/login', [
            'email' => 'tonmoyshahriar792@gmail.com',
            'password' => 'password',
        ])->assertRedirect('/admin');

        $this->get('/admin')->assertOk();
    }

    public function test_admin_can_manage_skills_and_messages(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)
            ->post('/admin/skills', ['name' => 'Redis', 'category' => 'Tools & Platforms', 'sort_order' => 0])
            ->assertRedirect();
        $this->assertDatabaseHas('skills', ['name' => 'Redis']);

        $skill = Skill::where('name', 'Redis')->first();
        $this->actingAs($user)->delete("/admin/skills/{$skill->id}")->assertRedirect();
        $this->assertDatabaseMissing('skills', ['name' => 'Redis']);

        $message = Message::create(['name' => 'A', 'email' => 'a@b.c', 'body' => 'Hi']);
        $this->actingAs($user)->patch("/admin/messages/{$message->id}/toggle-read")->assertRedirect();
        $this->assertTrue($message->fresh()->is_read);
    }

    public function test_admin_can_create_blog_post_with_auto_slug(): void
    {
        $user = User::factory()->create();

        $this->actingAs($user)->post('/admin/blogs', [
            'title' => 'My First Post',
            'content' => 'Hello world',
            'is_published' => true,
        ])->assertRedirect('/admin/blogs');

        $this->assertDatabaseHas('blogs', ['slug' => 'my-first-post', 'is_published' => true]);
    }
}
