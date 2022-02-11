import React, { useEffect, useState } from 'react';
import { FiAlertTriangle } from 'react-icons/fi';
import { COLORS } from '../../Theme';

function AddFailedMessage({ status }) {
    const [opacity, setOpacity] = useState(0);
    const [isFirstRender, setIsFirstRender] = useState(true);

    useEffect(() => {
        if (!isFirstRender) {
            setOpacity(1);
            setTimeout(() => {
                setOpacity(0);
            }, 1500);
        } else {
            setIsFirstRender(false);
        }
    }, [status]);

    return (
        <div
            className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 
            border-lighter-black-300 bg-white rounded-md px-6 py-8 shadow-2xl transition-all flex flex-row gap-4'
            style={{ opacity, zIndex: opacity }}>
            <FiAlertTriangle color={COLORS.primary[400]} size={32} />
            <div className='text-2xl font-medium font-body text-primary-400'>
                Seçilen saat halihazırda atanmıştır
            </div>
            <FiAlertTriangle color={COLORS.primary[400]} size={32} />
        </div>
    );
}

export default AddFailedMessage;
