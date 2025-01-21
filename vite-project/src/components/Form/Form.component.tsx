import {Modal} from "@mui/base";
import Backdrop from '@mui/material/Backdrop';
import {FormProps} from "./Form.interface.tsx";
import {FormBox, FormButton, FormField, FormFields, FormGroup, FormLabel} from "./Form.styles.tsx";
import {useOutsideClick} from "../../common/hooks";
import {FormEvent} from "react";
import {AutocompleteComponent} from "./Autocomplete";

export const FormComponent = (props: FormProps) => {
    const {open, handleClose, handleSubmit, title, fields} = props
    const ref = useOutsideClick(handleClose);
    const submitForm = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = Object.fromEntries(
            new FormData(
                e.currentTarget
            )
        )

        handleSubmit(data)
    }

    const capitalizeFirstLetter = (val: string) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
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
            <FormBox ref={ref}>
                <a onClick={handleClose}>Close</a>

                <h2>{title}</h2>
                <FormFields onSubmit={e => submitForm(e)}>
                    {
                        Object.keys(fields).map((field, index) => {
                            const type = Object.values(fields)[index].type
                            const options = Object.values(fields)[index].options
                            if (type.toUpperCase() === "AUTOCOMPLETE") {
                                return (
                                    <FormGroup>
                                        <AutocompleteComponent label={field} options={options!}/>
                                    </FormGroup>
                                )
                            }
                            return (
                                <FormGroup>
                                    <FormField id={field} name={field} type={type}
                                               placeholder={capitalizeFirstLetter(field)}
                                               required/>
                                    <FormLabel htmlFor={field}>{capitalizeFirstLetter(field)}</FormLabel>
                                </FormGroup>
                            )
                        })
                    }
                    <FormButton>Enter</FormButton>
                </FormFields>
            </FormBox>
        </Modal>
    );
}

