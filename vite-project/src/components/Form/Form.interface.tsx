export interface FormProps {
    open: boolean,
    handleClose: () => void,
    handleSubmit: (data: Data) => void,
    title: string,
    fields: Fields,
}

export interface Data {
    [k: string]: File | string
}

interface Fields {
    [key: string]: Field
}

interface Field {
    type: string,
    options?: Option[]
}

interface Option {
    value: string,
    label: string,
}