import {useEffect} from "react";
import {useGetCollaboratorsQuery} from "../../services/collaborator.ts";
import {Collaborator, CollaboratorsGrid} from "./Collaborators.styles.tsx";
import {AssociateIcon} from "../../common/styles";

export const CollaboratorsComponent = () => {
    const {data} = useGetCollaboratorsQuery()

    return (
        <CollaboratorsGrid>
            {data?.map(user => {
                return(
                    <Collaborator>
                        <AssociateIcon style={{zoom: "200%", boxShadow: "unset"}}>
                            {user.name.slice(0,2)}
                        </AssociateIcon>
                        {user.name}
                    </Collaborator>
                )
            })}
        </CollaboratorsGrid>
    )
}

