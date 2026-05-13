<?php
namespace Database\Factories;

use App\Models\Sermon;
use Illuminate\Database\Eloquent\Factories\Factory;

class SermonFactory extends Factory
{
    protected $model = Sermon::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'speaker' => $this->faker->name(),
            'series' => $this->faker->words(3, true),
            'description' => $this->faker->paragraph(),
            'videoUrl' => 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
            'thumbnail' => 'https://picsum.photos/400/300?random=' . $this->faker->unique()->numberBetween(1001, 2000),
            'sermonDate' => $this->faker->dateTimeBetween('-1 year', 'now')->format('Y-m-d'),
        ];
    }
}
