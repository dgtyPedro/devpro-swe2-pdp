<?php

namespace App\Models;

use Database\Factories\TeamFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Notifications\Notifiable;

class Team extends Model
{
    /** @use HasFactory<TeamFactory> */
    use HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'name',
        'owner_id',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function owner(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function associates(): BelongsToMany
    {
        return $this->belongsToMany(
            User::class, 'team_user', 'team_id', 'user_id'
        );
    }

    protected static function newFactory()
    {
        return TeamFactory::new();
    }
}
