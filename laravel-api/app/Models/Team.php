<?php

namespace App\Models;

use Database\Factories\TeamFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Notifications\Notifiable;
use Illuminate\Support\Facades\DB;

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
        'id',
        'name',
        'owner_id',
        'project_id'
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

    public static function syncSchema(Team $team): void
    {
        DB::statement("
        WITH RECURSIVE cte AS (
            -- Seleciona os líderes inválidos (não estão no time e não são o owner)
            SELECT team_id, user_id, led_by
            FROM team_user
            WHERE team_id = :teamId
              AND led_by IS NOT NULL
              AND led_by NOT IN (
                  SELECT user_id
                  FROM team_user
                  WHERE team_id = :teamId
              )
              AND led_by != :ownerId

            UNION ALL

            -- Busca os usuários liderados por esses líderes
            SELECT u.team_id, u.user_id, u.led_by
            FROM team_user u
            INNER JOIN cte ON u.led_by = cte.user_id
            WHERE u.team_id = :teamId
        )
        DELETE FROM team_user
        WHERE (team_id, user_id) IN (
            SELECT team_id, user_id FROM cte
        )
    ", [
            'teamId' => $team->id,
            'ownerId' => $team->owner_id,
        ]);
    }


    protected static function newFactory()
    {
        return TeamFactory::new();
    }
}
