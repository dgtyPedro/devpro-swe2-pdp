import {SchemaFragmentProps} from "./SchemaFragment.interface.tsx";
import {BigAssociateIcon, RemoveNotch} from "../../../../../common/styles";
import {AddCollaboratorComponent} from "../AddCollaborator";
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import {Nc} from "../TeamSchema.styles.tsx";
import {useNameInitials} from "../../../../../common/hooks/UseNameInitials.tsx";
import {useSmallName} from "../../../../../common/hooks/UseSmallName.tsx";

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
            <Nc>
                <RemoveNotch>
                    <RemoveCircleIcon color={"error"}
                                      onClick={() => removeCollaborator(associate.id)}/>
                </RemoveNotch>
                <BigAssociateIcon>{useNameInitials(associate.name)}</BigAssociateIcon>
                {useSmallName(associate.name)}
            </Nc>
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