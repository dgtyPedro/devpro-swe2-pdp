import {useCreateCollaboratorMutation, useGetCollaboratorsQuery} from "../../services/collaborator.ts";
import {Collaborator, CollaboratorsGrid} from "./Collaborators.styles.tsx";
import {AssociateIcon} from "../../common/styles";
import {useState} from "react";
import {FormComponent} from "../Form";
import {User} from "../../services/types/User.ts";

export const CollaboratorsComponent = () => {
    const {data} = useGetCollaboratorsQuery()
    const [createCollaborator] = useCreateCollaboratorMutation();
    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

    const fields = {
        name: "text",
        email: "email"
    }

    const handleSubmit = async (fields: unknown) => {
        await createCollaborator(fields as Partial<User>);
    }

    return (
        <>
            <a onClick={handleOpenForm}>Add Collaborator</a>

            <CollaboratorsGrid>
                {data?.map(user => {
                    return (
                        <Collaborator>
                            <AssociateIcon style={{zoom: "200%", boxShadow: "unset"}}>
                                {user.name.slice(0, 2)}
                            </AssociateIcon>
                            {user.name}
                        </Collaborator>
                    )
                })}
            </CollaboratorsGrid>
            <FormComponent open={openForm}
                           handleClose={handleCloseForm}
                           handleSubmit={handleSubmit}
                           fields={fields}  />
        </>
    )
}

