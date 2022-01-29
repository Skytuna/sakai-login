import React, { useState, useEffect } from 'react';
import { ALL_LESSONS_REPLY, ALL_LESSONS_STATUS } from '../Constants';
import Select from 'react-select';
import { COLORS } from '../Theme';
const { ipcRenderer } = window.require('electron');

function ClassSelector() {
    const [lessons, setLessons] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        ipcRenderer.on(ALL_LESSONS_REPLY, handleLessonsReply);
        ipcRenderer.on(ALL_LESSONS_STATUS, handleLessonsStatus);

        return () => {
            ipcRenderer.removeListener(ALL_LESSONS_REPLY, handleLessonsReply);
            ipcRenderer.removeListener(ALL_LESSONS_STATUS, handleLessonsStatus);
        };
    }, []);

    const handleLessonsReply = (_, lessons) => {
        setLessons(lessons.map((lesson) => ({ label: lesson, value: lesson })));
    };

    const handleLessonsStatus = (_, status) => {
        setIsLoading(status);
    };

    return (
        <Select
            options={lessons}
            styles={colourStyles}
            isLoading={isLoading}
            isClearable={false}
            isSearchable
            placeholder='Ders seçiniz...'
            theme={theme}
            noOptionsMessage={({ inputValue }) =>
                inputValue ? `${inputValue} bulunamadı.` : 'Hiçbir ders bulunamadı.'
            }
        />
    );
}

export default ClassSelector;

const dot = (color = 'transparent') => ({
    alignItems: 'center',
    display: 'flex',

    ':before': {
        backgroundColor: color,
        borderRadius: 10,
        content: '" "',
        display: 'block',
        marginRight: 8,
        height: 10,
        width: 10,
    },
});

const colourStyles = {
    control: (styles) => ({
        ...styles,
        backgroundColor: COLORS.primary[400],
        borderWidth: 1,
        borderColor: COLORS.primary[400],
        minHeight: 60,
        width: 650,
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
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
        const color = '#FAD0D0';
        return {
            ...styles,
            width: 650,
            backgroundColor: isDisabled
                ? undefined
                : isSelected
                ? data.color
                : isFocused
                ? color
                : undefined,
            color: isDisabled ? '#ccc' : isSelected ? 'white' : data.color,
            cursor: isDisabled ? 'not-allowed' : 'default',

            ':active': {
                ...styles[':active'],
                backgroundColor: !isDisabled ? (isSelected ? data.color : color) : undefined,
            },
        };
    },
    input: (styles) => ({ ...styles, ...dot(), color: '#ffffff' }),
    placeholder: (styles) => ({ ...styles, ...dot('#ccc'), color: 'lightgray' }),
    singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color), color: '#ffffff' }),
    menu: (styles) => ({ ...styles, width: 650, color: 'white', backgroundColor: '#EEA7A7' }),
};

const theme = (theme) => ({
    ...theme,
    colors: {
        ...theme.colors,
        primary25: COLORS.primary[400],
        primary: 'black',
    },
});
