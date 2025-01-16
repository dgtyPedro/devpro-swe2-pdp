import {SchemaFragmentProps} from "./SchemaFragment.interface.tsx";
import {AssociateIcon} from "../../../../../common/styles";
import {AddCollaboratorComponent} from "../AddCollaborator";

export const SchemaFragmentComponent = (props: SchemaFragmentProps) => {
    const {associate, edit, depth, setEditDepth, setOpenCollaboratorOptions} = props
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
                <AssociateIcon style={{zoom: "130%", boxShadow: "unset"}}>{associate.name.slice(0, 2)}</AssociateIcon>
                {associate.name.split(' ').slice(0, 2).join(' ')}
            </span>
            {
                associate.associates.length > 0 &&
                <ul>
                    {
                        associate.associates.map(
                            associate =>
                                <SchemaFragmentComponent depth={depth + 1} edit={edit} associate={associate} setOpenCollaboratorOptions={setOpenCollaboratorOptions} setEditDepth={setEditDepth}/>
                        )
                    }
                    {
                        edit && (
                           <AddCollaboratorComponent setOpenCollaboratorOptions={setOpenCollaboratorOptions} depth={depth} setEditDepth={setEditDepth} />
                        )
                    }
                </ul>
            }
        </li>
    )
}
