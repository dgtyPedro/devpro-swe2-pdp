import {Team} from "./Team.ts";
import {Project} from "./Project.ts";

export interface User {
    id: string;
    email: string;
    name: string;
    role_id: string;
    created_at: string;
    updated_at: string;
    leads: Team[];
    owns: Project[];
    teams: Team[];
}


export interface AuthUser extends Partial<User> {
    password: string
}

export interface SignUpUser extends Partial<AuthUser> {
    password: string,
    password_confirmation: string,
}

export interface JWTUser {
    user: Partial<User>,
    token: string
}