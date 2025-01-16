export interface AutocompleteProps {
    label: string,
    options: Option[],
    onChange?: (option: Option) => void,
}

export interface Option {
    value: string,
    label: string,
}