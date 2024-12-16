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
        Schema::create('permissions', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->foreignUuid('role_id')->constrained();
            $table->boolean('create-teams')->default(false);
            $table->boolean('create-users')->default(false);
            $table->boolean('read-teams')->default(false);
            $table->boolean('read-users')->default(false);
            $table->boolean('update-teams')->default(false);
            $table->boolean('update-users')->default(false);
            $table->boolean('update-permissions')->default(false);
            $table->boolean('update-roles')->default(false);
            $table->boolean('delete-teams')->default(false);
            $table->boolean('delete-users')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('permissions');
    }
};
