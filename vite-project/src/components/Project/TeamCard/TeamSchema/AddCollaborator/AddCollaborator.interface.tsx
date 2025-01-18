export interface AddCollaboratorProps {
    openCollaboratorOptions: boolean,
    setOpenCollaboratorOptions: (state: boolean) => void,
    depth: string,
    editDepth: string | undefined,
    setEditDepth: (depth: string) => void
}

