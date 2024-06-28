<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends \Illuminate\Database\Eloquent\Factories\Factory<\App\Models\Products>
 */
class ProductFactory extends Factory
{
    // protected $model = Product::class;
    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'nombre' => $this->faker->sentence(1),
            'descripcion' => $this->faker->sentence(10),
            'stock' => $this->faker->numberBetween(10, 100),
            'precio' => $this->faker->randomFloat(2, 20, 100)
        ];
    }
}
