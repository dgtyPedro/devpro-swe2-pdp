export interface AutocompleteProps {
    label: string,
    options: Option[],
    onChange?: (option: Option) => void,
    defaultValue?: Option
}

export interface Option {
    value: string,
    label: string,
}