<?php

use App\Http\Controllers\api\UserController;
use App\Http\Controllers\api\ProjectController;
use App\Http\Controllers\api\TeamController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('teams', TeamController::class);
Route::apiResource('collaborators', UserController::class);
Route::apiResource('projects', ProjectController::class);
