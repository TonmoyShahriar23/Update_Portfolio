<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <title inertia>{{ config('app.name', 'Portfolio') }}</title>

    {{-- Dark theme is the default; light applies only if the viewer chose it. Runs before first paint to avoid a flash --}}
    <script>
        (function () {
            if (localStorage.getItem('theme') !== 'light') {
                document.documentElement.classList.add('dark');
            }
        })();
    </script>

    @fonts

    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
    @inertiaHead
</head>
<body class="antialiased">
    @inertia
</body>
</html>
