import {Modal} from "@mui/base";
import Backdrop from '@mui/material/Backdrop';
import {LoginProps} from "./Login.interface.tsx";
import {LoginBox, LoginButton, LoginField, LoginFields, LoginGroup, LoginLabel} from "./Login.styles.tsx";
import {useOutsideClick} from "../../common/hooks";
import {handleSignIn, useSignInMutation} from "../../services/collaborator.ts";
import {useDispatch} from "react-redux";
import {FormEvent} from "react";
import {AuthUser} from "../../services/types/User.ts";
import {useToast} from "../../common/hooks/Toast";

export const LoginComponent = (props: LoginProps) => {
    const {open, handleClose} = props
    const ref = useOutsideClick(handleClose);
    const [signIn] = useSignInMutation();
    const dispatch = useDispatch();
    const {showToast} = useToast();

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement);

        const user: AuthUser = {
            email: data.get('email') as string,
            password: data.get('password') as string,
        };

        const response = await handleSignIn(dispatch, signIn, user, showToast);

        if(response) handleClose();
    }
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            closeAfterTransition
            slots={{ backdrop: Backdrop }}
        >
            <LoginBox ref={ref}>
                <a onClick={handleClose}>Close</a>

                <h2>Sign In</h2>
                <LoginFields onSubmit={e => submitForm(e)}>
                    <LoginGroup>
                        <LoginField id="email" name="email" placeholder="email" required/>
                        <LoginLabel htmlFor="email">Name</LoginLabel>
                    </LoginGroup>
                    <LoginGroup>
                        <LoginField id="password" name="password" placeholder="password" required/>
                        <LoginLabel htmlFor="password">password</LoginLabel>
                    </LoginGroup>
                    <LoginButton>Enter</LoginButton>
                </LoginFields>
            </LoginBox>
        </Modal>
    );
}

