import React from 'react';

function Button({ className, title, onClick, disabled }) {
    return (
        <button
            className={`px-6 py-3 bg-white font-medium font-body text-center select-none
          text-lighter-black-300 hover:bg-gray-50 transition-all w-min rounded border-b-2 active:border-primary-400 active:scale-95 
          border-gray-300 ${className || ''} ${
                disabled ? 'active:scale-100 hover:bg-white active:border-gray-300' : ''
            }`}
            onClick={disabled ? () => {} : onClick}>
            {title}
        </button>
    );
}

export default Button;
