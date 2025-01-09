import {TeamSchemaProps} from "./TeamSchema.interface.tsx";
import {useGetTeamQuery} from "../../../../services/team.ts";
import Backdrop from "@mui/material/Backdrop";
import {Modal} from "@mui/base";
import {SchemaBox} from "./TeamSchema.styles.tsx";
import {useOutsideClick} from "../../../../common/hooks";
import {SchemaFragmentComponent} from "./SchemaFragment";

export const TeamSchemaComponent = (props: TeamSchemaProps) => {
    const {id, open, handleClose} = props
    const {data: team} = useGetTeamQuery(id, {
        skip: !open,
    })
    const ref = useOutsideClick(handleClose);

    console.log(team)

    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
        >
            <SchemaBox ref={ref}>
                oi
                <div style={{display: "flex"}}>
                    {
                        team?.schema?.map((associate => {
                            return(
                                <SchemaFragmentComponent associate={associate}/>
                            )
                        }))
                    }
                </div>

            </SchemaBox>
        </Modal>
    )
}
