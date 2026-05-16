<?php
use think\facade\Route;

// Auth
Route::post('auth/login', 'Auth/login');
Route::get('auth/info', 'Auth/info');
Route::get('auth/permissions', 'Auth/permissions');
Route::post('auth/logout', 'Auth/logout');

// Role
Route::get('role/index', 'Role/index');
Route::post('role/save', 'Role/save');
Route::put('role/update', 'Role/update');
Route::delete('role/delete/:id', 'Role/delete');

// Menu
Route::get('menu/index', 'Menu/index');
Route::post('menu/save', 'Menu/save');
Route::put('menu/update', 'Menu/update');
Route::delete('menu/delete/:id', 'Menu/delete');

// Admin
Route::get('admin/index', 'Admin/index');
Route::post('admin/save', 'Admin/save');
Route::put('admin/update', 'Admin/update');
Route::delete('admin/delete/:id', 'Admin/delete');

// User
Route::get('user/index', 'User/index');
Route::post('user/save', 'User/save');
Route::put('user/update', 'User/update');
Route::delete('user/delete/:id', 'User/delete');

// Config
Route::get('config/index', 'Config/index');
Route::post('config/save', 'Config/save');
Route::put('config/update', 'Config/update');
Route::delete('config/delete/:id', 'Config/delete');

// Attachment
Route::get('attachment/index', 'Attachment/index');
Route::delete('attachment/delete/:id', 'Attachment/delete');

// Recycle
Route::get('recycle/index', 'Recycle/index');
Route::post('recycle/restore/:id', 'Recycle/restore');
Route::delete('recycle/delete/:id', 'Recycle/delete');

// Dashboard
Route::get('dashboard/index', 'Dashboard/index');

// DataScreen
Route::get('datascreen/index', 'DataScreen/index');

// Generator
Route::get('generator/index', 'Generator/index');
Route::get('generator/fields', 'Generator/fields');
Route::get('generator/preview', 'Generator/preview');
Route::post('generator/generate', 'Generator/generate');

// AI
Route::get('ai/config', 'Ai/config');
Route::post('ai/chat', 'Ai/chat');
Route::post('ai/activate', 'Ai/activate');
Route::post('ai/setupprovider', 'Ai/setupProvider');
Route::post('ai/genlicense', 'Ai/genLicense');
Route::post('ai/savefile', 'Ai/savefile');
Route::get('ai/listfiles', 'Ai/listfiles');

// Terminal
Route::post('terminal/execute', 'Terminal/execute');

// Module
Route::get('module/index', 'Module/index');
Route::get('module/scanaisc', 'Module/scanAisc');
Route::post('module/install', 'Module/install');
Route::post('module/installfromaisc', 'Module/installFromAisc');
Route::post('module/uninstall', 'Module/uninstall');
Route::post('module/enable', 'Module/enable');
Route::post('module/disable', 'Module/disable');

// Workflow
Route::get('workflow/index', 'Workflow/index');
Route::post('workflow/save', 'Workflow/save');
Route::put('workflow/update', 'Workflow/update');
Route::delete('workflow/delete/:id', 'Workflow/delete');
Route::get('workflow/detail/:id', 'Workflow/detail');

// WorkflowInstance
Route::get('workflow/instance/todo', 'WorkflowInstance/todo');
Route::get('workflow/instance/mine', 'WorkflowInstance/mine');
Route::get('workflow/instance/done', 'WorkflowInstance/done');
Route::post('workflow/instance/start', 'WorkflowInstance/start');
Route::get('workflow/instance/detail/:id', 'WorkflowInstance/detail');
Route::post('workflow/instance/agree', 'WorkflowInstance/agree');
Route::post('workflow/instance/reject', 'WorkflowInstance/reject');
Route::post('workflow/instance/transfer', 'WorkflowInstance/transfer');
Route::post('workflow/instance/addsigner', 'WorkflowInstance/addsigner');

// CMS Category
Route::get('cms/category/index', 'CmsCategory/index');
Route::get('cms/category/tree', 'CmsCategory/tree');
Route::post('cms/category/save', 'CmsCategory/save');
Route::put('cms/category/update', 'CmsCategory/update');
Route::delete('cms/category/delete/:id', 'CmsCategory/delete');

// CMS Article
Route::get('cms/article/index', 'CmsArticle/index');
Route::post('cms/article/save', 'CmsArticle/save');
Route::put('cms/article/update', 'CmsArticle/update');
Route::delete('cms/article/delete/:id', 'CmsArticle/delete');
Route::get('cms/article/detail/:id', 'CmsArticle/detail');

// Notification
Route::get('notification/index', 'Notification/index');
Route::get('notification/unread', 'Notification/unread');
Route::post('notification/read/:id', 'Notification/read');
Route::post('notification/readall', 'Notification/readAll');
Route::delete('notification/delete/:id', 'Notification/delete');
Route::post('notification/send', 'Notification/send');
