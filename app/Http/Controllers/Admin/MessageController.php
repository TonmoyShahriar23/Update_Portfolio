<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Message;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class MessageController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Admin/Messages', [
            'messages' => Message::orderByDesc('created_at')->paginate(15),
        ]);
    }

    public function toggleRead(Message $message): RedirectResponse
    {
        $message->update(['is_read' => ! $message->is_read]);

        return back();
    }

    public function destroy(Message $message): RedirectResponse
    {
        $message->delete();

        return back()->with('success', 'Message deleted.');
    }
}
