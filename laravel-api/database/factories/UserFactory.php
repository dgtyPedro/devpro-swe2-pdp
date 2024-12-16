<?php

namespace Database\Factories;

use App\Models\Position;
use App\Models\Role;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'id' => uuid_create(),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'position_id' => Position::all()->random()->value("id"),
            'role_id' => Role::all()->random()->value("id"),
            'password' => static::$password ??= Hash::make('password'),
        ];
    }
}
