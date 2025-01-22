import {useNavigate, useParams} from "react-router";
import {useDeleteProjectMutation, useGetProjectQuery} from "../../services/project.ts";
import {TeamCardComponent} from "./TeamCard";
import {TeamGrid} from "./Project.styles.tsx";
import {useState} from "react";
import {FormComponent} from "../Form";
import {ActionBar} from "../../common/styles";
import {Divider} from "@mui/material";
import {Project} from "../../services/types/Project.ts";
import {useGetCollaboratorsQuery} from "../../services/collaborator.ts";
import {Data} from "../Form/Form.interface.tsx";
import {useCreateTeamMutation} from "../../services/team.ts";
import {DispatchDialogComponent} from "../../common/components/DispatchDialog";

export const ProjectComponent = () => {
    const {id} = useParams() as unknown as Project;
    const {data: project, isLoading} = useGetProjectQuery(id)
    const {data: collaborators} = useGetCollaboratorsQuery()
    const [createTeam] = useCreateTeamMutation();
    const [deleteProject] = useDeleteProjectMutation();
    const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
    const navigate = useNavigate();
    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);
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

    const handleSubmit = async (data: Data) => {
        const owner = collaborators?.find(collaborator => collaborator.name === data.leader)

        const payload = {
            name: data.name as string,
            owner_id: owner?.id as string,
            project_id: id,
        }

        createTeam(payload)
        handleCloseForm()
    }

    const handleDelete = async () => {
        if(id) deleteProject(id)
        navigate("/projects");
    }

    if (isLoading) return (<></>);
    return (
        <>
            <a onClick={() => navigate(-1)}>Go Back</a>
            <h1>{project?.name}</h1>
            <ActionBar>
                <a onClick={handleOpenForm}>Create Team</a>
                <a onClick={handleOpenDeleteDialog}>Delete Project</a>
            </ActionBar>
            <Divider/>
            <h4>Project Owner: {project?.owner.name}</h4>
            <h2>Teams:</h2>
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
