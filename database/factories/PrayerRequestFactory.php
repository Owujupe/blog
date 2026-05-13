<?php
namespace Database\Factories;

use App\Models\PrayerRequest;
use Illuminate\Database\Eloquent\Factories\Factory;

class PrayerRequestFactory extends Factory
{
    protected $model = PrayerRequest::class;

    public function definition(): array
    {
        return [
            'name' => $this->faker->name(),
            'email' => $this->faker->safeEmail(),
            'request' => $this->faker->paragraph(),
            'isRead' => $this->faker->boolean(),
        ];
    }
}
