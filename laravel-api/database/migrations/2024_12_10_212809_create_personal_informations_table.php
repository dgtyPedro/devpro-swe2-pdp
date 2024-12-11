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
        Schema::create('personal_informations', function (Blueprint $table) {
            $table->uuid();
            $table->foreignUuid('user_id')->constrained();
            $table->string("country", 3)->nullable();
            $table->date("birth_date")->nullable();
            $table->text("about")->nullable();
            $table->enum("contact_type", ["email", "instagram", "facebook", "discord", "x"])->nullable();
            $table->string("contact")->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('personal_informations');
    }
};
