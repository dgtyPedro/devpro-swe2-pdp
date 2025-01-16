import {TeamSchemaProps} from "./TeamSchema.interface.tsx";
import {useGetTeamQuery} from "../../../../services/team.ts";
import Backdrop from "@mui/material/Backdrop";
import {Modal} from "@mui/base";
import {SchemaBox} from "./TeamSchema.styles.tsx";
import {useOutsideClick} from "../../../../common/hooks";
import {SchemaFragmentComponent} from "./SchemaFragment";
import {AssociateIcon} from "../../../../common/styles";
import {Divider} from "@mui/material";
import {AddCollaboratorComponent} from "./AddCollaborator";
import {useGetCollaboratorsQuery} from "../../../../services/collaborator.ts";
import {useState} from "react";
import {ChooseCollaboratorComponent} from "./ChooseCollaborator";

export const TeamSchemaComponent = (props: TeamSchemaProps) => {
    const {id, open, handleClose} = props
    const {data: team} = useGetTeamQuery(id, {
        skip: !open,
    })

    const [openCollaboratorOptions, setOpenCollaboratorOptions] = useState(false)
    const [editDepth, setEditDepth] = useState<number>()

    const ref = useOutsideClick(handleClose);
    const edit = true;
    const {data: collaborators} = useGetCollaboratorsQuery()

    const addCollaborator = (selectedCollaboratorId: string) => {
        console.log(selectedCollaboratorId, editDepth)
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
                <a onClick={handleClose}>Close</a>
                <h2>{team?.name}'s Hierarchy</h2>
                <Divider style={{marginBottom: 12}}/>
                {
                    openCollaboratorOptions && collaborators &&
                    <ChooseCollaboratorComponent collaborators={collaborators} handleAddCollaborator={addCollaborator}/>
                }
                <div className="tf-tree">
                    <ul>
                        <li>
                            <span className="tf-nc" style={
                                {
                                    display: "flex",
                                    flexDirection: "column",
                                    alignItems: "center",
                                    textAlign: "center"
                                }
                            }>
                                <AssociateIcon style={{
                                    zoom: "200%",
                                    boxShadow: "unset"
                                }}>{team?.owner.name.slice(0, 2)}</AssociateIcon>
                                <p style={{fontSize: "1.2em"}}>
                                    {team?.owner.name}
                                </p>
                            </span>
                            <ul>
                                {
                                    team?.schema?.map((associate) => {
                                        return (
                                            <SchemaFragmentComponent depth={1} edit={edit} associate={associate}
                                                                     setEditDepth={setEditDepth}
                                                                     setOpenCollaboratorOptions={setOpenCollaboratorOptions}/>
                                        )
                                    })
                                }
                                {
                                    edit && collaborators && (
                                        <li>
                                            <span className="tf-nc">
                                                <AddCollaboratorComponent
                                                    setOpenCollaboratorOptions={setOpenCollaboratorOptions} depth={1}
                                                    setEditDepth={setEditDepth}/>
                                            </span>
                                        </li>
                                    )
                                }
                            </ul>
                        </li>
                    </ul>
                </div>
            </SchemaBox>
        </Modal>
    )
}
