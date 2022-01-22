import React from 'react';

function Button({ className, title, onClick }) {
    return (
        <button
            className={`px-6 py-3 bg-red-300 font-medium font-body text-center select-none
          text-lighter-black-300 hover:bg-red-400 transition-all w-min rounded ${className || ''}`}
            onClick={onClick}>
            {title}
        </button>
    );
}

export default Button;
