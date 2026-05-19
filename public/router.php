<?php
// PHP built-in server router for ThinkPHP + Admin SPA

$uri = $_SERVER['REQUEST_URI'];
$path = parse_url($uri, PHP_URL_PATH);

// Serve existing static files (JS, CSS, images, etc.)
$file = __DIR__ . $path;
if (is_file($file)) {
    return false;
}

// SPA: serve admin/index.html only for /admin or /admin/
// Hash routing handles all sub-paths client-side
if (($path === '/admin' || $path === '/admin/') && $_SERVER['REQUEST_METHOD'] === 'GET') {
    $spaIndex = __DIR__ . '/admin/index.html';
    if (is_file($spaIndex)) {
        readfile($spaIndex);
        return true;
    }
}

// Fix PHP built-in server: when admin/index.html exists, the server
// sets SCRIPT_NAME=/admin/index.html and PATH_INFO incorrectly.
// Reset both so ThinkPHP receives the full path for routing.
$_SERVER['SCRIPT_NAME'] = '/index.php';
$_SERVER['PATH_INFO'] = $path;
$_SERVER['SCRIPT_FILENAME'] = __DIR__ . '/index.php';
require __DIR__ . '/index.php';
