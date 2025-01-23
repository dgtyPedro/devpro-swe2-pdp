import {Modal} from "@mui/base";
import Backdrop from '@mui/material/Backdrop';
import {LoginProps} from "./SignUp.interface.tsx";
import {SignUpBox, LoginButton, SignUpField, SignUpFields, SignUpGroup, LoginLabel} from "./SignUp.styles.tsx";
import {useOutsideClick} from "../../common/hooks";
import {FormEvent} from "react";
import {handleSignUp, useSignUpMutation} from "../../services/collaborator.ts";
import {useDispatch} from "react-redux";
import {SignUpUser} from "../../services/types/User.ts";
import {useToast} from "../../common/hooks/Toast";

export const SignUpComponent = (props: LoginProps) => {
    const {open, handleClose} = props
    const ref = useOutsideClick(handleClose);
    const [signUp] = useSignUpMutation();
    const dispatch = useDispatch();
    const {showToast} = useToast();

    const submitForm = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        const data = new FormData(e.target as HTMLFormElement);

        const user: SignUpUser = {
            name: data.get('name') as string,
            email: data.get('email') as string,
            password: data.get('password') as string,
            password_confirmation: data.get('password_confirmation') as string,
        };

        const response = await handleSignUp(dispatch, signUp, user, showToast);

        if(response) handleClose();
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
            <SignUpBox ref={ref}>
                <a onClick={handleClose}>Close</a>
                <h2>Sign Up</h2>
                <SignUpFields onSubmit={e => submitForm(e)}>
                    <SignUpGroup>
                        <SignUpField id="email" name="email" placeholder="email" required/>
                        <LoginLabel htmlFor="email">Email</LoginLabel>
                    </SignUpGroup>
                    <SignUpGroup>
                        <SignUpField id="name" name="name" placeholder="name" required/>
                        <LoginLabel htmlFor="name">Name</LoginLabel>
                    </SignUpGroup>
                    <SignUpGroup>
                        <SignUpField id="password" name="password" placeholder="password" required/>
                        <LoginLabel htmlFor="password">Password</LoginLabel>
                    </SignUpGroup>
                    <SignUpGroup>
                        <SignUpField id="password_confirmation" name="password_confirmation"
                                     placeholder="password confirmation" required/>
                        <LoginLabel htmlFor="password_confirmation">Confirm Password</LoginLabel>
                    </SignUpGroup>
                    <LoginButton>Enter</LoginButton>
                </SignUpFields>
            </SignUpBox>
        </Modal>
    );
}

