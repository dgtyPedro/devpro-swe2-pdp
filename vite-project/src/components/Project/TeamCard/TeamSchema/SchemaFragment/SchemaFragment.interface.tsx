import {Associate} from "../../../../../services/types/Team.ts";

export interface SchemaFragmentProps {
    associate: Associate;
    edit: boolean;
    depth: number;
    setEditDepth: (depth: number) => void
    setOpenCollaboratorOptions: (state: boolean) => void,
}

