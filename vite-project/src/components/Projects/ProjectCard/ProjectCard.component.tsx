import {ProjectCardProps} from "./ProjectCard.interface.tsx";
import {
    ProjectBox, ProjectInfo,
    ProjectName,
    ProjectOwner,
    ProjectTeamsSummary
} from "./ProjectCard.styles.tsx";
import {AssociateIcon, AssociatesPreview} from "../../../common/styles";
import {useNavigate} from "react-router";

export const ProjectCardComponent = (props: ProjectCardProps) => {
    const {project} = props

    // change to profile picture afterward
    const associates = project.teams.flatMap(team => {
        return [...team.associates.map(associate => associate.name)]
    })

    const navigate = useNavigate();

    return (
        <ProjectBox onClick={() => navigate(`/projects/${project.id}`)}>
            <ProjectInfo>
                <ProjectName>
                    {project.name}
                </ProjectName>
                <ProjectOwner>
                    <AssociateIcon>{project.owner.name.slice(0,2)}</AssociateIcon>
                    {project.owner.name}
                </ProjectOwner>
                <ProjectTeamsSummary>
                    {project.teams.length} team(s)
                </ProjectTeamsSummary>
            </ProjectInfo>

            <AssociatesPreview>
                {associates.map(associate => {
                    return (<AssociateIcon title={associate}>{associate.slice(0, 2)}</AssociateIcon>)
                }).slice(0, 4)}
                {associates.length > 4 && (
                    <div>
                        and more <b>{associates.length - 4}</b> associates
                    </div>
                )}
                {
                    associates.length === 0 && (
                        <div>
                            No collaborators
                        </div>
                    )
                }
            </AssociatesPreview>
        </ProjectBox>
    )
}
