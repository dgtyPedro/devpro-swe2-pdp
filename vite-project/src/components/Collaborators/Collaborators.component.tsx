import {useEffect} from "react";
import {useGetCollaboratorsQuery} from "../../services/collaborator.ts";
import {Collaborator, CollaboratorsGrid} from "./Collaborators.styles.tsx";
import {AssociateIcon} from "../../common/styles";

export const CollaboratorsComponent = () => {
    const {data, error, isLoading} = useGetCollaboratorsQuery()

    useEffect(() => {
        console.log(data, error, isLoading)
    }, [data, error, isLoading])

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

