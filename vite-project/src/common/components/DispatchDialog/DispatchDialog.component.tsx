import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import {TransitionProps} from '@mui/material/transitions';
import {DispatchDialogProps} from "./DispatchDialog.interface.ts";

const Transition = React.forwardRef(function Transition(
    props: TransitionProps & {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        children: React.ReactElement<any, any>;
    },
    ref: React.Ref<unknown>,
) {
    return <Slide direction="up" ref={ref} {...props}/>;
});

export function DispatchDialogComponent(props: DispatchDialogProps) {
    const {open, handleClose, dispatch, text = "Are you sure you want to do this?"} = props

    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={handleClose}
            aria-describedby="alert-dialog-slide-description"
        >
            <DialogTitle>{"Confirm Action"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-slide-description">
                    {text}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={() => dispatch?.()}>Yes</Button>
            </DialogActions>
        </Dialog>
    );
}
