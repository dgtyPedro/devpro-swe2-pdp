import {useGetProjectsQuery} from "../../services/project.ts";
import {ProjectCardComponent} from "./ProjectCard";
import {Project} from "../../services/types/Project.ts";
import {ProjectGrid} from "./Projects.styles.tsx";
import {ActionBar} from "../../common/styles";
import {useState} from "react";
import {FormComponent} from "../Form";

export const ProjectsComponent = () => {
    const {data} = useGetProjectsQuery()
    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);

    const fields = {
        name: "text",
        owner: "autocomplete"
    }

    const handleSubmit = async (fields: unknown) => {
        // to do
        console.log(fields)
    }

    return (
        <>
            <h1>Projects</h1>
            <ActionBar>
                <a onClick={handleOpenForm}>Create Project</a>
            </ActionBar>
            <ProjectGrid>
                {data?.map((project: Project) => {
                    return (
                        <ProjectCardComponent project={project}/>
                    );
                })}
            </ProjectGrid>
            <FormComponent open={openForm}
                           handleClose={handleCloseForm}
                           handleSubmit={handleSubmit}
                           title={"Create Project"}
                           fields={fields}/>
        </>
    )
}
