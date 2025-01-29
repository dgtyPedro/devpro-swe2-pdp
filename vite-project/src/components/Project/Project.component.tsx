import {useNavigate, useParams} from "react-router";
import {useDeleteProjectMutation, useGetProjectQuery, useUpdateProjectMutation} from "../../services/project.ts";
import {TeamCardComponent} from "./TeamCard";
import {TeamGrid} from "./Project.styles.tsx";
import {useState} from "react";
import {FormComponent} from "../Form";
import {ActionBar} from "../../common/styles";
import {Divider, Stack} from "@mui/material";
import {Project} from "../../services/types/Project.ts";
import {useGetCollaboratorsQuery} from "../../services/collaborator.ts";
import {Data} from "../Form/Form.interface.tsx";
import {useCreateTeamMutation} from "../../services/team.ts";
import {DispatchDialogComponent} from "../../common/components/DispatchDialog";
import {useSelector} from "react-redux";
import {RootState} from "../../app/store.ts";
import {LoadingComponent} from "../Loading";
import {useToast} from "../../common/hooks/Toast";
import {AutocompleteComponent} from "../Form/Autocomplete";
import {Option} from "../Form/Autocomplete/Autocomplete.interface.tsx";

export const ProjectComponent = () => {
    const {id} = useParams() as unknown as Project;
    const {data: project, isLoading} = useGetProjectQuery(id)
    const {data: collaborators} = useGetCollaboratorsQuery()
    const [createTeam] = useCreateTeamMutation();
    const [updateProject] = useUpdateProjectMutation();
    const [deleteProject] = useDeleteProjectMutation();
    const permission = useSelector((state: RootState) => state.auth.permission);
    const {showToast} = useToast();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const navigate = useNavigate();
    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const handleOpenUpdate = () => setOpenUpdate(true);
    const handleCloseUpdate = () => setOpenUpdate(false);
    const handleOpenDeleteDialog = () => setOpenDeleteDialog(true);
    const handleCloseDeleteDialog = () => setOpenDeleteDialog(false);

    const collaboratorsOptions = collaborators?.map(collaborator => {
        return (
            {
                value: collaborator.id,
                label: collaborator.name
            }
        )
    })

    const fields = {
        name: {
            type: "text"
        },
        leader: {
            type: "autocomplete",
            options: collaboratorsOptions
        }
    }
    
    const handleUpdateOwner = async(option: Option) => {
        if(option.value === project?.owner.id) return;
        const payload = {
            id: id,
            owner_id: option.value
        }
        updateProject(payload)
        handleCloseUpdate();
    }

    const handleSubmit = async (data: Data) => {
        const owner = collaborators?.find(collaborator => collaborator.name === data.leader)

        const payload = {
            name: data.name as string,
            owner_id: owner?.id as string,
            project_id: id,
        }

        const response = await createTeam(payload)
        if (response.error) {
            const error = response.error as { data: string }
            showToast(error.data!, 'error');
        } else {
            showToast("Team Created Successfully", 'info');
        }
        handleCloseForm()
    }

    const handleDelete = async () => {
        const response = await deleteProject(id)
        if (response.error) {
            const error = response.error as { data: string }
            showToast(error.data!, 'error');
        } else {
            showToast("Project Deleted Successfully", 'info');
        }
        navigate("/projects");
    }

    const renderCreateButton = () => {
        if (!permission || !permission["create-teams"]) return;
        return <a onClick={handleOpenForm}>Create Team</a>
    }

    const renderDeleteButton = () => {
        if (!permission || !permission["delete-teams"]) return;
        return <a onClick={handleOpenDeleteDialog}>Delete Project</a>
    }

    const renderUpdateOwnerInput = () => {
        if (!permission || !permission["update-teams"] || !openUpdate) return;
        return (
            <Stack width={"fit-content"} mt={2}>
                <AutocompleteComponent label={""} options={collaboratorsOptions!}
                                       defaultValue={collaboratorsOptions?.find(
                                           collaborator => collaborator.value === project?.owner.id
                                       )}
                                       onChange={handleUpdateOwner}
                />
                <a onClick={handleCloseUpdate}>Close</a>
            </Stack>
        )
    }

    if (isLoading) return <LoadingComponent/>;
    return (
        <>
            <a onClick={() => navigate(-1)}>Go Back</a>
            <h1>{project?.name}</h1>
            <ActionBar>
                {renderCreateButton()}
                {renderDeleteButton()}
            </ActionBar>
            <Divider/>
            {
                renderUpdateOwnerInput()
            }
            {
                !openUpdate && <h4 onClick={handleOpenUpdate}>Project Owner: {project?.owner.name}</h4>
            }


            <h2>Teams:</h2>
            {
                project?.teams.length === 0 && <p>There are no teams in this project</p>
            }
            <TeamGrid>
                {project?.teams.map(team => {
                    return (<TeamCardComponent team={team}/>);
                })}
            </TeamGrid>
            <FormComponent open={openForm}
                           handleClose={handleCloseForm}
                           handleSubmit={handleSubmit}
                           title={"Create Team"}
                           fields={fields}/>
            <DispatchDialogComponent open={openDeleteDialog} handleClose={handleCloseDeleteDialog}
                                     dispatch={handleDelete}/>
        </>
    );
}
