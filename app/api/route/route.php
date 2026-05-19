<?php
use think\facade\Route;

// API v1
Route::get('v1/article/index', 'v1.Article/index');
Route::get('v1/article/detail/:id', 'v1.Article/detail');

Route::get('v1/notification/index', 'v1.Notification/index');
Route::get('v1/notification/unread', 'v1.Notification/unread');
Route::post('v1/notification/read/:id', 'v1.Notification/read');
Route::post('v1/notification/readall', 'v1.Notification/readAll');
Route::delete('v1/notification/delete/:id', 'v1.Notification/delete');

Route::post('v1/auth/login', 'v1.Auth/login');
Route::get('v1/auth/profile', 'v1.Auth/profile');
