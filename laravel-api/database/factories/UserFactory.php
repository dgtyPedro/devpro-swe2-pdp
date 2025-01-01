<?php

namespace Database\Factories;

use App\Models\Permission;
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
        $role = Role::inRandomOrder()->first();
        if(!$role) {
            $role = Role::create([
                'id' => fake()->uuid(),
                'name' => 'admin',
                'description' => 'admin',
            ]);

            Permission::create([
                'id' => fake()->uuid(),
                'role_id' => $role->id,
                'create-teams' => true,
                'create-users' => true,
                'read-teams' => true,
                'read-users' => true,
                'update-teams' => true,
                'update-users' => true,
                'update-permissions' => true,
                'update-roles' => true,
                'delete-teams' => true,
                'delete-users' => true,
            ]);
        }

        return [
            'id' => uuid_create(),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'role_id' => $role->id,
            'password' => static::$password ??= Hash::make('password'),
        ];
    }
}
