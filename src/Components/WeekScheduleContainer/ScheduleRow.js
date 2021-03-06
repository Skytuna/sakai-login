import React, { useContext, useEffect } from 'react';
import { DAYS } from '../../Constants';
import { Context } from '../../Context';
import { getCellData } from '../../Utils/commons';
import ScheduleCell from './ScheduleCell';

function ScheduleRow({ hour }) {
    const { schedule } = useContext(Context);

    useEffect(() => {
        if (schedule.length > 0) {
            window.localStorage.setItem('schedule', JSON.stringify(schedule));
        }
    }, [schedule]);

    return (
        <div className='grid grid-cols-6 gap-6 items-center min-w-[50rem]'>
            {hour === 'header'
                ? [{}, ...DAYS].map((day) => (
                      <ScheduleCell isHeader key={`${day.value}-title`} name={day.value} />
                  ))
                : ['header', ...DAYS].map((day) => {
                      if (day === 'header')
                          return (
                              <ScheduleCell
                                  isHeader
                                  isRowHeader
                                  key={`${hour}-header`}
                                  name={hour}
                              />
                          );
                      const cell = getCellData(schedule, hour, day.value);
                      return (
                          <ScheduleCell
                              id={cell.id}
                              key={`${hour}-${day.value}`}
                              name={cell.name}
                              color={cell.color}
                              code={cell.code}
                              hour={hour}
                          />
                      );
                  })}
        </div>
    );
}

export default ScheduleRow;
