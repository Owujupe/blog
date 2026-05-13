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
        Schema::create('site_settings', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('churchName', 255)->default('Guiding Light Assembly Abuja');
            $table->string('tagline', 255)->default('Building Leaders. Changing the World');
            $table->string('address', 500)->default('123 Faith Avenue, Wuse 2, Abuja, Nigeria');
            $table->string('phone', 50)->default('+234 800 123 4567');
            $table->string('email', 255)->default('info@guidinglightassembly.org');
            $table->string('serviceDay', 50)->default('Sunday');
            $table->string('serviceTime', 50)->default('9:00 AM');
            $table->text('aboutShort')->nullable();
            // ->default('Welcome to Guiding Light Assembly - a place where faith meets purpose.');
            $table->text('vision')->nullable();
            // ->default('To raise a generation of leaders who will transform their world through the power of God\'s Word.');
            $table->text('mission')->nullable();
            // ->default('To build leaders through the teaching of God\'s Word, fellowship, and community service.');
            $table->string('facebookUrl', 500)->nullable();
            $table->string('instagramUrl', 500)->nullable();
            $table->string('twitterUrl', 500)->nullable();
            $table->string('youtubeUrl', 500)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('site_settings');
    }
};
