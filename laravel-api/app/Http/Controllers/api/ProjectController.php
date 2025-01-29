<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Project;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class ProjectController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $projects = Project::with('owner', 'teams.associates', 'teams.owner')->orderByDesc('created_at')->get();

        return $projects;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255|unique:projects',
            'owner_id' => 'required|exists:users,id',
        ]);

        $project = Project::create([
            'id' => uuid_create(),
            'name' => $request['name'],
            'owner_id' => $request['owner_id'],
        ]);

        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $project = Project::find($id)->load('owner', 'teams.associates', 'teams.owner');

        return response()->json($project);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        $project = Project::findOrFail($id);

        if (!$project) {
            return response()->json(['message' => 'Project not found'], 404);
        }

        $validator = Validator::make($request->all(), [
            'owner_id' => 'exists:users,id'
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $project->owner_id = $request->input('owner_id');
        $project->save();

        return response()->json([
            'message' => 'Project updated successfully',
            'user' => $project,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        DB::transaction(function () use ($id) {
            $project = Project::findOrFail($id);
            $teams = $project->teams;
            foreach ($teams as $team) {
                $team->associates()->detach();
                $team->delete();
            }
            $project->delete();
        });

        return response()->make([], 204);
    }
}
