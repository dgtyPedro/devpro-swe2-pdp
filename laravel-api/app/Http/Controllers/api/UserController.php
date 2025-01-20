<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Http\Request;
use function PHPUnit\Framework\throwException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::with('teams', 'leads')->orderByDesc('created_at')->get();

        return $users;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $valitaded = $request->validate([
            'name' => 'required|max:255',
            'email' => 'required|unique:users|email|max:255',
        ]);

        $user = User::create([
                'id' => uuid_create(),
                'password' => uuid_create(),
                'name' => $request['name'],
                'email' => $request['email'],
                'onboarding' => true,
                'role_id' => Role::first()->id
            ]
        );

        return $user;
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     * @throws BindingResolutionException
     */
    public function destroy(string $id)
    {
        $user = User::findOrFail($id)->load('teams');
        if ($user->owns()->count() > 0) {
            return response()->make("Collaborator is the owner of projects. Replace the ownership before deleting it.", 500);
        }

        if ($user->leads()->count() > 0) {
            return response()->make("Collaborator is the leader of a team. Replace the leadership before deleting it.", 500);
        }

        foreach ($user->teams as $team) {
            $team->detach();
            Team::syncSchema($team);
        }

        $user->delete();
        return response()->make([], 204);
    }
}
