import {useNavigate, useParams} from "react-router";
import {useGetProjectQuery} from "../../services/project.ts";
import {TeamCardComponent} from "./TeamCard";
import {TeamGrid} from "./Project.styles.tsx";
import {useState} from "react";
import {FormComponent} from "../Form";
import {ActionBar} from "../../common/styles";
import {Divider} from "@mui/material";

export const ProjectComponent = () => {
    const {id} = useParams();
    const {data: project, isLoading} = useGetProjectQuery(id)
    const navigate = useNavigate();
    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

    const fields = {
        name: "text",
        email: "email"
    }

    const handleSubmit = async (fields: unknown) => {
        // to do
        console.log(fields)
    }

    if (isLoading) return (<></>);
    return (
        <>
            <a onClick={() => navigate(-1)}>Go Back</a>
            <h1>{project?.name}</h1>
            <ActionBar>
                <a onClick={handleOpenForm}>Create Team</a>
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
