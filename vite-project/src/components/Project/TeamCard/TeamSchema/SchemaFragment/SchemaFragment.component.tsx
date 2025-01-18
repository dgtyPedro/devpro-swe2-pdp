import {SchemaFragmentProps} from "./SchemaFragment.interface.tsx";
import {AssociateIcon} from "../../../../../common/styles";
import {AddCollaboratorComponent} from "../AddCollaborator";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';

export const SchemaFragmentComponent = (props: SchemaFragmentProps) => {
    const {
        associate,
        edit,
        depth,
        removeCollaborator,
        editDepth,
        setEditDepth,
        openCollaboratorOptions,
        setOpenCollaboratorOptions
    } = props
    return (

        <li>
            <span className="tf-nc" style={
                {
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                }
            }>
                <div style={
                    {
                        flex: 1,
                        width: "100%",
                        display: "flex",
                        justifyContent: "end"
                    }
                }>
                    <RemoveCircleIcon sx={{zoom: "60%", cursor: "pointer"}} color={"error"}
                                      onClick={() => removeCollaborator(associate.id)}/>
                </div>

                <AssociateIcon style={{zoom: "130%", boxShadow: "unset"}}>{associate.name.slice(0, 2)}</AssociateIcon>
                {associate.name.split(' ').slice(0, 2).join(' ')}
            </span>
            <ul>
                {
                    associate.associates.length > 0 &&
                    associate.associates.map(
                        associate =>
                            <SchemaFragmentComponent
                                openCollaboratorOptions={openCollaboratorOptions} depth={associate.id} edit={edit}
                                associate={associate}
                                setOpenCollaboratorOptions={setOpenCollaboratorOptions}
                                editDepth={editDepth} setEditDepth={setEditDepth}
                                removeCollaborator={removeCollaborator}/>
                    )
                }
                {
                    edit && (

                        <AddCollaboratorComponent
                            openCollaboratorOptions={openCollaboratorOptions}
                            setOpenCollaboratorOptions={setOpenCollaboratorOptions}
                            depth={depth} editDepth={editDepth}
                            setEditDepth={setEditDepth}/>

                    )
                }
            </ul>

        </li>
    );
}