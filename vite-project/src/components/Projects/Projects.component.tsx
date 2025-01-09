import {useGetProjectsQuery} from "../../services/project.ts";
import {ProjectCardComponent} from "./ProjectCard";
import { Project } from "../../services/types/Project.ts";
import {ProjectGrid} from "./Projects.styles.tsx";

export const ProjectsComponent = () => {
    const {data} = useGetProjectsQuery()

    return (
        <ProjectGrid>
            {data?.map((project: Project) => {
                return (
                    <ProjectCardComponent project={project} />
                );
            })}
        </ProjectGrid>
    )
}
