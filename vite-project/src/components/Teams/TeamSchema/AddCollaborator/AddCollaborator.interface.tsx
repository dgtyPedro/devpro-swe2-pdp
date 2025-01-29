export interface AddCollaboratorProps {
    openCollaboratorOptions: boolean,
    setOpenCollaboratorOptions: (state: boolean) => void,
    depth: string,
    editDepth: string | undefined | null,
    setEditDepth: (depth: string) => void
}

