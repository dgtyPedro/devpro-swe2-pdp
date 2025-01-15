export interface FormProps {
    open: boolean,
    handleClose: () => void,
    handleSubmit: (fields: unknown) => void,
    title: string,
    fields: Record<string, string>,
}