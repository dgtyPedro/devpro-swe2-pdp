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
import {useNavigate} from "react-router";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {Stack} from "@mui/material";
import {useToast} from "../../common/hooks/Toast";
import {LoadingComponent} from "../Loading";

export const CollaboratorsComponent = () => {
    const {data, isLoading} = useGetCollaboratorsQuery()
    const [createCollaborator] = useCreateCollaboratorMutation();
    const [deleteCollaborator] = useDeleteCollaboratorMutation();
    const permission = useSelector((state: RootState) => state.auth.permission);
    const navigate = useNavigate();
    const {showToast} = useToast();
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
        if (selectedUserId) {
            const response = await deleteCollaborator(selectedUserId);
            if (response.error) {
                const error = response.error as { data: string }
                showToast(error.data!, 'error');
            } else {
                showToast("Collaborator Deleted Successfully", 'info');
            }
        }
        handleCloseDeleteDialog();
    }

    const GetSmallName = (name: string) => {
        return useSmallName(name);
    }

    const renderNotch = (id: string) => {
        if (!permission || !permission["delete-users"]) return;
        return (
            <RemoveNotch>
                <RemoveCircleIcon onClick={() => handleOpenDeleteDialog(id)} color={"error"}
                />
            </RemoveNotch>
        )
    }

    if (isLoading) {
        return (
            <>
                <h1>Collaborators</h1>
                <LoadingComponent/>
            </>
        );
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
                            {renderNotch(user.id)}
                            <Stack width={"100%"} gap={"5px"} onClick={() => navigate(`/collaborators/${user.id}`)}
                                   flex={1}
                                   alignItems={"center"}
                                   justifyContent={"center"}>
                                <AssociateIconComponent hasShadow name={user.name} size={"big"}/>
                                {GetSmallName(user.name)}
                            </Stack>
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

