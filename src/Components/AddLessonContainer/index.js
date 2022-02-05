import React, { useContext, useState } from 'react';
import Button from '../Button';
import LessonSelector from './LessonSelector';
import HourSelector from './HourSelector';
import DaySelector from './DaySelector';
import DropdownContainer from './DropdownContainer';
import Card from '../Card';
import UserInfoRow from '../UserInfoContainer/UserInfoRow';
import { Context } from '../../Context';

function AddLessonContainer() {
    const [shortLessonName, setShortLessonName] = useState('');
    const [selectedLesson, setSelectedLesson] = useState();
    const [day, setDay] = useState();
    const [hour, setHour] = useState();

    const { setSchedule } = useContext(Context);

    const lessonHandler = (selection) => {
        setSelectedLesson(selection);
    };

    const dayHandler = (selection) => {
        setDay(selection.value);
    };

    const hourHandler = (selection) => {
        setHour(selection.value);
    };

    const addLesson = () => {
        const newLesson = {
            day,
            color: getRandomColor(),
            name: shortLessonName,
            fullname: selectedLesson.value,
            code: selectedLesson.code,
        };

        setSchedule((prevState) => {
            const hourObjIndex = prevState.findIndex((i) => i.hour === hour);
            let newState = [...prevState];

            if (hourObjIndex !== -1) {
                newState[hourObjIndex].cells.push(newLesson);
            } else {
                newState.push({
                    hour,
                    cells: [newLesson],
                });
            }

            return newState;
        });
    };

    const clearAreas = () => {
        setShortLessonName('');
        setSelectedLesson();
        setDay();
        setHour();
    };

    function getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }

    return (
        <Card className='bg-primary-400 w-full' header='DERS EKLE'>
            <div className='flex flex-col gap-8 relative -top-6'>
                <DropdownContainer title='Ders Adı'>
                    <LessonSelector onLessonChange={lessonHandler} />
                </DropdownContainer>
                <UserInfoRow
                    title='Kısaltılmış Ders Adı'
                    value={shortLessonName}
                    onChange={(e) => setShortLessonName(e.target.value)}
                />
                <div className='flex flex-row justify-between'>
                    <DropdownContainer title='Gün' className='w-7/12'>
                        <DaySelector onDayChange={dayHandler} />
                    </DropdownContainer>
                    <DropdownContainer title='Saat' className='w-5/12 ml-2'>
                        <HourSelector onHourChange={hourHandler} />
                    </DropdownContainer>
                </div>
                <div className='flex flex-row justify-between'>
                    <Button
                        className='bg-primary-400 text-white hover:bg-primary-300'
                        title='TEMİZLE'
                        onClick={clearAreas}
                    />
                    <Button
                        className='bg-white text-lighter-black-300 hover:bg-gray-100'
                        title='EKLE'
                        onClick={addLesson}
                    />
                </div>
            </div>
        </Card>
    );
}

export default AddLessonContainer;
