export interface AutocompleteProps {
    label: string,
    options: Option[],
}

interface Option {
    value: string,
    label: string,
}