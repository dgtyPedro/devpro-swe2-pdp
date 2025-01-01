import {User} from "./User.ts";
import {Team} from "./Team.ts";

export interface Project{
    id: string;
    name: string;
    owner: User;
    teams: Team[];
    owner_id: string;
    created_at: string;
    updated_at: string;
}
