import React from 'react';
import { HOURS } from '../../Constants';
import ScheduleRow from './ScheduleRow';

function WeekScheduleContainer() {
    return [{ value: 'header' }, ...HOURS].map((hour, i) => (
        <ScheduleRow key={i} hour={hour.value} />
    ));
}

export default WeekScheduleContainer;
