import React, { useState, useEffect } from 'react';
import { ALL_LESSONS_REPLY, ALL_LESSONS_STATUS } from '../Constants';
import Select from 'react-select';
import Card from './Card';
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
            isLoading={isLoading}
            isClearable={false}
            isSearchable
            name='color'
            options={lessons}
        />
    );
}

export default ClassSelector;
