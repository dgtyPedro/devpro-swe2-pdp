import {useNavigate, useParams} from "react-router";
import {useDeleteProjectMutation, useGetProjectQuery} from "../../services/project.ts";
import {TeamCardComponent} from "./TeamCard";
import {TeamGrid} from "./Project.styles.tsx";
import {useState} from "react";
import {FormComponent} from "../Form";
import {ActionBar} from "../../common/styles";
import {Divider} from "@mui/material";
import {Project} from "../../services/types/Project.ts";

export const ProjectComponent = () => {
    const {id} = useParams() as unknown as Project;
    const {data: project, isLoading} = useGetProjectQuery(id)
    const [deleteProject] = useDeleteProjectMutation();
    const navigate = useNavigate();
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
        // to do
        console.log(fields)
    }

    const handleDelete = async () => {
        if(id) deleteProject(id)
    }

    if (isLoading) return (<></>);
    return (
        <>
            <a onClick={() => navigate(-1)}>Go Back</a>
            <h1 onClick={handleDelete}>{project?.name}</h1>
            <ActionBar>
                <a onClick={handleOpenForm}>Create Team</a>
                <a>Delete Project</a>
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
        </>
    );
}
