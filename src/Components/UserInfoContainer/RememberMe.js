import React from 'react';
import { FiCheck } from 'react-icons/fi';

function RememberMe({ rememberMe, toggleRememberMe }) {
    return (
        <div className='flex flex-row justify-center items-center'>
            <label className='text-gray-50 font-body pr-2 select-none'>Beni hatırla:</label>
            <div
                className='bg-white border border-gray-100 rounded-sm
                    hover:border-gray-700 w-6 h-6 transition-all items-center flex justify-center cursor-pointer'
                onClick={toggleRememberMe}>
                {rememberMe && <FiCheck size={20} color='#d95550' />}
            </div>
        </div>
    );
}

export default RememberMe;
