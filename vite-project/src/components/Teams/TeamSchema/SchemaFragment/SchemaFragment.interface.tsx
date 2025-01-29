import {Associate} from "../../../../services/types/Team.ts";

export interface SchemaFragmentProps {
    associate: Associate;
    edit: boolean;
    depth: string;
    editDepth: string | undefined | null
    setEditDepth: (depth: string) => void
    openCollaboratorOptions: boolean,
    setOpenCollaboratorOptions: (state: boolean) => void,
    removeCollaborator: (collaboratorId: string) => void,
}

