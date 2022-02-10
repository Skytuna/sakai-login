import React from 'react';
import { FiX } from 'react-icons/fi';
import { COLORS } from '../Theme';
import Button from './Button';

function ModalContent({ header, onConfirm, onClose, children }) {
    return (
        <>
            <Header onClose={onClose} header={header} />
            {children}
            <Footer onClose={onClose} onConfirm={onConfirm} />
        </>
    );
}

export default ModalContent;

const Header = ({ header, onClose }) => {
    return (
        <div className='flex flex-row relative justify-center items-center bg-primary-400 py-4 px-6'>
            <div className='font-body font-medium text-white px-12 text-xl'>{header || ''}</div>
            <div className='absolute right-2 p-2 hover:bg-primary-350 transition-all rounded cursor-pointer'>
                <FiX onClick={onClose} color={COLORS.white[500]} size={24} />
            </div>
        </div>
    );
};

const Footer = ({ onConfirm, onClose }) => {
    return (
        <div className='flex flex-row relative justify-between items-center py-4 px-4 w-full'>
            <Button
                onClick={onClose}
                title='KAPAT'
                className='active:!border-white hover:bg-gray-100 bg-white border-white'
            />
            {onConfirm && (
                <Button
                    onClick={onConfirm}
                    title='ONAYLA'
                    className='active:!border-white bg-primary-400 hover:bg-primary-500 text-white'
                />
            )}
        </div>
    );
};
