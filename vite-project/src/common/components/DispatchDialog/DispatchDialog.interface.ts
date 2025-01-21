export interface DispatchDialogProps {
    open: boolean,
    handleClose: () => void,
    /* eslint-disable-next-line @typescript-eslint/no-unsafe-function-type  */
    dispatch: Function,
    text?: string
}