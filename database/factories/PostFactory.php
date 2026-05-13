<?php
namespace Database\Factories;

use App\Models\Post;
use Illuminate\Database\Eloquent\Factories\Factory;

class PostFactory extends Factory
{
    protected $model = Post::class;

    public function definition(): array
    {
        return [
            'title' => $this->faker->sentence(),
            'content' => $this->faker->paragraphs(5, true),
            'featuredImage' => 'https://picsum.photos/800/400?random=' . $this->faker->unique()->numberBetween(1, 1000),
            'status' => $this->faker->randomElement(['published', 'draft']),
        ];
    }
}
