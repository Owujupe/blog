<?php
namespace Database\Factories;

use App\Models\Gallery;
use Illuminate\Database\Eloquent\Factories\Factory;

class GalleryFactory extends Factory
{
    protected $model = Gallery::class;

    public function definition(): array
    {
        return [
            'imagePath' => 'https://picsum.photos/800/800?random=' . $this->faker->unique()->numberBetween(3001, 4000),
            'caption' => $this->faker->sentence(),
            'category' => $this->faker->randomElement(['worship', 'conferences', 'community', 'general']),
        ];
    }
}
