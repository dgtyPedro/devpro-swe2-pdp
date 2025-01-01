import {useGetProjectsQuery} from "../../services/project.ts";
import {useEffect} from "react";
import {ProjectCardComponent} from "./ProjectCard";
import { Project } from "../../services/types/Project.ts";
import {ProjectGrid} from "./Projects.styles.tsx";

export const ProjectsComponent = () => {
    const {data, error, isLoading} = useGetProjectsQuery()

    useEffect(() => {
        console.log(data, error, isLoading)
    }, [data, error, isLoading])

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
