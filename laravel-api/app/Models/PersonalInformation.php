<?php

namespace App\Models;

use Database\Factories\PersonalInformationFactory;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Notifications\Notifiable;

class PersonalInformation extends Model
{
    /** @use HasFactory<PersonalInformationFactory> */
    use HasFactory, Notifiable;

    protected $table = "personal_informations";

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'user_id',
        'country',
        'birth_date',
        'about',
        'contact_type',
        'contact',
    ];

    protected $keyType = 'string';
    public $incrementing = false;

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    protected static function newFactory()
    {
        return PersonalInformationFactory::new();
    }
}
