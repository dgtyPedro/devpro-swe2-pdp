<?php

namespace App\Http\Controllers\api;

use App\Http\Controllers\Controller;
use App\Models\Team;
use Illuminate\Http\Request;

class TeamController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $teams = Team::with('owner')->get();

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
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $team = Team::find($id)->load('owner');
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
        //
    }
}
