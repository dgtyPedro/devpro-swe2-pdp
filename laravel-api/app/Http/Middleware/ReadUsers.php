<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Symfony\Component\HttpFoundation\Response;

class ReadUsers
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $permissions = Auth::user()->load('role.permission')->role->permission;
        if (!str_contains($request->url(), Auth::user()->id) && !$permissions["read-users"]) return response()->json(['error' => 'Forbidden'], 403);
        return $next($request);
    }
}
