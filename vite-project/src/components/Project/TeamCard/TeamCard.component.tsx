import {TeamCardProps} from "./TeamCard.interface.tsx";
import {
    TeamBox,
    TeamName,
    TeamOwner,
    TeamInfo, TeamAssociates,
} from "./TeamCard.styles.tsx";
import {AssociateIcon} from "../../../common/styles";
import {TeamSchemaComponent} from "./TeamSchema";
import {useState} from "react";

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
                        <p style={{margin: 0}}>Team Leader:</p>
                        <AssociateIcon style={{boxShadow: "unset"}}>{team.owner.name.slice(0, 2)}</AssociateIcon>
                        {team.owner.name}
                    </TeamOwner>
                    <div>
                        <TeamAssociates>
                            <p style={{margin: 0}}>Collaborators:</p>
                            {
                                team.associates.map(associate => {
                                    return (
                                        <AssociateIcon title={associate.name}
                                                       style={{zoom: "120%", boxShadow: "unset"}}>
                                            {associate.name.slice(0, 2)}
                                        </AssociateIcon>
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
