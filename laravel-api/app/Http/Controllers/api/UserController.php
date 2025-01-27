<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Team;
use App\Models\User;
use Illuminate\Contracts\Container\BindingResolutionException;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Symfony\Component\HttpFoundation\Response;
use Tymon\JWTAuth\Facades\JWTAuth;

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
        $user = User::findOrFail($id);
        $user->load('role.permission', 'teams', 'owns', 'leads');

        return $user;
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $user = User::findOrFail($id);

        if (!$user) {
            return response()->json(['message' => 'User not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'email' => 'email|unique:users,email,' . $user->id,
            'name' => 'string|max:255',
            'password' => 'nullable|string|min:8|confirmed',
            'role_id' => 'exists:roles,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        if ($request->input('email')) $user->email = $request->input('email');
        if ($request->input('name')) $user->name = $request->input('name');
        if ($request->input('role_id')) $user->role_id = $request->input('role_id');

        if ($request->filled('password')) {
            $user->password = Hash::make($request->input('password'));
        }

        $user->save();

        return response()->json([
            'message' => 'User updated successfully',
            'user' => $user,
        ]);
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

    public function signUp(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'name' => 'required|max:255',
            'email' => 'required|email|unique:users,email|max:255',
            'password' => 'required|min:8|confirmed', // password_confirmation
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        $role = Role::where("name", "ONBOARDING")->first();

        $user = User::create([
            'id' => uuid_create(),
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role_id' => $role->id,
        ]);

        $user->load('role.permission', 'teams', 'owns', 'leads');

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'message' => 'User successfully registered',
            'user' => $user,
            'token' => $token,
        ], Response::HTTP_CREATED);
    }

    public function signIn(Request $request)
    {
        $credentials = $request->only('email', 'password');

        $validator = Validator::make($credentials, [
            'email' => 'required|email',
            'password' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], Response::HTTP_UNPROCESSABLE_ENTITY);
        }

        if (!$token = JWTAuth::attempt($credentials)) {
            return response()->json(['message' => 'Invalid credentials'], Response::HTTP_UNAUTHORIZED);
        }

        $user = Auth::user();

        $user->load('role.permission', 'teams', 'owns', 'leads');

        return response()->json([
            'message' => 'User successfully logged in',
            'user' => $user,
            'token' => $token,
        ], Response::HTTP_OK);
    }


    public function refreshToken(): JsonResponse
    {
        try {
            $newToken = JWTAuth::parseToken()->refresh();
            return response()->json([
                'token' => $newToken
            ]);
        } catch (\Exception $e) {
            return response()->json(['error' => 'Invalid Token'], 401);
        }
    }
}
