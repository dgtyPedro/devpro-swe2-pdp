<?php

use App\Http\Controllers\api\ProjectController;
use App\Http\Controllers\api\TeamController;
use App\Http\Controllers\api\UserController;
use App\Http\Middleware\CreateTeams;
use App\Http\Middleware\CreateUsers;
use App\Http\Middleware\DeleteTeams;
use App\Http\Middleware\DeleteUsers;
use App\Http\Middleware\JwtMiddleware;
use App\Http\Middleware\ReadTeams;
use App\Http\Middleware\ReadUsers;
use App\Http\Middleware\UpdateTeams;
use App\Http\Middleware\UpdateUsers;
use App\Models\Role;
use Illuminate\Support\Facades\Route;

Route::middleware([JwtMiddleware::class])->group(function () {
    Route::prefix('teams')->group(function () {
        Route::middleware(ReadTeams::class)->group(function () {
            Route::get('/', [TeamController::class, 'index']);
            Route::get('/{team}', [TeamController::class, 'show']);
        });
        Route::middleware(UpdateTeams::class)->group(function () {
            Route::put('/{team}', [TeamController::class, 'update']);
            Route::put('/{id}/attachCollaborator', [TeamController::class, 'attachCollaborator']);
            Route::put('/{id}/detachCollaborator', [TeamController::class, 'detachCollaborator']);
        });
        Route::post('/', [TeamController::class, 'store'])->middleware(CreateTeams::class);
        Route::delete('/{team}', [TeamController::class, 'destroy'])->middleware(DeleteTeams::class);
    });

    Route::prefix('collaborators')->group(function () {
        Route::middleware(ReadUsers::class)->group(function () {
            Route::get('/', [UserController::class, 'index']);
            Route::get('/{user}', [UserController::class, 'show']);
        });
        Route::post('/', [UserController::class, 'store'])->middleware(CreateUsers::class);
        Route::put('/{user}', [UserController::class, 'update'])->middleware(UpdateUsers::class);
        Route::delete('/{user}', [UserController::class, 'destroy'])->middleware(DeleteUsers::class);
    });

    Route::prefix('projects')->group(function () {
        Route::middleware(ReadTeams::class)->group(function () {
            Route::get('/', [ProjectController::class, 'index']);
            Route::get('/{project}', [ProjectController::class, 'show']);
        });
        Route::post('/', [ProjectController::class, 'store'])->middleware(CreateTeams::class);
        Route::put('/{project}', [ProjectController::class, 'update'])->middleware(UpdateTeams::class);
        Route::delete('/{project}', [ProjectController::class, 'destroy'])->middleware(DeleteTeams::class);
    });
});


Route::post('signup', [UserController::class, 'signUp']);
Route::post('auth', [UserController::class, 'signIn']);
Route::post('logout', [UserController::class, 'logout']);
Route::post('refresh-token', [UserController::class, 'refreshToken']);

Route::get('/roles', function () {
    return Role::with('permission')->get();
});
