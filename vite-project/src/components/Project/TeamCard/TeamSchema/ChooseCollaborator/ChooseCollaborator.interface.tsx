import {User} from "../../../../../services/types/User.ts";

export interface ChooseCollaboratorProps {
    collaborators: User[]
    handleAddCollaborator: (collaboratorId: string) => void
}

