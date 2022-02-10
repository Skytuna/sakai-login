import React, { useContext, useEffect } from 'react';
import { HOURS } from '../../Constants';
import ScheduleRow from './ScheduleRow';
import EditLessonModal from './EditLessonModal';
import { Context } from '../../Context';

function WeekScheduleContainer() {
    const { setSchedule } = useContext(Context);

    useEffect(() => {
        const localSchedule = window.localStorage.getItem('schedule');
        if (localSchedule) setSchedule(JSON.parse(localSchedule));
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
