import {useCreateProjectMutation, useGetProjectsQuery} from "../../services/project.ts";
import {ProjectCardComponent} from "./ProjectCard";
import {Project} from "../../services/types/Project.ts";
import {ProjectGrid} from "./Projects.styles.tsx";
import {ActionBar} from "../../common/styles";
import {useState} from "react";
import {FormComponent} from "../Form";
import {useGetCollaboratorsQuery} from "../../services/collaborator.ts";
import {Data} from "../Form/Form.interface.tsx";

export const ProjectsComponent = () => {
    const {data} = useGetProjectsQuery()
    const {data: collaborators} = useGetCollaboratorsQuery()
    const [createProject] = useCreateProjectMutation()
    const [openForm, setOpenForm] = useState(false);
    const handleOpenForm = () => setOpenForm(true);
    const handleCloseForm = () => setOpenForm(false);
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
        owner: {
            type: "autocomplete",
            options: collaboratorsOptions
        }
    }

    const handleSubmit = async (data: Data) => {
        // to do
        console.log(data)
        const owner = collaborators?.find(collaborator => collaborator.name === data.owner)

        const payload = {
            name: data.name as string,
            owner_id: owner?.id as string
        }

        createProject(payload)
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
