import React from 'react';

function DropdownContainer({ title, children, className }) {
    return (
        <div className={`flex flex-col ${className || ''}`}>
            <h5 className='text-sm text-gray-50 font-body select-none mb-2'>{title}</h5>
            {children}
        </div>
    );
}

export default DropdownContainer;
