import {useNavigate, useParams} from "react-router";
import {useGetProjectQuery} from "../../services/project.ts";
import {TeamCardComponent} from "./TeamCard";
import {TeamGrid} from "./Project.styles.tsx";

export const ProjectComponent = () => {
    const {id} = useParams();
    const {data: project, isLoading} = useGetProjectQuery(id)
    const navigate = useNavigate();

    if (isLoading) return (<></>);
    return (
        <div>
            <a onClick={() => navigate(-1)}>Go Back</a>
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
