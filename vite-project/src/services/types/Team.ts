import {User} from "./User.ts";

export interface Team {
    name: string;
    associates: User[];
    owner: User;
    project_id: string;
    owner_id: string;
    created_at: string;
    updated_at: string;
}