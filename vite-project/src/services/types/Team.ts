import {User} from "./User.ts";

export interface Team {
    id: string;
    name: string;
    associates: User[];
    owner: User;
    project_id: string;
    owner_id: string;
    created_at: string;
    updated_at: string;
    schema?: Associate[]
}

export interface Associate extends User{
    associates: Associate[];
}