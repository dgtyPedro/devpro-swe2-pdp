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
import {AssociateIconComponent} from "../../common/components";

export const CollaboratorsComponent = () => {
    const {data} = useGetCollaboratorsQuery()
    const [createCollaborator] = useCreateCollaboratorMutation();
    const [deleteCollaborator] = useDeleteCollaboratorMutation();
    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

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
                                <RemoveCircleIcon sx={{zoom: "60%", cursor: "pointer"}} color={"error"}
                                                  onClick={() => deleteCollaborator(user.id)}/>
                            </RemoveNotch>
                            <AssociateIconComponent hasShadow={false} name={user.name} size={"big"} />
                            {user.name}
                        </Collaborator>
                    )
                })}
            </CollaboratorsGrid>
            <FormComponent open={openForm}
                           handleClose={handleCloseForm}
                           handleSubmit={handleSubmit}
                           title={"Create Collaborator"}
                           fields={fields}/>
        </>
    )
}

