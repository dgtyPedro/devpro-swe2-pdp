import {TeamCardProps} from "./TeamCard.interface.tsx";
import {
    TeamBox,
    TeamName,
    TeamOwner,
    TeamInfo, TeamAssociates,
} from "./TeamCard.styles.tsx";
import {TeamSchemaComponent} from "./TeamSchema";
import {useState} from "react";
import {AssociateIconComponent} from "../../../common/components";

export const TeamCardComponent = (props: TeamCardProps) => {
    const {team} = props

    const [openSchema, setOpenSchema] = useState(false);
    const handleOpenSchema = () => setOpenSchema(true);
    const handleCloseSchema = () => setOpenSchema(false);

    return (
        <>
            <TeamBox onClick={handleOpenSchema}>
                <TeamInfo>
                    <TeamName>
                        {team.name}
                    </TeamName>
                    <TeamOwner>
                        <p>Team Leader:</p>
                        <AssociateIconComponent hasShadow={false} name={team.owner.name} />
                        {team.owner.name}
                    </TeamOwner>
                    <div>
                        <TeamAssociates>
                            <p>Collaborators:</p>
                            {
                                team.associates.map(associate => {
                                    return (
                                        <AssociateIconComponent name={associate.name} hasShadow={false}/>
                                    )
                                }).slice(0, 10)
                            }
                            {team.associates.length > 10 && (
                                <div>
                                    and <b>{team.associates.length - 10}</b> more
                                </div>
                            )}
                        </TeamAssociates>
                    </div>
                </TeamInfo>
            </TeamBox>
            <TeamSchemaComponent id={team.id} open={openSchema} handleClose={handleCloseSchema}/>
        </>
    )
}
