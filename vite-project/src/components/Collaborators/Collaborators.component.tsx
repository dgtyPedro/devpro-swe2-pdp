import {
    useCreateCollaboratorMutation,
    useDeleteCollaboratorMutation,
    useGetCollaboratorsQuery
} from "../../services/collaborator.ts";
import {Collaborator, CollaboratorsGrid} from "./Collaborators.styles.tsx";
import {ActionBar, RemoveNotch} from "../../common/styles";
import {useState} from "react";
import {FormComponent} from "../Form";
import {User} from "../../services/types/User.ts";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import {AssociateIconComponent} from "../../common/components/AssociateIcon";
import {DispatchDialogComponent} from "../../common/components/DispatchDialog";
import {useSmallName} from "../../common/hooks/UseSmallName.tsx";

export const CollaboratorsComponent = () => {
    const {data} = useGetCollaboratorsQuery()
    const [createCollaborator] = useCreateCollaboratorMutation();
    const [deleteCollaborator] = useDeleteCollaboratorMutation();
    const [openForm, setOpenForm] = useState(false);
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const [selectedUserId, setSelectedUserId] = useState<string>()
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);
    const handleOpenDeleteDialog = (id: string) => {
        setOpenDeleteDialog(true);
        setSelectedUserId(id)
    }
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

    const fields = {
        name: {
            type: "text"
        },
        email: {
            type: "email",
        }
    }

    const handleSubmit = async (fields: unknown) => {
        await createCollaborator(fields as Partial<User>);
        handleCloseForm();
    }

    const handleDelete = async () => {
        if(selectedUserId) await deleteCollaborator(selectedUserId);
        handleCloseDeleteDialog();
    }

    return (
        <>
            <h1>Collaborators</h1>
            <ActionBar>
                <a onClick={handleOpenForm}>Add Collaborator</a>
            </ActionBar>
            <CollaboratorsGrid>
                {data?.map(user => {
                    return (
                        <Collaborator>
                            <RemoveNotch>
                                <RemoveCircleIcon color={"error"}
                                                  onClick={() => handleOpenDeleteDialog(user.id)}/>
                            </RemoveNotch>
                            <AssociateIconComponent hasShadow name={user.name} size={"big"}/>
                            {useSmallName(user.name)}
                        </Collaborator>
                    )
                })}
            </CollaboratorsGrid>
            <FormComponent open={openForm}
                           handleClose={handleCloseForm}
                           handleSubmit={handleSubmit}
                           title={"Create Collaborator"}
                           fields={fields}/>
            <DispatchDialogComponent open={openDeleteDialog} handleClose={handleCloseDeleteDialog}
                                     dispatch={handleDelete}/>
        </>
    )
}

