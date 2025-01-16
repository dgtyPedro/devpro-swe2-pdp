import {AddCollaboratorProps} from "./AddCollaborator.interface.tsx";
import {useState} from "react";

export const AddCollaboratorComponent = (props: AddCollaboratorProps) => {
    const {setOpenCollaboratorOptions, depth, setEditDepth} = props
    const [inputMode, setInputMode] = useState(false)

    const handleButton = () => {
        const state = !inputMode
        setInputMode(state)
        setOpenCollaboratorOptions(state)
        setEditDepth(depth)
    }

    return (
        <button onClick={handleButton}>{
            inputMode ? "Selecting... (Click to close)" : "Add Collaborator"
        }
        </button>
    )
}
