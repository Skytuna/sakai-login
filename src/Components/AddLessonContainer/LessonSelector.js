import React, { useState, useEffect } from 'react';
import { ALL_LESSONS_REPLY, ALL_LESSONS_STATUS } from '../../Constants';
import Dropdown from '../Dropdown';
const { ipcRenderer } = window.require('electron');

function LessonSelector(props) {
    const [lessons, setLessons] = useState([]);
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
        setLessons(lessons);
    };

    const handleLessonsStatus = (_, status) => {
        setIsLoading(status);
    };

    return (
        <Dropdown
            {...props}
            options={lessons}
            isLoading={isLoading}
            isClearable={false}
            isSearchable
            placeholder='Ders seçiniz'
            noOptionsMessage='Hiçbir ders bulunamadı.'
        />
    );
}

export default LessonSelector;
