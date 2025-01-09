<?php

namespace Database\Factories;

use App\Models\Project;
use App\Models\Team;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Team>
 */
class TeamFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::inRandomOrder()->first();
        if(!$user) $user = User::factory()->create();

        $project = Project::inRandomOrder()->first();
        if(!$project) $project = Project::factory()->create();

        return [
            'id' => uuid_create(),
            "name" => $this->faker->jobTitle() . " Team",
            "owner_id" => $user->id,
            "project_id" => $project->id
        ];
    }

    /**
     * Configure the model factory.
     */
    public function configure(): static
    {
        return $this->afterCreating(function (Team $team) {
            if(User::all()->count() < 10) User::factory()->count(rand(10, 20))->create();
            $users = User::all()->where("id", "!=", $team->getAttributeValue('owner_id'))->random(rand(12, 24));

            $team->associates()->attach($users->pluck('id'), ["led_by" => $team->getAttributeValue('owner_id')]);
            $team->save();
        });
    }
}
