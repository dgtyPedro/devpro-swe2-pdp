<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Permission extends Model
{
    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'role_id',
        'create-teams',
        'create-users',
        'read-teams',
        'read-users',
        'update-teams',
        'update-users',
        'update-permissions',
        'update-roles',
        'delete-teams',
        'delete-users',
    ];
}
