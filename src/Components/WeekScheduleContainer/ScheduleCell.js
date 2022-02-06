import React, { useContext, useEffect, useState } from 'react';
import { FiCheckCircle, FiEdit, FiTrash } from 'react-icons/fi';
import { Context } from '../../Context';
import useHover from '../../Hooks/useHover';
import { COLORS } from '../../Theme';
import IconContainer from './IconContainer';

function ScheduleCell({ color, name, code, hour, id }) {
    const [status, setStatus] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [flexClasses, setFlexClasses] = useState('justify-center items-center');

    const [ref, isHoveredContainer] = useHover();
    const [iconsRef, isHoveredIcons] = useHover();

    const { setSchedule } = useContext(Context);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
        }

        if (!isFirstRender) {
            if (id) {
                setStatus(1);
                setTimeout(() => {
                    setStatus(2);
                }, 1500);
            } else {
                setStatus(0);
            }
        }
    }, [id]);

    useEffect(() => {
        const flexClasses = status === 2 ? 'justify-between' : 'justify-center items-center';
        setTimeout(() => {
            setFlexClasses(flexClasses);
        }, 100);
    }, [status]);

    const handleDeleteCell = () => {
        setSchedule((prevState) => {
            let newState = [...prevState];
            const hourObjIndex = prevState.findIndex((o) => o.hour === hour);
            const cellIndex = newState[hourObjIndex].cells.findIndex((c) => c.id === id);
            newState[hourObjIndex].cells.splice(cellIndex, 1);
            return newState;
        });
    };

    const handleEditCell = () => {};

    const isHovered = isHoveredContainer || isHoveredIcons;
    return (
        <div
            ref={ref}
            className={`flex flex-row bg-primary-400 px-4 py-3 h-20 ${flexClasses} rounded relative transition-all`}>
            <div
                className='opacity-0 transition-all duration-500 flex flex-row flex-grow justify-between relative'
                style={{ opacity: status === 2 ? '1' : '0' }}>
                {id && (
                    <div
                        className='absolute flex flex-row gap-2 -right-8 -top-8 transition-all'
                        ref={iconsRef}
                        style={{ opacity: isHovered ? '1' : '0' }}>
                        <IconContainer onClick={handleEditCell}>
                            <FiEdit color={COLORS.black} size={16} />
                        </IconContainer>
                        <IconContainer onClick={handleDeleteCell}>
                            <FiTrash color={COLORS.black} size={16} />
                        </IconContainer>
                    </div>
                )}
                <div className='flex flex-col justify-between items-start'>
                    <h5 className='text-white text-lg font-body select-none'>{name}</h5>
                    <p className='text-red-300 text-sm select-none'>{code}</p>
                </div>
                <div
                    className='rounded-md w-1 h-12 self-center'
                    style={{ backgroundColor: color }}
                />
            </div>

            <div
                className='opacity-0 transition-all duration-500 flex flex-grow justify-center items-center absolute'
                style={{ opacity: status === 1 ? '1' : '0' }}>
                <FiCheckCircle color={COLORS.success} size={36} />
            </div>
        </div>
    );
}

const CellWrapper = (props) => {
    const { isHeader, isRowHeader, name } = props;
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

    return <ScheduleCell {...props} />;
};

export default CellWrapper;
