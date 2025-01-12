export interface FormProps {
    open: boolean,
    handleClose: () => void,
    handleSubmit: (fields: unknown) => void,
    fields: Record<string, string>,
}