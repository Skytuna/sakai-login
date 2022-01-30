import React, { useState, useEffect } from 'react';
import { ALL_LESSONS_REPLY, ALL_LESSONS_STATUS } from '../Constants';
import Select from 'react-select';
import { COLORS } from '../Theme';
const { ipcRenderer } = window.require('electron');

function LessonSelector() {
    const [lessons, setLessons] = useState([]);
    const [selectedLesson, setSelectedLesson] = useState();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        ipcRenderer.on(ALL_LESSONS_REPLY, onLessonsReply);
        ipcRenderer.on(ALL_LESSONS_STATUS, handleLessonsStatus);

        return () => {
            ipcRenderer.removeListener(ALL_LESSONS_REPLY, onLessonsReply);
            ipcRenderer.removeListener(ALL_LESSONS_STATUS, handleLessonsStatus);
        };
    }, []);

    const onLessonsReply = (_, lessons) => {
        setLessons(lessons.map((lesson) => ({ label: lesson, value: lesson })));
    };

    const handleLessonsStatus = (_, status) => {
        setIsLoading(status);
    };

    const handleLessonChange = (lesson) => {
        setSelectedLesson(lesson);
    };

    return (
        <Select
            options={lessons}
            onChange={handleLessonChange}
            styles={colourStyles}
            isLoading={isLoading}
            isClearable={false}
            isSearchable
            placeholder='Ders seçiniz...'
            loadingMessage={() => 'Yükleniyor...'}
            noOptionsMessage={({ inputValue }) =>
                inputValue ? `${inputValue} bulunamadı.` : 'Hiçbir ders bulunamadı.'
            }
        />
    );
}

export default LessonSelector;

const colourStyles = {
    control: (styles) => ({
        ...styles,
        backgroundColor: COLORS.primary[400],
        borderWidth: 1,
        borderColor: COLORS.primary[400],
        minHeight: 60,
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
        return {
            ...styles,
            width: 'auto',
            backgroundColor: COLORS.primary[isSelected || isFocused ? 500 : 400],
            color: COLORS.white[300],
            cursor: 'pointer',
            ':active': {
                ...styles[':active'],
                backgroundColor: COLORS.primary[500],
            },
        };
    },
    input: (styles) => ({ ...styles, color: '#ffffff' }),
    placeholder: (styles) => ({ ...styles, color: COLORS.white[300] }),
    singleValue: (styles) => ({ ...styles, color: '#ffffff' }),
    menu: (styles) => ({
        ...styles,
        width: 'auto',
        color: 'white',
        backgroundColor: COLORS.primary[400],
    }),
    noOptionsMessage: (styles) => ({ ...styles, color: COLORS.white[300] }),
    menuList: (base) => ({
        ...base,
        '::-webkit-scrollbar': {
            width: '4px',
            height: '4px',
        },
        '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
        },
        '::-webkit-scrollbar-thumb': {
            background: '#888',
        },
        '::-webkit-scrollbar-thumb:hover': {
            background: '#555',
        },
    }),
};
