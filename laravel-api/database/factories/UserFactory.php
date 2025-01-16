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

    const ROLES = [
        "ADMIN" => [
            'create-teams' => true,
            'create-users' => true,
            'read-teams' => true,
            'read-users' => true,
            'update-teams' => true,
            'update-users' => true,
            'update-permissions' => true,
            'update-roles' => true,
            'delete-teams' => true,
            'delete-users' => true
        ],
        "COLLABORATOR" => [
            'create-teams' => false,
            'create-users' => false,
            'read-teams' => true,
            'read-users' => true,
            'update-teams' => false,
            'update-users' => false,
            'update-permissions' => false,
            'update-roles' => false,
            'delete-teams' => false,
            'delete-users' => false
        ],
        "MANAGER" => [
            'create-teams' => true,
            'create-users' => false,
            'read-teams' => true,
            'read-users' => true,
            'update-teams' => true,
            'update-users' => false,
            'update-permissions' => false,
            'update-roles' => false,
            'delete-teams' => true,
            'delete-users' => false
        ],
        "HR" => [
            'create-teams' => false,
            'create-users' => true,
            'read-teams' => true,
            'read-users' => true,
            'update-teams' => false,
            'update-users' => true,
            'update-permissions' => false,
            'update-roles' => false,
            'delete-teams' => false,
            'delete-users' => true
        ],
        "ONBOARDING" => [
            'create-teams' => false,
            'create-users' => false,
            'read-teams' => false,
            'read-users' => false,
            'update-teams' => false,
            'update-users' => false,
            'update-permissions' => false,
            'update-roles' => false,
            'delete-teams' => false,
            'delete-users' => false
        ],
    ];

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {

        $roles = Role::all();
        if ($roles->count() === 0) {
            $roles = ['ADMIN', 'COLLABORATOR', 'MANAGER', 'HR', 'ONBOARDING'];
            foreach ($roles as $role) {
                $newRole = Role::create([
                    'id' => uuid_create(),
                    'name' => $role
                ]);

                Permission::insert([
                    'id' => uuid_create(),
                    'role_id' => $newRole->id,
                    ...self::ROLES[$role]
                ]);
            }
        }

        $role = Role::inRandomOrder()->first();

        return [
            'id' => uuid_create(),
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'role_id' => $role->id,
            'password' => static::$password ??= Hash::make('password'),
        ];
    }
}
