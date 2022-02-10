import React, { useContext, useState } from 'react';
import Button from '../Button';
import LessonSelector from './LessonSelector';
import HourSelector from './HourSelector';
import DaySelector from './DaySelector';
import DropdownContainer from './DropdownContainer';
import Card from '../Card';
import UserInfoRow from '../UserInfoContainer/UserInfoRow';
import { Context } from '../../Context';
import { LESSON_COLORS } from '../../Constants';
import AddFailedMessage from './AddFailedMessage';

function AddLessonContainer() {
    const [shortLessonName, setShortLessonName] = useState('');
    const [selectedLesson, setSelectedLesson] = useState();
    const [day, setDay] = useState();
    const [hour, setHour] = useState();
    const [cellErrorStatus, setCellErrorStatus] = useState(false);

    const { setSchedule } = useContext(Context);

    const lessonHandler = (selection) => {
        setSelectedLesson(selection);
    };

    const dayHandler = (selection) => {
        setDay(selection);
    };

    const hourHandler = (selection) => {
        setHour(selection);
    };

    const addLesson = () => {
        const newLesson = {
            id: Math.floor(Math.random() * 1000000000),
            day: day.value,
            color: getRandomColor(),
            name: shortLessonName,
            fullname: selectedLesson.value,
            code: selectedLesson.code,
        };

        setSchedule((prevState) => {
            const hourObjIndex = prevState.findIndex((i) => i.hour === hour.value);
            let newState = [...prevState];

            if (hourObjIndex !== -1) {
                const isCellTaken = newState[hourObjIndex].cells.find((c) => c.day === day.value);
                if (isCellTaken) {
                    setCellErrorStatus((prevS) => !prevS);
                } else {
                    newState[hourObjIndex].cells.push(newLesson);
                }
            } else {
                newState.push({
                    hour: hour.value,
                    cells: [newLesson],
                });
            }

            clearAreas();
            return newState;
        });
    };

    const clearAreas = () => {
        setShortLessonName('');
        setSelectedLesson(null);
        setDay(null);
        setHour(null);
    };

    const getRandomColor = () => {
        const index = Math.floor(Math.random() * LESSON_COLORS.length);
        return LESSON_COLORS[index];
    };

    const isConfirmDisabled = !(day && hour && shortLessonName && selectedLesson);

    return (
        <Card className='bg-primary-400 w-full' header='DERS EKLE'>
            <div className='flex flex-col gap-8 relative -top-6'>
                <DropdownContainer title='Ders Adı'>
                    <LessonSelector onChange={lessonHandler} value={selectedLesson} />
                </DropdownContainer>
                <UserInfoRow
                    title='Kısaltılmış Ders Adı'
                    value={shortLessonName}
                    onChange={(e) => setShortLessonName(e.target.value)}
                />
                <div className='flex flex-row justify-between'>
                    <DropdownContainer title='Gün' className='w-7/12'>
                        <DaySelector onChange={dayHandler} value={day} />
                    </DropdownContainer>
                    <DropdownContainer title='Saat' className='w-5/12 ml-2'>
                        <HourSelector onChange={hourHandler} value={hour} />
                    </DropdownContainer>
                </div>
                <div className='flex flex-row justify-between'>
                    <Button
                        className='!bg-primary-400 !text-white hover:!bg-red-400 border-none'
                        title='TEMİZLE'
                        onClick={clearAreas}
                    />
                    <Button
                        className='bg-white text-lighter-black-300 hover:bg-gray-100 border-b-2 active:border-primary-400 active:scale-95 border-gray-300'
                        title='EKLE'
                        onClick={addLesson}
                        disabled={isConfirmDisabled}
                    />
                </div>
            </div>
            <AddFailedMessage status={cellErrorStatus} />
        </Card>
    );
}

export default AddLessonContainer;
