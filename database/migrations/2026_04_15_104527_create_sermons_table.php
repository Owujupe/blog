<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('sermons', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->string('speaker');
            $table->string('series')->nullable();
            $table->text('description')->nullable();
            $table->string('videoUrl', 500);
            $table->string('thumbnail', 500)->nullable();
            $table->date('sermonDate');
            $table->string('slug')->unique();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('sermons');
    }
};
