<?php

use App\Http\Controllers\api\TeamController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return view('welcome');
});

Route::apiResource('teams', TeamController::class);
