<?php

use App\Http\Controllers\api\ProjectController;
use App\Http\Controllers\api\TeamController;
use App\Http\Controllers\api\UserController;
use App\Models\Role;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

//Route::get('/user', function (Request $request) {
//    return $request->user();
//})->middleware('auth:sanctum');

Route::apiResource('teams', TeamController::class);
Route::apiResource('collaborators', UserController::class);
Route::apiResource('projects', ProjectController::class);

Route::put('/teams/{id}/attachCollaborator', [TeamController::class, 'attachCollaborator']);
Route::put('/teams/{id}/detachCollaborator', [TeamController::class, 'detachCollaborator']);

Route::post('signup', [UserController::class, 'signUp']);
Route::post('auth', [UserController::class, 'signIn']);
Route::post('refreshToken', [UserController::class, 'refreshToken']);

Route::get('/roles', function () {
    return Role::with('permission')->get();
});
