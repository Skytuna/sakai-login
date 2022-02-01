import React, { useState, useEffect } from 'react';
import { ALL_LESSONS_REPLY, ALL_LESSONS_STATUS } from '../../Constants';
import Dropdown from '../Dropdown';
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
        <Dropdown
            options={lessons}
            onChange={handleLessonChange}
            isLoading={isLoading}
            isClearable={false}
            isSearchable
            placeholder='Ders seçiniz'
            noOptionsMessage='Hiçbir ders bulunamadı.'
        />
    );
}

export default LessonSelector;
