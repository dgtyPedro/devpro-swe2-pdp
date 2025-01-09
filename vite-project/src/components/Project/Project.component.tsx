import {useParams} from "react-router";
import {useGetProjectQuery} from "../../services/project.ts";
import {TeamCardComponent} from "./TeamCard";
import {TeamGrid} from "./Project.styles.tsx";

export const ProjectComponent = () => {
    const {id} = useParams();
    const {data: project, isLoading} = useGetProjectQuery(id)

    if (isLoading) return (<></>);
    return (
        <div>
            <a>Go Back</a>
            <h1>{project?.name}</h1>
            <h2>Teams:</h2>
            <TeamGrid>
                {project?.teams.map(team => {
                    return (<TeamCardComponent team={team}/>);
                })}
            </TeamGrid>
        </div>
    );
}
