import React from 'react';
import Button from '../Button';
import LessonSelector from './LessonSelector';
import HourSelector from './HourSelector';
import DaySelector from './DaySelector';
import DropdownContainer from './DropdownContainer';
import Card from '../Card';

function AddLessonContainer() {
    return (
        <Card className='bg-primary-400' header='DERS EKLE'>
            <div className='flex flex-col gap-8 relative -top-6'>
                <DropdownContainer title='Ders Adı'>
                    <LessonSelector />
                </DropdownContainer>
                <div className='flex flex-row justify-between'>
                    <DropdownContainer title='Gün' className='w-7/12'>
                        <DaySelector />
                    </DropdownContainer>
                    <DropdownContainer title='Saat' className='w-4/12'>
                        <HourSelector />
                    </DropdownContainer>
                </div>
                <div className='flex flex-row justify-between'>
                    <Button
                        className='bg-primary-400 text-white hover:bg-primary-300'
                        title='TEMİZLE'
                        onClick={() => {}}
                    />
                    <Button
                        className='bg-white text-lighter-black-300 hover:bg-gray-100'
                        title='EKLE'
                        onClick={() => {}}
                    />
                </div>
            </div>
        </Card>
    );
}

export default AddLessonContainer;
