import {Modal} from "@mui/base";
import Backdrop from '@mui/material/Backdrop';
import {LoginProps} from "./Login.interface.tsx";
import {LoginBox, LoginButton, LoginField, LoginFields, LoginGroup, LoginLabel} from "./Login.styles.tsx";
import {useOutsideClick} from "../../common/hooks";

export const LoginComponent = (props: LoginProps) => {
    const {open, handleClose} = props
    const ref = useOutsideClick(handleClose);
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

                <h2 style={{margin: 0, textAlign: "center"}}>Sign In</h2>
                <LoginFields>
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

