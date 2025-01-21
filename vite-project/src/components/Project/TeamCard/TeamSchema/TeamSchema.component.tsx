import {TeamSchemaProps} from "./TeamSchema.interface.tsx";
import {
    useAttachCollaboratorMutation, useDeleteTeamMutation,
    useDetachCollaboratorMutation,
    useGetTeamQuery
} from "../../../../services/team.ts";
import Backdrop from "@mui/material/Backdrop";
import {Modal} from "@mui/base";
import {Nc, SchemaBox, Tree} from "./TeamSchema.styles.tsx";
import {useOutsideClick} from "../../../../common/hooks";
import {SchemaFragmentComponent} from "./SchemaFragment";
import {ActionBar} from "../../../../common/styles";
import {Divider} from "@mui/material";
import {AddCollaboratorComponent} from "./AddCollaborator";
import {useGetCollaboratorsQuery} from "../../../../services/collaborator.ts";
import {useState} from "react";
import {ChooseCollaboratorComponent} from "./ChooseCollaborator";
import {AssociateIconComponent} from "../../../../common/components";

export const TeamSchemaComponent = (props: TeamSchemaProps) => {
    const {id, open, handleClose} = props
    const {data: team} = useGetTeamQuery(id, {
        skip: !open,
    })

    const [attachCollaborator] = useAttachCollaboratorMutation();
    const [detachCollaborator] = useDetachCollaboratorMutation();
    const [deleteTeam] = useDeleteTeamMutation();

    const [openCollaboratorOptions, setOpenCollaboratorOptions] = useState(false)
    const [editDepth, setEditDepth] = useState<string>()

    const ref = useOutsideClick(handleClose);
    const edit = true;
    const {data: collaborators} = useGetCollaboratorsQuery()

    const availableCollaborators = collaborators?.filter(collaborator =>
        !team?.associates.map(associate => associate.id)?.includes(collaborator.id))

    const addCollaborator = (selectedCollaboratorId: string) => {
        if (!editDepth) return;

        const payload = {
            id: id,
            user_id: selectedCollaboratorId,
            led_by: editDepth
        };

        setOpenCollaboratorOptions(false)

        attachCollaborator(payload)
    }

    const removeCollaborator = (collaboratorId: string) => {
        const payload = {
            id: id,
            user_id: collaboratorId,
        };
        detachCollaborator(payload)
    }

    const handleDeleteTeam = () => {
        deleteTeam(id)
        handleClose()
    }

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={{backdrop: Backdrop}}
        >
            <SchemaBox ref={ref}>
                <div>
                    <ActionBar>
                        <a onClick={handleClose}>Close</a>
                        <a onClick={handleDeleteTeam}>Delete Team</a>
                    </ActionBar>

                    <h2>{team?.name}'s Hierarchy</h2>
                    <Divider sx={{marginBottom: 12}}/>
                </div>
                {
                    openCollaboratorOptions && availableCollaborators &&
                    <ChooseCollaboratorComponent collaborators={availableCollaborators}
                                                 handleAddCollaborator={addCollaborator}/>
                }
                <Tree>
                    <ul>
                        <li>
                            <Nc>
                                <AssociateIconComponent hasShadow={false} name={team?.owner.name || ""} size={"big"}/>
                            </Nc>
                            <ul>
                                {
                                    team?.schema?.map((associate) => {
                                        return (
                                            <SchemaFragmentComponent
                                                openCollaboratorOptions={openCollaboratorOptions} depth={associate.id}
                                                edit={edit}
                                                associate={associate}
                                                editDepth={editDepth}
                                                setEditDepth={setEditDepth}
                                                setOpenCollaboratorOptions={setOpenCollaboratorOptions}
                                                removeCollaborator={removeCollaborator}/>
                                        )
                                    })
                                }
                                {
                                    edit && team?.owner && availableCollaborators && (
                                        <AddCollaboratorComponent
                                            openCollaboratorOptions={openCollaboratorOptions}
                                            editDepth={editDepth}
                                            setOpenCollaboratorOptions={setOpenCollaboratorOptions}
                                            depth={team.owner.id}
                                            setEditDepth={setEditDepth}/>
                                    )
                                }
                            </ul>
                        </li>
                    </ul>
                </Tree>
            </SchemaBox>
        </Modal>
    )
}
