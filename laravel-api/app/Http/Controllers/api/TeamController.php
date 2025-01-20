<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::with('owner', 'associates')->orderByDesc('created_at')->get();

        foreach ($teams as $team) {
            $team->associates = $this->cascadeLoadAssociates($team, $team->owner->id);
        }

        return $teams;
    }


    private function cascadeLoadAssociates($team, $leaderId)
    {
        $associates = $team->associates()->where('led_by', $leaderId)->get();

        foreach ($associates as $associate) {
            $associate->associates = $this->cascadeLoadAssociates($team, $associate->id);
        }

        return $associates;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|max:255|unique:teams',
            'owner_id' => 'required|exists:users,id',
            'project_id' => 'required|exists:projects,id',
        ]);

        $project = Team::create([
            'id' => uuid_create(),
            'name' => $request['name'],
            'owner_id' => $request['owner_id'],
            'project_id' => $request['project_id'],
        ]);

        return response()->json($project, 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $team = Team::find($id)->load('owner', 'associates');
        $team->schema = $this->cascadeLoadAssociates($team, $team->owner->id);

        return $team;
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
     */
    public function destroy(string $id)
    {
        DB::transaction(function () use ($id) {
            $team = Team::findOrFail($id);
            $team->associates()->detach();
            $team->delete();
        });
        return response()->make([], 204);
    }

    public function attachCollaborator(Request $request, string $id)
    {
        $validated = $request->validate([
            'led_by' => 'required|exists:users,id',
            'user_id' => 'required|exists:users,id',
        ]);

        $team = Team::find($id)->associates()->attach($validated['user_id'], ['led_by' => $validated['led_by']]);

        return $team;
    }

    public function detachCollaborator(Request $request, string $id)
    {
        $validated = $request->validate([
            'user_id' => 'required|exists:users,id',
        ]);

        $team = DB::transaction(function () use ($id, $validated) {
            $team = Team::find($id);
            $team->associates()->detach($validated['user_id']);

            Team::syncSchema($team);

            return $team;
        });

        return $team;
    }
}
