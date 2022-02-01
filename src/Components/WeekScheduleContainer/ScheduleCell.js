import React from 'react';

function ScheduleCell({ color, name, code, isHeader, isRowHeader }) {
    if (isHeader) {
        return (
            <div
                className={`flex bg-primary-500 items-end justify-center rounded ${
                    isRowHeader ? 'justify-self-end' : 'self-end'
                }`}>
                <h1 className='text-red-300 text-lg font-body select-none'>{name}</h1>
            </div>
        );
    }

    return (
        <div className='flex flex-row bg-primary-400 px-4 py-3 justify-between rounded'>
            <div className='flex flex-col justify-between items-start'>
                <h5 className='text-white text-lg font-body select-none'>{name}</h5>
                <p className='text-red-300 text-sm select-none'>{code}</p>
            </div>
            <div className='rounded-md w-1 h-10 self-center' style={{ backgroundColor: color }} />
        </div>
    );
}

export default ScheduleCell;
