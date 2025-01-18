import {AddCollaboratorProps} from "./AddCollaborator.interface.tsx";
import {useEffect, useState} from "react";

export const AddCollaboratorComponent = (props: AddCollaboratorProps) => {
    const {openCollaboratorOptions, setOpenCollaboratorOptions, depth, editDepth, setEditDepth} = props
    const [inputMode, setInputMode] = useState(false)

    const handleButton = () => {
        const state = !inputMode
        setInputMode(state)
        setOpenCollaboratorOptions(state)
        setEditDepth(depth)
    }

    const disabled = openCollaboratorOptions && editDepth !== depth;

    useEffect(() => {
        if (editDepth !== depth) setInputMode(false)
    }, [depth, editDepth])


    return (
        <li>
            <span className="tf-nc">
                <button disabled={disabled} onClick={handleButton}>{
                    editDepth === depth && inputMode ? "Selecting... (Click to close)" : "Add Collaborator"
                }
                </button>
            </span>
        </li>
    )
}
