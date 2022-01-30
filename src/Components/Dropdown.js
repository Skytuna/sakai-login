import React from 'react';
import { COLORS } from '../Theme';
import Select from 'react-select';

function Dropdown({
    options,
    onChange,
    isLoading,
    isClearable,
    isSearchable,
    placeholder,
    noOptionsMessage,
}) {
    return (
        <Select
            options={options}
            onChange={onChange}
            styles={colourStyles}
            isLoading={isLoading !== undefined ? isLoading : false}
            isClearable={isClearable !== undefined ? isClearable : false}
            isSearchable={isSearchable !== undefined ? isSearchable : true}
            placeholder={placeholder}
            loadingMessage={() => 'Yükleniyor...'}
            noOptionsMessage={({ val }) => (val ? `${val} bulunamadı.` : noOptionsMessage)}
        />
    );
}

export default Dropdown;

const colourStyles = {
    control: (styles) => ({
        ...styles,
        backgroundColor: COLORS.primary[300],
        borderWidth: 1,
        borderColor: COLORS.primary[300],
        minHeight: 50,
        width: 'auto',
        boxShadow: 'none',
        color: 'white',
        ':hover': {
            ...styles[':hover'],
            borderColor: COLORS.primary[200],
        },
        ':active': {
            ...styles[':active'],
            borderColor: COLORS.primary[100],
        },
    }),
    option: (styles, { isFocused, isSelected }) => {
        let backgroundColor = COLORS.white[900];
        if (isSelected) backgroundColor = COLORS.white[200];
        if (isFocused) backgroundColor = COLORS.white[600];
        return {
            ...styles,
            width: 'auto',
            backgroundColor: backgroundColor,
            color: COLORS.black[400],
            paddingInline: 16,
            cursor: 'pointer',
            ':active': {
                ...styles[':active'],
                backgroundColor: COLORS.white[900],
            },
        };
    },
    input: (styles) => ({ ...styles, color: '#ffffff' }),
    valueContainer: (styles) => ({ ...styles, paddingLeft: 16, textAlign: 'center' }),
    placeholder: (styles) => ({ ...styles, color: COLORS.white[300] }),
    singleValue: (styles) => ({ ...styles, color: '#ffffff' }),
    menu: (styles) => ({
        ...styles,
        width: 'auto',
        color: 'white',
        backgroundColor: COLORS.white[900],
    }),
    noOptionsMessage: (styles) => ({ ...styles, color: COLORS.black[400], width: 'auto' }),
    menuList: (base) => ({
        ...base,
        '::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
        },
        '::-webkit-scrollbar-track': {
            background: COLORS.white[900],
        },
        '::-webkit-scrollbar-thumb': {
            background: COLORS.black[400],
        },
        '::-webkit-scrollbar-thumb:hover': {
            background: COLORS.black[400],
        },
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (styles) => ({
        ...styles,
        color: COLORS.primary[100],
        ':hover': {
            ...styles[':hover'],
            color: COLORS.white[300],
        },
        ':active': {
            ...styles[':active'],
            color: COLORS.white[300],
        },
    }),
};
