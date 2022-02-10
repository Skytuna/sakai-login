import React from 'react';

function CardHeader({ title, className }) {
    return (
        <div
            className={`bg-gray-50 w-max px-6 py-4 rounded-md shadow-xl text-xl font-body font-medium text-center
            select-none tracking-normal text-lighter-black-300 relative -top-16 left-0 right-0 mx-auto ${
                className || ''
            }`}>
            {title}
        </div>
    );
}

export default CardHeader;
