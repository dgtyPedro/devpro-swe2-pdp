<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\PersonalInformation>
 */
class PersonalInformationFactory extends Factory
{
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $user = User::with("personalInformation")
            ->has("personalInformation", "=", 0)
            ->inRandomOrder()
            ->first();

        if(!$user) return [];
        return [
            'id' => uuid_create(),
            'user_id' => $user->id,
            'country' => $this->faker->countryCode(),
            'birth_date' => $this->faker->dateTimeBetween('-50 years', '-18 years'),
            'about' => $this->faker->paragraph(),
            'contact_type' => $this->faker->randomElement(['email', 'instagram', 'facebook', 'discord', 'x']),
            'contact' => $this->faker->randomElement([$this->faker->phoneNumber(), $this->faker->userName()])
        ];
    }
}
