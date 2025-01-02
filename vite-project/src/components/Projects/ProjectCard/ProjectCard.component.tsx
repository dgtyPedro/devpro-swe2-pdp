import {ProjectCardProps} from "./ProjectCard.interface.tsx";
import {
    ProjectBox, ProjectInfo,
    ProjectName,
    ProjectOwner,
    ProjectTeamsSummary
} from "./ProjectCard.styles.tsx";
import {AssociateIcon, AssociatesPreview} from "../../../common/styles";

export const ProjectCardComponent = (props: ProjectCardProps) => {
    const {project} = props

    // change to profile picture afterwards
    const associates = project.teams.flatMap(team => {
        return [...team.associates.map(associate => associate.name)]
    })


    return (
        <ProjectBox>
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
                {
                    associates.length > 4 && ` and more ${associates.length - 4} associates`
                }
            </AssociatesPreview>
        </ProjectBox>
    )
}
