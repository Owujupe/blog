<?php
namespace Database\Factories;

use App\Models\Event;
use Illuminate\Database\Eloquent\Factories\Factory;

class EventFactory extends Factory
{
    protected $model = Event::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'description' => $this->faker->paragraph(),
            'eventDate' => $this->faker->dateTimeBetween('now', '+6 months')->format('Y-m-d'),
            'eventTime' => $this->faker->time('H:i'),
            'location' => $this->faker->address(),
            'banner' => 'https://picsum.photos/1200/600?random=' . $this->faker->unique()->numberBetween(2001, 3000),
        ];
    }
}
