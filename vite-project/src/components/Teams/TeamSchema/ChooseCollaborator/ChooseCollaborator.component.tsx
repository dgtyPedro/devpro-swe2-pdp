import {ChooseCollaboratorProps} from "./ChooseCollaborator.interface.tsx";
import {ChooseCollaboratorBox} from "./ChooseCollaborator.styles.tsx";
import {useState} from "react";
import {Option} from "../../../Form/Autocomplete/Autocomplete.interface.tsx";
import {AutocompleteComponent} from "../../../Form/Autocomplete";

export const ChooseCollaboratorComponent = (props: ChooseCollaboratorProps) => {
    const {collaborators, handleAddCollaborator} = props
    const [selectedCollaborator, setSelectedCollaborator] = useState<string>()
    const [collaboratorName, setCollaboratorName] = useState<string>()

    const collaboratorsOptions = collaborators?.map(collaborator => {
        return (
            {
                value: collaborator.id,
                label: collaborator.name
            }
        )
    })

    const onChange = (option: Option) => {
        setSelectedCollaborator(option.value)
        setCollaboratorName(option.label)
    }

    if (!collaborators) return;

    return (
        <ChooseCollaboratorBox>
            <h3>Choose Collaborator:</h3>
            <AutocompleteComponent label={""} options={collaboratorsOptions!} onChange={onChange}/>
            {
                selectedCollaborator && <a onClick={() => handleAddCollaborator(selectedCollaborator)}>Add {collaboratorName}</a>
            }
        </ChooseCollaboratorBox>

    )
}
