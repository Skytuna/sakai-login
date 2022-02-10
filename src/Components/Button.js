import React from 'react';

function Button({ className, title, onClick }) {
    return (
        <button
            className={`px-6 py-3 bg-white font-medium font-body text-center select-none
          text-lighter-black-300 hover:bg-gray-50 transition-all w-min rounded border-b-2 active:border-primary-400 active:scale-95 border-gray-300 ${
              className || ''
          }`}
            onClick={onClick}>
            {title}
        </button>
    );
}

export default Button;
