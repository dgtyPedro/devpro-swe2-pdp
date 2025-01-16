import useAutocomplete from '@mui/material/useAutocomplete';
import {styled} from '@mui/system';
import {FormField, FormLabel} from "../Form.styles.tsx";
import {AutocompleteProps} from "./Autocomplete.interface.tsx";
import {useEffect} from "react";

const Listbox = styled('ul')(({theme}) => ({
    width: 200,
    margin: 0,
    padding: 0,
    zIndex: 1,
    position: 'absolute',
    listStyle: 'none',
    backgroundColor: '#fff',
    overflow: 'auto',
    maxHeight: 200,
    border: '1px solid rgba(0,0,0,.25)',
    '& li.Mui-focused': {
        backgroundColor: '#4a8df6',
        color: 'white',
        cursor: 'pointer',
    },
    '& ul': {
        display: 'block!important'
    },
    '& li:active': {
        backgroundColor: '#2977f5',
        color: 'white',
    },
    ...theme.applyStyles('dark', {
        backgroundColor: '#000',
    }),
}));

export const AutocompleteComponent = (props: AutocompleteProps) => {
    const {label, options, onChange} = props;

    const capitalizeFirstLetter = (val: string) => {
        return String(val).charAt(0).toUpperCase() + String(val).slice(1);
    }

    const {
        getRootProps,
        getInputProps,
        getListboxProps,
        getOptionProps,
        groupedOptions,
        value
    } = useAutocomplete({
        id: label,
        options: options,
        getOptionLabel: (option) => option.label,
        getOptionKey: (option) => option.value,
    });

    useEffect(() => {
        if (value) onChange?.(value)
    }, [value])

    return (
        <div>
            <div {...getRootProps()}>
                <FormField
                    id={label}
                    name={label}
                    placeholder={capitalizeFirstLetter(label)}
                    required
                    {...getInputProps()} />
                <FormLabel htmlFor={label}>{capitalizeFirstLetter(label)}</FormLabel>
            </div>
            {groupedOptions.length > 0 ? (
                <Listbox {...getListboxProps()}>
                    {groupedOptions.map((option, index) => {
                        const {key, ...optionProps} = getOptionProps({option, index});
                        return (
                            <li key={key} {...optionProps}>
                                {option.label}
                            </li>
                        );
                    })}
                </Listbox>
            ) : null}
        </div>
    );
}
