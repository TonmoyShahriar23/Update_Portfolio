<?php

use Cloudinary\Api\Exception\ApiError;
use Cloudinary\Exception\ConfigurationException;
use Illuminate\Foundation\Application;
use Illuminate\Foundation\Configuration\Exceptions;
use Illuminate\Foundation\Configuration\Middleware;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

return Application::configure(basePath: dirname(__DIR__))
    ->withRouting(
        web: __DIR__.'/../routes/web.php',
        commands: __DIR__.'/../routes/console.php',
        health: '/up',
    )
    ->withMiddleware(function (Middleware $middleware) {
        $middleware->web(append: [
            \App\Http\Middleware\HandleInertiaRequests::class,
        ]);

        $middleware->redirectGuestsTo('/admin/login');
        $middleware->redirectUsersTo('/admin');
    })
    ->withExceptions(function (Exceptions $exceptions) {
        // Surface Cloudinary upload failures as a form error instead of a 500,
        // so admin modals show what went wrong next to the image field.
        $exceptions->render(function (ApiError $e, Request $request) {
            if ($request->hasSession()) {
                Log::error('Cloudinary upload failed: '.$e->getMessage());

                return back()->withErrors([
                    'image' => 'Image upload failed: '.$e->getMessage(),
                ])->withInput($request->except(['image']));
            }
        });

        $exceptions->render(function (ConfigurationException $e, Request $request) {
            if ($request->hasSession()) {
                Log::error('Cloudinary misconfigured: '.$e->getMessage());

                return back()->withErrors([
                    'image' => 'Image upload failed: Cloudinary is not configured correctly (check CLOUDINARY_URL in .env).',
                ])->withInput($request->except(['image']));
            }
        });
    })->create();
