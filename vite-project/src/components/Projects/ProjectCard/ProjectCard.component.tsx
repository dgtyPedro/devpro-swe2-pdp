import {ProjectCardProps} from "./ProjectCard.interface.tsx";
import {
    ProjectBox, ProjectInfo,
    ProjectName,
    ProjectOwner,
    ProjectTeamsSummary
} from "./ProjectCard.styles.tsx";
import {AssociatesPreview} from "../../../common/styles";
import {useNavigate} from "react-router";
import {AssociateIconComponent} from "../../../common/components";

export const ProjectCardComponent = (props: ProjectCardProps) => {
    const {project} = props

    // change to profile picture afterward
    const associates = project.teams.flatMap(team => {
        return [...team.associates]
    })

    const navigate = useNavigate();

    return (
        <ProjectBox onClick={() => navigate(`/projects/${project.id}`)}>
            <ProjectInfo>
                <ProjectName>
                    {project.name}
                </ProjectName>
                <ProjectOwner>
                    <AssociateIconComponent hasShadow name={project.owner.name} />
                    {project.owner.name}
                </ProjectOwner>
                <ProjectTeamsSummary>
                    {project.teams.length} team(s)
                </ProjectTeamsSummary>
            </ProjectInfo>

            <AssociatesPreview>
                {associates.map(associate => {
                    return (
                        <AssociateIconComponent hasShadow name={associate.name} />
                )
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
