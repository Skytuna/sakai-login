import React, { useContext, useEffect } from 'react';
import { HOURS, SCHEDULE } from '../../Constants';
import { convertHourString, convertScheduleObj, convertTurkishDay } from '../../Utils/commons';
import ScheduleRow from './ScheduleRow';
import EditLessonModal from './EditLessonModal';
import { Context } from '../../Context';
const { ipcRenderer } = window.require('electron');

function WeekScheduleContainer() {
    const { setSchedule } = useContext(Context);

    useEffect(() => {
        const localSchedule = window.localStorage.getItem('schedule');
        if (localSchedule) {
            const schedule = JSON.parse(localSchedule);

            // Set schedule state
            setSchedule(schedule);

            // Set lesson timers
            const lessons = convertScheduleObj(schedule);
            for (const lesson of lessons) ipcRenderer.send(SCHEDULE.ADD_LESSON, lesson);
        }
    }, []);

    return (
        <>
            {[{ value: 'header' }, ...HOURS].map((hour) => (
                <ScheduleRow key={`hour-${hour.value}`} hour={hour.value} />
            ))}
            <EditLessonModal />
        </>
    );
}

export default WeekScheduleContainer;
