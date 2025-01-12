import {Modal} from "@mui/base";
import Backdrop from '@mui/material/Backdrop';
import {FormProps} from "./Form.interface.tsx";
import {FormBox, FormButton, FormField, FormFields, FormGroup, FormLabel} from "./Form.styles.tsx";
import {useOutsideClick} from "../../common/hooks";
import {FormEvent} from "react";

export const FormComponent = (props: FormProps) => {
    const {open, handleClose, handleSubmit, fields} = props
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

                <h2 style={{margin: 0, textAlign: "center"}}>Sign In</h2>
                <FormFields onSubmit={e => submitForm(e)}>
                    {
                        Object.keys(fields).map((field, index) => {
                            const type = Object.values(fields)[index]
                            return (
                                <FormGroup>
                                    <FormField id={field} name={field} type={type} placeholder={field} required/>
                                    <FormLabel htmlFor={field}>{field}</FormLabel>
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

