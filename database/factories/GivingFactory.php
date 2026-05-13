<?php
namespace Database\Factories;

use App\Models\Giving;
use Illuminate\Database\Eloquent\Factories\Factory;

class GivingFactory extends Factory
{
    protected $model = Giving::class;

    public function definition(): array
    {
        return [
            'reference' => 'T' . $this->faker->unique()->numberBetween(100000, 999999),
            'email' => $this->faker->safeEmail(),
            'amount' => $this->faker->randomFloat(2, 1000, 50000),
            'givingType' => $this->faker->randomElement(['tithe', 'offering', 'benevolent']),
            'name' => $this->faker->name(),
            'phone' => $this->faker->phoneNumber(),
            'status' => $this->faker->randomElement(['success', 'failed', 'pending']),
            'paidAt' => $this->faker->dateTimeBetween('-3 months', 'now'),
        ];
    }
}
